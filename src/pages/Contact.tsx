import { useState } from 'react';
import { Copy, Check, Github, Box, Mail } from 'lucide-react';
import { Container } from '../components/Layout';
import { PROFILE, LINKS, HTB_STATS } from '../data/profile';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = LINKS.email;
    }
  };

  const rows = [
    { icon: Github, label: 'GitHub', value: '@pavansrinivasmamidala', href: LINKS.github, hover: 'hover:text-cyan' },
    { icon: Box, label: 'Hack The Box', value: `@${HTB_STATS.handle}`, href: LINKS.htb, hover: 'hover:text-lime' },
  ];

  return (
    <Container>
      <section className="pt-20 sm:pt-32">
        <div className="eyebrow mb-6">// contact</div>
        <h1 className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(48px,11vw,112px)]">
          Let’s <span className="text-stroke-cyan">talk</span>
          <span className="text-magenta glow-magenta">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-soft text-lg leading-relaxed">
          {PROFILE.status}. Whether it’s a React codebase that needs care or an app you want someone to poke at, I’d like to hear about it.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl">
          <a
            href={LINKS.email}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-magenta text-bg font-semibold px-5 py-4 rounded-[4px] hover:bg-ink transition-colors break-all"
          >
            <Mail size={18} className="shrink-0" /> {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 border border-line px-5 py-4 rounded-[4px] font-mono text-sm hover:border-cyan hover:text-cyan transition-colors"
            aria-live="polite"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'copied' : 'copy'}
          </button>
        </div>

        <ul className="mt-12 max-w-xl divide-y divide-line border-y border-line">
          {rows.map((r) => (
            <li key={r.label}>
              <a href={r.href} target="_blank" rel="noreferrer" className={`flex items-center justify-between gap-4 py-4 transition-colors ${r.hover}`}>
                <span className="inline-flex items-center gap-3 font-mono text-sm text-muted">
                  <r.icon size={16} /> {r.label}
                </span>
                <span className="font-mono text-sm">{r.value} ↗</span>
              </a>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4 py-4">
            <span className="font-mono text-sm text-muted">Based in</span>
            <span className="font-mono text-sm">{PROFILE.location}</span>
          </li>
        </ul>
      </section>
    </Container>
  );
}
