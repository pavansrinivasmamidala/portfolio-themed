import { motion } from 'motion/react';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCE } from '../../data';
import { ArrowUpRight } from 'lucide-react';

export default function BrutalistTheme() {
  return (
    <div className="min-h-screen bg-[#E0E7FF] text-black font-grotesk selection:bg-black selection:text-[#E0E7FF]">
      {/* Navigation */}
      <nav className="border-b-4 border-black p-6 flex justify-between items-center bg-white sticky top-0 z-50">
        <span className="font-display font-bold text-2xl uppercase tracking-tighter">Pavan.dev</span>
        <div className="flex gap-4">
          <a href="#work" className="font-bold hover:underline decoration-4 underline-offset-4">WORK</a>
          <a href="#contact" className="font-bold hover:underline decoration-4 underline-offset-4">CONTACT</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="p-6 md:p-12 border-b-4 border-black bg-[#FFDE00]">
        <motion.h1 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="font-display font-black text-[12vw] leading-[0.8] uppercase break-words"
        >
          FULL<br/>STACK<br/>DEV
        </motion.h1>
        <div className="mt-12 p-6 border-4 border-black bg-white inline-block brutalist-shadow transform -rotate-2">
          <p className="font-bold text-xl md:text-2xl max-w-xl">
            {PERSONAL_INFO.bio}
          </p>
        </div>
      </header>

      {/* Skills Marquee */}
      <div className="border-b-4 border-black bg-black text-white overflow-hidden py-4">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap flex gap-12 font-mono text-2xl font-bold"
        >
          {[...SKILLS, ...SKILLS].flatMap(s => s.items).map((skill, i) => (
            <span key={i} className="uppercase">★ {skill}</span>
          ))}
        </motion.div>
      </div>

      {/* Experience Section */}
      <section className="border-b-4 border-black bg-[#FF90E8]">
        <div className="p-8 md:p-12 border-b-4 border-black">
          <h2 className="font-display font-black text-6xl md:text-8xl uppercase leading-none">
            XP<br/>LOG
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className={`p-8 flex flex-col justify-between h-full min-h-[300px] relative ${job.current ? 'bg-white' : ''}`}>
              {job.current && (
                <div className="absolute top-4 right-4 rotate-12 bg-[#FFDE00] border-2 border-black px-3 py-1 font-bold uppercase text-xs brutalist-shadow z-10">
                  Currently Occupied
                </div>
              )}
              
              <div>
                <span className="font-mono font-bold text-sm mb-4 block">{job.period}</span>
                <h3 className="font-display font-bold text-3xl uppercase mb-2 leading-tight">
                  {job.company}
                </h3>
                <div className="inline-block bg-black text-white px-2 py-1 font-bold text-sm uppercase mb-6 transform -rotate-1">
                  {job.role}
                </div>
              </div>
              
              <p className="font-medium border-t-4 border-black pt-4 mt-auto">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="grid md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <div key={project.title} className={`border-b-4 border-black p-8 md:p-16 hover:bg-[#FF6B6B] transition-colors group ${index % 2 === 0 ? 'md:border-r-4' : ''}`}>
            {project.image && (
              <div className="mb-8 border-4 border-black brutalist-shadow overflow-hidden bg-white">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <h3 className="font-display font-bold text-4xl md:text-6xl mb-4 group-hover:text-white transition-colors">{project.title}</h3>
            <p className="font-medium text-lg mb-8 border-l-4 border-black pl-4 group-hover:border-white group-hover:text-white transition-colors">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 border-2 border-black bg-white font-bold text-xs uppercase brutalist-shadow">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.links.map(link => (
                <a key={link.name} href={link.url} className="flex items-center gap-2 font-bold bg-black text-white px-6 py-3 hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all">
                  {link.name} <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Contact */}
      <footer id="contact" className="p-12 bg-[#90EE90] border-b-4 border-black">
        <h2 className="font-display font-black text-[10vw] leading-none mb-12 uppercase">Let's Talk</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="block text-3xl md:text-5xl font-bold hover:underline decoration-4">{PERSONAL_INFO.email}</a>
            <p className="text-2xl font-bold">{PERSONAL_INFO.phone}</p>
          </div>
          <div className="flex flex-col justify-end">
             <div className="flex gap-4 flex-wrap">
              {PERSONAL_INFO.socials.map(s => (
                <a key={s.name} href={s.url} className="px-6 py-3 border-4 border-black bg-white font-bold hover:bg-black hover:text-white transition-colors brutalist-shadow">
                  {s.name}
                </a>
              ))}
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
