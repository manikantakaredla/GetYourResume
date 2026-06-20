export type TargetRole =
  | 'Software Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'Java Developer'
  | 'Python Developer'
  | 'Data Analyst'
  | 'Data Scientist'
  | 'AI Engineer'
  | 'ML Engineer'
  | 'DevOps Engineer'
  | 'Cloud Engineer'
  | 'Cybersecurity Analyst'
  | 'Product Manager'
  | 'Business Analyst'
  | 'Google SWE Intern'
  | 'Google STEP Intern'
  | 'Microsoft Intern'
  | 'Amazon SDE Intern'
  | 'Meta Intern'
  | 'Startup Intern'
  | string;

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  leetcode?: string;
  codechef?: string;
  hackerrank?: string;
}

export interface CareerInfo {
  summary: string;
  targetRole: TargetRole;
}

export interface Education {
  id: string;
  college: string;
  degree: string;
  branch: string;
  cgpa: string;
  startDate: string;
  endDate: string;
}

export interface Skills {
  programming: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  cloud: string[];
  custom: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  technologies: string[];
  github?: string;
  live?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Achievement {
  id: string;
  description: string;
}

export type Theme =
  | 'Modern Dark'
  | 'Minimal White'
  | 'Gradient Premium'
  | 'Glassmorphism'
  | 'Developer Portfolio';

export interface ResumeData {
  personalInfo: PersonalInfo;
  careerInfo: CareerInfo;
  education: Education[];
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  theme: Theme;
}
