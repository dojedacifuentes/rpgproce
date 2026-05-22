"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";
import { sfx, isMuted, setMuted, startAmbient, stopAmbient } from "@/lib/audio";

// ============================================================================
// HUD PERSISTENTE — overlay táctico en esquinas
// Esquina superior derecha: estado litigante + audio toggle
// Esquina inferior izquierda: telemetría procesal
// ============================================================================

export default function HUDPersistente() {
  const personaje = useGame((s) => s.personaje);
  const logros = useGame((s) => s.logros);
  const [muted, setMutedState] = useState(true);
  const [hora, setHora] = useState("");
  const [scanlinePulse, setScanlinePulse] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
    const t = setInterval(() => {
      setHora(new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    setHora(new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

    // Pulso periódico
    const p = setInterval(() => {
      setScanlinePulse(true);
      setTimeout(() => setScanlinePulse(false), 600);
    }, 7000);
    return () => { clearInterval(t); clearInterval(p); };
  }, []);

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
      {/* ESQUINA SUPERIOR DERECHA — estado del litigante */}
      <div className="fixed top-3 right-3 z-40 pointer-events-none">
        <div className="flex items-center gap-2 text-[9px] font-mono-terminal uppercase tracking-widest pointer-events-auto">
          {/* indicador conexión */}
          <div className="flex items-center gap-1.5 px-2 py-1 border border-zona-cautelares/30 bg-bg-deep/70 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-zona-cautelares rounded-full animate-flicker" />
            <span className="text-zona-cautelares">CONEXIÓN</span>
          </div>

          {/* hora del sistema */}
          <div className="px-2 py-1 border border-zona-competencia/30 bg-bg-deep/70 backdrop-blur-sm text-zona-competencia">
            {hora}
          </div>

          {/* audio toggle */}
          <button
            onClick={toggleAudio}
            className={`px-2 py-1 border bg-bg-deep/70 backdrop-blur-sm transition-colors ${
              muted ? "border-doc-aged/30 text-doc-aged/40" : "border-zona-recursos/40 text-zona-recursos"
            }`}
          >
            {muted ? "🔇 AUDIO OFF" : "🔊 AUDIO ON"}
          </button>
        </div>
      </div>

      {/* ESQUINA INFERIOR IZQUIERDA — telemetría persistente */}
      {hayPartida && (
        <div className="fixed bottom-3 left-3 z-40 pointer-events-none">
          <div className="border border-zona-competencia/20 bg-bg-deep/80 backdrop-blur-md p-2 min-w-[180px]">
            <div className="text-[9px] font-mono-terminal uppercase tracking-widest text-zona-recursos mb-1">
              LITIGANTE ACTIVO
            </div>
            <div className="font-display-grave text-xs text-doc-aged mb-1.5 truncate">{personaje.nombre}</div>
            <div className="grid grid-cols-3 gap-1 text-[9px] font-mono-terminal">
              <Mini label="REP" v={personaje.reputacion} color="var(--zona-recursos)" />
              <Mini label="TRA" v={personaje.trauma} color="var(--zona-nulidad)" />
              <Mini label="LOG" v={logros.length} color="var(--zona-cautelares)" />
            </div>
            <div className="text-[9px] font-mono-terminal text-doc-aged/40 mt-1.5 uppercase tracking-widest">
              ciclo {personaje.cicloProcesal}
            </div>
          </div>
        </div>
      )}

      {/* SCANLINE BARRIDO PERIÓDICO (cuando se "activa") */}
      {scanlinePulse && (
        <div className="fixed inset-x-0 top-0 z-30 pointer-events-none">
          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg, transparent, var(--zona-competencia), transparent)",
              animation: "scanlineDown 0.6s linear forwards",
              boxShadow: "0 0 12px var(--zona-competencia)",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes scanlineDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </>
  );
}

function Mini({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="border border-bg-steel px-1 py-0.5 text-center">
      <div className="text-doc-aged/40 text-[8px]">{label}</div>
      <div style={{ color }} className="font-display-grave text-xs">{v}</div>
    </div>
  );
}
