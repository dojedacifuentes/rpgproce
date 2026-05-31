"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { REGIONES, SENDERO, getRegion } from "@/data/reinos/regiones";
import { desafiosPorRegion } from "@/data/reinos/desafios";
import { useReinos } from "@/store/useReinos";

// ============================================================================
// REINOS — Overworld (mapa-mundo estilo SNES / Pokémon)
// Nodos por región posicionados en %, unidos por un sendero. La región final
// (Tribunal Supremo) se sella hasta vencer a las 6 anteriores: estructura
// endgame sin bloquear el estudio de las demás.
// ============================================================================

export default function ReinosOverworld() {
  const router = useRouter();
  const completadas = useReinos((s) => s.regionesCompletadas);
  const desafiosResueltos = useReinos((s) => s.desafiosResueltos);
  const [mounted, setMounted] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const estaCompletada = (id: string) => mounted && completadas.includes(id as any);

  // Tribunal Supremo: requiere las 6 regiones previas completadas
  const previas = REGIONES.filter((r) => r.id !== "tribunal_supremo");
  const supremoDesbloqueado = mounted && previas.every((r) => completadas.includes(r.id));

  const bloqueada = (id: string) => id === "tribunal_supremo" && !supremoDesbloqueado;

  const entrar = (id: string) => {
    if (bloqueada(id)) {
      sfx.warning?.();
      setAviso("El Tribunal Supremo permanece sellado. Vence a los 6 jefes de las regiones para abrir el último estrado.");
      return;
    }
    sfx.confirm?.();
    router.push(`/reinos/${id}`);
  };

  return (
    <div>
      {/* Lienzo del mapa */}
      <div
        className="relative w-full overflow-hidden border border-doc-aged/15"
        style={{ aspectRatio: "16 / 10", minHeight: 360, background: "radial-gradient(120% 90% at 50% 0%, rgba(216,180,90,0.05), transparent 60%), linear-gradient(180deg,#080a10,#0c0f16)" }}
      >
        {/* rejilla sutil */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(216,180,90,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(216,180,90,0.12) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
        />
        {/* estrellas titilantes */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={`star${i}`} className="reino-twinkle absolute rounded-full pointer-events-none" style={{
            left: `${(i * 37) % 96 + 2}%`, top: `${(i * 53) % 62 + 4}%`,
            width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
            background: "rgba(236,201,75,0.7)", animationDelay: `${(i * 0.37) % 3}s`,
          }} />
        ))}

        {/* Sendero (SVG por encima de la rejilla, debajo de los nodos) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {SENDERO.map(([from, to], i) => {
            const a = getRegion(from)!;
            const b = getRegion(to)!;
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 4;
            const sellada = to === "tribunal_supremo" && !supremoDesbloqueado;
            return (
              <path
                key={i}
                d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`}
                fill="none"
                stroke={sellada ? "rgba(120,120,140,0.35)" : "rgba(216,180,90,0.6)"}
                strokeWidth="0.8"
                strokeDasharray={sellada ? "1.5 2" : "2.5 2.5"}
                vectorEffect="non-scaling-stroke"
              >
                {!sellada && <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.1s" repeatCount="indefinite" />}
              </path>
            );
          })}
        </svg>

        {/* Nodos de región */}
        {REGIONES.map((r, i) => {
          const done = estaCompletada(r.id);
          const locked = bloqueada(r.id);
          const desRegion = desafiosPorRegion(r.id);
          const hechos = mounted ? desRegion.filter((d) => desafiosResueltos.includes(d.id)).length : 0;
          const total = desRegion.length;
          return (
            <motion.button
              key={r.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i, type: "spring", stiffness: 180 }}
              onClick={() => entrar(r.id)}
              onMouseEnter={() => !locked && sfx.hover?.()}
              className="reino-node absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[72px] md:w-[96px]"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              title={r.nombre}
            >
              {/* halo */}
              <span
                className={`absolute rounded-full ${!locked ? "reino-pulse" : ""}`}
                style={{
                  width: 56, height: 56, top: -4,
                  background: locked ? "transparent" : `radial-gradient(circle, ${r.paleta.primary}30, transparent 70%)`,
                }}
              />
              {/* disco del nodo */}
              <span
                className="relative flex items-center justify-center rounded-full border-2"
                style={{
                  width: 48, height: 48,
                  borderColor: locked ? "rgba(120,120,140,0.5)" : r.paleta.primary,
                  background: "rgba(8,10,16,0.92)",
                  boxShadow: locked ? "none" : `0 0 16px ${r.paleta.primary}55`,
                  filter: locked ? "grayscale(1)" : "none",
                }}
              >
                <span className="text-2xl">{locked ? "🔒" : r.icono}</span>
                {done && (
                  <span className="absolute -top-1.5 -right-1.5 text-sm" title="Región conquistada">👑</span>
                )}
              </span>
              {/* progreso de la región */}
              {!locked && total > 0 && (
                <span
                  className="mt-1 px-1.5 rounded-full font-mono-terminal"
                  style={{ fontSize: 8, lineHeight: "13px", background: "rgba(6,7,11,.85)", border: `1px solid ${r.paleta.primary}66`, color: done ? "#58F5B0" : r.paleta.primary }}
                >
                  {done ? "✓ lista" : `${hechos}/${total}`}
                </span>
              )}
              {/* etiqueta */}
              <span
                className="mt-1 font-mono-terminal text-center leading-tight px-1 rounded"
                style={{ fontSize: 9.5, color: locked ? "rgba(180,190,200,0.6)" : "#e8dfc5", background: "rgba(6,7,11,.5)", letterSpacing: ".03em", textShadow: "0 1px 3px #000" }}
              >
                {r.orden}. {r.nombre.replace("de las ", "").replace("de la ", "").replace("de los ", "").replace("de el ", "")}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Aviso de bloqueo */}
      {aviso && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 border border-doc-aged/20 font-mono-terminal text-[11px] text-doc-aged/70 flex items-center justify-between gap-3"
        >
          <span>🔒 {aviso}</span>
          <button onClick={() => setAviso(null)} className="text-doc-aged/40 hover:text-doc-aged">✕</button>
        </motion.div>
      )}

      {/* Leyenda */}
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono-terminal text-[10px] text-doc-aged/55">
        <span>👑 región conquistada</span>
        <span>◷ {mounted ? completadas.length : 0}/{REGIONES.length} regiones</span>
        <span>🔒 sellado hasta vencer las 6 regiones</span>
      </div>
    </div>
  );
}
