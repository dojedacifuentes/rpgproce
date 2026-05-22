"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { TITULOS_EJECUTIVOS } from "@/lib/reglas";

type Cuaderno = "principal" | "apremio" | "tercerias";

export default function EjecutivoPanel() {
  const game = useGame();
  const [titulo, setTitulo] = useState<number | null>(null);
  const [cuaderno, setCuaderno] = useState<Cuaderno>("principal");
  const [oposicion, setOposicion] = useState(false);

  function despachar() {
    if (titulo === null) return;
    game.setFlag("ejecutivo_iniciado");
    game.pushLog(`Iniciaste juicio ejecutivo con título: ${TITULOS_EJECUTIVOS[titulo].t}`, TITULOS_EJECUTIVOS[titulo].articulo);
    game.ajustarAtributo("estrategia", 1);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Juicio ejecutivo (arts. 434-478 CPC)</h2>
      <p className="text-doc-aged/60 text-sm">
        Procede teniendo título ejecutivo con obligación líquida, actualmente exigible y no prescrita. Cuadernos: principal (demanda → mandamiento → oposición → sentencia) y apremio (embargo → retiro → remate). Eventuales tercerías (518 ss.).
      </p>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Elige el título ejecutivo (art. 434 CPC)</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {TITULOS_EJECUTIVOS.map((t, i) => (
            <button key={t.n} onClick={() => setTitulo(i)} className={`p-3 border text-left text-xs ${titulo === i ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
              <div className="text-zona-competencia">N°{t.n}: {t.t}</div>
              <div className="tag tag-violet mt-1">{t.articulo}</div>
            </button>
          ))}
        </div>
      </div>

      <button className="btn" onClick={despachar} disabled={titulo === null}>▸ Despachar mandamiento de ejecución y embargo</button>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Cuadernos del juicio ejecutivo</div>
        <div className="grid grid-cols-3 gap-2">
          {(["principal", "apremio", "tercerias"] as Cuaderno[]).map((c) => (
            <button key={c} onClick={() => setCuaderno(c)} className={`p-3 border text-xs ${cuaderno === c ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
              {c}
            </button>
          ))}
        </div>
        <p className="text-doc-aged/70 text-xs mt-3">
          {cuaderno === "principal" && "PRINCIPAL: demanda ejecutiva (434), mandamiento, oposición del ejecutado por excepciones taxativas (464), sentencia."}
          {cuaderno === "apremio" && "APREMIO: requerimiento de pago, embargo (442-453), retiro de especies (455), remate (482-499)."}
          {cuaderno === "tercerias" && "TERCERÍAS (518 CPC): de dominio, de posesión, de prelación, de pago. Se tramitan en cuaderno separado para no entorpecer el apremio."}
        </p>
      </div>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Oposición del ejecutado (art. 464 CPC)</div>
        <p className="text-doc-aged/60 text-xs mb-3">
          Las excepciones son TAXATIVAS: 17 causales en el art. 464. Plazo: 4 días si se requirió en el lugar del tribunal; 8 días dentro del territorio; 8 + tabla emplazamiento fuera del territorio (459-461).
        </p>
        <button className="btn" onClick={() => { setOposicion(true); game.pushLog("Ejecutado opuso excepciones del art. 464. Se confiere traslado.", "Art. 464 CPC"); }}>▸ Oposición del ejecutado</button>
        {oposicion && <p className="text-zona-competencia text-xs mt-2">Oposición recibida. Si se rechaza in limine (art. 466), el mandamiento basta de sentencia (art. 472).</p>}
      </div>
    </div>
  );
}
