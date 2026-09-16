import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/layout/Logo";
import { contact } from "@/data/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="film-grain" style={{ background: "var(--navy)" }}>
      <div className="container-level py-14 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo locale={locale} dark />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-on-navy)" }}>
              {dict.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: "var(--muted-on-navy)" }}
                className="hover:opacity-70 transition-opacity"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "var(--muted-on-navy)" }}
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram size={18} />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: "var(--muted-on-navy)" }}
                className="hover:opacity-70 transition-opacity"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--muted-on-navy)" }}>
                {dict.nav.contact}
              </span>
              <a
                href={contact.emailHref}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--cream)" }}
              >
                {contact.email}
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--cream)" }}
              >
                WhatsApp
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--muted-on-navy)" }}>
                Level
              </span>
              <Link href={`/${locale}/#team`} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--cream)" }}>
                {dict.nav.team}
              </Link>
              <Link href={`/${locale}/#services`} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--cream)" }}>
                {dict.nav.services}
              </Link>
              <Link href={`/${locale}/#process`} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--cream)" }}>
                {dict.nav.process}
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--muted-on-navy)" }}>
                Legal
              </span>
              <Link href={`/${locale}/legal/privacy/`} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--cream)" }}>
                {dict.footer.legal.privacy}
              </Link>
              <Link href={`/${locale}/legal/terms/`} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "var(--cream)" }}>
                {dict.footer.legal.terms}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid var(--navy-line)", color: "var(--muted-on-navy)" }}
        >
          <span>
            © {year} Level. {dict.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
