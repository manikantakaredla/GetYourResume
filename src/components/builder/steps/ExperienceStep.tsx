import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Sparkles, X } from 'lucide-react';

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
        <div key={exp.id} className="p-6 bg-muted/30 border border-border rounded-xl relative space-y-4 transition-colors">
          <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">Experience #{index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Google" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} placeholder="Software Engineer Intern" />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} placeholder="May 2022" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} placeholder="Aug 2022" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center">
                <Label>Description (For AI to process into bullets)</Label>
                <Button variant="ghost" size="sm" className="text-blue-650 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-500/10 h-8 px-2 transition-all font-semibold">
                  <Sparkles className="w-3 h-3 mr-2 animate-pulse" /> Generate Bullets
                </Button>
              </div>
              <Textarea 
                value={exp.description} 
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })} 
                placeholder="I worked on the core API, improving response times by 30%..." 
                className="min-h-[80px]" 
              />
            </div>

            <div className="space-y-2 md:col-span-2 pt-4">
              <Label>Optimized Bullet Points</Label>
              <div className="space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-2 items-start bg-background p-2.5 rounded-lg border border-border shadow-sm">
                    <div className="text-blue-550 dark:text-blue-400 mt-1 font-bold">•</div>
                    <p className="text-sm flex-1 text-foreground/90 leading-relaxed">{bullet}</p>
                    <button onClick={() => handleRemoveBullet(exp.id, i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="Add manual bullet point..." 
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

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-border bg-transparent hover:bg-muted text-muted-foreground h-12">
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>
    </div>
  );
}
