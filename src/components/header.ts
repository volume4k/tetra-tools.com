import { t, getLang, setLang } from '../i18n/i18n.ts';
import type { Lang } from '../i18n/i18n.ts';

export function renderHeader(): string {
    const tr = t();
    const lang = getLang();

    return `
    <div class="container header-inner">
      <a href="#" class="header-logo" aria-label="${tr.header.logoAlt}">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="36" height="36" fill="currentColor"/>
          <text x="18" y="24" text-anchor="middle" fill="#F5F0EB" font-family="'Bricolage Grotesque', serif" font-size="16" font-weight="800">TT</text>
        </svg>
        <span>tetra-tools</span>
      </a>
      <nav class="header-nav" aria-label="Navigation">
        <div class="lang-switch" role="group" aria-label="${lang === 'de' ? 'Sprache wählen' : 'Select language'}">
          <button id="lang-de" class="${lang === 'de' ? 'active' : ''}" aria-pressed="${lang === 'de'}" aria-label="Deutsch">DE</button>
          <button id="lang-en" class="${lang === 'en' ? 'active' : ''}" aria-pressed="${lang === 'en'}" aria-label="English">EN</button>
        </div>
      </nav>
    </div>
  `;
}

export function bindHeaderEvents(): void {
    document.getElementById('lang-de')?.addEventListener('click', () => setLang('de' as Lang));
    document.getElementById('lang-en')?.addEventListener('click', () => setLang('en' as Lang));
}
