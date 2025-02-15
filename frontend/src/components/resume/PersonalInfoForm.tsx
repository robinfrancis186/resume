'use client'

import { useResumeStore } from '@/store/useResumeStore'

export default function PersonalInfoForm() {
  const { personalInfo, setPersonalInfo } = useResumeStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo({ ...personalInfo, [name]: value })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={personalInfo.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn (optional)
          </label>
          <input
            type="url"
            name="linkedIn"
            id="linkedIn"
            value={personalInfo.linkedIn}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Portfolio Website (optional)
          </label>
          <input
            type="url"
            name="portfolio"
            id="portfolio"
            value={personalInfo.portfolio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
    </div>
  )
} 