/**
 * CAMPAIGN — 7 Actos del Juicio Ordinario
 * Estructura narrativa que conecta todos los sistemas del juego
 */

export type TipoMision =
  | "investigacion"
  | "arcade"
  | "boss"
  | "npc"
  | "puzzle"
  | "dialogo"
  | "examen"
  | "ejecutivo";

export interface Mision {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoMision;
  zona: string;
  dificultad: 1 | 2 | 3;
  recompensa: { xp: number; monedas: number; articulo?: string; skill?: string };
  href?: string; // si tiene ruta directa
  moduloId?: string; // id de módulo en expansion
}

export interface Boss {
  id: string;
  nombre: string;
  titulo: string;
  articulo: string;
  descripcion: string;
  icono: string;
  color: string;
  vidaMax: number;
  ataques: string[];
  debilidad: string;
  recompensa: { xp: number; monedas: number; skill: string };
  href: string;
}

export interface Acto {
  numero: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  zona: string;
  misiones: Mision[];
  bossId: string;
  desbloqueadoDesde?: string; // acto previo requerido
}

// ============================================================================
// BOSSES
// ============================================================================

export const BOSSES: Record<string, Boss> = {
  receptor_fantasma: {
    id: "receptor_fantasma",
    nombre: "El Receptor Fantasma",
    titulo: "Guardián de las Notificaciones Defectuosas",
    articulo: "art. 44 CPC",
    descripcion: "Una entidad que opera en la sombra, realizando notificaciones inválidas que el sistema acepta sin cuestionar.",
    icono: "👻",
    color: "var(--zona-notificaciones)",
    vidaMax: 100,
    ataques: ["Notificación por Estado Diario sin intentos", "Cédula en domicilio incorrecto", "Nulidad retroactiva del expediente"],
    debilidad: "art. 44 CPC: dos intentos fallidos previos a publicación",
    recompensa: { xp: 200, monedas: 50, skill: "Escudo del art. 44" },
    href: "/oral",
  },
  esfinge_competencia: {
    id: "esfinge_competencia",
    nombre: "La Esfinge de la Competencia",
    titulo: "Guardiana de la Competencia Absoluta y Relativa",
    articulo: "arts. 45-133 COT",
    descripcion: "Una esfinge de piedra que bloquea el acceso al tribunal. Para pasar, debes clasificar la competencia correctamente.",
    icono: "🗿",
    color: "var(--zona-competencia)",
    vidaMax: 120,
    ataques: ["Confusión de fueros", "Trampa de cuantía", "Nulidad por incompetencia absoluta"],
    debilidad: "Distinguir competencia absoluta de relativa",
    recompensa: { xp: 250, monedas: 60, skill: "Maestro de Competencia" },
    href: "/oral",
  },
  leviatan_ejecutivo: {
    id: "leviatan_ejecutivo",
    nombre: "El Leviatán Ejecutivo",
    titulo: "Bestia de la Ejecución Forzada",
    articulo: "arts. 434-478 CPC",
    descripcion: "Un coloso mecánico que representa la coerción del Estado en el juicio ejecutivo.",
    icono: "🐉",
    color: "var(--zona-ejecutivo)",
    vidaMax: 180,
    ataques: ["Embargo de bienes inembargables", "Mandamiento sin título", "Excepción extemporánea"],
    debilidad: "Excepciones tasadas del art. 464",
    recompensa: { xp: 350, monedas: 80, skill: "Arquitecto del Ejecutivo" },
    href: "/oral",
  },
  juez_hierro: {
    id: "juez_hierro",
    nombre: "El Juez de Hierro",
    titulo: "Árbitro de la Cosa Juzgada",
    articulo: "arts. 158-170 CPC",
    descripcion: "Un juez robot que dicta sentencias perfectas. Para vencerlo, debes encontrar el vicio de forma o fondo.",
    icono: "🤖",
    color: "var(--zona-cosajuzgada)",
    vidaMax: 200,
    ataques: ["Cosa juzgada inexpugnable", "Ultra petita enmascarada", "Casación en fondo improcedente"],
    debilidad: "art. 768: causales de casación en la forma",
    recompensa: { xp: 400, monedas: 100, skill: "Cassation Master" },
    href: "/oral",
  },
  comision_grado: {
    id: "comision_grado",
    nombre: "La Comisión del Grado",
    titulo: "Boss Final — Examen Oral de Grado",
    articulo: "CPC + COT + CPR",
    descripcion: "Tres profesores implacables que te someterán a cadenas de preguntas, contra-preguntas y trampas doctrinales.",
    icono: "👨‍⚖️",
    color: "var(--zona-oralidad)",
    vidaMax: 300,
    ataques: ["Pregunta sin respuesta correcta", "Contra-pregunta doctrinal", "Trampa de jurisprudencia"],
    debilidad: "Conocimiento integrado del procedimiento civil",
    recompensa: { xp: 1000, monedas: 500, skill: "Licenciado en Leyes" },
    href: "/oral",
  },
};

// ============================================================================
// CAMPAÑA — 7 ACTOS
// ============================================================================

export const CAMPAÑA: Acto[] = [
  {
    numero: 1,
    titulo: "INICIACIÓN PROCESAL",
    subtitulo: "El Primer Archivo",
    descripcion: "Llegas a la Ciudad Judicial por primera vez. Un expediente sin título yace en el archivo. Debes entender la jurisdicción antes de mover un papel.",
    zona: "jurisdiccion",
    bossId: "esfinge_competencia",
    misiones: [
      {
        id: "m1_1",
        titulo: "El Origen de la Jurisdicción",
        descripcion: "La Dra. Noemí te explica art. 76 CPR. ¿Qué es jurisdicción realmente?",
        tipo: "npc",
        zona: "jurisdiccion",
        dificultad: 1,
        recompensa: { xp: 30, monedas: 10 },
        moduloId: "npcs",
      },
      {
        id: "m1_2",
        titulo: "Clasificar el Tribunal",
        descripcion: "Clasifica 10 casos según tribunal competente. Arts. 45-133 COT.",
        tipo: "arcade",
        zona: "competencia",
        dificultad: 1,
        recompensa: { xp: 50, monedas: 15, articulo: "art. 45 COT" },
        moduloId: "arcade",
      },
      {
        id: "m1_3",
        titulo: "El Primer Vicio",
        descripcion: "Un expediente llegó con incompetencia absoluta. Descúbrelo.",
        tipo: "investigacion",
        zona: "competencia",
        dificultad: 2,
        recompensa: { xp: 80, monedas: 25, skill: "Detector de Vicios" },
        moduloId: "investigacion",
      },
    ],
  },
  {
    numero: 2,
    titulo: "NOTIFICACIONES Y EMPLAZAMIENTO",
    subtitulo: "El Receptor Maldito",
    descripcion: "Un receptor inescrupuloso opera en la Ciudad. Sus notificaciones son inválidas pero nadie las cuestiona. Debes exponerlo.",
    zona: "emplazamiento",
    bossId: "receptor_fantasma",
    misiones: [
      {
        id: "m2_1",
        titulo: "El Expediente 38",
        descripcion: "Un demandado afirma que nunca fue notificado. ¿Tiene razón?",
        tipo: "investigacion",
        zona: "notificaciones",
        dificultad: 2,
        recompensa: { xp: 100, monedas: 30, articulo: "art. 44 CPC" },
        moduloId: "investigacion",
      },
      {
        id: "m2_2",
        titulo: "Tipos de Notificación",
        descripcion: "Velocidad máxima. Clasifica 8 notificaciones en 60 segundos.",
        tipo: "arcade",
        zona: "notificaciones",
        dificultad: 1,
        recompensa: { xp: 60, monedas: 20 },
        moduloId: "arcade",
      },
      {
        id: "m2_3",
        titulo: "El Plazo Fatal",
        descripcion: "15 días para contestar. El timer corre. No te precluyas.",
        tipo: "puzzle",
        zona: "emplazamiento",
        dificultad: 2,
        recompensa: { xp: 70, monedas: 20 },
        href: "/expansion",
        moduloId: "preclusion",
      },
    ],
  },
  {
    numero: 3,
    titulo: "PRUEBA Y CARGA PROBATORIA",
    subtitulo: "La Sala del Tribunal de Prueba",
    descripcion: "El período de prueba ha comenzado. Debes seleccionar los medios correctos, presentarlos en plazo y valorarlos según la ley.",
    zona: "prueba",
    bossId: "receptor_fantasma",
    misiones: [
      {
        id: "m3_1",
        titulo: "Los 6 Medios",
        descripcion: "Elige el medio de prueba correcto para cada situación procesal.",
        tipo: "arcade",
        zona: "prueba",
        dificultad: 1,
        recompensa: { xp: 60, monedas: 20 },
        moduloId: "duelo",
      },
      {
        id: "m3_2",
        titulo: "Preclusión Oculta",
        descripcion: "La contraparte alega que tu prueba fue presentada tarde. ¿Lo era?",
        tipo: "investigacion",
        zona: "prueba",
        dificultad: 3,
        recompensa: { xp: 120, monedas: 35, articulo: "art. 326 CPC" },
        moduloId: "investigacion",
      },
      {
        id: "m3_3",
        titulo: "El Orden del Juicio",
        descripcion: "Reconstruye la cronología del juicio ordinario completo.",
        tipo: "puzzle",
        zona: "prueba",
        dificultad: 2,
        recompensa: { xp: 80, monedas: 25 },
        href: "/expansion",
        moduloId: "timeline",
      },
    ],
  },
  {
    numero: 4,
    titulo: "SENTENCIA",
    subtitulo: "El Dictamen Final",
    descripcion: "La sentencia cayó. Pero hay algo en ella que no cuadra. Un vicio de forma acecha en las 50 páginas del fallo.",
    zona: "sentencia",
    bossId: "juez_hierro",
    misiones: [
      {
        id: "m4_1",
        titulo: "La Sentencia Ultra Petita",
        descripcion: "El juez condenó por el doble de lo demandado. Descúbrelo.",
        tipo: "investigacion",
        zona: "sentencia",
        dificultad: 2,
        recompensa: { xp: 100, monedas: 30, articulo: "art. 768 N°4 CPC" },
        moduloId: "investigacion",
      },
      {
        id: "m4_2",
        titulo: "Requisitos de la Sentencia",
        descripcion: "El art. 170 exige menciones específicas. ¿Las tiene esta?",
        tipo: "arcade",
        zona: "sentencia",
        dificultad: 2,
        recompensa: { xp: 70, monedas: 20 },
        moduloId: "examen",
      },
      {
        id: "m4_3",
        titulo: "El Horror del Estrado",
        descripcion: "Espera el dictamen. Resiste. La sentencia llega.",
        tipo: "puzzle",
        zona: "sentencia",
        dificultad: 2,
        recompensa: { xp: 80, monedas: 25 },
        href: "/expansion",
        moduloId: "sentencia",
      },
    ],
  },
  {
    numero: 5,
    titulo: "RECURSOS",
    subtitulo: "La Corte de Apelaciones",
    descripcion: "Subes a la Corte. Aquí los recursos son armas y las causales son escudos. Un error de forma te devuelve al origen.",
    zona: "recursos",
    bossId: "juez_hierro",
    misiones: [
      {
        id: "m5_1",
        titulo: "El Recurso Correcto",
        descripcion: "4 resoluciones diferentes. ¿Qué recurso procede en cada una?",
        tipo: "arcade",
        zona: "recursos",
        dificultad: 2,
        recompensa: { xp: 80, monedas: 25 },
        moduloId: "arcade",
      },
      {
        id: "m5_2",
        titulo: "Casación de Forma — El Vicio del 768",
        descripcion: "Una sentencia tiene 3 vicios. Encuéntralos todos.",
        tipo: "investigacion",
        zona: "recursos",
        dificultad: 3,
        recompensa: { xp: 150, monedas: 40, articulo: "art. 768 CPC", skill: "Maestro del 768" },
        moduloId: "investigacion",
      },
      {
        id: "m5_3",
        titulo: "El Plazo del Recurso",
        descripcion: "5 días para casación. ¿Vence hoy o mañana? Los feriados complican.",
        tipo: "puzzle",
        zona: "recursos",
        dificultad: 2,
        recompensa: { xp: 60, monedas: 15 },
        moduloId: "arcade",
      },
    ],
  },
  {
    numero: 6,
    titulo: "JUICIO EJECUTIVO",
    subtitulo: "El Leviatán de la Coerción",
    descripcion: "La sentencia se ejecuta. El mandamiento fue despachado. El deudor resiste. Las excepciones tasadas son tu último escudo.",
    zona: "juicio_ejecutivo",
    bossId: "leviatan_ejecutivo",
    misiones: [
      {
        id: "m6_1",
        titulo: "El Título Ejecutivo",
        descripcion: "¿Es título ejecutivo? Clasifica 8 documentos según art. 434.",
        tipo: "arcade",
        zona: "ejecutivo",
        dificultad: 2,
        recompensa: { xp: 80, monedas: 25 },
        moduloId: "ejecutivo_full",
      },
      {
        id: "m6_2",
        titulo: "Embargo Sin Fundamento",
        descripcion: "El receptor embargó bienes inembargables. Descúbrelo y recurre.",
        tipo: "investigacion",
        zona: "ejecutivo",
        dificultad: 3,
        recompensa: { xp: 130, monedas: 35, articulo: "art. 445 CPC" },
        moduloId: "investigacion",
      },
      {
        id: "m6_3",
        titulo: "Campaña Ejecutiva Completa",
        descripcion: "Del título al remate. 10 etapas. Un solo error y pierdes.",
        tipo: "ejecutivo",
        zona: "ejecutivo",
        dificultad: 3,
        recompensa: { xp: 200, monedas: 50, skill: "Arquitecto del Ejecutivo" },
        href: "/expansion",
        moduloId: "ejecutivo_full",
      },
    ],
  },
  {
    numero: 7,
    titulo: "BOSS FINAL — EXAMEN DE GRADO",
    subtitulo: "La Comisión Implacable",
    descripcion: "Llegaste al final. La comisión examinadora te espera. Tres profesores con preguntas que destruyen certezas. Tu conocimiento acumulado es tu única arma.",
    zona: "examen",
    bossId: "comision_grado",
    misiones: [
      {
        id: "m7_1",
        titulo: "Preparación: Examen Escrito",
        descripcion: "20 preguntas de opción múltiple. Nivel examen de grado real.",
        tipo: "examen",
        zona: "examen",
        dificultad: 3,
        recompensa: { xp: 300, monedas: 100 },
        href: "/examen",
      },
      {
        id: "m7_2",
        titulo: "Simulación Oral",
        descripcion: "3 cédulas aleatorias. Fundamentos completos. Tiempo limitado.",
        tipo: "boss",
        zona: "examen",
        dificultad: 3,
        recompensa: { xp: 400, monedas: 150, skill: "Orador Forense" },
        href: "/oral",
      },
    ],
  },
];

// ============================================================================
// UTILIDADES
// ============================================================================

export const getActo = (numero: number) => CAMPAÑA.find((a) => a.numero === numero);

export const getMision = (id: string) => {
  for (const acto of CAMPAÑA) {
    const mision = acto.misiones.find((m) => m.id === id);
    if (mision) return { acto, mision };
  }
  return null;
};

export const getBoss = (id: string) => BOSSES[id] || null;

export const getTotalXP = () =>
  CAMPAÑA.reduce((sum, acto) =>
    sum + acto.misiones.reduce((s, m) => s + m.recompensa.xp, 0), 0
  );
