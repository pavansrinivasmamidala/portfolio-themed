import type { ReactNode } from 'react';
import { Github, Mail, Box, Linkedin } from 'lucide-react';
import { Link } from '../router';
import { LINKS, PROFILE } from '../data/profile';

const NAV = [
  { to: '/about', label: 'about' },
  { to: '/work', label: 'work' },
  { to: '/security', label: 'security' },
  { to: '/contact', label: 'contact' },
];

export default function Layout({ path, children }: { path: string; children: ReactNode }) {
  const section = '/' + (path.split('/')[1] ?? '');

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-magenta focus:text-bg focus:px-3 focus:py-2 font-mono text-sm">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
        <nav className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4 font-mono text-[13px]">
          <Link to="/" className="font-bold tracking-wider text-cyan shrink-0" aria-label="Home">
            PS<span className="text-magenta">//</span>DEV
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => {
              const active = section === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`px-2 py-1 rounded transition-colors ${
                      active ? 'text-magenta' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {active && <span aria-hidden>./</span>}
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

      <footer className="border-t border-line mt-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-6 sm:items-center justify-between font-mono text-xs text-muted">
          <div>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-magenta">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan">
              <Github size={14} /> GitHub
            </a>
            <a href={LINKS.htb} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-lime">
              <Box size={14} /> Hack The Box
            </a>
            <a href={LINKS.email} className="inline-flex items-center gap-1.5 hover:text-magenta">
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: ReactNode }) {
  return (
    <header className="pt-16 sm:pt-24 pb-10">
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h1 className="font-display font-extrabold uppercase tracking-tight leading-[0.92] text-[clamp(40px,8vw,80px)]">
        {title} {accent && <span className="text-magenta glow-magenta">{accent}</span>}
      </h1>
      {children && <div className="mt-6 max-w-2xl text-soft text-lg leading-relaxed">{children}</div>}
    </header>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mt-20 mb-6 border-b border-line pb-3">
      <h2 className="font-display font-extrabold uppercase tracking-tight text-2xl sm:text-3xl">{children}</h2>
      {aside && <div className="font-mono text-xs text-muted">{aside}</div>}
    </div>
  );
}
