"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";

// ============================================================================
// SALA DE SENTENCIA — visual horror jurídico
// Una sala donde el jugador tiene que esperar la sentencia.
// Atmósfera: luz amarilla decadente, respiración del expediente, sombras alargadas.
// El "juez" no se ve, solo su silueta detrás de un vidrio holográfico.
// ============================================================================

const FRASES_LATIDO = [
  "El tribunal lee...",
  "Hojea el expediente...",
  "Marca el art. 768 con lápiz rojo...",
  "Una pausa larga...",
  "Murmura un latinismo...",
  "Ajusta los anteojos...",
  "Consulta a Cassarino en voz baja...",
  "El secretario toma nota...",
  "Una página cruje...",
  "El reloj marca las 16:43...",
];

export default function SalaSentencia({ onVeredicto }: { onVeredicto?: (favorable: boolean) => void }) {
  const [latido, setLatido] = useState(0);
  const [resuelto, setResuelto] = useState<"favorable" | "adversa" | null>(null);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (resuelto) return;
    const t = setInterval(() => {
      setLatido((l) => (l + 1) % FRASES_LATIDO.length);
      sfx.beep();
    }, 1800);
    return () => clearInterval(t);
  }, [resuelto]);

  function resolver() {
    sfx.bossEntrada();
    setGlitch(true);
    setTimeout(() => {
      const favorable = Math.random() > 0.4;
      setResuelto(favorable ? "favorable" : "adversa");
      setGlitch(false);
      if (favorable) sfx.casacion();
      else sfx.inadmisible();
      onVeredicto?.(favorable);
    }, 800);
  }

  return (
    <div className={`relative ${glitch ? "glitch-frame" : ""}`}>
      {/* Marco arquitectónico tipo anfiteatro */}
      <div className="relative border-2 border-zona-cosajuzgada/30 bg-gradient-to-b from-bg-oil to-bg-deep p-8 overflow-hidden">
        {/* Columnas decorativas */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-zona-prueba/40 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-zona-prueba/40 to-transparent" />

        {/* Estrado del juez (silueta detrás de cristal holográfico) */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative w-64 h-44">
            {/* "cristal" */}
            <div className="absolute inset-0 border border-zona-cosajuzgada/30 bg-bg-deep/60 backdrop-blur-sm" />
            {/* silueta */}
            <svg viewBox="0 0 200 140" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="judge-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(242,242,240,.15)" />
                  <stop offset="100%" stopColor="rgba(242,242,240,.02)" />
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="55" rx="22" ry="26" fill="url(#judge-grad)" />
              <path d="M58 140 Q58 80 80 70 Q90 62 100 62 Q110 62 120 70 Q142 80 142 140 Z" fill="url(#judge-grad)" />
              {/* ojos */}
              <motion.ellipse
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                cx="92" cy="52" rx="2" ry="1.5" fill="#F2F2F0"
              />
              <motion.ellipse
                animate={{ opacity: [0.9, 0.4, 0.9] }}
                transition={{ duration: 3, repeat: Infinity }}
                cx="108" cy="52" rx="2" ry="1.5" fill="#F2F2F0"
              />
            </svg>
            {/* reflejos holográficos */}
            <div className="absolute inset-0 pointer-events-none [background-image:repeating-linear-gradient(180deg,rgba(242,242,240,.04)_0_2px,transparent_2px_4px)]" />
            {/* placa */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-bg-deep border border-zona-cosajuzgada/40 text-[9px] font-mono-terminal uppercase tracking-widest text-zona-cosajuzgada">
              ESTRADO · INSTANCIA EN DELIBERACIÓN
            </div>
          </div>
        </div>

        {/* Texto de espera */}
        {!resuelto && (
          <div className="text-center">
            <motion.div
              key={latido}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif-juridica italic text-doc-aged/80 text-xl"
            >
              {FRASES_LATIDO[latido]}
            </motion.div>

            <div className="mt-8">
              <div className="font-mono-terminal text-[9px] uppercase tracking-[.3em] text-zona-cosajuzgada/60 mb-2">
                aguardando dictamen…
              </div>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
                    className="w-1.5 h-1.5 bg-zona-cosajuzgada rounded-full"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={resolver}
              onMouseEnter={() => sfx.hover()}
              className="btn mt-8"
              style={{ borderColor: "var(--zona-cosajuzgada)", color: "var(--zona-cosajuzgada)" }}
            >
              ▸ Acelerar el destino
            </button>
          </div>
        )}

        {/* Veredicto */}
        {resuelto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-cosajuzgada/60 mb-3">
              DICTAMEN PROFERIDO
            </div>
            <div
              className="font-display-grave text-5xl md:text-6xl glitch-text mb-4"
              style={{
                color: resuelto === "favorable" ? "var(--zona-cautelares)" : "var(--zona-nulidad)",
                textShadow: `0 0 30px ${resuelto === "favorable" ? "var(--zona-cautelares)" : "var(--zona-nulidad)"}`,
              }}
            >
              {resuelto === "favorable" ? "HA LUGAR" : "NO HA LUGAR"}
            </div>
            <p className="font-serif-juridica italic text-doc-aged/70 max-w-md mx-auto">
              {resuelto === "favorable"
                ? "«Vistos los autos, considerando los hechos y el derecho aplicable, se acoge la demanda con costas. Notifíquese.»"
                : "«Visto el mérito del proceso, se rechaza la demanda en todas sus partes. Cada parte pagará sus propias costas. Notifíquese.»"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
