import { useResumeStore } from '@/store/useResumeStore';
import { Theme } from '@/types/resume';
import { CheckCircle2 } from 'lucide-react';

const THEMES: { id: Theme; name: string; class: string }[] = [
  { id: 'Modern Dark', name: 'Modern Dark', class: 'bg-[#111] border-neutral-800' },
  { id: 'Minimal White', name: 'Minimal White', class: 'bg-white border-neutral-200' },
  { id: 'Gradient Premium', name: 'Premium Gradient', class: 'bg-gradient-to-br from-indigo-900 to-purple-900 border-purple-500/30' },
  { id: 'Glassmorphism', name: 'Glassmorphism', class: 'bg-white/10 backdrop-blur-md border-white/20' },
  { id: 'Developer Portfolio', name: 'Developer Mode', class: 'bg-black border-green-500/30 font-mono' },
];

export default function ThemeSelectionStep() {
  const { data, setTheme } = useResumeStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-foreground">Choose your portfolio theme</h3>
        <p className="text-muted-foreground text-sm mt-1">This will apply to both your PDF and generated portfolio website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {THEMES.map((themeOption) => {
          const isSelected = data.theme === themeOption.id;
          return (
            <div 
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`relative h-32 rounded-xl border-2 cursor-pointer transition-all overflow-hidden flex items-center justify-center
                ${isSelected ? 'border-blue-500 scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-transparent hover:border-border dark:hover:border-white/20'}
                ${themeOption.class}
              `}
            >
              <div className={`font-semibold ${themeOption.id === 'Minimal White' ? 'text-black' : 'text-white'}`}>
                {themeOption.name}
              </div>
              
              {isSelected && (
                <div className="absolute top-3 right-3 text-blue-500 bg-white rounded-full">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
