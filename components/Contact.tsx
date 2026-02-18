
import React from 'react';
import { Mail, Github, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      href: 'https://github.com/Prajapatidev99'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      href: 'https://www.linkedin.com/in/dev-prajapati-4492b7370'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      href: 'https://wa.me/919974221322'
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      href: 'mailto:prajapatidev9974@gmail.com'
    },
  ];

  return (
    <div className="text-center py-10" id="contact">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-black tracking-[0.3em] text-zinc-600 uppercase mb-16"
      >
        Connect
      </motion.h2>

      <motion.h3
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-16 sm:mb-24 leading-[0.9]"
      >
        Let's build <span className="opacity-20 italic">something</span><br />remarkable together.
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
            className="flex flex-col items-center justify-center p-8 sm:p-12 glass rounded-[2.5rem] group relative overflow-hidden
              transition-[transform,background-color,color] duration-150 ease-out
              hover:-translate-y-2 hover:bg-white hover:text-black"
          >
            <div className="mb-6 transition-transform duration-150 ease-out group-hover:scale-110">
              {link.icon}
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em]">{link.name}</span>
            <ArrowUpRight size={18} className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
