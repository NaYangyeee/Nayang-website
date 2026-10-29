import { profile } from '@/content/site';
import { useLocale } from '@/i18n/LocaleProvider';

export function Footer() {
  const { ui, tl } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-hard bg-surface">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[0.9375rem] font-semibold text-ink">
            {tl(profile.name)}
          </p>
          <p className="mt-1 text-[0.8125rem] text-ink-2">{ui('footer.built')}</p>
        </div>

        <div className="flex items-center gap-5 text-[0.8125rem]">
          <a
            href={`mailto:${profile.email}`}
            className="text-ink-2 transition-colors hover:text-sakura-ink"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-2 transition-colors hover:text-sakura-ink"
          >
            GitHub
          </a>
          <a href="#top" className="text-ink-2 transition-colors hover:text-sakura-ink">
            {ui('footer.top')}
          </a>
        </div>
      </div>

      <div className="shell border-t border-line py-4">
        <p className="font-mono text-[0.6875rem] text-ink-3">
          © {year} {tl(profile.name)}. {ui('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
