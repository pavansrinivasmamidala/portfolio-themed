import { motion } from 'motion/react';
import { PROJECTS } from '../data';
import { ExternalLink, Github } from 'lucide-react';
import SpotlightCard from './magic/SpotlightCard';

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Selected Works</h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              Highlights from my journey in building digital products.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-12 mb-4" />
          <div className="text-right">
            <span className="font-mono text-6xl text-zinc-800 font-bold">0{PROJECTS.length}</span>
          </div>
        </div>

        <div className="grid gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="group relative grid md:grid-cols-[1.5fr_1fr] gap-8 p-8 bg-zinc-900/20 border-white/5">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-semibold group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.status === "In Progress" && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono border border-amber-500/20">
                        In Progress
                      </span>
                    )}
                  </div>
                  
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-zinc-800 text-zinc-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end items-start md:items-end gap-4">
                  <div className="flex gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        className="p-3 rounded-full bg-zinc-800 hover:bg-white hover:text-black transition-all duration-300 z-10 relative"
                        title={link.name}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
