import { agents, intro } from '@/content/agents';
import type { Agent } from '@/content/agents';
import { profile } from '@/content/site';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * 智能体笔记 — the same light editorial system as the home page, because
 * this page is work, not hobby: it carries the same cards, the same black
 * edges, the same sakura punctuation. No dark tone here — the court page
 * keeps its contrast all to itself.
 */

function AgentCard({ agent }: { agent: Agent }) {
  const { ui, tl } = useLocale();

  return (
    <article className="card flex h-full flex-col p-6 md:p-8">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-[1.375rem] font-bold text-ink md:text-[1.5rem]">
            {agent.name}
          </h2>
          {agent.fresh && <span className="chip chip-pink">{ui('agents.fresh')}</span>}
        </div>
        <p className="mt-1.5 font-mono text-[0.75rem] text-ink-3">
          {tl(agent.by)} · {tl(agent.kind)}
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-sakura-ink">{tl(agent.line)}</p>
      </header>

      <div className="mt-6">
        <h3 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
          {ui('agents.strengths')}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {agent.strengths.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-sakura" />
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">{tl(s)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-l-2 border-sakura pl-4">
        <h3 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
          {ui('agents.usage')}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{tl(agent.usage)}</p>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-3">
          <span aria-hidden="true" className="shrink-0 font-mono text-sakura-ink">
            !
          </span>
          {tl(agent.caveat)}
        </p>
      </div>
    </article>
  );
}

export default function Agents() {
  const { ui, tl, locale } = useLocale();

  useSeo({
    title: `${tl(intro.title)} — ${tl(profile.name)}`,
    description: tl(intro.lede),
    path: '/agents',
    locale,
  });

  return (
    <div className="bg-surface-2">
      <section className="shell pt-14 pb-8 md:pt-20">
        <Reveal>
          <p className="label">{ui('agents.eyebrow')}</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold text-ink">
            {tl(intro.title)}
          </h1>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-2">
            {tl(intro.lede)}
          </p>
        </Reveal>
      </section>

      <section className="shell pb-16 md:pb-24">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {agents.map((agent) => (
            <Reveal key={agent.name}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-3xl border-l-2 border-sakura pl-4 text-[0.8125rem] leading-relaxed text-ink-3">
            {ui('agents.note')}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
