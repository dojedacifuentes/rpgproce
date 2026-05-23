// ============================================================================
// EVENTOS MUNDO — Sucesos dinámicos que ocurren en la Ciudad Judicial
// Pueden ser encuentros, cambios de estado, misiones espontáneas, peligros
// ============================================================================

export type EventoTipo =
  | "encuentro_npc"
  | "noticia_jurisprudencia"
  | "peligro_nulidad"
  | "oportunidad_caso"
  | "cambio_clima_juridico"
  | "conflicto_con_adversario"
  | "descubrimiento_doctrinal"
  | "crisis_economia";

export interface EventoMundo {
  id: string;
  tipo: EventoTipo;
  titulo: string;
  descripcion: string;
  zona: string;
  probabilidad: number; // 0-1, probabilidad de ocurrir
  efectos: {
    reputacion?: number;
    trauma?: number;
    nivelEconomico?: number;
    cicloProcesal?: number;
  };
  opciones?: {
    texto: string;
    efectoExtra?: {
      reputacion?: number;
      trauma?: number;
      nivelEconomico?: number;
    };
  }[];
}

export const EVENTOS_MUNDO: EventoMundo[] = [
  {
    id: "evt_001",
    tipo: "encuentro_npc",
    titulo: "Encuentro Fortuito",
    descripcion: "Te cruzas con la Dra. Noemí Vásquez en los pasillos del Juzgado. Te pregunta por tu último caso.",
    zona: "competencia",
    probabilidad: 0.25,
    efectos: { reputacion: 5 },
    opciones: [
      { texto: "Cuéntale sobre el caso con detalle", efectoExtra: { reputacion: 10 } },
      { texto: "Evita la conversación", efectoExtra: { trauma: 2 } },
    ],
  },

  {
    id: "evt_002",
    tipo: "noticia_jurisprudencia",
    titulo: "Sentencia de la Corte Suprema",
    descripcion:
      "Una sentencia reciente cambia la jurisprudencia sobre cosa juzgada. Tu caso podría beneficiarse... o perjudicarse.",
    zona: "cosajuzgada",
    probabilidad: 0.20,
    efectos: { cicloProcesal: 1 },
  },

  {
    id: "evt_003",
    tipo: "peligro_nulidad",
    titulo: "Vicio Procesal Detectado",
    descripcion:
      "Descubres que tu demanda tiene un vicio en los requisitos del art. 254. El receptor no notificó correctamente.",
    zona: "notificaciones",
    probabilidad: 0.15,
    efectos: { trauma: 15, cicloProcesal: -2 },
    opciones: [
      { texto: "Interponer reposición inmediatamente", efectoExtra: { reputacion: -5 } },
      { texto: "Intentar subsanación rápida", efectoExtra: { trauma: 5 } },
    ],
  },

  {
    id: "evt_004",
    tipo: "oportunidad_caso",
    titulo: "Nuevo Caso Lucrativo",
    descripcion: "Un cliente potencial te ofrece un caso de alto valor económico. Requiere 30 días de preparación.",
    zona: "competencia",
    probabilidad: 0.18,
    efectos: { nivelEconomico: 20, cicloProcesal: 2 },
    opciones: [
      { texto: "Aceptar y dedicarte completamente", efectoExtra: { reputacion: 8 } },
      { texto: "Rechazar por falta de tiempo", efectoExtra: { nivelEconomico: -10 } },
    ],
  },

  {
    id: "evt_005",
    tipo: "cambio_clima_juridico",
    titulo: "Reforma Procesal Inesperada",
    descripcion:
      "El Congreso aprueba cambios en los plazos de casación. Los recursos que conoces ahora funcionan diferente.",
    zona: "recursos",
    probabilidad: 0.10,
    efectos: { trauma: 5, cicloProcesal: 0 },
  },

  {
    id: "evt_006",
    tipo: "conflicto_con_adversario",
    titulo: "Adversario Agresivo",
    descripcion:
      "Tu adversario interpone una demanda frivolosa contra ti por malos procedimientos. Necesitas defenderte.",
    zona: "demanda",
    probabilidad: 0.12,
    efectos: { trauma: 10, reputacion: -5 },
    opciones: [
      { texto: "Defenderse judicialmente", efectoExtra: { trauma: 8, reputacion: 3 } },
      { texto: "Ignorar y continuar", efectoExtra: { trauma: 15 } },
    ],
  },

  {
    id: "evt_007",
    tipo: "descubrimiento_doctrinal",
    titulo: "Insight Doctrinal",
    descripcion:
      "El Prof. Torres publica un artículo que reinterpreta la jurisprudencia sobre preclusión. Tu caso anterior ahora tiene nueva relevancia.",
    zona: "cosajuzgada",
    probabilidad: 0.14,
    efectos: { reputacion: 10, cicloProcesal: 1 },
  },

  {
    id: "evt_008",
    tipo: "crisis_economia",
    titulo: "Colapso Económico Local",
    descripcion:
      "La economía del país se contrae. Los honorarios legales disminuyen. Los clientes se vuelven más litigadores.",
    zona: "competencia",
    probabilidad: 0.08,
    efectos: { nivelEconomico: -15, cicloProcesal: 2 },
  },

  {
    id: "evt_009",
    tipo: "encuentro_npc",
    titulo: "Café Forense",
    descripcion: "Te encuentras con el Lic. Neruda en una cafetería cerca del juzgado. Cuenta anécdota sobre un recurso imposible.",
    zona: "recursos",
    probabilidad: 0.20,
    efectos: { reputacion: 3 },
    opciones: [
      { texto: "Escuchar con atención", efectoExtra: { reputacion: 7 } },
      { texto: "Aprovechar para pedir consejo", efectoExtra: { reputacion: 12 } },
    ],
  },

  {
    id: "evt_010",
    tipo: "peligro_nulidad",
    titulo: "Embargo Decretado sin Fundamento",
    descripcion:
      "El Juez Silva decretó embargo sobre tus bienes sin fundamento suficiente. Necesitas impugnar la medida.",
    zona: "cautelares",
    probabilidad: 0.10,
    efectos: { trauma: 20, nivelEconomico: -25 },
    opciones: [
      { texto: "Apelación inmediata", efectoExtra: { trauma: 5, reputacion: 5 } },
      { texto: "Arreglo extrajudicial", efectoExtra: { nivelEconomico: -15 } },
    ],
  },

  {
    id: "evt_011",
    tipo: "noticia_jurisprudencia",
    titulo: "Clarificación sobre Bilateralidad",
    descripcion: "Cita de un fallo que define con precisión los alcances del art. 76. Podría cambiar tu estrategia.",
    zona: "cosajuzgada",
    probabilidad: 0.12,
    efectos: { reputacion: 8, cicloProcesal: 1 },
  },

  {
    id: "evt_012",
    tipo: "oportunidad_caso",
    titulo: "Caso de Litigación Pública",
    descripcion: "Te ofrecen representar al Estado en un caso de importancia. Poca ganancia económica, mucha reputación.",
    zona: "demanda",
    probabilidad: 0.09,
    efectos: { reputacion: 20, nivelEconomico: 5, cicloProcesal: 3 },
  },
];

// Función para obtener eventos en una zona específica
export function getEventosInZona(zona: string): EventoMundo[] {
  return EVENTOS_MUNDO.filter((e) => e.zona === zona);
}

// Función para obtener un evento aleatorio de una zona
export function getRandomEventoInZona(zona: string): EventoMundo | undefined {
  const eventos = getEventosInZona(zona);
  if (eventos.length === 0) return undefined;
  return eventos[Math.floor(Math.random() * eventos.length)];
}

// Función para evaluar si un evento ocurre (basado en probabilidad)
export function shouldEventOccur(evento: EventoMundo): boolean {
  return Math.random() < evento.probabilidad;
}

// Función para obtener eventos por tipo
export function getEventosByTipo(tipo: EventoTipo): EventoMundo[] {
  return EVENTOS_MUNDO.filter((e) => e.tipo === tipo);
}
