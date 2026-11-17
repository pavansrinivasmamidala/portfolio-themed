import { ArrowLeft, ArrowRight, ExternalLink, Github, Lock, Wrench, Compass } from 'lucide-react';
import { Container } from '../components/Layout';
import { AiBadge, ProjectVisual } from '../components/ProjectBits';
import { Link } from '../router';
import { DETAILED, type Project } from '../data/projects';

export default function ProjectDetail({ project: p }: { project: Project }) {
  const d = p.detail!;
  const i = DETAILED.indexOf(p);
  const prev = DETAILED[(i - 1 + DETAILED.length) % DETAILED.length];
  const next = DETAILED[(i + 1) % DETAILED.length];
  const fixes = d.work.filter((w) => w.kind === 'fix').length;
  const decisions = d.work.length - fixes;

  return (
    <Container>
      <Link to="/work" className="inline-flex items-center gap-1.5 mt-10 font-mono text-xs text-muted hover:text-magenta">
        <ArrowLeft size={14} /> all work
      </Link>

      <header className="pt-8 pb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="eyebrow">// {p.kind.toLowerCase()} · {p.year}</span>
          {p.ai && <AiBadge tool={p.ai.tool} size="md" />}
        </div>
        <h1
          className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.9]"
          style={{ fontSize: `min(96px, calc((min(100vw, 1024px) - 3rem) / ${(p.title.length * 1.25).toFixed(2)}))` }}
        >
          {p.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-soft leading-relaxed">{p.blurb}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-magenta text-bg font-semibold px-5 py-3 rounded-[4px] hover:bg-ink transition-colors">
              Open the app <ExternalLink size={16} />
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-line px-5 py-3 rounded-[4px] font-semibold hover:border-cyan hover:text-cyan transition-colors">
              <Github size={16} /> Source
            </a>
          )}
          {!p.live && !p.repo && p.availability && (
            <span className="inline-flex items-center gap-2 border border-line px-5 py-3 rounded-[4px] font-mono text-sm text-muted">
              <Lock size={14} /> {p.availability}, so no public link
            </span>
          )}
        </div>
      </header>

      <div className="aspect-[16/9] sm:aspect-[16/8] border border-line rounded-[4px] overflow-hidden bg-surface-2">
        <ProjectVisual project={p} />
      </div>

      {p.ai && (
        <aside className="mt-10 border border-line border-l-2 border-l-cyan bg-surface rounded-[4px] p-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan mb-2">How this was built</div>
            <p className="text-soft leading-relaxed">
              Most of the code was written with <span className="text-ink">{p.ai.tool}</span>. My part was everything around it: deciding what to
              build next and what to cut, testing it, reading the code when something broke, and pushing fixes until it held up.
            </p>
          </div>
          <dl className="flex gap-8 font-mono">
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-muted">fixes</dt>
              <dd className="font-display font-extrabold text-3xl text-magenta">{fixes}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-muted">decisions</dt>
              <dd className="font-display font-extrabold text-3xl text-lime">{decisions}</dd>
            </div>
          </dl>
        </aside>
      )}

      <section className="mt-16 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display font-extrabold uppercase text-2xl sm:text-3xl tracking-tight mb-5">Overview</h2>
          <div className="space-y-4 text-soft leading-relaxed text-[17px]">
            {d.overview.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-magenta mb-3">Under the hood</h3>
          <ul className="space-y-2 text-sm text-soft">
            {d.stack.map((s) => (
              <li key={s} className="flex gap-2"><span className="text-magenta" aria-hidden>→</span>{s}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-extrabold uppercase text-2xl sm:text-3xl tracking-tight mb-5">Features</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {d.features.map((f) => (
              <div key={f.title} className="border border-line bg-surface rounded-[4px] p-4">
                <div className="font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-soft leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="work-log" className="mt-16">
        <h2 id="work-log" className="font-display font-extrabold uppercase text-2xl sm:text-3xl tracking-tight mb-2">
          What I <span className="text-magenta">fixed</span> &amp; <span className="text-lime">decided</span>
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">The part AI doesn’t do for you.</p>
        <ol className="space-y-4">
          {d.work.map((w, n) => {
            const fix = w.kind === 'fix';
            const Icon = fix ? Wrench : Compass;
            return (
              <li key={w.title} className="grid grid-cols-[auto_1fr] gap-4 border border-line bg-surface rounded-[4px] p-5">
                <div className={`h-9 w-9 rounded-full border grid place-items-center ${fix ? 'border-magenta/50 text-magenta' : 'border-lime/50 text-lime'}`}>
                  <Icon size={16} aria-hidden />
                </div>
                <div>
                  <div className={`font-mono text-[11px] uppercase tracking-widest ${fix ? 'text-magenta' : 'text-lime'}`}>
                    {String(n + 1).padStart(2, '0')} · {fix ? 'fix' : 'decision'}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-soft leading-relaxed">{w.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <nav aria-label="More projects" className="mt-16 grid sm:grid-cols-2 gap-4">
        <Link to={`/work/${prev.slug}`} className="group border border-line rounded-[4px] p-5 hover:border-magenta transition-colors">
          <div className="font-mono text-[11px] text-muted inline-flex items-center gap-1"><ArrowLeft size={12} /> previous</div>
          <div className="font-display font-extrabold uppercase text-lg sm:text-xl mt-1 group-hover:text-magenta">{prev.title}</div>
        </Link>
        <Link to={`/work/${next.slug}`} className="group border border-line rounded-[4px] p-5 sm:text-right hover:border-magenta transition-colors">
          <div className="font-mono text-[11px] text-muted inline-flex items-center gap-1">next <ArrowRight size={12} /></div>
          <div className="font-display font-extrabold uppercase text-lg sm:text-xl mt-1 group-hover:text-magenta">{next.title}</div>
        </Link>
      </nav>
    </Container>
  );
}
