"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarCheck, ExternalLink, ImageIcon, MapPin, Ticket } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { PriceBadge, PriorityBadge, VerificationBadge } from "@/components/ui/Badges";
import { getPlaceImages } from "@/data/placeMedia";
import type { Place } from "@/domain/place";
import { useFavorites } from "@/hooks/useFavorites";
import { t, ui } from "@/lib/i18n";
import { getMapIconForCategory } from "@/lib/mapIcons";
import { buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { publicAssetPath } from "@/lib/paths";
import { buildPlaceDetailSections } from "@/lib/placeDetails";

export function PlaceDetailClient({ place }: { place: Place }) {
  const { locale } = useLocale();
  const fav = useFavorites();
  const icon = getMapIconForCategory(place.category);
  const details = buildPlaceDetailSections(place, locale);
  const images = getPlaceImages(place.id);
  const heroImage = images[0];

  return (
    <article className="space-y-6">
      <Link href="/map/" className="inline-flex items-center gap-2 text-sm text-zinc-600">
        <ArrowLeft size={16} />
        {locale === "es" ? "Volver al mapa" : "Back to map"}
      </Link>

      <header className="overflow-hidden rounded-2xl bg-zinc-950 text-white">
        <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: icon.color }} dangerouslySetInnerHTML={{ __html: icon.svg }} />
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{t(icon.label, locale)}</span>
              <PriorityBadge value={place.priority} />
              <PriceBadge value={place.priceLevel} />
              <VerificationBadge status={place.verification.status} locale={locale} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{place.name}</h1>
              <p className="mt-2 text-zinc-300">{place.neighbourhood}{place.address ? ` · ${place.address}` : ""}</p>
            </div>
            <p className="max-w-2xl text-zinc-200">{t(place.description, locale)}</p>
          </div>
          <div className="relative flex min-h-64 items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(135deg,var(--detail-color),#111827)]" style={{ "--detail-color": icon.color } as React.CSSProperties}>
            {heroImage ? (
              <>
                <Image src={publicAssetPath(heroImage.src)} alt={t(heroImage.alt, locale)} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" priority />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-white">
                  {heroImage.license} · {heroImage.author}
                </div>
              </>
            ) : (
              <div className="m-6 rounded-2xl border border-white/30 bg-white/10 p-6 text-center backdrop-blur">
                <ImageIcon className="mx-auto" size={36} />
                <p className="mt-3 text-sm text-zinc-100">{locale === "es" ? "Ficha visual propia" : "Own visual card"}</p>
                <p className="mt-1 max-w-xs text-xs text-zinc-300">
                  {locale === "es"
                    ? "Sin foto embebida con licencia clara todavia. Usa las referencias visuales y Google Maps para confirmar el ambiente actual."
                    : "No embedded photo with clear license yet. Use visual references and Google Maps to confirm the current vibe."}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-md border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">{locale === "es" ? "Por que encaja" : "Why it fits"}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {details.why.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>

          <section className="rounded-md border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">{locale === "es" ? "Practico" : "Practical"}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {details.practical.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>

          <section className="rounded-md border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">{locale === "es" ? "Senales utiles" : "Useful signals"}</h2>
            {details.signals.length ? (
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {details.signals.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-zinc-600">{locale === "es" ? "Sin senales extra verificadas por ahora." : "No extra verified signals yet."}</p>
            )}
          </section>

          <section className="rounded-md border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">{locale === "es" ? "Imagenes y referencias visuales" : "Images and visual references"}</h2>
            {images.length > 0 ? (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {images.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
                    <div className="relative aspect-[4/3]">
                      <Image src={publicAssetPath(image.src)} alt={t(image.alt, locale)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="space-y-1 p-3 text-xs text-zinc-600">
                      <p>{t(image.alt, locale)}</p>
                      <p>
                        {image.license} · {image.author} ·{" "}
                        <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="underline">
                          Wikimedia Commons
                        </a>
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
            {place.photoReferences?.length ? (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {place.photoReferences.map((photo) => (
                  <a key={photo.url} href={photo.url} target="_blank" rel="noreferrer" className="rounded-md border border-zinc-200 p-3 text-sm">
                    <span className="font-medium">{t(photo.label, locale)}</span>
                    {photo.credit ? <span className="mt-1 block text-xs text-zinc-500">{photo.credit}</span> : null}
                  </a>
                ))}
              </div>
            ) : images.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-600">
                {locale === "es"
                  ? "Pendiente de anadir fotos con licencia o desde fuentes oficiales. Mientras tanto usa Google Maps y la web oficial para confirmar ambiente actual."
                  : "Pending licensed or official photos. For now use Google Maps and the official site to confirm the current vibe."}
              </p>
            ) : null}
          </section>
        </div>

        <aside className="space-y-3">
          <a className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-3 py-3 text-sm text-white" href={buildGoogleMapsPlaceUrl(place)} target="_blank" rel="noreferrer">
            <MapPin size={16} />
            {t(ui.actions.maps, locale)}
          </a>
          <FavoriteButton active={fav.isFavorite(place.id)} onToggle={() => fav.toggle(place.id)} locale={locale} />
          {place.officialUrl ? <ActionLink href={place.officialUrl} label={t(ui.actions.official, locale)} icon="external" /> : null}
          {place.sourceUrl && place.sourceUrl !== place.officialUrl ? <ActionLink href={place.sourceUrl} label={t(ui.actions.source, locale)} icon="external" /> : null}
          {place.ticketUrl ? <ActionLink href={place.ticketUrl} label={t(ui.actions.ticket, locale)} icon="ticket" /> : null}
          {place.reservationUrl ? <ActionLink href={place.reservationUrl} label={t(ui.actions.reserve, locale)} icon="calendar" /> : null}
          <div className="rounded-md border border-zinc-200 bg-white p-3 text-xs text-zinc-600">
            <p>{locale === "es" ? "Ultima verificacion" : "Last verified"}: {place.lastVerifiedAt ?? place.verification.lastVerifiedAt ?? "unknown"}</p>
            <p className="mt-1">{locale === "es" ? "Estado" : "Status"}: {place.verification.status}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function ActionLink({ href, label, icon }: { href: string; label: string; icon: "external" | "ticket" | "calendar" }) {
  const Icon = icon === "ticket" ? Ticket : icon === "calendar" ? CalendarCheck : ExternalLink;
  return (
    <a className="flex items-center justify-center gap-2 rounded-md bg-white px-3 py-3 text-sm ring-1 ring-zinc-200" href={href} target="_blank" rel="noreferrer">
      <Icon size={16} />
      {label}
    </a>
  );
}
