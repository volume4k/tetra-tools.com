import { t } from '../i18n/i18n.ts';

export function renderIntro(): string {
    const tr = t();

    const featureCards = tr.intro.features
        .map(
            (f) => `
      <div class="intro-feature">
        <div class="intro-feature-icon" aria-hidden="true">${f.icon}</div>
        <div>
          <h4>${f.title}</h4>
          <p>${f.description}</p>
        </div>
      </div>
    `
        )
        .join('');

    return `
    <section class="intro section--bordered" aria-labelledby="intro-title">
      <div class="container intro-grid">
        <div class="intro-text">
          <h2 id="intro-title">${tr.intro.title}</h2>
          <p>${tr.intro.text1}</p>
          <p>${tr.intro.text2}</p>
        </div>
        <div class="intro-features">
          ${featureCards}
        </div>
      </div>
    </section>
  `;
}
