"use client";
import { motion } from "framer-motion";
import type { Npc } from "@/data/npcs-v2";
import type { EstadoNpc } from "@/types/game";

interface NPCCardProps {
  npc: Npc;
  estado: EstadoNpc;
  etapaActual: number;
  desbloqueado: boolean;
  requiereNpc?: string; // nombre del NPC requerido si está bloqueado
  onClick: () => void;
}

const estadoTexto: Record<EstadoNpc, string> = {
  "no_iniciada": "No iniciada",
  "en_progreso_etapa_1": "Etapa 1",
  "en_progreso_etapa_2": "Etapa 2",
  "en_progreso_etapa_3": "Etapa 3",
  "desafio_final": "Desafío Final",
  "completada": "✓ Completada",
  "fallida": "✗ Fallida",
};

const estadoColor: Record<EstadoNpc, string> = {
  "no_iniciada": "text-doc-aged/50",
  "en_progreso_etapa_1": "text-zona-notificaciones",
  "en_progreso_etapa_2": "text-zona-notificaciones",
  "en_progreso_etapa_3": "text-zona-notificaciones",
  "desafio_final": "text-zona-ejecutivo",
  "completada": "text-zona-cautelares",
  "fallida": "text-zona-nulidad",
};

export default function NPCCard({
  npc,
  estado,
  etapaActual,
  desbloqueado,
  requiereNpc,
  onClick,
}: NPCCardProps) {
  if (!desbloqueado) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="zona-card p-6 opacity-40 cursor-not-allowed"
        style={{ "--zona-color": "var(--zona-nulidad)" } as React.CSSProperties}
      >
        <div className="flex gap-4">
          <div className="text-4xl">🔒</div>
          <div className="flex-grow">
            <h3 className="font-display-grave text-lg text-doc-aged/70 mb-1">
              {npc.nombre}
            </h3>
            <p className="text-doc-aged/50 text-xs font-mono-terminal">
              Requiere completar: {requiereNpc}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={!desbloqueado}
      className="zona-card p-6 text-left w-full hover:shadow-lg transition-shadow"
      style={
        { "--zona-color": "var(--zona-nulidad)" } as React.CSSProperties
      }
    >
      <div className="flex gap-4">
        {/* Icono */}
        <div className="text-4xl flex-shrink-0">{npc.icono}</div>

        {/* Contenido principal */}
        <div className="flex-grow min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="font-display-grave text-lg text-doc-aged">
              {npc.nombre}
            </h3>
            <span className={`text-xs font-mono-terminal whitespace-nowrap ${estadoColor[estado]}`}>
              {estadoTexto[estado]}
            </span>
          </div>

          <p className="text-doc-aged/70 text-sm font-serif-juridica italic mb-3">
            {npc.especialidad}
          </p>

          {/* Barra de progreso visual */}
          <div className="flex gap-1 mb-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  etapaActual >= num
                    ? "bg-zona-cautelares"
                    : "bg-doc-aged/20"
                }`}
              />
            ))}
            <div
              className={`h-2 flex-1 rounded-full transition-colors ${
                estado === "desafio_final" || estado === "completada"
                  ? "bg-zona-ejecutivo"
                  : "bg-doc-aged/20"
              }`}
            />
          </div>

          {/* Etapa actual */}
          {estado !== "completada" && estado !== "fallida" && (
            <p className="text-[10px] font-mono-terminal text-doc-aged/50 uppercase tracking-wider">
              {estado === "no_iniciada"
                ? "Arco no iniciado"
                : estado === "desafio_final"
                ? "Desafío final disponible"
                : `${npc.arco_principal.etapas[etapaActual - 1]?.titulo || "Etapa"} — ${npc.arco_principal.etapas[etapaActual - 1]?.actividad || "Próxima actividad"}`}
            </p>
          )}
        </div>

        {/* Flecha */}
        <div className="text-zona-nulidad text-xl flex-shrink-0">→</div>
      </div>
    </motion.button>
  );
}
