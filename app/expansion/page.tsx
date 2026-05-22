"use client";
import Link from "next/link";
import { useState } from "react";
import SeleccionBuild from "@/components/SeleccionBuild";
import ExpedienteVivo from "@/components/ExpedienteVivo";
import PreclusionTimer from "@/components/PreclusionTimer";
import InhibitoriaDeclinatoria from "@/components/InhibitoriaDeclinatoria";

type Modulo = "menu" | "build" | "expediente" | "preclusion" | "inhibitoria";

export default function ExpansionHub() {
  const [m, setM] = useState<Modulo>("menu");

  if (m !== "menu") {
    return (
      <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
        <div className="flex justify-between mb-4">
          <button className="btn" onClick={() => setM("menu")}>◂ Hub Expansión</button>
          <Link href="/juego" className="btn">◂ Mapa principal</Link>
        </div>
        {m === "build" && <SeleccionBuild onElegir={() => setM("menu")} />}
        {m === "expediente" && <ExpedienteVivo />}
        {m === "preclusion" && <PreclusionTimer />}
        {m === "inhibitoria" && <InhibitoriaDeclinatoria />}
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <header className="flex justify-between mb-6 flex-wrap gap-2">
        <Link href="/juego" className="btn">◂ Mapa principal</Link>
        <div className="tag tag-violet">HUB EXPANSIÓN v2.0</div>
      </header>

      <h1 className="label-art text-3xl text-neon-blue mb-2">Sistemas avanzados</h1>
      <p className="text-parchment/60 text-sm mb-6">
        Cinco sistemas nuevos para entrenamiento de examen de grado. Integrá con el mapa principal.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <Card t="🎭 Especialización (Build)" d="Elegí una de 6 builds: agresivo, casacional, formalista, cautelar, práctico, doctrinario. Modifica atributos y desbloquea recursos." onClick={() => setM("build")} />
        <Card t="📁 Expediente Vivo" d="Simulación de salud procesal. Cada vicio degrada el expediente. Glitch visual al cruzar el umbral del 768." onClick={() => setM("expediente")} />
        <Card t="⏳ Preclusión real" d="Plazos fatales en tiempo real (1s = 1 día). El art. 64 CPC se hace carne." onClick={() => setM("preclusion")} />
        <Card t="⚖️ Inhibitoria vs Declinatoria" d="Minijuego del CPC 101-112. Identificá medio y tribunal correcto." onClick={() => setM("inhibitoria")} />
        <CardLink t="🎤 Modo Oral (Bosses)" d="Seis arquetipos del examen de grado. Cadenas de preguntas y derivaciones. Daño bidireccional." href="/oral" />
      </div>
    </main>
  );
}

function Card({ t, d, onClick }: { t: string; d: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="terminal p-5 text-left transition hover:bg-neon-blue/5">
      <div className="label-art text-neon-cyan text-lg">{t}</div>
      <p className="text-parchment/70 text-xs mt-2">{d}</p>
    </button>
  );
}

function CardLink({ t, d, href }: { t: string; d: string; href: string }) {
  return (
    <Link href={href} className="terminal p-5 transition hover:bg-neon-blue/5">
      <div className="label-art text-neon-cyan text-lg">{t}</div>
      <p className="text-parchment/70 text-xs mt-2">{d}</p>
    </Link>
  );
}
