import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { badminton, type GalleryItem } from '@/content/badminton';
import { profile } from '@/content/site';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * The badminton page.
 *
 * Its own tone (`.tone-court`): the home page is a light, editorial
 * document; this is a night match. Nike's sports pages supply the moves —
 * one giant word, full-bleed photography, numbers up top — while the
 * site's own system supplies the type scale, and the check-scripts still
 * apply.
 *
 * The page is built to grow. Photos are data: appending an entry to
 * `gallery` is all it takes to appear in the grid and the lightbox.
 */

/** A fragment of a badminton court, drawn as thin lines. */
function CourtLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 300"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect x="20" y="20" width="560" height="260" opacity="0.5" />
      <line x1="300" y1="20" x2="300" y2="280" opacity="0.5" />
      <rect x="150" y="80" width="300" height="140" opacity="0.35" />
      <line x1="20" y1="150" x2="580" y2="150" opacity="0.35" />
      <line x1="20" y1="150" x2="580" y2="150" strokeDasharray="6 5" opacity="0.8" />
      <line x1="300" y1="80" x2="300" y2="150" opacity="0.3" />
      <line x1="300" y1="150" x2="300" y2="220" opacity="0.3" />
      <line x1="150" y1="150" x2="150" y2="220" opacity="0.3" />
      <line x1="450" y1="80" x2="450" y2="150" opacity="0.3" />
      <circle cx="300" cy="150" r="3" opacity="0.7" />
    </svg>
  );
}

/** A stat cell whose value is a visible placeholder. */
function StatCell({ value, label }: { value: string; label: string }) {
  const waiting = value === '待补';
  return (
    <div className="border-t-2 border-line-hard px-2 pt-5">
      <span
        className={
          waiting
            ? 'font-sport text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-bold tracking-tight text-ink-3'
            : 'font-sport text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-bold tracking-tight text-sakura-ink'
        }
      >
        {value}
      </span>
      <span className="mt-3 block font-mono text-[0.6875rem] tracking-[0.14em] text-ink-2 uppercase">
        {label}
      </span>
      {waiting && <span className="mt-2 block h-px w-8 border-t border-dashed border-ink-3" />}
    </div>
  );
}

/**
 * Lightbox. Zero dependencies: an overlay, the image, prev/next, escape.
 * Because it indexes the same gallery array as the grid, a new photo is
 * automatically navigable the moment it is added to the content file.
 */
function Lightbox({
  index,
  items,
  onClose,
  onNav,
}: {
  index: number;
  items: GalleryItem[];
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  const { tl, ui } = useLocale();
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onNav((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, onNav]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ? tl(item.caption) : ui('badminton.photo')}
      className="fixed inset-0 z-80 grid place-items-center bg-surface-sunken/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <figure className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.caption ? tl(item.caption) : ''}
          className="max-h-[82svh] max-w-[92vw] border border-line object-contain"
        />
        {item.caption && (
          <figcaption className="mt-3 text-center font-sport text-[0.9375rem] font-semibold tracking-widest text-ink uppercase">
            {tl(item.caption)}
            <span className="ml-3 font-mono text-[0.6875rem] font-normal text-ink-3">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        )}
      </figure>

      <button
        type="button"
        onClick={() => onNav((index - 1 + items.length) % items.length)}
        aria-label={ui('badminton.prev')}
        className="absolute top-1/2 left-3 -translate-y-1/2 border border-line-hard px-3 py-2 font-sport text-[1.5rem] leading-none text-ink transition-colors hover:text-sakura-ink md:left-8"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => onNav((index + 1) % items.length)}
        aria-label={ui('badminton.next')}
        className="absolute top-1/2 right-3 -translate-y-1/2 border border-line-hard px-3 py-2 font-sport text-[1.5rem] leading-none text-ink transition-colors hover:text-sakura-ink md:right-8"
      >
        ›
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label={ui('nav.close')}
        className="absolute top-4 right-4 border border-line-hard px-3 py-1.5 font-sport text-[1.125rem] leading-none text-ink transition-colors hover:text-sakura-ink"
      >
        ×
      </button>
    </div>
  );
}

export default function Badminton() {
  const { ui, tl, locale } = useLocale();
  const reduced = useReducedMotion();
  const [lightbox, setLightbox] = useState<number | null>(null);

  useSeo({
    title: `${tl(badminton.hero.title)} — ${tl(profile.name)}`,
    description: tl(badminton.hero.lede),
    path: '/badminton',
    locale,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: tl(badminton.hero.title),
      description: tl(badminton.hero.lede),
    },
  });

  const nav = useCallback(
    (next: number) => setLightbox(next),
    [],
  );

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="tone-court bg-surface text-ink">
      {/* Hero — opens inside the court, photograph first. */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src={badminton.hero.backdrop}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* Two gradients: darken for the headline, fade down into the
              page's own colour so the photo ends where the content begins. */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface-sunken/80 via-surface-sunken/55 to-surface" />
        </div>

        <motion.p
          aria-hidden="true"
          {...rise(0)}
          className="pointer-events-none absolute inset-x-0 top-6 text-center font-sport text-[clamp(4rem,17.5vw,17rem)] leading-none font-bold tracking-tight whitespace-nowrap text-ink opacity-[0.08] select-none"
        >
          {badminton.hero.wall}
        </motion.p>

        <CourtLines className="pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full text-sakura opacity-20 md:h-80" />

        <div className="shell relative pt-28 pb-28 md:pt-40 md:pb-40">
          <motion.p {...rise(0.06)} className="label">
            {ui('badminton.eyebrow')}
          </motion.p>
          <motion.h1
            {...rise(0.12)}
            className="mt-6 font-sport text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-bold tracking-tight text-ink uppercase"
          >
            {tl(badminton.hero.title)}
          </motion.h1>
          <motion.p
            {...rise(0.2)}
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2 md:text-[1.1875rem]"
          >
            {tl(badminton.hero.lede)}
          </motion.p>
          <motion.p {...rise(0.26)} className="mt-6 font-mono text-[0.75rem] text-ink-3">
            {tl(badminton.hero.footnote)}
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-surface-2">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4">
          {badminton.stats.map((stat, i) => (
            <motion.div
              key={stat.label.en}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <StatCell value={stat.value} label={tl(stat.label)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y">
        <div className="shell">
          <Reveal>
            <p className="label">{ui('badminton.story')}</p>
          </Reveal>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            {badminton.timeline.map((entry) => (
              <Reveal key={entry.period}>
                <div className="border-t-2 border-line-hard pt-5">
                  <p className="font-mono text-[0.75rem] tracking-[0.14em] text-sakura-ink uppercase">
                    {entry.period}
                  </p>
                  <h3 className="mt-3 font-sport text-[1.75rem] font-bold tracking-tight text-ink uppercase">
                    {tl(entry.title)}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-2">{tl(entry.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The statement */}
      <section className="section-y bg-surface-2">
        <div className="shell">
          <Reveal>
            <figure className="mx-auto max-w-4xl text-center">
              <span aria-hidden="true" className="font-sport text-[4rem] leading-none text-sakura">
                “
              </span>
              <blockquote className="font-display text-[clamp(1.25rem,3vw,2rem)] leading-snug text-ink italic">
                {tl(badminton.statement.quote)}
              </blockquote>
              <figcaption className="mt-5 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
                {tl(badminton.statement.caption)}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Gallery — the part built to grow */}
      <section className="section-y">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="label">{ui('badminton.gallery')}</p>
              <p className="font-mono text-[0.75rem] text-ink-3">
                {badminton.gallery.length} · {ui('badminton.galleryNote')}
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3">
            {badminton.gallery.map((item, i) => (
              <Reveal key={item.src} delay={(i % 3) * 0.05} y={0}>
                <li className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-surface-3">
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="block h-full w-full"
                    aria-label={item.caption ? tl(item.caption) : ui('badminton.photo')}
                  >
                    <img
                      src={item.src}
                      alt={item.caption ? tl(item.caption) : ''}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
                    />
                  </button>
                  {item.caption && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-sunken/85 to-transparent p-3 pt-10 font-sport text-[0.8125rem] font-semibold tracking-wide text-ink uppercase">
                      {tl(item.caption)}
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Back to the main site */}
      <section className="border-t border-line bg-surface-2">
        <div className="shell flex items-center justify-between py-10">
          <Link
            to="/"
            className="font-sport text-[1.125rem] font-bold tracking-wide text-ink uppercase transition-colors hover:text-sakura-ink"
          >
            ← {ui('badminton.back')}
          </Link>
          <p className="hidden font-mono text-[0.75rem] text-ink-3 sm:block">
            {ui('badminton.backNote')}
          </p>
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          items={badminton.gallery}
          onClose={() => setLightbox(null)}
          onNav={nav}
        />
      )}
    </div>
  );
}
