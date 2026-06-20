import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Sparkles, X } from 'lucide-react';

export default function ProjectsStep() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  const handleAdd = () => {
    addProject({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      bullets: [],
      technologies: [],
      github: '',
      live: ''
    });
  };

  const handleAddBullet = (id: string, bullet: string) => {
    if (!bullet.trim()) return;
    const proj = data.projects.find(p => p.id === id);
    if (proj) updateProject(id, { bullets: [...proj.bullets, bullet.trim()] });
  };

  const handleRemoveBullet = (id: string, index: number) => {
    const proj = data.projects.find(p => p.id === id);
    if (proj) updateProject(id, { bullets: proj.bullets.filter((_, i) => i !== index) });
  };

  const handleAddTech = (id: string, techString: string) => {
    const proj = data.projects.find(p => p.id === id);
    if (proj && techString.trim()) {
      const newTechs = techString.split(',').map(t => t.trim()).filter(Boolean);
      updateProject(id, { technologies: [...new Set([...proj.technologies, ...newTechs])] });
    }
  };

  const handleRemoveTech = (id: string, tech: string) => {
    const proj = data.projects.find(p => p.id === id);
    if (proj) {
      updateProject(id, { technologies: proj.technologies.filter(t => t !== tech) });
    }
  };

  return (
    <div className="space-y-8">
      {data.projects.map((proj, index) => (
        <div key={proj.id} className="p-6 bg-muted/30 border border-border rounded-xl relative space-y-4 transition-colors">
          <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
            <h4 className="font-semibold text-purple-650 dark:text-purple-400">Project #{index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Project Name</Label>
              <Input value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} placeholder="E-commerce Platform" />
            </div>
            
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input value={proj.github || ''} onChange={(e) => updateProject(proj.id, { github: e.target.value })} placeholder="github.com/johndoe/project" />
            </div>
            <div className="space-y-2">
              <Label>Live URL</Label>
              <Input value={proj.live || ''} onChange={(e) => updateProject(proj.id, { live: e.target.value })} placeholder="project.com" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Technologies (Comma separated)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {proj.technologies.map(tech => (
                  <span key={tech} className="bg-muted text-foreground border border-border/50 px-2 py-1 rounded text-xs flex items-center gap-1 font-medium shadow-sm">
                    {tech} <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleRemoveTech(proj.id, tech)} />
                  </span>
                ))}
              </div>
              <Input 
                placeholder="React, Node.js, MongoDB..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTech(proj.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center">
                <Label>Description</Label>
                <Button variant="ghost" size="sm" className="text-purple-650 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-500/10 h-8 px-2 transition-all font-semibold">
                  <Sparkles className="w-3 h-3 mr-2 animate-pulse" /> Generate Bullets
                </Button>
              </div>
              <Textarea 
                value={proj.description} 
                onChange={(e) => updateProject(proj.id, { description: e.target.value })} 
                placeholder="What did you build? What problems did it solve?" 
                className="min-h-[80px]" 
              />
            </div>

            <div className="space-y-2 md:col-span-2 pt-4">
              <Label>Optimized Bullet Points</Label>
              <div className="space-y-2">
                {proj.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-2 items-start bg-background p-2.5 rounded-lg border border-border shadow-sm">
                    <div className="text-purple-650 dark:text-purple-450 mt-1 font-bold">•</div>
                    <p className="text-sm flex-1 text-foreground/90 leading-relaxed">{bullet}</p>
                    <button onClick={() => handleRemoveBullet(proj.id, i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Input 
                    placeholder="Add manual bullet point..." 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddBullet(proj.id, e.currentTarget.value);
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
        <Plus className="w-4 h-4 mr-2" /> Add Project
      </Button>
    </div>
  );
}
