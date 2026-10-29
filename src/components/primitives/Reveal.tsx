import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Translate distance in px. 0 gives a pure fade. */
  y?: number;
};

/**
 * The single scroll-reveal used across the site: a fade and a short rise.
 *
 * `once: true` matters more than it looks. Without it, every section
 * re-animates each time it re-enters the viewport, so scrolling back up a
 * page turns into a light show — and on a CV that reads as a site that is
 * pleased with itself rather than one that respects the reader's time.
 *
 * Under `prefers-reduced-motion` the rise is dropped and only the opacity
 * change remains, so content still reads as arriving without moving.
 */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: reduced ? 0.3 : 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
