import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { ArrowDown } from 'lucide-react';
import TextDecode from './magic/TextDecode';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for work
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.9]">
            <span className="block text-zinc-500">Hello, I'm</span>
            <span className="block text-white">
              <TextDecode text={PERSONAL_INFO.name.split(' ')[0]} />
            </span>
            <span className="block text-zinc-400">{PERSONAL_INFO.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              <TextDecode text={PERSONAL_INFO.role} className="text-white" /> based in <span className="text-white">{PERSONAL_INFO.location}</span>. 
              {PERSONAL_INFO.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-8">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors"
            >
              Get in touch
            </a>
            <a 
              href="#projects" 
              className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors"
            >
              View Work
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
