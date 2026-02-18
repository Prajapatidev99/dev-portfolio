
import React, { useState, useEffect } from 'react';
import { Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Recognition', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'} bg-black/60 backdrop-blur-xl border-b border-white/5`} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
        <a href="#home" className="dev-logo-wrap" aria-label="DEV">
          <span className="dev-logo-text">DEV</span>
          <span className="dev-logo-glitch" aria-hidden="true">DEV</span>
          <span className="dev-logo-glitch2" aria-hidden="true">DEV</span>
          <span className="dev-logo-dot"><span className="dev-logo-dot-inner">.</span></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
            >
              {link.name}
            </a>
          ))}
          <motion.button
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={onOpenAdmin}
            className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-white/20 transition-all text-zinc-400 hover:text-white"
            title="Admin Settings"
          >
            <Settings size={18} />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="p-3 rounded-full bg-white/5 text-zinc-400"
          >
            <Settings size={18} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-full bg-white/5 text-zinc-400"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full backdrop-blur-2xl border-b border-white/5 py-8 px-6 flex flex-col items-center gap-6 md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .dev-logo-wrap {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          cursor: pointer;
          text-decoration: none;
        }

        .dev-logo-text {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #ffffff;
          position: relative;
          z-index: 2;
        }

        .dev-logo-glitch,
        .dev-logo-glitch2 {
          position: absolute;
          top: 0; left: 0;
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          z-index: 1;
          opacity: 0;
          mix-blend-mode: screen;
        }

        .dev-logo-glitch  { color: #ff003c; }
        .dev-logo-glitch2 { color: #00f0ff; }

        .dev-logo-dot {
          position: relative;
          z-index: 2;
        }

        .dev-logo-dot-inner {
          font-size: 1.5rem;
          font-weight: 900;
          color: #71717a;
        }

        /* ── HOVER: everything fires ── */
        .dev-logo-wrap:hover {
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.3)) drop-shadow(0 0 22px rgba(168,85,247,0.25));
        }

        .dev-logo-wrap:hover .dev-logo-text {
          background: linear-gradient(90deg, #fff 0%, #aaa 40%, #fff 60%, #aaa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: dev-shimmer 0.6s linear infinite, dev-shake 0.12s linear infinite;
        }

        .dev-logo-wrap:hover .dev-logo-glitch {
          animation: dev-glitch-red 0.45s infinite;
        }

        .dev-logo-wrap:hover .dev-logo-glitch2 {
          animation: dev-glitch-blue 0.45s infinite 0.06s;
        }

        .dev-logo-wrap:hover .dev-logo-dot-inner {
          background: linear-gradient(135deg, #ff003c, #ff6a00, #ffde00, #00f0ff, #a855f7);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: dev-dot-rainbow 0.8s linear infinite;
        }

        @keyframes dev-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes dev-glitch-red {
          0%        { opacity: 0; transform: translate(0,0); clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); }
          20%       { opacity: 0.9; transform: translate(-3px, 1px); clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%); }
          45%       { opacity: 0.9; transform: translate(3px, -1px); clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%); }
          70%       { opacity: 0.9; transform: translate(-2px, 2px); clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%); }
          90%, 100% { opacity: 0; transform: translate(0,0); }
        }

        @keyframes dev-glitch-blue {
          0%        { opacity: 0; transform: translate(0,0); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
          20%       { opacity: 0.9; transform: translate(3px, -1px); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
          45%       { opacity: 0.9; transform: translate(-3px, 1px); clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%); }
          70%       { opacity: 0.9; transform: translate(2px, -2px); clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%); }
          90%, 100% { opacity: 0; transform: translate(0,0); }
        }

        @keyframes dev-dot-rainbow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes dev-shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-1px); }
          75%       { transform: translateX(1px); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
