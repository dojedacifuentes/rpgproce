"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { REQUISITOS_DEMANDA } from "@/lib/reglas";

export default function DemandaPanel() {
  const game = useGame();
  const [checks, setChecks] = useState<boolean[]>(Array(REQUISITOS_DEMANDA.length).fill(false));
  const [feedback, setFeedback] = useState<null | "ok" | "ineptitud">(null);

  function toggle(i: number) {
    setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  function presentar() {
    if (checks.every(Boolean)) {
      setFeedback("ok");
      game.setFlag("demanda_admisible");
      game.ajustarAtributo("rigor_formal", 1);
      game.ajustarReputacion(4);
      game.pushLog("Demanda admisible: cumple los 5 requisitos del art. 254 CPC.", "Art. 254 CPC");
    } else {
      setFeedback("ineptitud");
      game.setFlag("dilatoria_ineptitud");
      game.ajustarTrauma(3);
      game.pushLog("Demanda atacable por ineptitud del libelo (art. 303 N°4).", "Art. 303 N°4 CPC");
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Confección de la demanda (art. 254 CPC)</h2>
      <p className="text-doc-aged/60 text-sm">
        Marca los requisitos que efectivamente cumple tu demanda. Si falta alguno, el demandado podrá oponer la excepción dilatoria del art. 303 N°4 (ineptitud del libelo) y suspender el juicio hasta subsanar (305-308 CPC).
      </p>

      <div className="terminal p-4 space-y-2">
        {REQUISITOS_DEMANDA.map((r, i) => (
          <label key={r.n} className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={checks[i]} onChange={() => toggle(i)} className="mt-1" />
            <div>
              <div className="text-doc-aged">N°{r.n}. {r.t}</div>
              <div className="text-doc-aged/50 text-[10px]">{r.articulo}</div>
            </div>
          </label>
        ))}
      </div>

      <button className="btn" onClick={presentar}>▸ Presentar demanda al tribunal</button>

      {feedback === "ok" && (
        <div className="terminal p-4 border-neon-blue">
          <div className="label-art text-zona-notificaciones">✓ Demanda admisible</div>
          <p className="text-doc-aged/80 text-xs mt-2">El tribunal proveerá "traslado". El emplazamiento empieza a correr.</p>
        </div>
      )}
      {feedback === "ineptitud" && (
        <div className="terminal p-4 border-neon-red">
          <div className="label-art text-zona-nulidad">✗ Riesgo de ineptitud del libelo</div>
          <p className="text-doc-aged/80 text-xs mt-2">El demandado puede oponer excepción dilatoria del art. 303 N°4 CPC.</p>
        </div>
      )}
    </div>
  );
}
