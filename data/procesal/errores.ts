// ============================================================================
// DETECTE EL ERROR — expedientes con (o sin) vicios procesales. El jugador
// decide si la actuación es correcta o adolece de un vicio, y aprende por qué.
// Derecho Procesal Civil chileno (CPC / COT).
// ============================================================================

export interface CasoError {
  id: string;
  escenario: string;
  tieneError: boolean;
  veredicto: string;
  articulo: string;
}

export const CASOS_ERROR: CasoError[] = [
  {
    id: "err_notif_demanda",
    escenario: "La demanda se notificó al demandado por el estado diario.",
    tieneError: true,
    veredicto: "Vicio. La primera notificación (la de la demanda) debe hacerse personalmente al demandado; el estado diario no sirve para emplazar.",
    articulo: "Art. 40 CPC",
  },
  {
    id: "err_prueba_cedula",
    escenario: "La resolución que recibe la causa a prueba se notificó por cédula.",
    tieneError: false,
    veredicto: "Correcto. La interlocutoria de prueba se notifica por cédula; no hay vicio.",
    articulo: "Art. 48 CPC",
  },
  {
    id: "err_dilatorias_tarde",
    escenario: "El demandado opuso excepciones dilatorias después de haber contestado la demanda.",
    tieneError: true,
    veredicto: "Vicio. Las dilatorias deben oponerse antes de contestar, dentro del término de emplazamiento.",
    articulo: "Art. 305 CPC",
  },
  {
    id: "err_exc_inexistente",
    escenario: "En el juicio ejecutivo el ejecutado opuso la 'excepción de falta de probidad del abogado contrario'.",
    tieneError: true,
    veredicto: "Vicio. Las excepciones del ejecutado son taxativas (art. 464); esa excepción no existe.",
    articulo: "Art. 464 CPC",
  },
  {
    id: "err_apelacion_10",
    escenario: "Se apeló la sentencia definitiva de primera instancia dentro de los 10 días siguientes a su notificación.",
    tieneError: false,
    veredicto: "Correcto. El plazo de apelación de la sentencia definitiva es de 10 días.",
    articulo: "Art. 189 CPC",
  },
  {
    id: "err_reposicion_def",
    escenario: "Contra la sentencia definitiva se interpuso recurso de reposición.",
    tieneError: true,
    veredicto: "Vicio. La reposición procede contra autos y decretos (y ciertas interlocutorias), no contra la sentencia definitiva.",
    articulo: "Art. 181 CPC",
  },
  {
    id: "err_desasimiento",
    escenario: "Tras notificar su sentencia definitiva, el mismo tribunal la modificó de oficio cambiando lo resuelto.",
    tieneError: true,
    veredicto: "Vicio. Por el desasimiento, notificada la sentencia el tribunal no puede alterarla; solo cabe aclaración, rectificación o enmienda.",
    articulo: "Art. 182 CPC",
  },
  {
    id: "err_exc_eje_plazo",
    escenario: "Requerido de pago en la comuna asiento del tribunal, el ejecutado opuso excepciones al sexto día.",
    tieneError: true,
    veredicto: "Vicio. El plazo para oponer excepciones es de 4 días cuando el requerimiento se practica en la comuna asiento del tribunal.",
    articulo: "Art. 459 CPC",
  },
  {
    id: "err_conciliacion",
    escenario: "En un juicio ordinario de cobro de pesos se omitió por completo el llamado a conciliación.",
    tieneError: true,
    veredicto: "Vicio. El llamado a conciliación es obligatorio y trámite esencial; su omisión habilita la casación en la forma.",
    articulo: "Arts. 262 y 795 N°2 CPC",
  },
  {
    id: "err_testigos_plazo",
    escenario: "La lista de testigos se presentó al séptimo día del término probatorio.",
    tieneError: true,
    veredicto: "Vicio. La lista de testigos debe presentarse dentro de los primeros 5 días del probatorio.",
    articulo: "Art. 320 CPC",
  },
  {
    id: "err_incidental_anio",
    escenario: "El cumplimiento incidental de la sentencia se pidió 14 meses después de que la ejecución se hizo exigible.",
    tieneError: true,
    veredicto: "Vicio. El cumplimiento incidental procede dentro de 1 año; vencido, debe usarse el juicio ejecutivo.",
    articulo: "Art. 233 CPC",
  },
  {
    id: "err_casacion_fondo_hechos",
    escenario: "La casación en el fondo se fundó en una errónea apreciación de los hechos por la Corte.",
    tieneError: true,
    veredicto: "Vicio. La casación en el fondo procede por infracción de ley (error de derecho), no por la apreciación de los hechos.",
    articulo: "Art. 767 CPC",
  },
  {
    id: "err_queja_con_recurso",
    escenario: "Se dedujo recurso de queja existiendo una apelación pendiente y procedente contra la misma resolución.",
    tieneError: true,
    veredicto: "Vicio. La queja solo procede cuando no existe otro recurso, ordinario o extraordinario, que permita corregir la falta o abuso.",
    articulo: "Art. 545 COT",
  },
  {
    id: "err_requerimiento_receptor",
    escenario: "El requerimiento de pago en el juicio ejecutivo lo practicó un receptor judicial.",
    tieneError: false,
    veredicto: "Correcto. El requerimiento de pago es una actuación del ministro de fe (receptor).",
    articulo: "Arts. 443 N°1 y 390 COT",
  },
  {
    id: "err_sentencia_sin_considerandos",
    escenario: "La sentencia definitiva se dictó sin contener las consideraciones de hecho y de derecho que la fundan.",
    tieneError: true,
    veredicto: "Vicio. Faltan requisitos del art. 170 (parte considerativa); es causal de casación en la forma.",
    articulo: "Arts. 170 N°4 y 768 N°5 CPC",
  },
  {
    id: "err_probatorio_20",
    escenario: "El término probatorio ordinario del juicio de lato conocimiento se extendió por 20 días.",
    tieneError: false,
    veredicto: "Correcto. El término probatorio ordinario es de 20 días.",
    articulo: "Art. 328 CPC",
  },
];
