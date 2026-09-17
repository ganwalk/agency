"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { contact } from "@/data/site";

type Props = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
};

export function MobileMenu({ open, onClose, locale, dict }: Props) {
  const links = [
    { href: `/${locale}/#services`, label: dict.nav.services },
    { href: `/${locale}/#process`, label: dict.nav.process },
    { href: `/${locale}/#team`, label: dict.nav.team },
    { href: `/${locale}/#contact`, label: dict.nav.contact },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-100 flex flex-col"
          style={{ background: "var(--navy)" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="container-level flex items-center justify-between py-5">
            <span className="type-display text-xl" style={{ color: "var(--on-dark)" }}>
              LeveL
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={dict.nav.menuClose}
              className="p-2 -mr-2 cursor-pointer"
              style={{ color: "var(--on-dark)" }}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={26} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-start justify-center gap-3 px-6">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="type-display text-4xl sm:text-5xl text-left"
                  style={{ color: "var(--on-dark)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="container-level flex items-center justify-between py-6">
            <span className="text-sm" style={{ color: "var(--muted-on-navy)" }}>
              {contact.email}
            </span>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LocaleSwitcher locale={locale} dark openUpward />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
