import { projects } from '@/content/projects';
import type { Project, Provenance, Stage } from '@/content/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';
import { cn } from '@/lib/utils';

const STAGE_KEY: Record<Stage, 'stage.production' | 'stage.pilot' | 'stage.personal'> = {
  production: 'stage.production',
  pilot: 'stage.pilot',
  personal: 'stage.personal',
};

const PROV_KEY: Record<Provenance, 'prov.measured' | 'prov.spec' | 'prov.illustrative'> = {
  measured: 'prov.measured',
  spec: 'prov.spec',
  illustrative: 'prov.illustrative',
};

/**
 * Stage badge.
 *
 * Only `production` gets the pink fill. A pilot and a personal project are
 * labelled plainly, because the badge exists to tell the reader what they
 * are looking at, not to make three different things look equally shipped.
 */
function StageBadge({ stage }: { stage: Stage }) {
  const { ui } = useLocale();
  return (
    <span
      className={cn(
        'chip',
        stage === 'production' && 'chip-pink',
        stage !== 'production' && 'text-ink-2',
      )}
    >
      {ui(STAGE_KEY[stage])}
    </span>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  const { ui, tl } = useLocale();

  return (
    <article className="card p-6 md:p-9">
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h3 className="font-display text-[1.375rem] leading-snug font-bold text-ink md:text-[1.625rem]">
            {tl(project.title)}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-snug text-sakura-ink">
            {tl(project.tagline)}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <StageBadge stage={project.stage} />
          <span className="font-mono text-[0.75rem] text-ink-3">{project.period}</span>
        </div>
      </header>

      <div className="mt-7 grid gap-7 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        <div>
          <h4 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
            {ui('work.context')}
          </h4>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
            {tl(project.context)}
          </p>

          <h4 className="mt-7 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
            {ui('work.did')}
          </h4>
          <ul className="mt-3 space-y-3.5">
            {project.contributions.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-sakura"
                />
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{tl(item)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <dl className="grid gap-px border border-line-hard bg-line-hard sm:grid-cols-2 lg:grid-cols-1">
            {project.metrics.map((m) => (
              <div key={m.value} className="bg-surface p-4">
                <dt className="sr-only">{tl(m.label)}</dt>
                <dd>
                  <span className="block font-display text-[1.375rem] leading-none font-semibold text-sky-ink tabular-nums">
                    {m.value}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] font-medium text-ink">
                    {tl(m.label)}
                  </span>
                  {m.detail && (
                    <span className="mt-0.5 block text-[0.75rem] text-ink-3">{tl(m.detail)}</span>
                  )}
                  {/*
                    The provenance tag. Small, always present, and the reason
                    a reader can take the big number at face value — a page
                    where every figure says where it came from is making a
                    claim that a page of bare numbers cannot.
                  */}
                  <span className="mt-2 inline-block font-mono text-[0.625rem] tracking-wide text-ink-3 uppercase">
                    {ui(PROV_KEY[m.provenance])}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const { ui } = useLocale();

  return (
    <section id="work" className="section-y bg-surface-2">
      <div className="shell">
        <Reveal>
          <p className="label">{ui('work.eyebrow')}</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.875rem,4.5vw,3rem)] leading-tight font-bold text-ink">
            {ui('work.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
            {ui('work.lede')}
          </p>
        </Reveal>

        <div className="mt-12 space-y-6 md:space-y-8">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectBlock project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-3xl border-l-2 border-sakura pl-4 text-[0.8125rem] leading-relaxed text-ink-3">
            {ui('prov.explain')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
