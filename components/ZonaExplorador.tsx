"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getNpcsInZona, type NpcId } from "@/data/npcs";
import { getEventosInZona, shouldEventOccur, type EventoMundo } from "@/data/eventos-mundo";
import EncuentroNpc from "./EncuentroNpc";
import EventoMundoModal from "./EventoMundoModal";

interface ZonaExplorador {
  zona: string;
  children: React.ReactNode;
}

export default function ZonaExplorador({ zona, children }: ZonaExplorador) {
  const [npcsEnZona, setNpcsEnZona] = useState<NpcId[]>([]);
  const [eventosEnZona, setEventosEnZona] = useState<EventoMundo[]>([]);
  const [npcActual, setNpcActual] = useState<NpcId | null>(null);
  const [eventoActual, setEventoActual] = useState<EventoMundo | null>(null);
  const [explorado, setExplorado] = useState(false);

  // Al montar o cambiar de zona, cargar NPCs y eventos
  useEffect(() => {
    const npcs = getNpcsInZona(zona);
    const eventos = getEventosInZona(zona);

    // Mapear NPCs a sus IDs
    const npcIds = npcs.map((npc) => npc.id as NpcId);
    setNpcsEnZona(npcIds);
    setEventosEnZona(eventos);

    // Iniciar exploración: mostrar NPC si hay, sino evento
    if (npcIds.length > 0) {
      setNpcActual(npcIds[0]);
    } else {
      verificarEventos(eventos);
    }
  }, [zona]);

  const verificarEventos = (eventos: EventoMundo[]) => {
    for (const evento of eventos) {
      if (shouldEventOccur(evento)) {
        setEventoActual(evento);
        return;
      }
    }
    // Si no hay eventos, marcar como explorado
    setExplorado(true);
  };

  const cerrarNpc = () => {
    setNpcActual(null);

    // Después de NPC, verificar si hay más NPCs
    const siguienteNpcIdx = npcsEnZona.indexOf(npcActual!) + 1;
    if (siguienteNpcIdx < npcsEnZona.length) {
      setNpcActual(npcsEnZona[siguienteNpcIdx]);
    } else {
      // Si no hay más NPCs, verificar eventos
      verificarEventos(eventosEnZona);
    }
  };

  const cerrarEvento = () => {
    setEventoActual(null);
    setExplorado(true);
  };

  return (
    <>
      {/* Indicador de exploración */}
      {!explorado && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-zona-recursos/10 border border-zona-recursos/50 rounded text-xs text-zona-recursos font-mono-terminal"
        >
          🔍 Exploración en progreso... NPCs: {npcsEnZona.length} | Eventos: {eventosEnZona.length}
        </motion.div>
      )}

      {/* Contenido de la zona */}
      {children}

      {/* NPC Modal */}
      {npcActual && (
        <EncuentroNpc
          npcId={npcActual}
          onCerrar={cerrarNpc}
        />
      )}

      {/* Evento Modal */}
      {eventoActual && (
        <EventoMundoModal
          evento={eventoActual}
          onCerrar={cerrarEvento}
        />
      )}
    </>
  );
}
