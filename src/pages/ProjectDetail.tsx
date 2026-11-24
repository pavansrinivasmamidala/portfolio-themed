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
      <Link to="/work" className="inline-flex items-center gap-1.5 mt-2 mb-3 px-1 text-sm font-semibold text-soft hover:text-ink">
        <ArrowLeft size={15} /> all work
      </Link>

      <div className="grid gap-3.5 lg:grid-cols-[1fr_1.15fr]">
        <header className="tile p-7 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="label">{p.kind} · {p.year}</span>
              {p.ai && <AiBadge tool={p.ai.tool} />}
            </div>
            <h1 className="mt-3 font-extrabold tracking-[-0.05em] leading-[0.95] text-[clamp(44px,7vw,76px)] break-words">{p.title}</h1>
            <p className="mt-4 text-[17px] text-soft leading-relaxed">{p.blurb}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn-ink">
                Open the app <ExternalLink size={15} />
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="btn-line">
                <Github size={15} /> Source
              </a>
            )}
            {!p.live && !p.repo && p.availability && (
              <span className="inline-flex items-center gap-2 rounded-full bg-keys px-4 py-2.5 text-sm text-soft">
                <Lock size={14} /> {p.availability}, so no public link
              </span>
            )}
          </div>
        </header>
        <div className="tile p-0 min-h-[240px] bg-keys">
          <div className="absolute inset-0">
            <ProjectVisual project={p} />
          </div>
        </div>
      </div>

      {p.ai && (
        <aside className="tile mt-3.5 bg-sky border-transparent grid gap-5 md:grid-cols-[1fr_auto] md:items-center p-6 sm:p-7">
          <div>
            <div className="label text-ink/70">how this was built</div>
            <p className="mt-2 leading-relaxed">
              Most of the code was written with <b>{p.ai.tool}</b>. My part was everything around it: deciding what to build next and what
              to cut, testing it, reading the code when something broke, and pushing fixes until it held up.
            </p>
          </div>
          <dl className="flex gap-3">
            <div className="rounded-2xl bg-white/80 px-5 py-3 text-center flex flex-col-reverse">
              <dt className="label text-ink/70">fixes</dt>
              <dd className="text-3xl font-extrabold">{fixes}</dd>
            </div>
            <div className="rounded-2xl bg-white/80 px-5 py-3 text-center flex flex-col-reverse">
              <dt className="label text-ink/70">decisions</dt>
              <dd className="text-3xl font-extrabold">{decisions}</dd>
            </div>
          </dl>
        </aside>
      )}

      <section className="mt-3.5 grid gap-3.5 md:grid-cols-[1fr_1.2fr]">
        <div className="tile p-6 sm:p-7">
          <h2 className="text-2xl font-extrabold tracking-[-0.03em]">Overview</h2>
          <div className="mt-3 space-y-4 text-soft leading-relaxed text-[17px]">
            {d.overview.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <h3 className="mt-7 label">under the hood</h3>
          <ul className="mt-2.5 space-y-2 text-sm text-soft">
            {d.stack.map((s) => (
              <li key={s} className="flex gap-2"><span aria-hidden>→</span>{s}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="tile bg-keys border-transparent p-6 sm:p-7">
          <h2 className="text-2xl font-extrabold tracking-[-0.03em]">Features</h2>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {d.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-tile p-4">
                <div className="font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-soft leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="work-log" className="tile mt-3.5 p-6 sm:p-8">
        <h2 id="work-log" className="text-2xl sm:text-[28px] font-extrabold tracking-[-0.03em]">
          What I <span className="bg-coral px-1.5 rounded-md">fixed</span> &amp; <span className="bg-lime px-1.5 rounded-md">decided</span>
        </h2>
        <p className="mt-1.5 text-sm text-soft">The part AI doesn’t do for you.</p>
        <ol className="mt-6 space-y-3">
          {d.work.map((w, n) => {
            const fix = w.kind === 'fix';
            const Icon = fix ? Wrench : Compass;
            return (
              <li key={w.title} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl bg-bg p-4 sm:p-5">
                <div className={`h-10 w-10 rounded-full grid place-items-center ${fix ? 'bg-coral' : 'bg-lime'}`}>
                  <Icon size={17} aria-hidden />
                </div>
                <div>
                  <div className="label">{String(n + 1).padStart(2, '0')} · {fix ? 'fix' : 'decision'}</div>
                  <h3 className="mt-0.5 text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-soft leading-relaxed">{w.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <nav aria-label="More projects" className="mt-3.5 grid sm:grid-cols-2 gap-3.5">
        <Link to={`/work/${prev.slug}`} className="tile group">
          <div className="label inline-flex items-center gap-1"><ArrowLeft size={12} /> previous</div>
          <div className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{prev.title}</div>
        </Link>
        <Link to={`/work/${next.slug}`} className="tile group sm:text-right">
          <div className="label inline-flex items-center gap-1">next <ArrowRight size={12} /></div>
          <div className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{next.title}</div>
        </Link>
      </nav>
    </Container>
  );
}
