import { motion } from 'motion/react';
import { SKILLS } from '../data';
import SpotlightCard from './magic/SpotlightCard';

export default function Skills() {
  return (
    <section className="py-32 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Technical Arsenal</h2>
          <p className="text-zinc-400 max-w-xl text-lg">
            A comprehensive suite of tools and technologies I use to bring digital ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full p-6 bg-zinc-900/30 border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400">
                    <skillGroup.icon size={20} />
                  </div>
                  <h3 className="font-mono text-sm uppercase tracking-wider text-zinc-300">
                    {skillGroup.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1.5 text-sm rounded-md bg-zinc-800/50 text-zinc-400 border border-white/5 hover:text-white hover:border-white/20 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
