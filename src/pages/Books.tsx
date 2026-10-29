import { useState } from 'react';
import { motion } from 'motion/react';
import { books, SPINES, type Book } from '@/content/books';
import { profile } from '@/content/site';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * 书架 — a library scene in the spirit of the hall game.
 *
 * The bookshelf is drawn with CSS, not canvas: books carry text and accept
 * clicks, both of which canvas makes hard, and a shelf is fundamentally a
 * wrapped row of rectangles — which is exactly what flexbox is for. The
 * shelves themselves are a repeating gradient aligned to the row height, so
 * when books overflow one row they wrap and a new board is already there.
 * Adding books to the content file is all the layout work there is.
 *
 * Details in the palette of the warm rooms the site's art direction borrows
 * from: oxblood, forest, ochre — a library, not a toybox.
 */

const ROW_H = 224; // book max ~190 + board
const BOARD_TOP = 190;

/** A few things that live on shelves besides books. */
function Decor({ kind }: { kind: 'plant' | 'lamp' | 'stack' | 'globe' }) {
  const common = 'shrink-0 self-end mb-[34px]';
  switch (kind) {
    case 'plant':
      return (
        <div aria-hidden="true" className={common}>
          <svg viewBox="0 0 40 70" className="h-[92px] w-auto" fill="none">
            <path d="M20 68V34" stroke="#6b5632" strokeWidth="3" />
            <path d="M20 34C20 20 28 14 34 8M20 34C20 22 14 16 8 10" stroke="#4e7a3a" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 42C20 30 27 25 32 20M20 42C20 31 14 27 9 22" stroke="#5d8f46" strokeWidth="3" strokeLinecap="round" />
            <path d="M8 68h24l-4-10H12l-4 10Z" fill="#a5603f" />
          </svg>
        </div>
      );
    case 'lamp':
      return (
        <div aria-hidden="true" className={common}>
          <svg viewBox="0 0 44 70" className="h-[92px] w-auto" fill="none">
            <path d="M22 68V34M22 34h-6M22 34h6" stroke="#6b5632" strokeWidth="3" />
            <path d="M8 32h28l-5-16H13l-5 16Z" fill="#b98e2f" />
            <path d="M14 16h16" stroke="#31435c" strokeWidth="4" />
            <circle cx="22" cy="10" r="7" fill="#f4e8c8" stroke="#b98e2f" strokeWidth="2" />
          </svg>
        </div>
      );
    case 'globe':
      return (
        <div aria-hidden="true" className={common}>
          <svg viewBox="0 0 60 70" className="h-[92px] w-auto" fill="none">
            <circle cx="30" cy="26" r="20" fill="#31435c" />
            <ellipse cx="30" cy="26" rx="9" ry="20" fill="none" stroke="#8aa3b8" strokeWidth="2" />
            <path d="M11 18h38M11 26h38M11 34h38" stroke="#8aa3b8" strokeWidth="2" />
            <path d="M30 4v-2M22 46l-4 22h24l-4-22" stroke="#6b5632" strokeWidth="3" fill="#6b5632" />
          </svg>
        </div>
      );
    case 'stack':
      return (
        <div aria-hidden="true" className={common}>
          <div className="flex flex-col">
            <div className="h-5 w-24 rounded-t-sm" style={{ background: '#8a4a5a' }} />
            <div className="h-5 w-24" style={{ background: '#4a5a4a' }} />
            <div className="h-5 w-24 rounded-b-sm" style={{ background: '#7a3b2e' }} />
          </div>
        </div>
      );
  }
}

/** One book, standing on the current row's board. */
function BookSpine({ book, index, onOpen }: { book: Book; index: number; onOpen: () => void }) {
  const { tl } = useLocale();
  const height = 158 + ((index * 13) % 32);
  const colour = SPINES[book.hue % SPINES.length];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={tl(book.title)}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 self-end rounded-[3px] text-left"
      style={{
        width: 'clamp(52px, 7vw, 68px)',
        height,
        marginBottom: ROW_H - BOARD_TOP - 2,
        background: colour,
        boxShadow: `inset 2px 0 0 rgba(255,255,255,0.22), inset -2px 0 0 rgba(0,0,0,0.28), inset 0 -3px 0 rgba(0,0,0,0.22), 0 6px 8px rgba(59,51,65,0.28)`,
      }}
    >
      {/* Title band: the little paper label on the spine. */}
      <span
        className="absolute inset-y-2 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-[2px] px-1 py-1"
        style={{ background: 'rgba(244,232,200,0.92)', writingMode: 'vertical-rl' }}
      >
        <span
          className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[#2b2a33]"
          style={{ fontFamily: 'var(--font-cjk)' }}
        >
          {tl(book.title)}
        </span>
      </span>
      {/* Author, stamped at the spine's top. */}
      <span
        className="absolute top-1 left-1/2 -translate-x-1/2 text-[0.5625rem] tracking-[0.1em] text-[rgba(255,255,255,0.85)]"
        style={{ writingMode: 'vertical-rl' }}
      >
        {tl(book.author)}
      </span>
    </motion.button>
  );
}

export default function Books() {
  const { ui, tl, locale } = useLocale();
  const [open, setOpen] = useState<Book | null>(null);

  useSeo({
    title: `${ui('books.title')} — ${tl(profile.name)}`,
    description: ui('books.lede'),
    path: '/books',
    locale,
  });

  // Decorations sit at fixed positions in the flow; the wrap layout moves
  // them onto the right shelf by itself.
  const decorAt: Record<number, 'plant' | 'lamp' | 'stack' | 'globe'> = {
    4: 'plant',
    8: 'lamp',
    12: 'stack',
    16: 'globe',
  };

  return (
    <div className="bg-surface-2">
      {/* Header */}
      <section className="shell pt-14 pb-8 md:pt-20">
        <Reveal>
          <p className="label">{ui('books.eyebrow')}</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold text-ink">
            {ui('books.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
            {ui('books.lede')}
          </p>
        </Reveal>
      </section>

      {/* The room */}
      <section className="shell pb-16 md:pb-24">
        <Reveal>
          <div
            className="relative border border-line-hard bg-[#efe6d2] p-3 shadow-[6px_6px_0_0_var(--color-line-2)] md:p-5"
            style={{
              // Wallpaper: faint vertical stripes, like the rooms the hall
              // game's art borrows from.
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(122,59,46,0.045) 0 2px, transparent 2px 36px), linear-gradient(#efe6d2, #ecdfc4)',
            }}
          >
            {/* The floor strip. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-3 bottom-3 h-4 rounded-b-sm border-t-2 border-[#6b5632]/60 bg-[#8a6a4f]"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 70px)' }}
            />

            {/* The shelves. Boards are a repeating gradient aligned to the
                row height — when a row fills, the next board is already
                drawn where the wrapped books land. */}
            <div
              className="flex flex-wrap items-end gap-x-2 gap-y-0 px-3 pt-6 pb-14 md:gap-x-3 md:px-6"
              style={{
                rowGap: 0,
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${BOARD_TOP}px, #6b5632 0 ${BOARD_TOP + 6}px, #553f26 ${BOARD_TOP + 6}px ${BOARD_TOP + 10}px, rgba(255,255,255,0.35) ${BOARD_TOP + 10}px ${BOARD_TOP + 12}px)`,
                backgroundSize: `100% ${ROW_H}px`,
              }}
            >
              {books.map((book, i) => (
                <span key={book.title.en} className="contents">
                  <BookSpine book={book} index={i} onOpen={() => setOpen(book)} />
                  {decorAt[i + 1] && <Decor kind={decorAt[i + 1]} />}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-5 text-right font-mono text-[0.75rem] text-ink-3">
            {books.length} · {ui('books.countNote')}
          </p>
        </Reveal>
      </section>

      {/* The book card */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-title"
          className="fixed inset-0 z-80 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="card relative w-full max-w-md p-7 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={ui('nav.close')}
              className="absolute top-4 right-4 inline-flex size-9 items-center justify-center border border-line-hard text-ink-2 transition-colors hover:text-ink"
            >
              ×
            </button>

            <p className="chip chip-pink">{tl(open.group)}</p>
            <h2 id="book-title" className="mt-4 pr-8 font-display text-[1.5rem] leading-snug font-bold text-ink">
              {tl(open.title)}
            </h2>
            <p className="mt-1 font-mono text-[0.8125rem] text-ink-3">{tl(open.author)}</p>

            {open.note ? (
              <p className="mt-5 border-l-2 border-sakura pl-4 text-[1rem] leading-relaxed text-ink">
                {tl(open.note)}
              </p>
            ) : (
              <p className="mt-5 text-[1rem] text-ink-3">{ui('books.noNote')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
