"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";

interface Pregunta {
  id: string;
  texto: string;
  opciones: string[];
  correcta: number;
  articulo: string;
  explicacion: string;
  dificultad: 1 | 2 | 3;
}

const PREGUNTAS: Pregunta[] = [
  {
    id: "preg_001",
    texto: "En un juicio ejecutivo, el tribunal analiza el título en",
    opciones: ["10 días", "5 días", "15 días", "20 días"],
    correcta: 0,
    articulo: "Art. 434 CPC",
    explicacion: "El tribunal tiene 10 días para verificar que el título sea ejecutivo válido.",
    dificultad: 1,
  },
  {
    id: "preg_002",
    texto: "La notificación personal requiere acto de domicilio entre",
    opciones: ["6 AM y 22 PM", "8 AM y 20 PM", "9 AM y 18 PM", "7 AM y 19 PM"],
    correcta: 0,
    articulo: "Art. 40 CPC",
    explicacion: "Las horas válidas para notificación son de 6 a 22 horas (art. 40).",
    dificultad: 1,
  },
  {
    id: "preg_003",
    texto: "La notificación subsidiaria requiere dos intentos en",
    opciones: ["dos días distintos", "el mismo día", "tres días", "una semana"],
    correcta: 0,
    articulo: "Art. 44 CPC",
    explicacion: "Se requieren DOS intentos en DÍAS DISTINTOS para notificación subsidiaria.",
    dificultad: 2,
  },
  {
    id: "preg_004",
    texto: "Tras notificación subsidiaria, debe enviarse carta certificada dentro de",
    opciones: ["2 días", "5 días", "10 días", "15 días"],
    correcta: 0,
    articulo: "Art. 46 CPC",
    explicacion: "Dentro de 2 días debe enviarse carta certificada avisando la notificación.",
    dificultad: 2,
  },
  {
    id: "preg_005",
    texto: "La cosa juzgada se adquiere cuando la sentencia",
    opciones: ["se dicta", "se ejecutoria", "se notifica", "cabe apelación"],
    correcta: 1,
    articulo: "Art. 174 CPC",
    explicacion: "La cosa juzgada material ocurre cuando la sentencia se EJECUTORIA (sin recursos pendientes).",
    dificultad: 3,
  },
  {
    id: "preg_006",
    texto: "El desasimiento se produce cuando dicta sentencia",
    opciones: ["de primera instancia", "de apelación", "de casación", "de revisión"],
    correcta: 1,
    articulo: "Art. 182 CPC",
    explicacion: "Desasimiento = tribunal de apelación dicta sentencia y se desasía del juicio.",
    dificultad: 3,
  },
  {
    id: "preg_007",
    texto: "La prescripción de una letra de cambio es",
    opciones: ["2 años", "3 años", "4 años", "5 años"],
    correcta: 1,
    articulo: "Art. 2515 CC",
    explicacion: "Plazo máximo para cobrar letra de cambio: 3 años desde el protesto.",
    dificultad: 2,
  },
  {
    id: "preg_008",
    texto: "Los bienes inembargables del ejecutado incluyen",
    opciones: ["Todos sus bienes", "Casa de habitación", "Dinero en cuenta", "Auto de trabajo"],
    correcta: 1,
    articulo: "Art. 445 CPC",
    explicacion: "La casa de habitación tiene limitaciones de embargo (bien familiar).",
    dificultad: 2,
  },
];

export default function AtaqueRepreguntas() {
  const [indice_pregunta, setIndicePregunta] = useState(0);
  const [respuestas_correctas, setRespuestasCorrectas] = useState(0);
  const [respuestas_totales, setRespuestasTotales] = useState(0);
  const [tiempo_restante, setTiempoRestante] = useState(30);
  const [respondida, setRespondida] = useState(false);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [timeout, setTimeout] = useState(false);
  const pushLog = useGame((s) => s.pushLog);

  const pregunta_actual = PREGUNTAS[indice_pregunta];

  useEffect(() => {
    if (respondida || timeout) return;

    const timer = setInterval(() => {
      setTiempoRestante((t) => {
        if (t <= 1) {
          setTimeout(true);
          sfx.warning();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [respondida, timeout]);

  function responder(opcion: number) {
    if (respondida || timeout) return;
    sfx.click();

    setSeleccion(opcion);
    const es_correcta = opcion === pregunta_actual.correcta;

    if (es_correcta) {
      sfx.oralCorrecta();
      setRespuestasCorrectas((r) => r + 1);
    } else {
      sfx.warning();
    }

    setRespuestasTotales((r) => r + 1);
    setRespondida(true);

    pushLog(
      `Repregunta ${es_correcta ? "CORRECTA" : "INCORRECTA"}: ${pregunta_actual.texto.substring(0, 50)}...`,
      es_correcta ? "SKILL" : "WARN"
    );
  }

  function siguiente() {
    if (indice_pregunta < PREGUNTAS.length - 1) {
      sfx.click();
      setIndicePregunta((i) => i + 1);
      setRespondida(false);
      setSeleccion(null);
      setTiempoRestante(30);
      setTimeout(false);
    }
  }

  const pct = respuestas_totales > 0 ? Math.round((respuestas_correctas / respuestas_totales) * 100) : 0;
  const color_tiempo = tiempo_restante > 10 ? "text-zona-cautelares" : tiempo_restante > 5 ? "text-yellow-600" : "text-zona-nulidad";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="font-mono-terminal text-[10px] uppercase text-doc-aged/40">
          PREGUNTA {indice_pregunta + 1} / {PREGUNTAS.length}
        </div>
        <div className="flex gap-3 text-[10px] font-mono-terminal">
          <span className="text-zona-cautelares">✓ {respuestas_correctas}</span>
          <span className="text-zona-nulidad">✗ {respuestas_totales - respuestas_correctas}</span>
          <span className={`font-bold ${color_tiempo}`}>{tiempo_restante}s</span>
        </div>
      </div>

      <motion.div
        key={pregunta_actual.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal p-6 space-y-4"
      >
        <div>
          <h3 className="font-display-grave text-2xl text-doc-aged mb-3">{pregunta_actual.texto}</h3>
          <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest">
            {pregunta_actual.articulo}
          </div>
        </div>

        {/* BARRA DE TIEMPO */}
        <div className="w-full bg-doc-aged/10 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${(tiempo_restante / 30) * 100}%` }}
            className={`h-full ${tiempo_restante > 10 ? "bg-zona-cautelares" : tiempo_restante > 5 ? "bg-yellow-600" : "bg-zona-nulidad"}`}
          />
        </div>

        {/* OPCIONES */}
        <div className="space-y-2">
          {pregunta_actual.opciones.map((opcion, idx) => {
            let cls = "w-full text-left p-3 border-2 transition-all ";
            if (!respondida && !timeout) {
              cls += "border-doc-aged/20 text-doc-aged/70 hover:border-doc-aged/60 hover:text-doc-aged cursor-pointer";
            } else if (idx === pregunta_actual.correcta) {
              cls += "border-zona-cautelares bg-zona-cautelares/10 text-zona-cautelares";
            } else if (idx === seleccion) {
              cls += "border-zona-nulidad bg-zona-nulidad/10 text-zona-nulidad";
            } else {
              cls += "border-doc-aged/10 text-doc-aged/30";
            }

            return (
              <button
                key={idx}
                onClick={() => responder(idx)}
                disabled={respondida || timeout}
                className={cls}
              >
                <span className="font-mono-terminal text-[9px] uppercase tracking-widest">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="ml-2 font-serif-juridica text-[11px]">{opcion}</span>
                {respondida && idx === pregunta_actual.correcta && <span className="text-[9px] ml-2">✓</span>}
                {respondida && idx === seleccion && idx !== pregunta_actual.correcta && <span className="text-[9px] ml-2">✗</span>}
              </button>
            );
          })}
        </div>

        {/* TIMEOUT MESSAGE */}
        <AnimatePresence>
          {timeout && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-zona-nulidad/10 border border-zona-nulidad/20"
            >
              <div className="text-zona-nulidad font-mono-terminal text-[9px] uppercase">⏱ TIEMPO AGOTADO</div>
              <p className="text-[10px] text-doc-aged/70 mt-1">No respondiste a tiempo. La respuesta correcta era: {pregunta_actual.opciones[pregunta_actual.correcta]}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ANÁLISIS POST-RESPUESTA */}
        <AnimatePresence>
          {(respondida || timeout) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-doc-aged/10 pt-4 space-y-3">
              <div className={`p-3 italic text-[9px] ${seleccion === pregunta_actual.correcta && !timeout ? "text-zona-cautelares/70" : "text-zona-nulidad/70"}`}>
                {pregunta_actual.explicacion}
              </div>

              {indice_pregunta < PREGUNTAS.length - 1 && (
                <button onClick={siguiente} onMouseEnter={() => sfx.hover()} className="btn btn-recurso w-full py-2 text-sm">
                  SIGUIENTE PREGUNTA →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* PROGRESO */}
      {respuestas_totales > 0 && (
        <div className="terminal p-3 space-y-2">
          <div className="text-[9px] font-mono-terminal text-doc-aged/40">ACIERTO GENERAL</div>
          <div className="flex gap-1 h-2 bg-doc-aged/10">
            <div className="bg-zona-cautelares transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[9px] font-mono-terminal text-right text-doc-aged/40">{pct}%</div>
        </div>
      )}
    </div>
  );
}
