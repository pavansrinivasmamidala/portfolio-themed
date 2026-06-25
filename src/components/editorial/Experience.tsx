import { motion } from 'motion/react';
import { EXPERIENCE } from '../../data';

export default function Experience() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#F2F0E9] border-t border-[#18181B]/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest font-bold mb-16 text-[#FF4F00]">
          Professional History
        </h2>

        <div className="space-y-16">
          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative pl-8 md:pl-0"
            >
              {/* Timeline line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#18181B]/10 md:hidden" />
              
              <div className="grid md:grid-cols-12 gap-4 md:gap-12 items-baseline">
                <div className="md:col-span-3 text-sm font-mono text-zinc-500 md:text-right">
                  {job.period}
                </div>
                
                <div className="md:col-span-9 relative">
                  {/* Dot for timeline on mobile */}
                  <div className={`absolute -left-[37px] top-1.5 w-2 h-2 rounded-full md:hidden ${job.current ? 'bg-[#FF4F00]' : 'bg-[#18181B]/20'}`} />

                  <h3 className="text-3xl md:text-4xl font-serif mb-2 group-hover:text-[#FF4F00] transition-colors">
                    {job.company}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm uppercase tracking-wider font-medium">
                      {job.role}
                    </span>
                    {job.current && (
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-[#FF4F00] text-white rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <p className="text-zinc-600 leading-relaxed font-light text-lg max-w-xl">
                    {job.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
