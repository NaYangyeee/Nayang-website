import { product } from '@/content/product';
import { profile } from '@/content/site';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/i18n/LocaleProvider';
import { Reveal } from '@/components/primitives/Reveal';

/**
 * 产品与项目 — one page for both hands.
 *
 * The guide the page is built from draws a hard line between the product
 * manager and the project manager. The design reflects that as a seesaw —
 * two facing cards — then shows how the two halves actually operate in her
 * real projects. Same light editorial system as the agents page: this is
 * work, and it should look like the same document.
 */

export default function Product() {
  const { ui, tl, locale } = useLocale();

  useSeo({
    title: `${tl(product.title)} — ${tl(profile.name)}`,
    description: tl(product.lede),
    path: '/product',
    locale,
  });

  return (
    <div className="bg-surface-2">
      {/* Header */}
      <section className="shell pt-14 pb-8 md:pt-20">
        <Reveal>
          <p className="label">{ui('product.eyebrow')}</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold text-ink">
            {tl(product.title)}
          </h1>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-2">
            {tl(product.lede)}
          </p>
        </Reveal>
      </section>

      {/* 两个角色 */}
      <section className="shell pb-6">
        <div className="grid gap-px border border-line-hard bg-line-hard md:grid-cols-2">
          {product.roles.map((role, i) => (
            <Reveal key={role.title.en} delay={i * 0.08}>
              <div className="h-full bg-surface p-7 md:p-9">
                <p className="chip chip-pink">{tl(role.title)}</p>
                <h2 className="mt-4 font-sport text-[1.5rem] font-bold tracking-wide text-ink uppercase md:text-[1.875rem]">
                  {tl(role.question)}
                </h2>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
                  {tl(role.body)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 需求的一半 */}
      <section className="shell py-6">
        <Reveal>
          <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
            {ui('product.requirements')}
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {product.requirements.map((item) => (
            <Reveal key={item.title.en}>
              <div className="card h-full p-6">
                <span aria-hidden="true" className="block h-px w-10 bg-sakura" />
                <h3 className="mt-4 font-display text-[1.125rem] leading-snug font-bold text-ink">
                  {tl(item.title)}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{tl(item.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 节奏的一半 */}
      <section className="shell py-6">
        <Reveal>
          <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
            {ui('product.delivery')}
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {product.delivery.map((item) => (
            <Reveal key={item.title.en}>
              <div className="card h-full p-6">
                <span aria-hidden="true" className="block h-px w-10 bg-sakura" />
                <h3 className="mt-4 font-display text-[1.125rem] leading-snug font-bold text-ink">
                  {tl(item.title)}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{tl(item.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 常用框架 */}
      <section className="shell py-6">
        <Reveal>
          <div className="card p-7 md:p-8">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-3 uppercase">
              {ui('product.frameworks')}
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {product.frameworks.map((f) => (
                <li key={f.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <span className="font-sport text-[1.0625rem] font-bold tracking-wide text-ink uppercase">
                    {f.name}
                  </span>
                  <span className="text-right text-[0.8125rem] text-ink-3">{tl(f.line)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 验收清单 */}
      <section className="shell py-6 pb-14 md:pb-20">
        <Reveal>
          <div className="border-t-2 border-line-hard pt-6">
            <h2 className="font-display text-[1.375rem] font-bold text-ink md:text-[1.625rem]">
              {tl(product.checklist.title)}
            </h2>
            <p className="mt-2 max-w-2xl text-[0.9375rem] text-ink-2">{tl(product.checklist.intro)}</p>
            <ol className="mt-6 max-w-3xl space-y-3.5">
              {product.checklist.items.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-line-hard font-mono text-[0.8125rem] text-sakura-ink"
                  >
                    {i + 1}
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-ink">{tl(item)}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
