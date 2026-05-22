"use client";
import { useEffect } from "react";
import { useGame } from "@/store/useGame";

// ============================================================================
// WORLD THEME PROVIDER
// Aplica el atributo data-world al <body> según el mundoVisual activo
// Activa los 5 mundos visuales definidos en globals.css
// ============================================================================

export default function WorldThemeProvider() {
  const mundoVisual = useGame((s) => s.mundoVisual);

  useEffect(() => {
    document.body.setAttribute("data-world", mundoVisual);
    return () => {
      // No limpiamos al desmontar para evitar flash; el próximo render lo actualiza
    };
  }, [mundoVisual]);

  // Componente puramente de efecto — no renderiza nada
  return null;
}
