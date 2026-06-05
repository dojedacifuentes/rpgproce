import type { CasoCivil, RegionCivilId } from "@/types/civilis";

// ============================================================================
// CIVILIS — Modo Examen Oral. Tres profesores, tres estilos de interrogación.
// El examen reutiliza el banco de casos del clasificador, pero los selecciona
// y presenta según el carácter de cada profesor.
// ============================================================================

export type ModoProfesor = "cabello" | "montecinos" | "silva";

export interface Profesor {
  id: ModoProfesor;
  nombre: string;
  titulo: string;
  icono: string;
  color: string;
  intro: string;
  estilo: string;
  saltos: string[]; // frases entre preguntas
  nPreguntas: number;
}

export const PROFESORES: Profesor[] = [
  {
    id: "cabello",
    nombre: "Profesor Cabello",
    titulo: "El que relaciona todo",
    icono: "🎩",
    color: "#e6a23c",
    intro: "No me interesa que recite. Quiero ver si entiende cómo se conecta el sistema. Empecemos… y no se acomode.",
    estilo: "Salta entre instituciones sin aviso: hipoteca, luego solidaridad, luego promesa.",
    saltos: [
      "Dejemos eso. Hábleme ahora de otra cosa.",
      "Cambiemos de materia, sin respirar.",
      "Bien. ¿Y esto otro?",
      "Olvide lo anterior. Concéntrese en esto.",
      "Salto a otra institución. Sígame.",
      "Relacione. Todo se toca.",
    ],
    nPreguntas: 8,
  },
  {
    id: "montecinos",
    nombre: "Profesora Montecinos",
    titulo: "La de los casos imposibles",
    icono: "🧩",
    color: "#a06cd5",
    intro: "Las definiciones no aprueban un grado. Le voy a dar casos. Resuélvalos.",
    estilo: "Solo casos complejos, de dificultad alta. Aplique, no recite.",
    saltos: [
      "Otro caso. Más difícil.",
      "Siga. Este tiene aristas.",
      "Resuelva este.",
      "Y ahora, aplique al hecho.",
      "Un caso más. No se confíe.",
    ],
    nPreguntas: 6,
  },
  {
    id: "silva",
    nombre: "Profesor Silva",
    titulo: "El de las trampas",
    icono: "🪤",
    color: "#c65b6e",
    intro: "Lea con cuidado. Me gusta esconder el error donde nadie mira.",
    estilo: "Distractores muy plausibles. Una palabra cambia toda la respuesta.",
    saltos: [
      "¿Seguro? Siga.",
      "Cuidado con la próxima.",
      "Aquí muchos caen.",
      "Lea dos veces.",
      "Esta tiene trampa.",
      "No se apresure.",
    ],
    nPreguntas: 8,
  },
];

export const getProfesor = (id: string) => PROFESORES.find((p) => p.id === id);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Construye el pool de casos del examen según el estilo del profesor.
 * Se ejecuta en cliente (tras pulsar "Comenzar"), así que usar Math.random
 * no provoca desajustes de hidratación.
 */
export function construirPool(profesor: Profesor, casos: CasoCivil[]): CasoCivil[] {
  if (profesor.id === "montecinos") {
    // casos complejos primero
    const ordenados = [...casos].sort((a, b) => b.dificultad - a.dificultad);
    const dificiles = ordenados.filter((c) => c.dificultad >= 2);
    const base = (dificiles.length >= profesor.nPreguntas ? dificiles : ordenados);
    return shuffle(base).slice(0, profesor.nPreguntas);
  }

  if (profesor.id === "cabello") {
    // uno por región (máxima cobertura), luego mezclar el orden (salta entre temas)
    const porRegion = new Map<RegionCivilId, CasoCivil[]>();
    for (const c of casos) {
      const arr = porRegion.get(c.region) ?? [];
      arr.push(c);
      porRegion.set(c.region, arr);
    }
    const elegidos: CasoCivil[] = [];
    for (const [, arr] of porRegion) {
      const r = shuffle(arr)[0];
      if (r) elegidos.push(r);
    }
    let pool = shuffle(elegidos);
    // completar si faltan
    if (pool.length < profesor.nPreguntas) {
      const resto = shuffle(casos.filter((c) => !pool.includes(c)));
      pool = pool.concat(resto);
    }
    return pool.slice(0, profesor.nPreguntas);
  }

  // silva: variado y mezclado (las trampas son los distractores)
  return shuffle(casos).slice(0, profesor.nPreguntas);
}

/** Veredicto del grado según el puntaje. */
export function veredicto(aciertos: number, total: number): { titulo: string; aprobado: boolean; color: string; nota: string } {
  const pct = total ? aciertos / total : 0;
  if (pct >= 0.85) return { titulo: "Aprobado con distinción máxima", aprobado: true, color: "#e6c14b", nota: "Licenciado en Leyes — Distinción" };
  if (pct >= 0.6) return { titulo: "Aprobado", aprobado: true, color: "#5fb37a", nota: "Licenciado en Leyes" };
  if (pct >= 0.4) return { titulo: "Reprobado por estrecho margen", aprobado: false, color: "#e6a23c", nota: "Vuelva el próximo período" };
  return { titulo: "Reprobado", aprobado: false, color: "#c65b6e", nota: "La comisión no quedó conforme" };
}
