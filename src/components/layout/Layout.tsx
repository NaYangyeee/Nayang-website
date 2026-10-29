import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * Hash scrolling lives here, not in the links.
 *
 * React Router changes the URL through the history API, and the browser
 * does not perform native anchor scrolling for that kind of navigation —
 * which is why every nav link appeared to "do nothing" before this
 * effect existed. It waits one frame so a navigation that changes the
 * route has time to paint the target section before the scroll.
 */
export function Layout() {
  const { ui } = useLocale();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }, 30);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-svh flex-col bg-surface-2">
      {/*
        The skip link is the first focusable thing on the page and is
        invisible until focused. It is the difference between a keyboard
        user reaching the content in one key press and tabbing through the
        entire navigation on every visit.
      */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:border focus:border-line-hard focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        {ui('nav.skip')}
      </a>

      <Header />
      <main id="main" className="flex-1" style={{ paddingTop: 'var(--header-h)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
