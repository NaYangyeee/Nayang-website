import { motion, useReducedMotion } from 'motion/react';
import { profile, heroStats } from '@/content/site';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * The first screen.
 *
 * It answers three questions in the order a reader asks them: who, what, and
 * what did it achieve. The four numbers are the whole argument — they are
 * before/after pairs from her own evaluations, and putting them above the
 * fold means a hiring manager who reads nothing else has still seen the
 * strongest thing on the page.
 *
 * The decorative sakura wash sits behind at low opacity and is purely a
 * gradient, so it costs nothing and degrades to a flat tint on anything that
 * cannot render it.
 */
export function Hero() {
  const { ui, tl } = useLocale();
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden bg-surface">
      {/* Sakura wash, top-right. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-sakura) 55%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-40 size-[26rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-sky) 50%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="shell relative pt-16 pb-20 md:pt-24 md:pb-28">
        <motion.p {...rise(0)} className="label">
          {tl(profile.location)} · {tl(profile.availability)}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.05] font-bold text-ink"
        >
          {tl(profile.name)}
        </motion.h1>

        <motion.p
          {...rise(0.14)}
          className="mt-3 font-display text-[clamp(1.125rem,2.6vw,1.75rem)] leading-snug text-sakura-ink"
        >
          {tl(profile.title)}
        </motion.p>

        <motion.p
          {...rise(0.2)}
          className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ink md:text-[1.1875rem]"
        >
          {tl(profile.headline)}
        </motion.p>

        <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="border border-line-hard bg-ink px-6 py-3 text-[0.9375rem] font-medium text-ink-invert transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-sakura)]"
          >
            {ui('hero.viewWork')}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-line-hard bg-surface px-6 py-3 text-[0.9375rem] font-medium text-ink transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-line-2)]"
          >
            {ui('hero.email')}
          </a>
        </motion.div>

        {/* The numbers. */}
        <motion.dl
          {...rise(0.36)}
          className="mt-14 grid gap-px border border-line-hard bg-line-hard sm:grid-cols-2 lg:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.value} className="bg-surface p-5">
              <dt className="sr-only">{tl(stat.label)}</dt>
              <dd>
                <span className="block font-display text-[1.5rem] leading-none font-semibold text-sky-ink tabular-nums">
                  {stat.value}
                </span>
                <span className="mt-2.5 block text-[0.875rem] font-medium text-ink">
                  {tl(stat.label)}
                </span>
                <span className="mt-1 block text-[0.75rem] text-ink-3">{tl(stat.detail)}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
