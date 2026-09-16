import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { localeAlternates } from "@/lib/hreflang";

export const dynamic = "force-static";

function languageAlternates(path: string) {
  return localeAlternates((loc) => `${siteUrl}/${loc}${path}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const paths = ["/", "/legal/privacy/", "/legal/terms/"];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.3,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
