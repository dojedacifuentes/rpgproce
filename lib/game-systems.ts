// ============================================================================
// SISTEMAS DE JUEGO — Card System, Events, Difficulty, Doctrinal Maps
// Infraestructura paralela que expande sin destruir lo existente
// ============================================================================

// ─────────────────────────────────────────────────────────────
// CARD SYSTEM — Tarjetas jurídicas
// ─────────────────────────────────────────────────────────────

export type CardType =
  | "accion"
  | "excepcion"
  | "prueba"
  | "recurso"
  | "incidente"
  | "nulidad"
  | "plazo"
  | "articulo"
  | "estrategia"
  | "defensa";

export type CardRarity = "comun" | "rara" | "epica" | "legendaria";

export interface Card {
  id: string;
  nombre: string;
  tipo: CardType;
  institucion: string; // "competencia", "ejecutivo", "recursos", etc.
  articulo: string; // art. 464 N°3, etc.
  efecto: string; // descripción breve del efecto
  riesgo: string; // consecuencia si se juega mal
  costo: number; // "puntos de atrevimiento" o plazos
  rarity: CardRarity;
  humor: string; // frase con humor negro
  tags: string[]; // ["defensiva", "probatoria", "temporal"]
}

export const CARTAS_BASICAS: Card[] = [
  // EXCEPCIONES EJECUTIVAS
  {
    id: "exc_pago",
    nombre: "Pago",
    tipo: "excepcion",
    institucion: "ejecutivo",
    articulo: "CPC 464 N°9",
    efecto: "Destruye la ejecución si se prueba. El deudor quedó liberado.",
    riesgo: "Sin documentación sólida, esta defensa muere con dignidad.",
    costo: 3,
    rarity: "comun",
    humor: "El deudor dice que pagó. Espera a ver si logra convencer.",
    tags: ["defensiva", "probatoria", "fundamental"],
  },
  {
    id: "exc_prescripcion",
    nombre: "Prescripción",
    tipo: "excepcion",
    institucion: "ejecutivo",
    articulo: "CPC 464 N°17",
    efecto: "Si la acción ejecutiva superó 3 años, el tribunal la declara prescrita de oficio.",
    riesgo: "El plazo corre indiferente a tu fe en el derecho.",
    costo: 2,
    rarity: "comun",
    humor: "El tiempo es el mejor abogado del deudor.",
    tags: ["defensiva", "temporal", "automatica"],
  },
  {
    id: "exc_falsedad",
    nombre: "Falsedad del Título",
    tipo: "excepcion",
    institucion: "ejecutivo",
    articulo: "CPC 464 N°8",
    efecto: "Ataca la autenticidad misma del título ejecutivo.",
    riesgo: "Acusar de falsedad sin prueba es confesar que tienes miedo legítimo.",
    costo: 4,
    rarity: "rara",
    humor: "¿Falsedad material o ideológica? La Corte nunca lo decidirá.",
    tags: ["defensiva", "ofensiva", "probatoria"],
  },
  {
    id: "exc_cosa_juzgada",
    nombre: "Cosa Juzgada",
    tipo: "excepcion",
    institucion: "ejecutivo",
    articulo: "CPC 464 N°9",
    efecto: "Existe otro juicio ya sentenciado sobre lo mismo. Triple identidad mata.",
    riesgo: "Si falta cualquier elemento de la triple identidad, caes en nulidad.",
    costo: 3,
    rarity: "rara",
    humor: "La Corte ya dijo que no. Pero escucha, escucha de nuevo.",
    tags: ["defensiva", "cosa_juzgada"],
  },
  {
    id: "exc_beneficio_excusion",
    nombre: "Beneficio de Excusión",
    tipo: "excepcion",
    institucion: "ejecutivo",
    articulo: "CPC 464 N°5 / CC 2357",
    efecto: "El fiador puede exigir que se persiga al deudor principal primero.",
    riesgo: "Solo para fiadores. El deudor directo no puede invocarlo.",
    costo: 2,
    rarity: "rara",
    humor: "El fiador descubre que nunca debió firmar. Demasiado tarde.",
    tags: ["defensiva", "tacita"],
  },

  // RECURSOS
  {
    id: "recurso_reposicion",
    nombre: "Reposición con Apelación Subsidiaria",
    tipo: "recurso",
    institucion: "recursos",
    articulo: "CPC 326-327",
    efecto: "Intenta que el tribunal se rectifique. Si no, se apela.",
    riesgo: "Si procedía apelación directa, escribiste literatura inútil.",
    costo: 1,
    rarity: "comun",
    humor: "Esperas que el juez se arrepientan. Mientras tanto, tu plazo vence.",
    tags: ["recurso", "tactico", "preservativo"],
  },
  {
    id: "recurso_apelacion",
    nombre: "Apelación",
    tipo: "recurso",
    institucion: "recursos",
    articulo: "CPC 186-330",
    efecto: "Llevas el asunto a Corte de Apelaciones. Se revisa todo.",
    riesgo: "15 días desde notificación. Si lo pierdes, la Corte confirma.",
    costo: 2,
    rarity: "comun",
    humor: "La apelación es la ilusión de la reforma. A veces funciona.",
    tags: ["recurso", "ordinario", "devolutivo"],
  },
  {
    id: "recurso_casacion_forma",
    nombre: "Casación en la Forma",
    tipo: "recurso",
    institucion: "recursos",
    articulo: "CPC 768-772",
    efecto: "Ataca vicios procesales esenciales (emplazamiento, trámites, incompetencia).",
    riesgo: "Requiere preparación previa. Olvidaste reclamar en el juicio. Muere.",
    costo: 3,
    rarity: "rara",
    humor: "El tribunal fue mal, pero no puedes probarlo sin haberte quejado antes.",
    tags: ["recurso", "extraordinario", "forma"],
  },
  {
    id: "recurso_casacion_fondo",
    nombre: "Casación en el Fondo",
    tipo: "recurso",
    institucion: "recursos",
    articulo: "CPC 767-786",
    efecto: "Solo errores de derecho con influencia sustancial. Hechos están fijos.",
    riesgo: "La Corte Suprema es severa. Necesitas causal, perjuicio e influencia.",
    costo: 4,
    rarity: "epica",
    humor: "La Corte Suprema no revisa hechos. Solo tu incompetencia doctrinal.",
    tags: ["recurso", "extraordinario", "fondo"],
  },

  // MEDIOS DE PRUEBA
  {
    id: "prueba_documental",
    nombre: "Medio Probatorio: Documental",
    tipo: "prueba",
    institucion: "prueba",
    articulo: "CPC 341 ss.",
    efecto: "Instrumentos públicos o privados reconocidos. Prueba directa si es sólido.",
    riesgo: "Un documento falso o defectuoso te hunde más que la ignorancia.",
    costo: 1,
    rarity: "comun",
    humor: "El papel no miente. Solo quienes lo redactan.",
    tags: ["prueba", "documental", "directa"],
  },
  {
    id: "prueba_testimonial",
    nombre: "Medio Probatorio: Testimonial",
    tipo: "prueba",
    institucion: "prueba",
    articulo: "CPC 361-405",
    efecto: "Testigos declarando bajo juramento. Controvertible, pero vívido.",
    riesgo: "Un testigo puede cambiar su declaración. La memoria es cafre.",
    costo: 2,
    rarity: "comun",
    humor: "Los testigos mienten elegantemente bajo presión.",
    tags: ["prueba", "testimonial", "controvertible"],
  },
  {
    id: "prueba_presunciones",
    nombre: "Medio Probatorio: Presunciones",
    tipo: "prueba",
    institucion: "prueba",
    articulo: "CPC 426 ss.",
    efecto: "Hechos demostrados del que se infieren otros. Indirecto pero admisible.",
    riesgo: "Si la presunción es grave y precisa, el tribunal sigue el hilo.",
    costo: 2,
    rarity: "rara",
    humor: "Demuestras X. El tribunal presume Y. Esperas Z.",
    tags: ["prueba", "presuncion", "indirecta"],
  },
  {
    id: "prueba_confesion",
    nombre: "Medio Probatorio: Confesional",
    tipo: "prueba",
    institucion: "prueba",
    articulo: "CPC 408-420",
    efecto: "El adversario reconoce un hecho. Plena prueba si es sobre acto propio.",
    riesgo: "La confesión debe ser espontánea. Si es arrancada, el tribunal desconfía.",
    costo: 3,
    rarity: "epica",
    humor: "El enemigo nunca confiesa voluntariamente. Raramente.",
    tags: ["prueba", "confesion", "plena"],
  },

  // INCIDENTES
  {
    id: "incidente_nulidad",
    nombre: "Incidente de Nulidad",
    tipo: "incidente",
    institucion: "nulidad",
    articulo: "CPC 83-91",
    efecto: "Ataca vicios procesales que causan perjuicio reparable.",
    riesgo: "Si convalidaste el vicio no reclamando, murió. Preclusión implacable.",
    costo: 2,
    rarity: "comun",
    humor: "El vicio no se cura solito. Necesitas gritar muy fuerte, muy rápido.",
    tags: ["incidente", "nulidad", "defensiva"],
  },
  {
    id: "incidente_abandono",
    nombre: "Solicitud de Abandono",
    tipo: "incidente",
    institucion: "incidentes",
    articulo: "CPC 152-156",
    efecto: "6 meses sin gestión útil. El demandado pide que termine el juicio.",
    riesgo: "Solo gestiones útiles interrumpen. Lo administrativo no cuenta.",
    costo: 1,
    rarity: "comun",
    humor: "El demandante olvidó su caso. La pereza es el mejor aliado.",
    tags: ["incidente", "temporal", "demandado"],
  },

  // ESTRATEGIA
  {
    id: "estrategia_orden_no_innovar",
    nombre: "Estrategia: Orden de No Innovar",
    tipo: "estrategia",
    institucion: "cautelares",
    articulo: "CPC 298 ss.",
    efecto: "Medida cautelar que paraliza al contrario mientras se resuelve.",
    riesgo: "Requiere fumus boni iuris + periculum in mora. Debe ser grave.",
    costo: 3,
    rarity: "rara",
    humor: "Le dices al tribunal: detén al contrario. El tribunal lo considera.",
    tags: ["estrategia", "cautelar", "preservativa"],
  },
];

// ─────────────────────────────────────────────────────────────
// DIFFICULTY SYSTEM
// ─────────────────────────────────────────────────────────────

export type DifficultyLevel = "facil" | "medio" | "dificil" | "brutal";

export interface DifficultySettings {
  nivel: DifficultyLevel;
  opciones_obviamente_falsas: number; // cuántas opciones son claramente mal
  opciones_plausibles: number; // cuántas son técnicamente verdaderas pero incompletas
  tiempo_limite?: number; // ms para responder
  penalidad_error: number; // daño por respuesta incorrecta
  pistas_disponibles: boolean;
  feedback_detallado: boolean;
}

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultySettings> = {
  facil: {
    nivel: "facil",
    opciones_obviamente_falsas: 2,
    opciones_plausibles: 1,
    penalidad_error: 5,
    pistas_disponibles: true,
    feedback_detallado: true,
  },
  medio: {
    nivel: "medio",
    opciones_obviamente_falsas: 1,
    opciones_plausibles: 2,
    penalidad_error: 10,
    pistas_disponibles: false,
    feedback_detallado: true,
  },
  dificil: {
    nivel: "dificil",
    opciones_obviamente_falsas: 0,
    opciones_plausibles: 3,
    tiempo_limite: 30000,
    penalidad_error: 20,
    pistas_disponibles: false,
    feedback_detallado: true,
  },
  brutal: {
    nivel: "brutal",
    opciones_obviamente_falsas: 0,
    opciones_plausibles: 4,
    tiempo_limite: 20000,
    penalidad_error: 30,
    pistas_disponibles: false,
    feedback_detallado: false,
  },
};

// ─────────────────────────────────────────────────────────────
// EVENT SYSTEM — Eventos dinámicos
// ─────────────────────────────────────────────────────────────

export type EventTrigger =
  | "plazo_venciendo"
  | "receptor_falla"
  | "demandado_escondido"
  | "excepcion_inesperada"
  | "tercero_aparece"
  | "tribunal_provee_mal"
  | "resolucion_confusa"
  | "nulidad_detectada"
  | "caos_procesal"
  | "profesor_aparece"
  | "jurisprudencia_contradict"
  | "expediente_perdido";

export interface ProcedurEvent {
  id: string;
  tipo: EventTrigger;
  titulo: string;
  descripcion: string;
  contexto: string; // dónde ocurre: "ejecutivo", "ordinario", "oral", etc.
  probabilidad: number; // 0-1
  efecto: string; // qué pasa al jugador
  humor_negro: string; // frase con tono oscuro
  tags: string[];
}

export const EVENTOS_DINAMICOS: ProcedurEvent[] = [
  {
    id: "evt_plazo_30seg",
    tipo: "plazo_venciendo",
    titulo: "⏰ El plazo vence en 30 segundos",
    descripcion: "El contador baja. 30 segundos. 20. 10...",
    contexto: "cualquier",
    probabilidad: 0.4,
    efecto: "El jugador debe responder rápido o pierde la acción.",
    humor_negro: "El CPC no cree en segundas oportunidades. Tampoco en terceras.",
    tags: ["temporal", "presion", "urgencia"],
  },
  {
    id: "evt_receptor_no_encontro",
    tipo: "receptor_falla",
    titulo: "📬 El receptor no encontró a nadie",
    descripcion: "Fue dos veces. Ambas veces la puerta estaba cerrada.",
    contexto: "ejecutivo",
    probabilidad: 0.3,
    efecto: "Notificación fallida. Puedes reintentar con otra modalidad.",
    humor_negro: "El art. 44 existe, pero el domicilio del demandado parece ficción.",
    tags: ["notificacion", "fallo", "procesal"],
  },
  {
    id: "evt_demandado_escondido",
    tipo: "demandado_escondido",
    titulo: "🏚️ El demandado desapareció",
    descripcion: "Se fue del país. O del planeta. La pista se enfría.",
    contexto: "ejecutivo",
    probabilidad: 0.25,
    efecto: "El juicio se frena. Puedes solicitar embargo preventivo de bienes.",
    humor_negro: "El ejecutado descubrió que la mejor defensa es no estar donde te buscan.",
    tags: ["ejecutivo", "evasion", "dramatico"],
  },
  {
    id: "evt_excepcion_inesperada",
    tipo: "excepcion_inesperada",
    titulo: "🛡️ Excepción inesperada del ejecutado",
    descripcion: "Acaba de oponer cosa juzgada. Nunca mencionó otro juicio.",
    contexto: "ejecutivo",
    probabilidad: 0.35,
    efecto: "Necesitas probar la triple identidad o pierdes.",
    humor_negro: "El demandado guardaba el as para el final. Literalmente.",
    tags: ["defensa", "sorpresa", "ejecutivo"],
  },
  {
    id: "evt_tercero_dominio",
    tipo: "tercero_aparece",
    titulo: "👥 Tercero reclama dominio del bien embargado",
    descripcion: "Dice que el bien es suyo. Tiene documentos.",
    contexto: "ejecutivo",
    probabilidad: 0.2,
    efecto: "Se abre tercería de dominio. Juicio dentro de juicio.",
    humor_negro: "El bien está en tres lugares simultáneamente, jurídicamente hablando.",
    tags: ["terceria", "dominio", "complejidad"],
  },
  {
    id: "evt_tribunal_provee_mal",
    tipo: "tribunal_provee_mal",
    titulo: "⚖️ El tribunal proveyó MAL",
    descripcion: "Acaba de dictar una resolución que genera dudas.",
    contexto: "ordinario",
    probabilidad: 0.3,
    efecto: "¿Es decreto? ¿Auto? ¿Interlocutoria? Necesitas clasificarla para recurrir.",
    humor_negro: "El tribunal no sabe qué escribió. Pero ya tiene efectos.",
    tags: ["resolucion", "ambiguedad", "recurso"],
  },
  {
    id: "evt_nulidad_latente",
    tipo: "nulidad_detectada",
    titulo: "🔴 Nulidad latente detectada",
    descripcion: "El emplazamiento fue defectuoso. Art. 768 N°9 ronda.",
    contexto: "cualquier",
    probabilidad: 0.25,
    efecto: "Puedes atacar la sentencia por vicio procesal esencial.",
    humor_negro: "El vicio estuvo ahí desde el inicio. Pero solo lo ves cuando pierdes.",
    tags: ["nulidad", "procesal", "catastrofe"],
  },
  {
    id: "evt_profesor_aparece",
    tipo: "profesor_aparece",
    titulo: "👨‍🏫 El Profesor Aparece (modo oral)",
    descripcion: "Surge de la nada y te pregunta sobre naturaleza jurídica.",
    contexto: "oral",
    probabilidad: 0.4,
    efecto: "Debes responder con precisión. Error = trauma procesal.",
    humor_negro: "El examen nunca termina. Incluso en el juego, te persigue.",
    tags: ["oral", "pedagogico", "miedo"],
  },
  {
    id: "evt_jurisprudencia_contradice",
    tipo: "jurisprudencia_contradict",
    titulo: "📜 Jurisprudencia contradictoria aparece",
    descripcion: "Dos sentencias de Cortes distintas sobre lo mismo. Se niegan mutuamente.",
    contexto: "recursos",
    probabilidad: 0.2,
    efecto: "Puedes usar cualquiera. Pero el tribunal elige. Y probablemente te contradice.",
    humor_negro: "La jurisprudencia es un reflejo contradictorio del caos judicial.",
    tags: ["jurisprudencia", "doctrinal", "absurdo"],
  },
  {
    id: "evt_expediente_perdido",
    tipo: "expediente_perdido",
    titulo: "📁 El expediente se perdió en el archivo",
    descripcion: "Nadie sabe dónde está. Oficial del tribunal dice que está 'en revisión'.",
    contexto: "cualquier",
    probabilidad: 0.15,
    efecto: "El juicio se paraliza. Puedes solicitar copia o esperar milagros.",
    humor_negro: "El expediente desapareció. O tal vez nunca existió. O siempre estuvo aquí.",
    tags: ["caos", "burocracia", "perdida"],
  },
];

// ─────────────────────────────────────────────────────────────
// DOCTRINAL MAPPING — Relaciones entre instituciones
// ─────────────────────────────────────────────────────────────

export interface DoctrinalConcept {
  id: string;
  nombre: string;
  institucion: string;
  articulos: string[];
  descripcion_breve: string;
  relaciones: string[]; // IDs de otros conceptos relacionados
  preguntas_examen: string[]; // preguntas que lo tocan
  color: string; // para visualización
}

export const CONCEPTOS_DOCTRINALES: DoctrinalConcept[] = [
  {
    id: "bilateralidad",
    nombre: "Bilateralidad / Audiencia",
    institucion: "general",
    articulos: ["Art. 38 CPC"],
    descripcion_breve:
      "Derecho de ambas partes a ser oídas. Núcleo del debido proceso procesal.",
    relaciones: ["notificacion", "emplazamiento", "derecho_defensa", "nulidad"],
    preguntas_examen: [
      "¿Por qué la falta de notificación causa nulidad?",
      "¿Qué es bilateralidad y por qué es inderogable?",
    ],
    color: "#4BE7FF",
  },
  {
    id: "cosa_juzgada",
    nombre: "Cosa Juzgada",
    institucion: "cosajuzgada",
    articulos: ["Art. 175-177 CPC"],
    descripcion_breve: "Fuerza vinculante de sentencia firme. Límite a nuevos juicios.",
    relaciones: [
      "triple_identidad",
      "recurso_revision",
      "casacion_fondo",
      "efecto_sentencia",
    ],
    preguntas_examen: [
      "¿Cuáles son los requisitos de la triple identidad?",
      "¿Puede el demandado oponer cosa juzgada?",
      "¿Afecta la cosa juzgada a terceros?",
    ],
    color: "#F2F2F0",
  },
  {
    id: "desasimiento",
    nombre: "Desasimiento",
    institucion: "recursos",
    articulos: ["Art. 182 CPC"],
    descripcion_breve: "Tribunal pierde competencia sobre el asunto tras ciertos actos.",
    relaciones: ["sentencia_definitiva", "cosa_juzgada", "apelacion", "casacion"],
    preguntas_examen: [
      "¿Cuándo produce desasimiento una interlocutoria?",
      "¿Puede el tribunal cambiar de opinión tras desasimiento?",
    ],
    color: "#D94A4A",
  },
  {
    id: "apelacion",
    nombre: "Apelación",
    institucion: "recursos",
    articulos: ["Art. 186-330 CPC"],
    descripcion_breve: "Recurso ordinario. Lleva el asunto a tribunal superior.",
    relaciones: [
      "casacion_forma",
      "casacion_fondo",
      "efecto_devolutivo",
      "reposicion",
    ],
    preguntas_examen: [
      "¿Cuál es el plazo para apelar?",
      "¿Qué es efecto devolutivo?",
      "¿Puede conocer nuevos hechos la Corte?",
    ],
    color: "#8A5CFF",
  },
  {
    id: "casacion_forma",
    nombre: "Casación en la Forma",
    institucion: "recursos",
    articulos: ["Art. 768-772 CPC"],
    descripcion_breve: "Ataca vicios procesales esenciales.",
    relaciones: ["apelacion", "casacion_fondo", "nulidad", "emplazamiento"],
    preguntas_examen: [
      "¿Cuáles son las causales del art. 768?",
      "¿Qué significa preparación de la casación?",
      "¿Cuándo NO se exige preparación?",
    ],
    color: "#FF4FCF",
  },
  {
    id: "embargo",
    nombre: "Embargo",
    institucion: "ejecutivo",
    articulos: ["Art. 441-457 CPC", "Art. 445 CPC"],
    descripcion_breve: "Traba de bienes del deudor. Asegura ejecución.",
    relaciones: [
      "juicio_ejecutivo",
      "bienes_embargables",
      "depositario",
      "terceria_dominio",
    ],
    preguntas_examen: [
      "¿Qué bienes son inembargables?",
      "¿Quién es el depositario provisional?",
      "¿Puede ampliarse el embargo?",
    ],
    color: "#FF8A3D",
  },
];
