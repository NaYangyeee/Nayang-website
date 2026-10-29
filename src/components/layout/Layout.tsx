import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocale } from '@/i18n/LocaleProvider';

export function Layout({ children }: { children: ReactNode }) {
  const { ui } = useLocale();

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
        {children}
      </main>
      <Footer />
    </div>
  );
}
