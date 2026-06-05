import type { EntradaCodex, RegionCivilId } from "@/types/civilis";
import { CODEX_CIVIL } from "./codex";
import { CARTAS_CIVIL } from "./cartas";

// ============================================================================
// FLASHCARDS — mazos de estudio generados desde el contenido del Codex y las
// cartas. Modo de memorización para el examen de grado (incluye TODO, no solo
// lo desbloqueado: es una herramienta de estudio).
// ============================================================================

export type DeckId = "articulos" | "conceptos" | "grado";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  region: RegionCivilId;
  etiqueta: string;
}

export const DECKS: { id: DeckId; nombre: string; icono: string; desc: string }[] = [
  { id: "articulos", nombre: "Artículos", icono: "📜", desc: "¿Qué dice cada artículo del Código?" },
  { id: "conceptos", nombre: "Conceptos", icono: "📖", desc: "Define cada institución y su fuente." },
  { id: "grado", nombre: "Preguntas de grado", icono: "🎓", desc: "Responde y autoevalúate como en el examen." },
];

function modeloRespuesta(e: EntradaCodex): string {
  const parts: string[] = [e.concepto];
  parts.push("Fuente: " + e.fuente);
  if (e.requisitos?.length) parts.push("Requisitos: " + e.requisitos.join("; "));
  if (e.caracteristicas?.length) parts.push("Características: " + e.caracteristicas.join("; "));
  if (e.clasificaciones?.length) parts.push("Clasificaciones: " + e.clasificaciones.join("; "));
  if (e.efectos?.length) parts.push("Efectos: " + e.efectos.join("; "));
  if (e.excepciones?.length) parts.push("Excepciones: " + e.excepciones.join("; "));
  return parts.join("\n");
}

export function construirDeck(deck: DeckId): Flashcard[] {
  if (deck === "articulos") {
    return CARTAS_CIVIL.map((c) => ({
      id: "fc_art_" + c.id,
      front: `¿Qué establece el ${c.articulo}?`,
      back: `${c.texto}\n\n— ${c.nombre} (${c.articulo})`,
      region: c.region,
      etiqueta: c.articulo,
    }));
  }
  if (deck === "conceptos") {
    return CODEX_CIVIL.map((e) => ({
      id: "fc_con_" + e.id,
      front: `Defina: ${e.institucion}`,
      back: `${e.concepto}\n\nFuente: ${e.fuente}`,
      region: e.region,
      etiqueta: e.institucion,
    }));
  }
  // grado
  return CODEX_CIVIL.map((e) => ({
    id: "fc_grado_" + e.id,
    front: e.preguntaGrado,
    back: modeloRespuesta(e),
    region: e.region,
    etiqueta: e.institucion,
  }));
}
