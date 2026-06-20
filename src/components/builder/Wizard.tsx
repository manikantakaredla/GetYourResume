'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Placeholder for step components (to be implemented)
import PersonalInfoStep from './steps/PersonalInfoStep';
import CareerInfoStep from './steps/CareerInfoStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ExperienceStep from './steps/ExperienceStep';
import ProjectsStep from './steps/ProjectsStep';
import CertificationsStep from './steps/CertificationsStep';
import AchievementsStep from './steps/AchievementsStep';
import ThemeSelectionStep from './steps/ThemeSelectionStep';

const STEPS = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoStep },
  { id: 'career', title: 'Career', component: CareerInfoStep },
  { id: 'education', title: 'Education', component: EducationStep },
  { id: 'skills', title: 'Skills', component: SkillsStep },
  { id: 'experience', title: 'Experience', component: ExperienceStep },
  { id: 'projects', title: 'Projects', component: ProjectsStep },
  { id: 'certifications', title: 'Certifications', component: CertificationsStep },
  { id: 'achievements', title: 'Achievements', component: AchievementsStep },
  { id: 'theme', title: 'Theme', component: ThemeSelectionStep },
];

export default function Wizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const router = useRouter();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const nextStep = () => !isLastStep && setCurrentStepIndex(prev => prev + 1);
  const prevStep = () => !isFirstStep && setCurrentStepIndex(prev => prev - 1);
  const goToDashboard = () => router.push('/dashboard');

  const CurrentStepComponent = STEPS[currentStepIndex].component;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[80vh]">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground mb-1">
              {STEPS[currentStepIndex].title}
            </h1>
            <p className="text-muted-foreground text-sm">
              Step {currentStepIndex + 1} of {STEPS.length}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full">
          {STEPS.map((step, idx) => (
            <div 
              key={step.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx <= currentStepIndex ? 'bg-blue-500' : 'bg-muted dark:bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-colors duration-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={isFirstStep}
          className="border-border bg-card hover:bg-muted text-foreground transition-all"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        {isLastStep ? (
          <Button onClick={goToDashboard} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-transform hover:scale-105 shadow-md">
            Finish & Generate
            <Save className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={nextStep} className="transition-transform hover:scale-105 shadow-sm">
            Continue
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
