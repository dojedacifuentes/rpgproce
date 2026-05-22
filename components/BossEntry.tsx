"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { type Boss } from "@/data/campaign";
import { sfx } from "@/lib/audio";

// ============================================================================
// BOSS ENTRY — Entrada cinemática de boss
// Inspiración: Hades, Hollow Knight, Mega Man
// ============================================================================

interface BossEntryProps {
  boss: Boss;
  onStart: () => void;
  onCancel: () => void;
}

export default function BossEntry({ boss, onStart, onCancel }: BossEntryProps) {
  const [phase, setPhase] = useState<"blackout" | "reveal" | "name" | "ready">("blackout");
  const [vidaActual, setVidaActual] = useState(0);

  useEffect(() => {
    sfx.bossEntrada?.();
    const t1 = setTimeout(() => setPhase("reveal"), 600);
    const t2 = setTimeout(() => setPhase("name"), 1400);
    const t3 = setTimeout(() => {
      setPhase("ready");
      // Animar barra de vida del boss
      setVidaActual(boss.vidaMax);
    }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [boss.vidaMax]);

  const pct = (vidaActual / boss.vidaMax) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(0,0,0,.95)" }}
      >
        {/* FONDO ANIMADO */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% 50%, ${boss.color}15, transparent 60%),
              radial-gradient(ellipse 60% 40% at 50% 0%, ${boss.color}08, transparent)
            `,
          }}
        />

        {/* LÍNEAS DE ENERGÍA */}
        {phase !== "blackout" && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 0.3, delay: i * 0.1, repeat: 3 }}
                style={{
                  background: `linear-gradient(${i * 60}deg, transparent 45%, ${boss.color}20 50%, transparent 55%)`,
                }}
              />
            ))}
          </>
        )}

        {/* CONTENIDO CENTRAL */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full">

          {/* ICONO DEL BOSS */}
          <AnimatePresence>
            {phase !== "blackout" && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="boss-entrance mb-6"
                style={{
                  fontSize: "6rem",
                  filter: `drop-shadow(0 0 30px ${boss.color}) drop-shadow(0 0 60px ${boss.color}60)`,
                }}
              >
                {boss.icono}
              </motion.div>
            )}
          </AnimatePresence>

          {/* NOMBRE DEL BOSS */}
          <AnimatePresence>
            {(phase === "name" || phase === "ready") && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="mb-4"
              >
                <div
                  className="font-mono-terminal text-[10px] uppercase tracking-[0.5em] mb-2"
                  style={{ color: boss.color }}
                >
                  ⚔ BOSS ⚔
                </div>
                <h1
                  className="font-display-grave text-4xl md:text-6xl"
                  style={{
                    color: boss.color,
                    textShadow: `0 0 30px ${boss.color}80, 0 0 60px ${boss.color}40`,
                  }}
                >
                  {boss.nombre}
                </h1>
                <p className="font-serif-juridica italic text-doc-aged/70 text-lg mt-2">
                  {boss.titulo}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BARRA DE VIDA DEL BOSS */}
          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full max-w-md mb-8"
            >
              <div className="flex justify-between text-[9px] font-mono-terminal mb-1">
                <span style={{ color: boss.color }}>VIDA DEL BOSS</span>
                <span className="text-zona-nulidad">{boss.vidaMax} HP</span>
              </div>
              <div className="h-3 bg-bg-steel rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{
                    background: `linear-gradient(90deg, ${boss.color}, ${boss.color}80)`,
                    boxShadow: `0 0 12px ${boss.color}60`,
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* DESCRIPCIÓN + ATAQUES */}
          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 max-w-lg"
            >
              <p className="font-serif-juridica text-doc-aged/80 italic mb-4">
                {boss.descripcion}
              </p>
              <div
                className="border p-3 text-left space-y-1 text-sm"
                style={{ borderColor: `${boss.color}30`, background: `${boss.color}05` }}
              >
                <div className="font-mono-terminal text-[9px] uppercase tracking-wider mb-2" style={{ color: boss.color }}>
                  Ataques conocidos
                </div>
                {boss.ataques.map((ataque, i) => (
                  <div key={i} className="font-mono-terminal text-[10px] text-doc-aged/70 flex items-start gap-2">
                    <span style={{ color: boss.color }}>▸</span>
                    <span>{ataque}</span>
                  </div>
                ))}
                <div className="border-t border-doc-aged/10 pt-2 mt-2 font-mono-terminal text-[9px]">
                  <span className="text-zona-cautelares">Debilidad: </span>
                  <span className="text-doc-aged/60">{boss.debilidad}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* BOTONES */}
          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <button
                onClick={onStart}
                onMouseEnter={() => sfx.hover?.()}
                className="px-8 py-3 font-display-grave tracking-widest text-sm border transition-all hover:scale-105"
                style={{
                  borderColor: boss.color,
                  color: boss.color,
                  background: `${boss.color}15`,
                  boxShadow: `0 0 30px ${boss.color}40`,
                }}
              >
                ⚔ COMBATIR
              </button>
              <button
                onClick={onCancel}
                onMouseEnter={() => sfx.hover?.()}
                className="btn px-6 py-3 text-sm"
              >
                ← HUIR
              </button>
            </motion.div>
          )}
        </div>

        {/* ARTÍCULO CLAVE */}
        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 left-6 font-mono-terminal text-[9px]"
            style={{ color: `${boss.color}60` }}
          >
            {boss.articulo}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
