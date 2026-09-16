import { locales, type Locale } from "@/i18n/config";

// Cada idioma aponta para os outros três (hreflang completo, ida e volta).
export function localeAlternates(pathFor: (locale: Locale) => string): Record<string, string> {
  const entries = locales.map((locale) => [locale, pathFor(locale)] as const);
  return Object.fromEntries(entries);
}
