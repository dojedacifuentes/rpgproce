import type { FactorCompetencia, TipoTribunal, TipoResolucion, TipoRecurso, MedioProbatorio } from "@/types/game";

// ============================================================================
//  MOTOR NORMATIVO — DERECHO PROCESAL CIVIL CHILENO
//  Fuentes: CPR (arts. 76, 77), COT (arts. 1, 5, 45, 50, 115-148, 545),
//           CPC (arts. 158, 181, 182, 187, 188, 196, 203, 254, 309-314,
//           318-433, 434-478, 766, 767, 810).
// ============================================================================

// ============================================================================
//  JURISDICCIÓN — Características (memoria mnemónica: T.E.R.C.I.O.)
//  Territorial · Esencial · Reservada al Estado · Concurrencia única ·
//  Inavocable · Otras (improrrogable absoluta, indelegable).
// ============================================================================

export const CARACTERISTICAS_JURISDICCION = [
  { nombre: "Función pública", desc: "Emana del Estado y se ejerce en su nombre.", articulo: "Art. 76 CPR / Art. 1 COT" },
  { nombre: "Privativa o exclusiva", desc: "Solo los tribunales establecidos por la ley la ejercen.", articulo: "Art. 76 CPR" },
  { nombre: "Indelegable", desc: "No puede el tribunal delegarla; sí puede comisionar la práctica de ciertas diligencias.", articulo: "Art. 7 CPR / 35 COT" },
  { nombre: "Inavocable", desc: "Un tribunal no puede tomar el conocimiento de causas pendientes ante otro.", articulo: "Art. 8 COT" },
  { nombre: "Improrrogable (en lo absoluto)", desc: "La competencia absoluta es de orden público y no puede prorrogarse.", articulo: "Art. 182 COT a contrario" },
  { nombre: "Una en su esencia", desc: "Es única; lo que varía es la competencia, manifestación parcelada de la jurisdicción.", articulo: "Doctrina (Couture, Hoyos)" },
  { nombre: "Territorial", desc: "Se ejerce en el territorio de la República.", articulo: "Art. 5 COT" },
];

// ============================================================================
//  COMPETENCIA — Absoluta y Relativa
// ============================================================================
//
// COMPETENCIA ABSOLUTA (orden público, improrrogable):
//   - MATERIA (arts. 130-133 COT): naturaleza del asunto.
//   - FUERO (arts. 50, 168 COT): calidad de las partes.
//   - CUANTÍA (arts. 115-129 COT): valor del asunto (en lo civil, derogada en gran parte
//     por la unificación de competencia de los juzgados de letras; subsiste para
//     procedimientos: > 10 UTM ordinario, ≤ 10 UTM mínima cuantía art. 703 CPC).
//
// COMPETENCIA RELATIVA (renunciable, prorrogable expresa o tácitamente):
//   - TERRITORIO (arts. 134-148 COT): regla supletoria del domicilio del demandado (art. 134).

export type EvaluacionCompetencia = {
  competente: boolean;
  factor: FactorCompetencia;
  articulo: string;
  razon: string;
};

export function evaluarCompetencia(input: {
  tribunal: TipoTribunal;
  materia: "civil" | "comercial" | "familia" | "trabajo" | "penal" | "administrativo";
  cuantiaUTM?: number;
  hayFuero?: boolean;          // ministro de Estado, intendente, etc. (art. 50 COT)
  domicilioDemandado: string;
  asientoTribunal: string;
  prorrogaConsentida?: boolean; // arts. 181-187 COT
}): EvaluacionCompetencia {
  // 1) MATERIA — los juzgados de letras civiles conocen de causas civiles y comerciales (art. 45 N°2 COT).
  if (input.materia === "familia" && input.tribunal !== "tribunal_familia") {
    return { competente: false, factor: "materia", articulo: "Art. 8 Ley 19.968", razon: "Causa de familia debe conocerla Tribunal de Familia." };
  }
  if (input.materia === "trabajo" && input.tribunal !== "tribunal_letras_trabajo") {
    return { competente: false, factor: "materia", articulo: "Art. 420 CT", razon: "Causa laboral debe conocerla Juzgado de Letras del Trabajo." };
  }
  if ((input.materia === "civil" || input.materia === "comercial") && input.tribunal !== "juzgado_letras_civil" && input.tribunal !== "juzgado_letras_competencia_comun") {
    return { competente: false, factor: "materia", articulo: "Art. 45 N°2 a) COT", razon: "Causa civil o comercial corresponde al Juzgado de Letras (en lo Civil)." };
  }

  // 2) FUERO — art. 50 COT (fuero mayor) eleva el conocimiento al Ministro de Corte.
  if (input.hayFuero && input.tribunal === "juzgado_letras_civil") {
    return { competente: false, factor: "fuero", articulo: "Art. 50 N°2 COT", razon: "Existe fuero mayor: conoce un Ministro de Corte de Apelaciones." };
  }

  // 3) TERRITORIO — regla general: domicilio del demandado (art. 134 COT).
  if (input.domicilioDemandado.toLowerCase() !== input.asientoTribunal.toLowerCase() && !input.prorrogaConsentida) {
    return { competente: false, factor: "territorio", articulo: "Art. 134 COT", razon: "Falta competencia relativa: el demandado domicilia en otra comuna sin prórroga." };
  }

  return { competente: true, factor: "territorio", articulo: "Arts. 45, 134 COT", razon: "Reúne los requisitos de competencia absoluta y relativa." };
}

// ============================================================================
//  REQUISITOS DE LA DEMANDA — Art. 254 CPC
// ============================================================================

export const REQUISITOS_DEMANDA = [
  { n: 1, t: "Designación del tribunal ante quien se entabla.", articulo: "Art. 254 N°1 CPC" },
  { n: 2, t: "Nombre, domicilio, profesión u oficio del demandante y de las personas que lo representen, y naturaleza de la representación.", articulo: "Art. 254 N°2 CPC" },
  { n: 3, t: "Nombre, domicilio y profesión u oficio del demandado.", articulo: "Art. 254 N°3 CPC" },
  { n: 4, t: "Exposición clara de los hechos y fundamentos de derecho en que se apoya.", articulo: "Art. 254 N°4 CPC" },
  { n: 5, t: "Enunciación precisa y clara, consignada en la conclusión, de las peticiones que se sometan al fallo del tribunal.", articulo: "Art. 254 N°5 CPC" },
];

// ============================================================================
//  EMPLAZAMIENTO Y NOTIFICACIONES — Arts. 38-58 CPC
// ============================================================================
//
// Notificación de la demanda en juicio ordinario:
//   - Regla general: notificación PERSONAL (art. 40 CPC).
//   - Si el notificado no es habido habiendo sido buscado en dos días distintos:
//     notificación personal subsidiaria del art. 44 CPC.
//   - Notificación por cédula: art. 48 CPC (resoluciones que reciben la causa a prueba y
//     citación a oír sentencia, p.ej.).
//   - Notificación por el estado diario: art. 50 CPC (regla supletoria general).
//   - Notificación por avisos: art. 54 CPC.
//
// EMPLAZAMIENTO = notificación válida + plazo para comparecer.
// Plazo para contestar (juicio ordinario, primera instancia):
//   - Demandado en el lugar donde funciona el tribunal: 15 días (art. 258).
//   - Fuera del lugar, mismo territorio: 15 + 3 días (art. 258 inc. 2°).
//   - Fuera del territorio o extranjero: tabla emplazamiento (art. 259).

export function plazoContestacion(input: { lugar: "mismo" | "mismo_territorio" | "extranjero"; diasTablaEmplazamiento?: number }): { dias: number; articulo: string } {
  if (input.lugar === "mismo") return { dias: 15, articulo: "Art. 258 inc. 1° CPC" };
  if (input.lugar === "mismo_territorio") return { dias: 18, articulo: "Art. 258 inc. 2° CPC (15 + 3)" };
  return { dias: 15 + (input.diasTablaEmplazamiento ?? 6), articulo: "Art. 259 CPC (tabla)" };
}

// ============================================================================
//  EXCEPCIONES DEL DEMANDADO — Arts. 303-310 CPC
// ============================================================================

export const EXCEPCIONES_DILATORIAS = [
  { n: 1, t: "Incompetencia del tribunal ante quien se haya presentado la demanda." },
  { n: 2, t: "Falta de capacidad del demandante o de personería o representación legal del que comparece en su nombre." },
  { n: 3, t: "Litis pendencia." },
  { n: 4, t: "Ineptitud del libelo por razón de falta de algún requisito legal en el modo de proponer la demanda." },
  { n: 5, t: "Beneficio de excusión." },
  { n: 6, t: "En general las que se refieran a la corrección del procedimiento sin afectar al fondo de la acción deducida." },
];
export const ART_EXCEPCIONES_DILATORIAS = "Art. 303 CPC";

export const EXCEPCIONES_PERENTORIAS_ANOMALAS = [
  { t: "Prescripción", articulo: "Art. 310 CPC" },
  { t: "Cosa juzgada", articulo: "Art. 310 CPC" },
  { t: "Transacción", articulo: "Art. 310 CPC" },
  { t: "Pago efectivo de la deuda cuando se funde en un antecedente escrito", articulo: "Art. 310 CPC" },
];

// ============================================================================
//  TÉRMINO PROBATORIO — Arts. 327-340 CPC
// ============================================================================

export const TERMINO_PROBATORIO = {
  ordinario: { dias: 20, articulo: "Art. 328 CPC" },
  extraordinarioFueraTribunal: { articulo: "Art. 329 CPC (aumento conforme tabla emplazamiento)" },
  extraordinarioFueraTerritorio: { articulo: "Art. 330 CPC" },
  especial: { articulo: "Art. 339 CPC (entorpecimiento)" },
};

// ============================================================================
//  RESOLUCIONES JUDICIALES — Art. 158 CPC
// ============================================================================

export const CLASIFICACION_RESOLUCIONES = [
  { tipo: "sentencia_definitiva" as TipoResolucion, definicion: "Pone fin a la instancia, resolviendo la cuestión o asunto objeto del juicio.", articulo: "Art. 158 inc. 1° CPC" },
  { tipo: "sentencia_interlocutoria_1grado" as TipoResolucion, definicion: "Falla un incidente del juicio estableciendo derechos permanentes a favor de las partes.", articulo: "Art. 158 inc. 2° (1° grado) CPC" },
  { tipo: "sentencia_interlocutoria_2grado" as TipoResolucion, definicion: "Resuelve sobre algún trámite que debe servir de base en el pronunciamiento de una sentencia definitiva o interlocutoria; en sentido del 766, pone término al juicio o hace imposible su continuación.", articulo: "Art. 158 inc. 2° (2° grado) CPC" },
  { tipo: "auto" as TipoResolucion, definicion: "Resuelve un incidente sin establecer derechos permanentes.", articulo: "Art. 158 inc. 3° CPC" },
  { tipo: "decreto_providencia_proveido" as TipoResolucion, definicion: "Tiene por objeto dar curso progresivo a los autos sin decidir ni prejuzgar nada.", articulo: "Art. 158 inc. final CPC" },
];

// ============================================================================
//  RECURSOS — TABLA DE PROCEDENCIA (extraída de tu cuadro)
// ============================================================================

export const TABLA_RECURSOS: Array<{
  recurso: TipoRecurso;
  nombre: string;
  contra: TipoResolucion[];
  plazoDias: number | string;
  articulo: string;
  tribunalQueConoce: string;
  efectos: string;
  descripcion: string;
}> = [
  {
    recurso: "aclaracion_rectificacion_enmienda",
    nombre: "Aclaración, rectificación o enmienda",
    contra: ["sentencia_definitiva", "sentencia_interlocutoria_1grado", "sentencia_interlocutoria_2grado"],
    plazoDias: "sin plazo (mientras esté pendiente recurso o de oficio)",
    articulo: "Art. 182 CPC",
    tribunalQueConoce: "El mismo tribunal que dictó la resolución",
    efectos: "No suspende la ejecución salvo que el tribunal lo ordene.",
    descripcion: "Procede para aclarar puntos oscuros, salvar omisiones, rectificar errores de copia, referencia o cálculo numérico. NO modifica el fondo.",
  },
  {
    recurso: "reposicion",
    nombre: "Reposición (ordinaria/extraordinaria)",
    contra: ["auto", "decreto_providencia_proveido"],
    plazoDias: 5,
    articulo: "Art. 181 CPC",
    tribunalQueConoce: "El mismo tribunal que dictó la resolución",
    efectos: "Suspende mientras se resuelve (efecto suspensivo del incidente).",
    descripcion: "Sin nuevos antecedentes: 5 días. Con nuevos antecedentes: sin plazo. Puede deducirse en subsidio apelación si procede (188).",
  },
  {
    recurso: "reposicion_especial",
    nombre: "Reposición especial (ej.: contra auto de prueba)",
    contra: ["sentencia_interlocutoria_1grado"],
    plazoDias: 3,
    articulo: "Art. 319 CPC (auto de prueba); 201, 212 CPC (apelación); 778, 781 CPC (casación)",
    tribunalQueConoce: "El mismo tribunal",
    efectos: "Limitado a hipótesis legales específicas.",
    descripcion: "Procede contra ciertas interlocutorias señaladas por ley: auto que recibe la causa a prueba (319), que declara inadmisible/desierta/prescrita la apelación (201, 212), inadmisibilidad de la casación (778, 781).",
  },
  {
    recurso: "apelacion",
    nombre: "Apelación (regla general)",
    contra: ["sentencia_definitiva", "sentencia_interlocutoria_1grado"],
    plazoDias: 5,
    articulo: "Art. 187 CPC",
    tribunalQueConoce: "Corte de Apelaciones (devolutivo); ante el tribunal a quo se presenta",
    efectos: "Devolutivo o ambos efectos (suspensivo + devolutivo) según los casos del art. 195.",
    descripcion: "Procede contra sentencias definitivas e interlocutorias de PRIMERA INSTANCIA, salvo denegación expresa de la ley. Plazo: 5 días (interlocutorias) o 10 días (definitivas — art. 189).",
  },
  {
    recurso: "apelacion_subsidiaria",
    nombre: "Apelación subsidiaria",
    contra: ["auto", "decreto_providencia_proveido"],
    plazoDias: 5,
    articulo: "Art. 188 CPC",
    tribunalQueConoce: "Corte de Apelaciones, vía reposición ante tribunal a quo",
    efectos: "Idéntica regla del 195.",
    descripcion: "Solo cuando los autos y decretos alteran la sustanciación regular del juicio o recaen sobre trámites no expresamente ordenados por la ley.",
  },
  {
    recurso: "hecho_verdadero",
    nombre: "Recurso de hecho verdadero",
    contra: ["sentencia_interlocutoria_1grado"],
    plazoDias: 5,
    articulo: "Art. 203 CPC",
    tribunalQueConoce: "Corte de Apelaciones (directamente)",
    efectos: "Suspende solo si el tribunal de alzada lo ordena.",
    descripcion: "Procede cuando el tribunal inferior DENIEGA una apelación que ha debido concederse.",
  },
  {
    recurso: "hecho_falso",
    nombre: "Recurso de hecho falso",
    contra: ["sentencia_interlocutoria_1grado"],
    plazoDias: 5,
    articulo: "Art. 196 CPC",
    tribunalQueConoce: "Corte de Apelaciones",
    efectos: "Variable.",
    descripcion: "Procede cuando el tribunal inferior CONCEDE una apelación improcedente, o la concede en un efecto distinto al que corresponde.",
  },
  {
    recurso: "casacion_forma",
    nombre: "Casación en la forma",
    contra: ["sentencia_definitiva", "sentencia_interlocutoria_2grado"],
    plazoDias: 15,
    articulo: "Art. 766 CPC",
    tribunalQueConoce: "Corte de Apelaciones o Corte Suprema según la instancia atacada",
    efectos: "Sin efecto suspensivo, salvo art. 773.",
    descripcion: "Procede contra: (1) sentencias definitivas; (2) interlocutorias que ponen término al juicio o hacen imposible su continuación; (3) excepcionalmente, interlocutorias de 2° instancia sin previo emplazamiento o sin señalar día para la vista. Causales: art. 768 CPC.",
  },
  {
    recurso: "casacion_fondo",
    nombre: "Casación en el fondo",
    contra: ["sentencia_definitiva", "sentencia_interlocutoria_2grado"],
    plazoDias: 15,
    articulo: "Art. 767 CPC",
    tribunalQueConoce: "Corte Suprema",
    efectos: "No suspensivo, salvo art. 773.",
    descripcion: "Procede contra sentencias definitivas o interlocutorias (que pongan término al juicio o hagan imposible su continuación), INAPELABLES, dictadas por Cortes de Apelaciones o tribunales arbitrales de derecho de 2° instancia. Causal: infracción de ley con influencia sustancial en lo dispositivo.",
  },
  {
    recurso: "queja",
    nombre: "Queja",
    contra: ["sentencia_definitiva", "sentencia_interlocutoria_2grado"],
    plazoDias: 5,
    articulo: "Art. 545 COT",
    tribunalQueConoce: "Tribunal superior jerárquico (Corte de Apelaciones o Suprema)",
    efectos: "Disciplinario; puede invalidar.",
    descripcion: "Procede contra sentencias definitivas o interlocutorias que pongan fin al juicio o hagan imposible su continuación, y que NO sean susceptibles de recurso alguno ordinario o extraordinario. Excepción: sentencias definitivas de 1ª o única instancia de árbitros arbitradores (procede aunque haya casación en la forma).",
  },
  {
    recurso: "revision",
    nombre: "Revisión",
    contra: ["sentencia_definitiva"],
    plazoDias: "1 año desde firme",
    articulo: "Art. 810 CPC",
    tribunalQueConoce: "Corte Suprema",
    efectos: "Excepcional. No suspende salvo orden expresa.",
    descripcion: "Procede contra sentencias FIRMES o ejecutoriadas ganadas injustamente por cohecho, violencia, fraude, documentos falsos, ignorancia de pruebas decisivas. Causales taxativas.",
  },
];

export function recursoProcedente(input: { tipoResolucion: TipoResolucion; recurso: TipoRecurso }): {
  procede: boolean;
  articulo: string;
  explicacion: string;
} {
  const r = TABLA_RECURSOS.find((x) => x.recurso === input.recurso);
  if (!r) return { procede: false, articulo: "—", explicacion: "Recurso desconocido." };
  const procede = r.contra.includes(input.tipoResolucion);
  return {
    procede,
    articulo: r.articulo,
    explicacion: procede ? `${r.nombre} procede contra ${input.tipoResolucion}: ${r.descripcion}` : `${r.nombre} NO procede contra ${input.tipoResolucion}. ${r.descripcion}`,
  };
}

// ============================================================================
//  MEDIOS DE PRUEBA — Arts. 341 y ss. CPC
// ============================================================================

export const MEDIOS_PRUEBA: { medio: MedioProbatorio; nombre: string; arts: string; valor: string }[] = [
  { medio: "instrumental", nombre: "Prueba instrumental", arts: "Arts. 342-355 CPC", valor: "Instrumentos públicos: plena prueba en cuanto a su otorgamiento y fecha; entre las partes, plena prueba también del hecho (art. 1700 CC). Instrumentos privados reconocidos o mandados tener por reconocidos." },
  { medio: "testimonial", nombre: "Prueba testimonial", arts: "Arts. 356-384 CPC", valor: "Apreciada según sana crítica; reglas de inhabilidad de los testigos (357-358). Dos testigos contestes hábiles imparciales pueden constituir plena prueba." },
  { medio: "confesion", nombre: "Confesión (absolución de posiciones)", arts: "Arts. 385-402 CPC", valor: "Plena prueba en lo que se confiesa contra sí mismo en hechos personales (art. 1713 CC). Tácita por incomparecencia o negativa (art. 394)." },
  { medio: "inspeccion", nombre: "Inspección personal del tribunal", arts: "Arts. 403-408 CPC", valor: "Plena prueba sobre los hechos directamente observados." },
  { medio: "pericial", nombre: "Informe de peritos", arts: "Arts. 409-425 CPC", valor: "Apreciado conforme a sana crítica (art. 425)." },
  { medio: "presunciones", nombre: "Presunciones judiciales", arts: "Arts. 426-427 CPC", valor: "Una sola presunción puede constituir plena prueba si reúne caracteres de gravedad y precisión suficientes (art. 426 inc. 2°)." },
];

// ============================================================================
//  JUICIO EJECUTIVO — Arts. 434-478 CPC
// ============================================================================

export const TITULOS_EJECUTIVOS = [
  { n: 1, t: "Sentencia firme, sea definitiva o interlocutoria.", articulo: "Art. 434 N°1 CPC" },
  { n: 2, t: "Copia autorizada de escritura pública.", articulo: "Art. 434 N°2 CPC" },
  { n: 3, t: "Acta de avenimiento pasada ante tribunal competente y autorizada por un ministro de fe.", articulo: "Art. 434 N°3 CPC" },
  { n: 4, t: "Instrumento privado reconocido judicialmente o mandado tener por reconocido. (Aceptación o reconocimiento de letras de cambio o pagarés notificados judicialmente).", articulo: "Art. 434 N°4 CPC" },
  { n: 5, t: "Confesión judicial.", articulo: "Art. 434 N°5 CPC" },
  { n: 6, t: "Cualesquiera títulos al portador o nominativos de deuda pública, bonos de instituciones autorizadas.", articulo: "Art. 434 N°6 CPC" },
  { n: 7, t: "Cualquier otro título a que las leyes den fuerza ejecutiva.", articulo: "Art. 434 N°7 CPC" },
];

export const EXCEPCIONES_OPOSICION_EJECUTIVO = "Las del art. 464 CPC son TAXATIVAS (17 excepciones).";

// ============================================================================
//  ARTÍCULOS DESTACADOS PARA EL CODEX
// ============================================================================

export const ARTICULOS_DESTACADOS = [
  { n: "76 CPR", t: "Facultad de conocer las causas civiles y criminales, resolverlas y hacer ejecutar lo juzgado pertenece exclusivamente a los tribunales establecidos por la ley." },
  { n: "1 COT", t: "La facultad de conocer las causas civiles y criminales, juzgarlas y hacer ejecutar lo juzgado, pertenece exclusivamente a los tribunales que establece la ley." },
  { n: "5 COT", t: "Tribunales que forman parte del Poder Judicial." },
  { n: "45 COT", t: "Competencia de los Juzgados de Letras." },
  { n: "50 COT", t: "Fuero mayor: conocen los Ministros de Corte de Apelaciones." },
  { n: "115-129 COT", t: "Reglas de cuantía." },
  { n: "130-133 COT", t: "Reglas de materia." },
  { n: "134-148 COT", t: "Reglas de territorio." },
  { n: "181 COT", t: "Prórroga de competencia: requisitos." },
  { n: "545 COT", t: "Recurso de queja." },
  { n: "40 CPC", t: "Notificación personal: regla general en juicios." },
  { n: "44 CPC", t: "Notificación personal subsidiaria." },
  { n: "48 CPC", t: "Notificación por cédula." },
  { n: "50 CPC", t: "Notificación por estado diario." },
  { n: "158 CPC", t: "Clasificación de las resoluciones judiciales." },
  { n: "181 CPC", t: "Reposición ordinaria contra autos y decretos." },
  { n: "182 CPC", t: "Aclaración, rectificación o enmienda." },
  { n: "187 CPC", t: "Apelación: regla general." },
  { n: "188 CPC", t: "Apelación subsidiaria contra autos y decretos." },
  { n: "189 CPC", t: "Plazo apelación: 5 días autos/interlocutorias; 10 días sentencias definitivas." },
  { n: "195-196 CPC", t: "Efectos de la apelación (suspensivo/devolutivo). Recurso de hecho falso." },
  { n: "203 CPC", t: "Recurso de hecho verdadero." },
  { n: "254 CPC", t: "Requisitos formales de la demanda." },
  { n: "258-259 CPC", t: "Plazos para contestar la demanda." },
  { n: "262 CPC", t: "Conciliación obligatoria." },
  { n: "303 CPC", t: "Excepciones dilatorias (enumeración)." },
  { n: "310 CPC", t: "Excepciones perentorias anómalas: prescripción, cosa juzgada, transacción, pago." },
  { n: "318 CPC", t: "Resolución que recibe la causa a prueba." },
  { n: "319 CPC", t: "Reposición especial contra auto de prueba." },
  { n: "328 CPC", t: "Término probatorio ordinario: 20 días." },
  { n: "342-355 CPC", t: "Prueba instrumental." },
  { n: "385-402 CPC", t: "Confesión." },
  { n: "434 CPC", t: "Títulos ejecutivos (enumeración)." },
  { n: "464 CPC", t: "Excepciones taxativas a la ejecución." },
  { n: "766 CPC", t: "Casación en la forma." },
  { n: "767 CPC", t: "Casación en el fondo." },
  { n: "768 CPC", t: "Causales de casación en la forma." },
  { n: "810 CPC", t: "Recurso de revisión." },
];
