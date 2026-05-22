"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARTAS_BASICAS, type Card, type CardRarity } from "@/lib/game-systems";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";

// ============================================================================
// SISTEMA DE CARTAS — Interfaz de tarjetas jurídicas
// Visualiza estrategias como juego de cartas
// ============================================================================

type Vista = "menu" | "mano" | "detalles" | "estrategia";

const RARITY_COLOR: Record<CardRarity, string> = {
  comun: "text-doc-aged/60",
  rara: "text-zona-prueba",
  epica: "text-zona-recursos",
  legendaria: "text-zona-nulidad",
};

const RARITY_BORDER: Record<CardRarity, string> = {
  comun: "border-doc-aged/20",
  rara: "border-zona-prueba/40",
  epica: "border-zona-recursos/40",
  legendaria: "border-zona-nulidad/40",
};

const RARITY_BG: Record<CardRarity, string> = {
  comun: "bg-doc-aged/5",
  rara: "bg-zona-prueba/5",
  epica: "bg-zona-recursos/5",
  legendaria: "bg-zona-nulidad/5",
};

export default function SistemaCartas() {
  const [vista, setVista] = useState<Vista>("menu");
  const [seleccionada, setSeleccionada] = useState<Card | null>(null);
  const [mano, setMano] = useState<Card[]>([]);
  const pushLog = useGame((s) => s.pushLog);

  function agregarAMano(carta: Card) {
    sfx.confirm();
    setMano((m) => [...m, carta]);
    pushLog(`Carta agregada: ${carta.nombre}`, "SKILL");
  }

  function jugarCarta(carta: Card) {
    sfx.casacion();
    setMano((m) => m.filter((c) => c.id !== carta.id));
    pushLog(`${carta.nombre} — Efecto: ${carta.efecto}`, "SKILL");
  }

  if (vista === "mano") {
    return <VistaManoCarta mano={mano} onVolver={() => setVista("menu")} jugar={jugarCarta} />;
  }

  if (vista === "detalles" && seleccionada) {
    return <VistaDetalleCarta carta={seleccionada} onVolver={() => { setVista("menu"); setSeleccionada(null); }} agregar={agregarAMano} />;
  }

  return (
    <div className="space-y-4">
      <div className="terminal p-5">
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos mb-2">MAZO JURÍDICO</div>
        <h2 className="font-display-grave text-3xl text-doc-aged mb-2">Sistema de Cartas</h2>
        <p className="font-serif-juridica italic text-doc-aged/60 text-sm">
          «Cada defensa es una carta. Cada recurso es un movimiento. El juego termina cuando alguien comete un error táctico.»
        </p>
        <div className="grid grid-cols-3 gap-2 mt-4 text-[9px] font-mono-terminal">
          <div className="text-zona-cautelares">EXCEPCIONES: {CARTAS_BASICAS.filter((c) => c.tipo === "excepcion").length}</div>
          <div className="text-zona-prueba">PRUEBAS: {CARTAS_BASICAS.filter((c) => c.tipo === "prueba").length}</div>
          <div className="text-zona-recursos">RECURSOS: {CARTAS_BASICAS.filter((c) => c.tipo === "recurso").length}</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button className="btn btn-recurso text-sm" onClick={() => setVista("mano")}>
          MI MANO ({mano.length})
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CARTAS_BASICAS.map((carta) => (
          <motion.button
            key={carta.id}
            onClick={() => {
              sfx.hover();
              setSeleccionada(carta);
              setVista("detalles");
            }}
            onMouseEnter={() => sfx.hover()}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`relative border-2 p-4 text-left transition-all ${RARITY_BORDER[carta.rarity]} ${RARITY_BG[carta.rarity]}`}
          >
            {/* RAREZA */}
            <div className={`absolute top-2 right-2 text-[8px] font-mono-terminal uppercase ${RARITY_COLOR[carta.rarity]}`}>
              ◆ {carta.rarity}
            </div>

            {/* TIPO */}
            <div className="text-[9px] uppercase tracking-widest font-mono-terminal mb-2" style={{ color: `var(--zona-${carta.institucion})` }}>
              {carta.tipo}
            </div>

            {/* NOMBRE */}
            <h3 className="font-display-grave text-base text-doc-aged mb-2 pr-12">{carta.nombre}</h3>

            {/* ARTÍCULO */}
            <div className="text-[8px] text-doc-aged/40 font-mono-terminal mb-2">{carta.articulo}</div>

            {/* EFECTO */}
            <p className="text-[11px] text-doc-aged/75 font-serif-juridica mb-3 leading-relaxed min-h-[3rem]">{carta.efecto}</p>

            {/* RIESGO */}
            <div className="text-[8px] italic text-zona-nulidad/60 mb-3 border-t border-doc-aged/10 pt-2">
              ⚠ {carta.riesgo}
            </div>

            {/* HUMOR */}
            <div className="text-[9px] text-doc-aged/50 italic font-serif-juridica mb-3">
              «{carta.humor}»
            </div>

            {/* COSTO */}
            <div className="flex justify-between items-center">
              <div className="text-[9px] font-mono-terminal text-doc-aged/40">COSTO: {carta.costo}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.confirm();
                  agregarAMano(carta);
                }}
                className="text-[9px] border border-zona-cautelares text-zona-cautelares px-2 py-0.5 hover:bg-zona-cautelares/10"
              >
                + MANO
              </button>
            </div>
          </motion.button>
        ))}
      </div>

      {/* TIPS */}
      <div className="terminal p-4 text-[10px] font-mono-terminal text-doc-aged/50 space-y-1">
        <div>💡 Cada carta representa una institución, artículo y efecto procesal.</div>
        <div>💡 Agrégalas a tu mano para simular estrategias.</div>
        <div>💡 El riesgo es tan importante como el efecto.</div>
        <div>💡 El humor negro es la verdad procesal disfrazada.</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VISTA: DETALLE DE CARTA
// ─────────────────────────────────────────────────────────────

function VistaDetalleCarta({
  carta,
  onVolver,
  agregar,
}: {
  carta: Card;
  onVolver: () => void;
  agregar: (c: Card) => void;
}) {
  return (
    <div className="space-y-4">
      <button className="btn text-sm" onClick={onVolver}>
        ◂ Volver
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 p-8 space-y-6 ${RARITY_BORDER[carta.rarity]} ${RARITY_BG[carta.rarity]}`}
      >
        {/* ENCABEZADO */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display-grave text-3xl text-doc-aged mb-2">{carta.nombre}</h2>
              <div
                className="text-[10px] uppercase tracking-widest font-mono-terminal"
                style={{ color: `var(--zona-${carta.institucion})` }}
              >
                {carta.tipo} · {carta.institucion}
              </div>
            </div>
            <span className={`text-sm font-mono-terminal uppercase ${RARITY_COLOR[carta.rarity]}`}>
              ◆ {carta.rarity}
            </span>
          </div>

          <div className="border-l-2 border-zona-cautelares pl-3">
            <div className="text-[9px] font-mono-terminal text-zona-cautelares mb-1">ARTÍCULO</div>
            <div className="font-serif-juridica text-doc-aged/80">{carta.articulo}</div>
          </div>
        </div>

        {/* SECCIÓN EFECTO */}
        <div className="p-4 bg-zona-cautelares/10 border border-zona-cautelares/20">
          <div className="text-[9px] font-mono-terminal uppercase tracking-widest text-zona-cautelares mb-2">✓ EFECTO</div>
          <p className="font-serif-juridica text-doc-aged/85 leading-relaxed">{carta.efecto}</p>
        </div>

        {/* SECCIÓN RIESGO */}
        <div className="p-4 bg-zona-nulidad/10 border border-zona-nulidad/20">
          <div className="text-[9px] font-mono-terminal uppercase tracking-widest text-zona-nulidad mb-2">⚠ RIESGO</div>
          <p className="font-serif-juridica text-doc-aged/85 leading-relaxed italic">{carta.riesgo}</p>
        </div>

        {/* SECCIÓN HUMOR */}
        <div className="p-4 bg-doc-aged/5 border border-doc-aged/10">
          <div className="text-[9px] font-mono-terminal uppercase tracking-widest text-doc-aged/50 mb-2">🎭 SARCASMO</div>
          <p className="font-serif-juridica text-doc-aged/75 italic text-lg leading-relaxed">«{carta.humor}»</p>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {carta.tags.map((tag) => (
            <span key={tag} className="text-[8px] border border-doc-aged/20 px-2 py-1 text-doc-aged/60">
              #{tag}
            </span>
          ))}
        </div>

        {/* COSTO */}
        <div className="border-t border-doc-aged/10 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono-terminal text-doc-aged/40 mb-1">COSTO TÁCTICO</div>
              <div className="font-display-grave text-2xl text-doc-aged">{carta.costo}</div>
            </div>
            <button
              onClick={() => {
                agregar(carta);
                onVolver();
              }}
              onMouseEnter={() => sfx.hover()}
              className="btn btn-recurso px-6 py-3"
            >
              + AGREGAR A MANO
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VISTA: MANO DEL JUGADOR
// ─────────────────────────────────────────────────────────────

function VistaManoCarta({
  mano,
  onVolver,
  jugar,
}: {
  mano: Card[];
  onVolver: () => void;
  jugar: (c: Card) => void;
}) {
  if (mano.length === 0) {
    return (
      <div className="space-y-4">
        <button className="btn text-sm" onClick={onVolver}>
          ◂ Volver
        </button>
        <div className="terminal p-8 text-center text-doc-aged/40 font-mono-terminal">
          Sin cartas en la mano. Regresa al mazo y agrega algunas.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button className="btn text-sm" onClick={onVolver}>
          ◂ Volver al mazo
        </button>
        <div className="font-mono-terminal text-[10px] text-zona-cautelares">MANO: {mano.length}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {mano.map((carta) => (
          <motion.div
            key={`${carta.id}-mano`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`border-2 p-4 cursor-pointer hover:shadow-lg transition-all ${RARITY_BORDER[carta.rarity]} ${RARITY_BG[carta.rarity]}`}
            onClick={() => jugar(carta)}
          >
            <div className="space-y-2">
              <h4 className="font-display-grave text-base text-doc-aged">{carta.nombre}</h4>
              <p className="text-[10px] text-doc-aged/70 font-serif-juridica">{carta.efecto}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.casacion();
                  jugar(carta);
                }}
                className="w-full mt-2 text-[9px] border border-zona-cautelares text-zona-cautelares px-3 py-1 hover:bg-zona-cautelares/10"
              >
                ▶ JUGAR CARTA
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
