import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function CertificationsStep() {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore();

  const handleAdd = () => {
    addCertification({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      issuer: '',
      year: ''
    });
  };

  return (
    <div className="space-y-6">
      {data.certifications.map((cert, index) => (
        <div key={cert.id} className="p-4 bg-white/5 border border-white/10 rounded-xl relative space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-orange-400">Certification #{index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Certification Name</Label>
              <Input 
                value={cert.name} 
                onChange={(e) => updateCertification(cert.id, { name: e.target.value })} 
                placeholder="AWS Certified Solutions Architect" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2">
              <Label>Issuer / Organization</Label>
              <Input 
                value={cert.issuer} 
                onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })} 
                placeholder="Amazon Web Services" 
                className="bg-white/5 border-white/10" 
              />
            </div>
            <div className="space-y-2">
              <Label>Year / Date</Label>
              <Input 
                value={cert.year} 
                onChange={(e) => updateCertification(cert.id, { year: e.target.value })} 
                placeholder="2023" 
                className="bg-white/5 border-white/10" 
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-white/20 bg-transparent hover:bg-white/5 text-neutral-300">
        <Plus className="w-4 h-4 mr-2" /> Add Certification
      </Button>
    </div>
  );
}
