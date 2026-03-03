import { t } from '../i18n/i18n.ts';

export function renderHero(): string {
    const tr = t();

    return `
    <section class="hero section--bordered" aria-labelledby="hero-title">
      <div class="container hero-content">
        <span class="hero-label">${tr.hero.label}</span>
        <h1 id="hero-title">
          ${tr.hero.title}
          <span class="accent">${tr.hero.titleAccent}</span>
        </h1>
        <p class="hero-description">${tr.hero.description}</p>
        <div class="hero-cta">
          <a href="mailto:request@tetra-tools.com?subject=${encodeURIComponent(tr.contact.emailSubject)}" class="btn btn--primary" id="hero-cta-email">
            ✉ ${tr.hero.cta}
          </a>
          <a href="#products-section" class="btn btn--outline" id="hero-cta-products">
            ↓ ${tr.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  `;
}
