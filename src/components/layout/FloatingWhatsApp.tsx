"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { contact } from "@/data/site";

// Botão fixo, sempre no mesmo canto em qualquer seção (clara ou escura):
// cores fixas do chrome, não as que acompanham o tema, iguais ao header.
export function FloatingWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-105"
      style={{ background: "var(--navy)", color: "var(--on-dark)" }}
    >
      <HugeiconsIcon icon={WhatsappIcon} size={24} />
    </a>
  );
}
