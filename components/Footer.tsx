
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-sm">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-medium">© {new Date().getFullYear()} Dev Prajapati. Built for speed and impact.</p>
        <div className="flex gap-8 font-bold uppercase tracking-widest text-[10px]">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
