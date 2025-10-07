import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import {
  signupSchema,
  updateUserSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema,
} from '../types/user';
import { sendVerificationEmail } from '../services/emailService';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

// Helper function to generate 4-digit code
const generateCode = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Helper function to generate JWT token
const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '7d',
  });
};

/**
 * SIGNUP - Step 1: Create user and send verification code
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        emailVerified: false,
      },
    });

    // Generate verification code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing verification codes for this email
    await prisma.verificationCode.deleteMany({
      where: { email: validatedData.email, purpose: 'SIGNUP' },
    });

    // Create verification code
    await prisma.verificationCode.create({
      data: {
        email: validatedData.email,
        code,
        purpose: 'SIGNUP',
        expiresAt,
      },
    });

    // Send verification email
    await sendVerificationEmail(validatedData.email, code, 'SIGNUP');

    return res.status(201).json({
      message: 'User created successfully. Please check your email for verification code.',
      userId: user.id,
      email: user.email,
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * VERIFY SIGNUP - Verify the 4-digit code
 */
export const verifySignup = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    // Find verification code
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        purpose: 'SIGNUP',
        verified: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!verificationCode) {
      return res.status(400).json({
        error: 'Invalid or expired verification code',
        message: 'Your verification code has expired or is invalid. Please request a new code.',
        canResend: true
      });
    }

    // Update user as verified
    const user = await prisma.user.update({
      where: { email },
      data: { emailVerified: true, lastLoginAt: new Date() },
    });

    // Mark verification code as used
    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: { verified: true },
    });

    // Generate JWT token
    const token = generateToken(user.id, user.email, user.role);

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
      },
      token,
    });
  } catch (error) {
    console.error('Verify signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * RESEND VERIFICATION CODE
 */
export const resendVerificationCode = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new verification code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing verification codes for this email
    await prisma.verificationCode.deleteMany({
      where: { email, purpose: 'SIGNUP' },
    });

    // Create new verification code
    await prisma.verificationCode.create({
      data: {
        email,
        code,
        purpose: 'SIGNUP',
        expiresAt,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, code, 'SIGNUP');

    return res.status(200).json({
      message: 'Verification code has been resent. Please check your email.',
      email,
    });
  } catch (error) {
    console.error('Resend verification code error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * LOGIN - Direct login with email and password
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        error: 'Email not verified',
        message: 'Please verify your email before logging in',
        email: user.email
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update user last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate JWT token
    const token = generateToken(user.id, user.email, user.role);

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * LOGOUT
 */
export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET CURRENT USER
 */
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET ALL USERS (Admin only)
 */
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search as string, mode: 'insensitive' } },
        { name: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    // Get total count
    const total = await prisma.user.count({ where });

    // Get users
    const users = await prisma.user.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET USER BY ID
 */
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * UPDATE USER
 */
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateUserSchema.parse(req.body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is updating their own account or is an admin
    if (req.user?.userId !== id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    // Prepare update data
    const updateData: any = {};

    if (validatedData.name) {
      updateData.name = validatedData.name;
    }

    if (validatedData.email) {
      // Check if email is already taken
      const emailExists = await prisma.user.findFirst({
        where: { email: validatedData.email, NOT: { id } },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email is already taken' });
      }

      updateData.email = validatedData.email;
      updateData.emailVerified = false; // Reset email verification
    }

    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 10);
    }

    // Only admins can update role and isActive
    if (req.user?.role === 'ADMIN') {
      if (validatedData.role !== undefined) {
        updateData.role = validatedData.role;
      }
      if (validatedData.isActive !== undefined) {
        updateData.isActive = validatedData.isActive;
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent self-deletion
    if (req.user?.userId === id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Delete user (cascading deletes will handle related records)
    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * RESET PASSWORD - Step 1: Request reset code
 */
export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const validatedData = resetPasswordRequestSchema.parse(req.body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      // Don't reveal if user exists or not
      return res.status(200).json({
        message: 'If a user with this email exists, a verification code has been sent.',
      });
    }

    // Generate verification code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing verification codes for this email
    await prisma.verificationCode.deleteMany({
      where: { email: validatedData.email, purpose: 'RESET_PASSWORD' },
    });

    // Create verification code
    await prisma.verificationCode.create({
      data: {
        email: validatedData.email,
        code,
        purpose: 'RESET_PASSWORD',
        expiresAt,
      },
    });

    // Send verification email
    await sendVerificationEmail(validatedData.email, code, 'RESET_PASSWORD');

    return res.status(200).json({
      message: 'If a user with this email exists, a verification code has been sent.',
    });
  } catch (error: any) {
    console.error('Reset password request error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * RESET PASSWORD - Step 2: Verify code and set new password
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const validatedData = resetPasswordSchema.parse(req.body);

    // Find verification code
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        email: validatedData.email,
        code: validatedData.code,
        purpose: 'RESET_PASSWORD',
        verified: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!verificationCode) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Mark verification code as used
    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: { verified: true },
    });

    return res.status(200).json({
      message: 'Password reset successfully. You can now login with your new password.',
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
