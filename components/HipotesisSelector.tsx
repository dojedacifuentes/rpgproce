"use client";
import { motion } from "framer-motion";
import { CasoInvestigativo } from "@/data/casos-investigativos";
import { verificarHipótesis } from "@/lib/investigacion";
import { sfx } from "@/lib/audio";

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
        <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-1">
          FORMULACIÓN DE HIPÓTESIS
        </div>
        <p className="font-serif-juridica text-sm text-doc-aged/70 italic">
          Basándote en las pistas que has descubierto, ¿cuál es tu deducción sobre
          el error procesal?
        </p>
      </div>

      <div className="space-y-3">
        {caso.hipótesis.map((hip, idx) => {
          const validacion = verificarHipótesis(idx, caso, pistasDescubiertas);
          const puedeSeleccionar = validacion.puedeSeleccionar && !disabled;

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                if (puedeSeleccionar) {
                  sfx.confirm?.();
                  onSeleccionar(idx);
                } else {
                  sfx.warning?.();
                }
              }}
              onMouseEnter={() => {
                if (puedeSeleccionar) sfx.hover?.();
              }}
              whileHover={puedeSeleccionar ? { scale: 1.02, x: 4 } : undefined}
              whileTap={puedeSeleccionar ? { scale: 0.98 } : undefined}
              disabled={!puedeSeleccionar}
              className={`
                w-full text-left p-5 rounded border-2 transition-all
                min-h-24 flex flex-col justify-between
                font-serif-juridica text-base leading-relaxed
                ${
                  puedeSeleccionar
                    ? "border-neon-purple/50 bg-terminal-darker/80 text-parchment/90 cursor-pointer hover:border-neon-purple hover:bg-terminal-darker"
                    : "border-parchment/20 bg-terminal-darker/40 text-parchment/50 cursor-not-allowed opacity-60"
                }
              `}
            >
              {/* Título de hipótesis */}
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-1">
                  {hip.es_correcta ? "✓" : "?"}
                </span>
                <div className="flex-grow">
                  <p className="font-display-grave text-base mb-1">
                    {hip.titulo}
                  </p>

                  {/* Pistas requeridas */}
                  <div className="text-xs text-parchment/60 space-y-1">
                    <div className="font-mono-terminal uppercase tracking-wider text-neon-cyan/70 mb-1">
                      Requiere:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {hip.pistas_requieren.map((pistaId) => {
                        const pista = caso.pistas.find((p) => p.id === pistaId);
                        const descubierta = pistasDescubiertas.has(pistaId);

                        return (
                          <span
                            key={pistaId}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono-terminal ${
                              descubierta
                                ? "border border-neon-green/50 text-neon-green/80 bg-neon-green/5"
                                : "border border-neon-red/50 text-neon-red/80 bg-neon-red/5"
                            }`}
                            title={pista?.titulo || pistaId}
                          >
                            {descubierta ? "✓" : "✗"} {pista?.titulo || "?"}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Validación o estado */}
              <div className="mt-2 text-[9px]">
                {puedeSeleccionar ? (
                  <div className="text-neon-green flex items-center gap-1">
                    <span>✓</span> Puedes seleccionar esta hipótesis
                  </div>
                ) : (
                  <div className="text-neon-red italic">{validacion.razon}</div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Info: Qué necesitas */}
      <div className="terminal p-4 text-[9px] font-mono-terminal text-doc-aged/50 space-y-2">
        <div>
          💡 <span className="text-parchment/70">Tip:</span> Selecciona una
          hipótesis solo cuando hayas descubierto todas sus pistas requeridas.
        </div>
        <div>
          🔍 <span className="text-parchment/70">Explora más</span> si no tienes
          suficiente información.
        </div>
      </div>
    </div>
  );
}
