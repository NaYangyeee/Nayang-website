import { skillGroups } from '@/content/site';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * The stack, grouped by purpose.
 *
 * No proficiency bars, no star ratings, no "90% Python". Those are the
 * single most common way a technical CV loses credibility: they are
 * self-assessed, uncalibrated, and the reader knows it. A grouped list says
 * the same thing without claiming a precision nobody has.
 */
export function Skills() {
  const { ui, tl } = useLocale();

  return (
    <section id="skills" className="section-y bg-surface">
      <div className="shell">
        <Reveal>
          <p className="label">{ui('skills.eyebrow')}</p>
          <h2 className="mt-4 font-display text-[clamp(1.875rem,4.5vw,3rem)] leading-tight font-bold text-ink">
            {ui('skills.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
            {ui('skills.lede')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-hard bg-line-hard md:grid-cols-2">
          {skillGroups.map((group) => (
            <Reveal key={group.label.en}>
              <div className="h-full bg-surface p-6 md:p-7">
                <h3 className="font-display text-[1.125rem] font-bold text-ink">
                  {tl(group.label)}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-px w-10 bg-sakura"
                />
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
