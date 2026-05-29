import type { BossReino, RegionId } from "@/types/reinos";

// ============================================================================
// REINOS DEL DERECHO — Bosses temáticos
// ----------------------------------------------------------------------------
// Un jefe por región. Cada uno encarna un problema jurídico real. El duelo es
// un intercambio: cada ataque es una pregunta-trampa; acertar le quita HP,
// fallar te quita vida. Vencerlo suelta un artículo legendario.
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
        enunciado:
          "«Te exijo el pago. Y digo que NUNCA pagaste.» En el juicio, ¿sobre quién pesa probar que la obligación SE EXTINGUIÓ por pago?",
        articulo: "Art. 1698 CC",
        dano: 34,
        opciones: [
          { texto: "Sobre el deudor que alega el pago (la extinción).", correcta: true, explicacion: "Art. 1698: incumbe probar la extinción al que la alega. El deudor que opone el pago debe acreditarlo.", art: "1698 CC" },
          { texto: "Sobre el acreedor, que debe probar que no le pagaron.", correcta: false, explicacion: "Inversión incorrecta: el acreedor prueba la existencia de la obligación; el deudor, su extinción.", art: "1698 CC" },
          { texto: "Sobre el juez, que investiga de oficio.", correcta: false, explicacion: "Rige el principio dispositivo en lo civil; el juez no prueba por las partes.", art: "1698 CC" },
          { texto: "No es necesario probar: el pago se presume.", correcta: false, explicacion: "El pago no se presume; debe acreditarse por quien lo invoca.", art: "1698 CC" },
        ],
      },
      {
        enunciado:
          "«Incumplí, sí, pero solo en parte.» En un CONTRATO BILATERAL, ¿qué puede pedir el contratante diligente?",
        articulo: "Art. 1489 CC",
        dano: 33,
        opciones: [
          { texto: "A su arbitrio, la resolución O el cumplimiento, en ambos casos con indemnización.", correcta: true, explicacion: "Art. 1489: condición resolutoria tácita. Opción del acreedor entre resolver o cumplir, con indemnización de perjuicios.", art: "1489 CC" },
          { texto: "Solo el cumplimiento forzado; jamás la resolución.", correcta: false, explicacion: "Puede optar también por la resolución.", art: "1489 CC" },
          { texto: "Solo la resolución, y sin indemnización.", correcta: false, explicacion: "La indemnización procede en ambas vías.", art: "1489 CC" },
          { texto: "La nulidad absoluta del contrato.", correcta: false, explicacion: "El incumplimiento no es causal de nulidad; es presupuesto de resolución.", art: "1489 CC" },
        ],
      },
      {
        enunciado:
          "«Mi crédito ordinario nació en 2015 y jamás lo cobré.» Hoy te demanda. ¿Qué le opones?",
        articulo: "Art. 2515 CC",
        dano: 33,
        opciones: [
          { texto: "Prescripción extintiva: la acción ordinaria prescribe en 5 años.", correcta: true, explicacion: "Art. 2515: 5 años para acciones ordinarias contados desde que la obligación se hizo exigible.", art: "2515 CC" },
          { texto: "Caducidad de 6 meses por abandono.", correcta: false, explicacion: "El abandono del procedimiento (152 CPC) es procesal y distinto a la prescripción sustantiva.", art: "2515 CC" },
          { texto: "Pago, aunque no exista recibo.", correcta: false, explicacion: "No alegaste pago ni lo pruebas (1698).", art: "1698 CC" },
          { texto: "Cosa juzgada, sin juicio previo.", correcta: false, explicacion: "No hubo fallo anterior: falta la triple identidad del 177 CPC.", art: "177 CPC" },
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
      "Sonríe mostrando contratos impecables. Cumple cada cláusula al pie… y vacía de sentido cada acuerdo. El 1546 es su perdición.",
    problemaJuridico: "Fuerza obligatoria del contrato y ejecución de buena fe.",
    icono: "⚖",
    hp: 3,
    vidaJugador: 100,
    recompensaArticuloId: "art_1546_cc",
    recompensaCristales: 45,
    ataques: [
      {
        enunciado:
          "«Cumplí EXACTAMENTE lo escrito, aunque sabía que así frustraba el fin del contrato.» ¿Qué norma te permite condenarme?",
        articulo: "Art. 1546 CC",
        dano: 34,
        opciones: [
          { texto: "Art. 1546: los contratos se ejecutan de buena fe y obligan a lo que emana de su naturaleza.", correcta: true, explicacion: "La buena fe integra el contrato más allá de su tenor literal.", art: "1546 CC" },
          { texto: "Art. 1545 únicamente: solo obliga lo expresamente pactado.", correcta: false, explicacion: "El 1545 fija la fuerza obligatoria, pero el 1546 amplía el contenido por buena fe.", art: "1546 CC" },
          { texto: "Art. 1437: fuentes de las obligaciones.", correcta: false, explicacion: "Define fuentes; no resuelve el cumplimiento de mala fe.", art: "1437 CC" },
          { texto: "Ninguna: si cumplí la letra, cumplí.", correcta: false, explicacion: "Falso: la buena fe del 1546 obliga al fin práctico del contrato.", art: "1546 CC" },
        ],
      },
      {
        enunciado:
          "«El contrato NADA dice sobre entregarte los manuales del equipo vendido.» ¿Estoy obligado a entregarlos?",
        articulo: "Art. 1546 CC",
        dano: 33,
        opciones: [
          { texto: "Sí: por la naturaleza de la obligación y la costumbre (1546), aunque no se exprese.", correcta: true, explicacion: "El 1546 incorpora lo que emana de la naturaleza del contrato y de la costumbre.", art: "1546 CC" },
          { texto: "No: solo obliga lo literalmente escrito.", correcta: false, explicacion: "Lectura literalista que el 1546 descarta.", art: "1546 CC" },
          { texto: "Solo si se pactó una cláusula expresa.", correcta: false, explicacion: "La buena fe no requiere cláusula expresa.", art: "1546 CC" },
          { texto: "Lo decide discrecionalmente el juez sin norma.", correcta: false, explicacion: "Hay norma: el 1546.", art: "1546 CC" },
        ],
      },
      {
        enunciado:
          "«Ya no me conviene el trato: lo dejo sin efecto cuando quiera.» ¿Puedes invalidar unilateralmente el contrato?",
        articulo: "Art. 1545 CC",
        dano: 33,
        opciones: [
          { texto: "No: art. 1545, solo por consentimiento mutuo o causas legales.", correcta: true, explicacion: "El contrato es ley para las partes; no se deshace por voluntad unilateral.", art: "1545 CC" },
          { texto: "Sí, en virtud de la autonomía de la voluntad.", correcta: false, explicacion: "La autonomía crea el vínculo, no autoriza romperlo unilateralmente.", art: "1545 CC" },
          { texto: "Sí, siempre que indemnice.", correcta: false, explicacion: "La indemnización no habilita el desistimiento unilateral fuera de la ley o el pacto.", art: "1545 CC" },
          { texto: "Sí, por simple caso fortuito sobreviniente.", correcta: false, explicacion: "El caso fortuito tiene reglas propias; no es desistimiento libre.", art: "1545 CC" },
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
        enunciado:
          "«Tengo la cosa con ánimo de dueño.» Mientras no pruebes lo contrario, ¿qué se me reputa?",
        articulo: "Art. 700 CC",
        dano: 33,
        opciones: [
          { texto: "Dueño: el poseedor es reputado dueño mientras otro no justifique serlo (700 inc. 2°).", correcta: true, explicacion: "La posesión hace presumir el dominio; el demandante carga con probar el suyo.", art: "700 CC" },
          { texto: "Mero tenedor que reconoce dominio ajeno.", correcta: false, explicacion: "El mero tenedor carece de ánimo de dueño; aquí hay posesión.", art: "714 CC" },
          { texto: "Usufructuario.", correcta: false, explicacion: "No hay derecho real de usufructo constituido.", art: "700 CC" },
          { texto: "Nada: la posesión no produce efectos.", correcta: false, explicacion: "La posesión produce la presunción de dominio del 700.", art: "700 CC" },
        ],
      },
      {
        enunciado:
          "Eres DUEÑO pero NO posees: yo detento la cosa. ¿Qué acción ejerces para recuperarla?",
        articulo: "Art. 889 CC",
        dano: 34,
        opciones: [
          { texto: "Acción reivindicatoria o de dominio (889): el dueño no poseedor contra el poseedor.", correcta: true, explicacion: "Definición exacta del 889: dueño de cosa singular que no posee, contra el poseedor.", art: "889 CC" },
          { texto: "Acción de petición de herencia.", correcta: false, explicacion: "Esa protege al heredero, no al dueño de una cosa singular.", art: "1264 CC" },
          { texto: "Querella de restablecimiento, sin más.", correcta: false, explicacion: "Las posesorias amparan la posesión, no el dominio que aquí se reclama.", art: "889 CC" },
          { texto: "Acción de precario, siempre.", correcta: false, explicacion: "El precario (2195 inc. 2°) tiene supuesto propio; la vía típica del dueño es la reivindicatoria.", art: "889 CC" },
        ],
      },
      {
        enunciado:
          "«Adquirí por TRADICIÓN de quien NO era dueño.» ¿Qué efecto produce esa tradición?",
        articulo: "Art. 670 / 682 CC",
        dano: 33,
        opciones: [
          { texto: "No transfiere dominio (nadie da más derechos que los que tiene), pero deja al adquirente como poseedor que puede ganar por prescripción.", correcta: true, explicacion: "La tradición del no dueño no transfiere el dominio, mas habilita la posesión y la prescripción adquisitiva.", art: "682 CC" },
          { texto: "Transfiere igualmente el dominio pleno.", correcta: false, explicacion: "Nadie transfiere lo que no tiene.", art: "682 CC" },
          { texto: "Es nula de nulidad absoluta y no produce efecto alguno.", correcta: false, explicacion: "No es nula: produce posesión, base de la prescripción.", art: "670 CC" },
          { texto: "El art. 670 me garantiza el dominio en todo caso.", correcta: false, explicacion: "El 670 exige que el tradente sea dueño para transferir dominio.", art: "670 CC" },
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
        enunciado:
          "«Ocupo la herencia en calidad de heredero, aunque el verdadero heredero eres tú.» ¿Qué acción ejerces contra mí?",
        articulo: "Art. 1264 CC",
        dano: 34,
        opciones: [
          { texto: "Acción de petición de herencia (1264): protege al heredero real contra el poseedor aparente.", correcta: true, explicacion: "Recae sobre la universalidad hereditaria ocupada por quien se dice heredero.", art: "1264 CC" },
          { texto: "Acción reivindicatoria sobre la universalidad.", correcta: false, explicacion: "La reivindicatoria es para cosas singulares; la universalidad se reclama por petición de herencia (puede coexistir con reivindicatorias de bienes singulares).", art: "889 CC" },
          { texto: "Nulidad del testamento, siempre.", correcta: false, explicacion: "El problema no es la validez del testamento, sino la ocupación por el falso heredero.", art: "1264 CC" },
          { texto: "Acción de precario.", correcta: false, explicacion: "No es la vía: hay calidad de heredero invocada.", art: "1264 CC" },
        ],
      },
      {
        enunciado:
          "El causante DONÓ en vida a un legitimario. Para calcular las legítimas, ¿qué debe hacerse?",
        articulo: "Art. 1185 CC",
        dano: 33,
        opciones: [
          { texto: "Acumular imaginariamente las donaciones al acervo (acervo imaginario / colación).", correcta: true, explicacion: "Art. 1185: se acumulan imaginariamente las donaciones para computar las cuartas e igualar legitimarios.", art: "1185 CC" },
          { texto: "Ignorar las donaciones: ya salieron del patrimonio.", correcta: false, explicacion: "Precisamente se reincorporan de modo imaginario para el cálculo.", art: "1185 CC" },
          { texto: "Restarlas del haber del resto de herederos.", correcta: false, explicacion: "No se restan a otros: se imputan a la legítima del donatario.", art: "1185 CC" },
          { texto: "Nada: las legítimas no se ven afectadas por donaciones.", correcta: false, explicacion: "Sí se afectan; por eso existe la colación.", art: "1185 CC" },
        ],
      },
      {
        enunciado:
          "El testador desheredó a su hijo SIN causa legal y dispuso de todo a un extraño. ¿Es eficaz?",
        articulo: "Art. 1167 CC",
        dano: 33,
        opciones: [
          { texto: "No: la legítima es asignación forzosa; se suple aun contra las disposiciones testamentarias.", correcta: true, explicacion: "Art. 1167: las asignaciones forzosas (incluida la legítima) se imponen incluso contra el testamento.", art: "1167 CC" },
          { texto: "Sí: rige la libre disposición absoluta del testador.", correcta: false, explicacion: "La libertad de testar está limitada por las asignaciones forzosas.", art: "1167 CC" },
          { texto: "Sí, si deja al menos la cuarta de libre disposición al hijo.", correcta: false, explicacion: "La cuarta de libre disposición es del testador; al hijo le corresponde su legítima.", art: "1167 CC" },
          { texto: "Solo es válido ante notario.", correcta: false, explicacion: "La forma no salva la infracción de la legítima.", art: "1167 CC" },
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
        enunciado:
          "Un hospital público te dañó por una organización deficiente del servicio (sin individualizar al culpable). ¿Cuál es el fundamento de la responsabilidad del Estado?",
        articulo: "Art. 42 LOC 18.575",
        dano: 28,
        opciones: [
          { texto: "La falta de servicio (arts. 4 y 42 LOC 18.575).", correcta: true, explicacion: "La responsabilidad por falta de servicio no exige identificar al funcionario; basta el funcionamiento anormal o tardío del servicio.", art: "42 LOC 18.575" },
          { texto: "El dolo personal del Presidente de la República.", correcta: false, explicacion: "No se requiere dolo de una autoridad; el título es la falta de servicio.", art: "42 LOC 18.575" },
          { texto: "Responsabilidad objetiva absoluta por todo daño.", correcta: false, explicacion: "El estándar dominante es la falta de servicio, no la mera causalidad.", art: "42 LOC 18.575" },
          { texto: "Solo el art. 2314 CC (cuasidelito civil común).", correcta: false, explicacion: "El régimen administrativo se rige por la falta de servicio, no por el solo 2314.", art: "42 LOC 18.575" },
        ],
      },
      {
        enunciado:
          "Presentaste una solicitud y la Administración NO resolvió dentro de plazo. ¿Qué institución opera?",
        articulo: "Ley 19.880 (silencio)",
        dano: 27,
        opciones: [
          { texto: "El silencio administrativo (positivo o negativo, según la Ley 19.880).", correcta: true, explicacion: "Ante la inactividad, la ley fija efectos: silencio positivo (regla) o negativo (excepciones del art. 65).", art: "Ley 19.880" },
          { texto: "Se entiende siempre rechazada, sin excepción.", correcta: false, explicacion: "El silencio positivo es la regla general; el negativo, excepción.", art: "Ley 19.880" },
          { texto: "Hay que esperar indefinidamente una respuesta.", correcta: false, explicacion: "La ley impide la inactividad eterna mediante el silencio.", art: "Ley 19.880" },
          { texto: "Opera la nulidad de pleno derecho del acto.", correcta: false, explicacion: "No hay acto que anular: hay ausencia de decisión, suplida por el silencio.", art: "Ley 19.880" },
        ],
      },
      {
        enunciado:
          "«He dictado un acto. Tú lo crees ilegal.» ¿Puedes simplemente desobedecerlo?",
        articulo: "Art. 3 Ley 19.880",
        dano: 28,
        opciones: [
          { texto: "No: el acto goza de presunción de legalidad, imperio y exigibilidad; hay que impugnarlo.", correcta: true, explicacion: "Art. 3 inc. final Ley 19.880. La ilegalidad debe declararse; no cabe autotutela del administrado.", art: "Art. 3 Ley 19.880" },
          { texto: "Sí, mediante autotutela del administrado.", correcta: false, explicacion: "La autotutela es de la Administración, no del particular.", art: "Art. 3 Ley 19.880" },
          { texto: "Sí, basta con creerlo arbitrario.", correcta: false, explicacion: "La convicción subjetiva no enerva la presunción de legalidad.", art: "Art. 3 Ley 19.880" },
          { texto: "Sí, pero solo los fines de semana.", correcta: false, explicacion: "Distractor: la exigibilidad no admite pausas.", art: "Art. 3 Ley 19.880" },
        ],
      },
      {
        enunciado:
          "Un acto arbitrario e ilegal vulnera AHORA tu derecho de propiedad. Buscas tutela URGENTE. ¿Qué interpones?",
        articulo: "Art. 20 CPR",
        dano: 27,
        opciones: [
          { texto: "Recurso (acción) de protección ante la Corte de Apelaciones (art. 20 CPR).", correcta: true, explicacion: "Acción cautelar constitucional para restablecer el imperio del derecho de inmediato.", art: "20 CPR" },
          { texto: "Recurso de casación en el fondo.", correcta: false, explicacion: "La casación ataca sentencias por infracción de ley, no actos administrativos.", art: "767 CPC" },
          { texto: "Solo reposición administrativa, y a esperar.", correcta: false, explicacion: "No da la tutela urgente que el caso exige.", art: "20 CPR" },
          { texto: "Demanda ordinaria de lato conocimiento.", correcta: false, explicacion: "Demasiado lenta para una amenaza actual; procede la protección.", art: "20 CPR" },
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
        enunciado:
          "¿Qué factores determinan la competencia ABSOLUTA de un tribunal?",
        articulo: "COT (competencia absoluta)",
        dano: 28,
        opciones: [
          { texto: "Materia, cuantía y fuero.", correcta: true, explicacion: "La competencia absoluta se fija por materia, cuantía y fuero; es de orden público.", art: "COT" },
          { texto: "Solo el territorio.", correcta: false, explicacion: "El territorio determina la competencia RELATIVA.", art: "COT" },
          { texto: "El domicilio del abogado.", correcta: false, explicacion: "Irrelevante para la competencia.", art: "COT" },
          { texto: "La nacionalidad de las partes.", correcta: false, explicacion: "No es factor de competencia absoluta.", art: "COT" },
        ],
      },
      {
        enunciado:
          "Las partes pactaron someterse a los tribunales de Valparaíso. ¿Es válida esa PRÓRROGA de competencia?",
        articulo: "COT (prórroga)",
        dano: 27,
        opciones: [
          { texto: "Sí: la competencia relativa (territorial), en asuntos contenciosos civiles entre partes capaces y en 1ª instancia, admite prórroga.", correcta: true, explicacion: "Solo se prorroga la competencia relativa; la absoluta es irrenunciable.", art: "COT" },
          { texto: "No: toda competencia es irrenunciable.", correcta: false, explicacion: "La relativa sí es prorrogable.", art: "COT" },
          { texto: "Sí, y también puede prorrogarse la competencia absoluta.", correcta: false, explicacion: "La absoluta NO se prorroga: es de orden público.", art: "COT" },
          { texto: "Solo si lo autoriza la Contraloría.", correcta: false, explicacion: "La Contraloría no interviene en competencia judicial.", art: "COT" },
        ],
      },
      {
        enunciado:
          "Te demandaron ante un tribunal incompetente en razón de la MATERIA. ¿Cómo lo alegas antes de contestar el fondo?",
        articulo: "Art. 303 N°1 CPC",
        dano: 28,
        opciones: [
          { texto: "Como excepción dilatoria de incompetencia (303 N°1) — vía declinatoria.", correcta: true, explicacion: "La incompetencia es la 1ª excepción dilatoria; por declinatoria se pide al tribunal que conoce que se declare incompetente.", art: "303 N°1 CPC" },
          { texto: "Contestando el fondo, sin alegar nada más.", correcta: false, explicacion: "Contestar el fondo ante tribunal relativamente incompetente puede importar prórroga tácita.", art: "303 CPC" },
          { texto: "Mediante recurso de protección.", correcta: false, explicacion: "No es la vía; la incompetencia se alega en el propio proceso.", art: "303 CPC" },
          { texto: "Por recurso de casación de inmediato.", correcta: false, explicacion: "La casación supone sentencia; aquí recién comienza el juicio.", art: "303 CPC" },
        ],
      },
      {
        enunciado:
          "«Pacten lo que quieran: yo conoceré igual la causa penal y la de familia.» ¿Puede prorrogarse la competencia ABSOLUTA?",
        articulo: "COT (orden público)",
        dano: 27,
        opciones: [
          { texto: "No: la competencia absoluta es de orden público e irrenunciable.", correcta: true, explicacion: "Materia, cuantía y fuero no se transan; solo la relativa (territorio) se prorroga.", art: "COT" },
          { texto: "Sí, por acuerdo expreso de las partes.", correcta: false, explicacion: "Solo la relativa admite prórroga.", art: "COT" },
          { texto: "Sí, tácitamente, si nadie reclama.", correcta: false, explicacion: "La prórroga tácita opera en la relativa, no en la absoluta.", art: "COT" },
          { texto: "Sí, ante notario público.", correcta: false, explicacion: "Ninguna solemnidad prorroga la competencia absoluta.", art: "COT" },
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
        enunciado:
          "Vuelves a demandar lo ya fallado. ¿Qué excepción te fulmina y bajo qué requisitos?",
        articulo: "Art. 177 CPC",
        dano: 24,
        opciones: [
          { texto: "Cosa juzgada: triple identidad — legal de personas, de la cosa pedida y de la causa de pedir.", correcta: true, explicacion: "Art. 177: la triple identidad es el corazón de la cosa juzgada.", art: "177 CPC" },
          { texto: "Litispendencia, aunque el juicio ya terminó.", correcta: false, explicacion: "La litispendencia exige juicio pendiente, no terminado.", art: "303 N°3 CPC" },
          { texto: "Prescripción de la acción.", correcta: false, explicacion: "No es el punto: ya hubo sentencia firme.", art: "177 CPC" },
          { texto: "Incompetencia sobreviniente.", correcta: false, explicacion: "Irrelevante frente a un fallo firme idéntico.", art: "177 CPC" },
        ],
      },
      {
        enunciado:
          "[CIVIL] Heredero real contra quien ocupa la herencia como heredero aparente. ¿Acción?",
        articulo: "Art. 1264 CC",
        dano: 24,
        opciones: [
          { texto: "Petición de herencia (1264), que puede coexistir con reivindicatorias de bienes singulares.", correcta: true, explicacion: "Universalidad → petición de herencia; cosas singulares → reivindicatoria.", art: "1264 CC" },
          { texto: "Solo reivindicatoria de la universalidad.", correcta: false, explicacion: "La reivindicatoria es de cosa singular.", art: "889 CC" },
          { texto: "Nulidad del testamento, siempre.", correcta: false, explicacion: "No es el problema planteado.", art: "1264 CC" },
          { texto: "Precario.", correcta: false, explicacion: "Hay calidad de heredero invocada: vía 1264.", art: "1264 CC" },
        ],
      },
      {
        enunciado:
          "[CONTRATOS] El deudor cumplió la letra pero traicionó el fin del contrato. ¿Norma decisiva?",
        articulo: "Art. 1546 CC",
        dano: 24,
        opciones: [
          { texto: "Art. 1546: ejecución de buena fe, que integra el contrato.", correcta: true, explicacion: "La buena fe obliga más allá del tenor literal.", art: "1546 CC" },
          { texto: "Art. 1545 solamente.", correcta: false, explicacion: "Fija la fuerza obligatoria, pero la integración la da el 1546.", art: "1546 CC" },
          { texto: "Art. 2314.", correcta: false, explicacion: "Es responsabilidad extracontractual.", art: "2314 CC" },
          { texto: "Art. 700.", correcta: false, explicacion: "Es posesión: ajeno al caso.", art: "700 CC" },
        ],
      },
      {
        enunciado:
          "[ADMINISTRATIVO] Daño por funcionamiento anormal de un servicio público, sin culpable individualizado. ¿Título de imputación?",
        articulo: "Art. 42 LOC 18.575",
        dano: 24,
        opciones: [
          { texto: "Falta de servicio.", correcta: true, explicacion: "No requiere identificar al funcionario; basta el funcionamiento anormal o tardío.", art: "42 LOC 18.575" },
          { texto: "Dolo del jefe de servicio.", correcta: false, explicacion: "No se exige dolo personal.", art: "42 LOC 18.575" },
          { texto: "Caso fortuito.", correcta: false, explicacion: "El caso fortuito exonera, no fundamenta responsabilidad.", art: "45 CC" },
          { texto: "Responsabilidad penal del Estado.", correcta: false, explicacion: "El Estado no tiene responsabilidad penal; aquí es patrimonial.", art: "42 LOC 18.575" },
        ],
      },
      {
        enunciado:
          "[PROCESAL] Sentencia de Corte de Apelaciones, inapelable, dictada con infracción de ley que influyó sustancialmente en lo dispositivo. ¿Recurso?",
        articulo: "Art. 767 CPC",
        dano: 24,
        opciones: [
          { texto: "Casación en el fondo (767): infracción de ley decisoria litis que influye en lo dispositivo.", correcta: true, explicacion: "Requisitos típicos de la casación en el fondo.", art: "767 CPC" },
          { texto: "Apelación.", correcta: false, explicacion: "La sentencia es inapelable.", art: "767 CPC" },
          { texto: "Recurso de protección.", correcta: false, explicacion: "No procede contra sentencias por infracción de ley.", art: "20 CPR" },
          { texto: "Recurso de queja, por la sola disconformidad.", correcta: false, explicacion: "La queja exige falta o abuso grave, no mera infracción de ley.", art: "545 COT" },
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
