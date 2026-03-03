import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

import { initI18n, onLangChange, t } from './i18n/i18n.ts';
import { initRouter } from './router.ts';
import type { Route } from './router.ts';
import { renderHeader, bindHeaderEvents } from './components/header.ts';
import { renderFooter } from './components/footer.ts';
import { renderHome, bindHomeEvents } from './pages/home.ts';
import { renderProductDetail } from './pages/product-detail.ts';
import { renderImpressum } from './pages/impressum.ts';

// Initialize i18n (auto-detect browser language)
initI18n();

const headerEl = document.getElementById('site-header')!;
const mainEl = document.getElementById('main-content')!;
const footerEl = document.getElementById('site-footer')!;

/** Render the full page for a given route */
function renderPage(route: Route, param?: string): void {
  // Update page title
  document.title = t().meta.title;

  // Render header + footer (always present)
  headerEl.innerHTML = renderHeader();
  footerEl.innerHTML = renderFooter();
  bindHeaderEvents();

  // Render page content
  switch (route) {
    case 'home':
      mainEl.innerHTML = renderHome();
      bindHomeEvents();
      break;
    case 'product':
      mainEl.innerHTML = renderProductDetail(param || '');
      break;
    case 'impressum':
      mainEl.innerHTML = renderImpressum();
      break;
  }
}

// Set up router
initRouter((state) => renderPage(state.route, state.param));

// Re-render on language change
onLangChange(() => {
  const hash = window.location.hash.slice(1) || '';
  let route: Route = 'home';
  let param: string | undefined;

  if (hash.startsWith('product/')) {
    route = 'product';
    param = hash.replace('product/', '');
  } else if (hash === 'impressum') {
    route = 'impressum';
  }

  renderPage(route, param);
});
