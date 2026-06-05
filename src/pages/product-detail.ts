import { t } from '../i18n/i18n.ts';
import { navigate } from '../router.ts';

/** Placeholder images for products */
const productPatterns: Record<string, { images: string[] }> = {
  steckhilfe: {
    images: ['/steckhilfe-1.png', '/steckhilfe-2.png', '/steckhilfe-3.png', '/steckhilfe-4.png'],
  },
  tipphilfe: {
    images: ['/tipphilfe-1.png', '/tipphilfe-2.png', '/tipphilfe-3.png'],
  },
  tetrazange: {
    images: ['/tetrazange-1.png', '/tetrazange-2.png', '/tetrazange-3.png', '/tetrazange-4.jpg'],
  },
  hosenhaken: {
    images: ['/hosenhaken-1.png', '/hosenhaken-2.jpg', '/hosenhaken-3.jpg'],
  },
  pulloverhaken: {
    images: ['/pulloverhaken-1.png', '/pulloverhaken-2.png', '/pulloverhaken-3.jpg', '/pulloverhaken-4.png'],
  },
  stifthalter: {
    images: ['/stifthalter-1.png', '/stifthalter-2.png'],
  },
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

  const pattern = productPatterns[productId] || { images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'] };

  const badge = 'badge' in product && product.badge
    ? `<span class="product-detail-badge">${product.badge}</span>`
    : '';

  const featuresList = product.features
    .map((f) => `<li>✓ ${f}</li>`)
    .join('');

  return `
    <section class="product-detail" data-product-id="${productId}" aria-labelledby="product-detail-title">
      <div class="container">
        <a href="#" class="product-detail-back" id="product-back">${tr.productDetail.back}</a>

        <div class="product-detail-header">
          <div class="product-detail-image" aria-hidden="true">
            <img id="product-image" src="${pattern.images[0]}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: contain;" />
            <div class="carousel-controls" style="display: flex; justify-content: center; margin-top: 10px;">
              <button id="product-prev" aria-label="Previous image" style="margin: 0 5px; padding: 3px 20px;">&larr;</button>
              <button id="product-next" aria-label="Next image" style="margin: 0 5px; padding: 5px 20px;">&rarr;</button>
            </div>
          </div>
          <div class="product-detail-info">
            ${badge}
            <h1 id="product-detail-title">${product.title}</h1>
            <p>${product.description}</p>

            <h3 style="margin-block-start: var(--space-xl); margin-block-end: var(--space-md);">${tr.productDetail.features}</h3>
            <ul style="display: grid; gap: var(--space-sm); font-family: var(--font-body);">
              ${featuresList}
            </ul>

            <!-- Checkbox für Bedingungen hinzugefügt -->
            <div class="contact-accept" style="margin-block-start: var(--space-xl); margin-block-end: var(--space-md); display: flex; align-items: center; gap: var(--space-xs);">
              <input type="checkbox" id="accept-terms">
              <label for="accept-terms" style="font-family: var(--font-body);">${tr.contact.acceptTerms}</label>
            </div>

            <div class="product-detail-cta">
              <!-- ID "contact-cta" und Klasse "btn--disabled" hinzugefügt -->
              <a href="mailto:request@tetra-tools.com?subject=${encodeURIComponent(tr.contact.emailSubject + ' — ' + product.title)}" class="btn btn--primary btn--disabled" id="contact-cta">
                ✉ ${tr.productDetail.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindProductDetailEvents(): void {
  document.getElementById('product-back')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('');
  });

  const section = document.querySelector('.product-detail') as HTMLElement;
  const productId = section?.getAttribute('data-product-id');
  if (!productId) return;

  const pattern = productPatterns[productId];
  if (!pattern) return;

  const img = document.getElementById('product-image') as HTMLImageElement;
  const prevBtn = document.getElementById('product-prev') as HTMLButtonElement;
  const nextBtn = document.getElementById('product-next') as HTMLButtonElement;

  if (!img || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + pattern.images.length) % pattern.images.length;
    img.src = pattern.images[currentIndex];
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % pattern.images.length;
    img.src = pattern.images[currentIndex];
  });
}
