import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AssessmentEmailStore {
  email: string | null;
  isVerified: boolean;
  setEmail: (email: string) => void;
  setVerified: (verified: boolean) => void;
  clearEmail: () => void;
}

// Store user's verified email for assessment checking
export const useAssessmentEmail = create<AssessmentEmailStore>()(
  persist(
    (set) => ({
      email: null,
      isVerified: false,
      
      setEmail: (email: string) => set({ email, isVerified: false }),
      setVerified: (verified: boolean) => set({ isVerified: verified }),
      clearEmail: () => set({ email: null, isVerified: false }),
    }),
    {
      name: 'assessment-email',
    }
  )
);