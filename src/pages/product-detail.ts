import { t } from '../i18n/i18n.ts';

/** Placeholder color patterns for products */
const productPatterns: Record<string, { bg: string; label: string }> = {
  steckhilfe: { bg: '#E8D5C4', label: '💉' },
  tipphilfe: { bg: '#D5E0D0', label: '⌨️' },
  tetratzange: { bg: '#D0D8E0', label: '🔧' },
  katheterhaken: { bg: '#E0D5D0', label: '🪝' },
};

export function renderProductDetail(productId: string): string {
  const tr = t();
  const product = tr.products.items.find((p) => p.id === productId);

  if (!product) {
    return `
      <section class="product-detail">
        <div class="container">
          <p>${tr.productDetail.notFound}</p>
          <a href="#" class="btn btn--outline">${tr.productDetail.backHome}</a>
        </div>
      </section>
    `;
  }

  const pattern = productPatterns[productId] || { bg: '#DDD', label: '?' };
  const badge = 'badge' in product && product.badge
    ? `<span class="product-detail-badge">${product.badge}</span>`
    : '';

  const featuresList = product.features
    .map((f) => `<li>✓ ${f}</li>`)
    .join('');

  return `
    <section class="product-detail" aria-labelledby="product-detail-title">
      <div class="container">
        <a href="#" class="product-detail-back" id="product-back">${tr.productDetail.back}</a>

        <div class="product-detail-header">
          <div class="product-detail-image" style="background: ${pattern.bg}; display: flex; align-items: center; justify-content: center; font-size: 5rem;" aria-hidden="true">
            ${pattern.label}
          </div>
          <div class="product-detail-info">
            ${badge}
            <h1 id="product-detail-title">${product.title}</h1>
            <p>${product.description}</p>

            <h3 style="margin-block-start: var(--space-xl); margin-block-end: var(--space-md);">${tr.productDetail.features}</h3>
            <ul style="display: grid; gap: var(--space-sm); font-family: var(--font-body);">
              ${featuresList}
            </ul>

            <div class="product-detail-cta">
              <a href="mailto:request@tetra-tools.com?subject=${encodeURIComponent(tr.contact.emailSubject + ' — ' + product.title)}" class="btn btn--primary">
                ✉ ${tr.productDetail.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
