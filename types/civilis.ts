// ============================================================================
// CIVILIS: EL REINO DE LAS OBLIGACIONES — tipos de la expansión de Derecho Civil.
// Expansión AISLADA dentro de rpgproce (no toca el juego procesal ni Reinos).
// ============================================================================

export type RegionCivilId =
  | "obligaciones"
  | "solidaridad"
  | "contratos"
  | "compraventa"
  | "promesa"
  | "mandato"
  | "hipoteca"
  | "extincion"
  | "biblioteca"
  | "actojuridico";

export type Rareza = "comun" | "rara" | "epica" | "legendaria";

export interface PaletaCivil {
  primary: string;
  secondary: string;
  accent: string;
  ambient: string;
}

export interface RegionCivil {
  id: RegionCivilId;
  nombre: string;
  subtitulo: string;
  icono: string;
  x: number; // % en el mapa
  y: number;
  paleta: PaletaCivil;
  lore: string;
  bossId?: string;
  orden: number;
}

/** Una opción de clasificación del minijuego nuclear. */
export interface CategoriaCaso {
  id: string;
  label: string;
}

/**
 * CASO CIVIL — el minijuego clasificador (corazón pedagógico).
 * Caso concreto → opciones de clasificación → feedback con cita formal.
 */
export interface CasoCivil {
  id: string;
  region: RegionCivilId;
  enemigo: string; // el "monstruo" temático
  iconoEnemigo: string;
  enunciado: string;
  contexto?: string;
  pregunta: string;
  categorias: CategoriaCaso[];
  correcta: string; // id de la categoría correcta
  explicacion: string;
  articulo: string;
  dificultad: 1 | 2 | 3;
  codexId?: string; // entrada de codex que desbloquea
  recompensa: { xp: number; oro: number; cartaId?: string };
}

/** Un paso de decisión dentro de un caso integrado de grado. */
export interface OpcionGrado {
  id: string;
  texto: string;
}
export interface PasoGrado {
  pregunta: string;
  opciones: OpcionGrado[];
  correcta: string; // id de la opción correcta
  explicacion: string;
  articulo?: string;
}
/**
 * CASO DE GRADO — caso integrado multi-paso (estilo examen de grado):
 * un relato de hechos seguido de decisiones secuenciales razonadas.
 */
export interface CasoGrado {
  id: string;
  titulo: string;
  region: RegionCivilId;
  relato: string;
  pasos: PasoGrado[];
  recompensa: { xp: number; oro: number };
}

/** Entrada del Codex Civilis (Pokédex jurídica). */
export interface EntradaCodex {
  id: string;
  region: RegionCivilId;
  institucion: string;
  icono: string;
  concepto: string;
  fuente: string;
  caracteristicas?: string[];
  requisitos?: string[];
  clasificaciones?: string[];
  efectos?: string[];
  excepciones?: string[];
  casoFrecuente?: string;
  preguntaGrado: string;
  rareza: Rareza;
}

/** Carta jurídica coleccionable (artículo). */
export interface CartaArticulo {
  id: string;
  articulo: string;
  nombre: string;
  texto: string;
  region: RegionCivilId;
  rareza: Rareza;
}

/** Personaje-institución de la compañía. */
export interface PersonajeParty {
  id: string;
  nombre: string;
  titulo: string;
  institucion: string;
  icono: string;
  color: string;
  descripcion: string;
  habilidad: string;
  regionAfin: RegionCivilId;
}

/** Jefe de región. */
export interface BossCivil {
  id: string;
  nombre: string;
  titulo: string;
  region: RegionCivilId;
  icono: string;
  color: string;
  descripcion: string;
  vidaMax: number;
  casosIds: string[];
  recompensaArticuloId?: string;
  recompensaOro: number;
}

/** Estado persistido (clave de localStorage propia). */
export interface EstadoCivilis {
  version: number;
  desbloqueado: boolean;
  codexDesbloqueado: string[];
  casosResueltos: string[];
  cartasObtenidas: string[];
  bossesDerrotados: string[];
  regionesCompletadas: RegionCivilId[];
  examenesAprobados: string[];
  casosGradoResueltos: string[];
  oro: number;
  xp: number;
  perfilNombre?: string;
}
