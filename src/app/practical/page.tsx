"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function PracticalPage() {
  const { locale } = useLocale();
  const items = locale === "es"
    ? ["Comprobar reservas", "Guardar mapas offline", "Llevar batería externa", "Revisar horarios de museos"]
    : ["Check reservations", "Save offline maps", "Carry power bank", "Review museum opening times"];
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{locale === "es" ? "Info práctica" : "Practical info"}</h1>
      <ul className="space-y-2 rounded-xl border bg-white p-4">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </section>
  );
}
