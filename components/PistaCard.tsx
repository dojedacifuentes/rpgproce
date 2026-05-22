"use client";
import { motion } from "framer-motion";
import { Pista } from "@/data/casos-investigativos";
import { sfx } from "@/lib/audio";

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

const TIPO_COLORS: Record<string, string> = {
  documento: "border-neon-blue/50 bg-neon-blue/5",
  testimonio: "border-neon-cyan/50 bg-neon-cyan/5",
  articulo: "border-neon-purple/50 bg-neon-purple/5",
  fechas: "border-neon-yellow/50 bg-neon-yellow/5",
  dialogo: "border-neon-green/50 bg-neon-green/5",
};

const TIPO_TEXT_COLORS: Record<string, string> = {
  documento: "text-neon-blue",
  testimonio: "text-neon-cyan",
  articulo: "text-neon-purple",
  fechas: "text-neon-yellow",
  dialogo: "text-neon-green",
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
    // Pista no descubierta — mostrar como cerrada
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 rounded border-2 border-parchment/20 bg-terminal-darker/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 h-20">
          <span className="text-3xl">🔒</span>
          <div className="text-center">
            <p className="text-xs font-mono-terminal text-parchment/40">
              PISTA OCULTA
            </p>
            <p className="text-[10px] text-parchment/30">Descubre más para revelar</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Pista descubierta
  const glow =
    conectada && relevancia > 50
      ? `shadow-[0_0_20px_rgba(34,211,238,0.4)]`
      : relevancia > 70
        ? `shadow-[0_0_15px_rgba(147,112,219,0.3)]`
        : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={clickeable ? { scale: 1.02, x: 4 } : undefined}
      onClick={() => {
        if (clickeable && onClick) {
          sfx.click?.();
          onClick();
        }
      }}
      onMouseEnter={() => {
        if (clickeable) sfx.hover?.();
      }}
      className={`
        p-4 rounded border-2 transition-all cursor-pointer
        ${TIPO_COLORS[pista.tipo]} ${glow}
        ${!clickeable ? "opacity-60 cursor-default" : ""}
        group
      `}
    >
      {/* Header: Tipo + Título */}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl flex-shrink-0">{TIPO_ICONS[pista.tipo]}</span>
        <div className="flex-grow">
          <div className={`text-[9px] font-mono-terminal uppercase tracking-wider mb-1 ${TIPO_TEXT_COLORS[pista.tipo]}`}>
            {pista.tipo.toUpperCase()}
          </div>
          <p className="font-serif-juridica text-sm text-parchment/90 leading-tight">
            {pista.titulo}
          </p>
        </div>
      </div>

      {/* Preview del contenido */}
      <div className="mb-2 pl-11">
        <p className="text-xs text-parchment/70 italic line-clamp-2 leading-relaxed">
          {pista.contenido.substring(0, 100)}
          {pista.contenido.length > 100 ? "..." : ""}
        </p>
      </div>

      {/* Artículos citados */}
      <div className="flex flex-wrap gap-1 pl-11 mb-2">
        {pista.articulos.map((art) => (
          <span
            key={art}
            className="text-[8px] font-mono-terminal px-1.5 py-0.5 border border-parchment/30 rounded text-parchment/60"
          >
            {art}
          </span>
        ))}
      </div>

      {/* Indicadores de relevancia y conexión */}
      <div className="flex items-center justify-between pl-11 text-[9px] font-mono-terminal text-parchment/50">
        <div className="flex gap-2">
          {conectada && (
            <span className="flex items-center gap-1">
              <span className="text-neon-cyan">◆</span> Conectada
            </span>
          )}
          {pista.esRoja && (
            <span className="flex items-center gap-1 text-neon-red">
              <span>⚠</span> Trampa
            </span>
          )}
        </div>
        {relevancia > 0 && (
          <div
            className="w-12 h-1 bg-parchment/20 rounded overflow-hidden"
            title={`Relevancia: ${relevancia}%`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${relevancia}%` }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`h-full ${
                relevancia > 80
                  ? "bg-neon-green"
                  : relevancia > 50
                    ? "bg-neon-cyan"
                    : "bg-parchment/40"
              }`}
            />
          </div>
        )}
      </div>

      {/* Botón de expandir (hover) */}
      {onExpandir && (
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            sfx.confirm?.();
            onExpandir();
          }}
          className="absolute top-2 right-2 text-xs font-mono-terminal text-parchment/50 hover:text-parchment/80 transition-colors"
        >
          [Expandir]
        </motion.button>
      )}
    </motion.div>
  );
}
