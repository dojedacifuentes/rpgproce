"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { MEDIOS_PRUEBA } from "@/lib/reglas";
import type { MedioProbatorio, Prueba } from "@/types/game";

const HECHOS_BASE = [
  "Fecha de celebración del contrato.",
  "Recepción del producto y conformidad.",
  "Existencia y monto de la indemnización pactada.",
];

export default function PruebaPanel() {
  const game = useGame();
  const [hechos, setHechos] = useState<string[]>(HECHOS_BASE);
  const [medio, setMedio] = useState<MedioProbatorio | null>(null);
  const [oportuno, setOportuno] = useState(true);
  const [pruebasOfrecidas, setPruebasOfrecidas] = useState<Prueba[]>([]);

  function ofrecer() {
    if (!medio) return;
    const info = MEDIOS_PRUEBA.find((m) => m.medio === medio)!;
    const p: Prueba = {
      id: `pr-${Date.now()}`,
      medio,
      contenido: `Prueba ${medio} sobre hechos del auto`,
      oportuna: oportuno,
      legal: true,
      articulo: info.arts,
    };
    setPruebasOfrecidas((arr) => [...arr, p]);
    game.addPrueba(p);
    game.pushLog(`Ofreciste prueba ${medio} (${oportuno ? "oportuna" : "extemporánea"}).`, info.arts);
    if (oportuno) game.ajustarAtributo("diligencia", 1);
    else game.ajustarTrauma(2);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Etapa probatoria (arts. 318-433 CPC)</h2>
      <p className="text-doc-aged/60 text-sm">
        El auto de prueba (art. 318) fija los hechos sustanciales, pertinentes y controvertidos. Término probatorio ordinario: 20 días (art. 328). Extraordinarios: arts. 329-330. Especial: art. 339.
      </p>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Hechos a probar (puntos del auto)</div>
        <ul className="text-xs space-y-1 text-doc-aged/70">
          {hechos.map((h, i) => <li key={i}>{i + 1}. {h}</li>)}
        </ul>
      </div>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Ofrece un medio probatorio</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {MEDIOS_PRUEBA.map((m) => (
            <button key={m.medio} onClick={() => setMedio(m.medio)} className={`p-3 border text-left text-xs ${medio === m.medio ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
              <div className="text-zona-competencia">{m.nombre}</div>
              <div className="tag tag-violet mt-1">{m.arts}</div>
              <div className="text-doc-aged/60 text-[10px] mt-2">{m.valor}</div>
            </button>
          ))}
        </div>
        <label className="block mt-3 text-xs"><input type="checkbox" checked={oportuno} onChange={(e) => setOportuno(e.target.checked)} className="mr-2" />Presentada dentro del término probatorio</label>
        <button className="btn mt-3" disabled={!medio} onClick={ofrecer}>▸ Ofrecer prueba</button>
      </div>

      {pruebasOfrecidas.length > 0 && (
        <div className="terminal p-4">
          <div className="label-art text-zona-competencia mb-2 text-sm">Pruebas ofrecidas ({pruebasOfrecidas.length})</div>
          {pruebasOfrecidas.map((p) => (
            <div key={p.id} className="text-xs border-b border-ink-400 py-1 flex justify-between">
              <span>{p.medio} — {p.oportuna ? "oportuna" : <span className="text-zona-nulidad">extemporánea</span>}</span>
              <span className="tag tag-violet">{p.articulo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
