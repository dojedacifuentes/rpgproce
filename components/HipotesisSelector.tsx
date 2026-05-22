"use client";
import { motion } from "framer-motion";
import { CasoInvestigativo } from "@/data/casos-investigativos";
import { verificarHipótesis } from "@/lib/investigacion";
import { sfx } from "@/lib/audio";

// ============================================================================
// HIPÓTESIS SELECTOR — v3 visual system
// Selección de hipótesis con validación de pistas requeridas.
// ============================================================================

interface HipotesisSelectorProps {
  caso: CasoInvestigativo;
  pistasDescubiertas: Set<string>;
  onSeleccionar: (hipId: number) => void;
  disabled?: boolean;
}

export default function HipotesisSelector({
  caso,
  pistasDescubiertas,
  onSeleccionar,
  disabled = false,
}: HipotesisSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="terminal p-4">
        <div className="font-mono-terminal text-[9px] uppercase tracking-[.35em] text-zona-recursos mb-1">
          FORMULACIÓN DE HIPÓTESIS
        </div>
        <p className="font-serif-juridica text-sm text-doc-aged/70 italic">
          Basándote en las pistas descubiertas, ¿cuál es tu deducción sobre el
          error procesal?
        </p>
      </div>

      <div className="space-y-3">
        {caso.hipótesis.map((hip, idx) => {
          const validacion = verificarHipótesis(idx, caso, pistasDescubiertas);
          const puedeSeleccionar = validacion.puedeSeleccionar && !disabled;

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => {
                if (puedeSeleccionar) {
                  sfx.click();
                  onSeleccionar(idx);
                } else {
                  sfx.glitch?.();
                }
              }}
              onMouseEnter={() => { if (puedeSeleccionar) sfx.hover(); }}
              whileHover={puedeSeleccionar ? { scale: 1.01, x: 3 } : undefined}
              whileTap={puedeSeleccionar ? { scale: 0.99 } : undefined}
              disabled={!puedeSeleccionar}
              className="w-full text-left p-5 border transition-all min-h-24 flex flex-col justify-between"
              style={
                puedeSeleccionar
                  ? {
                      borderColor: "rgba(138,92,255,.45)",
                      background: "rgba(138,92,255,.04)",
                      cursor: "pointer",
                    }
                  : {
                      borderColor: "rgba(255,255,255,.08)",
                      background: "rgba(0,0,0,.2)",
                      cursor: "not-allowed",
                      opacity: 0.55,
                    }
              }
            >
              {/* Title */}
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5 text-doc-aged/50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-grow">
                  <p className="font-display-grave text-base text-doc-aged mb-2">
                    {hip.titulo}
                  </p>

                  {/* Required clues */}
                  <div className="text-[8px] font-mono-terminal uppercase tracking-widest text-zona-recursos mb-1">
                    Requiere:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hip.pistas_requieren.map((pistaId) => {
                      const pista = caso.pistas.find((p) => p.id === pistaId);
                      const descubierta = pistasDescubiertas.has(pistaId);
                      return (
                        <span
                          key={pistaId}
                          className="px-2 py-0.5 text-[8px] font-mono-terminal border"
                          style={{
                            borderColor: descubierta
                              ? "rgba(88,245,176,.4)"
                              : "rgba(217,74,74,.35)",
                            color: descubierta
                              ? "var(--zona-cautelares)"
                              : "var(--zona-nulidad)",
                            background: descubierta
                              ? "rgba(88,245,176,.05)"
                              : "rgba(217,74,74,.05)",
                          }}
                          title={pista?.titulo ?? pistaId}
                        >
                          {descubierta ? "✓" : "✗"}{" "}
                          {pista?.titulo ?? "???"}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status line */}
              <div className="mt-3 text-[9px] font-mono-terminal">
                {puedeSeleccionar ? (
                  <span className="text-zona-cautelares">
                    ✓ Tienes suficiente información
                  </span>
                ) : (
                  <span className="text-zona-nulidad italic">
                    {validacion.razon}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="terminal p-3 text-[9px] font-mono-terminal text-doc-aged/40 space-y-1">
        <div>💡 Selecciona una hipótesis solo cuando tengas todas sus pistas requeridas.</div>
        <div>🔍 Vuelve al tablero a explorar si te falta información.</div>
      </div>
    </div>
  );
}
