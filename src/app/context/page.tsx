"use client";

import Link from "next/link";
import { BookOpen, Film, Newspaper, Sparkles } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { contextCards, mediaRecommendations } from "@/data/contextGuide";
import { t } from "@/lib/i18n";

const kindLabel = {
  book: { es: "Libro", en: "Book" },
  film: { es: "Pelicula", en: "Film" },
  documentary: { es: "Documental", en: "Documentary" },
  press: { es: "Prensa", en: "Press" },
} as const;

function KindIcon({ kind }: { kind: keyof typeof kindLabel }) {
  if (kind === "book") return <BookOpen size={16} />;
  if (kind === "press") return <Newspaper size={16} />;
  return <Film size={16} />;
}

export default function ContextPage() {
  const { locale } = useLocale();
  const isEs = locale === "es";

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-800">{isEs ? "Leer Berlin" : "Reading Berlin"}</p>
        <h1 className="mt-2 text-3xl font-semibold">{isEs ? "Historia, politica y cultura para no ir a ciegas" : "History, politics and culture so the city makes sense"}</h1>
        <p className="mt-3 max-w-3xl text-zinc-700">
          {isEs
            ? "Una capa corta y util: que significa lo que vais a ver, que tensiones estan vivas ahora y que leer o ver si quereis llegar con mas contexto. No es enciclopedia; es mapa mental."
            : "A short practical layer: what the things you will see mean, which tensions are alive now, and what to read or watch if you want more context. Not an encyclopedia; a mental map."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {contextCards.map((card) => (
          <article key={card.id} className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t(card.eyebrow, locale)}</p>
            <h2 className="mt-2 text-xl font-semibold">{t(card.title, locale)}</h2>
            <p className="mt-3 text-sm text-zinc-700">{t(card.body, locale)}</p>
            <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
              <p className="flex items-center gap-2 font-semibold text-zinc-950"><Sparkles size={16} /> {isEs ? "Por que importa en ruta" : "Why it matters on the route"}</p>
              <p className="mt-1">{t(card.whyItMatters, locale)}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.links.map((link) => (
                <a key={link.url} className="rounded-md bg-emerald-900 px-3 py-2 text-xs text-white" href={link.url} target="_blank" rel="noreferrer">
                  {t(link.label, locale)}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{isEs ? "Antes o durante" : "Before or during"}</p>
            <h2 className="text-2xl font-semibold">{isEs ? "Libros, pelis, documentales y prensa" : "Books, films, documentaries and press"}</h2>
          </div>
          <Link className="hidden rounded-md bg-zinc-900 px-3 py-2 text-sm text-white md:inline-flex" href="/safety/">
            {isEs ? "Ver seguridad" : "Safety"}
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {mediaRecommendations.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-300">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500"><KindIcon kind={item.kind} /> {t(kindLabel[item.kind], locale)} · {item.language}</p>
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.creator}</p>
              <p className="mt-3 text-sm text-zinc-700">{t(item.note, locale)}</p>
              <p className="mt-3 rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-700">{isEs ? "Mejor para" : "Best for"}: {t(item.bestFor, locale)}</p>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
