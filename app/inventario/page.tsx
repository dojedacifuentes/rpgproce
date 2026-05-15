"use client";
import Link from "next/link";
import { useGame } from "@/store/useGame";

export default function Inventario() {
  const { personaje, expedientesArchivados, cautelares, incidentes, flags, logros, log } = useGame();

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="label-art text-3xl text-neon-blue">📦 Expediente del litigante</h1>
        <Link href="/juego" className="btn">◂ Mapa</Link>
      </div>

      <section className="terminal p-4 mb-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Litigante</div>
        <div className="text-xs space-y-1">
          <div>{personaje.nombre} · {personaje.sexo} · {personaje.rol.replace(/_/g, " ")}</div>
          <div>Origen: {personaje.origen.replace(/_/g, " ")}</div>
          <div>Ciclo procesal: <b>#{personaje.cicloProcesal}</b></div>
          <div>Ganados: <b className="text-neon-blue">{personaje.expedientesGanados}</b> · Perdidos: <b className="text-neon-red">{personaje.expedientesPerdidos}</b></div>
        </div>
      </section>

      <section className="terminal p-4 mb-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Atributos</div>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {(Object.entries(personaje.atributos) as [string, number][]).map(([k, v]) => (
            <div key={k} className="flex justify-between"><span>{k.replace(/_/g, " ")}</span><b className="text-neon-cyan">{v}/10</b></div>
          ))}
        </div>
      </section>

      <section className="terminal p-4 mb-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Cautelares decretadas ({cautelares.length})</div>
        {cautelares.map((m) => (
          <div key={m.id} className="text-xs border-b border-ink-400 py-2 flex justify-between">
            <span><b>{m.clase}</b> · {m.tipo} · {m.bienAfectado}</span>
            <span className="tag tag-violet">{m.articulo}</span>
          </div>
        ))}
        {cautelares.length === 0 && <p className="text-parchment/40 italic text-xs">Sin cautelares.</p>}
      </section>

      <section className="terminal p-4 mb-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Expedientes archivados ({expedientesArchivados.length})</div>
        {expedientesArchivados.map((e) => (
          <div key={e.id} className="text-xs border-b border-ink-400 py-2">
            <b>{e.rol}</b> · {e.materia} · Resultado: <span className={e.resultado === "ganado" ? "text-neon-blue" : "text-neon-red"}>{e.resultado}</span>
          </div>
        ))}
        {expedientesArchivados.length === 0 && <p className="text-parchment/40 italic text-xs">Aún no archivas expedientes.</p>}
      </section>

      <section className="terminal p-4 mb-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Logros ({logros.length})</div>
        {logros.map((l) => (
          <div key={l.id} className="text-xs border-b border-ink-400 py-2">
            <b className="text-neon-cyan">★ {l.titulo}</b> — {l.descripcion}
          </div>
        ))}
        {logros.length === 0 && <p className="text-parchment/40 italic text-xs">Sin logros aún.</p>}
      </section>

      <section className="terminal p-4 mb-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Flags ({flags.length})</div>
        <div className="flex flex-wrap gap-1">
          {flags.map((f) => <span key={f} className="tag">{f}</span>)}
        </div>
      </section>

      <section className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Bitácora ({log.length})</div>
        <div className="max-h-60 overflow-y-auto text-xs text-parchment/70 space-y-1">
          {log.map((l, i) => (
            <div key={i}>› {l.texto} {l.tag && <span className="tag ml-1">{l.tag}</span>}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
