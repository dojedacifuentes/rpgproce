"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { recursoProcedente, TABLA_RECURSOS } from "@/lib/reglas";
import type { TipoRecurso, TipoResolucion } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

// El minijuego nuclear del módulo de recursos: clasificar el recurso que procede contra
// una resolución específica, conforme al cuadro adjunto y los arts. 181, 182, 187, 188,
// 196, 203, 766, 767, 810 CPC y 545 COT.

type Caso = {
  resolucion: string;
  tipo: TipoResolucion;
  recursoCorrecto: TipoRecurso;
  pista: string;
};

const CASOS: Caso[] = [
  { resolucion: "Sentencia definitiva de 1° instancia que rechaza la demanda", tipo: "sentencia_definitiva", recursoCorrecto: "apelacion", pista: "Sentencia definitiva 1° instancia: regla del art. 187." },
  { resolucion: "Decreto que ordena 'téngase presente'", tipo: "decreto_providencia_proveido", recursoCorrecto: "reposicion", pista: "Decretos: art. 181 CPC." },
  { resolucion: "Auto de prueba (resolución que recibe la causa a prueba)", tipo: "sentencia_interlocutoria_1grado", recursoCorrecto: "reposicion_especial", pista: "Caso señalado especialmente en el art. 319: reposición especial en 3 días con apelación subsidiaria." },
  { resolucion: "Sentencia de la Corte de Apelaciones inapelable que confirma fallo de 1ª instancia", tipo: "sentencia_definitiva", recursoCorrecto: "casacion_fondo", pista: "Sentencia definitiva inapelable de Corte de Apelaciones: art. 767." },
  { resolucion: "Tribunal inferior DENIEGA una apelación que debía concederse", tipo: "sentencia_interlocutoria_1grado", recursoCorrecto: "hecho_verdadero", pista: "Denegación errada: art. 203 CPC." },
  { resolucion: "Tribunal inferior CONCEDE una apelación improcedente", tipo: "sentencia_interlocutoria_1grado", recursoCorrecto: "hecho_falso", pista: "Concesión errada: art. 196 CPC." },
  { resolucion: "Sentencia firme ganada por documento falso descubierto posteriormente", tipo: "sentencia_definitiva", recursoCorrecto: "revision", pista: "Vicios excepcionales del art. 810." },
  { resolucion: "Sentencia definitiva con error de copia en monto", tipo: "sentencia_definitiva", recursoCorrecto: "aclaracion_rectificacion_enmienda", pista: "No es modificación de fondo: art. 182." },
  { resolucion: "Sentencia definitiva con vicio del 768 N°5 (omisión del 170)", tipo: "sentencia_definitiva", recursoCorrecto: "casacion_forma", pista: "Causal del 768: art. 766." },
  { resolucion: "Auto que provee 'no ha lugar' a una solicitud, alterando la sustanciación regular", tipo: "auto", recursoCorrecto: "apelacion_subsidiaria", pista: "Auto que altera sustanciación: art. 188 (reposición + apelación subsidiaria)." },
  { resolucion: "Sentencia definitiva de árbitro arbitrador de 1° instancia sin otro recurso disponible", tipo: "sentencia_definitiva", recursoCorrecto: "queja", pista: "Excepción del art. 545 COT: queja procede pese a poder haber casación en la forma." },
];

const RECURSOS_OPCIONES: TipoRecurso[] = [
  "aclaracion_rectificacion_enmienda",
  "reposicion",
  "reposicion_especial",
  "apelacion",
  "apelacion_subsidiaria",
  "hecho_verdadero",
  "hecho_falso",
  "casacion_forma",
  "casacion_fondo",
  "queja",
  "revision",
];

export default function ClasificadorRecursos() {
  const game = useGame();
  const [i, setI] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; explicacion: string; art: string; correcto: TipoRecurso } | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const caso = CASOS[i];

  if (!caso) {
    const pct = Math.round((aciertos / CASOS.length) * 100);
    return (
      <div className="terminal p-6">
        <h2 className="label-art text-neon-blue text-xl mb-3">Clasificación de recursos completa</h2>
        <p className="text-parchment/70 text-sm">Aciertos: <b className="text-neon-cyan">{aciertos}</b> / {CASOS.length} ({pct}%).</p>
        {pct === 100 && <p className="text-neon-blue text-xs mt-2">Conoces el árbol del 158-545 mejor que tu profesor de procesal.</p>}
      </div>
    );
  }

  function elegir(r: TipoRecurso) {
    const res = recursoProcedente({ tipoResolucion: caso.tipo, recurso: r });
    const ok = r === caso.recursoCorrecto;
    const correctoData = TABLA_RECURSOS.find((x) => x.recurso === caso.recursoCorrecto)!;
    setFeedback({ ok, explicacion: ok ? res.explicacion : `El recurso correcto era: ${correctoData.nombre}. ${correctoData.descripcion}`, art: correctoData.articulo, correcto: caso.recursoCorrecto });
    if (ok) {
      setAciertos((a) => a + 1);
      game.ajustarAtributo("conocimiento_procesal", 1);
      game.pushLog(`Clasificaste correctamente: ${caso.resolucion} → ${r}`, correctoData.articulo);
    } else {
      game.ajustarTrauma(1);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-neon-blue text-xl">¿Qué recurso procede? (arts. 181, 182, 187, 188, 196, 203, 319, 766, 767, 810 CPC; 545 COT)</h2>
      <p className="text-parchment/60 text-xs">
        Primero clasifica la resolución (art. 158 CPC). Después elige el recurso. El cuadro vive en el codex.
      </p>

      <div className="terminal p-5">
        <div className="tag mb-2">CASO {i + 1} / {CASOS.length}</div>
        <div className="text-parchment text-base label-art">{caso.resolucion}</div>
        <div className="text-xs text-parchment/60 mt-1">Tipo (art. 158 CPC): <b>{caso.tipo.replace(/_/g, " ")}</b></div>
        <div className="text-neon-violet text-xs italic mt-3">Pista: {caso.pista}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {RECURSOS_OPCIONES.map((r) => {
          const nombre = TABLA_RECURSOS.find((x) => x.recurso === r)?.nombre || r;
          return (
            <button key={r} disabled={!!feedback} onClick={() => elegir(r)} className="p-3 border border-neon-blue/40 text-neon-blue text-[10px] uppercase tracking-widest disabled:opacity-40 hover:bg-neon-blue/10">
              {nombre}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`terminal p-4 ${feedback.ok ? "border-neon-blue" : "border-neon-red"}`}>
            <div className={`label-art ${feedback.ok ? "text-neon-blue" : "text-neon-red"}`}>{feedback.ok ? "✓ Correcto" : "✗ Incorrecto"}</div>
            <p className="text-parchment/80 text-xs mt-2">{feedback.explicacion}</p>
            <div className="tag tag-violet mt-2">{feedback.art}</div>
            <button className="btn mt-3" onClick={() => { setFeedback(null); setI((x) => x + 1); }}>▸ Siguiente caso</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
