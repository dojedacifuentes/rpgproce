"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EstadoProcesal, EdificioId } from "@/types/procesal";

// ============================================================================
// STORE PROCESAL — estado aislado de "Archivos del Tiempo Procesal".
// Clave de localStorage propia ("procesal-save"): no toca el save procesal
// base, ni el de Civilis, ni el de Reinos.
// ============================================================================

const INIT: EstadoProcesal = {
  version: 1,
  desbloqueado: false,
  etapasVistas: [],
  edificiosCompletados: [],
  examenesAprobados: [],
  xp: 0,
  sellos: 0,
  perfilNombre: undefined,
};

type ProcStore = EstadoProcesal & {
  desbloquear: () => void;
  verEtapa: (id: string, xp?: number) => void;
  completarEdificio: (id: EdificioId, recompensa?: { xp: number; sellos: number }) => void;
  aprobarExamen: (id: string, recompensa: { xp: number; sellos: number }) => void;
  ganarSellos: (n: number) => void;
  setPerfil: (nombre: string) => void;
  reset: () => void;
};

const add = (arr: string[], v?: string) => (v && !arr.includes(v) ? [...arr, v] : arr);

export const useProcesal = create<ProcStore>()(
  persist(
    (set) => ({
      ...INIT,

      desbloquear: () => set({ desbloqueado: true }),

      // Idempotente: una etapa solo premia XP la primera vez que se estudia.
      verEtapa: (id, xp = 6) =>
        set((s) =>
          s.etapasVistas.includes(id)
            ? s
            : { etapasVistas: [...s.etapasVistas, id], xp: s.xp + xp, desbloqueado: true }
        ),

      completarEdificio: (id, recompensa) =>
        set((s) => ({
          edificiosCompletados: s.edificiosCompletados.includes(id)
            ? s.edificiosCompletados
            : [...s.edificiosCompletados, id],
          xp: s.xp + (recompensa?.xp ?? 0),
          sellos: s.sellos + (recompensa?.sellos ?? 0),
        })),

      aprobarExamen: (id, recompensa) =>
        set((s) => ({
          examenesAprobados: add(s.examenesAprobados, id),
          xp: s.xp + recompensa.xp,
          sellos: s.sellos + recompensa.sellos,
        })),

      ganarSellos: (n) => set((s) => ({ sellos: s.sellos + n })),

      setPerfil: (nombre) => set({ perfilNombre: nombre, desbloqueado: true }),

      reset: () => set({ ...INIT }),
    }),
    {
      name: "procesal-save",
      version: 1,
      // Guard SSR: en servidor no hay localStorage (evita hydration crash).
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as any)
      ),
    }
  )
);
