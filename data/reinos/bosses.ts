import type { BossReino, RegionId } from "@/types/reinos";

// ============================================================================
// REINOS DEL DERECHO — Bosses temáticos
// ----------------------------------------------------------------------------
// Mismo diseño anti-"tells" que los desafíos: opciones paralelas y de longitud
// pareja, SIN citar el artículo en la opción (la norma se revela en la
// explicación, tras responder), distractores plausibles. El orden de las
// opciones se MEZCLA en pantalla (shuffleOptions).
// Cada jefe encarna un problema jurídico real; vencerlo suelta un artículo.
// ============================================================================

export const BOSSES: BossReino[] = [
  // ─── 1 · BOSQUE DE LAS OBLIGACIONES ──────────────────────────────────────
  {
    id: "acreedor_implacable",
    region: "bosque_obligaciones",
    nombre: "El Acreedor Implacable",
    arquetipo: "Cobrador eterno de las obligaciones",
    descripcion:
      "Una figura encorvada bajo el peso de pagarés que nunca prescriben en su memoria. Exige el cumplimiento con voz de notario y ojos de usurero.",
    problemaJuridico: "Cumplimiento forzado, indemnización y prescripción extintiva.",
    icono: "💰",
    hp: 3,
    vidaJugador: 100,
    recompensaArticuloId: "art_1698_cc",
    recompensaCristales: 40,
    ataques: [
      {
        enunciado: "«Dices que no estabas en mora cuando te exigí.» Por regla general, ¿cuándo queda el deudor constituido en mora?",
        articulo: "Art. 1551 CC",
        dano: 30,
        opciones: [
          { texto: "Cuando el acreedor lo requiere, salvo plazo expreso pactado.", correcta: true, explicacion: "Art. 1551: la mora exige interpelación, salvo plazo estipulado u otros casos legales.", art: "1551 CC" },
          { texto: "Por el solo vencimiento del plazo, en todo caso.", correcta: false, explicacion: "La mora automática es la excepción, no la regla general.", art: "1551 CC" },
          { texto: "Desde que incurre en cualquier culpa leve.", correcta: false, explicacion: "La culpa funda responsabilidad, no constituye por sí la mora.", art: "1551 CC" },
          { texto: "Nunca: en lo civil no existe mora del deudor.", correcta: false, explicacion: "La mora del deudor está regulada en el art. 1551.", art: "1551 CC" },
        ],
      },
      {
        enunciado: "Ambos nos debemos sumas de dinero líquidas y actualmente exigibles. ¿Qué opera entre las dos deudas?",
        articulo: "Art. 1656 CC",
        dano: 30,
        opciones: [
          { texto: "La compensación legal, que las extingue hasta la concurrencia de la menor.", correcta: true, explicacion: "Arts. 1655-1656: opera de pleno derecho entre deudas líquidas y exigibles.", art: "1656 CC" },
          { texto: "La novación, que las sustituye por una obligación nueva.", correcta: false, explicacion: "La novación exige ánimo de novar y una obligación nueva.", art: "1628 CC" },
          { texto: "La confusión de ambas deudas.", correcta: false, explicacion: "La confusión reúne en una persona las calidades de acreedor y deudor.", art: "1665 CC" },
          { texto: "La remisión de ambas deudas.", correcta: false, explicacion: "La remisión es condonación voluntaria; no opera de pleno derecho.", art: "1652 CC" },
        ],
      },
      {
        enunciado:
          "«Te exijo el pago. Y afirmo que NUNCA pagaste.» En el juicio, ¿sobre quién pesa probar que la obligación se EXTINGUIÓ por pago?",
        articulo: "Art. 1698 CC",
        dano: 34,
        opciones: [
          { texto: "Sobre el deudor que alega el pago: él debe acreditar la extinción.", correcta: true, explicacion: "Art. 1698: incumbe probar la extinción a quien la alega.", art: "1698 CC" },
          { texto: "Sobre el acreedor, que debe probar que no le pagaron.", correcta: false, explicacion: "El acreedor prueba la existencia de la obligación; el deudor, su extinción.", art: "1698 CC" },
          { texto: "Sobre el juez, que investiga el pago de oficio.", correcta: false, explicacion: "Rige el principio dispositivo: el juez no prueba por las partes.", art: "1698 CC" },
          { texto: "Sobre nadie: el pago se presume mientras no se discuta.", correcta: false, explicacion: "El pago no se presume; lo prueba quien lo invoca.", art: "1698 CC" },
        ],
      },
      {
        enunciado:
          "«Incumplí, sí, pero solo en parte.» En un CONTRATO BILATERAL, ¿qué puede pedir el contratante diligente?",
        articulo: "Art. 1489 CC",
        dano: 33,
        opciones: [
          { texto: "A su arbitrio, el cumplimiento o la resolución, ambos con indemnización.", correcta: true, explicacion: "Art. 1489: condición resolutoria tácita; opción entre cumplir o resolver, con indemnización.", art: "1489 CC" },
          { texto: "Solo el cumplimiento forzado; nunca la resolución.", correcta: false, explicacion: "También puede optar por la resolución.", art: "1489 CC" },
          { texto: "Solo la resolución del contrato, y sin indemnización.", correcta: false, explicacion: "La indemnización procede en ambas vías.", art: "1489 CC" },
          { texto: "La nulidad absoluta del contrato incumplido.", correcta: false, explicacion: "El incumplimiento no es causal de nulidad: es presupuesto de resolución.", art: "1489 CC" },
        ],
      },
      {
        enunciado:
          "«Mi crédito ordinario nació en 2015 y jamás lo cobré.» Hoy te demanda. ¿Qué le opones?",
        articulo: "Art. 2515 CC",
        dano: 33,
        opciones: [
          { texto: "La prescripción extintiva: la acción ordinaria prescribe en cinco años.", correcta: true, explicacion: "Art. 2515: 5 años para las acciones ordinarias desde que la obligación se hizo exigible.", art: "2515 CC" },
          { texto: "La caducidad de seis meses por el abandono del cobro.", correcta: false, explicacion: "El abandono (152 CPC) es procesal y distinto de la prescripción sustantiva.", art: "2515 CC" },
          { texto: "El pago, aunque no exista recibo que lo respalde.", correcta: false, explicacion: "No alegaste pago ni lo pruebas.", art: "1698 CC" },
          { texto: "La cosa juzgada, pese a no existir juicio anterior.", correcta: false, explicacion: "Falta la triple identidad: no hubo fallo previo.", art: "177 CPC" },
        ],
      },
    ],
  },

  // ─── 2 · CIUDAD MERCANTIL DE LOS CONTRATOS ───────────────────────────────
  {
    id: "mercader_mala_fe",
    region: "ciudad_mercantil",
    nombre: "El Mercader de la Mala Fe",
    arquetipo: "Comerciante que cumple la letra y traiciona el espíritu",
    descripcion:
      "Sonríe mostrando contratos impecables. Cumple cada cláusula al pie… y vacía de sentido cada acuerdo. La buena fe es su perdición.",
    problemaJuridico: "Fuerza obligatoria del contrato y ejecución de buena fe.",
    icono: "⚖",
    hp: 3,
    vidaJugador: 100,
    recompensaArticuloId: "art_1546_cc",
    recompensaCristales: 45,
    ataques: [
      {
        enunciado: "En nuestro contrato se cumplió la condición resolutoria pactada. ¿Qué efecto produce?",
        articulo: "Art. 1487 CC",
        dano: 30,
        opciones: [
          { texto: "Resuelve el contrato y obliga a restituir lo recibido.", correcta: true, explicacion: "Art. 1487: cumplida la condición resolutoria, debe restituirse lo que se hubiere recibido bajo tal condición.", art: "1487 CC" },
          { texto: "Lo confirma y lo vuelve irrevocable.", correcta: false, explicacion: "La condición resolutoria cumplida extingue, no confirma.", art: "1487 CC" },
          { texto: "Lo transforma en un contrato unilateral.", correcta: false, explicacion: "No altera la naturaleza del contrato: lo resuelve.", art: "1487 CC" },
          { texto: "Lo hace inoponible a terceros, sin más.", correcta: false, explicacion: "El efecto propio es resolutorio, con restitución.", art: "1487 CC" },
        ],
      },
      {
        enunciado: "Vendí y no entregué la cosa, ya pagada. El comprador pide la resolución. ¿Puede sumar indemnización?",
        articulo: "Art. 1489 CC",
        dano: 30,
        opciones: [
          { texto: "Sí: la indemnización procede junto con la resolución.", correcta: true, explicacion: "Art. 1489: la indemnización acompaña tanto al cumplimiento como a la resolución.", art: "1489 CC" },
          { texto: "No: resolución e indemnización son incompatibles.", correcta: false, explicacion: "Son compatibles; la indemnización es accesoria a la opción elegida.", art: "1489 CC" },
          { texto: "Solo si acredita dolo del vendedor.", correcta: false, explicacion: "Basta el incumplimiento imputable; no se exige dolo.", art: "1489 CC" },
          { texto: "Solo puede pedir el cumplimiento, no la resolución.", correcta: false, explicacion: "El acreedor elige entre cumplimiento o resolución.", art: "1489 CC" },
        ],
      },
      {
        enunciado:
          "«Cumplí EXACTAMENTE lo escrito, aunque sabía que así frustraba el fin del contrato.» ¿Qué te permite condenarme?",
        articulo: "Art. 1546 CC",
        dano: 34,
        opciones: [
          { texto: "La buena fe: obliga a lo que emana de la naturaleza de la obligación.", correcta: true, explicacion: "Art. 1546: la buena fe integra el contrato más allá de su tenor literal.", art: "1546 CC" },
          { texto: "La sola fuerza obligatoria: solo obliga lo expresamente pactado.", correcta: false, explicacion: "La fuerza obligatoria (1545) se complementa con la integración del 1546.", art: "1546 CC" },
          { texto: "Las fuentes de las obligaciones, que enumeran los contratos.", correcta: false, explicacion: "Definen fuentes; no resuelven el cumplimiento de mala fe.", art: "1437 CC" },
          { texto: "Nada: cumplir la letra del contrato basta siempre.", correcta: false, explicacion: "Falso: la buena fe obliga al fin práctico del contrato.", art: "1546 CC" },
        ],
      },
      {
        enunciado:
          "«El contrato NADA dice sobre entregarte los manuales del equipo vendido.» ¿Estoy obligado a entregarlos?",
        articulo: "Art. 1546 CC",
        dano: 33,
        opciones: [
          { texto: "Sí: por la naturaleza del contrato y la costumbre, aunque no se exprese.", correcta: true, explicacion: "El 1546 incorpora lo que emana de la naturaleza de la obligación y de la costumbre.", art: "1546 CC" },
          { texto: "No: solo obliga aquello que quedó literalmente escrito.", correcta: false, explicacion: "Lectura literalista que el 1546 descarta.", art: "1546 CC" },
          { texto: "Solo si se pactó una cláusula expresa al respecto.", correcta: false, explicacion: "La buena fe no requiere cláusula expresa.", art: "1546 CC" },
          { texto: "Lo decide el juez sin norma que lo respalde.", correcta: false, explicacion: "Hay norma: el art. 1546.", art: "1546 CC" },
        ],
      },
      {
        enunciado:
          "«Ya no me conviene el trato: lo dejo sin efecto cuando quiera.» ¿Puedes invalidar el contrato por tu sola voluntad?",
        articulo: "Art. 1545 CC",
        dano: 33,
        opciones: [
          { texto: "No: el contrato es ley para las partes; se deshace por acuerdo o causa legal.", correcta: true, explicacion: "Art. 1545: no se invalida por voluntad unilateral.", art: "1545 CC" },
          { texto: "Sí, en virtud de la autonomía de la voluntad.", correcta: false, explicacion: "La autonomía crea el vínculo, no autoriza romperlo unilateralmente.", art: "1545 CC" },
          { texto: "Sí, siempre que indemnice los perjuicios.", correcta: false, explicacion: "La indemnización no habilita el desistimiento libre fuera de la ley o el pacto.", art: "1545 CC" },
          { texto: "Sí, por un simple caso fortuito sobreviniente.", correcta: false, explicacion: "El caso fortuito tiene reglas propias; no es desistimiento libre.", art: "1545 CC" },
        ],
      },
    ],
  },

  // ─── 3 · TIERRAS DE LA POSESIÓN Y EL DOMINIO ─────────────────────────────
  {
    id: "espectro_poseedor",
    region: "tierras_posesion",
    nombre: "El Espectro Poseedor",
    arquetipo: "Detentador que se cree dueño",
    descripcion:
      "Camina los deslindes con ánimo de señor. Mientras nadie pruebe lo contrario, la tierra lo reputa dueño. Solo el dominio probado lo disuelve.",
    problemaJuridico: "Posesión, dominio, tradición y acción reivindicatoria.",
    icono: "🏚️",
    hp: 3,
    vidaJugador: 100,
    recompensaArticuloId: "art_889_cc",
    recompensaCristales: 45,
    ataques: [
      {
        enunciado: "No discutes mi dominio, solo perturbas mi POSESIÓN de un inmueble. ¿Qué acción ejerzo para ampararla?",
        articulo: "Art. 916 CC",
        dano: 30,
        opciones: [
          { texto: "Las acciones posesorias (querellas de amparo o restitución).", correcta: true, explicacion: "Arts. 916 ss.: las posesorias protegen la posesión de inmuebles, sin discutir el dominio.", art: "916 CC" },
          { texto: "La acción reivindicatoria de dominio.", correcta: false, explicacion: "Esa protege el dominio del que no posee, no la posesión perturbada.", art: "889 CC" },
          { texto: "La acción de petición de herencia.", correcta: false, explicacion: "Es propia del heredero sobre la universalidad.", art: "1264 CC" },
          { texto: "La acción pauliana revocatoria.", correcta: false, explicacion: "Revoca actos fraudulentos del deudor: ajena al caso.", art: "2468 CC" },
        ],
      },
      {
        enunciado: "«Soy mero tenedor, pero llevo años comportándome como dueño.» ¿Muta mi mera tenencia en posesión por el solo tiempo?",
        articulo: "Art. 716 CC",
        dano: 30,
        opciones: [
          { texto: "No: nadie puede mudar por sí mismo su mera tenencia en posesión.", correcta: true, explicacion: "Art. 716: el simple lapso no muda la mera tenencia en posesión.", art: "716 CC" },
          { texto: "Sí, automáticamente al cumplir un año.", correcta: false, explicacion: "El plazo posesorio no convierte la mera tenencia en posesión.", art: "716 CC" },
          { texto: "Sí, de inmediato, por su sola voluntad.", correcta: false, explicacion: "La sola voluntad no transforma el título.", art: "716 CC" },
          { texto: "Sí, si inscribe el inmueble a su nombre.", correcta: false, explicacion: "La inscripción no sanea la falta de ánimo originario de dueño.", art: "716 CC" },
        ],
      },
      {
        enunciado:
          "«Tengo la cosa con ánimo de dueño.» Mientras no pruebes lo contrario, ¿qué se me reputa?",
        articulo: "Art. 700 CC",
        dano: 33,
        opciones: [
          { texto: "Dueño: el poseedor es reputado tal mientras otro no justifique serlo.", correcta: true, explicacion: "Art. 700 inc. 2°: la posesión hace presumir el dominio.", art: "700 CC" },
          { texto: "Mero tenedor que reconoce dominio ajeno.", correcta: false, explicacion: "El mero tenedor carece de ánimo de dueño; aquí hay posesión.", art: "714 CC" },
          { texto: "Usufructuario del bien que ocupa.", correcta: false, explicacion: "No hay derecho real de usufructo constituido.", art: "700 CC" },
          { texto: "Nada: la posesión no produce efecto alguno.", correcta: false, explicacion: "La posesión produce la presunción de dominio del 700.", art: "700 CC" },
        ],
      },
      {
        enunciado:
          "Eres DUEÑO pero NO posees: yo detento la cosa. ¿Qué acción ejerces para recuperarla?",
        articulo: "Art. 889 CC",
        dano: 34,
        opciones: [
          { texto: "La acción reivindicatoria: del dueño que no posee contra el poseedor.", correcta: true, explicacion: "Definición exacta del 889.", art: "889 CC" },
          { texto: "La acción de petición de herencia sobre la cosa.", correcta: false, explicacion: "Esa protege al heredero, no al dueño de una cosa singular.", art: "1264 CC" },
          { texto: "Una querella de restablecimiento, sin más.", correcta: false, explicacion: "Las posesorias amparan la posesión, no el dominio que reclamas.", art: "889 CC" },
          { texto: "La acción de precario, en todo caso.", correcta: false, explicacion: "El precario tiene supuesto propio; la vía del dueño es la reivindicatoria.", art: "889 CC" },
        ],
      },
      {
        enunciado:
          "«Adquirí por TRADICIÓN de quien NO era dueño.» ¿Qué efecto produce esa tradición?",
        articulo: "Art. 682 CC",
        dano: 33,
        opciones: [
          { texto: "No transfiere el dominio, pero te deja como poseedor que puede prescribir.", correcta: true, explicacion: "Art. 682: nadie transfiere más derechos que los que tiene; queda posesión, base de la prescripción.", art: "682 CC" },
          { texto: "Transfiere igualmente el dominio pleno de la cosa.", correcta: false, explicacion: "Nadie transfiere lo que no tiene.", art: "682 CC" },
          { texto: "Es nula de nulidad absoluta y sin efecto alguno.", correcta: false, explicacion: "No es nula: produce posesión.", art: "670 CC" },
          { texto: "Te garantiza el dominio de manera inmediata.", correcta: false, explicacion: "El 670 exige que el tradente sea dueño para transferir dominio.", art: "670 CC" },
        ],
      },
    ],
  },

  // ─── 4 · MANSIÓN SUCESORIA ────────────────────────────────────────────────
  {
    id: "heredero_fantasma",
    region: "mansion_sucesoria",
    nombre: "El Heredero Fantasma",
    arquetipo: "Poseedor aparente de la herencia",
    descripcion:
      "Ocupa la mansión y la herencia como si fuera heredero, sin serlo. Firma con mano translúcida y cobra rentas de los muertos.",
    problemaJuridico: "Petición de herencia, legítimas y colación.",
    icono: "👻",
    hp: 3,
    vidaJugador: 100,
    recompensaArticuloId: "art_1264_cc",
    recompensaCristales: 50,
    ataques: [
      {
        enunciado: "¿Desde qué momento sucede el heredero al causante en el dominio de sus bienes?",
        articulo: "Art. 955 CC",
        dano: 30,
        opciones: [
          { texto: "Desde la muerte del causante (apertura y delación).", correcta: true, explicacion: "Art. 955: la sucesión se abre al fallecer y la herencia se defiere a los herederos.", art: "955 CC" },
          { texto: "Desde la partición de la herencia.", correcta: false, explicacion: "La partición distribuye, pero la sucesión se abre con la muerte.", art: "955 CC" },
          { texto: "Desde la concesión de la posesión efectiva.", correcta: false, explicacion: "La posesión efectiva es un trámite; la delación es a la muerte.", art: "955 CC" },
          { texto: "Desde la inscripción en el Conservador.", correcta: false, explicacion: "La inscripción cumple otra función; la sucesión se abre antes.", art: "955 CC" },
        ],
      },
      {
        enunciado: "El heredero aceptó sin beneficio de inventario. ¿Cómo responde de las deudas hereditarias?",
        articulo: "Art. 1247 CC",
        dano: 30,
        opciones: [
          { texto: "Con todo su patrimonio, más allá de lo heredado (ultra vires).", correcta: true, explicacion: "Sin beneficio de inventario el heredero responde ilimitadamente (art. 1247 a contrario).", art: "1247 CC" },
          { texto: "Solo hasta el monto de lo que recibe, en todo caso.", correcta: false, explicacion: "Esa limitación exige beneficio de inventario.", art: "1247 CC" },
          { texto: "No responde de las deudas del causante.", correcta: false, explicacion: "El heredero continúa la persona del causante en sus deudas.", art: "1097 CC" },
          { texto: "Solo con los bienes hereditarios, siempre separados.", correcta: false, explicacion: "Sin inventario, los patrimonios se confunden.", art: "1247 CC" },
        ],
      },
      {
        enunciado:
          "«Ocupo la herencia en calidad de heredero, aunque el verdadero eres tú.» ¿Qué acción ejerces contra mí?",
        articulo: "Art. 1264 CC",
        dano: 34,
        opciones: [
          { texto: "La petición de herencia: del heredero real contra el aparente.", correcta: true, explicacion: "Art. 1264: recae sobre la universalidad ocupada por quien se dice heredero.", art: "1264 CC" },
          { texto: "La reivindicatoria sobre toda la universalidad hereditaria.", correcta: false, explicacion: "La reivindicatoria es de cosa singular; la universalidad va por petición de herencia.", art: "889 CC" },
          { texto: "La nulidad del testamento, en todo caso.", correcta: false, explicacion: "El problema no es la validez del testamento, sino la ocupación por el falso heredero.", art: "1264 CC" },
          { texto: "La acción de precario contra el ocupante.", correcta: false, explicacion: "No es la vía: hay calidad de heredero invocada.", art: "1264 CC" },
        ],
      },
      {
        enunciado:
          "El causante DONÓ en vida a un legitimario. Para calcular las legítimas, ¿qué debe hacerse?",
        articulo: "Art. 1185 CC",
        dano: 33,
        opciones: [
          { texto: "Acumular imaginariamente las donaciones al acervo.", correcta: true, explicacion: "Art. 1185: acervo imaginario, para igualar a los legitimarios.", art: "1185 CC" },
          { texto: "Ignorarlas, porque ya salieron del patrimonio en vida.", correcta: false, explicacion: "Por eso se reincorporan de modo imaginario.", art: "1185 CC" },
          { texto: "Restarlas del haber de los demás herederos.", correcta: false, explicacion: "Se imputan a la legítima del donatario, no se restan a otros.", art: "1185 CC" },
          { texto: "Revocarlas de pleno derecho al abrirse la sucesión.", correcta: false, explicacion: "No se revocan: se colacionan para el cálculo.", art: "1185 CC" },
        ],
      },
      {
        enunciado:
          "El testador desheredó a su hijo SIN causa legal y dispuso de todo a un extraño. ¿Es eficaz?",
        articulo: "Art. 1167 CC",
        dano: 33,
        opciones: [
          { texto: "No: la legítima es asignación forzosa y se impone contra el testamento.", correcta: true, explicacion: "Art. 1167: las asignaciones forzosas se suplen aun contra disposiciones expresas.", art: "1167 CC" },
          { texto: "Sí: rige la libre disposición absoluta del testador.", correcta: false, explicacion: "La libertad de testar está limitada por las asignaciones forzosas.", art: "1167 CC" },
          { texto: "Sí, si deja al hijo la cuarta de libre disposición.", correcta: false, explicacion: "La cuarta de libre disposición es del testador; al hijo le corresponde su legítima.", art: "1167 CC" },
          { texto: "Solo es válido si se otorga ante notario.", correcta: false, explicacion: "La forma no salva la infracción de la legítima.", art: "1167 CC" },
        ],
      },
    ],
  },

  // ─── 5 · REPÚBLICA ADMINISTRATIVA ─────────────────────────────────────────
  {
    id: "leviatan_administrativo",
    region: "republica_administrativa",
    nombre: "El Leviatán Administrativo",
    arquetipo: "La burocracia hecha monstruo",
    descripcion:
      "Un coloso de servidores y formularios. Decide por silencio, presume su propia legalidad y solo cede ante la impugnación correcta.",
    problemaJuridico: "Acto administrativo, silencio, Contraloría y responsabilidad del Estado.",
    icono: "🛰️",
    hp: 4,
    vidaJugador: 110,
    recompensaArticuloId: "art_42_18575",
    recompensaCristales: 55,
    ataques: [
      {
        enunciado: "Quieres impugnar un acto ante la propia Administración (reposición o jerárquico). ¿Cuál es el plazo general de la Ley 19.880?",
        articulo: "Art. 59 Ley 19.880",
        dano: 26,
        opciones: [
          { texto: "Cinco días hábiles desde la notificación del acto.", correcta: true, explicacion: "Art. 59 Ley 19.880: reposición y jerárquico se interponen dentro de 5 días.", art: "Art. 59 Ley 19.880" },
          { texto: "Treinta días corridos desde la dictación.", correcta: false, explicacion: "Confunde el plazo administrativo con plazos de otras vías.", art: "Art. 59 Ley 19.880" },
          { texto: "Seis meses, como la protección.", correcta: false, explicacion: "La protección tiene su propio plazo; no es el del recurso administrativo.", art: "Art. 59 Ley 19.880" },
          { texto: "No hay plazo: puede impugnarse en cualquier tiempo.", correcta: false, explicacion: "La ley fija un plazo breve de 5 días.", art: "Art. 59 Ley 19.880" },
        ],
      },
      {
        enunciado: "¿Qué naturaleza tiene la TOMA DE RAZÓN que ejerce la Contraloría sobre los actos de la Administración?",
        articulo: "Art. 98 CPR",
        dano: 26,
        opciones: [
          { texto: "Un control PREVENTIVO de juridicidad del acto.", correcta: true, explicacion: "La toma de razón es control preventivo de legalidad, previo a la vigencia del acto.", art: "98 CPR" },
          { texto: "Un control represivo de tipo jurisdiccional.", correcta: false, explicacion: "No es jurisdiccional ni represivo: es preventivo y administrativo.", art: "98 CPR" },
          { texto: "Un recurso que interpone el particular afectado.", correcta: false, explicacion: "Es una potestad de la Contraloría, no un recurso de parte.", art: "98 CPR" },
          { texto: "Una sanción administrativa al órgano emisor.", correcta: false, explicacion: "No sanciona: verifica la legalidad antes de que el acto rija.", art: "98 CPR" },
        ],
      },
      {
        enunciado:
          "Un hospital público te dañó por una organización deficiente del servicio, sin individualizar al culpable. ¿Cuál es el fundamento de la responsabilidad del Estado?",
        articulo: "Art. 42 LOC 18.575",
        dano: 28,
        opciones: [
          { texto: "La falta de servicio: el funcionamiento anormal o tardío del órgano.", correcta: true, explicacion: "No exige identificar al funcionario; basta el mal funcionamiento del servicio.", art: "42 LOC 18.575" },
          { texto: "El dolo personal de la máxima autoridad del país.", correcta: false, explicacion: "No se requiere dolo de autoridad.", art: "42 LOC 18.575" },
          { texto: "La responsabilidad objetiva por todo daño causado.", correcta: false, explicacion: "El estándar dominante es la falta de servicio, no la mera causalidad.", art: "42 LOC 18.575" },
          { texto: "La culpa aquiliana común del Código Civil.", correcta: false, explicacion: "El régimen es administrativo: falta de servicio.", art: "42 LOC 18.575" },
        ],
      },
      {
        enunciado:
          "Presentaste una solicitud y la Administración NO resolvió dentro de plazo. ¿Qué institución opera?",
        articulo: "Ley 19.880 (silencio)",
        dano: 27,
        opciones: [
          { texto: "El silencio administrativo, positivo o negativo según la ley.", correcta: true, explicacion: "Ante la inactividad, la ley fija efectos: silencio positivo (regla) o negativo (excepciones).", art: "Ley 19.880" },
          { texto: "Una negativa ficta que opera siempre en todos los casos.", correcta: false, explicacion: "El silencio positivo es la regla general; el negativo, excepción.", art: "Ley 19.880" },
          { texto: "La obligación de esperar indefinidamente la respuesta.", correcta: false, explicacion: "La ley impide la inactividad eterna mediante el silencio.", art: "Ley 19.880" },
          { texto: "La nulidad de pleno derecho del acto no dictado.", correcta: false, explicacion: "No hay acto que anular: hay ausencia de decisión, suplida por el silencio.", art: "Ley 19.880" },
        ],
      },
      {
        enunciado:
          "«He dictado un acto. Tú lo crees ilegal.» ¿Puedes simplemente desobedecerlo?",
        articulo: "Art. 3 Ley 19.880",
        dano: 28,
        opciones: [
          { texto: "No: el acto se presume legal, con imperio y exigibilidad; hay que impugnarlo.", correcta: true, explicacion: "Art. 3 inc. final Ley 19.880: no cabe autotutela del administrado.", art: "Art. 3 Ley 19.880" },
          { texto: "Sí, mediante la autotutela del propio administrado.", correcta: false, explicacion: "La autotutela es de la Administración, no del particular.", art: "Art. 3 Ley 19.880" },
          { texto: "Sí, basta con estimarlo arbitrario para desobedecer.", correcta: false, explicacion: "La convicción subjetiva no enerva la presunción de legalidad.", art: "Art. 3 Ley 19.880" },
          { texto: "Sí, si un abogado certifica por escrito su ilegalidad.", correcta: false, explicacion: "La ilegalidad debe declararse por el órgano competente, no por una certificación.", art: "Art. 3 Ley 19.880" },
        ],
      },
      {
        enunciado:
          "Un acto arbitrario e ilegal vulnera AHORA tu derecho de propiedad. Buscas tutela urgente. ¿Qué interpones?",
        articulo: "Art. 20 CPR",
        dano: 27,
        opciones: [
          { texto: "La acción de protección ante la Corte de Apelaciones.", correcta: true, explicacion: "Acción cautelar constitucional para restablecer el imperio del derecho de inmediato.", art: "20 CPR" },
          { texto: "El recurso de casación en el fondo.", correcta: false, explicacion: "La casación ataca sentencias por infracción de ley, no actos administrativos.", art: "767 CPC" },
          { texto: "Solo una reposición administrativa, y a esperar.", correcta: false, explicacion: "No da la tutela urgente que el caso exige.", art: "20 CPR" },
          { texto: "Una demanda ordinaria de lato conocimiento.", correcta: false, explicacion: "Demasiado lenta para una amenaza actual.", art: "20 CPR" },
        ],
      },
    ],
  },

  // ─── 6 · CASTILLO DE LA COMPETENCIA ───────────────────────────────────────
  {
    id: "tribunal_incompetente",
    region: "castillo_competencia",
    nombre: "El Tribunal Incompetente",
    arquetipo: "Estrado que juzga lo que no le toca",
    descripcion:
      "Un tribunal espectral que se arroga toda causa. Reordena sus salas para confundir materia, cuantía, fuero y territorio. Solo la competencia bien alegada lo destrona.",
    problemaJuridico: "Competencia absoluta y relativa, prórroga y cuestiones de competencia.",
    icono: "🏛️",
    hp: 4,
    vidaJugador: 110,
    recompensaArticuloId: "art_434_cpc",
    recompensaCristales: 55,
    ataques: [
      {
        enunciado: "Radicado el asunto ante un tribunal competente, sobreviene un cambio de domicilio del demandado. ¿Altera eso la competencia?",
        articulo: "Art. 109 COT",
        dano: 26,
        opciones: [
          { texto: "No: radicado el asunto, queda fijo (regla de la fijeza o radicación).", correcta: true, explicacion: "Art. 109 COT: radicado el negocio, no se altera por causa sobreviniente.", art: "109 COT" },
          { texto: "Sí: la competencia cambia en cualquier momento.", correcta: false, explicacion: "La radicación da estabilidad; no se altera por hechos posteriores.", art: "109 COT" },
          { texto: "Sí: el nuevo domicilio fija un nuevo tribunal.", correcta: false, explicacion: "El cambio sobreviniente no desplaza la competencia ya radicada.", art: "109 COT" },
          { texto: "Sí, pero solo con acuerdo de las partes.", correcta: false, explicacion: "Ni el acuerdo altera la radicación ya producida.", art: "109 COT" },
        ],
      },
      {
        enunciado: "Quieres reclamar la incompetencia del tribunal. ¿Cuáles son las DOS vías para promover la cuestión de competencia?",
        articulo: "Art. 101 CPC",
        dano: 26,
        opciones: [
          { texto: "La inhibitoria y la declinatoria.", correcta: true, explicacion: "Art. 101 CPC: inhibitoria (ante el que se cree competente) y declinatoria (ante el que conoce).", art: "101 CPC" },
          { texto: "La apelación y la casación.", correcta: false, explicacion: "Son recursos contra resoluciones, no vías para la cuestión de competencia.", art: "101 CPC" },
          { texto: "La reposición y el recurso de queja.", correcta: false, explicacion: "Ajenas a la promoción de la incompetencia.", art: "101 CPC" },
          { texto: "La protección y el amparo.", correcta: false, explicacion: "Son acciones constitucionales, no cuestiones de competencia.", art: "101 CPC" },
        ],
      },
      {
        enunciado:
          "¿Qué factores determinan la competencia ABSOLUTA de un tribunal?",
        articulo: "COT (competencia absoluta)",
        dano: 28,
        opciones: [
          { texto: "La materia, la cuantía y el fuero.", correcta: true, explicacion: "La competencia absoluta es de orden público; se fija por materia, cuantía y fuero.", art: "COT" },
          { texto: "Únicamente el territorio del tribunal.", correcta: false, explicacion: "El territorio determina la competencia RELATIVA.", art: "COT" },
          { texto: "El domicilio del abogado patrocinante.", correcta: false, explicacion: "Irrelevante para la competencia.", art: "COT" },
          { texto: "La nacionalidad de las partes en conflicto.", correcta: false, explicacion: "No es factor de competencia absoluta.", art: "COT" },
        ],
      },
      {
        enunciado:
          "Las partes pactaron someterse a los tribunales de Valparaíso. ¿Es válida esa PRÓRROGA de competencia?",
        articulo: "COT (prórroga)",
        dano: 27,
        opciones: [
          { texto: "Sí: la competencia relativa (territorial) admite prórroga entre partes capaces.", correcta: true, explicacion: "Solo se prorroga la competencia relativa; la absoluta es irrenunciable.", art: "COT" },
          { texto: "No: toda competencia es irrenunciable e improrrogable.", correcta: false, explicacion: "La relativa sí es prorrogable.", art: "COT" },
          { texto: "Sí, y también podría prorrogarse la competencia absoluta.", correcta: false, explicacion: "La absoluta NO se prorroga: es de orden público.", art: "COT" },
          { texto: "Solo si lo autoriza previamente la Contraloría.", correcta: false, explicacion: "La Contraloría no interviene en competencia judicial.", art: "COT" },
        ],
      },
      {
        enunciado:
          "Te demandaron ante un tribunal incompetente en razón de la MATERIA. ¿Cómo lo alegas antes de contestar el fondo?",
        articulo: "Art. 303 N°1 CPC",
        dano: 28,
        opciones: [
          { texto: "Como excepción dilatoria de incompetencia, por vía declinatoria.", correcta: true, explicacion: "Es la 1ª dilatoria (303 N°1): por declinatoria se pide al tribunal que se declare incompetente.", art: "303 N°1 CPC" },
          { texto: "Contestando el fondo, sin alegar nada más.", correcta: false, explicacion: "Puede importar prórroga tácita si fuese incompetencia relativa.", art: "303 CPC" },
          { texto: "Mediante un recurso de protección ante la Corte.", correcta: false, explicacion: "No es la vía: la incompetencia se alega en el propio proceso.", art: "303 CPC" },
          { texto: "Por un recurso de casación interpuesto de inmediato.", correcta: false, explicacion: "La casación supone sentencia; aquí recién comienza el juicio.", art: "303 CPC" },
        ],
      },
      {
        enunciado:
          "«Pacten lo que quieran: yo conoceré igual la causa penal.» ¿Puede prorrogarse la competencia ABSOLUTA?",
        articulo: "COT (orden público)",
        dano: 27,
        opciones: [
          { texto: "No: la competencia absoluta es de orden público e irrenunciable.", correcta: true, explicacion: "Materia, cuantía y fuero no se transan; solo la relativa se prorroga.", art: "COT" },
          { texto: "Sí, por acuerdo expreso de ambas partes.", correcta: false, explicacion: "Solo la relativa admite prórroga.", art: "COT" },
          { texto: "Sí, tácitamente, si nadie reclama a tiempo.", correcta: false, explicacion: "La prórroga tácita opera en la relativa, no en la absoluta.", art: "COT" },
          { texto: "Sí, otorgando el pacto ante notario público.", correcta: false, explicacion: "Ninguna solemnidad prorroga la competencia absoluta.", art: "COT" },
        ],
      },
    ],
  },

  // ─── 7 · TRIBUNAL SUPREMO FINAL ───────────────────────────────────────────
  {
    id: "guardian_cosa_juzgada",
    region: "tribunal_supremo",
    nombre: "El Guardián de la Cosa Juzgada",
    arquetipo: "Centinela de lo definitivamente resuelto",
    descripcion:
      "La última instancia hecha entidad. Exige coherencia perfecta entre civil, administrativo y procesal. Lo que resolvió, resuelto está: no hay recurso ulterior.",
    problemaJuridico: "Síntesis del grado: cosa juzgada, casación y dominio transversal de la materia.",
    icono: "👑",
    hp: 5,
    vidaJugador: 120,
    recompensaArticuloId: "art_177_cpc",
    recompensaCristales: 90,
    ataques: [
      {
        enunciado: "[CONST] Un precepto legal resultaría contrario a la Constitución en una gestión pendiente. ¿Qué órgano conoce la inaplicabilidad por inconstitucionalidad?",
        articulo: "Art. 93 N°6 CPR",
        dano: 22,
        opciones: [
          { texto: "El Tribunal Constitucional.", correcta: true, explicacion: "Art. 93 N°6 CPR: la inaplicabilidad por inconstitucionalidad radica en el TC.", art: "93 CPR" },
          { texto: "La Corte Suprema en pleno.", correcta: false, explicacion: "La inaplicabilidad hoy es del TC, no de la CS.", art: "93 CPR" },
          { texto: "La Contraloría General de la República.", correcta: false, explicacion: "Controla legalidad administrativa, no constitucionalidad de la ley.", art: "98 CPR" },
          { texto: "El tribunal de la gestión pendiente.", correcta: false, explicacion: "Debe elevar la cuestión al TC; no resuelve la inaplicabilidad.", art: "93 CPR" },
        ],
      },
      {
        enunciado: "[PROC] Tienes una sentencia firme a tu favor que el vencido no cumple. ¿Qué te permite la ACCIÓN de cosa juzgada?",
        articulo: "Art. 176 CPC",
        dano: 22,
        opciones: [
          { texto: "Exigir el cumplimiento de lo resuelto.", correcta: true, explicacion: "Art. 176: la acción de cosa juzgada permite pedir la ejecución de lo fallado.", art: "176 CPC" },
          { texto: "Impedir un nuevo juicio sobre lo resuelto.", correcta: false, explicacion: "Eso es la EXCEPCIÓN de cosa juzgada (177), no la acción.", art: "177 CPC" },
          { texto: "Anular la propia sentencia firme.", correcta: false, explicacion: "La cosa juzgada protege el fallo, no lo anula.", art: "176 CPC" },
          { texto: "Suspender indefinidamente su ejecución.", correcta: false, explicacion: "Es lo contrario: habilita la ejecución.", art: "176 CPC" },
        ],
      },
      {
        enunciado:
          "Vuelves a demandar lo ya fallado. ¿Qué excepción te fulmina y bajo qué requisitos?",
        articulo: "Art. 177 CPC",
        dano: 24,
        opciones: [
          { texto: "La cosa juzgada: identidad de personas, de cosa pedida y de causa de pedir.", correcta: true, explicacion: "Art. 177: la triple identidad es el corazón de la cosa juzgada.", art: "177 CPC" },
          { texto: "La litispendencia, aunque el juicio ya haya terminado.", correcta: false, explicacion: "La litispendencia exige juicio pendiente, no terminado.", art: "303 N°3 CPC" },
          { texto: "La prescripción extintiva de la acción.", correcta: false, explicacion: "No es el punto: ya hubo sentencia firme.", art: "177 CPC" },
          { texto: "La incompetencia sobreviniente del tribunal.", correcta: false, explicacion: "Irrelevante frente a un fallo firme idéntico.", art: "177 CPC" },
        ],
      },
      {
        enunciado:
          "[CIVIL] Heredero real contra quien ocupa la herencia como heredero aparente. ¿Qué acción procede?",
        articulo: "Art. 1264 CC",
        dano: 24,
        opciones: [
          { texto: "La petición de herencia, que coexiste con reivindicatorias de bienes singulares.", correcta: true, explicacion: "Universalidad → petición de herencia; cosas singulares → reivindicatoria.", art: "1264 CC" },
          { texto: "Solo la reivindicatoria sobre la universalidad.", correcta: false, explicacion: "La reivindicatoria es de cosa singular.", art: "889 CC" },
          { texto: "La nulidad del testamento, en todo caso.", correcta: false, explicacion: "No es el problema planteado.", art: "1264 CC" },
          { texto: "La acción de precario contra el ocupante.", correcta: false, explicacion: "Hay calidad de heredero invocada: vía 1264.", art: "1264 CC" },
        ],
      },
      {
        enunciado:
          "[CONTRATOS] El deudor cumplió la letra pero traicionó el fin del contrato. ¿Qué norma es decisiva?",
        articulo: "Art. 1546 CC",
        dano: 24,
        opciones: [
          { texto: "La buena fe, que integra el contrato más allá de su tenor literal.", correcta: true, explicacion: "Art. 1546: la buena fe obliga al fin práctico del contrato.", art: "1546 CC" },
          { texto: "La sola fuerza obligatoria del contrato escrito.", correcta: false, explicacion: "Fija la obligatoriedad, pero la integración la da el 1546.", art: "1546 CC" },
          { texto: "La responsabilidad extracontractual del deudor.", correcta: false, explicacion: "Hay contrato: no es sede aquiliana.", art: "2314 CC" },
          { texto: "Las reglas de la posesión y el dominio.", correcta: false, explicacion: "Ajenas al cumplimiento contractual.", art: "700 CC" },
        ],
      },
      {
        enunciado:
          "[ADMINISTRATIVO] Daño por funcionamiento anormal de un servicio, sin culpable individualizado. ¿Cuál es el título de imputación?",
        articulo: "Art. 42 LOC 18.575",
        dano: 24,
        opciones: [
          { texto: "La falta de servicio.", correcta: true, explicacion: "No requiere identificar al funcionario; basta el funcionamiento anormal o tardío.", art: "42 LOC 18.575" },
          { texto: "El dolo del jefe del servicio público.", correcta: false, explicacion: "No se exige dolo personal.", art: "42 LOC 18.575" },
          { texto: "El caso fortuito que exonera de responsabilidad.", correcta: false, explicacion: "El caso fortuito exonera, no fundamenta responsabilidad.", art: "45 CC" },
          { texto: "La responsabilidad penal del propio Estado.", correcta: false, explicacion: "El Estado no tiene responsabilidad penal; aquí es patrimonial.", art: "42 LOC 18.575" },
        ],
      },
      {
        enunciado:
          "[PROCESAL] Sentencia de Corte de Apelaciones, inapelable, con infracción de ley que influyó en lo dispositivo. ¿Qué recurso procede?",
        articulo: "Art. 767 CPC",
        dano: 24,
        opciones: [
          { texto: "La casación en el fondo.", correcta: true, explicacion: "Art. 767: infracción de ley decisoria litis que influye en lo dispositivo.", art: "767 CPC" },
          { texto: "La apelación ante el tribunal superior jerárquico.", correcta: false, explicacion: "La sentencia es inapelable.", art: "186 CPC" },
          { texto: "El recurso de protección constitucional.", correcta: false, explicacion: "No procede contra sentencias por infracción de ley.", art: "20 CPR" },
          { texto: "El recurso de queja, por la sola disconformidad.", correcta: false, explicacion: "La queja exige falta o abuso grave, no mera infracción de ley.", art: "545 COT" },
        ],
      },
    ],
  },
];

export function getBoss(id: string): BossReino | undefined {
  return BOSSES.find((b) => b.id === id);
}

export function bossDeRegion(region: RegionId): BossReino | undefined {
  return BOSSES.find((b) => b.region === region);
}
