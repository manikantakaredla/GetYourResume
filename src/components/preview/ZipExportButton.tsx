'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';
import { ResumeData } from '@/types/resume';

export default function ZipExportButton({ data }: { data: ResumeData }) {
  const [loading, setLoading] = useState(false);

  const generateZip = async () => {
    setLoading(true);
    try {
      const zip = new JSZip();

      // Create a super basic HTML template wrapping the data
      // For a real production app, this would be a full Next.js static export
      // But for MVP ZIP generation, a single HTML file with inline CSS is robust.
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.firstName} ${data.personalInfo.lastName} - Portfolio</title>
    <style>
        body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; padding: 0; background: #0a0a0a; color: #fff; }
        .container { max-w-4xl; margin: 0 auto; padding: 40px 20px; }
        h1 { font-size: 3rem; margin-bottom: 10px; }
        h2 { color: #a0a0a0; font-weight: normal; }
        .section { margin-top: 40px; }
        .card { background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        a { color: #3b82f6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .tag { background: #333; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hi, I'm ${data.personalInfo.firstName}.</h1>
        <h2>${data.careerInfo.targetRole} based in ${data.personalInfo.location}</h2>
        <p>${data.careerInfo.summary}</p>
        <p>Email: <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a></p>

        <div class="section">
            <h3>Experience</h3>
            ${data.experience.map(exp => `
                <div class="card">
                    <h4>${exp.role} @ ${exp.company}</h4>
                    <small>${exp.startDate} - ${exp.endDate}</small>
                    <ul>
                        ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h3>Projects</h3>
            ${data.projects.map(proj => `
                <div class="card">
                    <h4>${proj.name}</h4>
                    <p>${proj.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</p>
                    <ul>
                        ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
      `;

      zip.file('index.html', htmlContent);
      
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.personalInfo.firstName}_Portfolio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Button 
      onClick={generateZip} 
      disabled={loading} 
      variant="outline"
      className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
    >
      <DownloadCloud className="w-4 h-4 mr-2" />
      {loading ? 'Zipping...' : 'Download Portfolio ZIP'}
    </Button>
  );
}
