"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useCivilis } from "@/store/useCivilis";
import { REGIONES_CIVIL, SENDERO_CIVIL, getRegionCivil } from "@/data/civilis/regiones";
import { CODEX_CIVIL } from "@/data/civilis/codex";
import { PARTY_CIVIL } from "@/data/civilis/party";
import { casosPorRegion } from "@/data/civilis/casos";

export default function CivilisHub() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const oro = useCivilis((s) => s.oro);
  const xp = useCivilis((s) => s.xp);
  const completadas = useCivilis((s) => s.regionesCompletadas);
  const codexN = useCivilis((s) => s.codexDesbloqueado.length);
  useEffect(() => setMounted(true), []);

  const viajar = (id: string) => {
    sfx.whoosh?.();
    router.push(`/civilis/${id}`);
  };

  return (
    <main className="px-3 md:px-6 py-4 max-w-6xl mx-auto pb-16">
      {/* header */}
      <header className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <Link href="/juego" className="civ-btn text-xs px-3 py-1.5" onClick={() => sfx.click?.()}>◂ Ciudad Judicial</Link>
        <div className="flex items-center gap-2 font-mono-terminal text-[11px]">
          <span className="civ-card px-2 py-1">⭐ {mounted ? xp : 0} XP</span>
          <span className="civ-card px-2 py-1">🪙 {mounted ? oro : 0}</span>
          <Link href="/civilis/codex" onClick={() => sfx.click?.()} className="civ-btn px-3 py-1">📚 Codex {mounted ? codexN : 0}/{CODEX_CIVIL.length}</Link>
        </div>
      </header>

      <div className="mb-3">
        <div className="civ-tag">Expansión · Derecho Civil</div>
        <h1 className="civ-heading text-3xl md:text-5xl">Civilis</h1>
        <p className="font-serif-juridica opacity-70 text-sm md:text-base max-w-2xl mt-1">
          El Reino de las Obligaciones. Recorre las nueve regiones, clasifica los casos que las habitan y completa el Codex para sobrevivir al examen de grado.
        </p>
      </div>

      {/* ── MAPA MUNDO ── */}
      <div className="civ-panel relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10", minHeight: 320, maxHeight: 560 }}>
        {/* terreno + senderos */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          <defs>
            <radialGradient id="civ-map-glow" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stopColor="rgba(217,178,76,0.10)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#civ-map-glow)" />
          {/* siluetas de terreno (montañas / bosque) muy tenues */}
          <g fill="rgba(120,150,120,0.06)">
            <path d="M0 62 L10 48 L20 60 L30 44 L42 60 L52 50 L64 62 L76 46 L88 60 L100 50 L100 100 L0 100 Z" />
          </g>
          <g fill="rgba(90,110,150,0.05)">
            <path d="M0 74 L14 64 L28 74 L44 62 L60 74 L74 64 L90 74 L100 66 L100 100 L0 100 Z" />
          </g>
          {/* senderos */}
          {SENDERO_CIVIL.map(([a, b], i) => {
            const ra = getRegionCivil(a), rb = getRegionCivil(b);
            if (!ra || !rb) return null;
            return (
              <line key={i} x1={ra.x} y1={ra.y} x2={rb.x} y2={rb.y}
                stroke="rgba(217,178,76,0.35)" strokeWidth="0.5" strokeDasharray="1.5 1.5"
                vectorEffect="non-scaling-stroke" />
            );
          })}
        </svg>

        {/* nodos de región */}
        {REGIONES_CIVIL.map((r) => {
          const hecha = mounted && completadas.includes(r.id);
          const total = casosPorRegion(r.id).length;
          const enPrep = total === 0;
          return (
            <button
              key={r.id}
              onClick={() => viajar(r.id)}
              onMouseEnter={() => sfx.hover?.()}
              data-civ={r.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              title={r.nombre}
            >
              <div
                className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl transition-transform group-hover:scale-110 group-active:scale-95"
                style={{
                  border: "2px solid var(--civ-primary)",
                  background: "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--civ-primary) 26%, #0b0e16), #0b0e16)",
                  boxShadow: "0 0 16px color-mix(in srgb, var(--civ-primary) 45%, transparent)",
                }}
              >
                {r.icono}
                {hecha && (
                  <span className="absolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#5fb37a", color: "#08120b" }}>✓</span>
                )}
                {enPrep && (
                  <span className="absolute -bottom-1 -right-1 text-[8px]">🚧</span>
                )}
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded text-center" style={{ background: "rgba(8,9,13,0.78)", border: "1px solid color-mix(in srgb, var(--civ-primary) 40%, transparent)", maxWidth: 92 }}>
                <div className="civ-heading text-[9px] md:text-[10px] leading-tight" style={{ color: "var(--civ-primary)" }}>{r.nombre}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── COMPAÑÍA ── */}
      <div className="mt-5">
        <div className="civ-tag mb-2">Tu Compañía</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
          {PARTY_CIVIL.map((p) => (
            <div key={p.id} className="civ-card p-2.5 text-center">
              <div className="text-2xl mb-1" style={{ filter: `drop-shadow(0 0 6px ${p.color})` }}>{p.icono}</div>
              <div className="civ-heading text-[11px] leading-tight" style={{ color: p.color }}>{p.nombre}</div>
              <div className="font-mono-terminal text-[8px] opacity-55 leading-tight mt-0.5">{p.titulo}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
