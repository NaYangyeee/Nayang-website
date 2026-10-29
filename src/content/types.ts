/**
 * The content contract.
 *
 * Deliberately smaller than a full case-study system — this site is a
 * résumé that reads well, not a portfolio of long-form engineering
 * write-ups. But two pieces of discipline are kept, because they are the
 * difference between a credible professional site and a pretty one.
 *
 * `provenance` is required on every number. A reader cannot tell by looking
 * whether "92%" was measured on a held-out set, quoted from a spec sheet, or
 * chosen because it looked good — so the type makes the author say which.
 * Required rather than optional, because an optional field for honesty is a
 * field that gets skipped on the number that most needed it.
 *
 * `stage` is required on every project. Her résumé contains one entry that
 * is explicitly a 预演项目 — a pilot, with staged outputs rather than shipped
 * results. Presenting it with the same confidence as two years of production
 * work would misrepresent both, and a hiring manager who notices will stop
 * trusting the rest of the page.
 */

export type Locale = 'zh' | 'en';
export const LOCALES: readonly Locale[] = ['zh', 'en'] as const;

/** Both languages required. A half-translated site is worse than one language. */
export type L = { zh: string; en: string };

/**
 * Where a number comes from.
 *
 *   measured     — observed in an evaluation or production run
 *   spec         — a configured value or a hard constraint, not an outcome
 *   illustrative — a figure that conveys scale but was not measured
 */
export type Provenance = 'measured' | 'spec' | 'illustrative';

export type Metric = {
  /** Rendered as-is. Arrow forms like "63% → 92%" are encouraged. */
  value: string;
  label: L;
  detail?: L;
  provenance: Provenance;
};

/**
 * How far a project actually got.
 *
 *   production — running, used by people who are not the author
 *   pilot      — a pre-study: scoped, specified, partially built
 *   personal   — built to learn; results are about the author, not a product
 */
export type Stage = 'production' | 'pilot' | 'personal';

export type Project = {
  id: string;
  title: L;
  /** One line. What it is, not what it uses. */
  tagline: L;
  period: string;
  stage: Stage;
  /** The context someone else would need to judge the work. */
  context: L;
  /** Three or four. Each one a thing she personally did. */
  contributions: L[];
  metrics: Metric[];
  tags: string[];
};

export type TimelineEntry = {
  kind: 'work' | 'education';
  org: L;
  role: L;
  period: string;
  detail?: L;
  /** Degree classification, GPA, rank — education only. */
  note?: L;
};

export type SkillGroup = {
  label: L;
  items: string[];
};
