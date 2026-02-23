
import React from 'react';
import { Mail, Github, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      href: 'https://github.com/Prajapatidev99',
      color: '#a855f7',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      href: 'https://www.linkedin.com/in/dev-prajapati-4492b7370',
      color: '#3b82f6',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      href: 'https://wa.me/919974221322',
      color: '#22c55e',
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      href: 'mailto:prajapatidev9974@gmail.com',
      color: '#f97316',
    },
  ];

  return (
    <div className="text-center py-6 sm:py-10" id="contact">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-10 sm:mb-16"
      >
        Connect
      </motion.h2>

      <motion.h3
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-10 sm:mb-16 md:mb-24 leading-[0.9]"
      >
        Let's build <span className="opacity-20 italic">something</span><br />remarkable together.
      </motion.h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
        {socialLinks.map((link, idx) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 glass rounded-2xl sm:rounded-[2.5rem] group relative overflow-hidden
              transition-[background-color,color] duration-300 ease-out"
          >
            {/* Hover gradient background */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-[2.5rem]"
              style={{
                background: `linear-gradient(135deg, ${link.color}15, transparent, ${link.color}08)`,
              }}
            />

            {/* Glow dot */}
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
