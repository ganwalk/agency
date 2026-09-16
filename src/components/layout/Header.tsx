"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/layout/Logo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}/#team`, label: dict.nav.team },
    { href: `/${locale}/#services`, label: dict.nav.services },
    { href: `/${locale}/#process`, label: dict.nav.process },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(250, 246, 238, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <div className="container-level flex items-center justify-between py-4">
          <Logo locale={locale} />

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
                style={{ color: "var(--ink)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <LocaleSwitcher locale={locale} />
            </div>
            <Link
              href={`/${locale}/#contact`}
              className="hidden lg:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "var(--navy)", color: "var(--paper)" }}
            >
              {dict.nav.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menuOpen}
              className="p-2 -mr-2 lg:hidden cursor-pointer"
              style={{ color: "var(--ink)" }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} locale={locale} dict={dict} />
    </>
  );
}
