/**
 * MISIONES NPC - Mapeo de actividades por NPC
 *
 * Conecta arcos NPC a casos investigativos, preguntas arcade, etc.
 * Cuando un NPC tiene una actividad, este módulo sabe cuál es.
 */

import { CASOS_INVESTIGATIVOS } from "@/data/casos-investigativos";
import { PREGUNTAS_EXAMEN } from "@/data/examen-extendido";

// ============================================================================
// MAPEOS INVESTIGATIVOS
// ============================================================================

/**
 * Devuelve qué caso investigativo corresponde a cada etapa de un NPC
 */
export const getCasoParaNpc = (npcId: string, etapa: number): string | null => {
  const mapeo: Record<string, string[]> = {
    // Dra. Noemí: especialista en competencia
    "dra_noemi": [
      "inv_007", // competencia absoluta
      "inv_007", // competencia relativa
      "inv_007", // conflicto de competencia
    ],
    // Juez Silva: experto en recursos y sentencias
    "juez_silva": [
      "inv_001", // emplazamiento fantasma (recursos)
      "inv_002", // sentencia ultra petita
      "inv_005", // cosa juzgada aparente
    ],
    // Receptor Castro: especialista en notificaciones
    "receptor_castro": [
      "inv_001", // emplazamiento fantasma (notificación fallida)
      "inv_001", // cédula vs estado diario
      "inv_003", // preclusión por notificación defectuosa
    ],
    // Lic. Neruda: derecho sustantivo a procesal
    "lic_neruda": [
      "inv_002", // sentencia ultra petita (demanda vs condena)
      "inv_004", // embargo sin fundamento
      "inv_005", // cosa juzgada aparente
    ],
    // Escribana Gloria: sistemas de documentación
    "escribana_gloria": [
      "inv_001", // emplazamiento (documentación)
      "inv_003", // preclusión (trámite)
      "inv_006", // tercería no interpuesta (plazo)
    ],
    // Prof. Torres: doctrina y jurisprudencia
    "prof_torres": [
      "inv_002", // sentencia ultra petita (doctrina)
      "inv_005", // cosa juzgada aparente (doctrina)
      "inv_003", // preclusión oculta (doctrina)
    ],
    // Fiscal Mendoza: acción penal y procesal
    "fiscal_mendoza": [
      "inv_004", // embargo sin fundamento
      "inv_006", // tercería no interpuesta
      "inv_002", // sentencia ultra petita
    ],
    // Paralegal Diego: gestión procesal práctica
    "paralegal_diego": [
      "inv_003", // preclusión oculta
      "inv_006", // tercería no interpuesta
      "inv_004", // embargo sin fundamento
    ],
    // Secretaria Patricia: sistemas y trámites
    "secretaria_patricia": [
      "inv_001", // emplazamiento (trámite)
      "inv_003", // preclusión (timing)
      "inv_006", // tercería (plazo fatal)
    ],
    // Juez Supremo Araya: casación y nulidad
    "juez_supremo_araya": [
      "inv_002", // sentencia ultra petita (casación)
      "inv_005", // cosa juzgada aparente
      "inv_004", // embargo sin fundamento (casación)
    ],
  };

  const casos = mapeo[npcId];
  if (!casos) return null;

  const casoId = casos[Math.max(0, Math.min(2, etapa - 1))];
  return casoId || null;
};

/**
 * Devuelve el caso investigativo completo para un NPC y etapa
 */
export const obtenerCasoInvestigativoParaNpc = (npcId: string, etapa: number) => {
  const casoId = getCasoParaNpc(npcId, etapa);
  if (!casoId) return null;
  return CASOS_INVESTIGATIVOS.find((c) => c.id === casoId) || null;
};

// ============================================================================
// MAPEOS ARCADE
// ============================================================================

/**
 * Devuelve preguntas de arcade filtradas por tema relevante al NPC
 */
export const getPreguntasArcadeParaNpc = (npcId: string, etapa: number) => {
  const temas: Record<string, string[]> = {
    "dra_noemi": ["competencia", "jurisdiccion"],
    "juez_silva": ["recursos", "sentencia", "cosa_juzgada"],
    "receptor_castro": ["notificacion", "emplazamiento", "plazos"],
    "lic_neruda": ["accion_pretension", "demanda"],
    "escribana_gloria": ["notificacion", "escritos"],
    "prof_torres": ["jurisprudencia", "doctrina"],
    "fiscal_mendoza": ["recursos", "casacion"],
    "paralegal_diego": ["plazos", "procedimiento"],
    "secretaria_patricia": ["plazos", "notificacion"],
    "juez_supremo_araya": ["casacion", "nulidad", "recursos"],
  };

  const temasDeLista = temas[npcId] || [];
  if (temasDeLista.length === 0) return [];

  // Filtrar preguntas que matcheen los temas (en un caso real, habría categorización en PREGUNTAS)
  // Por ahora, devolver primeras N preguntas
  return PREGUNTAS_EXAMEN.slice(0, Math.min(5, PREGUNTAS_EXAMEN.length));
};

// ============================================================================
// EFECTOS Y CONSECUENCIAS
// ============================================================================

/**
 * Aplica efectos de etapa completada
 */
export const getEfectosEtapaNpc = (npcId: string, etapa: number, exitoso: boolean) => {
  const efectosBase = {
    reputacion: exitoso ? 15 : -5,
    trauma: exitoso ? 0 : 5,
    conocimiento: exitoso ? 10 : 0,
  };

  // Ajustes específicos por NPC
  const ajustes: Record<string, Partial<typeof efectosBase>> = {
    "dra_noemi": { conocimiento: 15 }, // experta enseña mejor
    "juez_silva": { reputacion: 20 }, // magistrado da más reputación
    "prof_torres": { conocimiento: 20 }, // académica enseña mucho
  };

  return {
    ...efectosBase,
    ...ajustes[npcId],
  };
};

/**
 * Aplica efectos del desafío final completado
 */
export const getEfectosDesafioFinalNpc = (npcId: string, exitoso: boolean) => {
  const efectosBase = {
    reputacion: exitoso ? 30 : -10,
    trauma: exitoso ? 0 : 15,
    conocimiento: exitoso ? 5 : 0,
    skills: exitoso ? [`especialista_${npcId}`] : [],
  };

  return efectosBase;
};

// ============================================================================
// DIÁLOGOS
// ============================================================================

/**
 * Devuelve diálogo contextual para un NPC según estado
 */
export const getDialogoNpc = (
  npcId: string,
  estado: "no_iniciada" | "en_progreso" | "etapa_1" | "etapa_2" | "etapa_3" | "desafio_final" | "completada" | "fallida"
): string => {
  const dialogos: Record<string, Record<typeof estado, string>> = {
    "dra_noemi": {
      no_iniciada: "¿Quieres aprender sobre competencia territorial? Tengo un arco de 3 etapas para ti.",
      en_progreso: "Sigue adelante. El conocimiento requiere paciencia.",
      etapa_1: "Fundamentos: competencia absoluta vs relativa. Art. 45-133 COT.",
      etapa_2: "Ahora los conflictos: inhibitoria y declinatoria. Arts. 101-112.",
      etapa_3: "Casos prácticos. Reconstruye procedimientos reales.",
      desafio_final: "Tu desafío: resolver un conflicto de competencia real. Demuestra lo que aprendiste.",
      completada: "Excelente. Eres ahora especialista en competencia territorial.",
      fallida: "No era lo esperado. ¿Otra oportunidad?",
    },
    "juez_silva": {
      no_iniciada: "Soy Juez Silva. Si quieres aprender sobre recursos y sentencias, tengo trabajo para ti.",
      en_progreso: "Bien. Sigue con el siguiente nivel.",
      etapa_1: "Etapa 1: Recursos ordinarios. Apelación, reposición, aclaración.",
      etapa_2: "Etapa 2: Recursos extraordinarios. Casación en forma y fondo.",
      etapa_3: "Etapa 3: Jurisprudencia cambia todo. Cas. fondo puede revisar hechos.",
      desafio_final: "Desafío final: interpreta una sentencia con vicio oculto. ¿Lo verás?",
      completada: "Eres digno de la toga ahora.",
      fallida: "El sistema no perdona errores. Reinténtalo.",
    },
    "prof_torres": {
      no_iniciada: "Soy Prof. Torres. ¿Te interesa la doctrina real detrás del código?",
      en_progreso: "Excelente. La academia requiere rigor.",
      etapa_1: "Doctrina: la cosa juzgada es cosa juzgada porque lo dicen los autores.",
      etapa_2: "Jurisprudencia: la Corte decide qué es cosa juzgada, más allá del CPC.",
      etapa_3: "Síntesis: cuando doctrina y jurisprudencia chocan, ¿quién gana?",
      desafio_final: "Caso doctrinal: reconstruye el razonamiento de una sentencia paradigmática.",
      completada: "Ahora entiendes la verdad detrás del código.",
      fallida: "La doctrina es inmisericorde. Otro intento.",
    },
  };

  return dialogos[npcId]?.[estado] || "...";
};

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Valida si un NPC puede ser iniciado (dependencias satisfechas)
 */
export const puedeIniciarNpc = (
  npcId: string,
  npcesCompletados: string[],
  dependencias: Record<string, string[]>
): boolean => {
  const deps = dependencias[npcId] || [];
  return deps.every((dep) => npcesCompletados.includes(dep));
};
