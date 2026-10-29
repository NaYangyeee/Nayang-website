import { profile, timeline } from '@/content/site';
import type { TimelineEntry } from '@/content/types';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

function Entry({ entry }: { entry: TimelineEntry }) {
  const { tl } = useLocale();

  return (
    <li className="relative pl-7">
      {/* The rail and its node. A rotated square rather than a dot, which
          echoes the bullet shape used in the work section. */}
      <span
        aria-hidden="true"
        className="absolute top-[0.55rem] left-0 size-2 rotate-45 border border-line-hard bg-sakura"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
        <h4 className="font-display text-[1.0625rem] font-bold text-ink">{tl(entry.org)}</h4>
        <span className="font-mono text-[0.75rem] whitespace-nowrap text-ink-3">
          {entry.period}
        </span>
      </div>
      <p className="mt-1 text-[0.9375rem] text-sakura-ink">{tl(entry.role)}</p>
      {entry.note && (
        <p className="mt-1 font-mono text-[0.75rem] text-sky-ink">{tl(entry.note)}</p>
      )}
      {entry.detail && (
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">{tl(entry.detail)}</p>
      )}
    </li>
  );
}

export function Path() {
  const { ui, tl } = useLocale();
  const work = timeline.filter((e) => e.kind === 'work');
  const education = timeline.filter((e) => e.kind === 'education');

  return (
    <section id="path" className="section-y bg-surface-2">
      <div className="shell">
        <Reveal>
          <p className="label">{ui('path.eyebrow')}</p>
          <h2 className="mt-4 font-display text-[clamp(1.875rem,4.5vw,3rem)] leading-tight font-bold text-ink">
            {ui('path.title')}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink">
              {tl(profile.statement)}
            </p>
          </Reveal>

          <div />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
              {ui('path.work')}
            </h3>
            <ul className="mt-6 space-y-8 border-l border-line pl-0">
              {work.map((entry) => (
                <Entry key={entry.period + entry.org.en} entry={entry} />
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h3 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
              {ui('path.education')}
            </h3>
            <ul className="mt-6 space-y-8 border-l border-line pl-0">
              {education.map((entry) => (
                <Entry key={entry.period + entry.org.en} entry={entry} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
