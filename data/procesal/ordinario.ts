import type { EtapaProc } from "@/types/procesal";

// ============================================================================
// EXPEDIENTE DEL JUICIO ORDINARIO DE MAYOR CUANTÍA (Libro II CPC).
// Regla general y supletoria. Cada etapa es un nodo del expediente vivo.
// Plazos y artículos referidos al Código de Procedimiento Civil chileno.
// ============================================================================

export const ETAPAS_ORDINARIO: EtapaProc[] = [
  // ── ACTOS PREVIOS ─────────────────────────────────────────────────────────
  {
    id: "ord_prejudiciales",
    edificio: "ordinario",
    orden: 1,
    grupo: "Actos previos",
    nombre: "Medidas prejudiciales",
    icono: "🧭",
    resumen: "Preparan, aseguran prueba o garantizan el resultado, antes de demandar.",
    explicacion:
      "Actuaciones que se solicitan antes de iniciado el juicio. Se clasifican en preparatorias (preparar la entrada al juicio), probatorias (asegurar pruebas que pueden desaparecer) y precautorias (asegurar el resultado de la acción).",
    requisitos: [
      "Expresar la acción que se propone deducir y someramente sus fundamentos (art. 287).",
      "Las precautorias exigen comprobantes que constituyan presunción grave del derecho.",
    ],
    plazo: "Previas a la demanda. La precautoria prejudicial obliga a demandar en 10 días (ampliables a 30).",
    articulos: "Arts. 273 a 289 CPC",
    efectos: [
      "La prejudicial precautoria concedida debe ser seguida de demanda; si no, el solicitante responde de perjuicios.",
    ],
    preguntas: [
      "¿Diferencia entre medida prejudicial y precautoria?",
      "¿Qué ocurre si no se demanda tras una prejudicial precautoria?",
    ],
  },

  // ── DISCUSIÓN ──────────────────────────────────────────────────────────────
  {
    id: "ord_demanda",
    edificio: "ordinario",
    orden: 2,
    grupo: "Discusión",
    nombre: "Demanda",
    icono: "📜",
    resumen: "Acto de postulación que abre el juicio. Requisitos del art. 254.",
    explicacion:
      "Escrito en que el actor deduce su pretensión. Es el acto que da inicio al proceso y fija el objeto del juicio (junto con la contestación).",
    requisitos: [
      "Designación del tribunal ante quien se entabla.",
      "Nombre, domicilio y profesión u oficio del demandante y de su representante.",
      "Nombre, domicilio y profesión u oficio del demandado.",
      "Exposición clara de los hechos y fundamentos de derecho.",
      "Enunciación precisa y clara de las peticiones sometidas al tribunal.",
    ],
    plazo: "No tiene plazo: es el acto de inicio (sin perjuicio de la prescripción de la acción).",
    articulos: "Art. 254 CPC",
    efectos: [
      "Fija la pretensión y, con la contestación, el objeto del juicio.",
      "Notificada y emplazada, produce radicación, litispendencia y, en su caso, constituye en mora.",
    ],
    preguntas: [
      "Enumere los requisitos del art. 254.",
      "¿Hasta qué momento puede el actor retirar o modificar la demanda?",
    ],
  },
  {
    id: "ord_emplazamiento",
    edificio: "ordinario",
    orden: 3,
    grupo: "Discusión",
    nombre: "Notificación y emplazamiento",
    icono: "📨",
    resumen: "Notificación legal de la demanda + transcurso del plazo para reaccionar.",
    explicacion:
      "El emplazamiento es un trámite esencial compuesto por dos elementos: la notificación legal de la demanda (al demandado, personalmente por regla general) y el transcurso del plazo que la ley concede para comparecer.",
    requisitos: [
      "Notificación personal de la demanda al demandado (art. 40); subsidiariamente art. 44.",
      "Transcurso del término de emplazamiento.",
    ],
    plazo:
      "Término de emplazamiento: 15 días; +3 si el demandado está en la comuna pero fuera del lugar del tribunal; + tabla de emplazamiento si está fuera del territorio jurisdiccional (arts. 258-259).",
    articulos: "Arts. 40, 44, 258 y 259 CPC",
    efectos: [
      "Su omisión o vicio es causal de nulidad (falta de emplazamiento, art. 80).",
      "Constituye trámite esencial cuya falta habilita casación en la forma (art. 768 N°9).",
    ],
    preguntas: [
      "¿Qué elementos componen el emplazamiento?",
      "¿Cómo se computa el aumento de la tabla de emplazamiento?",
    ],
  },
  {
    id: "ord_dilatorias",
    edificio: "ordinario",
    orden: 4,
    grupo: "Discusión",
    nombre: "Excepciones dilatorias",
    icono: "🛡️",
    resumen: "Corrigen el procedimiento antes de contestar. Se tramitan como incidente.",
    explicacion:
      "Defensas que no atacan el fondo, sino que buscan corregir vicios del procedimiento. Deben oponerse todas en un mismo escrito, dentro del término de emplazamiento y antes de contestar la demanda.",
    enumeracion: {
      titulo: "Excepciones dilatorias (art. 303)",
      items: [
        "1ª La incompetencia del tribunal.",
        "2ª La falta de capacidad del demandante, o de personería o representación.",
        "3ª La litispendencia.",
        "4ª La ineptitud del libelo por falta de algún requisito legal.",
        "5ª El beneficio de excusión.",
        "6ª En general, las que se refieran a la corrección del procedimiento sin afectar el fondo.",
      ],
    },
    plazo: "Dentro del término de emplazamiento, antes de contestar (art. 305).",
    articulos: "Arts. 303 a 308 CPC",
    efectos: [
      "Se tramitan como incidente (art. 307); suspenden la contestación.",
      "Acogida la incompetencia, el tribunal se abstiene; las demás corregidas, el demandado contesta en 10 días (art. 308).",
    ],
    preguntas: [
      "Enumere las excepciones dilatorias del art. 303.",
      "¿Qué plazo para contestar tras subsanarse los vicios?",
    ],
  },
  {
    id: "ord_contestacion",
    edificio: "ordinario",
    orden: 5,
    grupo: "Discusión",
    nombre: "Contestación de la demanda",
    icono: "✍️",
    resumen: "El demandado se defiende sobre el fondo; opone excepciones perentorias.",
    explicacion:
      "Escrito en que el demandado responde a la pretensión, allana, niega o opone excepciones perentorias (atacan el fondo). Con la demanda, fija definitivamente el objeto del juicio.",
    requisitos: [
      "Designación del tribunal.",
      "Nombre, domicilio y profesión del demandado.",
      "Excepciones que se oponen y exposición clara de los hechos y fundamentos de derecho.",
      "Enunciación precisa de las peticiones.",
    ],
    plazo: "Dentro del término de emplazamiento (15 días + aumentos), salvo prórroga por dilatorias.",
    articulos: "Art. 309 CPC",
    efectos: [
      "Queda trabada la litis; el objeto del juicio no puede ya alterarse.",
      "Las excepciones perentorias de cosa juzgada y transacción pueden oponerse como dilatorias o luego.",
    ],
    preguntas: [
      "Diferencia entre excepción dilatoria y perentoria.",
      "¿Qué excepciones pueden oponerse en cualquier estado del juicio (art. 310)?",
    ],
  },
  {
    id: "ord_replica",
    edificio: "ordinario",
    orden: 6,
    grupo: "Discusión",
    nombre: "Réplica",
    icono: "🔁",
    resumen: "El demandante amplía, adiciona o modifica (sin cambiar las acciones).",
    explicacion:
      "Trámite en que el actor responde a la contestación: puede ampliar, adicionar o modificar las acciones formuladas, pero sin alterar las que sean objeto principal del pleito.",
    plazo: "6 días (traslado de la contestación al demandante).",
    articulos: "Art. 311 CPC",
    efectos: ["Mantiene la congruencia: no permite cambiar la acción principal, solo precisarla."],
    preguntas: ["¿Qué puede y qué no puede hacerse en la réplica?"],
  },
  {
    id: "ord_duplica",
    edificio: "ordinario",
    orden: 7,
    grupo: "Discusión",
    nombre: "Dúplica",
    icono: "🔂",
    resumen: "El demandado cierra la discusión, ajustando sus excepciones.",
    explicacion:
      "Trámite en que el demandado responde a la réplica con la misma facultad de ampliar, adicionar o modificar sus excepciones, sin alterar las que son objeto principal. Cierra el período de discusión.",
    plazo: "6 días (traslado de la réplica al demandado).",
    articulos: "Art. 312 CPC",
    efectos: ["Concluida la dúplica termina el período de discusión."],
    preguntas: ["¿Con qué trámite termina la fase de discusión?"],
  },
  {
    id: "ord_conciliacion",
    edificio: "ordinario",
    orden: 8,
    grupo: "Discusión",
    nombre: "Conciliación (llamado obligatorio)",
    icono: "🤝",
    resumen: "Trámite esencial: el juez propone bases de arreglo tras la discusión.",
    explicacion:
      "Agotada la discusión, en los juicios civiles en que sea legalmente admisible la transacción, el tribunal llama OBLIGATORIAMENTE a las partes a conciliación y les propone personalmente bases de arreglo. El acta de conciliación es equivalente jurisdiccional.",
    plazo: "Citación a audiencia entre el 5° y 15° día desde la notificación de la resolución.",
    articulos: "Arts. 262 a 268 CPC",
    efectos: [
      "Es trámite o diligencia esencial; su omisión habilita casación en la forma (art. 795 N°2).",
      "La conciliación total o parcial produce el efecto de sentencia ejecutoriada.",
    ],
    preguntas: [
      "¿Es obligatorio el llamado a conciliación? ¿Qué pasa si se omite?",
      "¿Qué naturaleza tiene el acta de conciliación?",
    ],
  },

  // ── PRUEBA ───────────────────────────────────────────────────────────────
  {
    id: "ord_recepcion",
    edificio: "ordinario",
    orden: 9,
    grupo: "Prueba",
    nombre: "Recepción de la causa a prueba",
    icono: "⚖️",
    resumen: "Resolución que fija los hechos sustanciales, pertinentes y controvertidos.",
    explicacion:
      "Si hay hechos sustanciales, pertinentes y controvertidos, el tribunal recibe la causa a prueba y fija los puntos de prueba. Es una sentencia interlocutoria de prueba. Se notifica por cédula.",
    plazo: "Reposición especial: 3 días (puede pedir modificación, eliminación o agregación de puntos).",
    articulos: "Arts. 318 y 319 CPC",
    efectos: [
      "Abre el término probatorio.",
      "Contra ella procede reposición (especial) y, en subsidio, apelación.",
    ],
    preguntas: [
      "¿Qué naturaleza tiene la resolución que recibe la causa a prueba?",
      "¿Cómo se notifica y qué recurso procede?",
    ],
  },
  {
    id: "ord_termino",
    edificio: "ordinario",
    orden: 10,
    grupo: "Prueba",
    nombre: "Término probatorio",
    icono: "⏳",
    resumen: "Ordinario (20 días), extraordinario y especial.",
    explicacion:
      "Período fatal para rendir prueba. El ordinario dura 20 días y sirve para rendir prueba en cualquier parte. El extraordinario aumenta el plazo para rendir fuera del territorio (según tabla de emplazamiento). El especial procede ante entorpecimientos.",
    enumeracion: {
      titulo: "Clases de término probatorio",
      items: [
        "Ordinario: 20 días; toda la prueba puede rendirse en él (art. 328).",
        "Extraordinario: aumento para rendir fuera del territorio jurisdiccional o del país (arts. 329-333).",
        "Especial: nuevo término por entorpecimiento u otras causas legales (arts. 339-340).",
      ],
    },
    plazo: "Ordinario: 20 días fatales (art. 328).",
    articulos: "Arts. 327 a 340 CPC",
    efectos: ["La testimonial solo puede rendirse dentro del término probatorio."],
    preguntas: [
      "Distinga término probatorio ordinario, extraordinario y especial.",
      "¿El término probatorio es fatal?",
    ],
  },
  {
    id: "ord_testigos",
    edificio: "ordinario",
    orden: 11,
    grupo: "Prueba",
    nombre: "Lista de testigos y minuta",
    icono: "🧑‍⚖️",
    resumen: "Se presentan dentro de los 5 primeros días del probatorio.",
    explicacion:
      "Para rendir prueba testimonial es carga presentar, dentro de los primeros 5 días del término probatorio, la nómina de testigos y la minuta de puntos sobre los que declararán.",
    plazo: "Dentro de los 5 primeros días del término probatorio (art. 320).",
    articulos: "Art. 320 CPC",
    efectos: ["No presentar la lista en plazo precluye la posibilidad de rendir testimonial."],
    preguntas: ["¿Qué ocurre si no se acompaña la lista de testigos en plazo?"],
  },
  {
    id: "ord_observaciones",
    edificio: "ordinario",
    orden: 12,
    grupo: "Prueba",
    nombre: "Observaciones a la prueba",
    icono: "🔎",
    resumen: "Las partes analizan la prueba rendida. 10 días.",
    explicacion:
      "Vencido el término probatorio, las partes disponen de un plazo para hacer por escrito las observaciones que la prueba rendida les sugiera (apreciación y peso de la prueba).",
    plazo: "10 días desde el vencimiento del término probatorio (art. 430).",
    articulos: "Art. 430 CPC",
    efectos: ["Es facultativo; vencido el plazo el tribunal queda en condiciones de citar a oír sentencia."],
    preguntas: ["¿En qué momento y plazo se formulan las observaciones a la prueba?"],
  },

  // ── FALLO ────────────────────────────────────────────────────────────────
  {
    id: "ord_citacion",
    edificio: "ordinario",
    orden: 13,
    grupo: "Fallo",
    nombre: "Citación para oír sentencia",
    icono: "🔔",
    resumen: "Cierra el debate. Trámite esencial.",
    explicacion:
      "Resolución que cierra el debate: vencido el plazo de observaciones (se hayan o no presentado), el tribunal cita a las partes para oír sentencia. Desde su notificación no se admiten escritos ni pruebas, salvo excepciones legales (medidas para mejor resolver, incidentes de nulidad, etc.).",
    plazo: "Se dicta vencido el plazo de observaciones a la prueba.",
    articulos: "Art. 432 CPC",
    efectos: [
      "Trámite esencial; su omisión habilita casación en la forma (art. 768 N°9 en relación con el 795 N°7).",
      "Precluye la facultad de presentar escritos de fondo.",
    ],
    preguntas: ["¿Qué efectos produce la citación para oír sentencia?"],
  },
  {
    id: "ord_sentencia",
    edificio: "ordinario",
    orden: 14,
    grupo: "Fallo",
    nombre: "Sentencia definitiva",
    icono: "📕",
    resumen: "Pone fin a la instancia. Estructura tripartita. 60 días.",
    explicacion:
      "Resolución que pone fin a la instancia resolviendo el asunto controvertido. Se estructura en parte expositiva, considerativa y resolutiva. Una vez notificada produce desasimiento del tribunal y, firme, cosa juzgada.",
    requisitos: [
      "Parte expositiva: individualización de las partes y sus pretensiones.",
      "Parte considerativa: fundamentos de hecho y de derecho.",
      "Parte resolutiva: la decisión del asunto controvertido.",
    ],
    plazo: "Debe dictarse dentro de 60 días desde la citación para oír sentencia (art. 162).",
    articulos: "Arts. 158, 162 y 170 CPC",
    efectos: [
      "Desasimiento: notificada, el tribunal no puede alterarla ni modificarla (salvo aclaración/rectificación/enmienda).",
      "Firme o ejecutoriada: produce cosa juzgada (acción y excepción).",
    ],
    preguntas: [
      "¿Cuáles son las partes de la sentencia definitiva (art. 170)?",
      "Explique el desasimiento del tribunal y sus excepciones.",
    ],
  },
  {
    id: "ord_recursos",
    edificio: "ordinario",
    orden: 15,
    grupo: "Fallo",
    nombre: "Recursos",
    icono: "🪶",
    resumen: "Apelación 10 días; casación en la forma y en el fondo.",
    explicacion:
      "Contra la sentencia definitiva de primera instancia procede principalmente la apelación; contra ciertas resoluciones, además, casación en la forma y/o en el fondo. Cada recurso tiene su plazo fatal (ver Academia de Recursos).",
    plazo: "Apelación de sentencia definitiva: 10 días fatales desde la notificación (5 días para otras resoluciones).",
    articulos: "Arts. 186 y ss.; 764 y ss. CPC",
    efectos: ["Firme la sentencia (agotados o no interpuestos los recursos), procede su cumplimiento."],
    preguntas: [
      "¿Plazo de la apelación de la sentencia definitiva?",
      "¿Qué recursos proceden contra la sentencia definitiva de primera instancia?",
    ],
  },
];
