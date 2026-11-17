import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { Container } from '../components/Layout';
import { PROFILE, EXPERIENCE, HTB_STATS } from '../data/profile';
import { MACHINE_STATS } from '../data/machines';

const DOORS = [
  { to: '/work', n: '01', title: 'Work', line: 'Products and side projects I’ve built.' },
  { to: '/security', n: '02', title: 'Security', line: `${MACHINE_STATS.documented} Hack The Box case studies, with fixes.` },
  { to: '/about', n: '03', title: 'About', line: 'Experience, skills, and how I work.' },
];

export default function Home() {
  const current = EXPERIENCE.find((j) => j.current);

  return (
    <Container>
      <section className="pt-20 sm:pt-32">
        <div className="eyebrow mb-6">// {PROFILE.role.toLowerCase()} · {PROFILE.secondary.toLowerCase()}</div>
        <h1 className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(30px,7.4vw,86px)]">
          I build<br />
          interfaces.<br />
          I <span className="text-stroke-cyan">break</span> them<br />
          <span className="text-magenta glow-magenta">too.</span>
        </h1>
        <p className="mt-8 max-w-xl font-mono text-[15px] leading-relaxed text-soft">
          I’m <span className="text-lime font-bold">{PROFILE.shortName}</span>. {PROFILE.intro}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 bg-magenta text-bg font-semibold px-5 py-3 rounded-[4px] hover:bg-ink transition-colors"
          >
            See my work <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-line px-5 py-3 rounded-[4px] font-semibold hover:border-cyan hover:text-cyan transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <div className="mt-16 border-y border-line py-4 font-mono text-[12px] sm:text-[13px] text-muted flex flex-wrap gap-x-8 gap-y-2">
        {current && (
          <span>
            <span className="text-cyan">{current.role}</span> @ {current.company}
          </span>
        )}
        <span>{PROFILE.location}</span>
        <span>
          HTB <span className="text-cyan">{HTB_STATS.rank}</span> · lvl {HTB_STATS.level}
        </span>
        <span className="text-lime">● {PROFILE.status}</span>
      </div>

      <nav aria-label="Explore" className="mt-16 grid gap-4 sm:grid-cols-3">
        {DOORS.map((d) => (
          <Link key={d.to} to={d.to} className="group relative block border border-line bg-surface rounded-[4px] p-6 card-hover">
            <span className="block font-mono text-xs text-magenta mb-3" aria-hidden>
              {d.n}
            </span>
            <h2 className="font-display font-extrabold uppercase text-2xl tracking-tight flex items-center gap-2">
              {d.title} <ArrowUpRight size={20} className="text-magenta opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h2>
            <p className="mt-2 text-sm text-soft">{d.line}</p>
          </Link>
        ))}
      </nav>
    </Container>
  );
}
