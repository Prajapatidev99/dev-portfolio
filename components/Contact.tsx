
import React, { useState, useCallback } from 'react';
import { Mail, Github, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Letter scale-rotate reveal (each letter pops in with rotation) ───────────
const PopRevealText: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text, className = '', delay = 0,
}) => {
  const letters = text.split('');
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          variants={{
            hidden: { opacity: 0, scale: 0.3, rotate: -15, y: 30 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: 0,
              transition: {
                duration: 0.45,
                delay: delay + i * 0.025,
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

// ─── Text scramble on hover ───────────────────────────────────────────────────
const ScrambleText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayed, setDisplayed] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

  const handleHover = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span className={className} onHoverStart={handleHover}>
      {displayed}
    </motion.span>
  );
};

const Contact: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={24} />, href: 'https://github.com/Prajapatidev99', color: '#a855f7' },
    { name: 'LinkedIn', icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/dev-prajapati-4492b7370', color: '#3b82f6' },
    { name: 'WhatsApp', icon: <MessageCircle size={24} />, href: 'https://wa.me/919974221322', color: '#22c55e' },
    { name: 'Email', icon: <Mail size={24} />, href: 'mailto:prajapatidev9974@gmail.com', color: '#f97316' },
  ];

  return (
    <div className="text-center py-6 sm:py-10" id="contact">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-10 sm:mb-16"
      >
        Connect
      </motion.h2>

      {/* Big heading: letter pop reveal + scramble on "remarkable" */}
      <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-10 sm:mb-16 md:mb-24 leading-[1.1] sm:leading-[0.9] break-words">
        <PopRevealText text="Let's build " />
        <PopRevealText text="something " className="opacity-20 italic" delay={0.3} />
        <br className="hidden sm:block" />
        <ScrambleText text="remarkable" className="hover:text-zinc-300 transition-colors cursor-default" />
        <br className="block sm:hidden" />
        <PopRevealText text=" together." delay={0.6} />
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
        {socialLinks.map((link, idx) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 glass rounded-2xl sm:rounded-[2.5rem] group relative overflow-hidden
              transition-[background-color,color] duration-300 ease-out"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-[2.5rem]"
              style={{ background: `linear-gradient(135deg, ${link.color}15, transparent, ${link.color}08)` }}
            />
            <div
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: link.color, boxShadow: `0 0 12px ${link.color}` }}
            />
            <div className="relative z-10 mb-3 sm:mb-4 md:mb-6 transition-transform duration-300 ease-out group-hover:scale-110">
              {link.icon}
            </div>
            <span className="relative z-10 text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">{link.name}</span>
            <ArrowUpRight size={16} className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
