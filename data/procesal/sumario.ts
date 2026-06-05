import type { EtapaProc } from "@/types/procesal";

// ============================================================================
// EXPEDIENTE DEL JUICIO SUMARIO (Título XI, Libro III CPC, arts. 680 y ss.).
// Procedimiento breve y concentrado. Artículos del CPC chileno.
// ============================================================================

export const ETAPAS_SUMARIO: EtapaProc[] = [
  {
    id: "sum_procedencia",
    edificio: "sumario",
    orden: 1,
    grupo: "Procedencia",
    nombre: "Casos de procedencia",
    icono: "🗝️",
    resumen: "Aplicación general (cuando se requiere tramitación rápida) y casos del art. 680.",
    explicacion:
      "El sumario tiene aplicación general cuando la acción deducida requiere, por su naturaleza, una tramitación rápida para ser eficaz, y aplicación especial en los casos que enumera el art. 680.",
    enumeracion: {
      titulo: "Casos especiales (art. 680)",
      items: [
        "Casos en que la ley ordene proceder sumariamente o breve y sumariamente.",
        "Cuestiones que requieran tramitación rápida para ser eficaces.",
        "Comodato precario y precario.",
        "Jactancia.",
        "Constitución, ejercicio y extinción de servidumbres.",
        "Juicios sobre cobro de honorarios (salvo la opción del art. 697).",
        "Remoción de guardadores y otros que la ley señala.",
      ],
    },
    plazo: "—",
    articulos: "Art. 680 CPC",
    efectos: ["Procede la sustitución del procedimiento a ordinario, o de ordinario a sumario, por motivos fundados (art. 681)."],
    preguntas: ["¿Cuándo procede el juicio sumario?", "¿Qué es la sustitución del procedimiento (art. 681)?"],
  },
  {
    id: "sum_demanda",
    edificio: "sumario",
    orden: 2,
    grupo: "Tramitación",
    nombre: "Demanda",
    icono: "📜",
    resumen: "Se deduce conforme a las reglas generales; puede ser verbal.",
    explicacion:
      "El juicio comienza por demanda escrita (o verbal, art. 682, situación excepcional). Deducida la demanda, el tribunal cita a la audiencia o comparendo.",
    plazo: "—",
    articulos: "Arts. 254 y 682 CPC",
    efectos: ["Provee citando a las partes a la audiencia de contestación."],
    preguntas: ["¿La demanda en el sumario puede ser verbal?"],
  },
  {
    id: "sum_citacion",
    edificio: "sumario",
    orden: 3,
    grupo: "Tramitación",
    nombre: "Citación a la audiencia",
    icono: "📅",
    resumen: "Comparendo al 5° día hábil desde la última notificación.",
    explicacion:
      "Notificada la demanda, el tribunal cita a las partes a una audiencia (comparendo) de contestación y conciliación. Concurre también el defensor público o el ministerio público cuando la ley lo exige.",
    plazo: "Audiencia al 5° día hábil después de la última notificación; aumentado conforme a la tabla de emplazamiento si el demandado está fuera del lugar (art. 683).",
    articulos: "Art. 683 CPC",
    efectos: ["La citación fija la oportunidad única de contestar."],
    preguntas: ["¿A qué plazo se cita a la audiencia en el sumario?"],
  },
  {
    id: "sum_audiencia",
    edificio: "sumario",
    orden: 4,
    grupo: "Tramitación",
    nombre: "Audiencia de contestación y conciliación",
    icono: "🤝",
    resumen: "Se contesta (verbalmente) y se llama a conciliación; rebeldía = acceso provisional.",
    explicacion:
      "En la audiencia el demandado contesta y se llama a conciliación. Si el demandado no comparece, el tribunal puede, a petición del actor y con fundamento plausible, acceder PROVISIONALMENTE a lo pedido en la demanda.",
    plazo: "La audiencia se celebra con las partes que asistan.",
    articulos: "Arts. 683 y 684 CPC",
    efectos: [
      "Acceso provisional (art. 684): poderosa facultad del juez ante la rebeldía del demandado.",
      "El demandado puede pedir, dentro de 5 días, que se deje sin efecto y se reciba a prueba.",
    ],
    preguntas: ["¿Qué facultad tiene el juez si el demandado no comparece (art. 684)?"],
  },
  {
    id: "sum_prueba",
    edificio: "sumario",
    orden: 5,
    grupo: "Tramitación",
    nombre: "Prueba (reglas de los incidentes)",
    icono: "⏳",
    resumen: "Si hay hechos controvertidos, probatorio breve de 8 días.",
    explicacion:
      "Existiendo hechos sustanciales, pertinentes y controvertidos, se recibe la causa a prueba y ésta se rinde con arreglo a las reglas establecidas para los incidentes (probatorio de 8 días).",
    plazo: "Término probatorio de los incidentes: 8 días (art. 90, por reenvío del art. 686).",
    articulos: "Arts. 686 y 90 CPC",
    efectos: ["Vencido el probatorio, el tribunal cita a oír sentencia."],
    preguntas: ["¿Cuánto dura el término probatorio en el sumario?"],
  },
  {
    id: "sum_sentencia",
    edificio: "sumario",
    orden: 6,
    grupo: "Tramitación",
    nombre: "Sentencia definitiva",
    icono: "📕",
    resumen: "Se dicta en breve plazo tras la citación para oír sentencia.",
    explicacion:
      "Vencido el probatorio (o de inmediato si no hubo hechos que probar), el tribunal cita para oír sentencia y la dicta en el breve plazo legal. El sumario carece de réplica y dúplica: por eso es más rápido que el ordinario.",
    plazo: "Citado para oír sentencia, se falla dentro del plazo legal (arts. 687-688).",
    articulos: "Arts. 687 y 688 CPC",
    efectos: ["Notificada produce desasimiento; firme, cosa juzgada."],
    preguntas: ["¿Por qué el sumario es más rápido que el ordinario?"],
  },
  {
    id: "sum_recursos",
    edificio: "sumario",
    orden: 7,
    grupo: "Tramitación",
    nombre: "Recursos",
    icono: "🪶",
    resumen: "Apelación 10 días; régimen especial de efectos (art. 691).",
    explicacion:
      "Contra la sentencia definitiva procede apelación. En el sumario la apelación de la sentencia definitiva y de la resolución que da lugar al procedimiento se concede en ambos efectos, salvo que, concedida así, hayan de eludirse sus resultados.",
    plazo: "Apelación de la sentencia definitiva: 10 días.",
    articulos: "Art. 691 CPC",
    efectos: ["El tribunal de alzada puede pronunciarse sobre todas las cuestiones debatidas (art. 692)."],
    preguntas: ["¿Cómo se concede la apelación en el juicio sumario?"],
  },
];
