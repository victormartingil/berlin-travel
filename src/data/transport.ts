import type { TransportTip } from "@/domain/transport";

export const transportTips: TransportTip[] = [
  {
    id: "ber-airport-zone-c",
    title: { es: "BER esta en zona C", en: "BER is in zone C" },
    description: { es: "Para ir o volver del aeropuerto desde el centro, planificad billete ABC y comprobad ruta justo antes.", en: "For airport trips from the city, plan for an ABC ticket and check the route right before leaving." },
    link: "https://ber.berlin-airport.de/en/orientation/getting-here/public-transport.html",
    verification: { status: "verified", sourceUrl: "https://ber.berlin-airport.de/en/orientation/getting-here/public-transport.html", lastVerifiedAt: "2026-06-01" },
  },
  {
    id: "bvg-apps",
    title: { es: "BVG Fahrinfo y BVG Ticket-App", en: "BVG Fahrinfo and BVG Ticket-App" },
    description: { es: "Usad Fahrinfo para rutas y Ticket-App para comprar billetes.", en: "Use Fahrinfo for routes and Ticket-App for buying tickets." },
    link: "https://www.bvg.de/en/subscriptions-and-tickets/all-apps",
    verification: { status: "verified", sourceUrl: "https://www.bvg.de/en/subscriptions-and-tickets/all-apps", lastVerifiedAt: "2026-06-01" },
  },
  {
    id: "vbb-route-planner",
    title: { es: "VBB para comprobar red regional", en: "VBB for regional network checks" },
    description: { es: "Util para BER y combinaciones con tren regional.", en: "Useful for BER and regional train combinations." },
    link: "https://www.vbb.de/en/",
    verification: { status: "needs_verification", sourceUrl: "https://www.vbb.de/en/", lastVerifiedAt: "2026-06-01" },
  },
  {
    id: "bike-weather",
    title: { es: "Bici solo cuando sume", en: "Bike only when it helps" },
    description: { es: "Canal, Tempelhofer Feld y Holzmarkt son los mejores ejes si hace buen tiempo.", en: "Canal, Tempelhofer Feld and Holzmarkt are the best axes if weather is good." },
    link: "https://www.berlin.de/en/getting-around/bikesharing/",
    verification: { status: "needs_verification", sourceUrl: "https://www.berlin.de/en/getting-around/bikesharing/", lastVerifiedAt: "2026-06-01" },
  },
];
