import React from 'react';
import { ResumeData } from '@/types/resume';
import { Github, Linkedin, Mail, ExternalLink, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortfolioTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, careerInfo, experience, projects, skills, education } = data;
  
  const isDark = ['Modern Dark', 'Developer Portfolio', 'Gradient Premium', 'Glassmorphism'].includes(data.theme);
  
  const bgClass = data.theme === 'Gradient Premium' ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white' :
                  data.theme === 'Developer Portfolio' ? 'bg-[#0a0a0a] text-green-400 font-mono' :
                  data.theme === 'Glassmorphism' ? 'bg-slate-900 text-white' :
                  isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900';
                  
  const cardBg = data.theme === 'Glassmorphism' ? 'bg-white/10 backdrop-blur-md border border-white/20' : 
                 isDark ? 'bg-neutral-900/50 border border-neutral-800' : 'bg-white border border-neutral-200 shadow-sm';

  return (
    <div className={`min-h-screen ${bgClass} selection:bg-blue-500/30`}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-inherit border-b border-inherit/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">
            {personalInfo.firstName} {personalInfo.lastName}
          </div>
          <div className="flex gap-4">
            {personalInfo.github && <a href={`https://${personalInfo.github}`} target="_blank" className="opacity-70 hover:opacity-100"><Github className="w-5 h-5"/></a>}
            {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" className="opacity-70 hover:opacity-100"><Linkedin className="w-5 h-5"/></a>}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hi, I'm {personalInfo.firstName}.
            </h1>
            <h2 className="text-2xl md:text-4xl opacity-70">
              {careerInfo.targetRole} based in {personalInfo.location}.
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg max-w-2xl opacity-80 leading-relaxed">
            {careerInfo.summary}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-4 pt-4">
            <a href={`mailto:${personalInfo.email}`} className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition">
              <Mail className="w-4 h-4" /> Get in touch
            </a>
          </motion.div>
        </section>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <h3 className="text-3xl font-bold">Experience</h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className={`p-8 rounded-2xl ${cardBg} transition-transform hover:-translate-y-1`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                    <div>
                      <h4 className="text-xl font-bold">{exp.role}</h4>
                      <div className="text-lg opacity-80">{exp.company}</div>
                    </div>
                    <div className="opacity-60 text-sm font-medium">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <ul className="space-y-2 opacity-80 text-sm md:text-base">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2"><span className="text-blue-500">•</span> {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <h3 className="text-3xl font-bold">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className={`p-8 rounded-2xl flex flex-col h-full ${cardBg}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold">{proj.name}</h4>
                    <div className="flex gap-3">
                      {proj.github && <a href={`https://${proj.github}`} target="_blank" className="opacity-50 hover:opacity-100"><Github className="w-5 h-5"/></a>}
                      {proj.live && <a href={`https://${proj.live}`} target="_blank" className="opacity-50 hover:opacity-100 text-blue-500"><ExternalLink className="w-5 h-5"/></a>}
                    </div>
                  </div>
                  <ul className="space-y-2 opacity-80 text-sm flex-1 mb-6">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2"><span className="text-purple-500">•</span> {b}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-inherit/10">
                    {proj.technologies.map(t => (
                      <span key={t} className="px-2 py-1 bg-inherit border border-inherit/20 rounded text-xs opacity-80">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Education */}
        <div className="grid md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Skills</h3>
            <div className="space-y-4">
              {Object.entries(skills).map(([category, list]) => {
                if (!list.length) return null;
                return (
                  <div key={category}>
                    <div className="text-sm uppercase tracking-wider opacity-60 mb-2 font-semibold">{category}</div>
                    <div className="flex flex-wrap gap-2">
                      {list.map(skill => (
                        <span key={skill} className={`px-3 py-1.5 rounded-full text-sm ${cardBg}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Education</h3>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-blue-500/30">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2" />
                  <h4 className="text-lg font-bold">{edu.college}</h4>
                  <div className="opacity-80">{edu.degree} in {edu.branch}</div>
                  <div className="text-sm opacity-60 mt-1">{edu.startDate} - {edu.endDate} • CGPA: {edu.cgpa}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center opacity-50 text-sm border-t border-inherit/10">
        © {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}. Built with ResumeForge AI.
      </footer>
    </div>
  );
}
