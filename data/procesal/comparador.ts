// ============================================================================
// COMPARADOR DE PROCEDIMIENTOS — los procesos civiles lado a lado, alineados por
// aspecto, con plazos y rasgos visibles a simple vista. CPC chileno.
// ============================================================================

export interface ProcCol {
  id: string;
  nombre: string;
  corto: string;
  color: string;
  icono: string;
  norma: string;
}

export const PROC_COLS: ProcCol[] = [
  { id: "ordinario", nombre: "Juicio Ordinario", corto: "Ordinario", color: "#4a90e2", icono: "🏛️", norma: "Libro II CPC" },
  { id: "sumario", nombre: "Juicio Sumario", corto: "Sumario", color: "#e0b020", icono: "🗼", norma: "Arts. 680 y ss." },
  { id: "ejecutivo", nombre: "Juicio Ejecutivo", corto: "Ejecutivo", color: "#d2544a", icono: "🏰", norma: "Libro III CPC" },
  { id: "incidental", nombre: "Ejecución Incidental", corto: "Incidental", color: "#9a6fd0", icono: "⛓️", norma: "Arts. 231 y ss." },
  { id: "apelacion", nombre: "Apelación (2ª inst.)", corto: "Apelación", color: "#3fb083", icono: "⚖️", norma: "Arts. 186 y ss." },
];

export interface Celda { texto: string; plazo?: string }
export interface FilaComp { id: string; aspecto: string; celdas: Record<string, Celda | null> }

export const FILAS_COMP: FilaComp[] = [
  {
    id: "naturaleza",
    aspecto: "Naturaleza",
    celdas: {
      ordinario: { texto: "Declarativo de lato conocimiento; general y supletorio" },
      sumario: { texto: "Declarativo breve y concentrado" },
      ejecutivo: { texto: "De ejecución; exige título ejecutivo" },
      incidental: { texto: "Cumplimiento de un fallo (acción de cosa juzgada)" },
      apelacion: { texto: "Recurso ordinario; abre la segunda instancia" },
    },
  },
  {
    id: "inicio",
    aspecto: "Acto de inicio",
    celdas: {
      ordinario: { texto: "Demanda", plazo: "art. 254" },
      sumario: { texto: "Demanda (escrita o verbal); cita a audiencia", plazo: "art. 682" },
      ejecutivo: { texto: "Demanda ejecutiva + título; «despáchese»", plazo: "art. 434" },
      incidental: { texto: "Solicitud de cumplimiento «con citación»", plazo: "art. 233" },
      apelacion: { texto: "Escrito fundado, con peticiones concretas", plazo: "art. 189" },
    },
  },
  {
    id: "emplazamiento",
    aspecto: "Notificación / emplazamiento",
    celdas: {
      ordinario: { texto: "Notificación personal de la demanda", plazo: "15 d + aumentos" },
      sumario: { texto: "Notificación personal; comparendo", plazo: "audiencia al 5° día" },
      ejecutivo: { texto: "Requerimiento de pago (ministro de fe)", plazo: "art. 443" },
      incidental: { texto: "Cumplimiento con citación de la contraria", plazo: "art. 233" },
      apelacion: { texto: "Ingreso a la Corte y comparecencia", plazo: "5 días" },
    },
  },
  {
    id: "defensa",
    aspecto: "Plazo para defenderse",
    celdas: {
      ordinario: { texto: "Contestar la demanda", plazo: "15 días" },
      sumario: { texto: "Contestar en la audiencia", plazo: "comparendo 5° día" },
      ejecutivo: { texto: "Oponer excepciones", plazo: "4 días (459-460)" },
      incidental: { texto: "Oponerse (solo hechos posteriores)", plazo: "3 días" },
      apelacion: { texto: "Adhesión del apelado agraviado", plazo: "5 días" },
    },
  },
  {
    id: "defensas",
    aspecto: "Defensas admisibles",
    celdas: {
      ordinario: { texto: "Dilatorias (303) y perentorias (libres)" },
      sumario: { texto: "Las que procedan, en la audiencia" },
      ejecutivo: { texto: "Solo las taxativas del art. 464" },
      incidental: { texto: "Solo las del art. 234 (hechos posteriores, con antecedente escrito)" },
      apelacion: { texto: "Se invoca el agravio; no se renueva el debate de fondo" },
    },
  },
  {
    id: "discusion",
    aspecto: "Réplica y dúplica",
    celdas: {
      ordinario: { texto: "Sí, hay fase de discusión", plazo: "6 + 6 días" },
      sumario: null,
      ejecutivo: null,
      incidental: null,
      apelacion: null,
    },
  },
  {
    id: "conciliacion",
    aspecto: "Conciliación obligatoria",
    celdas: {
      ordinario: { texto: "Sí, trámite esencial", plazo: "art. 262" },
      sumario: { texto: "Se intenta en la audiencia" },
      ejecutivo: null,
      incidental: null,
      apelacion: null,
    },
  },
  {
    id: "prueba",
    aspecto: "Recepción a prueba",
    celdas: {
      ordinario: { texto: "Resolución que fija hechos (notif. por cédula)", plazo: "art. 318" },
      sumario: { texto: "Si hay hechos sustanciales controvertidos" },
      ejecutivo: { texto: "Si se declaran admisibles las excepciones" },
      incidental: { texto: "Excepcional" },
      apelacion: { texto: "Prueba en 2ª instancia: muy excepcional" },
    },
  },
  {
    id: "probatorio",
    aspecto: "Término probatorio",
    celdas: {
      ordinario: { texto: "Ordinario", plazo: "20 días" },
      sumario: { texto: "Reglas de los incidentes", plazo: "8 días" },
      ejecutivo: { texto: "Propio del ejecutivo", plazo: "10 días" },
      incidental: { texto: "—" },
      apelacion: { texto: "—" },
    },
  },
  {
    id: "decision",
    aspecto: "Cómo se decide",
    celdas: {
      ordinario: { texto: "Sentencia definitiva", plazo: "60 días (162)" },
      sumario: { texto: "Sentencia en breve plazo", plazo: "arts. 687-688" },
      ejecutivo: { texto: "Sentencia de pago o de remate", plazo: "art. 472" },
      incidental: { texto: "Se ordena el cumplimiento y apremios", plazo: "art. 235" },
      apelacion: { texto: "Fallo: confirma, revoca o modifica" },
    },
  },
  {
    id: "instancia",
    aspecto: "Tribunal / instancia",
    celdas: {
      ordinario: { texto: "1ª instancia (juez de letras)" },
      sumario: { texto: "1ª instancia" },
      ejecutivo: { texto: "1ª instancia (dos cuadernos)" },
      incidental: { texto: "El mismo tribunal que dictó el fallo" },
      apelacion: { texto: "Corte de Apelaciones: en cuenta o previa vista", plazo: "art. 199" },
    },
  },
  {
    id: "recursos",
    aspecto: "Recursos / efectos",
    celdas: {
      ordinario: { texto: "Apelación de la definitiva", plazo: "10 días" },
      sumario: { texto: "Apelación en ambos efectos (691)", plazo: "10 días" },
      ejecutivo: { texto: "Apelación; reserva de acciones (478)" },
      incidental: { texto: "Recursos propios del incidente" },
      apelacion: { texto: "Casación en la forma y en el fondo", plazo: "15 días" },
    },
  },
  {
    id: "distintivo",
    aspecto: "Rasgo distintivo",
    celdas: {
      ordinario: { texto: "El procedimiento tipo: completo y supletorio de todos" },
      sumario: { texto: "Rapidez; acceso provisional por rebeldía (684)" },
      ejecutivo: { texto: "Dos cuadernos a la vez: principal + apremio" },
      incidental: { texto: "Vía expedita dentro de 1 año; oposición restringida" },
      apelacion: { texto: "No es un juicio: revisa lo ya fallado (tantum devolutum)" },
    },
  },
];
