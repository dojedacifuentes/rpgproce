"use client";
import { motion } from "framer-motion";

// ============================================================================
// TIMELINE PROCESAL VIVO — visualización lineal del juicio ordinario
// Marca etapa actual + etapas completadas + etapas pendientes.
// ============================================================================

type Etapa = {
  id: string;
  nombre: string;
  art: string;
  zona: string;
  estado: "completada" | "actual" | "pendiente" | "fallida";
};

export default function TimelineProcesal({ etapas, label = "Línea procesal" }: { etapas: Etapa[]; label?: string }) {
  return (
    <div className="terminal p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos">{label}</span>
        <span className="font-mono-terminal text-[10px] text-doc-aged/40">
          {etapas.filter((e) => e.estado === "completada").length} / {etapas.length}
        </span>
      </div>

      {/* Línea horizontal con nodos */}
      <div className="relative">
        {/* línea base */}
        <div className="absolute top-3 left-0 right-0 h-px bg-bg-steel" />
        {/* línea de progreso */}
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${(etapas.findIndex((e) => e.estado === "actual") + 1) / etapas.length * 100}%`,
          }}
          transition={{ duration: 1 }}
          className="absolute top-3 left-0 h-px"
          style={{ background: "linear-gradient(90deg, var(--zona-competencia), var(--zona-recursos))" }}
        />

        <div className="flex justify-between relative">
          {etapas.map((e, i) => {
            const color =
              e.estado === "completada" ? "var(--zona-cautelares)" :
              e.estado === "actual" ? `var(--zona-${e.zona})` :
              e.estado === "fallida" ? "var(--zona-nulidad)" :
              "var(--bg-steel)";
            return (
              <div key={e.id} className="flex flex-col items-center max-w-[80px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`w-6 h-6 border-2 ${e.estado === "actual" ? "animate-pulse_zone" : ""}`}
                  style={{
                    borderColor: color,
                    background: e.estado === "completada" || e.estado === "actual" ? color : "var(--bg-deep)",
                    boxShadow: e.estado === "actual" ? `0 0 12px ${color}` : "none",
                  }}
                />
                <div className="text-[9px] mt-2 text-center font-mono-terminal uppercase tracking-widest text-doc-aged/70 leading-tight">
                  {e.nombre}
                </div>
                <div className="text-[8px] text-doc-aged/30 font-mono-terminal mt-0.5">{e.art}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
