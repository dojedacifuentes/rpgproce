import type { EtapaProc } from "@/types/procesal";

// ============================================================================
// EJECUCIÓN / CUMPLIMIENTO INCIDENTAL DE LA SENTENCIA (arts. 231 y ss. CPC).
// Vía más expedita de la acción de cosa juzgada: ante el mismo tribunal que
// dictó el fallo, dentro de un año. Artículos del CPC chileno.
// ============================================================================

export const ETAPAS_INCIDENTAL: EtapaProc[] = [
  {
    id: "inc_presupuesto",
    edificio: "incidental",
    orden: 1,
    grupo: "Cumplimiento incidental",
    nombre: "Presupuesto: acción de cosa juzgada",
    icono: "📕",
    resumen: "Resolución firme (o que cause ejecutoria) + prestación actualmente exigible.",
    explicacion:
      "Es una manifestación de la acción de cosa juzgada: faculta a quien obtuvo un derecho para exigir el cumplimiento forzado de lo resuelto. Requiere una sentencia firme o que cause ejecutoria, que imponga una obligación de dar, hacer o no hacer, actualmente exigible, y a petición de parte (el tribunal no actúa de oficio).",
    requisitos: [
      "Resolución firme o que cause ejecutoria.",
      "Obligación de dar, hacer o no hacer.",
      "Exigibilidad actual (sin condición ni plazo pendiente).",
      "Petición de parte.",
    ],
    articulos: "Arts. 231 y 175-177 CPC",
    efectos: ["Habilita la coercibilidad: hacer cumplir la sentencia con auxilio de la fuerza pública si es necesario."],
    preguntas: ["¿Qué requisitos exige la acción de cosa juzgada?", "¿Actúa el tribunal de oficio?"],
  },
  {
    id: "inc_competencia",
    edificio: "incidental",
    orden: 2,
    grupo: "Cumplimiento incidental",
    nombre: "Competencia",
    icono: "🏛️",
    resumen: "Ante el mismo tribunal que dictó la sentencia en 1ª o única instancia.",
    explicacion:
      "El cumplimiento incidental se pide ante el mismo tribunal que dictó la resolución en primera o única instancia. Es la vía más común y expedita; si se acude a un tribunal distinto, debe seguirse el juicio ejecutivo común.",
    articulos: "Art. 231 CPC",
    efectos: ["La competencia del tribunal que falló habilita la tramitación incidental (no un juicio nuevo)."],
    preguntas: ["¿Ante qué tribunal se pide el cumplimiento incidental?"],
  },
  {
    id: "inc_plazo",
    edificio: "incidental",
    orden: 3,
    grupo: "Cumplimiento incidental",
    nombre: "Plazo: un año",
    icono: "⏳",
    resumen: "Dentro de 1 año desde que la ejecución se hizo exigible.",
    explicacion:
      "La vía incidental procede dentro del plazo de un año contado desde que la ejecución se hizo exigible. Vencido ese año, o si se pide ante tribunal distinto, debe ejecutarse la sentencia mediante el juicio ejecutivo común (la sentencia es título ejecutivo, art. 434 N°1).",
    plazo: "1 año desde que la ejecución se hizo exigible (art. 233).",
    articulos: "Arts. 233 y 237 CPC",
    efectos: ["Vencido el año, la ejecución se persigue por la vía del juicio ejecutivo."],
    preguntas: ["¿Cuál es el plazo del cumplimiento incidental?", "¿Qué ocurre si vence el año?"],
  },
  {
    id: "inc_solicitud",
    edificio: "incidental",
    orden: 4,
    grupo: "Cumplimiento incidental",
    nombre: "Solicitud con citación",
    icono: "🔔",
    resumen: "Se ordena cumplir 'con citación' de la contraparte.",
    explicacion:
      "Presentada la solicitud, el tribunal ordena el cumplimiento de lo resuelto 'con citación' de la parte vencida, quien dispone de un plazo para oponerse antes de que la ejecución se materialice.",
    plazo: "La citación abre un plazo fatal de 3 días para oponerse.",
    articulos: "Art. 233 CPC",
    efectos: ["Notificada la resolución, comienza a correr el plazo de oposición."],
    preguntas: ["¿Qué significa que el cumplimiento se ordene 'con citación'?"],
  },
  {
    id: "inc_oposicion",
    edificio: "incidental",
    orden: 5,
    grupo: "Cumplimiento incidental",
    nombre: "Oposición del vencido",
    icono: "🛡️",
    resumen: "3 días, solo por hechos posteriores y con fundamento escrito.",
    explicacion:
      "El vencido puede oponerse dentro de tercero día, pero solo invocando excepciones tasadas, fundadas en antecedentes escritos y basadas, por regla general, en hechos acaecidos con posterioridad a la sentencia. Es una oposición restringida para no reabrir lo ya juzgado.",
    enumeracion: {
      titulo: "Excepciones del vencido (art. 234)",
      items: [
        "Pago de la deuda.",
        "Remisión.",
        "Concesión de esperas o prórroga del plazo.",
        "Novación.",
        "Compensación.",
        "Transacción.",
        "Haber perdido la sentencia su carácter de exigible.",
        "Pérdida de la cosa debida e imposibilidad absoluta de cumplir la obra debida.",
        "Falta de oportunidad en la ejecución.",
        "(El tercero en contra de quien se pide el cumplimiento: que no le empece la sentencia.)",
      ],
    },
    plazo: "3 días fatales desde la notificación (ampliable a 10 días si reside en otro territorio).",
    articulos: "Art. 234 CPC",
    efectos: ["Las excepciones deben fundarse en antecedentes escritos; de lo contrario se rechazan de plano."],
    preguntas: [
      "¿En qué plazo y por qué causales puede oponerse el vencido?",
      "¿Por qué solo proceden hechos posteriores a la sentencia?",
    ],
  },
  {
    id: "inc_apremios",
    edificio: "incidental",
    orden: 6,
    grupo: "Cumplimiento incidental",
    nombre: "Cumplimiento y apremios",
    icono: "⛓️",
    resumen: "Medidas según la obligación: embargo, fuerza pública, multas o arresto.",
    explicacion:
      "Resuelta la oposición (o no habiéndola), se materializa el cumplimiento con las medidas adecuadas a la naturaleza de la obligación: si es de dinero, embargo y realización como en el ejecutivo; si es de hacer o entregar, auxilio de la fuerza pública; pueden aplicarse multas y arrestos como apremio.",
    articulos: "Art. 235 CPC",
    efectos: ["El tribunal dispone las medidas de apremio idóneas para obtener el cumplimiento."],
    preguntas: ["¿Qué apremios proceden según el tipo de obligación?"],
  },
];
