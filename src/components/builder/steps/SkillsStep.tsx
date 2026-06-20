import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CATEGORIES = ['programming', 'frontend', 'backend', 'database', 'cloud', 'custom'] as const;

export default function SkillsStep() {
  const { data, updateSkills } = useResumeStore();
  const { skills } = data;
  
  const [newSkills, setNewSkills] = useState<Record<string, string>>({
    programming: '', frontend: '', backend: '', database: '', cloud: '', custom: ''
  });

  const handleAddSkill = (category: keyof typeof skills) => {
    const val = newSkills[category].trim();
    if (val && !skills[category].includes(val)) {
      updateSkills(category, [...skills[category], val]);
      setNewSkills(prev => ({ ...prev, [category]: '' }));
    }
  };

  const handleRemoveSkill = (category: keyof typeof skills, skillToRemove: string) => {
    updateSkills(category, skills[category].filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-8">
      {CATEGORIES.map((category) => (
        <div key={category} className="space-y-3">
          <Label className="capitalize text-foreground/80 font-medium">{category} Skills</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills[category].map(skill => (
              <Badge key={skill} variant="secondary" className="bg-muted hover:bg-muted/80 text-foreground border border-border/50 py-1 px-3 rounded-md">
                {skill}
                <button onClick={() => handleRemoveSkill(category, skill)} className="ml-2 text-muted-foreground hover:text-red-500 focus:outline-none transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input 
              value={newSkills[category]}
              onChange={(e) => setNewSkills(prev => ({ ...prev, [category]: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(category)}
              placeholder={`Add ${category} skill...`}
            />
            <Button onClick={() => handleAddSkill(category)} variant="outline" className="border-border bg-card hover:bg-muted text-foreground">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
