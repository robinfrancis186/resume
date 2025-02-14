'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function TestPage() {
  const { user, signInWithGoogle, logout } = useAuth()
  const [backendStatus, setBackendStatus] = useState<string>('Not tested')
  const [geminiStatus, setGeminiStatus] = useState<string>('Not tested')
  const [loading, setLoading] = useState(false)

  const testBackendConnection = async () => {
    try {
      setBackendStatus('Testing...')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes/`)
      if (response.ok) {
        setBackendStatus('Connected successfully')
      } else {
        setBackendStatus(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setBackendStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const testGeminiIntegration = async () => {
    try {
      setGeminiStatus('Testing...')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes/1/enhance_content/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section_id: '1',
          content: 'Test content for enhancement',
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setGeminiStatus('Connected successfully')
      } else {
        setGeminiStatus(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setGeminiStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Integration Tests
        </h1>

        {/* Firebase Authentication Test */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Firebase Authentication
          </h2>
          <div className="space-y-4">
            <div className="text-gray-600 dark:text-gray-300">
              Status: {user ? 'Authenticated' : 'Not authenticated'}
            </div>
            {user ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Email: {user.email}
                </div>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>

        {/* Backend Connection Test */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Backend Connection
          </h2>
          <div className="space-y-4">
            <div className="text-gray-600 dark:text-gray-300">
              Status: {backendStatus}
            </div>
            <button
              onClick={testBackendConnection}
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              Test Backend Connection
            </button>
          </div>
        </div>

        {/* Gemini Integration Test */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Gemini AI Integration
          </h2>
          <div className="space-y-4">
            <div className="text-gray-600 dark:text-gray-300">
              Status: {geminiStatus}
            </div>
            <button
              onClick={testGeminiIntegration}
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              Test Gemini Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 