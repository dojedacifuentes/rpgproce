"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Npc } from "@/data/npcs-v2";
import type { ProgresionNpc } from "@/types/game";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

interface ActividadEtapaNpcProps {
  npc: Npc;
  progreso: ProgresionNpc;
  onComplete: () => void;
  onVolver: () => void;
}

type TipoActividad = "arcade" | "investigacion" | "dialogo" | "escritura" | "batalla_procesal" | "quiz";

export default function ActividadEtapaNpc({
  npc,
  progreso,
  onComplete,
  onVolver,
}: ActividadEtapaNpcProps) {
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const avanzoNpc = useGame((s) => s.avanzoNpc);
  const completarDesafioNpc = useGame((s) => s.completarDesafioNpc);

  const etapa = npc.arco_principal.etapas[progreso.etapaActual - 1];
  const esMisionFinal = progreso.estado === "desafio_final";
  const mision = esMisionFinal ? npc.arco_principal.mision_final : null;

  const handleCompletarActividad = (exitoso: boolean = true) => {
    if (esMisionFinal) {
      // Aplicar efectos de desafío final
      const consecuencia = exitoso
        ? mision?.consecuencia_exito
        : mision?.consecuencia_fracaso;

      // Parsear efectos (en un caso real, esto sería estructura)
      const efectos = {
        reputacion: exitoso ? 30 : -15,
        trauma: exitoso ? 0 : 10,
        conocimiento: exitoso ? 5 : 0,
        skills: exitoso ? [`maestro_${npc.id}`] : [],
      };

      completarDesafioNpc(npc.id, exitoso, efectos);
    } else {
      // Completar actividad de etapa
      avanzoNpc(npc.id, "completar_actividad");
      // Pasar a siguiente etapa
      avanzoNpc(npc.id, "pasar_etapa");
    }

    onComplete();
  };

  if (mostrarIntro) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => {
            setMostrarIntro(false);
            sfx.click?.();
          }}
          onMouseEnter={() => sfx.hover?.()}
          className="btn btn-cyan text-sm"
        >
          ← Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal p-8 space-y-6"
        >
          {/* Header */}
          <div>
            <div className="text-5xl mb-4">{npc.icono}</div>
            <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
              {esMisionFinal ? "DESAFÍO FINAL" : `ETAPA ${progreso.etapaActual}`}
            </h2>
            <p className="font-serif-juridica text-doc-aged/70 italic">
              {esMisionFinal
                ? mision?.descripcion
                : etapa?.descripcion}
            </p>
          </div>

          {/* Contexto */}
          {esMisionFinal && mision && (
            <div className="border-l-4 border-neon-orange pl-4">
              <p className="font-serif-juridica text-doc-aged/80 leading-relaxed">
                {mision.contexto}
              </p>
            </div>
          )}

          {/* Requisitos / Tipo */}
          <div className="bg-terminal-darker/50 p-6 rounded border border-parchment/20">
            <div className="font-mono-terminal text-[9px] text-parchment/50 uppercase tracking-wider mb-3">
              {esMisionFinal ? "TIPO DE DESAFÍO" : "TIPO DE ACTIVIDAD"}
            </div>
            <div className="font-mono-terminal text-doc-aged/75 capitalize">
              {esMisionFinal
                ? `${mision?.tipo} (Dificultad: ${mision?.dificultad})`
                : etapa?.actividad}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={() => setMostrarIntro(false)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-green flex-1"
            >
              Comenzar {esMisionFinal ? "Desafío" : "Actividad"}
            </button>
            <button
              onClick={() => {
                onVolver();
                sfx.click?.();
              }}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-cyan flex-1"
            >
              Volver
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Aquí iría el componente específico según el tipo de actividad
  // Por ahora, placeholder
  return (
    <div className="space-y-6">
      <button
        onClick={() => setMostrarIntro(true)}
        onMouseEnter={() => sfx.hover?.()}
        className="btn btn-cyan text-sm"
      >
        ← Volver a Intro
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal p-8 space-y-6 text-center"
      >
        <h2 className="font-display-grave text-3xl text-doc-aged">
          {esMisionFinal ? "Desafío Final" : "Actividad"}
        </h2>

        {/* Placeholder de contenido */}
        <div className="bg-terminal-darker/50 p-8 rounded border border-parchment/20 space-y-4">
          <p className="font-serif-juridica text-doc-aged/70">
            {esMisionFinal
              ? `Sistema de ${mision?.tipo} no implementado aún`
              : `Sistema de ${etapa?.actividad} no implementado aún`}
          </p>

          {/* Para testing: botones de simulación */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleCompletarActividad(true)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-green"
            >
              ✓ Completar Exitosamente (TEST)
            </button>
            <button
              onClick={() => handleCompletarActividad(false)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-red"
            >
              ✗ Fallar (TEST)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
