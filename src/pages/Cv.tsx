import { profile, skillGroups, timeline } from '@/content/site';
import { projects } from '@/content/projects';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * 简历 — a print-focussed, one-document version of the site.
 *
 * Everything is drawn from the same content files as the home page, so this
 * can never drift from the site. It exists for two jobs: `make-cv.mjs`
 * prints it to public/assets/CuiLina-CV.pdf, and a visitor can open /cv
 * and print it themselves. Under print, the site chrome disappears and the
 * page becomes a plain paper document.
 */
export default function Cv() {
  const { tl } = useLocale();

  return (
    <div className="cv-page bg-surface-2">
      <div className="shell max-w-4xl py-10 md:py-14 print:max-w-none print:py-0">
        {/* Head */}
        <header className="border-b-2 border-line-hard pb-5">
          <h1 className="font-display text-[1.75rem] font-bold text-ink">{tl(profile.name)}</h1>
          <p className="mt-1 text-[0.9375rem] text-sakura-ink">{tl(profile.title)}</p>
          <p className="mt-2.5 font-mono text-[0.8125rem] text-ink-2">
            {profile.email} · {tl(profile.location)} · {profile.github}
          </p>
        </header>

        {/* 概述 */}
        <section className="mt-6">
          <p className="text-[0.9375rem] leading-relaxed text-ink">{tl(profile.statement)}</p>
        </section>

        {/* 项目 */}
        <section className="mt-8">
          <h2 className="cv-h font-sport text-[0.9375rem] font-bold tracking-[0.18em] text-ink uppercase">
            {tl({ zh: '项目经历', en: 'Projects' })}
          </h2>
          <div className="mt-3 space-y-5">
            {projects.map((p) => (
              <article key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h3 className="text-[0.9375rem] font-semibold text-ink">
                    {tl(p.title)}
                    <span className="ml-2 font-mono text-[0.75rem] font-normal text-ink-3">
                      {p.period}
                    </span>
                  </h3>
                  <span className="font-mono text-[0.75rem] text-ink-3">
                    {p.metrics.map((m) => `${tl(m.label)} ${m.value}`).join(' · ')}
                  </span>
                </div>
                <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">
                  {tl(p.context)}
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-[0.875rem] leading-relaxed text-ink-2">
                  {p.contributions.slice(0, 2).map((c, i) => (
                    <li key={i}>{tl(c)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 经历 */}
        <section className="mt-8">
          <h2 className="cv-h font-sport text-[0.9375rem] font-bold tracking-[0.18em] text-ink uppercase">
            {tl({ zh: '经历', en: 'Experience & education' })}
          </h2>
          <div className="mt-3 space-y-4">
            {timeline.map((e) => (
              <div key={e.period + e.org.en} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <div>
                  <span className="text-[0.9375rem] font-semibold text-ink">{tl(e.org)}</span>
                  <span className="ml-2 text-[0.875rem] text-ink-2">{tl(e.role)}</span>
                  {e.note && (
                    <span className="ml-2 font-mono text-[0.75rem] text-sky-ink">{tl(e.note)}</span>
                  )}
                </div>
                <span className="font-mono text-[0.75rem] text-ink-3">{e.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 技能 */}
        <section className="mt-8">
          <h2 className="cv-h font-sport text-[0.9375rem] font-bold tracking-[0.18em] text-ink uppercase">
            {tl({ zh: '技能', en: 'Skills' })}
          </h2>
          <div className="mt-3 space-y-2.5">
            {skillGroups.map((g) => (
              <p key={g.label.en} className="text-[0.875rem] leading-relaxed text-ink-2">
                <span className="font-medium text-ink">{tl(g.label)}：</span>
                {g.items.join(' · ')}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
