import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { Container } from '../components/Layout';
import { Link } from '../router';
import { MACHINES, type Machine, type Phase } from '../data/machines';

const PHASE_COLOR: Record<Phase, string> = {
  Recon: 'text-muted border-muted',
  Foothold: 'text-cyan border-cyan',
  User: 'text-lime border-lime',
  Root: 'text-magenta border-magenta',
};

export default function CaseStudy({ machine }: { machine: Machine }) {
  const i = MACHINES.indexOf(machine);
  const prev = MACHINES[(i - 1 + MACHINES.length) % MACHINES.length];
  const next = MACHINES[(i + 1) % MACHINES.length];
  const solved = new Date(`${machine.solved}-01T00:00:00`).toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const facts = [
    ['OS', machine.os],
    ['Difficulty', machine.difficulty],
    ['Solved', solved],
    ['Owned', [machine.owned.user && 'user', machine.owned.root && 'root'].filter(Boolean).join(' + ')],
  ];

  return (
    <Container>
      <Link to="/security" className="inline-flex items-center gap-1.5 mt-10 font-mono text-xs text-muted hover:text-magenta">
        <ArrowLeft size={14} /> all case studies
      </Link>

      <header className="pt-8 pb-10 border-b border-line">
        <div className="eyebrow mb-4">// case study · hack the box</div>
        {/* Syne is ~1.22em per uppercase glyph: size the title so the whole name fits on one line. */}
        <h1
          className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.9]"
          style={{ fontSize: `min(96px, calc((min(100vw, 1024px) - 3rem) / ${(machine.name.length * 1.25).toFixed(2)}))` }}
        >
          {machine.name}
        </h1>
        {machine.cves.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {machine.cves.map((c) => (
              <a
                key={c}
                href={`https://nvd.nist.gov/vuln/detail/${c}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-magenta border border-magenta/40 rounded-[3px] px-2.5 py-1 hover:bg-magenta/10"
              >
                {c} ↗
              </a>
            ))}
          </div>
        )}
        <p className="mt-6 max-w-3xl text-lg text-soft leading-relaxed">{machine.summary}</p>

        <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {machine.classes.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </header>

      <section aria-labelledby="chain" className="mt-14">
        <h2 id="chain" className="font-display font-extrabold uppercase text-2xl sm:text-3xl tracking-tight mb-8">
          Attack <span className="text-magenta">chain</span>
        </h2>
        <ol className="relative border-l border-line ml-2 space-y-10">
          {machine.chain.map((step, n) => (
            <li key={n} className="pl-8 relative">
              <span className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 bg-bg ${PHASE_COLOR[step.phase]}`} aria-hidden />
              <div className={`font-mono text-[11px] uppercase tracking-widest ${PHASE_COLOR[step.phase].split(' ')[0]}`}>
                {String(n + 1).padStart(2, '0')} · {step.phase}
              </div>
              <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-soft leading-relaxed max-w-3xl">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fix" className="mt-16">
        <h2 id="fix" className="font-display font-extrabold uppercase text-2xl sm:text-3xl tracking-tight mb-8">
          Root cause <span className="text-cyan">→</span> fix
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-line bg-surface rounded-[4px] p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-magenta mb-4">What went wrong</div>
            <ul className="space-y-3 text-soft">
              {machine.rootCause.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="text-magenta font-mono shrink-0" aria-hidden>✕</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-surface rounded-[4px] p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-lime mb-4">How a developer fixes it</div>
            <ul className="space-y-3 text-soft">
              {machine.fixes.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-lime font-mono shrink-0" aria-hidden>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <aside className="mt-10 flex gap-4 items-start border border-line border-l-2 border-l-lime bg-surface rounded-[4px] p-6">
        <Lightbulb className="text-lime shrink-0 mt-0.5" size={20} />
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-lime mb-2">Takeaway</div>
          <p className="text-ink leading-relaxed">{machine.takeaway}</p>
        </div>
      </aside>

      <nav aria-label="More case studies" className="mt-16 grid sm:grid-cols-2 gap-4">
        <Link to={`/security/${prev.slug}`} className="group border border-line rounded-[4px] p-5 hover:border-magenta transition-colors">
          <div className="font-mono text-[11px] text-muted inline-flex items-center gap-1"><ArrowLeft size={12} /> previous</div>
          <div className="font-display font-extrabold uppercase text-lg sm:text-xl mt-1 group-hover:text-magenta">{prev.name}</div>
        </Link>
        <Link to={`/security/${next.slug}`} className="group border border-line rounded-[4px] p-5 text-right hover:border-magenta transition-colors">
          <div className="font-mono text-[11px] text-muted inline-flex items-center gap-1">next <ArrowRight size={12} /></div>
          <div className="font-display font-extrabold uppercase text-lg sm:text-xl mt-1 group-hover:text-magenta">{next.name}</div>
        </Link>
      </nav>
    </Container>
  );
}
