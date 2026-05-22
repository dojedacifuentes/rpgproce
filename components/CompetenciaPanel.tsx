"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { evaluarCompetencia } from "@/lib/reglas";
import type { TipoTribunal, FactorCompetencia } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

type Caso = {
  nombre: string;
  materia: "civil" | "comercial" | "familia" | "trabajo" | "penal" | "administrativo";
  cuantiaUTM?: number;
  hayFuero?: boolean;
  domicilioDemandado: string;
  asientoTribunal: string;
  prorrogaConsentida?: boolean;
  tribunalPropuesto: TipoTribunal;
  esperado: "competente" | "incompetente";
  factorEsperado: FactorCompetencia;
  pista: string;
};

const CASOS: Caso[] = [
  {
    nombre: "Cobro de honorarios profesionales por $4.000.000 entre vecinos de Las Condes",
    materia: "civil",
    cuantiaUTM: 60,
    domicilioDemandado: "Las Condes",
    asientoTribunal: "Las Condes",
    tribunalPropuesto: "juzgado_letras_civil",
    esperado: "competente",
    factorEsperado: "materia",
    pista: "Civil + tribunal civil + mismo territorio + no fuero.",
  },
  {
    nombre: "Demanda de alimentos contra el padre",
    materia: "familia",
    domicilioDemandado: "Santiago",
    asientoTribunal: "Santiago",
    tribunalPropuesto: "juzgado_letras_civil",
    esperado: "incompetente",
    factorEsperado: "materia",
    pista: "Causa de familia exige Tribunal de Familia (Ley 19.968).",
  },
  {
    nombre: "Cobro civil contra demandado con domicilio en Coyhaique, ante juzgado de Santiago, sin prórroga",
    materia: "civil",
    domicilioDemandado: "Coyhaique",
    asientoTribunal: "Santiago",
    tribunalPropuesto: "juzgado_letras_civil",
    esperado: "incompetente",
    factorEsperado: "territorio",
    pista: "Competencia relativa: regla del domicilio (art. 134 COT).",
  },
  {
    nombre: "Demanda civil contra un Senador (fuero mayor) ante Juzgado de Letras",
    materia: "civil",
    hayFuero: true,
    domicilioDemandado: "Santiago",
    asientoTribunal: "Santiago",
    tribunalPropuesto: "juzgado_letras_civil",
    esperado: "incompetente",
    factorEsperado: "fuero",
    pista: "Fuero mayor: conoce un Ministro de Corte de Apelaciones (art. 50 N°2 COT).",
  },
  {
    nombre: "Demanda laboral por despido injustificado en tribunal civil",
    materia: "trabajo",
    domicilioDemandado: "Concepción",
    asientoTribunal: "Concepción",
    tribunalPropuesto: "juzgado_letras_civil",
    esperado: "incompetente",
    factorEsperado: "materia",
    pista: "Causa laboral: Juzgado de Letras del Trabajo (art. 420 CT).",
  },
  {
    nombre: "Cobro civil en Iquique contra demandado domiciliado en Antofagasta, con prórroga expresa pactada",
    materia: "civil",
    domicilioDemandado: "Antofagasta",
    asientoTribunal: "Iquique",
    prorrogaConsentida: true,
    tribunalPropuesto: "juzgado_letras_civil",
    esperado: "competente",
    factorEsperado: "territorio",
    pista: "La prórroga de competencia relativa sanea la falta del territorio.",
  },
];

export default function CompetenciaPanel() {
  const game = useGame();
  const [i, setI] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; razon: string; art: string } | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const caso = CASOS[i];

  if (!caso) {
    return (
      <div className="terminal p-6">
        <h2 className="label-art text-zona-notificaciones text-xl mb-3">Clasificación de competencia completa</h2>
        <p className="text-doc-aged/70 text-sm">Aciertos: <b className="text-zona-competencia">{aciertos}</b> / {CASOS.length}.</p>
      </div>
    );
  }

  function elegir(opcion: "competente" | "incompetente") {
    const res = evaluarCompetencia({
      tribunal: caso.tribunalPropuesto,
      materia: caso.materia,
      cuantiaUTM: caso.cuantiaUTM,
      hayFuero: caso.hayFuero,
      domicilioDemandado: caso.domicilioDemandado,
      asientoTribunal: caso.asientoTribunal,
      prorrogaConsentida: caso.prorrogaConsentida,
    });
    const realOpcion = res.competente ? "competente" : "incompetente";
    const ok = opcion === realOpcion;
    setFeedback({ ok, razon: res.razon, art: res.articulo });
    if (ok) {
      setAciertos((a) => a + 1);
      game.ajustarAtributo("conocimiento_procesal", 1);
      game.pushLog(`Clasificaste correctamente la competencia en: ${caso.nombre}`, res.articulo);
    } else {
      game.ajustarTrauma(1);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Competencia absoluta y relativa (arts. 45, 50, 115-148, 181-187 COT)</h2>
      <p className="text-doc-aged/60 text-xs">
        Tres preguntas: ¿materia? ¿fuero? ¿territorio? La cuantía civil ordinaria de juzgados de letras subsiste para procedimiento (ordinario {">"} 10 UTM, mínima cuantía ≤ 10 UTM, art. 703 CPC).
      </p>

      <div className="terminal p-5">
        <div className="tag mb-2">CASO {i + 1} / {CASOS.length}</div>
        <div className="text-doc-aged text-lg label-art">{caso.nombre}</div>
        <div className="text-xs text-doc-aged/60 mt-1">
          Materia: <b>{caso.materia}</b> · Demandado: <b>{caso.domicilioDemandado}</b> · Tribunal propuesto: <b>{caso.tribunalPropuesto.replace(/_/g, " ")}</b> · Asiento: <b>{caso.asientoTribunal}</b>{caso.hayFuero ? " · CON FUERO" : ""}{caso.prorrogaConsentida ? " · prórroga pactada" : ""}
        </div>
        <div className="text-neon-violet text-xs italic mt-3">Pista: {caso.pista}</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button disabled={!!feedback} onClick={() => elegir("competente")} className="p-3 border border-neon-blue text-zona-notificaciones text-xs uppercase tracking-widest disabled:opacity-40">El tribunal ES competente</button>
        <button disabled={!!feedback} onClick={() => elegir("incompetente")} className="p-3 border border-neon-red text-zona-nulidad text-xs uppercase tracking-widest disabled:opacity-40">El tribunal NO es competente</button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`terminal p-4 ${feedback.ok ? "border-neon-blue" : "border-neon-red"}`}>
            <div className={`label-art ${feedback.ok ? "text-zona-notificaciones" : "text-zona-nulidad"}`}>{feedback.ok ? "✓ Correcto" : "✗ Incorrecto"}</div>
            <p className="text-doc-aged/80 text-xs mt-2">{feedback.razon}</p>
            <div className="tag tag-violet mt-2">{feedback.art}</div>
            <button className="btn mt-3" onClick={() => { setFeedback(null); setI((x) => x + 1); }}>▸ Siguiente caso</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
