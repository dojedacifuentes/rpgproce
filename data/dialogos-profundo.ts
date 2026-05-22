// ============================================================================
// DIÁLOGOS PROFUNDOS — Escenas con dificultad real y humor negro
// Expanden narrativa sin destruir dialogos.ts original
// ============================================================================

import type { Opcion, Escena } from "./dialogos";

export const ESCENAS_PROFUNDAS: Record<string, Escena> = {
  // ═══════════════════════════════════════════════════════════
  // MUNDO EJECUTIVO — PROFUNDIZACIÓN
  // ═══════════════════════════════════════════════════════════

  ejecutivo_titulo_analisis: {
    id: "ejecutivo_titulo_analisis",
    titulo: "La Puerta del Distrito Ejecutivo",
    ambientacion:
      "Oficina del Tribunal de Letras, 7 AM. Tienes un documento en la mano. Letra de cambio sin protesto. Pagaré vencido. Sentencia. ¿Cuál es título ejecutivo real?",
    speaker: "TU CONSCIENCIA PROCESAL",
    lineas: [
      "Te presentas con un título ejecutivo. O crees que es.",
      "Art. 434 CPC enumera los títulos. Revisas cada uno.",
      "La obligación debe ser: líquida, actualmente exigible, no prescrita, y la acción debe proceder.",
      "El despacho de ejecución colgará de esto. Todo depende de que hayas elegido bien.",
      "La pregunta no es 'qué papel traes'. La pregunta es: ¿Satisface TODAS las condiciones?",
    ],
    articulo: { n: "434-438 CPC", t: "Requisitos del título ejecutivo y de la obligación para despachar ejecución." },
    opciones: [
      {
        texto:
          "[RIGOR] Este pagaré fue protestado hace 4 años. Art. 2515 CC: 3 años. La acción ejecutiva prescribió. El tribunal examinará de oficio (art. 442). Presentarlo es confesar que no leíste los plazos.",
        efectos: {
          flags: ["ejecutivo_prescripcion_detected"],
          atributos: { rigor_formal: 2, conocimiento_procesal: 1 },
          trauma: -5,
          log: "Detectaste prescripción. El tribunal habría rechazado de oficio. Evitaste humillación.",
        },
      },
      {
        texto:
          "[PARCIALMENTE CORRECTO] Sí es título ejecutivo (pagaré protestado), pero necesito verificar si es actualmente exigible y si hay plazo pendiente. Una letra de cambio sigue siendo ejecutiva aunque esté vencida, mientras no haya prescrito.",
        efectos: {
          atributos: { conocimiento_procesal: 1 },
          log: "Reconociste el título pero no revisaste el plazo. Procedimiento incompleto.",
        },
      },
      {
        texto:
          "[DOCTRINALMENTE SEDUCTORA] Art. 434 N°4: la letra de cambio es siempre título ejecutivo si fue protestada o notificada judicialmente. La prescripción es defensa del ejecutado, no obstáculo al despacho.",
        efectos: {
          trauma: 10,
          log: "Confundiste que la prescripción es causal posterior, no impedimento previo. Error frecuente de abogados precipitados.",
        },
      },
      {
        texto:
          "[ARRIESGADO] El pagaré es ejecutivo. El ejecutado puede oponer prescripción después. Despachemos ejecución y dejemos que se defienda.",
        efectos: {
          reputacion: -5,
          trauma: 15,
          log: "Te expusiste a que rechacen la demanda ejecutiva por prescripción evidente. El tribunal castigará tu desorden.",
        },
      },
      {
        texto:
          "[HUMOR NEGRO] La prescripción es como un demonio invisible que mata demandas. Yo no voy a despertar a ese demonio en la audiencia. Mejor me voy a la cafetería.",
        efectos: {
          atributos: { resistencia_psicologica: 1 },
          log: "A veces la prudencia es parte de la estrategia.",
        },
      },
    ],
  },

  ejecutivo_excepciones_defensa: {
    id: "ejecutivo_excepciones_defensa",
    titulo: "El Ejecutado Opone Excepciones (Escena crítica)",
    ambientacion:
      "Escritorio del ejecutado. Ha redactado un escrito de 8 páginas. Opone 5 excepciones simultáneamente. Art. 464 CPC. Tú eres el ejecutante. ¿Cuál es la estrategia?",
    speaker: "EL EJECUTADO (vía su abogado)",
    lineas: [
      "Señor Ejecutante: Opongo las excepciones del art. 464 CPC.",
      "Primero: incompetencia del tribunal (N°1).",
      "Segundo: falsedad del título (N°8).",
      "Tercero: exceción de pago (N°9) — documento de pago adjunto.",
      "Cuarto: prescripción (N°17) — la acción tiene 4 años, 2 meses.",
      "Quinto: cosa juzgada (N°9) — existe sentencia anterior sobre lo mismo.",
      "¿Qué haces?",
    ],
    articulo: { n: "464-466 CPC", t: "Excepciones ejecutivas tasadas. Procedimiento de oposición." },
    opciones: [
      {
        texto:
          "[ANÁLISIS PRECISO] Incompetencia y falsedad son perentorias. Pago, prescripción y cosa juzgada son perentorias. Se tramitan TODAS en cuaderno de oposición como juicio ordinario. Art. 466 CPC. El embargo NO se suspende. El remate puede suspenderse si el ejecutado da caución. Preparo contrademanda sobre los hechos controvertidos.",
        efectos: {
          flags: ["ejecutivo_manejo_excepciones"],
          atributos: { conocimiento_procesal: 2, estrategia: 2 },
          reputacion: 10,
          log: "Distinguiste perentorias y dilatorias. El procedimiento es biforme: autos sobre forma + ordinario sobre fondo. Controlaste la partida.",
        },
      },
      {
        texto:
          "[INCOMPLETO] Todas son excepciones. Se tramitan como juicio ordinario. Espero el resultado.",
        efectos: {
          atributos: { conocimiento_procesal: 1 },
          log: "Reconociste que son excepciones pero no planificaste defensa probatoria.",
        },
      },
      {
        texto:
          "[DOCTRINAL PERO ERRADO] Art. 464: las excepciones son tasadas (taxativas). El tribunal las examinará. Si prospera UNA, se paraliza todo. Debo probar todas mis afirmaciones.",
        efectos: {
          atributos: { conocimiento_procesal: 0 },
          trauma: 10,
          log: "Confundiste que SI prospera una excepción perentoria, el ejecutado gana esa parte del juicio, no se paraliza TODO. Necesitas victoria probatoria.",
        },
      },
      {
        texto:
          "[ARRIESGADO] Ataco inmediatamente con prueba testimonial sobre la autenticidad del pagaré. Si logro que los testigos nieguen la firma, gano.",
        efectos: {
          trauma: 20,
          reputacion: -10,
          log: "Olvidaste que primero se tramita la oposición. Las pruebas vienen después si el tribunal lo ordena. Estás saltando etapas.",
        },
      },
      {
        texto:
          "[HUMOR NEGRO] El ejecutado opuso 5 excepciones. Yo opongo 6: mala fe, abuso de derecho, falta de fe pública, error doctrinal, y la más grave: que la Corte no me entienda.",
        efectos: {
          atributos: { resistencia_psicologica: 1 },
          log: "La resignación también es una defensa.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MUNDO RECURSOS — DILEMA CRÍTICO
  // ═══════════════════════════════════════════════════════════

  recursos_que_recurrir: {
    id: "recursos_que_recurrir",
    titulo: "La Sentencia Está Aquí. ¿Cuál es tu Recurso?",
    ambientacion:
      "Tomaste notificación de la sentencia de primer grado. Te perdieron. El tribunal dijo que fallaban a favor del demandado. Tienes 15 días. ¿Qué haces?",
    speaker: "EL RELOJ",
    lineas: [
      "15 días.",
      "Puedes apelar (efecto devolutivo, nueva revisión).",
      "Puedes gestionar un incidente de nulidad (si hay vicio procesal grave).",
      "Puedes aguantar (cosa juzgada se produce en 30 días desde notificación).",
      "¿Qué haces?",
    ],
    articulo: { n: "186-330 CPC", t: "Apelación. Plazo, procedencia, efectos." },
    opciones: [
      {
        texto:
          "[CORRECTO] Apelo porque el tribunal se equivocó en la apreciación de la prueba testimonial (hechos sustanciales controvertidos). Efecto devolutivo: la Corte de Apelaciones revisa hechos y derecho. Art. 327 CPC. Si pierdo la apelación, tengo 15 días más para casación en la forma si hay vicio procesal.",
        efectos: {
          flags: ["recurso_apelacion_interpuesto"],
          atributos: { estrategia: 2, conocimiento_procesal: 2 },
          reputacion: 5,
          log: "Apelaste dentro del plazo. Preservaste revisión en segunda instancia.",
        },
      },
      {
        texto:
          "[INCOMPLETO] Apelo porque la sentencia es injusta. Espero que la Corte la revise.",
        efectos: {
          atributos: { conocimiento_procesal: 1 },
          log: "Apelaste, pero sin estrategia específica. Veremos si la Corte te sigue.",
        },
      },
      {
        texto:
          "[DOCTRINALMENTE SEDUCTORA] Art. 768 CPC: casación en la forma por omisión de art. 170 (requisitos de sentencia). Debo atacar los vicios formales del tribunal.",
        efectos: {
          trauma: 15,
          atributos: { conocimiento_procesal: -1 },
          log: "Confundiste plazos. Casación EN LA FORMA se interpone ante Corte Suprema, no ante Corte de Apelaciones. Y requiere PREPARACIÓN previa en el juicio. No lo hiciste. Tu casación morirá inadmitida.",
        },
      },
      {
        texto:
          "[ARRIESGADO] No hago nada. Dejo que la cosa juzgada se forme. Total, puedo pedir revisión después.",
        efectos: {
          trauma: 30,
          reputacion: -15,
          log: "Olvidaste que la revisión (art. 810 CPC) tiene causales muy restrictivas. No procede para errores de apreciación. Te entregaste.",
        },
      },
      {
        texto:
          "[HUMOR NEGRO] Apelo para que mis hijos sepan que al menos intenté algo. La Corte probablemente confirmará. Pero la ilusión es gratis.",
        efectos: {
          atributos: { resistencia_psicologica: 1 },
          reputacion: 3,
          log: "A veces la apelación es un acto de fe, no de razón.",
        },
      },
    ],
  },

  recursos_casacion_dilema: {
    id: "recursos_casacion_dilema",
    titulo: "Casación: La Puerta Angosta",
    ambientacion:
      "La Corte de Apelaciones confirmó la sentencia. Ahora tienes 15 días para interponer casación en la forma o casación en el fondo ante la Corte Suprema. ¿Cuál?",
    speaker: "EL MINISTRO CASACIONAL (imaginario)",
    lineas: [
      "Casación en la forma (art. 768): vicios procesales esenciales. Emplazamiento, trámites, incompetencia.",
      "Casación en el fondo (art. 767): infracción de ley que haya influido sustancialmente en lo dispositivo.",
      "¿Cuál procede?",
      "(Nota: solo una. Si te equivocas, muere todo.)",
    ],
    articulo: { n: "767-786 CPC", t: "Casación en el fondo. Requisitos, causales, efectos." },
    opciones: [
      {
        texto:
          "[PRECISO] Casación en la forma si el tribunal fue incompetente o si no fue emplazado debidamente (art. 38 CPC + 768 N°1, N°9). Casación en el fondo si el tribunal violó artículos de fondo (obligaciones, responsabilidad, etc.) que influyeron en el resultado. Art. 772 CPC exige que identifique CAUSAL + PERJUICIO + INFLUENCIA SUSTANCIAL.",
        efectos: {
          flags: ["casacion_dominada"],
          atributos: { rigor_formal: 2, conocimiento_procesal: 2 },
          reputacion: 10,
          log: "Distinguiste forma (vicios procesales) de fondo (errores jurídicos). Controlaste la línea.",
        },
      },
      {
        texto:
          "[INCOMPLETO] Casación porque el tribunal se equivocó. Hay vicios procesales.",
        efectos: {
          atributos: { conocimiento_procesal: 1 },
          log: "Vago. El tribunal rechazará como inadmisible por falta de especificidad.",
        },
      },
      {
        texto:
          "[SEDUCTORA PERO FALSA] Casación en el fondo. El tribunal violó el art. 1545 CC (consensualismo). La obligación contractual fue mal apreciada.",
        efectos: {
          trauma: 20,
          log: "Correcto que el tribunal violó art. 1545. PERO: ¿Influyó sustancialmente? ¿Cuál fue la influencia específica en la sentencia? Sin eso, la Corte Suprema rechaza como infundada.",
        },
      },
      {
        texto:
          "[ARRIESGADO] Interpongo AMBAS simultáneamente. Casación en la forma + fondo. Cubrir todas las bases.",
        efectos: {
          trauma: 25,
          reputacion: -10,
          log: "Las casaciones son recursos distintos. Deben ir por separado ante Corte Suprema. Mezclarlas es solicitar que todas mueran juntas.",
        },
      },
      {
        texto:
          "[HUMOR NEGRO] Casación en la forma porque me sentía formalmente rechazado. Casación en el fondo porque el tribunal tiene fondo de mala fe.",
        efectos: {
          atributos: { resistencia_psicologica: 1 },
          log: "La Corte no castiga emociones. Solo vicios técnicos.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MUNDO NULIDAD — TRAMPA DOCTRINAL
  // ═══════════════════════════════════════════════════════════

  nulidad_trampa_art83: {
    id: "nulidad_trampa_art83",
    titulo: "Tramp Procesal: Art. 83 CPC",
    ambientacion:
      "El demandado cometió un vicio procesal grave: se olvidó de notificar una prueba conforme a plazo. Fue notificado mal. ¿Puedes pedir nulidad por esto?",
    speaker: "LA VOZ DEL CPC",
    lineas: [
      "Art. 83: 'No hay nulidad sin texto expreso que la establezca ni sin que el vicio cause perjuicio.'",
      "Además: 'La parte que ha dado lugar al vicio o ha concurrido en él no podrá solicitar la nulidad fundándose en dicho vicio.'",
      "¿Procede tu nulidad si TÚ MISMO olvidaste notificar conforme a forma?",
    ],
    articulo: { n: "83 CPC", t: "Principios de nulidad: especificidad, trascendencia, no se convalida con silencio." },
    opciones: [
      {
        texto:
          "[CORRECTO] No procede. Art. 83 inc. 3°: 'la parte que ha originado el vicio no puede pedir la nulidad fundándose en dicho vicio'. Yo cometí el error. Convalidé el vicio al no reclamar oportunamente. La nulidad murió.",
        efectos: {
          flags: ["nulidad_principios_dominados"],
          atributos: { rigor_formal: 2 },
          trauma: -10,
          log: "Evitaste la trampa. Aprendiste que nadie se beneficia de su propio error.",
        },
      },
      {
        texto:
          "[INCOMPLETO] No procede porque no hay texto expreso. El CPC no enumera este vicio específicamente.",
        efectos: {
          atributos: { conocimiento_procesal: 1 },
          log: "Reconociste un principio pero no el más importante.",
        },
      },
      {
        texto:
          "[SEDUCTORA] Sí procede. El vicio causa perjuicio (se perdió prueba). Art. 83 exige perjuicio reparable, y esto lo es. La nulidad protege el proceso.",
        efectos: {
          trauma: 15,
          log: "Confundiste que AUNQUE haya perjuicio, no puedes beneficiarte de tu propio vicio. El principio de actos propios lo impide.",
        },
      },
      {
        texto:
          "[ARRIESGADO] Presento incidente de nulidad por mala notificación de prueba. Si gano, puedo reasumir la prueba.",
        efectos: {
          trauma: 20,
          reputacion: -5,
          log: "El tribunal rechazará tu incidente porque tú causaste el vicio. Estarás pidiendo que se corrija un error que TÚ cometiste.",
        },
      },
      {
        texto:
          "[HUMOR NEGRO] La nulidad es para otros. Yo me auto-castigo con silencio y lloro internamente.",
        efectos: {
          atributos: { resistencia_psicologica: 1 },
          log: "A veces aceptar la derrota es más digno.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MUNDO PRUEBA — CARGAS Y PRESUNCIONES
  // ═══════════════════════════════════════════════════════════

  prueba_carga: {
    id: "prueba_carga",
    titulo: "¿Quién Prueba Qué?",
    ambientacion:
      "Juicio ordinario de cobro de deuda. El demandante dice que prestó $500.000. El demandado niega haber recibido nada. ¿Quién debe probar qué?",
    speaker: "EL JUEZ",
    lineas: [
      "Art. 1698 CC: 'El que alega una obligación debe probarla.'",
      "¿Quién es el que alega la obligación aquí?",
      "¿El demandante debe probar que prestó? ¿O el demandado debe probar que no recibió?",
      "Cuidado: 'hechos negativos no se prueban'. Pero hay excepciones.",
    ],
    articulo: { n: "1698 CC / 341 CPC", t: "Carga probatoria. Distribución según la pretensión." },
    opciones: [
      {
        texto:
          "[CORRECTO] El demandante alega la obligación (el préstamo). Debe probar: que el dinero existió, que fue entregado, que lo recibió el demandado. El demandado puede oponer defensa (pago, prescripción). Art. 1698 CC. El 'no recibí' es hecho negativo indefinido: no se prueba.",
        efectos: {
          flags: ["prueba_carga_dominada"],
          atributos: { conocimiento_procesal: 2 },
          log: "Dominaste la distribución de carga. El demandante carga el peso.",
        },
      },
      {
        texto:
          "[INCOMPLETO] El demandante prueba el préstamo. El demandado puede no hacer nada.",
        efectos: {
          atributos: { conocimiento_procesal: 1 },
          log: "Reconociste la carga principal pero no los mecanismos de defensa.",
        },
      },
      {
        texto:
          "[SEDUCTORA] Ambos deben probar. El demandante prueba que prestó, el demandado prueba que no recibió. Equilibrio.",
        efectos: {
          trauma: 15,
          log: "Confundiste equilibrio formal con carga real. Los hechos negativos indefinidos NO se prueban (CPC 341). El demandado puede simplemente negar.",
        },
      },
      {
        texto:
          "[ARRIESGADO] El demandado debe probar que pagó o que no recibió el dinero. Carga invertida.",
        efectos: {
          trauma: 20,
          reputacion: -10,
          log: "Invertiste la carga sin fundamento. Solo en responsabilidad contractual (art. 1547 CC) se presume culpa del deudor.",
        },
      },
      {
        texto:
          "[HUMOR NEGRO] Ambos mienten. El tribunal elige quién miente menos. Eso es carga probatoria en la práctica.",
        efectos: {
          atributos: { resistencia_psicologica: 1 },
          log: "No es falso.",
        },
      },
    ],
  },
};
