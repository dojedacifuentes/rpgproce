"use client";
import { motion } from "framer-motion";

// ============================================================================
// RADAR DOCTRINAL — visualización tipo radar de tu dominio por área
// Muestra cuán fuerte estás en cada rama: competencia, recursos, prueba,
// ejecutivo, cautelares, notificaciones, oralidad.
// ============================================================================

type Eje = { nombre: string; valor: number; zona: string };

export default function RadarDoctrinal({ ejes, size = 280 }: { ejes: Eje[]; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const radio = (size / 2) * 0.78;
  const n = ejes.length;

  // genera puntos para cada eje (valor /100 del radio)
  const puntos = ejes.map((e, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (e.valor / 100) * radio;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      labelX: cx + Math.cos(angle) * (radio + 16),
      labelY: cy + Math.sin(angle) * (radio + 16),
      axisX: cx + Math.cos(angle) * radio,
      axisY: cy + Math.sin(angle) * radio,
      zona: e.zona,
      nombre: e.nombre,
      valor: e.valor,
    };
  });

  const polygon = puntos.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="terminal p-4">
      <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos mb-2">RADAR DOCTRINAL</div>
      <div className="relative flex justify-center">
        <svg width={size} height={size}>
          {/* círculos concéntricos */}
          {[0.25, 0.5, 0.75, 1].map((r, i) => (
            <circle key={i} cx={cx} cy={cy} r={radio * r} fill="none" stroke="rgba(75,231,255,.1)" strokeWidth="0.5" />
          ))}
          {/* ejes radiales */}
          {puntos.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.axisX} y2={p.axisY} stroke="rgba(75,231,255,.08)" strokeWidth="0.5" />
          ))}
          {/* polígono de valores */}
          <motion.polygon
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            points={polygon}
            fill="rgba(138,92,255,.15)"
            stroke="var(--zona-recursos)"
            strokeWidth="1.5"
          />
          {/* puntos en cada vértice */}
          {puntos.map((p, i) => (
            <motion.circle
              key={i}
              initial={{ r: 0 }}
              animate={{ r: 3 }}
              transition={{ delay: i * 0.08 }}
              cx={p.x}
              cy={p.y}
              fill={`var(--zona-${p.zona})`}
              style={{ filter: `drop-shadow(0 0 4px var(--zona-${p.zona}))` }}
            />
          ))}
          {/* labels */}
          {puntos.map((p, i) => (
            <g key={i}>
              <text
                x={p.labelX}
                y={p.labelY}
                fontSize="9"
                fontFamily="JetBrains Mono"
                fill={`var(--zona-${p.zona})`}
                textAnchor={p.labelX < cx - 20 ? "end" : p.labelX > cx + 20 ? "start" : "middle"}
                dominantBaseline="middle"
                opacity="0.85"
              >
                {p.nombre.toUpperCase()}
              </text>
              <text
                x={p.labelX}
                y={p.labelY + 10}
                fontSize="8"
                fontFamily="JetBrains Mono"
                fill="rgba(232,223,197,.4)"
                textAnchor={p.labelX < cx - 20 ? "end" : p.labelX > cx + 20 ? "start" : "middle"}
              >
                {p.valor}
              </text>
            </g>
          ))}
          {/* punto central */}
          <circle cx={cx} cy={cy} r="2" fill="var(--zona-competencia)" />
        </svg>
      </div>
    </div>
  );
}
