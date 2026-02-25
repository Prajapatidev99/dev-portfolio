
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

// ─── Slide-up stagger reveal (each skill slides in from below) ────────────────
const Skills: React.FC = () => {
  return (
    <div>
      {/* Heading: line-by-line clip reveal */}
      <div className="mb-16 overflow-hidden">
        <motion.h2
          className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-4"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Expertise
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {SKILLS.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: groupIdx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            {/* Category heading: slides in from left */}
            <div className="overflow-hidden">
              <motion.h3
                className="text-xl font-bold mb-8 pb-4 border-b border-white/5 group-hover:border-white/20 transition-all"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: groupIdx * 0.12 + 0.2, duration: 0.5 }}
              >
                {group.category}
              </motion.h3>
            </div>

            <ul className="space-y-4">
              {group.skills.map((skill, idx) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: groupIdx * 0.12 + 0.3 + idx * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group/item text-zinc-500 hover:text-white hover:translate-x-1.5 transition-all duration-200 ease-out cursor-default text-lg flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/item:bg-white/50 group-hover/item:scale-150 transition-all duration-200 ease-out" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
