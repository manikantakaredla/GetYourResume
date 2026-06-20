'use client';

import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ResumeData } from '@/types/resume';

export default function PDFExportButton({ data }: { data: ResumeData }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button disabled className="w-full bg-blue-600/50">
        Loading PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF data={data} />}
      fileName={`${data.personalInfo.firstName || 'Resume'}_${data.personalInfo.lastName || 'Export'}.pdf`}
      className="w-full"
    >
      {/* @ts-ignore */}
      {({ blob, url, loading, error }) => (
        <Button 
          disabled={loading} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0"
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? 'Generating PDF...' : 'Download PDF Resume'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
