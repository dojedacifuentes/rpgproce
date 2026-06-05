import type { RegionCivilId } from "@/types/civilis";

// ============================================================================
// ORDENA LA SECUENCIA — pasos/requisitos en su orden correcto.
// items[] está en el ORDEN CORRECTO; el juego los baraja.
// ============================================================================

export interface Secuencia {
  id: string;
  titulo: string;
  articulo: string;
  region: RegionCivilId;
  items: string[]; // en orden correcto
}

export const SECUENCIAS_CIVIL: Secuencia[] = [
  {
    id: "seq_1554",
    titulo: "Requisitos del contrato de promesa (1554)",
    articulo: "Art. 1554 CC",
    region: "promesa",
    items: [
      "1ª Que la promesa conste por escrito",
      "2ª Que el contrato prometido no sea de los que las leyes declaran ineficaces",
      "3ª Que contenga un plazo o condición que fije la época de la celebración",
      "4ª Que se especifique el contrato prometido",
    ],
  },
  {
    id: "seq_hipoteca",
    titulo: "Constitución y adquisición del derecho real de hipoteca",
    articulo: "Arts. 2407, 2409-2410 CC",
    region: "hipoteca",
    items: [
      "Capacidad del constituyente para enajenar el inmueble",
      "Consentimiento otorgado por escritura pública (solemnidad)",
      "Inscripción en el Registro de Hipotecas del Conservador (tradición del derecho real)",
    ],
  },
  {
    id: "seq_eviccion",
    titulo: "Saneamiento por evicción: secuencia",
    articulo: "Arts. 1843-1847 CC",
    region: "compraventa",
    items: [
      "Un tercero turba al comprador alegando derecho anterior sobre la cosa",
      "El comprador cita de evicción al vendedor",
      "El vendedor defiende al comprador en el juicio (obligación de hacer)",
      "Si la cosa resulta evicta por sentencia: el vendedor indemniza (obligación de dar)",
    ],
  },
  {
    id: "seq_resolucion",
    titulo: "Resolución por inejecución (1489): pasos del acreedor",
    articulo: "Art. 1489 CC",
    region: "contratos",
    items: [
      "Incumplimiento imputable del deudor en un contrato bilateral",
      "El acreedor diligente ha cumplido o está llano a cumplir",
      "Opta a su arbitrio: resolución o cumplimiento forzado",
      "Demanda judicial, con indemnización de perjuicios",
    ],
  },
  {
    id: "seq_grado",
    titulo: "Método para resolver un caso integrado de grado",
    articulo: "Método",
    region: "biblioteca",
    items: [
      "Identificar la acción y el procedimiento aplicable",
      "Determinar los hechos a probar y la carga probatoria",
      "Establecer la resolución que corresponde",
      "Señalar el recurso procedente",
      "Indicar la consecuencia procesal",
    ],
  },
  {
    id: "seq_dano",
    titulo: "Reparación del daño: método de la responsabilidad",
    articulo: "Arts. 1556, 2314, 2329 CC",
    region: "contratos",
    items: [
      "Acreditar el daño (daño emergente y lucro cesante)",
      "Acreditar el factor de imputación (dolo o culpa)",
      "Acreditar el nexo causal entre el hecho y el daño",
      "Determinar la reparación integral (incluido el daño moral)",
    ],
  },
];

export const getSecuencia = (id: string) => SECUENCIAS_CIVIL.find((s) => s.id === id);
