import type { EtapaProc } from "@/types/procesal";

// ============================================================================
// ACADEMIA DE RECURSOS — medios de impugnación. Cada nodo es un "maestro" que
// custodia un recurso: su procedencia, causales, efectos y —sobre todo— su
// plazo fatal. Plazos tomados del cuadro de medios de impugnación aportado.
// ============================================================================

export const ETAPAS_RECURSOS: EtapaProc[] = [
  // ── RECURSOS ORDINARIOS ────────────────────────────────────────────────────
  {
    id: "rec_reposicion",
    edificio: "recursos",
    orden: 1,
    grupo: "Recursos ordinarios",
    nombre: "Maestro Reposición",
    icono: "↩️",
    rol: "Recurso de reposición",
    resumen: "Que el mismo tribunal deje sin efecto un auto o decreto.",
    explicacion:
      "Recurso ordinario que se interpone ante el mismo tribunal que dictó la resolución para que la modifique o la deje sin efecto. Procede contra autos y decretos; excepcionalmente contra ciertas interlocutorias (reposición especial).",
    enumeracion: {
      titulo: "Clases de reposición",
      items: [
        "Ordinaria: 5 días fatales, contra autos y decretos.",
        "Especial: 3 días, contra resoluciones específicas (p. ej. la que recibe la causa a prueba, art. 319; la que declara inadmisible la apelación).",
        "Extraordinaria: cuando se hacen valer nuevos antecedentes, sin plazo.",
      ],
    },
    plazo: "Ordinaria: 5 días fatales · Especial: 3 días.",
    articulos: "Art. 181 CPC",
    efectos: ["Resuelta, puede deducirse apelación subsidiaria si era procedente."],
    preguntas: ["Distinga reposición ordinaria, especial y extraordinaria.", "¿Contra qué resoluciones procede?"],
  },
  {
    id: "rec_apelacion",
    edificio: "recursos",
    orden: 2,
    grupo: "Recursos ordinarios",
    nombre: "Maestro Apelación",
    icono: "⬆️",
    rol: "Recurso de apelación",
    resumen: "Que el tribunal superior enmiende la resolución del inferior.",
    explicacion:
      "Recurso ordinario que busca que el tribunal superior, conociendo de nuevo, enmiende con arreglo a derecho la resolución del inferior. Es la manifestación del principio de la doble instancia.",
    requisitos: ["Resolución apelable (sentencias definitivas e interlocutorias de 1ª instancia; autos y decretos solo excepcionalmente).", "Agravio.", "Fundamentos de hecho y de derecho y peticiones concretas."],
    plazo: "Sentencia definitiva: 10 días fatales · Otras resoluciones: 5 días · Adhesión a la apelación: 5 días.",
    articulos: "Arts. 186 a 230 CPC",
    efectos: [
      "Efecto devolutivo: el superior conoce; el inferior puede seguir (regla general).",
      "Efecto suspensivo: suspende la competencia del inferior (sentencias definitivas, salvo excepciones).",
      "Procede adhesión a la apelación y orden de no innovar.",
    ],
    preguntas: [
      "¿Plazo de la apelación de la sentencia definitiva?",
      "Distinga efecto devolutivo y suspensivo.",
      "¿Qué es la adhesión a la apelación y su plazo?",
    ],
  },

  // ── RECURSOS EXTRAORDINARIOS ───────────────────────────────────────────────
  {
    id: "rec_casacion_forma",
    edificio: "recursos",
    orden: 3,
    grupo: "Recursos extraordinarios",
    nombre: "Maestra Casación en la Forma",
    icono: "📐",
    rol: "Casación en la forma",
    resumen: "Invalida por vicios de procedimiento o de la sentencia.",
    explicacion:
      "Recurso extraordinario que persigue invalidar una sentencia por haberse incurrido en vicios de forma: defectos de la sentencia (art. 170) o falta de trámites esenciales del procedimiento. Por regla general exige preparación (haber reclamado el vicio oportunamente).",
    enumeracion: {
      titulo: "Causales (art. 768)",
      items: [
        "1ª Incompetencia o integración indebida del tribunal.",
        "2ª Juez legalmente implicado o cuya recusación esté pendiente o declarada.",
        "3ª Tribunal con menor número de jueces o votos que el exigido.",
        "4ª Ultra petita: otorgar más de lo pedido o extenderse a puntos no sometidos.",
        "5ª Faltar los requisitos del art. 170 (forma de la sentencia).",
        "6ª Haberse dado contra otra pasada en autoridad de cosa juzgada.",
        "7ª Contener decisiones contradictorias.",
        "8ª Darse en apelación declarada desierta, prescrita o desistida.",
        "9ª Faltar un trámite o diligencia esencial (arts. 795 y 800).",
      ],
    },
    plazo: "1ª instancia: el mismo plazo de la apelación (5 o 10 días), conjuntamente con ella · Única o 2ª instancia: 15 días fatales.",
    articulos: "Arts. 764, 766, 768 y 769 CPC",
    efectos: ["Acogida, se invalida la sentencia y, según el caso, se dicta sentencia de reemplazo o se repone la causa al estado correspondiente."],
    preguntas: [
      "Enumere causales del art. 768.",
      "¿En qué consiste la preparación del recurso?",
      "¿Plazo en única o segunda instancia?",
    ],
  },
  {
    id: "rec_casacion_fondo",
    edificio: "recursos",
    orden: 4,
    grupo: "Recursos extraordinarios",
    nombre: "Maestro Casación en el Fondo",
    icono: "📏",
    rol: "Casación en el fondo",
    resumen: "Error de derecho con influencia sustancial en lo dispositivo.",
    explicacion:
      "Recurso extraordinario, de competencia exclusiva de la Corte Suprema, que procede cuando la sentencia se ha dictado con infracción de ley que ha influido sustancialmente en lo dispositivo del fallo. No es una tercera instancia: solo revisa el derecho, no los hechos.",
    requisitos: [
      "Sentencia definitiva o interlocutoria inapelable de Corte de Apelaciones (o tribunal arbitral de 2ª instancia).",
      "Infracción de ley (error de derecho).",
      "Que la infracción haya influido sustancialmente en lo dispositivo.",
    ],
    plazo: "15 días fatales desde la notificación de la sentencia recurrida.",
    articulos: "Arts. 767 y 772 CPC",
    efectos: ["Acogido, la Corte Suprema dicta acto continuo y por separado la sentencia de reemplazo."],
    preguntas: [
      "¿Contra qué resoluciones procede la casación en el fondo?",
      "¿Qué significa 'influencia sustancial en lo dispositivo'?",
    ],
  },

  // ── DISCIPLINARIO Y ESPECIALES ─────────────────────────────────────────────
  {
    id: "rec_queja",
    edificio: "recursos",
    orden: 5,
    grupo: "Disciplinario y especiales",
    nombre: "Guardián de la Queja",
    icono: "🛎️",
    rol: "Recurso de queja",
    resumen: "Sanciona la falta o abuso grave cometido en una resolución.",
    explicacion:
      "Recurso disciplinario que tiene por exclusiva finalidad corregir las faltas o abusos graves cometidos en la dictación de una resolución de carácter jurisdiccional. Procede solo cuando ésta no es susceptible de recurso ordinario o extraordinario alguno.",
    plazo: "5 días hábiles fatales (ampliables según tabla de emplazamiento, con máximo de 15 días).",
    articulos: "Art. 545 COT",
    efectos: ["Acogido, se enmienda la resolución y puede aplicarse sanción disciplinaria al juez."],
    preguntas: ["¿Cuándo procede el recurso de queja?", "¿Cuál es su finalidad?"],
  },
  {
    id: "rec_revision",
    edificio: "recursos",
    orden: 6,
    grupo: "Disciplinario y especiales",
    nombre: "Custodio de la Revisión",
    icono: "🔓",
    rol: "Recurso de revisión",
    resumen: "Ataca la cosa juzgada fraudulenta o injusta en casos tasados.",
    explicacion:
      "Recurso extraordinario que permite a la Corte Suprema invalidar sentencias firmes en los casos taxativos del art. 810 (documentos falsos, prueba falsa, cohecho/violencia, o sentencia contraria a otra firme), atacando la cosa juzgada fraudulenta.",
    plazo: "1 año desde la última notificación de la sentencia que se trata de rever.",
    articulos: "Arts. 810 y 811 CPC",
    efectos: ["Acogido, se anula la sentencia revisada en todo o parte."],
    preguntas: ["¿Qué causales habilitan la revisión (art. 810)?", "¿Plazo del recurso de revisión?"],
  },
  {
    id: "rec_hecho",
    edificio: "recursos",
    orden: 7,
    grupo: "Disciplinario y especiales",
    nombre: "Recurso de hecho",
    icono: "⚖️",
    rol: "Recurso de hecho",
    resumen: "Corrige los errores del tribunal inferior al conceder o denegar la apelación.",
    explicacion:
      "Procede cuando el tribunal inferior se pronuncia mal sobre la apelación. Verdadero recurso de hecho: el inferior deniega una apelación procedente. Falso recurso de hecho: la concede cuando no correspondía o le da efectos errados.",
    plazo: "5 días (verdadero: ante el superior; falso: desde la certificación de ingreso de los autos en 2ª instancia).",
    articulos: "Arts. 196 y 203 a 206 CPC",
    efectos: ["Acogido el verdadero, se ordena conceder la apelación denegada."],
    preguntas: ["Distinga verdadero y falso recurso de hecho."],
  },
  {
    id: "rec_aclaracion",
    edificio: "recursos",
    orden: 8,
    grupo: "Disciplinario y especiales",
    nombre: "Aclaración, rectificación o enmienda",
    icono: "🩹",
    rol: "Aclaración / rectificación",
    resumen: "Aclara puntos oscuros o corrige errores de copia, cálculo o referencias.",
    explicacion:
      "No es propiamente un recurso de impugnación: permite al tribunal aclarar puntos oscuros o dudosos, salvar omisiones y rectificar errores de copia, de referencia o de cálculos numéricos, sin alterar lo resuelto. Es una excepción al desasimiento.",
    plazo: "Sin plazo para las partes; el tribunal puede actuar de oficio dentro de 5 días desde la primera notificación del fallo.",
    articulos: "Art. 182 CPC",
    efectos: ["Es excepción al desasimiento del tribunal."],
    preguntas: ["¿Por qué la aclaración es una excepción al desasimiento?"],
  },
];
