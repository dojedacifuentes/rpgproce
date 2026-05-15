"use client";
import Link from "next/link";
import { useGame } from "@/store/useGame";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Mundo } from "@/types/game";

const MAPA: { id: Mundo; titulo: string; subt: string }[] = [
  { id: "jurisdiccion", titulo: "I · Jurisdicción", subt: "Art. 76 CPR / 1 COT. Características esenciales." },
  { id: "competencia", titulo: "II · Competencia", subt: "Absoluta y relativa. Factores. Arts. 45-148 COT." },
  { id: "accion_pretension", titulo: "III · Acción y pretensión", subt: "Elementos. Clasificación. Doctrina." },
  { id: "demanda", titulo: "IV · La demanda", subt: "Art. 254 CPC. Requisitos formales." },
  { id: "emplazamiento", titulo: "V · Emplazamiento", subt: "Notificaciones (40-54) y plazos (258-259)." },
  { id: "discusion", titulo: "VI · Discusión", subt: "Demanda → contestación → réplica → dúplica. Reconvención." },
  { id: "conciliacion", titulo: "VII · Conciliación", subt: "Llamado obligatorio (art. 262 CPC)." },
  { id: "prueba", titulo: "VIII · Prueba", subt: "Auto de prueba (318), medios (341-427), término (328-339)." },
  { id: "sentencia", titulo: "IX · Sentencia", subt: "Art. 158 CPC. Citación a oír sentencia (432). Requisitos del 170." },
  { id: "recursos", titulo: "X · Recursos", subt: "Cuadro completo: 181, 182, 187, 188, 196, 203, 766, 767, 810, 545 COT." },
  { id: "juicio_ejecutivo", titulo: "XI · Juicio ejecutivo", subt: "Arts. 434-478 CPC. Cuadernos y excepciones del 464." },
  { id: "cautelares", titulo: "XII · Cautelares", subt: "Prejudiciales y precautorias (arts. 273-302)." },
  { id: "examen", titulo: "XIII · Modo Examen", subt: "Cédula tipo grado con explicación normativa." },
];

export default function Juego() {
  const router = useRouter();
  const { personaje, log, expedientesArchivados, cautelares, finalizado, logros } = useGame();

  useEffect(() => {
    if (!personaje.nombre) router.replace("/creacion");
  }, [personaje.nombre, router]);

  if (!personaje.nombre) return null;

  return (
    <main className="min-h-screen px-6 py-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <div className="tag mb-2">EXPEDIENTE ABIERTO · CICLO {personaje.cicloProcesal}</div>
          <h1 className="label-art text-2xl text-neon-blue">{personaje.nombre}</h1>
          <p className="text-parchment/60 text-xs uppercase tracking-widest">
            {personaje.rol.replace(/_/g, " ")} · {personaje.origen.replace(/_/g, " ")} · ganados {personaje.expedientesGanados} · perdidos {personaje.expedientesPerdidos}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/codex" className="btn">📜 Codex</Link>
          <Link href="/inventario" className="btn">📦 Expediente</Link>
          {finalizado && <Link href="/epilogo" className="btn">📜 Epílogo</Link>}
          <Link href="/" className="btn btn-danger">⏻ Salir</Link>
        </div>
      </header>

      <section className="grid lg:grid-cols-3 gap-4 mb-6">
        <Stat label="Reputación forense" value={personaje.reputacion} min={-100} max={100} color="violet" />
        <Stat label="Trauma procesal" value={personaje.trauma} min={0} max={100} color="red" />
        <Stat label="Nivel económico" value={personaje.nivelEconomico} min={0} max={100} color="blue" />
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-8">
        {MAPA.map((m) => (
          <motion.div key={m.id} whileHover={{ y: -2 }}>
            <Link href={`/mundo/${m.id}`} className="block terminal p-5">
              <div className="label-art text-neon-cyan text-lg">{m.titulo}</div>
              <div className="text-parchment/60 text-xs mt-1">{m.subt}</div>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="terminal p-4 mb-8">
        <div className="label-art text-neon-violet text-sm mb-2">Registro del expediente</div>
        <div className="max-h-40 overflow-y-auto text-xs text-parchment/70 space-y-1">
          {log.length === 0 && <div className="italic text-parchment/40">Sin actuaciones. La lluvia jurídica espera.</div>}
          {log.map((l, i) => (
            <div key={i}>
              <span className="text-neon-blue">›</span> {l.texto}
              {l.tag && <span className="ml-2 tag">{l.tag}</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-3 text-xs">
        <div className="terminal p-3"><b className="text-neon-cyan">{expedientesArchivados.length}</b> expedientes archivados</div>
        <div className="terminal p-3"><b className="text-neon-cyan">{cautelares.length}</b> cautelares decretadas</div>
        <div className="terminal p-3"><b className="text-neon-cyan">{logros.length}</b> logros</div>
      </section>
    </main>
  );
}

function Stat({ label, value, min, max, color }: { label: string; value: number; min: number; max: number; color: "violet" | "red" | "blue" }) {
  const pct = ((value - min) / (max - min)) * 100;
  const c = color === "violet" ? "bg-neon-violet" : color === "red" ? "bg-neon-red" : "bg-neon-blue";
  return (
    <div className="terminal p-4">
      <div className="flex justify-between text-xs uppercase tracking-widest mb-2">
        <span>{label}</span><span className="text-parchment/70">{value}</span>
      </div>
      <div className="h-2 bg-ink-700">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className={`h-full ${c}`} />
      </div>
    </div>
  );
}
