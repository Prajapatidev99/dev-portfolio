
import React, { useRef, useState, useEffect } from 'react';
import { ArrowDownRight, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── Floating Particle ───────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: (i / 20) * 8,
  x: (i / 20) * 100,
  size: 2 + (i % 3),
  color: ['#ffffff55', '#a78bfa66', '#38bdf866', '#f472b666', '#34d39966'][i % 5],
}));

const Particle: React.FC<{ delay: number; x: number; size: number; color: string }> = ({
  delay, x, size, color,
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, bottom: '-10px', width: size, height: size, background: color }}
    animate={{ y: [0, -1200], opacity: [0, 0.9, 0] }}
    transition={{ duration: 7 + (size * 1.5), delay, repeat: Infinity, ease: 'linear' }}
  />
);

// ─── Glitch Text ─────────────────────────────────────────────────────────────
const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => {
          setGlitch(false);
          schedule();
        }, 180);
      }, 3500 + Math.random() * 2500);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      {text}
      {glitch && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: '#ff0055',
              clipPath: 'inset(15% 0 55% 0)',
              transform: 'translateX(-5px)',
              mixBlendMode: 'screen',
            }}
          >{text}</span>
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              color: '#00ffff',
              clipPath: 'inset(55% 0 8% 0)',
              transform: 'translateX(5px)',
              mixBlendMode: 'screen',
            }}
          >{text}</span>
        </>
      )}
    </span>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll parallax ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const springPhotoY = useSpring(photoY, { stiffness: 50, damping: 18 });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background photo with scroll parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: springPhotoY, scale: photoScale }}
      >
        <img
          src="/hero-photo.png"
          alt="Dev Prajapati"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
          draggable={false}
        />
      </motion.div>

      {/* ── Overlays — balanced so image stays visible ── */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* ── CRT Scanlines ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {PARTICLES.map(p => <Particle key={p.id} {...p} />)}
      </div>

      {/* ── Location badge (top-right) ── */}
      <motion.div
        className="absolute top-20 sm:top-24 right-4 sm:right-8 md:right-14 z-20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <div className="flex flex-col items-end gap-1.5">
          <div
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-white/80 tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <MapPin size={10} className="text-rose-400 shrink-0" />
            Ahmedabad, India
          </div>
          <div className="text-[9px] text-white/25 tracking-widest uppercase pr-1">
            Gujarat · Satellite
          </div>
        </div>
      </motion.div>

      {/* ── Main text content ── */}
      <motion.div
        className="relative z-20 w-full px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28"
        style={{ y: textY }}
      >
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-zinc-300 mb-6 sm:mb-10"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            Available for new opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.88] mb-5 sm:mb-8"
          >
            <GlitchText text="Web Dev." className="block text-white" />
            <span className="block text-white/20 mt-1 sm:mt-2">System Analyst.</span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-sm sm:max-w-md md:max-w-xl mb-8 sm:mb-12 leading-relaxed font-light"
          >
            Building high-performance digital solutions. Exploring Python, automation &amp; security systems from Ahmedabad.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3 sm:gap-5"
          >
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(255,255,255,0.22)' }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold inline-flex items-center gap-2 sm:gap-3 shadow-2xl text-xs sm:text-sm tracking-wide"
            >
              View Projects
              <ArrowDownRight size={16} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-wide text-white"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div
          className="flex items-center justify-between px-5 sm:px-8 md:px-12 py-4 sm:py-5"
          style={{
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-6 sm:gap-10 md:gap-16">
            {[
              { num: '4+', label: 'Projects' },
              { num: '2+', label: 'Yrs Exp' },
              { num: '∞', label: 'Lines' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-black text-white">{stat.num}</div>
                <div className="text-[9px] sm:text-[10px] text-zinc-500 tracking-widest uppercase mt-0.5 whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>

          <motion.a
            whileHover={{ y: -3 }}
            href="#about"
            className="p-2.5 sm:p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all group"
          >
            <ArrowDownRight
              className="rotate-45 text-zinc-500 group-hover:text-white transition-colors"
              size={18}
            />
          </motion.a>
        </div>
      </motion.div>

      {/* ── Dot grid decoration (desktop only) ── */}
      <div className="absolute top-24 left-10 z-20 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="flex flex-col gap-1.5"
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-1.5">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-1 h-1 rounded-full bg-white/10" />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
