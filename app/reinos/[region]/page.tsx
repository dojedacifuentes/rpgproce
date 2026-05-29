"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx, startAmbient, stopAmbient } from "@/lib/audio";
import { getRegion } from "@/data/reinos/regiones";
import { desafiosPorRegion, TIPO_DESAFIO_META } from "@/data/reinos/desafios";
import { getBoss } from "@/data/reinos/bosses";
import { articulosPorRegion } from "@/data/reinos/articulos";
import { useReinos } from "@/store/useReinos";
import DesafioEngine from "@/components/reinos/DesafioEngine";
import BossBattle from "@/components/reinos/BossBattle";
import type { RegionId } from "@/types/reinos";

const AMBIENTE_REGION: Record<RegionId, "ambiente" | "oral" | "ejecutivo" | "nulidad" | "recursos"> = {
  bosque_obligaciones: "ambiente",
  ciudad_mercantil: "ejecutivo",
  tierras_posesion: "ambiente",
  mansion_sucesoria: "nulidad",
  republica_administrativa: "recursos",
  castillo_competencia: "oral",
  tribunal_supremo: "oral",
};

const VIDAS_INICIALES = 3;

type Encuentro = { tipo: "desafio"; id: string } | { tipo: "boss" } | null;

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = getRegion(params.region);

  const resolverDesafio = useReinos((s) => s.resolverDesafio);
  const desafiosResueltos = useReinos((s) => s.desafiosResueltos);
  const bossesDerrotados = useReinos((s) => s.bossesDerrotados);

  const [mounted, setMounted] = useState(false);
  const [vidas, setVidas] = useState(VIDAS_INICIALES);
  const [encuentro, setEncuentro] = useState<Encuentro>(null);
  const [derrota, setDerrota] = useState(false);
  const [ambiente, setAmbiente] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => () => stopAmbient(), []);

  const desafios = useMemo(() => (region ? desafiosPorRegion(region.id) : []), [region]);
  const boss = region ? getBoss(region.bossId) : undefined;
  const arts = region ? articulosPorRegion(region.id) : [];

  if (!region) {
    return (
      <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="text-5xl mb-4">🧭</div>
        <h1 className="font-display-grave text-2xl text-doc-aged mb-3">Región desconocida</h1>
        <Link href="/reinos" className="btn text-xs">◂ Volver al overworld</Link>
      </main>
    );
  }

  const resueltosRegion = desafios.filter((d) => mounted && desafiosResueltos.includes(d.id)).length;
  const todosResueltos = mounted && desafios.every((d) => desafiosResueltos.includes(d.id));
  const bossVencido = mounted && boss ? bossesDerrotados.includes(boss.id) : false;

  const toggleAmbiente = () => {
    if (ambiente) { stopAmbient(); setAmbiente(false); }
    else { startAmbient(AMBIENTE_REGION[region.id]); setAmbiente(true); }
    sfx.click?.();
  };

  const perderVida = () => {
    setVidas((v) => {
      const nv = v - 1;
      if (nv <= 0) setTimeout(() => setDerrota(true), 400);
      return Math.max(0, nv);
    });
  };

  const reagrupar = () => { setVidas(VIDAS_INICIALES); setDerrota(false); setEncuentro(null); sfx.confirm?.(); };

  // ── ENCUENTRO ACTIVO ──────────────────────────────────────────────────────
  const renderEncuentro = () => {
    if (!encuentro) return null;
    if (encuentro.tipo === "boss" && boss) {
      return <BossBattle boss={boss} onClose={() => { setEncuentro(null); sfx.click?.(); }} />;
    }
    if (encuentro.tipo === "desafio") {
      const d = desafios.find((x) => x.id === encuentro.id);
      if (!d) return null;
      return (
        <DesafioEngine
          desafio={d}
          yaResuelto={mounted && desafiosResueltos.includes(d.id)}
          onCorrect={() => resolverDesafio(d.id, d.recompensa)}
          onWrong={perderVida}
          onClose={() => { setEncuentro(null); sfx.click?.(); }}
        />
      );
    }
    return null;
  };

  return (
    <div data-reino={region.id} style={{ background: `radial-gradient(1100px 600px at 50% -10%, ${region.paleta.ambient}, transparent 60%)` }}>
      <main className="min-h-screen px-4 md:px-8 py-6 max-w-5xl mx-auto">
        {/* Header de región */}
        <header className="flex items-start justify-between flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-3">
            <Link href="/reinos" className="btn text-xs" onClick={() => sfx.click?.()}>◂ Overworld</Link>
            <button onClick={toggleAmbiente} className="btn text-[10px] px-3 py-1.5" title="Música temática de la región">
              {ambiente ? "♪ Ambiente ON" : "♪ Ambiente"}
            </button>
          </div>
          {/* Vidas */}
          <div className="flex items-center gap-2">
            <span className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/40">Vida</span>
            <div className="flex gap-1">
              {Array.from({ length: VIDAS_INICIALES }).map((_, i) => (
                <span key={i} className={`text-lg ${i < vidas ? "" : "grayscale opacity-30"} ${i < vidas && vidas === 1 ? "reino-flash-red rounded-full" : ""}`}>
                  {i < vidas ? "❤️" : "🖤"}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Título de región */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl">{region.icono}</span>
            <div>
              <div className="font-mono-terminal text-[9px] uppercase tracking-[.25em] reino-fg">
                Región {region.orden} · {region.materia}
              </div>
              <h1 className="font-display-grave text-3xl md:text-4xl text-doc-aged leading-none">{region.nombre}</h1>
            </div>
          </div>
          <p className="font-serif-juridica text-doc-aged/60 text-sm max-w-2xl leading-relaxed mt-2">{region.descripcion}</p>
          <div className="font-mono-terminal text-[9px] text-doc-aged/35 mt-2 uppercase tracking-wider">
            Estética: {region.estetica}
          </div>
        </div>

        {/* Progreso de la región */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-1.5 bg-bg-steel rounded-full overflow-hidden">
            <div className="h-full reino-bar rounded-full transition-all duration-500" style={{ width: `${desafios.length ? (resueltosRegion / desafios.length) * 100 : 0}%` }} />
          </div>
          <span className="font-mono-terminal text-[10px] reino-fg">{resueltosRegion}/{desafios.length} desafíos</span>
          {bossVencido && <span className="font-mono-terminal text-[10px]" style={{ color: "var(--zona-cautelares)" }}>👑 conquistada</span>}
        </div>

        {/* Encuentro o lista */}
        <AnimatePresence mode="wait">
          {encuentro ? (
            <motion.div key="enc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderEncuentro()}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Enemigos / desafíos */}
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/40 mb-3">
                ENEMIGOS DE LA REGIÓN
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {desafios.map((d) => {
                  const done = mounted && desafiosResueltos.includes(d.id);
                  const meta = TIPO_DESAFIO_META[d.tipo];
                  return (
                    <button
                      key={d.id}
                      onClick={() => { sfx.confirm?.(); setEncuentro({ tipo: "desafio", id: d.id }); }}
                      onMouseEnter={() => sfx.hover?.()}
                      className="reino-card p-4 text-left relative"
                    >
                      {done && <span className="absolute top-2 right-2 text-[9px] font-mono-terminal" style={{ color: "var(--zona-cautelares)" }}>✓ vencido</span>}
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{d.iconoEnemigo}</span>
                        <div className="min-w-0">
                          <div className="font-display-grave text-base text-doc-aged leading-tight">{d.enemigo}</div>
                          <div className="font-mono-terminal text-[8px] uppercase tracking-wider reino-fg mt-0.5">
                            {meta.icono} {meta.label} · {"★".repeat(d.dificultad)} · {d.articuloClave}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Jefe de región */}
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/40 mb-3">JEFE DE LA REGIÓN</div>
              {boss && (
                <button
                  onClick={() => {
                    if (!todosResueltos) { sfx.warning?.(); return; }
                    sfx.confirm?.(); setEncuentro({ tipo: "boss" });
                  }}
                  onMouseEnter={() => todosResueltos && sfx.hover?.()}
                  disabled={!todosResueltos}
                  className="reino-card w-full p-5 text-left relative overflow-hidden"
                  style={{ opacity: todosResueltos ? 1 : 0.55, cursor: todosResueltos ? "pointer" : "not-allowed" }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-5xl ${todosResueltos ? "reino-float" : "grayscale"}`}>{todosResueltos ? boss.icono : "🔒"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono-terminal text-[9px] uppercase tracking-widest reino-fg">⚔ {boss.arquetipo}</div>
                      <div className="font-display-grave text-xl text-doc-aged">{boss.nombre}</div>
                      <div className="font-serif-juridica text-doc-aged/55 text-xs mt-1">{boss.problemaJuridico}</div>
                    </div>
                    {bossVencido ? (
                      <span className="font-mono-terminal text-[9px] shrink-0" style={{ color: "var(--zona-cautelares)" }}>👑 DERROTADO</span>
                    ) : (
                      <span className="font-mono-terminal text-[9px] reino-fg shrink-0">
                        {todosResueltos ? "ENTRAR ▸" : `Supera ${desafios.length} desafíos`}
                      </span>
                    )}
                  </div>
                </button>
              )}

              {/* Artículos de la región */}
              <div className="mt-8">
                <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/40 mb-2">
                  ARTÍCULOS DE ESTA REGIÓN · <Link href="/reinos/biblioteca" className="reino-fg underline">ver biblioteca</Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {arts.map((a) => (
                    <span key={a.id} className="reino-chip font-mono-terminal text-[10px] px-2 py-1">{a.icono} {a.etiqueta}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Overlay de derrota (sin vidas) */}
      <AnimatePresence>
        {derrota && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(6,7,11,0.85)", backdropFilter: "blur(3px)" }}
          >
            <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="reino-card p-6 md:p-8 max-w-md text-center">
              <div className="text-5xl mb-3">💔</div>
              <h2 className="font-display-grave text-2xl text-doc-aged mb-2">Te retiras a curar heridas</h2>
              <p className="font-serif-juridica text-doc-aged/60 text-sm mb-5">
                Perdiste toda tu vida en {region.nombre}. No pierdes progreso: los desafíos ya superados quedan guardados.
                Reagrúpate y vuelve al ataque.
              </p>
              <button onClick={reagrupar} className="btn btn-cautelar text-sm px-6 py-3">↻ Reagruparse (vida completa)</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
