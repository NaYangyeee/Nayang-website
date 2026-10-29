import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile, navSections } from '@/content/site';
import { LOCALE_LABELS, useLocale } from '@/i18n/LocaleProvider';
import { LOCALES } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * A fixed bar that gains a background once the page scrolls.
 *
 * At the very top it floats transparently over the hero; past that it needs
 * an opaque ground or the nav text sits on whatever scrolls underneath.
 *
 * On the badminton page the bar follows the page's own two tones: dark
 * over the hero photograph, light once the page scrolls into its light
 * grey body — the nav text always has a ground to sit on.
 */
export function Header() {
  const { ui, tl, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onCourt = pathname.startsWith('/badminton');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out-expo',
        // Over the badminton hero the bar floats on a dark photograph, so it
        // carries the dark tone with light text; once the page scrolls into
        // the light body, it flips to the light court tone.
        onCourt && (scrolled ? 'tone-court-light' : 'tone-court'),
        scrolled
          ? 'border-b border-line bg-surface/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link to="/" className="group flex shrink-0 items-baseline gap-2.5">
          <span className="font-display text-[1.0625rem] font-bold tracking-tight text-ink">
            {tl(profile.name)}
          </span>
          <span className="hidden h-3 w-px bg-sakura sm:block" aria-hidden="true" />
          <span className="hidden font-mono text-[0.6875rem] tracking-wide text-ink-3 sm:block">
            Agent &amp; RAG
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navSections.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  className="rounded-sm px-3 py-2 text-[0.8125rem] whitespace-nowrap text-ink-2 transition-colors duration-200 hover:text-sakura-ink"
                >
                  {tl(item.label)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/agents"
                className={cn(
                  'rounded-sm px-3 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200',
                  pathname === '/agents'
                    ? 'font-medium text-sakura-ink'
                    : 'text-ink-2 hover:text-sakura-ink',
                )}
              >
                {ui('nav.agents')}
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className={cn(
                  'rounded-sm px-3 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200',
                  pathname === '/product'
                    ? 'font-medium text-sakura-ink'
                    : 'text-ink-2 hover:text-sakura-ink',
                )}
              >
                {ui('nav.product')}
              </Link>
            </li>
            <li>
              <Link
                to="/badminton"
                className={cn(
                  'rounded-sm px-3 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200',
                  onCourt
                    ? 'font-medium text-sakura-ink'
                    : 'text-ink-2 hover:text-sakura-ink',
                )}
              >
                {ui('nav.badminton')}
              </Link>
            </li>
            <li>
              <Link
                to="/books"
                className={cn(
                  'rounded-sm px-3 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-200',
                  pathname === '/books'
                    ? 'font-medium text-sakura-ink'
                    : 'text-ink-2 hover:text-sakura-ink',
                )}
              >
                {ui('nav.books')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={ui('nav.lang')}
            className="flex items-center border border-line-hard"
          >
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={cn(
                  'px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-wide transition-colors duration-200',
                  locale === code ? 'bg-ink text-surface' : 'text-ink-2 hover:text-sakura-ink',
                )}
              >
                {LOCALE_LABELS[code]}
              </button>
            ))}
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="hidden border border-line-hard bg-sakura px-4 py-2 text-[0.8125rem] font-medium whitespace-nowrap text-ink transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-px hover:shadow-[3px_3px_0_0_var(--color-line-hard)] sm:inline-block"
          >
            {ui('nav.contact')}
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? ui('nav.close') : ui('nav.menu')}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center border border-line-hard text-ink lg:hidden"
          >
            <span aria-hidden="true" className="font-mono text-sm">
              {open ? '×' : '≡'}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            type="button"
            aria-label={ui('nav.close')}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <nav
            aria-label="Primary"
            className={cn(
              'absolute inset-x-3 border border-line-hard bg-surface p-2 shadow-[6px_6px_0_0_var(--color-line-2)]',
              onCourt && (scrolled ? 'tone-court-light' : 'tone-court'),
            )}
            style={{ top: 'calc(var(--header-h) + 0.5rem)' }}
          >
            <ul>
              {navSections.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-[0.9375rem] text-ink transition-colors hover:bg-sakura-soft hover:text-sakura-deep"
                  >
                    {tl(item.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/agents"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[0.9375rem] text-ink transition-colors hover:bg-sakura-soft hover:text-sakura-deep"
                >
                  {ui('nav.agents')}
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[0.9375rem] text-ink transition-colors hover:bg-sakura-soft hover:text-sakura-deep"
                >
                  {ui('nav.product')}
                </Link>
              </li>
              <li>
                <Link
                  to="/badminton"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[0.9375rem] text-ink transition-colors hover:bg-sakura-soft hover:text-sakura-deep"
                >
                  {ui('nav.badminton')}
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[0.9375rem] text-ink transition-colors hover:bg-sakura-soft hover:text-sakura-deep"
                >
                  {ui('nav.books')}
                </Link>
              </li>
              <li className="mt-1 border-t border-line pt-1">
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-[0.9375rem] font-medium text-sakura-ink"
                >
                  {ui('nav.contact')}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
