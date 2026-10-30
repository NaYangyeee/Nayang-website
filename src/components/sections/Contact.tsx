import { profile } from '@/content/site';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * The one dark band on the page.
 *
 * Everything above is light grey and white; ending on near-black makes the
 * contact section read as a destination rather than another section. The
 * `tone-ink` class redefines the same colour tokens, so the components
 * inside it need no knowledge of which ground they are on.
 */
export function Contact() {
  const { ui, tl } = useLocale();

  return (
    <section id="contact" className="tone-ink section-y bg-surface text-ink">
      <div className="shell">
        <Reveal>
          <p className="label">{ui('contact.eyebrow')}</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight font-bold text-ink">
            {ui('contact.title')}
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
            {ui('contact.lede')}
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            <a
              href={`mailto:${profile.email}`}
              className="group bg-surface-2 p-6 transition-colors duration-200 hover:bg-surface-3"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
                {ui('contact.emailLabel')}
              </span>
              <span className="mt-2 block font-display text-[1.125rem] font-semibold break-all text-ink transition-colors group-hover:text-sakura-ink">
                {profile.email}
              </span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface-2 p-6 transition-colors duration-200 hover:bg-surface-3"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
                {ui('contact.githubLabel')}
              </span>
              <span className="mt-2 block font-display text-[1.125rem] font-semibold text-ink transition-colors group-hover:text-sakura-ink">
                NaYangyeee
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[0.75rem] text-ink-3">
              {tl(profile.location)} · {tl(profile.availability)}
            </p>
            <a
              href="/assets/CuiLina-CV.pdf"
              download
              className="inline-flex items-center gap-2 border border-line-hard bg-surface-2 px-4 py-2 text-[0.875rem] font-medium text-ink transition-[transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-line-2)]"
            >
              {ui('contact.cv')}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
