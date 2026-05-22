// ============================================================================
// GAMEVIEW — Sistema central de navegación
// Todas las vistas posibles del juego en un solo tipo.
// Usar con useView() para navegación no-URL dentro del juego.
// ============================================================================

/** Todas las vistas posibles del RPG Procesal */
export type GameView =
  | "home-hub"           // Hub principal — personaje + mapa resumen
  | "campaign-map"       // Mapa de campaña fullscreen interactivo
  | "mission-detail"     // Detalle de misión + botón JUGAR
  | "mission-play"       // Módulo de misión activo
  | "boss-list"          // Lista de bosses disponibles
  | "boss-detail"        // Tarjeta de boss + botón ATACAR
  | "boss-fight"         // Batalla activa (InterrogacionOral)
  | "expansion-hub"      // Navegador de modos de juego
  | "subworld"           // Contenido específico de una zona/mundo
  | "investigation-case" // CasoInvestigativo activo
  | "executive-campaign" // JuicioEjecutivoCompleto
  | "visual-world"       // Selector de mundo visual
  | "exam-mode"          // ExamenGrado
  | "inventory"          // Reliquias, skills, items
  | "codex"              // Referencia normativa
  | "mentor-room"        // Hub de interacción NPC
  | "timeline-mode"      // TimelineOrdenamiento
  | "arcade-mode";       // ArcadeClasificador

/** Parámetros opcionales para contextualizar una vista */
export interface NavParams {
  misionId?: string;
  modulo?: string;
  bossId?: string;
  casoId?: string;
  npcId?: string;
  zonaId?: string;
  [key: string]: string | undefined;
}

/** Entrada en el historial de navegación */
export interface ViewEntry {
  view: GameView;
  params?: NavParams;
}
