import { Link, Navigate, useParams } from 'react-router-dom';
import { agentBySlug, agents } from '@/content/agents';
import type { Agent } from '@/content/agents';
import { profile } from '@/content/site';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * One agent, in full: what it is, how to install it, what it looks like,
 * where its official home is.
 *
 * The install tutorial is deliberately light — a sticker per step — because
 * a wall of terminal commands makes nobody want to try a tool. Everything
 * ends with the official links, because software moves fast and the docs
 * outrun any page.
 */

function Steps({ steps }: { steps: Agent['install']['desktop'] }) {
  const { tl } = useLocale();
  return (
    <ol className="mt-5 space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-line-hard bg-surface text-[1.0625rem]"
          >
            {step.emoji}
          </span>
          <div className="min-w-0">
            <p className="text-[0.9375rem] font-medium text-ink">{tl(step.title)}</p>
            {step.body && (
              <p className="mt-1 font-mono text-[0.8125rem] leading-relaxed break-all text-ink-2">
                {tl(step.body)}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ShotSlot({ caption, src }: { caption: string; src?: string }) {
  const { ui } = useLocale();
  return (
    <li className="relative aspect-[16/10] border border-line bg-surface-sunken">
      {src ? (
        <img src={src} alt={caption} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-ink-3">
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="6" y="8" width="36" height="32" strokeDasharray="5 4" />
            <circle cx="19" cy="20" r="4" />
            <path d="M10 34l10-8 8 6 7-5 7 7" />
          </svg>
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
            {ui('agents.coming')}
          </span>
        </div>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-ink/80 to-transparent p-3 pt-8 text-[0.8125rem] font-medium text-[#f7f6f7]">
        {caption}
      </span>
    </li>
  );
}

export default function AgentDetail() {
  const { slug } = useParams();
  const { ui, tl, locale } = useLocale();
  const agent = slug ? agentBySlug(slug) : undefined;

  useSeo({
    title: agent ? `${agent.name} — ${tl(profile.name)}` : tl(profile.name),
    description: agent ? tl(agent.line) : '',
    path: `/agents/${slug ?? ''}`,
    locale,
  });

  if (!agent) return <Navigate to="/agents" replace />;

  const index = agents.findIndex((a) => a.slug === agent.slug);
  const next = agents[(index + 1) % agents.length];

  return (
    <div className="bg-surface-2">
      {/* Header */}
      <section className="shell pt-10 pb-6 md:pt-14">
        <Reveal>
          <Link
            to="/agents"
            className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-sakura-ink"
          >
            ← {ui('agents.backToList')}
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <span className="flex size-16 shrink-0 items-center justify-center border border-line-hard bg-surface md:size-20">
              <img
                src={agent.logo}
                alt=""
                aria-hidden="true"
                className="size-10 object-contain md:size-12"
              />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight font-bold text-ink">
                  {agent.name}
                </h1>
                {agent.fresh && <span className="chip chip-pink">{ui('agents.fresh')}</span>}
              </div>
              <p className="mt-1.5 font-mono text-[0.75rem] text-ink-3">
                {tl(agent.by)} · {tl(agent.kind)}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-[1.0625rem] leading-relaxed text-sakura-ink">
            {tl(agent.line)}
          </p>
        </Reveal>
      </section>

      {/* 强在哪 / 我的用法 / 注意 */}
      <section className="shell pb-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-6">
              <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
                {ui('agents.strengths')}
              </h2>
              <ul className="mt-4 space-y-3">
                {agent.strengths.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-sakura"
                    />
                    <p className="text-[0.9375rem] leading-relaxed text-ink-2">{tl(s)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="card h-full p-6">
              <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
                {ui('agents.usage')}
              </h2>
              <p className="mt-4 border-l-2 border-sakura pl-4 text-[0.9375rem] leading-relaxed text-ink">
                {tl(agent.usage)}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="card h-full p-6">
              <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
                {ui('agents.caveat')}
              </h2>
              <p className="mt-4 flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                <span aria-hidden="true" className="shrink-0 font-mono text-sakura-ink">
                  !
                </span>
                {tl(agent.caveat)}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 安装教程 */}
      <section className="shell pb-6">
        <Reveal>
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-[1.375rem] font-bold text-ink md:text-[1.625rem]">
              {ui('agents.installTitle')}
            </h2>
            <p className="mt-2 text-[0.875rem] text-ink-3">{ui('agents.installNote')}</p>

            <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="font-sport text-[1rem] font-bold tracking-widest text-ink uppercase">
                  💻 {ui('agents.desktop')}
                </p>
                <Steps steps={agent.install.desktop} />
              </div>
              <div className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <p className="font-sport text-[1rem] font-bold tracking-widest text-ink uppercase">
                  📱 {ui('agents.mobile')}
                </p>
                {agent.install.mobile ? (
                  <Steps steps={agent.install.mobile} />
                ) : (
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
                    {ui('agents.mobileNone')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 截图 */}
      <section className="shell pb-6">
        <Reveal>
          <div className="card p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-[1.375rem] font-bold text-ink md:text-[1.625rem]">
                {ui('agents.screenshots')}
              </h2>
              <p className="font-mono text-[0.75rem] text-ink-3">{ui('agents.screenshotsNote')}</p>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agent.screenshots.map((shot) => (
                <ShotSlot
                  key={shot.caption.en}
                  caption={tl(shot.caption)}
                  src={shot.src}
                />
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 官方来源 */}
      <section className="shell pb-14 md:pb-20">
        <Reveal>
          <div className="border-t-2 border-line-hard pt-6">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
              {ui('agents.sources')}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {agent.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 border border-line-hard bg-surface px-4 py-2 text-[0.875rem] text-ink transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-sakura-soft)]"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-2xl text-[0.8125rem] leading-relaxed text-ink-3">
              {ui('agents.docNote')}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
            <Link
              to={`/agents/${next.slug}`}
              className="font-sport text-[1rem] font-bold tracking-widest text-ink uppercase transition-colors hover:text-sakura-ink"
            >
              {ui('agents.next')} · {next.name} →
            </Link>
            <Link
              to="/agents"
              className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-sakura-ink"
            >
              {ui('agents.backToList')}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
