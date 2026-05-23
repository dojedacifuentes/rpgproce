// Diálogos narrativos del RPG de Derecho Procesal Civil.
// Disco Elysium + Couture + olor a expediente físico de Tribunal de Letras.
// Rigor normativo: cada escena cita artículo (CPC, COT, CPR) y doctrina.

import type { Atributos } from "@/types/game";

export type Opcion = {
  texto: string;
  requiere?: { atributo?: keyof Atributos; minimo?: number; flag?: string; sexo?: "masculino" | "femenino" };
  efectos?: {
    flags?: string[];
    atributos?: Partial<Record<keyof Atributos, number>>;
    reputacion?: number;
    trauma?: number;
    log?: string;
  };
};

export type Escena = {
  id: string;
  titulo: string;
  ambientacion: string;
  speaker?: string;
  lineas: string[];
  opciones: Opcion[];
  articulo?: { n: string; t: string };
};

export const ESCENAS: Record<string, Escena> = {

  // ============ MUNDO I — JURISDICCIÓN ============

  jurisdiccion_intro: {
    id: "jurisdiccion_intro",
    titulo: "Cátedra abierta — Aula 309 a las 23:14",
    ambientacion: "Un proyector roto. Una pizarra con esquemas borrados. Couture mirándote desde un afiche descolorido.",
    speaker: "PROFESOR TITULAR",
    lineas: [
      "Jurisdicción (art. 76 CPR / art. 1 COT): facultad de conocer las causas civiles y criminales, juzgarlas y hacer ejecutar lo juzgado.",
      "Características esenciales: pública, privativa, indelegable, inavocable, improrrogable en lo absoluto, una en su esencia, territorial.",
      "Distínguela de la competencia: la jurisdicción es UNA, lo que se distribuye entre los tribunales es la COMPETENCIA (esfera dentro de la cual la jurisdicción se ejerce).",
    ],
    articulo: { n: "76 CPR", t: "La facultad de conocer las causas civiles y criminales, de resolverlas y de hacer ejecutar lo juzgado, pertenece exclusivamente a los tribunales establecidos por la ley." },
    opciones: [
      {
        texto: "[CONOCIMIENTO 5] Memorizar las características.",
        requiere: { atributo: "conocimiento_procesal", minimo: 5 },
        efectos: { flags: ["jurisdiccion_dominada"], atributos: { conocimiento_procesal: 1 }, log: "Internalizaste las características de la jurisdicción." },
      },
      { texto: "Tomar apuntes en silencio.", efectos: { log: "Tomaste apuntes. Suficiente por ahora." } },
    ],
  },

  // ============ MUNDO II — COMPETENCIA ============

  competencia_intro: {
    id: "competencia_intro",
    titulo: "Oficina del estudio — primera reunión con cliente",
    ambientacion: "Café tibio. El cliente trae una boleta y un documento privado firmado. Llueve sobre Apoquindo.",
    speaker: "TU PRÁCTICO PROFESIONAL",
    lineas: [
      "Antes de demandar: ¿qué tribunal es competente? Hay que cruzar dos preguntas.",
      "COMPETENCIA ABSOLUTA (orden público, improrrogable): materia (arts. 130-133 COT), fuero (50 COT) y cuantía (115-129 COT).",
      "COMPETENCIA RELATIVA (renunciable, prorrogable): territorio (134-148 COT). Regla general: domicilio del demandado (art. 134).",
      "Si el demandado contesta sin reclamar incompetencia relativa, hay prórroga tácita (art. 187 COT).",
    ],
    articulo: { n: "134 COT", t: "Es juez competente, en general, el del lugar del domicilio del demandado." },
    opciones: [
      {
        texto: "[ESTRATEGIA 5] Verificar fuero del demandado antes de demandar.",
        requiere: { atributo: "estrategia", minimo: 5 },
        efectos: { flags: ["verifico_fuero"], reputacion: 3, log: "Verificaste el fuero del demandado (art. 50 COT)." },
      },
      { texto: "Asumir tribunal del domicilio.", efectos: { log: "Asumiste regla general del art. 134." } },
    ],
  },

  // ============ MUNDO III — LA DEMANDA ============

  demanda_intro: {
    id: "demanda_intro",
    titulo: "Estudio jurídico — 02:00 a.m., última madrugada antes de presentar",
    ambientacion: "Cinco páginas. Un suma. Una conclusión. Un timbre del notario apurando. La sangre en los ojos.",
    speaker: "TU CONCIENCIA FORENSE",
    lineas: [
      "Art. 254 CPC: la demanda debe contener (1) designación del tribunal; (2) individualización del demandante; (3) individualización del demandado; (4) exposición clara de hechos y fundamentos de derecho; (5) peticiones precisas y claras en la conclusión.",
      "Si falta cualquier requisito, el demandado puede deducir excepción dilatoria de ineptitud del libelo (art. 303 N°4 CPC).",
      "Recuerda acompañar los documentos fundantes de la pretensión y mandar correctamente conferir poder (Ley 18.120: comparecencia en juicio).",
    ],
    articulo: { n: "254 CPC", t: "Requisitos formales de la demanda." },
    opciones: [
      {
        texto: "[RIGOR FORMAL 6] Revisar línea por línea cada requisito.",
        requiere: { atributo: "rigor_formal", minimo: 6 },
        efectos: { flags: ["demanda_impecable"], atributos: { rigor_formal: 1 }, reputacion: 4, log: "Demanda impecable: sin ataques dilatorios." },
      },
      { texto: "[IMPULSIVIDAD] Presentar como esté.", efectos: { trauma: 3, flags: ["demanda_apresurada"], log: "Presentaste sin revisar. Riesgo de excepción dilatoria." } },
    ],
  },

  // ============ MUNDO IV — EMPLAZAMIENTO ============

  emplazamiento_intro: {
    id: "emplazamiento_intro",
    titulo: "Receptor judicial — domicilio del demandado, intento N°2",
    ambientacion: "El portero dice 'no está'. El receptor toma fotos y deja constancia. La hora corre.",
    speaker: "RECEPTOR JUDICIAL",
    lineas: [
      "Emplazamiento = notificación válida + plazo para comparecer. Es trámite esencial; su omisión causa nulidad (art. 768 N°9 CPC).",
      "Regla general: notificación PERSONAL (art. 40 CPC). Si no es habido tras búsqueda en dos días distintos: art. 44 CPC (personal subsidiaria).",
      "Notificación por cédula: art. 48 (auto de prueba, citación a oír sentencia). Por estado diario: art. 50 (regla supletoria general).",
      "Plazos para contestar (art. 258-259): 15 días en mismo lugar, 18 fuera del lugar mismo territorio, 15 + tabla emplazamiento fuera del territorio o extranjero.",
    ],
    articulo: { n: "40 CPC", t: "Notificación personal." },
    opciones: [
      {
        texto: "[DILIGENCIA 5] Solicitar notificación subsidiaria del art. 44 con copias completas.",
        requiere: { atributo: "diligencia", minimo: 5 },
        efectos: { flags: ["emplazamiento_valido"], reputacion: 2, log: "Emplazamiento subsidiario practicado correctamente." },
      },
      {
        texto: "Pedir notificación por avisos sin haber agotado las anteriores.",
        efectos: { flags: ["riesgo_nulidad_emplaz"], trauma: 5, log: "Riesgo de nulidad por defecto de emplazamiento (art. 768 N°9)." },
      },
    ],
  },

  // ============ MUNDO V — DISCUSIÓN ============

  discusion_replica: {
    id: "discusion_replica",
    titulo: "Audiencia de tabla — Sala 4",
    ambientacion: "Carpetas físicas, anillado azul, una jueza con anteojos que se demoran en bajar la mirada.",
    speaker: "JUEZA SUBROGANTE",
    lineas: [
      "El demandado contestó oponiendo excepción dilatoria del art. 303 N°4 (ineptitud del libelo).",
      "Si las dilatorias se acogen, hay que subsanar antes de seguir adelante (arts. 305-308).",
      "Si se rechazan, el plazo para contestar perentoriamente vuelve a correr.",
      "Réplica y dúplica: arts. 311-312. La conciliación es OBLIGATORIA (art. 262) tras la dúplica, salvo casos exceptuados.",
    ],
    articulo: { n: "303 CPC", t: "Excepciones dilatorias." },
    opciones: [
      {
        texto: "[PERSUASIÓN 6] Alegar oralmente la suficiencia del libelo.",
        requiere: { atributo: "persuasion_forense", minimo: 6 },
        efectos: { flags: ["dilatoria_rechazada"], reputacion: 5, log: "Convenciste a la jueza: la dilatoria fue rechazada." },
      },
      { texto: "Subsanar y seguir adelante.", efectos: { flags: ["libelo_subsanado"], log: "Subsanaste y continúas." } },
    ],
  },

  // ============ MUNDO VI — PRUEBA ============

  auto_prueba: {
    id: "auto_prueba",
    titulo: "Auto de prueba — la resolución más quisquillosa del juicio",
    ambientacion: "Aparece en el estado diario. Tres hechos sustanciales, pertinentes y controvertidos. Tienes 3 días.",
    speaker: "TU YO PROCESAL",
    lineas: [
      "Art. 318 CPC: el tribunal, si hay hechos sustanciales, pertinentes y controvertidos, recibirá la causa a prueba y fijará los puntos de prueba.",
      "Notificación: por cédula (art. 48). Plazo para reposición especial (art. 319): 3 días, con apelación en subsidio (art. 326).",
      "Término probatorio ORDINARIO: 20 días (art. 328). Extraordinario fuera del tribunal y fuera del territorio: arts. 329-330. Especial: art. 339 (entorpecimiento).",
      "Lista de testigos y minuta de puntos: dentro de los 5 días siguientes a la última notificación del auto de prueba (art. 320).",
    ],
    articulo: { n: "318 CPC", t: "Resolución que recibe la causa a prueba." },
    opciones: [
      {
        texto: "[DILIGENCIA 6] Reponer modificando puntos + apelar subsidiariamente.",
        requiere: { atributo: "diligencia", minimo: 6 },
        efectos: { flags: ["auto_prueba_atacado"], atributos: { rigor_formal: 1 }, log: "Repusiste con apelación en subsidio dentro del plazo de 3 días." },
      },
      { texto: "Aceptar el auto y enfocarse en la lista de testigos.", efectos: { log: "Aceptaste el auto. Foco en testigos (art. 320)." } },
    ],
  },

  // ============ MUNDO VII — SENTENCIA ============

  sentencia_lectura: {
    id: "sentencia_lectura",
    titulo: "Citación a oír sentencia — Estado Diario",
    ambientacion: "Es un proveído. Notificación por estado. El plazo del 432 corrió. El tribunal cita.",
    speaker: "SECRETARIO DEL TRIBUNAL",
    lineas: [
      "Citación a oír sentencia (art. 432 CPC) tras vencimiento del plazo para observaciones a la prueba (art. 430).",
      "Notificación por cédula (art. 48). Solo proceden recursos contra la propia resolución que cita a oír sentencia: reposición dentro de 3°día (art. 432 inc. final).",
      "Posteriormente, la sentencia definitiva debe pronunciarse dentro de 60 días (art. 162). Requisitos formales: art. 170 CPC y Auto Acordado del 30-IX-1920.",
    ],
    articulo: { n: "432 CPC", t: "Citación a oír sentencia." },
    opciones: [
      {
        texto: "Revisar requisitos del 170 antes de leer el fallo.",
        efectos: { flags: ["preparo_recurso_casacion"], log: "Verificaste requisitos del 170. Posible casación en la forma si faltan." },
      },
      { texto: "Esperar lectura del fallo.", efectos: { log: "A la espera del fallo." } },
    ],
  },

  // ============ MUNDO VIII — RECURSOS ============

  recursos_intro: {
    id: "recursos_intro",
    titulo: "Sala de profesores ad hoc — última noche del plazo",
    ambientacion: "Tu colega tiene tres pantallas abiertas: art. 158, art. 187 y art. 766. La elección depende del tipo de resolución.",
    speaker: "COLEGA EXPERIENCIAL",
    lineas: [
      "Primero: clasifica la resolución (art. 158 CPC). De ahí baja el recurso.",
      "Decretos/autos: reposición (181) y, si alteran sustanciación, apelación subsidiaria (188).",
      "Sentencias interlocutorias y definitivas de 1° instancia: APELACIÓN (187). Plazo: 5 días interlocutorias; 10 días definitivas (189).",
      "Definitivas y interlocutorias que ponen término al juicio: CASACIÓN EN LA FORMA (766) por causales del 768; CASACIÓN EN EL FONDO (767) si son inapelables de Corte de Apelaciones o árbitros de derecho de 2° instancia.",
      "Sin recurso ordinario ni extraordinario: QUEJA (545 COT).",
      "Sentencias firmes injustamente ganadas: REVISIÓN (810).",
    ],
    articulo: { n: "158 CPC", t: "Clasificación de las resoluciones judiciales (base para identificar el recurso procedente)." },
    opciones: [
      {
        texto: "[ESTRATEGIA 6] Trazar el árbol de decisión completo.",
        requiere: { atributo: "estrategia", minimo: 6 },
        efectos: { flags: ["arbol_recursos_dominado"], atributos: { conocimiento_procesal: 2 }, log: "Internalizaste el árbol de recursos." },
      },
      { texto: "Confiar en la memoria.", efectos: { log: "Apuestas a la memoria." } },
    ],
  },

  // ============ MUNDO IX — JUICIO EJECUTIVO ============

  ejecutivo_intro: {
    id: "ejecutivo_intro",
    titulo: "Notaría — escritura pública en mano, deuda impaga",
    ambientacion: "El cliente tiene escritura pública firmada. El demandado tiene tres autos y un departamento. Un sueño.",
    speaker: "CLIENTE EJECUTANTE",
    lineas: [
      "Juicio ejecutivo: arts. 434-478 CPC. Procede teniendo TÍTULO EJECUTIVO con obligación líquida, actualmente exigible y no prescrita.",
      "Cuadernos: PRINCIPAL (demanda ejecutiva, mandamiento, oposición, sentencia) y APREMIO (embargo, retiro de especies, remate). Eventuales: TERCERÍAS (518 ss.).",
      "Las excepciones a la ejecución son TAXATIVAS (art. 464 CPC) — 17 excepciones. Plazo para oponer: art. 459-461 (varía si fue requerido en el lugar del tribunal o fuera).",
      "Si no se opone oposición, se omite la sentencia y el mandamiento de ejecución y embargo basta de sentencia (art. 472).",
    ],
    articulo: { n: "434 CPC", t: "Títulos ejecutivos." },
    opciones: [
      {
        texto: "[ESTRATEGIA 5] Pedir medida precautoria prejudicial antes de notificar.",
        requiere: { atributo: "estrategia", minimo: 5 },
        efectos: { flags: ["cautelar_prejudicial"], reputacion: 3, log: "Cautelar prejudicial decretada (arts. 279, 290 CPC)." },
      },
      { texto: "Despachar mandamiento sin cautelar.", efectos: { log: "Mandamiento despachado." } },
    ],
  },

  // ============ MUNDO X — SEGUNDO CICLO ============

  segundo_ciclo_intro: {
    id: "segundo_ciclo_intro",
    titulo: "Estudio reformado — primer cliente del nuevo año",
    ambientacion: "Una sala más grande. Dos secretarias. Te miras al espejo: pareces alguien que conoce los plazos.",
    speaker: "TU YO POST-PRIMER-CICLO",
    lineas: [
      "Terminaste tu primer expediente. Conservas atributos, logros y experiencia.",
      "Nuevo ciclo: nuevo expediente. Mismas reglas: jurisdicción, competencia, demanda, emplazamiento, discusión, prueba, sentencia, recursos.",
      "Cada ciclo te sube de nivel. Cada error te enseña una causal del 768.",
    ],
    articulo: { n: "—", t: "Loop pedagógico." },
    opciones: [
      { texto: "Abrir nuevo expediente.", efectos: { log: "Nuevo expediente abierto. Ciclo procesal +1." } },
    ],
  },
};
