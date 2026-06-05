// ============================================================================
// PLAZOS PROCESALES — pares concepto → plazo para el minijuego "Plazos".
// Tomados del cuadro de medios de impugnación aportado y del CPC chileno.
// ============================================================================

export interface PlazoItem {
  id: string;
  concepto: string;
  plazo: string;
  articulo: string;
}

export const PLAZOS_PROC: PlazoItem[] = [
  // Recursos
  { id: "pl_rep_ord", concepto: "Reposición ordinaria", plazo: "5 días", articulo: "Art. 181 CPC" },
  { id: "pl_rep_esp", concepto: "Reposición especial (recibir causa a prueba)", plazo: "3 días", articulo: "Art. 319 CPC" },
  { id: "pl_ape_def", concepto: "Apelación de la sentencia definitiva", plazo: "10 días", articulo: "Art. 189 CPC" },
  { id: "pl_ape_otra", concepto: "Apelación de otras resoluciones (interlocutorias)", plazo: "5 días", articulo: "Art. 189 CPC" },
  { id: "pl_adhesion", concepto: "Adhesión a la apelación (2ª instancia)", plazo: "5 días", articulo: "Art. 217 CPC" },
  { id: "pl_cas_forma", concepto: "Casación en la forma (única o 2ª instancia)", plazo: "15 días", articulo: "Art. 770 CPC" },
  { id: "pl_cas_fondo", concepto: "Casación en el fondo", plazo: "15 días", articulo: "Art. 770 CPC" },
  { id: "pl_queja", concepto: "Recurso de queja", plazo: "5 días hábiles", articulo: "Art. 548 COT" },
  { id: "pl_hecho", concepto: "Recurso de hecho", plazo: "5 días", articulo: "Art. 203 CPC" },
  { id: "pl_revision", concepto: "Recurso de revisión", plazo: "1 año", articulo: "Art. 811 CPC" },
  // Nulidades
  { id: "pl_nul_79", concepto: "Nulidad por fuerza mayor (art. 79)", plazo: "3 días", articulo: "Art. 79 CPC" },
  { id: "pl_nul_80", concepto: "Nulidad por falta de emplazamiento (art. 80)", plazo: "5 días", articulo: "Art. 80 CPC" },
  // Plazos de tramitación
  { id: "pl_contestacion", concepto: "Contestación de la demanda (juicio ordinario)", plazo: "15 días", articulo: "Art. 258 CPC" },
  { id: "pl_replica", concepto: "Réplica / dúplica (juicio ordinario)", plazo: "6 días", articulo: "Arts. 311-312 CPC" },
  { id: "pl_prob_ord", concepto: "Término probatorio ordinario", plazo: "20 días", articulo: "Art. 328 CPC" },
  { id: "pl_prob_eje", concepto: "Término probatorio (juicio ejecutivo)", plazo: "10 días", articulo: "Art. 469 CPC" },
  { id: "pl_prob_inc", concepto: "Término probatorio de los incidentes / sumario", plazo: "8 días", articulo: "Art. 90 CPC" },
  { id: "pl_observaciones", concepto: "Observaciones a la prueba", plazo: "10 días", articulo: "Art. 430 CPC" },
  { id: "pl_sentencia", concepto: "Dictación de la sentencia definitiva", plazo: "60 días", articulo: "Art. 162 CPC" },
  { id: "pl_exc_eje", concepto: "Excepciones del ejecutado (art. 464)", plazo: "4 días", articulo: "Art. 459 CPC" },
  { id: "pl_op_incidental", concepto: "Oposición al cumplimiento incidental", plazo: "3 días", articulo: "Art. 234 CPC" },
  { id: "pl_cumpl_incidental", concepto: "Pedir cumplimiento incidental (desde exigible)", plazo: "1 año", articulo: "Art. 233 CPC" },
  { id: "pl_audiencia_sumario", concepto: "Audiencia del juicio sumario (desde notificación)", plazo: "5 días", articulo: "Art. 683 CPC" },
];

// Todos los plazos distintos (para generar distractores).
export const PLAZOS_DISTINTOS: string[] = Array.from(new Set(PLAZOS_PROC.map((p) => p.plazo)));
