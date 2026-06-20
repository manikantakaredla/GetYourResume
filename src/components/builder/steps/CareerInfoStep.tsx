import { useResumeStore } from '@/store/useResumeStore';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TargetRole } from '@/types/resume';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ROLES: TargetRole[] = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Java Developer', 'Python Developer', 'Data Analyst', 'Data Scientist', 'AI Engineer',
  'ML Engineer', 'DevOps Engineer', 'Cloud Engineer', 'Cybersecurity Analyst',
  'Product Manager', 'Business Analyst', 'Google SWE Intern', 'Microsoft Intern',
  'Amazon SDE Intern', 'Meta Intern', 'Startup Intern'
];

export default function CareerInfoStep() {
  const { data, updateCareerInfo } = useResumeStore();
  const { targetRole, summary } = data.careerInfo;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="targetRole">Target Role</Label>
        <select
          id="targetRole"
          value={targetRole}
          onChange={(e) => updateCareerInfo({ targetRole: e.target.value as TargetRole })}
          className="w-full bg-background border border-border text-foreground rounded-md h-10 px-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {ROLES.map((role) => (
            <option key={role} value={role} className="bg-card text-foreground">
              {role}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">This role will be used to optimize your ATS score and AI suggestions.</p>
      </div>

      <div className="space-y-2 relative">
        <div className="flex justify-between items-center">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:dark:text-blue-300 hover:bg-blue-500/10 h-8 px-2">
            <Sparkles className="w-3 h-3 mr-2 animate-pulse" /> AI Generate
          </Button>
        </div>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => updateCareerInfo({ summary: e.target.value })}
          placeholder="Highly motivated Software Engineer with 3+ years of experience in building scalable web applications..."
          className="min-h-[150px]"
        />
      </div>
    </div>
  );
}
