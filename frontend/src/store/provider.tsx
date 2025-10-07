'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { getCurrentUser } from './slices/authSlice'

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Try to get current user on app mount
    dispatch(getCurrentUser())
  }, [dispatch])

  return <>{children}</>
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  )
}
