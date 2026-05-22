"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CasoInvestigativo, Pista } from "@/data/casos-investigativos";
import {
  calcularRelevancia,
  getPistasConectadas,
  descubrirPistaAleatoria,
} from "@/lib/investigacion";
import PistaCard from "./PistaCard";
import { sfx } from "@/lib/audio";

interface TableroDeduccionProps {
  caso: CasoInvestigativo;
  pistasDescubiertas: Set<string>;
  hipótesisActual?: number; // índice de hipótesis actual (para colorear por relevancia)
  onExpandirPista: (pistaId: string) => void;
  onDescubrirPista: (pista: Pista) => void;
  expandedPista?: string | null; // ID de pista expandida
  onCloseExpanded: () => void;
}

export default function TableroDeduccion({
  caso,
  pistasDescubiertas,
  hipótesisActual,
  onExpandirPista,
  onDescubrirPista,
  expandedPista,
  onCloseExpanded,
}: TableroDeduccionProps) {
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(new Set());

  const pistaDescubiertaObj = expandedPista
    ? caso.pistas.find((p) => p.id === expandedPista)
    : null;

  // Pistas descubiertas (completo)
  const pistasList = caso.pistas.filter((p) => pistasDescubiertas.has(p.id));

  // Pistas ocultas aún disponibles
  const pistasOcultas = caso.pistas.filter(
    (p) => !pistasDescubiertas.has(p.id) && p.descubierta === false
  );

  const handleExplorar = () => {
    const nuevaPista = descubrirPistaAleatoria(caso, pistasDescubiertas);
    if (nuevaPista) {
      sfx.oralCorrecta?.();
      onDescubrirPista(nuevaPista);
    }
  };

  const handleToggleSeleccion = (pistaId: string) => {
    const nueva = new Set(seleccionadas);
    if (nueva.has(pistaId)) {
      nueva.delete(pistaId);
    } else {
      nueva.add(pistaId);
    }
    setSeleccionadas(nueva);
  };

  return (
    <div className="space-y-6">
      {/* Header y Controles */}
      <div className="terminal p-4 space-y-3">
        <div>
          <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-1">
            TABLERO DE DEDUCCIÓN
          </div>
          <p className="font-serif-juridica text-sm text-doc-aged/70 italic">
            Examina las pistas descubiertas. Selecciona las relevantes para tu hipótesis.
            Intenta explorar para revelar pistas ocultas.
          </p>
        </div>

        {/* Stat: Pistas */}
        <div className="flex gap-4 text-[9px] font-mono-terminal text-doc-aged/50">
          <span>
            DESCUBIERTAS: <span className="text-zona-cautelares">{pistasList.length}</span> / {caso.pistas.length}
          </span>
          <span>
            SELECCIONADAS: <span className="text-zona-recursos">{seleccionadas.size}</span>
          </span>
          <span>
            OCULTAS: <span className="text-zona-nulidad">{pistasOcultas.length}</span>
          </span>
        </div>

        {/* Botón Explorar */}
        <button
          onClick={handleExplorar}
          onMouseEnter={() => sfx.hover?.()}
          className="btn btn-nulidad text-xs w-full"
          disabled={pistasOcultas.length === 0}
        >
          {pistasOcultas.length > 0
            ? `🔍 Explorar Expediente (${pistasOcultas.length} pistas ocultas)`
            : "✓ Todas las pistas han sido descubiertas"}
        </button>
      </div>

      {/* Grid de Pistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {pistasList.map((pista) => {
            const conectada =
              hipótesisActual !== undefined
                ? caso.hipótesis[hipótesisActual].pistas_requieren.includes(
                    pista.id
                  )
                : false;

            const relevancia =
              hipótesisActual !== undefined
                ? calcularRelevancia(pista, hipótesisActual, caso)
                : 0;

            return (
              <motion.div key={pista.id} layout>
                <PistaCard
                  pista={pista}
                  descubierta={true}
                  clickeable={true}
                  conectada={conectada}
                  relevancia={relevancia}
                  onClick={() => handleToggleSeleccion(pista.id)}
                  onExpandir={() => onExpandirPista(pista.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Pistas ocultas (cerradas) */}
        {pistasOcultas.slice(0, 3).map((pista) => (
          <motion.div key={`oculta-${pista.id}`} layout>
            <PistaCard
              pista={pista}
              descubierta={false}
              clickeable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal Expandir Pista */}
      <AnimatePresence>
        {expandedPista && pistaDescubiertaObj && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={onCloseExpanded}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              className="bg-terminal-darker border-2 border-neon-cyan/60 rounded max-w-2xl w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-terminal-darker border-b border-neon-cyan/40 p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex gap-3">
                    <span className="text-4xl">
                      {
                        {
                          documento: "📄",
                          testimonio: "🗣️",
                          articulo: "⚖️",
                          fechas: "📅",
                          dialogo: "💬",
                        }[pistaDescubiertaObj.tipo]
                      }
                    </span>
                    <div>
                      <h2 className="font-display-grave text-2xl text-neon-cyan">
                        {pistaDescubiertaObj.titulo}
                      </h2>
                      <p className="text-xs text-parchment/50 font-mono-terminal uppercase tracking-wider">
                        {pistaDescubiertaObj.tipo}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onCloseExpanded}
                    className="text-parchment/50 hover:text-parchment/80 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Contenido completo */}
              <div className="p-6 space-y-4">
                <div className="border-l-4 border-neon-cyan/50 pl-4">
                  <p className="font-serif-juridica text-doc-aged/90 text-base leading-relaxed">
                    {pistaDescubiertaObj.contenido}
                  </p>
                </div>

                {/* Artículos */}
                <div>
                  <div className="text-xs font-mono-terminal text-neon-cyan/70 uppercase tracking-widest mb-2">
                    Artículos Citados
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pistaDescubiertaObj.articulos.map((art) => (
                      <span
                        key={art}
                        className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono-terminal rounded"
                      >
                        {art}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Conexiones */}
                {pistaDescubiertaObj.conectadoA &&
                  pistaDescubiertaObj.conectadoA.length > 0 && (
                    <div>
                      <div className="text-xs font-mono-terminal text-neon-purple/70 uppercase tracking-widest mb-2">
                        Conectada a
                      </div>
                      <div className="space-y-1">
                        {getPistasConectadas(caso, pistaDescubiertaObj.id).map(
                          (p) => (
                            <div
                              key={p.id}
                              className="text-xs text-parchment/70 flex gap-2"
                            >
                              <span className="text-neon-purple">→</span>
                              <span>{p.titulo}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Revelación */}
                <div className="p-3 bg-neon-cyan/5 border border-neon-cyan/30 rounded">
                  <div className="text-[9px] font-mono-terminal text-neon-cyan/70 uppercase tracking-widest mb-1">
                    Revela
                  </div>
                  <p className="text-xs text-parchment/80 italic">
                    {pistaDescubiertaObj.revelaSobre}
                  </p>
                </div>

                {/* Botón Cerrar */}
                <button
                  onClick={onCloseExpanded}
                  onMouseEnter={() => sfx.hover?.()}
                  className="btn btn-cyan w-full"
                >
                  Volver al Tablero
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
