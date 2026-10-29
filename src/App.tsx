import { LocaleProvider } from '@/i18n/LocaleProvider';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

/**
 * One page, no router.
 *
 * The site is a résumé that reads well. Everything fits on a single scroll,
 * every section is reachable by anchor, and there is no second route a
 * visitor could want. Adding a router for that would ship a dependency, a
 * loading state and a 404 page to solve a problem the site does not have —
 * and would make the whole thing fail to render if JavaScript is slow,
 * rather than just failing to animate.
 *
 * If this grows case-study pages later, react-router is already a
 * dependency and this file is where it goes.
 */
export default function App() {
  return (
    <LocaleProvider>
      <Layout>
        <Home />
      </Layout>
    </LocaleProvider>
  );
}
