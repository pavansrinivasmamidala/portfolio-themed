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
    { k: 'HTB rank', v: HTB_STATS.rank, bg: 'bg-lime' },
    { k: 'level', v: String(HTB_STATS.level), bg: 'bg-sky' },
    { k: 'write-ups', v: String(MACHINE_STATS.documented), bg: 'bg-lilac' },
    { k: 'CVEs covered', v: String(MACHINE_STATS.cves), bg: 'bg-keys' },
  ];

  return (
    <Container>
      <PageHeader label="side quest" tone="coral" title={<>I also break web apps (legally) 🔐</>}>
        <span className="text-ink/80">
          On weekends I work through Hack The Box machines and write each one up like a short pentest report: how I got in, why the bug existed,
          and what the developer should have done. That last part is what I bring back to frontend work.
        </span>
      </PageHeader>

      <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {stats.map((s) => (
          <div key={s.k} className={`tile ${s.bg} border-transparent`}>
            <div className="text-3xl font-extrabold tracking-[-0.03em]">{s.v}</div>
            <div className="label text-ink/70 mt-1">{s.k}</div>
          </div>
        ))}
      </div>
      <a href={LINKS.htb} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-3 px-1 text-sm font-semibold text-soft hover:text-ink">
        @{HTB_STATS.handle} on Hack The Box <ArrowUpRight size={14} />
      </a>

      <SectionTitle aside={`${list.length} of ${MACHINES.length}`}>Write-ups</SectionTitle>

      <div role="group" aria-label="Filter by vulnerability type" className="flex flex-wrap gap-2 mb-5 px-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === f ? 'bg-ink text-white' : 'bg-tile border border-line text-soft hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        {list.map((m) => (
          <Link key={m.slug} to={`/security/${m.slug}`} className="tile group p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{m.os}</span>
              <span className="chip">{m.difficulty}</span>
              <span className="label ml-auto">{fmt(m.solved)}</span>
            </div>
            <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] flex items-center gap-1.5">
              {m.name}
              <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            </h3>
            {m.cves.length > 0 && <div className="mt-0.5 font-mono text-xs text-soft">{m.cves.join(' · ')}</div>}
            <p className="mt-2.5 text-sm text-soft leading-relaxed line-clamp-3">{m.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {m.classes.slice(0, 3).map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
              {m.classes.length > 3 && <span className="chip">+{m.classes.length - 3}</span>}
              <span className="ml-auto inline-flex gap-1">
                <span className={`chip ${m.owned.user ? 'bg-lime text-ink' : 'line-through'}`}>user</span>
                <span className={`chip ${m.owned.root ? 'bg-lime text-ink' : 'line-through'}`}>root</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="tile mt-3.5 flex gap-4 items-start bg-keys border-transparent text-sm text-soft">
        <ShieldCheck className="shrink-0 mt-0.5 text-ink" size={20} />
        <p>
          Every machine here is a retired Hack The Box lab, attacked in an authorized environment. I've left out credentials, flags, addresses and
          working exploit payloads, and the screenshots are redacted the same way. The write-ups are about the reasoning and the fix, not a
          copy-paste path.
        </p>
      </div>
    </Container>
  );
}
