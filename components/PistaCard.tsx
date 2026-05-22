"use client";
import { motion } from "framer-motion";
import { Pista } from "@/data/casos-investigativos";
import { sfx } from "@/lib/audio";

// ============================================================================
// PISTA CARD — v3 visual system
// Muestra una pieza de evidencia en el tablero investigativo.
// ============================================================================

interface PistaCardProps {
  pista: Pista;
  descubierta: boolean;
  clickeable?: boolean;
  conectada?: boolean;
  relevancia?: number; // 0-100
  onClick?: () => void;
  onExpandir?: () => void;
}

const TIPO_ICONS: Record<string, string> = {
  documento: "📄",
  testimonio: "🗣️",
  articulo: "⚖️",
  fechas: "📅",
  dialogo: "💬",
};

// Mapeo de tipo → zona color
const TIPO_ZONA: Record<string, string> = {
  documento:  "var(--zona-notificaciones, #7AD4E6)",
  testimonio: "var(--zona-prueba)",
  articulo:   "var(--zona-recursos)",
  fechas:     "var(--zona-ejecutivo)",
  dialogo:    "var(--zona-competencia)",
};

export default function PistaCard({
  pista,
  descubierta,
  clickeable = true,
  conectada = false,
  relevancia = 0,
  onClick,
  onExpandir,
}: PistaCardProps) {
  if (!descubierta) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="terminal p-4"
        style={{ borderColor: "rgba(255,255,255,.06)", opacity: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 h-20">
          <span className="text-3xl">🔒</span>
          <div className="text-center">
            <p className="text-xs font-mono-terminal text-doc-aged/40">PISTA OCULTA</p>
            <p className="text-[10px] text-doc-aged/25">Explora para revelar</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const zonaColor = TIPO_ZONA[pista.tipo] ?? "var(--zona-recursos)";
  const glowStyle = conectada && relevancia > 50
    ? { boxShadow: `0 0 18px ${zonaColor}30` }
    : relevancia > 70
    ? { boxShadow: `0 0 12px ${zonaColor}20` }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={clickeable ? { scale: 1.02, x: 3 } : undefined}
      onClick={() => {
        if (clickeable && onClick) { sfx.click(); onClick(); }
      }}
      onMouseEnter={() => { if (clickeable) sfx.hover(); }}
      className="terminal p-4 transition-all relative overflow-hidden group"
      style={{
        borderColor: clickeable ? `${zonaColor}35` : "rgba(255,255,255,.06)",
        background: clickeable ? `${zonaColor}05` : "transparent",
        cursor: clickeable ? "pointer" : "default",
        opacity: clickeable ? 1 : 0.6,
        ...glowStyle,
      }}
    >
      {/* Relevance indicator strip */}
      {relevancia > 0 && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${relevancia}%` }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-0 left-0 h-px"
          style={{ background: zonaColor }}
        />
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl flex-shrink-0">{TIPO_ICONS[pista.tipo]}</span>
        <div className="flex-grow min-w-0">
          <div
            className="text-[8px] font-mono-terminal uppercase tracking-widest mb-0.5"
            style={{ color: zonaColor }}
          >
            {pista.tipo}
          </div>
          <p className="font-serif-juridica text-sm text-doc-aged leading-tight">
            {pista.titulo}
          </p>
        </div>
      </div>

      {/* Content preview */}
      <div className="mb-2 pl-11">
        <p className="text-[10px] text-doc-aged/60 italic line-clamp-2 leading-relaxed font-mono-terminal">
          {pista.contenido.substring(0, 110)}{pista.contenido.length > 110 ? "…" : ""}
        </p>
      </div>

      {/* Artículos */}
      <div className="flex flex-wrap gap-1 pl-11 mb-2">
        {pista.articulos.map((art) => (
          <span
            key={art}
            className="text-[7px] font-mono-terminal px-1.5 py-0.5 border"
            style={{ borderColor: `${zonaColor}40`, color: `${zonaColor}cc` }}
          >
            {art}
          </span>
        ))}
      </div>

      {/* Indicators row */}
      <div className="flex items-center justify-between pl-11 text-[9px] font-mono-terminal">
        <div className="flex gap-2 text-doc-aged/40">
          {conectada && (
            <span style={{ color: zonaColor }}>◆ Conectada</span>
          )}
          {pista.esRoja && (
            <span className="text-zona-nulidad">⚠ Pista falsa</span>
          )}
        </div>
        {relevancia > 0 && (
          <div
            className="w-10 h-0.5 bg-doc-aged/10 overflow-hidden"
            title={`Relevancia: ${relevancia}%`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${relevancia}%` }}
              transition={{ delay: 0.4 }}
              className="h-full"
              style={{ background: zonaColor }}
            />
          </div>
        )}
      </div>

      {/* Expand button */}
      {onExpandir && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            sfx.click();
            onExpandir();
          }}
          className="absolute top-2 right-2 text-[9px] font-mono-terminal text-doc-aged/25 hover:text-doc-aged/60 transition-colors opacity-0 group-hover:opacity-100"
        >
          [+]
        </button>
      )}
    </motion.div>
  );
}
