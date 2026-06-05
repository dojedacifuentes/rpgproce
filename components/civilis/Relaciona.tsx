"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { CARTAS_CIVIL } from "@/data/civilis/cartas";

// ============================================================================
// RELACIONA — empareja institución ↔ artículo. Memoria activa (otra forma de
// clasificar). Derivado de las cartas: nombre ↔ número de artículo.
// ============================================================================

type Carta = (typeof CARTAS_CIVIL)[number];
const K = 6;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const numero = (art: string) => art.replace("Art. ", "").replace(/ CC$/, "").replace("Arts. ", "");

export default function Relaciona() {
  const [izq, setIzq] = useState<Carta[]>([]);
  const [der, setDer] = useState<Carta[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [selL, setSelL] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [parejas, setParejas] = useState(0);
  const [errores, setErrores] = useState(0);

  const nuevaRonda = () => {
    const pool = shuffle(CARTAS_CIVIL).slice(0, K);
    setIzq(shuffle(pool));
    setDer(shuffle(pool));
    setMatched([]); setSelL(null); setWrong(null);
  };
  useEffect(() => { nuevaRonda(); }, []);

  const completa = izq.length > 0 && matched.length === izq.length;

  const clickL = (id: string) => { if (matched.includes(id)) return; setSelL(id); sfx.hover?.(); };
  const clickR = (id: string) => {
    if (matched.includes(id) || !selL) return;
    if (selL === id) {
      setMatched((m) => [...m, id]); setParejas((p) => p + 1); setSelL(null); sfx.confirm?.();
    } else {
      setErrores((e) => e + 1); setWrong(id); sfx.warning?.(); setSelL(null);
      setTimeout(() => setWrong(null), 450);
    }
  };

  return (
    <div className="max-w-2xl mx-auto" data-civ="biblioteca">
      <div className="flex items-center justify-between mb-3 font-mono-terminal text-[11px]">
        <span className="opacity-70">🔗 Relaciona</span>
        <div className="flex gap-2">
          <span className="civ-card px-2 py-1">✓ {parejas}</span>
          <span className="civ-card px-2 py-1">✗ {errores}</span>
        </div>
      </div>

      {completa ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="civ-panel p-6 text-center">
          <div className="text-4xl mb-2">🎯</div>
          <div className="civ-heading text-2xl">¡Ronda completa!</div>
          <p className="font-serif-juridica opacity-75 text-sm mt-1">Emparejaste las {K} instituciones con su artículo.</p>
          <button onClick={() => { nuevaRonda(); sfx.click?.(); }} className="civ-btn px-5 py-2.5 text-sm mt-4">Nueva ronda ▸</button>
        </motion.div>
      ) : (
        <>
          <div className="civ-tag mb-2 text-center">Toca una institución y luego su artículo</div>
          <div className="grid grid-cols-2 gap-3">
            {/* instituciones */}
            <div className="space-y-2">
              {izq.map((c) => {
                const done = matched.includes(c.id);
                const sel = selL === c.id;
                return (
                  <button key={c.id} onClick={() => clickL(c.id)} disabled={done}
                    className="civ-opt w-full px-3 py-3 font-serif-juridica text-[13px] leading-tight"
                    data-state={done ? "ok" : undefined}
                    style={sel ? { borderColor: "var(--civ-primary)", filter: "brightness(1.25)" } : undefined}>
                    {c.nombre}
                  </button>
                );
              })}
            </div>
            {/* artículos */}
            <div className="space-y-2">
              {der.map((c) => {
                const done = matched.includes(c.id);
                const isWrong = wrong === c.id;
                return (
                  <button key={c.id} onClick={() => clickR(c.id)} disabled={done}
                    className="civ-opt w-full px-3 py-3 font-mono-terminal text-sm text-center"
                    data-state={done ? "ok" : isWrong ? "bad" : undefined}>
                    {numero(c.articulo)}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
