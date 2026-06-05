import type { CasoGrado } from "@/types/civilis";

// ============================================================================
// CASOS DE GRADO — casos integrados multi-paso (estilo examen de grado).
// Un relato de hechos + decisiones secuenciales razonadas con cita formal.
// Derecho Civil chileno (Código Civil).
// ============================================================================

export const CASOS_GRADO: CasoGrado[] = [
  // ── 1 · COMPRAVENTA: evicción y saneamiento ──────────────────────────────
  {
    id: "grado_eviccion",
    titulo: "La finca disputada",
    region: "compraventa",
    relato:
      "Pedro compra a Juan un predio por escritura pública y lo inscribe a su nombre. Un año después, Diego demanda a Pedro reivindicando el predio: exhibe un título de dominio anterior al de Juan. Pedro, alarmado, te consulta cómo defenderse.",
    pasos: [
      {
        pregunta: "¿Qué obligación del vendedor se ve comprometida por la demanda de Diego?",
        opciones: [
          { id: "a", texto: "La obligación de saneamiento de la evicción" },
          { id: "b", texto: "La obligación de saneamiento de los vicios redhibitorios" },
          { id: "c", texto: "La obligación de entregar la cosa vendida" },
        ],
        correcta: "a",
        explicacion:
          "La evicción es la privación total o parcial de la cosa por sentencia judicial y causa anterior a la venta. El vendedor debe amparar al comprador en el dominio y posesión pacífica.",
        articulo: "Arts. 1837 y 1838 CC",
      },
      {
        pregunta: "¿Qué debe hacer Pedro para que Juan quede obligado a responder de la evicción?",
        opciones: [
          { id: "a", texto: "Citar de evicción al vendedor antes de la contestación" },
          { id: "b", texto: "Demandar de inmediato la indemnización a Juan" },
          { id: "c", texto: "Pedir la resolución de la compraventa" },
        ],
        correcta: "a",
        explicacion:
          "El comprador debe citar de evicción al vendedor; si no lo hace y la cosa es evicta, el vendedor no es obligado al saneamiento. La citación se hace antes de contestar la demanda.",
        articulo: "Art. 1843 CC",
      },
      {
        pregunta: "Pedro es vencido y la cosa resulta evicta. La venta fue de buena fe. ¿Qué comprende la indemnización?",
        opciones: [
          { id: "a", texto: "Restitución del precio, costas, frutos, aumento de valor y perjuicios" },
          { id: "b", texto: "Solo la restitución del precio pagado" },
          { id: "c", texto: "El doble del precio, como pena legal" },
        ],
        correcta: "a",
        explicacion:
          "El saneamiento de la evicción comprende la restitución del precio, las costas del contrato, el valor de los frutos restituidos, las costas del juicio y el aumento de valor de la cosa.",
        articulo: "Art. 1847 CC",
      },
    ],
    recompensa: { xp: 90, oro: 40 },
  },

  // ── 2 · SOLIDARIDAD pasiva: pago y contribución ──────────────────────────
  {
    id: "grado_solidaridad",
    titulo: "Los tres deudores",
    region: "solidaridad",
    relato:
      "Ana, Bruno y Carla se obligan solidariamente frente a un banco por $30.000.000. El banco, sin demandar a los demás, cobra el total a Ana, quien paga íntegramente la deuda.",
    pasos: [
      {
        pregunta: "¿Podía el banco exigir el total solo a Ana?",
        opciones: [
          { id: "a", texto: "Sí: el acreedor puede dirigirse contra cualquier codeudor por el total" },
          { id: "b", texto: "No: solo podía cobrarle un tercio a cada uno" },
          { id: "c", texto: "No: debía demandar a los tres conjuntamente" },
        ],
        correcta: "a",
        explicacion:
          "En la solidaridad pasiva, el acreedor puede dirigirse contra todos los deudores conjuntamente o contra cualquiera por el total; es la esencia de la obligación solidaria (obligación a la deuda).",
        articulo: "Arts. 1511 y 1514 CC",
      },
      {
        pregunta: "Pagado el total, ¿qué puede cobrar Ana a Bruno y a Carla?",
        opciones: [
          { id: "a", texto: "La cuota o parte que a cada uno corresponde en la deuda" },
          { id: "b", texto: "El total a cualquiera de ellos, igual que el banco" },
          { id: "c", texto: "Nada: el pago extinguió toda relación" },
        ],
        correcta: "a",
        explicacion:
          "En las relaciones internas (contribución a la deuda), el codeudor que paga se subroga y solo puede repetir contra cada uno por su cuota; la solidaridad no se traspasa a la contribución.",
        articulo: "Art. 1522 CC",
      },
      {
        pregunta: "Resulta que el negocio solo interesaba a Bruno. ¿Cómo se distribuye finalmente la deuda?",
        opciones: [
          { id: "a", texto: "Bruno la soporta íntegra; Ana y Carla se consideran fiadores" },
          { id: "b", texto: "Se divide igual entre los tres pese al interés" },
          { id: "c", texto: "Ana, que pagó, la soporta sola" },
        ],
        correcta: "a",
        explicacion:
          "Si el negocio interesaba a uno solo de los codeudores, este es responsable del total frente a los demás, que solo fueron deudores solidarios en la obligación, como fiadores.",
        articulo: "Art. 1522 inc. 2 CC",
      },
    ],
    recompensa: { xp: 90, oro: 40 },
  },

  // ── 3 · CONTRATOS: CRT, opción del acreedor y riesgos ────────────────────
  {
    id: "grado_resolucion",
    titulo: "El contrato incumplido",
    region: "contratos",
    relato:
      "En un contrato bilateral, una parte no cumple su obligación pese a estar en mora. La contraparte cumplió íntegramente lo suyo y acude a ti para saber qué puede exigir.",
    pasos: [
      {
        pregunta: "¿Qué institución va envuelta en todo contrato bilateral y habilita la reacción del acreedor?",
        opciones: [
          { id: "a", texto: "La condición resolutoria tácita" },
          { id: "b", texto: "La condición suspensiva ordinaria" },
          { id: "c", texto: "El plazo extintivo tácito" },
        ],
        correcta: "a",
        explicacion:
          "En los contratos bilaterales va envuelta la condición resolutoria tácita: de no cumplirse por uno lo pactado, nace para el otro el derecho a reaccionar.",
        articulo: "Art. 1489 CC",
      },
      {
        pregunta: "¿Qué puede pedir el contratante diligente?",
        opciones: [
          { id: "a", texto: "A su arbitrio, la resolución o el cumplimiento, ambos con indemnización" },
          { id: "b", texto: "Únicamente la resolución del contrato" },
          { id: "c", texto: "Solo el cumplimiento forzado, nunca la resolución" },
        ],
        correcta: "a",
        explicacion:
          "El art. 1489 concede al contratante cumplidor la opción de pedir, a su arbitrio, la resolución o el cumplimiento del contrato, en ambos casos con indemnización de perjuicios.",
        articulo: "Art. 1489 CC",
      },
      {
        pregunta: "La obligación recaía sobre un cuerpo cierto que perece por caso fortuito antes de entregarse. ¿De quién es el riesgo?",
        opciones: [
          { id: "a", texto: "Del acreedor (res perit creditori)" },
          { id: "b", texto: "Del deudor (res perit debitori)" },
          { id: "c", texto: "Se reparte por mitades entre ambos" },
        ],
        correcta: "a",
        explicacion:
          "La regla del art. 1550 es res perit creditori: el riesgo del cuerpo cierto cuya entrega se debe es de cargo del acreedor, salvo mora del deudor o que se haya comprometido a entregar la misma cosa a dos personas.",
        articulo: "Art. 1550 CC",
      },
    ],
    recompensa: { xp: 90, oro: 40 },
  },

  // ── 4 · HIPOTECA: indivisibilidad y tercer poseedor ──────────────────────
  {
    id: "grado_hipoteca",
    titulo: "El tercer poseedor",
    region: "hipoteca",
    relato:
      "Un banco tiene hipoteca inscrita sobre un inmueble. El dueño lo vende a Marta, quien adquiere el predio pero NO se obliga personalmente al pago de la deuda garantizada. El banco, impago, quiere perseguir el inmueble.",
    pasos: [
      {
        pregunta: "¿Cómo es la hipoteca en cuanto a su objeto y a la deuda?",
        opciones: [
          { id: "a", texto: "Indivisible: todo el inmueble garantiza toda la deuda" },
          { id: "b", texto: "Divisible: cada parte del inmueble responde de una parte" },
          { id: "c", texto: "Divisible solo si hay varios acreedores" },
        ],
        correcta: "a",
        explicacion:
          "La hipoteca es indivisible: cada parte de la finca garantiza el total de la deuda y cada parte de la deuda está garantizada por toda la finca.",
        articulo: "Arts. 2408 CC",
      },
      {
        pregunta: "Marta no se obligó personalmente. ¿Qué acción tiene el banco para perseguir el inmueble en su poder?",
        opciones: [
          { id: "a", texto: "La acción de desposeimiento contra el tercer poseedor" },
          { id: "b", texto: "La acción reivindicatoria de dominio" },
          { id: "c", texto: "La acción pauliana o revocatoria" },
        ],
        correcta: "a",
        explicacion:
          "Contra el tercero que posee la finca hipotecada sin haberse obligado personalmente procede la acción de desposeimiento, previa notificación para que pague o abandone la finca.",
        articulo: "Art. 2428 CC",
      },
      {
        pregunta: "¿Goza el tercer poseedor del beneficio de excusión?",
        opciones: [
          { id: "a", texto: "No: el tercer poseedor no goza del beneficio de excusión" },
          { id: "b", texto: "Sí, siempre, como todo garante" },
          { id: "c", texto: "Solo si lo pacta expresamente con el acreedor" },
        ],
        correcta: "a",
        explicacion:
          "El tercer poseedor de la finca hipotecada no es reconvenido para el pago y no goza del beneficio de excusión; debe pagar o abandonar la finca.",
        articulo: "Art. 2429 CC",
      },
    ],
    recompensa: { xp: 90, oro: 40 },
  },

  // ── 5 · MANDATO: límites, terminación y rendición ────────────────────────
  {
    id: "grado_mandato",
    titulo: "El encargo de Sofía",
    region: "mandato",
    relato:
      "Sofía encarga a Tomás, por mandato, vender su automóvil en no menos de $8.000.000. Tomás, sin embargo, lo vende en $6.000.000 y, además, durante la gestión fallece Sofía.",
    pasos: [
      {
        pregunta: "Tomás vendió bajo el mínimo encargado. ¿Obliga ese acto a Sofía (o su sucesión)?",
        opciones: [
          { id: "a", texto: "No, salvo ratificación: se extralimitó del mandato" },
          { id: "b", texto: "Sí, porque el mandatario obliga siempre al mandante" },
          { id: "c", texto: "Sí, porque vender es un acto de administración" },
        ],
        correcta: "a",
        explicacion:
          "El mandatario que se extralimita no obliga al mandante respecto de lo que excede los límites del poder, salvo que el mandante ratifique expresa o tácitamente.",
        articulo: "Arts. 2154 y 2160 CC",
      },
      {
        pregunta: "Durante la gestión muere Sofía, la mandante. Por regla general, ¿qué ocurre con el mandato?",
        opciones: [
          { id: "a", texto: "Termina con la muerte del mandante" },
          { id: "b", texto: "Continúa siempre con los herederos" },
          { id: "c", texto: "Se transforma en agencia oficiosa irrevocable" },
        ],
        correcta: "a",
        explicacion:
          "El mandato termina, entre otras causas, por la muerte del mandante (regla general), sin perjuicio de excepciones como el mandato destinado a ejecutarse después de ella.",
        articulo: "Art. 2163 N°5 CC",
      },
      {
        pregunta: "¿Cuál es una obligación esencial de Tomás como mandatario al concluir su gestión?",
        opciones: [
          { id: "a", texto: "Rendir cuenta de su administración" },
          { id: "b", texto: "Garantizar con su patrimonio el resultado del negocio" },
          { id: "c", texto: "Adquirir para sí los bienes no vendidos" },
        ],
        correcta: "a",
        explicacion:
          "El mandatario es obligado a rendir cuenta de su administración; las partidas importantes deben documentarse si el mandante no lo ha relevado de esa obligación.",
        articulo: "Art. 2155 CC",
      },
    ],
    recompensa: { xp: 90, oro: 40 },
  },

  // ── 6 · EXTINCIÓN: distinguir los modos de extinguir ─────────────────────
  {
    id: "grado_extincion",
    titulo: "Cuatro formas de terminar",
    region: "extincion",
    relato:
      "Un mismo deudor enfrenta cuatro escenarios distintos frente a su acreedor. En cada uno debes identificar el modo de extinguir las obligaciones que opera.",
    pasos: [
      {
        pregunta: "El deudor paga con una cosa distinta de la debida, y el acreedor la acepta. ¿Qué modo opera?",
        opciones: [
          { id: "a", texto: "Dación en pago" },
          { id: "b", texto: "Novación por cambio de objeto" },
          { id: "c", texto: "Compensación voluntaria" },
        ],
        correcta: "a",
        explicacion:
          "La dación en pago extingue la obligación pagando con una prestación distinta aceptada por el acreedor; no crea una obligación nueva (eso la distingue de la novación).",
        articulo: "Dación en pago",
      },
      {
        pregunta: "Acreedor y deudor acuerdan sustituir la obligación primitiva por una nueva que la reemplaza. ¿Qué modo opera?",
        opciones: [
          { id: "a", texto: "Novación, que requiere ánimo de novar" },
          { id: "b", texto: "Dación en pago" },
          { id: "c", texto: "Remisión de la deuda" },
        ],
        correcta: "a",
        explicacion:
          "La novación es la sustitución de una obligación por otra que la extingue; exige animus novandi, que no se presume y debe constar inequívocamente.",
        articulo: "Art. 1628 CC",
      },
      {
        pregunta: "Acreedor y deudor son recíprocamente deudores de sumas líquidas, exigibles y de igual naturaleza. ¿Qué modo opera?",
        opciones: [
          { id: "a", texto: "Compensación legal, de pleno derecho" },
          { id: "b", texto: "Confusión de las calidades" },
          { id: "c", texto: "Transacción judicial" },
        ],
        correcta: "a",
        explicacion:
          "Concurriendo los requisitos (deudas líquidas, exigibles, de dinero o cosas fungibles del mismo género), la compensación legal opera por el solo ministerio de la ley, aun sin conocimiento de los deudores.",
        articulo: "Arts. 1655 y 1656 CC",
      },
    ],
    recompensa: { xp: 90, oro: 40 },
  },
];

export const getCasoGrado = (id: string) => CASOS_GRADO.find((c) => c.id === id);
