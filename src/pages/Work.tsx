import { Github, ExternalLink, ArrowRight, Lock } from 'lucide-react';
import { Container, PageHeader, SectionTitle } from '../components/Layout';
import { AiBadge, ProjectVisual } from '../components/ProjectBits';
import { Link } from '../router';
import { PROJECT_GROUPS, type Project } from '../data/projects';

function ProjectCard({ p }: { p: Project }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <ProjectVisual project={p} className="opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300" />
        {p.ai && (
          <span className="absolute top-3 right-3">
            <AiBadge tool={p.ai.tool} />
          </span>
        )}
      </div>
      <div className="px-6 pt-6">
        <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span>{p.kind}</span>
          <span>{p.year}</span>
        </div>
        <h3 className="mt-2 font-display font-extrabold uppercase text-2xl tracking-tight group-hover:text-magenta transition-colors">
          {p.title}
        </h3>
        <p className="mt-2 text-soft leading-relaxed">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article className="group border border-line bg-surface rounded-[4px] overflow-hidden card-hover flex flex-col">
      {p.detail ? (
        <Link to={`/work/${p.slug}`} className="block flex-1" aria-label={`${p.title}: read more`}>
          {body}
        </Link>
      ) : (
        <div className="flex-1">{body}</div>
      )}
      <div className="px-6 pb-6 pt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
        {p.detail && (
          <Link to={`/work/${p.slug}`} className="inline-flex items-center gap-1.5 text-magenta hover:underline">
            read more <ArrowRight size={14} />
          </Link>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-cyan">
            <ExternalLink size={14} /> live
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-cyan">
            <Github size={14} /> code
          </a>
        )}
        {!p.live && !p.repo && p.availability && (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Lock size={13} /> {p.availability.toLowerCase()}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <Container>
      <PageHeader eyebrow="// work" title="Things I've" accent="shipped.">
        Multiplayer games, AI tools, and plenty of React. My day-job work is internal tooling, so that’s on the About page.
      </PageHeader>

      {PROJECT_GROUPS.map((g, i) => (
        <section key={g.id} aria-labelledby={`group-${g.id}`}>
          <div className={i === 0 ? 'mt-4' : ''}>
            <SectionTitle aside={`${g.items.length} projects`}>
              <span id={`group-${g.id}`}>{g.title}</span>
            </SectionTitle>
          </div>
          <p className="-mt-2 mb-8 max-w-2xl text-sm text-muted">{g.note}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {g.items.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
