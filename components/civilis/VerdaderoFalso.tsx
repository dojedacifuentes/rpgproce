"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { VOF_CIVIL } from "@/data/civilis/verdaderofalso";
import { getRegionCivil } from "@/data/civilis/regiones";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function VerdaderoFalso() {
  const [pool, setPool] = useState<typeof VOF_CIVIL>([]);
  const [idx, setIdx] = useState(0);
  const [resp, setResp] = useState<boolean | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [fin, setFin] = useState(false);
  useEffect(() => { setPool(shuffle(VOF_CIVIL)); }, []);

  if (pool.length === 0) {
    return <div className="civ-panel p-8 text-center font-mono-terminal text-sm opacity-60 max-w-xl mx-auto">Barajando…</div>;
  }

  const a = pool[idx];
  const region = a ? getRegionCivil(a.region) : undefined;
  const acerto = resp !== null && resp === a.verdadero;

  const responder = (v: boolean) => {
    if (resp !== null) return;
    setResp(v);
    if (v === a.verdadero) { setAciertos((x) => x + 1); sfx.confirm?.(); } else sfx.warning?.();
  };
  const siguiente = () => {
    if (idx + 1 >= pool.length) { setFin(true); return; }
    setIdx((i) => i + 1); setResp(null); sfx.click?.();
  };
  const reiniciar = () => { setIdx(0); setResp(null); setAciertos(0); setFin(false); sfx.click?.(); };

  if (fin) {
    const pct = Math.round((aciertos / pool.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="civ-panel p-6 md:p-8 max-w-xl mx-auto text-center" data-civ="contratos">
        <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "📚" : "🔁"}</div>
        <div className="civ-tag">Detector de errores</div>
        <h1 className="civ-heading text-3xl mt-1">{aciertos}/{pool.length} correctas</h1>
        <p className="font-serif-juridica italic opacity-80 mt-1">{pct >= 80 ? "Buen ojo para la trampa." : "Repasa las que fallaste."}</p>
        <button onClick={reiniciar} className="civ-btn px-5 py-2.5 text-sm mt-4">Otra ronda ▸</button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-civ={a.region}>
      <div className="flex items-center justify-between mb-3 font-mono-terminal text-[11px] opacity-70">
        <span>⚖️ Verdadero o Falso</span>
        <span>{idx + 1}/{pool.length} · ✓ {aciertos}</span>
      </div>
      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
        <div className="h-full rounded-full transition-all" style={{ width: `${(idx / pool.length) * 100}%`, background: "var(--civ-primary)" }} />
      </div>

      <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="civ-panel p-5 md:p-7 min-h-[180px] flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-3"><span className="text-lg">{region?.icono}</span><span className="civ-tag">{region?.nombre}</span></div>
        <p className="font-serif-juridica text-lg md:text-xl leading-relaxed">«{a.texto}»</p>
      </motion.div>

      {resp === null ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button onClick={() => responder(true)} className="civ-opt py-4 civ-heading text-base" style={{ borderColor: "#5fb37a66", color: "#9fe0b2" }}>✓ Verdadero</button>
          <button onClick={() => responder(false)} className="civ-opt py-4 civ-heading text-base" style={{ borderColor: "#c65b6e66", color: "#f0a8b2" }}>✗ Falso</button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <div className="civ-card p-3" style={{ borderColor: acerto ? "#5fb37a66" : "#c65b6e66" }}>
              <div className="civ-tag mb-1" style={{ color: acerto ? "#7ed79a" : "#f09aa8" }}>
                {acerto ? "✦ Correcto" : "✗ Incorrecto"} — era {a.verdadero ? "Verdadero" : "Falso"} · {a.articulo}
              </div>
              <p className="font-serif-juridica text-[13.5px] leading-relaxed opacity-90">{a.explicacion}</p>
            </div>
            <button onClick={siguiente} className="civ-btn w-full py-2.5 text-sm mt-2">{idx + 1 >= pool.length ? "Ver resultado ▸" : "Siguiente ▸"}</button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
