// ============================================================================
// LA SALA DE LA VERDAD — Derecho Probatorio (Prueba en el Proceso Civil).
// Núcleo de conocimiento + datasets de los minijuegos. CPC y Código Civil.
// "Un hecho no probado es un hecho que jamás ocurrió."
// ============================================================================

export const NARRADOR = {
  nombre: "La Carga de la Prueba",
  icono: "⚖️",
  intro:
    "Bienvenido a la Sala de la Verdad. Aquí los hechos no existen hasta que alguien los prueba. Yo soy la Carga: decido sobre los hombros de quién cae el peso de convencer. El que alega, prueba; el que no prueba, pierde; el que pierde… repite el grado.",
  frases: [
    "Un hecho no probado es un hecho que jamás ocurrió. Duele, ¿verdad?",
    "Acompañaste el documento fuera de plazo. La verdad existió… pero llegó tarde.",
    "Aquí no importa quién tiene razón, sino quién la prueba.",
    "La sana crítica no es hacer lo que quieras: es razonar y dejar constancia.",
    "El testigo cobró por declarar. Spoiler: ya tienes una causal de tacha.",
    "El perito opinó con certeza absoluta. El juez, con sana crítica, opinó distinto.",
  ],
};

// ── CODEX: medios de prueba y conceptos clave ───────────────────────────────
export interface MedioPrueba {
  id: string;
  nombre: string;
  icono: string;
  definicion: string;
  valoracion: string;
  articulos: string;
  clave: string[];
}

export const MEDIOS_PRUEBA: MedioPrueba[] = [
  {
    id: "objeto",
    nombre: "Objeto de la prueba",
    icono: "🎯",
    definicion: "Lo que debe probarse: los hechos sustanciales, pertinentes y controvertidos. El derecho no se prueba (iura novit curia), salvo la costumbre y el derecho extranjero.",
    valoracion: "—",
    articulos: "Art. 318 CPC",
    clave: ["Hechos sustanciales, pertinentes y controvertidos", "No se prueban: hechos admitidos, notorios, presumidos, negativos indefinidos", "El derecho no se prueba (salvo costumbre y derecho extranjero)"],
  },
  {
    id: "carga",
    nombre: "Carga de la prueba (onus probandi)",
    icono: "🏋️",
    definicion: "Regla que indica a quién perjudica la falta de prueba: incumbe probar las obligaciones o su extinción a quien alega aquéllas o ésta.",
    valoracion: "—",
    articulos: "Art. 1698 CC",
    clave: ["El que alega un hecho debe probarlo", "Quien alega la obligación prueba su existencia; quien la extinción, el pago", "No probado el hecho, se falla contra quien tenía la carga"],
  },
  {
    id: "instrumentos",
    nombre: "Prueba instrumental",
    icono: "📄",
    definicion: "Documentos que dan cuenta de un hecho. Públicos: autorizados por funcionario competente con las solemnidades legales. Privados: los demás.",
    valoracion: "Prueba legal o tasada",
    articulos: "Arts. 342-355 CPC; 1699-1706 CC",
    clave: ["Público: plena fe del hecho de otorgarse, su fecha y las partes (1700)", "Privado: vale como público una vez reconocido o mandado tener por reconocido (1702; 346 CPC)", "Oportunidad: con citación (privados/públicos) o bajo apercibimiento"],
  },
  {
    id: "testigos",
    nombre: "Prueba testimonial",
    icono: "🗣️",
    definicion: "Declaración de terceros ajenos al juicio sobre hechos que percibieron. Carga: lista y minuta dentro de los 5 primeros días del probatorio.",
    valoracion: "Legal o tasada (reglas del art. 384)",
    articulos: "Arts. 356-384 CPC",
    clave: ["Tachas: inhabilidades absolutas (357) y relativas (358)", "La lista y minuta van en los primeros 5 días del probatorio (320)", "Se aprecia conforme a las reglas del art. 384"],
  },
  {
    id: "confesion",
    nombre: "Confesión de parte",
    icono: "🙊",
    definicion: "Reconocimiento que una parte hace de un hecho que le perjudica. Judicial o extrajudicial; espontánea o provocada (absolución de posiciones).",
    valoracion: "Prueba legal o tasada",
    articulos: "Arts. 385-402 CPC; 1713 CC",
    clave: ["La confesión judicial produce plena prueba (1713; 399-400)", "Es indivisible: no puede dividirse en perjuicio del confesante (401)", "Provocada: absolución de posiciones; ficta si no comparece o da respuestas evasivas"],
  },
  {
    id: "inspeccion",
    nombre: "Inspección personal del tribunal",
    icono: "👁️",
    definicion: "Examen que el propio tribunal hace de la cosa o lugar litigioso, dejando constancia en acta.",
    valoracion: "Prueba legal o tasada",
    articulos: "Arts. 403-408 CPC",
    clave: ["Produce plena prueba de los hechos o circunstancias que el tribunal establezca por sí mismo (408)", "Se levanta acta de lo observado"],
  },
  {
    id: "peritos",
    nombre: "Informe de peritos",
    icono: "🔬",
    definicion: "Dictamen de un experto sobre puntos de hecho que requieren conocimientos especiales de una ciencia o arte.",
    valoracion: "Sana crítica",
    articulos: "Arts. 409-425 CPC",
    clave: ["El informe pericial se aprecia conforme a la sana crítica (425)", "No obliga al juez", "Procede cuando la ley lo ordena o el punto exige conocimientos especiales"],
  },
  {
    id: "presunciones",
    nombre: "Presunciones",
    icono: "🧩",
    definicion: "Consecuencias que la ley o el tribunal deducen de hechos conocidos para llegar a un hecho desconocido. Legales o judiciales.",
    valoracion: "Las judiciales: graves, precisas y concordantes",
    articulos: "Arts. 426-427 CPC; 1712 CC",
    clave: ["Legales: simplemente legales (admiten prueba en contrario) y de derecho (no la admiten)", "Judiciales: deben ser graves, precisas y concordantes", "Una sola presunción puede constituir plena prueba si es grave y precisa (426)"],
  },
  {
    id: "valoracion",
    nombre: "Sistemas de valoración",
    icono: "⚖️",
    definicion: "Cómo pondera el juez la prueba. En el proceso civil chileno la regla general es la prueba legal o tasada; por excepción, sana crítica (peritos) o libre apreciación.",
    valoracion: "—",
    articulos: "Arts. 384, 425, 428 CPC",
    clave: ["Legal o tasada: la ley fija el valor de cada medio (regla general civil)", "Sana crítica: lógica, máximas de experiencia y conocimientos científicos (peritos)", "Apreciación comparativa: a falta de ley, se prefiere la prueba más conforme con la verdad (428)"],
  },
];

// ── CLASIFICADOR: decks de columna a columna ────────────────────────────────
export interface ItemClasifica { id: string; texto: string; bin: string }
export interface DeckClasifica {
  id: string;
  titulo: string;
  instruccion: string;
  columnas: { id: string; label: string }[];
  items: ItemClasifica[];
}

export const DECKS_CLASIFICA: DeckClasifica[] = [
  {
    id: "deck_medios",
    titulo: "¿Es un medio de prueba?",
    instruccion: "Arrastra cada elemento a su columna: medio de prueba legal (art. 341) o impostor.",
    columnas: [
      { id: "si", label: "Medio de prueba (art. 341)" },
      { id: "no", label: "No es medio de prueba" },
    ],
    items: [
      { id: "m1", texto: "Instrumentos públicos y privados", bin: "si" },
      { id: "m2", texto: "Testigos", bin: "si" },
      { id: "m3", texto: "Confesión de parte", bin: "si" },
      { id: "m4", texto: "Inspección personal del tribunal", bin: "si" },
      { id: "m5", texto: "Informe de peritos", bin: "si" },
      { id: "m6", texto: "Presunciones", bin: "si" },
      { id: "m7", texto: "El rumor público del barrio", bin: "no" },
      { id: "m8", texto: "La íntima corazonada del juez", bin: "no" },
      { id: "m9", texto: "Los alegatos del abogado", bin: "no" },
    ],
  },
  {
    id: "deck_valoracion",
    titulo: "¿Cómo se valora?",
    instruccion: "Clasifica cada medio según su sistema de valoración en el proceso civil.",
    columnas: [
      { id: "tasada", label: "Prueba legal o tasada" },
      { id: "sana", label: "Sana crítica / apreciación" },
    ],
    items: [
      { id: "v1", texto: "Instrumento público", bin: "tasada" },
      { id: "v2", texto: "Confesión judicial", bin: "tasada" },
      { id: "v3", texto: "Inspección personal del tribunal", bin: "tasada" },
      { id: "v4", texto: "Prueba testimonial (reglas del 384)", bin: "tasada" },
      { id: "v5", texto: "Informe de peritos (art. 425)", bin: "sana" },
      { id: "v6", texto: "Presunciones judiciales (graves, precisas y concordantes)", bin: "sana" },
    ],
  },
  {
    id: "deck_instrumentos",
    titulo: "Instrumento: ¿público o privado?",
    instruccion: "Separa los instrumentos según su naturaleza.",
    columnas: [
      { id: "pub", label: "Instrumento público" },
      { id: "priv", label: "Instrumento privado" },
    ],
    items: [
      { id: "i1", texto: "Escritura pública", bin: "pub" },
      { id: "i2", texto: "Copia autorizada de una escritura pública", bin: "pub" },
      { id: "i3", texto: "Partida de nacimiento del Registro Civil", bin: "pub" },
      { id: "i4", texto: "Contrato firmado solo entre particulares", bin: "priv" },
      { id: "i5", texto: "Una carta o correo entre las partes", bin: "priv" },
      { id: "i6", texto: "Un recibo simple sin firma autorizada", bin: "priv" },
    ],
  },
  {
    id: "deck_carga",
    titulo: "¿A quién le toca probar?",
    instruccion: "Reparte la carga de la prueba (art. 1698) según quién alega.",
    columnas: [
      { id: "actor", label: "Debe probar el actor/acreedor" },
      { id: "demandado", label: "Debe probar el demandado/deudor" },
    ],
    items: [
      { id: "c1", texto: "La existencia de la obligación que se cobra", bin: "actor" },
      { id: "c2", texto: "Que el contrato efectivamente se celebró", bin: "actor" },
      { id: "c3", texto: "El daño y su monto en la indemnización", bin: "actor" },
      { id: "c4", texto: "El pago de la deuda (extinción)", bin: "demandado" },
      { id: "c5", texto: "La novación que alega como defensa", bin: "demandado" },
      { id: "c6", texto: "La prescripción que opone", bin: "demandado" },
    ],
  },
];

// ── ALTERNATIVAS DIFÍCILES (MC) ─────────────────────────────────────────────
export interface MCItem {
  id: string;
  pregunta: string;
  opciones: { id: string; texto: string }[];
  correcta: string;
  explicacion: string;
  articulo: string;
}

export const MC_PRUEBA: MCItem[] = [
  {
    id: "mc_objeto",
    pregunta: "¿Sobre qué debe recaer la prueba en el juicio civil?",
    opciones: [
      { id: "a", texto: "Sobre los hechos sustanciales, pertinentes y controvertidos" },
      { id: "b", texto: "Sobre todos los hechos alegados, aunque no se discutan" },
      { id: "c", texto: "Sobre el derecho aplicable al caso" },
    ],
    correcta: "a",
    explicacion: "La prueba recae sobre los hechos sustanciales, pertinentes y controvertidos; el derecho no se prueba (salvo costumbre y derecho extranjero).",
    articulo: "Art. 318 CPC",
  },
  {
    id: "mc_carga",
    pregunta: "El demandado opone como defensa que ya pagó la deuda. ¿Quién debe probar el pago?",
    opciones: [
      { id: "a", texto: "El demandado, porque alega la extinción" },
      { id: "b", texto: "El demandante, porque cobra la deuda" },
      { id: "c", texto: "Ninguno: el pago se presume de derecho" },
    ],
    correcta: "a",
    explicacion: "Incumbe probar la extinción de la obligación a quien la alega; el pago lo prueba el deudor que lo invoca.",
    articulo: "Art. 1698 CC",
  },
  {
    id: "mc_inst_publico",
    pregunta: "¿Qué hace plena fe el instrumento público respecto de terceros?",
    opciones: [
      { id: "a", texto: "El hecho de haberse otorgado, su fecha y las declaraciones del funcionario" },
      { id: "b", texto: "La verdad de todo lo declarado por las partes" },
      { id: "c", texto: "Nada: respecto de terceros no produce efecto alguno" },
    ],
    correcta: "a",
    explicacion: "Respecto de terceros hace plena fe en cuanto al hecho de otorgarse y su fecha; la verdad de las declaraciones dispositivas hace fe contra los declarantes.",
    articulo: "Art. 1700 CC",
  },
  {
    id: "mc_inst_privado",
    pregunta: "¿Cuándo el instrumento privado adquiere el valor de un instrumento público respecto de quien lo firmó?",
    opciones: [
      { id: "a", texto: "Cuando ha sido reconocido o mandado tener por reconocido" },
      { id: "b", texto: "Desde que se acompaña al juicio, sin más trámite" },
      { id: "c", texto: "Solo si lo autoriza un notario con posterioridad" },
    ],
    correcta: "a",
    explicacion: "El instrumento privado reconocido o mandado tener por reconocido tiene el valor de escritura pública respecto de los que lo suscribieron.",
    articulo: "Art. 1702 CC; 346 CPC",
  },
  {
    id: "mc_confesion_indiv",
    pregunta: "Sobre la confesión, ¿qué es correcto?",
    opciones: [
      { id: "a", texto: "Es indivisible: no puede dividirse en perjuicio del confesante" },
      { id: "b", texto: "Puede dividirse siempre para tomar solo lo desfavorable" },
      { id: "c", texto: "Carece de valor probatorio en materia civil" },
    ],
    correcta: "a",
    explicacion: "La confesión es indivisible; no puede dividirse en perjuicio del confesante, salvo las excepciones legales.",
    articulo: "Art. 401 CPC",
  },
  {
    id: "mc_peritos",
    pregunta: "¿Cómo aprecia el tribunal el informe de peritos?",
    opciones: [
      { id: "a", texto: "Conforme a las reglas de la sana crítica" },
      { id: "b", texto: "Con pleno valor vinculante para el juez" },
      { id: "c", texto: "Como instrumento público tasado" },
    ],
    correcta: "a",
    explicacion: "La fuerza probatoria del dictamen pericial se aprecia conforme a la sana crítica; no obliga al juez.",
    articulo: "Art. 425 CPC",
  },
  {
    id: "mc_presunciones",
    pregunta: "¿Qué requisitos deben reunir las presunciones judiciales para constituir prueba?",
    opciones: [
      { id: "a", texto: "Ser graves, precisas y concordantes" },
      { id: "b", texto: "Ser numerosas, aunque sean vagas" },
      { id: "c", texto: "Constar siempre por escrito" },
    ],
    correcta: "a",
    explicacion: "Las presunciones judiciales deben ser graves, precisas y concordantes; una sola puede bastar si es grave y precisa.",
    articulo: "Arts. 426 CPC; 1712 CC",
  },
  {
    id: "mc_tachas",
    pregunta: "Un testigo es amigo íntimo de la parte que lo presenta. ¿Qué procede?",
    opciones: [
      { id: "a", texto: "Una tacha por inhabilidad relativa" },
      { id: "b", texto: "Una tacha por inhabilidad absoluta" },
      { id: "c", texto: "Nada: la amistad nunca afecta al testigo" },
    ],
    correcta: "a",
    explicacion: "La amistad íntima es causal de inhabilidad relativa para tachar al testigo (art. 358); las absolutas están en el 357.",
    articulo: "Arts. 357-358 CPC",
  },
  {
    id: "mc_oportunidad_doc",
    pregunta: "¿Cómo se acompañan, por regla general, los instrumentos en el juicio?",
    opciones: [
      { id: "a", texto: "Con citación los públicos; bajo apercibimiento del 346 N°3 los privados" },
      { id: "b", texto: "Siempre sin trámite alguno de la contraparte" },
      { id: "c", texto: "Solo durante los alegatos finales" },
    ],
    correcta: "a",
    explicacion: "Los instrumentos públicos se acompañan con citación; los privados emanados de la parte, bajo apercibimiento de tenerse por reconocidos si no se objetan (346 N°3).",
    articulo: "Arts. 342, 346 y 348 CPC",
  },
  {
    id: "mc_apreciacion",
    pregunta: "Hay dos pruebas contradictorias y la ley no resuelve cuál prefierir. ¿Qué hace el tribunal?",
    opciones: [
      { id: "a", texto: "Prefiere la que crea más conforme con la verdad" },
      { id: "b", texto: "Las descarta ambas por contradictorias" },
      { id: "c", texto: "Prefiere siempre la prueba testimonial" },
    ],
    correcta: "a",
    explicacion: "Entre pruebas contradictorias y a falta de ley que resuelva, los tribunales preferirán la que crean más conforme con la verdad (apreciación comparativa).",
    articulo: "Art. 428 CPC",
  },
  {
    id: "mc_no_prueba",
    pregunta: "¿Cuál de estos hechos NO requiere prueba?",
    opciones: [
      { id: "a", texto: "Los hechos admitidos expresamente por la contraparte" },
      { id: "b", texto: "Los hechos sustanciales y controvertidos" },
      { id: "c", texto: "Los hechos en que se funda la demanda y se niegan" },
    ],
    correcta: "a",
    explicacion: "No requieren prueba los hechos admitidos, los notorios, los presumidos por la ley y los negativos indefinidos; sí, los sustanciales, pertinentes y controvertidos.",
    articulo: "Art. 318 CPC",
  },
  {
    id: "mc_confesion_ficta",
    pregunta: "Citado a absolver posiciones, el absolvente no comparece a la segunda citación. ¿Qué ocurre?",
    opciones: [
      { id: "a", texto: "Se le puede tener por confeso de los hechos categóricamente afirmados" },
      { id: "b", texto: "Se sobresee la causa por falta de prueba" },
      { id: "c", texto: "Se cita por tercera y última vez sin sanción" },
    ],
    correcta: "a",
    explicacion: "El rebelde a la segunda citación (o que da respuestas evasivas) puede ser tenido por confeso respecto de los hechos categóricamente afirmados en el pliego.",
    articulo: "Art. 394 CPC",
  },
];

// ── VERDADERO / FALSO DIFÍCIL ───────────────────────────────────────────────
export interface VFItem {
  id: string;
  afirmacion: string;
  verdadero: boolean;
  explicacion: string;
  articulo: string;
}

export const VF_PRUEBA: VFItem[] = [
  { id: "vf1", afirmacion: "El instrumento público hace plena fe de la verdad de las declaraciones de las partes incluso respecto de terceros.", verdadero: false, explicacion: "Respecto de terceros hace fe del hecho de otorgarse y su fecha; la verdad de las declaraciones hace fe contra los declarantes, no necesariamente frente a terceros.", articulo: "Art. 1700 CC" },
  { id: "vf2", afirmacion: "La confesión judicial puede dividirse en perjuicio del confesante para tomar solo lo que le perjudica.", verdadero: false, explicacion: "La confesión es indivisible; no puede dividirse en perjuicio del confesante, salvo excepciones legales.", articulo: "Art. 401 CPC" },
  { id: "vf3", afirmacion: "El informe de peritos obliga al juez a fallar conforme a sus conclusiones.", verdadero: false, explicacion: "El peritaje se aprecia según la sana crítica y no obliga al tribunal.", articulo: "Art. 425 CPC" },
  { id: "vf4", afirmacion: "La regla general de valoración de la prueba en el proceso civil chileno es la sana crítica.", verdadero: false, explicacion: "La regla general en el proceso civil es la prueba legal o tasada; la sana crítica es excepcional (peritos, etc.).", articulo: "Arts. 1698 CC; 425 CPC" },
  { id: "vf5", afirmacion: "Una sola presunción judicial puede constituir plena prueba cuando es grave y precisa.", verdadero: true, explicacion: "El art. 426 permite que una sola presunción constituya plena prueba si, a juicio del tribunal, tiene caracteres de gravedad y precisión suficientes.", articulo: "Art. 426 CPC" },
  { id: "vf6", afirmacion: "Los hechos negativos jamás pueden ni deben probarse.", verdadero: false, explicacion: "La máxima 'lo negativo no se prueba' no es absoluta: el hecho negativo definido o concreto puede y suele probarse por el hecho positivo contrario.", articulo: "Doctrina; art. 1698 CC" },
  { id: "vf7", afirmacion: "La inspección personal del tribunal hace plena prueba de las circunstancias que el tribunal establece por sí mismo.", verdadero: true, explicacion: "El acta de inspección produce plena prueba respecto de los hechos o circunstancias que el tribunal constate directamente.", articulo: "Art. 408 CPC" },
  { id: "vf8", afirmacion: "La lista de testigos puede presentarse en cualquier momento del término probatorio.", verdadero: false, explicacion: "Debe presentarse dentro de los primeros 5 días del probatorio; fuera de plazo precluye la testimonial.", articulo: "Art. 320 CPC" },
  { id: "vf9", afirmacion: "El derecho, por regla general, no es objeto de prueba.", verdadero: true, explicacion: "Iura novit curia: el juez conoce el derecho; se prueban los hechos. Excepción: la costumbre y el derecho extranjero.", articulo: "Art. 318 CPC" },
  { id: "vf10", afirmacion: "La confesión extrajudicial puramente verbal tiene el mismo valor que la confesión judicial.", verdadero: false, explicacion: "La confesión extrajudicial verbal solo sirve como base de presunción y vale menos que la judicial, que produce plena prueba.", articulo: "Arts. 398 CPC; 1713 CC" },
  { id: "vf11", afirmacion: "Los hechos admitidos expresamente por la contraparte deben igualmente probarse.", verdadero: false, explicacion: "Los hechos admitidos no son controvertidos y, por tanto, no requieren prueba.", articulo: "Art. 318 CPC" },
  { id: "vf12", afirmacion: "El instrumento privado emanado de la parte y no objetado en plazo puede tenerse por reconocido.", verdadero: true, explicacion: "Acompañado bajo apercibimiento del art. 346 N°3, si no se objeta dentro del plazo se tiene por reconocido.", articulo: "Art. 346 N°3 CPC" },
];
