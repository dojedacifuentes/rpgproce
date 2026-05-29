"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import type { BossReino } from "@/types/reinos";
import { useReinos } from "@/store/useReinos";
import { getArticulo, RAREZA_META } from "@/data/reinos/articulos";

// ============================================================================
// REINOS — Duelo de Boss
// Intercambio por turnos: cada ataque es una pregunta-trampa. Acertar quita
// 1 HP al jefe; fallar te quita vida (daño del ataque). Vencerlo suelta un
// artículo legendario y marca la región como completada.
// ============================================================================

type Fase = "intro" | "combate" | "victoria" | "derrota";

interface Props {
  boss: BossReino;
  onClose: () => void;
}

export default function BossBattle({ boss, onClose }: Props) {
  const derrotarBoss = useReinos((s) => s.derrotarBoss);
  const yaDerrotado = useReinos((s) => s.bossesDerrotados.includes(boss.id));

  const [fase, setFase] = useState<Fase>("intro");
  const [bossHp, setBossHp] = useState(boss.hp);
  const [vida, setVida] = useState(boss.vidaJugador);
  const [idx, setIdx] = useState(0);
  const [intentos, setIntentos] = useState<number[]>([]);
  const [acertada, setAcertada] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const articulo = boss.recompensaArticuloId ? getArticulo(boss.recompensaArticuloId) : undefined;
  const ataque = boss.ataques[idx % boss.ataques.length];

  const empezar = () => { sfx.bossEntrada?.(); setFase("combate"); };

  const reiniciar = useCallback(() => {
    setBossHp(boss.hp);
    setVida(boss.vidaJugador);
    setIdx(0);
    setIntentos([]);
    setAcertada(false);
    setFase("combate");
  }, [boss.hp, boss.vidaJugador]);

  const handleElegir = (i: number) => {
    if (acertada || intentos.includes(i) || fase !== "combate") return;
    const op = ataque.opciones[i];
    if (op.correcta) {
      setAcertada(true);
      const nuevoHp = bossHp - 1;
      setBossHp(nuevoHp);
      if (nuevoHp <= 0) {
        sfx.casacion?.();
        // recompensa (idempotente en el store)
        derrotarBoss(boss.id, boss.region, {
          cristales: boss.recompensaCristales,
          articuloId: boss.recompensaArticuloId,
        });
        setTimeout(() => setFase("victoria"), 450);
      } else {
        sfx.oralCorrecta?.();
      }
    } else {
      setIntentos((prev) => [...prev, i]);
      setShakeKey((k) => k + 1);
      sfx.glitch?.();
      const nuevaVida = Math.max(0, vida - ataque.dano);
      setVida(nuevaVida);
      if (nuevaVida <= 0) setTimeout(() => setFase("derrota"), 450);
    }
  };

  const siguiente = () => {
    setIdx((v) => v + 1);
    setIntentos([]);
    setAcertada(false);
    sfx.click?.();
  };

  const vidaPct = Math.max(0, Math.round((vida / boss.vidaJugador) * 100));

  // ── INTRO ──────────────────────────────────────────────────────────────
  if (fase === "intro") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reino-card p-6 md:p-8 text-center">
        <motion.div
          className="text-6xl mb-4 reino-pulse"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {boss.icono}
        </motion.div>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] reino-fg mb-2">
          ⚔ Boss de Región · {boss.arquetipo}
        </div>
        <h2 className="font-display-grave text-3xl md:text-4xl text-doc-aged mb-3">{boss.nombre}</h2>
        <p className="font-serif-juridica text-doc-aged/65 text-sm max-w-xl mx-auto mb-3 leading-relaxed">
          {boss.descripcion}
        </p>
        <div className="reino-chip inline-block font-mono-terminal text-[10px] px-3 py-1.5 mb-6">
          Problema jurídico: {boss.problemaJuridico}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={empezar} className="btn btn-oral text-sm px-6 py-3">
            ⚔ {yaDerrotado ? "Volver a desafiar" : "Comenzar duelo"}
          </button>
          <button onClick={() => { sfx.click?.(); onClose(); }} className="btn text-xs px-4 py-3">
            ◂ Huir
          </button>
        </div>
        {yaDerrotado && (
          <div className="font-mono-terminal text-[9px] text-doc-aged/40 mt-4">
            Ya venciste a este jefe. Puedes repetir el duelo para practicar.
          </div>
        )}
      </motion.div>
    );
  }

  // ── VICTORIA ─────────────────────────────────────────────────────────────
  if (fase === "victoria") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="reino-card p-6 md:p-8 text-center">
        <div className="text-6xl mb-3">🏆</div>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--zona-cautelares)" }}>
          Boss derrotado
        </div>
        <h2 className="font-display-grave text-3xl text-doc-aged mt-2 mb-3">{boss.nombre} ha caído</h2>
        <div className="font-mono-terminal text-sm reino-fg mb-5">💎 +{boss.recompensaCristales} cristales</div>

        {articulo && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto p-4 mb-6 border"
            style={{ borderColor: `${RAREZA_META[articulo.rareza].color}66`, background: `${RAREZA_META[articulo.rareza].color}10` }}
          >
            <div className="text-3xl mb-2">{articulo.icono}</div>
            <div className="font-mono-terminal text-[9px] uppercase tracking-widest" style={{ color: RAREZA_META[articulo.rareza].color }}>
              Artículo {RAREZA_META[articulo.rareza].label} desbloqueado
            </div>
            <div className="font-display-grave text-lg text-doc-aged">{articulo.etiqueta} — {articulo.titulo}</div>
            <p className="font-serif-juridica text-doc-aged/60 text-xs mt-2 leading-relaxed">{articulo.texto}</p>
          </motion.div>
        )}

        <button onClick={() => { sfx.confirm?.(); onClose(); }} className="btn btn-cautelar text-sm px-6 py-3">
          Reclamar y volver ▸
        </button>
      </motion.div>
    );
  }

  // ── DERROTA ──────────────────────────────────────────────────────────────
  if (fase === "derrota") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reino-card p-6 md:p-8 text-center">
        <div className="text-6xl mb-3 grayscale">{boss.icono}</div>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em]" style={{ color: "var(--zona-nulidad)" }}>
          Has sido refutado
        </div>
        <h2 className="font-display-grave text-2xl text-doc-aged mt-2 mb-3">El expediente se desploma</h2>
        <p className="font-serif-juridica text-doc-aged/60 text-sm max-w-md mx-auto mb-6">
          {boss.nombre} desarticuló tu defensa. Reordena tus argumentos y vuelve a intentarlo: ningún artículo se pierde.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={reiniciar} className="btn btn-oral text-sm px-6 py-3">↻ Reintentar duelo</button>
          <button onClick={() => { sfx.click?.(); onClose(); }} className="btn text-xs px-4 py-3">◂ Volver a la región</button>
        </div>
      </motion.div>
    );
  }

  // ── COMBATE ──────────────────────────────────────────────────────────────
  return (
    <div className="reino-card p-5 md:p-6">
      {/* Barras de estado */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-3xl shrink-0">{boss.icono}</span>
          <div className="min-w-0">
            <div className="font-display-grave text-doc-aged text-sm truncate">{boss.nombre}</div>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: boss.hp }).map((_, k) => (
                <span
                  key={k}
                  className="w-4 h-2 rounded-sm"
                  style={{ background: k < bossHp ? "var(--reino-primary)" : "rgba(255,255,255,0.12)", boxShadow: k < bossHp ? "0 0 6px var(--reino-primary)" : "none" }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-40 shrink-0">
          <div className="flex justify-between font-mono-terminal text-[9px] mb-1">
            <span className="text-doc-aged/50">TU VIDA</span>
            <span style={{ color: vidaPct > 30 ? "var(--zona-cautelares)" : "var(--zona-nulidad)" }}>{vida}</span>
          </div>
          <div className="h-2 bg-bg-steel rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${vidaPct}%` }}
              style={{ background: vidaPct > 30 ? "var(--zona-cautelares)" : "var(--zona-nulidad)" }}
            />
          </div>
        </div>
      </div>

      <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/40 mb-2">
        Ataque {idx + 1} {ataque.articulo && `· ${ataque.articulo}`}
      </div>
      <motion.p key={shakeKey} className={`font-display-grave text-doc-aged text-lg leading-snug mb-5 ${shakeKey ? "reino-shake" : ""}`}>
        {ataque.enunciado}
      </motion.p>

      <div className="space-y-2.5">
        {ataque.opciones.map((op, i) => {
          const esError = intentos.includes(i);
          const esCorrecta = acertada && op.correcta;
          const bloqueada = acertada || esError;
          return (
            <button
              key={i}
              onClick={() => handleElegir(i)}
              onMouseEnter={() => !bloqueada && sfx.hover?.()}
              disabled={bloqueada}
              className="w-full text-left p-3 border transition-all duration-150"
              style={{
                borderColor: esCorrecta ? "var(--zona-cautelares)" : esError ? "var(--zona-nulidad)" : "color-mix(in srgb, var(--reino-primary) 28%, transparent)",
                background: esCorrecta ? "rgba(88,245,176,0.08)" : esError ? "rgba(217,74,74,0.08)" : "rgba(255,255,255,0.015)",
                opacity: esError && !esCorrecta ? 0.7 : 1,
              }}
            >
              <div className="flex items-start gap-2">
                <span className="font-mono-terminal text-xs shrink-0" style={{ color: esCorrecta ? "var(--zona-cautelares)" : esError ? "var(--zona-nulidad)" : "var(--reino-primary)" }}>
                  {esCorrecta ? "✓" : esError ? "✕" : String.fromCharCode(65 + i)}
                </span>
                <span className="font-mono-terminal text-[13px] text-doc-aged/90 leading-snug">{op.texto}</span>
              </div>
              <AnimatePresence>
                {(esError || esCorrecta) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="font-serif-juridica text-[12px] mt-2 pl-6 leading-relaxed"
                    style={{ color: esCorrecta ? "rgba(88,245,176,0.85)" : "rgba(217,74,74,0.8)" }}
                  >
                    {op.explicacion}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-doc-aged/10 flex items-center justify-between gap-3">
        <button onClick={() => { sfx.click?.(); onClose(); }} className="btn text-[10px] px-3 py-1.5">◂ Huir</button>
        {acertada && bossHp > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={siguiente}
            className="btn btn-oral text-[11px] px-4 py-2"
          >
            Siguiente ataque ▸
          </motion.button>
        )}
      </div>
    </div>
  );
}
