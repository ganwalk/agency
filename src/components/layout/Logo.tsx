import Link from "next/link";
import type { Locale } from "@/i18n/config";

// Marca da Level: duas bolas do mesmo tamanho, na diagonal. A de cima
// (superior direita) é sólida, a de baixo só o contorno — o nível
// alcançado subindo à direita. Desenhada em currentColor para herdar a
// cor do contexto (chrome escuro fixo ou conteúdo que segue o tema).
export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <circle cx="19" cy="13" r="10" fill="currentColor" />
      <circle cx="13" cy="19" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function Logo({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const color = dark ? "var(--on-dark)" : "var(--ink)";

  return (
    <Link
      href={`/${locale}/`}
      className="flex items-center gap-2.5 shrink-0"
      aria-label="Level"
    >
      <span style={{ color }}>
        <Mark size={20} />
      </span>
      <span className="type-display text-xl tracking-tight" style={{ color }}>
        Level
      </span>
    </Link>
  );
}
