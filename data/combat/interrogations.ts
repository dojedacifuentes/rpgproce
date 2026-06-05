// ============================================================================
// INTERROGATORIOS — flujo de combate multifase por jefe.
// Cada jefe ataca en 5 fases: Pregunta inicial → Repregunta → Trampa →
// Caso práctico → Remate. No es un quiz: es una interrogación oral que escala.
// Contenido fundado en Derecho Procesal civil chileno (CPC / COT / CC / CPR).
// ============================================================================

export type Fase = "principal" | "repregunta" | "trampa" | "caso" | "remate";

export type FaseInterrogatorio = {
  fase: Fase;
  bossLine: string; // la voz del jefe (lo que dice antes de la pregunta)
  prompt: string;
  article: string;
  options: { text: string; correct: boolean; feedback: string }[];
  examAnswer: string;
};

export const FASE_META: Record<Fase, { label: string; icon: string }> = {
  principal: { label: "Pregunta Inicial", icon: "①" },
  repregunta: { label: "Repregunta", icon: "②" },
  trampa: { label: "Trampa", icon: "③" },
  caso: { label: "Caso Práctico", icon: "④" },
  remate: { label: "Remate", icon: "⑤" },
};

export const FASES_ORDEN: Fase[] = ["principal", "repregunta", "trampa", "caso", "remate"];

export const INTERROGATORIOS: Record<string, FaseInterrogatorio[]> = {
  // ══════════════════════════════════════════════════════════════════════════
  esfinge_competencia: [
    {
      fase: "principal",
      bossLine: "Nadie litiga sin permiso. Dime: ¿quién decide la contienda?",
      prompt: "¿Qué reglas determinan el tribunal a quien corresponde conocer del asunto por su naturaleza, materia, cuantía o fuero?",
      article: "arts. 108-133 COT",
      options: [
        { text: "Las reglas de la competencia.", correct: true, feedback: "Correcto. La jurisdicción es el poder genérico; la competencia lo distribuye." },
        { text: "Las reglas de la jurisdicción.", correct: false, feedback: "Incorrecto. La jurisdicción es la facultad de juzgar en abstracto, no su distribución." },
        { text: "Las reglas del emplazamiento.", correct: false, feedback: "Incorrecto. El emplazamiento es notificación más plazo, no atribución del tribunal." },
      ],
      examAnswer: "Jurisdicción es el poder de juzgar; competencia es la medida en que se distribuye ese poder entre tribunales.",
    },
    {
      fase: "repregunta",
      bossLine: "Bien. Ahora distinga, o quede fuera del umbral.",
      prompt: "La incompetencia que afecta el factor cuantía, materia o fuero, ¿qué carácter tiene?",
      article: "competencia absoluta",
      options: [
        { text: "Es competencia absoluta: de orden público e irrenunciable.", correct: true, feedback: "Correcto. La absoluta mira al interés general y no se prorroga." },
        { text: "Es competencia relativa: renunciable y prorrogable.", correct: false, feedback: "Incorrecto. La relativa es el territorio; esos factores son absolutos." },
        { text: "Es una cuestión de jurisdicción, no de competencia.", correct: false, feedback: "Incorrecto. Sigue siendo competencia, en su faz absoluta." },
      ],
      examAnswer: "Competencia absoluta: cuantía, materia y fuero; de orden público, irrenunciable, declarable de oficio.",
    },
    {
      fase: "trampa",
      bossLine: "Veo que recita. Pero, ¿puede prorrogarse la competencia absoluta?",
      prompt: "¿En qué casos opera la prórroga de la competencia?",
      article: "arts. 181-187 COT",
      options: [
        { text: "Solo en la competencia relativa, en asuntos contenciosos civiles y entre tribunales ordinarios de igual jerarquía.", correct: true, feedback: "Correcto. La prórroga jamás alcanza a la competencia absoluta." },
        { text: "En cualquier competencia si ambas partes consienten.", correct: false, feedback: "Incorrecto. El consentimiento no sanea la incompetencia absoluta." },
        { text: "Solo por resolución del superior jerárquico.", correct: false, feedback: "Incorrecto. La prórroga nace del acuerdo o la conducta de las partes, no del superior." },
      ],
      examAnswer: "La prórroga solo cabe en competencia relativa (territorio), nunca en la absoluta.",
    },
    {
      fase: "caso",
      bossLine: "Un litigante calla. ¿Sabes leer su silencio?",
      prompt: "El demandado contesta el fondo sin alegar la incompetencia relativa del tribunal. ¿Qué se produce?",
      article: "prórroga tácita",
      options: [
        { text: "Prórroga tácita de la competencia relativa: el silencio defensivo la sanea.", correct: true, feedback: "Correcto. Quien defiende sin reclamar el territorio acepta tácitamente al tribunal." },
        { text: "Nulidad insanable de todo lo obrado.", correct: false, feedback: "Incorrecto. Confundes incompetencia relativa con absoluta." },
        { text: "El tribunal debe declararse incompetente de oficio.", correct: false, feedback: "Incorrecto. La relativa no se declara de oficio; se reclama oportunamente." },
      ],
      examAnswer: "El demandado prorroga tácitamente cuando hace cualquier gestión que no sea reclamar la incompetencia relativa.",
    },
    {
      fase: "remate",
      bossLine: "Última puerta. Si yerras, no eras digno del proceso.",
      prompt: "Si el vicio es de incompetencia absoluta y ya hay sentencia, ¿cuál es la vía y el carácter del defecto?",
      article: "art. 768 N°1 CPC",
      options: [
        { text: "Casación en la forma por incompetencia; es vicio insanable y declarable de oficio.", correct: true, feedback: "Correcto. La incompetencia absoluta es causal de casación en la forma." },
        { text: "Apelación, porque es un error de fondo.", correct: false, feedback: "Incorrecto. La incompetencia es vicio de forma, no de juzgamiento." },
        { text: "Recurso de queja, por falta grave del juez.", correct: false, feedback: "Incorrecto. La queja es disciplinaria y excepcional, no la vía propia aquí." },
      ],
      examAnswer: "Incompetencia absoluta = causal de casación en la forma (768 N°1), insanable y de oficio.",
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  receptor_fantasma: [
    {
      fase: "principal",
      bossLine: "Yo notifico en la sombra. ¿Reconoces una notificación válida?",
      prompt: "Por regla general, ¿cómo debe notificarse al demandado la primera resolución (la demanda)?",
      article: "art. 40 CPC",
      options: [
        { text: "Personalmente, entregándole copia íntegra de la resolución y la solicitud.", correct: true, feedback: "Correcto. La primera notificación exige forma personal." },
        { text: "Por el estado diario, como toda resolución.", correct: false, feedback: "Incorrecto. El estado diario es la regla supletoria, no para la primera." },
        { text: "Por avisos en un diario de circulación.", correct: false, feedback: "Incorrecto. Esa es excepcional y requiere resolución que la autorice." },
      ],
      examAnswer: "La primera notificación se hace personalmente (art. 40); las demás, por estado diario salvo regla especial.",
    },
    {
      fase: "repregunta",
      bossLine: "¿Y si no lo encuentras? No improvises conmigo.",
      prompt: "¿Qué exige el art. 44 para notificar por cédula al demandado que no es habido?",
      article: "art. 44 CPC",
      options: [
        { text: "Que, buscado en dos días distintos en su habitación o trabajo, no fue hallado, y se certifique que está en el lugar y cuál es su morada.", correct: true, feedback: "Correcto. Dos búsquedas + certificación de morada y permanencia." },
        { text: "Un solo intento basta si el receptor lo declara.", correct: false, feedback: "Incorrecto. Se requieren dos búsquedas en días distintos." },
        { text: "Que el tribunal lo ordene sin búsqueda previa.", correct: false, feedback: "Incorrecto. La búsqueda y certificación son presupuesto del 44." },
      ],
      examAnswer: "Art. 44: dos búsquedas en días distintos + certificación de que está en el lugar y de su morada; luego cédula.",
    },
    {
      fase: "trampa",
      bossLine: "Te tengo. Publiqué en el estado diario. ¿No basta?",
      prompt: "La demanda se notificó por estado diario y el demandado nunca comparece. ¿Cuál es el problema?",
      article: "arts. 40 y 768 N°9 CPC",
      options: [
        { text: "Falta emplazamiento válido: el estado diario no sustituye la notificación personal de la demanda; hay indefensión reclamable.", correct: true, feedback: "Correcto. Sin notificación idónea no hay emplazamiento." },
        { text: "No hay problema: el estado diario notifica todo.", correct: false, feedback: "Incorrecto. La primera resolución exige forma personal." },
        { text: "Solo hay un error de redacción subsanable.", correct: false, feedback: "Incorrecto. Es un vicio de la relación procesal, no tipográfico." },
      ],
      examAnswer: "Emplazamiento = notificación válida + plazo. Notificar la demanda por estado diario lo vicia.",
    },
    {
      fase: "caso",
      bossLine: "Defiéndete, entonces. ¿Cómo atacas mi obra?",
      prompt: "Detectada la falta de emplazamiento, ¿qué puede pedir el demandado afectado?",
      article: "nulidad procesal / art. 80 CPC",
      options: [
        { text: "La nulidad de lo obrado por falta de emplazamiento, acreditando que por un hecho no imputable no tomó conocimiento.", correct: true, feedback: "Correcto. El art. 80 ampara al litigante rebelde no emplazado." },
        { text: "Solo apelar la sentencia definitiva.", correct: false, feedback: "Incorrecto. El vicio es anterior; procede la nulidad." },
        { text: "Iniciar un nuevo juicio ordinario por los daños.", correct: false, feedback: "Incorrecto. Primero se invalida lo obrado en el mismo proceso." },
      ],
      examAnswer: "Art. 80: el rebelde no emplazado por causa ajena puede pedir nulidad de todo lo obrado.",
    },
    {
      fase: "remate",
      bossLine: "Y ante la Corte, ¿con qué causal me derribas?",
      prompt: "Si hay sentencia dictada sin emplazamiento válido, ¿qué causal de casación en la forma procede?",
      article: "art. 768 N°9 CPC",
      options: [
        { text: "Faltar a un trámite o diligencia esencial, como el emplazamiento de las partes.", correct: true, feedback: "Correcto. El emplazamiento es trámite esencial (795 N°1)." },
        { text: "Ultra petita.", correct: false, feedback: "Incorrecto. Eso es 768 N°4, otorgar más de lo pedido." },
        { text: "Incompetencia del tribunal.", correct: false, feedback: "Incorrecto. El vicio aquí es la falta de emplazamiento, no la competencia." },
      ],
      examAnswer: "Falta de emplazamiento = trámite esencial (795 N°1); su omisión es casación en la forma (768 N°9).",
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  oraculo_prueba: [
    {
      fase: "principal",
      bossLine: "No me digas lo que sabes. Dime qué puedes probar.",
      prompt: "Por regla general, ¿a quién incumbe probar las obligaciones o su extinción?",
      article: "art. 1698 CC",
      options: [
        { text: "Al que alega la existencia de la obligación o su extinción.", correct: true, feedback: "Correcto. Quien afirma, prueba." },
        { text: "Siempre al demandante, sin excepción.", correct: false, feedback: "Incorrecto. También el demandado prueba la extinción que alega." },
        { text: "Al tribunal, por el principio inquisitivo.", correct: false, feedback: "Incorrecto. La carga es de las partes; el tribunal valora." },
      ],
      examAnswer: "Art. 1698: prueba la existencia quien la alega; prueba la extinción quien la opone.",
    },
    {
      fase: "repregunta",
      bossLine: "¿Y sobre qué recae la prueba? No divagues.",
      prompt: "El auto de prueba fija los hechos a probar. ¿Qué característica deben tener esos hechos?",
      article: "art. 318 CPC",
      options: [
        { text: "Sustanciales, pertinentes y controvertidos.", correct: true, feedback: "Correcto. Solo esos hechos se reciben a prueba." },
        { text: "Todos los hechos del juicio, controvertidos o no.", correct: false, feedback: "Incorrecto. Los no controvertidos no se prueban." },
        { text: "Solo los hechos favorables al demandante.", correct: false, feedback: "Incorrecto. El criterio es objetivo, no de parte." },
      ],
      examAnswer: "El auto de prueba recibe los hechos sustanciales, pertinentes y controvertidos (art. 318).",
    },
    {
      fase: "trampa",
      bossLine: "Traes un documento viejo y lo llamas 'nuevo'. La nostalgia no es prueba.",
      prompt: "Vencido el término probatorio, una parte intenta rendir documentos antiguos. ¿Qué ocurre?",
      article: "arts. 348 y 64 CPC",
      options: [
        { text: "Opera la preclusión salvo regla especial; los documentos pueden acompañarse hasta el vencimiento del término, no después por mero olvido.", correct: true, feedback: "Correcto. La oportunidad ordena el contradictorio." },
        { text: "Deben admitirse siempre, por la búsqueda de la verdad material.", correct: false, feedback: "Incorrecto. La verdad se busca dentro de las oportunidades legales." },
        { text: "El tribunal debe reabrir el término probatorio de oficio.", correct: false, feedback: "Incorrecto. No hay reapertura por descuido de parte." },
      ],
      examAnswer: "Lo olvidado precluye; la prueba tiene oportunidad y plazo (arts. 348, 64), salvo excepción legal.",
    },
    {
      fase: "caso",
      bossLine: "Un documento privado, sin firma reconocida. ¿Vale ante mí?",
      prompt: "Se acompaña un documento privado emanado de la contraparte y esta no lo objeta dentro de plazo. ¿Qué efecto produce?",
      article: "art. 346 N°3 CPC",
      options: [
        { text: "Se tiene por reconocido tácitamente al no objetarse dentro del plazo legal.", correct: true, feedback: "Correcto. El silencio dentro de plazo reconoce el documento privado." },
        { text: "Carece de todo valor por ser privado.", correct: false, feedback: "Incorrecto. Reconocido, adquiere valor probatorio." },
        { text: "Requiere siempre reconocimiento expreso ante el tribunal.", correct: false, feedback: "Incorrecto. El art. 346 admite el reconocimiento tácito." },
      ],
      examAnswer: "Documento privado no objetado en plazo se tiene por reconocido (346 N°3) y hace prueba.",
    },
    {
      fase: "remate",
      bossLine: "Y al final, ¿con qué ojos miro la prueba?",
      prompt: "En el procedimiento civil ordinario, ¿qué sistema de valoración rige por regla general?",
      article: "prueba legal o tasada",
      options: [
        { text: "Prueba legal o tasada: la ley fija el valor de cada medio, con matices de apreciación comparativa.", correct: true, feedback: "Correcto. El CPC ordinario es predominantemente de prueba tasada." },
        { text: "Sana crítica pura, como en el laboral o de familia.", correct: false, feedback: "Incorrecto. La sana crítica rige en procedimientos reformados, no en el ordinario civil clásico." },
        { text: "Íntima convicción sin fundamentación.", correct: false, feedback: "Incorrecto. La sentencia siempre debe fundarse." },
      ],
      examAnswer: "El civil ordinario sigue la prueba legal o tasada; otros procedimientos usan sana crítica.",
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  juez_hierro: [
    {
      fase: "principal",
      bossLine: "Mi sentencia es de hierro. ¿Conoces su forma?",
      prompt: "¿Qué partes debe contener toda sentencia definitiva?",
      article: "art. 170 CPC",
      options: [
        { text: "Expositiva, considerativa y resolutiva.", correct: true, feedback: "Correcto. Esa es la estructura del art. 170." },
        { text: "Solo la parte resolutiva, que es lo vinculante.", correct: false, feedback: "Incorrecto. Sin considerandos hay vicio de forma." },
        { text: "Vistos y resuelvo, sin considerar los hechos.", correct: false, feedback: "Incorrecto. Faltarían los fundamentos de hecho y de derecho." },
      ],
      examAnswer: "Sentencia definitiva: parte expositiva, considerativa (fundamentos) y resolutiva (decisión).",
    },
    {
      fase: "repregunta",
      bossLine: "Si fallo más de lo pedido, ¿cómo se llama mi exceso?",
      prompt: "La sentencia otorga más de lo pedido o se extiende a puntos no sometidos a decisión. ¿Qué causal de casación en la forma configura?",
      article: "art. 768 N°4 CPC",
      options: [
        { text: "Ultra petita.", correct: true, feedback: "Correcto. Otorgar más o extenderse a lo no pedido es ultra petita." },
        { text: "Falta de decisión del asunto controvertido.", correct: false, feedback: "Incorrecto. Eso es lo contrario: 768 N°5 por omisión." },
        { text: "Cosa juzgada.", correct: false, feedback: "Incorrecto. Esa es 768 N°6, decisiones contradictorias." },
      ],
      examAnswer: "Ultra petita (768 N°4): otorgar más de lo pedido o resolver puntos no sometidos a decisión.",
    },
    {
      fase: "trampa",
      bossLine: "¿Repones mi sentencia definitiva? Intenta y te aplasto.",
      prompt: "¿Procede el recurso de reposición contra una sentencia definitiva?",
      article: "art. 181 CPC",
      options: [
        { text: "No: la reposición procede contra autos y decretos; la sentencia definitiva se impugna por apelación o casación.", correct: true, feedback: "Correcto. La reposición no es vía contra la definitiva." },
        { text: "Sí, siempre que se pida dentro de tercero día.", correct: false, feedback: "Incorrecto. Ese plazo es para reposición de autos/decretos, no definitivas." },
        { text: "Sí, pero solo ante la Corte Suprema.", correct: false, feedback: "Incorrecto. La reposición no opera contra sentencias definitivas." },
      ],
      examAnswer: "Reposición: contra autos y decretos (181). La definitiva se ataca por apelación/casación.",
    },
    {
      fase: "caso",
      bossLine: "Mi fallo guardó silencio sobre una excepción. ¿Lo viste?",
      prompt: "La sentencia definitiva omite resolver una excepción oportunamente opuesta. ¿Cómo se ataca?",
      article: "art. 768 N°5 en relación al 170 CPC",
      options: [
        { text: "Casación en la forma por falta de decisión del asunto controvertido (omisión de un punto sometido a juicio).", correct: true, feedback: "Correcto. La omisión de decisión es vicio formal del 768 N°5." },
        { text: "Reposición, por ser un error evidente.", correct: false, feedback: "Incorrecto. No procede reposición contra la definitiva." },
        { text: "Solicitar al juez que la explique informalmente.", correct: false, feedback: "Incorrecto. La impugnación tiene formas y plazos." },
      ],
      examAnswer: "Omitir resolver una excepción opuesta = falta de decisión (768 N°5), casación en la forma.",
    },
    {
      fase: "remate",
      bossLine: "Y mi cosa juzgada, ¿cuándo es inexpugnable?",
      prompt: "Para que opere la cosa juzgada como excepción, ¿qué triple identidad se exige?",
      article: "art. 177 CPC",
      options: [
        { text: "Identidad legal de personas, de la cosa pedida y de la causa de pedir.", correct: true, feedback: "Correcto. Esa es la triple identidad del art. 177." },
        { text: "Identidad de tribunal, de fecha y de abogado.", correct: false, feedback: "Incorrecto. Esos elementos no integran la triple identidad." },
        { text: "Basta la identidad de partes para impedir el nuevo juicio.", correct: false, feedback: "Incorrecto. Se requieren las tres identidades." },
      ],
      examAnswer: "Cosa juzgada (177): identidad legal de personas, de la cosa pedida y de la causa de pedir.",
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  corte_glitch: [
    {
      fase: "principal",
      bossLine: "Cada agravio abre una realidad. ¿Con qué método no te pierdes?",
      prompt: "Para responder sobre un recurso sin caer en trivia, ¿qué orden de análisis conviene?",
      article: "método R-A-P-E-T",
      options: [
        { text: "Resolución impugnable, agravio, plazo, efecto y tribunal competente.", correct: true, feedback: "Correcto. Ese orden evita respuestas sueltas." },
        { text: "Nombre del recurso y una cita al azar.", correct: false, feedback: "Incorrecto. Faltan procedencia, efectos y tribunal." },
        { text: "Solo el plazo, porque es lo que siempre preguntan.", correct: false, feedback: "Incorrecto. Un plazo sin resolución ni agravio es un número suelto." },
      ],
      examAnswer: "R-A-P-E-T: Resolución, Agravio, Plazo, Efecto, Tribunal.",
    },
    {
      fase: "repregunta",
      bossLine: "Apelas. ¿Tienes agravio, o solo ruido?",
      prompt: "¿Cuál es el presupuesto sin el cual la apelación es improcedente?",
      article: "art. 186 CPC",
      options: [
        { text: "El agravio: que la resolución cause perjuicio a quien recurre.", correct: true, feedback: "Correcto. Sin agravio no hay interés para apelar." },
        { text: "Que la cuantía supere 10 UTM siempre.", correct: false, feedback: "Incorrecto. La cuantía importa en otros aspectos, no es el presupuesto básico." },
        { text: "Que el tribunal superior lo autorice previamente.", correct: false, feedback: "Incorrecto. No hay autorización previa del superior." },
      ],
      examAnswer: "La apelación exige agravio: perjuicio para el recurrente en lo resuelto.",
    },
    {
      fase: "trampa",
      bossLine: "Usa la casación como tercera instancia. Te reto.",
      prompt: "¿Es la casación en el fondo una tercera instancia para revisar los hechos?",
      article: "art. 767 CPC",
      options: [
        { text: "No: la casación en el fondo es de derecho; revisa la correcta aplicación de la ley, respetando los hechos fijados.", correct: true, feedback: "Correcto. No es instancia: es control de derecho." },
        { text: "Sí: la Corte revisa íntegramente hechos y derecho.", correct: false, feedback: "Incorrecto. Eso sería una instancia, no casación." },
        { text: "Sí, pero solo si hay infracción a las reglas de la prueba.", correct: false, feedback: "Incorrecto. Salvo leyes reguladoras de la prueba, los hechos no se revisan." },
      ],
      examAnswer: "Casación en el fondo: recurso de derecho, no instancia; respeta los hechos salvo infracción a leyes reguladoras de la prueba.",
    },
    {
      fase: "caso",
      bossLine: "Distingue el vicio. ¿Erré el camino o erré el juicio?",
      prompt: "Un tribunal aplica mal una norma sustantiva al resolver el fondo. ¿Qué tipo de error es y qué recurso lo ataca?",
      article: "error in iudicando",
      options: [
        { text: "Error in iudicando (de juzgamiento), atacable por casación en el fondo.", correct: true, feedback: "Correcto. El error de derecho sustantivo es in iudicando." },
        { text: "Error in procedendo, atacable por casación en la forma.", correct: false, feedback: "Incorrecto. In procedendo es vicio del procedimiento, no del juzgamiento." },
        { text: "Error de hecho, atacable por apelación únicamente.", correct: false, feedback: "Incorrecto. La mala aplicación de la ley es de derecho." },
      ],
      examAnswer: "In procedendo = vicio de forma (casación en la forma); in iudicando = error de derecho de fondo (casación en el fondo).",
    },
    {
      fase: "remate",
      bossLine: "Y la queja, ¿para qué sirve realmente?",
      prompt: "¿Cuál es la naturaleza y procedencia del recurso de queja?",
      article: "art. 545 COT",
      options: [
        { text: "Es disciplinario: procede por faltas o abusos graves cometidos en una resolución jurisdiccional, cuando no proceden otros recursos.", correct: true, feedback: "Correcto. La queja es excepcional y disciplinaria." },
        { text: "Es un recurso ordinario para revisar cualquier agravio.", correct: false, feedback: "Incorrecto. No es ordinario ni sustituye la apelación." },
        { text: "Procede siempre en paralelo a la casación.", correct: false, feedback: "Incorrecto. Es subsidiario y excepcional." },
      ],
      examAnswer: "Queja (545 COT): disciplinaria, por falta o abuso grave, cuando no proceden recursos ordinarios ni extraordinarios.",
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  leviatan_ejecutivo: [
    {
      fase: "principal",
      bossLine: "Soy la coerción del Estado. ¿Con qué se me invoca?",
      prompt: "¿Qué se requiere para iniciar un juicio ejecutivo por obligación de dar?",
      article: "art. 434 CPC",
      options: [
        { text: "Un título ejecutivo que dé cuenta de una obligación líquida, actualmente exigible y no prescrita.", correct: true, feedback: "Correcto. Título + obligación líquida, exigible y no prescrita." },
        { text: "Cualquier documento privado firmado por el deudor.", correct: false, feedback: "Incorrecto. Debe ser título ejecutivo, no cualquier documento." },
        { text: "Una sentencia de término en juicio ordinario, siempre.", correct: false, feedback: "Incorrecto. La sentencia firme es UN título, pero hay otros del 434." },
      ],
      examAnswer: "Ejecutivo: título ejecutivo + obligación líquida, actualmente exigible y no prescrita.",
    },
    {
      fase: "repregunta",
      bossLine: "Tu título cojea. ¿Cómo lo enderezas antes de embargar?",
      prompt: "Si al documento le falta un requisito para ser ejecutivo, ¿qué corresponde?",
      article: "gestión preparatoria de la vía ejecutiva",
      options: [
        { text: "Una gestión preparatoria (p. ej., reconocimiento de firma o confesión de deuda) para perfeccionar el título.", correct: true, feedback: "Correcto. La preparación de la vía ejecutiva crea o completa el título." },
        { text: "Demandar directamente en juicio ordinario.", correct: false, feedback: "Incorrecto. Primero se intenta preparar la vía ejecutiva." },
        { text: "Solicitar de inmediato el embargo, que sanea todo.", correct: false, feedback: "Incorrecto. Sin título perfecto no hay mandamiento." },
      ],
      examAnswer: "Si falta un requisito, se usa la gestión preparatoria (reconocimiento de firma, confesión de deuda, etc.).",
    },
    {
      fase: "trampa",
      bossLine: "El ejecutado opone una excepción ingeniosa. ¿La acepto?",
      prompt: "En el juicio ejecutivo, ¿qué carácter tienen las excepciones que puede oponer el ejecutado?",
      article: "art. 464 CPC",
      options: [
        { text: "Son taxativas: solo las enumeradas en el art. 464; debe encuadrar su defensa en una causal legal.", correct: true, feedback: "Correcto. El ejecutivo comprime la defensa en causales tasadas." },
        { text: "Puede oponer cualquier excepción del juicio ordinario.", correct: false, feedback: "Incorrecto. La oposición ejecutiva es tasada." },
        { text: "Solo puede oponer la prescripción.", correct: false, feedback: "Incorrecto. El 464 enumera varias, no solo la prescripción." },
      ],
      examAnswer: "Las excepciones del ejecutivo son taxativas (art. 464); fuera de esa lista, no hay defensa admisible.",
    },
    {
      fase: "caso",
      bossLine: "Opone una defensa que no está en mi lista. ¿Qué haces, juez?",
      prompt: "El ejecutado opone una excepción no contemplada en el art. 464. ¿Qué debe resolver el tribunal?",
      article: "art. 464 CPC",
      options: [
        { text: "Declararla inadmisible: la defensa debe encuadrar en alguna causal legal del 464.", correct: true, feedback: "Correcto. Fuera de la enumeración, la excepción no se admite." },
        { text: "Admitirla y darle tramitación como en el ordinario.", correct: false, feedback: "Incorrecto. No hay excepciones innominadas en el ejecutivo." },
        { text: "Suspender el apremio hasta que se aclare.", correct: false, feedback: "Incorrecto. El cuaderno de apremio no se paraliza por una excepción inadmisible." },
      ],
      examAnswer: "Si la excepción no encuadra en el 464, es inadmisible; la oposición ejecutiva es tasada.",
    },
    {
      fase: "remate",
      bossLine: "Y mientras discutes, ¿qué pasa con mis cadenas?",
      prompt: "¿En qué cuadernos se tramita el juicio ejecutivo y qué ocurre con el embargo durante la oposición?",
      article: "cuaderno ejecutivo y de apremio",
      options: [
        { text: "En cuaderno ejecutivo (discusión) y de apremio (embargo y realización); el apremio sigue salvo que la ley o el tribunal lo suspendan.", correct: true, feedback: "Correcto. Dos cuadernos paralelos; el apremio no desaparece automáticamente." },
        { text: "En un solo cuaderno, y el embargo se alza al oponer excepciones.", correct: false, feedback: "Incorrecto. Son dos cuadernos y el embargo no se alza por la sola oposición." },
        { text: "La oposición elimina el embargo de pleno derecho.", correct: false, feedback: "Incorrecto. El cuaderno de apremio subsiste." },
      ],
      examAnswer: "Ejecutivo = cuaderno ejecutivo (oposición) + de apremio (embargo). El apremio prosigue salvo suspensión legal.",
    },
  ],

  // ══════════════════════════════════════════════════════════════════════════
  comision_grado: [
    {
      fase: "principal",
      bossLine: "[Civil] Litigante. Un contrato se incumple. ¿Por dónde empieza?",
      prompt: "Ante un incumplimiento contractual, ¿qué debe identificar primero para estructurar la respuesta?",
      article: "acción y procedimiento aplicable",
      options: [
        { text: "La acción que se ejerce y el procedimiento aplicable (ordinario, sumario o especial).", correct: true, feedback: "Correcto. Acción + procedimiento ordenan toda la respuesta." },
        { text: "El monto de los honorarios del abogado.", correct: false, feedback: "Incorrecto. Eso no es parte del análisis procesal." },
        { text: "Solo la sentencia que se espera obtener.", correct: false, feedback: "Incorrecto. La sentencia es el final, no el punto de partida." },
      ],
      examAnswer: "Primero: acción ejercida y procedimiento aplicable; de ahí se ordena todo lo demás.",
    },
    {
      fase: "repregunta",
      bossLine: "[Procesal] No respondió lo mío. ¿Quién prueba y cuándo?",
      prompt: "Fijados los hechos controvertidos, ¿cómo se ordena la actividad probatoria?",
      article: "arts. 318, 1698",
      options: [
        { text: "Cada parte prueba sus afirmaciones, dentro del término probatorio y con medios idóneos, sobre los hechos del auto de prueba.", correct: true, feedback: "Correcto. Carga + oportunidad + medio idóneo + pertinencia." },
        { text: "El tribunal investiga de oficio todos los hechos.", correct: false, feedback: "Incorrecto. En el civil rige la carga de las partes." },
        { text: "Basta alegar; los hechos se presumen verdaderos.", correct: false, feedback: "Incorrecto. Lo controvertido debe probarse." },
      ],
      examAnswer: "Carga (1698), sobre hechos sustanciales/pertinentes/controvertidos (318), en oportunidad y con medio idóneo.",
    },
    {
      fase: "trampa",
      bossLine: "[Constitucional] ¿Y si además se vulneró una garantía?",
      prompt: "El procedimiento se siguió sin dar traslado ni oír a una parte. ¿Qué garantía se afecta?",
      article: "art. 19 N°3 CPR / bilateralidad de la audiencia",
      options: [
        { text: "El debido proceso, en su faz de bilateralidad de la audiencia y derecho a defensa.", correct: true, feedback: "Correcto. Sin bilateralidad no hay debido proceso." },
        { text: "El derecho de propiedad del art. 19 N°24.", correct: false, feedback: "Incorrecto. Lo afectado es el debido proceso, no la propiedad." },
        { text: "Ninguna: el proceso civil no tiene garantías constitucionales.", correct: false, feedback: "Incorrecto. El debido proceso es transversal." },
      ],
      examAnswer: "Se afecta el debido proceso (19 N°3 CPR): bilateralidad de la audiencia y derecho a defensa.",
    },
    {
      fase: "caso",
      bossLine: "[Los tres] Caso integrado: contrato incumplido, título dudoso, sentencia adversa. Ordene.",
      prompt: "¿Cómo se estructura la respuesta oral de un caso que integra varias materias?",
      article: "CPC / CC / COT",
      options: [
        { text: "Acción y procedimiento → hechos a probar y carga → resolución → recurso procedente → consecuencia.", correct: true, feedback: "Correcto. Es una respuesta aplicativa, no memorística." },
        { text: "Definiciones sueltas hasta que el profesor se canse.", correct: false, feedback: "Incorrecto. El grado exige resolver el caso, no recitar." },
        { text: "Inventar el artículo si no se recuerda el número.", correct: false, feedback: "Incorrecto. Si dudas, razona y marca la duda; no inventes norma." },
      ],
      examAnswer: "Orden: acción y procedimiento, hechos y carga probatoria, resolución, recurso y consecuencia procesal.",
    },
    {
      fase: "remate",
      bossLine: "[Comisión] Último aliento. Dénos su método. Y no vacile.",
      prompt: "¿Cuál es el método que demuestra dominio integrado del proceso?",
      article: "método de grado",
      options: [
        { text: "Institución → norma aplicable → requisitos → aplicación a los hechos → consecuencia procesal.", correct: true, feedback: "Correcto. Ese método conecta teoría y caso." },
        { text: "Citar la mayor cantidad de artículos posible.", correct: false, feedback: "Incorrecto. Citar sin aplicar no resuelve." },
        { text: "Responder solo lo que se domina y omitir el resto.", correct: false, feedback: "Incorrecto. El grado exige enfrentar el problema completo." },
      ],
      examAnswer: "Método: institución, norma, requisito, aplicación al hecho y consecuencia procesal.",
    },
  ],
};

export function getInterrogatorio(bossId: string): FaseInterrogatorio[] | undefined {
  return INTERROGATORIOS[bossId];
}
