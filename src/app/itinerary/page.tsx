"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { itinerary } from "@/data/itinerary";
import { DayPlan } from "@/components/itinerary/DayPlan";
import { places } from "@/data/places";
import { events } from "@/data/events";

export default function ItineraryPage() {
  const { locale } = useLocale();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{locale === "es" ? "Itinerario" : "Itinerary"}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {itinerary.map((day) => <DayPlan key={day.date} day={day} locale={locale} places={places} events={events} />)}
      </div>
    </section>
  );
}
