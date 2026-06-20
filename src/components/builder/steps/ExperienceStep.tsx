import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export default function ExperienceStep() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();

  const handleAdd = () => {
    addExperience({
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      bullets: []
    });
  };

  const handleAddBullet = (id: string, bullet: string) => {
    if (!bullet.trim()) return;
    const exp = data.experience.find(e => e.id === id);
    if (exp) {
      updateExperience(id, { bullets: [...exp.bullets, bullet.trim()] });
    }
  };

  const handleRemoveBullet = (id: string, index: number) => {
    const exp = data.experience.find(e => e.id === id);
    if (exp) {
      updateExperience(id, { bullets: exp.bullets.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-8">
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="p-6 bg-white/5 border border-white/10 rounded-xl relative space-y-4">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h4 className="font-medium text-blue-400">Experience #{index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Google" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} placeholder="Software Engineer Intern" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} placeholder="May 2022" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} placeholder="Aug 2022" className="bg-white/5 border-white/10" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center">
                <Label>Description (For AI to process into bullets)</Label>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-8 px-2">
                  <Sparkles className="w-3 h-3 mr-2" /> Generate Bullets
                </Button>
              </div>
              <Textarea 
                value={exp.description} 
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })} 
                placeholder="I worked on the core API, improving response times by 30%..." 
                className="bg-white/5 border-white/10 min-h-[80px]" 
              />
            </div>

            <div className="space-y-2 md:col-span-2 pt-4">
              <Label>Optimized Bullet Points</Label>
              <div className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-2 items-start bg-black/30 p-2 rounded-md border border-white/5">
                    <div className="text-blue-400 mt-1">•</div>
                    <p className="text-sm flex-1 text-neutral-300">{bullet}</p>
                    <button onClick={() => handleRemoveBullet(exp.id, i)} className="text-neutral-500 hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="Add manual bullet point..." 
                    className="bg-white/5 border-white/10"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddBullet(exp.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-white/20 bg-transparent hover:bg-white/5 text-neutral-300 h-12">
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>
    </div>
  );
}
