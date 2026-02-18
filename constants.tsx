
import { Project, SkillGroup } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Dev Mobile Website',
    description: 'A professional business website for a mobile service center in Ahmedabad.',
    longDescription: 'This project involved creating a full-featured digital presence for a mobile sales and service hub. Key features include a dynamic service catalog, real-time contact integration, and a mobile-first responsive design tailored for local customers. Built using Next.js for SEO and performance.',
    images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1556656793-062ff987b50d?auto=format&fit=crop&q=80&w=800'],
    liveLink: 'https://devmobile.shop',
    githubLink: 'https://github.com/Prajapatidev99/DEV-MOBILE-SALES',
    tags: ['Next.js', 'Tailwind', 'Business'],
    type: 'web'
  },
  {
    id: '2',
    title: 'EMI Secure System',
    description: 'Advanced phone EMI tracking and security software for finance providers.',
    longDescription: 'EMI Secure is a specialized system designed for mobile finance businesses. It provides automated tracking of device payments and includes security protocols to lock devices or restrict functionality if payment terms are violated. It features a robust dashboard for administrators to monitor thousands of devices.',
    images: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'],
    liveLink: 'https://emi-secure-system.vercel.app/',
    githubLink: 'https://github.com/Prajapatidev99/emi-secure-system',
    tags: ['React', 'Security', 'Tracking'],
    type: 'system'
  },
  {
    id: '3',
    title: 'WordPress College Website',
    description: 'Full-scale educational platform built using deep WordPress theme customization.',
    longDescription: 'Developed a comprehensive website for a local college, focusing on academic resource accessibility and student information systems. Leveraged WordPress for its robust content management capabilities while building custom PHP components for academic results and faculty directories.',
    tags: ['WordPress', 'PHP', 'Education'],
    type: 'web'
  },
  {
    id: '4',
    title: 'Python Automation Projects',
    description: 'Suite of automation scripts using Selenium for web scraping and data manipulation.',
    longDescription: 'A collection of Python-based tools designed to eliminate repetitive tasks. Includes a Selenium-powered web scraper for market research, automated Excel reporting scripts, and a custom file organizer. These tools emphasize efficiency and error handling in high-volume data environments.',
    tags: ['Python', 'Selenium', 'Automation'],
    type: 'automation'
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Next.js']
  },
  {
    category: 'Backend',
    skills: ['Python', 'PL/SQL', 'Node.js (Basic)']
  },
  {
    category: 'Database',
    skills: ['MySQL', 'Oracle SQL']
  },
  {
    category: 'Tools',
    skills: ['GitHub', 'Vercel', 'Selenium']
  }
];
