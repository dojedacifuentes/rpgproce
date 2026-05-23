// ============================================================================
// UNLOCK GATES — v2.1: libre acceso al contenido educativo
// Filosofía: cualquier módulo de ESTUDIO está abierto desde nivel 1.
// Solo quedan pequeños requisitos para jefes secretos y contenido bonus.
// ============================================================================

export interface UnlockGate {
  nivelMin?: number;       // nivel mínimo requerido
  logrosMin?: number;      // mínimo de logros desbloqueados
  bossesDefeated?: string[]; // bosses que deben estar derrotados (logro id)
  label: string;           // texto mostrado al jugador cuando está bloqueado
  hint?: string;           // pista visual adicional
}

// ─── MÓDULOS DE EXPANSIÓN ────────────────────────────────────────────────────
// Por defecto: todo desbloqueado. Solo el modo "pesadilla" (si existiera) lo estaría.
// Ningún módulo educativo requiere nivel — cualquier jugador puede estudiar todo.
export const MODULO_GATES: Record<string, UnlockGate> = {};

// ─── BOSSES (INTERROGACIÓN ORAL) ─────────────────────────────────────────────
// Bosses base: siempre visibles.
// Bosses extra secretos: se desbloquean derrotando a algún jefe previo.
// NO se bloquean por nivel — solo por lógica narrativa.
export const BOSS_GATES: Record<string, UnlockGate> = {
  // El receptor aparece después del ministro (lógica: relación procesal)
  receptor_metafisico: {
    bossesDefeated: ["boss_ministro_formalista"],
    label: "Derrota al Ministro Formalista primero",
    hint: "El receptor no aparece hasta que alguien lo convoca",
  },
  // El abogado rival solo combate si el profesor ya fue vencido
  abogado_rival_casacional: {
    bossesDefeated: ["boss_profesor_hostil"],
    label: "Derrota al Profesor Hostil primero",
    hint: "El rival espera a quien ya probó algo",
  },
  // Bosses extra: desbloqueados con 2 victorias acumuladas
  jueza_suplente_disociada: {
    logrosMin: 2,
    label: "2 logros requeridos — La jueza espera",
    hint: "Derrota a 2 instancias para acceder a la jueza suplente",
  },
  funcionario_quemado: {
    logrosMin: 3,
    label: "3 logros requeridos",
    hint: "El funcionario solo atiende a quienes ya lo han intentado varias veces",
  },
  maestro_sumario: {
    logrosMin: 5,
    label: "5 logros — Boss secreto",
    hint: "???",
  },
};

// ─── UTILIDADES ──────────────────────────────────────────────────────────────

/**
 * Verifica si un módulo está desbloqueado para el estado actual del jugador.
 * Con las nuevas gates vacías, siempre retorna true para módulos educativos.
 */
export function isModuloUnlocked(
  moduloId: string,
  nivel: number,
  logros: string[],
): boolean {
  const gate = MODULO_GATES[moduloId];
  if (!gate) return true;
  if (gate.nivelMin && nivel < gate.nivelMin) return false;
  if (gate.logrosMin && logros.length < gate.logrosMin) return false;
  return true;
}

/**
 * Verifica si un boss está desbloqueado.
 */
export function isBossUnlocked(
  bossId: string,
  nivel: number,
  logrosIds: string[],
): boolean {
  const gate = BOSS_GATES[bossId];
  if (!gate) return true; // boss base = siempre visible
  if (gate.nivelMin && nivel < gate.nivelMin) return false;
  if (gate.logrosMin && logrosIds.length < gate.logrosMin) return false;
  if (gate.bossesDefeated) {
    const allDefeated = gate.bossesDefeated.every((logId) => logrosIds.includes(logId));
    if (!allDefeated) return false;
  }
  return true;
}

/**
 * Devuelve el gate de un módulo (o null si no hay restricción).
 */
export function getModuloGate(moduloId: string): UnlockGate | null {
  return MODULO_GATES[moduloId] ?? null;
}

/**
 * Devuelve el gate de un boss (o null si no hay restricción).
 */
export function getBossGate(bossId: string): UnlockGate | null {
  return BOSS_GATES[bossId] ?? null;
}
