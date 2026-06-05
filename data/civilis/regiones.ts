import type { RegionCivil, RegionCivilId } from "@/types/civilis";

// ============================================================================
// CIVILIS — 9 regiones del Reino del Derecho Civil. Cada una = una institución.
// Coordenadas x/y en % sobre el mapa-mundo.
// ============================================================================

export const REGIONES_CIVIL: RegionCivil[] = [
  {
    id: "obligaciones",
    nombre: "Valle de las Obligaciones",
    subtitulo: "Vínculos jurídicos",
    icono: "⛓️",
    x: 16, y: 40, orden: 1,
    paleta: { primary: "#5fb37a", secondary: "#3f8f5f", accent: "#8fe0a6", ambient: "rgba(95,179,122,.10)" },
    lore: "Donde nacen los vínculos. Toda deuda del Reino empieza como una criatura de este valle.",
    bossId: "guardian_vinculo",
  },
  {
    id: "solidaridad",
    nombre: "Fortaleza de la Solidaridad",
    subtitulo: "Pluralidad de sujetos",
    icono: "🏰",
    x: 16, y: 72, orden: 2,
    paleta: { primary: "#4e86d6", secondary: "#2f5fae", accent: "#86b6ff", ambient: "rgba(78,134,214,.10)" },
    lore: "Muchos deben, uno puede cobrar todo. Aquí gobierna quien entiende quién paga y quién se subroga.",
    bossId: "lord_solidarius",
  },
  {
    id: "contratos",
    nombre: "Mercado de los Contratos",
    subtitulo: "Principios y teoría general",
    icono: "⚖️",
    x: 40, y: 24, orden: 3,
    paleta: { primary: "#e6a23c", secondary: "#b97c20", accent: "#ffd081", ambient: "rgba(230,162,60,.10)" },
    lore: "La piedra angular del edificio jurídico: la voluntad de las partes es ley. Pero la buena fe vigila el mercado.",
    bossId: "oraculo_imprevision",
  },
  {
    id: "compraventa",
    nombre: "Ciudad de la Compraventa",
    subtitulo: "El contrato rey",
    icono: "🏛️",
    x: 70, y: 26, orden: 4,
    paleta: { primary: "#d9b24c", secondary: "#a98a2e", accent: "#ffe39a", ambient: "rgba(217,178,76,.10)" },
    lore: "Una cosa por dinero. Pero bajo cada venta acechan la evicción y los vicios ocultos.",
    bossId: "vendedor_fraudulento",
  },
  {
    id: "promesa",
    nombre: "Templo de la Promesa",
    subtitulo: "Art. 1554 — cuatro puertas",
    icono: "📜",
    x: 44, y: 66, orden: 5,
    paleta: { primary: "#86c6dc", secondary: "#4f93ad", accent: "#c4ecf7", ambient: "rgba(134,198,220,.10)" },
    lore: "Cuatro requisitos, cuatro puertas. Falla uno y la promesa no produce obligación alguna.",
    bossId: "guardian_puertas",
  },
  {
    id: "mandato",
    nombre: "Imperio del Mandato",
    subtitulo: "Gestión por cuenta ajena",
    icono: "👑",
    x: 30, y: 82, orden: 6,
    paleta: { primary: "#a06cd5", secondary: "#7344a8", accent: "#cda6f0", ambient: "rgba(160,108,213,.10)" },
    lore: "Confiar un negocio a otro. Pero el poder mal delegado engendra al Mandatario Infiel.",
    bossId: "mandatario_infiel",
  },
  {
    id: "hipoteca",
    nombre: "Catacumbas Hipotecarias",
    subtitulo: "Garantía sobre inmuebles",
    icono: "⛓",
    x: 78, y: 76, orden: 7,
    paleta: { primary: "#8a6fd0", secondary: "#5a3f9e", accent: "#b9a0f0", ambient: "rgba(122,92,192,.12)" },
    lore: "Una prenda sobre la tierra que persigue a la finca sea quien sea su poseedor.",
    bossId: "tercer_poseedor",
  },
  {
    id: "extincion",
    nombre: "Torre de los Modos de Extinguir",
    subtitulo: "El fin de la obligación",
    icono: "🗼",
    x: 86, y: 48, orden: 8,
    paleta: { primary: "#c65b6e", secondary: "#9a3a4c", accent: "#f09aa8", ambient: "rgba(198,91,110,.10)" },
    lore: "Cada piso, un modo de morir de la deuda: pago, novación, compensación, prescripción...",
    bossId: "señor_extincion",
  },
  {
    id: "biblioteca",
    nombre: "Biblioteca del Código Civil",
    subtitulo: "Codex Civilis",
    icono: "📚",
    x: 58, y: 46, orden: 9,
    paleta: { primary: "#45b6a6", secondary: "#2c8073", accent: "#86e6d6", ambient: "rgba(69,182,166,.10)" },
    lore: "El corazón del Reino. Cada institución dominada se inscribe aquí, viva, para el examen de grado.",
  },
];

export const SENDERO_CIVIL: [RegionCivilId, RegionCivilId][] = [
  ["obligaciones", "solidaridad"],
  ["obligaciones", "contratos"],
  ["contratos", "compraventa"],
  ["contratos", "biblioteca"],
  ["compraventa", "biblioteca"],
  ["biblioteca", "promesa"],
  ["promesa", "mandato"],
  ["promesa", "hipoteca"],
  ["compraventa", "extincion"],
  ["hipoteca", "extincion"],
];

export const getRegionCivil = (id: string) => REGIONES_CIVIL.find((r) => r.id === id);
