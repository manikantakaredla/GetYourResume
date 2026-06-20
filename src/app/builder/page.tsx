'use client';

import Wizard from '@/components/builder/Wizard';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundGeometry from '@/components/BackgroundGeometry';

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 transition-colors duration-200 pb-12">
      {/* Navigation header */}
      <nav className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-foreground">ResumeForge</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Premium Background Geometry */}
      <BackgroundGeometry />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        <Wizard />
      </div>
    </div>
  );
}
