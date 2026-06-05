"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { CARTAS_CIVIL } from "@/data/civilis/cartas";
import { getRegionCivil } from "@/data/civilis/regiones";
import type { RegionCivilId } from "@/types/civilis";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const numero = (art: string) => art.replace("Art. ", "").replace(/ CC$/, "").replace("Arts. ", "");

type Pregunta = { id: string; nombre: string; texto: string; correcto: string; opciones: string[]; region: RegionCivilId };

export default function CompletaCita() {
  const [qs, setQs] = useState<Pregunta[]>([]);
  const [idx, setIdx] = useState(0);
  const [elegida, setElegida] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [fin, setFin] = useState(false);

  useEffect(() => {
    const N = 10;
    const numeros = Array.from(new Set(CARTAS_CIVIL.map((c) => numero(c.articulo))));
    const sel = shuffle(CARTAS_CIVIL).slice(0, N);
    setQs(sel.map((c) => {
      const correcto = numero(c.articulo);
      const distract = shuffle(numeros.filter((n) => n !== correcto)).slice(0, 3);
      return { id: c.id, nombre: c.nombre, texto: c.texto, correcto, opciones: shuffle([correcto, ...distract]), region: c.region };
    }));
  }, []);

  if (qs.length === 0) return <div className="civ-panel p-8 text-center font-mono-terminal text-sm opacity-60 max-w-xl mx-auto">Preparando citas…</div>;

  const q = qs[idx];
  const region = getRegionCivil(q.region);
  const acerto = elegida !== null && elegida === q.correcto;

  const elegir = (n: string) => { if (elegida !== null) return; setElegida(n); if (n === q.correcto) { setAciertos((a) => a + 1); sfx.confirm?.(); } else sfx.warning?.(); };
  const siguiente = () => { if (idx + 1 >= qs.length) { setFin(true); return; } setIdx((i) => i + 1); setElegida(null); sfx.click?.(); };
  const reiniciar = () => { setIdx(0); setElegida(null); setAciertos(0); setFin(false); setQs([]); sfx.click?.();
    // re-disparar generación
    setTimeout(() => {
      const numeros = Array.from(new Set(CARTAS_CIVIL.map((c) => numero(c.articulo))));
      const sel = shuffle(CARTAS_CIVIL).slice(0, 10);
      setQs(sel.map((c) => { const correcto = numero(c.articulo); const distract = shuffle(numeros.filter((n) => n !== correcto)).slice(0, 3); return { id: c.id, nombre: c.nombre, texto: c.texto, correcto, opciones: shuffle([correcto, ...distract]), region: c.region }; }));
    }, 0);
  };

  if (fin) {
    const pct = Math.round((aciertos / qs.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="civ-panel p-6 md:p-8 max-w-xl mx-auto text-center" data-civ="biblioteca">
        <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "📚" : "🔁"}</div>
        <div className="civ-tag">Completa la cita</div>
        <h1 className="civ-heading text-3xl mt-1">{aciertos}/{qs.length} artículos</h1>
        <p className="font-serif-juridica italic opacity-80 mt-1">{pct >= 80 ? "Citas de memoria. Eso impresiona en el grado." : "Repasa los números que fallaste."}</p>
        <button onClick={reiniciar} className="civ-btn px-5 py-2.5 text-sm mt-4">Otra ronda ▸</button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-civ={q.region}>
      <div className="flex items-center justify-between mb-3 font-mono-terminal text-[11px] opacity-70">
        <span>🔢 Completa la cita</span>
        <span>{idx + 1}/{qs.length} · ✓ {aciertos}</span>
      </div>
      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
        <div className="h-full rounded-full transition-all" style={{ width: `${(idx / qs.length) * 100}%`, background: "var(--civ-primary)" }} />
      </div>

      <motion.div key={q.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="civ-panel p-5 md:p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2"><span className="text-lg">{region?.icono}</span><span className="civ-tag">{region?.nombre}</span></div>
        <div className="civ-tag mb-1">¿Qué artículo del CC consagra…</div>
        <p className="font-serif-juridica text-lg md:text-xl leading-relaxed">{q.nombre}?</p>
        {elegida !== null && <p className="font-serif-juridica text-[12.5px] italic opacity-75 mt-2">«{q.texto}»</p>}
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {q.opciones.map((n) => {
          let st: string | undefined;
          if (elegida !== null) st = n === q.correcto ? "ok" : n === elegida ? "bad" : "dim";
          return (
            <button key={n} onClick={() => elegir(n)} disabled={elegida !== null} data-state={st}
              className="civ-opt py-4 civ-heading text-lg">Art. {n}</button>
          );
        })}
      </div>

      {elegida !== null && (
        <button onClick={siguiente} className="civ-btn w-full py-2.5 text-sm mt-3">{idx + 1 >= qs.length ? "Ver resultado ▸" : "Siguiente ▸"}</button>
      )}
    </div>
  );
}
