import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { Container } from '../components/Layout';
import { PROFILE, EXPERIENCE, LINKS } from '../data/profile';
import { getProject } from '../data/projects';
import { MACHINE_STATS } from '../data/machines';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Two googly eyes that follow the cursor (or the last tap on touch screens). */
function Eyes() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const follow = (e: PointerEvent) => {
      ref.current?.querySelectorAll<HTMLElement>('[data-eye]').forEach((eye) => {
        const r = eye.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(12, Math.hypot(e.clientX - cx, e.clientY - cy) / 12);
        (eye.firstElementChild as HTMLElement).style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    };
    window.addEventListener('pointermove', follow);
    window.addEventListener('pointerdown', follow);
    return () => {
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('pointerdown', follow);
    };
  }, []);
  return (
    <div ref={ref} className="tile min-h-[150px] p-4 sm:p-5 sm:min-h-[170px] bg-sky border-transparent flex flex-col items-center justify-center gap-3 text-center" aria-hidden>
      <div className="flex gap-2.5">
        {[0, 1].map((i) => (
          <div key={i} data-eye className="relative h-11 w-11 sm:h-[54px] sm:w-[54px] rounded-full border-[3px] border-ink bg-white">
            <div className="absolute left-1/2 top-1/2 -ml-2 -mt-2 h-4 w-4 sm:-ml-2.5 sm:-mt-2.5 sm:h-5 sm:w-5 rounded-full bg-ink transition-transform duration-75" />
          </div>
        ))}
      </div>
      <p className="text-[13px] leading-snug">
        <span className="pointer-coarse:hidden">I'm watching your cursor.<br />It's a frontend thing.</span>
        <span className="hidden pointer-coarse:inline">Tap anywhere.<br />I'm watching 👀</span>
      </p>
    </div>
  );
}

function Clock() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Toronto' });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="tile min-h-[150px] p-4 sm:p-5 sm:min-h-[170px] bg-lilac border-transparent flex flex-col justify-between">
      <div className="label text-ink/70">my time</div>
      <div className="font-extrabold text-[38px] sm:text-[44px] tracking-[-0.05em] leading-none" aria-label={`${time} in Toronto`}>{time}</div>
      <div className="label text-ink/70">toronto, ca</div>
    </div>
  );
}

const STACK = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Redux', 'Node', 'Socket.io', 'WebRTC', 'Express'];
const ACCENTED = new Set(['React', 'Redux']);

/** Skill keycaps. They press on click/tap, and when you type their first letter. */
function Keys() {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const press = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      ref.current?.querySelectorAll<HTMLElement>('.key').forEach((k) => {
        if (k.textContent?.[0].toLowerCase() === e.key.toLowerCase()) {
          k.classList.add('down');
          setTimeout(() => k.classList.remove('down'), 120);
        }
      });
    };
    window.addEventListener('keydown', press);
    return () => window.removeEventListener('keydown', press);
  }, []);
  return (
    <div className="tile bg-keys border-transparent col-span-2">
      <div className="label">tap the keys · my stack</div>
      <ul ref={ref} className="mt-4 flex flex-wrap gap-2">
        {STACK.map((s) => (
          <li key={s} className={`key ${ACCENTED.has(s) ? 'bg-lime' : ''}`}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function WideProject({ slug }: { slug: string }) {
  const p = getProject(slug);
  if (!p) return null;
  return (
    <Link to={`/work/${p.slug}`} className="tile p-0 col-span-2 grid sm:grid-cols-[1.1fr_1fr] group">
      <img src={p.image} alt={`Screenshot of ${p.title}`} className="w-full aspect-[16/10] sm:aspect-auto sm:h-full object-cover object-left-top" />
      <div className="p-5 flex flex-col justify-between gap-4">
        <div>
          <div className="label">{p.kind.toLowerCase()} · {p.year}</div>
          <h3 className="mt-1.5 text-2xl font-extrabold tracking-[-0.03em]">{p.title}</h3>
          <p className="mt-1 text-sm text-soft leading-relaxed line-clamp-2">{p.tagline}</p>
        </div>
        <span className="text-sm font-semibold inline-flex items-center gap-1">
          read more <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function SmallProject({ slug, wide = false }: { slug: string; wide?: boolean }) {
  const p = getProject(slug);
  if (!p) return null;
  return (
    <Link to={`/work/${p.slug}`} className={`tile p-0 min-h-[170px] ${wide ? 'col-span-2' : ''}`}>
      <img src={p.image} alt={`Screenshot of ${p.title}`} className="absolute inset-0 h-full w-full object-cover object-left-top" />
      <span className="absolute left-3 bottom-3 rounded-[10px] bg-white/95 px-2.5 py-1.5 text-sm font-semibold">{p.title}</span>
    </Link>
  );
}

export default function Home() {
  const current = EXPERIENCE.find((j) => j.current);
  const [first, ...rest] = PROFILE.shortName.split(' ');

  return (
    <Container>
      <h1 className="sr-only">{PROFILE.name}, {PROFILE.role}</h1>
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5 lg:grid-cols-4 lg:auto-rows-[minmax(170px,auto)]">
        <section className="tile col-span-2 lg:row-span-2 flex flex-col justify-between gap-6 p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="label">{PROFILE.role.toLowerCase()} · {PROFILE.location.split(',')[0].toLowerCase()}</div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden /> {PROFILE.status.toLowerCase()}
            </span>
          </div>
          <p className="font-extrabold tracking-[-0.05em] leading-[0.98] text-[clamp(40px,5vw,60px)]" aria-hidden>
            I make the web feel <span className="scribble">snappy</span>.
          </p>
          <div>
            <p className="text-[17px] leading-relaxed text-soft max-w-md">
              Hi, I'm {first} {rest.join(' ')}. {PROFILE.tagline}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/work" className="btn-ink">See my work</Link>
              <Link to="/about" className="btn-line">About me</Link>
            </div>
          </div>
        </section>

        <Eyes />

        <div className="tile min-h-[150px] p-4 sm:p-5 sm:min-h-[170px] bg-ink text-zinc-100 border-transparent">
          <div className="label text-zinc-400">now</div>
          <h2 className="mt-2.5 text-lg sm:text-[22px] font-extrabold tracking-[-0.03em] leading-tight">{current?.role} @ BMO</h2>
          <p className="mt-1 text-sm text-zinc-400">Real-time React, Redux, OpenFin</p>
        </div>

        <Clock />

        <Link to="/security" className="tile min-h-[150px] p-4 sm:p-5 sm:min-h-[170px] bg-coral border-transparent flex flex-col justify-between">
          <div className="label text-ink/70">side quest</div>
          <h2 className="text-lg sm:text-[22px] font-extrabold tracking-[-0.03em] leading-[1.1]">I also break web apps (legally) 🔐</h2>
          <span className="text-sm font-semibold">{MACHINE_STATS.documented} write-ups →</span>
        </Link>

        <WideProject slug="keyclash" />
        <WideProject slug="doodlebop" />

        <SmallProject slug="lumiere" />
        <SmallProject slug="bearly-wait" />
        <Keys />

        <div className="tile col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-[28px] sm:text-[30px] font-extrabold tracking-[-0.04em] leading-tight">Got a UI that needs love?</h2>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link to="/contact" className="btn-ink">Say hi</Link>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn-line">LinkedIn</a>
          </div>
        </div>
        <SmallProject slug="baby-tracker" wide />
      </div>
    </Container>
  );
}
