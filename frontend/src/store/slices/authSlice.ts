import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiClient } from '@/lib/api/client'

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/users/login', credentials)
      return response.data.user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    userData: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post('/users/signup', userData)
      return response.data.user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed')
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/users/me')
      return response.data.user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user')
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await apiClient.post('/users/logout')
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetAuth: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Get current user
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
      })

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { clearError, resetAuth } = authSlice.actions
export default authSlice.reducer
