import { t } from '../i18n/i18n.ts';

export function renderDatenschutz(): string {
    const tr = t();

    return `
    <section class="datenschutz" aria-labelledby="datenschutz-title">
      <div class="container">
        <h1 id="datenschutz-title">${tr.datenschutz.title}</h1>

        <h2>${tr.datenschutz.TOC}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.TOCContent}</p>

        <h2>${tr.datenschutz.chapter1}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.chapter1Content}</p>

        <h2>${tr.datenschutz.chapter2}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.chapter2Content}</p>

        <h2>${tr.datenschutz.chapter3}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.chapter3Content}</p>

        <h2>${tr.datenschutz.chapter4}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.chapter4Content}</p>

        <h2>${tr.datenschutz.chapter5}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.chapter5Content}</p>

        <h2>${tr.datenschutz.chapter6}</h2>
        <p style="white-space: pre-line;">${tr.datenschutz.chapter6Content}</p>
      </div>
    </section>
  `;
}
