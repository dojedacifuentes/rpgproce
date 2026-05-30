import { ARTICULOS } from "./articulos";
import { DESAFIOS } from "./desafios";

// ============================================================================
// REINOS DEL DERECHO — Progresión RPG: rango por XP + logros
// ============================================================================

const TOTAL_ART = ARTICULOS.length;
const TOTAL_DES = DESAFIOS.length;

const XP_POR_NIVEL = 100;
const NIVEL_MAX = 25;

interface Banda {
  min: number;
  titulo: string;
  color: string;
}

const BANDAS: Banda[] = [
  { min: 1, titulo: "Aspirante", color: "#9aa0aa" },
  { min: 3, titulo: "Pasante Jurídico", color: "#7AD4E6" },
  { min: 6, titulo: "Litigante", color: "#4BE7FF" },
  { min: 10, titulo: "Jurista", color: "#58F5B0" },
  { min: 15, titulo: "Maestro del Derecho", color: "#8A5CFF" },
  { min: 21, titulo: "Gran Jurista del Grado", color: "#ecc94b" },
];

export interface RangoInfo {
  nivel: number;
  titulo: string;
  color: string;
  xpEnNivel: number;
  xpParaSiguiente: number;
  pct: number;
  xpTotal: number;
  esMax: boolean;
}

export function rangoDe(xp: number): RangoInfo {
  const nivel = Math.min(NIVEL_MAX, Math.floor(xp / XP_POR_NIVEL) + 1);
  const banda = [...BANDAS].reverse().find((b) => nivel >= b.min) ?? BANDAS[0];
  const esMax = nivel >= NIVEL_MAX;
  const xpEnNivel = esMax ? XP_POR_NIVEL : xp % XP_POR_NIVEL;
  return {
    nivel,
    titulo: banda.titulo,
    color: banda.color,
    xpEnNivel,
    xpParaSiguiente: XP_POR_NIVEL,
    pct: Math.round((xpEnNivel / XP_POR_NIVEL) * 100),
    xpTotal: xp,
    esMax,
  };
}

// ─── LOGROS (derivados del progreso; sin estado extra que persistir) ──────────
export interface ProgresoReinos {
  desafiosResueltos: string[];
  regionesCompletadas: string[];
  articulosDesbloqueados: string[];
  bossesDerrotados: string[];
  cristales: number;
  xp: number;
}

export interface LogroReinos {
  id: string;
  nombre: string;
  desc: string;
  icono: string;
  check: (p: ProgresoReinos) => boolean;
}

export const LOGROS: LogroReinos[] = [
  { id: "primer_paso", nombre: "Primer Paso", desc: "Supera tu primer desafío.", icono: "👣", check: (p) => p.desafiosResueltos.length >= 1 },
  { id: "primera_conquista", nombre: "Primera Conquista", desc: "Vence a tu primer jefe de región.", icono: "⚔", check: (p) => p.bossesDerrotados.length >= 1 },
  { id: "coleccionista", nombre: "Coleccionista", desc: "Reúne 12 artículos legendarios.", icono: "📜", check: (p) => p.articulosDesbloqueados.length >= 12 },
  { id: "tesorero", nombre: "Tesorero", desc: "Acumula 300 Cristales de Justicia.", icono: "💎", check: (p) => p.cristales >= 300 },
  { id: "erudito", nombre: "Erudito", desc: `Supera los ${TOTAL_DES} desafíos.`, icono: "🧠", check: (p) => p.desafiosResueltos.length >= TOTAL_DES },
  { id: "conquistador", nombre: "Conquistador", desc: "Conquista 6 regiones.", icono: "🏰", check: (p) => p.regionesCompletadas.length >= 6 },
  { id: "bibliotecario", nombre: "Bibliotecario", desc: "Completa toda la biblioteca.", icono: "📚", check: (p) => p.articulosDesbloqueados.length >= TOTAL_ART },
  { id: "gran_jurista", nombre: "Gran Jurista", desc: "Conquista las 7 regiones.", icono: "👑", check: (p) => p.regionesCompletadas.length >= 7 },
];

export function logrosDesbloqueados(p: ProgresoReinos): string[] {
  return LOGROS.filter((l) => l.check(p)).map((l) => l.id);
}
