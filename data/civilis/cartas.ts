import type { CartaArticulo, Rareza, RegionCivilId } from "@/types/civilis";

// ============================================================================
// CARTAS JURÍDICAS — artículos del Código Civil coleccionables.
// Caen al resolver casos (rara/épica) o vencer jefes (legendaria).
// ============================================================================

export const CARTAS_CIVIL: CartaArticulo[] = [
  { id: "art_578", articulo: "Art. 578 CC", nombre: "Derecho Personal", region: "obligaciones", rareza: "rara",
    texto: "Derechos personales o créditos son los que solo pueden reclamarse de ciertas personas que han contraído las obligaciones correlativas." },
  { id: "art_1445", articulo: "Art. 1445 CC", nombre: "Requisitos del Acto", region: "actojuridico", rareza: "legendaria",
    texto: "Para que una persona se obligue a otra por un acto o declaración de voluntad es necesario: que sea legalmente capaz; que consienta y su consentimiento no adolezca de vicio; que recaiga sobre un objeto lícito; y que tenga una causa lícita." },
  { id: "art_1438", articulo: "Art. 1438 CC", nombre: "El Contrato", region: "contratos", rareza: "comun",
    texto: "Contrato o convención es un acto por el cual una parte se obliga para con otra a dar, hacer o no hacer alguna cosa." },
  { id: "art_1489", articulo: "Art. 1489 CC", nombre: "Condición Resolutoria Tácita", region: "contratos", rareza: "epica",
    texto: "En los contratos bilaterales va envuelta la condición resolutoria de no cumplirse por uno de los contratantes lo pactado; el otro puede pedir resolución o cumplimiento, con indemnización." },
  { id: "art_1511", articulo: "Art. 1511 CC", nombre: "La Solidaridad", region: "solidaridad", rareza: "epica",
    texto: "La obligación es solidaria cuando se ha contraído de modo que cada uno de los deudores sea obligado al total, o cada acreedor pueda exigir el total, por convención, testamento o ley." },
  { id: "art_1522", articulo: "Art. 1522 CC", nombre: "Subrogación del Codeudor", region: "solidaridad", rareza: "rara",
    texto: "El deudor solidario que pagó queda subrogado y puede repetir contra los demás por su cuota; la cuota del insolvente grava a los otros a prorrata." },
  { id: "art_1545", articulo: "Art. 1545 CC", nombre: "Ley del Contrato", region: "contratos", rareza: "legendaria",
    texto: "Todo contrato legalmente celebrado es una ley para los contratantes, y no puede ser invalidado sino por su consentimiento mutuo o por causas legales." },
  { id: "art_1546", articulo: "Art. 1546 CC", nombre: "Buena Fe", region: "contratos", rareza: "legendaria",
    texto: "Los contratos deben ejecutarse de buena fe, y obligan no solo a lo que en ellos se expresa, sino a todo lo que emana de la naturaleza de la obligación, la ley o la costumbre." },
  { id: "art_1550", articulo: "Art. 1550 CC", nombre: "Teoría de los Riesgos", region: "contratos", rareza: "epica",
    texto: "El riesgo del cuerpo cierto cuya entrega se deba es siempre a cargo del acreedor; salvo que el deudor se constituya en mora o haya tomado a su cargo el caso fortuito." },
  { id: "art_1552", articulo: "Art. 1552 CC", nombre: "La Mora Purga la Mora", region: "contratos", rareza: "rara",
    texto: "En los contratos bilaterales ninguno está en mora mientras el otro no cumple por su parte, o no se allana a cumplirlo." },
  { id: "art_1554", articulo: "Art. 1554 CC", nombre: "Las Cuatro Puertas", region: "promesa", rareza: "legendaria",
    texto: "La promesa no produce obligación alguna salvo que conste por escrito, el contrato prometido no sea ineficaz, contenga plazo o condición, y se especifique el contrato prometido." },
  { id: "art_1567", articulo: "Art. 1567 CC", nombre: "Modos de Extinguir", region: "extincion", rareza: "epica",
    texto: "Las obligaciones se extinguen por resciliación, pago, novación, transacción, remisión, compensación, confusión, pérdida de la cosa, nulidad, condición resolutoria y prescripción." },
  { id: "art_1628", articulo: "Art. 1628 CC", nombre: "Novación", region: "extincion", rareza: "rara",
    texto: "La novación es la sustitución de una nueva obligación a otra anterior, la cual queda por tanto extinguida." },
  { id: "art_1655", articulo: "Art. 1655 CC", nombre: "Compensación", region: "extincion", rareza: "rara",
    texto: "Cuando dos personas son deudoras una de otra, se opera entre ellas una compensación que extingue ambas deudas hasta la concurrencia de la menor." },
  { id: "art_1793", articulo: "Art. 1793 CC", nombre: "La Compraventa", region: "compraventa", rareza: "legendaria",
    texto: "La compraventa es un contrato en que una de las partes se obliga a dar una cosa y la otra a pagarla en dinero." },
  { id: "art_2116", articulo: "Art. 2116 CC", nombre: "El Mandato", region: "mandato", rareza: "epica",
    texto: "El mandato es un contrato en que una persona confía la gestión de uno o más negocios a otra, que se hace cargo de ellos por cuenta y riesgo de la primera." },
  { id: "art_2407", articulo: "Art. 2407 CC", nombre: "La Hipoteca", region: "hipoteca", rareza: "legendaria",
    texto: "La hipoteca es un derecho de prenda constituido sobre inmuebles que no dejan por eso de permanecer en poder del deudor." },
  { id: "art_2428", articulo: "Art. 2428 CC", nombre: "Derecho de Persecución", region: "hipoteca", rareza: "epica",
    texto: "La hipoteca da al acreedor el derecho de perseguir la finca hipotecada, sea quien fuere el que la posea y a cualquier título que la haya adquirido." },
  { id: "art_2434", articulo: "Art. 2434 CC", nombre: "Extinción de la Hipoteca", region: "hipoteca", rareza: "epica",
    texto: "La hipoteca se extingue junto con la obligación principal; y por resolución del derecho del constituyente, llegada del plazo, cancelación del acreedor y por la purga." },
];

export const RAREZA_CARTA: Record<Rareza, { label: string; color: string }> = {
  comun: { label: "Común", color: "#9aa0aa" },
  rara: { label: "Rara", color: "#4e86d6" },
  epica: { label: "Épica", color: "#a06cd5" },
  legendaria: { label: "Legendaria", color: "#e6c14b" },
};

export const getCarta = (id: string) => CARTAS_CIVIL.find((c) => c.id === id);
export const cartasPorRegion = (region: RegionCivilId) => CARTAS_CIVIL.filter((c) => c.region === region);
