"use client";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { tripSettings } from "@/data/settings";

export default function HomePage() {
  const { locale } = useLocale();
  const isEs = locale === "es";
  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-semibold">{isEs ? "Guía de Berlín" : "Berlin Guide"}</h1>
      <p className="text-zinc-700">{isEs ? "Guía personalizada para el viaje del 10 al 16 de junio de 2026." : "Personalized guide for the June 10–16, 2026 trip."}</p>
      <div className="rounded-xl border bg-white p-4">
        <p>{isEs ? "Alojamiento" : "Accommodation"}: Nena Apartments Moritzplatz</p>
        <p>{isEs ? "Fechas" : "Dates"}: {tripSettings.dates.start} → {tripSettings.dates.end}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {[
          ["/itinerary/", isEs ? "Itinerario" : "Itinerary"],
          ["/map/", isEs ? "Mapa" : "Map"],
          ["/food/", isEs ? "Comida" : "Food"],
          ["/nightlife/", isEs ? "Noche" : "Nightlife"],
          ["/museums/", isEs ? "Museos" : "Museums"],
          ["/practical/", isEs ? "Práctico" : "Practical"],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="rounded-lg border bg-white px-4 py-3 hover:bg-zinc-50">{label}</Link>
        ))}
      </div>
    </section>
  );
}
