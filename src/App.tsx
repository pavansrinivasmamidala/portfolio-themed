import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Sparkles } from 'lucide-react';

// Themes
import BrutalistTheme from './components/brutalist/BrutalistTheme';
import SwissTheme from './components/swiss/SwissTheme';
import NoirTheme from './components/noir/NoirTheme';

// Editorial Components
import EditorialHero from './components/editorial/Hero';
import EditorialAbout from './components/editorial/About';
import EditorialWork from './components/editorial/Work';
import EditorialSkills from './components/editorial/Skills';
import EditorialContact from './components/editorial/Contact';
import EditorialExperience from './components/editorial/Experience';

// Wrap original editorial components in a single component for cleaner switching
function EditorialWrapper() {
  return (
    <main className="bg-[#F2F0E9] min-h-screen w-full overflow-x-hidden">
      <EditorialHero />
      <EditorialAbout />
      <EditorialExperience />
      <EditorialWork />
      <EditorialSkills />
      <EditorialContact />
    </main>
  );
}

type Theme = 'editorial' | 'brutalist' | 'swiss' | 'noir';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('editorial');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  
  // Intro Animation States
  const [introState, setIntroState] = useState<'theme' | 'text' | 'done'>('theme');
  const [introText, setIntroText] = useState('');
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let timeouts: NodeJS.Timeout[] = [];
    let isMounted = true;

    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    const sequence = [
      { type: 'theme', theme: 'editorial', delay: 0 },
      { type: 'text', text: '1 PORTFOLIO', delay: 700 },
      { type: 'theme', theme: 'brutalist', delay: 1600 },
      { type: 'text', text: '4 THEMES', delay: 2300 },
      { type: 'theme', theme: 'swiss', delay: 3200 },
      { type: 'text', text: '1 CLICK', delay: 3900 },
      { type: 'theme', theme: 'noir', delay: 4800 },
      { type: 'text', text: 'CHOOSE YOUR VIBE', delay: 5500 },
      { type: 'done', theme: 'editorial', delay: 6800 },
    ];

    sequence.forEach(({ type, theme, text, delay }) => {
      const t = setTimeout(() => {
        if (!isMounted) return;
        
        if (type === 'theme') {
          setIntroState('theme');
          setCurrentTheme(theme as Theme);
        } else if (type === 'text') {
          setIntroState('text');
          setIntroText(text as string);
        } else if (type === 'done') {
          setIntroState('done');
          setIsIntroComplete(true);
          setCurrentTheme(theme as Theme);
          document.body.style.overflow = 'auto'; // Restore scrolling
          
          const t2 = setTimeout(() => { if(isMounted) setShowTooltip(true); }, 500);
          const t3 = setTimeout(() => { if(isMounted) setShowTooltip(false); }, 8000);
          timeouts.push(t2, t3);
        }
      }, delay);
      timeouts.push(t);
    });

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const themes = [
    { id: 'editorial', name: 'Editorial', color: '#F2F0E9', textColor: '#18181B' },
    { id: 'brutalist', name: 'Brutalist', color: '#FFDE00', textColor: '#000000' },
    { id: 'swiss', name: 'Swiss Grid', color: '#FFFFFF', textColor: '#1a1a1a' },
    { id: 'noir', name: 'Cinematic Noir', color: '#0a0a0a', textColor: '#e5e5e5' },
  ];

  return (
    <>
      {/* Intro Overlay */}
      <AnimatePresence>
        {!isIntroComplete && introState === 'text' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.h1
              key={introText}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-5xl md:text-[8vw] font-black text-white text-center uppercase tracking-tighter leading-none px-4"
            >
              {introText}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher UI */}
      <div className="fixed bottom-6 left-6 z-[100] flex items-center">
        <div className="relative">
          {/* Pulsing ring */}
          {showTooltip && !isSwitcherOpen && (
            <span className="absolute inset-0 rounded-2xl bg-[#FF4F00] animate-ping opacity-75 duration-1000"></span>
          )}
          <motion.div 
            initial={false}
            animate={{ height: isSwitcherOpen ? 'auto' : '48px', width: isSwitcherOpen ? 'auto' : '48px' }}
            className="relative bg-black text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10"
          >
            {!isSwitcherOpen ? (
              <button 
                onClick={() => {
                  setIsSwitcherOpen(true);
                  setShowTooltip(false);
                }}
                className="w-full h-full flex items-center justify-center hover:bg-white/10 transition-colors"
                title="Change Theme"
              >
                <Palette size={20} />
              </button>
            ) : (
              <div className="p-4 min-w-[200px]">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/20">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">Select Theme</span>
                  <button onClick={() => setIsSwitcherOpen(false)} className="text-xs hover:text-white/60">Close</button>
                </div>
                <div className="space-y-2">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setCurrentTheme(theme.id as Theme);
                        setIsSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${currentTheme === theme.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20" 
                        style={{ backgroundColor: theme.color }}
                      />
                      <span className="text-sm font-medium">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isSwitcherOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-[60px] bg-[#FF4F00] text-white px-4 py-3 rounded-xl font-medium whitespace-nowrap flex items-center gap-2 shadow-2xl origin-left"
            >
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 border-y-8 border-y-transparent border-r-8 border-r-[#FF4F00]" />
              <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
              <span>Change the design here!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Renderer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTheme === 'editorial' && <EditorialWrapper />}
          {currentTheme === 'brutalist' && <BrutalistTheme />}
          {currentTheme === 'swiss' && <SwissTheme />}
          {currentTheme === 'noir' && <NoirTheme />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
