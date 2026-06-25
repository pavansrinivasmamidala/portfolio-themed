import { motion } from 'motion/react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE } from '../../data';

export default function NoirTheme() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-noir selection:bg-white selection:text-black overflow-hidden">
      <div className="noir-grain" />
      
      {/* Spotlight Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-40"
        >
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-8">The Portfolio of</p>
          <h1 className="text-7xl md:text-9xl leading-none mb-8 mix-blend-difference">
            PAVAN<br/>MAMIDALA
          </h1>
          <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/50 to-white/0 mx-auto" />
        </motion.div>

        {/* Introduction */}
        <div className="grid md:grid-cols-2 gap-16 mb-40 items-center">
          <div className="font-sans text-lg text-white/60 leading-relaxed font-light">
            <p className="mb-6">{PERSONAL_INFO.bio}</p>
            <p>Based in {PERSONAL_INFO.location}.</p>
          </div>
          <div className="relative aspect-square border border-white/10 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="text-center">
              <span className="block text-4xl mb-2">{PROJECTS.length}</span>
              <span className="font-sans text-xs uppercase tracking-widest text-white/40">Projects</span>
            </div>
          </div>
        </div>

        {/* Experience - Cinematic Credits Style */}
        <div className="mb-40 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          
          <div className="space-y-24 pl-12">
            {EXPERIENCE.map((job, i) => (
              <motion.div 
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1 }}
                className="relative"
              >
                {/* Glowing node for current job */}
                {job.current && (
                  <div className="absolute -left-[37px] top-2">
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white]" />
                    <div className="absolute -inset-1 bg-white/30 rounded-full animate-ping" />
                  </div>
                )}
                
                <div className="font-sans text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                  {job.period}
                </div>
                <h3 className="text-4xl md:text-5xl mb-2">{job.company}</h3>
                <div className="font-sans text-white/80 mb-4 uppercase tracking-widest text-sm">{job.role}</div>
                <p className="font-sans text-white/50 font-light max-w-xl leading-relaxed">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-32">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1 }}
              className="relative group"
            >
              <div className="absolute -left-12 top-0 font-sans text-xs text-white/20">0{i + 1}</div>
              
              {project.image && (
                <div className="absolute -right-20 -top-20 w-64 h-40 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rotate-6">
                  <img src={project.image} alt="" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                </div>
              )}

              <h2 className="text-5xl md:text-7xl mb-6 group-hover:text-white/80 transition-colors cursor-pointer relative z-10">
                {project.title}
              </h2>
              <div className="h-px w-full bg-white/10 mb-6 group-hover:w-0 transition-all duration-700" />
              <div className="flex justify-between items-start font-sans font-light">
                <p className="text-white/60 max-w-md">{project.description}</p>
                <div className="flex gap-4">
                  {project.links.map(link => (
                    <a key={link.name} href={link.url} className="text-xs uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-40 pt-24 border-t border-white/10 text-center">
          <h2 className="text-4xl md:text-6xl mb-12">Create something timeless.</h2>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="font-sans text-xl text-white/60 hover:text-white transition-colors">
            {PERSONAL_INFO.email}
          </a>
          <div className="mt-12 flex justify-center gap-8">
            {PERSONAL_INFO.socials.map(s => (
              <a key={s.name} href={s.url} className="font-sans text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                {s.name}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
