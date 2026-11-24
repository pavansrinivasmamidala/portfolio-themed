import { useState } from 'react';
import { Copy, Check, Github, Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { Container } from '../components/Layout';
import { PROFILE, LINKS } from '../data/profile';

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

  const links = [
    { icon: Linkedin, label: 'LinkedIn', value: '/in/pavan-srinivas-m', href: LINKS.linkedin, bg: 'bg-sky' },
    { icon: Github, label: 'GitHub', value: '@pavansrinivasmamidala', href: LINKS.github, bg: 'bg-lilac' },
  ];

  return (
    <Container>
      <div className="grid gap-3.5 lg:grid-cols-[1.4fr_1fr]">
        <section className="tile p-7 sm:p-10 flex flex-col justify-between gap-8 min-h-[340px]">
          <div>
            <div className="label">contact · {PROFILE.status.toLowerCase()}</div>
            <h1 className="mt-3 font-extrabold tracking-[-0.05em] leading-[0.95] text-[clamp(44px,8vw,88px)]">
              Say <span className="scribble">hi</span> 👋
            </h1>
            <p className="mt-5 max-w-lg text-lg text-soft leading-relaxed">
              Got a React codebase that needs care, a UI that needs polish, or a team that needs a frontend engineer? I'd like to hear about it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <a href={LINKS.email} className="btn-ink justify-center break-all">
              <Mail size={16} className="shrink-0" /> {PROFILE.email}
            </a>
            <button type="button" onClick={copy} className="btn-line justify-center" aria-live="polite">
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'copied!' : 'copy'}
            </button>
          </div>
        </section>

        <div className="grid gap-3.5">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={`tile ${l.bg} border-transparent flex flex-col justify-between min-h-[150px]`}>
              <div className="flex items-center justify-between">
                <l.icon size={22} aria-hidden />
                <ArrowUpRight size={20} aria-hidden />
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-[-0.03em]">{l.label}</div>
                <div className="font-mono text-[13px] text-ink/70">{l.value}</div>
              </div>
            </a>
          ))}
          <div className="tile bg-ink text-zinc-100 border-transparent">
            <div className="label text-zinc-400">based in</div>
            <div className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">{PROFILE.location}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
