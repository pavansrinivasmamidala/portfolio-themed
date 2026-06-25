import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILLS } from '../../data';

interface Command {
  input: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    { input: 'welcome', output: 'Welcome to Pavan\'s Terminal. Type "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-[100px_1fr] gap-2 text-emerald-400">
            <span>about</span><span>Display information about me</span>
            <span>projects</span><span>List my projects</span>
            <span>skills</span><span>List my technical skills</span>
            <span>contact</span><span>Show contact information</span>
            <span>clear</span><span>Clear the terminal</span>
            <span>exit</span><span>Close the terminal</span>
          </div>
        );
        break;
      case 'about':
        output = (
          <div className="space-y-2">
            <p>{PERSONAL_INFO.bio}</p>
            <p className="text-zinc-400">Based in: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="space-y-4">
            {PROJECTS.map(p => (
              <div key={p.title} className="border-l-2 border-emerald-500 pl-4">
                <div className="text-emerald-400 font-bold">{p.title}</div>
                <div className="text-sm text-zinc-400">{p.description}</div>
                <div className="text-xs text-zinc-500 mt-1">Tech: {p.tech.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="grid grid-cols-2 gap-4">
            {SKILLS.map(s => (
              <div key={s.category}>
                <div className="text-emerald-500 font-bold mb-1">{s.category}</div>
                <div className="text-zinc-400 text-sm">{s.items.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="space-y-1">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: {PERSONAL_INFO.phone}</div>
            <div className="flex gap-2 mt-2">
              {PERSONAL_INFO.socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">{s.name}</a>
              ))}
            </div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      case '':
        return;
      default:
        output = <span className="text-red-400">Command not found: {trimmedCmd}. Type "help" for available commands.</span>;
    }

    setHistory(prev => [...prev, { input: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-zinc-900 border border-emerald-500/30 text-emerald-500 rounded-full hover:bg-emerald-500/10 hover:scale-110 transition-all shadow-lg shadow-emerald-500/10"
        title="Open Terminal (Cmd+K)"
      >
        <TerminalIcon size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col w-full ${isMaximized ? 'h-full m-0' : 'max-w-3xl max-h-[600px] h-[500px]'}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400" />
                    <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400" />
                    <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400" />
                  </div>
                  <span className="ml-3 text-xs text-zinc-400 font-mono">user@portfolio:~</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-zinc-300">
                    {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="hover:text-zinc-300">
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div 
                className="flex-1 p-4 overflow-y-auto font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                <div className="space-y-4">
                  {history.map((entry, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <span className="text-emerald-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <span>{entry.input}</span>
                      </div>
                      <div className="pl-6 text-zinc-300 leading-relaxed">
                        {entry.output}
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-blue-400">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-600"
                    autoFocus
                  />
                </form>
                <div ref={bottomRef} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
