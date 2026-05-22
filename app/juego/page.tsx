"use client";
import Link from "next/link";
import { useGame } from "@/store/useGame";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Mundo } from "@/types/game";

type ZonaColor = "competencia" | "recursos" | "nulidad" | "ejecutivo" | "prueba" | "oralidad" | "cautelares" | "cosajuzgada" | "notificaciones" | "incidentes";

const MAPA: { id: Mundo; titulo: string; subt: string; zona: ZonaColor; numeral: string; etimo: string }[] = [
  { id: "jurisdiccion", titulo: "JURISDICCIÓN", subt: "El Estado se concentra en un tribunal. Características esenciales.", zona: "cosajuzgada", numeral: "I", etimo: "Art. 76 CPR · 1 COT" },
  { id: "competencia", titulo: "COMPETENCIA", subt: "Absoluta y relativa. Materia, fuero, cuantía, territorio. Inhibitoria vs declinatoria.", zona: "competencia", numeral: "II", etimo: "Arts. 45-148, 101-112 COT/CPC" },
  { id: "accion_pretension", titulo: "ACCIÓN & PRETENSIÓN", subt: "Couture vs Carnelutti. Doctrina pura.", zona: "cosajuzgada", numeral: "III", etimo: "Doctrinario" },
  { id: "demanda", titulo: "DEMANDA", subt: "Requisitos del art. 254. Ineptitud del libelo 303 N°4.", zona: "competencia", numeral: "IV", etimo: "Art. 254 CPC" },
  { id: "emplazamiento", titulo: "EMPLAZAMIENTO", subt: "Notificación + plazo. Trámite esencial 795 N°1.", zona: "notificaciones", numeral: "V", etimo: "Arts. 40-54, 258-259" },
  { id: "discusion", titulo: "DISCUSIÓN", subt: "Demanda → dilatorias → réplica → dúplica → reconvención.", zona: "incidentes", numeral: "VI", etimo: "Arts. 254-318 CPC" },
  { id: "conciliacion", titulo: "CONCILIACIÓN", subt: "Llamado obligatorio del 262. Acta vale sentencia ejecutoriada.", zona: "prueba", numeral: "VII", etimo: "Arts. 262-268 CPC" },
  { id: "prueba", titulo: "PRUEBA", subt: "Auto 318, medios 341-427, observaciones 430.", zona: "prueba", numeral: "VIII", etimo: "Arts. 318-433 CPC" },
  { id: "sentencia", titulo: "SENTENCIA", subt: "158, 162, 170. Citación 432. Plazo 60 días.", zona: "cosajuzgada", numeral: "IX", etimo: "Arts. 158, 162, 170, 432" },
  { id: "recursos", titulo: "RECURSOS", subt: "181, 182, 187, 188, 196, 203, 766, 767, 810 + 545 COT.", zona: "recursos", numeral: "X", etimo: "Libro III CPC + 545 COT" },
  { id: "juicio_ejecutivo", titulo: "JUICIO EJECUTIVO", subt: "Coerción. Cuadernos. Excepciones tasadas del 464.", zona: "ejecutivo", numeral: "XI", etimo: "Arts. 434-478 CPC" },
  { id: "cautelares", titulo: "CAUTELARES", subt: "Prejudiciales + precautorias. Innominadas 298 inc. 2°.", zona: "cautelares", numeral: "XII", etimo: "Arts. 273-302 CPC" },
  { id: "examen", titulo: "CÉDULA FINAL", subt: "Examen oral simulado. Comisión examinadora.", zona: "oralidad", numeral: "XIII", etimo: "Modo Examen" },
];

export default function Juego() {
  const router = useRouter();
  const { personaje, log, expedientesArchivados, cautelares, finalizado, logros } = useGame();

  useEffect(() => {
    if (!personaje.nombre) router.replace("/creacion");
  }, [personaje.nombre, router]);

  if (!personaje.nombre) return null;

  return (
    <main className="min-h-screen px-4 md:px-8 py-6 max-w-7xl mx-auto">
      {/* HEADER con identidad de litigante */}
      <header className="mb-8">
        <div className="flex justify-between items-start flex-wrap gap-4 pb-5 border-b border-zona-competencia/15">
          <div className="flex items-start gap-4">
            <Avatar nombre={personaje.nombre} ciclo={personaje.cicloProcesal} />
            <div>
              <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos">
                FOLIO ACTIVO · CICLO PROCESAL {personaje.cicloProcesal}
              </div>
              <h1 className="font-display-grave text-2xl md:text-3xl text-doc-aged mt-1">{personaje.nombre}</h1>
              <p className="text-doc-aged/50 text-[11px] font-mono-terminal mt-1 uppercase tracking-widest">
                {personaje.rol.replace(/_/g, " ")} · {personaje.origen.replace(/_/g, " ")}
                <span className="mx-2 text-zona-cautelares">●</span>
                <span className="text-zona-cautelares">{personaje.expedientesGanados} ganados</span>
                <span className="mx-2 text-zona-nulidad">●</span>
                <span className="text-zona-nulidad">{personaje.expedientesPerdidos} perdidos</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <Link href="/expansion" className="btn btn-recurso">★ Expansión</Link>
            <Link href="/oral" className="btn btn-oral">⚖ Bosses</Link>
            <Link href="/codex" className="btn">📜 Codex</Link>
            <Link href="/inventario" className="btn">📦 Expediente</Link>
            {finalizado && <Link href="/epilogo" className="btn">Epílogo</Link>}
            <Link href="/" className="btn btn-danger">⏻ Salir</Link>
          </div>
        </div>
      </header>

      {/* STATS — diseño telemetría */}
      <section className="grid md:grid-cols-4 gap-3 mb-10">
        <Telemetria label="Reputación forense" value={personaje.reputacion} min={-100} max={100} zona="recursos" />
        <Telemetria label="Trauma procesal" value={personaje.trauma} min={0} max={100} zona="nulidad" />
        <Telemetria label="Nivel económico" value={personaje.nivelEconomico} min={0} max={100} zona="prueba" />
        <Telemetria label="Logros" value={logros.length} min={0} max={20} zona="cautelares" raw />
      </section>

      {/* MAPA — las instituciones como zonas */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-display-grave text-xl text-doc-aged tracking-wider">CIUDAD JUDICIAL · 13 ZONAS</h2>
          <span className="text-[10px] uppercase tracking-widest text-doc-aged/40 font-mono-terminal">
            haz click para entrar
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {MAPA.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Link href={`/mundo/${m.id}`} className="block zona-card p-5" style={{ "--zona-color": `var(--zona-${m.zona})` } as React.CSSProperties}>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-display-grave text-3xl opacity-50" style={{ color: `var(--zona-${m.zona})` }}>{m.numeral}</span>
                  <span className="text-[9px] uppercase tracking-widest font-mono-terminal opacity-50" style={{ color: `var(--zona-${m.zona})` }}>
                    {m.etimo}
                  </span>
                </div>
                <h3 className="font-display-grave text-base text-doc-aged tracking-wider mb-1">{m.titulo}</h3>
                <p className="text-doc-aged/55 text-xs leading-relaxed font-mono-terminal">{m.subt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOG */}
      <section className="terminal p-4 mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="font-display-grave text-sm text-zona-recursos tracking-widest">REGISTRO DEL EXPEDIENTE</div>
          <div className="text-[10px] font-mono-terminal text-doc-aged/40 uppercase">{log.length} actuaciones</div>
        </div>
        <div className="max-h-44 overflow-y-auto text-xs text-doc-aged/70 space-y-1 font-mono-terminal">
          {log.length === 0 && <div className="italic text-doc-aged/30">Sin actuaciones. La lluvia jurídica espera.</div>}
          {log.map((l, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-zona-competencia">›</span>
              <span className="flex-1">{l.texto}</span>
              {l.tag && <span className="tag tag-recursos text-[9px]">{l.tag}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* contadores */}
      <section className="grid md:grid-cols-3 gap-3 text-xs">
        <Contador icon="📁" label="Expedientes archivados" value={expedientesArchivados.length} zona="cosajuzgada" />
        <Contador icon="⚖" label="Cautelares decretadas" value={cautelares.length} zona="cautelares" />
        <Contador icon="★" label="Logros desbloqueados" value={logros.length} zona="recursos" />
      </section>
    </main>
  );
}

function Avatar({ nombre, ciclo }: { nombre: string; ciclo: number }) {
  const inicial = (nombre || "?").charAt(0).toUpperCase();
  return (
    <div className="relative w-14 h-14 shrink-0">
      <div className="absolute inset-0 border border-zona-competencia/40 rotate-45 bg-bg-file/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display-grave text-2xl text-zona-competencia">{inicial}</span>
      </div>
      <div className="absolute -bottom-1 -right-1 bg-bg-deep border border-zona-recursos/50 text-zona-recursos text-[9px] px-1 font-mono-terminal">
        C{ciclo}
      </div>
    </div>
  );
}

function Telemetria({ label, value, min, max, zona, raw }: { label: string; value: number; min: number; max: number; zona: ZonaColor; raw?: boolean }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="zona-card p-3" style={{ "--zona-color": `var(--zona-${zona})` } as React.CSSProperties}>
      <div className="flex justify-between text-[10px] uppercase tracking-widest font-mono-terminal mb-2">
        <span className="text-doc-aged/60">{label}</span>
        <span style={{ color: `var(--zona-${zona})` }}>{raw ? value : value}</span>
      </div>
      <div className="h-1.5 bg-bg-deep border border-bg-steel/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
          transition={{ duration: 0.8 }}
          className="h-full"
          style={{ background: `linear-gradient(90deg, var(--zona-${zona}), color-mix(in srgb, var(--zona-${zona}) 50%, white))` }}
        />
      </div>
    </div>
  );
}

function Contador({ icon, label, value, zona }: { icon: string; label: string; value: number; zona: ZonaColor }) {
  return (
    <div className="zona-card p-4 flex items-center gap-3" style={{ "--zona-color": `var(--zona-${zona})` } as React.CSSProperties}>
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-display-grave text-2xl" style={{ color: `var(--zona-${zona})` }}>{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-doc-aged/50 font-mono-terminal">{label}</div>
      </div>
    </div>
  );
}
