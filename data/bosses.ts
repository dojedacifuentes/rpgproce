import type { Boss } from "@/types/expansion";

// ============================================================================
// BOSSES JURÍDICOS — Arquetipos del examen de grado chileno
// Cada boss ataca con cadenas: pregunta directa → repregunta → trampa → derivación.
// El jugador responde seleccionando entre opciones; aciertos dañan al boss, fallos lo dañan a él.
// ============================================================================

export const BOSSES: Boss[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. MINISTRO FORMALISTA — Castiga vicios formales del art. 768
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ministro_formalista",
    nombre: "Ministro Formalista",
    arquetipo: "El ministro que descubrió las 9 causales del 768 en 1985 y no ha pensado en otra cosa desde entonces.",
    descripcion: "Te mira por encima de los anteojos. Tiene un Código abierto en el 766 y otro en el 768. Aclara que la 'voluntad del legislador' no le interesa: 'a mí me interesa la causal'.",
    ambientacion: "Sala del Pleno. Madera vieja. Olor a tinta. Un retrato de Bello observa con desaprobación.",
    saludInicial: 100,
    saludJugador: 80,
    rama: "recursos",
    derrotadoOtorga: "Logro: Causales 768 dominadas. Desbloqueás casación de oficio simulada.",
    ataques: [
      {
        pregunta: "Recite el orden de las causales del art. 768. Comience por la 9ª y avance hacia la 1ª.",
        tipo: "trampa",
        opciones: [
          { texto: "9: falta de emplazamiento / 8: cosa juzgada / 7: contradictoria... — el orden inverso es retórico, prefiero responder por gravedad.", correcta: true, explicacion: "Buena defensa de marco. El art. 768 enumera 9 causales, pero la doctrina enseña que el orden tiene fundamento sistémico, no jerárquico estricto.", art: "Art. 768 CPC" },
          { texto: "9: omisión 170 / 8: ultra petita / 7: cosa juzgada / 6: incompetencia.", correcta: false, explicacion: "Confusión. La causal 5 es omisión del 170, la 4 es ultra petita, la 6 es cosa juzgada, la 1 es incompetencia.", art: "Art. 768 CPC" },
        ],
        articuloEsperado: "768",
        damage: 15,
        cadenaSi_acierta: "768_n5",
        cadenaSi_falla: "768_basico",
      },
      {
        pregunta: "768_basico: ¿Cuál es la causal del 768 N°5 y a qué artículo remite?",
        tipo: "directa",
        opciones: [
          { texto: "Faltar la sentencia los requisitos del art. 170 CPC y del Auto Acordado de 1920.", correcta: true, explicacion: "Exacto. El 768 N°5 castiga la omisión de los requisitos del 170: partes, demanda y excepciones, hechos no controvertidos, controvertidos, fundamentos, citas legales, resolución.", art: "Arts. 768 N°5, 170 CPC" },
          { texto: "Sentencia dada ultra petita.", correcta: false, explicacion: "Esa es la N°4, no la N°5.", art: "Art. 768 N°4 CPC" },
          { texto: "Sentencia con cosa juzgada.", correcta: false, explicacion: "Esa es la N°6.", art: "Art. 768 N°6 CPC" },
        ],
        articuloEsperado: "768 N°5",
        damage: 12,
        cadenaSi_acierta: "768_n9",
      },
      {
        pregunta: "768_n5: ¿En qué causal del 768 caería un fallo dictado sin haberse recibido la causa a prueba existiendo hechos controvertidos?",
        tipo: "puente",
        opciones: [
          { texto: "768 N°9 — defectos esenciales del procedimiento. Específicamente, la falta de recepción de la causa a prueba es trámite esencial (art. 795 N°3).", correcta: true, explicacion: "Correcto. El 795 enumera trámites esenciales en 1ª instancia; la falta de los del 795-800 funda 768 N°9.", art: "Arts. 768 N°9, 795 CPC" },
          { texto: "768 N°5 — omisión del 170.", correcta: false, explicacion: "No. La falta de auto de prueba no es un defecto del 170 sino un trámite esencial del 795.", art: "Art. 795 CPC" },
        ],
        articuloEsperado: "768 N°9",
        damage: 18,
        cadenaSi_acierta: "768_n9",
      },
      {
        pregunta: "768_n9: ¿Procede preparación del recurso de casación en la forma respecto de la causal del 768 N°9?",
        tipo: "trampa",
        opciones: [
          { texto: "Sí. El art. 769 exige preparación reclamando previamente la nulidad por los medios legales — salvo excepciones del 769 inc. 2°.", correcta: true, explicacion: "El art. 769 obliga a 'haber reclamado la falta' por todos los medios establecidos por la ley. Excepciones: cuando la ley no lo admite, cuando la falta haya surgido en la sentencia misma, o no fue conocida hasta ese momento.", art: "Art. 769 CPC" },
          { texto: "No. La N°9 nunca exige preparación.", correcta: false, explicacion: "Incorrecto. La regla general es la preparación (769 inc. 1°), con excepciones legales.", art: "Art. 769 CPC" },
        ],
        articuloEsperado: "769",
        damage: 20,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. PROFESOR HOSTIL — Pregunta puentes Civil↔Procesal
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "profesor_hostil",
    nombre: "Profesor Hostil de Procesal",
    arquetipo: "Veintiocho años dando procesal. Conoce a tu padre. Le decepcionó tu prueba escrita.",
    descripcion: "Camina lento por la sala. Apaga el proyector cuando empezás a leer. 'Sin apuntes. Hablemos.'",
    ambientacion: "Aula 309 de la Escuela de Derecho. Luces frías. Tres estudiantes esperan su turno con la mirada perdida.",
    saludInicial: 90,
    saludJugador: 75,
    rama: "discusion",
    derrotadoOtorga: "Logro: Puentes Civil↔Procesal dominados. +1 conocimiento permanente.",
    ataques: [
      {
        pregunta: "¿Qué relación hay entre la medida precautoria del 290 N°4 y el objeto ilícito del art. 1464 CC?",
        tipo: "puente",
        opciones: [
          { texto: "Si recae sobre inmueble y se inscribe (art. 297 CPC), su enajenación produce objeto ilícito (art. 1464 N°3 CC), sancionado con nulidad absoluta.", correcta: true, explicacion: "Conexión clásica: la inscripción en el CBR la hace oponible erga omnes; el negocio que la transgreda es nulo absolutamente.", art: "Arts. 297 CPC, 1464 N°3, 1682 CC" },
          { texto: "Ninguna. Son institutos de ramas distintas.", correcta: false, explicacion: "Incorrecto. La medida cautelar inscrita genera prohibición legal de enajenar, configurando objeto ilícito del 1464 N°3.", art: "Art. 1464 N°3 CC" },
        ],
        articuloEsperado: "1464",
        conceptoEsperado: "objeto ilícito",
        damage: 20,
        cadenaSi_acierta: "puente_2",
      },
      {
        pregunta: "puente_2: La interrupción civil de la prescripción exige notificación de demanda (art. 2503 CC). ¿Y si la notificación es nula?",
        tipo: "derivacion",
        opciones: [
          { texto: "No interrumpe (art. 2503 N°1 CC: 'no produce efecto la notificación que ha sido declarada nula'). Pero produce interrupción retroactivamente si se subsana antes de prescribir.", correcta: true, explicacion: "La doctrina mayoritaria (Domínguez Águila, Peñailillo) sostiene que la nulidad declarada borra la interrupción; sin embargo, la actuación procesal mientras subsiste detiene el plazo de hecho.", art: "Art. 2503 CC" },
          { texto: "Interrumpe igual. Lo importante es el acto procesal.", correcta: false, explicacion: "No: el 2503 N°1 CC es explícito.", art: "Art. 2503 N°1 CC" },
        ],
        articuloEsperado: "2503",
        damage: 18,
      },
      {
        pregunta: "¿La cosa juzgada del art. 175 CPC tiene su correlato en el CC?",
        tipo: "puente",
        opciones: [
          { texto: "Sí: art. 3 inc. 2° CC — sentencias judiciales no tienen fuerza obligatoria sino respecto de las causas en que actualmente se pronunciaren (efecto relativo). Y arts. 1545 ss. respecto del contrato judicial.", correcta: true, explicacion: "El art. 3 CC fija el principio de la cosa juzgada subjetiva. El 175 CPC le da operatividad procesal junto al 177.", art: "Arts. 3 CC, 175-177 CPC" },
          { texto: "No, es institución puramente procesal.", correcta: false, explicacion: "El art. 3 CC y la doctrina (Couture, Devis Echandía) la fundan en el principio de cosa juzgada material.", art: "Art. 3 CC" },
        ],
        articuloEsperado: "3 CC",
        damage: 22,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECRETARIO PROCESAL NIHILISTA — Nomenclatura del 158
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "secretario_nihilista",
    nombre: "Secretario Procesal Nihilista",
    arquetipo: "Treinta años autorizando providencias. Ha perdido toda fe en el procedimiento. Solo le queda la nomenclatura.",
    descripcion: "Te mira con un cansancio antigeológico. 'Clasifica la resolución. Si te equivocás, no podés recurrir.'",
    ambientacion: "Secretaría del 4° Juzgado Civil. Una impresora del 2003. Carpetas físicas atadas con elásticos negros.",
    saludInicial: 80,
    saludJugador: 70,
    rama: "discusion",
    derrotadoOtorga: "Logro: Art. 158 dominado. +20% velocidad de elección de recursos.",
    ataques: [
      {
        pregunta: "Resolución: 'Téngase presente'. Tipo según art. 158:",
        tipo: "directa",
        opciones: [
          { texto: "Decreto, providencia o proveído (158 inc. final): solo da curso progresivo a los autos.", correcta: true, explicacion: "Exacto. No decide ni prejuzga. Recurso: reposición del 181.", art: "Arts. 158 inc. final, 181 CPC" },
          { texto: "Auto del 158 inc. 3°.", correcta: false, explicacion: "El auto resuelve un incidente sin derechos permanentes. 'Téngase presente' no resuelve nada.", art: "Art. 158 inc. 3° CPC" },
        ],
        articuloEsperado: "158",
        damage: 10,
      },
      {
        pregunta: "Resolución: 'Recíbase la causa a prueba. Hechos: 1) fecha del contrato; 2) recepción del producto'. Tipo:",
        tipo: "directa",
        opciones: [
          { texto: "Sentencia interlocutoria de 1° grado: sirve de base al pronunciamiento de una definitiva.", correcta: true, explicacion: "El auto de prueba es interlocutoria de 1° grado (resuelve un trámite que servirá de base al fallo) — art. 158 inc. 2° última parte.", art: "Arts. 158 inc. 2°, 318 CPC" },
          { texto: "Auto.", correcta: false, explicacion: "Aunque coloquialmente se le dice 'auto de prueba', técnicamente es interlocutoria de 1° grado.", art: "Art. 158 inc. 2° CPC" },
        ],
        articuloEsperado: "318",
        damage: 14,
      },
      {
        pregunta: "Recurso procedente contra el auto de prueba del 318:",
        tipo: "trampa",
        opciones: [
          { texto: "Reposición especial del 319 dentro de 3° día, con apelación subsidiaria.", correcta: true, explicacion: "El 319 establece régimen especial: 3 días (no 5), con apelación subsidiaria. La apelación se concede en sólo el efecto devolutivo (326).", art: "Arts. 319, 326 CPC" },
          { texto: "Reposición ordinaria del 181 dentro de 5 días.", correcta: false, explicacion: "El 181 cede ante el 319, que es especial.", art: "Art. 319 CPC" },
          { texto: "Apelación directa del 187.", correcta: false, explicacion: "Solo procede apelación subsidiaria, nunca directa.", art: "Art. 319 CPC" },
        ],
        articuloEsperado: "319",
        damage: 16,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. RECEPTOR JUDICIAL ALCOHÓLICO-METAFÍSICO — Notificaciones
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "receptor_metafisico",
    nombre: "Receptor Judicial Alcohólico-Metafísico",
    arquetipo: "Cuarenta años notificando. Vive en un cuaderno del 44. Cita a Heidegger entre estampillas.",
    descripcion: "Llega con olor a aguardiente y certificación. 'La notificación es el acto puro. El acto puro es la notificación. Vamos.'",
    ambientacion: "Pasillo de tribunales a las 7:30 a.m. Un termo. Una libreta. Una existencia.",
    saludInicial: 75,
    saludJugador: 70,
    rama: "notificaciones",
    derrotadoOtorga: "Logro: Notificaciones dominadas. +10% probabilidad de detectar nulidades.",
    ataques: [
      {
        pregunta: "Notificación de la demanda al demandado: regla general.",
        tipo: "directa",
        opciones: [
          { texto: "Personal (art. 40 CPC).", correcta: true, explicacion: "La primera notificación al demandado debe ser personal: entregándole copia íntegra de la resolución y de la solicitud.", art: "Art. 40 CPC" },
          { texto: "Por estado diario (50).", correcta: false, explicacion: "El estado diario es supletorio, no para la primera notificación al demandado.", art: "Art. 50 CPC" },
          { texto: "Por avisos (54).", correcta: false, explicacion: "Avisos solo para personas indeterminadas o de difícil residencia.", art: "Art. 54 CPC" },
        ],
        articuloEsperado: "40",
        damage: 10,
        cadenaSi_acierta: "44",
      },
      {
        pregunta: "44: Para practicar notificación personal subsidiaria del 44, ¿qué debe acreditarse previamente?",
        tipo: "trampa",
        opciones: [
          { texto: "Que el notificado se encuentra en el lugar del juicio, que ése es su morada o lugar donde ejerce profesión, y haber sido buscado en dos días distintos sin ser habido.", correcta: true, explicacion: "Son los requisitos del art. 44 inc. 1°: presencia en el lugar del juicio, morada/oficina, y dos búsquedas en días distintos.", art: "Art. 44 CPC" },
          { texto: "Solo que el notificado no abrió la puerta una vez.", correcta: false, explicacion: "Insuficiente: el receptor debe estampar las dos búsquedas en días distintos.", art: "Art. 44 CPC" },
        ],
        articuloEsperado: "44",
        damage: 18,
        cadenaSi_acierta: "55",
      },
      {
        pregunta: "55: ¿Qué notificación produce sus efectos por la sola presentación del escrito?",
        tipo: "directa",
        opciones: [
          { texto: "Notificación tácita o presunción de notificación del art. 55 CPC: gestión que supone conocimiento sin haber reclamado nulidad.", correcta: true, explicacion: "El 55 inc. 2° establece la notificación tácita: la parte que hace cualquier gestión en el proceso que suponga conocimiento se tiene por notificada.", art: "Art. 55 inc. 2° CPC" },
          { texto: "Por el estado diario.", correcta: false, explicacion: "El estado diario requiere fijación en la oficina del secretario.", art: "Art. 50 CPC" },
        ],
        articuloEsperado: "55",
        damage: 14,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. RELATOR DE INADMISIBILIDADES — Recursos
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "relator_inadmisibilidades",
    nombre: "Relator de Inadmisibilidades",
    arquetipo: "Su firma aparece en 4.000 resoluciones de inadmisibilidad. No te conoce, pero conoce tu defecto.",
    descripcion: "Habla en voz baja. Examina tu escrito de casación con un lapiz rojo. 'Le adelanto: lo voy a declarar inadmisible.'",
    ambientacion: "Sala de relatores de la Corte Suprema. Murmullo. Un teléfono que nadie contesta.",
    saludInicial: 85,
    saludJugador: 75,
    rama: "recursos",
    derrotadoOtorga: "Logro: Casaciones admisibles. Desbloquea modo 'Casación de fondo asistida'.",
    ataques: [
      {
        pregunta: "Plazo para interponer casación en la forma contra sentencia definitiva de 1ª instancia (junto con apelación):",
        tipo: "directa",
        opciones: [
          { texto: "10 días desde la notificación: igual plazo que la apelación de la definitiva (770 inc. 2° en relación con 189).", correcta: true, explicacion: "770: si se interpone conjuntamente con apelación, dentro del plazo de ésta. 189: definitivas → 10 días.", art: "Arts. 770, 189 CPC" },
          { texto: "15 días.", correcta: false, explicacion: "15 días aplica a la casación interpuesta sola contra interlocutorias de 2° grado, no con apelación de definitiva.", art: "Art. 770 CPC" },
        ],
        articuloEsperado: "770",
        damage: 14,
        cadenaSi_acierta: "776",
      },
      {
        pregunta: "776: Causales de inadmisibilidad del recurso de casación en la forma examinadas por el tribunal a quo:",
        tipo: "trampa",
        opciones: [
          { texto: "(1) Que se haya deducido en tiempo; (2) que sea patrocinado por abogado habilitado; (3) que se haya preparado (769); (4) que cumpla 772.", correcta: true, explicacion: "Art. 776 enumera el examen del tribunal a quo. Si no cumple alguno, se declara inadmisible.", art: "Art. 776 CPC" },
          { texto: "Solo la oportunidad y el patrocinio.", correcta: false, explicacion: "Falta preparación (769) y requisitos formales (772).", art: "Art. 776 CPC" },
        ],
        articuloEsperado: "776",
        damage: 20,
      },
      {
        pregunta: "Diferencia entre causal de casación en la forma N°9 y N°4 del 768:",
        tipo: "puente",
        opciones: [
          { texto: "N°4: ultra petita (otorgar más de lo pedido o cosa distinta). N°9: faltar algún trámite esencial declarado por la ley (795 en 1° instancia, 800 en 2°).", correcta: true, explicacion: "N°4 ataca el contenido del fallo; N°9 ataca el procedimiento.", art: "Arts. 768 N°4, N°9, 795, 800 CPC" },
          { texto: "Son sinónimos.", correcta: false, explicacion: "Son causales distintas con regulación propia.", art: "Art. 768 CPC" },
        ],
        articuloEsperado: "768",
        damage: 18,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. ABOGADO RIVAL CASACIONAL — Duelo final
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "abogado_rival_casacional",
    nombre: "Abogado Rival Casacional",
    arquetipo: "Tu nemesis. Cinco años más viejo. Ya casó dos sentencias tuyas. Te sonríe en los pasillos de la Corte.",
    descripcion: "Te saluda con un abrazo falso. 'Te tengo preparada una preparación del 769 que te va a destrozar.'",
    ambientacion: "Pasillos de la Corte Suprema. Mármol. Eco. El sonido de tus propios pasos te delata.",
    saludInicial: 110,
    saludJugador: 85,
    rama: "recursos",
    derrotadoOtorga: "Logro FINAL: Maestría procesal. +2 a TODOS los atributos. Desbloqueo del Modo Pesadilla.",
    ataques: [
      {
        pregunta: "Distinguí casación en la forma del 766 de casación en el fondo del 767.",
        tipo: "directa",
        opciones: [
          { texto: "766: vicios in procedendo (causales del 768). 767: infracción de ley con influencia sustancial en lo dispositivo del fallo, contra sentencia definitiva o interlocutoria inapelable de Corte de Apelaciones o árbitro de derecho de 2ª instancia.", correcta: true, explicacion: "Distinción doctrinal clásica. La forma ataca el procedimiento o vicios in iudicando formales; el fondo ataca la aplicación incorrecta del derecho sustantivo.", art: "Arts. 766, 767 CPC" },
          { texto: "766 es contra interlocutorias; 767 es contra definitivas.", correcta: false, explicacion: "Ambas pueden recaer sobre definitivas e interlocutorias que ponen término al juicio. La diferencia es el vicio que atacan.", art: "Arts. 766, 767 CPC" },
        ],
        articuloEsperado: "766, 767",
        damage: 25,
        cadenaSi_acierta: "768_y_767",
      },
      {
        pregunta: "768_y_767: ¿Pueden interponerse simultáneamente casación en la forma y en el fondo contra la misma sentencia?",
        tipo: "trampa",
        opciones: [
          { texto: "Sí. El art. 770 inc. 2° permite interponer conjuntamente ambos recursos en un mismo escrito; se examinan separadamente.", correcta: true, explicacion: "Práctica habitual: forma primero, fondo en subsidio. Cada uno con sus causales y argumentación propia.", art: "Art. 770 inc. 2° CPC" },
          { texto: "No, son incompatibles.", correcta: false, explicacion: "Son compatibles y suelen interponerse juntas.", art: "Art. 770 CPC" },
        ],
        articuloEsperado: "770",
        damage: 22,
      },
      {
        pregunta: "Si la Corte Suprema acoge casación en el fondo, ¿qué sentencia dicta?",
        tipo: "directa",
        opciones: [
          { texto: "Anula la sentencia recurrida y dicta acto continuo sentencia de reemplazo (art. 785 inc. 1°).", correcta: true, explicacion: "El art. 785 ordena anular y dictar sentencia de reemplazo sin nueva vista en la mayoría de los casos.", art: "Art. 785 CPC" },
          { texto: "Devuelve los autos al tribunal a quo para que falle de nuevo.", correcta: false, explicacion: "Eso ocurre en casación en la forma (786), no en el fondo.", art: "Arts. 785-786 CPC" },
        ],
        articuloEsperado: "785",
        damage: 25,
      },
      {
        pregunta: "Tribunal competente para conocer de la casación en el fondo:",
        tipo: "directa",
        opciones: [
          { texto: "Exclusivamente la Corte Suprema (art. 767 + art. 98 N°1 COT).", correcta: true, explicacion: "La casación en el fondo es de competencia privativa de la CS.", art: "Arts. 767 CPC, 98 N°1 COT" },
          { texto: "Cualquier Corte de Apelaciones.", correcta: false, explicacion: "No: las Cortes de Apelaciones solo conocen casación en la forma contra resoluciones de juzgados de letras y arbitrales.", art: "Art. 63 N°1 COT" },
        ],
        articuloEsperado: "98 COT",
        damage: 23,
      },
    ],
  },
];
