"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export default function PracticalPage() {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const sections = [
    {
      title: isEs ? "Antes de salir" : "Before going out",
      items: isEs
        ? ["Revisar horarios oficiales del plan del día.", "Guardar ruta Google Maps y área offline.", "Comprobar si hay reserva o ticket.", "Llevar batería externa."]
        : ["Check official opening times for the day.", "Save Google Maps route and offline area.", "Check whether booking or ticket is needed.", "Carry a power bank."],
    },
    {
      title: isEs ? "Dinero y entrada" : "Money and entry",
      items: isEs
        ? ["Llevar tarjeta y algo de efectivo.", "En Else/Renate asumid cashless.", "En mercados, efectivo puede seguir siendo util.", "Para clubs: documento, paciencia y plan B."]
        : ["Carry card and some cash.", "Assume Else/Renate are cashless.", "Cash can still help at markets.", "For clubs: ID, patience and plan B."],
    },
    {
      title: isEs ? "BER y transporte" : "BER and transport",
      items: isEs
        ? ["BER requiere zona C: billete ABC.", "Usar BVG/VBB justo antes de salir.", "Taxi si vais muy cargados o justos de tiempo.", "Validar billetes en papel cuando aplique."]
        : ["BER requires zone C: ABC ticket.", "Use BVG/VBB right before leaving.", "Taxi if luggage or timing is tight.", "Validate paper tickets when relevant."],
    },
  ];

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">{isEs ? "Info practica" : "Practical info"}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="rounded-md border bg-white p-4">
            <h2 className="font-semibold">{section.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {section.items.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
