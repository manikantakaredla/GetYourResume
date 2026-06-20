import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function AchievementsStep() {
  const { data, addAchievement, updateAchievement, removeAchievement } = useResumeStore();

  const handleAdd = () => {
    addAchievement({
      id: Math.random().toString(36).substr(2, 9),
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.achievements.map((ach, index) => (
          <div key={ach.id} className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input 
                value={ach.description} 
                onChange={(e) => updateAchievement(ach.id, { description: e.target.value })} 
                placeholder="e.g., Solved 500+ LeetCode problems, Hackathon Winner..." 
                className="bg-white/5 border-white/10 text-white" 
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeAchievement(ach.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-10 w-10 shrink-0">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-white/20 bg-transparent hover:bg-white/5 text-neutral-300">
        <Plus className="w-4 h-4 mr-2" /> Add Achievement
      </Button>
    </div>
  );
}
