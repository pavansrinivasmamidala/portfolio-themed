import type { ReactNode } from 'react';
import { Link } from '../router';
import { LINKS, PROFILE } from '../data/profile';

const NAV = [
  { to: '/work', label: 'work' },
  { to: '/about', label: 'about' },
  { to: '/contact', label: 'contact' },
];

export default function Layout({ path, children }: { path: string; children: ReactNode }) {
  const section = '/' + (path.split('/')[1] ?? '');

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-lime focus:text-ink focus:px-3 focus:py-2 focus:rounded-lg font-mono text-sm">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto max-w-[1100px] px-4 sm:px-5 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="font-extrabold text-[19px] tracking-[-0.03em] shrink-0" aria-label="Home">
            <span className="inline-block bg-lime px-1.5 rounded-md -rotate-3">pavan</span>
            <span className="hidden min-[420px]:inline">srinivas.tech</span>
          </Link>
          <ul className="flex items-center gap-1 sm:gap-3 text-[15px]">
            {NAV.map((item) => {
              const active = section === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`px-2 py-1 rounded-full transition-colors ${active ? 'bg-ink text-white' : 'text-soft hover:text-ink'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="mt-16">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-5 pb-10">
          <div className="tile flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="text-sm text-soft">
              © {new Date().getFullYear()} {PROFILE.name} · made in {PROFILE.location.split(',')[0]} with React &amp; too much coffee
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <li><a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">LinkedIn</a></li>
              <li><a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">GitHub</a></li>
              <li><a href={LINKS.email} className="hover:underline underline-offset-4">Email</a></li>
              <li><Link to="/security" className="hover:underline underline-offset-4">Side quests 🔐</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1100px] px-4 sm:px-5 ${className}`}>{children}</div>;
}

/** Big intro tile used at the top of inner pages. */
export function PageHeader({ label, title, children, tone = 'tile' }: { label: string; title: ReactNode; children?: ReactNode; tone?: 'tile' | 'lime' | 'sky' | 'lilac' | 'coral' }) {
  const bg = { tile: 'bg-tile', lime: 'bg-lime', sky: 'bg-sky', lilac: 'bg-lilac', coral: 'bg-coral' }[tone];
  return (
    <header className={`tile ${bg} ${tone !== 'tile' ? 'border-transparent' : ''} mt-2 p-7 sm:p-10`}>
      <div className={`label ${tone !== 'tile' ? 'text-ink/70' : ''}`}>{label}</div>
      <h1 className="mt-3 font-extrabold tracking-[-0.045em] leading-[0.98] text-[clamp(38px,6.5vw,68px)]">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-[17px] sm:text-lg leading-relaxed text-soft">{children}</div>}
    </header>
  );
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mt-14 mb-4 px-1">
      <h2 className="font-extrabold tracking-[-0.03em] text-2xl sm:text-[28px]">{children}</h2>
      {aside && <div className="label">{aside}</div>}
    </div>
  );
}
