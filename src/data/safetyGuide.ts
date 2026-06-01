import type { LocalizedText } from "@/domain/common";

export type SafetyCard = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  items: LocalizedText[];
  sourceLabel: LocalizedText;
  sourceUrl: string;
  lastVerifiedAt: string;
  risk: "info" | "warning" | "urgent";
};

export const safetyCards: SafetyCard[] = [
  {
    id: "emergency-numbers",
    title: { es: "Emergencias: que numero llamar", en: "Emergencies: which number to call" },
    summary: { es: "Guardad estos numeros antes de salir. En una emergencia real, no espereis a decidir perfecto.", en: "Save these numbers before going out. In a real emergency, do not wait for the perfect decision." },
    items: [
      { es: "112: ambulancia, bomberos o peligro medico grave.", en: "112: ambulance, fire brigade or serious medical danger." },
      { es: "110: policia.", en: "110: police." },
      { es: "116117: medico de guardia si no es una emergencia vital.", en: "116117: medical on-call service when it is not life-threatening." },
      { es: "030 19240: toxicologia/poison hotline de Berlin.", en: "030 19240: Berlin poison hotline." },
      { es: "030 19237: Drogennotdienst, ayuda urgente sobre drogas y adicciones.", en: "030 19237: Drogennotdienst, urgent help around drugs and addiction." },
    ],
    sourceLabel: { es: "Berlin.de emergencias", en: "Berlin.de emergencies" },
    sourceUrl: "https://www.berlin.de/sen/gesundheit/gesundheitswesen/notdienste/",
    lastVerifiedAt: "2026-06-02",
    risk: "urgent",
  },
  {
    id: "ehic-insurance",
    title: { es: "Sanidad: TSE/EHIC y seguro", en: "Healthcare: EHIC and insurance" },
    summary: { es: "La Tarjeta Sanitaria Europea ayuda, pero no sustituye a un seguro de viaje completo.", en: "The European Health Insurance Card helps, but it is not a full travel insurance replacement." },
    items: [
      { es: "Llevad Tarjeta Sanitaria Europea fisica o certificado provisional si sois asegurados en Espana.", en: "Carry the European Health Insurance Card or provisional certificate if insured in Spain/EU." },
      { es: "Cubre asistencia medica necesaria en la sanidad publica alemana en condiciones locales; puede haber copagos.", en: "It covers medically necessary state healthcare in Germany under local conditions; co-payments can exist." },
      { es: "No cubre normalmente repatriacion, perdida de equipaje, cancelaciones ni clinicas privadas fuera del sistema publico.", en: "It normally does not cover repatriation, luggage loss, cancellations or private clinics outside the public system." },
      { es: "Recomendacion practica: TSE + seguro de viaje barato con repatriacion y responsabilidad civil.", en: "Practical recommendation: EHIC + inexpensive travel insurance with repatriation and liability cover." },
    ],
    sourceLabel: { es: "Comision Europea: EHIC en Alemania", en: "European Commission: EHIC in Germany" },
    sourceUrl: "https://employment-social-affairs.ec.europa.eu/policies-and-activities/moving-working-europe/eu-social-security-coordination/european-health-insurance-card/how-use-card/germany-european-health-insurance-card_en",
    lastVerifiedAt: "2026-06-02",
    risk: "info",
  },
  {
    id: "cannabis-rules",
    title: { es: "Cannabis: legal no significa barra libre", en: "Cannabis: legal does not mean anything goes" },
    summary: { es: "Alemania permite ciertos usos adultos desde 2024, pero con limites claros y multas relevantes.", en: "Germany allows some adult use since 2024, but with clear limits and meaningful fines." },
    items: [
      { es: "Adultos: hasta 25 g en espacio publico y hasta 50 g en privado; cultivo privado hasta 3 plantas por adulto en domicilio.", en: "Adults: up to 25 g in public and up to 50 g privately; private cultivation up to 3 plants per adult at home." },
      { es: "No hay venta comercial legal para turistas. La entrega a terceros esta prohibida fuera de asociaciones autorizadas.", en: "There is no legal commercial sale for tourists. Passing cannabis to others is prohibited outside authorised associations." },
      { es: "No consumir a menos de 100 m de colegios, guarderias, parques infantiles, instalaciones deportivas juveniles o asociaciones de cultivo; en zonas peatonales hay restricciones horarias.", en: "Do not consume within 100 m of schools, daycare centres, playgrounds, youth sports facilities or cultivation associations; pedestrian areas have time restrictions." },
      { es: "Berlin publica multas de 250 a 30.000 EUR para infracciones del KCanG segun caso.", en: "Berlin lists fines from EUR 250 to EUR 30,000 for KCanG offences depending on the case." },
    ],
    sourceLabel: { es: "Berlin.de: Konsumcannabisgesetz", en: "Berlin.de: cannabis framework" },
    sourceUrl: "https://www.berlin.de/lb/drogen-sucht/gesetze/konsumcannabis-gesetz/",
    lastVerifiedAt: "2026-06-02",
    risk: "warning",
  },
  {
    id: "other-drugs",
    title: { es: "MDMA, extasis, speed, coca, ketamina: ilegal", en: "MDMA, ecstasy, speed, coke, ketamine: illegal" },
    summary: { es: "La escena de club exista no cambia la ley: compra, posesion y trafico de sustancias del BtMG pueden ser delito.", en: "The club scene does not change the law: buying, possessing and dealing BtMG substances can be criminal offences." },
    items: [
      { es: "MDMA figura en el BtMG aleman. No lo trates como una falta menor de turismo.", en: "MDMA is listed under Germany's BtMG. Do not treat it as a minor tourist issue." },
      { es: "Si alguien decide consumir igualmente, la guia solo recomienda reduccion de riesgos: no mezclar, hidratarse sin pasarse, descansar, no quedarse solo y pedir ayuda temprano.", en: "If someone still decides to use, this guide only recommends harm reduction: do not mix, hydrate without overdoing it, rest, do not stay alone and seek help early." },
      { es: "Ante malestar serio, confusion, perdida de conciencia, dolor toracico, hipertermia o sospecha de intoxicacion: 112.", en: "For serious distress, confusion, unconsciousness, chest pain, overheating or suspected poisoning: call 112." },
    ],
    sourceLabel: { es: "BtMG oficial", en: "Official BtMG" },
    sourceUrl: "https://www.gesetze-im-internet.de/btmg_1981/anlage_i.html",
    lastVerifiedAt: "2026-06-02",
    risk: "urgent",
  },
  {
    id: "harm-reduction",
    title: { es: "Reduccion de riesgos si alguien consume", en: "Harm reduction if someone uses" },
    summary: { es: "No lo presentamos como recomendacion. Si ocurre, la prioridad es reducir dano y pedir ayuda pronto.", en: "This is not presented as a recommendation. If it happens, the priority is reducing harm and getting help early." },
    items: [
      { es: "Berlin tiene drug checking anonimo/gratuito con advertencias publicas; no convierte la sustancia en legal ni segura.", en: "Berlin has anonymous/free drug checking with public warnings; this does not make a substance legal or safe." },
      { es: "No mezclar sustancias ni alcohol, empezar bajo, esperar, descansar, no consumir solo y vigilar temperatura corporal.", en: "Do not mix substances or alcohol, start low, wait, rest, do not use alone and monitor body temperature." },
      { es: "Si alguien esta raro de verdad, no intenteis dormirlo ni ocultarlo por miedo: 112 y explicad que ha tomado.", en: "If someone is seriously unwell, do not try to sleep it off or hide it out of fear: call 112 and say what was taken." },
    ],
    sourceLabel: { es: "Drugchecking Berlin", en: "Drugchecking Berlin" },
    sourceUrl: "https://drugchecking.berlin/substanzen/substanz-infos",
    lastVerifiedAt: "2026-06-02",
    risk: "warning",
  },
  {
    id: "alcohol-public-space",
    title: { es: "Alcohol y botellon: flexible, pero no sin normas", en: "Alcohol outdoors: flexible, not rule-free" },
    summary: { es: "Berlin es mucho mas relajada que muchas ciudades, pero transporte, ruido, cristales, parques y seguridad mandan.", en: "Berlin is more relaxed than many cities, but transport rules, noise, glass, parks and safety still matter." },
    items: [
      { es: "Beber una cerveza en la calle o parque suele ser tolerado si no molestas, pero respeta limpieza, vidrio y vecindario.", en: "Having a beer on the street or in a park is usually tolerated if you do not disturb others, but respect litter, glass and neighbours." },
      { es: "En parques: basura al cubo, nada de fuego/grill salvo zonas indicadas, musica baja y descanso nocturno 22:00-6:00.", en: "In parks: bin your rubbish, no fire/grill except marked areas, keep music low and respect quiet hours 22:00-6:00." },
      { es: "En BVG: respetad la Nutzungsordnung; drogas, fumar/vapear y comportamientos que afecten seguridad pueden acabar en expulsion, multa contractual o policia.", en: "On BVG: follow the house rules; drugs, smoking/vaping and unsafe behaviour can lead to removal, contractual penalties or police." },
      { es: "Regla simple: Spati beer tranquilo si; botellon ruidoso con vidrio, no.", en: "Simple rule: quiet Spati beer, yes; loud glass-heavy botellon, no." },
    ],
    sourceLabel: { es: "Berlin park rules / BVG Nutzungsordnung", en: "Berlin park rules / BVG house rules" },
    sourceUrl: "https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/oeffentliche-gruen-und-erholungsanlagen/gruenanlagengesetz/parkregeln/",
    lastVerifiedAt: "2026-06-02",
    risk: "info",
  },
  {
    id: "laws-watchouts",
    title: { es: "Leyes practicas que conviene no descubrir tarde", en: "Practical rules not to discover too late" },
    summary: { es: "Son detalles poco romanticos, pero evitan multas y discusiones inutiles.", en: "Unromantic details, but they avoid fines and pointless arguments." },
    items: [
      { es: "Tickets BVG: comprad/activad antes de subir; un ticket sin validar puede contar como no ticket.", en: "BVG tickets: buy/activate before boarding; an unvalidated ticket can count as no ticket." },
      { es: "No conduzcais coche, bici o e-scooter bajo alcohol/drogas. Las reglas de trafico alemanas son estrictas.", en: "Do not drive a car, bike or e-scooter under alcohol/drugs. German traffic rules are strict." },
      { es: "En memoriales y espacios politicos: nada de postureo irrespetuoso, fotos invasivas o turismo de miseria.", en: "At memorials and political spaces: no disrespectful posing, invasive photos or poverty/squat tourism." },
      { es: "Llevad documento si salis de club: puerta, edad, policia o asistencia medica pueden necesitar identificacion.", en: "Carry ID when going clubbing: door staff, police or medical care may need identification." },
    ],
    sourceLabel: { es: "Policia Berlin: alcohol/drogas en trafico", en: "Berlin Police: alcohol/drugs in traffic" },
    sourceUrl: "https://www.berlin.de/polizei/aufgaben/bussgeldstelle/alkohol-und-drogen/",
    lastVerifiedAt: "2026-06-02",
    risk: "warning",
  },
];
