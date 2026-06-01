import type { ItineraryDay } from "@/domain/itinerary";
import type { Locale } from "@/domain/common";
import { t } from "@/lib/i18n";

export function DayPlan({ day, locale }: { day: ItineraryDay; locale: Locale }) {
  return (
    <article className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
      <h3 className="font-semibold">{t(day.label, locale)} · {day.date}</h3>
      {Object.entries(day.blocks).map(([name, items]) => (
        <div key={name} className="space-y-1">
          <h4 className="text-sm font-medium capitalize text-zinc-700">{name}</h4>
          {items.map((item) => <p key={item.id} className="text-sm text-zinc-600">• {t(item.title, locale)}</p>)}
        </div>
      ))}
    </article>
  );
}
