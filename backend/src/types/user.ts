import { z } from 'zod';

// Validation schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const verifyLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(4, 'Code must be 4 digits'),
  password: z.string().min(1, 'Password is required'),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  isActive: z.boolean().optional(),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(4, 'Code must be 4 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

// Types
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginRequestInput = z.infer<typeof loginRequestSchema>;
export type VerifyLoginInput = z.infer<typeof verifyLoginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
