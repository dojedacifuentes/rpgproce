"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getNpc, type NpcId } from "@/data/npcs";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

interface EncuentroNpcProps {
  npcId: NpcId;
  onCerrar: () => void;
}

export default function EncuentroNpc({ npcId, onCerrar }: EncuentroNpcProps) {
  const npc = getNpc(npcId);
  const game = useGame();
  const [dialogoIdx, setDialogoIdx] = useState(0);
  const [efectosAplicados, setEfectosAplicados] = useState(false);

  if (!npc) return null;

  const dialogo = dialogoIdx === 0 ? npc.dialogo_inicial : npc.dialogos[dialogoIdx - 1];

  const aplicarEfecto = () => {
    if (!dialogo.efecto || efectosAplicados) return;

    if (dialogo.efecto.reputacion) {
      game.updateStats({ reputacion: game.stats.reputacion + dialogo.efecto.reputacion });
      sfx.oralCorrecta?.();
    }
    if (dialogo.efecto.trauma) {
      game.updateStats({ trauma: game.stats.trauma + dialogo.efecto.trauma });
      sfx.warning?.();
    }
    if (dialogo.efecto.nivelEconomico) {
      game.updateStats({ nivelEconomico: game.stats.nivelEconomico + dialogo.efecto.nivelEconomico });
    }

    game.pushLog(`${npc.nombre}: "${dialogo.texto}"`);
    if (dialogo.efecto.reputacion) game.pushLog(`+${dialogo.efecto.reputacion} Reputación`);
    if (dialogo.efecto.trauma) game.pushLog(`+${dialogo.efecto.trauma} Trauma`);
    if (dialogo.efecto.nivelEconomico) game.pushLog(`${dialogo.efecto.nivelEconomico > 0 ? '+' : ''}${dialogo.efecto.nivelEconomico} Nivel Económico`);

    setEfectosAplicados(true);
  };

  const siguienteDialogo = () => {
    if (dialogoIdx === 0) {
      setDialogoIdx(1);
      setEfectosAplicados(false);
    } else if (dialogoIdx < npc.dialogos.length) {
      setDialogoIdx(dialogoIdx + 1);
      setEfectosAplicados(false);
    } else {
      onCerrar();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-terminal-dark border-2 border-neon-cyan/50 rounded w-full max-w-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="bg-bg-deep border-b border-neon-cyan/30 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{npc.emoji}</span>
              <div>
                <h2 className="font-display-grave text-xl text-zona-competencia">{npc.nombre}</h2>
                <p className="text-xs text-doc-aged/60 font-mono-terminal">{npc.titulo}</p>
              </div>
            </div>
            <button
              onClick={onCerrar}
              className="text-zona-nulidad text-xl font-bold hover:scale-125 transition-transform"
            >
              ✕
            </button>
          </div>

          {/* Descripción */}
          <div className="p-4 border-b border-neon-cyan/20">
            <p className="text-xs text-doc-aged/70 font-mono-terminal leading-relaxed">{npc.descripcion}</p>
            <p className="text-xs text-doc-aged/50 italic mt-2">Personalidad: {npc.personalidad}</p>
          </div>

          {/* Diálogo */}
          <div className="p-6 space-y-4">
            <motion.div
              key={`dialogo-${dialogoIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bg-deep border-l-4 border-neon-cyan p-4 rounded"
            >
              <p className="text-doc-aged/85 font-serif-juridica text-sm leading-relaxed italic">
                "{dialogo.texto}"
              </p>
            </motion.div>

            {/* Efectos */}
            {dialogo.efecto && !efectosAplicados && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-neon-cyan/10 border border-neon-cyan/50 p-3 rounded text-xs text-zona-competencia font-mono-terminal space-y-1"
              >
                {dialogo.efecto.reputacion && (
                  <div>+ {dialogo.efecto.reputacion} Reputación</div>
                )}
                {dialogo.efecto.trauma && (
                  <div>+ {dialogo.efecto.trauma} Trauma</div>
                )}
                {dialogo.efecto.nivelEconomico && (
                  <div>{dialogo.efecto.nivelEconomico > 0 ? '+' : ''}{dialogo.efecto.nivelEconomico} Nivel Económico</div>
                )}
              </motion.div>
            )}

            {/* Stats después de aplicar */}
            {dialogo.efecto && efectosAplicados && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zona-cautelares/10 border border-zona-cautelares/50 p-3 rounded text-xs text-zona-cautelares font-mono-terminal"
              >
                ✓ Efectos aplicados
              </motion.div>
            )}
          </div>

          {/* Índice de diálogos */}
          <div className="px-6 py-2 bg-bg-deep border-t border-neon-cyan/20 text-xs text-doc-aged/50 font-mono-terminal">
            Diálogo {dialogoIdx === 0 ? "inicial" : dialogoIdx} de {npc.dialogos.length + 1}
          </div>

          {/* Botones */}
          <div className="p-4 bg-bg-deep border-t border-neon-cyan/20 flex gap-2">
            {!efectosAplicados && dialogo.efecto ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={aplicarEfecto}
                className="flex-1 btn bg-neon-cyan text-bg-deep font-bold text-sm"
              >
                Escuchar ({dialogo.efecto.reputacion ? '+Rep' : dialogo.efecto.trauma ? '+Trauma' : '+Econ'})
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={siguienteDialogo}
                className="flex-1 btn"
              >
                {dialogoIdx < npc.dialogos.length ? "Siguiente diálogo →" : "Cerrar ✕"}
              </motion.button>
            )}
          </div>

          {/* Misión (si existe) */}
          {npc.mision && (
            <div className="p-4 bg-neon-violet/5 border-t border-neon-violet/30">
              <div className="text-xs font-mono-terminal text-neon-violet mb-1">⚔️ MISIÓN DISPONIBLE</div>
              <div className="text-sm font-display-grave text-doc-aged/90 mb-2">{npc.mision.titulo}</div>
              <p className="text-xs text-doc-aged/70 leading-relaxed mb-2">{npc.mision.descripcion}</p>
              <div className="text-xs font-mono-terminal text-neon-violet">Recompensa: {npc.mision.recompensa}</div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
