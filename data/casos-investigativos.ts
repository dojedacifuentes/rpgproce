/**
 * CASOS INVESTIGATIVOS
 * Sistema de investigación procedural para Phase 5
 * El jugador resuelve casos descubriendo pistas y deduciendo errores procedurales
 */

// ============================================================================
// TIPOS
// ============================================================================

export type TipoPista = "documento" | "testimonio" | "articulo" | "fechas" | "dialogo";

export interface Pista {
  id: string;
  titulo: string;
  tipo: TipoPista;
  contenido: string;
  articulos: string[];
  descubierta: boolean; // Al inicio, algunas están descubiertas, otras no
  conectadoA?: string[]; // IDs de otras pistas relacionadas
  esRoja?: boolean; // false lead / trampa
  revelaSobre: string; // Qué problema/aspecto revela
}

export interface CasoInvestigativo {
  id: string;
  titulo: string;
  descripcion: string;
  zona: string;
  dificultad: 1 | 2 | 3;

  // Pistas que el jugador debe descubrir/analizar
  pistas: Pista[];

  // Problema central a resolver
  problema: {
    titulo: string;
    descripcion: string;
    articulosInvolucrados: string[];
    nivelDeDaño: 1 | 2 | 3; // cuán grave es la nulidad
  };

  // Solución correcta (para verificación)
  solucion: {
    explicacion: string;
    recursoAplicable: string;
    articuloClave: string;
    pasosCorrectionales: string[];
  };

  // Hipótesis que el jugador puede elegir
  hipótesis: Array<{
    titulo: string;
    pistas_requieren: string[]; // IDs de pistas necesarias para seleccionar
    es_correcta: boolean;
    explicacion: string;
  }>;
}

// ============================================================================
// CASO 1: EMPLAZAMIENTO FANTASMA
// ============================================================================

const CASO_001: CasoInvestigativo = {
  id: "inv_001",
  titulo: "El Expediente 38 — Emplazamiento Fantasma",
  descripcion:
    "Un juicio civil fue ejecutado sin que el demandado fuera jamás notificado legalmente. Una tercera parte cuestiona toda la sentencia.",
  zona: "notificaciones",
  dificultad: 2,

  pistas: [
    {
      id: "p1_001",
      titulo: "Decreto de Admisibilidad",
      tipo: "documento",
      contenido:
        "Juzgado Segundo Civil de Santiago, dictado 14 de mayo de 2024. Se admite demanda de cobro de $50,000,000 contra Constructora Altair SpA. Se ordena notificar al demandado en domicilio ubicado en Av. Andrés Bello 2341.",
      articulos: ["Art. 254 CPC"],
      descubierta: true,
      revelaSobre: "inicio del procedimiento",
    },
    {
      id: "p1_002",
      titulo: "Cédula de Emplazamiento — Primer Intento",
      tipo: "documento",
      contenido:
        "Receptor Judicial Castro: Comparecencia en domicilio 17.05.2024 a las 10:30. Encontrado: Inmueble clausurado. No reside persona alguna.",
      articulos: ["Art. 40 CPC", "Art. 44 CPC"],
      descubierta: false,
      revelaSobre: "primer intento fallido",
    },
    {
      id: "p1_003",
      titulo: "Cédula de Emplazamiento — Segundo Intento",
      tipo: "documento",
      contenido:
        "Receptor Judicial Castro: Comparecencia en domicilio 19.05.2024 a las 14:15. Inmueble idem clausurado. Vecina informa: 'La empresa se fue hace 6 meses.'",
      articulos: ["Art. 44 CPC"],
      descubierta: false,
      revelaSobre: "segundo intento fallido",
    },
    {
      id: "p1_004",
      titulo: "Resolución sobre Emplazamiento por Publicación",
      tipo: "articulo",
      contenido:
        "Art. 44 CPC: 'Si no se logra emplazar al demandado en su domicilio después de dos diligencias infructuosas, se procederá a su notificación por publicación en el Diario Oficial.' Requisito: dos intentos fallidos deben constar en cédulas.",
      articulos: ["Art. 44 CPC"],
      descubierta: false,
      revelaSobre: "requisito legal",
      conectadoA: ["p1_002", "p1_003"],
    },
    {
      id: "p1_005",
      titulo: "Sentencia Ejecutoriada",
      tipo: "documento",
      contenido:
        "Se condena a Constructora Altair al pago de $50,000,000 más costas. Sentencia ejecutoriada el 12 de julio de 2024. El demandado no compareci ó ni fue representado en proceso.",
      articulos: ["Art. 158 CPC", "Art. 768 N°9 CPC"],
      descubierta: true,
      revelaSobre: "resultado del juicio",
    },
    {
      id: "p1_006",
      titulo: "Aviso en Diario Oficial — Verificación",
      tipo: "fechas",
      contenido:
        "Se publica notificación en Diario Oficial el 21 de mayo de 2024, bajo resolución de fecha 19 de mayo de 2024. El aviso señala 'A comparecer en plazo de 10 días.'",
      articulos: ["Art. 44 CPC", "Art. 50 CPC"],
      descubierta: false,
      revelaSobre: "procedimiento de publicación",
    },
    {
      id: "p1_007",
      titulo: "Testimonio del Receptor Castro",
      tipo: "dialogo",
      contenido:
        "Castro declara: 'Hice dos intentos. El juzgado me ordenó notificar por edicto. Yo cumplí, pero antes de publicar hubo solo 2 intentos.' Preguntado si vio al demandado: 'Nunca.'",
      articulos: ["Art. 40 CPC", "Art. 44 CPC"],
      descubierta: false,
      revelaSobre: "bilateralidad faltante",
    },
  ],

  problema: {
    titulo: "Nulidad por Falta de Emplazamiento Válido",
    descripcion:
      "El demandado nunca fue notificado legalmente. La sentencia es nula de pleno derecho por violación del derecho de defensa.",
    articulosInvolucrados: [
      "Art. 768 N°9 CPC (nulidad por violación derecho de defensa)",
      "Art. 76 CPC (bilateralidad)",
      "Art. 44 CPC (requisitos de emplazamiento por publicación)",
    ],
    nivelDeDaño: 3,
  },

  solucion: {
    explicacion:
      "La nulidad es causal N°9 del art. 768 CPC: violación del derecho de defensa por falta de emplazamiento válido. La publicación en Diario Oficial sin que consten DOS intentos infructuosos previos viola el art. 44 CPC.",
    recursoAplicable: "Casación en la Forma",
    articuloClave: "Art. 768 N°9 CPC",
    pasosCorrectionales: [
      "1. Reconocer que falta emplazamiento válido per art. 44",
      "2. Invocar bilateralidad (art. 76) como principio procesal",
      "3. Interponer casación en forma dentro de plazo",
      "4. Destruir cosa juzgada y reabrir procedimiento",
    ],
  },

  hipótesis: [
    {
      titulo: "El demandado no quiso presentarse",
      pistas_requieren: ["p1_001"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Confunde inasistencia voluntaria con falta de emplazamiento. El demandado ni siquiera supo que había juicio.",
    },
    {
      titulo: "La publicación en Diario Oficial suplió el emplazamiento",
      pistas_requieren: ["p1_004", "p1_006"],
      es_correcta: false,
      explicacion:
        "Incorrecto. La publicación requiere previos dos intentos fallidos (art. 44). Aquí hay evidencia.",
    },
    {
      titulo: "Solo hay un intento de emplazamiento registrado",
      pistas_requieren: ["p1_002", "p1_003", "p1_004"],
      es_correcta: false,
      explicacion:
        "Parcialmente correcto, pero confunde cantidad con fecha. Art. 44 requiere dos intentos antes de publicación, no después.",
    },
    {
      titulo: "Falta de emplazamiento válido por art. 44 CPC — Nulidad N°9",
      pistas_requieren: ["p1_002", "p1_003", "p1_004", "p1_005", "p1_007"],
      es_correcta: true,
      explicacion:
        "Correcto. El receptor hizo dos intentos (documentados), pero la publicación ocurrió DESPUÉS de solo 2 intentos, lo que suple pero no reemplaza exigencias de bilateralidad. La sentencia, dictada sin emplazamiento válido, es nula causal N°9.",
    },
  ],
};

// ============================================================================
// CASO 2: SENTENCIA ULTRA PETITA
// ============================================================================

const CASO_002: CasoInvestigativo = {
  id: "inv_002",
  titulo: "Caso 38B — Sentencia Ultra Petita",
  descripcion:
    "El demandante solicitó condena por $30 millones. La sentencia condena por $35 millones. El demandado reclama nulidad por exceso de sentencia.",
  zona: "recursos",
  dificultad: 2,

  pistas: [
    {
      id: "p2_001",
      titulo: "Demanda Original",
      tipo: "documento",
      contenido:
        "Se demanda cobro de $30,000,000 por incumplimiento de contrato de arrendamiento. Petitorio claro: 'Condénese al demandado al pago de TREINTA MILLONES DE PESOS.'",
      articulos: ["Art. 255 CPC"],
      descubierta: true,
      revelaSobre: "pretensión demandante",
    },
    {
      id: "p2_002",
      titulo: "Sentencia de Primer Grado",
      tipo: "documento",
      contenido:
        "Considerando Quinto: 'Habida consideración de los daños causados al arrendador, incluyendo lucro cesante, se condena al demandado al pago de TREINTA Y CINCO MILLONES DE PESOS.'",
      articulos: ["Art. 158 CPC", "Art. 768 N°2 CPC"],
      descubierta: true,
      revelaSobre: "resultado sentencia",
    },
    {
      id: "p2_003",
      titulo: "Artículo 768 N°2 CPC — Nulidad por Ultra Petita",
      tipo: "articulo",
      contenido:
        "Son causales de nulidad... N°2. Haber sido pronunciada la sentencia con infracción de lo dispuesto en los artículos 170 y 171 del Código de Procedimiento Civil. [Art. 171: 'La sentencia no puede extenderse a puntos no controvertidos por las partes.']",
      articulos: ["Art. 768 N°2 CPC", "Art. 171 CPC"],
      descubierta: false,
      revelaSobre: "causal de nulidad",
    },
    {
      id: "p2_004",
      titulo: "Escrito de Apelación del Demandado",
      tipo: "dialogo",
      contenido:
        "Se alega: 'La sentencia excede el monto demandado. Se pidieron $30M, se condena por $35M. Esto es ultra petita y viola art. 171.'",
      articulos: ["Art. 168 CPC"],
      descubierta: false,
      revelaSobre: "punto controvertido",
    },
    {
      id: "p2_005",
      titulo: "Avalúo Pericial sobre Daños",
      tipo: "documento",
      contenido:
        "Perito valuador: 'El daño estimado es de $35,000,000, considerando 18 meses de lucro cesante a $1,944,444/mes.'",
      articulos: ["Art. 456 CPC"],
      descubierta: false,
      revelaSobre: "fundamentación sentencia",
    },
    {
      id: "p2_006",
      titulo: "Jurisprudencia sobre Lucro Cesante",
      tipo: "articulo",
      contenido:
        "Corte Suprema: 'El lucro cesante no fue pedido expresamente por demandante, pero es consecuencia accesoria del daño emergente. El juez puede condenar por lucro cesante aunque no sea expresamente solicitado.' (pero esto es controvertido)",
      articulos: ["Art. 2329 CC"],
      descubierta: false,
      revelaSobre: "interpretación daño",
    },
    {
      id: "p2_007",
      titulo: "Silencio del Demandante sobre Lucro Cesante",
      tipo: "fechas",
      contenido:
        "Demanda: solo menciona 'incumplimiento de contrato.' Prueba producida: Demandante nunca acreditó lucro cesante. Períto lo calculó, pero demandante no pidió que se condene por ello.",
      articulos: ["Art. 168 CPC"],
      descubierta: false,
      revelaSobre: "no controvertido",
    },
  ],

  problema: {
    titulo: "Sentencia Ultra Petita — Exceso sobre lo Demandado",
    descripcion:
      "La sentencia condena por suma mayor a la solicitada ($35M vs $30M). Esto infringe art. 171 CPC (sentencia no puede extenderse a puntos no controvertidos).",
    articulosInvolucrados: [
      "Art. 768 N°2 CPC (nulidad por infracción art. 171)",
      "Art. 171 CPC (sentencia no puede extenderse más allá)",
      "Art. 168 CPC (petitorio debe ser claro)",
    ],
    nivelDeDaño: 2,
  },

  solucion: {
    explicacion:
      "Nulidad causal N°2 del art. 768: La sentencia condenó por $35M cuando la demanda solicitaba solo $30M. El lucro cesante, aunque sea consecuencia del daño, debe ser controvertido (demandante debe haberlo pedido expresamente). Aquí no lo fue.",
    recursoAplicable: "Casación en la Forma",
    articuloClave: "Art. 768 N°2 CPC (en relación art. 171 CPC)",
    pasosCorrectionales: [
      "1. Identificar que monto condenado ($35M) > monto demandado ($30M)",
      "2. Verificar que lucro cesante no fue expresamente solicitado",
      "3. Aplicar causal N°2 art. 768",
      "4. Casación debe acoger, reduciendo condena a $30M",
    ],
  },

  hipótesis: [
    {
      titulo: "El lucro cesante es accesorio, por eso se puede condenar",
      pistas_requieren: ["p2_006"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Aunque lucro cesante sea consecuencia del daño, debe haber sido CONTROVERTIDO (demandante debió pedirlo). Art. 171 CPC.",
    },
    {
      titulo: "El perito calculó $35M, así debe ser la condena",
      pistas_requieren: ["p2_005"],
      es_correcta: false,
      explicacion:
        "Incorrecto. La opinión pericial no suplanta el petitorio de la parte demandante. Si demandante pidió $30M, eso es el límite.",
    },
    {
      titulo: "Sentencia ultra petita por exceso de $5M — Art. 768 N°2",
      pistas_requieren: [
        "p2_001",
        "p2_002",
        "p2_003",
        "p2_004",
        "p2_007",
      ],
      es_correcta: true,
      explicacion:
        "Correcto. La sentencia condenó por monto superior al demandado. Lucro cesante no fue controvertido (demandante no lo pidió). Viola art. 171 CPC, causal N°2 art. 768.",
    },
  ],
};

// ============================================================================
// CASO 3: PRECLUSIÓN OCULTA
// ============================================================================

const CASO_003: CasoInvestigativo = {
  id: "inv_003",
  titulo: "Caso 38C — La Preclusión Oculta",
  descripcion:
    "Un plazo de prueba venció. El demandado no ofreció prueba en su momento. Años después, intenta presentar prueba nueva sobre su mejor derecho.",
  zona: "cosajuzgada",
  dificultad: 3,

  pistas: [
    {
      id: "p3_001",
      titulo: "Auto Acordado sobre Plazo de Prueba",
      tipo: "documento",
      contenido:
        "Se fija plazo de prueba: 20 días desde notificación de esta resolución. 'Bajo apercibimiento de decaimiento del derecho a rendir prueba.'",
      articulos: ["Art. 316 CPC", "Art. 325 CPC"],
      descubierta: true,
      revelaSobre: "plazo inicial",
    },
    {
      id: "p3_002",
      titulo: "Avance de Causa — 14 de Junio",
      tipo: "fechas",
      contenido:
        "Demandante presenta prueba de documentos + testigos. Demandado: NO PRESENTA NADA. El plazo de prueba vence el 22 de junio.",
      articulos: ["Art. 317 CPC"],
      descubierta: true,
      revelaSobre: "inacción demandado",
    },
    {
      id: "p3_003",
      titulo: "Resolución de Cierre de Prueba",
      tipo: "documento",
      contenido:
        "23 de junio: 'Cerrado el plazo de prueba. Se ha producido prueba solo por parte demandante. Cítese a las partes para oír sentencia.'",
      articulos: ["Art. 326 CPC"],
      descubierta: false,
      revelaSobre: "cierre y preclusión",
    },
    {
      id: "p3_004",
      titulo: "Sentencia y Cosa Juzgada",
      tipo: "documento",
      contenido:
        "Sentencia de 4 de julio: 'Se acoge demanda.' Sentencia ejecutoriada 15 de julio (ningún recurso fue interpuesto).",
      articulos: ["Art. 158 CPC"],
      descubierta: true,
      revelaSobre: "resultado final",
    },
    {
      id: "p3_005",
      titulo: "Escrito de Demandado del 18 de Octubre",
      tipo: "dialogo",
      contenido:
        "Demandado solicita 'nulidad de lo obrado' bajo arg de que 'no tuvo oportunidad de rendir prueba sobre documentos que acaba de descubrir que tenía el demandante.'",
      articulos: ["Art. 80 CPC"],
      descubierta: false,
      revelaSobre: "moción tardía",
    },
    {
      id: "p3_006",
      titulo: "Artículo 326 CPC — Preclusión",
      tipo: "articulo",
      contenido:
        "Art. 326 CPC: 'Cerrado el plazo de prueba, no podrá rendirse prueba alguna sino en los casos contemplados en los artículos 342 [por orden del tribunal] y 344 [prueba superviniente].'",
      articulos: ["Art. 326 CPC"],
      descubierta: false,
      revelaSobre: "norma preclusión",
    },
    {
      id: "p3_007",
      titulo: "Artículo 344 CPC — Prueba Superviniente",
      tipo: "articulo",
      contenido:
        "Art. 344 CPC: 'Después de cerrado el plazo de prueba, solo se recibirá prueba superviniente, esto es, la que versa sobre hechos acaecidos con posterioridad al cierre del plazo.'",
      articulos: ["Art. 344 CPC"],
      descubierta: false,
      revelaSobre: "excepción a preclusión",
    },
    {
      id: "p3_008",
      titulo: "Cronología de Documentos en Poder de Demandante",
      tipo: "fechas",
      contenido:
        "Documentos que demandado dice 'acaba de descubrir' son de fecha 2020-2021. El pleito es de 2024. Demandado pudo tenerlos desde el inicio.",
      articulos: ["Art. 344 CPC"],
      descubierta: false,
      revelaSobre: "documento no es supervieniente",
    },
    {
      id: "p3_009",
      titulo: "Jurisprudencia sobre Preclusión",
      tipo: "articulo",
      contenido:
        "Corte: 'La preclusión es sancionar la inacción de la parte. El demandado pudo ofrecer prueba en su momento y no lo hizo. Su negligencia no es excusa para reabrir pleito cosa juzgado.'",
      articulos: ["Art. 326 CPC"],
      descubierta: false,
      revelaSobre: "consecuencia preclusión",
    },
  ],

  problema: {
    titulo: "Preclusión del Derecho a Rendir Prueba",
    descripcion:
      "El demandado dejó pasar el plazo de prueba sin ofrecer ninguna diligencia. Ahora intenta presentar prueba nueva años después. Cosa juzgada + preclusión hace esto imposible.",
    articulosInvolucrados: [
      "Art. 326 CPC (preclusión de plazo)",
      "Art. 344 CPC (excepciones: prueba superviniente)",
      "Art. 81 CPC (cosa juzgada)",
    ],
    nivelDeDaño: 3,
  },

  solucion: {
    explicacion:
      "La moción de demandado falla porque: (1) El plazo de prueba se cerró, precludiendo su derecho a rendir prueba (Art. 326); (2) Los documentos no son supervininientes (Art. 344) — son anteriores al plazo de prueba, solo demandado no los presentó; (3) Existe cosa juzgada (Art. 81) — la sentencia ya fue ejecutoriada.",
    recursoAplicable: "Rechazo de Moción de Nulidad",
    articuloClave: "Art. 326 CPC (preclusión) + Art. 344 CPC (prueba supervininiente)",
    pasosCorrectionales: [
      "1. Constatar que plazo de prueba fue notificado al demandado",
      "2. Verificar que demandado no presentó nada durante plazo",
      "3. Invocar preclusión de art. 326 CPC",
      "4. Rechazar moción porque cosa ya juzgada",
    ],
  },

  hipótesis: [
    {
      titulo: "Los documentos son nuevos, así que sí se pueden presentar",
      pistas_requieren: ["p3_007"],
      es_correcta: false,
      explicacion:
        "Incorrecto. 'Nuevo' significa superviniente (después del cierre del plazo). Estos documentos de 2020-2021 existían antes. Demandado fue negligente.",
    },
    {
      titulo: "El juez debería permitir que ambas partes presenten toda prueba",
      pistas_requieren: ["p3_001"],
      es_correcta: false,
      explicacion:
        "Incorrecto. La preclusión sanciona inacción. Si se permitiera esto, nunca terminaría un pleito. Art. 326 CPC existe justamente para cerrar períodos.",
    },
    {
      titulo: "Existe cosa juzgada, pero demandado puede apelar moción de nulidad",
      pistas_requieren: ["p3_004"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Cosa juzgada ejecutoriada no se reabre por negligencia de demandado. Ya pasaron meses. Art. 81 CPC.",
    },
    {
      titulo: "Preclusión + cosa juzgada + falta de prueba supervininiente",
      pistas_requieren: [
        "p3_001",
        "p3_002",
        "p3_003",
        "p3_004",
        "p3_006",
        "p3_007",
        "p3_008",
      ],
      es_correcta: true,
      explicacion:
        "Correcto. Demandado pudo rendir prueba durante plazo (art. 326) y no lo hizo. Moción es tardía (ya hay cosa juzgada, art. 81). Documentos no son supervininientes (art. 344) — no acaecieron con posterioridad, solo demandado fue negligente.",
    },
  ],
};

// ============================================================================
// CASO 4: EMBARGO SIN FUNDAMENTO
// ============================================================================

const CASO_004: CasoInvestigativo = {
  id: "inv_004",
  titulo: "Caso 38D — Embargo Sin Fundamento",
  descripcion:
    "Se decretó una medida cautelar de embargo antes de que existiera sentencia condenatoria. El bien del demandado fue embargado preemptivamente sin los requisitos legales.",
  zona: "cautelares",
  dificultad: 2,

  pistas: [
    {
      id: "p4_001",
      titulo: "Solicitud de Medida Cautelar",
      tipo: "documento",
      contenido:
        "Demandante solicita embargo preventivo alegando 'riesgo de insolvencia del demandado y ocultamiento de bienes.'",
      articulos: ["Art. 273 CPC"],
      descubierta: true,
      revelaSobre: "medida solicitada",
    },
    {
      id: "p4_002",
      titulo: "Resolución de Decreto de Embargo",
      tipo: "documento",
      contenido:
        "Juzgado decreta embargo de fundo 'Las Margaritas' sin requerir caución alguna. Se ordena al Conservador anotar embargo.",
      articulos: ["Art. 299 CPC"],
      descubierta: true,
      revelaSobre: "resolución",
    },
    {
      id: "p4_003",
      titulo: "Art. 299 CPC - Requisitos de Caución",
      tipo: "articulo",
      contenido:
        "Art. 299 CPC: Para medidas cautelares, el tribunal puede imponer caución a demandante para garantizar daño y perjuicio al demandado.",
      articulos: ["Art. 299 CPC"],
      descubierta: false,
      revelaSobre: "requisito omitido",
    },
    {
      id: "p4_004",
      titulo: "Evaluación de Solvencia Demandado",
      tipo: "documento",
      contenido:
        "Perito valuador: 'Demandado posee 5 propiedades, ingresos mensuales de $5M, sin antecedentes de insolvencia. Riesgo bajo.'",
      articulos: ["Art. 273 CPC"],
      descubierta: false,
      revelaSobre: "ausencia de riesgo",
    },
    {
      id: "p4_005",
      titulo: "Diálogo del Demandante",
      tipo: "dialogo",
      contenido:
        "'Solo sospecho que podría vender el fundo. No tengo prueba de que lo va a hacer, pero mejor prevenir.'",
      articulos: ["Art. 298 CPC"],
      descubierta: false,
      revelaSobre: "falta fundamentación",
    },
    {
      id: "p4_006",
      titulo: "Art. 273 CPC - Periculum in Mora",
      tipo: "articulo",
      contenido:
        "Art. 273 CPC: Medida cautelar solo procedente si hay apariencia de derecho y peligro en la mora (riesgo inminente y grave).",
      articulos: ["Art. 273 CPC"],
      descubierta: false,
      revelaSobre: "estándar legal",
    },
  ],

  problema: {
    titulo: "Embargo Decretado Sin Riesgo de Insolvencia Acreditado",
    descripcion:
      "El embargo fue impuesto sin que demandante acreditara peligro en la mora. Solo sospecha, sin fundamento fáctico.",
    articulosInvolucrados: [
      "Art. 273 CPC (requisitos medida cautelar)",
      "Art. 298 CPC (periculum in mora)",
      "Art. 299 CPC (caución)",
    ],
    nivelDeDaño: 2,
  },

  solucion: {
    explicacion:
      "El embargo es nulo por violación del art. 273: falta de peligro en la mora. La sospecha no es suficiente; requiere riesgo inminente y grave de insolvencia o disposición de bienes.",
    recursoAplicable: "Levantamiento de Embargo + Indemnización",
    articuloClave: "Art. 273 CPC",
    pasosCorrectionales: [
      "1. Verificar que no existe acreditación de riesgo",
      "2. Invocar falta de periculum in mora (art. 298)",
      "3. Solicitar levantamiento de embargo",
      "4. Accionar por indemnización por daño y perjuicio",
    ],
  },

  hipótesis: [
    {
      titulo: "El demandante siempre puede embargar preventivamente",
      pistas_requieren: ["p4_001"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Las medidas cautelares no son automáticas; requieren riesgo inminente acreditado.",
    },
    {
      titulo: "Sospecha de insolvencia es suficiente para embargo",
      pistas_requieren: ["p4_005"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Sospecha ≠ periculum in mora. Requiere riesgo grave y acreditado.",
    },
    {
      titulo: "Embargo nulo por falta de periculum in mora — Art. 273 CPC",
      pistas_requieren: ["p4_002", "p4_003", "p4_004", "p4_006"],
      es_correcta: true,
      explicacion:
        "Correcto. Sin acreditación de riesgo real de insolvencia, embargo viola art. 273. Demandante solo sospecha sin prueba.",
    },
  ],
};

// ============================================================================
// CASO 5: COSA JUZGADA APARENTE
// ============================================================================

const CASO_005: CasoInvestigativo = {
  id: "inv_005",
  titulo: "Caso 38E — Cosa Juzgada Aparente",
  descripcion:
    "Un nuevo juicio se interpone sobre la misma materia. Demandado alega cosa juzgada, pero la sentencia anterior nunca fue ejecutoriada (recursos pendientes).",
  zona: "cosajuzgada",
  dificultad: 3,

  pistas: [
    {
      id: "p5_001",
      titulo: "Sentencia del Juicio Anterior",
      tipo: "documento",
      contenido:
        "Sentencia 1 (2023): Se rechaza demanda original de cobro de $10M. Demandante no acredita contrato.",
      articulos: ["Art. 158 CPC"],
      descubierta: true,
      revelaSobre: "fallo anterior",
    },
    {
      id: "p5_002",
      titulo: "Apelación Pendiente",
      tipo: "documento",
      contenido:
        "Apelación interpuesta por demandante el 15.07.2023. Estado: 'Pendiente de vista de causa en Corte de Apelaciones.' Aún no se dicta sentencia de apelación.",
      articulos: ["Art. 187 CPC"],
      descubierta: false,
      revelaSobre: "recurso no resuelto",
    },
    {
      id: "p5_003",
      titulo: "Nueva Demanda del Mismo Demandante",
      tipo: "documento",
      contenido:
        "Demanda 2 (2024): Demandante vuelve con nueva acción por MISMO CONTRATO y MISMA cantidad ($10M), pero bajo nuevo fundamento: 'Enriquecimiento injustificado.'",
      articulos: ["Art. 81 CPC"],
      descubierta: true,
      revelaSobre: "demanda duplicada",
    },
    {
      id: "p5_004",
      titulo: "Art. 81 CPC - Cosa Juzgada Formal y Material",
      tipo: "articulo",
      contenido:
        "Art. 81 CPC: Cosa juzgada formal = sentencia no puede modificarse. Cosa juzgada material = no puede renovarse demanda. Ambas SOLO cuando sentencia EJECUTORIADA.",
      articulos: ["Art. 81 CPC"],
      descubierta: false,
      revelaSobre: "definición exacta",
    },
    {
      id: "p5_005",
      titulo: "Estado del Juicio Anterior",
      tipo: "fechas",
      contenido:
        "Sentencia 1 dictada 10.07.2023. Apelación interpuesta 15.07.2023. Hoy es 03.2024. Apelación AÚN PENDIENTE. Sentencia NO ejecutoriada.",
      articulos: ["Art. 174 CPC"],
      descubierta: false,
      revelaSobre: "sentencia pendiente",
    },
    {
      id: "p5_006",
      titulo: "Cambio de Fundamento en Demanda 2",
      tipo: "dialogo",
      contenido:
        "Demandante argumenta: 'Ahora lo demando por enriquecimiento, no por incumplimiento de contrato. Es DISTINTA acción.'",
      articulos: ["Art. 81 CPC"],
      descubierta: false,
      revelaSobre: "estrategia",
    },
  ],

  problema: {
    titulo: "Cosa Juzgada Aparente — Sentencia No Ejecutoriada",
    descripcion:
      "Demandante intenta renovar demanda bajo nuevo fundamento, pero la sentencia anterior no está ejecutoriada (apelación pendiente).",
    articulosInvolucrados: [
      "Art. 81 CPC (cosa juzgada material)",
      "Art. 174 CPC (ejecutoria de sentencia)",
    ],
    nivelDeDaño: 3,
  },

  solucion: {
    explicacion:
      "No existe cosa juzgada porque la sentencia anterior NO está ejecutoriada. La apelación aún está pendiente. La cosa juzgada solo existe cuando la sentencia se ejecutoria.",
    recursoAplicable: "Rechazo de Demanda por Falta de Cosa Juzgada (después ejecutoria)",
    articuloClave: "Art. 81 CPC (en relación Art. 174 CPC)",
    pasosCorrectionales: [
      "1. Constatar que apelación está pendiente",
      "2. Invocar que sentencia NO está ejecutoriada",
      "3. Cosa juzgada solo existe con sentencia ejecutoriada",
      "4. Demanda No. 2 puede prosperar solo DESPUÉS que Demanda No. 1 se ejecutorie",
    ],
  },

  hipótesis: [
    {
      titulo: "Cosa juzgada existe porque hubo sentencia",
      pistas_requieren: ["p5_001"],
      es_correcta: false,
      explicacion: "Incorrecto. Cosa juzgada requiere sentencia EJECUTORIADA, no solo dictada.",
    },
    {
      titulo: "Cambio de fundamento hace que sea acción distinta",
      pistas_requieren: ["p5_006"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Identidad de partes y materia = misma acción, aunque fundamento cambie.",
    },
    {
      titulo: "No hay cosa juzgada porque sentencia NO está ejecutoriada — Art. 81 CPC",
      pistas_requieren: ["p5_001", "p5_002", "p5_004", "p5_005"],
      es_correcta: true,
      explicacion:
        "Correcto. Apelación pendiente = sentencia NO ejecutoriada = NO existe cosa juzgada aún. Demanda No. 2 debe esperar.",
    },
  ],
};

// ============================================================================
// CASO 6: TERCERÍA NO INTERPUESTA
// ============================================================================

const CASO_006: CasoInvestigativo = {
  id: "inv_006",
  titulo: "Caso 38F — Tercería No Interpuesta",
  descripcion:
    "En un juicio ejecutivo, se embargó un bien que pertenece a un tercero, no al demandado. El tercero no interpuso tercería a tiempo.",
  zona: "ejecutivo",
  dificultad: 2,

  pistas: [
    {
      id: "p6_001",
      titulo: "Mandamiento y Embargo de Inmueble",
      tipo: "documento",
      contenido:
        "Se embarga inmueble ubicado en Calle Principal 123. Acreedor demanda pago de $50M. El inmueble está a nombre del demandado.",
      articulos: ["Art. 440 CPC"],
      descubierta: true,
      revelaSobre: "embargo",
    },
    {
      id: "p6_002",
      titulo: "Tercería de Dominio Presentada Tardía",
      tipo: "documento",
      contenido:
        "Tercero presenta tercería de dominio 45 días DESPUÉS del embargo. Alegaalmacén: 'Ese inmueble me pertenece, se lo compré al demandado.'",
      articulos: ["Art. 517 CPC"],
      descubierta: false,
      revelaSobre: "plazo tercería",
    },
    {
      id: "p6_003",
      titulo: "Art. 517 CPC - Plazo de Tercería",
      tipo: "articulo",
      contenido:
        "Art. 517 CPC: Tercería debe interponerse DENTRO DE 15 DÍAS contados desde el embargo o acto de ejecución.",
      articulos: ["Art. 517 CPC"],
      descubierta: false,
      revelaSobre: "requisito plazo",
    },
    {
      id: "p6_004",
      titulo: "Conocimiento del Tercero",
      tipo: "dialogo",
      contenido:
        "Tercero declara: 'Recién me enteré del embargo cuando el ejecutor fue al inmueble a hacerlo efectivo. Fue sorpresa.'",
      articulos: ["Art. 517 CPC"],
      descubierta: false,
      revelaSobre: "responsabilidad tercero",
    },
    {
      id: "p6_005",
      titulo: "Protocolización de Compra",
      tipo: "documento",
      contenido:
        "Contrato de compraventa del inmueble fechado 01.10.2023. Fue debidamente inscrito en Registro de Propiedad.",
      articulos: ["Art. 52 LMH"],
      descubierta: false,
      revelaSobre: "derecho tercero",
    },
    {
      id: "p6_006",
      titulo: "Citación al Demandado",
      tipo: "fechas",
      contenido:
        "Demandado citado a juicio ejecutivo el 15.11.2023. Embargo realizado el 20.11.2023. Tercería presentada el 05.01.2024 (45 días después).",
      articulos: ["Art. 517 CPC"],
      descubierta: false,
      revelaSobre: "timeline",
    },
  ],

  problema: {
    titulo: "Tercería de Dominio Rechazada por Extemporaneidad",
    descripcion:
      "Tercero presentó tercería después de vencido el plazo de 15 días. Aunque tiene derecho sobre el bien, perdió la acción por extemporaneidad.",
    articulosInvolucrados: ["Art. 517 CPC (plazo de tercería)"],
    nivelDeDaño: 2,
  },

  solucion: {
    explicacion:
      "Tercería se rechaza por extemporaneidad. Aunque tercero tiene documentos que prueban su dominio, presentó tercería 45 días después del embargo, violando plazo de 15 días del art. 517.",
    recursoAplicable: "Tercería Rechazada + Recurso de Casación (si lo hay)",
    articuloClave: "Art. 517 CPC",
    pasosCorrectionales: [
      "1. Constatar fecha del embargo: 20.11.2023",
      "2. Tercería presentada: 05.01.2024 (45 días después)",
      "3. Plazo legal: 15 días (vencido el 05.12.2023)",
      "4. Tercería extemporánea = rechazo",
    ],
  },

  hipótesis: [
    {
      titulo: "Tercero tiene derecho, así que tercería debe acogerse",
      pistas_requieren: ["p6_005"],
      es_correcta: false,
      explicacion:
        "Incorrecto. Derecho sustancial ≠ derecho procesal. Perdiósimplemente por no cumplir plazo.",
    },
    {
      titulo: "Tercería puede presentarse dentro de 30 días",
      pistas_requieren: ["p6_003"],
      es_correcta: false,
      explicacion: "Incorrecto. El art. 517 dice 15 días, no 30.",
    },
    {
      titulo: "Tercería rechazada por extemporaneidad — Art. 517 CPC",
      pistas_requieren: ["p6_002", "p6_003", "p6_004", "p6_006"],
      es_correcta: true,
      explicacion:
        "Correcto. Aunque tercero probó su dominio, presentó tercería 45 días después (plazo era 15). Extemporaneidad = rechazo automático.",
    },
  ],
};

// ============================================================================
// EXPORTAR
// ============================================================================

export const CASOS_INVESTIGATIVOS: CasoInvestigativo[] = [
  CASO_001,
  CASO_002,
  CASO_003,
  CASO_004,
  CASO_005,
  CASO_006,
];
