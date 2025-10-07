import { apiClient } from './client'
import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  User,
  VerifyEmailData,
  ResendVerificationData,
  ResetPasswordRequestData,
  ResetPasswordData,
  UpdateProfileData,
} from '@/types'

// Signup user
export const signupUser = async (userData: SignupData): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/signup', userData)
  return response.data
}

// Verify email
export const verifyEmail = async (data: VerifyEmailData): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/verify-email', data)
  return response.data
}

// Resend verification email
export const resendVerification = async (
  data: ResendVerificationData
): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/resend-verification', data)
  return response.data
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/login', credentials)
  return response.data
}

// Request password reset
export const requestPasswordReset = async (
  data: ResetPasswordRequestData
): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/reset-password-request', data)
  return response.data
}

// Reset password
export const resetPassword = async (data: ResetPasswordData): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/reset-password', data)
  return response.data
}

// Get current user (me)
export const getCurrentUser = async (): Promise<{ user: User }> => {
  const response = await apiClient.get('/users/me')
  return response.data
}

// Update current user (patch me)
export const updateCurrentUser = async (
  data: UpdateProfileData
): Promise<{ user: User; message: string }> => {
  const response = await apiClient.patch('/users/me', data)
  return response.data
}

// Logout user
export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/logout')
  return response.data
}
