"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// MINIJUEGO: Inhibitoria vs Declinatoria (CPC 101-112)
// Extraído de DEEP.COMPETENCIA: el jugador debe identificar
// (a) qué medio procesal usar (inhibitoria o declinatoria)
// (b) ante qué tribunal presentarlo
// (c) los efectos del trámite
// ============================================================================

type Caso = {
  hechos: string;
  medioCorrecto: "inhibitoria" | "declinatoria";
  tribunalCorrecto: "presunto_competente" | "tribunal_actual_incompetente";
  articulo: string;
  explicacion: string;
};

const CASOS: Caso[] = [
  {
    hechos: "Vives en Concepción. Te demandan en el 4° Juzgado Civil de Santiago. Querés impugnar la competencia ante el tribunal que TÚ crees competente (Concepción), pidiéndole que se dirija al de Santiago para que se inhiba.",
    medioCorrecto: "inhibitoria",
    tribunalCorrecto: "presunto_competente",
    articulo: "Arts. 101, 102 (104, 105) CPC",
    explicacion: "Inhibitoria: se presenta ante el tribunal que se cree competente (Concepción) con los antecedentes. Si lo acoge, oficia al actual (Santiago) para que se inhiba (art. 102/105 CPC).",
  },
  {
    hechos: "Te demandan en un tribunal que crees incompetente. Querés que ese mismo tribunal se abstenga de seguir conociendo y declare su incompetencia. Lo planteás dentro del término para contestar.",
    medioCorrecto: "declinatoria",
    tribunalCorrecto: "tribunal_actual_incompetente",
    articulo: "Arts. 111, 112 (116, 117) CPC",
    explicacion: "Declinatoria: se interpone ante el tribunal que se estima incompetente, designando quién debe conocer. Si se rechaza en 1ª instancia, apelación solo en lo devolutivo.",
  },
  {
    hechos: "El juicio principal está pendiente. Acabás de presentar inhibitoria ante el tribunal presunto competente. ¿Qué pasa con el juicio principal mientras se resuelve la cuestión de competencia?",
    medioCorrecto: "inhibitoria",
    tribunalCorrecto: "presunto_competente",
    articulo: "Art. 112 (117) CPC",
    explicacion: "Mientras pende el incidente de competencia, se SUSPENDE el curso de la causa principal. Esto es regla común a ambos medios (inhibitoria y declinatoria).",
  },
  {
    hechos: "Una empresa con domicilio legal en Santiago y sucursal donde se firmó el contrato en Valparaíso. Te demandan en Valparaíso. Querés impugnar competencia relativa ante el mismo tribunal de Valparaíso pidiéndole abstenerse.",
    medioCorrecto: "declinatoria",
    tribunalCorrecto: "tribunal_actual_incompetente",
    articulo: "Arts. 111 CPC, 142 COT",
    explicacion: "Declinatoria. Recuerda que el art. 142 COT permite demandar en sucursal donde se celebró el contrato. Tu argumento es débil: probablemente sea desestimada.",
  },
  {
    hechos: "Optaste por la inhibitoria. El tribunal presunto competente la acoge y oficia al actual. El actual rechaza inhibirse. ¿Qué tribunal resuelve el conflicto?",
    medioCorrecto: "inhibitoria",
    tribunalCorrecto: "presunto_competente",
    articulo: "Arts. 107-110 CPC",
    explicacion: "Cuando hay contienda positiva (ambos se creen competentes) o negativa (ninguno), resuelve el tribunal superior jerárquico común a ambos. Si son de distinta jerarquía, la Corte Suprema (190 COT).",
  },
];

export default function InhibitoriaDeclinatoria() {
  const game = useGame();
  const [i, setI] = useState(0);
  const [medio, setMedio] = useState<"inhibitoria" | "declinatoria" | null>(null);
  const [tribunal, setTribunal] = useState<"presunto_competente" | "tribunal_actual_incompetente" | null>(null);
  const [feedback, setFeedback] = useState<null | { okMedio: boolean; okTribunal: boolean; explicacion: string; art: string }>(null);
  const [aciertos, setAciertos] = useState(0);

  const caso = CASOS[i];

  if (!caso) {
    return (
      <div className="terminal p-6">
        <h2 className="label-art text-neon-blue text-xl mb-3">Cuestiones de competencia: completado</h2>
        <p className="text-parchment/70 text-sm">
          Aciertos: <b className="text-neon-cyan">{aciertos}</b> / {CASOS.length}.
        </p>
        <p className="text-parchment/60 text-xs mt-2">
          Recuerda: inhibitoria → tribunal que crees competente. Declinatoria → tribunal que crees incompetente. CPC 101-112.
        </p>
      </div>
    );
  }

  function evaluar() {
    if (!medio || !tribunal) return;
    const okMedio = medio === caso.medioCorrecto;
    const okTribunal = tribunal === caso.tribunalCorrecto;
    const ok = okMedio && okTribunal;
    setFeedback({ okMedio, okTribunal, explicacion: caso.explicacion, art: caso.articulo });
    if (ok) {
      setAciertos((a) => a + 1);
      game.ajustarAtributo("conocimiento_procesal", 1);
      game.pushLog(`Resolviste correctamente la cuestión de competencia ${i + 1}.`, caso.articulo);
    } else {
      game.ajustarTrauma(2);
    }
  }

  function siguiente() {
    setFeedback(null);
    setMedio(null);
    setTribunal(null);
    setI(i + 1);
  }

  return (
    <div className="space-y-4">
      <h2 className="label-art text-neon-blue text-xl">Inhibitoria vs Declinatoria (arts. 101-112 CPC)</h2>
      <p className="text-parchment/60 text-xs">
        Dos medios para impugnar competencia. Distinguelos por (1) ante qué tribunal y (2) qué se pide. Mientras pende, el juicio principal se suspende (art. 112).
      </p>

      <div className="terminal p-5">
        <div className="tag mb-2">CASO {i + 1} / {CASOS.length}</div>
        <p className="text-parchment text-sm">{caso.hechos}</p>
      </div>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet text-sm mb-2">1) ¿Qué medio elegís?</div>
        <div className="grid grid-cols-2 gap-2">
          {(["inhibitoria", "declinatoria"] as const).map((m) => (
            <button key={m} disabled={!!feedback} onClick={() => setMedio(m)} className={`p-3 border text-xs uppercase ${medio === m ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-ink-400"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet text-sm mb-2">2) ¿Ante qué tribunal lo presentás?</div>
        <div className="grid grid-cols-2 gap-2">
          <button disabled={!!feedback} onClick={() => setTribunal("presunto_competente")} className={`p-3 border text-xs ${tribunal === "presunto_competente" ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-ink-400"}`}>
            Tribunal que CREO competente (otro)
          </button>
          <button disabled={!!feedback} onClick={() => setTribunal("tribunal_actual_incompetente")} className={`p-3 border text-xs ${tribunal === "tribunal_actual_incompetente" ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-ink-400"}`}>
            Tribunal ACTUAL incompetente
          </button>
        </div>
      </div>

      <button className="btn" disabled={!medio || !tribunal || !!feedback} onClick={evaluar}>▸ Resolver</button>

      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`terminal p-4 ${feedback.okMedio && feedback.okTribunal ? "border-neon-blue" : "border-neon-red"}`}>
            <div className={`label-art ${feedback.okMedio && feedback.okTribunal ? "text-neon-blue" : "text-neon-red"}`}>
              Medio: {feedback.okMedio ? "✓" : "✗"} · Tribunal: {feedback.okTribunal ? "✓" : "✗"}
            </div>
            <p className="text-parchment/80 text-xs mt-2">{feedback.explicacion}</p>
            <div className="tag tag-violet mt-2">{feedback.art}</div>
            <button className="btn mt-3" onClick={siguiente}>▸ Siguiente caso</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
