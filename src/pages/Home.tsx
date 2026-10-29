import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { Skills } from '@/components/sections/Skills';
import { Path } from '@/components/sections/Path';
import { Beyond } from '@/components/sections/Beyond';
import { Contact } from '@/components/sections/Contact';
import { profile } from '@/content/site';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/i18n/LocaleProvider';

export default function Home() {
  const { tl, locale } = useLocale();

  useSeo({
    title: `${tl(profile.name)} — ${tl(profile.title)}`,
    description: tl(profile.headline),
    path: '/',
    locale,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: tl(profile.name),
      alternateName: locale === 'zh' ? profile.name.en : profile.name.zh,
      jobTitle: tl(profile.title),
      email: `mailto:${profile.email}`,
      sameAs: [profile.github],
      description: tl(profile.statement),
    },
  });

  return (
    <>
      <Hero />
      <Work />
      <Skills />
      <Path />
      <Beyond />
      <Contact />
    </>
  );
}
