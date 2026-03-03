import de from './de.json';
import en from './en.json';

type Translations = typeof de;
export type Lang = 'de' | 'en';

const translations: Record<Lang, Translations> = { de, en };

let currentLang: Lang = 'de';
const listeners: Array<(lang: Lang) => void> = [];

/** Detect browser language, default to German */
function detectLanguage(): Lang {
    const stored = localStorage.getItem('tetra-tools-lang') as Lang | null;
    if (stored && (stored === 'de' || stored === 'en')) return stored;

    const nav = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'de';
    return nav.startsWith('en') ? 'en' : 'de';
}

/** Initialize i18n */
export function initI18n(): Lang {
    currentLang = detectLanguage();
    document.documentElement.lang = currentLang;
    return currentLang;
}

/** Get current language */
export function getLang(): Lang {
    return currentLang;
}

/** Switch language */
export function setLang(lang: Lang): void {
    currentLang = lang;
    localStorage.setItem('tetra-tools-lang', lang);
    document.documentElement.lang = lang;

    // Update page title and meta
    const t = translations[lang];
    document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.meta.description);

    // Notify listeners
    listeners.forEach((fn) => fn(lang));
}

/** Get translations for current language */
export function t(): Translations {
    return translations[currentLang];
}

/** Subscribe to language changes */
export function onLangChange(fn: (lang: Lang) => void): void {
    listeners.push(fn);
}

/** Get a nested value from translations by dot-path */
export function tPath(path: string): string {
    const parts = path.split('.');
    let result: unknown = translations[currentLang];
    for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
            result = (result as Record<string, unknown>)[part];
        } else {
            return path;
        }
    }
    return typeof result === 'string' ? result : path;
}
