'use client'

import { useResumeStore } from '@/store/useResumeStore'
import { AuthProvider } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const isDarkMode = useResumeStore((state) => state.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return <AuthProvider>{children}</AuthProvider>
} 