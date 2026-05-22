"use client";
import Link from "next/link";
import { useState } from "react";
import { BOSSES } from "@/data/bosses";
import type { BossId } from "@/types/expansion";
import InterrogacionOral from "@/components/InterrogacionOral";
import { useGame } from "@/store/useGame";

export default function OralPage() {
  const game = useGame();
  const [bossActivo, setBossActivo] = useState<BossId | null>(null);
  const derrotados = game.logros.filter((l) => l.id.startsWith("boss_")).map((l) => l.id.replace("boss_", ""));

  if (bossActivo) {
    return (
      <main className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
        <div className="flex justify-between mb-4">
          <button className="btn" onClick={() => setBossActivo(null)}>◂ Retirarse</button>
          <div className="tag tag-red">MODO INTERROGACIÓN ORAL</div>
        </div>
        <InterrogacionOral bossId={bossActivo} onFin={() => setBossActivo(null)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <Link href="/juego" className="btn">◂ Mapa</Link>
        <div className="tag tag-red">MODO INTERROGACIÓN ORAL · BOSSES</div>
      </header>

      <h1 className="label-art text-3xl text-neon-blue mb-2">Comisión examinadora</h1>
      <p className="text-parchment/60 text-sm mb-6">
        Seis arquetipos del examen de grado chileno. Cada uno ataca con cadenas: pregunta directa → repregunta → trampa → derivación.
        Acertar daña al boss; fallar consume tu salud mental. Derrotar a los seis desbloquea el Modo Pesadilla.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {BOSSES.map((b) => {
          const vencido = derrotados.includes(b.id);
          return (
            <button
              key={b.id}
              onClick={() => setBossActivo(b.id)}
              className={`terminal p-5 text-left transition hover:bg-neon-blue/5 ${vencido ? "border-neon-blue" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="tag tag-violet">{b.rama.toUpperCase()}</div>
                  <h2 className="label-art text-neon-cyan text-lg mt-1">{b.nombre}</h2>
                </div>
                {vencido && <div className="tag tag-amber">★ VENCIDO</div>}
              </div>
              <p className="text-parchment/70 text-xs italic mt-2">{b.arquetipo}</p>
              <p className="text-parchment/60 text-sm mt-2">{b.descripcion}</p>
              <div className="mt-3 text-[10px] grid grid-cols-2 gap-2">
                <div>Salud boss: <b className="text-neon-red">{b.saludInicial}</b></div>
                <div>Salud jugador: <b className="text-neon-blue">{b.saludJugador}</b></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 terminal p-4">
        <div className="label-art text-neon-violet text-sm mb-2">Progreso comisión</div>
        <div className="text-xs text-parchment/70">Bosses derrotados: <b className="text-neon-cyan">{derrotados.length}</b> / {BOSSES.length}</div>
        {derrotados.length === BOSSES.length && (
          <p className="text-neon-amber text-xs mt-2 glitch-text">★ COMISIÓN VENCIDA. Modo Pesadilla desbloqueado.</p>
        )}
      </div>
    </main>
  );
}
