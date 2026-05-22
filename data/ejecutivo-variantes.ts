// ============================================================================
// EJECUTIVO VARIANTES — Múltiples flujos y escenarios para juicio ejecutivo
// Expande el mundo ejecutivo con complejidad narrativa
// ============================================================================

export type EjecutivoEscenario = "normal" | "resistido" | "caos" | "terceria" | "fraude";

export interface EjecutivoVariante {
  id: string;
  tipo: EjecutivoEscenario;
  titulo: string;
  descripcion: string;
  titulo_ejecutivo: "letra" | "pagaré" | "sentencia" | "acta_conciliacion" | "cheque";
  obligacion_monto: number;
  obligacion_vencida: number; // años
  demandado_ubicable: boolean;
  excepciones_probables: string[];
  tercero_interviniente: boolean;
  dificultad: number; // 1-10
  trama: string; // narrative hook
}

export const EJECUTIVO_VARIANTES: EjecutivoVariante[] = [
  // ═══════════════════════════════════════════════════════════
  // TIPO: NORMAL — Juicio ejecutivo clásico
  // ═══════════════════════════════════════════════════════════
  {
    id: "eje_normal_letra",
    tipo: "normal",
    titulo: "Protesto de Letra de Cambio",
    descripcion:
      "Tienes una letra de cambio protestada hace 2 años. Obligación clara: $150.000. El deudor está ubicable. Operación estándar.",
    titulo_ejecutivo: "letra",
    obligacion_monto: 150000,
    obligacion_vencida: 2,
    demandado_ubicable: true,
    excepciones_probables: ["pago", "prescripcion"],
    tercero_interviniente: false,
    dificultad: 2,
    trama: "Caso de libro. El ejecutado intentará alegar pago. Necesitarás documentación.",
  },
  {
    id: "eje_normal_sentencia",
    tipo: "normal",
    titulo: "Ejecución de Sentencia",
    descripcion:
      "Sentencia favorable hace 1 año. Cosa juzgada consolidada. Ahora ejecutas: $200.000 + costas. El demandado vencido espera.",
    titulo_ejecutivo: "sentencia",
    obligacion_monto: 200000,
    obligacion_vencida: 1,
    demandado_ubicable: true,
    excepciones_probables: ["pago"],
    tercero_interviniente: false,
    dificultad: 1,
    trama: "Lo ganaste en ordinario. Ahora solo cobras. El ejecutado sabe que perdió.",
  },

  // ═══════════════════════════════════════════════════════════
  // TIPO: RESISTIDO — Demandado opone defensas efectivas
  // ═══════════════════════════════════════════════════════════
  {
    id: "eje_resistido_falsedad",
    tipo: "resistido",
    titulo: "Pagaré Impugnado: Cuestión de Autenticidad",
    descripcion:
      "Pagaré de $300.000. El demandado niega su firma. Alega falsedad del título. Requiere pericia caligráfica.",
    titulo_ejecutivo: "pagaré",
    obligacion_monto: 300000,
    obligacion_vencida: 1.5,
    demandado_ubicable: true,
    excepciones_probables: ["falsedad", "perdida_cosa"],
    tercero_interviniente: false,
    dificultad: 5,
    trama: "El ejecutado atacó el título. Tendrás que probar autenticidad mediante pericia. Caro y lento.",
  },
  {
    id: "eje_resistido_pago_doc",
    tipo: "resistido",
    titulo: "Excepción de Pago: Documentación Oscura",
    descripcion:
      "Ejecutas un pagaré. El demandado presenta documento que dice 'recibí pago'. Es fotocopia de fotocopia. ¿Es válido?",
    titulo_ejecutivo: "pagaré",
    obligacion_monto: 250000,
    obligacion_vencida: 1.2,
    demandado_ubicable: true,
    excepciones_probables: ["pago", "compensacion"],
    tercero_interviniente: false,
    dificultad: 6,
    trama: "Batalla documental. Su documento es dudoso pero presentado. Necesitas contraprobar que NO fue pago válido.",
  },
  {
    id: "eje_resistido_prescripcion",
    tipo: "resistido",
    titulo: "Trampa Temporal: Pagaré de Hace 4 Años",
    descripcion:
      "Tienes un pagaré protestado hace 4 años. Art. 2515 CC: plazo máximo 3 años. El tribunal lo declara prescrito de oficio.",
    titulo_ejecutivo: "pagaré",
    obligacion_monto: 500000,
    obligacion_vencida: 4,
    demandado_ubicable: true,
    excepciones_probables: ["prescripcion"],
    tercero_interviniente: false,
    dificultad: 3,
    trama: "Olvidaste revisar plazos. El tribunal rechazará el despacho de ejecución. Derrota automática.",
  },

  // ═══════════════════════════════════════════════════════════
  // TIPO: CAOS — Procedimiento complejo con múltiples complicaciones
  // ═══════════════════════════════════════════════════════════
  {
    id: "eje_caos_notificacion_fallida",
    tipo: "caos",
    titulo: "El Ejecutado Desapareció",
    descripcion:
      "Mandamiento despachado. Requerimiento de pago. Pero el ejecutado no está en el domicilio registrado. Receptor no lo encontró.",
    titulo_ejecutivo: "letra",
    obligacion_monto: 400000,
    obligacion_vencida: 1,
    demandado_ubicable: false,
    excepciones_probables: [],
    tercero_interviniente: false,
    dificultad: 7,
    trama: "Juicio paralizado por falta de notificación. Puedes intentar notificación subsidiaria (art. 44) o publicación (art. 59).",
  },
  {
    id: "eje_caos_embargo_insuficiente",
    tipo: "caos",
    titulo: "Bienes Embargados Insuficientes",
    descripcion:
      "Ejecutas $500.000. Embargo se decreta sobre auto del deudor (valuado en $300.000) y cuenta bancaria con $50.000. Insuficiente para cubrir la obligación.",
    titulo_ejecutivo: "sentencia",
    obligacion_monto: 500000,
    obligacion_vencida: 0.5,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: false,
    dificultad: 6,
    trama: "Bienes insuficientes. Puedes ampliar embargo (más bienes) o dejar constancia de insolvencia parcial. El débito queda.",
  },
  {
    id: "eje_caos_depositario_problema",
    tipo: "caos",
    titulo: "Depositario Provisional Desapareció",
    descripcion:
      "Embargo decretado. Auto secuestrado. Depositario provisional designado. Semana después: depositario no se presenta. Auto desaparece.",
    titulo_ejecutivo: "pagaré",
    obligacion_monto: 350000,
    obligacion_vencida: 0.8,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: false,
    dificultad: 8,
    trama: "Caos procesal puro. Puedes denunciar al depositario, solicitar nuevo depositario, o atacar por negligencia judicial.",
  },

  // ═══════════════════════════════════════════════════════════
  // TIPO: TERCERÍA — Tercero interviene alegando dominio/posesión
  // ═══════════════════════════════════════════════════════════
  {
    id: "eje_terceria_dominio",
    tipo: "terceria",
    titulo: "Tercería de Dominio: El Bien No es del Ejecutado",
    descripcion:
      "Embargaste un inmueble. Tercero aparece diciendo que es suyo, que prestó el dinero al ejecutado para que lo comprara, pero nunca transfirió dominio.",
    titulo_ejecutivo: "letra",
    obligacion_monto: 800000,
    obligacion_vencida: 2,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: true,
    dificultad: 7,
    trama: "Tercería de dominio (art. 518). Juicio dentro de juicio. El tercero prueba que es dueño. Si prospera, el bien se libera del embargo.",
  },
  {
    id: "eje_terceria_posesion",
    tipo: "terceria",
    titulo: "Tercería de Posesión: Ocupante Legítimo",
    descripcion:
      "Embargaste la casa del ejecutado. Vive una mujer que dice ser cónyuge y tener derechos sobre el inmueble (bien familiar, art. 141 CC).",
    titulo_ejecutivo: "sentencia",
    obligacion_monto: 600000,
    obligacion_vencida: 1,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: true,
    dificultad: 6,
    trama: "Tercería de posesión. La cónyuge alega derecho a habitar. Si es bien familiar declarado, tiene protección. El embargo se suspende.",
  },
  {
    id: "eje_terceria_pago",
    tipo: "terceria",
    titulo: "Tercería de Pago: Acreedor Preferente Aparece",
    descripcion:
      "Embargaste dinero en cuenta. Tercero aparece (banco acreedor hipotecario) diciendo que ese dinero es su crédito privilegiado que debe pagarse primero.",
    titulo_ejecutivo: "pagaré",
    obligacion_monto: 200000,
    obligacion_vencida: 0.5,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: true,
    dificultad: 8,
    trama: "Tercería de pago (art. 520). Conflicto de prelación. Si el tercero tiene crédito privilegiado, cobra antes que tú.",
  },

  // ═══════════════════════════════════════════════════════════
  // TIPO: FRAUDE — Ejecutado escondió bienes o cometió irregularidad
  // ═══════════════════════════════════════════════════════════
  {
    id: "eje_fraude_ocultacion",
    tipo: "fraude",
    titulo: "Sospecha de Ocultamiento: Bienes Fantasma",
    descripcion:
      "Ejecutas. El deudor declaró bienes. Pero según investigación, vendió inmueble hace 3 meses a precio sospechosamente bajo. ¿Fraude?",
    titulo_ejecutivo: "sentencia",
    obligacion_monto: 1000000,
    obligacion_vencida: 0.3,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: false,
    dificultad: 9,
    trama: "Indicio de fraude. Puedes solicitar investigación patrimonial. Si se comprueba, puede abrir acción de fraude (art. 97 CPC) o querella criminal.",
  },
  {
    id: "eje_fraude_transferencia",
    tipo: "fraude",
    titulo: "Transferencia a Testaferro",
    descripcion:
      "El ejecutado transfirió su empresa a su hermano hace poco. ¿Para evadir embargo? Sospechas que es testaferro. Documentación confusa.",
    titulo_ejecutivo: "letra",
    obligacion_monto: 2000000,
    obligacion_vencida: 1.5,
    demandado_ubicable: true,
    excepciones_probables: [],
    tercero_interviniente: false,
    dificultad: 10,
    trama: "Posible simulación (art. 1561 CC). Necesitas prueba pericial contable + análisis de intención. Batalla larga y cara.",
  },
];

// ═══════════════════════════════════════════════════════════
// UTILITY: Seleccionar variante aleatorio según dificultad
// ═══════════════════════════════════════════════════════════

export function variante_aleatorio(dificultad_max: number = 10): EjecutivoVariante {
  const filtrados = EJECUTIVO_VARIANTES.filter((v) => v.dificultad <= dificultad_max);
  return filtrados[Math.floor(Math.random() * filtrados.length)];
}

export function variante_por_tipo(tipo: EjecutivoEscenario): EjecutivoVariante[] {
  return EJECUTIVO_VARIANTES.filter((v) => v.tipo === tipo);
}
