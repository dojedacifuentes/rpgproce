// ============================================================================
// EXPEDIENTE VIVO — la mecánica principal. El jugador recibe una carpeta con
// una situación procesal y debe responder qué plazo tiene, qué puede hacer,
// qué recurso procede y qué consecuencias hay. Derecho Procesal Civil chileno.
// ============================================================================

export interface PreguntaCarpeta {
  eje: "Plazo" | "Acción" | "Recurso" | "Consecuencia";
  pregunta: string;
  opciones: { id: string; texto: string }[];
  correcta: string;
  explicacion: string;
  articulo?: string;
}

export interface CarpetaViva {
  id: string;
  titulo: string;
  situacion: string;
  preguntas: PreguntaCarpeta[];
}

export const CARPETAS_VIVAS: CarpetaViva[] = [
  {
    id: "cv_ordinario_emplazado",
    titulo: "Recién emplazado",
    situacion:
      "Tu cliente fue notificado personalmente de una demanda de juicio ordinario el día de hoy, en la misma comuna donde tiene asiento el tribunal.",
    preguntas: [
      {
        eje: "Plazo",
        pregunta: "¿De cuánto es el término de emplazamiento para contestar?",
        opciones: [
          { id: "a", texto: "15 días" },
          { id: "b", texto: "5 días" },
          { id: "c", texto: "10 días" },
        ],
        correcta: "a",
        explicacion: "El término de emplazamiento base del juicio ordinario es de 15 días (con aumentos si el demandado está fuera del lugar o del territorio).",
        articulo: "Art. 258 CPC",
      },
      {
        eje: "Acción",
        pregunta: "Antes de contestar, ¿qué puede oponer para corregir el procedimiento?",
        opciones: [
          { id: "a", texto: "Excepciones dilatorias" },
          { id: "b", texto: "Excepciones perentorias" },
          { id: "c", texto: "Recurso de apelación" },
        ],
        correcta: "a",
        explicacion: "Las dilatorias corrigen vicios del procedimiento y se oponen antes de contestar, dentro del término de emplazamiento.",
        articulo: "Arts. 303 y 305 CPC",
      },
      {
        eje: "Consecuencia",
        pregunta: "Si deja transcurrir el plazo sin contestar, ¿qué ocurre?",
        opciones: [
          { id: "a", texto: "Precluye y el juicio sigue en su rebeldía" },
          { id: "b", texto: "Se archiva la causa" },
          { id: "c", texto: "El tribunal lo cita a una nueva audiencia" },
        ],
        correcta: "a",
        explicacion: "Por la preclusión, vencido el plazo se tiene por evacuado el trámite y el juicio continúa sin la contestación.",
        articulo: "Art. 64 CPC",
      },
    ],
  },
  {
    id: "cv_sentencia_desfavorable",
    titulo: "Sentencia adversa",
    situacion: "Te notifican la sentencia definitiva de primera instancia y es desfavorable a tu cliente.",
    preguntas: [
      {
        eje: "Recurso",
        pregunta: "¿Cuál es el recurso principal para que el superior la enmiende?",
        opciones: [
          { id: "a", texto: "Apelación" },
          { id: "b", texto: "Reposición" },
          { id: "c", texto: "Queja" },
        ],
        correcta: "a",
        explicacion: "La apelación busca que el tribunal superior enmiende conforme a derecho la resolución del inferior.",
        articulo: "Art. 186 CPC",
      },
      {
        eje: "Plazo",
        pregunta: "¿En qué plazo debes apelar?",
        opciones: [
          { id: "a", texto: "10 días" },
          { id: "b", texto: "5 días" },
          { id: "c", texto: "15 días" },
        ],
        correcta: "a",
        explicacion: "La apelación de la sentencia definitiva se interpone dentro de 10 días fatales.",
        articulo: "Art. 189 CPC",
      },
      {
        eje: "Recurso",
        pregunta: "Si además hay vicios de forma en la sentencia, ¿qué recurso va conjuntamente?",
        opciones: [
          { id: "a", texto: "Casación en la forma" },
          { id: "b", texto: "Casación en el fondo" },
          { id: "c", texto: "Revisión" },
        ],
        correcta: "a",
        explicacion: "La casación en la forma por vicios de la sentencia o del procedimiento se interpone conjuntamente con la apelación en primera instancia.",
        articulo: "Arts. 768 y 770 CPC",
      },
    ],
  },
  {
    id: "cv_ejecutivo_requerido",
    titulo: "Requerido de pago",
    situacion: "En un juicio ejecutivo, el receptor requirió de pago a tu cliente hoy, en la comuna asiento del tribunal. No pagó.",
    preguntas: [
      {
        eje: "Plazo",
        pregunta: "¿Qué plazo hay para oponer excepciones?",
        opciones: [
          { id: "a", texto: "4 días" },
          { id: "b", texto: "8 días" },
          { id: "c", texto: "15 días" },
        ],
        correcta: "a",
        explicacion: "Requerido en la comuna asiento del tribunal, el plazo es de 4 días (aumenta según el lugar del requerimiento).",
        articulo: "Art. 459 CPC",
      },
      {
        eje: "Acción",
        pregunta: "¿Qué excepciones puede oponer?",
        opciones: [
          { id: "a", texto: "Solo las taxativas del art. 464" },
          { id: "b", texto: "Cualquier excepción perentoria" },
          { id: "c", texto: "Solo dilatorias" },
        ],
        correcta: "a",
        explicacion: "En el ejecutivo las excepciones son taxativas: solo las del art. 464, opuestas en un mismo escrito.",
        articulo: "Art. 464 CPC",
      },
      {
        eje: "Consecuencia",
        pregunta: "Si no opone excepciones en plazo, ¿qué sucede?",
        opciones: [
          { id: "a", texto: "El mandamiento basta de sentencia y se sigue el apremio" },
          { id: "b", texto: "Se sobresee la causa" },
          { id: "c", texto: "Se abre un término probatorio de 20 días" },
        ],
        correcta: "a",
        explicacion: "No opuestas excepciones, se omite la sentencia: el mandamiento de ejecución basta de sentencia para proseguir el apremio.",
        articulo: "Art. 472 CPC",
      },
    ],
  },
  {
    id: "cv_prueba_omitida",
    titulo: "Hecho omitido en la prueba",
    situacion: "El tribunal dictó la resolución que recibe la causa a prueba, pero omitió fijar un hecho sustancial que a ti te interesa probar.",
    preguntas: [
      {
        eje: "Recurso",
        pregunta: "¿Qué recurso procede para que agregue ese hecho?",
        opciones: [
          { id: "a", texto: "Reposición (especial)" },
          { id: "b", texto: "Apelación directa" },
          { id: "c", texto: "Casación en la forma" },
        ],
        correcta: "a",
        explicacion: "Contra la interlocutoria de prueba procede reposición especial (con apelación subsidiaria) para modificar, eliminar o agregar puntos.",
        articulo: "Art. 319 CPC",
      },
      {
        eje: "Plazo",
        pregunta: "¿En qué plazo?",
        opciones: [
          { id: "a", texto: "3 días" },
          { id: "b", texto: "5 días" },
          { id: "c", texto: "10 días" },
        ],
        correcta: "a",
        explicacion: "La reposición especial contra la resolución que recibe la causa a prueba se interpone dentro de 3 días.",
        articulo: "Art. 319 CPC",
      },
    ],
  },
  {
    id: "cv_cumplimiento",
    titulo: "A cobrar lo ganado",
    situacion: "Obtuviste una sentencia firme que condena a la contraparte a pagar una suma de dinero. Han pasado tres meses desde que quedó ejecutoriada.",
    preguntas: [
      {
        eje: "Acción",
        pregunta: "¿Qué vía usas para cobrar ante el mismo tribunal que falló?",
        opciones: [
          { id: "a", texto: "Cumplimiento incidental de la sentencia" },
          { id: "b", texto: "Una nueva demanda ordinaria" },
          { id: "c", texto: "Gestión preparatoria de la vía ejecutiva" },
        ],
        correcta: "a",
        explicacion: "Ante el mismo tribunal y dentro de plazo, la vía expedita es el cumplimiento incidental (acción de cosa juzgada).",
        articulo: "Art. 231 CPC",
      },
      {
        eje: "Plazo",
        pregunta: "¿Dentro de qué plazo procede esa vía incidental?",
        opciones: [
          { id: "a", texto: "1 año desde que la ejecución se hizo exigible" },
          { id: "b", texto: "3 años" },
          { id: "c", texto: "60 días" },
        ],
        correcta: "a",
        explicacion: "El cumplimiento incidental procede dentro de un año; vencido, se ejecuta por la vía del juicio ejecutivo.",
        articulo: "Art. 233 CPC",
      },
      {
        eje: "Consecuencia",
        pregunta: "Pedido el cumplimiento 'con citación', ¿qué plazo tiene el vencido para oponerse?",
        opciones: [
          { id: "a", texto: "3 días" },
          { id: "b", texto: "5 días" },
          { id: "c", texto: "10 días" },
        ],
        correcta: "a",
        explicacion: "La citación abre un plazo de 3 días para oponerse, solo por hechos posteriores a la sentencia y con antecedente escrito.",
        articulo: "Art. 234 CPC",
      },
    ],
  },
  {
    id: "cv_casacion_fondo",
    titulo: "Error de derecho en la Corte",
    situacion: "Una Corte de Apelaciones dictó una sentencia definitiva inapelable, con una infracción de ley que influyó sustancialmente en lo dispositivo del fallo.",
    preguntas: [
      {
        eje: "Recurso",
        pregunta: "¿Qué recurso procede ante la Corte Suprema?",
        opciones: [
          { id: "a", texto: "Casación en el fondo" },
          { id: "b", texto: "Apelación" },
          { id: "c", texto: "Recurso de queja" },
        ],
        correcta: "a",
        explicacion: "La casación en el fondo procede contra sentencias inapelables de las Cortes cuando hay infracción de ley que influye en lo dispositivo.",
        articulo: "Art. 767 CPC",
      },
      {
        eje: "Plazo",
        pregunta: "¿En qué plazo se interpone?",
        opciones: [
          { id: "a", texto: "15 días" },
          { id: "b", texto: "10 días" },
          { id: "c", texto: "5 días" },
        ],
        correcta: "a",
        explicacion: "La casación (forma y fondo) en única o segunda instancia se interpone dentro de 15 días fatales.",
        articulo: "Art. 770 CPC",
      },
    ],
  },
];
