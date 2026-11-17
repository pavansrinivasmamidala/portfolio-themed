import { Sparkles } from 'lucide-react';
import type { Project } from '../data/projects';

const ACCENT = {
  magenta: { text: 'text-magenta', glow: 'rgba(255,46,151,0.22)' },
  cyan: { text: 'text-cyan', glow: 'rgba(25,240,228,0.18)' },
  lime: { text: 'text-lime', glow: 'rgba(198,255,61,0.16)' },
} as const;

/** Screenshot when we have one; otherwise a typographic cover in the site's style. */
export function ProjectVisual({ project, className = '' }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }
  const accent = ACCENT[project.cover ?? 'magenta'];
  return (
    <div
      role="img"
      aria-label={`${project.title} cover`}
      className={`relative h-full w-full overflow-hidden bg-surface-2 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 75% 20%, ${accent.glow}, transparent 55%),
          linear-gradient(var(--color-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-line) 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 28px 28px, 28px 28px',
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${accent.text}`}>{project.kind}</span>
        <span className="font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[clamp(28px,5vw,48px)] text-ink mt-2">
          {project.title}
        </span>
      </div>
    </div>
  );
}

export function AiBadge({ tool, size = 'sm' }: { tool: string; size?: 'sm' | 'md' }) {
  return (
    <span
      title={`Built with AI (${tool}). I directed, tested, debugged and shipped it.`}
      className={`inline-flex items-center gap-1 font-mono uppercase tracking-wider rounded-[3px] border border-cyan/40 text-cyan bg-bg/85 ${
        size === 'sm' ? 'text-[10px] px-2 py-1' : 'text-[11px] px-2.5 py-1'
      }`}
    >
      <Sparkles size={size === 'sm' ? 11 : 12} aria-hidden /> Built with AI
    </span>
  );
}
