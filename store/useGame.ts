"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Expediente, Flag, Incidente, Logro, MedidaCautelar, Mundo, Personaje, SaveState,
  Escrito, Resolucion, RecursoInterpuesto, Prueba, Tribunal, CasoResuelto, CasoEnProgreso,
  ProgresionNpc, EstadoNpc,
} from "@/types/game";

type Store = SaveState & {
  setPersonaje: (p: Personaje) => void;
  setMundo: (m: Mundo) => void;
  iniciarExpediente: (e: Expediente) => void;
  cerrarExpediente: (resultado: NonNullable<Expediente["resultado"]>) => void;
  setTribunal: (t: Tribunal) => void;
  addEscrito: (e: Escrito) => void;
  addPrueba: (p: Prueba) => void;
  addResolucion: (r: Resolucion) => void;
  addRecurso: (r: RecursoInterpuesto) => void;
  addCautelar: (m: MedidaCautelar) => void;
  addIncidente: (i: Incidente) => void;
  setFlag: (f: Flag) => void;
  hasFlag: (f: Flag) => boolean;
  pushLog: (texto: string, tag?: string) => void;
  ajustarAtributo: (k: keyof Personaje["atributos"], delta: number) => void;
  ajustarReputacion: (delta: number) => void;
  ajustarTrauma: (delta: number) => void;
  desbloquearLogro: (l: Logro) => void;
  iniciarCaso: (caso: CasoEnProgreso) => void;
  resolverCaso: (caseId: string, resuelto: CasoResuelto, efectos?: { reputacion?: number; trauma?: number; conocimiento?: number }) => void;
  // NPC System
  iniciarArcoNpc: (npcId: string) => void;
  avanzoNpc: (npcId: string, accion: "completar_actividad" | "pasar_etapa" | "iniciar_desafio") => void;
  completarDesafioNpc: (npcId: string, exitoso: boolean, efectos?: { reputacion?: number; trauma?: number; conocimiento?: number; skills?: string[] }) => void;
  validarNpcsDesbloqueados: () => void;
  reset: () => void;
  finalizar: (texto: string) => void;
  nuevoCicloProcesal: () => void;
};

const INIT: SaveState = {
  version: 1,
  creado: Date.now(),
  ultimoGuardado: Date.now(),
  personaje: {
    nombre: "",
    sexo: "femenino",
    origen: "litigante_freelancer",
    rol: "abogado_demandante",
    nivelEconomico: 50,
    atributos: {
      conocimiento_procesal: 5, persuasion_forense: 5, diligencia: 5,
      rigor_formal: 5, estrategia: 5, resistencia_psicologica: 5,
    },
    reputacion: 0,
    trauma: 0,
    expedientesGanados: 0,
    expedientesPerdidos: 0,
    cicloProcesal: 1,
  },
  expedientesArchivados: [],
  cautelares: [],
  incidentes: [],
  flags: [],
  mundoActual: "jurisdiccion",
  log: [],
  logros: [],
  casosResueltos: [],
  npcesEnProgreso: new Map<string, ProgresionNpc>(),
  npcesCompletados: [],
  npcesDesbloqueados: [],
};

export const useGame = create<Store>()(
  persist(
    (set, get) => ({
      ...INIT,
      setPersonaje: (p) => set({ personaje: p, ultimoGuardado: Date.now() }),
      setMundo: (m) => set({ mundoActual: m, ultimoGuardado: Date.now() }),
      iniciarExpediente: (e) => set({ expedienteActivo: e }),
      cerrarExpediente: (resultado) =>
        set((s) => {
          if (!s.expedienteActivo) return s;
          const cerrado = { ...s.expedienteActivo, resultado };
          const p = s.personaje;
          return {
            expedientesArchivados: [...s.expedientesArchivados, cerrado],
            expedienteActivo: undefined,
            personaje: {
              ...p,
              expedientesGanados: resultado === "ganado" ? p.expedientesGanados + 1 : p.expedientesGanados,
              expedientesPerdidos: resultado === "perdido" ? p.expedientesPerdidos + 1 : p.expedientesPerdidos,
            },
          };
        }),
      setTribunal: (t) =>
        set((s) => (s.expedienteActivo ? { expedienteActivo: { ...s.expedienteActivo, tribunal: t } } : s)),
      addEscrito: (e) =>
        set((s) => (s.expedienteActivo ? { expedienteActivo: { ...s.expedienteActivo, escritos: [...s.expedienteActivo.escritos, e] } } : s)),
      addPrueba: (p) =>
        set((s) => (s.expedienteActivo ? { expedienteActivo: { ...s.expedienteActivo, pruebas: [...s.expedienteActivo.pruebas, p] } } : s)),
      addResolucion: (r) =>
        set((s) => (s.expedienteActivo ? { expedienteActivo: { ...s.expedienteActivo, resoluciones: [...s.expedienteActivo.resoluciones, r] } } : s)),
      addRecurso: (r) =>
        set((s) => (s.expedienteActivo ? { expedienteActivo: { ...s.expedienteActivo, recursosPendientes: [...s.expedienteActivo.recursosPendientes, r] } } : s)),
      addCautelar: (m) => set((s) => ({ cautelares: [...s.cautelares, m] })),
      addIncidente: (i) => set((s) => ({ incidentes: [...s.incidentes, i] })),
      setFlag: (f) => set((s) => (s.flags.includes(f) ? s : { flags: [...s.flags, f] })),
      hasFlag: (f) => get().flags.includes(f),
      pushLog: (texto, tag) =>
        set((s) => ({ log: [{ t: Date.now(), texto, tag }, ...s.log].slice(0, 300) })),
      ajustarAtributo: (k, delta) =>
        set((s) => ({
          personaje: {
            ...s.personaje,
            atributos: {
              ...s.personaje.atributos,
              [k]: Math.max(0, Math.min(10, s.personaje.atributos[k] + delta)),
            },
          },
        })),
      ajustarReputacion: (delta) =>
        set((s) => ({ personaje: { ...s.personaje, reputacion: Math.max(-100, Math.min(100, s.personaje.reputacion + delta)) } })),
      ajustarTrauma: (delta) =>
        set((s) => ({ personaje: { ...s.personaje, trauma: Math.max(0, Math.min(100, s.personaje.trauma + delta)) } })),
      desbloquearLogro: (l) =>
        set((s) => (s.logros.find((x) => x.id === l.id) ? s : { logros: [...s.logros, { ...l, desbloqueado: true, fecha: Date.now() }] })),
      iniciarCaso: (caso) =>
        set((s) => ({ casosEnProgreso: caso, ultimoGuardado: Date.now() })),
      resolverCaso: (caseId, resuelto, efectos) =>
        set((s) => {
          const nuevosCasos = [...s.casosResueltos, resuelto];
          const p = s.personaje;
          const efectosAplicados = {
            personaje: {
              ...p,
              reputacion: Math.max(-100, Math.min(100, p.reputacion + (efectos?.reputacion || 0))),
              trauma: Math.max(0, Math.min(100, p.trauma + (efectos?.trauma || 0))),
              atributos: {
                ...p.atributos,
                conocimiento_procesal: Math.max(0, Math.min(10, p.atributos.conocimiento_procesal + (efectos?.conocimiento || 0))),
              },
            },
            casosResueltos: nuevosCasos,
            casosEnProgreso: undefined,
            ultimoGuardado: Date.now(),
          };
          return efectosAplicados;
        }),
      iniciarArcoNpc: (npcId) =>
        set((s) => {
          const nuevaProgresion: ProgresionNpc = {
            npcId,
            estado: "en_progreso_etapa_1",
            etapaActual: 1,
            fechaInicio: Date.now(),
            ultimoProgreso: Date.now(),
            actividadCompletada: false,
            intentosFinal: 0,
          };
          const nuevoMap = new Map(s.npcesEnProgreso);
          nuevoMap.set(npcId, nuevaProgresion);
          return {
            npcesEnProgreso: nuevoMap,
            ultimoGuardado: Date.now(),
          };
        }),
      avanzoNpc: (npcId, accion) =>
        set((s) => {
          const actual = s.npcesEnProgreso.get(npcId);
          if (!actual) return s;

          const nuevoMap = new Map(s.npcesEnProgreso);

          if (accion === "completar_actividad") {
            nuevoMap.set(npcId, {
              ...actual,
              actividadCompletada: true,
              ultimoProgreso: Date.now(),
            });
          } else if (accion === "pasar_etapa") {
            const proxEtapa = actual.etapaActual + 1;
            const nuevoEstado: EstadoNpc =
              proxEtapa === 2 ? "en_progreso_etapa_2" :
              proxEtapa === 3 ? "en_progreso_etapa_3" :
              "desafio_final";

            nuevoMap.set(npcId, {
              ...actual,
              etapaActual: proxEtapa,
              estado: nuevoEstado,
              actividadCompletada: false,
              ultimoProgreso: Date.now(),
            });
          } else if (accion === "iniciar_desafio") {
            nuevoMap.set(npcId, {
              ...actual,
              estado: "desafio_final",
              ultimoProgreso: Date.now(),
            });
          }

          return {
            npcesEnProgreso: nuevoMap,
            ultimoGuardado: Date.now(),
          };
        }),
      completarDesafioNpc: (npcId, exitoso, efectos) =>
        set((s) => {
          const actual = s.npcesEnProgreso.get(npcId);
          if (!actual) return s;

          const nuevoMap = new Map(s.npcesEnProgreso);
          const nuevoEstado: EstadoNpc = exitoso ? "completada" : "fallida";

          nuevoMap.set(npcId, {
            ...actual,
            estado: nuevoEstado,
            intentosFinal: actual.intentosFinal + 1,
            ultimoProgreso: Date.now(),
          });

          // Aplicar efectos al personaje
          const p = s.personaje;
          const nuevaRep = Math.max(-100, Math.min(100, p.reputacion + (efectos?.reputacion || 0)));
          const nuevoTrauma = Math.max(0, Math.min(100, p.trauma + (efectos?.trauma || 0)));
          const nuevoConocimiento = Math.max(0, Math.min(10, p.atributos.conocimiento_procesal + (efectos?.conocimiento || 0)));

          // Agregar skills a flags si existen
          const nuevosFlags = [...s.flags];
          if (efectos?.skills) {
            for (const skill of efectos.skills) {
              if (!nuevosFlags.includes(skill)) {
                nuevosFlags.push(skill);
              }
            }
          }

          const nuevosCompletados = exitoso && !s.npcesCompletados.includes(npcId)
            ? [...s.npcesCompletados, npcId]
            : s.npcesCompletados;

          return {
            npcesEnProgreso: nuevoMap,
            npcesCompletados: nuevosCompletados,
            personaje: {
              ...p,
              reputacion: nuevaRep,
              trauma: nuevoTrauma,
              atributos: {
                ...p.atributos,
                conocimiento_procesal: nuevoConocimiento,
              },
            },
            flags: nuevosFlags,
            ultimoGuardado: Date.now(),
          };
        }),
      validarNpcsDesbloqueados: () =>
        set((s) => {
          // Por ahora, todos los NPCs disponibles
          // En futuro: validar dependencias contra npcesCompletados
          return s; // placeholder
        }),
      finalizar: (texto) => set({ finalizado: true, epilogo: texto }),
      nuevoCicloProcesal: () =>
        set((s) => ({
          personaje: { ...s.personaje, cicloProcesal: s.personaje.cicloProcesal + 1 },
          expedienteActivo: undefined,
          flags: s.flags.filter((f) => f.startsWith("logro_") || f === "examen_aprobado"),
          mundoActual: "jurisdiccion",
          finalizado: false,
          epilogo: undefined,
        })),
      reset: () =>
        set({
          ...INIT,
          creado: Date.now(),
          finalizado: false,
          epilogo: undefined,
        }),
    }),
    {
      name: "derecho-procesal-rpg-save",
      version: 1,
      migrate: () => ({ ...INIT, creado: Date.now() }) as any,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as any)
      ),
    }
  )
);
