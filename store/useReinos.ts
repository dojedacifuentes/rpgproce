"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EstadoReinos, RegionId } from "@/types/reinos";

// ============================================================================
// REINOS DEL DERECHO — Store aislado del DLC
// ----------------------------------------------------------------------------
// Clave de localStorage PROPIA: "reinos-del-derecho-save".
// No comparte estado con useGame ("derecho-procesal-rpg-save"); por tanto la
// progresión, preguntas y mecánicas del juego base quedan 100% intactas.
// ============================================================================

const INIT: EstadoReinos = {
  version: 1,
  desbloqueado: false,
  desafiosResueltos: [],
  articulosDesbloqueados: [],
  bossesDerrotados: [],
  regionesCompletadas: [],
  cristales: 0,
  xp: 0,
  ultimaRegion: undefined,
};

type ReinosStore = EstadoReinos & {
  desbloquearPortal: () => void;
  resolverDesafio: (
    id: string,
    recompensa: { xp?: number; cristales?: number; articuloId?: string },
  ) => void;
  desbloquearArticulo: (articuloId: string) => void;
  derrotarBoss: (
    bossId: string,
    region: RegionId,
    recompensa: { cristales?: number; articuloId?: string },
  ) => void;
  entrarRegion: (region: RegionId) => void;
  gastarCristales: (n: number) => boolean;
  setPerfil: (nombre: string, avatar: string) => void;
  // selectores
  tieneArticulo: (articuloId: string) => boolean;
  desafioResuelto: (id: string) => boolean;
  bossDerrotado: (bossId: string) => boolean;
  regionCompletada: (region: RegionId) => boolean;
  reset: () => void;
};

export const useReinos = create<ReinosStore>()(
  persist(
    (set, get) => ({
      ...INIT,

      desbloquearPortal: () => set({ desbloqueado: true }),

      resolverDesafio: (id, recompensa) =>
        set((s) => {
          if (s.desafiosResueltos.includes(id)) return s; // ya resuelto: no duplica recompensa
          const articulos = recompensa.articuloId && !s.articulosDesbloqueados.includes(recompensa.articuloId)
            ? [...s.articulosDesbloqueados, recompensa.articuloId]
            : s.articulosDesbloqueados;
          return {
            desafiosResueltos: [...s.desafiosResueltos, id],
            cristales: s.cristales + (recompensa.cristales ?? 0),
            xp: s.xp + (recompensa.xp ?? 0),
            articulosDesbloqueados: articulos,
          };
        }),

      desbloquearArticulo: (articuloId) =>
        set((s) =>
          s.articulosDesbloqueados.includes(articuloId)
            ? s
            : { articulosDesbloqueados: [...s.articulosDesbloqueados, articuloId] },
        ),

      derrotarBoss: (bossId, region, recompensa) =>
        set((s) => {
          const bosses = s.bossesDerrotados.includes(bossId)
            ? s.bossesDerrotados
            : [...s.bossesDerrotados, bossId];
          const regiones = s.regionesCompletadas.includes(region)
            ? s.regionesCompletadas
            : [...s.regionesCompletadas, region];
          const articulos = recompensa.articuloId && !s.articulosDesbloqueados.includes(recompensa.articuloId)
            ? [...s.articulosDesbloqueados, recompensa.articuloId]
            : s.articulosDesbloqueados;
          return {
            bossesDerrotados: bosses,
            regionesCompletadas: regiones,
            articulosDesbloqueados: articulos,
            cristales: s.cristales + (recompensa.cristales ?? 0),
            xp: s.xp + 70,
          };
        }),

      entrarRegion: (region) => set({ ultimaRegion: region, desbloqueado: true }),

      gastarCristales: (n) => {
        const s = get();
        if (s.cristales < n) return false;
        set({ cristales: s.cristales - n });
        return true;
      },

      setPerfil: (nombre, avatar) => set({ perfilNombre: nombre.trim().slice(0, 24) || "Litigante Anónimo", perfilAvatar: avatar }),

      tieneArticulo: (articuloId) => get().articulosDesbloqueados.includes(articuloId),
      desafioResuelto: (id) => get().desafiosResueltos.includes(id),
      bossDerrotado: (bossId) => get().bossesDerrotados.includes(bossId),
      regionCompletada: (region) => get().regionesCompletadas.includes(region),

      reset: () => set({ ...INIT }),
    }),
    {
      name: "reinos-del-derecho-save",
      version: 1,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as any),
      ),
    },
  ),
);
