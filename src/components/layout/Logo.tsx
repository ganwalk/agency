import Link from "next/link";
import type { Locale } from "@/i18n/config";

export function Logo({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  return (
    <Link
      href={`/${locale}/`}
      className="flex items-center gap-2.5 shrink-0"
      aria-label="Level"
    >
      <span
        className="flex items-end gap-0.5 h-6"
        aria-hidden="true"
        style={{ color: dark ? "var(--paper)" : "var(--navy)" }}
      >
        <span className="w-1.5 h-2.5 bg-current rounded-[1px]" />
        <span className="w-1.5 h-4 bg-current rounded-[1px]" />
        <span className="w-1.5 h-6 bg-current rounded-[1px]" />
      </span>
      <span
        className="type-display text-xl tracking-tight"
        style={{ color: dark ? "var(--paper)" : "var(--navy)" }}
      >
        Level
      </span>
    </Link>
  );
}
