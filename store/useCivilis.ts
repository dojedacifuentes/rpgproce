"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EstadoCivilis, RegionCivilId } from "@/types/civilis";

// ============================================================================
// STORE CIVILIS — estado aislado de la expansión de Derecho Civil.
// Clave de localStorage propia ("civilis-save"): no toca el save procesal
// ("derecho-procesal-rpg-save") ni el de Reinos ("reinos-del-derecho-save").
// ============================================================================

const INIT: EstadoCivilis = {
  version: 1,
  desbloqueado: false,
  codexDesbloqueado: [],
  casosResueltos: [],
  cartasObtenidas: [],
  bossesDerrotados: [],
  regionesCompletadas: [],
  examenesAprobados: [],
  casosGradoResueltos: [],
  oro: 0,
  xp: 0,
  perfilNombre: undefined,
};

type RecompensaCaso = { xp: number; oro: number; cartaId?: string };

type CivilisStore = EstadoCivilis & {
  desbloquear: () => void;
  resolverCaso: (casoId: string, recompensa: RecompensaCaso, codexId?: string) => void;
  derrotarBoss: (bossId: string, recompensa: { oro: number; cartaId?: string }) => void;
  completarRegion: (region: RegionCivilId) => void;
  ganarCarta: (cartaId: string) => void;
  aprobarExamen: (profesorId: string, recompensa: { xp: number; oro: number }) => void;
  completarCasoGrado: (id: string, recompensa: { xp: number; oro: number }) => void;
  gastarOro: (n: number) => boolean;
  setPerfil: (nombre: string) => void;
  reset: () => void;
};

const add = (arr: string[], v?: string) => (v && !arr.includes(v) ? [...arr, v] : arr);

export const useCivilis = create<CivilisStore>()(
  persist(
    (set, get) => ({
      ...INIT,

      desbloquear: () => set({ desbloqueado: true }),

      resolverCaso: (casoId, recompensa, codexId) =>
        set((s) => ({
          casosResueltos: add(s.casosResueltos, casoId),
          codexDesbloqueado: add(s.codexDesbloqueado, codexId),
          cartasObtenidas: add(s.cartasObtenidas, recompensa.cartaId),
          xp: s.xp + recompensa.xp,
          oro: s.oro + recompensa.oro,
          desbloqueado: true,
        })),

      derrotarBoss: (bossId, recompensa) =>
        set((s) => ({
          bossesDerrotados: add(s.bossesDerrotados, bossId),
          cartasObtenidas: add(s.cartasObtenidas, recompensa.cartaId),
          oro: s.oro + recompensa.oro,
          xp: s.xp + 120,
        })),

      completarRegion: (region) =>
        set((s) => ({
          regionesCompletadas: s.regionesCompletadas.includes(region)
            ? s.regionesCompletadas
            : [...s.regionesCompletadas, region],
        })),

      ganarCarta: (cartaId) => set((s) => ({ cartasObtenidas: add(s.cartasObtenidas, cartaId) })),

      aprobarExamen: (profesorId, recompensa) =>
        set((s) => ({
          examenesAprobados: add(s.examenesAprobados, profesorId),
          xp: s.xp + recompensa.xp,
          oro: s.oro + recompensa.oro,
        })),

      completarCasoGrado: (id, recompensa) =>
        set((s) =>
          s.casosGradoResueltos.includes(id)
            ? s
            : {
                casosGradoResueltos: [...s.casosGradoResueltos, id],
                xp: s.xp + recompensa.xp,
                oro: s.oro + recompensa.oro,
                desbloqueado: true,
              }
        ),

      gastarOro: (n) => {
        if (get().oro < n) return false;
        set((s) => ({ oro: s.oro - n }));
        return true;
      },

      setPerfil: (nombre) => set({ perfilNombre: nombre, desbloqueado: true }),

      reset: () => set({ ...INIT }),
    }),
    {
      name: "civilis-save",
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
