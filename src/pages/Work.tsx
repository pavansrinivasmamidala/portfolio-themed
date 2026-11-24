import { ArrowUpRight, Lock } from 'lucide-react';
import { Container, PageHeader, SectionTitle } from '../components/Layout';
import { AiBadge, ProjectVisual } from '../components/ProjectBits';
import { Link } from '../router';
import { PROJECT_GROUPS, type Project } from '../data/projects';

function ProjectCard({ p }: { p: Project }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-keys">
        <ProjectVisual project={p} className="transition-transform duration-300 group-hover:scale-[1.03]" />
        {p.ai && (
          <span className="absolute top-3 right-3">
            <AiBadge tool={p.ai.tool} />
          </span>
        )}
      </div>
      <div className="px-5 pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="label">{p.kind}</span>
          <span className="label">{p.year}</span>
        </div>
        <h3 className="mt-1.5 text-2xl font-extrabold tracking-[-0.03em]">{p.title}</h3>
        <p className="mt-1.5 text-soft leading-relaxed">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article className="tile tile-hover p-0 group flex flex-col">
      {p.detail ? (
        <Link to={`/work/${p.slug}`} className="block flex-1" aria-label={`${p.title}: read more`}>
          {body}
        </Link>
      ) : (
        <div className="flex-1">{body}</div>
      )}
      <div className="px-5 pb-5 pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
        {p.detail && (
          <Link to={`/work/${p.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-4">
            read more <ArrowUpRight size={15} />
          </Link>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="text-soft hover:text-ink hover:underline underline-offset-4">live ↗</a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="text-soft hover:text-ink hover:underline underline-offset-4">code ↗</a>
        )}
        {!p.live && !p.repo && p.availability && (
          <span className="inline-flex items-center gap-1.5 font-normal text-muted">
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
      <PageHeader label="work" title={<>Things I've <span className="scribble">shipped</span>.</>}>
        Multiplayer games, AI tools, and plenty of React. My day job is internal tooling at BMO, so that’s on the About page.
      </PageHeader>

      {PROJECT_GROUPS.map((g) => (
        <section key={g.id} aria-labelledby={`group-${g.id}`}>
          <SectionTitle aside={`${g.items.length} projects`}>
            <span id={`group-${g.id}`}>{g.title}</span>
          </SectionTitle>
          <p className="-mt-2 mb-5 px-1 max-w-2xl text-sm text-soft">{g.note}</p>
          <div className="grid gap-3.5 md:grid-cols-2">
            {g.items.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
