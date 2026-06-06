// ============================================================================
// ATLAS JURÍDICO — La "geografía" de los códigos. Estructura sistemática de los
// principales cuerpos legales chilenos para examen de grado: cómo se organizan
// y cuál es la lógica de distribución de sus materias. Conoce el mapa antes de
// recorrer el territorio.
// ============================================================================

export interface DivisionCodigo {
  id: string;
  nombre: string;
  arts: string;
  materias: string[];
  nota?: string;
  relacion?: { texto: string; href?: string };
}

export interface Codigo {
  id: string;
  nombre: string;
  sigla: string;
  icono: string;
  color: string;
  autor?: string;
  resumen: string;
  divisiones: DivisionCodigo[];
  logica: string[];
  respuestaGrado: string;
  tip?: string;
}

export const CODIGOS: Codigo[] = [
  // ── CÓDIGO CIVIL ──────────────────────────────────────────────────────────
  {
    id: "cc",
    nombre: "Código Civil",
    sigla: "CC",
    icono: "📘",
    color: "#4e86d6",
    autor: "Andrés Bello",
    resumen: "Un Título Preliminar y cuatro libros. Parte de los sujetos de derecho, sigue con los objetos sobre los que recaen los derechos, regula la transmisión patrimonial por causa de muerte y concluye con la circulación de la riqueza mediante obligaciones y contratos.",
    divisiones: [
      { id: "cc_tp", nombre: "Título Preliminar", arts: "Arts. 1 a 53", materias: ["La ley", "Promulgación y derogación", "Interpretación de la ley", "Efectos de la ley", "Definiciones legales"], nota: "Es la teoría general del ordenamiento civil." },
      { id: "cc_l1", nombre: "Libro I: De las Personas", arts: "Arts. 54 a 564", materias: ["Personas naturales", "Personas jurídicas", "Estado civil", "Matrimonio", "Filiación", "Alimentos", "Tutelas y curadurías"], nota: "¿Por qué la familia está en Personas? Porque históricamente el estado civil y las relaciones familiares eran atributos de la personalidad." },
      { id: "cc_l2", nombre: "Libro II: De los Bienes y su dominio, posesión, uso y goce", arts: "Arts. 565 a 950", materias: ["Clasificación de los bienes", "Dominio", "Posesión", "Mera tenencia", "Propiedad fiduciaria", "Usufructo", "Uso y habitación", "Servidumbres", "Reivindicación"], nota: "Corresponde esencialmente a los derechos reales.", relacion: { texto: "Se conecta con Civilis (hipoteca, derechos reales)", href: "/civilis" } },
      { id: "cc_l3", nombre: "Libro III: De la sucesión por causa de muerte y de las donaciones entre vivos", arts: "Arts. 951 a 1436", materias: ["Sucesión testada e intestada", "Herederos y legatarios", "Apertura de la sucesión", "Partición", "Asignaciones forzosas", "Testamentos", "Donaciones"], nota: "¿Por qué las donaciones están aquí? Por su afinidad sistemática con la sucesión: ambas son transmisión gratuita de bienes." },
      { id: "cc_l4", nombre: "Libro IV: De las obligaciones en general y de los contratos", arts: "Arts. 1437 a 2524", materias: ["Teoría general de las obligaciones (fuentes, efectos, cumplimiento, incumplimiento, indemnización, extinción)", "Contratos en particular (compraventa, permuta, arrendamiento, sociedad, mandato, mutuo, comodato, depósito, fianza, hipoteca, prenda, transacción)", "Responsabilidad civil contractual y extracontractual", "Prescripción adquisitiva y extintiva"], nota: "El libro más extenso del Código.", relacion: { texto: "Es el territorio de Civilis: el Reino de las Obligaciones", href: "/civilis" } },
      { id: "cc_fin", nombre: "Artículos finales", arts: "Arts. 2525 a 2527", materias: ["Normas de cierre y vigencia"] },
    ],
    logica: [
      "Personas: quiénes son los sujetos de derecho.",
      "Bienes: sobre qué recaen los derechos.",
      "Sucesión: cómo se transmiten los patrimonios.",
      "Obligaciones y contratos: cómo circula la riqueza y nacen los vínculos jurídicos.",
    ],
    respuestaGrado: "El Código Civil chileno se estructura en un Título Preliminar y cuatro libros. El Libro I regula las personas; el Libro II los bienes y derechos reales; el Libro III la sucesión por causa de muerte y las donaciones; y el Libro IV las obligaciones, contratos, responsabilidad civil y prescripción. La lógica sistemática de Bello parte de los sujetos de derecho, continúa con los objetos sobre los cuales recaen los derechos, regula luego la transmisión patrimonial por causa de muerte y concluye con la circulación patrimonial mediante obligaciones y contratos.",
    tip: "Demuestra visión panorámica del sistema, no solo memoria de artículos sueltos.",
  },

  // ── CÓDIGO DE PROCEDIMIENTO CIVIL ─────────────────────────────────────────
  {
    id: "cpc",
    nombre: "Código de Procedimiento Civil",
    sigla: "CPC",
    icono: "📕",
    color: "#b3433a",
    resumen: "Cuatro libros. Parte por las reglas generales del proceso, continúa con el procedimiento declarativo común, luego regula los procedimientos especiales y concluye con la jurisdicción no contenciosa.",
    divisiones: [
      { id: "cpc_l1", nombre: "Libro I: Disposiciones comunes a todo procedimiento", arts: "Arts. 1 a 252", materias: ["Competencia", "Implicancias y recusaciones", "Partes", "Patrocinio y poder", "Actuaciones judiciales", "Notificaciones", "Rebeldía", "Incidentes", "Acumulación de autos", "Medidas prejudiciales", "Medidas precautorias", "Costas"], nota: "Es la 'teoría general del proceso'." },
      { id: "cpc_l2", nombre: "Libro II: Del juicio ordinario", arts: "Arts. 253 a 433", materias: ["Juicio ordinario de mayor cuantía", "Demanda y contestación", "Réplica y dúplica", "Conciliación", "Prueba y observaciones a la prueba", "Citación para oír sentencia", "Sentencia definitiva", "(También el juicio sumario)"], nota: "El juicio ordinario es el procedimiento supletorio y de aplicación general.", relacion: { texto: "Palacio del Juicio Ordinario y Torre del Sumario", href: "/procesal/ordinario" } },
      { id: "cpc_l3", nombre: "Libro III: De los juicios especiales", arts: "Arts. 434 a 816 aprox.", materias: ["Juicio ejecutivo (título, mandamiento, embargo, excepciones del 464, remate)", "Citación de evicción", "Acciones posesorias", "Distribución de aguas", "Partición de bienes", "Procedimientos especiales diversos"], nota: "El libro más heterogéneo del Código.", relacion: { texto: "La Fortaleza Ejecutiva vive aquí", href: "/procesal/ejecutivo" } },
      { id: "cpc_l4", nombre: "Libro IV: De los actos judiciales no contenciosos", arts: "Arts. 817 y ss.", materias: ["Posesión efectiva testada", "Nombramiento de curadores", "Autorizaciones judiciales", "Declaraciones y habilitaciones diversas"], nota: "Jurisdicción voluntaria: el tribunal interviene sin resolver una controversia." },
    ],
    logica: [
      "Reglas comunes: lo que sirve para cualquier proceso (Libro I).",
      "Procedimiento declarativo general: el procedimiento tipo (Libro II).",
      "Procedimientos especiales: con características propias (Libro III).",
      "Jurisdicción no contenciosa: actuaciones sin litigio (Libro IV).",
    ],
    respuestaGrado: "El Código de Procedimiento Civil se estructura en cuatro libros. El Libro I contiene las disposiciones comunes a todo procedimiento, incluyendo competencia, partes, actuaciones judiciales, notificaciones, incidentes y medidas cautelares. El Libro II regula el juicio ordinario, que constituye el procedimiento declarativo de aplicación general y supletoria. El Libro III contempla los juicios especiales, destacando el juicio ejecutivo. Finalmente, el Libro IV regula los actos judiciales no contenciosos. La lógica del Código consiste en partir por las reglas generales del proceso, continuar con el procedimiento declarativo común, luego regular los procedimientos especiales y concluir con la jurisdicción no contenciosa.",
    tip: "Observación elegante: «La estructura del CPC refleja el tránsito desde la teoría general del proceso hacia formas cada vez más específicas de ejercicio de la jurisdicción, terminando con actuaciones en que ni siquiera existe controversia entre partes.»",
  },

  // ── CONSTITUCIÓN POLÍTICA DE LA REPÚBLICA ─────────────────────────────────
  {
    id: "cpr",
    nombre: "Constitución Política de la República",
    sigla: "CPR",
    icono: "🏛️",
    color: "#c8a24c",
    resumen: "Bases de la institucionalidad, regulación de la comunidad política y sus derechos, organización del poder estatal, distribución territorial y mecanismos de reforma.",
    divisiones: [
      { id: "cpr_1", nombre: "Capítulo I: Bases de la Institucionalidad", arts: "Arts. 1 a 9", materias: ["Dignidad de la persona", "Servicialidad del Estado y bien común", "Subsidiariedad", "Estado unitario; descentralización y desconcentración", "Soberanía", "Supremacía constitucional", "Probidad y transparencia", "Juridicidad"], nota: "Punto de partida de casi toda pregunta de organización del Estado." },
      { id: "cpr_2", nombre: "Capítulo II: Nacionalidad y Ciudadanía", arts: "Cap. II", materias: ["Nacionalidad", "Pérdida y recuperación", "Ciudadanía", "Derecho a sufragio"] },
      { id: "cpr_3", nombre: "Capítulo III: Derechos y Deberes Constitucionales", arts: "Art. 19 (principalmente)", materias: ["Derechos civiles", "Derechos políticos", "Derechos económicos", "Derechos sociales", "Garantías de protección"], nota: "Probablemente el capítulo más importante para el examen de grado." },
      { id: "cpr_4", nombre: "Capítulo IV: Gobierno", arts: "Cap. IV", materias: ["Presidente de la República", "Elección y atribuciones", "Ministros de Estado"], nota: "Aquí comienza la organización del poder político." },
      { id: "cpr_5", nombre: "Capítulo V: Congreso Nacional", arts: "Cap. V", materias: ["Cámara de Diputados y Diputadas", "Senado", "Formación de la ley", "Fiscalización", "Acusación constitucional"] },
      { id: "cpr_6", nombre: "Capítulo VI: Poder Judicial", arts: "Cap. VI", materias: ["Tribunales de justicia", "Independencia judicial", "Inamovilidad", "Imperio"] },
      { id: "cpr_7", nombre: "Capítulo VII: Ministerio Público", arts: "Cap. VII", materias: ["Fiscalía Nacional", "Fiscales Regionales", "Función persecutoria penal"] },
      { id: "cpr_8", nombre: "Capítulo VIII: Tribunal Constitucional", arts: "Cap. VIII", materias: ["Integración", "Competencias", "Control preventivo y represivo de constitucionalidad"] },
      { id: "cpr_9", nombre: "Capítulo IX: Servicio Electoral y Justicia Electoral", arts: "Cap. IX", materias: ["SERVEL", "Tribunales electorales"] },
      { id: "cpr_10", nombre: "Capítulo X: Contraloría General de la República", arts: "Cap. X", materias: ["Toma de razón", "Control de legalidad", "Fiscalización"], nota: "Conecta control y Administración." },
      { id: "cpr_11", nombre: "Capítulo XI: Fuerzas Armadas, de Orden y Seguridad Pública", arts: "Cap. XI", materias: ["Fuerzas Armadas", "Carabineros", "Policía de Investigaciones"] },
      { id: "cpr_12", nombre: "Capítulo XII: Consejo de Seguridad Nacional", arts: "Cap. XII", materias: ["COSENA (funciones hoy muy limitadas)"] },
      { id: "cpr_13", nombre: "Capítulo XIII: Banco Central", arts: "Cap. XIII", materias: ["Autonomía", "Funciones monetarias y financieras"] },
      { id: "cpr_14", nombre: "Capítulo XIV: Gobierno y Administración Interior del Estado", arts: "Cap. XIV", materias: ["Regiones", "Gobiernos regionales", "Municipalidades", "Descentralización y desconcentración"], nota: "Suele enlazarse con el art. 3°.", relacion: { texto: "Conecta con Ley 18.575 (organización de la Administración)" } },
      { id: "cpr_15", nombre: "Capítulo XV: Reforma de la Constitución", arts: "Cap. XV", materias: ["Procedimiento de reforma", "Quórums", "Participación presidencial"] },
    ],
    logica: [
      "Principios fundamentales: las bases del sistema (Cap. I).",
      "Relación Estado-persona: quién integra la comunidad política y qué derechos tiene (Caps. II y III).",
      "Organización del poder: Ejecutivo, Legislativo, Judicial y órganos autónomos (Caps. IV a XIII).",
      "Organización territorial: cómo se distribuye el poder en el territorio (Cap. XIV).",
      "Cambio constitucional: cómo se modifica la propia Constitución (Cap. XV).",
    ],
    respuestaGrado: "La Constitución se estructura sobre una lógica que parte por las Bases de la Institucionalidad, continúa con la regulación de la comunidad política mediante la nacionalidad, ciudadanía y derechos fundamentales, luego organiza los órganos que ejercen el poder estatal, regula la distribución territorial del poder y concluye estableciendo los mecanismos de reforma constitucional. En otras palabras, responde sucesivamente a cinco preguntas: cuáles son los principios fundamentales del Estado, quiénes integran la comunidad política, qué derechos poseen, cómo se organiza el poder y cómo puede modificarse el propio texto constitucional.",
    tip: "Conecta Bases de la Institucionalidad, derechos fundamentales y organización del Estado en una sola estructura conceptual.",
  },

  // ── LEY 18.575 ────────────────────────────────────────────────────────────
  {
    id: "l18575",
    nombre: "Ley 18.575 — Bases Generales de la Administración del Estado",
    sigla: "18.575",
    icono: "🏢",
    color: "#3f9d6b",
    resumen: "Regula la organización y los principios de la Administración. Responde a la perspectiva orgánica: quién administra y bajo qué principios.",
    divisiones: [
      { id: "l1_1", nombre: "I. Bases y principios", arts: "Título I", materias: ["Servicialidad", "Juridicidad", "Responsabilidad", "Eficiencia y eficacia", "Coordinación", "Control", "Probidad", "Transparencia"], nota: "Aquí está el 'ADN' de la Administración." },
      { id: "l1_2", nombre: "II. Organización administrativa", arts: "Título II", materias: ["Administración centralizada y descentralizada", "Ministerios y subsecretarías", "Servicios públicos", "Delegados presidenciales", "Órganos administrativos"], nota: "Responde: ¿cómo se organiza la Administración?" },
      { id: "l1_3", nombre: "III. Funcionamiento de la Administración", arts: "Título II", materias: ["Competencia", "Delegación", "Avocación", "Coordinación", "Control jerárquico"], nota: "Responde: ¿cómo actúan los órganos administrativos?" },
      { id: "l1_4", nombre: "IV. Responsabilidad", arts: "Título III", materias: ["Responsabilidad administrativa", "Responsabilidad civil", "Responsabilidad disciplinaria"], nota: "Responde: ¿qué ocurre cuando la Administración actúa incorrectamente?" },
    ],
    logica: [
      "Principios: el ADN de la Administración.",
      "Organización: la estructura de los órganos.",
      "Funcionamiento: cómo actúan (competencia, delegación, avocación).",
      "Responsabilidad y control: qué pasa cuando actúa mal.",
    ],
    respuestaGrado: "La Ley 18.575 contiene las bases orgánicas de la Administración. Parte estableciendo principios, continúa regulando la estructura de los órganos administrativos, luego determina las reglas de funcionamiento y termina consagrando los mecanismos de responsabilidad y control.",
    tip: "Es la perspectiva ORGÁNICA: quién administra y bajo qué principios.",
  },

  // ── LEY 19.880 ────────────────────────────────────────────────────────────
  {
    id: "l19880",
    nombre: "Ley 19.880 — Bases de los Procedimientos Administrativos",
    sigla: "19.880",
    icono: "📋",
    color: "#a06cd5",
    resumen: "Regula la forma en que la Administración dicta sus actos. Responde a la perspectiva funcional o procedimental: cómo actúa la Administración para adoptar decisiones válidas.",
    divisiones: [
      { id: "l2_1", nombre: "I. Principios del procedimiento", arts: "Arts. 4 y ss.", materias: ["Escrituración", "Gratuidad", "Celeridad", "Economía procedimental", "Contradictoriedad", "Impugnabilidad", "Transparencia", "No formalización", "Conclusivo", "Inexcusabilidad", "Conservación", "Imparcialidad"] },
      { id: "l2_2", nombre: "II. Inicio del procedimiento", arts: "Iniciación", materias: ["De oficio", "A petición del interesado"] },
      { id: "l2_3", nombre: "III. Instrucción", arts: "Etapa probatoria", materias: ["Alegaciones", "Informes", "Pruebas", "Antecedentes"], nota: "Equivale, en cierta medida, al término probatorio del proceso judicial." },
      { id: "l2_4", nombre: "IV. Terminación", arts: "Formas de término", materias: ["Resolución final", "Desistimiento", "Renuncia", "Abandono", "Imposibilidad material", "Decaimiento (construcción doctrinal y jurisprudencial)"], nota: "Aquí aparece el acto administrativo terminal." },
      { id: "l2_5", nombre: "V. Notificación y publicación", arts: "Eficacia del acto", materias: ["Cuándo produce efectos el acto", "Cómo se comunica"] },
      { id: "l2_6", nombre: "VI. Impugnación", arts: "Recursos administrativos", materias: ["Reposición", "Jerárquico", "Revisión extraordinaria"], nota: "Responde: ¿cómo se combate un acto administrativo?" },
    ],
    logica: [
      "Principios que informan toda actuación.",
      "Inicio: de oficio o a petición del interesado.",
      "Tramitación: la instrucción (antecedentes y pruebas).",
      "Decisión: terminación mediante el acto o vías anormales.",
      "Comunicación: notificación y publicación.",
      "Impugnación: los recursos administrativos.",
    ],
    respuestaGrado: "La Ley 19.880 regula el procedimiento administrativo. Su estructura comienza con los principios que informan toda actuación administrativa; continúa con las reglas de iniciación del procedimiento; luego regula la etapa de instrucción, donde se reúnen antecedentes y pruebas; posteriormente contempla las formas de terminación mediante el acto administrativo o mecanismos anormales; regula la notificación y publicación de las decisiones; y finalmente establece los recursos administrativos destinados a impugnar los actos de la Administración.",
    tip: "Vínculo elegante: la 18.575 regula a la Administración desde una perspectiva ORGÁNICA (quién administra y bajo qué principios); la 19.880 la regula desde una perspectiva FUNCIONAL o procedimental (cómo actúa para dictar actos válidos).",
  },
];

export const getCodigo = (id: string) => CODIGOS.find((c) => c.id === id);
