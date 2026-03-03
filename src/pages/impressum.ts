import { t } from '../i18n/i18n.ts';

export function renderImpressum(): string {
    const tr = t();

    return `
    <section class="impressum" aria-labelledby="impressum-title">
      <div class="container">
        <h1 id="impressum-title">${tr.impressum.title}</h1>

        <h2>${tr.impressum.responsible}</h2>
        <p style="white-space: pre-line;">${tr.impressum.responsibleContent}</p>

        <h2>${tr.impressum.contactTitle}</h2>
        <p>${tr.impressum.contactContent}</p>

        <h2>${tr.impressum.disclaimer}</h2>
        <p>${tr.impressum.disclaimerContent}</p>
      </div>
    </section>
  `;
}
