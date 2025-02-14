'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/useResumeStore'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useResumeStore()
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Resume Builder
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'edit'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'preview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resume Editor
            </h2>
            {/* Editor components will go here */}
            <p className="text-gray-600 dark:text-gray-300">
              Editor components coming soon...
            </p>
          </div>

          {/* Preview Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resume Preview
            </h2>
            {/* Preview components will go here */}
            <p className="text-gray-600 dark:text-gray-300">
              Preview components coming soon...
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
