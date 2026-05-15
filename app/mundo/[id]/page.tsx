"use client";
import { useParams, useRouter } from "next/navigation";
import { ESCENAS } from "@/data/dialogos";
import DialogoEscena from "@/components/DialogoEscena";
import Link from "next/link";
import type { Mundo } from "@/types/game";
import { useState } from "react";

import CompetenciaPanel from "@/components/CompetenciaPanel";
import DemandaPanel from "@/components/DemandaPanel";
import EmplazamientoPanel from "@/components/EmplazamientoPanel";
import DiscusionPanel from "@/components/DiscusionPanel";
import PruebaPanel from "@/components/PruebaPanel";
import ClasificadorRecursos from "@/components/ClasificadorRecursos";
import EjecutivoPanel from "@/components/EjecutivoPanel";
import CautelaresPanel from "@/components/CautelaresPanel";
import { useGame } from "@/store/useGame";

export default function MundoPage() {
  const { id } = useParams<{ id: string }>();
  const mundo = id as Mundo;
  const router = useRouter();
  const game = useGame();
  const [escenaIdx, setEscenaIdx] = useState(0);

  const escenasMundo: Record<Mundo, string[]> = {
    jurisdiccion: ["jurisdiccion_intro"],
    competencia: ["competencia_intro"],
    accion_pretension: [],
    demanda: ["demanda_intro"],
    emplazamiento: ["emplazamiento_intro"],
    discusion: ["discusion_replica"],
    conciliacion: [],
    prueba: ["auto_prueba"],
    sentencia: ["sentencia_lectura"],
    recursos: ["recursos_intro"],
    juicio_ejecutivo: ["ejecutivo_intro"],
    cautelares: [],
    examen: [],
  };

  const lista = escenasMundo[mundo] || [];
  const todasLasEscenasVistas = escenaIdx >= lista.length;

  return (
    <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <Link href="/juego" className="btn">◂ Volver al mapa</Link>
        <div className="tag">{mundo.toUpperCase().replace(/_/g, " ")}</div>
      </header>

      {!todasLasEscenasVistas && lista[escenaIdx] && ESCENAS[lista[escenaIdx]] && (
        <DialogoEscena key={lista[escenaIdx]} escena={ESCENAS[lista[escenaIdx]]} onFin={() => setEscenaIdx((i) => i + 1)} />
      )}

      {todasLasEscenasVistas && (
        <div className="space-y-6">
          {mundo === "jurisdiccion" && (
            <CaracteristicasJurisdiccion />
          )}
          {mundo === "competencia" && <CompetenciaPanel />}
          {mundo === "accion_pretension" && <AccionPretension />}
          {mundo === "demanda" && <DemandaPanel />}
          {mundo === "emplazamiento" && <EmplazamientoPanel />}
          {mundo === "discusion" && <DiscusionPanel />}
          {mundo === "conciliacion" && <ConciliacionInfo />}
          {mundo === "prueba" && <PruebaPanel />}
          {mundo === "sentencia" && <SentenciaInfo onCerrar={() => router.push("/mundo/recursos")} />}
          {mundo === "recursos" && <ClasificadorRecursos />}
          {mundo === "juicio_ejecutivo" && <EjecutivoPanel />}
          {mundo === "cautelares" && <CautelaresPanel />}
          {mundo === "examen" && <RedireccionExamen onGo={() => router.push("/examen")} />}
        </div>
      )}
    </main>
  );
}

function CaracteristicasJurisdiccion() {
  const features = [
    { n: "Función pública", a: "Art. 76 CPR / 1 COT", d: "Emana del Estado y se ejerce en su nombre." },
    { n: "Privativa o exclusiva", a: "Art. 76 CPR", d: "Solo tribunales establecidos por la ley." },
    { n: "Indelegable", a: "Art. 7 CPR / 35 COT", d: "No se delega; sí puede comisionar diligencias específicas." },
    { n: "Inavocable", a: "Art. 8 COT", d: "Un tribunal no puede tomar causa pendiente ante otro." },
    { n: "Improrrogable absoluta", a: "Art. 182 COT a contrario", d: "La competencia absoluta es de orden público." },
    { n: "Una en su esencia", a: "Doctrina (Couture, Hoyos)", d: "Es única; se distribuye la competencia, no la jurisdicción." },
    { n: "Territorial", a: "Art. 5 COT", d: "Se ejerce en el territorio de la República." },
  ];
  return (
    <div className="space-y-3">
      <h2 className="label-art text-neon-blue text-xl">Características de la jurisdicción</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {features.map((f) => (
          <div key={f.n} className="terminal p-4">
            <div className="label-art text-neon-cyan">{f.n}</div>
            <div className="tag tag-violet mt-1">{f.a}</div>
            <p className="text-parchment/70 text-xs mt-2">{f.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccionPretension() {
  return (
    <div className="terminal p-6">
      <h2 className="label-art text-neon-blue text-xl mb-3">Acción y pretensión (doctrinario)</h2>
      <ul className="text-sm text-parchment/80 space-y-2">
        <li><b className="text-neon-cyan">Acción</b>: facultad de provocar la actividad jurisdiccional del Estado. Es un derecho autónomo, abstracto y subjetivo público. Couture, Goldschmidt, Carnelutti.</li>
        <li><b className="text-neon-cyan">Pretensión</b>: declaración de voluntad por la cual se reclama del órgano jurisdiccional, frente a persona distinta, la resolución de un conflicto. Elementos: sujetos (actor, demandado), objeto (petitum) y causa (causa petendi).</li>
        <li><b className="text-neon-cyan">Distinción</b>: la acción se dirige al tribunal; la pretensión, contra el demandado. La acción existe aun sin razón; la pretensión, sin razón, fracasa.</li>
      </ul>
    </div>
  );
}

function ConciliacionInfo() {
  return (
    <div className="terminal p-6">
      <h2 className="label-art text-neon-blue text-xl mb-3">Conciliación obligatoria (arts. 262-268 CPC)</h2>
      <p className="text-parchment/80 text-sm">
        Agotados los trámites de discusión, el juez llamará a las partes a conciliación, salvo en los casos del art. 313 inc. 1° y los juicios o procedimientos especiales señalados (juicio ejecutivo, hacienda, etc.). El acta de conciliación total o parcial se tiene como sentencia ejecutoriada (art. 267).
      </p>
    </div>
  );
}

function SentenciaInfo({ onCerrar }: { onCerrar: () => void }) {
  return (
    <div className="terminal p-6">
      <h2 className="label-art text-neon-blue text-xl mb-3">Sentencia definitiva (arts. 158, 162, 170, 432 CPC)</h2>
      <ul className="text-sm text-parchment/80 space-y-2 mb-4">
        <li>• <b className="text-neon-cyan">Citación a oír sentencia</b> (432): tras observaciones a la prueba.</li>
        <li>• <b className="text-neon-cyan">Plazo para sentenciar</b>: 60 días contados desde que la causa queda en estado de fallo (162).</li>
        <li>• <b className="text-neon-cyan">Requisitos formales</b> (170 + Auto Acordado 1920): partes, demanda y excepciones, hechos no controvertidos, hechos controvertidos, fundamentos de derecho, citas legales, resolución del asunto.</li>
        <li>• <b className="text-neon-cyan">Casación en la forma</b>: art. 768 enumera las causales (omisión del 170, ultra petita, cosa juzgada, etc.).</li>
      </ul>
      <button className="btn" onClick={onCerrar}>▸ Revisar recursos procedentes</button>
    </div>
  );
}

function RedireccionExamen({ onGo }: { onGo: () => void }) {
  return (
    <div className="terminal p-6">
      <h2 className="label-art text-neon-blue text-xl mb-3">Modo Examen — Cédula procesal</h2>
      <p className="text-parchment/80 text-sm mb-4">20 preguntas tipo cédula sobre los contenidos del juego con explicación normativa de cada respuesta.</p>
      <button className="btn" onClick={onGo}>▸ Iniciar cédula</button>
    </div>
  );
}
