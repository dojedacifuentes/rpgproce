"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CasoInvestigativo as CasoType } from "@/data/casos-investigativos";
import { sfx } from "@/lib/audio";
import { fx } from "@/lib/fx";
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

// ============================================================================
// CASO INVESTIGATIVO — v3 visual system
// Container principal para el flujo investigativo de 5 fases.
// ============================================================================

type EstadoCaso = "intro" | "explorando" | "deduccion" | "verificacion" | "resultado";
type VistaExploracion = "tablero" | "timeline";

interface CasoInvestigativoProps {
  caso: CasoType;
  onVolver?: () => void;
  onResuelto?: (resultado: boolean) => void;
}

// Zona mapping per case zone
const ZONA_COLOR: Record<string, string> = {
  notificaciones: "var(--zona-notificaciones, #7AD4E6)",
  recursos:       "var(--zona-recursos)",
  cautelares:     "var(--zona-cautelares)",
  prueba:         "var(--zona-prueba)",
  ejecutivo:      "var(--zona-ejecutivo)",
  competencia:    "var(--zona-competencia)",
  nulidad:        "var(--zona-nulidad)",
  cosajuzgada:    "var(--zona-cosajuzgada)",
};

const DIFICULTAD_LABEL: Record<number, string> = {
  1: "INICIADO",
  2: "AVANZADO",
  3: "EXPERTO",
};

export default function CasoInvestigativo({
  caso,
  onVolver,
  onResuelto,
}: CasoInvestigativoProps) {
  const [estado, setEstado] = useState<EstadoCaso>("intro");
  const [vistaExploracion, setVistaExploracion] = useState<VistaExploracion>("tablero");
  const [inicioTiempo] = useState(Date.now());
  const [pistasDescubiertas, setPistasDescubiertas] = useState<Set<string>>(
    new Set(getPistasIniciales(caso).map((p) => p.id))
  );
  const [hipótesisSeleccionada, setHipótesisSeleccionada] = useState<number | null>(null);
  const [expandedPista, setExpandedPista] = useState<string | null>(null);

  const game = useGame();
  const zonaColor = ZONA_COLOR[caso.zona] ?? "var(--zona-recursos)";

  const handleDescubrirPista = (newPista: { id: string; titulo: string }) => {
    setPistasDescubiertas((prev) => new Set([...prev, newPista.id]));
    game.pushLog(`Pista descubierta: ${newPista.titulo}`, "INFO");
  };

  const handleSeleccionarHipótesis = (hipId: number) => {
    setHipótesisSeleccionada(hipId);
    setEstado("verificacion");
    sfx.click();
  };

  const handleVerificar = () => {
    const validacion = validarRespuesta(hipótesisSeleccionada!, caso);
    const consecuencias = determinarConsecuencias(validacion.esCorrecta, caso);

    if (validacion.esCorrecta) {
      const xp = caso.dificultad * 20;
      const monedas = caso.dificultad * 10;
      fx.success();
      fx.xpGain(xp);
      fx.coinGain(monedas);
      game.gainXp(xp);
      game.gainMonedas(monedas);
      game.ajustarReputacion(consecuencias.reputacion);
      game.pushLog(`Caso resuelto: "${caso.titulo}" (+${xp} XP, +${monedas}🪙)`, "SKILL");
      game.desbloquearLogro({
        id: `caso_${caso.id}`,
        titulo: caso.titulo,
        descripcion: `Investigación resuelta: ${caso.titulo}`,
        articulo: caso.solucion.articuloClave,
        desbloqueado: true,
        fecha: Date.now(),
      });
    } else {
      fx.danger();
      game.pushLog(`Hipótesis incorrecta: "${caso.titulo}"`, "WARN");
      game.ajustarTrauma(consecuencias.trauma);
      game.ajustarReputacion(consecuencias.reputacion);
      game.gainXp(5); // aprende algo igual
    }

    setEstado("resultado");
  };

  const tiempoSegundos = (Date.now() - inicioTiempo) / 1000;
  const tiempoMinutos = Math.round(tiempoSegundos / 60);
  const esCorrecta =
    hipótesisSeleccionada !== null &&
    caso.hipótesis[hipótesisSeleccionada].es_correcta;
  const score = calcularScore(esCorrecta, pistasDescubiertas, caso, tiempoSegundos);

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {estado === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            {/* Case header */}
            <div
              className="terminal p-6 space-y-3"
              style={{ borderColor: `${zonaColor}50` }}
            >
              <div>
                <div
                  className="font-mono-terminal text-[9px] uppercase tracking-[.35em] mb-1"
                  style={{ color: zonaColor }}
                >
                  CASO INVESTIGATIVO · {caso.zona.toUpperCase()}
                </div>
                <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
                  {caso.titulo}
                </h2>
              </div>
              <p className="font-serif-juridica text-doc-aged/80 text-base leading-relaxed">
                {caso.descripcion}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-[9px] font-mono-terminal">
                <div className="terminal p-2 text-center" style={{ borderColor: `${zonaColor}25` }}>
                  <div style={{ color: zonaColor }}>{DIFICULTAD_LABEL[caso.dificultad]}</div>
                  <div className="text-doc-aged/40">Dificultad</div>
                </div>
                <div className="terminal p-2 text-center" style={{ borderColor: `${zonaColor}25` }}>
                  <div className="text-zona-prueba">{caso.pistas.length}</div>
                  <div className="text-doc-aged/40">Pistas</div>
                </div>
                <div className="terminal p-2 text-center" style={{ borderColor: `${zonaColor}25` }}>
                  <div className="text-zona-recursos">{caso.hipótesis.length}</div>
                  <div className="text-doc-aged/40">Hipótesis</div>
                </div>
              </div>
            </div>

            {/* Central problem */}
            <div
              className="terminal p-5 space-y-3 border-l-4"
              style={{ borderLeftColor: "var(--zona-nulidad)" }}
            >
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-nulidad">
                ⚠ PROBLEMA CENTRAL
              </div>
              <p className="font-display-grave text-xl text-zona-nulidad">{caso.problema.titulo}</p>
              <p className="font-serif-juridica text-doc-aged/80 text-sm leading-relaxed">
                {caso.problema.descripcion}
              </p>
              <div className="text-[9px] font-mono-terminal text-doc-aged/40">
                Arts: {caso.problema.articulosInvolucrados.join(" · ")}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => {
                sfx.click();
                setEstado("explorando");
                game.pushLog(`Investigación iniciada: ${caso.titulo}`, "INFO");
              }}
              onMouseEnter={() => sfx.hover()}
              className="btn btn-cyan w-full py-3 font-mono-terminal text-sm"
            >
              ▶ INICIAR INVESTIGACIÓN
            </motion.button>
          </motion.div>
        )}

        {/* ── EXPLORANDO ────────────────────────────────────────────────── */}
        {estado === "explorando" && (
          <motion.div
            key="explorando"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            {/* Toggle vista */}
            <div className="flex gap-2 mb-4">
              {(["tablero", "timeline"] as VistaExploracion[]).map((v) => {
                const isActive = vistaExploracion === v;
                const color = v === "tablero" ? "var(--zona-competencia)" : "var(--zona-prueba)";
                const label = v === "tablero" ? "🗂 Tablero de evidencia" : "📅 Timeline procesal";
                return (
                  <button
                    key={v}
                    onClick={() => setVistaExploracion(v)}
                    onMouseEnter={() => sfx.hover()}
                    className="flex-1 py-2 text-[10px] font-mono-terminal uppercase tracking-wider border transition-all"
                    style={{
                      borderColor: isActive ? color : "rgba(255,255,255,.1)",
                      color: isActive ? color : "rgba(255,255,255,.3)",
                      background: isActive ? `${color}0d` : "transparent",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
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

            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => { sfx.click(); setEstado("deduccion"); }}
              onMouseEnter={() => sfx.hover()}
              className="btn btn-recurso w-full py-3 mt-4 font-mono-terminal text-sm"
            >
              → FORMULAR HIPÓTESIS
            </motion.button>
          </motion.div>
        )}

        {/* ── DEDUCCIÓN ─────────────────────────────────────────────────── */}
        {estado === "deduccion" && (
          <motion.div
            key="deduccion"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <HipotesisSelector
              caso={caso}
              pistasDescubiertas={pistasDescubiertas}
              onSeleccionar={handleSeleccionarHipótesis}
              disabled={false}
            />
          </motion.div>
        )}

        {/* ── VERIFICACIÓN ──────────────────────────────────────────────── */}
        {estado === "verificacion" && hipótesisSeleccionada !== null && (
          <motion.div
            key="verificacion"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-5"
          >
            <div className="terminal p-6 space-y-4">
              <div className="font-mono-terminal text-[9px] uppercase tracking-[.35em] text-zona-recursos mb-1">
                HIPÓTESIS SELECCIONADA
              </div>
              <p className="font-display-grave text-2xl text-doc-aged">
                {caso.hipótesis[hipótesisSeleccionada].titulo}
              </p>

              <div className="border-l-2 pl-4" style={{ borderColor: "rgba(75,231,255,.4)" }}>
                <p className="font-serif-juridica text-doc-aged/80 text-base leading-relaxed">
                  {caso.hipótesis[hipótesisSeleccionada].explicacion}
                </p>
              </div>

              {/* Confirmacion sin revelar la solucion */}
              <div
                className="p-4 space-y-2"
                style={{
                  background: "rgba(215,180,106,.04)",
                  border: "1px solid rgba(215,180,106,.22)",
                }}
              >
                <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-prueba">
                  Confirmacion previa
                </div>
                <p className="font-serif-juridica text-doc-aged/80 text-sm">
                  Vas a defender esta hipotesis. La solucion oficial aparece despues de verificar, para que el caso siga siendo investigacion y no lectura con boton.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={handleVerificar}
              onMouseEnter={() => sfx.hover()}
              className="btn btn-cautelar w-full py-3 font-mono-terminal text-sm"
            >
              ✓ VERIFICAR HIPÓTESIS
            </motion.button>
          </motion.div>
        )}

        {/* ── RESULTADO ─────────────────────────────────────────────────── */}
        {estado === "resultado" && hipótesisSeleccionada !== null && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-5"
          >
            {/* Narrative */}
            <div
              className="terminal p-6 border-l-4 space-y-3"
              style={{ borderLeftColor: esCorrecta ? "var(--zona-cautelares)" : "var(--zona-nulidad)" }}
            >
              <div
                className="font-mono-terminal text-[9px] uppercase tracking-widest"
                style={{ color: esCorrecta ? "var(--zona-cautelares)" : "var(--zona-nulidad)" }}
              >
                {esCorrecta ? "✓ HIPÓTESIS CORRECTA" : "✗ HIPÓTESIS INCORRECTA"}
              </div>
              <p className="font-serif-juridica text-doc-aged/80 text-base leading-relaxed italic">
                {generarNarrativaResultado(esCorrecta, caso)}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Score", val: score, color: "var(--zona-competencia)" },
                { label: "XP", val: `+${esCorrecta ? caso.dificultad * 20 : 5}`, color: "var(--zona-cautelares)" },
                { label: "Tiempo", val: `${tiempoMinutos}m`, color: "var(--zona-prueba)" },
                { label: "Pistas", val: `${pistasDescubiertas.size}/${caso.pistas.length}`, color: "var(--zona-recursos)" },
              ].map((s) => (
                <div key={s.label} className="terminal p-3 text-center">
                  <div className="font-display-grave text-xl" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[9px] text-doc-aged/40 font-mono-terminal">{s.label}</div>
                </div>
              ))}
            </div>

            <div
              className="p-4 space-y-2 border"
              style={{
                background: esCorrecta ? "rgba(88,245,176,.04)" : "rgba(217,74,74,.04)",
                borderColor: esCorrecta ? "rgba(88,245,176,.28)" : "rgba(217,74,74,.28)",
              }}
            >
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-competencia">
                Solucion oficial y respuesta de grado
              </div>
              <p className="font-serif-juridica text-doc-aged/80 text-sm leading-relaxed">
                {caso.solucion.explicacion}
              </p>
              <div className="font-mono-terminal text-[9px] text-zona-recursos">
                {caso.solucion.articuloClave} / {caso.solucion.recursoAplicable}
              </div>
              <ul className="text-[10px] text-doc-aged/55 font-mono-terminal space-y-1 mt-2">
                {caso.solucion.pasosCorrectionales.map((paso) => (
                  <li key={paso}>{paso}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {onVolver && (
                <button
                  onClick={() => { onVolver(); onResuelto?.(esCorrecta); }}
                  onMouseEnter={() => sfx.hover()}
                  className="flex-1 btn btn-recurso"
                >
                  ← Volver
                </button>
              )}
              <button
                onClick={() => {
                  setEstado("intro");
                  setPistasDescubiertas(new Set(getPistasIniciales(caso).map((p) => p.id)));
                  setHipótesisSeleccionada(null);
                  setExpandedPista(null);
                  sfx.click();
                }}
                onMouseEnter={() => sfx.hover()}
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
