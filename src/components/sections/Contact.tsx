"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { MessageCircle, Mail, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { contact, web3FormsAccessKey } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

export function Contact({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.contact.form;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", web3FormsAccessKey);
    data.append("subject", `Novo contato pelo site, Level (${data.get("project_type")})`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="film-grain relative section-pad overflow-hidden" style={{ background: "var(--navy)" }}>
      <Image
        src="/images/contact-skyline.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--navy) 0%, rgba(17,20,28,0.75) 45%, var(--navy) 100%)" }}
      />

      <div className="container-level relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
          <div>
            <Reveal>
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "var(--accent-soft)" }}
              >
                {dict.contact.eyebrow}
              </p>
              <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--paper)" }}>
                {dict.contact.title}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--cream)" }}>
                {dict.contact.intro}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--navy-line)" }}>
                <p className="text-sm font-semibold mb-4" style={{ color: "var(--muted-on-navy)" }}>
                  {dict.contact.direct.title}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]"
                    style={{ background: "var(--paper)", color: "var(--navy)" }}
                  >
                    <MessageCircle size={16} />
                    {dict.contact.direct.whatsapp}
                  </a>
                  <a
                    href={contact.emailHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border transition-colors hover:bg-white/10"
                    style={{ borderColor: "var(--navy-line)", color: "var(--paper)" }}
                  >
                    <Mail size={16} />
                    {dict.contact.direct.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
              style={{ background: "var(--paper)" }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={f.name}>
                  <input name="name" type="text" required className="field-input" />
                </Field>
                <Field label={f.email}>
                  <input name="email" type="email" required className="field-input" />
                </Field>
              </div>
              <Field label={f.company}>
                <input name="company" type="text" className="field-input" />
              </Field>
              <Field label={f.projectType}>
                <select name="project_type" required className="field-input" defaultValue="">
                  <option value="" disabled>
                    {f.projectType}
                  </option>
                  {f.projectTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.message}>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={f.messagePlaceholder}
                  className="field-input resize-none"
                />
              </Field>

              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {f.budgetNote}
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] disabled:opacity-60"
                style={{ background: "var(--navy)", color: "var(--paper)" }}
              >
                {status === "sending" ? f.sending : f.submit}
                <Send size={15} />
              </button>

              {status === "success" && (
                <p className="text-sm font-medium" style={{ color: "var(--accent-moss)" }}>
                  {f.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium" style={{ color: "var(--accent-terracotta)" }}>
                  {f.error}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}
