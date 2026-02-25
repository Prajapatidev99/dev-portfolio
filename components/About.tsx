
import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Word-by-word blur reveal (Apple style) ───────────────────────────────────
const BlurRevealWords: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text, className = '', delay = 0,
}) => {
  const words = text.split(' ');
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const About: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      <div>
        <motion.h2
          className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Discovery
        </motion.h2>

        <h3 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
          <BlurRevealWords text="Crafting experiences that bridge" />
          {' '}
          <BlurRevealWords className="text-zinc-500" text="pure functionality" delay={0.3} />
          {' '}
          <BlurRevealWords text="and modern aesthetics." delay={0.6} />
        </h3>
      </div>

      <div className="space-y-8">
        <motion.p
          className="text-base sm:text-xl text-zinc-400 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Based in Ahmedabad, I specialize in crafting digital experiences that bridge functionality and aesthetics. Currently mastering Python and system analysis to build more robust, scalable infrastructures.
        </motion.p>
        <motion.p
          className="text-base sm:text-xl text-zinc-400 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          My portfolio spans from high-converting commercial platforms to mission-critical security systems. I believe in code that is as beautiful as the interface it powers.
        </motion.p>

        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-4 text-white group"
          >
            <span className="text-base sm:text-lg font-bold border-b-2 border-white/20 group-hover:border-white transition-all pb-1">Download Curriculum Vitae</span>
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
              <Download size={20} />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
