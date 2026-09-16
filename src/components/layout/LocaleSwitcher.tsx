"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { locales, localeCodes, localeNames, type Locale } from "@/i18n/config";

function pathForLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = target;
  return `/${segments.join("/")}/`;
}

export function LocaleSwitcher({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const color = dark ? "var(--on-dark)" : "var(--ink)";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1 text-sm font-medium tracking-wide px-2 py-1.5 rounded-full cursor-pointer transition-opacity hover:opacity-70"
        style={{ color }}
      >
        {localeCodes[locale]}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-36 rounded-xl border py-1.5 shadow-lg z-50"
          style={{
            background: "var(--paper)",
            borderColor: "var(--line)",
          }}
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <Link
                href={pathForLocale(pathname, loc)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 px-3.5 py-2 text-sm hover:opacity-70"
                style={{ color: "var(--ink)" }}
              >
                <span>{localeNames[loc]}</span>
                <span style={{ color: "var(--muted)" }}>{localeCodes[loc]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
