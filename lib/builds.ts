import type { Build, BuildInfo, TraumaJuridico } from "@/types/expansion";

// ============================================================================
// CATÁLOGO DE BUILDS — 6 especializaciones jugables
// ============================================================================

export const BUILDS: Record<Build, BuildInfo> = {
  litigante_agresivo: {
    id: "litigante_agresivo",
    nombre: "Litigante Agresivo",
    descripcion: "Vives en la fricción procesal. Demandas primero y leés después. Tu estilo es ofensivo, ruidoso, lleno de incidentes.",
    modificadores: { persuasion_forense: 3, estrategia: 1, rigor_formal: -2 },
    ventajaPasiva: "Tus incidentes ordinarios suspenden el procedimiento principal por defecto. Audiencias hostiles te dan +20% persuasión.",
    desventaja: "Tu rigor formal es bajo: arriesgas inadmisibilidades por defectos formales (303 N°2, N°4).",
    desbloqueaRecursos: ["Queja del 545 COT", "Reposición especial 319 con apelación subsidiaria automática"],
  },
  monstruo_casacional: {
    id: "monstruo_casacional",
    nombre: "Monstruo Casacional",
    descripcion: "Vivís en la 2ª y 3ª instancia. Soñás con casaciones acogidas. Conocés el 768 de memoria.",
    modificadores: { conocimiento_procesal: 3, rigor_formal: 1, persuasion_forense: -1 },
    ventajaPasiva: "Detección automática de causales del 768 en sentencias adversas. Acceso a casación de oficio simulada.",
    desventaja: "Tu paciencia con la 1ª instancia es nula: −1 diligencia en escritos de fondo.",
    desbloqueaRecursos: ["Casación en la forma 766", "Casación en el fondo 767", "Revisión 810"],
  },
  formalista_extremo: {
    id: "formalista_extremo",
    nombre: "Formalista Extremo",
    descripcion: "Detectás vicios donde nadie los ve. Tu cliente te llama 'el del 254 N°4'. Vivís citando el 768 N°9.",
    modificadores: { rigor_formal: 3, conocimiento_procesal: 1, persuasion_forense: -2 },
    ventajaPasiva: "Detección automática de vicios procesales en escritos de la contraparte. +30% probabilidad de acoger excepciones dilatorias del 303.",
    desventaja: "Vivís pidiendo nulidades. Reputación tribunalicia baja por incidentista crónico.",
    desbloqueaRecursos: ["Excepciones dilatorias del 303 con argumentación amplificada"],
  },
  estratega_cautelar: {
    id: "estratega_cautelar",
    nombre: "Estratega Cautelar",
    descripcion: "Tu sello: prejudiciales precautorias del 279 antes de que el demandado parpadee. Sabés qué bienes embargar.",
    modificadores: { estrategia: 3, diligencia: 1, resistencia_psicologica: -1 },
    ventajaPasiva: "Cautelares prejudiciales del 279 sin caución en hipótesis del 298. +25% probabilidad de éxito en innominadas del 298 inc. 2°.",
    desventaja: "Tu ansiedad procesal es alta: cada cautelar genera fatiga mental.",
    desbloqueaRecursos: ["Medidas innominadas amplificadas", "Retención del 290 N°3 acelerada"],
  },
  operador_practico: {
    id: "operador_practico",
    nombre: "Operador Práctico",
    descripcion: "No te interesa la doctrina. Te interesa cobrar. Honorarios líquidos, exigibles, no prescritos.",
    modificadores: { diligencia: 2, estrategia: 2, conocimiento_procesal: -2 },
    ventajaPasiva: "Acceso preferente al juicio ejecutivo. +30% en gestiones preparatorias de la vía ejecutiva.",
    desventaja: "Tu base doctrinal es endeble: en interrogación oral perdés salud mental más rápido.",
    desbloqueaRecursos: ["Gestiones preparatorias", "Embargo express del cuaderno de apremio"],
  },
  doctrinario: {
    id: "doctrinario",
    nombre: "Doctrinario",
    descripcion: "Citás a Couture, Carnelutti, Hoyos, Tavolari, Maturana, Pereira. La sentencia te da igual: lo que importa es la fundamentación.",
    modificadores: { conocimiento_procesal: 3, persuasion_forense: 1, estrategia: -1 },
    ventajaPasiva: "+40% en interrogación oral. Tus alegatos generan respeto de los ministros.",
    desventaja: "Tu velocidad es baja: −2 diligencia en escritos urgentes.",
    desbloqueaRecursos: ["Alegatos doctrinarios extendidos", "Citas comparadas en casación"],
  },
};

// ============================================================================
// CATÁLOGO DE TRAUMAS JURÍDICOS
// ============================================================================

export const TRAUMAS_CATALOGO: Omit<TraumaJuridico, "activo" | "id">[] = [
  {
    titulo: "Apelaste un decreto",
    descripcion: "Confundiste el art. 158 con el 187. La Corte declaró inadmisible la apelación. Tu cliente te mira como si fueras vidrio.",
    articulo: "Arts. 158 y 187 CPC",
    debuff: { atributo: "conocimiento_procesal", delta: -2, turnosRestantes: 3 },
  },
  {
    titulo: "Olvidaste el patrocinio (Ley 18.120)",
    descripcion: "El primer escrito sin patrocinio de abogado habilitado se tiene por no presentado. El tribunal proveyó 'téngase presente para los efectos del art. 2°'.",
    articulo: "Art. 2 Ley 18.120",
    debuff: { atributo: "rigor_formal", delta: -3, turnosRestantes: 4 },
  },
  {
    titulo: "Confundiste auto con interlocutoria",
    descripcion: "Pediste apelación contra una resolución que decide un incidente sin establecer derechos permanentes. Pieza maestra: el art. 158 inc. 3°.",
    articulo: "Art. 158 inc. 3° CPC",
    debuff: { atributo: "conocimiento_procesal", delta: -1, turnosRestantes: 5 },
  },
  {
    titulo: "Presentaste fuera de plazo",
    descripcion: "El art. 64 CPC tiene su propia voluntad. Los plazos fatales se cumplen aunque vos no quieras. Preclusión irreversible.",
    articulo: "Art. 64 CPC",
    debuff: { atributo: "diligencia", delta: -2, turnosRestantes: 5 },
  },
  {
    titulo: "La Corte declaró inadmisible tu existencia",
    descripcion: "Tu casación adolecía de los defectos del 772. El examen de admisibilidad del 778 te miró a los ojos y dijo no.",
    articulo: "Arts. 772, 778 CPC",
    debuff: { atributo: "resistencia_psicologica", delta: -3, turnosRestantes: 6 },
  },
  {
    titulo: "Notificación nula",
    descripcion: "El receptor no buscó al demandado en 2 días distintos antes del 44. El emplazamiento es nulo. El 768 N°9 ya está afilando el cuchillo.",
    articulo: "Arts. 44, 768 N°9 CPC",
    debuff: { atributo: "rigor_formal", delta: -2, turnosRestantes: 4 },
  },
  {
    titulo: "Prórroga tácita de competencia",
    descripcion: "Tu cliente contestó la demanda sin oponer la incompetencia relativa. Prórroga tácita (art. 187 COT). Ya estás en otro tribunal y no podés volver.",
    articulo: "Art. 187 COT",
    debuff: { atributo: "estrategia", delta: -2, turnosRestantes: 5 },
  },
  {
    titulo: "Recurso desierto",
    descripcion: "Te olvidaste de comparecer al tribunal ad quem dentro del plazo del 200. La Corte de Apelaciones declaró la deserción. Tu apelación murió de inanición.",
    articulo: "Art. 200 CPC",
    debuff: { atributo: "diligencia", delta: -3, turnosRestantes: 4 },
  },
];

export function aplicarTraumaPorVicio(vicio: string): Omit<TraumaJuridico, "activo" | "id"> | null {
  const mapa: Record<string, number> = {
    notificacion_defectuosa: 5,
    emplazamiento_omitido: 5,
    escrito_extemporaneo: 3,
    recurso_improcedente: 0,
    ultra_petita: 2,
    omision_170: 4,
    patrocinio_omitido: 1,
    personeria_defectuosa: 1,
  };
  const idx = mapa[vicio];
  return idx !== undefined ? TRAUMAS_CATALOGO[idx] : null;
}
