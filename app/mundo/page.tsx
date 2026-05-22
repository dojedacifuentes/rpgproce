"use client";
import Link from "next/link";
import { getAllNpcs } from "@/data/npcs";
import { EVENTOS_MUNDO } from "@/data/eventos-mundo";
import ZonaCard from "@/components/ZonaCard";

export default function MundoHub() {
  const npcs = getAllNpcs();

  // Extraer zonas únicas del sistema de NPCs y eventos
  const zonasSet = new Set<string>();
  npcs.forEach((npc) => zonasSet.add(npc.zona));
  EVENTOS_MUNDO.forEach((evento) => zonasSet.add(evento.zona));
  const zonas = Array.from(zonasSet).sort();

  // Mapear zonas a metadatos
  const zonasMetadata: Record<
    string,
    {
      nombre: string;
      descripcion: string;
      href: string;
      color: string;
      emoji: string;
    }
  > = {
    competencia: {
      nombre: "Cámara de Competencia",
      descripcion: "Determinación de jurisdicción y conflictos de competencia. Inhibitorias, declinartorias, y cuestiones de tribunal competente.",
      href: "/mundo/competencia",
      color: "neon-cyan",
      emoji: "⚖️",
    },
    cautelares: {
      nombre: "Sala de Medidas Cautelares",
      descripcion: "Embargos, medidas conservativas, y protección del patrimonio en peligro. Verosimilitud, peligro en la demora, contracautela.",
      href: "/mundo/cautelares",
      color: "neon-blue",
      emoji: "🔒",
    },
    notificaciones: {
      nombre: "Oficina de Notificaciones",
      descripcion: "Actos de comunicación procesal. Notificación personal, subsidiaria, publicación. El receptor es el guardián del debido proceso.",
      href: "/mundo/emplazamiento",
      color: "neon-cyan",
      emoji: "📬",
    },
    recursos: {
      nombre: "Corte de Recursos",
      descripcion: "Apelación, casación en la forma, casación en el fondo. Los recursos otorgan vida a sentencias que de otro modo serían definitivas.",
      href: "/mundo/recursos",
      color: "neon-yellow",
      emoji: "⚔️",
    },
    prueba: {
      nombre: "Tribunal de Prueba",
      descripcion: "Medios de prueba: documental, testimonial, confesión, presunción, pericial. La prueba es el alma del proceso.",
      href: "/mundo/prueba",
      color: "neon-green",
      emoji: "📜",
    },
    cosajuzgada: {
      nombre: "Cámara de Cosa Juzgada",
      descripcion: "Bilateralidad, preclusión, cosa juzgada. Los pilares que dan estabilidad jurídica al sistema. Donde terminan las pretensiones.",
      href: "/mundo/sentencia",
      color: "neon-purple",
      emoji: "📚",
    },
    demanda: {
      nombre: "Sección de Demandas",
      descripcion: "Acción, pretensión, requisitos formales. El acto procesal que pone en movimiento toda la máquina judicial.",
      href: "/mundo/demanda",
      color: "neon-red",
      emoji: "📋",
    },
    ejecutivo: {
      nombre: "Juzgado Ejecutivo",
      descripcion: "Juicio ejecutivo. Título ejecutivo, gestión preparatoria, mandamiento, embargo, excepciones tasadas, apremio.",
      href: "/mundo/juicio_ejecutivo",
      color: "neon-orange",
      emoji: "💼",
    },
    nulidad: {
      nombre: "Sala de Nulidad",
      descripcion: "Causales de nulidad procesal. Vicios que contaminan todo el expediente y lo condenan al desasimiento.",
      href: "/mundo/examen",
      color: "neon-red",
      emoji: "⚠️",
    },
  };

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <Link href="/juego" className="btn mb-4">◂ Volver al mapa principal</Link>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-neon-cyan mb-2">
          MUNDO JUDICIAL VIVO
        </div>
        <h1 className="font-display-grave text-4xl md:text-5xl text-doc-aged mb-3">
          Explorador de Zonas
        </h1>
        <p className="text-doc-aged/60 text-sm font-mono-terminal max-w-2xl">
          {npcs.length} personajes jurídicos habitan la Ciudad Judicial. {EVENTOS_MUNDO.length} sucesos dinámicos pueden ocurrir.
          Visita las zonas para encuentros, diálogos y misiones.
        </p>
      </header>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-8">
        <div className="terminal p-3 text-center">
          <div className="text-lg font-display-grave text-neon-cyan">{npcs.length}</div>
          <div className="text-xs text-parchment/60 font-mono-terminal">NPCs</div>
        </div>
        <div className="terminal p-3 text-center">
          <div className="text-lg font-display-grave text-neon-yellow">{EVENTOS_MUNDO.length}</div>
          <div className="text-xs text-parchment/60 font-mono-terminal">Eventos</div>
        </div>
        <div className="terminal p-3 text-center">
          <div className="text-lg font-display-grave text-neon-purple">{zonas.length}</div>
          <div className="text-xs text-parchment/60 font-mono-terminal">Zonas</div>
        </div>
        <div className="terminal p-3 text-center">
          <div className="text-lg font-display-grave text-neon-green">
            {npcs.filter((npc) => npc.mision).length}
          </div>
          <div className="text-xs text-parchment/60 font-mono-terminal">Misiones</div>
        </div>
        <div className="terminal p-3 text-center">
          <div className="text-lg font-display-grave text-neon-red">∞</div>
          <div className="text-xs text-parchment/60 font-mono-terminal">Posibilidades</div>
        </div>
      </div>

      {/* Zonas Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zonas.map((zonaId) => {
          const meta = zonasMetadata[zonaId];
          if (!meta) return null;

          return (
            <ZonaCard
              key={zonaId}
              zonaId={zonaId}
              zonaNombre={meta.nombre}
              descripcion={meta.descripcion}
              href={meta.href}
              color={meta.color}
              emoji={meta.emoji}
            />
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-12 p-4 bg-terminal-darker border border-parchment/10 rounded">
        <div className="font-mono-terminal text-xs text-parchment/60 space-y-2">
          <div>👥 = Personajes disponibles en la zona</div>
          <div>📌 = Eventos que pueden ocurrir aleatoriamente</div>
          <div>💬 = Diálogos con personajes afectan tu reputación, trauma y nivel económico</div>
          <div>⚡ = Los eventos pueden cambiar el clima jurídico y crear oportunidades o peligros</div>
        </div>
      </div>
    </main>
  );
}
