'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Layout, Download, Star, Zap, Shield, Sparkles, Globe, Terminal, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState, useEffect } from 'react';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const floatAnimation = {
  animate: {
    y: [0, -10, 0]
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Dynamic Cursor Spotlight (Subtle) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.05), transparent 80%)`
        }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">ResumeForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/builder">
              <Button className="bg-white hover:bg-neutral-200 text-black rounded-full px-5 h-9 font-medium text-sm transition-transform hover:scale-105">
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <motion.a
            href="https://github.com"
            target="_blank"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 mb-8 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
            <span className="font-medium">Introducing ResumeForge AI 2.0</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </motion.a>
          
          <motion.h1 
            {...fadeIn}
            className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 leading-[1.05] max-w-5xl"
          >
            Build your dream <br className="hidden md:block" />
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">resume & portfolio.</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-sm opacity-50"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl font-light leading-relaxed"
          >
            Stop fighting applicant tracking systems. Use AI to perfectly tailor your resume, get live health scores, and instantly generate a personal portfolio website. Zero friction.
          </motion.p>
          
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/builder" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-neutral-200 rounded-full px-8 h-14 text-base font-medium group transition-all">
                Create for free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-medium border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
                <Terminal className="w-4 h-4 mr-2 opacity-50" />
                View Demo
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Hero Interactive Mockup */}
        <section className="max-w-6xl mx-auto mt-24 mb-32 relative perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent z-20 bottom-[-50px] h-[300px] mt-auto pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full" />

            <div className="flex gap-6 items-center z-10 w-full px-4 justify-center">
              
              {/* Left Card: Document Preview */}
              <motion.div {...floatAnimation} className="hidden lg:block w-[320px] h-[450px] rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl p-6 -rotate-6 translate-y-12">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="space-y-6 opacity-70">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20" />
                    <div className="space-y-2 flex-1 pt-1">
                      <div className="h-2.5 w-24 bg-white/30 rounded-full" />
                      <div className="h-2 w-32 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full" />
                      <div className="h-2 w-[85%] bg-white/10 rounded-full" />
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Center Card: Main ATS Score */}
              <div className="w-full max-w-[500px] rounded-2xl border border-white/15 bg-black/60 backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(59,130,246,0.2)] p-8 relative z-20 overflow-hidden ring-1 ring-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-1">Resume Health</h3>
                    <p className="text-sm text-neutral-400">Target: Software Engineer</p>
                  </div>
                  <div className="w-20 h-20 rounded-full border-[6px] border-blue-500/20 border-t-blue-500 flex items-center justify-center bg-blue-500/5 relative shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <span className="font-heading font-bold text-2xl text-white">92</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-neutral-300">Keyword Match</span>
                      <span className="text-green-400">95%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-full bg-green-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-neutral-300">Skills Coverage</span>
                      <span className="text-blue-400">89%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "89%" }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                        className="h-full bg-blue-500 rounded-full" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                      <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-200 leading-relaxed font-light">
                        <strong>AI Insight:</strong> Your project bullets are strong. Consider adding quantifiable metrics to your <em>Google Intern</em> experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: Code / Portfolio */}
              <motion.div {...floatAnimation} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="hidden lg:block w-[320px] h-[450px] rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl p-0 rotate-6 translate-y-12 overflow-hidden flex flex-col">
                <div className="bg-neutral-900 px-4 py-3 border-b border-white/10 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  <div className="text-xs text-neutral-400 font-mono">resumeforge.vercel.app/p/alex</div>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-24 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/5" />
                  <div className="space-y-3">
                    <div className="h-3 w-32 bg-white/30 rounded-full" />
                    <div className="h-2 w-48 bg-white/10 rounded-full" />
                    <div className="h-2 w-40 bg-white/10 rounded-full" />
                  </div>
                  <div className="mt-auto flex gap-2">
                    <div className="h-8 w-20 bg-white/10 rounded-full" />
                    <div className="h-8 w-20 bg-white/10 rounded-full" />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* Brand Logos / Social Proof */}
        <section className="border-y border-white/5 bg-white/[0.02] py-10 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-medium text-neutral-500 tracking-wider uppercase mb-8">
              Trusted by candidates landing offers at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Replace with actual SVG logos in production */}
              <div className="text-xl font-bold font-heading">Google</div>
              <div className="text-xl font-bold font-heading">Meta</div>
              <div className="text-xl font-bold font-heading">Amazon</div>
              <div className="text-xl font-bold font-heading">Netflix</div>
              <div className="text-xl font-bold font-heading">Stripe</div>
              <div className="text-xl font-bold font-heading">Vercel</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 relative z-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">land the job</span></h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                We've combined advanced ATS parsers with generative AI to give you an unfair advantage in the hiring pipeline.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature Cards with hover effects */}
              {[
                { icon: Zap, color: "text-blue-500", title: "ATS Optimizer", desc: "Dynamically tailor your resume to match exact job descriptions and beat robotic filters." },
                { icon: Globe, color: "text-purple-500", title: "Instant Portfolio", desc: "Generate a responsive, beautifully designed static portfolio website in one click." },
                { icon: Shield, color: "text-green-500", title: "Health Scoring", desc: "Get a live 0-100 score analyzing keyword match, skills coverage, and experience." },
                { icon: Sparkles, color: "text-yellow-500", title: "AI Writer", desc: "Let AI rewrite your rough notes into perfect, impactful bullet points automatically." },
                { icon: Layout, color: "text-orange-500", title: "Premium Templates", desc: "Choose from battle-tested layouts designed by FAANG recruiters." },
                { icon: Download, color: "text-pink-500", title: "Seamless Export", desc: "Download pixel-perfect PDFs or zip files of your portfolio instantly." }
              ].map((f, i) => (
                <div key={i} className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                    <ArrowUpRight className="w-6 h-6 text-neutral-500" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{f.title}</h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="py-24 relative z-10 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="p-12 md:p-20 text-center relative z-10">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to stand out?</h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10 font-light">
                Join thousands of candidates who are landing their dream roles with ResumeForge AI. No credit card required. No signup friction.
              </p>
              <Link href="/builder">
                <Button size="lg" className="bg-white text-black hover:bg-neutral-200 rounded-full px-10 h-14 text-base font-medium transition-transform hover:scale-105">
                  Start Building Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 relative z-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="font-heading font-bold tracking-tight">ResumeForge AI</span>
          </div>
          <div className="text-sm text-neutral-500 font-light">
            © {new Date().getFullYear()} ResumeForge AI. Built to win.
          </div>
          <div className="flex gap-6 text-sm text-neutral-500 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
