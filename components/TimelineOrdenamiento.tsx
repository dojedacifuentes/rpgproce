"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";

interface ActoProcesal {
  id: string;
  nombre: string;
  descripcion: string;
  articulo: string;
  plazo: string;
}

interface EscenarioTimeline {
  id: string;
  titulo: string;
  tipo: "ejecutivo" | "ordinario" | "caos";
  descripcion: string;
  actos_desordenados: ActoProcesal[];
  orden_correcto: string[];
  dificultad: number;
}

const ESCENARIOS: EscenarioTimeline[] = [
  {
    id: "timeline_exec_basico",
    titulo: "Juicio Ejecutivo: Flujo Estándar",
    tipo: "ejecutivo",
    descripcion: "Reordena los 6 actos de un juicio ejecutivo clásico: presentación de demanda, análisis de título, mandamiento, requerimiento, embargo, y sentencia.",
    actos_desordenados: [
      {
        id: "eje_001",
        nombre: "Requerimiento de Pago",
        descripcion: "Receptor ejecuta mandamiento en domicilio del ejecutado. Intima a pagar dentro de 4 días.",
        articulo: "Art. 428 CPC",
        plazo: "4 días",
      },
      {
        id: "eje_002",
        nombre: "Presentación Demanda Ejecutiva",
        descripcion: "Acreedor presenta demanda ante tribunal competente con título ejecutivo.",
        articulo: "Art. 434 CPC",
        plazo: "N/A",
      },
      {
        id: "eje_003",
        nombre: "Embargo de Bienes",
        descripcion: "Si ejecutado no paga, se decretan embargos sobre bienes del mismo.",
        articulo: "Art. 438 CPC",
        plazo: "Inmediato",
      },
      {
        id: "eje_004",
        nombre: "Despacho de Mandamiento",
        descripcion: "Tribunal autoriza receptor para ejecutar la demanda.",
        articulo: "Art. 436 CPC",
        plazo: "N/A",
      },
      {
        id: "eje_005",
        nombre: "Análisis de Título Ejecutivo",
        descripcion: "Tribunal verifica validez de letra, pagaré, sentencia, etc. (Art. 434: en 10 días).",
        articulo: "Art. 434-435 CPC",
        plazo: "10 días",
      },
      {
        id: "eje_006",
        nombre: "Sentencia de Remate",
        descripcion: "Tribunal dicta sentencia condenando al remate y pago de crédito.",
        articulo: "Art. 486 CPC",
        plazo: "N/A",
      },
    ],
    orden_correcto: ["eje_002", "eje_005", "eje_004", "eje_001", "eje_003", "eje_006"],
    dificultad: 3,
  },
  {
    id: "timeline_ord_clasico",
    titulo: "Juicio Ordinario: Secuencia Completa",
    tipo: "ordinario",
    descripcion: "Reconstruye los 7 actos de un ordinario: demanda, notificación, contestación, prueba, cierre, deliberación, sentencia.",
    actos_desordenados: [
      {
        id: "ord_001",
        nombre: "Presentación de Demanda",
        descripcion: "Demandante presenta escrito con hechos, fundamentos y petitorio.",
        articulo: "Art. 254 CPC",
        plazo: "N/A",
      },
      {
        id: "ord_002",
        nombre: "Notificación al Demandado",
        descripcion: "Receptor notifica resolución de autos al demandado en su domicilio.",
        articulo: "Art. 40-46 CPC",
        plazo: "2 intentos",
      },
      {
        id: "ord_003",
        nombre: "Contestación de Demanda",
        descripcion: "Demandado contesta hechos, opone excepciones dilatoria y perentoria.",
        articulo: "Art. 305 CPC",
        plazo: "15 días",
      },
      {
        id: "ord_004",
        nombre: "Audiencia de Prueba",
        descripcion: "Se rendición de testimonios, documentos, pericias, confesión de parte.",
        articulo: "Art. 309 CPC",
        plazo: "Variable",
      },
      {
        id: "ord_005",
        nombre: "Cierre de Discusión",
        descripcion: "Partes presentan alegatos finales. Se cierra discussio.",
        articulo: "Art. 331 CPC",
        plazo: "N/A",
      },
      {
        id: "ord_006",
        nombre: "Deliberación Judicial",
        descripcion: "Tribunal analiza prueba en cámara de acuerdos.",
        articulo: "Art. 330 CPC",
        plazo: "Máximo 120 días",
      },
      {
        id: "ord_007",
        nombre: "Dictación de Sentencia",
        descripcion: "Tribunal dicta resolución que resuelve sobre el fondo.",
        articulo: "Art. 158 CPC",
        plazo: "N/A",
      },
    ],
    orden_correcto: ["ord_001", "ord_002", "ord_003", "ord_004", "ord_005", "ord_006", "ord_007"],
    dificultad: 4,
  },
  {
    id: "timeline_caos_incidente",
    titulo: "Ordinario con Incidente: Caos Procesal",
    tipo: "caos",
    descripcion: "7 actos donde un incidente de incompetencia detiene el proceso. ¿Dónde encaja el incidente?",
    actos_desordenados: [
      {
        id: "caos_001",
        nombre: "Demanda Ordinaria Presentada",
        descripcion: "Se inicia juicio ordinario de cobro de deuda.",
        articulo: "Art. 254 CPC",
        plazo: "N/A",
      },
      {
        id: "caos_002",
        nombre: "Notificación Demandado",
        descripcion: "Se notifica resolución de autos.",
        articulo: "Art. 40 CPC",
        plazo: "2 intentos",
      },
      {
        id: "caos_003",
        nombre: "Demandado Alega Incompetencia",
        descripcion: "En contestación, demandado alega que tribunal es incompetente.",
        articulo: "Art. 303 CPC",
        plazo: "15 días",
      },
      {
        id: "caos_004",
        nombre: "Incidente de Incompetencia (Suspensión)",
        descripcion: "Tribunal acepta dilema de competencia. El juicio principal se paraliza.",
        articulo: "Art. 112 CPC",
        plazo: "Indefinido",
      },
      {
        id: "caos_005",
        nombre: "Corte Resuelve Competencia",
        descripcion: "Corte de Apelaciones resuelve quién es competente.",
        articulo: "Art. 85-112 CPC",
        plazo: "30-60 días",
      },
      {
        id: "caos_006",
        nombre: "Continúa Ordinario (Después Incidente)",
        descripcion: "Se retoma el juicio ordinario. Si es tribunal correcto, continúa.",
        articulo: "Art. 112 CPC",
        plazo: "N/A",
      },
      {
        id: "caos_007",
        nombre: "Sentencia Final",
        descripcion: "Se dicta sentencia definitiva en el tribunal competente.",
        articulo: "Art. 158 CPC",
        plazo: "N/A",
      },
    ],
    orden_correcto: ["caos_001", "caos_002", "caos_003", "caos_004", "caos_005", "caos_006", "caos_007"],
    dificultad: 6,
  },
];

export default function TimelineProcesal() {
  const [escenario_idx, setEscenarioIdx] = useState(0);
  const [orden_actual, setOrdenActual] = useState<ActoProcesal[]>([]);
  const [pendientes, setPendientes] = useState<ActoProcesal[]>([]);
  const [respondida, setRespondida] = useState(false);
  const [correcta, setCorrecta] = useState(false);
  const pushLog = useGame((s) => s.pushLog);

  const escenario = ESCENARIOS[escenario_idx];

  // Inicializar con actos desordenados al cambiar escenario
  function inicializar() {
    const shuffled = [...escenario.actos_desordenados].sort(() => Math.random() - 0.5);
    setPendientes(shuffled);
    setOrdenActual([]);
    setRespondida(false);
    setCorrecta(false);
  }

  // Primera carga
  if (pendientes.length === 0 && orden_actual.length === 0 && !respondida) {
    inicializar();
  }

  function agregarAlOrden(acto: ActoProcesal) {
    if (respondida) return;
    sfx.click();
    setOrdenActual((o) => [...o, acto]);
    setPendientes((p) => p.filter((a) => a.id !== acto.id));
  }

  function removerDelOrden(acto: ActoProcesal) {
    if (respondida) return;
    sfx.click();
    setOrdenActual((o) => o.filter((a) => a.id !== acto.id));
    setPendientes((p) => [...p, acto]);
  }

  function verificar() {
    if (respondida) return;
    sfx.click();

    const orden_actual_ids = orden_actual.map((a) => a.id);
    const es_correcta = JSON.stringify(orden_actual_ids) === JSON.stringify(escenario.orden_correcto);

    setCorrecta(es_correcta);
    setRespondida(true);

    if (es_correcta) {
      sfx.oralCorrecta();
      pushLog(`Timeline CORRECTO: ${escenario.titulo}`, "SKILL");
    } else {
      sfx.warning();
      pushLog(`Timeline INCORRECTO: ${escenario.titulo}`, "WARN");
    }
  }

  function siguiente() {
    if (escenario_idx < ESCENARIOS.length - 1) {
      sfx.click();
      setEscenarioIdx((i) => i + 1);
      setOrdenActual([]);
      setPendientes([]);
      setRespondida(false);
      setCorrecta(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="font-mono-terminal text-[10px] uppercase text-doc-aged/40">
          ESCENARIO {escenario_idx + 1} / {ESCENARIOS.length}
        </div>
        <div className="font-mono-terminal text-[10px] uppercase text-zona-nulidad/60">
          Dificultad: {escenario.dificultad}/10
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="terminal p-6 space-y-4">
        <div>
          <h3 className="font-display-grave text-2xl text-doc-aged mb-2">{escenario.titulo}</h3>
          <p className="font-serif-juridica text-doc-aged/75 text-sm">{escenario.descripcion}</p>
        </div>

        {/* GRID: PENDIENTES | ORDEN ACTUAL */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* COLUMNA 1: ACTOS PENDIENTES */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono-terminal uppercase text-doc-aged/40">Actos Pendientes ({pendientes.length})</div>
            <div className="space-y-2 min-h-[400px] border-2 border-doc-aged/20 p-3 bg-doc-aged/5">
              <AnimatePresence mode="popLayout">
                {pendientes.map((acto) => (
                  <motion.button
                    key={acto.id}
                    layoutId={acto.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => agregarAlOrden(acto)}
                    disabled={respondida}
                    className={`w-full text-left p-3 border-2 transition-all ${
                      respondida
                        ? "border-doc-aged/10 text-doc-aged/30 cursor-not-allowed"
                        : "border-doc-aged/30 text-doc-aged/70 hover:border-doc-aged/60 hover:text-doc-aged cursor-pointer"
                    }`}
                  >
                    <div className="font-mono-terminal text-[9px] uppercase tracking-widest mb-1">{acto.id}</div>
                    <div className="font-display-grave text-sm text-doc-aged">{acto.nombre}</div>
                    <div className="text-[9px] text-doc-aged/50 italic mt-1">{acto.articulo}</div>
                  </motion.button>
                ))}
              </AnimatePresence>
              {pendientes.length === 0 && !respondida && (
                <div className="text-center text-doc-aged/30 text-[10px] font-mono-terminal mt-20">
                  (Arrastra actos aquí)
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA 2: ORDEN ACTUAL */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono-terminal uppercase text-zona-cautelares/40">Orden Legal ({orden_actual.length}/{escenario.actos_desordenados.length})</div>
            <div className="space-y-2 min-h-[400px] border-2 border-zona-cautelares/30 p-3 bg-zona-cautelares/5">
              <AnimatePresence mode="popLayout">
                {orden_actual.map((acto, idx) => (
                  <motion.div
                    key={`${acto.id}-orden`}
                    layoutId={`orden-${acto.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="border-2 border-zona-cautelares/30 bg-zona-cautelares/5 p-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="font-mono-terminal text-[8px] uppercase text-zona-cautelares mb-1">
                          #{idx + 1}
                        </div>
                        <div className="font-display-grave text-sm text-doc-aged">{acto.nombre}</div>
                        <div className="text-[9px] text-doc-aged/50 italic mt-1">{acto.descripcion}</div>
                        <div className="text-[8px] text-zona-cautelares/60 mt-2">{acto.articulo} · {acto.plazo}</div>
                      </div>
                      {!respondida && (
                        <button
                          onClick={() => removerDelOrden(acto)}
                          className="text-[9px] border border-zona-nulidad text-zona-nulidad px-2 py-1 hover:bg-zona-nulidad/10"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {orden_actual.length === 0 && (
                <div className="text-center text-doc-aged/30 text-[10px] font-mono-terminal mt-20">
                  (El orden se construye aquí)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTÓN VERIFICAR */}
        {!respondida && orden_actual.length === escenario.actos_desordenados.length && (
          <button onClick={verificar} onMouseEnter={() => sfx.hover()} className="btn btn-recurso w-full py-3 text-sm font-mono-terminal uppercase">
            ✓ Verificar Orden Legal
          </button>
        )}

        {/* ANÁLISIS POST-RESPUESTA */}
        <AnimatePresence>
          {respondida && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-doc-aged/10 pt-4 space-y-3">
              {correcta ? (
                <div className="p-4 bg-zona-cautelares/5 border border-zona-cautelares/20">
                  <span className="text-zona-cautelares font-mono-terminal text-[9px] uppercase">✓ CORRECTO</span>
                  <p className="text-[10px] text-doc-aged/70 mt-2 font-serif-juridica">
                    Respetaste el orden legal de los actos procesales. La secuencia es válida según CPC.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-zona-nulidad/5 border border-zona-nulidad/20 space-y-2">
                  <span className="text-zona-nulidad font-mono-terminal text-[9px] uppercase">✗ INCORRECTO</span>
                  <p className="text-[10px] text-zona-nulidad/70 font-serif-juridica">
                    El orden legal es: {escenario.orden_correcto.map((id) => escenario.actos_desordenados.find((a) => a.id === id)?.nombre).join(" → ")}
                  </p>
                  <p className="text-[9px] text-doc-aged/60 italic">
                    Respetar el orden procesal es fundamental. Saltarse pasos = nulidad (art. 768 N°9).
                  </p>
                </div>
              )}

              {escenario_idx < ESCENARIOS.length - 1 && (
                <button onClick={siguiente} onMouseEnter={() => sfx.hover()} className="btn btn-recurso w-full py-2 text-sm">
                  SIGUIENTE ESCENARIO →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
