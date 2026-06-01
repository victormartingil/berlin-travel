"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useFavorites } from "@/hooks/useFavorites";
import { places } from "@/data/places";
import { PlaceCard } from "@/components/places/PlaceCard";
import { t, ui } from "@/lib/i18n";

export default function FavoritesPage() {
  const { locale } = useLocale();
  const fav = useFavorites();
  const favPlaces = places.filter((p) => fav.ids.includes(p.id));

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{locale === "es" ? "Favoritos" : "Favorites"}</h1>
      {favPlaces.length === 0 ? <p className="rounded-xl border bg-white p-4 text-zinc-700">{t(ui.labels.noFavorites, locale)}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {favPlaces.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
      </div>
    </section>
  );
}
