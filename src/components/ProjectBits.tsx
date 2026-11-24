import { Sparkles } from 'lucide-react';
import type { Project } from '../data/projects';

const COVER = { magenta: 'bg-lilac', cyan: 'bg-sky', lime: 'bg-lime' } as const;

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
  return (
    <div role="img" aria-label={`${project.title} cover`} className={`h-full w-full flex flex-col justify-end p-6 ${COVER[project.cover ?? 'lime']} ${className}`}>
      <span className="label text-ink/70">{project.kind}</span>
      <span className="mt-1 font-extrabold tracking-[-0.04em] text-[clamp(28px,5vw,44px)] leading-none">{project.title}</span>
    </div>
  );
}

export function AiBadge({ tool }: { tool: string }) {
  return (
    <span
      title={`Built with AI (${tool}). I directed, tested, debugged and shipped it.`}
      className="inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-ink"
    >
      <Sparkles size={12} aria-hidden /> built with AI
    </span>
  );
}
