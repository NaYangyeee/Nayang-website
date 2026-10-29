import { useEffect, useRef } from 'react';

/**
 * The racket cursor and its shuttle trail — badminton page only.
 *
 * Two pieces. The cursor is a CSS custom cursor (an SVG racket, hotspot at
 * the string bed, so the point of the cursor is where a click lands). The
 * trail is a canvas overlay: each pointer movement spawns a shuttlecock
 * that shrinks as it falls, so moving the mouse leaves a wake of fading
 * birds — the visual signature of a swing, which is the one move a court
 * page can make that a text page cannot.
 *
 * Gated to fine pointers (a phone has no cursor) and to motion preferences
 * (reduced motion gets the cursor, no trail). The canvas is pointer-events
 * none, so the gallery, the lightbox and every link keep working exactly
 * as they did.
 */

const TRAIL_COUNT = 28; // max live particles
const SPAWN_EVERY = 20; // px of pointer travel per shuttle
const LIFE = 750; // ms per particle
const START_SIZE = 34; // px — large enough to read as a shuttle, not a dot

export function RacketTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // The shuttle sprite, drawn once at 2x for crisp scaling.
    const sprite = document.createElement('canvas');
    sprite.width = 64;
    sprite.height = 64;
    const s = sprite.getContext('2d');
    if (!s) return;
    s.translate(32, 32);
    // Cork.
    s.fillStyle = '#f4ead0';
    s.beginPath();
    s.arc(0, -20, 5.5, 0, Math.PI * 2);
    s.fill();
    // Skirt: a flared cone of feathers.
    s.fillStyle = '#f7f6f2';
    s.beginPath();
    s.moveTo(-6, -16);
    s.lineTo(6, -16);
    s.lineTo(11, 20);
    s.lineTo(-11, 20);
    s.closePath();
    s.fill();
    // Feather ribs.
    s.strokeStyle = 'rgba(30,40,46,0.45)';
    s.lineWidth = 1.4;
    for (const dx of [-8, -4, 0, 4, 8]) {
      s.beginPath();
      s.moveTo(dx * 0.45, -16);
      s.lineTo(dx * 1.15, 20);
      s.stroke();
    }
    // The collar.
    s.fillStyle = '#7ba832';
    s.beginPath();
    s.arc(0, -15.5, 6.6, Math.PI, 0);
    s.fill();
    s.fillRect(-6.6, -16, 13.2, 1.6);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      born: number;
      spin: number;
      vr: number;
    };
    const particles: Particle[] = [];
    let lastX = -Infinity;
    let lastY = -Infinity;
    let raf = 0;
    let running = true;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener('resize', fit);

    const spawn = (x: number, y: number) => {
      if (particles.length >= TRAIL_COUNT) particles.shift();
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 22,
        vy: 14 + Math.random() * 26, // they fall — shuttles always fall
        born: performance.now(),
        spin: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 2.2,
      });
    };

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < SPAWN_EVERY) return;
      // Spawn along the stroke, so a fast swipe leaves a continuous wake
      // rather than one bird per event.
      const steps = Math.min(3, Math.floor(dist / SPAWN_EVERY));
      for (let i = 1; i <= steps; i++) {
        spawn(e.clientX - (dx * i) / (steps + 1), e.clientY - (dy * i) / (steps + 1));
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onLeave = () => {
      lastX = -Infinity;
      lastY = -Infinity;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    const tick = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.born;
        if (age > LIFE) {
          particles.splice(i, 1);
          continue;
        }
        const t = age / LIFE;
        p.x += p.vx / 60;
        p.y += p.vy / 60;
        p.spin += p.vr / 60;

        const scale = (START_SIZE * (1 - t * 0.82)) / 64;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.globalAlpha = 1 - t * t; // fade late, like a bird falling away
        ctx.drawImage(
          sprite,
          (-64 * scale) / 2,
          (-64 * scale) / 2,
          64 * scale,
          64 * scale,
        );
        ctx.restore();
      }
      if (running) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // The racket cursor itself. Applied to the page root so it holds over
    // the whole court; interactive elements keep their own cursors where
    // that matters (zoom-in on the gallery, pointer on links).
    const root = document.documentElement;
    const prevCursor = root.style.cursor;
    root.style.cursor = "url('/assets/racket-cursor.svg') 24 17, auto";
    // Links and buttons carry the UA's default pointer, which would
    // override the inherited racket — so it is re-applied to them too.
    // The racket's hotspot is the string bed, so clicks still land
    // exactly where the head points.
    const sheet = document.createElement('style');
    sheet.textContent =
      "a, button, [role='button'] { cursor: url('/assets/racket-cursor.svg') 24 17, auto !important; }";
    document.head.appendChild(sheet);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', fit);
      root.style.cursor = prevCursor;
      sheet.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-70 h-full w-full"
    />
  );
}
