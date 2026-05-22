"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { getNpcsInZona } from "@/data/npcs";
import { getEventosInZona } from "@/data/eventos-mundo";

interface ZonaCardProps {
  zonaId: string;
  zonaNombre: string;
  descripcion: string;
  href: string;
  color: string;
  emoji: string;
}

export default function ZonaCard({
  zonaId,
  zonaNombre,
  descripcion,
  href,
  color,
  emoji,
}: ZonaCardProps) {
  const npcs = getNpcsInZona(zonaId);
  const eventos = getEventosInZona(zonaId);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <Link
        href={href}
        className={`block zona-card p-5 relative border-2 border-${color}/40 hover:border-${color}/80 transition-colors`}
        style={{ "--zona-color": `var(--zona-${zonaId})` } as React.CSSProperties}
      >
        {/* Header con emoji y nombre */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{emoji}</span>
            <div>
              <h3 className={`font-display-grave text-lg text-${color}`}>{zonaNombre}</h3>
              <p className="text-xs text-parchment/50 font-mono-terminal">{zonaId.toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-parchment/70 text-xs leading-relaxed mb-4">{descripcion}</p>

        {/* NPCs */}
        {npcs.length > 0 && (
          <div className="mb-3 pb-3 border-b border-parchment/10">
            <div className="text-xs font-mono-terminal text-parchment/50 mb-1">👥 PERSONAJES ({npcs.length})</div>
            <div className="flex flex-wrap gap-1">
              {npcs.map((npc) => (
                <motion.div
                  key={npc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs px-2 py-1 rounded bg-${color}/10 border border-${color}/40 text-${color} font-mono-terminal`}
                  title={npc.nombre}
                >
                  {npc.emoji} {npc.nombre.split(" ")[0]}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Eventos */}
        {eventos.length > 0 && (
          <div className="pb-3">
            <div className="text-xs font-mono-terminal text-parchment/50 mb-1">📌 EVENTOS ({eventos.length})</div>
            <div className="space-y-1">
              {eventos.slice(0, 2).map((evento) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-parchment/60 flex items-center gap-2"
                >
                  <span className="text-lg">
                    {evento.tipo === "encuentro_npc" && "👤"}
                    {evento.tipo === "noticia_jurisprudencia" && "📜"}
                    {evento.tipo === "peligro_nulidad" && "⚠️"}
                    {evento.tipo === "oportunidad_caso" && "💼"}
                    {evento.tipo === "cambio_clima_juridico" && "🌪️"}
                    {evento.tipo === "conflicto_con_adversario" && "⚔️"}
                    {evento.tipo === "descubrimiento_doctrinal" && "💡"}
                    {evento.tipo === "crisis_economia" && "📉"}
                  </span>
                  <span>{evento.titulo}</span>
                </motion.div>
              ))}
              {eventos.length > 2 && (
                <div className="text-xs text-parchment/40 italic">+ {eventos.length - 2} más</div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className={`mt-4 pt-3 border-t border-${color}/20 flex items-center justify-between`}>
          <span className={`text-xs font-mono-terminal text-${color}/70`}>
            {npcs.length + eventos.length} encuentros posibles
          </span>
          <span className={`text-sm font-display-grave text-${color}`}>▸</span>
        </div>
      </Link>
    </motion.div>
  );
}
