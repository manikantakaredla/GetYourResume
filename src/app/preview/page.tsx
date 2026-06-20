'use client';

import { useResumeStore } from '@/store/useResumeStore';
import PortfolioTemplate from '@/components/portfolio/PortfolioTemplate';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const PDFExportButton = dynamic(() => import('@/components/preview/PDFExportButton'), { ssr: false });

export default function PreviewPage() {
  const { data } = useResumeStore();

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-neutral-900/90 backdrop-blur-md border border-white/10 p-2 rounded-full shadow-2xl flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
          </Button>
        </Link>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <Link href={`/p/${data.personalInfo.firstName?.toLowerCase() || 'demo'}`}>
          <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/10">
            <Share2 className="w-4 h-4 mr-2" /> Share Link
          </Button>
        </Link>
        <div className="w-32">
          <PDFExportButton data={data} />
        </div>
      </div>
      
      <PortfolioTemplate data={data} />
    </>
  );
}
