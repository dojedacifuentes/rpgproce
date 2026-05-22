// ============================================================================
// VERDADERO / FALSO — banco de preguntas tramposas
// Aquí la respuesta NO siempre es lo intuitivo. Muchas son falsas porque la
// regla tiene excepción, o porque el artículo dice lo contrario de lo común.
// Sarcasmo y humor negro táctico.
// ============================================================================

export type PreguntaVoF = {
  enunciado: string;
  respuesta: boolean;          // true = es VERDADERO; false = es FALSO
  explicacion: string;          // por qué — citando artículo
  art: string;
  zona: "competencia" | "recursos" | "nulidad" | "ejecutivo" | "prueba" | "oralidad" | "cautelares" | "cosajuzgada" | "notificaciones" | "incidentes";
  dificultad: 1 | 2 | 3;        // 1 fácil, 3 trampa fina
};

export const BANCO_VOF: PreguntaVoF[] = [
  // ─────────────── COMPETENCIA (con trampas) ───────────────
  { enunciado: "La competencia absoluta SIEMPRE puede prorrogarse por acuerdo expreso de las partes.",
    respuesta: false, explicacion: "FALSO. Solo la competencia RELATIVA es prorrogable (arts. 181-187 COT). La absoluta —materia, fuero y cuantía— es de orden público y no admite prórroga.", art: "Arts. 181-182 COT", zona: "competencia", dificultad: 1 },

  { enunciado: "La incompetencia relativa puede declararse de oficio por el tribunal en cualquier estado del juicio.",
    respuesta: false, explicacion: "FALSO. La incompetencia RELATIVA solo se alega a petición de parte mediante declinatoria o inhibitoria (101-112 CPC). La de oficio es exclusiva de la incompetencia ABSOLUTA.", art: "Art. 84 inc. final, 101-112 CPC", zona: "competencia", dificultad: 2 },

  { enunciado: "El art. 134 COT establece como regla general el domicilio del DEMANDANTE.",
    respuesta: false, explicacion: "FALSO con sarcasmo. Es el domicilio del DEMANDADO. La regla protege al que es atacado, no al que ataca. Confundir esto es el clásico tropezón del primer parcial.", art: "Art. 134 COT", zona: "competencia", dificultad: 1 },

  { enunciado: "Si hay varios demandados con domicilios en distintos territorios, el demandante puede elegir cualquiera de ellos.",
    respuesta: true, explicacion: "VERDADERO. Art. 141 COT permite acumular en uno cualquiera. Es la única vez que el actor parece tener poder.", art: "Art. 141 COT", zona: "competencia", dificultad: 2 },

  { enunciado: "La inhibitoria se interpone ante el tribunal que se cree INCOMPETENTE.",
    respuesta: false, explicacion: "FALSO. La inhibitoria se interpone ante el tribunal que se cree COMPETENTE para que requiera al otro (art. 102 CPC). La declinatoria es la que se presenta ante el incompetente. Trampa clásica.", art: "Arts. 102, 111 CPC", zona: "competencia", dificultad: 2 },

  // ─────────────── NOTIFICACIONES ───────────────
  { enunciado: "La notificación por estado diario es la regla general para la primera notificación al demandado.",
    respuesta: false, explicacion: "FALSO. La regla general para la PRIMERA notificación al demandado es PERSONAL (art. 40 CPC). El estado diario (art. 50) es supletorio para resoluciones posteriores.", art: "Arts. 40 y 50 CPC", zona: "notificaciones", dificultad: 1 },

  { enunciado: "Para practicar la notificación personal subsidiaria del art. 44 basta con buscar al notificado UN día.",
    respuesta: false, explicacion: "FALSO. Se requieren búsquedas en DOS días distintos sin ser habido, además de acreditar morada y que está en el lugar del juicio. Sin esto, la notificación es nula y arrastra el 768 N°9.", art: "Art. 44 CPC", zona: "notificaciones", dificultad: 2 },

  { enunciado: "La notificación tácita del art. 55 inc. 2° opera por la sola presentación de cualquier escrito que suponga conocimiento.",
    respuesta: true, explicacion: "VERDADERO. La parte que hace gestión que suponga conocimiento queda notificada. Pero ojo: el inc. 3° contempla la NOTIFICACIÓN PRESUNTA por reclamo de nulidad declarado mal practicado.", art: "Art. 55 CPC", zona: "notificaciones", dificultad: 2 },

  { enunciado: "La cédula y el estado diario son la misma forma de notificación.",
    respuesta: false, explicacion: "FALSO. La cédula (48) implica entrega física de copia íntegra; el estado diario (50) es un listado fijado en la oficina del secretario. Confundirlos es defecto formal grave.", art: "Arts. 48, 50 CPC", zona: "notificaciones", dificultad: 1 },

  // ─────────────── EMPLAZAMIENTO Y PLAZOS ───────────────
  { enunciado: "El plazo para contestar la demanda es de 18 días aunque el demandado esté en el mismo lugar del tribunal.",
    respuesta: false, explicacion: "FALSO. El art. 258 da 15 días si está en el mismo lugar; 18 si está dentro del territorio jurisdiccional pero fuera del lugar; +tabla del 259 si está fuera del territorio.", art: "Arts. 258-259 CPC", zona: "notificaciones", dificultad: 2 },

  { enunciado: "Los plazos del CPC son siempre fatales.",
    respuesta: false, explicacion: "FALSO (sarcasmo: te lo dice todo el mundo y es trampa). Art. 64: son fatales SALVO los establecidos para actuaciones del tribunal. Los plazos del juez NO son fatales para él.", art: "Art. 64 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "Si vence el plazo para contestar, el tribunal debe declarar la rebeldía a petición de parte o de oficio.",
    respuesta: true, explicacion: "VERDADERO. El art. 64 inc. final permite proveer de oficio al término del plazo fatal. Pero en la práctica forense se suele acusar a petición.", art: "Art. 64, 78 CPC", zona: "incidentes", dificultad: 2 },

  // ─────────────── EXCEPCIONES ───────────────
  { enunciado: "La excepción de PRESCRIPCIÓN es una excepción DILATORIA.",
    respuesta: false, explicacion: "FALSO. La prescripción es perentoria anómala (art. 310 CPC). Puede oponerse en cualquier estado hasta antes de la citación a oír sentencia en 1ª y antes de la vista en 2ª.", art: "Art. 310 CPC", zona: "incidentes", dificultad: 2 },

  { enunciado: "Las excepciones dilatorias deben oponerse TODAS en un mismo escrito antes de contestar.",
    respuesta: true, explicacion: "VERDADERO. Art. 305: todas en un mismo escrito y antes de contestar; las no opuestas se entienden renunciadas.", art: "Art. 305 CPC", zona: "incidentes", dificultad: 1 },

  { enunciado: "El beneficio de excusión es una excepción perentoria.",
    respuesta: false, explicacion: "FALSO con humor: parece de fondo pero el 303 N°5 la clasifica como DILATORIA. Tiene que ver con el orden, no con el mérito.", art: "Art. 303 N°5 CPC", zona: "incidentes", dificultad: 3 },

  // ─────────────── RESOLUCIONES ───────────────
  { enunciado: "Una resolución que falla un incidente del juicio estableciendo derechos permanentes es una INTERLOCUTORIA de primer grado.",
    respuesta: true, explicacion: "VERDADERO. Art. 158 inc. 2° primera parte. Si no establece derechos permanentes, es AUTO (inc. 3°).", art: "Art. 158 CPC", zona: "cosajuzgada", dificultad: 1 },

  { enunciado: "El auto de prueba es técnicamente una sentencia interlocutoria de SEGUNDO grado.",
    respuesta: false, explicacion: "FALSO (trampa común). El auto de prueba es interlocutoria de PRIMER grado porque sirve de base al pronunciamiento de una sentencia definitiva o interlocutoria. Pero ¡ojo!: doctrinariamente se discute. La 2ª grado pone término al juicio.", art: "Art. 158 inc. 2° CPC", zona: "prueba", dificultad: 3 },

  { enunciado: "Un decreto, providencia o proveído puede DECIDIR el fondo del asunto.",
    respuesta: false, explicacion: "FALSO. Por definición del 158 inc. final: 'sin decidir ni prejuzgar'. Solo da curso progresivo.", art: "Art. 158 inc. final CPC", zona: "cosajuzgada", dificultad: 1 },

  // ─────────────── RECURSOS ───────────────
  { enunciado: "Contra un decreto procede APELACIÓN directa por regla general.",
    respuesta: false, explicacion: "FALSO. Contra decretos solo procede REPOSICIÓN (art. 181). Apelación subsidiaria (art. 188) solo si alteran la sustanciación regular. Confundir = humillación procesal asegurada.", art: "Arts. 181, 187, 188 CPC", zona: "recursos", dificultad: 1 },

  { enunciado: "El plazo para apelar contra sentencia definitiva en 1ª instancia es de 10 días.",
    respuesta: true, explicacion: "VERDADERO. Art. 189: definitivas 10 días; interlocutorias 5 días. El plazo se cuenta desde la notificación al apelante.", art: "Art. 189 CPC", zona: "recursos", dificultad: 1 },

  { enunciado: "La casación en la forma del 766 procede contra sentencias INTERLOCUTORIAS DE PRIMER GRADO.",
    respuesta: false, explicacion: "FALSO. El 766 procede contra definitivas e interlocutorias QUE PONGAN TÉRMINO AL JUICIO O HAGAN IMPOSIBLE SU CONTINUACIÓN. Las interlocutorias de primer grado se atacan por reposición y apelación.", art: "Art. 766 CPC", zona: "recursos", dificultad: 2 },

  { enunciado: "La casación en el fondo del 767 procede contra sentencias dictadas por TRIBUNALES UNIPERSONALES de primera instancia.",
    respuesta: false, explicacion: "FALSO. El 767 exige sentencias INAPELABLES dictadas por Cortes de Apelaciones o tribunales arbitrales de derecho de SEGUNDA INSTANCIA. Otro error catastrófico común.", art: "Art. 767 CPC", zona: "recursos", dificultad: 2 },

  { enunciado: "El recurso de queja del 545 COT procede contra cualquier sentencia, aunque sea apelable.",
    respuesta: false, explicacion: "FALSO. La queja es SUBSIDIARIA: solo procede contra sentencias definitivas o interlocutorias que pongan fin o hagan imposible continuar Y QUE NO SEAN SUSCEPTIBLES DE NINGÚN OTRO RECURSO ordinario o extraordinario. Excepción: árbitros arbitradores.", art: "Art. 545 COT", zona: "recursos", dificultad: 2 },

  { enunciado: "El recurso de revisión del 810 prescribe a los CUATRO años desde que quedó firme la sentencia.",
    respuesta: false, explicacion: "FALSO. Es UN año desde que la sentencia quedó firme (art. 811 CPC). Las causales del 810 son taxativas: cohecho, violencia, documentos falsos, testigos falsos.", art: "Arts. 810-811 CPC", zona: "recursos", dificultad: 2 },

  { enunciado: "La casación en el fondo se interpone ante el tribunal que dictó la sentencia (a quo).",
    respuesta: true, explicacion: "VERDADERO. Art. 771: el recurso de casación se interpone ante el tribunal que haya pronunciado la sentencia que se trata de invalidar, para ante aquel a quien corresponda conocer de él conforme a la ley.", art: "Art. 771 CPC", zona: "recursos", dificultad: 2 },

  { enunciado: "El recurso de hecho VERDADERO procede cuando el tribunal a quo CONCEDE una apelación improcedente.",
    respuesta: false, explicacion: "FALSO. Trampa. El hecho VERDADERO (203) procede cuando DENIEGA una apelación que debía conceder. El hecho FALSO (196) es contra concesión errada. Mnemotécnica: verdadero = injusticia verdadera del recurrente; falso = la apelación 'falsa' que se le concedió al rival.", art: "Arts. 196, 203 CPC", zona: "recursos", dificultad: 3 },

  // ─────────────── PRUEBA ───────────────
  { enunciado: "Una sola presunción judicial NUNCA puede constituir plena prueba.",
    respuesta: false, explicacion: "FALSO. Art. 426 inc. 2°: una sola presunción puede constituir plena prueba si reúne caracteres de gravedad y precisión suficientes. Excepción famosa.", art: "Art. 426 CPC", zona: "prueba", dificultad: 2 },

  { enunciado: "La confesión judicial sobre hechos personales del confesante hace plena prueba contra sí mismo.",
    respuesta: true, explicacion: "VERDADERO. Art. 1713 CC + 399 CPC: confesión judicial sobre hechos personales = plena prueba.", art: "Arts. 1713 CC, 399 CPC", zona: "prueba", dificultad: 1 },

  { enunciado: "Si la parte citada a absolver posiciones no comparece sin causa justificada, se presumen confesados los hechos categóricamente afirmados en el pliego.",
    respuesta: true, explicacion: "VERDADERO. Art. 394 CPC: confesión tácita por incomparecencia o por negativas o respuestas evasivas. Mecanismo letal.", art: "Art. 394 CPC", zona: "prueba", dificultad: 2 },

  { enunciado: "El término probatorio ORDINARIO en el juicio ordinario es de 30 días.",
    respuesta: false, explicacion: "FALSO. Art. 328: 20 días. Extraordinario fuera del territorio agrega el aumento del 259. Especial: 339 (entorpecimiento).", art: "Art. 328 CPC", zona: "prueba", dificultad: 1 },

  { enunciado: "La negativa injustificada a someterse a la prueba biológica del 199 CC hace presumir LEGALMENTE la paternidad.",
    respuesta: true, explicacion: "VERDADERO. Art. 199 inc. 2° CC: presunción grave (no de derecho). Materia frecuente de puente Procesal↔Filiación.", art: "Art. 199 CC", zona: "prueba", dificultad: 2 },

  { enunciado: "Los instrumentos privados emanados de la parte contraria se tienen por reconocidos si no se objetan dentro de SEIS días.",
    respuesta: true, explicacion: "VERDADERO. Art. 346 N°3 CPC: 6 días para objetar autenticidad o integridad. Silencio = reconocimiento tácito.", art: "Art. 346 CPC", zona: "prueba", dificultad: 2 },

  // ─────────────── JUICIO EJECUTIVO ───────────────
  { enunciado: "El juicio ejecutivo permite oponer cualquier excepción que el ejecutado quiera.",
    respuesta: false, explicacion: "FALSO. Las excepciones son TAXATIVAS (art. 464): 17 numerales. Por fuera del 464 = inadmisible. Las dudas se rechazan.", art: "Art. 464 CPC", zona: "ejecutivo", dificultad: 1 },

  { enunciado: "Un instrumento privado puede ser título ejecutivo SIN gestión preparatoria previa.",
    respuesta: false, explicacion: "FALSO. Sin reconocimiento no es título. Requiere gestión preparatoria (435: notificación judicial para reconocer firma; o protesto de letra de cambio/pagaré, 434 N°4).", art: "Arts. 434 N°4, 435 CPC", zona: "ejecutivo", dificultad: 2 },

  { enunciado: "Si el ejecutado no opone excepciones dentro del plazo, se omite la sentencia y el mandamiento basta de sentencia.",
    respuesta: true, explicacion: "VERDADERO. Art. 472. Sistema brutal: silencio = derrota.", art: "Art. 472 CPC", zona: "ejecutivo", dificultad: 1 },

  { enunciado: "Los embargos sobre inmuebles deben inscribirse en el Conservador para ser oponibles a terceros.",
    respuesta: true, explicacion: "VERDADERO. Art. 453 CPC: embargo sobre inmueble se inscribe en el CBR. Sin inscripción, oponibilidad inter partes solamente.", art: "Art. 453 CPC", zona: "ejecutivo", dificultad: 2 },

  // ─────────────── CAUTELARES ───────────────
  { enunciado: "Las medidas precautorias del art. 290 SOLO pueden ser las cuatro enumeradas (secuestro, interventor, retención, prohibición).",
    respuesta: false, explicacion: "FALSO. Art. 298 inc. 2°: el tribunal puede decretar medidas innominadas exigiendo caución. Las 4 del 290 son las nominadas.", art: "Arts. 290, 298 CPC", zona: "cautelares", dificultad: 2 },

  { enunciado: "Las cautelares prejudiciales precautorias caducan si dentro de 10 días no se entabla demanda.",
    respuesta: true, explicacion: "VERDADERO. Art. 280 CPC: plazo de 10 días; el tribunal podrá ampliarlo hasta por 30 más. Si no se cumple, el solicitante responde de los perjuicios causados.", art: "Art. 280 CPC", zona: "cautelares", dificultad: 2 },

  // ─────────────── COSA JUZGADA ───────────────
  { enunciado: "La triple identidad para que exista cosa juzgada exige las mismas personas, la misma cosa pedida y la misma causa de pedir.",
    respuesta: true, explicacion: "VERDADERO. Art. 177 CPC: identidad de partes, objeto y causa de pedir (causa petendi).", art: "Art. 177 CPC", zona: "cosajuzgada", dificultad: 1 },

  { enunciado: "La cosa juzgada FORMAL impide volver a discutir el asunto en otro juicio.",
    respuesta: false, explicacion: "FALSO. La formal es solo dentro del mismo proceso (impide nueva impugnación). La MATERIAL es la que impide otro juicio. Confundirlas = naufragio doctrinal.", art: "Art. 175 CPC + doctrina", zona: "cosajuzgada", dificultad: 2 },

  // ─── BLOQUE EXPANDIDO v3.3 — más trampas finas ───
  { enunciado: "El recurso de revisión es un recurso ORDINARIO.",
    respuesta: false, explicacion: "FALSO. La revisión es un recurso EXTRAORDINARIO de competencia exclusiva de la Corte Suprema (810 CPC). Procede solo contra sentencias firmes y por causales taxativas.",
    art: "Arts. 810-811 CPC", zona: "recursos", dificultad: 1 },

  { enunciado: "El plazo para apelar contra una sentencia interlocutoria es de 5 días contados desde la notificación.",
    respuesta: true, explicacion: "VERDADERO. Art. 189: 5 días para interlocutorias y autos/decretos en apelación subsidiaria; 10 días para definitivas.",
    art: "Art. 189 CPC", zona: "recursos", dificultad: 1 },

  { enunciado: "La apelación contra sentencia definitiva puede deducirse en cualquier tiempo mientras no se cumpla.",
    respuesta: false, explicacion: "FALSO. 10 días desde la notificación. Pasado ese plazo, queda firme.",
    art: "Art. 189 CPC", zona: "recursos", dificultad: 1 },

  { enunciado: "El juicio sumario procede SIEMPRE Y SOLO en los casos taxativos del art. 680 inc. 2°.",
    respuesta: false, explicacion: "FALSO. El art. 680 inc. 1° tiene cláusula abierta: por su naturaleza, cuando la acción requiera tramitación rápida. Además están los del inc. 2° (taxativos).",
    art: "Art. 680 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "La acumulación de autos requiere que las causas se encuentren en el mismo grado jurisdiccional.",
    respuesta: true, explicacion: "VERDADERO. Art. 95 CPC: que se encuentren sometidas a una misma instancia. Es uno de los requisitos.",
    art: "Art. 95 CPC", zona: "incidentes", dificultad: 2 },

  { enunciado: "El privilegio de pobreza se concede únicamente a personas naturales.",
    respuesta: false, explicacion: "FALSO. Art. 129 CPC extiende a personas naturales y a corporaciones de utilidad pública. Doctrinaria: las jurídicas pueden invocarlo si demuestran insolvencia.",
    art: "Art. 129 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "El tribunal puede decretar medidas para mejor resolver de oficio.",
    respuesta: true, explicacion: "VERDADERO. Art. 159 CPC. Plazo: dentro del término para dictar sentencia. Tipos: presentación de documentos, confesión de partes, inspección personal, etc.",
    art: "Art. 159 CPC", zona: "prueba", dificultad: 2 },

  { enunciado: "Las medidas para mejor resolver pueden decretarse aunque la causa esté en estado de fallo.",
    respuesta: true, explicacion: "VERDADERO. Justamente, se decretan después de citada la causa para sentencia. Esto interrumpe el plazo para fallar (159 inc. final).",
    art: "Art. 159 CPC", zona: "prueba", dificultad: 2 },

  { enunciado: "El plazo para hacer observaciones a la prueba (art. 430) es de 10 días.",
    respuesta: true, explicacion: "VERDADERO. Art. 430 CPC: vencido el probatorio se dan 10 días para observaciones. Plazo fatal.",
    art: "Art. 430 CPC", zona: "prueba", dificultad: 2 },

  { enunciado: "La preparación del recurso de casación (art. 769) es exigible incluso cuando el vicio aparece en la sentencia misma.",
    respuesta: false, explicacion: "FALSO. Art. 769 inc. 2°: NO se exige preparación cuando el vicio nace en la sentencia o cuando no fue conocido antes. Excepción crucial.",
    art: "Art. 769 inc. 2° CPC", zona: "recursos", dificultad: 3 },

  { enunciado: "Una resolución de un tribunal arbitrador siempre es susceptible de casación en la forma.",
    respuesta: false, explicacion: "FALSO. Las sentencias de árbitros ARBITRADORES NO admiten casación en la forma. Por eso el 545 COT contempla la excepción de la queja procediendo contra ellas (es el ÚNICO recurso disponible).",
    art: "Arts. 545 COT, 791 CPC", zona: "recursos", dificultad: 3 },

  { enunciado: "El embargo recae sobre el dominio del bien.",
    respuesta: false, explicacion: "FALSO. El embargo NO transfiere el dominio (sigue siendo del deudor). Solo es medida de afectación que prohíbe la libre disposición. Confundir es un error básico.",
    art: "Arts. 444-457 CPC", zona: "ejecutivo", dificultad: 2 },

  { enunciado: "El depositario provisional del embargo puede ser el mismo deudor.",
    respuesta: true, explicacion: "VERDADERO. Art. 451 inc. 2°: el ejecutado puede ser nombrado depositario si el acreedor consiente o si el tribunal lo estima conveniente. Aunque no es lo habitual.",
    art: "Art. 451 CPC", zona: "ejecutivo", dificultad: 2 },

  { enunciado: "La tercería de dominio se tramita en el cuaderno principal.",
    respuesta: false, explicacion: "FALSO. Las tercerías SIEMPRE en CUADERNO SEPARADO (520 CPC). No suspenden el procedimiento principal ni el de apremio, salvo decisión judicial.",
    art: "Arts. 518-520 CPC", zona: "ejecutivo", dificultad: 2 },

  { enunciado: "El remate sin tasación es imposible: siempre se requiere informe pericial.",
    respuesta: false, explicacion: "FALSO. Si las partes acuerdan el precio mínimo, no se necesita tasación (486 inc. final). También cuando se trata de bienes con valor conocido (valores mobiliarios cotizados).",
    art: "Art. 486 CPC", zona: "ejecutivo", dificultad: 3 },

  { enunciado: "En el juicio ejecutivo, la sentencia DE PAGO ordena seguir adelante con la ejecución.",
    respuesta: true, explicacion: "VERDADERO. Art. 471 CPC: la sentencia de pago ordena seguir adelante con la ejecución y la sentencia ABSOLUTORIA ordena alzar el embargo.",
    art: "Art. 471 CPC", zona: "ejecutivo", dificultad: 1 },

  { enunciado: "El art. 1464 N°3 CC declara objeto ilícito en la enajenación de cosas embargadas, salvo autorización judicial o consentimiento del acreedor.",
    respuesta: true, explicacion: "VERDADERO. Conexión Civil↔Procesal clave. Acción de nulidad por objeto ilícito.",
    art: "Art. 1464 N°3 CC + 297 CPC", zona: "cautelares", dificultad: 2 },

  { enunciado: "Las medidas precautorias se decretan SIEMPRE inaudita parte.",
    respuesta: false, explicacion: "FALSO. Art. 302 CPC: pueden llevarse a efecto antes de notificarse, pero solo por motivos graves y urgentes. La REGLA es notificación previa.",
    art: "Art. 302 CPC", zona: "cautelares", dificultad: 3 },

  { enunciado: "La acción contra el fiador puede deducirse aunque no se haya intentado primero contra el deudor principal.",
    respuesta: false, explicacion: "FALSO en regla general. El fiador goza del BENEFICIO DE EXCUSIÓN (CC 2357), que es excepción dilatoria del 303 N°5 CPC.",
    art: "Arts. 2357 CC, 303 N°5 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "El amicus curiae está expresamente regulado en el CPC chileno.",
    respuesta: false, explicacion: "FALSO. El amicus curiae no tiene regulación expresa en el CPC. Existe regulación parcial en procedimientos constitucionales y administrativos. Doctrina mayoritaria considera que en lo civil ordinario NO procede formalmente.",
    art: "Doctrina + jurisprudencia TC", zona: "incidentes", dificultad: 3 },

  { enunciado: "El recurso de queja prescribe en 5 días desde la notificación de la resolución impugnada.",
    respuesta: true, explicacion: "VERDADERO. Art. 548 COT: plazo de 5 días, fatal. Se interpone directamente ante el tribunal superior.",
    art: "Art. 548 COT", zona: "recursos", dificultad: 2 },

  { enunciado: "El abandono del procedimiento puede pedirlo cualquiera de las partes.",
    respuesta: false, explicacion: "FALSO. Art. 153: solo el demandado, en cualquier estado del juicio, por vía de acción o de excepción. NO el demandante (porque sería premiar su propia inactividad).",
    art: "Art. 153 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "El abandono extingue las acciones y derechos del demandante.",
    respuesta: false, explicacion: "FALSO. Art. 156: el abandono NO extingue las acciones, solo las gestiones obradas. La acción puede deducirse de nuevo si no ha prescrito.",
    art: "Art. 156 CPC", zona: "incidentes", dificultad: 2 },

  { enunciado: "El desistimiento de la demanda extingue la acción y produce cosa juzgada.",
    respuesta: true, explicacion: "VERDADERO. Art. 150 CPC: la sentencia que acepta el desistimiento extingue las acciones que se han hecho valer. Produce cosa juzgada material.",
    art: "Art. 150 CPC", zona: "incidentes", dificultad: 2 },

  { enunciado: "El allanamiento del demandado dispensa al actor de probar los hechos.",
    respuesta: true, explicacion: "VERDADERO. Art. 313 CPC: el demandado que se allana o acepta los hechos releva al actor de probarlos. Aún así, el tribunal puede recibir la causa a prueba si hay disposición de derechos.",
    art: "Art. 313 CPC", zona: "incidentes", dificultad: 2 },

  { enunciado: "La sentencia dictada en juicio sumario contra el demandado rebelde no es apelable en ambos efectos.",
    respuesta: false, explicacion: "FALSO. La apelación en el sumario procede en el solo efecto devolutivo, salvo en sentencia definitiva o resolución que ponga término al juicio (art. 691). Pero ojo: ambos efectos si lo dispone la ley.",
    art: "Art. 691 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "La rebeldía del demandado en el juicio ordinario implica reconocimiento de los hechos de la demanda.",
    respuesta: false, explicacion: "FALSO. La rebeldía SOLO implica contestación FICTA: se entiende controvertido todo. NO es allanamiento. Diferencia clave.",
    art: "Art. 78 CPC + doctrina", zona: "incidentes", dificultad: 2 },

  { enunciado: "El art. 64 inciso final permite al tribunal proveer de oficio al vencimiento del plazo fatal.",
    respuesta: true, explicacion: "VERDADERO. Reforma Ley 19.317. El tribunal puede dictar de oficio la resolución que corresponda. En la práctica los abogados igual acusan rebeldía por seguridad.",
    art: "Art. 64 inc. final CPC", zona: "incidentes", dificultad: 2 },

  { enunciado: "Los plazos en el CPC se cuentan SIEMPRE de fecha a fecha incluyendo días corridos.",
    respuesta: false, explicacion: "FALSO. Los plazos del CPC se cuentan en DÍAS HÁBILES y no comprenden los feriados (art. 66 CPC), salvo que la ley o el tribunal dispongan lo contrario expresamente.",
    art: "Art. 66 CPC", zona: "incidentes", dificultad: 1 },

  { enunciado: "El término probatorio puede prorrogarse a solicitud de parte por motivos justificados.",
    respuesta: true, explicacion: "VERDADERO. Art. 329 CPC permite término extraordinario fuera del territorio. Art. 339: especial por entorpecimiento.",
    art: "Arts. 329, 339 CPC", zona: "prueba", dificultad: 2 },

  { enunciado: "El testigo inhábil del 358 nunca puede declarar válidamente.",
    respuesta: false, explicacion: "FALSO. El testigo puede declarar, pero su testimonio tiene menor valor o es desestimado. La tacha se interpone antes de la declaración y se resuelve en la sentencia.",
    art: "Arts. 357-358 CPC", zona: "prueba", dificultad: 2 },

  // ─────────────── PREGUNTAS DE DIFICULTAD MÁXIMA — dificultad: 3 ───────────────

  { enunciado: "La sentencia interlocutoria que recibe la causa a prueba es apelable directamente.",
    respuesta: false, explicacion: "FALSO. La interlocutoria de 1° grado (auto de prueba) se impugna POR REPOSICIÓN (art. 319) con apelación EN SUBSIDIO. No procede apelación directa. Error clásico de examen.",
    art: "Art. 319 CPC", zona: "recursos", dificultad: 3 },

  { enunciado: "La conciliación obligatoria del art. 262 procede en TODOS los juicios civiles sin excepción.",
    respuesta: false, explicacion: "FALSO. El art. 262 inc. 2° excluye: juicios ejecutivos, de hacienda, de desahucio o terminación del arrendamiento, entre otros casos donde no existe controversia de hecho o la ley excluye expresamente.",
    art: "Art. 262 inc. 2° CPC", zona: "prueba", dificultad: 3 },

  { enunciado: "El plazo para interponer casación en la forma contra sentencia definitiva es de 15 días.",
    respuesta: true, explicacion: "VERDADERO. Art. 770 inc. 1°: 15 días desde notificación de la resolución. El plazo de 10 días es para la casación en el fondo cuando el recurso de apelación fue rechazado en forma simultánea.",
    art: "Art. 770 CPC", zona: "recursos", dificultad: 3 },

  { enunciado: "En el juicio ejecutivo, si el ejecutado no opone excepciones en plazo, el tribunal DEBE dictar sentencia de remate inmediatamente.",
    respuesta: false, explicacion: "FALSO. Si no opone excepciones, el mandamiento de ejecución hace de sentencia definitiva (art. 472 CPC). El tribunal OMITE la sentencia — no dicta nueva resolución, el mandamiento ya es suficiente.",
    art: "Art. 472 CPC", zona: "ejecutivo", dificultad: 3 },

  { enunciado: "El abandono del procedimiento extingue las acciones del demandante si transcurren 6 meses.",
    respuesta: false, explicacion: "FALSO. El abandono NO extingue las acciones, solo las gestiones realizadas en el proceso (art. 156 CPC). El demandante puede demandar de nuevo. La confusión se debe a que SE EXTINGUE la pretensión procesal, no el derecho sustantivo.",
    art: "Arts. 152-157 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "La interlocutoria de 2° grado que pone término al juicio es apelable aunque no sea sentencia definitiva.",
    respuesta: true, explicacion: "VERDADERO. Art. 187 CPC permite apelar de interlocutorias de cualquier grado cuando ponen término al juicio o hacen imposible su continuación. No importa que no sea definitiva — el efecto práctico es idéntico.",
    art: "Art. 187 CPC", zona: "recursos", dificultad: 3 },

  { enunciado: "La cosa juzgada formal impide toda discusión posterior entre las mismas partes.",
    respuesta: false, explicacion: "FALSO. La cosa juzgada FORMAL solo impide atacar la resolución DENTRO DEL MISMO PROCESO. La material es la que impide un nuevo juicio entre las mismas partes con las mismas identidades (triple identidad del 177 CPC). Son conceptos distintos.",
    art: "Art. 177 CPC", zona: "cosajuzgada", dificultad: 3 },

  { enunciado: "El desasimiento del tribunal opera desde que se NOTIFICA la sentencia definitiva.",
    respuesta: false, explicacion: "FALSO. El desasimiento opera desde que se DICTA la sentencia (art. 182 CPC), no desde su notificación. El tribunal queda 'desasido' del conocimiento en el momento mismo de la dictación. La notificación es para las partes, no para el desasimiento.",
    art: "Art. 182 CPC", zona: "cosajuzgada", dificultad: 3 },

  { enunciado: "En el juicio sumario la sustitución al ordinario solo puede pedirla el demandado.",
    respuesta: false, explicacion: "FALSO. El art. 681 permite a CUALQUIERA DE LAS PARTES pedir la sustitución de procedimiento cuando aparezca que la acción es de lato conocimiento. El tribunal puede acceder si hay mérito para ello.",
    art: "Art. 681 CPC", zona: "incidentes", dificultad: 3 },

  { enunciado: "Las excepciones perentorias anómalas del art. 310 pueden oponerse en 2ª instancia hasta antes de la vista.",
    respuesta: true, explicacion: "VERDADERO pero trampa: art. 310 inc. 2° las admite en 2ª instancia HASTA ANTES DE LA VISTA DE LA CAUSA, no hasta antes de la citación a oír sentencia que es el límite en 1ª. Son plazos distintos en cada instancia.",
    art: "Art. 310 inc. 2° CPC", zona: "recursos", dificultad: 3 },

  { enunciado: "En el juicio ejecutivo, las excepciones del art. 464 pueden ser tanto dilatorias como perentorias.",
    respuesta: true, explicacion: "VERDADERO. Las 17 causales del 464 mezclan: incompetencia (dilatoria), falta de personería (dilatoria), prescripción (perentoria), pago (perentoria), etc. El sistema es taxativo pero no uniforme en naturaleza.",
    art: "Art. 464 CPC", zona: "ejecutivo", dificultad: 3 },

  { enunciado: "La queja procede también cuando existe recurso de casación disponible pero no se interpuso a tiempo.",
    respuesta: false, explicacion: "FALSO. La queja es SUBSIDIARIA — solo procede si no hay otro recurso ordinario o extraordinario disponible (art. 545 COT). Si prescribió el plazo por incuria del abogado, eso no rehabilita la queja.",
    art: "Art. 545 COT", zona: "recursos", dificultad: 3 },
];

export function casosAleatoriosVoF(n: number, dificultad?: 1 | 2 | 3): PreguntaVoF[] {
  const filtrado = dificultad ? BANCO_VOF.filter((p) => p.dificultad === dificultad) : BANCO_VOF;
  const shuffled = [...filtrado].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
