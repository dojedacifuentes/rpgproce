// ============================================================================
// EL TRIBUNAL DE ALZADA — segunda instancia y recursos en profundidad.
// Efectos de la apelación, orden de no innovar, en cuenta vs previa vista,
// casación forma + fondo conjuntas. Hipótesis complejas + repaso. CPC chileno.
// ============================================================================

export const RELATOR = {
  nombre: "El Relator de la Corte",
  icono: "🎙️",
  intro:
    "Subiste a la Corte. Aquí los autos se ven 'en cuenta' o 'previa vista de la causa', y muchos recursos mueren no por el fondo, sino por un efecto mal pedido. Yo relato, ustedes alegan, la Sala decide. A veces ni siquiera los dejan alegar.",
  frases: [
    "¿Pediste el efecto suspensivo? No. Entonces ya te ejecutaron mientras apelabas. Felicitaciones.",
    "Casación en la forma y en el fondo van juntas o no van. Como ciertos matrimonios.",
    "Se vio en cuenta. ¿Querías alegar? Haberlo pedido dentro de plazo.",
    "Orden de no innovar: lo único que detiene al inferior. Pídela, o mira cómo rematan la casa.",
    "El tribunal de alzada solo conoce de lo apelado. Apelar de más, a veces, es apelar de menos.",
  ],
};

// ── REPASO RELÁMPAGO (memorización: concepto → regla) ───────────────────────
export interface CartaMemoria { id: string; frente: string; dorso: string; articulo: string }

export const MEMORIA_ALZADA: CartaMemoria[] = [
  { id: "ma1", frente: "Efecto devolutivo", dorso: "Otorga competencia al tribunal superior para conocer del recurso. Siempre está presente; concedida solo en este efecto, el inferior sigue conociendo y puede ejecutarse lo resuelto.", articulo: "Arts. 186-187 CPC" },
  { id: "ma2", frente: "Efecto suspensivo", dorso: "Suspende la competencia del tribunal inferior: no puede ejecutarse la resolución mientras pende la apelación.", articulo: "Art. 191 CPC" },
  { id: "ma3", frente: "Regla general: sentencia definitiva", dorso: "La apelación de la sentencia definitiva (en juicio ordinario) se concede en AMBOS efectos, salvo las excepciones del art. 194.", articulo: "Art. 195 CPC" },
  { id: "ma4", frente: "¿Cuándo solo efecto devolutivo?", dorso: "En los casos del art. 194: resoluciones dictadas contra el demandado en el juicio ejecutivo y sumario; autos, decretos e interlocutorias; resoluciones que ordenen alzar medidas precautorias; y demás que la ley señale.", articulo: "Art. 194 CPC" },
  { id: "ma5", frente: "Orden de no innovar", dorso: "Concedida la apelación en el solo efecto devolutivo, el tribunal de alzada puede, a petición del apelante, suspender los efectos de la resolución recurrida.", articulo: "Art. 192 CPC" },
  { id: "ma6", frente: "En cuenta vs previa vista", dorso: "Las apelaciones se ven EN CUENTA, salvo que dentro del plazo de comparecencia alguna parte solicite alegatos; la apelación de la sentencia definitiva se ve PREVIA VISTA de la causa.", articulo: "Art. 199 CPC" },
  { id: "ma7", frente: "Trámites de la vista de la causa", dorso: "Autos en relación, instalación del tribunal, anuncio, relación del relator y alegatos de los abogados.", articulo: "Arts. 222 y ss. CPC" },
  { id: "ma8", frente: "Casación en la forma y en el fondo", dorso: "Si proceden ambas contra la misma resolución, se interponen CONJUNTAMENTE en un mismo escrito. La Corte conoce primero la de forma; acogida ésta, no se pronuncia sobre el fondo.", articulo: "Art. 770 CPC" },
  { id: "ma9", frente: "Adhesión a la apelación", dorso: "El apelado también agraviado puede adherirse a la apelación dentro de 5 días (en segunda instancia, desde la certificación de ingreso de los autos).", articulo: "Art. 217 CPC" },
  { id: "ma10", frente: "Tantum devolutum quantum appellatum", dorso: "El tribunal de alzada solo conoce de los puntos apelados; no puede reformar la resolución en perjuicio del único apelante (prohibición de reformatio in peius).", articulo: "Arts. 160 y 692 CPC" },
];

// ── HIPÓTESIS COMPLEJAS (MC con razonamiento) ───────────────────────────────
export interface HipotesisAlzada {
  id: string;
  titulo: string;
  situacion: string;
  pregunta: string;
  opciones: { id: string; texto: string }[];
  correcta: string;
  razonamiento: string;
  articulo: string;
}

export const HIPOTESIS_ALZADA: HipotesisAlzada[] = [
  {
    id: "alz_def_ambos",
    titulo: "La definitiva ordinaria",
    situacion: "En un juicio ordinario de mayor cuantía se dicta sentencia definitiva. El demandado, vencido, apela en tiempo y forma.",
    pregunta: "¿En qué efectos debe concederse la apelación?",
    opciones: [
      { id: "a", texto: "En ambos efectos (devolutivo y suspensivo)" },
      { id: "b", texto: "Solo en el efecto devolutivo" },
      { id: "c", texto: "Solo en el efecto suspensivo" },
    ],
    correcta: "a",
    razonamiento: "La regla general es que la apelación de la sentencia definitiva se concede en ambos efectos, salvo las excepciones del art. 194. No existe la concesión 'solo en lo suspensivo': el devolutivo siempre está.",
    articulo: "Art. 195 CPC",
  },
  {
    id: "alz_ejecutivo_devolutivo",
    titulo: "El ejecutado que apela",
    situacion: "En un juicio ejecutivo se dicta sentencia de remate contra el ejecutado, que apela para evitar que se rematen sus bienes.",
    pregunta: "¿En qué efecto se concede esa apelación?",
    opciones: [
      { id: "a", texto: "Solo en el efecto devolutivo: la ejecución sigue" },
      { id: "b", texto: "En ambos efectos: se suspende el remate" },
      { id: "c", texto: "No es apelable la sentencia de remate" },
    ],
    correcta: "a",
    razonamiento: "Las resoluciones dictadas contra el demandado en el juicio ejecutivo y sumario se conceden en el solo efecto devolutivo: el apremio continúa pese a la apelación. Por eso conviene pedir orden de no innovar.",
    articulo: "Art. 194 N°1 CPC",
  },
  {
    id: "alz_consecuencia_devolutivo",
    titulo: "Concedida en lo devolutivo",
    situacion: "El tribunal concede una apelación en el solo efecto devolutivo.",
    pregunta: "¿Qué puede hacer el tribunal de primera instancia?",
    opciones: [
      { id: "a", texto: "Seguir conociendo y ejecutar lo resuelto (se sacan compulsas)" },
      { id: "b", texto: "Quedar sin competencia hasta que falle la Corte" },
      { id: "c", texto: "Archivar la causa" },
    ],
    correcta: "a",
    razonamiento: "Sin efecto suspensivo, el inferior conserva competencia: cumple y ejecuta lo resuelto mientras el superior conoce del recurso con las compulsas. Esa es la diferencia práctica del efecto.",
    articulo: "Arts. 192 y 197 CPC",
  },
  {
    id: "alz_oni",
    titulo: "Frenar al inferior",
    situacion: "Concedida la apelación solo en lo devolutivo, el apelante teme que se ejecute la resolución antes de que la Corte resuelva.",
    pregunta: "¿Qué puede pedir y ante quién?",
    opciones: [
      { id: "a", texto: "Orden de no innovar ante el tribunal de alzada" },
      { id: "b", texto: "Reposición ante el tribunal de primera instancia" },
      { id: "c", texto: "Nada: el efecto devolutivo es irreversible" },
    ],
    correcta: "a",
    razonamiento: "El art. 192 faculta al tribunal de alzada para, a petición del apelante, decretar orden de no innovar y suspender los efectos de la resolución apelada en el solo efecto devolutivo.",
    articulo: "Art. 192 CPC",
  },
  {
    id: "alz_en_cuenta",
    titulo: "Sin alegatos",
    situacion: "Se apela un auto que resolvió un incidente. Ingresados los autos a la Corte, transcurre el plazo de comparecencia y ninguna parte solicita alegatos.",
    pregunta: "¿Cómo conocerá la Corte de esa apelación?",
    opciones: [
      { id: "a", texto: "En cuenta, con la sola relación del relator" },
      { id: "b", texto: "Previa vista de la causa, con alegatos obligatorios" },
      { id: "c", texto: "La declarará desierta de inmediato" },
    ],
    correcta: "a",
    razonamiento: "Las apelaciones de resoluciones distintas de la sentencia definitiva se ven en cuenta, salvo que dentro del plazo de comparecencia se pidan alegatos. Nadie los pidió: se ve en cuenta.",
    articulo: "Art. 199 CPC",
  },
  {
    id: "alz_previa_vista",
    titulo: "Quiero alegar",
    situacion: "Se apela la sentencia definitiva de primera instancia. El apelado desea alegar ante la Corte.",
    pregunta: "¿Cómo se conocerá el recurso?",
    opciones: [
      { id: "a", texto: "Previa vista de la causa (procede la vista y los alegatos)" },
      { id: "b", texto: "En cuenta, salvo que el tribunal disponga lo contrario" },
      { id: "c", texto: "Solo por escrito, sin vista ni cuenta" },
    ],
    correcta: "a",
    razonamiento: "La apelación de la sentencia definitiva se conoce previa vista de la causa, lo que habilita la relación y los alegatos de los abogados.",
    articulo: "Art. 199 CPC",
  },
  {
    id: "alz_casacion_conjunta",
    titulo: "Forma y fondo",
    situacion: "Contra una sentencia definitiva inapelable de segunda instancia proceden, a la vez, casación en la forma y casación en el fondo.",
    pregunta: "¿Cómo deben interponerse?",
    opciones: [
      { id: "a", texto: "Conjuntamente, en un mismo escrito" },
      { id: "b", texto: "En escritos separados y con días de diferencia" },
      { id: "c", texto: "Solo una: son incompatibles entre sí" },
    ],
    correcta: "a",
    razonamiento: "Cuando proceden ambos recursos contra la misma resolución, deben deducirse conjuntamente en un mismo escrito, dentro del mismo plazo.",
    articulo: "Art. 770 inc. final CPC",
  },
  {
    id: "alz_orden_forma_fondo",
    titulo: "¿Cuál primero?",
    situacion: "La Corte Suprema recibe, interpuestas conjuntamente, una casación en la forma y una en el fondo contra la misma sentencia.",
    pregunta: "¿En qué orden las resuelve?",
    opciones: [
      { id: "a", texto: "Primero la forma; si la acoge, no se pronuncia sobre el fondo" },
      { id: "b", texto: "Primero el fondo, por ser más importante" },
      { id: "c", texto: "Ambas simultáneamente, en una sola decisión" },
    ],
    correcta: "a",
    razonamiento: "La casación en la forma es previa: si se acoge y se invalida la sentencia, resulta innecesario y improcedente pronunciarse sobre el fondo.",
    articulo: "Art. 808 CPC",
  },
  {
    id: "alz_adhesion",
    titulo: "El apelado también pierde algo",
    situacion: "Apelada la sentencia por una parte, el apelado advierte que también le causa agravio en otro punto y quiere impugnarla.",
    pregunta: "¿Qué puede hacer?",
    opciones: [
      { id: "a", texto: "Adherirse a la apelación dentro del plazo legal" },
      { id: "b", texto: "Nada: precluyó su derecho a apelar" },
      { id: "c", texto: "Apelar de nuevo en cualquier momento" },
    ],
    correcta: "a",
    razonamiento: "La adhesión a la apelación permite al apelado pedir la reforma de la sentencia en lo que le es desfavorable; en segunda instancia, dentro de 5 días desde la certificación de ingreso.",
    articulo: "Art. 217 CPC",
  },
  {
    id: "alz_reformatio",
    titulo: "Apelante único",
    situacion: "Solo el demandado apeló la sentencia. La Corte estima que, en realidad, debió condenárselo a más de lo que resolvió el inferior.",
    pregunta: "¿Puede la Corte agravar la situación del único apelante?",
    opciones: [
      { id: "a", texto: "No: solo conoce de lo apelado y no puede reformar en su perjuicio" },
      { id: "b", texto: "Sí: tiene plena competencia para revisar todo" },
      { id: "c", texto: "Sí, pero solo si el apelado lo pide en estrados" },
    ],
    correcta: "a",
    razonamiento: "Rige el tantum devolutum quantum appellatum: la competencia del tribunal de alzada se mide por la apelación. Sin adhesión del apelado, no cabe reformar en perjuicio del único apelante.",
    articulo: "Arts. 160 y 692 CPC",
  },
  {
    id: "alz_sumario_def",
    titulo: "Trampa: el sumario",
    situacion: "En un juicio sumario se dicta sentencia definitiva. El demandado vencido apela.",
    pregunta: "¿En qué efectos se concede, por regla, esa apelación?",
    opciones: [
      { id: "a", texto: "En ambos efectos, salvo que así se eludan sus resultados" },
      { id: "b", texto: "Solo en el efecto devolutivo, como toda resolución contra el demandado" },
      { id: "c", texto: "Es inapelable" },
    ],
    correcta: "a",
    razonamiento: "Cuidado con el reflejo: en el sumario, la apelación de la sentencia definitiva y de la resolución que da lugar al procedimiento se concede en ambos efectos, salvo que concedida así hayan de eludirse sus resultados (art. 691). No se aplica aquí la regla del 194.",
    articulo: "Art. 691 CPC",
  },
  {
    id: "alz_precautoria",
    titulo: "Alzar una precautoria",
    situacion: "El tribunal dicta una resolución que ordena alzar una medida precautoria. La parte beneficiada con la medida apela.",
    pregunta: "¿En qué efecto se concede esa apelación?",
    opciones: [
      { id: "a", texto: "Solo en el efecto devolutivo" },
      { id: "b", texto: "En ambos efectos" },
      { id: "c", texto: "No procede apelación" },
    ],
    correcta: "a",
    razonamiento: "Las resoluciones que ordenan alzar medidas precautorias figuran entre los casos del art. 194 que se conceden en el solo efecto devolutivo.",
    articulo: "Art. 194 CPC",
  },
];
