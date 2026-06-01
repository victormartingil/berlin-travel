"use client";

import Link from "next/link";
import { CalendarCheck, CloudRain, CreditCard, Heart, MapPin, Newspaper, ShieldCheck, WalletCards } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { PlaceCard } from "@/components/places/PlaceCard";
import { places } from "@/data/places";
import { tripSettings } from "@/data/settings";
import { useFavorites } from "@/hooks/useFavorites";

export default function HomePage() {
  const { locale } = useLocale();
  const fav = useFavorites();
  const isEs = locale === "es";
  const priorityPlaces = places.filter((p) => p.priority === "essential" || p.priority === "high").slice(0, 4);
  const friendPicks = places.filter((p) => p.friendRecommended).slice(0, 4);
  const saved = places.filter((p) => fav.ids.includes(p.id)).slice(0, 2);
  const accommodation = places.find((p) => p.id === "accommodation-nena-moritzplatz");

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <p className="text-sm uppercase text-zinc-500">{tripSettings.dates.start} / {tripSettings.dates.end}</p>
          <h1 className="text-3xl font-semibold">{isEs ? "Berlin vivido por barrios" : "Berlin by neighborhood"}</h1>
          <p className="max-w-2xl text-zinc-700">
            {isEs
              ? "Kreuzberg y Neukolln primero, Friedrichshain y Mitte despues, con arte, mercados, comida veg-friendly y noches seleccionadas."
              : "Kreuzberg and Neukolln first, Friedrichshain and Mitte next, with art, markets, veg-friendly food and selected nights."}
          </p>
        </div>
        <div className="rounded-md border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-500">{isEs ? "Base" : "Base"}</p>
          {accommodation ? (
            <Link className="font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-2" href={`/places/${accommodation.id}/`}>
              Nena Apartments Moritzplatz
            </Link>
          ) : (
            <p className="font-semibold">Nena Apartments Moritzplatz</p>
          )}
          <p className="mt-1 text-sm text-zinc-600">Prinzessinnenstrasse 17, Kreuzberg</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {accommodation ? (
              <Link className="inline-flex items-center gap-2 rounded-md bg-emerald-900 px-3 py-2 text-sm text-white" href={`/places/${accommodation.id}/`}>
                {isEs ? "Ver ficha" : "View details"}
              </Link>
            ) : null}
            <Link className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-sm text-zinc-900" href="/map/">
              <MapPin size={16} />
              {isEs ? "Abrir mapa" : "Open map"}
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-6">
        {[
          { icon: CalendarCheck, label: isEs ? "Reservar antes" : "Book ahead", href: "/food/" },
          { icon: CloudRain, label: isEs ? "Planes de lluvia" : "Rain plans", href: "/museums/" },
          { icon: WalletCards, label: isEs ? "Low budget" : "Low budget", href: "/alternative/" },
          { icon: CreditCard, label: isEs ? "Cash/card" : "Cash/card", href: "/practical/" },
          { icon: Newspaper, label: isEs ? "Contexto" : "Context", href: "/context/" },
          { icon: ShieldCheck, label: isEs ? "Seguridad" : "Safety", href: "/safety/" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white p-3 text-sm">
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {saved.length > 0 ? (
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Heart size={18} />
            {isEs ? "Favoritos recientes" : "Recent favorites"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {saved.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
          </div>
        </section>
      ) : null}

      <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-700">{isEs ? "Capa prioritaria" : "Priority layer"}</p>
            <h2 className="text-xl font-semibold">{isEs ? "Consejos de amigo" : "Friend picks"}</h2>
          </div>
          <Link className="rounded-md bg-amber-900 px-3 py-2 text-sm text-white" href="/map/">
            {isEs ? "Ver en mapa" : "Map"}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {friendPicks.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{isEs ? "Prioridades del viaje" : "Trip priorities"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {priorityPlaces.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
        </div>
      </section>
    </section>
  );
}
