import { ui, defaultLang, languages } from './ui';

export type Lang = keyof typeof languages;

/**
 * Get the language from a URL pathname
 */
export function getLangFromUrl(url: URL): Lang {
    const [, lang] = url.pathname.split('/');
    if (lang in languages) {
        return lang as Lang;
    }
    return defaultLang;
}

/**
 * Get a translation function for a specific language
 */
export function useTranslations(lang: Lang) {
    return function t(key: keyof typeof ui[typeof defaultLang]): string {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

/**
 * Get the translated path for a given URL and target language
 */
export function getTranslatedPath(url: URL, targetLang: Lang): string {
    const [, currentLang, ...rest] = url.pathname.split('/');

    // If current path has a language prefix
    if (currentLang in languages) {
        if (targetLang === defaultLang) {
            // Remove language prefix for default language
            return '/' + rest.join('/') || '/';
        }
        return `/${targetLang}/${rest.join('/')}`;
    }

    // No language prefix in current path (default language)
    if (targetLang === defaultLang) {
        return url.pathname;
    }
    return `/${targetLang}${url.pathname}`;
}

/**
 * Check if a path should use the default language (no prefix)
 */
export function isDefaultLang(lang: Lang): boolean {
    return lang === defaultLang;
}

/**
 * Get locale path - adds language prefix if not default language
 */
export function getLocalePath(path: string, lang: Lang): string {
    if (lang === defaultLang) {
        return path;
    }
    return `/${lang}${path}`;
}

export { languages, defaultLang };
