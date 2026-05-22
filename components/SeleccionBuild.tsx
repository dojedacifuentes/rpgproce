"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { BUILDS } from "@/lib/builds";
import type { Build } from "@/types/expansion";

export default function SeleccionBuild({ onElegir }: { onElegir?: (b: Build) => void }) {
  const game = useGame();
  const [seleccionada, setSeleccionada] = useState<Build | null>(null);

  function confirmar() {
    if (!seleccionada) return;
    const b = BUILDS[seleccionada];
    // Aplica modificadores
    (Object.entries(b.modificadores) as [keyof typeof game.personaje.atributos, number][]).forEach(([k, v]) =>
      game.ajustarAtributo(k, v)
    );
    game.setFlag(`build_${seleccionada}`);
    game.pushLog(`Adoptaste la build "${b.nombre}".`, "BUILD");
    game.desbloquearLogro({ id: `build_${seleccionada}`, titulo: `Build: ${b.nombre}`, descripcion: b.ventajaPasiva, articulo: "—", desbloqueado: true });
    onElegir?.(seleccionada);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-neon-blue text-xl">Especialización procesal (build)</h2>
      <p className="text-parchment/60 text-sm">
        Definí tu estilo. Modifica tus atributos, desbloquea recursos especiales y altera la dificultad. Una sola por personaje.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(BUILDS).map((b) => (
          <button
            key={b.id}
            onClick={() => setSeleccionada(b.id)}
            className={`terminal p-5 text-left transition ${seleccionada === b.id ? "border-neon-blue bg-neon-blue/5" : "hover:bg-neon-blue/3"}`}
          >
            <div className="label-art text-neon-cyan text-lg">{b.nombre}</div>
            <p className="text-parchment/70 text-xs italic mt-2">{b.descripcion}</p>

            <div className="mt-3 text-[10px] grid grid-cols-3 gap-1">
              {Object.entries(b.modificadores).map(([k, v]) => (
                <div key={k} className={`tag ${(v as number) > 0 ? "" : "tag-red"}`}>
                  {k.split("_")[0]} {(v as number) > 0 ? "+" : ""}{v}
                </div>
              ))}
            </div>

            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-widest text-neon-blue">Ventaja pasiva</div>
              <div className="text-xs text-parchment/80">{b.ventajaPasiva}</div>
            </div>
            <div className="mt-2">
              <div className="text-[10px] uppercase tracking-widest text-neon-red">Desventaja</div>
              <div className="text-xs text-parchment/80">{b.desventaja}</div>
            </div>
            {b.desbloqueaRecursos && (
              <div className="mt-2">
                <div className="text-[10px] uppercase tracking-widest text-neon-violet">Recursos especiales</div>
                <ul className="text-xs text-parchment/80 list-disc list-inside">
                  {b.desbloqueaRecursos.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            )}
          </button>
        ))}
      </div>

      <button className="btn" disabled={!seleccionada} onClick={confirmar}>▸ Confirmar especialización</button>
    </div>
  );
}
