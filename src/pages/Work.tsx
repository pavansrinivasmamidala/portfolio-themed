import { Github, ExternalLink } from 'lucide-react';
import { Container, PageHeader } from '../components/Layout';
import { PROJECTS } from '../data/profile';

export default function Work() {
  return (
    <Container>
      <PageHeader eyebrow="// work" title="Things I've" accent="shipped.">
        Side projects and experiments — real-time multiplayer, AI tools, and plenty of React. My day-job work is internal tooling, so that’s on the About page.
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="group border border-line bg-surface rounded-[4px] overflow-hidden card-hover flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
              <img
                src={p.image}
                alt={`Screenshot of ${p.title}`}
                loading="lazy"
                className="h-full w-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
              />
              <span
                className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-[3px] bg-bg/85 border ${
                  p.status === 'Shipped' ? 'text-lime border-lime/40' : 'text-cyan border-cyan/40'
                }`}
              >
                {p.status}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="font-display font-extrabold uppercase text-2xl tracking-tight">{p.title}</h2>
              <p className="mt-2 text-soft leading-relaxed flex-1">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-5 font-mono text-sm">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-cyan">
                    <Github size={15} /> code
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-magenta">
                    <ExternalLink size={15} /> live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
