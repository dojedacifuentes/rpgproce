"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/useGame";
import { BOSSES } from "@/data/bosses";
import type { Boss, BossId } from "@/types/expansion";

export default function InterrogacionOral({ bossId, onFin }: { bossId: BossId; onFin?: () => void }) {
  const game = useGame();
  const boss = BOSSES.find((b) => b.id === bossId);
  const [saludBoss, setSaludBoss] = useState(boss?.saludInicial || 100);
  const [saludJugador, setSaludJugador] = useState(boss?.saludJugador || 70);
  const [ataqueIdx, setAtaqueIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; explicacion: string; art: string } | null>(null);
  const [terminado, setTerminado] = useState<"victoria" | "derrota" | null>(null);

  if (!boss) {
    return <div className="terminal p-6">Boss no encontrado.</div>;
  }

  const ataque = boss.ataques[ataqueIdx];

  function responder(opcionIdx: number) {
    if (!ataque) return;
    const op = ataque.opciones[opcionIdx];
    setFeedback({ ok: op.correcta, explicacion: op.explicacion, art: op.art });
    if (op.correcta) {
      const nuevoSaludBoss = Math.max(0, saludBoss - ataque.damage);
      setSaludBoss(nuevoSaludBoss);
      game.pushLog(`✓ Respuesta correcta a "${boss.nombre}": ${op.art}`, "ORAL");
      game.ajustarAtributo("conocimiento_procesal", 1);
      if (nuevoSaludBoss <= 0) {
        setTerminado("victoria");
        game.ajustarReputacion(15);
        game.desbloquearLogro({ id: `boss_${boss.id}`, titulo: `Vencido: ${boss.nombre}`, descripcion: boss.derrotadoOtorga, articulo: "—", desbloqueado: true });
        game.pushLog(`Derrotaste a ${boss.nombre}. ${boss.derrotadoOtorga}`, "VICTORIA");
      }
    } else {
      const nuevoSaludJugador = Math.max(0, saludJugador - ataque.damage);
      setSaludJugador(nuevoSaludJugador);
      game.ajustarTrauma(3);
      game.pushLog(`✗ Respuesta incorrecta a "${boss.nombre}". ${op.explicacion}`, "ORAL");
      if (nuevoSaludJugador <= 0) {
        setTerminado("derrota");
      }
    }
  }

  function avanzar() {
    setFeedback(null);
    if (ataqueIdx + 1 < boss!.ataques.length) {
      setAtaqueIdx(ataqueIdx + 1);
    } else {
      // Sin más ataques: si jugador no fue derrotado, gana
      if (saludJugador > 0 && saludBoss > 0) {
        setTerminado(saludBoss < saludJugador ? "victoria" : "derrota");
      }
    }
  }

  if (terminado === "victoria") {
    return (
      <div className="terminal p-6 border-neon-blue">
        <div className="tag tag-amber mb-3">VICTORIA</div>
        <h2 className="label-art text-2xl text-neon-blue mb-3">{boss.nombre} se retira</h2>
        <p className="text-parchment/80 text-sm mb-4">{boss.derrotadoOtorga}</p>
        <button className="btn" onClick={onFin}>▸ Continuar</button>
      </div>
    );
  }

  if (terminado === "derrota") {
    return (
      <div className="terminal p-6 border-neon-red">
        <div className="tag tag-red mb-3">DERROTA</div>
        <h2 className="label-art text-2xl text-neon-red mb-3">{boss.nombre} te aniquila</h2>
        <p className="text-parchment/80 text-sm mb-4">"Vuelve cuando hayas leído el Cassarino. O el Maturana. O algo."</p>
        <button className="btn" onClick={onFin}>▸ Retirarse</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="terminal p-5">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <div className="tag tag-violet mb-2">BOSS · {boss.rama.toUpperCase()}</div>
            <h2 className="label-art text-2xl text-neon-red">{boss.nombre}</h2>
            <p className="text-parchment/60 text-xs mt-1 italic">{boss.arquetipo}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs min-w-[280px]">
            <div>
              <div className="text-neon-red mb-1">Salud {boss.nombre.split(" ")[0]}</div>
              <div className="h-2 bg-ink-700 w-full">
                <motion.div animate={{ width: `${(saludBoss / boss.saludInicial) * 100}%` }} className="h-full bg-neon-red" />
              </div>
              <div className="text-right">{saludBoss}/{boss.saludInicial}</div>
            </div>
            <div>
              <div className="text-neon-blue mb-1">Salud mental</div>
              <div className="h-2 bg-ink-700 w-full">
                <motion.div animate={{ width: `${(saludJugador / boss.saludJugador) * 100}%` }} className="h-full bg-neon-blue" />
              </div>
              <div className="text-right">{saludJugador}/{boss.saludJugador}</div>
            </div>
          </div>
        </div>
        <p className="text-parchment/70 text-sm mt-3 italic">{boss.ambientacion}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={ataqueIdx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="terminal p-5">
          <div className="tag tag-amber mb-2">ATAQUE {ataqueIdx + 1} · {ataque.tipo.toUpperCase()}</div>
          <h3 className="label-art text-neon-cyan text-lg mb-4">{ataque.pregunta}</h3>

          {!feedback && (
            <div className="space-y-2">
              {ataque.opciones.map((op, i) => (
                <button key={i} onClick={() => responder(i)} className="block w-full text-left p-3 border border-ink-400 hover:border-neon-blue text-sm">
                  {op.texto}
                </button>
              ))}
            </div>
          )}

          {feedback && (
            <div className={`p-4 border ${feedback.ok ? "border-neon-blue" : "border-neon-red"}`}>
              <div className={`label-art ${feedback.ok ? "text-neon-blue" : "text-neon-red"}`}>
                {feedback.ok ? "✓ Acierto — dañás al boss" : "✗ Fallo — recibís daño"}
              </div>
              <p className="text-parchment/80 text-sm mt-2">{feedback.explicacion}</p>
              <div className="tag tag-violet mt-2">{feedback.art}</div>
              <button className="btn mt-3" onClick={avanzar}>▸ Siguiente ataque</button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
