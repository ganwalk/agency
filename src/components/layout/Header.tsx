"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/layout/Logo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let scheduled = false;

    function measure() {
      const nav = navRef.current;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const isFloating = hero
        ? hero.getBoundingClientRect().bottom <= (nav?.offsetHeight ?? 0)
        : window.scrollY > 80;
      setFloating(isFloating);
      scheduled = false;
    }

    function onScroll() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const links = [
    { href: `/${locale}/#team`, label: dict.nav.team },
    { href: `/${locale}/#services`, label: dict.nav.services },
    { href: `/${locale}/#process`, label: dict.nav.process },
  ];

  return (
    <>
      <header className="nav-shell" data-floating={floating} ref={navRef}>
        <div className="nav-inner container-level py-2.5">
          <div className="nav-surface" aria-hidden="true" />

          <Logo locale={locale} dark />

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors"
                style={{ color: "var(--muted-on-navy)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--on-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-on-navy)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div className="hidden sm:block">
              <LocaleSwitcher locale={locale} dark />
            </div>
            <Link
              href={`/${locale}/#contact`}
              className="hidden lg:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
              style={{ background: "var(--on-dark)", color: "var(--navy)" }}
            >
              {dict.nav.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menuOpen}
              className="p-2 -mr-2 lg:hidden cursor-pointer"
              style={{ color: "var(--on-dark)" }}
            >
              <HugeiconsIcon icon={Menu01Icon} size={22} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} locale={locale} dict={dict} />
    </>
  );
}
