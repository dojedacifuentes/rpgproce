import type { Boss } from "@/types/expansion";

// ============================================================================
// BOSSES EXTRA — expansión v3.2
// ============================================================================

export const BOSSES_EXTRA: Boss[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 7. JUEZA SUPLENTE DISOCIADA — Puentes Procesal/Civil/Constitucional
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "jueza_suplente_disociada" as any,
    nombre: "Jueza Suplente Disociada",
    arquetipo: "Tres semanas reemplazando. Conoce el rol pero olvida los nombres. Dicta sentencias en estado de duermevela jurídica.",
    descripcion: "Te observa sin mirarte. Murmura citas de la CPR mientras hojea el expediente al revés. «Recuérdeme cuál era la pretensión, abogado. Y de paso, la regla del 1700.»",
    ambientacion: "Sala 3 del Juzgado, tarde de viernes. Un termo, un perro callejero entró y nadie lo echa. La luz amarilla cruje.",
    saludInicial: 95,
    saludJugador: 75,
    rama: "discusion",
    derrotadoOtorga: "Logro: Puentes triple (Procesal/Civil/CPR). +1 a estrategia permanente.",
    ataques: [
      {
        pregunta: "¿Qué relación hay entre el debido proceso del 19 N°3 CPR y la nulidad procesal del 768?",
        tipo: "puente",
        opciones: [
          { texto: "El 19 N°3 inc. 6° (procedimiento e investigación racionales y justos) es la base constitucional del 768 N°9 (omisión de trámites esenciales).", correcta: true, explicacion: "Conexión fundamental: la garantía del debido proceso se operativiza procesalmente vía nulidad por defectos esenciales.", art: "Art. 19 N°3 CPR + 768 N°9 CPC" },
          { texto: "No hay relación, son ramas independientes.", correcta: false, explicacion: "Falso: el control constitucional del proceso opera principalmente por casación en la forma.", art: "—" },
          { texto: "El 19 N°3 reemplaza al 768.", correcta: false, explicacion: "El 768 es de rango legal y desarrolla la garantía constitucional, no la reemplaza.", art: "Art. 19 N°3 CPR" },
        ],
        articuloEsperado: "19 N°3 CPR",
        damage: 22,
        cadenaSi_acierta: "puente_civ",
      },
      {
        pregunta: "puente_civ: La cosa juzgada del 175 CPC, ¿produce efecto erga omnes o inter partes?",
        tipo: "trampa",
        opciones: [
          { texto: "Inter partes como regla general (3 inc. 2° CC). Excepción: estado civil y otras señaladas por ley (erga omnes).", correcta: true, explicacion: "Regla del efecto relativo: art. 3 inc. 2° CC. Excepciones legales: sentencias de estado civil (315 ss. CC), nulidad de matrimonio, etc.", art: "Art. 3 inc. 2° CC + 175 CPC" },
          { texto: "Siempre erga omnes.", correcta: false, explicacion: "Falso: regla general inter partes.", art: "Art. 3 CC" },
          { texto: "Inter partes sin excepciones.", correcta: false, explicacion: "Falso: hay excepciones legales taxativas.", art: "Doctrina" },
        ],
        articuloEsperado: "3 CC + 175 CPC",
        damage: 25,
        cadenaSi_acierta: "puente_proc",
      },
      {
        pregunta: "puente_proc: Una sentencia interlocutoria firme que niega medida precautoria. ¿Cosa juzgada formal o material?",
        tipo: "derivacion",
        opciones: [
          { texto: "Formal: producida la modificación de circunstancias, puede pedirse nuevamente. No produce cosa juzgada material.", correcta: true, explicacion: "Las cautelares se rigen por el principio rebus sic stantibus. Sus negativas producen solo cosa juzgada formal.", art: "Doctrina + 301 CPC" },
          { texto: "Material plena: jamás podrá pedirse de nuevo.", correcta: false, explicacion: "Falso: si cambian circunstancias o aparecen nuevos antecedentes, procede.", art: "Art. 301 CPC" },
        ],
        articuloEsperado: "301 CPC",
        damage: 23,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. FUNCIONARIO DE NOTIFICACIONES QUEMADO — Notificaciones imposibles
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "funcionario_quemado" as any,
    nombre: "Funcionario de Notificaciones Quemado",
    arquetipo: "Trece años despachando cédulas. Conoce todas las calles donde nadie atiende. Tiene un cuaderno con frases ya memorizadas: 'busqué dos días, no fue habido, dejé cédula con persona adulta'.",
    descripcion: "Habla rápido y sin paréntesis. «Si tu domicilio falla, todo tu juicio es papel mojado. Y los receptores tampoco hacen milagros. Vamos al 44.»",
    ambientacion: "Pasillo posterior del 2° Juzgado Civil, 8:47 a.m. Olor a fotocopias. Un perchero con tres impermeables idénticos.",
    saludInicial: 80,
    saludJugador: 72,
    rama: "notificaciones",
    derrotadoOtorga: "Logro: Notificaciones blindadas. Inmunidad al 768 N°9 por una partida.",
    ataques: [
      {
        pregunta: "El demandado vive en un edificio sin portero, no abre la puerta. El receptor lo busca lunes y miércoles, no es habido. ¿Procede 44 si dejó cédula con vecino?",
        tipo: "trampa",
        opciones: [
          { texto: "No directamente: 44 exige que la entrega sea a persona ADULTA del lugar o, si no la hay, fijación de cédula en puerta + envío de carta certificada por secretario.", correcta: true, explicacion: "Art. 44 inc. 2°: 'cualquiera persona adulta que se encuentre allí'. Si no hay nadie, fijar cédula + carta certificada del secretario al notificado.", art: "Art. 44 inc. 2° y final CPC" },
          { texto: "Sí, basta vecino del edificio aunque viva en otro piso.", correcta: false, explicacion: "Falso: el vecino debe estar EN EL LUGAR (la propia morada).", art: "Art. 44 inc. 2° CPC" },
          { texto: "No: hay que pedir avisos por art. 54.", correcta: false, explicacion: "El 54 procede cuando es difícil determinar el domicilio o son muchas personas. Aquí el domicilio se conoce.", art: "Art. 54 CPC" },
        ],
        articuloEsperado: "44",
        damage: 18,
        cadenaSi_acierta: "notif_2",
      },
      {
        pregunta: "notif_2: ¿En qué momento se entiende practicada la notificación del 44 inc. 2° cuando hay fijación + carta certificada del secretario?",
        tipo: "trampa",
        opciones: [
          { texto: "En la fecha de la fijación de la cédula. La carta certificada es solo aviso complementario; no traslada la fecha.", correcta: true, explicacion: "Doctrina mayoritaria y CS: la notificación se entiende practicada al momento de la fijación; la carta cumple función de información, no de notificación.", art: "Art. 44 inc. final CPC + jurisprudencia CS" },
          { texto: "Cuando el correo entrega la carta certificada.", correcta: false, explicacion: "Confunde notificación con aviso. La carta es complementaria.", art: "—" },
          { texto: "A los 3 días desde el envío de la carta.", correcta: false, explicacion: "No existe ese plazo en el 44; sí en el 46 (estado).", art: "—" },
        ],
        articuloEsperado: "44",
        damage: 22,
        cadenaSi_acierta: "notif_3",
      },
      {
        pregunta: "notif_3: Notificación por avisos (54). ¿Cuántos avisos y dónde?",
        tipo: "directa",
        opciones: [
          { texto: "Tres avisos en un diario; el primero en el Diario Oficial el día 1 o 15 del mes; en lugares cuyos habitantes desconocen al notificado o son difíciles de determinar.", correcta: true, explicacion: "Art. 54 inc. 2° CPC: tres veces en diario; cuando proceda inserción en Diario Oficial: día 1° o 15 (o día siguiente hábil).", art: "Art. 54 CPC" },
          { texto: "Un solo aviso en cualquier diario.", correcta: false, explicacion: "Insuficiente: tres avisos.", art: "Art. 54 CPC" },
          { texto: "Tres avisos en cualquier sitio web del Poder Judicial.", correcta: false, explicacion: "No: la ley exige diario impreso (y Diario Oficial en su caso).", art: "Art. 54 CPC" },
        ],
        articuloEsperado: "54",
        damage: 16,
      },
      {
        pregunta: "El secretario certifica que el demandado 'no compareció dentro del plazo'. ¿Esta certificación vale como notificación?",
        tipo: "trampa",
        opciones: [
          { texto: "No. Es solo certificación del estado del expediente. La rebeldía se acusa y proveerá el tribunal.", correcta: true, explicacion: "La certificación del secretario es ministerial; no es notificación. Para acusar rebeldía hay que solicitarla expresamente o el tribunal proveerla de oficio (art. 64 inc. final).", art: "Arts. 33 + 64 CPC" },
          { texto: "Sí, equivale a notificación tácita del 55.", correcta: false, explicacion: "Confusión grave. La tácita requiere gestión de la parte, no certificación del ministro de fe.", art: "Art. 55 CPC" },
        ],
        articuloEsperado: "33",
        damage: 20,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. MAESTRO DEL JUICIO SUMARIO — Procedimientos especiales
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "maestro_sumario" as any,
    nombre: "Maestro del Juicio Sumario",
    arquetipo: "Profesor titular emérito que jura que el sumario del 680 «es el procedimiento más malentendido de Chile». Te lo dice con seis dedos levantados.",
    descripcion: "Saca un anillado de 1997 lleno de marcadores. «Veinte años corrigiendo el mismo error. ¿Va a sumar uno hoy?»",
    ambientacion: "Sala de cátedra de procesal a las 19:30. Un proyector apagado proyecta polvo. Una foto de Hugo Pereira lo mira.",
    saludInicial: 90,
    saludJugador: 70,
    rama: "discusion",
    derrotadoOtorga: "Logro: Juicio Sumario dominado. Acceso a casos sumarios complejos.",
    ataques: [
      {
        pregunta: "¿En qué materias procede el juicio sumario del 680 CPC?",
        tipo: "directa",
        opciones: [
          { texto: "Cuando la acción deducida REQUIERA por su naturaleza tramitación rápida, además de los casos enumerados en el inc. 2° (interdictos, depósito, etc.).",
            correcta: true, explicacion: "Art. 680 inc. 1°: regla general por naturaleza + lista taxativa del inc. 2° (10 numerales: interdictos posesorios, comodato precario, juicios sobre cobro de honorarios, etc.).", art: "Art. 680 CPC" },
          { texto: "Solo en los casos del inc. 2°: la enumeración es taxativa.",
            correcta: false, explicacion: "Falso: el inc. 1° contempla la cláusula abierta de tramitación rápida por naturaleza, además de la lista del inc. 2°.", art: "Art. 680 inc. 1° CPC" },
          { texto: "En cualquier juicio si las partes acuerdan.",
            correcta: false, explicacion: "No: la procedencia del sumario es legal, no convencional.", art: "Art. 680 CPC" },
        ],
        articuloEsperado: "680",
        damage: 18,
        cadenaSi_acierta: "sum_2",
      },
      {
        pregunta: "sum_2: ¿Puede el tribunal disponer que el sumario se sustancie por las reglas del ordinario? (sustitución de procedimiento)",
        tipo: "trampa",
        opciones: [
          { texto: "Sí, cuando aparezcan motivos fundados (art. 681 inc. 1°). También la inversa: cambiar ordinario a sumario si la acción merece tramitación rápida.",
            correcta: true, explicacion: "Art. 681: el procedimiento puede sustituirse en una u otra dirección con motivo fundado. Se tramita como incidente.", art: "Art. 681 CPC" },
          { texto: "No: la elección procesal es inalterable.",
            correcta: false, explicacion: "Falso: el 681 permite la sustitución.", art: "Art. 681 CPC" },
          { texto: "Solo de sumario a ordinario, no al revés.",
            correcta: false, explicacion: "Falso: el 681 permite ambas direcciones.", art: "Art. 681 CPC" },
        ],
        articuloEsperado: "681",
        damage: 22,
        cadenaSi_acierta: "sum_3",
      },
      {
        pregunta: "sum_3: Audiencia de contestación + conciliación + prueba del 683. ¿Qué pasa si el demandado no comparece?",
        tipo: "directa",
        opciones: [
          { texto: "El tribunal recibe la causa a prueba o accede provisionalmente a lo pedido por el actor (art. 684).",
            correcta: true, explicacion: "Art. 684: en rebeldía del demandado, dos alternativas a juicio del tribunal: recibir prueba o conceder provisionalmente lo pedido (el demandado tendrá 5 días para oponerse al provisional).", art: "Art. 684 CPC" },
          { texto: "Se dicta sentencia automática condenatoria.",
            correcta: false, explicacion: "No existe condena automática: el tribunal evalúa.", art: "Art. 684 CPC" },
          { texto: "Se suspende hasta nueva citación.",
            correcta: false, explicacion: "Falso: el sumario prioriza celeridad.", art: "Art. 684 CPC" },
        ],
        articuloEsperado: "684",
        damage: 20,
      },
    ],
  },
];
