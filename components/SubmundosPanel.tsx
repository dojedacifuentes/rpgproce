"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SUBMUNDOS } from "@/data/submundos";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

export default function SubmundosPanel() {
  const [seleccionado, setSeleccionado] = useState<string | null>(null);
  const logros = useGame((s) => s.logros);
  const desbloquearLogro = useGame((s) => s.desbloquearLogro);

  const logrosIds = logros.map((l) => l.id);

  const submundosDesbloqueados = SUBMUNDOS.filter((s) =>
    s.logrosRequeridos.every((lr) => logrosIds.includes(lr))
  );

  const submundoActual = seleccionado
    ? SUBMUNDOS.find((s) => s.id === seleccionado)
    : null;

  if (submundoActual) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => {
            setSeleccionado(null);
            sfx.click?.();
          }}
          onMouseEnter={() => sfx.hover?.()}
          className="btn btn-cyan text-sm"
        >
          ← Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal p-8 space-y-6"
        >
          {/* Header */}
          <div>
            <div className="text-5xl mb-4">{submundoActual.icono}</div>
            <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
              {submundoActual.titulo}
            </h2>
            <p className="font-serif-juridica text-doc-aged/70 text-base italic">
              {submundoActual.descripcion}
            </p>
          </div>

          {/* Intro */}
          <div className="border-l-4 border-zona-recursos pl-4">
            <p className="font-serif-juridica text-doc-aged/80 leading-relaxed">
              {submundoActual.narrativa.intro}
            </p>
          </div>

          {/* Contenido principal */}
          <div className="bg-bg-deep/50 p-6 rounded border border-doc-aged/20 space-y-3 max-h-96 overflow-y-auto">
            <div className="font-mono-terminal text-[9px] text-doc-aged/50 uppercase tracking-wider">
              CONTENIDO
            </div>
            <p className="font-serif-juridica text-doc-aged/75 whitespace-pre-wrap text-sm leading-relaxed">
              {submundoActual.narrativa.contenido}
            </p>
          </div>

          {/* Reflexión */}
          <div className="p-4 bg-zona-recursos/5 border border-zona-recursos/30 rounded">
            <div className="font-mono-terminal text-[9px] text-zona-recursos/70 uppercase tracking-wider mb-2">
              Reflexión
            </div>
            <p className="font-serif-juridica italic text-doc-aged/70 text-sm">
              "{submundoActual.narrativa.reflexion}"
            </p>
          </div>

          {/* Recompensa */}
          {submundoActual.recompensa && (
            <div className="p-4 bg-zona-cautelares/5 border border-zona-cautelares/30 rounded">
              <div className="font-mono-terminal text-[9px] text-zona-cautelares/70 uppercase tracking-wider mb-2">
                Recompensas
              </div>
              <div className="space-y-1 text-sm font-mono-terminal">
                {submundoActual.recompensa.conocimiento && (
                  <div>
                    +{submundoActual.recompensa.conocimiento} Conocimiento
                    Procesal
                  </div>
                )}
                {submundoActual.recompensa.reputacion && (
                  <div>
                    {submundoActual.recompensa.reputacion > 0 ? "+" : ""}
                    {submundoActual.recompensa.reputacion} Reputación
                  </div>
                )}
                {submundoActual.recompensa.trauma && (
                  <div>+{submundoActual.recompensa.trauma} Trauma</div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="terminal p-6 space-y-3">
        <div>
          <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-1">
            CONTENIDO SECRETO
          </div>
          <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
            Submundos Ocultos
          </h2>
          <p className="font-serif-juridica text-doc-aged/70">
            Contenido desbloqueado al cumplir logros. Historias del sistema que
            pocas voces cuentan.
          </p>
        </div>

        <div className="mt-4 text-[9px] font-mono-terminal text-doc-aged/50">
          DESBLOQUEADOS: {submundosDesbloqueados.length} / {SUBMUNDOS.length}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {submundosDesbloqueados.length > 0 ? (
            submundosDesbloqueados.map((s) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => {
                  setSeleccionado(s.id);
                  sfx.confirm?.();
                }}
                onMouseEnter={() => sfx.hover?.()}
                className="zona-card p-6 text-left w-full"
                style={
                  { "--zona-color": "var(--zona-nulidad)" } as React.CSSProperties
                }
              >
                <div className="flex gap-4">
                  <div className="text-4xl">{s.icono}</div>
                  <div className="flex-grow">
                    <h3 className="font-display-grave text-lg text-doc-aged mb-1">
                      {s.titulo}
                    </h3>
                    <p className="text-doc-aged/70 text-sm font-serif-juridica italic">
                      {s.descripcion}
                    </p>
                  </div>
                  <div className="text-zona-nulidad">→</div>
                </div>
              </motion.button>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="terminal p-6 text-center text-doc-aged/50 font-mono-terminal"
            >
              No hay submundos desbloqueados aún. Completa logros para revelar
              contenido secreto.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submundos bloqueados */}
        {SUBMUNDOS.filter(
          (s) => !submundosDesbloqueados.includes(s)
        ).map((s) => (
          <div
            key={s.id}
            className="zona-card p-6 text-left opacity-40"
            style={
              { "--zona-color": "var(--zona-nulidad)" } as React.CSSProperties
            }
          >
            <div className="flex gap-4">
              <div className="text-4xl">🔒</div>
              <div className="flex-grow">
                <h3 className="font-display-grave text-lg text-doc-aged/70 mb-1">
                  {s.titulo}
                </h3>
                <p className="text-doc-aged/50 text-xs font-mono-terminal">
                  Requiere:{" "}
                  {s.logrosRequeridos.map((l) => l.replace("caso_", "")).join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
