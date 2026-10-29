import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Badminton from '@/pages/Badminton';
import Books from '@/pages/Books';
import Agents from '@/pages/Agents';
import AgentDetail from '@/pages/AgentDetail';
import Product from '@/pages/Product';

/**
 * Two pages: the career document and the badminton court.
 *
 * The home page is the product — it ships in the main bundle because it is
 * where essentially all traffic lands. The badminton page is a secondary
 * route, loaded only by the people who chose to leave the résumé for it,
 * which is exactly the right audience to make wait an instant.
 */
export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="badminton" element={<Badminton />} />
            <Route path="books" element={<Books />} />
            <Route path="agents" element={<Agents />} />
            <Route path="agents/:slug" element={<AgentDetail />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}
