import type { TransportTip } from "@/domain/transport";

export const transportTips: TransportTip[] = [
  { id: "bvg-app", title: { es: "Usar BVG para transporte público", en: "Use BVG for public transport" }, description: { es: "Consultar transbordos y tiempos reales.", en: "Check connections and real-time timings." }, link: "https://www.bvg.de", verification: { status: "needs_verification" } },
  { id: "citymapper", title: { es: "Comparar rutas en Citymapper", en: "Compare routes with Citymapper" }, description: { es: "Útil para decidir entre caminar y U-Bahn.", en: "Useful to decide between walking and transit." }, link: "https://citymapper.com", verification: { status: "unknown" } },
];
