"use client";
import Link from "next/link";
import { useGame } from "@/store/useGame";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sfx } from "@/lib/audio";
import GameWorldMap from "@/components/GameWorldMap";
import { CAMPAÑA } from "@/data/campaign";

// ============================================================================
// CIUDAD JUDICIAL — World Map Hub v2
// Mapa visual interactivo del RPG procesal
// ============================================================================

const RANGOS = [
  { min: 1, max: 3, titulo: "Litigante Novato", color: "var(--zona-incidentes)" },
  { min: 4, max: 6, titulo: "Operador Procesal", color: "var(--zona-competencia)" },
  { min: 7, max: 9, titulo: "Abogado Tramitador", color: "var(--zona-prueba)" },
  { min: 10, max: 13, titulo: "Fiscal de Hierro", color: "var(--zona-recursos)" },
  { min: 14, max: 17, titulo: "Maestro del CPC", color: "var(--zona-cautelares)" },
  { min: 18, max: 20, titulo: "Arquitecto del Grado", color: "var(--zona-oralidad)" },
];

function getRango(nivel: number) {
  return RANGOS.find((r) => nivel >= r.min && nivel <= r.max) || RANGOS[0];
}

export default function Juego() {
  const router = useRouter();
  const { personaje, logros, finalizado, xp, nivel, monedas, misionesCompletadas } = useGame();
  const [showMisiones, setShowMisiones] = useState(false);

  useEffect(() => {
    if (!personaje.nombre) router.replace("/creacion");
  }, [personaje.nombre, router]);

  if (!personaje.nombre) return null;

  const rango = getRango(nivel);
  const totalMisiones = CAMPAÑA.reduce((s, a) => s + a.misiones.length, 0);
  const misionesHechas = misionesCompletadas.length;
  const progreso = Math.round((misionesHechas / totalMisiones) * 100);

  return (
    <main
      className="min-h-screen relative"
      style={{
        background: "radial-gradient(1200px 800px at 50% 0%, rgba(75,231,255,.03), transparent 70%), var(--bg-deep)"
      }}
    >
      {/* ─── HEADER ─── */}
      <header className="relative z-10 px-4 md:px-8 pt-4 pb-3 border-b border-zona-competencia/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Identidad del personaje */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-12 h-12 rounded border-2 flex items-center justify-center text-xl font-display-grave"
                style={{
                  borderColor: rango.color,
                  background: `radial-gradient(circle, ${rango.color}15, transparent)`,
                  boxShadow: `0 0 20px ${rango.color}30`,
                  color: rango.color,
                }}
              >
                {personaje.nombre[0]}
              </div>
              <div
                className="absolute -bottom-1 -right-1 text-[8px] font-mono-terminal px-1 border"
                style={{ borderColor: rango.color, color: rango.color, background: "var(--bg-deep)" }}
              >
                {nivel}
              </div>
            </div>

            <div>
              <div className="font-mono-terminal text-[8px] uppercase tracking-widest mb-0.5" style={{ color: rango.color }}>
                {rango.titulo}
              </div>
              <h1 className="font-display-grave text-lg md:text-2xl text-doc-aged leading-tight">
                {personaje.nombre}
              </h1>
              <p className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase">
                {personaje.rol.replace(/_/g, " ")} · {personaje.origen.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          {/* Barra de progreso de campaña */}
          <div className="hidden md:block flex-1 max-w-xs">
            <div className="flex justify-between text-[9px] font-mono-terminal text-doc-aged/50 mb-1">
              <span>PROGRESO CAMPAÑA</span>
              <span className="text-zona-prueba">{progreso}%</span>
            </div>
            <div className="h-2 bg-bg-steel rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, var(--zona-competencia), var(--zona-recursos))" }}
                initial={{ width: 0 }}
                animate={{ width: `${progreso}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="text-[8px] font-mono-terminal text-doc-aged/30 mt-0.5">
              {misionesHechas} / {totalMisiones} misiones
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex gap-2 flex-wrap">
            <Link href="/expansion" className="btn btn-recurso text-[10px] px-3 py-1.5">
              ★ Expansión
            </Link>
            <Link href="/oral" className="btn btn-oral text-[10px] px-3 py-1.5">
              ⚔ Bosses
            </Link>
            <Link href="/examen" className="btn text-[10px] px-3 py-1.5">
              📋 Examen
            </Link>
            {finalizado && (
              <Link href="/epilogo" className="btn btn-cautelar text-[10px] px-3 py-1.5">
                ✓ Epílogo
              </Link>
            )}
            <Link href="/" className="btn btn-danger text-[10px] px-3 py-1.5">
              ⏻
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">

          {/* ─── MAPA VISUAL ─── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-competencia mb-1">
                  MAPA CIUDAD JUDICIAL · 7 ACTOS
                </div>
                <h2 className="font-display-grave text-2xl text-doc-aged">Ciudad Judicial</h2>
              </div>
              <button
                onClick={() => setShowMisiones(!showMisiones)}
                onMouseEnter={() => sfx.hover?.()}
                className="btn text-[10px] px-3 py-1.5"
              >
                {showMisiones ? "🗺 Mapa" : "📋 Misiones"}
              </button>
            </div>

            {!showMisiones ? (
              <div className="terminal p-4" style={{ minHeight: 320 }}>
                <GameWorldMap />
              </div>
            ) : (
              <MisionesPanel misionesCompletadas={misionesCompletadas} />
            )}
          </div>

          {/* ─── PANEL LATERAL ─── */}
          <div className="space-y-4">

            {/* Stats del personaje */}
            <div className="terminal p-4 space-y-3">
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-recursos mb-2">
                TELEMETRÍA
              </div>
              <TelemetriaBar label="Reputación" value={personaje.reputacion} min={-100} max={100} zona="recursos" />
              <TelemetriaBar label="Trauma" value={personaje.trauma} min={0} max={100} zona="nulidad" />
              <TelemetriaBar label="Conocimiento" value={personaje.atributos.conocimiento_procesal} min={0} max={10} zona="prueba" />
              <TelemetriaBar label="Estrategia" value={personaje.atributos.estrategia} min={0} max={10} zona="cautelares" />
            </div>

            {/* Actos disponibles */}
            <div className="space-y-2">
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-competencia">
                ACTOS DISPONIBLES
              </div>
              {CAMPAÑA.slice(0, 4).map((acto) => (
                <ActoCard
                  key={acto.numero}
                  acto={acto}
                  completadas={misionesCompletadas.filter((id) =>
                    acto.misiones.some((m) => m.id === id)
                  ).length}
                />
              ))}
            </div>

            {/* Accesos rápidos */}
            <div className="terminal p-3 space-y-2">
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-prueba mb-2">
                ACCESO RÁPIDO
              </div>
              {[
                { href: "/expansion", label: "Sistemas Expansión", icon: "★", color: "recursos" },
                { href: "/oral", label: "Boss Rush", icon: "⚔", color: "oralidad" },
                { href: "/codex", label: "Codex Legal", icon: "📜", color: "cosajuzgada" },
                { href: "/inventario", label: "Inventario", icon: "📦", color: "cautelares" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => sfx.click?.()}
                  onMouseEnter={() => sfx.hover?.()}
                  className="flex items-center gap-3 p-2 border border-transparent hover:border-zona-competencia/20 rounded transition-all group"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-mono-terminal text-[10px] text-doc-aged/70 group-hover:text-doc-aged transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Logros */}
            <div className="terminal p-3">
              <div className="font-mono-terminal text-[9px] text-zona-cautelares uppercase tracking-widest mb-2">
                LOGROS: {logros.length}
              </div>
              <div className="flex flex-wrap gap-1">
                {logros.slice(0, 6).map((l) => (
                  <div
                    key={l.id}
                    title={l.titulo}
                    className="w-6 h-6 border border-zona-cautelares/40 flex items-center justify-center text-xs"
                    style={{ background: "rgba(88,245,176,0.05)" }}
                  >
                    ✓
                  </div>
                ))}
                {logros.length > 6 && (
                  <div className="font-mono-terminal text-[8px] text-doc-aged/40 flex items-center px-1">
                    +{logros.length - 6}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ────────────────────────────────────────────
function TelemetriaBar({ label, value, min, max, zona }: { label: string; value: number; min: number; max: number; zona: string }) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div>
      <div className="flex justify-between text-[9px] font-mono-terminal mb-1">
        <span className="text-doc-aged/60">{label}</span>
        <span style={{ color: `var(--zona-${zona})` }}>{value}</span>
      </div>
      <div className="h-1 bg-bg-steel rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: `var(--zona-${zona})`, boxShadow: `0 0 6px var(--zona-${zona})50` }}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
function ActoCard({ acto, completadas }: { acto: { numero: number; titulo: string; zona: string; misiones: any[]; bossId: string }, completadas: number }) {
  const pct = Math.round((completadas / acto.misiones.length) * 100);
  const colorMap: Record<string, string> = {
    jurisdiccion: "var(--zona-competencia)",
    emplazamiento: "var(--zona-notificaciones)",
    prueba: "var(--zona-prueba)",
    sentencia: "var(--zona-cosajuzgada)",
    recursos: "var(--zona-recursos)",
    juicio_ejecutivo: "var(--zona-ejecutivo)",
    examen: "var(--zona-oralidad)",
  };
  const color = colorMap[acto.zona] || "var(--zona-competencia)";

  return (
    <div
      className="p-2.5 border rounded transition-all hover:brightness-110"
      style={{ borderColor: `${color}30`, background: `${color}05` }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono-terminal text-[9px] uppercase" style={{ color }}>
          Acto {acto.numero}
        </span>
        <span className="font-mono-terminal text-[8px] text-doc-aged/40">{completadas}/{acto.misiones.length}</span>
      </div>
      <div className="font-display-grave text-xs text-doc-aged mb-1.5">{acto.titulo}</div>
      <div className="h-1 bg-bg-steel rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
const TIPO_ICON: Record<string, string> = {
  investigacion: "🔍", arcade: "🎮", boss: "⚔️",
  npc: "🧑‍⚖️", puzzle: "🧩", dialogo: "💬",
  examen: "📋", ejecutivo: "💼",
};

function MisionesPanel({ misionesCompletadas }: { misionesCompletadas: string[] }) {
  const router = useRouter();

  const handleJugar = (href?: string, moduloId?: string, tipo?: string) => {
    sfx.click?.();
    if (href) { router.push(href); return; }
    if (moduloId) { router.push(`/expansion?m=${moduloId}`); return; }
    if (tipo === "boss") { router.push("/oral"); return; }
    if (tipo === "examen") { router.push("/examen"); return; }
    router.push("/expansion");
  };

  return (
    <div className="terminal p-4 space-y-5 max-h-[500px] overflow-y-auto">
      {CAMPAÑA.map((acto) => {
        const completadasActo = acto.misiones.filter((m) => misionesCompletadas.includes(m.id)).length;
        const pctActo = Math.round((completadasActo / acto.misiones.length) * 100);
        return (
          <div key={acto.numero}>
            {/* Cabecera del acto */}
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-recursos">
                Acto {acto.numero}: {acto.titulo}
              </div>
              <span className="font-mono-terminal text-[8px] text-doc-aged/40">
                {completadasActo}/{acto.misiones.length}
              </span>
            </div>
            {/* Barra de progreso del acto */}
            <div className="h-0.5 bg-bg-steel rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pctActo}%`,
                  background: "linear-gradient(90deg, var(--zona-competencia), var(--zona-recursos))",
                }}
              />
            </div>

            <div className="space-y-1.5">
              {acto.misiones.map((mision) => {
                const completada = misionesCompletadas.includes(mision.id);
                return (
                  <div
                    key={mision.id}
                    className="flex items-center gap-2 p-2 border rounded"
                    style={{
                      borderColor: completada ? "rgba(88,245,176,0.25)" : "rgba(75,231,255,0.1)",
                      background: completada ? "rgba(88,245,176,0.03)" : "transparent",
                    }}
                  >
                    <span className="text-sm shrink-0">{TIPO_ICON[mision.tipo] ?? "📌"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display-grave text-xs text-doc-aged truncate">{mision.titulo}</div>
                      <div className="font-mono-terminal text-[7px] text-doc-aged/40 truncate">{mision.descripcion}</div>
                      <div className="font-mono-terminal text-[7px] text-zona-prueba mt-0.5">
                        +{mision.recompensa.xp} XP · 🪙{mision.recompensa.monedas}
                      </div>
                    </div>
                    {completada ? (
                      <span className="text-[10px] text-zona-cautelares shrink-0">✓</span>
                    ) : (
                      <button
                        onClick={() => handleJugar(mision.href, mision.moduloId, mision.tipo)}
                        onMouseEnter={() => sfx.hover?.()}
                        className="shrink-0 text-[8px] font-mono-terminal px-2 py-1 border border-zona-competencia/40 text-zona-competencia hover:border-zona-competencia hover:brightness-125 transition-all"
                      >
                        JUGAR
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
