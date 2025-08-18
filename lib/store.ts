import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WeightLossAssessment {
  height?: number
  weight?: number
  heightUnit?: 'feet' | 'cm'
  weightUnit?: 'stone' | 'kg' | 'pounds'
  age?: number
  gender?: 'male' | 'female' | 'other'
  medicalConditions?: string[]
  currentMedications?: string[]
  previousWeightLossAttempts?: string[]
}

interface AppStore {
  assessment: WeightLossAssessment
  updateAssessment: (data: Partial<WeightLossAssessment>) => void
  resetAssessment: () => void
  
  // UI state
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      assessment: {},
      updateAssessment: (data) =>
        set((state) => ({
          assessment: { ...state.assessment, ...data }
        })),
      resetAssessment: () =>
        set(() => ({
          assessment: {}
        })),
      
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) =>
        set(() => ({
          isMobileMenuOpen: open
        }))
    }),
    {
      name: 'weight-loss-clinic-storage',
      partialize: (state) => ({ assessment: state.assessment })
    }
  )
)