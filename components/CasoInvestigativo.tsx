"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CasoInvestigativo as CasoType } from "@/data/casos-investigativos";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";
import {
  getPistasIniciales,
  validarRespuesta,
  calcularScore,
  determinarConsecuencias,
  generarNarrativaResultado,
} from "@/lib/investigacion";
import TableroDeduccion from "./TableroDeduccion";
import HipotesisSelector from "./HipotesisSelector";
import { TimelineCaso } from "./TimelineProcesal";

type EstadoCaso = "intro" | "explorando" | "deduccion" | "verificacion" | "resultado";
type VistaExploracion = "tablero" | "timeline";

interface CasoInvestigativoProps {
  caso: CasoType;
  onVolver?: () => void;
  onResuelto?: (resultado: boolean) => void;
}

export default function CasoInvestigativo({
  caso,
  onVolver,
  onResuelto,
}: CasoInvestigativoProps) {
  // Estado principal
  const [estado, setEstado] = useState<EstadoCaso>("intro");
  const [vistaExploracion, setVistaExploracion] = useState<VistaExploracion>("tablero");
  const [inicioTiempo] = useState(Date.now());
  const [pistasDescubiertas, setPistasDescubiertas] = useState<Set<string>>(
    new Set(getPistasIniciales(caso).map((p) => p.id))
  );
  const [hipótesisSeleccionada, setHipótesisSeleccionada] = useState<
    number | null
  >(null);
  const [expandedPista, setExpandedPista] = useState<string | null>(null);

  // Game state
  const pushLog = useGame((s) => s.pushLog);
  const desbloquearLogro = useGame((s) => s.desbloquearLogro);
  const gainXp = useGame((s) => s.gainXp);
  const gainMonedas = useGame((s) => s.gainMonedas);
  const ajustarReputacion = useGame((s) => s.ajustarReputacion);
  const ajustarTrauma = useGame((s) => s.ajustarTrauma);

  // Handlers
  const handleDescubrirPista = (newPista: any) => {
    setPistasDescubiertas((prev) => new Set([...prev, newPista.id]));
    pushLog(`Pista descubierta: ${newPista.titulo}`, "INFO");
  };

  const handleSeleccionarHipótesis = (hipId: number) => {
    setHipótesisSeleccionada(hipId);
    setEstado("verificacion");
    sfx.confirm?.();
  };

  const handleVerificar = () => {
    const validacion = validarRespuesta(hipótesisSeleccionada!, caso);
    const consecuencias = determinarConsecuencias(validacion.esCorrecta, caso);

    if (validacion.esCorrecta) {
      sfx.oralCorrecta?.();
      pushLog(`Caso resuelto correctamente: ${caso.titulo}`, "SKILL");
      desbloquearLogro({
        id: `caso_${caso.id}`,
        nombre: `${caso.titulo}`,
        descripcion: `Resolviste el caso investigativo: ${caso.titulo}`,
        icono: "🔍",
      });
      // Recompensas: XP + monedas según dificultad
      gainXp(caso.dificultad * 20);
      gainMonedas(caso.dificultad * 10);
      ajustarReputacion(consecuencias.reputacion);
    } else {
      sfx.warning?.();
      pushLog(`Hipótesis incorrecta seleccionada en: ${caso.titulo}`, "WARN");
      ajustarTrauma(consecuencias.trauma);
      ajustarReputacion(consecuencias.reputacion);
      // Aun aprende algo
      gainXp(5);
    }

    setEstado("resultado");
  };

  const tiempoSegundos = (Date.now() - inicioTiempo) / 1000;
  const tiempoMinutos = Math.round(tiempoSegundos / 60);
  const esCorrecta =
    hipótesisSeleccionada !== null &&
    caso.hipótesis[hipótesisSeleccionada].es_correcta;

  const score = calcularScore(
    esCorrecta,
    pistasDescubiertas,
    caso,
    tiempoSegundos
  );

  // Render por estado
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {/* INTRO */}
        {estado === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header del caso */}
            <div className="terminal p-6 space-y-3">
              <div>
                <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-1">
                  CASO INVESTIGATIVO
                </div>
                <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
                  {caso.titulo}
                </h2>
              </div>

              <p className="font-serif-juridica text-doc-aged/80 text-base leading-relaxed">
                {caso.descripcion}
              </p>

              {/* Stats caso */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-[9px] font-mono-terminal">
                <div className="terminal p-2 text-center">
                  <div className="text-neon-cyan">{caso.dificultad}/3</div>
                  <div className="text-parchment/50">Dificultad</div>
                </div>
                <div className="terminal p-2 text-center">
                  <div className="text-neon-yellow">{caso.pistas.length}</div>
                  <div className="text-parchment/50">Pistas</div>
                </div>
                <div className="terminal p-2 text-center">
                  <div className="text-neon-purple">
                    {caso.hipótesis.length}
                  </div>
                  <div className="text-parchment/50">Hipótesis</div>
                </div>
              </div>
            </div>

            {/* Problema central */}
            <div className="terminal p-6 space-y-3 border-l-4 border-neon-red">
              <div className="text-xs font-mono-terminal text-neon-red uppercase tracking-widest">
                ⚠ PROBLEMA CENTRAL
              </div>
              <div>
                <p className="font-display-grave text-lg text-neon-red mb-2">
                  {caso.problema.titulo}
                </p>
                <p className="font-serif-juridica text-doc-aged/80 text-sm leading-relaxed">
                  {caso.problema.descripcion}
                </p>
              </div>
              <div className="text-[9px] font-mono-terminal text-parchment/50">
                Artículos involucrados: {caso.problema.articulosInvolucrados.join(" • ")}
              </div>
            </div>

            {/* Botón continuar */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                sfx.confirm?.();
                setEstado("explorando");
                pushLog(`Iniciaste investigación: ${caso.titulo}`, "INFO");
              }}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-cyan w-full py-3 font-bold text-base"
            >
              ▶ INICIAR INVESTIGACIÓN
            </motion.button>
          </motion.div>
        )}

        {/* EXPLORANDO / TABLERO + TIMELINE */}
        {estado === "explorando" && (
          <motion.div
            key="explorando"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Toggle vista */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setVistaExploracion("tablero")}
                onMouseEnter={() => sfx.hover?.()}
                className={`flex-1 py-2 text-[10px] font-mono-terminal uppercase tracking-wider border transition-all ${
                  vistaExploracion === "tablero"
                    ? "border-zona-competencia text-zona-competencia bg-zona-competencia/10"
                    : "border-doc-aged/20 text-doc-aged/40 hover:border-doc-aged/40"
                }`}
              >
                🗂 Tablero de Evidencia
              </button>
              <button
                onClick={() => setVistaExploracion("timeline")}
                onMouseEnter={() => sfx.hover?.()}
                className={`flex-1 py-2 text-[10px] font-mono-terminal uppercase tracking-wider border transition-all ${
                  vistaExploracion === "timeline"
                    ? "border-zona-prueba text-zona-prueba bg-zona-prueba/10"
                    : "border-doc-aged/20 text-doc-aged/40 hover:border-doc-aged/40"
                }`}
              >
                📅 Timeline Procesal
              </button>
            </div>

            {vistaExploracion === "tablero" ? (
              <TableroDeduccion
                caso={caso}
                pistasDescubiertas={pistasDescubiertas}
                hipótesisActual={undefined}
                onExpandirPista={setExpandedPista}
                onDescubrirPista={handleDescubrirPista}
                expandedPista={expandedPista}
                onCloseExpanded={() => setExpandedPista(null)}
              />
            ) : (
              <div className="terminal p-4">
                <TimelineCaso
                  caso={caso}
                  pistasDescubiertas={pistasDescubiertas}
                  onDescubrirPista={handleDescubrirPista}
                />
              </div>
            )}

            {/* Botón siguiente fase */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                sfx.confirm?.();
                setEstado("deduccion");
              }}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-purple w-full py-3 mt-4"
            >
              → FORMULAR HIPÓTESIS
            </motion.button>
          </motion.div>
        )}

        {/* DEDUCCIÓN / HIPÓTESIS */}
        {estado === "deduccion" && (
          <motion.div
            key="deduccion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <HipotesisSelector
              caso={caso}
              pistasDescubiertas={pistasDescubiertas}
              onSeleccionar={handleSeleccionarHipótesis}
              disabled={false}
            />
          </motion.div>
        )}

        {/* VERIFICACIÓN */}
        {estado === "verificacion" && hipótesisSeleccionada !== null && (
          <motion.div
            key="verificacion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="terminal p-6 space-y-4">
              <div>
                <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-1">
                  HIPÓTESIS SELECCIONADA
                </div>
                <p className="font-display-grave text-2xl text-parchment/90 mb-3">
                  {caso.hipótesis[hipótesisSeleccionada].titulo}
                </p>
              </div>

              <div className="border-l-2 border-neon-cyan/50 pl-4 space-y-2">
                <p className="font-serif-juridica text-doc-aged/80 text-base leading-relaxed">
                  {caso.hipótesis[hipótesisSeleccionada].explicacion}
                </p>
              </div>

              {/* Solución oficial */}
              <div className="p-4 bg-neon-cyan/5 border border-neon-cyan/30 rounded space-y-2">
                <div className="text-xs font-mono-terminal text-neon-cyan uppercase tracking-widest">
                  🎯 Solución Oficial
                </div>
                <p className="font-serif-juridica text-doc-aged/80 text-sm">
                  {caso.solucion.explicacion}
                </p>
                <div className="text-[9px] text-parchment/60 mt-2">
                  <span className="text-neon-purple font-mono-terminal">
                    {caso.solucion.articuloClave}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleVerificar}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-cautelares w-full py-3 font-bold text-base"
            >
              ✓ VERIFICAR HIPÓTESIS
            </motion.button>
          </motion.div>
        )}

        {/* RESULTADO */}
        {estado === "resultado" && hipótesisSeleccionada !== null && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            {/* Narrativa */}
            <div
              className={`terminal p-6 border-l-4 space-y-3 ${
                esCorrecta
                  ? "border-neon-green"
                  : "border-neon-red"
              }`}
            >
              <div className="text-[9px] font-mono-terminal uppercase tracking-widest" style={{
                color: esCorrecta ? "var(--neon-green)" : "var(--neon-red)",
              }}>
                {esCorrecta ? "✓ CORRECTO" : "✗ INCORRECTO"}
              </div>
              <p className="font-serif-juridica text-doc-aged/80 text-base leading-relaxed italic">
                {generarNarrativaResultado(esCorrecta, caso)}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              <div className="terminal p-3 text-center">
                <div className="text-xl font-display-grave text-zona-competencia">
                  {score}
                </div>
                <div className="text-[9px] text-doc-aged/50 font-mono-terminal">
                  Score
                </div>
              </div>
              <div className="terminal p-3 text-center">
                <div className="text-xl font-display-grave text-zona-cautelares">
                  +{esCorrecta ? caso.dificultad * 20 : 5}
                </div>
                <div className="text-[9px] text-doc-aged/50 font-mono-terminal">
                  XP
                </div>
              </div>
              <div className="terminal p-3 text-center">
                <div className="text-xl font-display-grave text-zona-prueba">
                  {tiempoMinutos}m
                </div>
                <div className="text-[9px] text-doc-aged/50 font-mono-terminal">
                  Tiempo
                </div>
              </div>
              <div className="terminal p-3 text-center">
                <div className="text-xl font-display-grave text-zona-recursos">
                  {pistasDescubiertas.size}/{caso.pistas.length}
                </div>
                <div className="text-[9px] text-doc-aged/50 font-mono-terminal">
                  Pistas
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              {onVolver && (
                <button
                  onClick={() => {
                    onVolver();
                    onResuelto?.(esCorrecta);
                  }}
                  onMouseEnter={() => sfx.hover?.()}
                  className="flex-1 btn btn-purple"
                >
                  ← Volver
                </button>
              )}
              <button
                onClick={() => {
                  // Reiniciar caso
                  setEstado("intro");
                  setPistasDescubiertas(
                    new Set(getPistasIniciales(caso).map((p) => p.id))
                  );
                  setHipótesisSeleccionada(null);
                  setExpandedPista(null);
                  sfx.confirm?.();
                }}
                onMouseEnter={() => sfx.hover?.()}
                className="flex-1 btn btn-cyan"
              >
                ↻ Reintentar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
