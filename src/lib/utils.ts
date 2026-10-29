import type { Locale } from '@/content/types';

/** Minimal class joiner — no clsx dependency needed for this surface area. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-GB', {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

/**
 * Applied to every outbound link.
 *
 * `noopener` is the one that matters: without it the opened page gets a
 * handle on this window via `window.opener` and can navigate it somewhere
 * else. `noreferrer` is belt-and-braces and costs nothing here.
 */
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');
}
