// Centraliza a URL pública, usada em metadataBase, hreflang, OG/Twitter e sitemap.
// Em desenvolvimento e no build do GitHub Pages sem domínio próprio, cai no
// fallback do próprio GitHub Pages; troque NEXT_PUBLIC_SITE_URL quando o
// domínio da Level estiver definido.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ganwalk.github.io/agency";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// next/image com images.unoptimized (export estático) não prefixa o src com
// o basePath sozinho, diferente de next/link e do favicon: sem isso, toda
// foto vira um 404 assim que o site mora num subcaminho (GitHub Pages).
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
