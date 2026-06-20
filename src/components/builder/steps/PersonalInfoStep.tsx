import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PersonalInfoStep() {
  const { data, updatePersonalInfo } = useResumeStore();
  const info = data.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" name="firstName" value={info.firstName} onChange={handleChange} placeholder="John" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" name="lastName" value={info.lastName} onChange={handleChange} placeholder="Doe" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" value={info.email} onChange={handleChange} placeholder="john@example.com" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" name="phone" value={info.phone} onChange={handleChange} placeholder="+1 234 567 890" className="bg-white/5 border-white/10 text-white" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location *</Label>
          <Input id="location" name="location" value={info.location} onChange={handleChange} placeholder="San Francisco, CA" className="bg-white/5 border-white/10 text-white" />
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <h3 className="text-lg font-medium mb-4">Social Links (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input id="linkedin" name="linkedin" value={info.linkedin || ''} onChange={handleChange} placeholder="linkedin.com/in/johndoe" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input id="github" name="github" value={info.github || ''} onChange={handleChange} placeholder="github.com/johndoe" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input id="portfolio" name="portfolio" value={info.portfolio || ''} onChange={handleChange} placeholder="johndoe.com" className="bg-white/5 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leetcode">LeetCode URL</Label>
            <Input id="leetcode" name="leetcode" value={info.leetcode || ''} onChange={handleChange} placeholder="leetcode.com/johndoe" className="bg-white/5 border-white/10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
