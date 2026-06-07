// ============================================================================
// MNEMOTECNIA — "ganchos" para recordar cada institución del Codex. Reglas
// nemotécnicas punzantes que fijan el concepto. Si una entrada no tiene gancho,
// la pantalla recurre a su concepto. Ingeniería del conocimiento: misma materia,
// nueva modalidad (imagen + frase memorable + artículo).
// ============================================================================

export const GANCHOS: Record<string, string> = {
  // Contratos / principios
  autonomia_voluntad: "La voluntad es ley… hasta que la buena fe le pone límites.",
  fuerza_obligatoria: "Pacta sunt servanda: lo pactado, atado (1545).",

  // Acto jurídico
  acto_juridico: "Voluntad + intención de efectos = acto jurídico.",
  requisitos_acto: "Existir: voluntad · objeto · causa · solemnidad. Valer: sin vicios · capaz · objeto y causa lícitos.",
  error_vicio: "El error de derecho no salva; el error sustancial sí vicia (1454).",
  fuerza_vicio: "Grave, injusta y determinante: la fuerza dobla la voluntad (1456).",
  dolo_vicio: "Dolo que determina, vicia; dolo que solo influye, indemniza (1458).",
  objeto_causa: "Sin causa real y lícita no hay obligación; cosa embargada = objeto ilícito (1464).",
  nulidad: "Absoluta (ilícito · solemnidad · incapaz) → 10 años. Relativa (vicios · incapaz relativo) → 4 años.",

  // Bienes / derecho real
  clasif_bienes: "Corporal o incorporal; mueble o inmueble.",
  dominio: "Usar, gozar y disponer: el dueño manda (582).",
  modos_adquirir: "Ocupa, accede, tradita, hereda, prescribe (588).",
  tradicion: "El inmueble se traspasa con tinta: inscripción en el Conservador (686).",
  posesion: "Con ánimo de dueño = posesión; reconociendo dueño = mera tenencia (700/714).",
  prescripcion_adq: "El tiempo hace dueño: 2/5 ordinaria, 10 extraordinaria.",
  reivindicacion: "Dueño sin posesión persigue al poseedor sin dominio (889).",

  // Familia
  matrimonio: "Contrato solemne de dos personas, para toda la vida (102).",
  vicios_impedimentos: "En el matrimonio el dolo NO vicia: solo error y fuerza (8 LMC).",
  regimenes: "Si nada pactas: sociedad conyugal (135).",
  filiacion: "Todos los hijos, iguales (179 y ss.).",
  alimentos: "Lo que el deudor puede y lo que el acreedor necesita (329).",
  divorcio: "1 año de común acuerdo; 3 años a solas (55 LMC).",
  terminacion: "La nulidad mira el origen; el divorcio, el presente.",
};

export const getGancho = (id: string): string | undefined => GANCHOS[id];
