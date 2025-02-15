'use client'

import React, { useState } from 'react'
import { useResumeStore, SectionContent, ResumeSection as ResumeSectionType } from '@/store/useResumeStore'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { v4 as uuidv4 } from 'uuid'

interface SectionFormData extends SectionContent {
  type: ResumeSectionType['type']
}

const ResumeSection: React.FC = () => {
  const { sections, addSection, updateSection, removeSection } = useResumeStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<SectionFormData>({
    type: 'experience',
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  const handleAddSection = () => {
    setIsEditing(true)
    setEditingId(null)
    setFormData({
      type: 'experience',
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    })
  }

  const handleEditSection = (section: ResumeSectionType) => {
    setIsEditing(true)
    setEditingId(section.id)
    setFormData({ type: section.type, ...section.content })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { type, ...content } = formData

    if (editingId) {
      updateSection(editingId, content)
    } else {
      const newSection: ResumeSectionType = {
        id: uuidv4(),
        type,
        content,
      }
      addSection(newSection)
    }

    setIsEditing(false)
    setEditingId(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
  }

  const renderForm = () => {
    switch (formData.type) {
      case 'education':
        return (
          <>
            <input
              type="text"
              placeholder="Degree/Course"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Institution"
              value={formData.organization || ''}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
          </>
        )
      case 'experience':
        return (
          <>
            <input
              type="text"
              placeholder="Job Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.organization || ''}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
          </>
        )
      case 'skills':
        return (
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4">
      {!isEditing ? (
        <div>
          <button
            onClick={handleAddSection}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Section
          </button>
          
          {sections.map((section) => (
            <div key={section.id} className="mt-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium capitalize">{section.type}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditSection(section)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <PencilIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
              <div>
                {section.content.title && <p className="font-medium">{section.content.title}</p>}
                {section.content.organization && <p>{section.content.organization}</p>}
                {section.content.description && <p className="text-gray-600">{section.content.description}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as ResumeSectionType['type'] })}
            className="w-full p-2 border rounded"
          >
            <option value="experience">Experience</option>
            <option value="education">Education</option>
            <option value="skills">Skills</option>
          </select>

          {renderForm()}

          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {editingId ? 'Update' : 'Add'} Section
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ResumeSection 