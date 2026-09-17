// Une a última palavra à penúltima com espaço inseparável, pra nenhum título
// terminar com uma palavra órfã sozinha na última linha.
export function noOrphan(text: string): string {
  const lastSpace = text.lastIndexOf(" ");
  if (lastSpace === -1) return text;
  return `${text.slice(0, lastSpace)} ${text.slice(lastSpace + 1)}`;
}
