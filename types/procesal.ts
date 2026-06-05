// ============================================================================
// ARCHIVOS DEL TIEMPO PROCESAL (Expediente del Litigante) — tipos de la
// expansión de Derecho Procesal Civil chileno. Módulo AISLADO dentro de
// rpgproce: no toca el juego procesal base, ni Civilis, ni Reinos.
// ============================================================================

export type EdificioId =
  | "ordinario"
  | "sumario"
  | "ejecutivo"
  | "incidental"
  | "recursos";

export interface PaletaProc {
  primary: string;
  secondary: string;
  accent: string;
  ambient: string;
}

/** Un edificio de la Ciudadela = un procedimiento. */
export interface Edificio {
  id: EdificioId;
  nombre: string;
  subtitulo: string;
  tema: string;
  icono: string;
  color: string; // color representativo (para el nodo en el mapa)
  x: number; // % en la ciudadela
  y: number;
  orden: number;
  intro: string;
  cuadernos?: boolean; // el ejecutivo se lleva en dos cuadernos
  enPrep?: boolean; // contenido en preparación
}

export type Cuaderno = "principal" | "apremio";

/**
 * ETAPA PROCESAL — un nodo del expediente interactivo. Al abrirlo el jugador
 * ve explicación, requisitos, plazo, artículos, efectos y preguntas de examen.
 */
export interface EtapaProc {
  id: string;
  edificio: EdificioId;
  orden: number;
  grupo?: string; // sección del rail (p. ej. "Discusión", "Prueba", "Cuaderno de apremio")
  nombre: string;
  icono: string;
  resumen: string; // una línea para el nodo
  explicacion: string;
  requisitos?: string[];
  plazo?: string;
  articulos: string;
  efectos?: string[];
  preguntas?: string[]; // preguntas frecuentes de examen
  enumeracion?: { titulo: string; items: string[] }; // listas (p. ej. excepciones art. 464)
  tipo?: "etapa" | "npc" | "hito";
  rol?: string; // si es NPC: "Receptor", "Ministro de fe", etc.
}

/** Estado persistido (clave de localStorage propia). */
export interface EstadoProcesal {
  version: number;
  desbloqueado: boolean;
  etapasVistas: string[];
  edificiosCompletados: EdificioId[];
  examenesAprobados: string[];
  xp: number;
  sellos: number; // moneda/puntaje: "sellos judiciales"
  perfilNombre?: string;
}
