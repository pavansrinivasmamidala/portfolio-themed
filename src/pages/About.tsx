import { Container, PageHeader, SectionTitle } from '../components/Layout';
import { Link } from '../router';
import { PROFILE, EXPERIENCE, SKILLS, type Accent } from '../data/profile';

const BG: Record<Accent, string> = { lime: 'bg-lime', sky: 'bg-sky', lilac: 'bg-lilac', coral: 'bg-coral' };

export default function About() {
  return (
    <Container>
      <PageHeader label="about" title={<>Builder, mostly. <span className="scribble">Breaker</span>, sometimes.</>}>
        Frontend engineer in {PROFILE.location.split(',')[0]}. I care about the small stuff: the hover that feels right, the loading state nobody notices,
        the keyboard user who gets there first.
      </PageHeader>

      <div className="mt-3.5 grid gap-3.5 md:grid-cols-[1.5fr_1fr]">
        <div className="tile p-6 sm:p-8 space-y-4 text-[17px] leading-relaxed text-soft">
          {PROFILE.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="grid gap-3.5">
          <div className="tile bg-lime border-transparent p-6">
            <div className="label text-ink/70">when I build</div>
            <ul className="mt-3 space-y-1.5">
              <li>→ Fast, accessible React + TypeScript UIs</li>
              <li>→ Real-time data without janky renders</li>
              <li>→ Components a team can live with for years</li>
            </ul>
          </div>
          <Link to="/security" className="tile bg-coral border-transparent p-6 block">
            <div className="label text-ink/70">when I break (side quest)</div>
            <ul className="mt-3 space-y-1.5">
              <li>→ Web app flaws: XSS, injection, uploads</li>
              <li>→ Writing up the root cause and the fix</li>
            </ul>
            <span className="mt-3 inline-block text-sm font-semibold">read the write-ups →</span>
          </Link>
        </div>
      </div>

      <SectionTitle aside={`${EXPERIENCE.length} roles`}>Experience</SectionTitle>
      <ol className="grid gap-3.5">
        {EXPERIENCE.map((job) => (
          <li key={job.company} className={`tile p-6 sm:p-7 ${job.current ? 'bg-ink text-zinc-100 border-transparent' : ''}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-2xl font-extrabold tracking-[-0.03em]">{job.company}</h3>
              <span className={`label ${job.current ? 'text-zinc-400' : ''}`}>{job.period}</span>
            </div>
            <div className={`mt-0.5 font-semibold ${job.current ? 'text-lime' : ''}`}>{job.role}</div>
            <ul className={`mt-3 space-y-1.5 ${job.current ? 'text-zinc-300' : 'text-soft'}`}>
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <span key={s} className={job.current ? 'font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300' : 'chip'}>{s}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <SectionTitle>Toolkit</SectionTitle>
      <div className="grid gap-3.5 sm:grid-cols-2">
        {SKILLS.map((g) => (
          <div key={g.group} className="tile bg-keys border-transparent p-6">
            <h3 className="label inline-flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${BG[g.accent]}`} aria-hidden /> {g.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="key">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
