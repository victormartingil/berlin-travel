"use client";

import { AlertTriangle, ExternalLink, HeartPulse, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { safetyCards } from "@/data/safetyGuide";
import { t } from "@/lib/i18n";

const riskStyles = {
  info: "border-zinc-200 bg-white",
  warning: "border-amber-200 bg-amber-50",
  urgent: "border-rose-200 bg-rose-50",
} as const;

export default function SafetyPage() {
  const { locale } = useLocale();
  const isEs = locale === "es";

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <p className="text-sm uppercase tracking-[0.2em] text-rose-700">{isEs ? "Leyes, salud y reduccion de riesgos" : "Law, health and harm reduction"}</p>
        <h1 className="mt-2 text-3xl font-semibold">{isEs ? "Guia de seguridad sin moralina" : "Practical safety guide, no moralising"}</h1>
        <p className="mt-3 max-w-3xl text-zinc-700">
          {isEs
            ? "Esto no es asesoramiento legal ni medico. Es una chuleta para evitar sustos: que es legal, que no, que hacer si algo va mal y que preparar antes de viajar."
            : "This is not legal or medical advice. It is a field note to avoid trouble: what is legal, what is not, what to do if something goes wrong and what to prepare before travel."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {safetyCards.map((card) => (
          <article key={card.id} className={`rounded-xl border p-4 ${riskStyles[card.risk]}`}>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white p-2 text-zinc-900">
                {card.risk === "urgent" ? <AlertTriangle size={18} /> : card.id.includes("health") || card.id.includes("emergency") ? <HeartPulse size={18} /> : <ShieldCheck size={18} />}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{t(card.title, locale)}</h2>
                <p className="mt-1 text-sm text-zinc-700">{t(card.summary, locale)}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {card.items.map((item) => (
                <li key={t(item, locale)} className="rounded-md bg-white/70 px-3 py-2">{t(item, locale)}</li>
              ))}
            </ul>
            <a className="mt-4 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-xs text-white" href={card.sourceUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={14} />
              {t(card.sourceLabel, locale)} · {card.lastVerifiedAt}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
