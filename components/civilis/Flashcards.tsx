"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { construirDeck, type DeckId } from "@/data/civilis/flashcards";
import { getRegionCivil } from "@/data/civilis/regiones";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function Flashcards({ deck, nombre, icono }: { deck: DeckId; nombre: string; icono: string }) {
  const cards = useMemo(() => shuffle(construirDeck(deck)), [deck]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sabidas, setSabidas] = useState(0);
  const [fin, setFin] = useState(false);

  const card = cards[idx];
  const region = card ? getRegionCivil(card.region) : undefined;

  const responder = (sabia: boolean) => {
    if (sabia) { setSabidas((s) => s + 1); sfx.confirm?.(); } else sfx.warning?.();
    if (idx + 1 >= cards.length) { setFin(true); return; }
    setIdx((i) => i + 1);
    setFlipped(false);
  };

  const reiniciar = () => { setIdx(0); setFlipped(false); setSabidas(0); setFin(false); sfx.click?.(); };

  if (fin) {
    const pct = Math.round((sabidas / cards.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="civ-panel p-6 md:p-8 max-w-xl mx-auto text-center">
        <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "📚" : "🔁"}</div>
        <div className="civ-tag">Mazo terminado · {nombre}</div>
        <h1 className="civ-heading text-3xl mt-1">{sabidas}/{cards.length} dominadas</h1>
        <p className="font-serif-juridica italic opacity-80 mt-1">{pct >= 80 ? "Memoria de grado." : pct >= 50 ? "Vas bien. Repite las que fallaste." : "Repaso necesario. Vuelve a barajar."}</p>
        <div className="flex gap-3 justify-center mt-5">
          <Link href="/civilis/flashcards" className="civ-btn px-4 py-2 text-sm" onClick={() => sfx.click?.()}>◂ Otro mazo</Link>
          <button onClick={reiniciar} className="civ-btn px-5 py-2.5 text-sm">Barajar de nuevo ▸</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-civ={card?.region}>
      {/* progreso */}
      <div className="flex items-center justify-between mb-3 font-mono-terminal text-[10px] opacity-70">
        <span>{icono} {nombre}</span>
        <span>{idx + 1}/{cards.length} · ✓ {sabidas}</span>
      </div>
      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
        <div className="h-full rounded-full transition-all" style={{ width: `${((idx) / cards.length) * 100}%`, background: "var(--civ-primary)" }} />
      </div>

      {/* carta */}
      <div style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id + (flipped ? "-b" : "-f")}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="civ-panel p-5 md:p-7 min-h-[260px] flex flex-col items-center justify-center text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{region?.icono}</span>
              <span className="civ-tag">{flipped ? "Respuesta" : card.etiqueta}</span>
            </div>
            {!flipped ? (
              <p className="font-serif-juridica text-lg md:text-xl leading-relaxed">{card.front}</p>
            ) : (
              <p className="font-serif-juridica text-[14.5px] leading-relaxed opacity-90 whitespace-pre-line text-left">{card.back}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* controles */}
      {!flipped ? (
        <button onClick={() => { setFlipped(true); sfx.click?.(); }} className="civ-btn w-full py-3 text-sm mt-4">Mostrar respuesta ▸</button>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button onClick={() => responder(false)} className="civ-opt py-3 text-sm font-serif-juridica" style={{ borderColor: "#c65b6e66", color: "#f0a8b2" }}>✗ No la sabía</button>
          <button onClick={() => responder(true)} className="civ-opt py-3 text-sm font-serif-juridica" style={{ borderColor: "#5fb37a66", color: "#9fe0b2" }}>✓ La sabía</button>
        </div>
      )}
    </div>
  );
}
