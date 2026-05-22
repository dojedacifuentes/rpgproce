// ============================================================================
// UNLOCK GATES — Progresión por nivel y logros desbloqueados
// Phase 6: Fog of war sobre módulos y bosses.
// ============================================================================

export interface UnlockGate {
  nivelMin?: number;       // nivel mínimo requerido
  logrosMin?: number;      // mínimo de logros desbloqueados
  bossesDefeated?: string[]; // bosses que deben estar derrotados (logro id)
  label: string;           // texto mostrado al jugador cuando está bloqueado
  hint?: string;           // pista visual adicional
}

// ─── MÓDULOS DE EXPANSIÓN ────────────────────────────────────────────────────

/**
 * Por defecto: todo desbloqueado excepto lo que aparece aquí.
 * Clave = id del módulo (type Modulo en expansion/page.tsx)
 */
export const MODULO_GATES: Record<string, UnlockGate> = {
  ejecutivo_full: {
    nivelMin: 2,
    label: "Nivel 2 requerido",
    hint: "Consigue 100 XP en cualquier modo para desbloquear",
  },
  ataque: {
    nivelMin: 2,
    label: "Nivel 2 requerido",
    hint: "Completa una sesión de Arcade para desbloquear",
  },
  investigacion: {
    nivelMin: 3,
    label: "Nivel 3 requerido",
    hint: "Acumula 200 XP — los casos más oscuros esperan",
  },
  duelo: {
    nivelMin: 3,
    label: "Nivel 3 requerido",
    hint: "200 XP — combate probatorio avanzado",
  },
  examen: {
    nivelMin: 5,
    label: "Nivel 5 requerido · Examen de grado",
    hint: "400 XP — el examen oral no perdona a los impacientes",
  },
};

// ─── BOSSES (INTERROGACIÓN ORAL) ─────────────────────────────────────────────

/**
 * Bosses siempre visibles (no en esta tabla): ministro_formalista, profesor_hostil, secretario_nihilista.
 * El resto se desbloquea progresivamente.
 */
export const BOSS_GATES: Record<string, UnlockGate> = {
  receptor_metafisico: {
    bossesDefeated: ["boss_ministro_formalista"],
    label: "Derrota al Ministro Formalista primero",
    hint: "El receptor no aparece hasta que demuestra algo",
  },
  relator_inadmisibilidades: {
    nivelMin: 2,
    label: "Nivel 2 — El relator espera en sala",
    hint: "Sube de nivel para que el relator te conceda audiencia",
  },
  abogado_rival_casacional: {
    nivelMin: 3,
    bossesDefeated: ["boss_profesor_hostil"],
    label: "Nivel 3 + Derrota al Profesor Hostil",
    hint: "El rival solo combate contra iguales",
  },
  // Bosses extra: mucho más escondidos
  jueza_suplente_disociada: {
    nivelMin: 4,
    logrosMin: 3,
    label: "Nivel 4 + 3 logros",
    hint: "La jueza suplente no recibe visitas sin credenciales",
  },
  funcionario_quemado: {
    nivelMin: 5,
    label: "Nivel 5 — Solo los persistentes llegan aquí",
    hint: "El funcionario está quemado pero disponible para los dignos",
  },
  maestro_sumario: {
    nivelMin: 6,
    logrosMin: 5,
    label: "Nivel 6 + 5 logros — Boss secreto",
    hint: "???",
  },
};

// ─── UTILIDADES ──────────────────────────────────────────────────────────────

/**
 * Verifica si un módulo está desbloqueado para el estado actual del jugador.
 */
export function isModuloUnlocked(
  moduloId: string,
  nivel: number,
  logros: string[],
): boolean {
  const gate = MODULO_GATES[moduloId];
  if (!gate) return true; // sin restricción = abierto
  if (gate.nivelMin && nivel < gate.nivelMin) return false;
  if (gate.logrosMin && logros.length < gate.logrosMin) return false;
  return true;
}

/**
 * Verifica si un boss está desbloqueado.
 * @param bossId ID del boss
 * @param nivel Nivel del jugador
 * @param logrosIds Array de IDs de logros desbloqueados
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
