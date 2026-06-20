'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { analyzeJobDescription, analyzeDreamCompany } from '@/actions/ai';
import { Globe, Briefcase, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ZipExportButton from '@/components/preview/ZipExportButton';
import ThemeToggle from '@/components/ThemeToggle';
import BackgroundGeometry from '@/components/BackgroundGeometry';

const PDFExportButton = dynamic(() => import('@/components/preview/PDFExportButton'), { ssr: false });

// Circular Gauge Component
const CircularGauge = ({ value, label }: { value: number; label: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const color = value >= 80 ? 'text-green-500' : value >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/15 dark:text-white/10" />
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${color}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

export default function Dashboard() {
  const { data } = useResumeStore();
  
  const [jd, setJd] = useState('');
  const [jdResult, setJdResult] = useState<any>(null);
  const [jdLoading, setJdLoading] = useState(false);

  const [company, setCompany] = useState('Google');
  const [companyResult, setCompanyResult] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState(false);

  // Mock initial ATS component scores (In a real app, this would be computed on mount)
  const initialScores = {
    overall: 88,
    keyword: 92,
    skills: 85,
    experience: 84,
    projects: 90
  };

  const handleJdAnalysis = async () => {
    if (!jd) return;
    setJdLoading(true);
    try {
      const res = await analyzeJobDescription(jd, data);
      setJdResult(JSON.parse(res));
    } catch (e) {
      console.error(e);
    }
    setJdLoading(false);
  };

  const handleCompanyAnalysis = async () => {
    setCompanyLoading(true);
    try {
      const res = await analyzeDreamCompany(company, data);
      setCompanyResult(JSON.parse(res));
    } catch (e) {
      console.error(e);
    }
    setCompanyLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 p-6 md:p-12 transition-colors duration-200 relative">
      {/* Premium Background Geometry */}
      <BackgroundGeometry />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resume Health Dashboard</h1>
            <p className="text-muted-foreground">Analyze, optimize, and export your professional profile.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <ThemeToggle />
            <Link href="/builder">
              <Button variant="outline" className="border-border bg-card hover:bg-muted">Edit Data</Button>
            </Link>
            <Link href="/preview">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md">
                <Globe className="w-4 h-4 mr-2" /> Live Portfolio
              </Button>
            </Link>
            <div className="w-48 hidden md:block">
              <PDFExportButton data={data} />
            </div>
            <div className="w-48 hidden md:block">
              <ZipExportButton data={data} />
            </div>
          </div>
        </div>

        {/* Mobile Export Buttons */}
        <div className="flex md:hidden gap-3">
          <div className="flex-1">
            <PDFExportButton data={data} />
          </div>
          <div className="flex-1">
            <ZipExportButton data={data} />
          </div>
        </div>

        {/* Top Section: ATS Scores */}
        <Card className="bg-card border-border text-card-foreground shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full border border-blue-500/20">
                <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                  {initialScores.overall}
                </div>
                <div className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-semibold">ATS Score</div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                <CircularGauge value={initialScores.keyword} label="Keywords" />
                <CircularGauge value={initialScores.skills} label="Skills" />
                <CircularGauge value={initialScores.experience} label="Experience" />
                <CircularGauge value={initialScores.projects} label="Projects" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle Section: Analyzers */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Job Description Analyzer */}
          <Card className="bg-card border-border text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Briefcase className="w-5 h-5 text-blue-500 dark:text-blue-405" /> Job Description Matcher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste the job description here..." 
                className="bg-background border-border min-h-[120px]"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
              <Button 
                onClick={handleJdAnalysis} 
                disabled={jdLoading || !jd} 
                className="w-full"
              >
                {jdLoading ? "Analyzing..." : "Analyze Match"}
              </Button>

              {jdResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-muted-foreground">Match Score</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{jdResult.atsMatchScore}%</span>
                  </div>
                  
                  {jdResult.missingSkills?.length > 0 && (
                    <div>
                      <span className="text-sm text-red-500 dark:text-red-405 font-medium flex items-center gap-1 mb-2">
                        <AlertCircle className="w-4 h-4" /> Missing Skills
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {jdResult.missingSkills.map((s: string) => (
                          <span key={s} className="bg-red-500/10 dark:bg-red-500/20 text-red-650 dark:text-red-300 border border-red-500/25 dark:border-transparent px-2.5 py-1 rounded text-xs font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {jdResult.suggestions && (
                    <ul className="text-sm text-foreground space-y-2 mt-4 bg-muted/40 border border-border p-4 rounded-lg">
                      {jdResult.suggestions.map((s: string, i: number) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Dream Company Analyzer */}
          <Card className="bg-card border-border text-card-foreground shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 dark:bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Building className="w-5 h-5 text-purple-500 dark:text-purple-405" /> Resume vs Dream Company
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-background border border-border text-foreground rounded-md h-10 px-3 outline-none text-sm"
              >
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'].map(c => (
                  <option key={c} value={c} className="bg-card text-foreground">{c}</option>
                ))}
              </select>
              <Button 
                onClick={handleCompanyAnalysis} 
                disabled={companyLoading} 
                className="w-full bg-purple-600/10 hover:bg-purple-600/20 dark:bg-purple-600/25 dark:hover:bg-purple-600/35 text-purple-750 dark:text-purple-300 border border-purple-500/30"
              >
                {companyLoading ? "Evaluating..." : `Get ${company} Readiness Score`}
              </Button>

              {companyResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-muted-foreground">Readiness Score</span>
                    <span className="text-xl font-bold text-purple-650 dark:text-purple-400">{companyResult.readinessScore}%</span>
                  </div>
                  
                  {companyResult.recommendations && (
                    <div>
                      <span className="text-sm text-purple-600 dark:text-purple-300 font-semibold mb-2 block">Personalized Recommendations</span>
                      <ul className="text-sm text-foreground space-y-2 bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 p-4 rounded-lg">
                        {companyResult.recommendations.map((r: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span className="text-purple-500 dark:text-purple-400 font-bold">•</span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
