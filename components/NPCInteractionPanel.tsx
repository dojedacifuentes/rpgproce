"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TODOS_NPCS } from "@/data/npcs-v2";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";
import NPCCard from "./NPCCard";
import ActividadEtapaNpc from "./ActividadEtapaNpc";

type PanelState = "lista" | "detalle" | "actividad";

export default function NPCInteractionPanel() {
  const [panelState, setPanelState] = useState<PanelState>("lista");
  const [npcSeleccionado, setNpcSeleccionado] = useState<string | null>(null);
  const [mostrarActividad, setMostrarActividad] = useState(false);

  const npcesEnProgreso = useGame((s) => s.npcesEnProgreso);
  const npcesCompletados = useGame((s) => s.npcesCompletados);
  const iniciarArcoNpc = useGame((s) => s.iniciarArcoNpc);

  // Ordenar NPCs: completados → en progreso → no iniciados
  const npcOrdenado = [...TODOS_NPCS].sort((a, b) => {
    const aCompleto = npcesCompletados.includes(a.id);
    const bCompleto = npcesCompletados.includes(b.id);
    const aEnProgreso = npcesEnProgreso.has(a.id);
    const bEnProgreso = npcesEnProgreso.has(b.id);

    if (aCompleto && !bCompleto) return -1;
    if (!aCompleto && bCompleto) return 1;
    if (aEnProgreso && !bEnProgreso) return -1;
    if (!aEnProgreso && bEnProgreso) return 1;
    return 0;
  });

  const npcActual = npcSeleccionado
    ? TODOS_NPCS.find((n) => n.id === npcSeleccionado)
    : null;

  const progresoActual = npcSeleccionado
    ? npcesEnProgreso.get(npcSeleccionado)
    : null;

  const handleSelectNpc = (npcId: string) => {
    setNpcSeleccionado(npcId);
    setPanelState("detalle");
    sfx.confirm?.();
  };

  const handleIniciarArco = () => {
    if (npcSeleccionado) {
      iniciarArcoNpc(npcSeleccionado);
      setMostrarActividad(true);
      sfx.click?.();
    }
  };

  const handleVolverALista = () => {
    setPanelState("lista");
    setNpcSeleccionado(null);
    setMostrarActividad(false);
    sfx.click?.();
  };

  // Si está mostrando actividad
  if (mostrarActividad && npcActual && progresoActual) {
    return (
      <ActividadEtapaNpc
        npc={npcActual}
        progreso={progresoActual}
        onComplete={() => {
          setMostrarActividad(false);
          setPanelState("detalle");
        }}
        onVolver={() => {
          setMostrarActividad(false);
          setPanelState("detalle");
        }}
      />
    );
  }

  // Panel de detalle de NPC
  if (panelState === "detalle" && npcActual && progresoActual) {
    const etapa = npcActual.arco_principal.etapas[progresoActual.etapaActual - 1];

    return (
      <div className="space-y-6">
        <button
          onClick={handleVolverALista}
          onMouseEnter={() => sfx.hover?.()}
          className="btn btn-cyan text-sm"
        >
          ← Volver a Mentores
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal p-8 space-y-6"
        >
          {/* Header */}
          <div>
            <div className="text-5xl mb-4">{npcActual.icono}</div>
            <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
              {npcActual.nombre}
            </h2>
            <p className="font-serif-juridica text-doc-aged/70 italic text-base">
              {npcActual.especialidad}
            </p>
          </div>

          {/* Arco narrativo */}
          <div className="border-l-4 border-neon-blue pl-4">
            <div className="font-mono-terminal text-[9px] text-zona-notificaciones/70 uppercase tracking-wider mb-2">
              Arco Narrativo
            </div>
            <h3 className="font-display-grave text-xl text-doc-aged mb-2">
              {npcActual.arco_principal.titulo}
            </h3>
          </div>

          {/* Etapas */}
          <div className="space-y-3">
            {npcActual.arco_principal.etapas.map((e, idx) => (
              <div
                key={e.numero}
                className={`p-4 rounded border transition-colors ${
                  idx < progresoActual.etapaActual - 1
                    ? "bg-zona-cautelares/5 border-zona-cautelares/30"
                    : idx === progresoActual.etapaActual - 1
                    ? "bg-neon-blue/5 border-neon-blue/30"
                    : "bg-doc-aged/5 border-doc-aged/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`text-lg font-bold flex-shrink-0 ${
                      idx < progresoActual.etapaActual - 1
                        ? "text-zona-cautelares"
                        : idx === progresoActual.etapaActual - 1
                        ? "text-zona-notificaciones"
                        : "text-doc-aged/40"
                    }`}
                  >
                    {idx < progresoActual.etapaActual - 1 ? "✓" : e.numero}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-display-grave text-doc-aged">
                      {e.titulo}
                    </h4>
                    <p className="text-doc-aged/70 text-sm font-serif-juridica mt-1">
                      {e.descripcion}
                    </p>
                    <p className="text-[10px] font-mono-terminal text-zona-recursos/70 mt-2 uppercase tracking-wider">
                      Aprendizaje: {e.aprendizaje}
                    </p>
                    <p className="text-[9px] font-mono-terminal text-doc-aged/50 mt-1">
                      Actividad: {e.actividad}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Desafío Final */}
            <div
              className={`p-4 rounded border transition-colors ${
                progresoActual.estado === "desafio_final"
                  ? "bg-zona-ejecutivo/5 border-zona-ejecutivo/30"
                  : progresoActual.estado === "completada"
                  ? "bg-zona-cautelares/5 border-zona-cautelares/30"
                  : "bg-doc-aged/5 border-doc-aged/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`text-lg font-bold flex-shrink-0 ${
                    progresoActual.estado === "completada"
                      ? "text-zona-cautelares"
                      : progresoActual.estado === "desafio_final"
                      ? "text-zona-ejecutivo"
                      : "text-doc-aged/40"
                  }`}
                >
                  {progresoActual.estado === "completada" ? "✓" : "⚔"}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-display-grave text-doc-aged">
                    {npcActual.arco_principal.mision_final.titulo}
                  </h4>
                  <p className="text-doc-aged/70 text-sm font-serif-juridica mt-1">
                    {npcActual.arco_principal.mision_final.descripcion}
                  </p>
                  <p className="text-[9px] font-mono-terminal text-zona-recursos/70 mt-2 uppercase tracking-wider">
                    Tipo: {npcActual.arco_principal.mision_final.tipo}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          {progresoActual.estado === "no_iniciada" && (
            <button
              onClick={handleIniciarArco}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-green w-full"
            >
              Iniciar Arco
            </button>
          )}

          {progresoActual.estado.startsWith("en_progreso") && (
            <button
              onClick={() => setMostrarActividad(true)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-blue w-full"
            >
              {progresoActual.actividadCompletada
                ? "Pasar a Siguiente Etapa"
                : "Completar Actividad"}
            </button>
          )}

          {progresoActual.estado === "desafio_final" && (
            <button
              onClick={() => setMostrarActividad(true)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-orange w-full"
            >
              Iniciar Desafío Final
            </button>
          )}

          {progresoActual.estado === "completada" && (
            <div className="p-4 bg-zona-cautelares/5 border border-zona-cautelares/30 rounded text-center">
              <p className="font-mono-terminal text-zona-cautelares text-sm">
                ✓ Arco Completado
              </p>
            </div>
          )}

          {progresoActual.estado === "fallida" && (
            <button
              onClick={() => {
                // Reintentar
                setMostrarActividad(true);
              }}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-red w-full"
            >
              Reintentar Desafío
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  // Lista de NPCs
  return (
    <div className="space-y-6">
      <div className="terminal p-6 space-y-3">
        <div>
          <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-1">
            MENTORÍA PROCESAL
          </div>
          <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
            10 Mentores Procedurales
          </h2>
          <p className="font-serif-juridica text-doc-aged/70">
            Aprende directamente de expertos en derecho procesal chileno. Cada mentor
            ofrece un arco de 3 etapas de aprendizaje + desafío final.
          </p>
        </div>

        <div className="mt-4 text-[9px] font-mono-terminal text-doc-aged/50">
          ARCOS COMPLETADOS: {npcesCompletados.length} / {TODOS_NPCS.length}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {npcOrdenado.map((npc) => {
            const enProgreso = npcesEnProgreso.get(npc.id);
            const estado = enProgreso?.estado || "no_iniciada";
            const etapa = enProgreso?.etapaActual || 0;

            return (
              <NPCCard
                key={npc.id}
                npc={npc}
                estado={estado}
                etapaActual={etapa}
                desbloqueado={true} // Por ahora todos desbloqueados
                onClick={() => handleSelectNpc(npc.id)}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
