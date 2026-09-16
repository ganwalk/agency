// Centraliza a URL pública, usada em metadataBase, hreflang, OG/Twitter e sitemap.
// Em desenvolvimento e no build do GitHub Pages sem domínio próprio, cai no
// fallback do próprio GitHub Pages; troque NEXT_PUBLIC_SITE_URL quando o
// domínio da Level estiver definido.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ganwalk.github.io/agency";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
