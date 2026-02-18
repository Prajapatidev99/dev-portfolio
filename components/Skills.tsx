
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <div>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-16"
      >
        Expertise
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {SKILLS.map((group, groupIdx) => (
          <motion.div 
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIdx * 0.1, duration: 0.6 }}
            className="group"
          >
            <h3 className="text-xl font-bold mb-8 pb-4 border-b border-white/5 group-hover:border-white/20 transition-all">
              {group.category}
            </h3>
            <ul className="space-y-4">
              {group.skills.map((skill, idx) => (
                <motion.li 
                  key={skill} 
                  whileHover={{ x: 5, color: "#fff" }}
                  className="text-zinc-500 hover:text-white transition-colors cursor-default text-lg flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
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
