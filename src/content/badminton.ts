import type { L } from './types';

/**
 * 羽球生涯 — the badminton page.
 *
 * Facts she has not yet told me stay structurally absent or visibly marked
 * 待补; nothing here invents one. The gallery is the part built to grow:
 * one entry per photo, captions optional — a new photo is one line in the
 * array, a new fact replaces one 待补. The layout adapts to any count.
 *
 * Photos live in public/assets/badminton/, processed by
 * scripts/resize-photos.ps1 from the raw WeChat exports.
 */

export const badminton = {
  hero: {
    /** The giant back-wall word. English, because Oswald has no CJK glyphs. */
    wall: 'BADMINTON',
    /**
     * Full-bleed backdrop. A designed champion scene — trophy, racket and
     * shuttlecocks on a night court — because it has to read the same way
     * to every visitor: a photo of an award certificate only speaks to
     * people who can read the language on the wall behind it.
     */
    backdrop: '/assets/badminton/hero-trophy.svg',
    title: { zh: '羽球生涯', en: 'Badminton, seriously' } satisfies L,
    lede: {
      zh: '工作之外打得最久、最认真的一件事。故事会陆续补上——场子已经搭好。',
      en: 'The one thing outside work that she has done longest and taken most seriously. Stories are being added — the court is ready.',
    } satisfies L,
    footnote: {
      zh: '数据与故事待补 · 照片持续增加中',
      en: 'Facts and stories to come · photos being added',
    } satisfies L,
  },

  /**
   * Four numbers across the top. Labels are real; values are placeholders
   * until she supplies them. The dashed underline is the design's way of
   * saying "this slot is waiting" — a real number removes it.
   */
  stats: [
    { label: { zh: '球龄', en: 'Years playing' } satisfies L, value: '待补' },
    { label: { zh: '正式比赛', en: 'Matches played' } satisfies L, value: '待补' },
    { label: { zh: '常打位置', en: 'Preferred position' } satisfies L, value: '待补' },
    { label: { zh: '最好成绩', en: 'Best result' } satisfies L, value: '待补' },
  ],

  timeline: [
    {
      period: '起点',
      title: { zh: '怎么开始的', en: 'How it started' } satisfies L,
      body: {
        zh: '（待补——什么时候、因为什么开始打球的）',
        en: '(To fill — when and why she picked up a racket)',
      } satisfies L,
    },
    {
      period: '现在',
      title: { zh: '现在怎么打', en: 'How I play now' } satisfies L,
      body: {
        zh: '（待补——常在哪里打、跟谁打、现在在练什么）',
        en: '(To fill — where she plays, with whom, and what she is working on)',
      } satisfies L,
    },
  ],

  /**
   * The statement — the one place the page argues why badminton matters to
   * someone hiring an engineer. Current copy is a draft for her to rewrite.
   */
  statement: {
    quote: {
      zh: '单打教会我的是：一次失误只在下一分之前成立。工程里的复盘和球场上的复盘是同一种训练——看回放，找那一个点，然后打下一分。',
      en: 'Singles taught me that a mistake only exists until the next rally. Post-mortems on court and post-mortems in code review are the same discipline — watch it back, find the one point, play the next one.',
    } satisfies L,
    caption: {
      zh: '（草稿——待她自己改写成真心话）',
      en: '(Draft — hers to rewrite in her own words)',
    } satisfies L,
  },

  /**
   * The gallery. One entry per photo; `caption` is optional — a photo
   * without one simply renders bare, which is how unlabelled batches stay
   * honest instead of receiving guessed captions. Add photos by appending
   * lines; the grid and the lightbox both adapt.
   */
  gallery: [
    { src: '/assets/badminton/badminton-01.jpg', caption: { zh: '球场', en: 'The court' } },
    { src: '/assets/badminton/badminton-02.jpg' },
    { src: '/assets/badminton/badminton-03.jpg' },
    { src: '/assets/badminton/badminton-04.jpg' },
    { src: '/assets/badminton/badminton-05.jpg' },
    { src: '/assets/badminton/badminton-06.jpg' },
    { src: '/assets/badminton/badminton-07.jpg' },
    { src: '/assets/badminton/badminton-08.jpg' },
    { src: '/assets/badminton/badminton-09.jpg' },
    { src: '/assets/badminton/badminton-10.jpg' },
    { src: '/assets/badminton/badminton-11.jpg' },
    { src: '/assets/badminton/badminton-12.jpg' },
    { src: '/assets/badminton/badminton-13.jpg' },
    { src: '/assets/badminton/badminton-14.jpg' },
    { src: '/assets/badminton/badminton-15.jpg' },
  ] as Array<{ src: string; caption?: L }>,
};

export type GalleryItem = (typeof badminton.gallery)[number];
