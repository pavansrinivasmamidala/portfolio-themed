import { Container, PageHeader, SectionTitle } from '../components/Layout';
import { Link } from '../router';
import { PROFILE, EXPERIENCE, SKILLS } from '../data/profile';

const ACCENT = {
  magenta: 'text-magenta border-magenta/40',
  cyan: 'text-cyan border-cyan/40',
  lime: 'text-lime border-lime/40',
} as const;

export default function About() {
  return (
    <Container>
      <PageHeader eyebrow="// about" title="Builder" accent="& breaker.">
        Frontend engineer in {PROFILE.location.split(',')[0]}, with a security habit I can’t shake.
      </PageHeader>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-soft leading-relaxed text-[17px]">
          {PROFILE.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="border border-line bg-surface rounded-[4px] p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-magenta mb-3">When I build</div>
            <ul className="space-y-2 text-sm text-soft">
              <li>→ Fast, accessible React and TypeScript UIs</li>
              <li>→ Real-time data without janky renders</li>
              <li>→ Components a team can live with for years</li>
            </ul>
          </div>
          <div className="border border-line bg-surface rounded-[4px] p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-lime mb-3">When I break</div>
            <ul className="space-y-2 text-sm text-soft">
              <li>→ Web app flaws: XSS, injection, auth, uploads</li>
              <li>→ Linux privilege escalation and pivoting</li>
              <li>→ Writing up the root cause and the fix</li>
            </ul>
            <Link to="/security" className="inline-block mt-4 font-mono text-xs text-lime hover:underline">
              read the case studies →
            </Link>
          </div>
        </aside>
      </div>

      <SectionTitle aside={`${EXPERIENCE.length} roles`}>Experience</SectionTitle>
      <ol className="relative border-l border-line ml-2 space-y-10">
        {EXPERIENCE.map((job) => (
          <li key={job.company} className="pl-8 relative">
            <span
              className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 ${
                job.current ? 'bg-magenta border-magenta shadow-[0_0_12px_var(--color-magenta)]' : 'bg-bg border-muted'
              }`}
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display font-extrabold uppercase text-xl sm:text-2xl tracking-tight">{job.company}</h3>
              <span className="font-mono text-xs text-muted">{job.period}</span>
            </div>
            <div className="font-mono text-sm text-cyan mt-1">{job.role}</div>
            <ul className="mt-3 space-y-1.5 text-soft">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <SectionTitle>Toolkit</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((g) => (
          <div key={g.group} className="border border-line bg-surface rounded-[4px] p-5">
            <h3 className={`font-mono text-xs uppercase tracking-widest mb-4 ${ACCENT[g.accent].split(' ')[0]}`}>{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="font-mono text-[13px] px-3 py-1.5 rounded-full border border-line text-ink">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
