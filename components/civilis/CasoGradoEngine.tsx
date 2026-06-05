"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useCivilis } from "@/store/useCivilis";
import type { CasoGrado } from "@/types/civilis";

// ============================================================================
// CASO DE GRADO ENGINE — caso integrado multi-paso. Relato de hechos, luego
// decisiones secuenciales con feedback razonado, y veredicto final con premio.
// ============================================================================

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = Math.floor((s / 2147483647) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const hashId = (id: string) => id.split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);

type Fase = "relato" | "paso" | "fin";

export default function CasoGradoEngine({ caso, onClose }: { caso: CasoGrado; onClose: () => void }) {
  const completarCasoGrado = useCivilis((s) => s.completarCasoGrado);
  const yaResuelto = useCivilis((s) => s.casosGradoResueltos.includes(caso.id));

  const [fase, setFase] = useState<Fase>("relato");
  const [idx, setIdx] = useState(0);
  const [elegida, setElegida] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const total = caso.pasos.length;
  const paso = caso.pasos[idx];
  const revelado = elegida !== null;
  const opciones = useMemo(
    () => seededShuffle(paso.opciones, hashId(caso.id) + idx * 101),
    [caso.id, idx, paso.opciones]
  );

  // Premio una sola vez al llegar al veredicto.
  useEffect(() => {
    if (fase === "fin") completarCasoGrado(caso.id, caso.recompensa);
  }, [fase, caso.id, caso.recompensa, completarCasoGrado]);

  const elegir = (id: string) => {
    if (revelado) return;
    setElegida(id);
    if (id === paso.correcta) {
      sfx.confirm?.();
      setAciertos((n) => n + 1);
    } else {
      sfx.warning?.();
    }
  };

  const avanzar = () => {
    if (idx + 1 < total) {
      setIdx((i) => i + 1);
      setElegida(null);
      sfx.click?.();
    } else {
      setFase("fin");
      sfx.unlock?.();
    }
  };

  const nota = total > 0 ? aciertos / total : 0;
  const estrellas = nota === 1 ? 3 : nota >= 0.66 ? 2 : nota >= 0.34 ? 1 : 0;
  const veredicto =
    nota === 1
      ? "Defensa impecable. La comisión asiente."
      : nota >= 0.66
      ? "Aprobado con observaciones. Buen dominio del caso."
      : nota >= 0.34
      ? "Te salvas, pero revisa los fundamentos."
      : "La comisión no quedó conforme. Vuelve a intentarlo.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="civ-panel p-4 md:p-5"
      data-civ={caso.region}
    >
      {/* cabecera */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl shrink-0 civ-float inline-block" style={{ filter: "drop-shadow(0 0 8px var(--civ-primary))" }}>⚖️</span>
        <div className="min-w-0">
          <div className="civ-tag">Caso de grado</div>
          <div className="civ-heading text-lg leading-tight">{caso.titulo}</div>
        </div>
        <button onClick={onClose} className="ml-auto text-[var(--civ-ink)]/40 hover:text-[var(--civ-ink)]/80 font-mono-terminal text-sm shrink-0">✕</button>
      </div>

      {/* barra de progreso por paso */}
      {fase === "paso" && (
        <div className="flex items-center gap-1.5 mb-3">
          {caso.pasos.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-colors"
              style={{ background: i < idx ? "var(--civ-primary)" : i === idx ? "color-mix(in srgb, var(--civ-primary) 55%, transparent)" : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </div>
      )}

      <div>
        {/* ── RELATO ── */}
        {fase === "relato" && (
          <motion.div key="relato" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="civ-card p-3 mb-3">
              <div className="civ-tag mb-1.5">Los hechos</div>
              <p className="font-serif-juridica text-[15px] leading-relaxed" style={{ color: "var(--civ-ink)" }}>{caso.relato}</p>
            </div>
            <div className="font-mono-terminal text-[10px] opacity-50 mb-3">{total} preguntas · razona cada paso · premio: +{caso.recompensa.xp} XP · 🪙 {caso.recompensa.oro}{yaResuelto ? " (ya rendido)" : ""}</div>
            <button onClick={() => { setFase("paso"); sfx.click?.(); }} className="civ-btn w-full py-2.5 text-sm">Comenzar la defensa ▸</button>
          </motion.div>
        )}

        {/* ── PASO ── */}
        {fase === "paso" && (
          <motion.div key={`paso-${idx}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
            <div className="civ-tag mb-2">Paso {idx + 1} / {total}</div>
            <p className="font-serif-juridica text-[15px] leading-relaxed mb-3" style={{ color: "var(--civ-ink)" }}>{paso.pregunta}</p>

            <div className="space-y-2">
              {opciones.map((op) => {
                let state: string | undefined;
                if (revelado) {
                  if (op.id === paso.correcta) state = "ok";
                  else if (op.id === elegida) state = "bad";
                  else state = "dim";
                }
                return (
                  <button
                    key={op.id}
                    onClick={() => elegir(op.id)}
                    onMouseEnter={() => !revelado && sfx.hover?.()}
                    disabled={revelado}
                    data-state={state}
                    className="civ-opt w-full px-3 py-2.5 font-serif-juridica text-[14px] flex items-center gap-2"
                  >
                    {revelado && op.id === paso.correcta && <span className="shrink-0">✓</span>}
                    {revelado && op.id === elegida && op.id !== paso.correcta && <span className="shrink-0">✗</span>}
                    <span>{op.texto}</span>
                  </button>
                );
              })}
            </div>

            {revelado && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2">
                <div className="civ-card p-3" style={{ borderColor: elegida === paso.correcta ? "#5fb37a66" : "#c65b6e66" }}>
                  <div className="civ-tag mb-1" style={{ color: elegida === paso.correcta ? "#7ed79a" : "#f09aa8" }}>
                    {elegida === paso.correcta ? "✦ Correcto" : "✗ Incorrecto"}{paso.articulo ? ` · ${paso.articulo}` : ""}
                  </div>
                  <p className="font-serif-juridica text-[13.5px] leading-relaxed opacity-90">{paso.explicacion}</p>
                </div>
                <button onClick={avanzar} className="civ-btn w-full py-2.5 text-sm">{idx + 1 < total ? "Siguiente paso ▸" : "Ver veredicto ▸"}</button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── FIN ── */}
        {fase === "fin" && (
          <motion.div key="fin" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-2">
            <div className="text-3xl mb-1">{["☆☆☆", "★☆☆", "★★☆", "★★★"][estrellas]}</div>
            <div className="civ-heading text-xl mb-1" style={{ color: "var(--civ-primary)" }}>Veredicto</div>
            <p className="font-serif-juridica text-[14px] opacity-85 max-w-md mx-auto mb-3">{veredicto}</p>
            <div className="civ-card p-3 inline-block mb-4">
              <div className="font-mono-terminal text-[12px]">Aciertos: <span className="civ-accent">{aciertos}/{total}</span></div>
              <div className="font-mono-terminal text-[11px] civ-accent mt-1">+{caso.recompensa.xp} XP · 🪙 {caso.recompensa.oro}{yaResuelto ? " (ya rendido antes)" : ""}</div>
            </div>
            <div className="flex gap-2 max-w-md mx-auto">
              <button
                onClick={() => { setFase("relato"); setIdx(0); setElegida(null); setAciertos(0); sfx.click?.(); }}
                className="civ-btn flex-1 py-2.5 text-sm"
              >
                ↻ Reintentar
              </button>
              <button onClick={onClose} className="civ-btn flex-1 py-2.5 text-sm">Volver ▸</button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
