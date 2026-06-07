import { t, getLang, setLang } from '../i18n/i18n.ts';
import type { Lang } from '../i18n/i18n.ts';

export function renderHeader(): string {
    const tr = t();
    const lang = getLang();

    return `
    <div class="container header-inner">
      <a href="#" class="header-logo" aria-label="${tr.header.logoAlt}">
        <img src="/TetraTools-logo.svg" alt="TetraTools Logo" width="36" height="36" />
        <span>TetraTools</span>
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
