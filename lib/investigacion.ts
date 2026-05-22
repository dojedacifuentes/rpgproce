/**
 * INVESTIGACIÓN — Utilidades para Casos Investigativos
 * Funciones para validar hipótesis, calcular relevancia, gestionar pistas
 */

import { CasoInvestigativo, Pista } from "@/data/casos-investigativos";

// ============================================================================
// VERIFICACIÓN DE HIPÓTESIS
// ============================================================================

/**
 * Verifica si una hipótesis puede ser seleccionada dado el conjunto
 * de pistas descubiertas por el jugador
 */
export function verificarHipótesis(
  hipId: number, // índice de hipótesis en array
  caso: CasoInvestigativo,
  pistasDescubiertas: Set<string>
): {
  puedeSeleccionar: boolean;
  pistasAltantes: string[];
  razon: string;
} {
  if (hipId < 0 || hipId >= caso.hipótesis.length) {
    return {
      puedeSeleccionar: false,
      pistasAltantes: [],
      razon: "Hipótesis inválida",
    };
  }

  const hip = caso.hipótesis[hipId];
  const pistasFaltantes = hip.pistas_requieren.filter(
    (pId) => !pistasDescubiertas.has(pId)
  );

  if (pistasFaltantes.length > 0) {
    const pistasTexto = pistasFaltantes
      .map((pId) => {
        const pista = caso.pistas.find((p) => p.id === pId);
        return pista ? pista.titulo : pId;
      })
      .join(", ");

    return {
      puedeSeleccionar: false,
      pistasAltantes: pistasFaltantes,
      razon: `Te falta información: ${pistasTexto}`,
    };
  }

  return {
    puedeSeleccionar: true,
    pistasAltantes: [],
    razon: "Tienes suficiente información para esta hipótesis",
  };
}

// ============================================================================
// CÁLCULO DE RELEVANCIA
// ============================================================================

/**
 * Calcula cuán relevante es una pista para una hipótesis dada
 * Retorna valor 0-100 indicando relevancia
 */
export function calcularRelevancia(
  pista: Pista,
  hipId: number,
  caso: CasoInvestigativo
): number {
  if (hipId < 0 || hipId >= caso.hipótesis.length) return 0;

  const hip = caso.hipótesis[hipId];

  // Si la pista es requerida para esta hipótesis, es muy relevante
  if (hip.pistas_requieren.includes(pista.id)) {
    return 100;
  }

  // Si la pista está conectada a otra que es requerida, es moderadamente relevante
  if (pista.conectadoA) {
    const conectadaARequerida = pista.conectadoA.some((id) =>
      hip.pistas_requieren.includes(id)
    );
    if (conectadaARequerida) {
      return 70;
    }
  }

  // Si la pista se conecta con el artículo clave de la solución, moderadamente relevante
  if (
    pista.articulos.some((art) =>
      caso.solucion.articuloClave.includes(art)
    )
  ) {
    return 60;
  }

  // Baja relevancia por defecto
  return 20;
}

// ============================================================================
// GESTIÓN DE PISTAS
// ============================================================================

/**
 * Obtiene todas las pistas que deberían estar descubiertas
 * al iniciar el caso (pistas iniciales)
 */
export function getPistasIniciales(caso: CasoInvestigativo): Pista[] {
  return caso.pistas.filter((p) => p.descubierta === true);
}

/**
 * Obtiene todas las pistas que el jugador aún no ha descubierto
 */
export function getPistasOcultas(
  caso: CasoInvestigativo,
  pistasDescubiertas: Set<string>
): Pista[] {
  return caso.pistas.filter(
    (p) => p.descubierta === false && !pistasDescubiertas.has(p.id)
  );
}

/**
 * Genera una pista aleatoria entre las ocultas
 * (para "exploración" en tablero)
 */
export function descubrirPistaAleatoria(
  caso: CasoInvestigativo,
  pistasDescubiertas: Set<string>
): Pista | null {
  const ocultas = getPistasOcultas(caso, pistasDescubiertas);
  if (ocultas.length === 0) return null;
  return ocultas[Math.floor(Math.random() * ocultas.length)];
}

/**
 * Obtiene todas las pistas conectadas a una pista dada
 */
export function getPistasConectadas(
  caso: CasoInvestigativo,
  pistaId: string
): Pista[] {
  const pista = caso.pistas.find((p) => p.id === pistaId);
  if (!pista || !pista.conectadoA) return [];

  return pista.conectadoA
    .map((id) => caso.pistas.find((p) => p.id === id))
    .filter((p) => p !== undefined) as Pista[];
}

// ============================================================================
// VALIDACIÓN Y SCORING
// ============================================================================

/**
 * Valida si la hipótesis seleccionada es la correcta
 */
export function validarRespuesta(
  hipId: number,
  caso: CasoInvestigativo
): {
  esCorrecta: boolean;
  explicacion: string;
  articuloClave: string;
} {
  if (hipId < 0 || hipId >= caso.hipótesis.length) {
    return {
      esCorrecta: false,
      explicacion: "Hipótesis inválida",
      articuloClave: "",
    };
  }

  const hip = caso.hipótesis[hipId];
  return {
    esCorrecta: hip.es_correcta,
    explicacion: hip.explicacion,
    articuloClave: caso.solucion.articuloClave,
  };
}

/**
 * Calcula score en base a:
 * - Si hipótesis es correcta
 * - Cuántas pistas se usaron vs cuántas estaban disponibles
 * - Tiempo (si se proporciona)
 */
export function calcularScore(
  esCorrecta: boolean,
  pistasUsadas: Set<string>,
  caso: CasoInvestigativo,
  tiempoSegundos?: number
): number {
  let score = 0;

  // Base score por corrección
  if (esCorrecta) {
    score = 80; // 80 base si es correcta
  } else {
    score = 20; // 20 base si es incorrecta
  }

  // Bonus por eficiencia (usar solo las pistas necesarias)
  const hipCorrecta = caso.hipótesis.find((h) => h.es_correcta)!;
  const pistasNecesarias = hipCorrecta.pistas_requieren.length;
  const eficiencia = pistasNecesarias / caso.pistas.length;
  score += Math.round(eficiencia * 20);

  // Bonus por tiempo (si está disponible)
  if (tiempoSegundos) {
    const tiempoMinutos = tiempoSegundos / 60;
    const tiempoBonus = Math.max(0, 10 - tiempoMinutos); // Hasta 10 puntos
    score += Math.round(tiempoBonus);
  }

  return Math.min(100, score); // Máximo 100
}

// ============================================================================
// CONSECUENCIAS
// ============================================================================

/**
 * Determina el tipo de consecuencias a aplicar al game state
 */
export function determinarConsecuencias(
  esCorrecta: boolean,
  caso: CasoInvestigativo
) {
  if (esCorrecta) {
    return {
      reputacion: 20,
      conocimientoProcedural: 10,
      trauma: 0,
      desbloqueoLogro: `caso_${caso.id}`,
    };
  } else {
    return {
      reputacion: -5,
      conocimientoProcedural: 5, // Aún aprende algo
      trauma: 10,
      desbloqueoLogro: `caso_${caso.id}_investigar_mas`,
    };
  }
}

/**
 * Genera feedback narrativo basado en resultado
 */
export function generarNarrativaResultado(
  esCorrecta: boolean,
  caso: CasoInvestigativo
): string {
  if (esCorrecta) {
    return `El expediente 38 cierra. Tu deducción fue impecable. El vicio procesal que otros pasaron por alto ahora brilla inequívocamente en los autos. La Corte no tendrá más remedio que acoger tu casación.`;
  } else {
    return `El expediente 38 permanece cerrado. Tu hipótesis no sostuvo. Alguien más deberá volver a investigar. El viaje por los autos fue instructivo, pero insuficiente.`;
  }
}
