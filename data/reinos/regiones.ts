import type { Region, RegionId } from "@/types/reinos";

// ============================================================================
// REINOS DEL DERECHO — Las 7 regiones del overworld
// ----------------------------------------------------------------------------
// Cada región: identidad visual propia (paleta = reinos.css), materia jurídica,
// enemigos/boss, y posición en el mapa-mundo (x/y en % del lienzo).
// El orden traza un sendero estilo Super Mario World / Zelda ALttP.
// ============================================================================

export const REGIONES: Region[] = [
  {
    id: "bosque_obligaciones",
    orden: 1,
    nombre: "Bosque de las Obligaciones",
    subtitulo: "Donde nacen los vínculos",
    materia: "Acto jurídico · Obligaciones · Responsabilidad",
    estetica: "Zelda SNES · ruinas cubiertas de hiedra · naturaleza · pergamino",
    descripcion:
      "Bajo el dosel del bosque duermen las raíces de todo el Derecho Civil: la voluntad que obliga, el daño que repara, el vínculo que nace y se extingue. Cada sendero es una fuente de las obligaciones.",
    icono: "🌳",
    glifo: "⚖",
    x: 13,
    y: 72,
    bossId: "acreedor_implacable",
    paleta: {
      primary: "#57b06f",
      secondary: "#d9b44a",
      accent: "#e8d9b5",
      ambient: "rgba(87,176,111,0.08)",
    },
  },
  {
    id: "ciudad_mercantil",
    orden: 2,
    nombre: "Ciudad Mercantil de los Contratos",
    subtitulo: "El puerto de la palabra dada",
    materia: "Contratos · Responsabilidad contractual · Buena fe",
    estetica: "Puertos y mercados · comercio medieval · cobre y azul marino",
    descripcion:
      "En los muelles de la Ciudad Mercantil todo es trato: 'todo contrato legalmente celebrado es una ley para los contratantes'. Pero entre fardos y manifiestos se esconde la mala fe, y el 1546 vigila.",
    icono: "⚓",
    glifo: "§",
    x: 31,
    y: 56,
    bossId: "mercader_mala_fe",
    requiereRegion: "bosque_obligaciones",
    paleta: {
      primary: "#d68a3e",
      secondary: "#244b78",
      accent: "#b5651d",
      ambient: "rgba(214,138,62,0.08)",
    },
  },
  {
    id: "tierras_posesion",
    orden: 3,
    nombre: "Tierras de la Posesión y el Dominio",
    subtitulo: "Lo que se tiene y lo que se es dueño",
    materia: "Tradición · Posesión · Dominio · Reivindicación",
    estetica: "Cañones de tierra roja · hitos de deslinde · arena y terracota",
    descripcion:
      "Tierra disputada hasta el último mojón. Aquí la posesión se presume dueña (700 inc. 2°), la tradición transfiere (670) y la acción reivindicatoria persigue la cosa de manos de quien la detenta.",
    icono: "🏜️",
    glifo: "◈",
    x: 25,
    y: 33,
    bossId: "espectro_poseedor",
    requiereRegion: "ciudad_mercantil",
    paleta: {
      primary: "#d98e5a",
      secondary: "#8c5a3c",
      accent: "#ebd3a0",
      ambient: "rgba(217,142,90,0.08)",
    },
  },
  {
    id: "mansion_sucesoria",
    orden: 4,
    nombre: "Mansión Sucesoria",
    subtitulo: "Donde los muertos siguen hablando",
    materia: "Sucesiones · Legítimas · Colación · Filiación post mortem",
    estetica: "Mansión gótica · candelabros · retratos que observan · vino y oro viejo",
    descripcion:
      "Una herencia yacente y un testamento que arde a medianoche. La acción de petición de herencia protege al heredero real contra el poseedor aparente, mientras la colación intenta igualar a los legitimarios.",
    icono: "🏛️",
    glifo: "✝",
    x: 47,
    y: 24,
    bossId: "heredero_fantasma",
    requiereRegion: "tierras_posesion",
    paleta: {
      primary: "#9c5a7d",
      secondary: "#c2a14a",
      accent: "#b8a9c9",
      ambient: "rgba(156,90,125,0.09)",
    },
  },
  {
    id: "republica_administrativa",
    orden: 5,
    nombre: "República Administrativa",
    subtitulo: "La máquina que no duerme",
    materia: "Acto administrativo · Ley 19.880 · Contraloría · Responsabilidad del Estado",
    estetica: "Cyberpunk jurídico · burocracia futurista · terminales · azul eléctrico, blanco y negro",
    descripcion:
      "Torres de servidores y formularios infinitos. La Administración actúa con presunción de legalidad, la Contraloría toma razón, y la falta de servicio fundamenta la responsabilidad del Estado. El silencio también decide.",
    icono: "🛰️",
    glifo: "⊞",
    x: 65,
    y: 41,
    bossId: "leviatan_administrativo",
    requiereRegion: "mansion_sucesoria",
    paleta: {
      primary: "#3f7bff",
      secondary: "#f2f5ff",
      accent: "#6fa8ff",
      ambient: "rgba(63,123,255,0.1)",
    },
  },
  {
    id: "castillo_competencia",
    orden: 6,
    nombre: "Castillo de la Competencia",
    subtitulo: "Quién juzga, y por qué",
    materia: "Jurisdicción · Competencia absoluta y relativa · Prórroga · Excepciones",
    estetica: "Castillo judicial · laberintos de salas · gárgolas con balanza · púrpura, piedra y rojo profundo",
    descripcion:
      "Un castillo que reordena sus salas: cada puerta exige saber materia, cuantía, fuero y territorio. La competencia absoluta es de orden público; la relativa admite prórroga. Errar de tribunal es caer al foso.",
    icono: "🏰",
    glifo: "♜",
    x: 79,
    y: 63,
    bossId: "tribunal_incompetente",
    requiereRegion: "republica_administrativa",
    paleta: {
      primary: "#9a52c4",
      secondary: "#7c7c86",
      accent: "#c0392b",
      ambient: "rgba(154,82,196,0.09)",
    },
  },
  {
    id: "tribunal_supremo",
    orden: 7,
    nombre: "Tribunal Supremo Final",
    subtitulo: "La última instancia",
    materia: "Síntesis · Casación · Cosa juzgada · Examen de Grado",
    estetica: "Cúpula de oro y obsidiana · luz cenital · silencio sagrado · oro supremo y blanco espectral",
    descripcion:
      "El estrado más alto. Aquí todo lo aprendido converge: civil, administrativo y procesal en un mismo aliento. El Guardián de la Cosa Juzgada exige coherencia perfecta. No hay recurso ulterior.",
    icono: "👑",
    glifo: "✦",
    x: 89,
    y: 29,
    bossId: "guardian_cosa_juzgada",
    requiereRegion: "castillo_competencia",
    paleta: {
      primary: "#ecc94b",
      secondary: "#f2f2f0",
      accent: "#8a5cff",
      ambient: "rgba(236,201,75,0.1)",
    },
  },
];

// Sendero del overworld (orden de conexión de nodos)
export const SENDERO: [RegionId, RegionId][] = [
  ["bosque_obligaciones", "ciudad_mercantil"],
  ["ciudad_mercantil", "tierras_posesion"],
  ["tierras_posesion", "mansion_sucesoria"],
  ["mansion_sucesoria", "republica_administrativa"],
  ["republica_administrativa", "castillo_competencia"],
  ["castillo_competencia", "tribunal_supremo"],
];

export function getRegion(id: string): Region | undefined {
  return REGIONES.find((r) => r.id === id);
}

export const REGION_IDS: RegionId[] = REGIONES.map((r) => r.id);
