export const locales = ["pt", "en", "es", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  zh: "中文",
};

export const localeCodes: Record<Locale, string> = {
  pt: "BR",
  en: "EN",
  es: "ES",
  zh: "ZH",
};

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  zh: "zh-CN",
};

export const ogLocale: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
  zh: "zh_CN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
