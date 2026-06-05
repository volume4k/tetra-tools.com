import { t } from '../i18n/i18n.ts';

const checkbox = document.getElementById('accept-terms') as HTMLInputElement;
const ctaButton = document.getElementById('contact-cta');

console.log('Checkbox gefunden:', checkbox); // Zeigt im Browser an, ob die Checkbox existiert
console.log('Button gefunden:', ctaButton);   // Zeigt an, ob der Button existiert


export function renderContact(): string {
    const tr = t();

    return `
    <section class="contact" aria-labelledby="contact-title" id="contact-section">
      <div class="container">
        <h2 id="contact-title">${tr.contact.title}</h2>
        <p class="contact-description">${tr.contact.description}</p>
 
        <div class="contact-accept">
          <input type="checkbox" id="accept-terms">
          <label for="accept-terms">${tr.contact.acceptTerms}</label>
        </div>

        <!-- Klasse "btn--disabled" initial hinzugefügt -->
        <a href="mailto:request@tetra-tools.com?subject=${encodeURIComponent(tr.contact.emailSubject)}" class="btn btn--primary btn--disabled" id="contact-cta">
          ✉ ${tr.contact.cta}
        </a>

      </div>
    </section>
  `;
}
console.log('Checkbox gefunden:', checkbox); // Zeigt im Browser an, ob die Checkbox existiert
console.log('Button gefunden:', ctaButton);   // Zeigt an, ob der Button existiert
