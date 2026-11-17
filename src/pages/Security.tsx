import { useMemo, useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Container, PageHeader, SectionTitle } from '../components/Layout';
import { Link } from '../router';
import { MACHINES, MACHINE_STATS, type Machine } from '../data/machines';
import { HTB_STATS, LINKS } from '../data/profile';

const FILTERS = ['All', 'Web', 'Binary', 'Credentials', 'Misconfig'] as const;
type Filter = (typeof FILTERS)[number];

const TAGS: Record<Exclude<Filter, 'All'>, RegExp> = {
  Web: /xss|template|injection|upload|file read|traversal|exposure|\.git|csrf/i,
  Binary: /overflow|memory/i,
  Credentials: /password|credential|hash|secret/i,
  Misconfig: /config|debug|default|sudo|permission|symlink|ipc|job queue|denylist/i,
};

const matches = (m: Machine, f: Filter) => f === 'All' || m.classes.some((c) => TAGS[f].test(c));

const fmt = (ym: string) =>
  new Date(`${ym}-01T00:00:00`).toLocaleDateString('en', { month: 'short', year: 'numeric' });

export default function Security() {
  const [filter, setFilter] = useState<Filter>('All');
  const list = useMemo(() => MACHINES.filter((m) => matches(m, filter)), [filter]);

  const stats = [
    { k: 'HTB rank', v: HTB_STATS.rank, c: 'text-lime' },
    { k: 'Level', v: String(HTB_STATS.level), c: 'text-cyan' },
    { k: 'Case studies', v: String(MACHINE_STATS.documented), c: 'text-magenta' },
    { k: 'CVEs covered', v: String(MACHINE_STATS.cves), c: 'text-cyan' },
  ];

  return (
    <Container>
      <PageHeader eyebrow="// security lab" title="How it" accent="breaks.">
        I practice on Hack The Box and write up every machine like a short pentest report: how I got in, why the bug existed, and what the developer should have done. The last part is the bit I bring back to my day job.
      </PageHeader>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-[4px] overflow-hidden">
        {stats.map((s) => (
          <div key={s.k} className="p-5 bg-surface">
            <div className={`font-display font-extrabold text-3xl ${s.c}`}>{s.v}</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted mt-1">{s.k}</div>
          </div>
        ))}
      </div>
      <a
        href={LINKS.htb}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs text-muted hover:text-lime"
      >
        @{HTB_STATS.handle} on Hack The Box <ArrowUpRight size={13} />
      </a>

      <SectionTitle aside={`${list.length} of ${MACHINES.length}`}>Case studies</SectionTitle>

      <div role="group" aria-label="Filter by vulnerability type" className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`font-mono text-[13px] px-4 py-1.5 rounded-full border transition-colors ${
              filter === f ? 'border-magenta text-magenta bg-magenta/10' : 'border-line text-muted hover:text-ink hover:border-muted'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((m) => (
          <Link
            key={m.slug}
            to={`/security/${m.slug}`}
            className="group relative block border border-line bg-surface rounded-[4px] p-6 card-hover"
          >
            <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider">
              <span className={`px-2 py-0.5 rounded-[3px] border ${m.os === 'Linux' ? 'text-lime border-lime/30' : 'text-cyan border-cyan/30'}`}>
                {m.os}
              </span>
              <span className="px-2 py-0.5 rounded-[3px] border border-line text-muted">{m.difficulty}</span>
              <span className="text-muted ml-auto">{fmt(m.solved)}</span>
            </div>
            <h3 className="font-display font-extrabold uppercase text-[22px] sm:text-[28px] tracking-tight flex items-center gap-2 break-words">
              {m.name}
              <ArrowUpRight size={20} className="text-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            {m.cves.length > 0 && <div className="font-mono text-xs text-magenta mt-1">{m.cves.join(' · ')}</div>}
            <p className="mt-3 text-sm text-soft leading-relaxed line-clamp-3">{m.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {m.classes.slice(0, 3).map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
              {m.classes.length > 3 && <span className="chip">+{m.classes.length - 3}</span>}
            </div>
            <div className="mt-4 flex gap-3 font-mono text-[11px]">
              <span className={m.owned.user ? 'text-lime' : 'text-muted line-through'}>user</span>
              <span className={m.owned.root ? 'text-lime' : 'text-muted line-through'}>root</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 flex gap-4 items-start border border-line border-l-2 border-l-cyan bg-surface rounded-[4px] p-5 text-sm text-soft">
        <ShieldCheck className="text-cyan shrink-0 mt-0.5" size={20} />
        <p>
          Every machine here is a retired Hack The Box lab, attacked in an authorized environment. I've left out credentials, flags, addresses, and working exploit payloads, and the screenshots are redacted the same way. The write-ups are about the reasoning and the fix, not a copy-paste path.
        </p>
      </div>
    </Container>
  );
}
