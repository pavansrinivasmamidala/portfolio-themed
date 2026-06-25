import { motion } from 'motion/react';
import { SKILLS } from '../../data';

export default function Skills() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#E8E6DF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-5xl font-serif mb-6">Expertise</h2>
            <p className="text-zinc-600 max-w-xs">
              A curated list of technologies I use to build robust and scalable solutions.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {SKILLS.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-sm uppercase tracking-widest font-bold mb-6 border-b border-[#18181B]/10 pb-2">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="text-2xl font-serif text-[#18181B]/80 hover:text-[#FF4F00] transition-colors cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
