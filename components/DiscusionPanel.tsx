"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { EXCEPCIONES_DILATORIAS, ART_EXCEPCIONES_DILATORIAS, EXCEPCIONES_PERENTORIAS_ANOMALAS } from "@/lib/reglas";

type Fase = "demanda_proveida" | "contestacion" | "replica" | "duplica" | "cerrada";

export default function DiscusionPanel() {
  const game = useGame();
  const [fase, setFase] = useState<Fase>("demanda_proveida");
  const [excepciones, setExcepciones] = useState<number[]>([]);
  const [reconvencion, setReconvencion] = useState(false);

  function avanzar(siguiente: Fase, mensaje: string, art: string) {
    setFase(siguiente);
    game.pushLog(mensaje, art);
  }

  function toggleExc(i: number) {
    setExcepciones((arr) => arr.includes(i) ? arr.filter(x => x !== i) : [...arr, i]);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-neon-blue text-xl">Etapa de discusión (arts. 254, 309-314 CPC)</h2>
      <p className="text-parchment/60 text-sm">
        Demanda → Contestación → Réplica → Dúplica → (eventual reconvención). Tras la dúplica viene la conciliación obligatoria (art. 262).
      </p>

      <div className="flex gap-2 flex-wrap mb-4">
        {(["demanda_proveida", "contestacion", "replica", "duplica", "cerrada"] as Fase[]).map((f) => (
          <span key={f} className={`tag ${fase === f ? "tag-amber" : ""}`}>{f.replace(/_/g, " ")}</span>
        ))}
      </div>

      {fase === "demanda_proveida" && (
        <div className="terminal p-5">
          <div className="label-art text-neon-cyan">Demanda proveída con 'traslado'</div>
          <p className="text-parchment/70 text-xs mt-2">El demandado tiene su plazo (arts. 258-259). Puede contestar derechamente, oponer dilatorias (art. 303) o reconvenir.</p>
          <button className="btn mt-3" onClick={() => avanzar("contestacion", "El demandado contesta y opone excepciones dilatorias.", "Art. 303 CPC")}>▸ Recibir contestación con dilatorias</button>
        </div>
      )}

      {fase === "contestacion" && (
        <div className="terminal p-5">
          <div className="label-art text-neon-cyan mb-2">Excepciones dilatorias opuestas (art. 303 CPC)</div>
          <p className="text-parchment/60 text-xs mb-3">Selecciona las que el demandado opone. Recuerda: deben oponerse TODAS EN UN MISMO ESCRITO antes de contestar (art. 305).</p>
          {EXCEPCIONES_DILATORIAS.map((e, i) => (
            <label key={e.n} className="block text-sm">
              <input type="checkbox" className="mr-2" checked={excepciones.includes(i)} onChange={() => toggleExc(i)} />
              {e.n}. {e.t}
            </label>
          ))}
          <div className="tag tag-violet mt-3">{ART_EXCEPCIONES_DILATORIAS}</div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <button className="btn" onClick={() => avanzar("replica", "Dilatorias resueltas (rechazadas o subsanadas). El plazo perentorio corre.", "Arts. 305-308 CPC")}>▸ Resolver dilatorias y pasar a réplica</button>
            <button className="btn" onClick={() => { setReconvencion(true); avanzar("replica", "Demandado reconviene. La reconvención sigue el procedimiento de la demanda.", "Art. 314 CPC"); }}>▸ Reconvención del demandado</button>
          </div>
        </div>
      )}

      {fase === "replica" && (
        <div className="terminal p-5">
          <div className="label-art text-neon-cyan">Réplica del actor (art. 311 CPC)</div>
          <p className="text-parchment/70 text-xs mt-2">El demandante tiene 6 días para replicar. Puede AMPLIAR, ADICIONAR o MODIFICAR las acciones formuladas, pero sin que pueda alterarlas substancialmente.</p>
          {reconvencion && <p className="text-neon-violet text-xs mt-1">Hay reconvención: en la réplica también se contesta la reconvención.</p>}
          <button className="btn mt-3" onClick={() => avanzar("duplica", "Réplica presentada. Se confiere traslado para dúplica.", "Art. 311 CPC")}>▸ Presentar réplica</button>
        </div>
      )}

      {fase === "duplica" && (
        <div className="terminal p-5">
          <div className="label-art text-neon-cyan">Dúplica del demandado (art. 312 CPC)</div>
          <p className="text-parchment/70 text-xs mt-2">El demandado tiene 6 días para duplicar. Cierra la discusión. Próximo paso: conciliación obligatoria (art. 262).</p>
          <button className="btn mt-3" onClick={() => avanzar("cerrada", "Dúplica presentada. Discusión cerrada. Citación a conciliación.", "Arts. 262, 312 CPC")}>▸ Cerrar discusión</button>
        </div>
      )}

      {fase === "cerrada" && (
        <div className="terminal p-5 border-neon-blue">
          <div className="label-art text-neon-blue">✓ Etapa de discusión cerrada</div>
          <p className="text-parchment/80 text-xs mt-2">Procede CONCILIACIÓN obligatoria (art. 262 CPC), salvo casos del 263. Recuerda las excepciones perentorias anómalas del art. 310 que pueden oponerse en cualquier estado del juicio hasta antes de la citación a oír sentencia en 1° instancia (y hasta antes de la vista en 2°):</p>
          <ul className="text-xs mt-2 space-y-1">
            {EXCEPCIONES_PERENTORIAS_ANOMALAS.map((e, i) => (
              <li key={i}>• <b className="text-neon-cyan">{e.t}</b> — <span className="tag tag-violet">{e.articulo}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
