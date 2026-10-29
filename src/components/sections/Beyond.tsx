import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * 多面 — two doors, not a museum.
 *
 * The home page is a job application; this strip is the two strongest
 * non-work facets, each one card, at the very end. The size of the section
 * is the design decision: everything above sells the engineer, and this is
 * deliberately a footnote with doors on it. More facets can join later as
 * their own cards, but each one has to earn its slot against the same
 * question — does a hiring manager who reads it understand her better, or
 * is the page just longer.
 */

/** A shuttlecock — the one glyph that needs no translation. */
function Shuttle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M24 6c7 5 11 11 11 18 0 3-1 5-3 6l-8-8-8 8c-2-1-3-3-3-6 0-7 4-13 11-18Z" />
      <path d="M24 6v16" opacity="0.6" />
      <path d="M24 30l-8 8M24 30l8 8" opacity="0.6" />
    </svg>
  );
}

/** A row of books — the glyph for the study. */
function BookRow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 38V14a2 2 0 0 1 2-2h6v26h-6a2 2 0 0 0-2 2Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M20 12h8v26h-8" fill="currentColor" fillOpacity="0.14" />
      <path d="M30 12h6a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2h-6V12Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M24 16v18" opacity="0.5" />
    </svg>
  );
}

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

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* 羽球 */}
          <Reveal>
            <Link
              to="/badminton"
              className="card group flex h-full flex-col justify-between gap-6 p-7 transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-sakura-soft)]"
            >
              <div className="flex items-center gap-5">
                <Shuttle className="size-11 shrink-0 text-sakura-ink" />
                <div>
                  <h3 className="font-sport text-[1.375rem] font-bold tracking-wide text-ink uppercase">
                    {ui('beyond.badmintonTitle')}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                    {ui('beyond.badmintonText')}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-3 font-sport text-[0.9375rem] font-semibold tracking-widest text-sakura-ink uppercase transition-transform duration-200 group-hover:translate-x-1">
                {ui('beyond.go')} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>

          {/* 书架 */}
          <Reveal>
            <Link
              to="/books"
              className="card group flex h-full flex-col justify-between gap-6 p-7 transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-sakura-soft)]"
            >
              <div className="flex items-center gap-5">
                <BookRow className="size-11 shrink-0 text-sakura-ink" />
                <div>
                  <h3 className="font-sport text-[1.375rem] font-bold tracking-wide text-ink uppercase">
                    {ui('books.beyondTitle')}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                    {ui('books.beyondText')}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-3 font-sport text-[0.9375rem] font-semibold tracking-widest text-sakura-ink uppercase transition-transform duration-200 group-hover:translate-x-1">
                {ui('beyond.go')} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
