import { t } from '../i18n/i18n.ts';

export function renderContact(): string {
    const tr = t();

    return `
    <section class="contact" aria-labelledby="contact-title" id="contact-section">
      <div class="container">
        <h2 id="contact-title">${tr.contact.title}</h2>
        <p class="contact-description">${tr.contact.description}</p>
        <a href="mailto:request@tetra-tools.com?subject=${encodeURIComponent(tr.contact.emailSubject)}" class="btn btn--primary" id="contact-cta">
          ✉ ${tr.contact.cta}
        </a>
      </div>
    </section>
  `;
}
