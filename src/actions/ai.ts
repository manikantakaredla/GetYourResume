'use server';

import { TargetRole, ResumeData } from '@/types/resume';

const callGemini = async (prompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export async function generateSummary(targetRole: TargetRole, experienceDescriptions: string[]) {
  const prompt = `You are an expert resume writer. Write a professional summary for a ${targetRole}. Use the following experience descriptions for context: ${experienceDescriptions.join('\n')}. Keep it under 3 sentences, impactful, ATS-friendly. No first-person pronouns. Return only the summary text.`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult;

  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Results-driven ${targetRole} with a proven track record of delivering scalable solutions. Adept at leveraging modern technologies to optimize system performance and enhance user experience. Strong problem-solving skills with a focus on cross-functional collaboration.`;
}

export async function generateBulletPoints(targetRole: TargetRole, description: string) {
  const prompt = `Convert the following rough experience description into 3 impactful, ATS-friendly bullet points tailored for a ${targetRole} role. Rough description: ${description}. Return ONLY the bullet points, one per line, starting with a dash (-).`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult;

  await new Promise(resolve => setTimeout(resolve, 1500));
  return [
    `- Engineered a scalable architecture resulting in a 30% reduction in API response times.`,
    `- Collaborated with cross-functional teams to deliver 5 major feature releases ahead of schedule.`,
    `- Implemented automated testing protocols, increasing code coverage by 40%.`
  ].join('\n');
}

export async function analyzeJobDescription(jd: string, resumeData: ResumeData) {
  const prompt = `Compare JD to Resume. JD: ${jd}. Data: ${JSON.stringify(resumeData)}. Return ONLY a JSON object (no markdown tags): {"atsMatchScore": 85, "requiredSkills": ["React", "AWS"], "missingSkills": ["Docker"], "keywordMatch": 80, "suggestions": ["Add Docker"]}`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult.replace(/```json/g, '').replace(/```/g, '').trim();

  await new Promise(resolve => setTimeout(resolve, 2000));
  return JSON.stringify({
    atsMatchScore: 67,
    requiredSkills: ["Data Structures", "Algorithms", "React", "Node.js", "REST APIs"],
    missingSkills: ["Data Structures", "Algorithms", "REST APIs"],
    keywordMatch: 60,
    suggestions: [
      "Include more explicit mentions of Data Structures.",
      "Highlight your experience with REST APIs in the projects section."
    ]
  });
}

export async function analyzeDreamCompany(company: string, resumeData: ResumeData) {
  const prompt = `Evaluate candidate data against ${company} hiring bar for a ${resumeData.careerInfo.targetRole}. Data: ${JSON.stringify(resumeData)}. Return ONLY JSON (no markdown): {"readinessScore": 82, "recommendations": ["Improve System Design", "Contribute to Open Source"]}`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult.replace(/```json/g, '').replace(/```/g, '').trim();

  await new Promise(resolve => setTimeout(resolve, 1500));
  return JSON.stringify({
    readinessScore: Math.floor(Math.random() * 30) + 60,
    recommendations: [
      "Focus more on Distributed Systems knowledge.",
      "Enhance project descriptions with measurable impact.",
      "Add an open source contribution to demonstrate collaboration."
    ]
  });
}
