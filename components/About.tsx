
import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
    >
      <div>
        <h2 className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-6">Discovery</h2>
        <h3 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
          Crafting experiences that bridge <span className="text-zinc-500">pure functionality</span> and modern aesthetics.
        </h3>
      </div>

      <div className="space-y-8">
        <p className="text-base sm:text-xl text-zinc-400 leading-relaxed font-light">
          Based in Ahmedabad, I specialize in crafting digital experiences that bridge functionality and aesthetics. Currently mastering Python and system analysis to build more robust, scalable infrastructures.
        </p>
        <p className="text-base sm:text-xl text-zinc-400 leading-relaxed font-light">
          My portfolio spans from high-converting commercial platforms to mission-critical security systems. I believe in code that is as beautiful as the interface it powers.
        </p>

        <div className="pt-6">
          <motion.a
            whileHover={{ x: 5 }}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-4 text-white group"
          >
            <span className="text-base sm:text-lg font-bold border-b-2 border-white/20 group-hover:border-white transition-all pb-1">Download Curriculum Vitae</span>
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
              <Download size={20} />
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
