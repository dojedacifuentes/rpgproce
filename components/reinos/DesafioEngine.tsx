"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import type { Desafio } from "@/types/reinos";
import { TIPO_DESAFIO_META } from "@/data/reinos/desafios";
import { getArticulo, RAREZA_META } from "@/data/reinos/articulos";

// ============================================================================
// REINOS — Motor de Desafío (encuentro individual)
// Acertar otorga recompensa (region page persiste); fallar invoca onWrong
// (region page descuenta vida). En modo "review" solo revela la solución.
// ============================================================================

interface Props {
  desafio: Desafio;
  yaResuelto: boolean;
  onCorrect: () => void;
  onWrong: () => void;
  onClose: () => void;
}

export default function DesafioEngine({ desafio, yaResuelto, onCorrect, onWrong, onClose }: Props) {
  const meta = TIPO_DESAFIO_META[desafio.tipo];
  const [intentos, setIntentos] = useState<number[]>([]);
  const [elegida, setElegida] = useState<number | null>(null);
  const [resuelto, setResuelto] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const review = yaResuelto; // ya resuelto antes: modo repaso
  const articuloPremio = desafio.recompensa.articuloId ? getArticulo(desafio.recompensa.articuloId) : undefined;

  const handleElegir = (i: number) => {
    if (resuelto || review || intentos.includes(i)) return;
    const op = desafio.opciones[i];
    setElegida(i);
    if (op.correcta) {
      setResuelto(true);
      sfx.oralCorrecta?.();
      onCorrect();
    } else {
      setIntentos((prev) => [...prev, i]);
      setShakeKey((k) => k + 1);
      sfx.oralIncorrecta?.();
      onWrong();
    }
  };

  const mostrarComoCorrecta = (i: number) => (resuelto || review) && desafio.opciones[i].correcta;
  const mostrarComoError = (i: number) => intentos.includes(i);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="reino-card p-5 md:p-6"
    >
      {/* ── Cabecera del encuentro ── */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0">{desafio.iconoEnemigo}</span>
          <div className="min-w-0">
            <div className="font-mono-terminal text-[9px] uppercase tracking-widest reino-fg">
              {meta.icono} {meta.label} · {"★".repeat(desafio.dificultad)}
            </div>
            <div className="font-display-grave text-base text-doc-aged leading-tight truncate">
              {desafio.enemigo}
            </div>
          </div>
        </div>
        <span className="reino-chip font-mono-terminal text-[9px] px-2 py-1 shrink-0">
          {desafio.articuloClave}
        </span>
      </div>

      {/* ── Verbo del reto ── */}
      <div className="font-mono-terminal text-[10px] uppercase tracking-[.2em] text-doc-aged/45 mb-2">
        ▸ {meta.verbo}
      </div>

      {/* ── Contexto + enunciado ── */}
      {desafio.contexto && (
        <p className="font-serif-juridica text-doc-aged/55 text-sm mb-2">{desafio.contexto}</p>
      )}
      <motion.p
        key={shakeKey}
        className={`font-display-grave text-doc-aged text-lg leading-snug mb-5 ${shakeKey ? "reino-shake" : ""}`}
      >
        {desafio.enunciado}
      </motion.p>

      {/* ── Opciones ── */}
      <div className="space-y-2.5">
        {desafio.opciones.map((op, i) => {
          const esCorrecta = mostrarComoCorrecta(i);
          const esError = mostrarComoError(i);
          const bloqueada = resuelto || review || esError;
          return (
            <div key={i} className="reino-rise" style={{ animationDelay: `${i * 50}ms` }}>
              <button
                onClick={() => handleElegir(i)}
                onMouseEnter={() => !bloqueada && sfx.hover?.()}
                disabled={bloqueada}
                className="w-full text-left p-3 border transition-all duration-150"
                style={{
                  borderColor: esCorrecta
                    ? "var(--zona-cautelares)"
                    : esError
                    ? "var(--zona-nulidad)"
                    : "color-mix(in srgb, var(--reino-primary) 28%, transparent)",
                  background: esCorrecta
                    ? "rgba(88,245,176,0.08)"
                    : esError
                    ? "rgba(217,74,74,0.08)"
                    : "rgba(255,255,255,0.015)",
                  cursor: bloqueada ? "default" : "pointer",
                  opacity: esError && !esCorrecta ? 0.7 : 1,
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono-terminal text-xs shrink-0" style={{ color: esCorrecta ? "var(--zona-cautelares)" : esError ? "var(--zona-nulidad)" : "var(--reino-primary)" }}>
                    {esCorrecta ? "✓" : esError ? "✕" : String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-mono-terminal text-[13px] text-doc-aged/90 leading-snug">{op.texto}</span>
                </div>
                {/* Explicación: al fallar esa opción o al revelar la correcta */}
                <AnimatePresence>
                  {(esError || esCorrecta) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="font-serif-juridica text-[12px] mt-2 pl-6 leading-relaxed"
                      style={{ color: esCorrecta ? "rgba(88,245,176,0.85)" : "rgba(217,74,74,0.8)" }}
                    >
                      {op.explicacion}
                      {op.art && <span className="font-mono-terminal text-[10px] opacity-70"> · {op.art}</span>}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Resultado / recompensa ── */}
      <AnimatePresence>
        {(resuelto || review) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 pt-4 border-t border-doc-aged/10"
          >
            {review ? (
              <div className="font-mono-terminal text-[10px] uppercase tracking-widest text-doc-aged/40 mb-3">
                ✓ Desafío ya superado — repaso
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-display-grave text-lg" style={{ color: "var(--zona-cautelares)" }}>
                  ¡Enemigo derrotado!
                </span>
                <span className="font-mono-terminal text-[11px] reino-fg-2">+{desafio.recompensa.xp} XP</span>
                <span className="font-mono-terminal text-[11px] reino-fg">💎 {desafio.recompensa.cristales} cristales</span>
              </div>
            )}

            {articuloPremio && (
              <div
                className="flex items-center gap-3 p-3 mb-3 border"
                style={{ borderColor: `${RAREZA_META[articuloPremio.rareza].color}55`, background: `${RAREZA_META[articuloPremio.rareza].color}0d` }}
              >
                <span className="text-2xl">{articuloPremio.icono}</span>
                <div>
                  <div className="font-mono-terminal text-[9px] uppercase tracking-widest" style={{ color: RAREZA_META[articuloPremio.rareza].color }}>
                    {review ? "Artículo en biblioteca" : "¡Artículo legendario desbloqueado!"} · {RAREZA_META[articuloPremio.rareza].label}
                  </div>
                  <div className="font-display-grave text-sm text-doc-aged">
                    {articuloPremio.etiqueta} — {articuloPremio.titulo}
                  </div>
                </div>
              </div>
            )}

            <button onClick={() => { sfx.confirm?.(); onClose(); }} className="btn btn-cautelar text-[11px] px-4 py-2">
              Continuar ▸
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Volver ── */}
      {!resuelto && !review && (
        <div className="mt-5 pt-4 border-t border-doc-aged/10">
          <button onClick={() => { sfx.click?.(); onClose(); }} className="btn text-[10px] px-3 py-1.5">
            ◂ Retirarse
          </button>
        </div>
      )}
    </motion.div>
  );
}
