"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/store/useGame";
import type { Atributos, Origen, Rol } from "@/types/game";
import { motion } from "framer-motion";

const ORIGEN: { id: Origen; nombre: string; desc: string; mod: Partial<Atributos>; nivel: number }[] = [
  { id: "litigante_freelancer", nombre: "Litigante freelance", desc: "Estudio unipersonal, café reusado, plazos vividos al filo.", mod: { diligencia: 2, resistencia_psicologica: 1 }, nivel: 35 },
  { id: "estudio_grande", nombre: "Estudio grande", desc: "Pasillos alfombrados. Costo-hora alto. Pleitos serios.", mod: { rigor_formal: 2, estrategia: 1 }, nivel: 90 },
  { id: "defensoria_publica", nombre: "Defensoría / clínica jurídica", desc: "Causas sociales, recursos limitados, vocación.", mod: { persuasion_forense: 1, resistencia_psicologica: 2 }, nivel: 25 },
  { id: "academia", nombre: "Académico forense", desc: "Couture en una mano, Cassarino en la otra.", mod: { conocimiento_procesal: 3 }, nivel: 45 },
  { id: "litigante_propia_causa", nombre: "Litigante en causa propia", desc: "El que más sufre. El que menos sabe.", mod: { resistencia_psicologica: -1, conocimiento_procesal: -1, persuasion_forense: 1 }, nivel: 30 },
];

const ROL: { id: Rol; nombre: string; mod: Partial<Atributos> }[] = [
  { id: "abogado_demandante", nombre: "Abogado/a demandante", mod: { estrategia: 2, persuasion_forense: 1 } },
  { id: "abogado_demandado", nombre: "Abogado/a demandado/a", mod: { rigor_formal: 2, diligencia: 1 } },
  { id: "juez", nombre: "Juez/a (rol pedagógico)", mod: { conocimiento_procesal: 2, rigor_formal: 1 } },
  { id: "secretario", nombre: "Secretario/a del tribunal", mod: { rigor_formal: 3 } },
  { id: "litigante_propio", nombre: "Litigante por sí mismo (art. 2 Ley 18.120)", mod: { resistencia_psicologica: -1 } },
];

export default function Creacion() {
  const router = useRouter();
  const setPersonaje = useGame((s) => s.setPersonaje);
  const reset = useGame((s) => s.reset);

  const [nombre, setNombre] = useState("");
  const [sexo, setSexo] = useState<"femenino" | "masculino">("femenino");
  const [origen, setOrigen] = useState<Origen>("litigante_freelancer");
  const [rol, setRol] = useState<Rol>("abogado_demandante");

  function aplicarMods(): Atributos {
    const base: Atributos = {
      conocimiento_procesal: 5, persuasion_forense: 5, diligencia: 5,
      rigor_formal: 5, estrategia: 5, resistencia_psicologica: 5,
    };
    const o = ORIGEN.find((x) => x.id === origen)!.mod;
    const r = ROL.find((x) => x.id === rol)!.mod;
    (Object.keys(base) as (keyof Atributos)[]).forEach((k) => {
      base[k] = Math.max(0, Math.min(10, base[k] + (o[k] ?? 0) + (r[k] ?? 0)));
    });
    return base;
  }

  function comenzar() {
    if (!nombre.trim()) return;
    reset();
    setPersonaje({
      nombre: nombre.trim(),
      sexo,
      origen,
      rol,
      nivelEconomico: ORIGEN.find((x) => x.id === origen)!.nivel,
      atributos: aplicarMods(),
      reputacion: 0,
      trauma: 0,
      expedientesGanados: 0,
      expedientesPerdidos: 0,
      cicloProcesal: 1,
    });
    router.push("/juego");
  }

  const atributos = aplicarMods();

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-recursos mb-3">FOLIO 01 · INSCRIPCIÓN EN EL REGISTRO DE LITIGANTES</div>
      <h1 className="font-display-grave text-4xl text-doc-aged mb-2">Constituye tu personaje procesal</h1>
      <p className="text-doc-aged/50 text-xs font-serif-juridica italic mb-6">«Toda comparecencia exige patrocinio, poder y voluntad de sufrir.»</p>

      <section className="terminal p-6 mb-6">
        <label className="text-xs uppercase tracking-widest text-neon-cyan">Nombre del comparecente</label>
        <input autoFocus value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Apellido, Nombre"
          className="mt-2 w-full bg-ink-700 border border-neon-blue/30 text-parchment p-3 focus:outline-none focus:border-neon-blue" />
      </section>

      <section className="terminal p-5 mb-6">
        <label className="text-xs uppercase tracking-widest text-neon-cyan block mb-3">Sexo</label>
        <div className="grid grid-cols-2 gap-3">
          {(["femenino", "masculino"] as const).map((s) => (
            <button key={s} onClick={() => setSexo(s)} className={`p-3 border ${sexo === s ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-ink-400"} uppercase tracking-widest text-sm`}>{s}</button>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="terminal p-5">
          <h2 className="label-art text-neon-violet mb-3">Origen profesional</h2>
          <div className="space-y-2">
            {ORIGEN.map((o) => (
              <button key={o.id} onClick={() => setOrigen(o.id)} className={`w-full text-left p-3 border ${origen === o.id ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
                <div className="text-neon-blue text-sm">{o.nombre}</div>
                <div className="text-parchment/60 text-xs">{o.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="terminal p-5">
          <h2 className="label-art text-neon-violet mb-3">Rol procesal</h2>
          <div className="space-y-2">
            {ROL.map((r) => (
              <button key={r.id} onClick={() => setRol(r.id)} className={`w-full text-left p-3 border ${rol === r.id ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
                <div className="text-neon-blue text-sm">{r.nombre}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="terminal p-5 mt-6">
        <h2 className="label-art text-neon-cyan mb-3">Atributos resultantes</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.entries(atributos) as [keyof Atributos, number][]).map(([k, v]) => (
            <div key={k} className="border border-ink-400 p-3">
              <div className="text-xs uppercase tracking-widest text-parchment/70">{k.replace(/_/g, " ")}</div>
              <div className="h-2 bg-ink-700 mt-2">
                <motion.div initial={{ width: 0 }} animate={{ width: `${v * 10}%` }} transition={{ duration: .8 }} className="h-full barfill" />
              </div>
              <div className="text-neon-blue text-right text-xs mt-1">{v}/10</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 flex gap-3">
        <button onClick={comenzar} disabled={!nombre.trim()} className="btn disabled:opacity-30">▶ Firmar y comenzar</button>
      </div>
    </main>
  );
}
