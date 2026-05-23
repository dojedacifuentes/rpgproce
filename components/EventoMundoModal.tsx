"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventoMundo } from "@/data/eventos-mundo";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

interface EventoMundoModalProps {
  evento: EventoMundo;
  onCerrar: () => void;
}

export default function EventoMundoModal({ evento, onCerrar }: EventoMundoModalProps) {
  const game = useGame();
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [aplicado, setAplicado] = useState(false);

  const TIPO_COLOR: Record<string, string> = {
    encuentro_npc: "neon-cyan",
    noticia_jurisprudencia: "neon-blue",
    peligro_nulidad: "neon-red",
    oportunidad_caso: "zona-cautelares",
    cambio_clima_juridico: "zona-recursos",
    conflicto_con_adversario: "neon-red",
    descubrimiento_doctrinal: "zona-prueba",
    crisis_economia: "zona-ejecutivo",
  };

  const TIPO_ICONO: Record<string, string> = {
    encuentro_npc: "👤",
    noticia_jurisprudencia: "📜",
    peligro_nulidad: "⚠️",
    oportunidad_caso: "💼",
    cambio_clima_juridico: "🌪️",
    conflicto_con_adversario: "⚔️",
    descubrimiento_doctrinal: "💡",
    crisis_economia: "📉",
  };

  const colorClass = TIPO_COLOR[evento.tipo] || "neon-cyan";
  const icono = TIPO_ICONO[evento.tipo] || "📋";

  const aplicarEfectosBaseYOpcion = (opcionIdx?: number) => {
    // Aplicar efectos base del evento
    if (evento.efectos.reputacion) {
      game.ajustarReputacion(evento.efectos.reputacion);
    }
    if (evento.efectos.trauma) {
      game.ajustarTrauma(evento.efectos.trauma);
    }
    if (evento.efectos.nivelEconomico) {
      game.setPersonaje({
        ...game.personaje,
        nivelEconomico: Math.max(0, Math.min(100, game.personaje.nivelEconomico + evento.efectos.nivelEconomico)),
      });
    }
    if (evento.efectos.cicloProcesal) {
      game.setPersonaje({
        ...game.personaje,
        cicloProcesal: Math.max(1, game.personaje.cicloProcesal + evento.efectos.cicloProcesal),
      });
    }

    // Aplicar efectos extras de la opción
    if (opcionIdx !== undefined && evento.opciones && evento.opciones[opcionIdx]) {
      const opcion = evento.opciones[opcionIdx];
      if (opcion.efectoExtra?.reputacion) {
        game.ajustarReputacion(opcion.efectoExtra.reputacion);
      }
      if (opcion.efectoExtra?.trauma) {
        game.ajustarTrauma(opcion.efectoExtra.trauma);
      }
      if (opcion.efectoExtra?.nivelEconomico) {
        game.setPersonaje({
          ...game.personaje,
          nivelEconomico: Math.max(0, Math.min(100, game.personaje.nivelEconomico + opcion.efectoExtra.nivelEconomico)),
        });
      }
    }

    // Log evento
    game.pushLog(`📌 EVENTO: ${evento.titulo}`);
    game.pushLog(evento.descripcion);
    if (evento.efectos.reputacion) game.pushLog(`${evento.efectos.reputacion > 0 ? '+' : ''}${evento.efectos.reputacion} Reputación`);
    if (evento.efectos.trauma) game.pushLog(`${evento.efectos.trauma > 0 ? '+' : ''}${evento.efectos.trauma} Trauma`);

    sfx.warning?.();
    setAplicado(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          transition={{ type: "spring", damping: 20 }}
          className={`bg-terminal-dark border-2 rounded max-w-2xl w-full shadow-2xl border-${colorClass}/60`}
        >
          {/* Encabezado */}
          <div className={`bg-bg-deep border-b border-${colorClass}/40 p-4`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-4xl">{icono}</span>
                <div>
                  <h2 className={`font-display-grave text-xl text-${colorClass}`}>{evento.titulo}</h2>
                  <p className="text-xs text-doc-aged/60 font-mono-terminal mt-1">{evento.tipo.replace(/_/g, " ").toUpperCase()}</p>
                  <p className="text-xs text-doc-aged/50 font-mono-terminal">Zona: {evento.zona}</p>
                </div>
              </div>
              <button
                onClick={onCerrar}
                className="text-zona-nulidad text-xl font-bold hover:scale-125 transition-transform flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Descripción */}
          <div className={`p-5 border-b border-${colorClass}/20 bg-bg-deep/50`}>
            <p className="text-doc-aged/80 font-serif-juridica text-sm leading-relaxed">{evento.descripcion}</p>
          </div>

          {/* Efectos */}
          <div className={`p-4 border-b border-${colorClass}/20`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono-terminal">
              {evento.efectos.reputacion !== undefined && (
                <div className={`bg-${colorClass}/10 border border-${colorClass}/40 p-2 rounded text-${colorClass}`}>
                  REP: {evento.efectos.reputacion > 0 ? '+' : ''}{evento.efectos.reputacion}
                </div>
              )}
              {evento.efectos.trauma !== undefined && (
                <div className="bg-neon-red/10 border border-neon-red/40 p-2 rounded text-zona-nulidad">
                  TRM: {evento.efectos.trauma > 0 ? '+' : ''}{evento.efectos.trauma}
                </div>
              )}
              {evento.efectos.nivelEconomico !== undefined && (
                <div className="bg-zona-cautelares/10 border border-zona-cautelares/40 p-2 rounded text-zona-cautelares">
                  ECO: {evento.efectos.nivelEconomico > 0 ? '+' : ''}{evento.efectos.nivelEconomico}
                </div>
              )}
              {evento.efectos.cicloProcesal !== undefined && (
                <div className="bg-zona-recursos/10 border border-zona-recursos/40 p-2 rounded text-zona-recursos">
                  CIC: {evento.efectos.cicloProcesal > 0 ? '+' : ''}{evento.efectos.cicloProcesal}
                </div>
              )}
            </div>
          </div>

          {/* Opciones o confirmación */}
          {!aplicado ? (
            <>
              {evento.opciones && evento.opciones.length > 0 ? (
                <div className="p-4 space-y-2">
                  <p className="text-xs text-doc-aged/70 font-mono-terminal mb-3 uppercase tracking-wide">Elige tu acción:</p>
                  {evento.opciones.map((opcion, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => {
                        setOpcionSeleccionada(idx);
                        aplicarEfectosBaseYOpcion(idx);
                      }}
                      className={`w-full text-left p-3 border rounded transition-all ${
                        opcionSeleccionada === idx
                          ? `bg-${colorClass}/20 border-${colorClass} text-${colorClass}`
                          : `bg-bg-deep border-doc-aged/20 text-doc-aged/80 hover:border-${colorClass}/50`
                      } text-sm`}
                    >
                      {opcionSeleccionada === idx && <span className="mr-2">✓</span>}
                      {opcion.texto}
                      {opcion.efectoExtra && (
                        <span className="ml-2 text-xs text-doc-aged/50">
                          {opcion.efectoExtra.reputacion && `(+${opcion.efectoExtra.reputacion}Rep)`}
                          {opcion.efectoExtra.trauma && `(+${opcion.efectoExtra.trauma}Trm)`}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => aplicarEfectosBaseYOpcion()}
                    className={`w-full btn bg-${colorClass} text-bg-deep font-bold`}
                  >
                    Aceptar evento
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zona-cautelares/10 border border-zona-cautelares/50 p-3 rounded text-center text-zona-cautelares text-sm font-mono-terminal"
              >
                ✓ Evento procesado
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onCerrar}
                className="w-full btn mt-3"
              >
                Continuar
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
