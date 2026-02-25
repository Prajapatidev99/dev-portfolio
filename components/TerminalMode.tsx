
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Terminal Line Types ──────────────────────────────────────────────────────
interface TermLine {
    type: 'input' | 'output' | 'error' | 'success' | 'ascii';
    text: string;
}

const ASCII_BANNER = `
██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██║   ██║
██║  ██║██╔══╝  ╚██╗ ██╔╝
██████╔╝███████╗ ╚████╔╝
╚═════╝ ╚══════╝  ╚═══╝  Portfolio v1.0
`;

const HELP_TEXT = `
Available commands:
  about        → Navigate to About section
  skills       → Navigate to Skills section
  projects     → Navigate to Projects section
  certifications → Navigate to Certifications
  contact      → Navigate to Contact section
  home         → Back to top
  whoami       → About Dev Prajapati
  tech         → Tech stack used
  social       → Social links
  clear        → Clear terminal
  help         → Show this help
  exit         → Close terminal
`;

const WHOAMI_TEXT = `
 Name:     Dev Prajapati
 Role:     Web Developer & System Analyst
 Location: Ahmedabad, Gujarat, India
 Status:   Available for opportunities
 Focus:    High-performance digital solutions
`;

const TECH_TEXT = `
 Frontend:  React, TypeScript, Tailwind CSS
 Backend:   Node.js, Python, Express
 Tools:     Git, VS Code, Figma
 Interests: Automation, Security Systems
`;

const SOCIAL_TEXT = `
 GitHub:   github.com/Prajapatidev99
 LinkedIn: linkedin.com/in/dev-prajapati
 Email:    Use the contact form on the site
`;

// ─── Terminal Toggle Button ───────────────────────────────────────────────────
const TerminalToggle: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
        style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(52,211,153,0.3)' }}
        whileTap={{ scale: 0.95 }}
        title="Open Terminal Mode"
    >
        <Terminal size={20} />
    </motion.button>
);

// ─── Main Terminal Mode Component ─────────────────────────────────────────────
const TerminalMode: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lines, setLines] = useState<TermLine[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && lines.length === 0) {
            setLines([
                { type: 'ascii', text: ASCII_BANNER },
                { type: 'success', text: '  Welcome to Dev\'s Portfolio Terminal!' },
                { type: 'output', text: '  Type "help" for available commands.\n' },
            ]);
        }
    }, [isOpen]);

    const scrollToSection = useCallback((id: string, label: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return [{ type: 'success' as const, text: `  → Navigating to ${label}...` }];
        }
        return [{ type: 'error' as const, text: `  ✗ Section "${id}" not found.` }];
    }, []);

    const processCommand = useCallback((cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        if (!trimmed) return;

        const newLines: TermLine[] = [{ type: 'input', text: `dev@portfolio:~$ ${cmd}` }];

        switch (trimmed) {
            case 'help': case 'h':
                newLines.push({ type: 'output', text: HELP_TEXT }); break;
            case 'about':
                newLines.push(...scrollToSection('about', 'About')); break;
            case 'skills':
                newLines.push(...scrollToSection('skills', 'Skills')); break;
            case 'projects':
                newLines.push(...scrollToSection('projects', 'Projects')); break;
            case 'certifications': case 'certs':
                newLines.push(...scrollToSection('certifications', 'Certifications')); break;
            case 'contact':
                newLines.push(...scrollToSection('contact', 'Contact')); break;
            case 'home': case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                newLines.push({ type: 'success', text: '  → Navigating to Home...' }); break;
            case 'whoami':
                newLines.push({ type: 'output', text: WHOAMI_TEXT }); break;
            case 'tech': case 'stack':
                newLines.push({ type: 'output', text: TECH_TEXT }); break;
            case 'social': case 'links':
                newLines.push({ type: 'output', text: SOCIAL_TEXT }); break;
            case 'clear': case 'cls':
                setLines([]); setInput(''); return;
            case 'exit': case 'quit': case 'q':
                setIsOpen(false); setLines([]); setInput(''); return;
            case 'sudo rm -rf /':
                newLines.push({ type: 'error', text: '  Nice try 😄 — Permission denied!' }); break;
            case 'ls':
                newLines.push({ type: 'output', text: '  about/  skills/  projects/  certifications/  contact/' }); break;
            case 'pwd':
                newLines.push({ type: 'output', text: '  /home/dev/portfolio' }); break;
            case 'date':
                newLines.push({ type: 'output', text: `  ${new Date().toLocaleString()}` }); break;
            default:
                newLines.push({ type: 'error', text: `  Command not found: ${trimmed}. Type "help" for commands.` });
        }

        setLines(prev => [...prev, ...newLines]);
        setInput('');
        setCommandHistory(prev => [cmd, ...prev]);
        setHistoryIndex(-1);
    }, [scrollToSection]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            processCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const idx = historyIndex + 1;
                setHistoryIndex(idx);
                setInput(commandHistory[idx]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const idx = historyIndex - 1;
                setHistoryIndex(idx);
                setInput(commandHistory[idx]);
            } else { setHistoryIndex(-1); setInput(''); }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const cmds = ['about', 'skills', 'projects', 'certifications', 'contact', 'home', 'whoami', 'tech', 'social', 'clear', 'help', 'exit'];
            const match = cmds.find(c => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    const lineColor = (type: TermLine['type']) => {
        switch (type) {
            case 'input': return 'text-emerald-400';
            case 'error': return 'text-red-400';
            case 'success': return 'text-cyan-400';
            case 'ascii': return 'text-emerald-500/80';
            default: return 'text-zinc-400';
        }
    };

    return (
        <>
            {!isOpen && <TerminalToggle onClick={() => setIsOpen(true)} />}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[480px] md:w-[540px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden"
                        style={{
                            background: 'rgba(10, 10, 10, 0.95)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)',
                        }}
                    >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between px-4 py-3 select-none" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <button onClick={() => { setIsOpen(false); setLines([]); }} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" />
                                    <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <span className="text-[11px] text-zinc-500 font-mono ml-2 tracking-wide">dev@portfolio — bash</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsOpen(false)} className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"><Minimize2 size={13} /></button>
                                <button onClick={() => { setIsOpen(false); setLines([]); }} className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"><X size={13} /></button>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed"
                            onClick={() => inputRef.current?.focus()}
                            style={{ minHeight: '250px', maxHeight: 'calc(70vh - 100px)' }}
                        >
                            {lines.map((line, i) => (
                                <div key={i} className={`${lineColor(line.type)} whitespace-pre-wrap`}>{line.text}</div>
                            ))}

                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-emerald-400 shrink-0">dev@portfolio:~$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent outline-none text-white caret-emerald-400 font-mono text-xs sm:text-sm"
                                    spellCheck={false}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                />
                                <span className="w-2 h-4 bg-emerald-400/70 animate-pulse rounded-sm" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TerminalMode;
