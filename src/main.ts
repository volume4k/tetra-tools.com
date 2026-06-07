import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

import { initI18n, onLangChange, t } from './i18n/i18n.ts';
import { initRouter } from './router.ts';
import type { Route } from './router.ts';
import { renderHeader, bindHeaderEvents } from './components/header.ts';
import { renderFooter } from './components/footer.ts';
import { renderHome, bindHomeEvents } from './pages/home.ts';
import { renderProductDetail, bindProductDetailEvents } from './pages/product-detail.ts';
import { renderImpressum } from './pages/impressum.ts';
import { renderDatenschutz } from './pages/datenschutz.ts';

// Initialize i18n (auto-detect browser language)
initI18n();

const headerEl = document.getElementById('site-header')!;
const mainEl = document.getElementById('main-content')!;
const footerEl = document.getElementById('site-footer')!;

let previousRoute: Route | null = null;

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
      bindProductDetailEvents();
      break;
    case 'impressum':
      mainEl.innerHTML = renderImpressum();
      break;
    case 'datenschutz':
      mainEl.innerHTML = renderDatenschutz();
      break;
  }

  // Scroll behavior based on route
  window.requestAnimationFrame(() => {
    if (route === 'product') {
      // Product detail: scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (route === 'home' && previousRoute === 'product') {
      // Returning from product detail to home: scroll to products section
      // Use another RAF to ensure DOM is fully updated
      window.requestAnimationFrame(() => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      // Other cases: scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Track current route as previous for next navigation
  previousRoute = route;
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
  } 
  else if (hash === 'impressum') {
    route = 'impressum';
  }
  else if (hash === 'datenschutz') {
    route = 'datenschutz';
  }

  renderPage(route, param);
});
