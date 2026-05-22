// ============================================================================
// TIPOS DE EXPANSIÓN v2.0 — Sistemas nuevos sin romper el core
// ============================================================================

// ============== EXPEDIENTE VIVO ==============
// El expediente se degrada con cada error. Visualizado como glitch/corrupción.
export type VicioProcesal = {
  id: string;
  tipo:
    | "notificacion_defectuosa"     // art. 44/55 mal aplicado
    | "emplazamiento_omitido"       // art. 768 N°9
    | "escrito_extemporaneo"        // preclusión
    | "recurso_improcedente"        // recurso mal elegido
    | "ultra_petita"                // art. 768 N°4
    | "incompetencia_no_alegada"    // prórroga tácita
    | "omision_170"                 // falta de requisitos art. 170
    | "patrocinio_omitido"          // Ley 18.120
    | "personeria_defectuosa"       // 303 N°2
    | "ineptitud_libelo"            // 303 N°4
    | "litispendencia"              // 303 N°3
    | "falta_autorizacion_funcionario"; // 76 inc. 2°
  descripcion: string;
  articulo: string;
  gravedad: "leve" | "grave" | "letal";
  detectado: boolean; // ¿el jugador lo detectó o pasó desapercibido?
  habilitaCasacion: boolean; // ¿puede fundar casación en la forma?
  fecha: number;
};

// ============== PRECLUSIÓN ==============
export type PlazoFatal = {
  id: string;
  nombre: string;
  diasHabiles: number;     // plazo legal
  segundosRestantes: number; // simulación gameplay
  articulo: string;
  consecuenciaSiPrecluye: string;
  precluido: boolean;
  cumplido: boolean;
};

// ============== BUILDS / ESPECIALIZACIONES ==============
export type Build =
  | "litigante_agresivo"
  | "monstruo_casacional"
  | "formalista_extremo"
  | "estratega_cautelar"
  | "operador_practico"
  | "doctrinario";

export type BuildInfo = {
  id: Build;
  nombre: string;
  descripcion: string;
  modificadores: {
    conocimiento_procesal?: number;
    persuasion_forense?: number;
    diligencia?: number;
    rigor_formal?: number;
    estrategia?: number;
    resistencia_psicologica?: number;
  };
  ventajaPasiva: string;       // efecto siempre activo
  desventaja: string;          // costo de la build
  desbloqueaRecursos?: string[]; // recursos especiales accesibles
};

// ============== TRAUMAS JURÍDICOS ==============
export type TraumaJuridico = {
  id: string;
  titulo: string;       // p.ej. "Apelaste un decreto"
  descripcion: string;  // humor negro
  articulo: string;
  debuff: {
    atributo: "conocimiento_procesal" | "persuasion_forense" | "diligencia" | "rigor_formal" | "estrategia" | "resistencia_psicologica";
    delta: number;
    turnosRestantes: number;
  };
  activo: boolean;
};

// ============== MODO INTERROGACIÓN ORAL ==============
export type AtaqueBoss = {
  pregunta: string;
  tipo: "directa" | "puente" | "trampa" | "repregunta" | "derivacion";
  opciones: { texto: string; correcta: boolean; explicacion: string; art: string }[];
  articuloEsperado?: string;
  conceptoEsperado?: string;
  cadenaSi_acierta?: string; // ID de siguiente ataque si acierta
  cadenaSi_falla?: string;
  damage: number; // daño a salud mental del jugador si falla
};

export type BossId =
  | "ministro_formalista"
  | "profesor_hostil"
  | "secretario_nihilista"
  | "receptor_metafisico"
  | "relator_inadmisibilidades"
  | "abogado_rival_casacional";

export type Boss = {
  id: BossId;
  nombre: string;
  arquetipo: string;
  descripcion: string;
  ambientacion: string;
  saludInicial: number;        // resistencia ante respuestas correctas
  saludJugador: number;        // pool de salud mental jugador
  ataques: AtaqueBoss[];       // patrón de ataque
  derrotadoOtorga: string;     // qué desbloquea
  rama: "competencia" | "recursos" | "ejecutivo" | "prueba" | "discusion" | "notificaciones";
};

// ============== ESTADO DE LA EXPANSIÓN ==============
export type EstadoExpansion = {
  saludProcesal: number;        // 0-100, salud del expediente activo
  vicios: VicioProcesal[];      // acumulados en expediente activo
  plazosActivos: PlazoFatal[];  // timers en curso
  build?: Build;                 // build seleccionada por el jugador
  traumas: TraumaJuridico[];    // debuffs activos
  bossesDerrotados: BossId[];    // jefes vencidos
  inhibitoriaDeclinatoriaJugado: boolean;
  saludMentalGlobal: number;    // 0-100, separada de "trauma" del core
  prestigioTribunalicio: number; // 0-100
  fatigaMental: number;          // 0-100, crece con escritos largos
  concentracion: number;         // 0-100, decrece con interrupciones
  memoriaJuridica: number;       // 0-100, base de respuestas correctas en oral
};

export const ESTADO_EXPANSION_INICIAL: EstadoExpansion = {
  saludProcesal: 100,
  vicios: [],
  plazosActivos: [],
  build: undefined,
  traumas: [],
  bossesDerrotados: [],
  inhibitoriaDeclinatoriaJugado: false,
  saludMentalGlobal: 100,
  prestigioTribunalicio: 0,
  fatigaMental: 0,
  concentracion: 100,
  memoriaJuridica: 50,
};
