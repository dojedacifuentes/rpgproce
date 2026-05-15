"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { plazoContestacion } from "@/lib/reglas";

type Forma = "personal" | "personal_subsidiaria_44" | "cedula" | "estado_diario" | "avisos";

const FORMAS: { id: Forma; nombre: string; art: string; cuando: string }[] = [
  { id: "personal", nombre: "Notificación personal", art: "Art. 40 CPC", cuando: "Regla general en juicios. Primera notificación al demandado." },
  { id: "personal_subsidiaria_44", nombre: "Personal subsidiaria art. 44", art: "Art. 44 CPC", cuando: "Si el notificado no es habido tras búsqueda en dos días distintos: entrega de cédula con constancia." },
  { id: "cedula", nombre: "Notificación por cédula", art: "Art. 48 CPC", cuando: "Auto de prueba, citación a oír sentencia, y resoluciones que ordenen comparecencia personal." },
  { id: "estado_diario", nombre: "Notificación por estado diario", art: "Art. 50 CPC", cuando: "Regla supletoria general para las demás resoluciones." },
  { id: "avisos", nombre: "Notificación por avisos", art: "Art. 54 CPC", cuando: "Persona cuya individualidad o residencia sea difícil de determinar, o número considerable de personas." },
];

export default function EmplazamientoPanel() {
  const game = useGame();
  const [lugar, setLugar] = useState<"mismo" | "mismo_territorio" | "extranjero">("mismo");
  const [diasTabla, setDiasTabla] = useState(6);
  const [forma, setForma] = useState<Forma | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  const plazo = plazoContestacion({ lugar, diasTablaEmplazamiento: diasTabla });

  function confirmarEmplazamiento() {
    if (!forma) return;
    setConfirmado(true);
    game.setFlag("emplazamiento_practicado");
    game.pushLog(`Emplazamiento practicado por ${forma}. Plazo de contestación: ${plazo.dias} días (${plazo.articulo}).`, plazo.articulo);
    game.ajustarAtributo("rigor_formal", 1);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-neon-blue text-xl">Notificación y plazos de contestación (arts. 40-54, 258-259 CPC)</h2>
      <p className="text-parchment/60 text-sm">
        El emplazamiento es trámite esencial. Su omisión causa nulidad procesal (art. 768 N°9 CPC) y, en su caso, casación en la forma.
      </p>

      <div className="terminal p-5">
        <div className="label-art text-neon-violet mb-2 text-sm">Elige la forma de notificación de la demanda</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {FORMAS.map((f) => (
            <button key={f.id} onClick={() => setForma(f.id)} className={`p-3 border text-left text-xs ${forma === f.id ? "border-neon-blue bg-neon-blue/10" : "border-ink-400"}`}>
              <div className="text-neon-cyan">{f.nombre}</div>
              <div className="text-parchment/60 mt-1">{f.cuando}</div>
              <div className="tag tag-violet mt-1">{f.art}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="terminal p-5">
        <div className="label-art text-neon-violet mb-2 text-sm">Configura el plazo de contestación (arts. 258-259 CPC)</div>
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <label>Lugar del demandado:
            <select className="bg-ink-700 border border-neon-blue/30 p-2 ml-2 mt-1 w-full" value={lugar} onChange={(e) => setLugar(e.target.value as any)}>
              <option value="mismo">Mismo lugar donde funciona el tribunal</option>
              <option value="mismo_territorio">Fuera del lugar, mismo territorio jurisdiccional</option>
              <option value="extranjero">Fuera del territorio jurisdiccional / extranjero</option>
            </select>
          </label>
          {lugar === "extranjero" && (
            <label>Días tabla de emplazamiento:
              <input type="number" className="bg-ink-700 border border-neon-blue/30 p-2 ml-2 w-20" value={diasTabla} onChange={(e) => setDiasTabla(+e.target.value)} />
            </label>
          )}
        </div>
        <div className="mt-3 text-sm">
          Plazo aplicable: <b className="text-neon-blue">{plazo.dias} días</b> <span className="tag tag-violet ml-2">{plazo.articulo}</span>
        </div>
      </div>

      <button disabled={!forma} className="btn disabled:opacity-30" onClick={confirmarEmplazamiento}>▸ Practicar emplazamiento</button>

      {confirmado && (
        <div className="terminal p-4 border-neon-blue">
          <div className="label-art text-neon-blue">✓ Emplazamiento practicado</div>
          <p className="text-parchment/80 text-xs mt-2">El demandado tiene {plazo.dias} días para contestar o reaccionar (deducir excepciones dilatorias del 303).</p>
        </div>
      )}
    </div>
  );
}
