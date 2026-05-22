"use client";
import Link from "next/link";
import { useState } from "react";
import { BOSSES } from "@/data/bosses";
import { BOSSES_EXTRA } from "@/data/bosses-extra";
const TODOS_BOSSES = [...BOSSES, ...BOSSES_EXTRA];
import type { BossId } from "@/types/expansion";
import InterrogacionOral from "@/components/InterrogacionOral";
import { AvatarBoss } from "@/components/AvataresJuridicos";
import { useGame } from "@/store/useGame";
import { motion } from "framer-motion";

export default function OralPage() {
  const game = useGame();
  const [bossActivo, setBossActivo] = useState<BossId | null>(null);
  const derrotados = game.logros.filter((l) => l.id.startsWith("boss_")).map((l) => l.id.replace("boss_", ""));

  if (bossActivo) {
    return (
      <main className="min-h-screen px-4 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="flex justify-between mb-4">
          <button className="btn btn-danger" onClick={() => setBossActivo(null)}>◂ Retirarse</button>
          <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-oralidad animate-flicker">
            ANFITEATRO TRIBUNALICIO · TRANSMISIÓN ACTIVA
          </div>
        </div>
        <InterrogacionOral bossId={bossActivo} onFin={() => setBossActivo(null)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-oralidad">
          COMISIÓN EXAMINADORA · 6 INSTANCIAS
        </div>
      </header>

      <div className="mb-10">
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-recursos mb-3">
          ANFITEATRO JUDICIAL CYBERPUNK
        </div>
        <h1 className="font-display-grave text-4xl md:text-5xl text-doc-aged mb-3 glitch-text-oral">
          La Comisión te espera
        </h1>
        <p className="text-doc-aged/60 text-sm font-mono-terminal max-w-2xl">
          Seis arquetipos del examen de grado chileno. Cada uno ataca con cadenas:
          <span className="text-zona-recursos"> pregunta directa</span> →
          <span className="text-zona-prueba"> repregunta</span> →
          <span className="text-zona-nulidad"> trampa</span> →
          <span className="text-zona-cautelares"> derivación</span>.
          <br />Aciertos dañan al boss. Fallos consumen tu salud mental.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {TODOS_BOSSES.map((b, i) => {
          const vencido = derrotados.includes(b.id);
          return (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setBossActivo(b.id)}
              className={`zona-card p-4 text-left transition-all overflow-hidden ${vencido ? "" : ""}`}
              style={{ "--zona-color": "var(--zona-oralidad)" } as React.CSSProperties}
            >
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <AvatarBoss bossId={b.id} size={90} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="tag tag-oralidad text-[9px]">{b.rama}</span>
                    {vencido && <span className="tag tag-cautelar text-[9px]">★ VENCIDO</span>}
                  </div>
                  <h3 className="font-display-grave text-lg text-doc-aged tracking-wider leading-tight mb-2">{b.nombre}</h3>
                  <p className="text-doc-aged/60 text-[11px] font-serif-juridica italic line-clamp-3">{b.arquetipo}</p>
                  <div className="flex gap-2 mt-3 text-[9px] font-mono-terminal">
                    <span className="text-zona-nulidad">♥ {b.saludInicial}</span>
                    <span className="text-zona-competencia">◇ {b.saludJugador}</span>
                    <span className="text-zona-recursos">{b.ataques.length} ataques</span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="terminal p-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-mono-terminal text-[10px] uppercase tracking-widest text-zona-recursos">Progreso comisión</div>
            <div className="font-display-grave text-2xl text-doc-aged">
              {derrotados.length} <span className="text-doc-aged/40">/ {TODOS_BOSSES.length}</span>
            </div>
          </div>
          {derrotados.length === BOSSES.length && (
            <div className="text-zona-oralidad text-sm font-display-grave glitch-text-oral animate-flicker">
              ★ COMISIÓN VENCIDA · MODO PESADILLA DESBLOQUEADO
            </div>
          )}
        </div>
        <div className="h-1 bg-bg-deep border border-bg-steel mt-2">
          <div className="h-full" style={{ width: `${(derrotados.length / TODOS_BOSSES.length) * 100}%`, background: "var(--zona-oralidad)" }} />
        </div>
      </div>
    </main>
  );
}
