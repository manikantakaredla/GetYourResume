import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Education } from '@/types/resume';

export default function EducationStep() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleAdd = () => {
    addEducation({
      id: Math.random().toString(36).substr(2, 9),
      college: '',
      degree: '',
      branch: '',
      cgpa: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="space-y-6">
      {data.education.map((edu, index) => (
        <div key={edu.id} className="p-4 bg-white/5 border border-white/10 rounded-xl relative space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-blue-400">Education #{index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Institution / College</Label>
              <Input 
                value={edu.college} 
                onChange={(e) => updateEducation(edu.id, { college: e.target.value })} 
                placeholder="Stanford University" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input 
                value={edu.degree} 
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} 
                placeholder="B.S. Computer Science" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2">
              <Label>Branch / Major</Label>
              <Input 
                value={edu.branch} 
                onChange={(e) => updateEducation(edu.id, { branch: e.target.value })} 
                placeholder="Computer Science" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                value={edu.startDate} 
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} 
                placeholder="Aug 2019" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2">
              <Label>End Date / Expected</Label>
              <Input 
                value={edu.endDate} 
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} 
                placeholder="May 2023" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>CGPA / Grade</Label>
              <Input 
                value={edu.cgpa} 
                onChange={(e) => updateEducation(edu.id, { cgpa: e.target.value })} 
                placeholder="3.8/4.0" 
                className="bg-white/5 border-white/10" 
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-white/20 bg-transparent hover:bg-white/5 text-neutral-300">
        <Plus className="w-4 h-4 mr-2" /> Add Education
      </Button>
    </div>
  );
}
