import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Maximize2, X } from 'lucide-react';
import { Container } from '../components/Layout';
import { Link } from '../router';
import { FIGURES, MACHINES, type Figure, type Machine, type Phase } from '../data/machines';

function Lightbox({ figure, onClose }: { figure: Figure | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (figure && !d.open) d.showModal();
    if (!figure && d.open) d.close();
  }, [figure]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-w-[min(1400px,96vw)] max-h-[94vh] bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {figure && (
        <figure>
          <div className="flex justify-end mb-2">
            <button type="button" onClick={onClose} aria-label="Close image" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold">
              close <X size={14} />
            </button>
          </div>
          <img src={figure.src} alt={figure.caption} className="block max-w-full max-h-[84vh] w-auto h-auto rounded-2xl" />
          <figcaption className="mt-3 text-sm text-white/90">{figure.caption}</figcaption>
        </figure>
      )}
    </dialog>
  );
}

const PHASE_BG: Record<Phase, string> = { Recon: 'bg-keys', Foothold: 'bg-sky', User: 'bg-lilac', Root: 'bg-coral' };

export default function CaseStudy({ machine }: { machine: Machine }) {
  const i = MACHINES.indexOf(machine);
  const prev = MACHINES[(i - 1 + MACHINES.length) % MACHINES.length];
  const next = MACHINES[(i + 1) % MACHINES.length];
  const solved = new Date(`${machine.solved}-01T00:00:00`).toLocaleDateString('en', { month: 'long', year: 'numeric' });
  const figures = FIGURES[machine.slug] ?? [];
  const [open, setOpen] = useState<Figure | null>(null);

  const facts = [
    ['OS', machine.os],
    ['Difficulty', machine.difficulty],
    ['Solved', solved],
    ['Owned', [machine.owned.user && 'user', machine.owned.root && 'root'].filter(Boolean).join(' + ')],
  ];

  return (
    <Container>
      <Link to="/security" className="inline-flex items-center gap-1.5 mt-2 mb-3 px-1 text-sm font-semibold text-soft hover:text-ink">
        <ArrowLeft size={15} /> all write-ups
      </Link>

      <header className="tile p-7 sm:p-9">
        <div className="label">side quest · hack the box write-up</div>
        <h1 className="mt-3 font-extrabold tracking-[-0.05em] leading-[0.95] text-[clamp(44px,8vw,84px)] break-words">{machine.name}</h1>
        {machine.cves.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {machine.cves.map((c) => (
              <a key={c} href={`https://nvd.nist.gov/vuln/detail/${c}`} target="_blank" rel="noreferrer" className="rounded-full bg-coral px-3 py-1 font-mono text-[13px] hover:bg-ink hover:text-white transition-colors">
                {c} ↗
              </a>
            ))}
          </div>
        )}
        <p className="mt-5 max-w-3xl text-lg text-soft leading-relaxed">{machine.summary}</p>
        <dl className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {facts.map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-bg px-4 py-3">
              <dt className="label">{k}</dt>
              <dd className="mt-0.5 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {machine.classes.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </header>

      <section aria-labelledby="chain" className="tile mt-3.5 p-6 sm:p-8">
        <h2 id="chain" className="text-2xl sm:text-[28px] font-extrabold tracking-[-0.03em]">How it went</h2>
        <ol className="mt-6 space-y-3">
          {machine.chain.map((step, n) => (
            <li key={n} className="rounded-2xl bg-bg p-5">
              <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${PHASE_BG[step.phase]}`}>
                {String(n + 1).padStart(2, '0')} · {step.phase}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-soft leading-relaxed max-w-3xl">{step.detail}</p>
              {figures.some((f) => f.step === n) && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {figures
                    .filter((f) => f.step === n)
                    .map((f) => (
                      <figure key={f.src} className="min-w-0">
                        <button
                          type="button"
                          onClick={() => setOpen(f)}
                          className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-tile hover:border-ink transition-colors"
                          aria-label={`Enlarge: ${f.caption}`}
                        >
                          <img src={f.src} alt={f.caption} loading="lazy" className="block w-full h-44 sm:h-52 object-contain p-2" />
                          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/95 border border-line px-2 py-0.5 text-[11px] font-semibold opacity-90 group-hover:opacity-100">
                            <Maximize2 size={11} aria-hidden /> enlarge
                          </span>
                        </button>
                        <figcaption className="mt-2 text-[13px] leading-relaxed text-muted">{f.caption}</figcaption>
                      </figure>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fix" className="mt-3.5 grid gap-3.5 md:grid-cols-2">
        <h2 id="fix" className="sr-only">Root cause and fix</h2>
        <div className="tile p-6 sm:p-7">
          <div className="label">what went wrong</div>
          <ul className="mt-4 space-y-3 text-soft">
            {machine.rootCause.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coral text-[11px] font-bold text-ink" aria-hidden>✕</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="tile p-6 sm:p-7">
          <div className="label">how a developer fixes it</div>
          <ul className="mt-4 space-y-3 text-soft">
            {machine.fixes.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-[11px] font-bold text-ink" aria-hidden>✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="tile mt-3.5 bg-lime border-transparent flex gap-4 items-start p-6 sm:p-7">
        <Lightbulb className="shrink-0 mt-0.5" size={20} />
        <div>
          <div className="label text-ink/70">takeaway</div>
          <p className="mt-1.5 leading-relaxed">{machine.takeaway}</p>
        </div>
      </aside>

      <Lightbox figure={open} onClose={() => setOpen(null)} />

      <nav aria-label="More write-ups" className="mt-3.5 grid sm:grid-cols-2 gap-3.5">
        <Link to={`/security/${prev.slug}`} className="tile">
          <div className="label inline-flex items-center gap-1"><ArrowLeft size={12} /> previous</div>
          <div className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{prev.name}</div>
        </Link>
        <Link to={`/security/${next.slug}`} className="tile sm:text-right">
          <div className="label inline-flex items-center gap-1">next <ArrowRight size={12} /></div>
          <div className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{next.name}</div>
        </Link>
      </nav>
    </Container>
  );
}
