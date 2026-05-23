export type WorldTone =
  | "archivo"
  | "medieval"
  | "cyberpunk"
  | "velocidad"
  | "glitch"
  | "horror"
  | "noir";

export type WorldDefinition = {
  id: string;
  title: string;
  shortTitle: string;
  matter: string;
  tone: WorldTone;
  palette: {
    primary: string;
    secondary: string;
    surface: string;
  };
  route: string;
  tagline: string;
  mechanic: string;
  examFocus: string[];
};

export const WORLD_DEFINITIONS: Record<string, WorldDefinition> = {
  jurisdiccion: {
    id: "jurisdiccion",
    title: "Archivo Infinito de Disposiciones Comunes",
    shortTitle: "Disposiciones",
    matter: "Comparecencia, plazos, resoluciones, notificaciones, incidentes y nulidad",
    tone: "archivo",
    palette: { primary: "#d6aa55", secondary: "#5b4630", surface: "#17120c" },
    route: "/mundo/jurisdiccion",
    tagline: "Biblioteca perdida. Cada pasillo contiene un plazo que alguien dejo vencer.",
    mechanic: "Explorar expedientes, detectar vicios y ordenar instituciones transversales.",
    examFocus: ["Art. 64 CPC", "Arts. 40-50 CPC", "Art. 158 CPC", "Arts. 82-91 CPC"],
  },
  competencia: {
    id: "competencia",
    title: "Camara de Competencia",
    shortTitle: "Competencia",
    matter: "Jurisdiccion, competencia absoluta, competencia relativa e incidentes de competencia",
    tone: "archivo",
    palette: { primary: "#4be7ff", secondary: "#d6aa55", surface: "#07141c" },
    route: "/mundo/competencia",
    tagline: "La puerta correcta no se abre con fuerza: se abre con tribunal competente.",
    mechanic: "Elegir tribunal, via y defensa antes de presentar la primera pieza.",
    examFocus: ["Art. 76 CPR", "Art. 1 COT", "Arts. 45-148 COT", "Arts. 101-112 CPC"],
  },
  ordinario: {
    id: "ordinario",
    title: "Reino del Juicio Ordinario",
    shortTitle: "Ordinario",
    matter: "Demanda, emplazamiento, discusion, conciliacion, prueba, sentencia y recursos",
    tone: "medieval",
    palette: { primary: "#d4a843", secondary: "#7b2730", surface: "#1a1208" },
    route: "/mundo/demanda",
    tagline: "Castillos, pergaminos y una demanda que no sobrevive sin peticiones claras.",
    mechanic: "Construir el expediente por etapas y pagar el costo de cada omision.",
    examFocus: ["Art. 254 CPC", "Arts. 258-259 CPC", "Arts. 309-318 CPC", "Art. 170 CPC"],
  },
  prueba: {
    id: "prueba",
    title: "Barrio Noir de la Prueba",
    shortTitle: "Prueba",
    matter: "Medios probatorios, oportunidad, carga, valoracion e impugnacion",
    tone: "noir",
    palette: { primary: "#d7b46a", secondary: "#7ad4e6", surface: "#111318" },
    route: "/mundo/prueba",
    tagline: "Llueve sobre el expediente. La prueba no aparece: se persigue.",
    mechanic: "Cruzar pistas, contradicciones y medios probatorios segun oportunidad legal.",
    examFocus: ["Arts. 318-326 CPC", "Arts. 341-427 CPC", "Art. 1698 CC", "Art. 346 CPC"],
  },
  ejecutivo: {
    id: "ejecutivo",
    title: "Distrito Ejecutivo Neon",
    shortTitle: "Ejecutivo",
    matter: "Titulo ejecutivo, mandamiento, embargo, excepciones, apremio y tercerias",
    tone: "cyberpunk",
    palette: { primary: "#ff4fcf", secondary: "#4be7ff", surface: "#09030f" },
    route: "/mundo/juicio_ejecutivo",
    tagline: "Aqui la deuda no duerme, el embargo tampoco, y tu menos si no sabes el 464.",
    mechanic: "Gestionar riesgo, cuadernos, oposicion y realizacion de bienes.",
    examFocus: ["Arts. 434-442 CPC", "Arts. 443-458 CPC", "Art. 464 CPC", "Arts. 518-529 CPC"],
  },
  sumario: {
    id: "sumario",
    title: "Autopista Sumaria",
    shortTitle: "Sumario",
    matter: "Procedencia, comparendo, prueba breve, sustitucion y sentencia",
    tone: "velocidad",
    palette: { primary: "#00c8ff", secondary: "#ffd54a", surface: "#0b1f3a" },
    route: "/mision/m5_3",
    tagline: "Rapido no significa simple. Significa que cada error llega antes.",
    mechanic: "Resolver bajo presion de tiempo y escoger cuando conviene sustituir procedimiento.",
    examFocus: ["Arts. 680-692 CPC", "Comparendo", "Termino probatorio de 8 dias", "Sustitucion"],
  },
  recursos: {
    id: "recursos",
    title: "Dimension Rota de los Recursos",
    shortTitle: "Recursos",
    matter: "Reposicion, apelacion, casacion, queja, nulidad y agravio",
    tone: "glitch",
    palette: { primary: "#8a5cff", secondary: "#ff4fcf", surface: "#10091f" },
    route: "/mundo/recursos",
    tagline: "Cada realidad procesal tiene un plazo, un tribunal y un agravio.",
    mechanic: "Aplicar matriz R-A-P-E-T: resolucion, agravio, plazo, efecto y tribunal.",
    examFocus: ["Art. 181 CPC", "Art. 187 CPC", "Arts. 766-768 CPC", "Art. 545 COT"],
  },
  nulidad: {
    id: "nulidad",
    title: "Pasillo de Nulidad e Incidentes",
    shortTitle: "Nulidad",
    matter: "Vicio, perjuicio, convalidacion, incidente y casacion en la forma",
    tone: "horror",
    palette: { primary: "#d94a4a", secondary: "#7ad4e6", surface: "#150708" },
    route: "/mundo/examen",
    tagline: "El expediente respira mal. Algo fue notificado a la sombra.",
    mechanic: "Detectar vicios ocultos y decidir si se reclama, convalida o casa.",
    examFocus: ["Art. 83 CPC", "Arts. 79-80 CPC", "Art. 768 CPC", "Principio de trascendencia"],
  },
};

export const getWorldDefinition = (id: string) =>
  WORLD_DEFINITIONS[id] ?? WORLD_DEFINITIONS.jurisdiccion;
