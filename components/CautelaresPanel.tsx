"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import type { MedidaCautelar } from "@/types/game";

const TIPOS: { tipo: MedidaCautelar["tipo"]; nombre: string; art: string; desc: string }[] = [
  { tipo: "secuestro", nombre: "Secuestro", art: "Art. 290 N°1 CPC", desc: "El secuestro de la cosa objeto de la demanda. Recae sobre la cosa específica." },
  { tipo: "interventor", nombre: "Nombramiento de interventor", art: "Art. 290 N°2 CPC", desc: "Para fiscalizar la administración de un patrimonio o explotación." },
  { tipo: "retencion", nombre: "Retención de bienes determinados", art: "Art. 290 N°3 CPC", desc: "Recae sobre dineros o cosas muebles en poder del demandado o tercero." },
  { tipo: "prohibicion_celebrar_actos_contratos", nombre: "Prohibición de celebrar actos o contratos", art: "Art. 290 N°4 CPC", desc: "Sobre bienes determinados; si afecta inmuebles, debe inscribirse (art. 297 inc. 2°)." },
];

export default function CautelaresPanel() {
  const game = useGame();
  const [clase, setClase] = useState<MedidaCautelar["clase"]>("precautoria");
  const [tipo, setTipo] = useState<MedidaCautelar["tipo"] | null>(null);
  const [bien, setBien] = useState("");
  const [caucion, setCaucion] = useState(0);

  function decretar() {
    if (!tipo) return;
    const info = TIPOS.find((t) => t.tipo === tipo)!;
    const m: MedidaCautelar = {
      id: `m-${Date.now()}`,
      clase,
      tipo,
      bienAfectado: bien,
      decretada: true,
      caucion,
      articulo: info.art,
    };
    game.addCautelar(m);
    game.pushLog(`Decretada ${clase} ${tipo} sobre ${bien || "bien determinado"}.`, info.art);
    game.ajustarAtributo("estrategia", 1);
    setTipo(null);
    setBien("");
    setCaucion(0);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Medidas prejudiciales y precautorias (arts. 273-302 CPC)</h2>
      <p className="text-doc-aged/60 text-sm">
        Prejudiciales (273-289): pueden ser preparatorias, probatorias o precautorias. Precautorias propiamente tales (290-302): solicitadas durante el juicio para asegurar el resultado.
      </p>

      <div className="terminal p-4 space-y-3">
        <div>
          <label className="text-xs uppercase tracking-widest text-zona-competencia mb-1 block">Clase</label>
          <select className="bg-ink-700 border border-neon-blue/30 p-2 w-full" value={clase} onChange={(e) => setClase(e.target.value as any)}>
            <option value="prejudicial">Prejudicial precautoria (arts. 279, 287 CPC)</option>
            <option value="precautoria">Precautoria propiamente tal (arts. 290-302 CPC)</option>
            <option value="innominada">Innominada (art. 298 inc. 2° CPC)</option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-zona-competencia mb-1 block">Tipo (art. 290 CPC)</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {TIPOS.map((t) => (
              <button key={t.tipo} onClick={() => setTipo(t.tipo)} className={`p-3 border text-left text-xs ${tipo === t.tipo ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
                <div className="text-zona-competencia">{t.nombre}</div>
                <div className="tag tag-violet mt-1">{t.art}</div>
                <div className="text-doc-aged/60 text-[10px] mt-2">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <label>Bien afectado: <input className="bg-ink-700 border border-neon-blue/30 p-2 ml-2 w-full mt-1" value={bien} onChange={(e) => setBien(e.target.value)} placeholder="Ej.: inmueble Fojas X N°Y Año Z" /></label>
          <label>Caución (si exigida): $ <input type="number" className="bg-ink-700 border border-neon-blue/30 p-2 ml-2 w-32" value={caucion} onChange={(e) => setCaucion(+e.target.value)} /></label>
        </div>

        <button className="btn" onClick={decretar} disabled={!tipo}>▸ Decretar cautelar</button>
      </div>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet mb-2 text-sm">Cautelares decretadas ({game.cautelares.length})</div>
        {game.cautelares.map((m) => (
          <div key={m.id} className="text-xs border-b border-ink-400 py-1 flex justify-between">
            <span><b>{m.clase}</b> · {m.tipo} · {m.bienAfectado}</span>
            <span className="tag tag-violet">{m.articulo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
