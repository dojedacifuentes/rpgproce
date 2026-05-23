export type ChallengeKind = "decision" | "expediente" | "orden" | "oral";

export type MissionOption = {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
  consequence: string;
};

export type MissionPlaybook = {
  missionId: string;
  worldId: string;
  title: string;
  subtitle: string;
  npc: {
    name: string;
    role: string;
    avatar: string;
    line: string;
  };
  dossier: {
    rol: string;
    facts: string[];
    clues: string[];
  };
  challenge: {
    kind: ChallengeKind;
    prompt: string;
    options: MissionOption[];
  };
  feedback: {
    correct: string;
    wrong: string;
    exam: string;
    article: string;
    institution: string;
  };
  unlock: {
    title: string;
    description: string;
  };
  nextHint: string;
};

const commonWrong = "Respuesta plausible, pero incompleta para examen de grado: falta conectar norma, institucion y consecuencia procesal.";

export const MISSION_PLAYBOOKS: Record<string, MissionPlaybook> = {
  m1_1: {
    missionId: "m1_1",
    worldId: "competencia",
    title: "El origen de la jurisdiccion",
    subtitle: "Disposiciones comunes / competencia",
    npc: {
      name: "Dra. Noemi Vasquez",
      role: "Jueza de primera instancia",
      avatar: "JZ",
      line: "La jurisdiccion no es un superpoder del abogado. Es funcion publica. Si confundes eso en grado, el silencio de la comision tendra valor probatorio moral.",
    },
    dossier: {
      rol: "C-001-2026",
      facts: [
        "Un cliente quiere demandar en cualquier tribunal porque el demandado tiene mala fama.",
        "El asunto es civil, contencioso, y requiere decision de un tribunal establecido por ley.",
        "El primer problema no es la estrategia, sino identificar jurisdiccion y competencia.",
      ],
      clues: ["Art. 76 CPR", "Art. 1 COT", "Competencia distribuye jurisdiccion, no la crea."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Cual es la formulacion juridicamente mas segura para iniciar el analisis?",
      options: [
        {
          id: "a",
          text: "La jurisdiccion es la funcion publica de conocer, juzgar y hacer ejecutar lo juzgado; luego se analiza competencia.",
          correct: true,
          feedback: "Correcto. Separas jurisdiccion de competencia y partes desde art. 76 CPR / art. 1 COT.",
          consequence: "El tribunal abre la puerta correcta del archivo.",
        },
        {
          id: "b",
          text: "La jurisdiccion depende de que el demandante elija el tribunal mas conveniente.",
          correct: false,
          feedback: "Incorrecto. Eso confunde jurisdiccion con estrategia territorial o prorroga de competencia relativa.",
          consequence: "La demanda queda oliendo a nulidad antes de ser presentada.",
        },
        {
          id: "c",
          text: "La competencia es una facultad privada que las partes pueden pactar siempre.",
          correct: false,
          feedback: "Incorrecto. La competencia absoluta es de orden publico e improrrogable; solo la relativa admite prorroga en ciertos casos.",
          consequence: "La jueza anota: 'promete, pero amenaza al COT'.",
        },
      ],
    },
    feedback: {
      correct: "La respuesta correcta distingue jurisdiccion, competencia absoluta y competencia relativa.",
      wrong: commonWrong,
      exam: "En grado: define jurisdiccion, cita art. 76 CPR/art. 1 COT, enumera rasgos y recien despues baja a competencia.",
      article: "Art. 76 CPR / Art. 1 COT",
      institution: "Jurisdiccion y competencia",
    },
    unlock: { title: "Llave del tribunal competente", description: "Permite leer mapas por tribunal, materia, cuantia, fuero y territorio." },
    nextHint: "Ahora clasifica tribunal y factor de competencia antes de litigar.",
  },
  m1_2: {
    missionId: "m1_2",
    worldId: "competencia",
    title: "Clasificar el tribunal",
    subtitle: "Mapa de competencia",
    npc: {
      name: "Actuario de Turno",
      role: "Funcionario de meson",
      avatar: "AC",
      line: "El meson no rechaza demandas: las mira con decepcion administrativa. Eso duele mas.",
    },
    dossier: {
      rol: "C-014-2026",
      facts: [
        "Cobro civil de $80.000.000 contra demandado domiciliado en Santiago.",
        "No hay fuero personal ni materia especial.",
        "La demanda fue preparada en Valparaiso por comodidad del abogado.",
      ],
      clues: ["Regla general territorial: domicilio del demandado.", "La comodidad del abogado no es factor de competencia.", "Distinguir absoluta y relativa."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Que decision evita el primer vicio?",
      options: [
        {
          id: "a",
          text: "Presentar ante el tribunal civil competente del domicilio del demandado, salvo regla especial.",
          correct: true,
          feedback: "Correcto. En ausencia de regla especial, el domicilio del demandado orienta la competencia relativa.",
          consequence: "El mapa deja de parpadear en rojo.",
        },
        {
          id: "b",
          text: "Presentar en Valparaiso porque el abogado trabaja ahi.",
          correct: false,
          feedback: "Incorrecto. La sede del abogado no determina competencia.",
          consequence: "El expediente vuelve con una etiqueta: 'No convierta OneDrive en COT'.",
        },
        {
          id: "c",
          text: "Presentar directamente ante Corte de Apelaciones por la cuantia.",
          correct: false,
          feedback: "Incorrecto. La cuantia no convierte un asunto civil comun en conocimiento directo de Corte.",
          consequence: "La Corte ni siquiera activa el ascensor.",
        },
      ],
    },
    feedback: {
      correct: "La competencia se analiza por materia, fuero, cuantia y territorio, sin saltarse el tribunal natural.",
      wrong: commonWrong,
      exam: "Responde por factores: materia, fuero, cuantia y territorio; luego indica si el vicio seria absoluto o relativo.",
      article: "Arts. 45-148 COT",
      institution: "Competencia absoluta y relativa",
    },
    unlock: { title: "Brújula del COT", description: "Marca tribunal y factor de competencia en el expediente." },
    nextHint: "El siguiente caso exige detectar un vicio antes de que precluya.",
  },
  m1_3: {
    missionId: "m1_3",
    worldId: "competencia",
    title: "El primer vicio",
    subtitle: "Incompetencia y reaccion procesal",
    npc: {
      name: "Bibliotecario Borgiano",
      role: "Custodio de expedientes imposibles",
      avatar: "BB",
      line: "Todo tribunal es un laberinto. Algunos, ademas, son incompetentes. Es una diferencia poetica y procesal.",
    },
    dossier: {
      rol: "C-021-2026",
      facts: [
        "La demanda se tramita ante tribunal territorialmente incompetente.",
        "El demandado aun no contesta.",
        "El abogado duda entre alegar ahora o esperar la sentencia.",
      ],
      clues: ["La competencia relativa puede prorrogarse.", "La oportunidad procesal importa.", "La incompetencia absoluta tiene otro regimen."],
    },
    challenge: {
      kind: "expediente",
      prompt: "¿Cual es la estrategia defensiva mas segura?",
      options: [
        {
          id: "a",
          text: "Oponer la incompetencia relativa oportunamente como excepcion dilatoria antes de contestar.",
          correct: true,
          feedback: "Correcto. Si contesta sin reclamar, puede operar prorroga tacita de competencia relativa.",
          consequence: "El expediente recupera pulso procesal.",
        },
        {
          id: "b",
          text: "Contestar el fondo y guardar la incompetencia para apelacion.",
          correct: false,
          feedback: "Incorrecto. En competencia relativa, esa pasividad puede convalidar o prorrogar.",
          consequence: "El vicio se vuelve recuerdo, no defensa.",
        },
        {
          id: "c",
          text: "Interponer casacion en la forma inmediatamente.",
          correct: false,
          feedback: "Incorrecto. Aun no hay sentencia susceptible; primero corresponde defensa incidental/dilatoria.",
          consequence: "La Corte responde desde el futuro: 'todavia no'.",
        },
      ],
    },
    feedback: {
      correct: "La competencia relativa debe reclamarse oportunamente; la defensa tardia puede fracasar.",
      wrong: commonWrong,
      exam: "En grado explica oportunidad, naturaleza del vicio y consecuencia de no reclamar.",
      article: "Art. 303 N°1 CPC / COT competencia relativa",
      institution: "Excepcion dilatoria de incompetencia",
    },
    unlock: { title: "Detector de vicios tempranos", description: "Reduce riesgo al iniciar misiones de demanda y emplazamiento." },
    nextHint: "Derrota a la Esfinge para cerrar el Acto I.",
  },
  m2_1: {
    missionId: "m2_1",
    worldId: "nulidad",
    title: "El expediente 38",
    subtitle: "Emplazamiento y nulidad",
    npc: {
      name: "Receptor Castro",
      role: "Receptor judicial",
      avatar: "RC",
      line: "Notificar no es tirar papeles en una puerta y rezar. Aunque admito que el sistema a veces se parece.",
    },
    dossier: {
      rol: "C-038-2026",
      facts: [
        "Demanda notificada por estado diario al demandado que nunca comparecio.",
        "No consta notificacion personal ni personal subsidiaria.",
        "Se dicto sentencia condenatoria en rebeldia.",
      ],
      clues: ["Primera notificacion de demanda: regla personal.", "Emplazamiento = notificacion valida + plazo.", "La falta de emplazamiento afecta defensa."],
    },
    challenge: {
      kind: "expediente",
      prompt: "¿Que vicio debe denunciarse?",
      options: [
        {
          id: "a",
          text: "Falta de emplazamiento valido; procede alegar nulidad por indefension.",
          correct: true,
          feedback: "Correcto. La primera notificacion de la demanda no puede degradarse a estado diario.",
          consequence: "El receptor fantasma pierde forma corporal.",
        },
        {
          id: "b",
          text: "No hay vicio: si esta en el estado diario, todos deben enterarse.",
          correct: false,
          feedback: "Incorrecto. El estado diario opera como regla general para resoluciones posteriores, no sustituye el emplazamiento inicial.",
          consequence: "El demandado sigue condenado en un juicio que no conocio.",
        },
        {
          id: "c",
          text: "Solo corresponde pedir aclaracion, rectificacion o enmienda.",
          correct: false,
          feedback: "Incorrecto. ARE corrige oscuridades o errores formales de resoluciones; no sanea falta de emplazamiento.",
          consequence: "El vicio se rie en letra chica.",
        },
      ],
    },
    feedback: {
      correct: "Sin emplazamiento valido no hay defensa real; la nulidad exige perjuicio y debe alegarse por via idonea.",
      wrong: commonWrong,
      exam: "En grado: explica notificacion valida, plazo para contestar, perjuicio y medio para reclamar.",
      article: "Arts. 40, 44, 48, 50 y 768 N°9 CPC",
      institution: "Emplazamiento y nulidad procesal",
    },
    unlock: { title: "Cedula intacta", description: "Agrega una pista permanente sobre notificaciones defectuosas." },
    nextHint: "Ahora clasifica tipos de notificacion bajo presion.",
  },
  m2_2: {
    missionId: "m2_2",
    worldId: "nulidad",
    title: "Tipos de notificacion",
    subtitle: "Oficina maldita del receptor",
    npc: {
      name: "Funcionario espectral",
      role: "Archivo de cedulas",
      avatar: "FE",
      line: "Las cedulas mal hechas no mueren. Vuelven como incidentes.",
    },
    dossier: {
      rol: "N-044-2026",
      facts: [
        "Auto de prueba notificado por estado diario.",
        "Sentencia definitiva notificada por cedula.",
        "Primera notificacion de la demanda intentada personalmente.",
      ],
      clues: ["Auto de prueba: cedula.", "Sentencia definitiva: cedula.", "Demanda: personal o subsidiaria si procede."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Cual clasificacion es correcta?",
      options: [
        {
          id: "a",
          text: "Demanda: personal; auto de prueba y sentencia definitiva: cedula.",
          correct: true,
          feedback: "Correcto. Es la triada que salva al expediente de la noche eterna.",
          consequence: "Las cedulas se alinean en orden legal.",
        },
        {
          id: "b",
          text: "Todo se notifica por estado diario salvo que el juez ordene otra cosa.",
          correct: false,
          feedback: "Incorrecto. Hay resoluciones con forma especial de notificacion.",
          consequence: "El plazo nace torcido.",
        },
        {
          id: "c",
          text: "La sentencia definitiva siempre se notifica personalmente.",
          correct: false,
          feedback: "Incorrecto. En el procedimiento civil comun, la sentencia definitiva se notifica por cedula.",
          consequence: "El receptor te cobra igual. El vicio tambien.",
        },
      ],
    },
    feedback: {
      correct: "La forma de notificacion determina desde cuando corren plazos y recursos.",
      wrong: commonWrong,
      exam: "Responde siempre con forma de notificacion, norma y consecuencia en plazo/recurso.",
      article: "Arts. 40, 48 y 50 CPC",
      institution: "Notificaciones judiciales",
    },
    unlock: { title: "Mapa de cedulas", description: "Permite ver el origen de cada plazo en el expediente." },
    nextHint: "El reloj procesal empieza a correr.",
  },
  m2_3: {
    missionId: "m2_3",
    worldId: "nulidad",
    title: "El plazo fatal",
    subtitle: "Reloj de preclusion",
    npc: {
      name: "Secretaria Patricia",
      role: "Guardiana de plazos",
      avatar: "SP",
      line: "Los plazos no son sugerencias. Son pequeñas guillotinas con membrete.",
    },
    dossier: {
      rol: "P-015-2026",
      facts: [
        "Demandado notificado validamente el lunes.",
        "Debe contestar en plazo legal aplicable.",
        "El abogado quiere esperar a revisar 'con calma'.",
      ],
      clues: ["El plazo nace con notificacion valida.", "La contestacion tardia precluye.", "Distinguir dias habiles y reglas especiales."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Que regla estrategica debes aplicar?",
      options: [
        {
          id: "a",
          text: "Identificar fecha de notificacion valida, plazo aplicable y vencimiento antes de decidir defensa.",
          correct: true,
          feedback: "Correcto. El plazo se calcula antes de la teoria del caso, no despues.",
          consequence: "El reloj baja su volumen. No su amenaza.",
        },
        {
          id: "b",
          text: "Contestar cuando este lista la mejor defensa, aunque venza el plazo.",
          correct: false,
          feedback: "Incorrecto. La defensa perfecta fuera de plazo es literatura postuma.",
          consequence: "Preclusion. El expediente sonrie sin dientes.",
        },
        {
          id: "c",
          text: "Pedir nulidad solo porque el plazo incomoda.",
          correct: false,
          feedback: "Incorrecto. La nulidad exige vicio y perjuicio; no es una prorroga emocional.",
          consequence: "La secretaria archiva tu optimismo.",
        },
      ],
    },
    feedback: {
      correct: "Plazo, notificacion y preclusion forman una cadena: si una pieza falla, cambia toda la estrategia.",
      wrong: commonWrong,
      exam: "En grado: fecha de notificacion, clase de plazo, computo, vencimiento y efecto de no actuar.",
      article: "Arts. 64, 258 y 259 CPC",
      institution: "Plazos y preclusion",
    },
    unlock: { title: "Reloj de plazos", description: "Muestra riesgo procesal en misiones futuras." },
    nextHint: "El periodo de prueba exige ordenar hechos y medios.",
  },
  m3_1: {
    missionId: "m3_1",
    worldId: "prueba",
    title: "Los seis medios",
    subtitle: "Detective noir probatorio",
    npc: {
      name: "Escribana Gloria",
      role: "Custodia documental",
      avatar: "EG",
      line: "Un documento publico bien leido vale mas que tres testigos nerviosos y un perito con sueño.",
    },
    dossier: {
      rol: "P-341-2026",
      facts: [
        "Se discute existencia de contrato, cumplimiento y monto del daño.",
        "Hay escritura publica, correos privados, testigos y pericia contable.",
        "La contraparte objeta oportunidad y valor probatorio.",
      ],
      clues: ["Instrumentos publicos y privados tienen reglas distintas.", "La prueba debe rendirse oportunamente.", "Art. 1698 CC: carga de probar obligaciones o extincion."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Que estrategia probatoria es mas completa?",
      options: [
        {
          id: "a",
          text: "Acompañar documental, preparar testigos sobre hechos y pericia para cuantificar el daño.",
          correct: true,
          feedback: "Correcto. Conectas existencia, hechos y cuantificacion.",
          consequence: "La lampara noir ilumina el punto de prueba.",
        },
        {
          id: "b",
          text: "Usar solo testigos porque son mas dramaticos.",
          correct: false,
          feedback: "Incorrecto. La dramatica no reemplaza valor probatorio ni cuantificacion tecnica.",
          consequence: "El juez bosteza con sana critica.",
        },
        {
          id: "c",
          text: "Guardar documentos para sorprender en sentencia.",
          correct: false,
          feedback: "Incorrecto. La oportunidad probatoria importa; sorprender tarde suele significar perder.",
          consequence: "La prueba aparece cuando el tren ya salio.",
        },
      ],
    },
    feedback: {
      correct: "La prueba se diseña segun hechos controvertidos, carga probatoria y oportunidad.",
      wrong: commonWrong,
      exam: "En grado: identifica hecho a probar, medio idoneo, oportunidad y valor probatorio.",
      article: "Arts. 341-427 CPC / Art. 1698 CC",
      institution: "Medios de prueba y carga probatoria",
    },
    unlock: { title: "Lampara de sana critica", description: "Revela contradicciones en casos investigativos." },
    nextHint: "Ahora prueba contra el reloj de la preclusion.",
  },
  m3_2: {
    missionId: "m3_2",
    worldId: "prueba",
    title: "Preclusion oculta",
    subtitle: "Prueba tardia",
    npc: { name: "Detective del expediente", role: "Investigador probatorio", avatar: "DP", line: "Toda prueba tardia dice que es excepcional. Casi ninguna lo es." },
    dossier: {
      rol: "P-326-2026",
      facts: [
        "El termino probatorio vencio.",
        "La parte intenta acompañar documentos antiguos diciendo que 'recien los encontro'.",
        "No acredita hecho posterior al cierre.",
      ],
      clues: ["Cierre del termino probatorio.", "Prueba superviniente no es prueba olvidada.", "Preclusion sanciona inactividad."],
    },
    challenge: {
      kind: "expediente",
      prompt: "¿Como resuelves la solicitud?",
      options: [
        { id: "a", text: "Rechazar por preclusion salvo que acredite verdadera superviniencia legal.", correct: true, feedback: "Correcto. Nuevo para la parte no siempre es superviniente para el proceso.", consequence: "La carpeta deja de sangrar fechas." },
        { id: "b", text: "Aceptar siempre porque la verdad material es superior al plazo.", correct: false, feedback: "Incorrecto. El proceso civil funciona con oportunidades; sin preclusion, nunca termina.", consequence: "El juicio se vuelve infinito y carisimo." },
        { id: "c", text: "Declarar abandono del procedimiento.", correct: false, feedback: "Incorrecto. Abandono exige inactividad procesal por periodo legal, no prueba tardia puntual.", consequence: "Confundes cementerios procesales." },
      ],
    },
    feedback: {
      correct: "La oportunidad probatoria protege contradiccion y cierre del debate.",
      wrong: commonWrong,
      exam: "En grado compara prueba oportuna, superviniente y preclusion.",
      article: "Arts. 318, 320, 326 y 348 CPC",
      institution: "Preclusion probatoria",
    },
    unlock: { title: "Sello de oportunidad", description: "Marca pruebas tardias en el expediente interactivo." },
    nextHint: "Reconstruye cronologicamente el juicio ordinario.",
  },
  m3_3: {
    missionId: "m3_3",
    worldId: "ordinario",
    title: "El orden del juicio",
    subtitle: "Cronologia ordinaria",
    npc: { name: "Caballero litigante", role: "Guia medieval procesal", avatar: "CL", line: "En este reino, hasta la espada presenta replica y duplica." },
    dossier: {
      rol: "O-253-2026",
      facts: ["El expediente esta desordenado.", "Faltan etapas entre demanda y sentencia.", "Debes reconstruir el mapa para evitar causal de forma."],
      clues: ["Demanda y emplazamiento.", "Discusion: contestacion, replica, duplica.", "Conciliacion, prueba, observaciones, sentencia y recursos."],
    },
    challenge: {
      kind: "orden",
      prompt: "¿Cual orden es el correcto?",
      options: [
        { id: "a", text: "Demanda -> emplazamiento -> contestacion -> replica/duplica -> conciliacion -> prueba -> observaciones -> sentencia -> recursos.", correct: true, feedback: "Correcto. Es el esqueleto de examen para juicio ordinario.", consequence: "El castillo abre el puente levadizo." },
        { id: "b", text: "Demanda -> prueba -> contestacion -> sentencia -> emplazamiento.", correct: false, feedback: "Incorrecto. Sin emplazamiento y discusion no hay contradictorio real.", consequence: "El castillo se convierte en nulidad." },
        { id: "c", text: "Demanda -> sentencia -> recursos -> prueba si la Corte quiere.", correct: false, feedback: "Incorrecto. La prueba pertenece a la instancia segun reglas de oportunidad.", consequence: "Un medieval procesal te quita la pluma." },
      ],
    },
    feedback: {
      correct: "El orden procesal no es decorativo: estructura defensa, prueba y recursos.",
      wrong: commonWrong,
      exam: "Responde juicio ordinario como linea de tiempo y ubica cada institucion.",
      article: "Arts. 253-433 CPC",
      institution: "Juicio ordinario de mayor cuantia",
    },
    unlock: { title: "Mapa de etapas", description: "Desbloquea vista cronologica del expediente." },
    nextHint: "La sentencia puede esconder ultra petita.",
  },
  m4_1: {
    missionId: "m4_1",
    worldId: "recursos",
    title: "La sentencia ultra petita",
    subtitle: "Vicio en lo resolutivo",
    npc: { name: "Lic. Neruda", role: "Abogado recursivo", avatar: "LN", line: "La sentencia no puede conceder mas de lo pedido. Cuando lo hace, no es generosa: es anulable." },
    dossier: {
      rol: "R-768-2026",
      facts: ["Demanda pide $30.000.000.", "Sentencia condena a $35.000.000.", "Lucro cesante no fue pedido expresamente."],
      clues: ["Congruencia.", "Agravio.", "Casacion en la forma si encaja causal."],
    },
    challenge: {
      kind: "expediente",
      prompt: "¿Que recurso/argumento corresponde preparar?",
      options: [
        { id: "a", text: "Casacion en la forma por ultra petita, mostrando exceso sobre lo pedido y perjuicio.", correct: true, feedback: "Correcto. La sentencia excede el marco del petitorio.", consequence: "La dimension de recursos se fractura a tu favor." },
        { id: "b", text: "Reposicion ordinaria porque toda sentencia puede reponerse.", correct: false, feedback: "Incorrecto. La reposicion ordinaria procede contra autos y decretos como regla general, no contra sentencia definitiva.", consequence: "La Corte no abre ni el portal." },
        { id: "c", text: "Nada: el juez puede conceder lo justo aunque no se haya pedido.", correct: false, feedback: "Incorrecto. El principio de congruencia limita la sentencia a lo debatido y pedido.", consequence: "El fallo crece como monstruo procesal." },
      ],
    },
    feedback: {
      correct: "La congruencia vincula demanda, defensa y sentencia; el exceso genera agravio.",
      wrong: commonWrong,
      exam: "En grado: identifica resolucion, agravio, causal, preparacion si procede, plazo, tribunal y peticion.",
      article: "Art. 768 CPC / Art. 170 CPC",
      institution: "Casacion en la forma y congruencia",
    },
    unlock: { title: "Lente de congruencia", description: "Permite comparar petitorio y parte resolutiva." },
    nextHint: "Revisa requisitos internos de la sentencia.",
  },
  m4_2: {
    missionId: "m4_2",
    worldId: "recursos",
    title: "Requisitos de la sentencia",
    subtitle: "Articulacion de fallo",
    npc: { name: "Juez de Hierro", role: "Sentenciador mecanico", avatar: "JH", line: "Yo dicto sentencias perfectas. Las humanas, en cambio, olvidan considerandos y luego lloran en casacion." },
    dossier: {
      rol: "S-170-2026",
      facts: ["La sentencia omite analizar una excepcion opuesta.", "Contiene parte resolutiva pero fundamentos pobres.", "La parte vencida quiere impugnar."],
      clues: ["Requisitos de sentencia.", "Agravio.", "Casacion forma si omision es relevante."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Que debes verificar primero?",
      options: [
        { id: "a", text: "Si la sentencia cumple requisitos formales y resuelve acciones/excepciones hechas valer.", correct: true, feedback: "Correcto. Sin mapa de requisitos, no hay causal bien armada.", consequence: "El Juez de Hierro parpadea por primera vez." },
        { id: "b", text: "Si el juez escribio bonito.", correct: false, feedback: "Incorrecto. La elegancia no reemplaza considerandos, decision y congruencia.", consequence: "El fallo es poetico e igual anulable." },
        { id: "c", text: "Si existe cualquier molestia subjetiva con el resultado.", correct: false, feedback: "Incorrecto. Recurso exige agravio juridico, no decepcion estetica.", consequence: "La comision anota: 'dolor no es causal'.", },
      ],
    },
    feedback: {
      correct: "El control recursivo exige vincular omision, causal, perjuicio e influencia.",
      wrong: commonWrong,
      exam: "Metodo: resolucion impugnable, agravio, requisito omitido, causal, plazo, tribunal y efecto.",
      article: "Arts. 158, 170 y 768 CPC",
      institution: "Sentencia definitiva y casacion",
    },
    unlock: { title: "Plantilla de sentencia", description: "Agrega checklist de fallo al archivo." },
    nextHint: "Sobrevive al estrado y decide si recurres.",
  },
  m4_3: {
    missionId: "m4_3",
    worldId: "recursos",
    title: "El horror del estrado",
    subtitle: "Lectura de sentencia",
    npc: { name: "Actuario sin sombra", role: "Voz del tribunal", avatar: "AS", line: "La sentencia ha sido dictada. No grite: el recurso se interpone por escrito." },
    dossier: {
      rol: "S-432-2026",
      facts: ["Causa citada a oir sentencia.", "La parte detecta agravio.", "Se debe decidir ruta recursiva."],
      clues: ["Sentencia definitiva.", "Agravio concreto.", "Apelacion y casacion pueden coexistir si proceden."],
    },
    challenge: {
      kind: "oral",
      prompt: "¿Que matriz usas para no naufragar?",
      options: [
        { id: "a", text: "R-A-P-E-T: resolucion, agravio, plazo, efecto y tribunal.", correct: true, feedback: "Correcto. Es metodo de grado para recursos.", consequence: "El estrado baja las luces: pasaste al mundo de recursos." },
        { id: "b", text: "Buscar el recurso mas dramatico y presentarlo primero.", correct: false, feedback: "Incorrecto. El recurso se elige por resolucion, agravio, procedencia y plazo.", consequence: "La dramatica es inadmisible." },
        { id: "c", text: "Esperar ejecutoria y despues pensar.", correct: false, feedback: "Incorrecto. Esperar puede hacer precluir recursos.", consequence: "La sentencia queda firme mientras eliges tipografia." },
      ],
    },
    feedback: {
      correct: "Los recursos son estrategia, no impulso. La matriz evita confusiones.",
      wrong: commonWrong,
      exam: "Usa R-A-P-E-T y menciona interposicion conjunta cuando proceda.",
      article: "Arts. 181, 187, 189, 766-768 CPC",
      institution: "Metodo de recursos",
    },
    unlock: { title: "Matriz R-A-P-E-T", description: "Ordena respuestas de recursos para examen oral." },
    nextHint: "El Acto V abre la dimension rota.",
  },
  m5_1: {
    missionId: "m5_1",
    worldId: "recursos",
    title: "El recurso correcto",
    subtitle: "Dimension rota",
    npc: { name: "Profesora Examinadora", role: "Comision de grado", avatar: "PX", line: "No me diga 'apelacion' como quien pide pan. Digame resolucion, agravio, plazo, efecto y tribunal." },
    dossier: {
      rol: "R-187-2026",
      facts: ["Auto simple desfavorable.", "Sentencia definitiva adversa.", "Vicio formal reclamado durante el proceso."],
      clues: ["Reposicion para autos/decretos.", "Apelacion para definitivas e interlocutorias segun reglas.", "Casacion forma por causales especificas."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Cual combinacion es mas correcta?",
      options: [
        { id: "a", text: "Auto/decreto: reposicion; sentencia definitiva: apelacion; vicio formal causal: casacion forma si procede.", correct: true, feedback: "Correcto. Diferencias por tipo de resolucion y finalidad.", consequence: "Tres portales se abren sin devorarte." },
        { id: "b", text: "Todo se apela porque la Corte arregla.", correct: false, feedback: "Incorrecto. No toda resolucion es apelable; hay recursos y requisitos especificos.", consequence: "El portal devuelve tu escrito con sarcasmo." },
        { id: "c", text: "Casacion de fondo para cualquier injusticia.", correct: false, feedback: "Incorrecto. Casacion de fondo exige infraccion de ley con influencia sustancial; no es tercera instancia.", consequence: "La Suprema se apaga elegantemente." },
      ],
    },
    feedback: {
      correct: "Elegir recurso exige clasificar resolucion e identificar agravio.",
      wrong: commonWrong,
      exam: "Nunca partas por nombre del recurso: parte por resolucion y agravio.",
      article: "Arts. 181, 187, 766 y 767 CPC",
      institution: "Recursos procesales",
    },
    unlock: { title: "Selector de recursos", description: "Activa guia R-A-P-E-T en bosses." },
    nextHint: "La casacion en la forma exige causal y preparacion.",
  },
  m5_2: {
    missionId: "m5_2",
    worldId: "recursos",
    title: "Casacion de forma: el vicio del 768",
    subtitle: "Causal especifica",
    npc: { name: "Fiscal Mendoza", role: "Cazador de vicios", avatar: "FM", line: "El art. 768 no es una lista de deseos. Es una lista de causales. Aprendala o no invoque nada." },
    dossier: {
      rol: "CF-768-2026",
      facts: ["Sentencia dictada por tribunal incompetente.", "Omitio resolver excepcion.", "La parte reclamo oportunamente el vicio cuando correspondia."],
      clues: ["Causales del art. 768.", "Preparacion del recurso.", "Influencia y perjuicio."],
    },
    challenge: {
      kind: "expediente",
      prompt: "¿Que pieza hace mas fuerte la casacion?",
      options: [
        { id: "a", text: "Causal precisa, preparacion cuando proceda, perjuicio y peticion de invalidacion.", correct: true, feedback: "Correcto. Casacion formal sin causal precisa es humo elegante.", consequence: "La sentencia empieza a pixelarse." },
        { id: "b", text: "Relatar que el fallo fue injusto sin citar causal.", correct: false, feedback: "Incorrecto. La casacion en la forma es extraordinaria y causal.", consequence: "La Corte archiva la angustia." },
        { id: "c", text: "Pedir que se rinda nueva prueba en casacion.", correct: false, feedback: "Incorrecto. La casacion no es nueva instancia probatoria.", consequence: "El expediente te mira con cansancio." },
      ],
    },
    feedback: {
      correct: "Casacion forma controla vicios procesales o formales legalmente tipificados.",
      wrong: commonWrong,
      exam: "Di causal, preparacion, plazo, tribunal, efecto y sentencia de reemplazo/anulacion segun corresponda.",
      article: "Arts. 766-769 CPC",
      institution: "Casacion en la forma",
    },
    unlock: { title: "Martillo del 768", description: "Aumenta daño contra bosses de sentencia y nulidad." },
    nextHint: "Los plazos recursivos son trampas de calendario.",
  },
  m5_3: {
    missionId: "m5_3",
    worldId: "sumario",
    title: "El plazo del recurso",
    subtitle: "Autopista sumaria y recursos",
    npc: { name: "Corredor de plazos", role: "Mensajero sumario", avatar: "CP", line: "En el sumario todo parece rapido hasta que confundes rapidez con informalidad. Ahi pierdes rapido tambien." },
    dossier: {
      rol: "SU-680-2026",
      facts: ["Procedimiento sumario por materia que exige rapidez.", "Comparendo concentrado.", "Termino probatorio breve y sentencia cercana."],
      clues: ["Juicio sumario: arts. 680-692 CPC.", "Estructura reducida.", "Recursos conservan exigencias propias."],
    },
    challenge: {
      kind: "orden",
      prompt: "¿Que descripcion del sumario es mas segura?",
      options: [
        { id: "a", text: "Procedimiento breve y concentrado: demanda, comparendo, conciliacion, prueba breve si procede y sentencia.", correct: true, feedback: "Correcto. Rapidez no elimina contradictorio ni fundamentos.", consequence: "La autopista desbloquea el carril legal." },
        { id: "b", text: "Un procedimiento sin prueba ni recursos porque es rapido.", correct: false, feedback: "Incorrecto. Puede haber prueba y recursos; lo distintivo es concentracion.", consequence: "Te sales de pista en la primera curva." },
        { id: "c", text: "Siempre reemplaza al ordinario por preferencia del actor.", correct: false, feedback: "Incorrecto. Procede por necesidad de rapidez o texto legal especial; debe fundarse.", consequence: "El juez instala un disco pare." },
      ],
    },
    feedback: {
      correct: "El sumario es una via concentrada, no una licencia para saltarse debido proceso.",
      wrong: commonWrong,
      exam: "En grado: procedencia general/especial, estructura, comparendo, prueba, sustitucion y diferencias con ordinario.",
      article: "Arts. 680-692 CPC",
      institution: "Juicio sumario",
    },
    unlock: { title: "Zapatillas de comparendo", description: "Reduce riesgo en decisiones con plazo breve." },
    nextHint: "El distrito ejecutivo ya esta cobrando intereses.",
  },
  m6_1: {
    missionId: "m6_1",
    worldId: "ejecutivo",
    title: "El titulo ejecutivo",
    subtitle: "Distrito ejecutivo neon",
    npc: { name: "Deudor cyberpunk", role: "Ejecutado resistente", avatar: "DC", line: "Traen un titulo, dicen. Yo traigo excepciones, cafe y una sospecha de prescripcion." },
    dossier: {
      rol: "E-434-2026",
      facts: ["Acreedor tiene copia autorizada de escritura publica.", "Obligacion dineraria vencida.", "Monto determinado en el titulo."],
      clues: ["Titulo ejecutivo numerus clausus.", "Obligacion liquida.", "Actualmente exigible y no prescrita."],
    },
    challenge: {
      kind: "decision",
      prompt: "¿Que verificas antes de demandar ejecutivamente?",
      options: [
        { id: "a", text: "Titulo del art. 434, obligacion liquida, actualmente exigible y accion no prescrita.", correct: true, feedback: "Correcto. Sin esos requisitos, no hay ejecucion sana.", consequence: "El neon del banco cambia de rojo a cian." },
        { id: "b", text: "Solo que el cliente tenga rabia y un Excel.", correct: false, feedback: "Incorrecto. Rabia no es titulo ejecutivo, aunque facture horas.", consequence: "El mandamiento se queda sin combustible." },
        { id: "c", text: "Que exista cualquier contrato, aunque la deuda sea iliquida.", correct: false, feedback: "Incorrecto. La obligacion debe ser liquida o liquidable segun reglas.", consequence: "El sistema financiero judicial te bloquea." },
      ],
    },
    feedback: {
      correct: "El juicio ejecutivo descansa en titulo y exigibilidad; no declara primero, ejecuta.",
      wrong: commonWrong,
      exam: "En grado: titulo, liquidez, exigibilidad, prescripcion, demanda, mandamiento y embargo.",
      article: "Arts. 434, 437, 438 y 442 CPC",
      institution: "Titulo ejecutivo",
    },
    unlock: { title: "Scanner del titulo", description: "Detecta merito ejecutivo y prescripcion aparente." },
    nextHint: "El embargo no puede devorarlo todo.",
  },
  m6_2: {
    missionId: "m6_2",
    worldId: "ejecutivo",
    title: "Embargo sin fundamento",
    subtitle: "Cuaderno de apremio",
    npc: { name: "Cobrador robotico", role: "Apremio automatizado", avatar: "CR", line: "Embargar bienes inembargables es eficiente, si tu objetivo es perder con estilo." },
    dossier: {
      rol: "E-445-2026",
      facts: ["Se embargan cama, alimentos de un mes y libros profesionales dentro de limite legal.", "Tambien existe un vehiculo embargable.", "El receptor quiere incluir todo para cubrir la deuda."],
      clues: ["Bienes inembargables.", "Embargo suficiente, no destructivo.", "Cuaderno de apremio debe respetar limites."],
    },
    challenge: {
      kind: "expediente",
      prompt: "¿Como corriges la diligencia?",
      options: [
        { id: "a", text: "Excluir bienes inembargables y trabar embargo sobre bienes legalmente embargables y suficientes.", correct: true, feedback: "Correcto. La ejecucion forzada tambien tiene limites.", consequence: "El robot aprende una palabra nueva: proporcionalidad." },
        { id: "b", text: "Embargar todo porque el credito es sagrado.", correct: false, feedback: "Incorrecto. El CPC protege bienes inembargables.", consequence: "El embargo muta en incidente." },
        { id: "c", text: "Cancelar el juicio ejecutivo completo.", correct: false, feedback: "Incorrecto. Un embargo defectuoso puede corregirse sin necesariamente destruir toda la ejecucion.", consequence: "El acreedor te mira como daño emergente." },
      ],
    },
    feedback: {
      correct: "El apremio busca pago, pero no autoriza afectar bienes excluidos por ley.",
      wrong: commonWrong,
      exam: "En grado distingue mandamiento, requerimiento, embargo, bienes inembargables y oposicion.",
      article: "Art. 445 CPC",
      institution: "Embargo y bienes inembargables",
    },
    unlock: { title: "Guante de embargo legal", description: "Reduce riesgo en cuaderno de apremio." },
    nextHint: "Ahora enfrenta la campaña ejecutiva completa.",
  },
  m6_3: {
    missionId: "m6_3",
    worldId: "ejecutivo",
    title: "Campaña ejecutiva completa",
    subtitle: "Del titulo al remate",
    npc: { name: "Leviatan Ejecutivo", role: "Bestia de la ejecucion forzada", avatar: "LE", line: "Soy el procedimiento que llega cuando la paciencia declarativa se acabo." },
    dossier: {
      rol: "E-464-2026",
      facts: ["Hay titulo ejecutivo y deuda liquida.", "Se despacho mandamiento, se requirio de pago y se trabo embargo.", "El ejecutado opone excepciones dentro de plazo."],
      clues: ["Cuaderno ejecutivo y cuaderno de apremio.", "Excepciones taxativas.", "La oposicion no borra automaticamente el embargo."],
    },
    challenge: {
      kind: "orden",
      prompt: "¿Que ruta procesal es correcta?",
      options: [
        { id: "a", text: "Titulo -> demanda -> mandamiento -> requerimiento de pago -> embargo -> oposicion art. 464 -> sentencia -> apremio/realizacion -> tercerias si aparecen.", correct: true, feedback: "Correcto. Es la columna vertebral del ejecutivo.", consequence: "El Leviatan se arrodilla, pero sigue cobrando intereses." },
        { id: "b", text: "Demanda -> sentencia -> titulo -> embargo -> excepciones libres.", correct: false, feedback: "Incorrecto. El ejecutivo parte por titulo y las excepciones son taxativas.", consequence: "El sistema te cobra una comision de ignorancia." },
        { id: "c", text: "Mandamiento -> remate inmediato sin requerimiento ni oposicion.", correct: false, feedback: "Incorrecto. Debe existir requerimiento y oportunidad de oposicion.", consequence: "El remate se cae por falta de debido proceso." },
      ],
    },
    feedback: {
      correct: "El juicio ejecutivo combina rapidez, coaccion y defensas tasadas.",
      wrong: commonWrong,
      exam: "En grado: titulo, requisitos, mandamiento, requerimiento, embargo, 464, cuadernos, sentencia, apremio y tercerias.",
      article: "Arts. 434-478 y 518-529 CPC",
      institution: "Juicio ejecutivo completo",
    },
    unlock: { title: "Arquitecto del ejecutivo", description: "Desbloquea ventaja contra el Leviatan Ejecutivo." },
    nextHint: "Solo queda el examen de grado.",
  },
  m7_1: {
    missionId: "m7_1",
    worldId: "recursos",
    title: "Preparacion: examen escrito",
    subtitle: "Cedula integradora",
    npc: { name: "Profesor examinador", role: "Comision de grado", avatar: "PE", line: "No busco memoria. Busco que no se desarme cuando le cambie un hecho." },
    dossier: {
      rol: "G-001-2026",
      facts: ["Caso mezcla contrato incumplido, demanda ordinaria, prueba documental y recurso.", "Debes elegir procedimiento, defensa y medio de impugnacion.", "La respuesta debe ser oralmente defendible."],
      clues: ["Relaciona derecho civil y procesal.", "Identifica carga probatoria.", "Cierra con recurso y efectos."],
    },
    challenge: {
      kind: "oral",
      prompt: "¿Que estructura de respuesta sirve para grado?",
      options: [
        { id: "a", text: "Hechos relevantes -> accion/procedimiento -> carga/prueba -> resolucion -> recurso -> consecuencia.", correct: true, feedback: "Correcto. Integras civil y procesal sin sonar a trivia.", consequence: "La comision deja de oler sangre." },
        { id: "b", text: "Recitar definiciones en orden alfabetico.", correct: false, feedback: "Incorrecto. El grado exige aplicar instituciones al caso.", consequence: "El profesor pregunta '¿y entonces?'." },
        { id: "c", text: "Responder solo con articulos sueltos.", correct: false, feedback: "Incorrecto. Citar norma sin razonamiento no resuelve el caso.", consequence: "La norma queda flotando sin expediente." },
      ],
    },
    feedback: {
      correct: "El examen premia orden, aplicacion y consecuencias.",
      wrong: commonWrong,
      exam: "Usa metodo: institucion, norma, requisito, aplicacion al hecho, consecuencia.",
      article: "CPC / COT / CC segun caso",
      institution: "Metodo de examen de grado",
    },
    unlock: { title: "Metodo oral completo", description: "Activa feedback de respuesta de grado." },
    nextHint: "La simulacion oral es el ultimo umbral.",
  },
  m7_2: {
    missionId: "m7_2",
    worldId: "recursos",
    title: "Simulacion oral",
    subtitle: "Boss final",
    npc: { name: "Comision del Grado", role: "Tres voces y ningun recreo", avatar: "CG", line: "Empiece por juicio ejecutivo. Y cuando crea terminar, le preguntaremos nulidad." },
    dossier: {
      rol: "G-999-2026",
      facts: ["La comision encadena ejecutivo, recursos y nulidad.", "Cada respuesta debe sostenerse con norma y consecuencia.", "Los distractores son juridicamente plausibles."],
      clues: ["No saltar etapas.", "No inventar articulos.", "Si hay duda, marcarla y razonar."],
    },
    challenge: {
      kind: "oral",
      prompt: "Pregunta final: ejecutado opone excepcion no listada en art. 464. ¿Que dices?",
      options: [
        { id: "a", text: "Que la oposicion del ejecutado debe fundarse en excepciones taxativas del art. 464; si no encaja, corresponde inadmisibilidad o rechazo segun etapa.", correct: true, feedback: "Correcto. Dominas taxatividad y efecto procesal.", consequence: "La comision asiente con dolor administrativo." },
        { id: "b", text: "Que puede oponer cualquier defensa civil porque siempre hay bilateralidad.", correct: false, feedback: "Incorrecto. Hay defensa, pero dentro del marco taxativo del ejecutivo.", consequence: "El Leviatan vuelve a levantarse." },
        { id: "c", text: "Que el juez debe transformar siempre el ejecutivo en ordinario.", correct: false, feedback: "Incorrecto. No es conversion automatica; hay reglas especificas y casos de reserva/discusion posterior.", consequence: "La comision pide otra cedula. Mala señal." },
      ],
    },
    feedback: {
      correct: "La taxatividad del art. 464 es nucleo del ejecutivo y pregunta clasica de grado.",
      wrong: commonWrong,
      exam: "Responde: naturaleza del ejecutivo, oposicion, excepciones taxativas, plazo, cuadernos y consecuencia.",
      article: "Art. 464 CPC",
      institution: "Oposicion del ejecutado",
    },
    unlock: { title: "Licencia procesal provisoria", description: "Cierra campaña principal y habilita epilogo." },
    nextHint: "Vuelve al mapa o enfrenta la comision en modo Boss Rush.",
  },
};

export const getMissionPlaybook = (missionId: string) => MISSION_PLAYBOOKS[missionId];
