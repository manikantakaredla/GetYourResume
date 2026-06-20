import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, Education, Experience, Project, Certification, Achievement, TargetRole, Theme } from '../types/resume';

interface ResumeState {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateCareerInfo: (info: Partial<ResumeData['careerInfo']>) => void;
  
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  updateSkills: (category: keyof ResumeData['skills'], skills: string[]) => void;

  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  addAchievement: (ach: Achievement) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;

  setTheme: (theme: Theme) => void;
  reset: () => void;
}

const initialData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
  },
  careerInfo: {
    summary: '',
    targetRole: 'Software Engineer',
  },
  education: [],
  skills: {
    programming: [],
    frontend: [],
    backend: [],
    database: [],
    cloud: [],
    custom: [],
  },
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  theme: 'Minimal White',
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      data: initialData,

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
        })),

      updateCareerInfo: (info) =>
        set((state) => ({
          data: { ...state.data, careerInfo: { ...state.data.careerInfo, ...info } },
        })),

      addEducation: (edu) =>
        set((state) => ({
          data: { ...state.data, education: [...state.data.education, edu] },
        })),
      updateEducation: (id, edu) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: { ...state.data, education: state.data.education.filter((e) => e.id !== id) },
        })),

      updateSkills: (category, skills) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: { ...state.data.skills, [category]: skills },
          },
        })),

      addExperience: (exp) =>
        set((state) => ({
          data: { ...state.data, experience: [...state.data.experience, exp] },
        })),
      updateExperience: (id, exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: { ...state.data, experience: state.data.experience.filter((e) => e.id !== id) },
        })),

      addProject: (proj) =>
        set((state) => ({
          data: { ...state.data, projects: [...state.data.projects, proj] },
        })),
      updateProject: (id, proj) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          data: { ...state.data, projects: state.data.projects.filter((p) => p.id !== id) },
        })),

      addCertification: (cert) =>
        set((state) => ({
          data: { ...state.data, certifications: [...state.data.certifications, cert] },
        })),
      updateCertification: (id, cert) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((c) =>
              c.id === id ? { ...c, ...cert } : c
            ),
          },
        })),
      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter((c) => c.id !== id),
          },
        })),

      addAchievement: (ach) =>
        set((state) => ({
          data: { ...state.data, achievements: [...state.data.achievements, ach] },
        })),
      updateAchievement: (id, ach) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: state.data.achievements.map((a) =>
              a.id === id ? { ...a, ...ach } : a
            ),
          },
        })),
      removeAchievement: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: state.data.achievements.filter((a) => a.id !== id),
          },
        })),

      setTheme: (theme) =>
        set((state) => ({
          data: { ...state.data, theme },
        })),

      reset: () => set({ data: initialData }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
