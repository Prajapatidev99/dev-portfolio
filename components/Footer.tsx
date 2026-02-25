
import React from 'react';
import { motion } from 'framer-motion';

// ─── Letter-by-letter reveal ──────────────────────────────────────────────────
const RevealText: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const letters = text.split('');
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-block ${className}`}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.4,
                delay: delay + i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  return (
    <footer className="relative pt-8 pb-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 sm:mb-8" />

        {/* ── Animated Typography Reveal ── */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 mb-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl text-white flex flex-wrap justify-center items-center gap-x-3 gap-y-2 leading-none">
              <RevealText text="Thanks" className="font-['Syne'] font-extrabold tracking-tighter uppercase" />
              <RevealText text="for" className="font-['Playfair_Display'] italic font-bold tracking-normal" delay={0.2} />
              <RevealText text="visiting" className="font-['Syne'] font-extrabold tracking-tighter uppercase" delay={0.4} />
              <RevealText text="my" className="font-['Playfair_Display'] italic font-bold tracking-normal" delay={0.6} />
            </h3>
            <div className="mt-2 sm:mt-4 flex items-center justify-center">
              <RevealText text="portfolio" className="font-['Caveat'] text-6xl sm:text-8xl md:text-9xl text-emerald-400 rotate-[-4deg] leading-none" delay={0.8} />
              <RevealText text="✨" className="text-4xl sm:text-5xl md:text-6xl ml-2 sm:ml-6 mt-4 sm:mt-8" delay={1.2} />
            </div>
          </div>
          <p className="text-sm sm:text-base text-zinc-500 font-light">
            <RevealText text="Let's build something amazing together." delay={1.5} />
          </p>
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
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
        </motion.div>
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
