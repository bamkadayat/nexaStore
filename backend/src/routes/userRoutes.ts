import express from 'express';
import {
  signup,
  verifySignup,
  resendVerificationCode,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetPasswordRequest,
  resetPassword,
} from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

// Public routes - Authentication
router.post('/signup', signup);
router.post('/verify-signup', verifySignup);
router.post('/resend-verification', resendVerificationCode);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password/request', resetPasswordRequest);
router.post('/reset-password', resetPassword);

// Protected routes - Authenticated users
router.get('/me', authenticate, getCurrentUser);
router.patch('/me', authenticate, updateUser); // User can update their own profile

// Protected routes - Admin only
router.get('/', authenticate, authorize('ADMIN'), getAllUsers);
router.get('/:id', authenticate, authorize('ADMIN'), getUserById);
router.patch('/:id', authenticate, authorize('ADMIN'), updateUser);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteUser);

export default router;
