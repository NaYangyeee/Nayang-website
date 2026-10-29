import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LOCALES, type L, type Locale } from '@/content/types';
import { ui, type UIKey } from './dictionary';

const STORAGE_KEY = 'nayang.locale';

/** BCP 47 tags, for the `lang` attribute and `Intl` formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
};

/** Short labels for the switcher, each written in its own language. */
export const LOCALE_LABELS: Record<Locale, string> = {
  zh: '中文',
  en: 'EN',
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** UI chrome lookup. */
  ui: (key: UIKey) => string;
  /** Localised content lookup. */
  tl: (value: L | undefined) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/**
 * Chinese is the default, English is one click away.
 *
 * The reverse of the usual instinct for a bilingual site, and deliberate:
 * the immediate audience is domestic, the site is hosted for a Chinese
 * reader first, and someone browsing in English will find the switcher
 * because they are already looking for it. A visitor who lands in the wrong
 * language is a visitor who leaves, and the larger group should not be the
 * one that has to click.
 */
function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'zh';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Private mode / storage disabled — fall through to language sniffing.
  }
  const prefers = window.navigator.languages ?? [window.navigator.language];
  for (const lang of prefers) {
    const tag = lang?.toLowerCase() ?? '';
    if (tag.startsWith('zh')) return 'zh';
    if (tag.startsWith('en')) return 'en';
  }
  return 'zh';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice just will not persist.
    }
  }, []);

  // Keep the document in sync so screen readers and search engines agree
  // with what is rendered.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = LOCALE_TAGS[locale];
    root.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      ui: (key) => ui[key][locale],
      tl: (v) => (v ? v[locale] : ''),
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}
