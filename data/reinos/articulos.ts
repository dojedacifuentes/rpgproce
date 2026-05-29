import type { ArticuloLegendario, RegionId } from "@/types/reinos";

// ============================================================================
// REINOS DEL DERECHO — Artículos Legendarios (coleccionables)
// ----------------------------------------------------------------------------
// Se desbloquean al superar desafíos y derrotar bosses, y se acumulan en la
// Biblioteca del Litigante. Textos fieles (a veces resumidos con "…") al CC,
// CPC, COT y CPR chilenos. El "efecto" es sabor de RPG, no toca el juego base.
// ============================================================================

export const ARTICULOS: ArticuloLegendario[] = [
  // ─── BOSQUE DE LAS OBLIGACIONES ──────────────────────────────────────────
  {
    id: "art_1437_cc",
    numero: "1437",
    codigo: "CC",
    etiqueta: "Art. 1437 CC",
    titulo: "Las Cinco Fuentes",
    texto:
      "Las obligaciones nacen, ya del concurso real de las voluntades de dos o más personas, como en los contratos; ya de un hecho voluntario de la persona que se obliga, como en los cuasicontratos; ya a consecuencia de un hecho que ha inferido injuria o daño a otra persona, como en los delitos y cuasidelitos; ya por disposición de la ley.",
    efecto: "Revela el origen de todo vínculo. +Claridad ante enemigos de las obligaciones.",
    rareza: "epica",
    region: "bosque_obligaciones",
    icono: "🌿",
  },
  {
    id: "art_1698_cc",
    numero: "1698",
    codigo: "CC",
    etiqueta: "Art. 1698 CC",
    titulo: "La Carga de la Prueba",
    texto:
      "Incumbe probar las obligaciones o su extinción al que alega aquéllas o ésta. Las pruebas consisten en instrumentos, testigos, presunciones, confesión de parte, juramento deferido e inspección personal del juez.",
    efecto: "Quien la porta sabe siempre sobre quién pesa probar. Escudo contra la duda.",
    rareza: "legendaria",
    region: "bosque_obligaciones",
    icono: "⚖",
  },
  {
    id: "art_2314_cc",
    numero: "2314",
    codigo: "CC",
    etiqueta: "Art. 2314 CC",
    titulo: "El Daño que Repara",
    texto:
      "El que ha cometido un delito o cuasidelito que ha inferido daño a otro, es obligado a la indemnización; sin perjuicio de la pena que le impongan las leyes por el delito o cuasidelito.",
    efecto: "Invoca la responsabilidad extracontractual. Convierte el daño en deuda.",
    rareza: "epica",
    region: "bosque_obligaciones",
    icono: "🔥",
  },

  // ─── CIUDAD MERCANTIL DE LOS CONTRATOS ───────────────────────────────────
  {
    id: "art_1545_cc",
    numero: "1545",
    codigo: "CC",
    etiqueta: "Art. 1545 CC",
    titulo: "Ley del Contrato",
    texto:
      "Todo contrato legalmente celebrado es una ley para los contratantes, y no puede ser invalidado sino por su consentimiento mutuo o por causas legales.",
    efecto: "El pacta sunt servanda hecho reliquia. Sella la palabra dada como ley.",
    rareza: "legendaria",
    region: "ciudad_mercantil",
    icono: "📜",
  },
  {
    id: "art_1546_cc",
    numero: "1546",
    codigo: "CC",
    etiqueta: "Art. 1546 CC",
    titulo: "El Sello de la Buena Fe",
    texto:
      "Los contratos deben ejecutarse de buena fe, y por consiguiente obligan no sólo a lo que en ellos se expresa, sino a todas las cosas que emanan precisamente de la naturaleza de la obligación, o que por la ley o la costumbre pertenecen a ella.",
    efecto: "Desenmascara al Mercader de la Mala Fe. Extiende la obligación más allá de lo escrito.",
    rareza: "legendaria",
    region: "ciudad_mercantil",
    icono: "🤝",
  },
  {
    id: "art_1489_cc",
    numero: "1489",
    codigo: "CC",
    etiqueta: "Art. 1489 CC",
    titulo: "La Condición Resolutoria Tácita",
    texto:
      "En los contratos bilaterales va envuelta la condición resolutoria de no cumplirse por uno de los contratantes lo pactado. Pero en tal caso podrá el otro contratante pedir a su arbitrio o la resolución o el cumplimiento del contrato, con indemnización de perjuicios.",
    efecto: "Otorga el doble filo: resolver o exigir. Siempre con indemnización.",
    rareza: "epica",
    region: "ciudad_mercantil",
    icono: "⚔",
  },

  // ─── TIERRAS DE LA POSESIÓN Y EL DOMINIO ─────────────────────────────────
  {
    id: "art_670_cc",
    numero: "670",
    codigo: "CC",
    etiqueta: "Art. 670 CC",
    titulo: "La Tradición",
    texto:
      "La tradición es un modo de adquirir el dominio de las cosas y consiste en la entrega que el dueño hace de ellas a otro, habiendo por una parte la facultad e intención de transferir el dominio, y por otra la capacidad e intención de adquirirlo. Lo que se dice del dominio se extiende a todos los otros derechos reales.",
    efecto: "Transfiere el dominio con la entrega. Modo de adquirir derivativo.",
    rareza: "legendaria",
    region: "tierras_posesion",
    icono: "🗝️",
  },
  {
    id: "art_700_cc",
    numero: "700",
    codigo: "CC",
    etiqueta: "Art. 700 CC",
    titulo: "El Poseedor Reputado Dueño",
    texto:
      "La posesión es la tenencia de una cosa determinada con ánimo de señor o dueño… El poseedor es reputado dueño, mientras otra persona no justifica serlo.",
    efecto: "Presume dueño a quien tiene con ánimo de tal. Invierte la carga sobre el demandante.",
    rareza: "legendaria",
    region: "tierras_posesion",
    icono: "🏷️",
  },
  {
    id: "art_889_cc",
    numero: "889",
    codigo: "CC",
    etiqueta: "Art. 889 CC",
    titulo: "La Acción Reivindicatoria",
    texto:
      "La reivindicación o acción de dominio es la que tiene el dueño de una cosa singular, de que no está en posesión, para que el poseedor de ella sea condenado a restituírsela.",
    efecto: "Persigue la cosa de manos del poseedor. El dueño no posee, pero reclama.",
    rareza: "epica",
    region: "tierras_posesion",
    icono: "🎯",
  },
  {
    id: "art_2492_cc",
    numero: "2492",
    codigo: "CC",
    etiqueta: "Art. 2492 CC",
    titulo: "La Prescripción",
    texto:
      "La prescripción es un modo de adquirir las cosas ajenas, o de extinguir las acciones y derechos ajenos, por haberse poseído las cosas o no haberse ejercido dichas acciones y derechos durante cierto lapso de tiempo, y concurriendo los demás requisitos legales.",
    efecto: "El tiempo hecho derecho. Adquiere lo poseído; extingue lo no ejercido.",
    rareza: "epica",
    region: "tierras_posesion",
    icono: "⏳",
  },

  // ─── MANSIÓN SUCESORIA ────────────────────────────────────────────────────
  {
    id: "art_1264_cc",
    numero: "1264",
    codigo: "CC",
    etiqueta: "Art. 1264 CC",
    titulo: "Petición de Herencia",
    texto:
      "El que probare su derecho a una herencia, ocupada por otra persona en calidad de heredero, tendrá acción para que se le adjudique la herencia, y se le restituyan las cosas hereditarias, tanto corporales como incorporales.",
    efecto: "Protege al heredero real contra el poseedor aparente. Recupera la universalidad.",
    rareza: "legendaria",
    region: "mansion_sucesoria",
    icono: "👻",
  },
  {
    id: "art_1167_cc",
    numero: "1167",
    codigo: "CC",
    etiqueta: "Art. 1167 CC",
    titulo: "Las Asignaciones Forzosas",
    texto:
      "Asignaciones forzosas son las que el testador es obligado a hacer, y que se suplen cuando no las ha hecho, aun con perjuicio de sus disposiciones testamentarias expresas. Son: 1º los alimentos que se deben por ley; 2º las legítimas; 3º la cuarta de mejoras en la sucesión de los descendientes, ascendientes y cónyuge.",
    efecto: "Limita la voluntad del testador. Protege a los legitimarios incluso contra su deseo.",
    rareza: "epica",
    region: "mansion_sucesoria",
    icono: "📿",
  },
  {
    id: "art_1185_cc",
    numero: "1185",
    codigo: "CC",
    etiqueta: "Art. 1185 CC",
    titulo: "El Acervo Imaginario",
    texto:
      "Para computar las cuartas se acumularán imaginariamente al acervo líquido todas las donaciones revocables e irrevocables, hechas en razón de legítimas o de mejoras… La colación busca igualar a los legitimarios.",
    efecto: "Reconstruye el patrimonio como si nada se hubiera donado. Iguala a los legitimarios.",
    rareza: "rara",
    region: "mansion_sucesoria",
    icono: "⚱️",
  },

  // ─── REPÚBLICA ADMINISTRATIVA ─────────────────────────────────────────────
  {
    id: "art_3_19880",
    numero: "3",
    codigo: "LEY",
    etiqueta: "Art. 3 Ley 19.880",
    titulo: "Presunción de Legalidad",
    texto:
      "Las decisiones escritas que adopte la Administración se expresan por medio de actos administrativos… Los actos administrativos gozan de una presunción de legalidad, de imperio y exigibilidad frente a sus destinatarios, desde su entrada en vigencia.",
    efecto: "El acto administrativo se presume válido y exigible. Hay que impugnarlo para vencerlo.",
    rareza: "epica",
    region: "republica_administrativa",
    icono: "⊞",
  },
  {
    id: "art_42_18575",
    numero: "42",
    codigo: "LEY",
    etiqueta: "Art. 42 LOC 18.575",
    titulo: "La Falta de Servicio",
    texto:
      "Los órganos de la Administración serán responsables del daño que causen por falta de servicio. No obstante, el Estado tendrá derecho a repetir en contra del funcionario que hubiere incurrido en falta personal.",
    efecto: "Fundamenta la responsabilidad del Estado. Convierte la deficiencia del servicio en deuda.",
    rareza: "legendaria",
    region: "republica_administrativa",
    icono: "🛰️",
  },
  {
    id: "art_98_cpr",
    numero: "98",
    codigo: "CPR",
    etiqueta: "Art. 98 CPR",
    titulo: "La Contraloría",
    texto:
      "Un organismo autónomo con el nombre de Contraloría General de la República ejercerá el control de la legalidad de los actos de la Administración, fiscalizará el ingreso y la inversión de los fondos del Fisco… y desempeñará las demás funciones que le encomiende la ley.",
    efecto: "Control de juridicidad: toma de razón y potestad dictaminante. Guardiana de la legalidad.",
    rareza: "epica",
    region: "republica_administrativa",
    icono: "🏦",
  },
  {
    id: "art_20_cpr",
    numero: "20",
    codigo: "CPR",
    etiqueta: "Art. 20 CPR",
    titulo: "Recurso de Protección",
    texto:
      "El que por causa de actos u omisiones arbitrarios o ilegales sufra privación, perturbación o amenaza en el legítimo ejercicio de los derechos y garantías… podrá ocurrir por sí o por cualquiera a su nombre, a la Corte de Apelaciones respectiva, la que adoptará de inmediato las providencias que juzgue necesarias para restablecer el imperio del derecho.",
    efecto: "Acción cautelar constitucional. Restablece el imperio del derecho de inmediato.",
    rareza: "legendaria",
    region: "republica_administrativa",
    icono: "🛡️",
  },

  // ─── CASTILLO DE LA COMPETENCIA ───────────────────────────────────────────
  {
    id: "art_76_cpr",
    numero: "76",
    codigo: "CPR",
    etiqueta: "Art. 76 CPR",
    titulo: "La Jurisdicción",
    texto:
      "La facultad de conocer de las causas civiles y criminales, de resolverlas y de hacer ejecutar lo juzgado, pertenece exclusivamente a los tribunales establecidos por la ley. Ni el Presidente de la República ni el Congreso pueden, en caso alguno, ejercer funciones judiciales…",
    efecto: "Define quién puede juzgar. Sella la independencia y la inexcusabilidad.",
    rareza: "legendaria",
    region: "castillo_competencia",
    icono: "🏛️",
  },
  {
    id: "art_108_cot",
    numero: "108",
    codigo: "LEY",
    etiqueta: "Art. 108 COT",
    titulo: "La Competencia",
    texto:
      "La competencia es la facultad que tiene cada juez o tribunal para conocer de los negocios que la ley ha colocado dentro de la esfera de sus atribuciones.",
    efecto: "Mide la esfera de cada tribunal. Distingue la absoluta de la relativa.",
    rareza: "epica",
    region: "castillo_competencia",
    icono: "♜",
  },
  {
    id: "art_303_cpc",
    numero: "303",
    codigo: "CPC",
    etiqueta: "Art. 303 CPC",
    titulo: "Las Excepciones Dilatorias",
    texto:
      "Sólo son admisibles como excepciones dilatorias: 1ª La incompetencia del tribunal ante quien se haya presentado la demanda; 2ª La falta de capacidad del demandante o de personería o representación legal; 3ª La litispendencia; 4ª La ineptitud del libelo…; 5ª El beneficio de excusión; 6ª En general las que se refieran a la corrección del procedimiento sin afectar el fondo de la acción deducida.",
    efecto: "Detiene el proceso sin tocar el fondo. Arma predilecta de La Excepción Dilatoria.",
    rareza: "epica",
    region: "castillo_competencia",
    icono: "🚧",
  },
  {
    id: "art_434_cpc",
    numero: "434",
    codigo: "CPC",
    etiqueta: "Art. 434 CPC",
    titulo: "Los Títulos Ejecutivos",
    texto:
      "El juicio ejecutivo tiene lugar en las obligaciones de dar cuando para reclamar su cumplimiento se hace valer alguno de los siguientes títulos: 1° sentencia firme; 2° copia autorizada de escritura pública; 3° acta de avenimiento; 4° instrumento privado reconocido o mandado tener por reconocido; 5° confesión judicial; 6° títulos de crédito…",
    efecto: "Solo con título ejecutivo se apremia. Llave del cuaderno de apremio.",
    rareza: "legendaria",
    region: "castillo_competencia",
    icono: "💼",
  },
  {
    id: "art_464_cpc",
    numero: "464",
    codigo: "CPC",
    etiqueta: "Art. 464 CPC",
    titulo: "Las Excepciones del Ejecutado",
    texto:
      "El ejecutado podrá oponer, dentro del término legal y en un mismo escrito, las excepciones del art. 464 (incompetencia, falta de capacidad, litispendencia, ineptitud del libelo, beneficio de excusión, falsedad del título, falta de requisitos del título, pago, prescripción, cosa juzgada, etc.). La enumeración es taxativa.",
    efecto: "Lista cerrada y plazo fatal. Fuera de ella, no hay defensa ejecutiva.",
    rareza: "legendaria",
    region: "castillo_competencia",
    icono: "🛡️",
  },

  // ─── TRIBUNAL SUPREMO FINAL ───────────────────────────────────────────────
  {
    id: "art_177_cpc",
    numero: "177",
    codigo: "CPC",
    etiqueta: "Art. 177 CPC",
    titulo: "La Cosa Juzgada",
    texto:
      "La excepción de cosa juzgada puede alegarse por el litigante que haya obtenido en el juicio y por todos aquellos a quienes según la ley aprovecha el fallo, siempre que entre la nueva demanda y la anteriormente resuelta haya: 1ª identidad legal de personas; 2ª identidad de la cosa pedida; 3ª identidad de la causa de pedir.",
    efecto: "La triple identidad. Sella lo resuelto y veda volver a litigarlo. Arma del Guardián.",
    rareza: "legendaria",
    region: "tribunal_supremo",
    icono: "🔒",
  },
  {
    id: "art_767_cpc",
    numero: "767",
    codigo: "CPC",
    etiqueta: "Art. 767 CPC",
    titulo: "Casación en el Fondo",
    texto:
      "El recurso de casación en el fondo tiene lugar contra sentencias definitivas inapelables y contra interlocutorias inapelables que ponen término al juicio o hacen imposible su continuación, dictadas por Cortes de Apelaciones o tribunal arbitral de segunda instancia, siempre que se hayan pronunciado con infracción de ley y esta infracción haya influido sustancialmente en lo dispositivo del fallo.",
    efecto: "Invalida por infracción de ley decisoria litis. Recurso de derecho estricto.",
    rareza: "legendaria",
    region: "tribunal_supremo",
    icono: "⚜️",
  },
];

export function getArticulo(id: string): ArticuloLegendario | undefined {
  return ARTICULOS.find((a) => a.id === id);
}

export function articulosPorRegion(region: RegionId): ArticuloLegendario[] {
  return ARTICULOS.filter((a) => a.region === region);
}

export const RAREZA_META: Record<
  ArticuloLegendario["rareza"],
  { label: string; color: string }
> = {
  comun: { label: "Común", color: "#9aa0aa" },
  rara: { label: "Rara", color: "#4BE7FF" },
  epica: { label: "Épica", color: "#8A5CFF" },
  legendaria: { label: "Legendaria", color: "#ecc94b" },
};
