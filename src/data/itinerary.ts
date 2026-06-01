import type { ItineraryDay, ItineraryItem } from "@/domain/itinerary";

const verification = {
  status: "needs_verification" as const,
  sourceUrl: "/Users/vmart/Downloads/Guía profunda y verificada para Berlín.pdf",
  lastVerifiedAt: "2026-06-01",
};

const item = (id: string, es: string, en: string, extra: Partial<ItineraryItem> = {}): ItineraryItem => ({
  id,
  title: { es, en },
  verification,
  ...extra,
});

export const itinerary: ItineraryDay[] = [
  {
    date: "2026-06-10",
    label: { es: "Miercoles 10 junio · llegada suave", en: "Wednesday 10 June · soft arrival" },
    blocks: {
      morning: [item("d10-m1", "Llegada, check-in y orientacion Moritzplatz-Oranienstrasse.", "Arrival, check-in and Moritzplatz-Oranienstrasse orientation.", { placeId: "accommodation-nena-moritzplatz", duration: "2-3 h" })],
      lunch: [item("d10-l1", "Comida facil cerca de Kreuzberg; Happa si encaja.", "Easy Kreuzberg lunch; Happa if it fits.", { placeId: "happa", duration: "1-1.5 h" })],
      afternoon: [item("d10-a1", "Berlinische Galerie y paseo por Bethanien/Mariannenplatz si queda energia.", "Berlinische Galerie and Bethanien/Mariannenplatz walk if energy allows.", { placeId: "berlinische-galerie", duration: "2-3 h", flags: ["rain", "tired"] })],
      dinner: [item("d10-d1", "Cena tranquila en Kreuzberg: Markthalle Neun si apetece ambiente, Happa si quereis plant-based.", "Calm Kreuzberg dinner: Markthalle Neun for atmosphere, Happa for plant-based.", { placeId: "markthalle-neun", duration: "1.5-2 h" })],
      evening: [item("d10-e1", "Oranienstrasse, SO36 exterior y vuelta sin forzar.", "Oranienstrasse, SO36 exterior and back without forcing it.", { placeId: "so36", flags: ["tired"] })],
      night: [item("d10-n1", "Solo si hay muchas ganas: AEDEN o Club der Visionaere; mejor dejar la noche grande para viernes/sabado.", "Only if energy is high: AEDEN or Club der Visionaere; better save the big night for Friday/Saturday.", { placeId: "club-der-visionaere", flags: ["booking"] })],
      alternatives: [item("d10-x1", "Si llueve o estais cansados: Berlinische Galerie largo, cafe y descanso real.", "If it rains or you are tired: longer Berlinische Galerie, coffee and real rest.", { flags: ["rain", "tired", "low_budget"] })],
    },
  },
  {
    date: "2026-06-11",
    label: { es: "Jueves 11 junio · historia y patios", en: "Thursday 11 June · history and courtyards" },
    blocks: {
      morning: [item("d11-m1", "Topography of Terror.", "Topography of Terror.", { placeId: "topography-of-terror", duration: "1.5-2 h", flags: ["rain", "low_budget"] })],
      lunch: [item("d11-l1", "Comida por Potsdamer/Mitte o vuelta hacia Kreuzberg.", "Lunch around Potsdamer/Mitte or back toward Kreuzberg.", { duration: "1-1.5 h" })],
      afternoon: [item("d11-a1", "Reichstag/Brandenburger Tor exterior y patios de Mitte: Hackesche Hofe, Haus Schwarzenberg y KW si encaja.", "Reichstag/Brandenburger Tor exterior and Mitte courtyards: Hackesche Hofe, Haus Schwarzenberg and KW if it fits.", { placeId: "haus-schwarzenberg", duration: "3-4 h" })],
      dinner: [item("d11-d1", "Cookies Cream si quereis cena especial; si no, algo casual.", "Cookies Cream for a special dinner; otherwise keep it casual.", { placeId: "cookies-cream", flags: ["booking"] })],
      evening: [item("d11-e1", "Katergarten o descanso antes del viernes.", "Katergarten or rest before Friday.", { placeId: "kater-blau" })],
      night: [item("d11-n1", "No forzar noche: viernes y sabado son mejores.", "Do not force the night: Friday and Saturday are stronger.", { flags: ["tired"] })],
      alternatives: [item("d11-x1", "Con lluvia: alargar museo o ir a Hamburger Bahnhof.", "With rain: extend museum time or go to Hamburger Bahnhof.", { placeId: "hamburger-bahnhof", flags: ["rain"] })],
    },
  },
  {
    date: "2026-06-12",
    label: { es: "Viernes 12 junio · canal y primera gran noche", en: "Friday 12 June · canal and first big night" },
    blocks: {
      morning: [item("d12-m1", "Mercado de Maybachufer sin prisa: canal, puestos y cafe.", "Maybachufer market without rushing: canal, stalls and coffee.", { placeId: "maybachufer-market", duration: "2-3 h", flags: ["low_budget"] })],
      lunch: [item("d12-l1", "Comida de mercado o brunch tardio en Neukolln.", "Market lunch or late Neukolln brunch.", { placeId: "brammibals-maybachufer" })],
      afternoon: [item("d12-a1", "Tempelhofer Feld con agua y longboard/skate; entrar con tiempo para cruzar pistas.", "Tempelhofer Feld with water and longboard/skate; enter with enough time to cross the runways.", { placeId: "tempelhofer-feld", duration: "2.5-4 h", flags: ["rain"] })],
      dinner: [item("d12-d1", "Alaska Bar o La Stella Nera.", "Alaska Bar or La Stella Nera.", { placeId: "alaska-bar" })],
      evening: [item("d12-e1", "Si no quereis club duro: Club der Visionaere junto al canal.", "If you do not want a hard club: Club der Visionaere by the canal.", { placeId: "club-der-visionaere", flags: ["tired"] })],
      night: [item("d12-n1", "Opciones reales: Sisyphos si quereis experiencia larga, Tresor si quereis techno duro, descanso si no.", "Real options: Sisyphos for the long experience, Tresor for hard techno, rest otherwise.", { eventId: "sisyphos-weekend-2026-06-12", flags: ["booking"] })],
      alternatives: [item("d12-x1", "Si llueve: Hamburger Bahnhof/Gropius Bau y cena Neukolln.", "If it rains: Hamburger Bahnhof/Gropius Bau and Neukolln dinner.", { placeId: "hamburger-bahnhof", flags: ["rain", "tired", "low_budget"] })],
    },
  },
  {
    date: "2026-06-13",
    label: { es: "Sabado 13 junio · Friedrichshain y mejor noche", en: "Saturday 13 June · Friedrichshain and best night" },
    blocks: {
      morning: [item("d13-m1", "Hackesche Hofe, Haus Schwarzenberg y cafes de Mitte.", "Hackesche Hofe, Haus Schwarzenberg and Mitte cafes.", { placeId: "haus-schwarzenberg" })],
      lunch: [item("d13-l1", "Mitte o traslado a Friedrichshain.", "Mitte or transfer to Friedrichshain." )],
      afternoon: [item("d13-a1", "Friedrichshain alternativo: Boxhagener Platz, RAW-Gelaende y Urban Spree.", "Alternative Friedrichshain: Boxhagener Platz, RAW-Gelaende and Urban Spree.", { placeId: "raw-gelaende", duration: "3-4 h" })],
      dinner: [item("d13-d1", "1990 Vegan Living, Secret Garden o Voner para no complicar antes de club.", "1990 Vegan Living, Secret Garden or Voner to keep it easy before clubbing.", { placeId: "1990-vegan-living" })],
      evening: [item("d13-e1", "Pre-club por RAW/Urban Spree o traslado directo a Else.", "Pre-club around RAW/Urban Spree or direct transfer to Else.", { placeId: "urban-spree" })],
      night: [item("d13-n1", "Else x Mano Le Tough primera opcion; about blank/Kater/AEDEN si el cartel o energia encaja mejor.", "Else x Mano Le Tough as first choice; about blank/Kater/AEDEN if line-up or energy fits better.", { eventId: "else-mano-le-tough-maeve-2026-06-13", flags: ["booking", "cash_card"] })],
      alternatives: [item("d13-x1", "Si quereis algo mas solar: Toy Tonics en AEDEN; si quereis mas escena, revisar about blank.", "For a sunnier option: Toy Tonics at AEDEN; for a more scene-rooted option, check about blank.", { eventId: "toy-tonics-aeden-2026-06-13" })],
    },
  },
  {
    date: "2026-06-14",
    label: { es: "Domingo 14 junio · Neukolln y flowmarkt", en: "Sunday 14 June · Neukolln and flow market" },
    blocks: {
      morning: [item("d14-m1", "Mauerpark temprano sobre las 10: flohmarkt antes de que se llene.", "Mauerpark early around 10: flea market before it gets packed.", { placeId: "mauerpark", duration: "2-3 h", flags: ["low_budget"] })],
      lunch: [item("d14-l1", "Comida de mercado o traslado a Cafe Vux/Neukolln si preferis brunch vegano.", "Market food or transfer to Cafe Vux/Neukolln if you prefer vegan brunch.", { placeId: "cafe-vux", duration: "1-1.5 h" })],
      afternoon: [item("d14-a1", "Bearpit Karaoke en Mauerpark si no llueve; alternativa Nowkoelln Flowmarkt y canal.", "Bearpit Karaoke at Mauerpark if it does not rain; alternative Nowkoelln Flowmarkt and canal.", { placeId: "mauerpark" })],
      dinner: [item("d14-d1", "La Stella Nera o algo ligero en Neukolln.", "La Stella Nera or something light in Neukolln.", { placeId: "la-stella-nera" })],
      evening: [item("d14-e1", "YAAM al atardecer: chill, rio, musica y no forzar club.", "YAAM at sunset: chill, river, music and no need to force a club.", { placeId: "yaam" })],
      night: [item("d14-n1", "Dyketopia Open Air en OXI si queda energia; si no, YAAM como cierre suave.", "Dyketopia Open Air at OXI if energy remains; otherwise YAAM as a soft landing.", { eventId: "oxi-dyketopia-2026-06-14" })],
      alternatives: [item("d14-x1", "Si llueve: Hamburger Bahnhof/Gropius Bau o cafe largo; no conteis con karaoke.", "If it rains: Hamburger Bahnhof/Gropius Bau or long coffee; do not count on karaoke.", { placeId: "gropius-bau", flags: ["rain"] })],
    },
  },
  {
    date: "2026-06-15",
    label: { es: "Lunes 15 junio · street art y Teufelsberg", en: "Monday 15 June · street art and Teufelsberg" },
    blocks: {
      morning: [item("d15-m1", "URBAN NATION y eje mural de Bulowstrasse; si hace sol, sumar Victory Column.", "URBAN NATION and Bulowstrasse mural corridor; if sunny, add Victory Column.", { placeId: "urban-nation", duration: "2-3 h", flags: ["rain", "low_budget"] })],
      lunch: [item("d15-l1", "Schoneberg o camino a Charlottenburg.", "Schoneberg or transfer toward Charlottenburg." )],
      afternoon: [item("d15-a1", "Teufelsberg para fotografia, vistas y street art; revisar si hay evento/fiesta antes de salir.", "Teufelsberg for photography, views and street art; check events/party before leaving.", { placeId: "teufelsberg", duration: "3-4 h", flags: ["booking"] })],
      dinner: [item("d15-d1", "Lucky Leek o Bonvivant si quereis otra cena especial.", "Lucky Leek or Bonvivant for another special dinner.", { placeId: "lucky-leek", flags: ["booking"] })],
      evening: [item("d15-e1", "Paseo tranquilo o bar.", "Quiet walk or bar." )],
      night: [item("d15-n1", "Noche baja: proteger energia para salida.", "Low night: protect energy before departure.", { flags: ["tired"] })],
      alternatives: [item("d15-x1", "Si llueve: Neue Nationalgalerie o Gropius Bau segun exposiciones.", "If it rains: Neue Nationalgalerie or Gropius Bau depending on exhibitions.", { flags: ["rain"] })],
    },
  },
  {
    date: "2026-06-16",
    label: { es: "Martes 16 junio · cierre y BER", en: "Tuesday 16 June · wrap-up and BER" },
    blocks: {
      morning: [item("d16-m1", "Maybachufer si no lo hicisteis antes.", "Maybachufer if you did not do it before.", { placeId: "maybachufer-market", duration: "1.5-2.5 h" })],
      lunch: [item("d16-l1", "Despedida ligera cerca del alojamiento.", "Light farewell near the apartment.", { placeId: "accommodation-nena-moritzplatz" })],
      afternoon: [item("d16-a1", "Recogida y salida hacia BER: recordad billete ABC.", "Pack up and leave for BER: remember ABC ticket.", { externalUrl: "https://ber.berlin-airport.de/en/orientation/getting-here/public-transport.html", flags: ["cash_card"] })],
      dinner: [],
      evening: [],
      night: [],
      alternatives: [item("d16-x1", "Si vais cargados o justos, taxi sin culpa.", "If luggage or timing is tight, take a taxi without overthinking it.", { flags: ["tired"] })],
    },
  },
];
