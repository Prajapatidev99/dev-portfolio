
import React, { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
  tags: string[];
  isComingSoon?: boolean;
}

const certificates: Certificate[] = [
  {
    title: 'Data Analytics and Visualization Job Simulation',
    issuer: 'Accenture North America · Forage',
    date: 'July 2025',
    description:
      'Completed a job simulation involving data analytics and visualization for a social media client. Cleaned and modelled datasets to uncover content trends, and prepared a PowerPoint deck and video presentation to communicate key insights to stakeholders.',
    credentialUrl:
      'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_Lo5uHfbvvTpdeLN5a_1751994439112_completion_certificate.pdf',
    tags: ['Data Analytics', 'Data Visualization', 'Excel', 'PowerPoint', 'Storytelling'],
  },
  {
    title: 'Web Development Fundamentals',
    issuer: 'Self-Paced / Online Certification',
    date: '',
    description: 'Focused on responsive design principles and modern JavaScript frameworks.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

// ─── Typewriter heading animation (Framer Motion) ──────────────────────────────
const typewriterParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const typewriterChild = {
  hidden: { opacity: 0, display: 'none' },
  visible: { opacity: 1, display: 'inline-block' },
};

const TypewriterText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`inline-flex items-center ${className}`}
      variants={typewriterParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10px' }}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={typewriterChild}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-white/60 ml-0.5"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </motion.span>
  );
};

const Certifications: React.FC = () => {
  return (
    <div>
      {/* Typewriter heading */}
      <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase mb-12">
        <TypewriterText text="Recognition" />
      </h2>

      <div className="max-w-3xl space-y-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 6 }}
            className="flex items-start gap-6 p-6 rounded-2xl glass group transition-all duration-300 hover:bg-white/5"
          >
            <motion.div
              className="p-3 bg-white/5 rounded-xl shrink-0"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Award className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h4 className="text-lg font-bold mb-1 leading-snug">{cert.title}</h4>
                  <p className="text-zinc-500 text-sm mb-1">{cert.issuer}</p>
                  {cert.date && (
                    <p className="text-zinc-600 text-xs mb-3">{cert.date}</p>
                  )}
                </div>
                {cert.credentialUrl && (
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all duration-200 shrink-0 mt-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink size={12} />
                    View Certificate
                  </motion.a>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{cert.description}</p>
              <div className="flex flex-wrap gap-2">
                {cert.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
