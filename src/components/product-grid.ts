import { t } from '../i18n/i18n.ts';
import { navigate } from '../router.ts';

/** Placeholder color patterns for products (no external images needed) */
const productPatterns: Record<string, { bg: string; label: string }> = {
  tetrazange: {
    bg: "--color-bg-alt",
    label: '<img src="/tetrazange-1.png" alt="Tetra Zange" style="width: 100%; height: 100%; object-fit: contain;" />',
  },
  steckhilfe: {
    bg: "--color-bg-alt",
    label: '<img src="/steckhilfe-1.png" alt="Steckhilfe" style="width: 100%; height: 100%; object-fit: contain;" />',
  },
  hosenhaken: {
    bg: "--color-bg-alt", 
    label: '<img src="/hosenhaken-1.png" alt="Hosenhaken" style="width: 100%; height: 100%; object-fit: contain;" />',
  },
  pulloverhaken: {
    bg: "--color-bg-alt",
    label: '<img src="/pulloverhaken-1.png" alt="Pulloverhaken" style="width: 100%; height: 100%; object-fit: contain;" />',
  },
  tipphilfe: {
    bg: "--color-bg-alt",
    label: '<img src="/tipphilfe-1.png" alt="Tipphilfe" style="width: 100%; height: 100%; object-fit: contain;" />',
  },
  stifthalter: {
    bg: "--color-bg-alt",
    label: '<img src="/stifthalter-1.png" alt="Stifthalter" style="width: 100%; height: 100%; object-fit: contain;" />',
  }
};

function productPlaceholder(id: string): string {
  const p = productPatterns[id] || { bg: '--color-bg-alt', label: '?' };
  return `
    <div class="product-card-image" style="background: ${p.bg}; display: flex; align-items: center; justify-content: center; font-size: 3rem;" aria-hidden="true">
      ${p.label}
    </div>
  `;
}

export function renderProductGrid(): string {
  const tr = t();

  const cards = tr.products.items
    .map(
      (item) => `
      <a href="#product/${item.id}" class="product-card" aria-label="${item.title}" data-product-id="${item.id}">
        ${productPlaceholder(item.id)}
        <div class="product-card-body">
          <h3>${item.title}</h3>
          <p>${item.shortDescription}</p>
        </div>
        <div class="product-card-footer">
          <span>${tr.products.viewDetails}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </div>
      </a>
    `
    )
    .join('');

  return `
    <section class="products section--bordered" id="products-section" aria-labelledby="products-title">
      <div class="container">
        <h2 id="products-title">${tr.products.title}</h2>
        <div class="product-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

export function bindProductGridEvents(): void {
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = (card as HTMLElement).dataset.productId;
      if (id) navigate(`product/${id}`);
    });
  });
}
