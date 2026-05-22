"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/useGame";
import { BUILDS } from "@/lib/builds";
import { sfx } from "@/lib/audio";
import { fx } from "@/lib/fx";
import type { Build } from "@/types/expansion";

// ============================================================================
// SELECCIÓN DE BUILD — v3 visual system
// Especialización procesal: 6 clases con ventajas, desventajas y recursos.
// ============================================================================

const BUILD_ICONS: Record<string, string> = {
  litigante_agresivo: "⚔️",
  monstruo_casacional: "📜",
  formalista_extremo: "🔍",
  estratega_cautelar: "🛡",
  operador_practico: "💼",
  doctrinario: "📚",
};

const BUILD_ZONA: Record<string, string> = {
  litigante_agresivo: "nulidad",
  monstruo_casacional: "recursos",
  formalista_extremo: "competencia",
  estratega_cautelar: "cautelares",
  operador_practico: "ejecutivo",
  doctrinario: "prueba",
};

export default function SeleccionBuild({ onElegir }: { onElegir?: (b: Build) => void }) {
  const game = useGame();
  const [seleccionada, setSeleccionada] = useState<Build | null>(null);
  const [confirmada, setConfirmada] = useState(false);

  // Check if player already has an active build
  const buildActiva = game.flags.find((f) => f.startsWith("build_"))?.replace("build_", "") as Build | undefined;

  function confirmar() {
    if (!seleccionada || buildActiva) return;
    const b = BUILDS[seleccionada];
    (Object.entries(b.modificadores) as [keyof typeof game.personaje.atributos, number][]).forEach(
      ([k, v]) => game.ajustarAtributo(k, v)
    );
    game.setFlag(`build_${seleccionada}`);
    game.pushLog(`Especialización elegida: "${b.nombre}". ${b.ventajaPasiva}`, "BUILD");
    game.desbloquearLogro({
      id: `build_${seleccionada}`,
      titulo: `Especialización: ${b.nombre}`,
      descripcion: b.ventajaPasiva,
      articulo: "—",
      desbloqueado: true,
      fecha: Date.now(),
    });
    fx.success();
    fx.xpGain(50);
    setConfirmada(true);
    setTimeout(() => onElegir?.(seleccionada), 1200);
  }

  // ── CONFIRMACIÓN SCREEN ───────────────────────────────────────────────────
  if (confirmada && seleccionada) {
    const b = BUILDS[seleccionada];
    const zona = BUILD_ZONA[seleccionada] ?? "recursos";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="terminal p-8 text-center space-y-4"
        style={{ borderColor: `var(--zona-${zona})`, boxShadow: `0 0 40px var(--zona-${zona})20` }}
      >
        <div className="text-5xl mb-2">{BUILD_ICONS[seleccionada]}</div>
        <div className="font-mono-terminal text-[9px] uppercase tracking-[.4em]" style={{ color: `var(--zona-${zona})` }}>
          ESPECIALIZACIÓN ACTIVA
        </div>
        <h2 className="font-display-grave text-3xl text-doc-aged">{b.nombre}</h2>
        <p className="font-serif-juridica italic text-doc-aged/70 text-sm max-w-md mx-auto">
          {b.ventajaPasiva}
        </p>
        <div className="font-mono-terminal text-xs text-zona-prueba">+50 XP desbloqueados</div>
      </motion.div>
    );
  }

  // ── ACTIVE BUILD DISPLAY ──────────────────────────────────────────────────
  if (buildActiva && BUILDS[buildActiva]) {
    const b = BUILDS[buildActiva];
    const zona = BUILD_ZONA[buildActiva] ?? "recursos";
    return (
      <div className="space-y-6">
        <div
          className="terminal p-6"
          style={{ borderColor: `var(--zona-${zona})60`, background: `var(--zona-${zona})06` }}
        >
          <div className="flex items-start gap-5">
            <span className="text-5xl">{BUILD_ICONS[buildActiva]}</span>
            <div className="flex-1">
              <div className="font-mono-terminal text-[9px] uppercase tracking-[.35em] mb-1" style={{ color: `var(--zona-${zona})` }}>
                ESPECIALIZACIÓN ACTIVA
              </div>
              <h2 className="font-display-grave text-2xl text-doc-aged mb-2">{b.nombre}</h2>
              <p className="text-doc-aged/60 text-xs font-serif-juridica italic mb-4">{b.descripcion}</p>

              {/* Modificadores */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {Object.entries(b.modificadores).map(([k, v]) => (
                  <span
                    key={k}
                    className="font-mono-terminal text-[8px] px-2 py-0.5 border"
                    style={{
                      borderColor: (v as number) > 0 ? "rgba(88,245,176,.4)" : "rgba(217,74,74,.4)",
                      color: (v as number) > 0 ? "var(--zona-cautelares)" : "var(--zona-nulidad)",
                    }}
                  >
                    {k.split("_")[0]} {(v as number) > 0 ? "+" : ""}{v}
                  </span>
                ))}
              </div>

              {/* Ventaja */}
              <div className="mb-2">
                <div className="text-[8px] font-mono-terminal uppercase tracking-widest text-zona-cautelares mb-0.5">✓ Ventaja pasiva</div>
                <div className="text-xs text-doc-aged/80 font-mono-terminal">{b.ventajaPasiva}</div>
              </div>

              {/* Desventaja */}
              <div className="mb-2">
                <div className="text-[8px] font-mono-terminal uppercase tracking-widest text-zona-nulidad mb-0.5">✗ Desventaja</div>
                <div className="text-xs text-doc-aged/60 font-mono-terminal">{b.desventaja}</div>
              </div>

              {/* Recursos especiales */}
              {b.desbloqueaRecursos && b.desbloqueaRecursos.length > 0 && (
                <div>
                  <div className="text-[8px] font-mono-terminal uppercase tracking-widest text-zona-recursos mb-0.5">⚑ Recursos especiales</div>
                  <ul className="text-[10px] text-doc-aged/60 font-mono-terminal space-y-0.5">
                    {b.desbloqueaRecursos.map((r) => (
                      <li key={r} className="before:content-['›'] before:mr-2 before:text-zona-recursos">{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-doc-aged/30 text-[10px] font-mono-terminal text-center italic">
          La especialización es permanente. Solo puede elegirse una vez por personaje.
        </p>
      </div>
    );
  }

  // ── SELECTION SCREEN ─────────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      <div>
        <div className="font-mono-terminal text-[9px] uppercase tracking-[.35em] text-zona-recursos mb-1">
          ESPECIALIZACIÓN PROCESAL
        </div>
        <h2 className="font-display-grave text-2xl text-doc-aged mb-2">Elige tu clase</h2>
        <p className="text-doc-aged/60 text-xs font-mono-terminal">
          Define tu estilo como litigante. Modifica atributos, desbloquea recursos especiales y altera tu perfil procesal.
          <span className="text-zona-nulidad"> Esta elección es permanente.</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {Object.values(BUILDS).map((b, i) => {
          const zona = BUILD_ZONA[b.id] ?? "recursos";
          const isSelected = seleccionada === b.id;
          return (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => { setSeleccionada(b.id); sfx.click(); }}
              onMouseEnter={() => sfx.hover()}
              className="text-left p-4 border transition-all duration-150 relative overflow-hidden"
              style={{
                borderColor: isSelected ? `var(--zona-${zona})` : `var(--zona-${zona})25`,
                background: isSelected ? `var(--zona-${zona})10` : `var(--zona-${zona})04`,
                boxShadow: isSelected ? `0 0 20px var(--zona-${zona})20` : "none",
              }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div
                  className="absolute top-0 right-0 w-0 h-0"
                  style={{
                    borderTop: `28px solid var(--zona-${zona})`,
                    borderLeft: "28px solid transparent",
                  }}
                />
              )}
              {isSelected && (
                <span className="absolute top-0.5 right-0.5 text-[9px] font-mono-terminal text-bg-deep">✓</span>
              )}

              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{BUILD_ICONS[b.id]}</span>
                <div>
                  <div
                    className="text-[8px] font-mono-terminal uppercase tracking-widest mb-0.5"
                    style={{ color: `var(--zona-${zona})` }}
                  >
                    ESPECIALIZACIÓN
                  </div>
                  <div className="font-display-grave text-base text-doc-aged">{b.nombre}</div>
                </div>
              </div>

              <p className="text-doc-aged/60 text-[10px] font-serif-juridica italic mb-3 leading-relaxed">
                {b.descripcion}
              </p>

              {/* Stat modifiers */}
              <div className="flex flex-wrap gap-1 mb-3">
                {Object.entries(b.modificadores).map(([k, v]) => (
                  <span
                    key={k}
                    className="font-mono-terminal text-[7px] px-1.5 py-0.5 border"
                    style={{
                      borderColor: (v as number) > 0 ? "rgba(88,245,176,.3)" : "rgba(217,74,74,.3)",
                      color: (v as number) > 0 ? "var(--zona-cautelares)" : "var(--zona-nulidad)",
                    }}
                  >
                    {k.replace(/_/g, " ").split(" ")[0]} {(v as number) > 0 ? "+" : ""}{v}
                  </span>
                ))}
              </div>

              {/* Ventaja / desventaja badges */}
              <div className="text-[9px] font-mono-terminal text-zona-cautelares/80 mb-0.5 leading-relaxed line-clamp-2">
                ✓ {b.ventajaPasiva.slice(0, 70)}{b.ventajaPasiva.length > 70 ? "..." : ""}
              </div>
              <div className="text-[9px] font-mono-terminal text-zona-nulidad/60 leading-relaxed line-clamp-1">
                ✗ {b.desventaja.slice(0, 55)}{b.desventaja.length > 55 ? "..." : ""}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {seleccionada && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 items-center"
          >
            <button
              onClick={confirmar}
              className="btn"
              style={{
                borderColor: `var(--zona-${BUILD_ZONA[seleccionada] ?? "recursos"})`,
                color: `var(--zona-${BUILD_ZONA[seleccionada] ?? "recursos"})`,
              }}
            >
              ▸ Confirmar: {BUILDS[seleccionada].nombre}
            </button>
            <button
              onClick={() => { setSeleccionada(null); sfx.click(); }}
              className="text-[9px] font-mono-terminal text-doc-aged/30 hover:text-doc-aged/60"
            >
              cancelar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-doc-aged/25 text-[9px] font-mono-terminal italic">
        ⚠ La especialización es irreversible. Elige con cuidado.
      </p>
    </div>
  );
}
