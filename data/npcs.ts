// ============================================================================
// NPCS — 6 Personajes jurídicos habitando la Ciudad Judicial
// Cada uno tiene zona, rol, diálogos, y afecta reputación/atributos
// ============================================================================

export type NpcId = "doctora_noemí" | "juez_silva" | "receptor_castro" | "abogado_neruda" | "escribana_gloria" | "profesor_torres";

export interface NpcDialogo {
  id: string;
  texto: string;
  efecto?: {
    reputacion?: number;
    trauma?: number;
    nivelEconomico?: number;
  };
}

export interface Npc {
  id: NpcId;
  nombre: string;
  titulo: string;
  zona: string;
  descripcion: string;
  emoji: string;
  personalidad: string;
  dialogo_inicial: NpcDialogo;
  dialogos: NpcDialogo[];
  mision?: {
    titulo: string;
    descripcion: string;
    recompensa: string;
  };
}

export const NPCS: Record<NpcId, Npc> = {
  doctora_noemí: {
    id: "doctora_noemí",
    nombre: "Dra. Noemí Vásquez",
    titulo: "Jueza de Primera Instancia",
    zona: "competencia",
    descripcion: "Magistrada de 45 años, doctora en Derecho Procesal por la Universidad de Chile. Experta en competencia y jurisdicción. Impaciente con litigantes desordenados.",
    emoji: "⚖️",
    personalidad: "Seria, meticulosa, no tolera errores formales. Enseña con firmeza.",
    dialogo_inicial: {
      id: "noemí_001",
      texto: "Bienvenido a mi juzgado. Aquí la competencia es todo. Un error en jurisdicción = nulidad. ¿Entiendes los alcances de tu acción?",
      efecto: { reputacion: 0 },
    },
    dialogos: [
      {
        id: "noemí_002",
        texto: "He visto abogados arruinarse por no revisar competencia relativa. La materia, el fuero, la cuantía... todo importa.",
        efecto: { reputacion: 5 },
      },
      {
        id: "noemí_003",
        texto: "La demanda debe cumplir art. 254 al pie de la letra. Ni una coma fuera de lugar. Eso es lo que nos diferencia del caos.",
        efecto: { reputacion: 10 },
      },
      {
        id: "noemí_004",
        texto: "¿Inhibitoria o declinatoria? Muchos se confunden. Inhibitoria es para invocar competencia a favor de otro tribunal. Declinatoria es para rechazar la propia.",
        efecto: { reputacion: 15 },
      },
    ],
    mision: {
      titulo: "Resolver caso de competencia cuestionada",
      descripcion: "Una demanda fue interpuesta ante tribunal incompetente por materia. Debe determinarse si procede inhibitoria o declinatoria.",
      recompensa: "+15 Reputación · +20 Ciclo Procesal",
    },
  },

  juez_silva: {
    id: "juez_silva",
    nombre: "Sr. Juez Cornelio Silva",
    titulo: "Juez de Garantía",
    zona: "cautelares",
    descripcion: "Magistrado de 62 años, conservador, especialista en medidas cautelares. Cree que la precaución es la madre de la seguridad jurídica.",
    emoji: "🔒",
    personalidad: "Protector del status quo, teme los abusos. Exige prueba clara antes de cualquier medida.",
    dialogo_inicial: {
      id: "silva_001",
      texto: "Las cautelares son el arma más peligrosa del proceso. Una medida mal concedida destruye patrimonios. Por eso soy cauteloso... con todo.",
      efecto: { reputacion: 0 },
    },
    dialogos: [
      {
        id: "silva_002",
        texto: "Art. 273 a 302. Las prejudiciales son anteriores al proceso. Las precautorias preparatorias. Innominadas en el 298. Cada una con su régimen.",
        efecto: { reputacion: 5 },
      },
      {
        id: "silva_003",
        texto: "Para obtener una cautelar conmigo necesitas: verosimilitud del derecho, peligro en la demora, y contracautela. Sin eso, rechazaré de plano.",
        efecto: { reputacion: 10 },
      },
      {
        id: "silva_004",
        texto: "He visto litigantes gastar fortunas en cautelares inútiles. La verdadera estrategia es prever qué necesitarás antes de que suceda.",
        efecto: { reputacion: 8 },
      },
    ],
    mision: {
      titulo: "Justificar una medida cautelar urgente",
      descripcion: "Un embargo debe decretarse sin previo traslado. Demuestra que sin él el deudor dispersará su patrimonio.",
      recompensa: "+12 Reputación · Embargo Express skill",
    },
  },

  receptor_castro: {
    id: "receptor_castro",
    nombre: "Sr. Recep. Mauricio Castro",
    titulo: "Receptor Judicial",
    zona: "notificaciones",
    descripcion: "Profesional de 38 años, pragmático. Lleva 15 años notificando gente. Sabe de domicilios imposibles, demandados escondidos, y trucos de evasión.",
    emoji: "📬",
    personalidad: "Cínico, divertido, cuenta anécdotas de notificaciones fracasadas. Es tu aliado en el caos.",
    dialogo_inicial: {
      id: "castro_001",
      texto: "He notificado abogados, jueces, traficantes. Los demandados son creativos en desaparecer. Art. 40-46 es mi biblia, pero en el terreno es pura improvisación.",
      efecto: { reputacion: 0 },
    },
    dialogos: [
      {
        id: "castro_002",
        texto: "Personal es la mejor. Entre 6 AM y 22 PM, en el domicilio. Pero si el tipo no está... subsidiaria: dos intentos en días distintos.",
        efecto: { reputacion: 5 },
      },
      {
        id: "castro_003",
        texto: "Publicación en diario oficial. El último recurso. Sirve cuando el demandado es prácticamente inubicable o intenta evadir notificación.",
        efecto: { reputacion: 10 },
      },
      {
        id: "castro_004",
        texto: "Carta certificada post-subsidiaria. Muchos olvidan esto. Sin ella, la notificación es incompleta. He visto nulidades por esto.",
        efecto: { reputacion: 7 },
      },
    ],
    mision: {
      titulo: "Notificar a demandado evasivo",
      descripcion: "Un demandado cambió tres veces de domicilio. Debes lograr notificación válida dentro de 30 días.",
      recompensa: "+10 Reputación · Blindaje del 44 skill",
    },
  },

  abogado_neruda: {
    id: "abogado_neruda",
    nombre: "Lic. Alejo Neruda",
    titulo: "Abogado Litigante (Competencia)",
    zona: "recursos",
    descripcion: "Abogado de 55 años, veterano de mil casos. Especialista en recursos procesales. Cínico respecto a la justicia, pero técnicamente impecable.",
    emoji: "⚔️",
    personalidad: "Desencantado, bromista oscuro, pero enseña con generosidad. Es tu mentor en casación.",
    dialogo_inicial: {
      id: "neruda_001",
      texto: "He interpuesto apelaciones que nadie creía que funcionarían. La clave: leer la ley como si fuera poesía. Hay grietas en todas partes.",
      efecto: { reputacion: 0 },
    },
    dialogos: [
      {
        id: "neruda_002",
        texto: "Art. 186-190. Apelación. 15 días. Demandante y demandado pueden. El tribunal de apelaciones revisa de novo.",
        efecto: { reputacion: 5 },
      },
      {
        id: "neruda_003",
        texto: "Casación en la forma: 768. Vicios de procedimiento. Casación en el fondo: 775. Errores de derecho sustantivo. Ambas son desasimiento.",
        efecto: { reputacion: 10 },
      },
      {
        id: "neruda_004",
        texto: "La Corte Suprema leo como quien lee a Cortázar: entre líneas. Donde otros ven silencio, yo veo jurisprudencia.",
        efecto: { reputacion: 12 },
      },
    ],
    mision: {
      titulo: "Preparar apelación imposible",
      descripcion: "Sentencia adversa con argumentación floja. Identifica 3 vicios que justifiquen apelación exitosa.",
      recompensa: "+15 Reputación · +1 Ciclo Procesal",
    },
  },

  escribana_gloria: {
    id: "escribana_gloria",
    nombre: "Sra. Escribana Gloria Fuentes",
    titulo: "Escribana Notarial",
    zona: "prueba",
    descripcion: "Escribana de 48 años, custodio de documentos. Entiende de instrumentos públicos, privados, autenticación. Fuente de verdad en el caos probatorio.",
    emoji: "📜",
    personalidad: "Seria pero accesible. Cree en el poder de la documentación. Teme los fraudes caligráficos.",
    dialogo_inicial: {
      id: "gloria_001",
      texto: "Un documento bien hecho vale más que cien testigos. Por eso los instrumentos públicos son irrefutables en su forma, aunque no en su contenido.",
      efecto: { reputacion: 0 },
    },
    dialogos: [
      {
        id: "gloria_002",
        texto: "Art. 1700 CC. Instrumento público prueba hasta la tacha de falsedad. Privado requiere reconocimiento para ser plena prueba.",
        efecto: { reputacion: 5 },
      },
      {
        id: "gloria_003",
        texto: "Pericia caligráfica. Cuando la falsedad es cuestionada, necesitas experto. He visto casos ganarse o perderse por una firma.",
        efecto: { reputacion: 10 },
      },
      {
        id: "gloria_004",
        texto: "La confesión de parte es la mejor prueba. Art. 1709. Si el adversario confiesa, no hay nada que probar.",
        efecto: { reputacion: 8 },
      },
    ],
    mision: {
      titulo: "Autenticar documento cuestionado",
      descripcion: "Una letra de cambio es impugnada como falsificada. Debes obtener pericia caligráfica que la valide.",
      recompensa: "+12 Reputación · +10 Nivel Económico",
    },
  },

  profesor_torres: {
    id: "profesor_torres",
    nombre: "Prof. Dr. Enrique Torres",
    titulo: "Catedrático de Derecho Procesal",
    zona: "cosajuzgada",
    descripcion: "Profesor de 68 años, doctrinario puro. Autor de libros sobre cosa juzgada, preclusión, y bilateralidad. Vive en la teoría del derecho.",
    emoji: "📚",
    personalidad: "Erudito, paciente, pero buscapié constante. Pregunta más de lo que responde. Te obliga a pensar.",
    dialogo_inicial: {
      id: "torres_001",
      texto: "La cosa juzgada es el corazón del proceso. Art. 175, 177. Seguridad jurídica. Pero cuidado: no es tan simple como parece.",
      efecto: { reputacion: 0 },
    },
    dialogos: [
      {
        id: "torres_002",
        texto: "¿Diferencia entre cosa juzgada material y cosa juzgada formal? Formal: se ejecutoria sin apelación. Material: produce estabilidad permanente.",
        efecto: { reputacion: 5 },
      },
      {
        id: "torres_003",
        texto: "Preclusión. Art. 64. Es la muerte de un derecho por inactividad. Bilateralidad. Art. 76. Ambas partes deben ser oídas. Estos son los pilares.",
        efecto: { reputacion: 10 },
      },
      {
        id: "torres_004",
        texto: "La jurisprudencia es ley viva. La Corte Suprema sienta precedentes. ¿Cómo se argumenta contra jurisprudencia consolidada? Con más jurisprudencia.",
        efecto: { reputacion: 15 },
      },
    ],
    mision: {
      titulo: "Escribir ensayo doctrinario",
      descripcion: "Analiza si una sentencia anterior produce cosa juzgada en este nuevo conflicto. Identidad de partes, objeto, causa.",
      recompensa: "+20 Reputación · Unlock: Doctrinal Mode",
    },
  },
};

// Función para obtener un NPC por ID
export function getNpc(id: NpcId): Npc | undefined {
  return NPCS[id];
}

// Función para obtener todos los NPCs
export function getAllNpcs(): Npc[] {
  return Object.values(NPCS);
}

// Función para obtener NPCs en una zona específica
export function getNpcsInZona(zona: string): Npc[] {
  return Object.values(NPCS).filter((npc) => npc.zona === zona);
}

// Función para obtener un diálogo aleatorio de un NPC
export function getRandomDialogo(npc: Npc): NpcDialogo {
  const randomIdx = Math.floor(Math.random() * npc.dialogos.length);
  return npc.dialogos[randomIdx];
}
