"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/useGame";
import { RELICS, MAX_RELICS_EQUIPADAS, type Relic } from "@/data/relics";
import { sfx } from "@/lib/audio";
import { fx } from "@/lib/fx";

// ============================================================================
// INVENTARIO PANEL — Phase 16: Reliquias Procesales
// Tienda + gestión de reliquias equipadas. Máx. 3 activas.
// ============================================================================

const ZONA_COLOR: Record<string, string> = {
  recursos:       "var(--zona-recursos)",
  cautelares:     "var(--zona-cautelares)",
  nulidad:        "var(--zona-nulidad)",
  ejecutivo:      "var(--zona-ejecutivo)",
  prueba:         "var(--zona-prueba)",
  competencia:    "var(--zona-competencia)",
  notificaciones: "var(--zona-notificaciones, #7AD4E6)",
  cosajuzgada:    "var(--zona-cosajuzgada, #F2F2F0)",
};

type Tab = "tienda" | "equipadas";

export default function InventarioPanel() {
  const game = useGame();
  const [tab, setTab] = useState<Tab>("tienda");
  const [feedback, setFeedback] = useState<string | null>(null);

  const relicsEquipadas = game.relicsEquipadas ?? [];
  const relicsCompradas = game.relicsCompradas ?? [];

  function mostrarFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2200);
  }

  function handleComprar(relic: Relic) {
    if (relicsCompradas.includes(relic.id)) return;
    const ok = game.comprarRelic(relic.id, relic.costo);
    if (ok) {
      sfx.confirm();
      fx.coinGain(relic.costo);
      mostrarFeedback(`✓ ${relic.nombre} adquirida`);
    } else {
      sfx.glitch?.();
      mostrarFeedback(`✗ Monedas insuficientes (necesitas ${relic.costo}🪙)`);
    }
  }

  function handleEquipar(relic: Relic) {
    const ok = game.equiparRelic(relic.id);
    if (ok) {
      sfx.click();
      fx.success();
      mostrarFeedback(`✓ ${relic.nombre} equipada`);
    } else if (relicsEquipadas.length >= MAX_RELICS_EQUIPADAS) {
      sfx.glitch?.();
      mostrarFeedback(`✗ Máximo ${MAX_RELICS_EQUIPADAS} reliquias equipadas`);
    }
  }

  function handleDesequipar(relicId: string) {
    game.desequiparRelic(relicId);
    sfx.click();
    const r = RELICS.find((x) => x.id === relicId);
    if (r) mostrarFeedback(`${r.nombre} desequipada`);
  }

  const equipadasData = relicsEquipadas
    .map((id) => RELICS.find((r) => r.id === id))
    .filter(Boolean) as Relic[];

  const tiendaRelics = RELICS;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="font-mono-terminal text-[9px] uppercase tracking-[.4em] text-zona-prueba mb-1">
          RELIQUIAS PROCESALES
        </div>
        <h2 className="font-display-grave text-2xl text-doc-aged mb-1">Inventario</h2>
        <div className="flex items-center gap-4 text-[9px] font-mono-terminal text-doc-aged/40">
          <span>🪙 {game.monedas} disponibles</span>
          <span>⚔️ {relicsEquipadas.length}/{MAX_RELICS_EQUIPADAS} slots</span>
          <span>📦 {relicsCompradas.length}/{RELICS.length} adquiridas</span>
        </div>
      </div>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="terminal p-2 text-center font-mono-terminal text-xs"
            style={{
              borderColor: feedback.startsWith("✓")
                ? "rgba(88,245,176,.5)"
                : "rgba(217,74,74,.5)",
              color: feedback.startsWith("✓")
                ? "var(--zona-cautelares)"
                : "var(--zona-nulidad)",
            }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["tienda", "equipadas"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); sfx.click(); }}
            onMouseEnter={() => sfx.hover()}
            className="flex-1 py-2 text-[10px] font-mono-terminal uppercase tracking-wider border transition-all"
            style={{
              borderColor: tab === t ? "var(--zona-prueba)" : "rgba(255,255,255,.1)",
              color: tab === t ? "var(--zona-prueba)" : "rgba(255,255,255,.3)",
              background: tab === t ? "rgba(215,180,106,.06)" : "transparent",
            }}
          >
            {t === "tienda" ? `🏪 Tienda (${RELICS.length})` : `⚔️ Equipadas (${relicsEquipadas.length})`}
          </button>
        ))}
      </div>

      {/* TIENDA */}
      {tab === "tienda" && (
        <div className="grid md:grid-cols-2 gap-3">
          {tiendaRelics.map((relic, i) => {
            const comprada = relicsCompradas.includes(relic.id);
            const equipada = relicsEquipadas.includes(relic.id);
            const zonaColor = ZONA_COLOR[relic.zona] ?? "var(--zona-recursos)";
            return (
              <motion.div
                key={relic.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="terminal p-4 space-y-3"
                style={{
                  borderColor: comprada ? `${zonaColor}60` : "rgba(255,255,255,.08)",
                  background: comprada ? `${zonaColor}05` : "transparent",
                }}
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{relic.icono}</span>
                  <div className="flex-grow min-w-0">
                    <div
                      className="font-mono-terminal text-[8px] uppercase tracking-widest mb-0.5"
                      style={{ color: zonaColor }}
                    >
                      {relic.zona.toUpperCase()}
                      {equipada && " · EQUIPADA"}
                    </div>
                    <h3 className="font-display-grave text-base text-doc-aged leading-tight">
                      {relic.nombre}
                    </h3>
                  </div>
                  {/* Price badge */}
                  {!comprada && (
                    <span
                      className="font-mono-terminal text-[9px] flex-shrink-0"
                      style={{ color: game.monedas >= relic.costo ? "var(--zona-cautelares)" : "var(--zona-nulidad)" }}
                    >
                      {relic.costo}🪙
                    </span>
                  )}
                  {comprada && !equipada && (
                    <span className="font-mono-terminal text-[9px] text-zona-prueba flex-shrink-0">✓ LIBRE</span>
                  )}
                  {equipada && (
                    <span className="font-mono-terminal text-[9px] text-zona-cautelares flex-shrink-0">⚔️ ON</span>
                  )}
                </div>

                {/* Articulo */}
                <div className="font-mono-terminal text-[8px] text-doc-aged/35 leading-relaxed border-l pl-2"
                  style={{ borderColor: `${zonaColor}30` }}>
                  {relic.articulo}
                </div>

                {/* Effect */}
                <div className="font-mono-terminal text-[9px] text-doc-aged/70">
                  ✦ {relic.efecto}
                </div>

                {/* Description */}
                <p className="font-serif-juridica text-[10px] text-doc-aged/50 italic leading-relaxed">
                  {relic.descripcion}
                </p>

                {/* Action button */}
                <div className="flex gap-2">
                  {!comprada && (
                    <button
                      onClick={() => handleComprar(relic)}
                      onMouseEnter={() => sfx.hover()}
                      className="flex-1 btn text-xs"
                      style={{
                        borderColor: game.monedas >= relic.costo ? `${zonaColor}60` : "rgba(217,74,74,.4)",
                        color: game.monedas >= relic.costo ? zonaColor : "var(--zona-nulidad)",
                      }}
                      disabled={game.monedas < relic.costo}
                    >
                      Comprar — {relic.costo}🪙
                    </button>
                  )}
                  {comprada && !equipada && (
                    <button
                      onClick={() => handleEquipar(relic)}
                      onMouseEnter={() => sfx.hover()}
                      className="flex-1 btn btn-cautelar text-xs"
                      disabled={relicsEquipadas.length >= MAX_RELICS_EQUIPADAS}
                    >
                      {relicsEquipadas.length >= MAX_RELICS_EQUIPADAS ? "Slots llenos" : "⚔️ Equipar"}
                    </button>
                  )}
                  {equipada && (
                    <button
                      onClick={() => handleDesequipar(relic.id)}
                      onMouseEnter={() => sfx.hover()}
                      className="flex-1 btn btn-danger text-xs"
                    >
                      Desequipar
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* EQUIPADAS */}
      {tab === "equipadas" && (
        <div className="space-y-4">
          {equipadasData.length === 0 ? (
            <div className="terminal p-8 text-center">
              <div className="text-4xl mb-3 opacity-30">⚔️</div>
              <p className="font-mono-terminal text-[10px] text-doc-aged/40">
                Sin reliquias equipadas. Compra y equipa hasta {MAX_RELICS_EQUIPADAS} reliquias.
              </p>
            </div>
          ) : (
            <>
              {/* Active slots */}
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: MAX_RELICS_EQUIPADAS }).map((_, slotIdx) => {
                  const relic = equipadasData[slotIdx];
                  const zonaColor = relic ? (ZONA_COLOR[relic.zona] ?? "var(--zona-recursos)") : null;
                  return (
                    <div
                      key={slotIdx}
                      className="terminal p-4 text-center min-h-28 flex flex-col items-center justify-center gap-2"
                      style={zonaColor ? { borderColor: `${zonaColor}60`, background: `${zonaColor}05` } : { borderColor: "rgba(255,255,255,.06)", borderStyle: "dashed" }}
                    >
                      {relic ? (
                        <>
                          <span className="text-3xl">{relic.icono}</span>
                          <div className="font-mono-terminal text-[9px]" style={{ color: zonaColor ?? "white" }}>
                            {relic.nombre.split(" ").slice(0, 2).join(" ")}
                          </div>
                          <button
                            onClick={() => handleDesequipar(relic.id)}
                            className="text-[8px] font-mono-terminal text-zona-nulidad/60 hover:text-zona-nulidad"
                          >
                            [remover]
                          </button>
                        </>
                      ) : (
                        <div className="font-mono-terminal text-[9px] text-doc-aged/20">
                          SLOT {slotIdx + 1}<br/>vacío
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Active effects summary */}
              <div className="terminal p-4 space-y-2">
                <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-prueba mb-2">
                  EFECTOS ACTIVOS
                </div>
                {equipadasData.map((relic) => {
                  const zonaColor = ZONA_COLOR[relic.zona] ?? "var(--zona-recursos)";
                  return (
                    <div key={relic.id} className="flex items-center gap-3">
                      <span className="text-lg">{relic.icono}</span>
                      <div className="flex-grow">
                        <div className="font-mono-terminal text-[9px]" style={{ color: zonaColor }}>
                          {relic.nombre}
                        </div>
                        <div className="font-mono-terminal text-[9px] text-doc-aged/60">
                          ✦ {relic.efecto}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Quick shop link */}
          {relicsCompradas.length < RELICS.length && (
            <button
              onClick={() => { setTab("tienda"); sfx.click(); }}
              className="btn w-full text-xs"
              style={{ borderColor: "rgba(215,180,106,.3)", color: "var(--zona-prueba)" }}
            >
              ▸ Ver tienda — {RELICS.length - relicsCompradas.length} reliquias disponibles
            </button>
          )}
        </div>
      )}

      <p className="text-[9px] font-mono-terminal text-doc-aged/25 italic">
        Las reliquias aplican bonificaciones pasivas en XP, monedas, trauma y combate oral.
        Máximo {MAX_RELICS_EQUIPADAS} reliquias equipadas simultáneamente.
      </p>
    </div>
  );
}
