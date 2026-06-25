import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto pointer-events-none"
    >
      <div className="pointer-events-auto">
        <span className="font-bold text-xl tracking-tight text-white">Pavan Srinivas Mamidala</span>
      </div>

      <div className="pointer-events-auto flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#projects" className="hover:text-white transition-colors">Work</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        
        <a 
          href="/resume.pdf" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors"
        >
          <FileText size={16} />
          <span>Resume</span>
        </a>
      </div>
    </motion.header>
  );
}
