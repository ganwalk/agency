import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type LegalDoc = Dictionary["legal"]["privacy"] | Dictionary["legal"]["terms"];

const updatedAt: Record<Locale, string> = {
  pt: "16 de setembro de 2026",
  en: "September 16, 2026",
  es: "16 de septiembre de 2026",
  zh: "2026年9月16日",
};

export function LegalPage({
  locale,
  dict,
  doc,
}: {
  locale: Locale;
  dict: Dictionary;
  doc: LegalDoc;
}) {
  return (
    <div className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level max-w-2xl">
        <Link
          href={`/${locale}/`}
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity mb-10"
          style={{ color: "var(--muted)" }}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={15} />
          {dict.legal.backHome}
        </Link>

        <h1 className="type-display text-3xl sm:text-4xl" style={{ color: "var(--ink)" }}>
          {doc.title}
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          {doc.updated}: {updatedAt[locale]}
        </p>
        <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          {doc.intro}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-semibold text-lg" style={{ color: "var(--ink)" }}>
                {section.heading}
              </h2>
              <p className="mt-2 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
