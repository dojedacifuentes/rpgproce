// ============================================================================
// REINOS DEL DERECHO — Tipos de la expansión (DLC)
// ----------------------------------------------------------------------------
// Sistema COMPLETAMENTE aislado del core. No importa ni modifica types/game.ts.
// Toda la progresión vive en store/useReinos.ts con su propia clave localStorage.
// ============================================================================

export type RegionId =
  | "bosque_obligaciones"
  | "ciudad_mercantil"
  | "tierras_posesion"
  | "mansion_sucesoria"
  | "republica_administrativa"
  | "castillo_competencia"
  | "tribunal_supremo";

// ─── DESAFÍOS ────────────────────────────────────────────────────────────────
// Las preguntas NO son cuestionarios: son desafíos con marco narrativo.
// El "tipo" cambia el verbo y la estética del reto, pero la mecánica es común:
// elegir la opción correcta entre distractores reales → acertar avanza, fallar
// quita vida.
export type TipoDesafio =
  | "tribunal"   // selecciona el tribunal competente
  | "accion"     // elige la acción / vía procedente
  | "excepcion"  // identifica la excepción correcta
  | "conflicto"  // resuelve el conflicto entre partes
  | "articulo"   // derrota al enemigo invocando el artículo correcto
  | "concepto"   // identifica la institución / distinción
  | "vof";       // verdadero o falso (trampa)

export interface OpcionDesafio {
  texto: string;
  correcta: boolean;
  explicacion: string; // por qué acierta / por qué es trampa
  art?: string;        // norma asociada a esta opción
}

export interface Desafio {
  id: string;
  region: RegionId;
  tipo: TipoDesafio;
  enemigo: string;      // nombre temático del adversario
  iconoEnemigo: string;
  enunciado: string;    // el reto en sí
  contexto?: string;    // caso / escenario que ambienta el reto
  opciones: OpcionDesafio[];
  articuloClave: string; // norma central del desafío
  dificultad: 1 | 2 | 3;
  recompensa: { xp: number; cristales: number; articuloId?: string };
}

// ─── ARTÍCULOS LEGENDARIOS (coleccionables) ──────────────────────────────────
export type Rareza = "comun" | "rara" | "epica" | "legendaria";

export interface ArticuloLegendario {
  id: string;
  numero: string;                          // "1545"
  codigo: "CC" | "CPC" | "CPR" | "LEY";
  etiqueta: string;                        // "Art. 1545 CC"
  titulo: string;                          // nombre evocador del artículo
  texto: string;                           // enunciado (fiel / resumido)
  efecto: string;                          // bonificación pasiva (sabor mecánico)
  rareza: Rareza;
  region: RegionId;
  icono: string;
}

// ─── BOSSES TEMÁTICOS ─────────────────────────────────────────────────────────
export interface AtaqueBoss {
  enunciado: string;
  opciones: OpcionDesafio[];
  dano: number;       // daño a la vida del jugador si falla
  articulo?: string;
}

export interface BossReino {
  id: string;
  region: RegionId;
  nombre: string;
  arquetipo: string;       // "El Acreedor Implacable"
  descripcion: string;     // ambientación
  problemaJuridico: string;// qué problema jurídico real encarna
  icono: string;
  hp: number;              // nº de respuestas correctas para derrotarlo
  vidaJugador: number;     // pool de vida del jugador en el duelo
  ataques: AtaqueBoss[];
  recompensaArticuloId?: string; // artículo legendario que suelta
  recompensaCristales: number;
}

// ─── REGIONES ─────────────────────────────────────────────────────────────────
export interface PaletaRegion {
  primary: string;   // color identitario principal
  secondary: string; // secundario
  accent: string;    // acento / brillo
  ambient: string;   // tinte de fondo (rgba o hex con baja opacidad)
}

export interface Region {
  id: RegionId;
  orden: number;          // orden de aparición en el overworld
  nombre: string;
  subtitulo: string;
  materia: string;        // "Obligaciones", "Contratos", ...
  estetica: string;       // descripción de la identidad visual
  descripcion: string;    // lore de la región
  icono: string;
  glifo: string;          // símbolo decorativo del nodo en el mapa
  x: number;              // posición en el overworld (0-100 %)
  y: number;
  bossId: string;
  requiereRegion?: RegionId; // región previa para "entrar" (progresión suave)
  paleta: PaletaRegion;
}

// ─── ESTADO PERSISTIDO ──────────────────────────────────────────────────────
export interface EstadoReinos {
  version: number;
  desbloqueado: boolean;          // ¿el portal fue abierto?
  desafiosResueltos: string[];    // ids de desafíos superados
  articulosDesbloqueados: string[]; // ids de artículos en la biblioteca
  bossesDerrotados: string[];     // ids de bosses vencidos
  regionesCompletadas: RegionId[];// regiones con boss vencido
  cristales: number;              // moneda de la expansión (Cristales de Justicia)
  ultimaRegion?: RegionId;        // para "continuar"
}
