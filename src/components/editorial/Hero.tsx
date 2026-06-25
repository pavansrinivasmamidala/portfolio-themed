import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-between p-6 md:p-12 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-[#18181B]" />
          <span className="text-sm uppercase tracking-widest font-medium">Portfolio 2026</span>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] leading-[0.85] font-serif tracking-tight"
          >
            PAVAN
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] leading-[0.85] font-serif tracking-tight ml-[10vw] italic text-[#FF4F00]"
          >
            SRINIVAS
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] leading-[0.85] font-serif tracking-tight text-right"
          >
            MAMIDALA
          </motion.h1>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex justify-between items-end mt-12"
      >
        <div className="max-w-md">
          <p className="text-lg md:text-xl leading-relaxed">
            {PERSONAL_INFO.role} based in {PERSONAL_INFO.location}. 
            Crafting digital narratives through code and design.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <span className="block text-sm uppercase tracking-widest mb-2">Scroll to Explore</span>
          <div className="w-px h-16 bg-[#18181B] mx-auto" />
        </div>
      </motion.div>
    </section>
  );
}
