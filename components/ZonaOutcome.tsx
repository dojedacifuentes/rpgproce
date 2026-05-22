"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { sfx } from "@/lib/audio";

interface ZonaOutcomeProps {
  mundo: string;
  tasaAcierto: number;
  tiempoMinutos: number;
  onVolver: () => void;
}

export default function ZonaOutcome({
  mundo,
  tasaAcierto,
  tiempoMinutos,
  onVolver,
}: ZonaOutcomeProps) {
  // Narrativa dinámica basada en desempeño
  const getNarrativa = () => {
    if (tasaAcierto >= 0.85) {
      return {
        titulo: "El expediente respira.",
        resultado: "Impecable.",
        frase: "La comisión nota que entiendes el código.",
        npc: "📚",
        efecto: "reputacion",
      };
    } else if (tasaAcierto >= 0.70) {
      return {
        titulo: "Subsanaciones necesarias.",
        resultado: "Aceptable, pero frágil.",
        frase: "El tribunal advierte irregularidades menores. Subsanables.",
        npc: "⚖️",
        efecto: "mixto",
      };
    } else if (tasaAcierto >= 0.50) {
      return {
        titulo: "La nulidad continúa expandiéndose.",
        resultado: "Insuficiente.",
        frase: "Los recursos resultaron inútiles. El expediente sigue enfermo.",
        npc: "⚠️",
        efecto: "trauma",
      };
    } else {
      return {
        titulo: "El colapso procesal.",
        resultado: "Catastrófico.",
        frase: "La Corte revisará los autos. No te gustará lo que encuentren.",
        npc: "💀",
        efecto: "trauma_grave",
      };
    }
  };

  const narrativa = getNarrativa();

  const getSecretEvent = () => {
    if (mundo === "recursos" && tasaAcierto >= 0.8) {
      return {
        titulo: "🔓 SUBMUNDO DESBLOQUEADO",
        descripcion: "Archivo de Recursos Perdidos",
        detalle:
          "En los sótanos del tribunal hay expedientes de recursos históricos...",
      };
    }
    if (mundo === "ejecutivo" && tasaAcierto >= 0.75) {
      return {
        titulo: "📋 NOTIFICACIÓN URGENTE",
        descripcion: "El Receptor te necesita",
        detalle:
          "Una tercería ha sido interpuesta. El demandado reclama dominio del bien.",
      };
    }
    if (mundo === "prueba" && tasaAcierto >= 0.8) {
      return {
        titulo: "💡 DESCUBRIMIENTO DOCTRINAL",
        descripcion: "Prof. Torres publica artículo",
        detalle:
          "Una nueva interpretación sobre preclusión. Tu caso anterior cobra nueva relevancia.",
      };
    }
    return null;
  };

  const secretEvent = getSecretEvent();

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-terminal-darker border-2 border-neon-purple/60 rounded max-w-2xl w-full shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-terminal-darker border-b border-neon-purple/40 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{narrativa.npc}</span>
            <div>
              <h2 className="font-display-grave text-2xl text-neon-purple">
                {narrativa.titulo}
              </h2>
              <p className="text-sm text-parchment/50 font-mono-terminal">
                ZONA: {mundo.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`p-4 border rounded ${
              tasaAcierto >= 0.7
                ? "border-neon-green/40 bg-neon-green/5"
                : "border-neon-red/40 bg-neon-red/5"
            }`}
          >
            <div
              className={`text-xs font-mono-terminal uppercase tracking-widest mb-2 ${
                tasaAcierto >= 0.7 ? "text-neon-green" : "text-neon-red"
              }`}
            >
              RESULTADO
            </div>
            <p className="font-serif-juridica italic text-doc-aged/90 text-base">
              {narrativa.resultado}
            </p>
            <p className="text-xs text-parchment/70 mt-2">{narrativa.frase}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="terminal p-3 text-center">
              <div className="text-xl font-display-grave text-neon-cyan">
                {Math.round(tasaAcierto * 100)}%
              </div>
              <div className="text-xs text-parchment/50 font-mono-terminal">
                Acierto
              </div>
            </div>
            <div className="terminal p-3 text-center">
              <div className="text-xl font-display-grave text-neon-yellow">
                {tiempoMinutos}m
              </div>
              <div className="text-xs text-parchment/50 font-mono-terminal">
                Tiempo
              </div>
            </div>
            <div className="terminal p-3 text-center">
              <div className="text-xl font-display-grave text-neon-purple">
                {tasaAcierto >= 0.8 ? "S" : tasaAcierto >= 0.6 ? "A" : "B"}
              </div>
              <div className="text-xs text-parchment/50 font-mono-terminal">
                Rango
              </div>
            </div>
          </motion.div>

          {/* Evento secreto */}
          {secretEvent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 border border-neon-purple/50 bg-neon-purple/10 rounded"
            >
              <div className="text-lg font-display-grave text-neon-purple mb-1">
                {secretEvent.titulo}
              </div>
              <div className="text-xs font-mono-terminal text-neon-purple/70 mb-2">
                {secretEvent.descripcion}
              </div>
              <p className="text-xs text-parchment/70 italic">
                {secretEvent.detalle}
              </p>
            </motion.div>
          )}

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <button
              onClick={onVolver}
              onMouseEnter={() => sfx.hover?.()}
              className="flex-1 btn bg-neon-purple text-terminal-darker font-bold"
            >
              Volver al Mapa
            </button>
            <Link
              href="/expansion"
              onMouseEnter={() => sfx.hover?.()}
              className="flex-1 btn text-center"
            >
              Hub Expansión
            </Link>
          </motion.div>
        </div>

        {/* Footer — Reflexión */}
        <div className="bg-terminal-darker border-t border-parchment/10 p-4">
          <p className="text-xs text-parchment/40 italic font-mono-terminal text-center">
            "La Ciudad Judicial continúa sin ti. Otros litigantes toman tus plazos."
          </p>
        </div>
      </motion.div>
    </div>
  );
}
