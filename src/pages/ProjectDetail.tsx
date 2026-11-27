import { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Lock, Maximize2, Sparkles, Wrench } from 'lucide-react';
import { Container } from '../components/Layout';
import { AiBadge } from '../components/ProjectBits';
import Lightbox from '../components/Lightbox';
import { Link } from '../router';
import { DETAILED, type Project, type Shot } from '../data/projects';

function ShotButton({ shot, onOpen, className = '', imgClass = '' }: { shot: Shot; onOpen: (s: Shot) => void; className?: string; imgClass?: string }) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <button
        type="button"
        onClick={() => onOpen(shot)}
        aria-label={`Enlarge: ${shot.caption}`}
        className="group relative block w-full overflow-hidden rounded-[22px] border border-line bg-keys transition-shadow hover:shadow-[0_20px_30px_-24px_rgba(0,0,0,.45)]"
      >
        <img src={shot.src} alt={shot.caption} loading="lazy" className={`block w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] ${imgClass}`} />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          <Maximize2 size={11} aria-hidden /> enlarge
        </span>
      </button>
      <figcaption className="mt-2 px-1 text-sm text-soft">{shot.caption}</figcaption>
    </figure>
  );
}

export default function ProjectDetail({ project: p }: { project: Project }) {
  const d = p.detail!;
  const [open, setOpen] = useState<Shot | null>(null);
  const i = DETAILED.indexOf(p);
  const prev = DETAILED[(i - 1 + DETAILED.length) % DETAILED.length];
  const next = DETAILED[(i + 1) % DETAILED.length];
  const [hero, ...rest] = d.shots;

  return (
    <Container>
      <Link to="/work" className="inline-flex items-center gap-1.5 mt-2 mb-3 px-1 text-sm font-semibold text-soft hover:text-ink">
        <ArrowLeft size={15} /> all work
      </Link>

      <header className="tile p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="label">{p.kind} · {p.year}</span>
            {p.ai && <AiBadge tool={p.ai.tool} />}
          </div>
          <h1 className="mt-2 font-extrabold tracking-[-0.05em] leading-[0.95] text-[clamp(44px,7vw,76px)] break-words">{p.title}</h1>
          <p className="mt-3 text-xl text-soft">{p.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
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
              <Lock size={14} /> {p.availability}
            </span>
          )}
        </div>
      </header>

      {/* Screenshots first. Phone apps get a row of phone-shaped shots. */}
      <section aria-label="Screenshots" className="mt-3.5">
        {d.phone ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {d.shots.map((s) => (
              <ShotButton key={s.src} shot={s} onOpen={setOpen} imgClass="aspect-[390/844]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3.5">
            <ShotButton shot={hero} onOpen={setOpen} imgClass="aspect-[16/10] sm:aspect-[16/9]" />
            {rest.length > 0 && (
              <div className={`grid gap-3.5 grid-cols-2 ${rest.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
                {rest.map((s, n) => (
                  <ShotButton key={s.src} shot={s} onOpen={setOpen} imgClass="aspect-[16/10]" className={rest.length === 3 && n === 2 ? 'col-span-2 lg:col-span-1' : ''} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mt-3.5 grid gap-3.5 md:grid-cols-2">
        <div className="tile bg-lime border-transparent p-6">
          <h2 className="label text-ink/70">highlights</h2>
          <ul className="mt-3 space-y-2">
            {d.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 font-semibold">
                <Sparkles size={16} className="mt-1 shrink-0" aria-hidden /> {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="tile p-6">
          <h2 className="label">what I fixed</h2>
          <ul className="mt-3 space-y-2.5">
            {d.fixes.map((f) => (
              <li key={f} className="flex gap-2.5 text-soft">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral text-ink" aria-hidden>
                  <Wrench size={12} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          {p.ai && (
            <p className="mt-4 text-sm text-muted">
              Built with {p.ai.tool}. I chose what to build, tested it, and fixed what broke.
            </p>
          )}
        </div>
      </section>

      <Lightbox image={open} onClose={() => setOpen(null)} />

      <nav aria-label="More projects" className="mt-3.5 grid grid-cols-2 gap-3.5">
        <Link to={`/work/${prev.slug}`} className="tile">
          <div className="label inline-flex items-center gap-1"><ArrowLeft size={12} /> previous</div>
          <div className="mt-1 text-lg sm:text-xl font-extrabold tracking-[-0.03em]">{prev.title}</div>
        </Link>
        <Link to={`/work/${next.slug}`} className="tile text-right">
          <div className="label inline-flex items-center gap-1">next <ArrowRight size={12} /></div>
          <div className="mt-1 text-lg sm:text-xl font-extrabold tracking-[-0.03em]">{next.title}</div>
        </Link>
      </nav>
    </Container>
  );
}
