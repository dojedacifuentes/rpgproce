import type { Edificio, EdificioId } from "@/types/procesal";

// ============================================================================
// LOS EDIFICIOS DE LA CIUDADELA — cada edificio es un procedimiento.
// Colores según la dirección de arte del encargo.
// ============================================================================

export const EDIFICIOS: Edificio[] = [
  {
    id: "ordinario",
    nombre: "Palacio del Juicio Ordinario",
    subtitulo: "Procedimiento de lato conocimiento",
    tema: "El proceso largo y solemne",
    icono: "🏛️",
    color: "#3b6ea5",
    x: 26,
    y: 32,
    orden: 1,
    intro:
      "El procedimiento más solemne y completo: regla general y supletoria de todos los demás. Aquí se discute, se prueba y se falla con todas las garantías. Recorre el expediente etapa por etapa y aprende sus plazos.",
  },
  {
    id: "sumario",
    nombre: "Torre del Juicio Sumario",
    subtitulo: "Procedimiento concentrado y rápido",
    tema: "La justicia veloz",
    icono: "🗼",
    color: "#d9a521",
    x: 52,
    y: 19,
    orden: 2,
    intro:
      "Procedimiento breve y concentrado para los casos que requieren tramitación rápida (art. 680 CPC). Audiencia, prueba y sentencia en pocos pasos.",
    enPrep: true,
  },
  {
    id: "ejecutivo",
    nombre: "Fortaleza Ejecutiva",
    subtitulo: "Cobro forzado",
    tema: "La ejecución de la deuda",
    icono: "🏰",
    color: "#b3433a",
    x: 78,
    y: 34,
    orden: 3,
    intro:
      "El procedimiento de ejecución por excelencia: requiere un título ejecutivo y se lleva en DOS cuadernos a la vez —el principal (discusión) y el de apremio (embargo y remate)—. El mundo más grande de la Ciudadela.",
    cuadernos: true,
  },
  {
    id: "incidental",
    nombre: "Bastión de la Ejecución Incidental",
    subtitulo: "Cumplimiento de sentencias",
    tema: "Hacer cumplir lo juzgado",
    icono: "⛓️",
    color: "#7d5ba6",
    x: 36,
    y: 66,
    orden: 4,
    intro:
      "Cumplimiento incidental del fallo ante el mismo tribunal que lo dictó, dentro de un año desde que la ejecución se hizo exigible. La vía más expedita de la acción de cosa juzgada.",
    enPrep: true,
  },
  {
    id: "recursos",
    nombre: "Academia de Recursos",
    subtitulo: "Impugnación de resoluciones",
    tema: "Atacar la resolución",
    icono: "⚖️",
    color: "#3f9d6b",
    x: 66,
    y: 68,
    orden: 5,
    intro:
      "Donde se aprende a impugnar: reposición, apelación, casación en la forma y en el fondo, queja y revisión. Cada maestro custodia un recurso, sus causales y —sobre todo— sus plazos fatales.",
    enPrep: true,
  },
];

export const getEdificio = (id: string): Edificio | undefined =>
  EDIFICIOS.find((e) => e.id === id);

// Senderos entre edificios para dibujar el mapa de la Ciudadela.
export const SENDERO_PROC: [EdificioId, EdificioId][] = [
  ["ordinario", "sumario"],
  ["sumario", "ejecutivo"],
  ["ordinario", "incidental"],
  ["ejecutivo", "recursos"],
  ["incidental", "recursos"],
];
