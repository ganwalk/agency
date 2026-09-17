import Link from "next/link";
import type { Locale } from "@/i18n/config";

// Marca da Level: duas bolas do mesmo tamanho, centros alinhados no eixo
// vertical. A de baixo é sólida (base), a de cima só o contorno (nível
// acima). Desenhada em currentColor para herdar a cor do contexto (chrome
// escuro fixo ou conteúdo que segue o tema).
export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 40) / 32}
      viewBox="0 0 32 40"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="16" cy="25" r="10" fill="currentColor" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
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
