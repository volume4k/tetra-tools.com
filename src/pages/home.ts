import { renderHero } from '../components/hero.ts';
import { renderIntro } from '../components/intro.ts';
import { renderProductGrid, bindProductGridEvents } from '../components/product-grid.ts';
import { renderContact } from '../components/contact.ts';

export function renderHome(): string {
    return `
    ${renderHero()}
    ${renderIntro()}
    ${renderProductGrid()}
    ${renderContact()}
  `;
}

export function bindHomeEvents(): void {
    bindProductGridEvents();

    // Smooth scroll for "View Products" CTA
    document.getElementById('hero-cta-products')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    });
}
