import { create } from 'zustand'

export interface SectionContent {
  title?: string
  description?: string
  items?: string[]
  startDate?: string
  endDate?: string
  organization?: string
  location?: string
  [key: string]: unknown
}

export interface ResumeSection {
  id: string
  type: 'education' | 'experience' | 'skills' | 'projects' | 'certifications'
  content: SectionContent
}

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedIn?: string
  portfolio?: string
}

interface ResumeState {
  personalInfo: PersonalInfo
  sections: ResumeSection[]
  selectedTemplate: 'minimalist' | 'modern' | 'corporate'
  isDarkMode: boolean
  atsScore: number | null
  isLoading: boolean
  setPersonalInfo: (info: PersonalInfo) => void
  addSection: (section: ResumeSection) => void
  updateSection: (id: string, content: SectionContent) => void
  removeSection: (id: string) => void
  setTemplate: (template: 'minimalist' | 'modern' | 'corporate') => void
  toggleDarkMode: () => void
  setAtsScore: (score: number) => void
  setLoading: (loading: boolean) => void
}

export const useResumeStore = create<ResumeState>((set) => ({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  sections: [],
  selectedTemplate: 'modern',
  isDarkMode: false,
  atsScore: null,
  isLoading: false,

  setPersonalInfo: (info) => set({ personalInfo: info }),
  
  addSection: (section) => 
    set((state) => ({ sections: [...state.sections, section] })),
  
  updateSection: (id, content) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, content } : section
      ),
    })),
  
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
  
  setTemplate: (template) => set({ selectedTemplate: template }),
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  setAtsScore: (score) => set({ atsScore: score }),
  
  setLoading: (loading) => set({ isLoading: loading }),
})) 