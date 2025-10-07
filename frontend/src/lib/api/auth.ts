import { apiClient } from './client'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  name: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  message?: string
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/login', credentials)
  return response.data
}

// Signup user
export const signupUser = async (userData: SignupData): Promise<AuthResponse> => {
  const response = await apiClient.post('/users/signup', userData)
  return response.data
}

// Get current user
export const getCurrentUser = async (): Promise<{ user: User }> => {
  const response = await apiClient.get('/users/me')
  return response.data
}

// Logout user
export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await apiClient.post('/users/logout')
  return response.data
}
