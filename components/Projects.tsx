
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

// ─── Modal rendered at body level via portal ─────────────────────────────────
const ProjectModal: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        key="modal"
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl custom-scrollbar"
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Inner padding */}
          <div className="p-6 sm:p-10 md:p-14">
            {/* Header row */}
            <div className="flex justify-between items-start mb-10 gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-black bg-white/5 border border-white/10 rounded-full text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="shrink-0 p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Body grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left: text */}
              <div className="lg:col-span-7 flex flex-col">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white tracking-tighter leading-[1.1]">
                  {project.title}
                </h2>
                <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-8 font-light">
                  {project.description}
                </p>
                <p className="text-zinc-500 leading-relaxed text-base mb-10">
                  {project.longDescription ||
                    "A deep dive into this project's architecture and impact is currently being written. Stay tuned for updates on how this solution was implemented."}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all text-white text-sm"
                    >
                      <Github size={18} />
                      Source Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black transition-all text-sm"
                    >
                      <ExternalLink size={18} />
                      Launch Site
                    </a>
                  )}
                </div>
              </div>

              {/* Right: images */}
              <div className="lg:col-span-5 space-y-6">
                {project.images && project.images.length > 0 ? (
                  project.images.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-auto rounded-2xl object-cover border border-white/10"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                    />
                  ))
                ) : (
                  <div className="aspect-video bg-white/[0.02] rounded-2xl flex items-center justify-center border border-white/5 border-dashed">
                    <div className="text-center p-8">
                      <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs mb-2">Visual Showcase</p>
                      <p className="text-zinc-700 italic text-sm">Case study visuals are being prepared.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// ─── Main Projects component ──────────────────────────────────────────────────
const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find(p => p.id === selectedId) ?? null;

  return (
    <div className="relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <h2 className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-4">Selected Work</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h3>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedId(project.id)}
            className="group relative p-6 sm:p-8 md:p-10 rounded-[2rem] cursor-pointer flex flex-col min-h-[300px] sm:min-h-[320px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

            {/* Tags */}
            <div className="relative z-10 flex flex-wrap gap-2 mb-8">
              {project.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black border border-white/10 rounded-full text-zinc-500 bg-white/[0.02] group-hover:text-zinc-300 group-hover:border-white/25 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h4 className="relative z-10 text-2xl md:text-3xl font-bold mb-3 text-zinc-100 group-hover:text-white transition-colors">
              {project.title}
            </h4>

            {/* Description */}
            <p className="relative z-10 text-zinc-500 leading-relaxed mb-8 line-clamp-2 text-base group-hover:text-zinc-400 transition-colors">
              {project.description}
            </p>

            {/* CTA */}
            <div className="relative z-10 mt-auto flex items-center gap-2 text-xs font-bold text-zinc-600 group-hover:text-white transition-colors uppercase tracking-widest">
              View Details
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden rounded-b-[2rem]">
              <motion.div
                className="h-full bg-white/60"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.6, ease: 'circOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedId(null)}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </div>
  );
};

export default Projects;
