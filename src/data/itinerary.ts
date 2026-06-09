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
    label: { es: "Miércoles 10 junio · aterrizar en Kreuzberg", en: "Wednesday 10 June · landing in Kreuzberg" },
    blocks: {
      morning: [
        item("d10-m1", "Llegad sin prisa, dejad maletas y ubicad la base en Moritzplatz. La primera victoria del día es entender Oranienstrasse, el canal y las distancias reales.", "Arrive without rushing, drop the bags and get your bearings around Moritzplatz. The first win of the day is understanding Oranienstrasse, the canal and the real walking distances.", { placeId: "accommodation-nena-moritzplatz", duration: "2-3 h" }),
      ],
      lunch: [
        item("d10-l1", "Comed algo fácil por Kreuzberg solo para arrancar; no convirtamos la llegada en una reserva difícil.", "Eat something easy in Kreuzberg just to get started; arrival day should not depend on a difficult booking.", { placeId: "happa", duration: "1 h" }),
      ],
      afternoon: [
        item("d10-a1", "Primer bloque cultural: Berlinische Galerie. Es manejable, buena con lluvia y os mete en arte berlinés sin quemaros el primer día.", "First cultural block: Berlinische Galerie. It is manageable, rain-safe and gets you into Berlin art without exhausting the first day.", { placeId: "berlinische-galerie", duration: "2 h", flags: ["rain", "tired"] }),
        item("d10-a2", "Si queda energía, id andando a Bethanien y Mariannenplatz. Es mejor introducción al Kreuzberg alternativo que buscar monumentos con jet lag.", "If there is energy left, walk to Bethanien and Mariannenplatz. It is a better intro to alternative Kreuzberg than chasing monuments with travel fatigue.", { placeId: "bethanien", duration: "45-90 min", routeFromPlaceId: "berlinische-galerie" }),
      ],
      dinner: [
        item("d10-d1", "Cena flexible cerca: Markthalle Neun por ambiente o Happa si queréis algo vegetal y tranquilo.", "Flexible dinner nearby: Markthalle Neun for atmosphere or Happa for a calm plant-based meal.", { placeId: "markthalle-neun", duration: "1-1.5 h" }),
      ],
      evening: [
        item("d10-e1", "Paseo corto por Oranienstrasse y SO36 por fuera. Si os gusta el pulso del barrio, tomad algo; si no, retirada digna.", "Short walk along Oranienstrasse and past SO36. If you like the neighbourhood pulse, stop for a drink; otherwise call it early.", { placeId: "so36", flags: ["tired"] }),
        item("d10-e2", "Primera copa fácil: Möbel Olfe si queréis Kneipe queer con carácter; Südblock si preferís terraza y algo menos cerrado.", "Easy first drink: Moebel Olfe if you want a queer Kneipe with character; Sudblock if you prefer terrace space and a less enclosed bar.", { placeId: "moebel-olfe", flags: ["tired"] }),
      ],
      night: [
        item("d10-n1", "No fuerzo una noche grande aquí. Usad Club der Visionaere solo si el cuerpo pide canal, música suave y poco compromiso.", "I would not force a big night here. Use Club der Visionaere only if the body asks for canal-side music and low commitment.", { placeId: "club-der-visionaere", flags: ["tired"] }),
      ],
      alternatives: [
        item("d10-x1", "Si el viaje llega torcido: Berlinische Galerie largo, compra básica, ducha y dormir. Ganar energía hoy mejora viernes y sábado.", "If travel goes sideways: longer Berlinische Galerie, basic groceries, shower and sleep. Saving energy today improves Friday and Saturday.", { flags: ["rain", "tired"] }),
        item("d10-x2", "Si os sobra una hora cerca de Moritzplatz, Prinzessinnengarten es un paso rápido amable: jardín comunitario, pausa verde y cero épica de llegada.", "If you have a spare hour near Moritzplatz, Prinzessinnengarten is a gentle quick stop: community garden, green pause and zero arrival-day heroics.", { placeId: "prinzessinnengarten-kreuzberg", duration: "30-60 min", flags: ["tired"] }),
        item("d10-x3", "Si llegáis con hambre real y cero ganas de mesa: Nefis, Sahara o Maroush resuelven Kreuzberg rápido; elegid uno por cercanía y antojo.", "If you arrive properly hungry with no appetite for a table: Nefis, Sahara or Maroush solve Kreuzberg quickly; choose one by proximity and craving.", { placeId: "nefis-gemuesekebab-kreuzberg", duration: "20-45 min", flags: ["low_budget", "tired"] }),
      ],
    },
  },
  {
    date: "2026-06-11",
    label: { es: "Jueves 11 junio · memoria, poder y patios escondidos", en: "Thursday 11 June · memory, power and hidden courtyards" },
    blocks: {
      morning: [
        item("d11-m1", "Topography of Terror primero, con cabeza despejada. Es duro, gratuito y necesario para entender la ciudad sin convertirla en decorado.", "Topography of Terror first, with a clear head. It is heavy, free and necessary to understand the city beyond scenery.", { placeId: "topography-of-terror", duration: "1.5-2 h", flags: ["rain", "low_budget"] }),
      ],
      lunch: [
        item("d11-l1", "Pausa sin ceremonia entre Potsdamer Platz y Mitte. La prioridad del día son los lugares, no perseguir un restaurante.", "Simple pause between Potsdamer Platz and Mitte. The priority today is the places, not chasing a restaurant.", { duration: "1 h" }),
      ],
      afternoon: [
        item("d11-a1", "Eje clásico visto con calma: Holocaust Memorial, Brandenburger Tor y Reichstag por fuera. Es memoria y poder en 60-90 minutos, no una checklist monumental.", "Classic axis, done calmly: Holocaust Memorial, Brandenburg Gate and the Reichstag from outside. It is memory and power in 60-90 minutes, not a monumental checklist.", { placeId: "holocaust-memorial", duration: "1-1.5 h", routeFromPlaceId: "topography-of-terror" }),
        item("d11-a2", "Luego cambiad de escala: Hackesche Hofe y Haus Schwarzenberg / Dead Chicken Alley. Aquí Berlín se vuelve patio, cartel, mural, tienda rara y capa histórica.", "Then change scale: Hackesche Hofe and Haus Schwarzenberg / Dead Chicken Alley. Here Berlin becomes courtyard, poster, mural, odd shop and historical layer.", { placeId: "haus-schwarzenberg", duration: "2-3 h", routeFromPlaceId: "holocaust-memorial" }),
        item("d11-a3", "Si os queda curiosidad, ACUD Macht Neu es un radar bueno para ver si esa noche hay algo experimental cerca.", "If curiosity remains, ACUD Macht Neu is a good radar to check whether there is something experimental nearby that night.", { placeId: "acud-macht-neu", duration: "30-60 min" }),
      ],
      dinner: [
        item("d11-d1", "Cookies Cream solo si os apetece una cena especial y con reserva; si no, mantened la noche ligera.", "Cookies Cream only if you want a special dinner and have a booking; otherwise keep the evening light.", { placeId: "cookies-cream", flags: ["booking"] }),
      ],
      evening: [
        item("d11-e1", "Plan bajo: Katergarten o paseo junto al Spree. Jueves debería cerrar el día, no robarle energía al viernes.", "Low-pressure plan: Katergarten or a Spree-side walk. Thursday should close the day, not steal energy from Friday.", { placeId: "kater-blau" }),
      ],
      night: [
        item("d11-n1", "Si aparece un cartel irresistible en ACUD/SO36, adelante; si no, dormid. Es una decisión inteligente, no aburrida.", "If an irresistible ACUD/SO36 listing appears, go for it; otherwise sleep. That is a smart choice, not a boring one.", { flags: ["tired"] }),
      ],
      alternatives: [
        item("d11-x1", "Con lluvia fuerte: Topography + Hamburger Bahnhof. Menos calle, más contenido, y el día sigue teniendo sentido.", "With heavy rain: Topography + Hamburger Bahnhof. Less street time, more substance, and the day still makes sense.", { placeId: "hamburger-bahnhof", flags: ["rain"] }),
        item("d11-x2", "Si os apetece un clásico más o llueve justo al llegar a Mitte: Museum Island / Pergamon Panorama sustituye parte de los patios, no se suma a todo.", "If you want one more classic or rain hits as you reach Mitte: Museum Island / Pergamon Panorama replaces part of the courtyards, it does not get added on top.", { placeId: "museum-island-pergamon-panorama", duration: "2-3 h", flags: ["rain"] }),
        item("d11-x3", "Si preferís noche cultural a bar: mirad Gorki/Studio Я por función concreta; Berliner Ensemble queda como opción más clásica.", "If you prefer a cultural night over a bar: check Gorki/Studio Я for a specific performance; Berliner Ensemble is the more classic option.", { placeId: "maxim-gorki-studio-ya", duration: "1.5-3 h", flags: ["rain", "booking"] }),
      ],
    },
  },
  {
    date: "2026-06-12",
    label: { es: "Viernes 12 junio · canal, Tempelhof y noche elegida", en: "Friday 12 June · canal, Tempelhof and a chosen night" },
    blocks: {
      morning: [
        item("d12-m1", "Maybachufer sin prisa: mercado, canal, ruido de barrio y compra pequeña si os apetece picnic.", "Maybachufer without rushing: market, canal, neighbourhood noise and a small picnic shop if it feels right.", { placeId: "maybachufer-market", duration: "2-3 h", flags: ["low_budget"] }),
      ],
      lunch: [
        item("d12-l1", "Comed alrededor del canal o guardad hambre para Neukolln. La comida aquí acompaña el paseo, no manda el día.", "Eat around the canal or save appetite for Neukolln. Food supports the walk here; it does not drive the day.", { placeId: "brammibals-maybachufer" }),
      ],
      afternoon: [
        item("d12-a1", "Tempelhofer Feld es el plan grande: agua, algo para picar y, si podéis, skate/longboard. Id a sentir la escala de las pistas, no solo a hacer una foto.", "Tempelhofer Feld is the main plan: water, snacks and, if possible, a skate/longboard. Go to feel the scale of the runways, not just to take a photo.", { placeId: "tempelhofer-feld", duration: "2.5-4 h" }),
      ],
      dinner: [
        item("d12-d1", "Cena en Neukolln/Kreuzberg según donde acabéis: Alaska Bar si queréis tapeo vegano, La Stella Nera si os pide pizza y mesa.", "Dinner in Neukolln/Kreuzberg depending on where you land: Alaska Bar for vegan tapas, La Stella Nera if you want pizza and a table.", { placeId: "alaska-bar" }),
      ],
      evening: [
        item("d12-e1", "Si la tarde fue intensa, Club der Visionaere gana: canal, madera, música y salida fácil.", "If the afternoon was intense, Club der Visionaere wins: canal, wooden deck, music and an easy exit.", { placeId: "club-der-visionaere", flags: ["tired"] }),
        item("d12-e2", "Si os mueve el directo, Badehaus tiene Headsend a las 19:00 dentro de RAW.", "If live music is calling, Badehaus has Headsend at 19:00 inside RAW.", { eventId: "headsends-badehaus-2026-06-12" }),
      ],
      night: [
        item("d12-n1", "Elegid una sola noche, no tres: VIBEZ! en Badehaus para baile cálido; Deep & Dirty en VOID para bass duro; descanso si el cuerpo lo pide.", "Choose one night, not three: VIBEZ! at Badehaus for warm dancing; Deep & Dirty at VOID for heavy bass; rest if the body asks for it.", { eventId: "vibez-badehaus-2026-06-12" }),
        item("d12-n2", "Deep & Dirty es el comodín bass de verdad: 23:00-05:00, dos salas y precio 10-20 EUR.", "Deep & Dirty is the real bass option: 23:00-05:00, two floors and 10-20 EUR.", { eventId: "deep-dirty-void-2026-06-12" }),
      ],
      alternatives: [
        item("d12-x1", "Si llueve o Tempelhof no apetece: Hamburger Bahnhof o Gropius Bau, y noche más corta. No pasa nada por cambiar el viernes.", "If it rains or Tempelhof does not appeal: Hamburger Bahnhof or Gropius Bau, and a shorter night. It is fine to change Friday.", { placeId: "hamburger-bahnhof", flags: ["rain", "tired"] }),
        item("d12-x2", "Si hace calor y Tempelhof se vuelve demasiado expuesto: Hasenheide da sombra, descanso y plan Neukölln sin cambiar de eje.", "If it is hot and Tempelhof feels too exposed: Hasenheide gives shade, rest and a Neukolln plan without changing axis.", { placeId: "hasenheide", duration: "45-120 min", flags: ["tired"] }),
        item("d12-x3", "Cena rápida amiga: Sahara gana por falafel con salsa de cacahuete; Buya Ramen gana si llueve y queréis mesa caliente.", "Friend-tip quick dinner: Sahara wins for falafel with peanut sauce; Buya Ramen wins if it rains and you want a hot table.", { placeId: "sahara-imbiss-kreuzberg", duration: "30-60 min", flags: ["low_budget", "rain"] }),
      ],
    },
  },
  {
    date: "2026-06-13",
    label: { es: "Sábado 13 junio · muro, Spree, RAW y la noche fuerte", en: "Saturday 13 June · Wall, Spree, RAW and the main night" },
    blocks: {
      morning: [
        item("d13-m1", "Empezad el sábado sin volver a cargar Mitte: East Side Gallery y Oberbaumbrücke como paseo de muro, río y transición hacia Friedrichshain.", "Start Saturday without loading Mitte again: East Side Gallery and Oberbaumbrücke as a Wall, river and transition walk toward Friedrichshain.", { placeId: "east-side-gallery", duration: "1-1.5 h" }),
      ],
      lunch: [
        item("d13-l1", "Holzmarkt 25 funciona como pausa Spree: comida, bebida o simplemente mirar el ambiente. Si no os encaja, seguid directos a RAW.", "Holzmarkt 25 works as a Spree pause: food, drink or simply reading the mood. If it does not fit, continue straight to RAW.", { placeId: "holzmarkt-25", duration: "45-90 min", routeFromPlaceId: "east-side-gallery" }),
      ],
      afternoon: [
        item("d13-a1", "Friedrichshain alternativo: RAW-Gelaende como bloque fuerte. Paseadlo con criterio, no intentéis exprimir cada local.", "Alternative Friedrichshain: RAW-Gelaende as the strong block. Walk it selectively, do not try to exhaust every venue.", { placeId: "raw-gelaende", duration: "1.5-2 h", routeFromPlaceId: "holzmarkt-25" }),
        item("d13-a2", "Urban Spree es el paso natural dentro de RAW: galería, murales, beer garden o concierto si el programa encaja, sin convertirlo en otra obligación larga.", "Urban Spree is the natural pass inside RAW: gallery, murals, beer garden or a gig if the programme fits, without turning it into another long obligation.", { placeId: "urban-spree", duration: "30-60 min", routeFromPlaceId: "raw-gelaende" }),
        item("d13-a3", "Pasad por REWE voll pflanzlich en Warschauer si queréis agua, snacks o picnic vegano antes de la noche.", "Stop at REWE voll pflanzlich at Warschauer if you want water, snacks or vegan picnic supplies before the night.", { placeId: "rewe-voll-pflanzlich", duration: "15-30 min" }),
      ],
      dinner: [
        item("d13-d1", "Cena simple en Friedrichshain: 1990 Vegan Living, Vöner o algo rápido. Sábado no necesita cena pesada.", "Simple Friedrichshain dinner: 1990 Vegan Living, Voner or something quick. Saturday does not need a heavy dinner.", { placeId: "1990-vegan-living" }),
      ],
      evening: [
        item("d13-e1", "Decidid pronto la dirección: Else si queréis la opción más completa; Toy Tonics/AEDEN si os tira más disco-house; Watergate Open Air si preferís Spree y acceso más fácil.", "Decide the direction early: Else for the most complete option; Toy Tonics/AEDEN for disco-house; Watergate Open Air for Spree-side dancing and easier access."),
      ],
      night: [
        item("d13-n1", "Primera opción: Else x Mano Le Tough. Tiene día, noche, terraza, comida y cubierta si llueve.", "First choice: Else x Mano Le Tough. It has day, night, terrace, food and cover if it rains.", { eventId: "else-mano-le-tough-maeve-2026-06-13", flags: ["booking", "cash_card"] }),
        item("d13-n2", "Alternativa luminosa: Toy Tonics Jam en AEDEN, 14:00-08:00, 25 EUR, house/disco y cuatro floors.", "Brighter alternative: Toy Tonics Jam at AEDEN, 14:00-08:00, 25 EUR, house/disco and four floors.", { eventId: "toy-tonics-aeden-2026-06-13" }),
        item("d13-n3", "Alternativa más de escena: STAUB XL en about blank, 12:00-10:00, jardín y techno/experimental.", "More scene-rooted alternative: STAUB XL at about blank, 12:00-10:00, garden and techno/experimental.", { eventId: "staub-xl-about-blank-2026-06-13" }),
      ],
      alternatives: [
        item("d13-x1", "Si no queréis puerta ni maratón: Watergate Open Air en SAGE funciona de 15:00 a 03:00 junto al Spree.", "If you do not want a door gamble or a marathon: Watergate Open Air at SAGE runs 15:00-03:00 by the Spree.", { eventId: "watergate-open-air-sage-2026-06-13" }),
        item("d13-x2", "Si RAW os atrapa y no queréis moveros: Freak on a Leash en Badehaus es la salida cero-techno.", "If RAW catches you and you do not want to move: Freak on a Leash at Badehaus is the zero-techno exit.", { eventId: "freak-on-a-leash-badehaus-2026-06-13" }),
        item("d13-x3", "Si el jueves quedó corto o descartáis el bloque Spree/RAW, Hackesche Hofe puede ser paso rápido de mañana; si no, no hace falta repetir Mitte.", "If Thursday felt unfinished or you skip the Spree/RAW block, Hackesche Hofe can be a quick morning pass; otherwise there is no need to repeat Mitte.", { placeId: "hackesche-hoefe", duration: "45-75 min", flags: ["tired"] }),
        item("d13-x4", "Si RAW os satura pero queréis seguir en Friedrichshain: Neue Zukunft da biergarten, cine o concierto con menos presión de club.", "If RAW gets too much but you want to stay in Friedrichshain: Neue Zukunft gives you beer garden, cinema or a gig with less club pressure.", { placeId: "neue-zukunft", duration: "1.5-4 h", flags: ["tired"] }),
        item("d13-x5", "Si queréis intentar Berghain, hacedlo como curiosidad con plan B claro: about blank/Tresor son salidas más realistas.", "If you want to try Berghain, do it as a curiosity with a clear plan B: about blank/Tresor are more realistic exits.", { placeId: "berghain", flags: ["booking"] }),
      ],
    },
  },
  {
    date: "2026-06-14",
    label: { es: "Domingo 14 junio · Mauerpark, Muro y río flexible", en: "Sunday 14 June · Mauerpark, Wall and flexible river" },
    blocks: {
      morning: [
        item("d14-m1", "Mauerpark temprano, sobre las 10: flohmarkt antes de la masa y tiempo para mirar sin agobio.", "Mauerpark early, around 10: flea market before the crowd and enough time to browse without stress.", { placeId: "mauerpark", duration: "2-3 h", flags: ["low_budget"] }),
      ],
      lunch: [
        item("d14-l1", "Comed de mercado si os apetece seguir allí; si necesitáis bajar ritmo, Café Vux/Neukolln es el plan vegano tranquilo.", "Eat at the market if you want to stay; if you need to slow down, Café Vux/Neukolln is the calm vegan plan.", { placeId: "cafe-vux", duration: "1-1.5 h" }),
      ],
      afternoon: [
        item("d14-a1", "Berlin Wall Memorial en Bernauer Strasse: compacto, cercano y mucho más útil que añadir otro monumento suelto. Hacedlo antes de que el domingo se disperse.", "Berlin Wall Memorial on Bernauer Strasse: compact, nearby and much more useful than adding another isolated monument. Do it before Sunday starts to scatter.", { placeId: "berlin-wall-memorial", duration: "1-1.5 h", routeFromPlaceId: "mauerpark" }),
        item("d14-a2", "Bearpit Karaoke si el tiempo acompaña y os apetece volver al parque. Es turístico, sí, pero también es Berlín dominguero en una forma muy fácil de disfrutar.", "Bearpit Karaoke if the weather allows and you feel like returning to the park. Yes, it is touristy, but it is also Sunday Berlin in a very easy-to-enjoy form.", { placeId: "mauerpark" }),
      ],
      dinner: [
        item("d14-d1", "Cena ligera en Neukolln o cerca del río. La noche ideal hoy no empieza con prisa.", "Light dinner in Neukolln or near the river. The ideal night today does not start in a rush.", { placeId: "la-stella-nera" }),
      ],
      evening: [
        item("d14-e1", "YAAM al atardecer si queda energía: río, música, arena, cerveza y margen para no decidir nada más.", "YAAM at sunset if there is energy left: river, music, sand, beer and room to decide nothing else.", { placeId: "yaam", flags: ["tired"] }),
      ],
      night: [
        item("d14-n1", "Si queréis algo raro y diurno, OHNE en 90mil va de 08:00 a 20:00 con RSVP/donación. Solo con entrada clara y respeto al espacio.", "If you want something odd and daytime, OHNE at 90mil runs 08:00-20:00 with RSVP/donation. Only with clear entry and respect for the space.", { eventId: "ohne-90mil-2026-06-14" }),
        item("d14-n2", "Si os pide un giro metalero, Badehaus tiene Berlin Metal Mixtape a las 16:00; si no, YAAM es cierre suficiente.", "If you want a metal detour, Badehaus has Berlin Metal Mixtape at 16:00; otherwise YAAM is enough of a landing.", { eventId: "berlin-metal-mixtape-badehaus-2026-06-14" }),
      ],
      alternatives: [
        item("d14-x1", "Si llueve: Hamburger Bahnhof/Gropius Bau y café largo. No baséis el domingo en karaoke si el cielo no acompaña.", "If it rains: Hamburger Bahnhof/Gropius Bau and a long coffee. Do not build Sunday around karaoke if the weather disagrees.", { placeId: "gropius-bau", flags: ["rain"] }),
        item("d14-x2", "Si Mauerpark se satura, cambiad a Nowkoelln Flowmarkt y canal. Menos postal, más paseo; elegidlo en vez de otro rastro, no además.", "If Mauerpark gets too crowded, switch to Nowkoelln Flowmarkt and the canal. Less postcard, more walking; choose it instead of another flea market, not in addition.", { placeId: "nowkoelln-flowmarkt" }),
        item("d14-x3", "Si queréis rastro cercano en vez de karaoke, Arkonaplatz encaja por zona y no os obliga a cruzar media ciudad.", "If you want a nearby flea market instead of karaoke, Arkonaplatz fits the area and does not force you across town.", { placeId: "arkonaplatz-flea-market" }),
        item("d14-x4", "Si buscáis antigüedades con más calma, Strasse des 17. Juni funciona como sustituto claro del caos de Mauerpark.", "If you want calmer antiques, Strasse des 17. Juni works as a clear replacement for Mauerpark chaos.", { placeId: "berliner-troedelmarkt-strasse-17-juni" }),
        item("d14-x5", "Si os apetecen discos, libros y coleccionismo, Antikmarkt Ostbahnhof es el rastro más específico; elegidlo en vez de otra vuelta por el parque.", "If records, books and collectibles sound better, Antikmarkt Ostbahnhof is the more specific flea market; choose it instead of another park loop.", { placeId: "antikmarkt-ostbahnhof" }),
        item("d14-x6", "Si os quedáis cerca de Kreuzberg, Marheinekeplatz resuelve rastro corto, cafés y Bergmannstrasse sin abrir una ruta nueva.", "If you stay near Kreuzberg, Marheinekeplatz gives you a short flea-market stop, cafes and Bergmannstrasse without opening a new route.", { placeId: "marheinekeplatz-flea-market" }),
        item("d14-x7", "Si el día va largo, YAAM baja a plan B sin culpa: el Spree ya quedó cubierto el sábado con East Side Gallery y Holzmarkt.", "If the day runs long, YAAM drops to plan B without guilt: the Spree was already covered on Saturday with East Side Gallery and Holzmarkt.", { placeId: "yaam", flags: ["tired"] }),
        item("d14-x8", "Si os apetece improvisar algo más subcultural que turístico, revisad Stressfaktor por fecha y solo id a eventos públicos claros.", "If you want to improvise something more subcultural than touristy, check Stressfaktor by date and only go to clearly public events.", { placeId: "stressfaktor-calendar" }),
        item("d14-x9", "Si el plan parque es más calor que postal: Hasenheide descansa mejor; Görlitzer Park es más pulso de Kreuzberg que parque bonito.", "If the park plan is more heat than postcard: Hasenheide rests better; Goerlitzer Park is more Kreuzberg pulse than pretty park.", { placeId: "hasenheide", flags: ["tired"] }),
      ],
    },
  },
  {
    date: "2026-06-15",
    label: { es: "Lunes 15 junio · murales, vistas y última noche amable", en: "Monday 15 June · murals, views and a gentle final night" },
    blocks: {
      morning: [
        item("d15-m1", "URBAN NATION y Bulowstrasse: empezad por museo y seguid a pie por murales. Es el día más claro de street art sin depender de tour.", "URBAN NATION and Bulowstrasse: start with the museum and continue on foot through murals. It is the clearest street-art day without relying on a tour.", { placeId: "urban-nation", duration: "2-3 h", flags: ["rain", "low_budget"] }),
      ],
      lunch: [
        item("d15-l1", "Pausa en Schoneberg o traslado hacia Tiergarten. Mantened el día ligero: la tarde necesita piernas.", "Pause in Schoneberg or move toward Tiergarten. Keep the day light: the afternoon needs legs.", { duration: "1 h" }),
      ],
      afternoon: [
        item("d15-a1", "Victoria Column si hace buen día: subid. Es barato comparado con otras vistas y se entiende muy bien el verde de Berlín.", "Victory Column if the weather is good: go up. It is cheap compared with other viewpoints and makes Berlin's green scale very clear.", { placeId: "victory-column", duration: "1-1.5 h" }),
        item("d15-a2", "Teufelsberg es el cierre visual fuerte, pero tratadlo como plan exigente: radar, bosque, street art, vistas y bastante transporte. Si entráis cansados, cambiad sin drama.", "Teufelsberg is the strong visual ending, but treat it as a demanding plan: radar, forest, street art, views and plenty of transit. If you start tired, switch without drama.", { placeId: "teufelsberg", duration: "3-4 h", flags: ["booking", "tired"] }),
      ],
      dinner: [
        item("d15-d1", "Última cena especial solo si de verdad os apetece: Lucky Leek o Bonvivant con reserva. Si no, algo fácil y a dormir bien.", "Final special dinner only if you truly want it: Lucky Leek or Bonvivant with a booking. Otherwise keep it easy and sleep well.", { placeId: "lucky-leek", flags: ["booking"] }),
      ],
      evening: [
        item("d15-e1", "Última tarde amable: paseo corto, cerveza tranquila o descanso. No hay que forzar un concierto si mañana hay aeropuerto.", "Gentle final evening: short walk, quiet beer or rest. There is no need to force a concert when tomorrow is airport day."),
      ],
      night: [
        item("d15-n1", "No clubbing serio hoy. Si el concierto no encaja, paseo corto y descanso: mañana hay aeropuerto.", "No serious clubbing today. If the concert does not fit, take a short walk and rest: tomorrow is airport day.", { flags: ["tired"] }),
      ],
      alternatives: [
        item("d15-x1", "Si Teufelsberg se complica por lluvia, cansancio o transporte: Neue Nationalgalerie o Gropius Bau según exposiciones. Es sustituto, no añadido.", "If Teufelsberg gets complicated by rain, fatigue or transit: Neue Nationalgalerie or Gropius Bau depending on exhibitions. It is a replacement, not an add-on.", { placeId: "neue-nationalgalerie", flags: ["rain", "tired"] }),
        item("d15-x2", "Si queréis atardecer fácil en vez de cruzar a Grunewald: Klunkerkranich da vista, música suave y salida menos exigente.", "If you want an easy sunset instead of crossing to Grunewald: Klunkerkranich gives you a view, soft music and a less demanding exit.", { placeId: "klunkerkranich", flags: ["tired"] }),
        item("d15-x3", "Si os queda energía de club pero no de maratón, RSO o Humboldthain solo compensan con cartel fuerte; si no, Klunker gana.", "If you still have club energy but not marathon energy, RSO or Humboldthain only pay off with a strong lineup; otherwise Klunker wins.", { placeId: "rso-berlin", flags: ["booking", "tired"] }),
      ],
    },
  },
  {
    date: "2026-06-16",
    label: { es: "Martes 16 junio · cierre sin romper el viaje", en: "Tuesday 16 June · closing without breaking the trip" },
    blocks: {
      morning: [
        item("d16-m1", "Repetid Maybachufer solo si os quedó pendiente. Si ya lo hicisteis, paseo corto por Kreuzberg y compras pequeñas.", "Repeat Maybachufer only if it was left pending. If you already did it, take a short Kreuzberg walk and do small errands.", { placeId: "maybachufer-market", duration: "1.5-2.5 h" }),
      ],
      lunch: [
        item("d16-l1", "Comida fácil cerca del alojamiento. Día de salida: cero experimentos logísticos.", "Easy lunch near the apartment. Departure day: zero logistical experiments.", { placeId: "accommodation-nena-moritzplatz" }),
      ],
      afternoon: [
        item("d16-a1", "Salida hacia BER con billete ABC y margen. Mejor esperar en aeropuerto que cerrar Berlín corriendo.", "Leave for BER with an ABC ticket and margin. Better to wait at the airport than end Berlin by rushing.", { externalUrl: "https://ber.berlin-airport.de/en/orientation/getting-here/public-transport.html", flags: ["cash_card"] }),
      ],
      dinner: [
        item("d16-d1", "Si el vuelo es muy tarde o dormís otra noche: Sorry toca en Lido a las 20:00. Si no, ignoradlo sin culpa.", "If the flight is very late or you stay another night: Sorry plays Lido at 20:00. Otherwise ignore it without guilt.", { eventId: "sorry-lido-2026-06-16" }),
      ],
      evening: [],
      night: [],
      alternatives: [
        item("d16-x1", "Si vais cargados o justos, taxi sin culpa. El último día no es para demostrar nada.", "If luggage or timing is tight, take a taxi without guilt. The last day is not for proving anything.", { flags: ["tired"] }),
        item("d16-x2", "Si Maybachufer ya quedó hecho y os sobra un paseo corto, Prinzessinnengarten resuelve verde, barrio y cercanía sin abrir otro frente logístico.", "If Maybachufer is already done and you have room for a short walk, Prinzessinnengarten gives you greenery, neighborhood and proximity without opening another logistics front.", { placeId: "prinzessinnengarten-kreuzberg", duration: "30-60 min", flags: ["tired"] }),
      ],
    },
  },
];
