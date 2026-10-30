import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * The polite dead end.
 *
 * Before this existed, an unknown URL fell through the SPA fallback and
 * silently rendered the home page — which works, but reads as the site
 * losing its memory. A one-liner with the way home is what a stranger
 * who typo'd a link deserves.
 */
export default function NotFound() {
  const { ui } = useLocale();

  return (
    <div className="flex min-h-[60svh] items-center justify-center bg-surface-2">
      <div className="text-center">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(4rem,14vw,8rem)] leading-none font-bold text-line-hard"
        >
          404
        </p>
        <h1 className="mt-4 font-display text-[1.375rem] font-bold text-ink">
          {ui('nf.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
          {ui('nf.body')}
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border border-line-hard bg-ink px-6 py-3 text-[0.9375rem] font-medium text-ink-invert transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-sakura)]"
        >
          {ui('nf.home')}
        </Link>
      </div>
    </div>
  );
}
