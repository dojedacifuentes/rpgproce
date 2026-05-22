"use client";
import Link from "next/link";
import { useState } from "react";
import SeleccionBuild from "@/components/SeleccionBuild";
import ExpedienteVivo from "@/components/ExpedienteVivo";
import PreclusionTimer from "@/components/PreclusionTimer";
import InhibitoriaDeclinatoria from "@/components/InhibitoriaDeclinatoria";
import ArcadeClasificador from "@/components/ArcadeClasificador";
import AbandonoProcedimiento from "@/components/AbandonoProcedimiento";
import ComparecenciaPanel from "@/components/ComparecenciaPanel";

type Modulo = "menu" | "build" | "expediente" | "preclusion" | "inhibitoria" | "arcade" | "abandono" | "comparecencia";

const MODULOS: { id: Modulo; titulo: string; subtitulo: string; descripcion: string; zona: string; numeral: string }[] = [
  { id: "arcade", titulo: "Arcade Clasificador", subtitulo: "MODO RAPIDO · COMBO", descripcion: "Resoluciones · recursos · excepciones · competencia · notificaciones · ejecutivo. Velocidad creciente. Combo multiplicador. Ranking S-A-B-C-D.", zona: "ejecutivo", numeral: "ARC.01" },
  { id: "expediente", titulo: "Expediente Vivo", subtitulo: "SALUD PROCESAL", descripcion: "El expediente se degrada con cada vicio. Glitch progresivo según el daño. Si llega a 0: nulidad latente del 768 N°9.", zona: "nulidad", numeral: "INST.04" },
  { id: "preclusion", titulo: "Preclusión Real", subtitulo: "PLAZOS FATALES", descripcion: "Timer en tiempo real. Si vencés el plazo, la preclusión es irreversible. Art. 64 CPC en su versión más cruel.", zona: "ejecutivo", numeral: "INST.06" },
  { id: "inhibitoria", titulo: "Inhibitoria vs Declinatoria", subtitulo: "CUESTIONES DE COMPETENCIA", descripcion: "Identificá medio + tribunal correcto. Arts. 101-112 CPC. Los conflictos suspenden el principal (art. 112).", zona: "competencia", numeral: "INST.01" },
  { id: "abandono", titulo: "Abandono del Procedimiento", subtitulo: "TIMER DE 6 MESES", descripcion: "Mantené el expediente vivo. Solo gestiones útiles interrumpen el plazo. Las administrativas no sirven. Art. 152 CPC.", zona: "incidentes", numeral: "INST.18" },
  { id: "comparecencia", titulo: "Comparecencia", subtitulo: "PATROCINIO · LEY 18.120", descripcion: "Validá los 7 requisitos del primer escrito. La secretaria tribunalicia rechaza con humor seco. Olvidar patrocinio = humillación inmediata.", zona: "incidentes", numeral: "INST.19" },
  { id: "build", titulo: "Especialización", subtitulo: "BUILD · 6 CLASES", descripcion: "Litigante agresivo · monstruo casacional · formalista extremo · estratega cautelar · operador práctico · doctrinario.", zona: "recursos", numeral: "RPG.01" },
];

export default function ExpansionHub() {
  const [m, setM] = useState<Modulo>("menu");

  if (m !== "menu") {
    return (
      <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <button className="btn" onClick={() => setM("menu")}>◂ Hub Expansión</button>
          <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
        </div>
        {m === "arcade" && <ArcadeClasificador />}
        {m === "expediente" && <ExpedienteVivo />}
        {m === "preclusion" && <PreclusionTimer />}
        {m === "inhibitoria" && <InhibitoriaDeclinatoria />}
        {m === "abandono" && <AbandonoProcedimiento />}
        {m === "comparecencia" && <ComparecenciaPanel />}
        {m === "build" && <SeleccionBuild onElegir={() => setM("menu")} />}
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
      <header className="flex justify-between mb-8 flex-wrap gap-2">
        <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos">
          HUB EXPANSIÓN v3.0 · SISTEMAS AVANZADOS
        </div>
      </header>

      <div className="mb-8">
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-recursos mb-2">SUBSISTEMAS</div>
        <h1 className="font-display-grave text-4xl md:text-5xl text-doc-aged mb-3">Arquitectura Avanzada</h1>
        <p className="text-doc-aged/60 text-sm font-mono-terminal max-w-2xl">
          Siete sistemas modulares para entrenamiento de examen de grado. Cada uno simula una institución del Derecho Procesal chileno con mecánicas propias.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {MODULOS.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setM(mod.id)}
            className="zona-card p-5 text-left"
            style={{ "--zona-color": `var(--zona-${mod.zona})` } as React.CSSProperties}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-display-grave text-3xl opacity-40" style={{ color: `var(--zona-${mod.zona})` }}>
                {mod.numeral.split(".")[0]}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono-terminal opacity-50" style={{ color: `var(--zona-${mod.zona})` }}>
                {mod.numeral}
              </span>
            </div>
            <h3 className="font-display-grave text-lg text-doc-aged tracking-wider mb-1">{mod.titulo}</h3>
            <div className="text-[10px] uppercase tracking-widest font-mono-terminal mb-2" style={{ color: `var(--zona-${mod.zona})` }}>
              {mod.subtitulo}
            </div>
            <p className="text-doc-aged/55 text-xs leading-relaxed font-mono-terminal">{mod.descripcion}</p>
          </button>
        ))}

        {/* CTA al Modo Oral */}
        <Link
          href="/oral"
          className="zona-card p-5 text-left block"
          style={{ "--zona-color": "var(--zona-oralidad)" } as React.CSSProperties}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-display-grave text-3xl opacity-40 text-zona-oralidad">XX</span>
            <span className="text-[9px] uppercase tracking-widest font-mono-terminal opacity-50 text-zona-oralidad">
              INST.20
            </span>
          </div>
          <h3 className="font-display-grave text-lg text-doc-aged tracking-wider mb-1">Modo Oral</h3>
          <div className="text-[10px] uppercase tracking-widest font-mono-terminal text-zona-oralidad mb-2">
            BOSSES · 6 INSTANCIAS
          </div>
          <p className="text-doc-aged/55 text-xs leading-relaxed font-mono-terminal">
            Anfiteatro judicial. Comisión examinadora con cadenas de derivación. Ataques: directo / puente / trampa / repregunta.
          </p>
        </Link>
      </div>
    </main>
  );
}
