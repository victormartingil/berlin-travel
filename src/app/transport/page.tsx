"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { transportTips } from "@/data/transport";
import { t } from "@/lib/i18n";

export default function TransportPage() {
  const { locale } = useLocale();
  const isEs = locale === "es";

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">{isEs ? "Transporte" : "Transport"}</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {transportTips.map((tip) => (
          <article key={tip.id} className="rounded-md border bg-white p-4">
            <h3 className="font-semibold">{t(tip.title, locale)}</h3>
            <p className="mt-1 text-sm text-zinc-700">{t(tip.description, locale)}</p>
            {tip.link ? (
              <a className="mt-3 inline-block text-sm text-blue-700" href={tip.link} target="_blank" rel="noreferrer">
                {tip.link}
              </a>
            ) : null}
          </article>
        ))}
      </div>
      <div className="rounded-md border bg-white p-4 text-sm text-zinc-700">
        <h2 className="mb-2 font-semibold">{isEs ? "Reglas practicas para este viaje" : "Practical rules for this trip"}</h2>
        <ul className="space-y-1">
          <li>• {isEs ? "BER esta en zona C: para aeropuerto usad billete ABC." : "BER is in zone C: use ABC tickets for the airport."}</li>
          <li>• {isEs ? "Para dias de mucho movimiento, comparad 24h AB frente a billetes sueltos." : "For heavy transit days, compare 24h AB versus single tickets."}</li>
          <li>• {isEs ? "BVG Fahrinfo para rutas; BVG Ticket-App para billetes; Jelbi si quereis sharing." : "BVG Fahrinfo for routes; BVG Ticket-App for tickets; Jelbi for sharing."}</li>
          <li>• {isEs ? "Bici solo si hace buen tiempo: canal, Tempelhofer Feld y Holzmarkt son los mejores ejes." : "Bike only if weather is good: canal, Tempelhofer Feld and Holzmarkt are the best axes."}</li>
        </ul>
      </div>
    </section>
  );
}
