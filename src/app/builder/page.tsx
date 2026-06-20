import Wizard from '@/components/builder/Wizard';

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none opacity-50">
        <div className="w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <Wizard />
      </div>
    </div>
  );
}
