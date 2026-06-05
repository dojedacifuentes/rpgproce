"use client";
import Link from "next/link";
import { useGame } from "@/store/useGame";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sfx } from "@/lib/audio";
import GameWorldMap from "@/components/GameWorldMap";
import PortalReinos from "@/components/reinos/PortalReinos";
import PortalCivilis from "@/components/civilis/PortalCivilis";
import PortalProcesal from "@/components/procesal/PortalProcesal";
import GameNav, { type NavItem } from "@/components/game/GameNav";
import { CAMPAÑA, getBoss } from "@/data/campaign";
import { getRelicById, MAX_RELICS_EQUIPADAS } from "@/data/relics";

// ============================================================================
// CIUDAD JUDICIAL — Hub v3 (consola-ciudad cyberpunk)
// Shell: Expediente del Litigante · Ciudad protagonista · Eventos/Noticias/
// Próximo Combate · barra de navegación diegética. Conserva toda la lógica.
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

// Atributos mostrados (mapeados al store de 6 atributos)
const ATRIBUTOS = [
  { label: "Conocimiento", k: "conocimiento_procesal", zona: "competencia" },
  { label: "Estrategia", k: "estrategia", zona: "recursos" },
  { label: "Oratoria", k: "persuasion_forense", zona: "oralidad" },
  { label: "Memoria", k: "rigor_formal", zona: "prueba" },
  { label: "Resistencia", k: "resistencia_psicologica", zona: "cautelares" },
] as const;

// Vida ambiental (flavor; ver docs/direccion-creativa/13_NPCS_AND_LIVE_EVENTS.md)
const NOTICIAS = [
  "Corte Suprema acoge recurso de protección por vulneración al debido proceso.",
  "Nuevo criterio sobre validez de notificaciones electrónicas.",
  "Proyecto de reforma al CPC avanza en comisión mixta.",
  "Pleno fija doctrina sobre cómputo de plazos en feriado judicial.",
];
const EVENTOS = [
  { icon: "⚖", title: "Audiencia Oral", sub: "Disponible ahora", zona: "oralidad", href: "/oral" },
  { icon: "▤", title: "Oferta Probatoria", sub: "Nueva reliquia en stock", zona: "prueba", href: "/inventario" },
  { icon: "⚠", title: "Interrogatorio", sub: "Testigo nervioso", zona: "nulidad", href: "/mundo" },
];

export default function Juego() {
  const router = useRouter();
  const { personaje, logros, finalizado, xp, nivel, monedas, misionesCompletadas, relicsEquipadas, log } = useGame();
  const [showMisiones, setShowMisiones] = useState(false);
  const [noticiaIdx, setNoticiaIdx] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setNoticiaIdx((x) => (x + 1) % NOTICIAS.length), 5500);
    return () => clearInterval(i);
  }, []);

  if (!personaje.nombre) return <EmptyCampaignGate />;

  const rango = getRango(nivel);
  const xpEnNivel = xp % 100;
  const totalMisiones = CAMPAÑA.reduce((s, a) => s + a.misiones.length, 0);
  const misionesHechas = misionesCompletadas.length;
  const progreso = Math.round((misionesHechas / totalMisiones) * 100);

  // Acto actual = primero con misiones pendientes
  const actoActual = (() => {
    for (const a of CAMPAÑA) {
      const c = a.misiones.filter((m) => misionesCompletadas.includes(m.id)).length;
      if (c < a.misiones.length) return a.numero;
    }
    return CAMPAÑA.length;
  })();
  const proxActo = CAMPAÑA.find((a) => a.numero === actoActual) ?? CAMPAÑA[CAMPAÑA.length - 1];
  const proxBoss = proxActo ? getBoss(proxActo.bossId) : undefined;

  // Misión actual = primera pendiente
  let misionActual: { acto: (typeof CAMPAÑA)[number]; m: (typeof CAMPAÑA)[number]["misiones"][number] } | null = null;
  for (const a of CAMPAÑA) {
    const m = a.misiones.find((x) => !misionesCompletadas.includes(x.id));
    if (m) { misionActual = { acto: a, m }; break; }
  }

  const navItems: NavItem[] = [
    { icon: "🗺", label: "Mapa", href: "/juego" },
    { icon: "🎒", label: "Inventario", href: "/inventario" },
    { icon: "⚔", label: "Bosses", href: "/oral" },
    { icon: "📋", label: "Misiones", onClick: () => setShowMisiones((v) => !v) },
    { icon: "📜", label: "Códex", href: "/codex" },
    { icon: "★", label: "Expansión", href: "/expansion" },
  ];

  return (
    <main
      className="min-h-screen relative"
      style={{ background: "radial-gradient(1200px 800px at 50% -5%, rgba(75,231,255,.04), transparent 70%), var(--bg-deep)" }}
    >
      {/* ─── HEADER (identidad + recursos + clima) — deja libre la esquina sup-der del HUD global ─── */}
      <header className="px-3 md:px-6 pt-3 pb-3 border-b border-zona-competencia/10">
        <div className="max-w-7xl mx-auto flex items-center gap-3 md:gap-5 flex-wrap pr-24 md:pr-44">
          {/* identidad */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-11 h-11 md:w-12 md:h-12 rounded border-2 flex items-center justify-center text-lg md:text-xl font-display-grave"
                style={{ borderColor: rango.color, background: `radial-gradient(circle, ${rango.color}18, transparent)`, boxShadow: `0 0 20px ${rango.color}30`, color: rango.color }}
              >
                {personaje.nombre[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 text-[8px] font-mono-terminal px-1 border" style={{ borderColor: rango.color, color: rango.color, background: "var(--bg-deep)" }}>
                {nivel}
              </div>
            </div>
            <div>
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest" style={{ color: rango.color }}>{rango.titulo}</div>
              <h1 className="font-display-grave text-lg md:text-2xl text-doc-aged leading-tight">{personaje.nombre}</h1>
              <div className="mt-1 w-32 md:w-40 h-1 bg-bg-steel rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${xpEnNivel}%`, background: rango.color, boxShadow: `0 0 6px ${rango.color}70` }} />
              </div>
            </div>
          </div>
          {/* recursos */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Chip icon="⭐" value={`${xp}`} color="var(--zona-prueba)" />
            <Chip icon="🪙" value={`${monedas}`} color="var(--zona-prueba)" />
            <Chip icon="REP" value={`${personaje.reputacion}`} color="var(--zona-recursos)" />
            <Chip icon="⚠" value={`${personaje.trauma}`} color="var(--zona-nulidad)" />
          </div>
          {/* clima + progreso */}
          <div className="hidden md:flex flex-col gap-1 ml-auto min-w-[180px]">
            <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/45">Ciudad Judicial · Noche · Lluvia</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-bg-steel rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, var(--zona-competencia), var(--zona-recursos))" }} initial={{ width: 0 }} animate={{ width: `${progreso}%` }} transition={{ duration: 1, delay: 0.3 }} />
              </div>
              <span className="font-mono-terminal text-[9px] text-zona-prueba">{progreso}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── CONTENIDO ─── */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 pb-28">
        <PortalReinos />
        <PortalCivilis />
        <PortalProcesal />

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[clamp(240px,22vw,280px)_minmax(0,1fr)_clamp(260px,24vw,320px)] lg:items-start mt-4">

          {/* ═══ RAIL IZQUIERDO — EXPEDIENTE DEL LITIGANTE ═══ */}
          <aside className="order-3 lg:order-1 space-y-3">
            <RailTitle text="Expediente del Litigante" color="var(--zona-competencia)" />

            {/* Atributos */}
            <Panel>
              <Label>Atributos</Label>
              <div className="space-y-2 mt-1.5">
                {ATRIBUTOS.map((a) => (
                  <AtributoBar key={a.k} label={a.label} value={personaje.atributos[a.k]} zona={a.zona} />
                ))}
              </div>
            </Panel>

            {/* Misión actual */}
            <Panel borderColor="rgba(138,92,255,0.25)">
              <Label color="var(--zona-recursos)">Misión Actual</Label>
              {misionActual ? (
                <div className="mt-1">
                  <div className="font-display-grave text-sm text-doc-aged leading-tight">{misionActual.m.titulo}</div>
                  <p className="font-mono-terminal text-[9px] text-doc-aged/45 mt-1 leading-snug">{misionActual.m.descripcion}</p>
                  <Link href={`/mision/${misionActual.m.id}`} onClick={() => sfx.click?.()} className="btn btn-recurso w-full text-[10px] py-2 mt-2.5 inline-block text-center">▶ Atender</Link>
                </div>
              ) : (
                <p className="font-serif-juridica text-doc-aged/55 text-xs italic mt-1">Campaña completada. La ciudad calla.</p>
              )}
            </Panel>

            {/* Reliquias equipadas */}
            <Panel>
              <div className="flex items-center justify-between">
                <Label>Reliquias Equipadas</Label>
                <span className="font-mono-terminal text-[8px] text-doc-aged/40">{relicsEquipadas.length}/{MAX_RELICS_EQUIPADAS}</span>
              </div>
              <div className="space-y-1.5 mt-1.5">
                {Array.from({ length: MAX_RELICS_EQUIPADAS }).map((_, i) => (
                  <ReliquiaSlot key={i} id={relicsEquipadas[i]} />
                ))}
              </div>
              <Link href="/inventario" onClick={() => sfx.click?.()} className="block text-center font-mono-terminal text-[9px] text-doc-aged/40 hover:text-doc-aged/70 mt-2 transition-colors">Gestionar inventario →</Link>
            </Panel>

            {/* Registro de actividad */}
            <Panel>
              <Label color="var(--zona-cautelares)">Registro de Actividad</Label>
              <div className="space-y-1 mt-1.5">
                {log.length === 0 ? (
                  <p className="font-mono-terminal text-[9px] text-doc-aged/30 italic">Sin actividad registrada.</p>
                ) : (
                  log.slice(0, 5).map((l, i) => (
                    <div key={i} className="font-mono-terminal text-[9px] text-doc-aged/55 truncate flex gap-1.5">
                      <span className="text-zona-competencia/60 shrink-0">·</span>
                      <span className="truncate">{l.texto}</span>
                    </div>
                  ))
                )}
              </div>
            </Panel>
          </aside>

          {/* ═══ CENTRO — CIUDAD JUDICIAL ═══ */}
          <section className="order-1 lg:order-2 space-y-2">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono-terminal text-[9px] uppercase tracking-[.25em] text-zona-competencia mb-0.5">Mapa · 7 Distritos</div>
                <h2 className="font-display-grave text-2xl md:text-3xl text-doc-aged leading-none">Ciudad Judicial</h2>
              </div>
              <button onClick={() => { setShowMisiones((v) => !v); sfx.click?.(); }} onMouseEnter={() => sfx.hover?.()} className="btn text-[10px] px-3 py-1.5">
                {showMisiones ? "🗺 Ver ciudad" : "📋 Ver misiones"}
              </button>
            </div>

            {!showMisiones ? <GameWorldMap /> : <MisionesPanel misionesCompletadas={misionesCompletadas} />}
          </section>

          {/* ═══ RAIL DERECHO — EVENTOS / NOTICIAS / PRÓXIMO COMBATE ═══ */}
          <aside className="order-2 lg:order-3 space-y-3">

            {/* Próximo combate */}
            {proxBoss && (
              <div className="relative overflow-hidden rounded-lg border p-3" style={{ borderColor: `${proxBoss.color}55`, background: `linear-gradient(135deg, ${proxBoss.color}14, transparent 70%)`, boxShadow: `0 0 24px ${proxBoss.color}1f` }}>
                <Label color={proxBoss.color}>Próximo Enfrentamiento</Label>
                <div className="flex items-center gap-3 mt-2">
                  <motion.div
                    className="w-12 h-12 shrink-0 rounded border-2 flex items-center justify-center text-2xl"
                    style={{ borderColor: proxBoss.color, color: proxBoss.color, background: `radial-gradient(circle, ${proxBoss.color}22, transparent)`, boxShadow: `0 0 16px ${proxBoss.color}44` }}
                    animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {proxBoss.icono}
                  </motion.div>
                  <div className="min-w-0">
                    <div className="font-display-grave text-base text-doc-aged leading-tight truncate">{proxBoss.nombre}</div>
                    <div className="font-mono-terminal text-[9px] text-doc-aged/50">Jefe de Facción · Acto {proxActo?.numero}</div>
                  </div>
                </div>
                <Link href={`/boss/${proxActo?.bossId}`} onClick={() => sfx.click?.()} onMouseEnter={() => sfx.hover?.()} className="block text-center font-display-grave text-sm py-2.5 mt-3 border transition-all hover:brightness-125" style={{ borderColor: proxBoss.color, color: proxBoss.color, background: `${proxBoss.color}12` }}>
                  ⚔ PREPARAR COMBATE
                </Link>
              </div>
            )}

            {/* Eventos activos */}
            <Panel>
              <Label color="var(--zona-oralidad)">Eventos Activos</Label>
              <div className="space-y-1.5 mt-1.5">
                {EVENTOS.map((e) => (
                  <Link key={e.title} href={e.href} onClick={() => sfx.click?.()} onMouseEnter={() => sfx.hover?.()} className="flex items-center gap-2.5 p-2 border rounded transition-all hover:brightness-125" style={{ borderColor: `var(--zona-${e.zona})30` }}>
                    <span className="text-base shrink-0" style={{ color: `var(--zona-${e.zona})`, filter: `drop-shadow(0 0 5px var(--zona-${e.zona}))` }}>{e.icon}</span>
                    <div className="min-w-0">
                      <div className="font-display-grave text-xs text-doc-aged leading-tight">{e.title}</div>
                      <div className="font-mono-terminal text-[8px] text-doc-aged/45 truncate">{e.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Panel>

            {/* Noticias jurídicas (ticker) */}
            <Panel>
              <Label color="var(--zona-notificaciones)">Noticias Jurídicas</Label>
              <div className="mt-1.5 min-h-[46px] flex items-start">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={noticiaIdx}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
                    className="font-serif-juridica text-doc-aged/70 text-xs leading-snug"
                  >
                    <span className="text-zona-notificaciones mr-1">◈</span>{NOTICIAS[noticiaIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <Link href="/codex" onClick={() => sfx.click?.()} className="block text-center font-mono-terminal text-[9px] text-doc-aged/40 hover:text-doc-aged/70 mt-1 transition-colors">Ver Códex →</Link>
            </Panel>

            {/* Logros (compacto) */}
            <Panel>
              <div className="flex items-center justify-between">
                <Label color="var(--zona-cautelares)">Logros</Label>
                <span className="font-mono-terminal text-[8px] text-doc-aged/50">{logros.length}</span>
              </div>
              {logros.length === 0 ? (
                <p className="font-mono-terminal text-[9px] text-doc-aged/40 italic mt-1.5">Vence jefes para desbloquear logros.</p>
              ) : (
                <div className="space-y-1 mt-1.5">
                  {logros.slice(0, 3).map((l) => (
                    <div key={l.id} className="flex items-center gap-2">
                      <span className="text-zona-cautelares text-[9px] shrink-0">✓</span>
                      <span className="font-mono-terminal text-[9px] text-doc-aged/65 truncate">{l.titulo}</span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            {finalizado && (
              <Link href="/epilogo" onClick={() => sfx.click?.()} className="btn btn-cautelar w-full text-[11px] py-2.5 inline-block text-center">✓ Ver Epílogo</Link>
            )}
          </aside>
        </div>
      </div>

      {/* ─── NAVEGACIÓN DIEGÉTICA ─── */}
      <GameNav items={navItems} />
    </main>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Helpers de presentación
// ════════════════════════════════════════════════════════════════════════════
function Chip({ icon, value, color }: { icon: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 border bg-bg-deep/60 backdrop-blur-sm" style={{ borderColor: `${color}40` }}>
      <span className="font-mono-terminal text-[8px] text-doc-aged/45">{icon}</span>
      <span className="font-mono-terminal text-[10px]" style={{ color }}>{value}</span>
    </div>
  );
}

function Panel({ children, borderColor }: { children: React.ReactNode; borderColor?: string }) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: borderColor ?? "rgba(75,231,255,0.12)", background: "linear-gradient(180deg, rgba(13,15,23,0.7), rgba(8,10,17,0.85))" }}>
      {children}
    </div>
  );
}

function RailTitle({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1 h-3.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      <h3 className="font-mono-terminal text-[9px] uppercase tracking-[.28em]" style={{ color }}>{text}</h3>
    </div>
  );
}

function Label({ children, color }: { children: React.ReactNode; color?: string }) {
  return <div className="font-mono-terminal text-[8px] uppercase tracking-widest" style={{ color: color ?? "rgba(232,223,197,0.45)" }}>{children}</div>;
}

function AtributoBar({ label, value, zona }: { label: string; value: number; zona: string }) {
  const pct = Math.max(0, Math.min(100, value * 10));
  const color = `var(--zona-${zona})`;
  return (
    <div>
      <div className="flex justify-between text-[9px] font-mono-terminal mb-0.5">
        <span className="text-doc-aged/60">{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-1 bg-bg-steel rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 5px ${color}` }} />
      </div>
    </div>
  );
}

function ReliquiaSlot({ id }: { id?: string }) {
  const r = id ? getRelicById(id) : undefined;
  if (!r) {
    return (
      <div className="flex items-center gap-2 p-2 border border-dashed border-doc-aged/12 rounded">
        <span className="text-base opacity-30">▢</span>
        <span className="font-mono-terminal text-[9px] text-doc-aged/25">Ranura vacía</span>
      </div>
    );
  }
  const color = `var(--zona-${r.zona})`;
  const rareza = r.costo >= 250 ? "Legendaria" : r.costo >= 150 ? "Épica" : r.costo >= 100 ? "Rara" : "Común";
  return (
    <div className="flex items-center gap-2 p-2 border rounded" style={{ borderColor: `${color}55`, background: `${color}0c` }}>
      <span className="text-base shrink-0" style={{ filter: `drop-shadow(0 0 5px ${color}aa)` }}>{r.icono}</span>
      <div className="min-w-0">
        <div className="font-display-grave text-[11px] text-doc-aged leading-tight truncate">{r.nombre}</div>
        <div className="font-mono-terminal text-[8px] truncate" style={{ color }}>{rareza} · {r.efecto}</div>
      </div>
    </div>
  );
}

function EmptyCampaignGate() {
  return (
    <main className="min-h-screen px-6 py-10 flex items-center justify-center" style={{ background: "radial-gradient(900px 600px at 50% 0%, rgba(75,231,255,.06), transparent 70%), var(--bg-deep)" }}>
      <section className="w-full max-w-3xl border border-zona-competencia/25 bg-bg-deep/80 p-6 md:p-8">
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.35em] text-zona-competencia mb-3">expediente sin compareciente</div>
        <h1 className="font-display-grave text-3xl md:text-5xl text-doc-aged mb-4">Antes de litigar, constituye personaje.</h1>
        <p className="font-serif-juridica text-doc-aged/65 leading-relaxed max-w-2xl">
          La Ciudad Judicial requiere un litigante para guardar progreso, reputación, trauma, recompensas y derrotas.
          Puedes crear uno o inspeccionar el mundo vivo sin comprometer una partida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-7">
          <Link href="/creacion" className="btn btn-recurso text-[11px] px-4 py-3">Crear personaje</Link>
          <Link href="/mundo" className="btn text-[11px] px-4 py-3">Explorar mundo vivo</Link>
          <Link href="/" className="btn btn-danger text-[11px] px-4 py-3">Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}

const TIPO_ICON: Record<string, string> = {
  investigacion: "🔍", arcade: "🎮", boss: "⚔️",
  npc: "🧑‍⚖️", puzzle: "🧩", dialogo: "💬",
  examen: "📋", ejecutivo: "💼",
};

function MisionesPanel({ misionesCompletadas }: { misionesCompletadas: string[] }) {
  const router = useRouter();
  const handleJugar = (misionId: string, href?: string, moduloId?: string, tipo?: string) => {
    sfx.click();
    if (misionId) { router.push(`/mision/${misionId}`); return; }
    if (href) { router.push(href); return; }
    if (moduloId) { router.push(`/expansion?m=${moduloId}`); return; }
    if (tipo === "boss") { router.push("/oral"); return; }
    if (tipo === "examen") { router.push("/examen"); return; }
    router.push("/expansion");
  };

  return (
    <div className="rounded-lg border border-zona-competencia/12 p-4 space-y-5 max-h-[520px] overflow-y-auto" style={{ background: "linear-gradient(180deg, rgba(13,15,23,0.7), rgba(8,10,17,0.85))" }}>
      {CAMPAÑA.map((acto) => {
        const completadasActo = acto.misiones.filter((m) => misionesCompletadas.includes(m.id)).length;
        const pctActo = Math.round((completadasActo / acto.misiones.length) * 100);
        return (
          <div key={acto.numero}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-recursos">Acto {acto.numero}: {acto.titulo}</div>
              <span className="font-mono-terminal text-[8px] text-doc-aged/40">{completadasActo}/{acto.misiones.length}</span>
            </div>
            <div className="h-0.5 bg-bg-steel rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pctActo}%`, background: "linear-gradient(90deg, var(--zona-competencia), var(--zona-recursos))" }} />
            </div>
            <div className="space-y-1.5">
              {acto.misiones.map((mision) => {
                const completada = misionesCompletadas.includes(mision.id);
                return (
                  <div key={mision.id} className="flex items-center gap-2 p-2 border rounded" style={{ borderColor: completada ? "rgba(88,245,176,0.25)" : "rgba(75,231,255,0.1)", background: completada ? "rgba(88,245,176,0.03)" : "transparent" }}>
                    <span className="text-sm shrink-0">{TIPO_ICON[mision.tipo] ?? "📌"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display-grave text-xs text-doc-aged truncate">{mision.titulo}</div>
                      <div className="font-mono-terminal text-[7px] text-doc-aged/40 truncate">{mision.descripcion}</div>
                      <div className="font-mono-terminal text-[7px] text-zona-prueba mt-0.5">+{mision.recompensa.xp} XP · 🪙{mision.recompensa.monedas}</div>
                    </div>
                    {completada ? (
                      <span className="text-[10px] text-zona-cautelares shrink-0">✓</span>
                    ) : (
                      <button onClick={() => handleJugar(mision.id, mision.href, mision.moduloId, mision.tipo)} onMouseEnter={() => sfx.hover()} className="shrink-0 text-[8px] font-mono-terminal px-2 py-1 border border-zona-competencia/40 text-zona-competencia hover:border-zona-competencia hover:brightness-125 transition-all">JUGAR</button>
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
