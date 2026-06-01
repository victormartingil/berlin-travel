import type { LocalizedText } from "@/domain/common";

export type GuideLink = {
  label: LocalizedText;
  url: string;
};

export type ContextCard = {
  id: string;
  title: LocalizedText;
  eyebrow: LocalizedText;
  body: LocalizedText;
  whyItMatters: LocalizedText;
  links: GuideLink[];
};

export type MediaRecommendation = {
  id: string;
  kind: "book" | "film" | "documentary" | "press";
  title: string;
  creator: string;
  note: LocalizedText;
  bestFor: LocalizedText;
  url: string;
  language: string;
};

export const contextCards: ContextCard[] = [
  {
    id: "wall-memory-city",
    eyebrow: { es: "Historia reciente", en: "Recent history" },
    title: { es: "El Muro no es solo una foto", en: "The Wall is not just a photo" },
    body: {
      es: "Berlin se entiende mejor como una ciudad que aprendio a vivir con cicatrices visibles: fronteras, solares vacios, memoria nazi, RDA, reunificacion y barrios que cambiaron de golpe.",
      en: "Berlin makes more sense as a city that learned to live with visible scars: borders, empty lots, Nazi memory, the GDR, reunification and neighborhoods that changed abruptly.",
    },
    whyItMatters: {
      es: "Cuando paseis por Bernauer Strasse, Topography of Terror o Haus Schwarzenberg, no lo mireis como una lista de monumentos: es una ciudad discutiendo todavia como recordar.",
      en: "When you pass Bernauer Strasse, Topography of Terror or Haus Schwarzenberg, do not read them as a monument checklist: it is a city still negotiating how to remember.",
    },
    links: [
      { label: { es: "Berlin Wall Foundation", en: "Berlin Wall Foundation" }, url: "https://www.stiftung-berliner-mauer.de/en" },
      { label: { es: "Topography of Terror", en: "Topography of Terror" }, url: "https://www.topographie.de/en/" },
    ],
  },
  {
    id: "migration-kreuzberg-neukoelln",
    eyebrow: { es: "Barrios vivos", en: "Living neighborhoods" },
    title: { es: "Kreuzberg y Neukoelln no son decorado", en: "Kreuzberg and Neukoelln are not a backdrop" },
    body: {
      es: "La mezcla turca, kurda, arabe, vietnamita, queer, punk y estudiantil no es estetica de postal: viene de migracion laboral, alquileres mas baratos, activismo vecinal y mucha supervivencia urbana.",
      en: "The Turkish, Kurdish, Arab, Vietnamese, queer, punk and student mix is not postcard aesthetics: it comes from labor migration, cheaper rents, neighborhood activism and a lot of urban survival.",
    },
    whyItMatters: {
      es: "Sirve para pasear con mas respeto: comprar en mercados, comer vegano, entrar en patios o mirar street art sin convertir el barrio en parque tematico.",
      en: "It helps you walk with more respect: shop at markets, eat vegan, enter courtyards or read street art without turning the neighborhood into a theme park.",
    },
    links: [
      { label: { es: "FHXB Museum", en: "FHXB Museum" }, url: "https://www.fhxb-museum.de/" },
      { label: { es: "VisitBerlin Kreuzberg", en: "VisitBerlin Kreuzberg" }, url: "https://www.visitberlin.de/en/kreuzberg" },
    ],
  },
  {
    id: "club-culture-politics",
    eyebrow: { es: "Noche y politica urbana", en: "Nightlife and urban politics" },
    title: { es: "El club como infraestructura cultural", en: "The club as cultural infrastructure" },
    body: {
      es: "La escena de clubs salio de vacios post-Muro, alquileres bajos y permisos flexibles. Hoy compite con hoteles, ruido, costes y desarrollo inmobiliario. Por eso una cola de club tambien habla de politica urbana.",
      en: "The club scene grew from post-Wall vacancies, low rents and flexible permits. Today it competes with hotels, noise rules, costs and real-estate development. A club queue also tells a story about urban politics.",
    },
    whyItMatters: {
      es: "Elegir Else, Renate, OXI, Tresor o AEDEN no es solo salir: es entender por que Berlin protege, discute y pierde espacios culturales a la vez.",
      en: "Choosing Else, Renate, OXI, Tresor or AEDEN is not just going out: it helps explain why Berlin protects, debates and loses cultural spaces at the same time.",
    },
    links: [
      { label: { es: "Clubcommission", en: "Clubcommission" }, url: "https://www.clubcommission.de/" },
      { label: { es: "The Berliner: nightlife", en: "The Berliner: nightlife" }, url: "https://www.the-berliner.com/berlin/nightlife/" },
    ],
  },
  {
    id: "housing-pressure",
    eyebrow: { es: "Actualidad", en: "Current affairs" },
    title: { es: "Alquileres, gentrificacion y pelea por el espacio", en: "Rents, gentrification and the fight for space" },
    body: {
      es: "La tension que notareis en Berlin no es solo turistica: vivienda cara, locales amenazados, obras, hoteles y cambios de barrio explican muchas conversaciones locales.",
      en: "The tension you will notice in Berlin is not just tourism: expensive housing, threatened venues, construction, hotels and neighborhood change explain many local conversations.",
    },
    whyItMatters: {
      es: "Ayuda a leer sitios como RAW, Koepi, Bethanien o YAAM como espacios politicos y culturales, no como simples puntos guays del mapa.",
      en: "It helps read RAW, Koepi, Bethanien or YAAM as political and cultural spaces, not just cool map pins.",
    },
    links: [
      { label: { es: "IBB Housing Market Report", en: "IBB Housing Market Report" }, url: "https://www.ibb.de/de/publikationen/berliner-wohnungsmarkt/wohnungsmarktbericht.html" },
      { label: { es: "The Berliner: housing", en: "The Berliner: housing" }, url: "https://www.the-berliner.com/" },
    ],
  },
];

export const mediaRecommendations: MediaRecommendation[] = [
  {
    id: "berlin-biography-city",
    kind: "book",
    title: "Berlin: The Biography of a City",
    creator: "Barney White-Spunner",
    note: { es: "Historia amplia y legible para llegar con mapa mental de la ciudad.", en: "Broad, readable history for arriving with a mental map of the city." },
    bestFor: { es: "Contexto general", en: "General context" },
    url: "https://openlibrary.org/search?q=Berlin+The+Biography+of+a+City+Barney+White-Spunner",
    language: "EN",
  },
  {
    id: "stasiland",
    kind: "book",
    title: "Stasiland",
    creator: "Anna Funder",
    note: { es: "Historias humanas de la RDA y la vigilancia; perfecto antes de Berlin Wall Memorial o Hohenschoenhausen.", en: "Human stories of the GDR and surveillance; ideal before Berlin Wall Memorial or Hohenschoenhausen." },
    bestFor: { es: "RDA y memoria", en: "GDR and memory" },
    url: "https://openlibrary.org/search?q=Stasiland+Anna+Funder",
    language: "EN/ES",
  },
  {
    id: "good-bye-lenin",
    kind: "film",
    title: "Good Bye, Lenin!",
    creator: "Wolfgang Becker",
    note: { es: "Comedia triste sobre reunificacion, nostalgia y familia; muy util para entender el tono post-Muro.", en: "Sad comedy about reunification, nostalgia and family; useful for the post-Wall mood." },
    bestFor: { es: "Reunificacion sin clase magistral", en: "Reunification without a lecture" },
    url: "https://www.imdb.com/title/tt0301357/",
    language: "DE/ES/EN subs",
  },
  {
    id: "lives-of-others",
    kind: "film",
    title: "The Lives of Others",
    creator: "Florian Henckel von Donnersmarck",
    note: { es: "Drama sobre vigilancia en la RDA; mas oscuro, pero da contexto emocional fuerte.", en: "Drama about surveillance in the GDR; darker, but emotionally useful context." },
    bestFor: { es: "Stasi y vigilancia", en: "Stasi and surveillance" },
    url: "https://www.imdb.com/title/tt0405094/",
    language: "DE/ES/EN subs",
  },
  {
    id: "berlin-calling",
    kind: "film",
    title: "Berlin Calling",
    creator: "Hannes Stoehr / Paul Kalkbrenner",
    note: { es: "Club culture, exceso y Berlin electronico de los 2000; no es guia moral, es ambiente.", en: "Club culture, excess and 2000s electronic Berlin; not a moral guide, more a mood piece." },
    bestFor: { es: "Noche y techno", en: "Nightlife and techno" },
    url: "https://www.imdb.com/title/tt1213019/",
    language: "DE/ES/EN subs",
  },
  {
    id: "the-berliner",
    kind: "press",
    title: "The Berliner",
    creator: "Berlin English-language magazine",
    note: { es: "Buen radar en ingles para noticias locales, cultura, comida y vida nocturna.", en: "Good English-language radar for local news, culture, food and nightlife." },
    bestFor: { es: "Actualidad local en ingles", en: "Local news in English" },
    url: "https://www.the-berliner.com/",
    language: "EN",
  },
  {
    id: "exberliner-archive",
    kind: "press",
    title: "Siegessaeule / tipBerlin / local culture press",
    creator: "Berlin local media",
    note: { es: "Para agenda cultural, queer y local. Mejor usarlo como radar y confirmar eventos en la web del venue.", en: "For culture, queer and local agenda. Use as radar, then confirm events on the venue site." },
    bestFor: { es: "Agenda alternativa", en: "Alternative agenda" },
    url: "https://www.siegessaeule.de/",
    language: "DE",
  },
];
