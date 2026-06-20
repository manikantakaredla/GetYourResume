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
        <div key={cert.id} className="p-4 bg-muted/30 border border-border rounded-xl relative space-y-4 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-orange-600 dark:text-orange-400">Certification #{index + 1}</h4>
            <Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8">
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
              />
            </div>
            <div className="space-y-2">
              <Label>Issuer / Organization</Label>
              <Input 
                value={cert.issuer} 
                onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })} 
                placeholder="Amazon Web Services" 
              />
            </div>
            <div className="space-y-2">
              <Label>Year / Date</Label>
              <Input 
                value={cert.year} 
                onChange={(e) => updateCertification(cert.id, { year: e.target.value })} 
                placeholder="2023" 
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-border bg-transparent hover:bg-muted text-muted-foreground h-11">
        <Plus className="w-4 h-4 mr-2" /> Add Certification
      </Button>
    </div>
  );
}
