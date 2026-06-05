// ============================================================================
// EXAMEN DE GRADO ORAL — PROCESAL. La comisión interroga con preguntas
// encadenadas sobre todo el Derecho Procesal Civil. Aprobar exige compostura.
// ============================================================================

export interface PreguntaExamen {
  pregunta: string;
  opciones: { id: string; texto: string }[];
  correcta: string;
  explicacion: string;
}

export const EXAMINADOR = {
  id: "procesalista",
  nombre: "El Procesalista",
  cargo: "Comisión de Grado · Derecho Procesal",
  color: "#3b6ea5",
  intro:
    "Buenas tardes. Soy su examinador de Derecho Procesal. Le haré preguntas encadenadas; responda con seguridad y precisión. Recuerde: en lo procesal, los plazos no perdonan. Comencemos.",
  nPreguntas: 8,
};

export const POOL_EXAMEN: PreguntaExamen[] = [
  {
    pregunta: "¿Cuál es el procedimiento de aplicación general y supletoria en materia civil?",
    opciones: [
      { id: "a", texto: "El juicio ordinario de mayor cuantía" },
      { id: "b", texto: "El juicio sumario" },
      { id: "c", texto: "El juicio ejecutivo" },
    ],
    correcta: "a",
    explicacion: "El juicio ordinario de mayor cuantía es la regla general y se aplica supletoriamente a falta de regla especial.",
  },
  {
    pregunta: "El emplazamiento, ¿por qué elementos está compuesto?",
    opciones: [
      { id: "a", texto: "La notificación legal de la demanda y el transcurso del plazo" },
      { id: "b", texto: "Solo la notificación de la demanda" },
      { id: "c", texto: "Solo el transcurso del plazo para contestar" },
    ],
    correcta: "a",
    explicacion: "El emplazamiento es notificación legal + transcurso del término; su falta es vicio de nulidad (art. 80) y causal de casación.",
  },
  {
    pregunta: "¿En qué oportunidad se oponen las excepciones dilatorias?",
    opciones: [
      { id: "a", texto: "Antes de contestar, dentro del término de emplazamiento" },
      { id: "b", texto: "Después de contestar la demanda" },
      { id: "c", texto: "En cualquier estado del juicio" },
    ],
    correcta: "a",
    explicacion: "Las dilatorias se oponen todas en un mismo escrito, antes de contestar (art. 305).",
  },
  {
    pregunta: "El llamado a conciliación en el juicio ordinario es…",
    opciones: [
      { id: "a", texto: "Obligatorio y trámite esencial" },
      { id: "b", texto: "Facultativo del juez" },
      { id: "c", texto: "Improcedente en materia civil" },
    ],
    correcta: "a",
    explicacion: "Es obligatorio (art. 262) y su omisión habilita la casación en la forma (art. 795 N°2).",
  },
  {
    pregunta: "¿Cómo se notifica la resolución que recibe la causa a prueba?",
    opciones: [
      { id: "a", texto: "Por cédula" },
      { id: "b", texto: "Por el estado diario" },
      { id: "c", texto: "Personalmente" },
    ],
    correcta: "a",
    explicacion: "La interlocutoria de prueba se notifica por cédula (art. 48).",
  },
  {
    pregunta: "¿Cuánto dura el término probatorio ordinario?",
    opciones: [
      { id: "a", texto: "20 días" },
      { id: "b", texto: "10 días" },
      { id: "c", texto: "15 días" },
    ],
    correcta: "a",
    explicacion: "El término probatorio ordinario es de 20 días (art. 328); existen además el extraordinario y el especial.",
  },
  {
    pregunta: "¿Cuál es el plazo para apelar la sentencia definitiva de primera instancia?",
    opciones: [
      { id: "a", texto: "10 días" },
      { id: "b", texto: "5 días" },
      { id: "c", texto: "15 días" },
    ],
    correcta: "a",
    explicacion: "10 días fatales (art. 189); 5 días para otras resoluciones.",
  },
  {
    pregunta: "La casación en el fondo procede por…",
    opciones: [
      { id: "a", texto: "Infracción de ley que influye sustancialmente en lo dispositivo" },
      { id: "b", texto: "Errónea apreciación de los hechos" },
      { id: "c", texto: "Falta de un trámite esencial" },
    ],
    correcta: "a",
    explicacion: "Es un recurso de derecho estricto: revisa el derecho, no los hechos (art. 767).",
  },
  {
    pregunta: "¿Cuándo procede el recurso de queja?",
    opciones: [
      { id: "a", texto: "Solo si no existe otro recurso ordinario o extraordinario" },
      { id: "b", texto: "Siempre, contra cualquier resolución" },
      { id: "c", texto: "Solo en segunda instancia" },
    ],
    correcta: "a",
    explicacion: "La queja es subsidiaria: corrige faltas o abusos graves cuando no hay otro recurso (art. 545 COT).",
  },
  {
    pregunta: "En el juicio ejecutivo, las excepciones que puede oponer el ejecutado son…",
    opciones: [
      { id: "a", texto: "Taxativas: solo las del art. 464" },
      { id: "b", texto: "Las mismas del juicio ordinario" },
      { id: "c", texto: "Ilimitadas, mientras se funden en derecho" },
    ],
    correcta: "a",
    explicacion: "El art. 464 enumera taxativamente las 18 excepciones admisibles.",
  },
  {
    pregunta: "El mandamiento de ejecución y embargo es, jurídicamente…",
    opciones: [
      { id: "a", texto: "Una actuación (orden escrita), no una resolución" },
      { id: "b", texto: "Una sentencia interlocutoria" },
      { id: "c", texto: "Un recurso del ejecutante" },
    ],
    correcta: "a",
    explicacion: "Es la orden escrita firmada por juez y secretario que abre el cuaderno de apremio (arts. 443-444).",
  },
  {
    pregunta: "El requerimiento de pago en el juicio ejecutivo constituye…",
    opciones: [
      { id: "a", texto: "El emplazamiento: hace correr el plazo para oponer excepciones" },
      { id: "b", texto: "La sentencia de pago" },
      { id: "c", texto: "El embargo mismo" },
    ],
    correcta: "a",
    explicacion: "Es la actuación del receptor que traba la litis ejecutiva y hace correr el plazo del art. 459.",
  },
  {
    pregunta: "El cumplimiento incidental ante el mismo tribunal procede dentro de…",
    opciones: [
      { id: "a", texto: "Un año desde que la ejecución se hizo exigible" },
      { id: "b", texto: "Tres años" },
      { id: "c", texto: "Sesenta días" },
    ],
    correcta: "a",
    explicacion: "Un año (art. 233); vencido, se ejecuta por la vía del juicio ejecutivo (la sentencia es título, art. 434 N°1).",
  },
  {
    pregunta: "¿Qué significa el desasimiento del tribunal?",
    opciones: [
      { id: "a", texto: "Notificada la sentencia, el tribunal no puede modificarla, salvo aclaración/rectificación" },
      { id: "b", texto: "Que el tribunal puede modificarla libremente" },
      { id: "c", texto: "Que debe ejecutarla de oficio" },
    ],
    correcta: "a",
    explicacion: "El desasimiento (art. 182) protege la seguridad jurídica; su excepción es la aclaración, rectificación o enmienda.",
  },
  {
    pregunta: "La excepción de cosa juzgada exige la triple identidad de…",
    opciones: [
      { id: "a", texto: "Personas, cosa pedida y causa de pedir" },
      { id: "b", texto: "Tribunal, fecha y partes" },
      { id: "c", texto: "Objeto, plazo y forma" },
    ],
    correcta: "a",
    explicacion: "Identidad legal de personas, identidad de la cosa pedida e identidad de la causa de pedir.",
  },
  {
    pregunta: "El juicio sumario se caracteriza por…",
    opciones: [
      { id: "a", texto: "Ser breve y concentrado, sin réplica ni dúplica" },
      { id: "b", texto: "Tener un doble término probatorio" },
      { id: "c", texto: "Ser siempre escrito y de lato conocimiento" },
    ],
    correcta: "a",
    explicacion: "El sumario concentra la discusión en una audiencia; carece de réplica y dúplica, lo que lo hace más rápido.",
  },
];

export function veredictoExamen(aciertos: number, total: number) {
  const nota = total > 0 ? aciertos / total : 0;
  if (nota >= 0.85) return { aprobado: true, titulo: "Aprobado con distinción", texto: "La comisión lo felicita: dominio sobresaliente del Derecho Procesal." };
  if (nota >= 0.6) return { aprobado: true, titulo: "Aprobado", texto: "Suficiente. La comisión queda conforme, aunque hay aristas que pulir." };
  return { aprobado: false, titulo: "Reprobado", texto: "La comisión no quedó satisfecha. Repase los plazos y la secuencia, y vuelva a presentarse." };
}
