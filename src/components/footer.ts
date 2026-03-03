import { t } from '../i18n/i18n.ts';

export function renderFooter(): string {
    const tr = t();

    return `
    <div class="container footer-inner">
      <span>${tr.footer.copyright}</span>
      <div class="footer-links">
        <a href="#impressum" id="footer-impressum">${tr.footer.impressum}</a>
      </div>
    </div>
  `;
}
