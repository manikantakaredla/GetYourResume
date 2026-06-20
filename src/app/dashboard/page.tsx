'use client';

import { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { analyzeJobDescription, analyzeDreamCompany } from '@/actions/ai';
import { Download, Globe, Briefcase, Building, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ZipExportButton from '@/components/preview/ZipExportButton';

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
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${color}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-neutral-400 font-medium">{label}</span>
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
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resume Health Dashboard</h1>
            <p className="text-neutral-400">Analyze, optimize, and export your professional profile.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/builder">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">Edit Data</Button>
            </Link>
            <Link href="/preview">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
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
        <Card className="bg-[#111] border-white/10 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
                <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {initialScores.overall}
                </div>
                <div className="text-sm text-neutral-400 mt-2 uppercase tracking-widest">ATS Score</div>
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
          <Card className="bg-[#111] border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" /> Job Description Matcher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste the job description here..." 
                className="bg-white/5 border-white/10 min-h-[120px]"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
              <Button 
                onClick={handleJdAnalysis} 
                disabled={jdLoading || !jd} 
                className="w-full bg-white/10 hover:bg-white/20"
              >
                {jdLoading ? "Analyzing..." : "Analyze Match"}
              </Button>

              {jdResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Match Score</span>
                    <span className="text-xl font-bold text-blue-400">{jdResult.atsMatchScore}%</span>
                  </div>
                  
                  {jdResult.missingSkills?.length > 0 && (
                    <div>
                      <span className="text-sm text-red-400 font-medium flex items-center gap-1 mb-2">
                        <AlertCircle className="w-4 h-4" /> Missing Skills
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {jdResult.missingSkills.map((s: string) => (
                          <span key={s} className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {jdResult.suggestions && (
                    <ul className="text-sm text-neutral-300 space-y-2 mt-4 bg-white/5 p-4 rounded-lg">
                      {jdResult.suggestions.map((s: string, i: number) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Dream Company Analyzer */}
          <Card className="bg-[#111] border-white/10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-400" /> Resume vs Dream Company
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-md h-10 px-3 outline-none"
              >
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'].map(c => (
                  <option key={c} value={c} className="bg-neutral-900">{c}</option>
                ))}
              </select>
              <Button 
                onClick={handleCompanyAnalysis} 
                disabled={companyLoading} 
                className="w-full bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30"
              >
                {companyLoading ? "Evaluating..." : `Get ${company} Readiness Score`}
              </Button>

              {companyResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Readiness Score</span>
                    <span className="text-xl font-bold text-purple-400">{companyResult.readinessScore}%</span>
                  </div>
                  
                  {companyResult.recommendations && (
                    <div>
                      <span className="text-sm text-purple-300 font-medium mb-2 block">Personalized Recommendations</span>
                      <ul className="text-sm text-neutral-300 space-y-2 bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg">
                        {companyResult.recommendations.map((r: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span className="text-purple-400">•</span> {r}
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
