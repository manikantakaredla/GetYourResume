import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
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
          <div key={ach.id} className="flex gap-2 items-center">
            <div className="flex-1">
              <Input 
                value={ach.description} 
                onChange={(e) => updateAchievement(ach.id, { description: e.target.value })} 
                placeholder="e.g., Solved 500+ LeetCode problems, Hackathon Winner..." 
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeAchievement(ach.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 shrink-0">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-border bg-transparent hover:bg-muted text-muted-foreground h-11">
        <Plus className="w-4 h-4 mr-2" /> Add Achievement
      </Button>
    </div>
  );
}
