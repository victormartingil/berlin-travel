import type { LocalizedText } from "@/domain/common";
import type { Place } from "@/domain/place";
import { t } from "@/lib/i18n";

const categoryContext: Record<Place["category"], LocalizedText> = {
  accommodation: { es: "Base logistica del viaje: conviene usarla como origen de rutas y punto de descanso.", en: "Trip logistics base: use it as route origin and recovery point." },
  vegetarian: { es: "Opcion veg-friendly seleccionada por encaje real con barrios y momentos del itinerario.", en: "Veg-friendly option selected for its fit with real itinerary areas and moments." },
  restaurant: { es: "Restaurante seleccionado por contexto: comida especial, lluvia, zona de museos o plan de noche.", en: "Restaurant selected by context: special meal, rain, museum area or night plan." },
  cafe: { es: "Parada util para bajar ritmo, desayunar o recalibrar el dia sin forzar la ruta.", en: "Useful stop to slow down, have breakfast or recalibrate the day." },
  bakery: { es: "Parada rapida para desayuno, cafe o comida ligera mientras os moveis entre zonas.", en: "Quick stop for breakfast, coffee or a light bite while moving between areas." },
  supermarket: { es: "Recurso practico para agua, snacks, picnic y margen de presupuesto.", en: "Practical resource for water, snacks, picnic food and budget control." },
  museum: { es: "Plan de interior prioritario, especialmente util con lluvia o cansancio.", en: "Priority indoor plan, especially useful with rain or low energy." },
  gallery: { es: "Arte contemporaneo con buen encaje para el enfoque alternativo del viaje.", en: "Contemporary art with a strong fit for the trip's alternative focus." },
  street_art: { es: "Capa visual de Berlin para pasear sin convertir el dia en turismo generico.", en: "A visual Berlin layer for walking without turning the day into generic tourism." },
  alternative: { es: "Lugar de escena local, cultura independiente o urbanismo berlinés no monumental.", en: "Local-scene, independent culture or non-monumental urban Berlin stop." },
  nightlife: { es: "Referencia de noche a revisar por energia, horarios y entradas antes de decidir.", en: "Night reference to check against energy, timing and tickets before committing." },
  park: { es: "Espacio abierto para respirar, picnic, descanso o plan low budget.", en: "Open space for breathing room, picnic, rest or low-budget time." },
  transport: { es: "Nodo practico para conectar la ruta sin improvisar bajo presion.", en: "Practical node for connecting the route without improvising under pressure." },
  history: { es: "Contexto historico esencial para entender Berlin sin quedarse solo en lo estetico.", en: "Essential historical context for understanding Berlin beyond aesthetics." },
  market: { es: "Mercado o zona de paseo para comer, observar barrio y ajustar presupuesto.", en: "Market or walking area for food, neighborhood texture and budget control." },
  club: { es: "Plan nocturno seleccionado por encaje musical, zona y energia esperada del viaje.", en: "Night plan selected for musical fit, area and expected trip energy." },
};

const priceContext = {
  low: { es: "Presupuesto bajo relativo para Berlin; buena opcion si el dia ya suma gasto.", en: "Relatively low budget for Berlin; useful when the day already has paid plans." },
  mid: { es: "Presupuesto medio: encaja si el lugar aporta comodidad, ubicacion o experiencia.", en: "Mid budget: works when the place adds convenience, location or experience." },
  high: { es: "Presupuesto alto: reservarlo para una decision consciente, no por inercia.", en: "High budget: use it as a conscious decision, not by inertia." },
} as const;

const hoursFallback: Record<Place["category"], LocalizedText> = {
  accommodation: { es: "Horario operativo de alojamiento/check-in: confirmar en la reserva.", en: "Accommodation/check-in timing: confirm in the booking." },
  vegetarian: { es: "Franja recomendada: comida o cena; confirmar el mismo dia porque los locales veg pequenos cambian horarios.", en: "Recommended slot: lunch or dinner; confirm same-day because small veg places can change hours." },
  restaurant: { es: "Franja recomendada: cena o comida especial; reservar si el plan depende de este sitio.", en: "Recommended slot: dinner or special meal; book if the plan depends on this place." },
  cafe: { es: "Franja recomendada: manana o tarde temprana; usar como pausa de ruta, no como plan rigido.", en: "Recommended slot: morning or early afternoon; use as a route pause, not as a rigid plan." },
  bakery: { es: "Franja recomendada: manana o parada rapida; mejor ir temprano si buscais variedad.", en: "Recommended slot: morning or quick stop; go early for the best selection." },
  supermarket: { es: "Horario comercial variable: comprobar antes si es tarde o domingo.", en: "Variable retail hours: check first if it is late or Sunday." },
  museum: { es: "Plan de interior: revisar exposicion actual y compra de entrada antes de mover la ruta.", en: "Indoor plan: check current exhibition and ticketing before moving the route." },
  gallery: { es: "Horario de exposicion variable: confirmar programa actual antes de ir.", en: "Variable exhibition hours: confirm current program before going." },
  street_art: { es: "Horario/entrada variable: confirmar condiciones actuales antes del desplazamiento.", en: "Variable hours/access: confirm current conditions before the transfer." },
  alternative: { es: "Espacio de programa variable: confirmar calendario si vais por un evento concreto.", en: "Variable-program space: confirm the calendar if going for a specific event." },
  nightlife: { es: "Programa nocturno variable: comprobar evento, puerta y entradas el mismo dia.", en: "Variable nightlife program: check event, door policy and tickets same-day." },
  park: { es: "Espacio abierto con horarios estacionales: confirmar si vais al amanecer o tarde.", en: "Open space with seasonal hours: confirm if going early or late." },
  transport: { es: "Nodo de transporte: comprobar servicio en BVG/VBB antes de trayectos criticos.", en: "Transport node: check BVG/VBB before critical transfers." },
  history: { es: "Plan historico: separar exterior libre de centros de visitantes o exposiciones interiores.", en: "History plan: separate free outdoor areas from visitor centres or indoor exhibitions." },
  market: { es: "Mercado con calendario variable: confirmar dia y franja antes de mover la ruta.", en: "Market with variable calendar: confirm date and time before moving the route." },
  club: { es: "Programa y puerta variables: comprobar line-up, preventa y cash/card el mismo dia.", en: "Variable program and door: check line-up, presale and cash/card same-day." },
};

export function buildPlaceDetailSections(place: Place, locale: "es" | "en") {
  const why = [
    place.story ? t(place.story, locale) : t(place.description, locale),
    t(categoryContext[place.category], locale),
    ...((place.whyGo ?? []).map((note) => t(note, locale))),
  ];

  const practical = [
    place.openingHours ? t(place.openingHours, locale) : t(hoursFallback[place.category], locale),
    place.estimatedDuration ? `${locale === "es" ? "Duracion estimada" : "Estimated duration"}: ${place.estimatedDuration}` : null,
    t(priceContext[place.priceLevel], locale),
    place.bookingRecommended ? (locale === "es" ? "Reserva recomendada si es comida/cena o evento clave." : "Booking recommended for meals, dinners or key events.") : null,
    place.cashless ? (locale === "es" ? "Preparar tarjeta: indicado como cashless/card-friendly." : "Prepare card: marked as cashless/card-friendly.") : null,
    ...(place.practicalNotes ?? []).map((note) => t(note, locale)),
  ].filter(Boolean) as string[];

  const signals = [
    ...(place.localSignals ?? []).map((note) => t(note, locale)),
    place.rainyDay ? (locale === "es" ? "Buen comodin con lluvia." : "Good rainy-day backup.") : null,
    place.quickStop ? (locale === "es" ? "Sirve para resolver rapido sin romper ruta." : "Useful for a quick stop without breaking the route.") : null,
    place.destinationWorthy ? (locale === "es" ? "Puede justificar desvio si encaja con energia y horarios." : "Can justify a detour if energy and opening times fit.") : null,
  ].filter(Boolean) as string[];

  return { why, practical, signals };
}
