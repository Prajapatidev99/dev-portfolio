
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-8 pb-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 sm:mb-8" />

        {/* ── Content ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-zinc-600 font-medium">
            © {new Date().getFullYear()} Dev Prajapati. Built for speed and impact.
          </p>

          <p className="text-xs text-zinc-700 flex items-center gap-1.5">
            Made with <span className="heartbeat text-base">❤️</span> in Ahmedabad
          </p>

          <div className="flex gap-6 sm:gap-8 font-bold uppercase tracking-widest text-[10px] text-zinc-600">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>

      {/* ── Animated Wave Divider (below content) ── */}
      <div className="wave-divider mt-6 sm:mt-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-40 sm:h-52 md:h-60">
          <path
            className="wave-path-1"
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
            fill="rgba(168,85,247,0.05)"
          />
          <path
            className="wave-path-2"
            d="M0,80 C240,20 480,100 720,60 C960,20 1200,100 1440,80 L1440,120 L0,120 Z"
            fill="rgba(236,72,153,0.03)"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
