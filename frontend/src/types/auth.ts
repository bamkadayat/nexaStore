import { User } from './user'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  message?: string
}

export interface VerifyEmailData {
  token: string
}

export interface ResendVerificationData {
  email: string
}

export interface ResetPasswordRequestData {
  email: string
}

export interface ResetPasswordData {
  token: string
  newPassword: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
}
