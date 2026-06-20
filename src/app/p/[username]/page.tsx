'use client';

import { useResumeStore } from '@/store/useResumeStore';
import PortfolioTemplate from '@/components/portfolio/PortfolioTemplate';
import { useEffect, useState } from 'react';

export default function SharedPortfolioPage({ params }: { params: { username: string } }) {
  const { data } = useResumeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // In a real app with a DB, we would fetch the user's data by username here.
  // For this MVP, we read from the local Zustand store so it simulates the experience locally.
  
  return (
    <div className="relative">
      {/* A small persistent badge showing it's built with ResumeForge */}
      <a href="/" target="_blank" className="fixed bottom-6 right-6 z-50 bg-black/50 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-white hover:bg-white/10 transition flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        Built with ResumeForge
      </a>
      
      <PortfolioTemplate data={data} />
    </div>
  );
}
