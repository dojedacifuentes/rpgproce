"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";
import { sfx, isMuted, setMuted, startAmbient, stopAmbient } from "@/lib/audio";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// HUD PERSISTENTE v2 — RPG Game HUD
// Superior derecha: stats litigante + audio + reloj
// Superior izquierda: XP bar + nivel
// Inferior izquierda: misión activa + monedas
// Inferior derecha: minimap indicator
// ============================================================================

const XP_PER_LEVEL = 100;

function XPBar({ xp, nivel }: { xp: number; nivel: number }) {
  const progress = ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
  return (
    <div className="flex items-center gap-2 min-w-[140px]">
      <div className="font-mono-terminal text-[9px] text-zona-cautelares shrink-0">Nv.{nivel}</div>
      <div className="flex-1 h-1.5 bg-bg-steel rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #58F5B0, #4BE7FF)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="font-mono-terminal text-[8px] text-doc-aged/40 shrink-0">{xp % XP_PER_LEVEL}/{XP_PER_LEVEL}</div>
    </div>
  );
}

function CoinCounter({ monedas }: { monedas: number }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 border border-zona-prueba/30 bg-bg-deep/70 backdrop-blur-sm">
      <span className="text-[11px]">🪙</span>
      <span className="font-mono-terminal text-[9px] text-zona-prueba">{monedas}</span>
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="border border-bg-steel px-1.5 py-1 text-center min-w-[48px]">
      <div className="font-mono-terminal text-[8px] text-doc-aged/40">{label}</div>
      <div className="font-display-grave text-xs" style={{ color }}>{value}</div>
    </div>
  );
}

export default function HUDPersistente() {
  const personaje = useGame((s) => s.personaje);
  const logros = useGame((s) => s.logros);
  const xp = useGame((s) => s.xp);
  const nivel = useGame((s) => s.nivel);
  const monedas = useGame((s) => s.monedas);
  const misionActiva = useGame((s) => s.misionActiva);

  const [muted, setMutedState] = useState(true);
  const [hora, setHora] = useState("");
  const [scanlinePulse, setScanlinePulse] = useState(false);
  const [prevXp, setPrevXp] = useState(xp);
  const [xpGain, setXpGain] = useState<number | null>(null);
  const [prevMonedas, setPrevMonedas] = useState(monedas);
  const [coinGain, setCoinGain] = useState<number | null>(null);

  useEffect(() => {
    setMutedState(isMuted());
    const t = setInterval(() => {
      setHora(new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    setHora(new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    const p = setInterval(() => {
      setScanlinePulse(true);
      setTimeout(() => setScanlinePulse(false), 600);
    }, 7000);
    return () => { clearInterval(t); clearInterval(p); };
  }, []);

  // Detectar ganancia de XP
  useEffect(() => {
    if (xp > prevXp) {
      const gain = xp - prevXp;
      setXpGain(gain);
      setTimeout(() => setXpGain(null), 2000);
    }
    setPrevXp(xp);
  }, [xp]);

  // Detectar ganancia de monedas
  useEffect(() => {
    if (monedas > prevMonedas) {
      const gain = monedas - prevMonedas;
      setCoinGain(gain);
      setTimeout(() => setCoinGain(null), 1800);
    }
    setPrevMonedas(monedas);
  }, [monedas]);

  function toggleAudio() {
    const nuevo = !muted;
    setMutedState(nuevo);
    setMuted(nuevo);
    if (nuevo) stopAmbient();
    else { startAmbient("ambiente"); sfx.click(); }
  }

  const hayPartida = !!personaje.nombre;

  return (
    <>
      {/* ─── BARRA SUPERIOR IZQUIERDA — XP + Nivel ─── */}
      {hayPartida && (
        <div className="fixed top-3 left-3 z-40 pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {/* Nombre + nivel */}
            <div className="flex items-center gap-2 px-2 py-1 border border-zona-competencia/20 bg-bg-deep/80 backdrop-blur-sm">
              <span className="font-display-grave text-[10px] text-doc-aged truncate max-w-[100px]">{personaje.nombre}</span>
              <span className="font-mono-terminal text-[8px] text-zona-cautelares">Nv.{nivel}</span>
            </div>
            {/* XP Bar */}
            <div className="px-2 py-1 border border-zona-competencia/15 bg-bg-deep/75 backdrop-blur-sm">
              <XPBar xp={xp} nivel={nivel} />
            </div>
          </div>
        </div>
      )}

      {/* ─── BARRA SUPERIOR DERECHA — Stats + reloj + audio ─── */}
      <div className="fixed top-3 right-3 z-40 pointer-events-none">
        <div className="flex items-center gap-2 text-[9px] font-mono-terminal uppercase tracking-widest pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 border border-zona-cautelares/30 bg-bg-deep/70 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-zona-cautelares rounded-full animate-flicker" />
            <span className="text-zona-cautelares">ONLINE</span>
          </div>
          <div className="px-2 py-1 border border-zona-competencia/30 bg-bg-deep/70 backdrop-blur-sm text-zona-competencia">
            {hora}
          </div>
          <button
            onClick={toggleAudio}
            className={`px-2 py-1 border bg-bg-deep/70 backdrop-blur-sm transition-colors ${
              muted ? "border-doc-aged/30 text-doc-aged/40" : "border-zona-recursos/40 text-zona-recursos"
            }`}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      {/* ─── PANEL INFERIOR IZQUIERDA — Telemetría + Monedas + Misión ─── */}
      {hayPartida && (
        <div className="fixed bottom-3 left-3 z-40 pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {/* Stats Row */}
            <div className="flex gap-1">
              <StatChip label="REP" value={personaje.reputacion} color="var(--zona-recursos)" />
              <StatChip label="TRA" value={personaje.trauma} color="var(--zona-nulidad)" />
              <StatChip label="LOG" value={logros.length} color="var(--zona-cautelares)" />
              <CoinCounter monedas={monedas} />
            </div>
            {/* Ciclo + Misión Activa */}
            <div className="px-2 py-1 border border-zona-competencia/15 bg-bg-deep/80 backdrop-blur-sm max-w-[220px]">
              <div className="font-mono-terminal text-[8px] text-zona-recursos uppercase tracking-widest mb-0.5">
                Ciclo {personaje.cicloProcesal}
              </div>
              {misionActiva ? (
                <div className="font-mono-terminal text-[9px] text-zona-prueba truncate">
                  ▶ {misionActiva}
                </div>
              ) : (
                <div className="font-mono-terminal text-[8px] text-doc-aged/30">Sin misión activa</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── XP GAIN POPUP ─── */}
      <AnimatePresence>
        {xpGain !== null && (
          <motion.div
            key="xp-gain"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-28 left-8 z-50 pointer-events-none"
          >
            <div className="font-display-grave text-xl text-zona-cautelares"
              style={{ textShadow: "0 0 20px #58F5B0, 0 0 40px #58F5B060" }}>
              +{xpGain} XP
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── COIN GAIN POPUP ─── */}
      <AnimatePresence>
        {coinGain !== null && (
          <motion.div
            key="coin-gain"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-14 left-8 z-50 pointer-events-none"
          >
            <div className="font-display-grave text-lg text-zona-prueba"
              style={{ textShadow: "0 0 20px #D7B46A, 0 0 40px #D7B46A60" }}>
              🪙 +{coinGain}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCANLINE BARRIDO PERIÓDICO */}
      {scanlinePulse && (
        <div className="fixed inset-x-0 top-0 z-30 pointer-events-none">
          <div
            className="h-0.5 scanline-sweep"
            style={{
              background: "linear-gradient(90deg, transparent, var(--zona-competencia), transparent)",
              boxShadow: "0 0 12px var(--zona-competencia)",
            }}
          />
        </div>
      )}
    </>
  );
}
