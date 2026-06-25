import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { PROJECTS } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12">
      <div className="mb-24 flex items-end justify-between">
        <h2 className="text-6xl md:text-8xl font-serif">Selected<br/><span className="italic text-[#FF4F00]">Works</span></h2>
        <span className="hidden md:block text-sm uppercase tracking-widest">2023 — 2026</span>
      </div>

      <div className="space-y-32">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="group"
    >
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-2 font-mono text-sm text-zinc-400 pt-2">
          0{index + 1} / 0{PROJECTS.length}
        </div>
        
        <div className="md:col-span-7">
          <a href={project.links[0]?.url} className="block overflow-hidden aspect-[16/9] bg-zinc-200 mb-8 relative group-hover:shadow-2xl transition-all duration-500">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-zinc-300 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-serif italic text-4xl opacity-50">
                  {project.title} Preview
                </div>
              </>
            )}
          </a>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 border border-[#18181B] rounded-full text-xs uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 md:sticky md:top-32">
          <h3 className="text-4xl font-serif mb-4 group-hover:text-[#FF4F00] transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-600 leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex gap-4">
            {project.links.map((link: any) => (
              <a 
                key={link.name} 
                href={link.url}
                className="flex items-center gap-2 text-sm uppercase tracking-widest border-b border-[#18181B] pb-1 hover:text-[#FF4F00] hover:border-[#FF4F00] transition-colors"
              >
                {link.name} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
