"use client";
import { useState, useEffect } from "react";
import { useGame } from "@/store/useGame";

// ============================================================================
// PRECLUSIÓN — Plazos fatales en tiempo real (1 segundo = 1 día simulado)
// Art. 64 CPC: los plazos del CPC son fatales (salvo excepciones legales).
// ============================================================================

type Plazo = {
  id: string;
  nombre: string;
  diasHabiles: number;
  articulo: string;
  consecuenciaSiPrecluye: string;
};

const PLAZOS_CATALOGO: Plazo[] = [
  { id: "contestacion", nombre: "Contestar demanda", diasHabiles: 15, articulo: "Art. 258 CPC", consecuenciaSiPrecluye: "Rebeldía. Se acusa al demandado y se entiende negada (310). Preclusión del derecho a contestar." },
  { id: "replica", nombre: "Réplica", diasHabiles: 6, articulo: "Art. 311 CPC", consecuenciaSiPrecluye: "Preclusión: pierde la oportunidad de ampliar, adicionar o modificar las acciones." },
  { id: "duplica", nombre: "Dúplica", diasHabiles: 6, articulo: "Art. 312 CPC", consecuenciaSiPrecluye: "Preclusión: pierde la oportunidad de ampliar y aclarar excepciones." },
  { id: "reposicion_319", nombre: "Reposición especial auto de prueba", diasHabiles: 3, articulo: "Art. 319 CPC", consecuenciaSiPrecluye: "Pierde la oportunidad de modificar o eliminar puntos de prueba." },
  { id: "apelacion_definitiva", nombre: "Apelación contra sentencia definitiva", diasHabiles: 10, articulo: "Art. 189 CPC", consecuenciaSiPrecluye: "Sentencia queda firme. Solo queda revisión (810) si concurren causales." },
  { id: "apelacion_interlocutoria", nombre: "Apelación contra interlocutoria", diasHabiles: 5, articulo: "Art. 189 CPC", consecuenciaSiPrecluye: "Interlocutoria queda firme. Imposibilidad de impugnación posterior." },
  { id: "oposicion_ejecutivo", nombre: "Oposición ejecutivo (mismo lugar)", diasHabiles: 4, articulo: "Art. 459 CPC", consecuenciaSiPrecluye: "Se omite sentencia (472): el mandamiento basta y se sigue con el apremio." },
  { id: "casacion", nombre: "Casación (junto a apelación)", diasHabiles: 10, articulo: "Arts. 770, 189 CPC", consecuenciaSiPrecluye: "Pierde casación. Si hubo vicios del 768, ya no procede impugnación." },
];

export default function PreclusionTimer() {
  const game = useGame();
  const [activo, setActivo] = useState<Plazo | null>(null);
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [resultado, setResultado] = useState<"cumplido" | "precluido" | null>(null);

  useEffect(() => {
    if (!activo || segundosRestantes <= 0 || resultado) return;
    const t = setInterval(() => {
      setSegundosRestantes((s) => {
        if (s <= 1) {
          setResultado("precluido");
          game.ajustarTrauma(8);
          game.pushLog(`Preclusión del plazo: ${activo.nombre}. ${activo.consecuenciaSiPrecluye}`, activo.articulo);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [activo, segundosRestantes, resultado, game]);

  function iniciarPlazo(p: Plazo) {
    setActivo(p);
    setSegundosRestantes(p.diasHabiles);
    setResultado(null);
    game.pushLog(`Plazo iniciado: ${p.nombre} (${p.diasHabiles} días).`, p.articulo);
  }

  function presentarEscrito() {
    if (!activo || resultado) return;
    setResultado("cumplido");
    game.ajustarAtributo("diligencia", 1);
    game.ajustarReputacion(3);
    game.pushLog(`Escrito presentado dentro del plazo: ${activo.nombre}.`, activo.articulo);
  }

  const porcentaje = activo ? (segundosRestantes / activo.diasHabiles) * 100 : 0;

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Preclusión — Plazos fatales (art. 64 CPC)</h2>
      <p className="text-doc-aged/60 text-sm">
        Simulación de plazos fatales: 1 segundo = 1 día simulado. Si vencés, la preclusión es irreversible.
        El art. 64 CPC: <i>"los plazos que señala este Código son fatales, cualquiera sea la forma en que se exprese, salvo aquellos establecidos para la realización de actuaciones propias del tribunal."</i>
      </p>

      {!activo && (
        <div className="terminal p-4">
          <div className="label-art text-neon-violet text-sm mb-3">Iniciá un plazo para entrenar</div>
          <div className="grid md:grid-cols-2 gap-2">
            {PLAZOS_CATALOGO.map((p) => (
              <button key={p.id} onClick={() => iniciarPlazo(p)} className="p-3 border border-ink-400 hover:border-neon-blue text-left text-xs">
                <div className="text-zona-competencia">{p.nombre}</div>
                <div className="text-doc-aged/60 mt-1">{p.diasHabiles} días · {p.articulo}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activo && (
        <div className={`terminal p-5 ${segundosRestantes < 3 && !resultado ? "border-neon-red animate-glitch" : ""}`}>
          <div className="tag mb-2">PLAZO ACTIVO · {activo.articulo}</div>
          <h3 className="label-art text-xl text-zona-competencia">{activo.nombre}</h3>
          <p className="text-doc-aged/70 text-xs mt-1">Si precluye: {activo.consecuenciaSiPrecluye}</p>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Días restantes</span>
              <span className={`text-3xl ${segundosRestantes < 3 ? "text-zona-nulidad" : segundosRestantes < activo.diasHabiles / 2 ? "text-neon-amber" : "text-zona-notificaciones"}`}>
                {segundosRestantes}
              </span>
            </div>
            <div className="h-3 bg-ink-700">
              <div
                style={{ width: `${porcentaje}%`, transition: "width 1s linear" }}
                className={`h-full ${porcentaje > 50 ? "bg-neon-blue" : porcentaje > 20 ? "bg-neon-amber" : "bg-neon-red"}`}
              />
            </div>
          </div>

          {!resultado && (
            <div className="mt-4 flex gap-2 flex-wrap">
              <button className="btn" onClick={presentarEscrito}>▸ Presentar escrito ahora</button>
              <button className="btn btn-danger" onClick={() => setActivo(null)}>Abandonar entrenamiento</button>
            </div>
          )}

          {resultado === "cumplido" && (
            <div className="mt-4 p-3 border border-neon-blue text-zona-notificaciones text-xs">
              ✓ Escrito presentado dentro de plazo. +1 diligencia.
              <button className="btn ml-3" onClick={() => setActivo(null)}>▸ Otro plazo</button>
            </div>
          )}
          {resultado === "precluido" && (
            <div className="mt-4 p-3 border border-neon-red text-zona-nulidad text-xs glitch-text">
              ☠ PRECLUSIÓN. {activo.consecuenciaSiPrecluye} El art. 64 CPC cumplió su voluntad.
              <button className="btn btn-danger ml-3" onClick={() => setActivo(null)}>▸ Volver a empezar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
