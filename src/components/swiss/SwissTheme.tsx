import { motion } from 'motion/react';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCE } from '../../data';

export default function SwissTheme() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto border-x border-[#e5e5e5] bg-white/90 backdrop-blur-sm">
        {/* Header */}
        <header className="grid grid-cols-12 border-b border-[#e5e5e5]">
          <div className="col-span-12 md:col-span-8 p-8 md:p-16 border-b md:border-b-0 md:border-r border-[#e5e5e5]">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xl md:text-2xl text-[#666] max-w-2xl leading-relaxed">
              {PERSONAL_INFO.role} — {PERSONAL_INFO.location}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 p-8 md:p-16 flex flex-col justify-between bg-[#f5f5f5]">
            <div className="text-sm font-mono uppercase tracking-widest text-[#666]">Status</div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Available for new projects
            </div>
            <div className="mt-8 pt-8 border-t border-[#e5e5e5]">
               <div className="text-sm font-mono uppercase tracking-widest text-[#666] mb-2">Current Role</div>
               <div className="font-medium">UI Engineer</div>
               <div className="text-[#666]">BMO Capital Markets</div>
            </div>
          </div>
        </header>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#e5e5e5]">
          <div className="col-span-12 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-[#e5e5e5]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#999] mb-4">About</h2>
            <p className="text-lg leading-relaxed">{PERSONAL_INFO.bio}</p>
          </div>
          <div className="col-span-12 md:col-span-8 p-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#999] mb-6">Capabilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {SKILLS.map(group => (
                <div key={group.category}>
                  <h3 className="font-medium mb-3">{group.category}</h3>
                  <ul className="space-y-1 text-sm text-[#666]">
                    {group.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Grid */}
        <div className="border-b border-[#e5e5e5]">
          <div className="p-8 border-b border-[#e5e5e5]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#999]">Curriculum Vitae</h2>
          </div>
          <div className="grid grid-cols-1">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className={`grid grid-cols-1 md:grid-cols-12 p-8 border-b border-[#e5e5e5] last:border-b-0 hover:bg-[#fafafa] transition-colors ${job.current ? 'bg-[#f8fcf8]' : ''}`}>
                <div className="col-span-12 md:col-span-2 font-mono text-sm text-[#999] mb-2 md:mb-0">
                  {job.period}
                </div>
                <div className="col-span-12 md:col-span-3 font-medium text-lg mb-2 md:mb-0">
                  {job.company}
                </div>
                <div className="col-span-12 md:col-span-3 text-[#666] mb-2 md:mb-0">
                  {job.role}
                </div>
                <div className="col-span-12 md:col-span-4 text-sm text-[#666] leading-relaxed">
                  {job.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="border-b border-[#e5e5e5]">
          <div className="p-8 border-b border-[#e5e5e5]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#999]">Selected Works</h2>
          </div>
          {PROJECTS.map((project, i) => (
            <div key={project.title} className="grid grid-cols-1 md:grid-cols-12 group border-b border-[#e5e5e5] last:border-b-0 hover:bg-[#fafafa] transition-colors">
              <div className="col-span-1 md:col-span-1 p-8 font-mono text-xs text-[#999] border-b md:border-b-0 md:border-r border-[#e5e5e5]">
                0{i + 1}
              </div>
              <div className="col-span-11 md:col-span-7 p-8 border-b md:border-b-0 md:border-r border-[#e5e5e5]">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {project.image && (
                    <div className="w-full md:w-48 aspect-video bg-[#f5f5f5] border border-[#e5e5e5] overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-3xl font-medium mb-2">{project.title}</h3>
                    <p className="text-[#666] max-w-xl">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 p-8 flex items-center justify-between md:justify-end gap-4">
                <div className="flex gap-2">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-1 bg-[#f0f0f0] text-xs rounded-sm text-[#666]">{t}</span>
                  ))}
                </div>
                <a href={project.links[0]?.url} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] hover:bg-black hover:text-white transition-colors">
                  →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-[#e5e5e5]">
            <h2 className="text-4xl font-medium mb-8">Get in touch</h2>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl underline decoration-[#e5e5e5] underline-offset-4 hover:decoration-black transition-all">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div className="p-8 md:p-16 flex flex-col justify-end">
            <div className="flex gap-6">
              {PERSONAL_INFO.socials.map(s => (
                <a key={s.name} href={s.url} className="text-sm font-mono uppercase tracking-widest hover:text-[#666] transition-colors">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
