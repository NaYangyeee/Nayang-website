import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * 多面 — one door, not a museum.
 *
 * The home page is a job application; this strip is the single strongest
 * non-work facet, presented as one wide card at the very end. The size of
 * the section is the design decision: everything above sells the engineer,
 * and this is deliberately a footnote with a door on it. More facets can
 * join later as their own cards, but each one has to earn its slot against
 * the same question — does a hiring manager who reads it understand her
 * better, or is the page just longer.
 */
export function Beyond() {
  const { ui } = useLocale();

  return (
    <section id="beyond" className="section-y bg-surface">
      <div className="shell">
        <Reveal>
          <p className="label">{ui('beyond.eyebrow')}</p>
          <h2 className="mt-4 font-display text-[clamp(1.875rem,4.5vw,3rem)] leading-tight font-bold text-ink">
            {ui('beyond.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
            {ui('beyond.lede')}
          </p>
        </Reveal>

        <Reveal>
          <Link
            to="/badminton"
            className="card group mt-10 flex flex-col justify-between gap-8 p-7 transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-sakura-soft)] md:flex-row md:items-center md:gap-12 md:p-9"
          >
            <div className="flex items-center gap-5 md:gap-8">
              {/* A shuttlecock, drawn simply: it is the one glyph that needs
                  no translation. */}
              <svg
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="size-12 shrink-0 md:size-16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M24 6c7 5 11 11 11 18 0 3-1 5-3 6l-8-8-8 8c-2-1-3-3-3-6 0-7 4-13 11-18Z" />
                <path d="M24 6v16" opacity="0.6" />
                <path d="M24 30l-8 8M24 30l8 8" opacity="0.6" />
              </svg>
              <div>
                <h3 className="font-sport text-[1.5rem] font-bold tracking-wide text-ink uppercase md:text-[1.875rem]">
                  {ui('beyond.badmintonTitle')}
                </h3>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                  {ui('beyond.badmintonText')}
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-3 font-sport text-[0.9375rem] font-semibold tracking-widest text-sakura-ink uppercase transition-transform duration-200 group-hover:translate-x-1">
              {ui('beyond.go')}
              <span aria-hidden="true" className="text-[1.25rem] leading-none">
                →
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
