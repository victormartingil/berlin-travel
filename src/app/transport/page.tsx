"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { transportTips } from "@/data/transport";
import { t } from "@/lib/i18n";

export default function TransportPage() {
  const { locale } = useLocale();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{locale === "es" ? "Transporte" : "Transport"}</h1>
      <div className="grid gap-3">
        {transportTips.map((tip) => (
          <article key={tip.id} className="rounded-xl border bg-white p-4">
            <h3 className="font-semibold">{t(tip.title, locale)}</h3>
            <p className="text-sm text-zinc-700">{t(tip.description, locale)}</p>
            {tip.link ? <a className="text-sm text-blue-700" href={tip.link} target="_blank" rel="noreferrer">{tip.link}</a> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
