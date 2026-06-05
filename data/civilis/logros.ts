import type { EstadoCivilis } from "@/types/civilis";
import { CODEX_CIVIL } from "./codex";
import { CARTAS_CIVIL } from "./cartas";
import { CASOS_CIVIL } from "./casos";
import { BOSSES_CIVIL } from "./bosses";
import { CASOS_GRADO } from "./grado";

// ============================================================================
// LOGROS CIVILIS — metaprogresión. Derivados del estado (sin store extra).
// ============================================================================

export interface LogroCivil {
  id: string;
  nombre: string;
  desc: string;
  icono: string;
  check: (e: EstadoCivilis) => boolean;
}

export const LOGROS_CIVIL: LogroCivil[] = [
  { id: "primer_caso", nombre: "Primera lección", desc: "Resuelve tu primer caso.", icono: "📖", check: (e) => e.casosResueltos.length >= 1 },
  { id: "diez_casos", nombre: "Estudiante aplicado", desc: "Resuelve 10 casos.", icono: "✍️", check: (e) => e.casosResueltos.length >= 10 },
  { id: "todos_casos", nombre: "Erudito de casos", desc: "Resuelve todos los casos del Reino.", icono: "🧠", check: (e) => e.casosResueltos.length >= CASOS_CIVIL.length },
  { id: "primer_jefe", nombre: "Primer trofeo", desc: "Vence a tu primer jefe de región.", icono: "⚔️", check: (e) => e.bossesDerrotados.length >= 1 },
  { id: "todos_jefes", nombre: "Azote de las facciones", desc: "Vence a los 8 jefes.", icono: "👑", check: (e) => e.bossesDerrotados.length >= BOSSES_CIVIL.length },
  { id: "codex_medio", nombre: "Bibliotecario", desc: "Desbloquea la mitad del Codex.", icono: "📚", check: (e) => e.codexDesbloqueado.length >= Math.ceil(CODEX_CIVIL.length / 2) },
  { id: "codex_full", nombre: "Codex Civilis completo", desc: "Desbloquea todo el Codex.", icono: "🏛️", check: (e) => e.codexDesbloqueado.length >= CODEX_CIVIL.length },
  { id: "cartas_full", nombre: "Coleccionista", desc: "Reúne todas las cartas de artículos.", icono: "🃏", check: (e) => e.cartasObtenidas.length >= CARTAS_CIVIL.length },
  { id: "examen", nombre: "Litigante titulado", desc: "Aprueba un examen oral de grado.", icono: "🎓", check: (e) => e.examenesAprobados.length >= 1 },
  { id: "tres_examenes", nombre: "A prueba de comisiones", desc: "Aprueba a Cabello, Montecinos y Silva.", icono: "⚖️", check: (e) => e.examenesAprobados.length >= 3 },
  { id: "primer_grado", nombre: "Ante la comisión", desc: "Rinde tu primer caso de grado.", icono: "🏅", check: (e) => e.casosGradoResueltos.length >= 1 },
  { id: "todos_grado", nombre: "Defensa integrada", desc: "Rinde todos los casos de grado.", icono: "🎖️", check: (e) => e.casosGradoResueltos.length >= CASOS_GRADO.length },
  { id: "regiones_full", nombre: "Señor del Reino", desc: "Completa las 8 regiones de combate.", icono: "🗺️", check: (e) => e.regionesCompletadas.length >= 8 },
  { id: "rico", nombre: "Arcas llenas", desc: "Acumula 500 de oro.", icono: "🪙", check: (e) => e.oro >= 500 },
];

export function logrosDesbloqueados(e: EstadoCivilis): string[] {
  return LOGROS_CIVIL.filter((l) => l.check(e)).map((l) => l.id);
}
