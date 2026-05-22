"use client";
import { create } from "zustand";
import type { GameView, NavParams, ViewEntry } from "@/types/views";

// ============================================================================
// useView — Store de navegación interna
// Maneja el stack de vistas dentro del juego sin usar router.push
// para transiciones que no necesitan URL propia.
// ============================================================================

interface ViewStore {
  /** Vista actual */
  current: ViewEntry;
  /** Historial de vistas para navegar hacia atrás (máx 15) */
  history: ViewEntry[];

  /** Navegar a una vista, guardando la actual en historial */
  navigate: (view: GameView, params?: NavParams) => void;
  /** Volver a la vista anterior */
  back: () => void;
  /** ¿Hay historial para navegar atrás? */
  canGoBack: () => boolean;
  /** Resetear a la vista inicial */
  reset: () => void;
}

export const useView = create<ViewStore>((set, get) => ({
  current: { view: "home-hub" },
  history: [],

  navigate: (view, params) => {
    const current = get().current;
    set((s) => ({
      history: [...s.history.slice(-15), current],
      current: { view, params },
    }));
  },

  back: () => {
    const { history } = get();
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    set((s) => ({
      current: prev,
      history: s.history.slice(0, -1),
    }));
  },

  canGoBack: () => get().history.length > 0,

  reset: () =>
    set({ current: { view: "home-hub" }, history: [] }),
}));
