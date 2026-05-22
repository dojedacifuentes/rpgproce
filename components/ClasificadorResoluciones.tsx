"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";

// ============================================================================
// CLASIFICADOR DE RESOLUCIONES — Arcade: Identifica tipo de resolución + recurso
// ============================================================================

type TipoResolucion = "decreto" | "auto" | "interlocutoria1" | "interlocutoria2" | "definitiva";

interface Resolucion {
  id: string;
  tipo: TipoResolucion;
  descripcion: string;
  efecto: string;
  articulos: string[];
  recurso_correcto: string;
  plazo_correcto: number; // días
  desasimiento: boolean;
  cosa_juzgada: boolean;
  trampa?: string; // qué hace que parezca otra cosa
}

const RESOLUCIONES_ARCADE: Resolucion[] = [
  {
    id: "res_001",
    tipo: "decreto",
    descripcion:
      "El tribunal ordena al receptor que notifique al demandado en su domicilio por cédula.",
    efecto: "Mera sustanciación del juicio. Acto de trámite.",
    articulos: ["Art. 76 CPC", "Art. 81 CPC"],
    recurso_correcto: "Reposición (Art. 326 CPC)",
    plazo_correcto: 3,
    desasimiento: false,
    cosa_juzgada: false,
  },
  {
    id: "res_002",
    tipo: "auto",
    descripcion:
      "El tribunal rechaza la demanda ejecutiva por prescripción de la acción (más de 3 años).",
    efecto: "Decisión en asunto de fondo. Pone fin a la instancia.",
    articulos: ["Art. 168 CPC", "Art. 174 CPC"],
    recurso_correcto: "Apelación (Art. 186 CPC)",
    plazo_correcto: 15,
    desasimiento: true,
    cosa_juzgada: true,
    trampa: "Parece interlocutoria porque resuelve una excepción, pero es definitiva.",
  },
  {
    id: "res_003",
    tipo: "interlocutoria1",
    descripcion:
      "El tribunal ordena que se amplíe el embargo a otros bienes del deudor porque los embargados son insuficientes.",
    efecto: "Resuelve un asunto accesorio pero no sustancial. Dicta en primer grado.",
    articulos: ["Art. 158 CPC", "Art. 182 CPC"],
    recurso_correcto: "Apelación (Art. 186 CPC)",
    plazo_correcto: 15,
    desasimiento: false,
    cosa_juzgada: false,
  },
  {
    id: "res_004",
    tipo: "interlocutoria2",
    descripcion:
      "La Corte de Apelaciones confirma la sentencia de primer grado rechazando todos los recursos.",
    efecto: "Dicta en segunda instancia. No puede haber apelación posterior (cosa juzgada).",
    articulos: ["Art. 182 CPC", "Art. 330 CPC"],
    recurso_correcto: "Casación en la forma (Art. 768 CPC)",
    plazo_correcto: 15,
    desasimiento: true,
    cosa_juzgada: true,
    trampa: "Parece que pueda apelarse más, pero está en segunda instancia.",
  },
  {
    id: "res_005",
    tipo: "definitiva",
    descripcion:
      "El tribunal dicta sentencia condenando al demandado al pago de la deuda más costas e intereses.",
    efecto: "Pone fin al juicio en primer grado. Produce cosa juzgada cuando se ejecutoria.",
    articulos: ["Art. 158 CPC", "Art. 175 CPC"],
    recurso_correcto: "Apelación (Art. 186 CPC)",
    plazo_correcto: 15,
    desasimiento: true,
    cosa_juzgada: false, // no juzgada hasta ejecutoriarse
  },
  {
    id: "res_006",
    tipo: "decreto",
    descripcion:
      "El tribunal acepta la prueba documental que presenta el demandante en la audiencia de prueba.",
    efecto: "Acto de mera trámite. No decide nada sustancial.",
    articulos: ["Art. 309 CPC"],
    recurso_correcto: "Ninguno (se impugna en apelación general)",
    plazo_correcto: 0,
    desasimiento: false,
    cosa_juzgada: false,
  },
  {
    id: "res_007",
    tipo: "auto",
    descripcion:
      "El tribunal declara la incompetencia de oficio porque el juicio debe tramitarse ante otro tribunal.",
    efecto: "Pone fin a la instancia sin resolver fondo.",
    articulos: ["Art. 85 CPC", "Art. 168 CPC"],
    recurso_correcto: "Apelación (Art. 186 CPC)",
    plazo_correcto: 15,
    desasimiento: true,
    cosa_juzgada: true,
    trampa: "Resuelve sobre competencia, no sobre fondo, pero igual es auto.",
  },
  {
    id: "res_008",
    tipo: "interlocutoria1",
    descripcion:
      "El tribunal accede a la recusación del juez por implicancia y designa a otro para continuar el juicio.",
    efecto: "Resuelve cuestión incidental pero mantiene el juicio en marcha.",
    articulos: ["Art. 113 CPC"],
    recurso_correcto: "Apelación (Art. 186 CPC)",
    plazo_correcto: 15,
    desasimiento: false,
    cosa_juzgada: false,
  },
];

interface OpcionRespuesta {
  valor: TipoResolucion;
  etiqueta: string;
  icono: string;
}

const OPCIONES: OpcionRespuesta[] = [
  { valor: "decreto", etiqueta: "DECRETO", icono: "📋" },
  { valor: "auto", etiqueta: "AUTO", icono: "⚖️" },
  { valor: "interlocutoria1", etiqueta: "INTERLOCUTORIA (1°)", icono: "⚔️" },
  { valor: "interlocutoria2", etiqueta: "INTERLOCUTORIA (2°)", icono: "⚔️⚔️" },
  { valor: "definitiva", etiqueta: "DEFINITIVA", icono: "👑" },
];

export default function ClasificadorResoluciones() {
  const [indice, setIndice] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [seleccion, setSeleccion] = useState<TipoResolucion | null>(null);
  const [correctas, setCorrectas] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [historia, setHistoria] = useState<{ id: string; correcta: boolean }[]>([]);
  const pushLog = useGame((s) => s.pushLog);

  const resolucion_actual = RESOLUCIONES_ARCADE[indice];
  const es_correcta = seleccion === resolucion_actual.tipo;

  function responder(tipo: TipoResolucion) {
    if (respondida) return;
    sfx.click();
    setSeleccion(tipo);
    setRespondida(true);

    const correcto = tipo === resolucion_actual.tipo;
    if (correcto) {
      sfx.oralCorrecta();
      setCorrectas((c) => c + 1);
    } else {
      sfx.warning();
    }
    setRespondidas((r) => r + 1);
    setHistoria((h) => [...h, { id: resolucion_actual.id, correcta: correcto }]);

    pushLog(
      `Clasificación ${correcto ? "CORRECTA" : "INCORRECTA"}: ${resolucion_actual.tipo}`,
      correcto ? "SKILL" : "WARN"
    );
  }

  function siguiente() {
    if (indice < RESOLUCIONES_ARCADE.length - 1) {
      sfx.click();
      setIndice((i) => i + 1);
      setRespondida(false);
      setSeleccion(null);
    }
  }

  const pct = respondidas > 0 ? Math.round((correctas / respondidas) * 100) : 0;
  const res = resolucion_actual;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="font-mono-terminal text-[10px] uppercase text-doc-aged/40">
          RESOLUCIÓN {indice + 1} / {RESOLUCIONES_ARCADE.length}
        </div>
        <div className="flex gap-3 text-[10px] font-mono-terminal">
          <span className="text-zona-cautelares">✓ {correctas}</span>
          <span className="text-zona-nulidad">✗ {respondidas - correctas}</span>
          <span className="text-doc-aged/40">{respondidas > 0 ? `${pct}%` : "—"}</span>
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      <motion.div
        key={res.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal p-6 space-y-4"
      >
        <div className="border-l-2 border-zona-cautelares pl-4">
          <p className="font-serif-juridica text-doc-aged text-lg leading-relaxed mb-3">{res.descripcion}</p>
          <div className="text-[10px] italic text-doc-aged/60 font-mono-terminal">
            EFECTO: {res.efecto}
          </div>
        </div>

        {/* OPCIONES */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6">
          {OPCIONES.map((opt) => {
            let cls = "flex flex-col items-center justify-center p-3 border-2 transition-all cursor-pointer ";
            if (!respondida) {
              cls += "border-doc-aged/20 hover:border-doc-aged/60 text-doc-aged/70";
            } else if (opt.valor === resolucion_actual.tipo) {
              cls += "border-zona-cautelares bg-zona-cautelares/10 text-zona-cautelares";
            } else if (opt.valor === seleccion) {
              cls += "border-zona-nulidad bg-zona-nulidad/10 text-zona-nulidad";
            } else {
              cls += "border-doc-aged/10 text-doc-aged/30";
            }

            return (
              <button
                key={opt.valor}
                onClick={() => responder(opt.valor)}
                onMouseEnter={() => !respondida && sfx.hover()}
                className={cls}
              >
                <span className="text-2xl mb-1">{opt.icono}</span>
                <span className="text-[9px] font-mono-terminal uppercase tracking-widest">{opt.etiqueta}</span>
                {respondida && opt.valor === resolucion_actual.tipo && (
                  <span className="text-[8px] mt-1">✓ CORRECTO</span>
                )}
                {respondida && opt.valor === seleccion && opt.valor !== resolucion_actual.tipo && (
                  <span className="text-[8px] mt-1">✗ ERROR</span>
                )}
              </button>
            );
          })}
        </div>

        {/* DETALLE POST-RESPUESTA */}
        <AnimatePresence>
          {respondida && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-doc-aged/10 pt-4 space-y-3"
            >
              {/* ARTÍCULOS */}
              <div className="flex flex-wrap gap-2">
                {res.articulos.map((art) => (
                  <span key={art} className="text-[8px] border border-doc-aged/20 px-2 py-1 text-doc-aged/60">
                    {art}
                  </span>
                ))}
              </div>

              {/* RECURSO PROCEDENTE */}
              <div className={`p-3 border text-[10px] font-mono-terminal ${es_correcta ? "border-zona-cautelares/40 bg-zona-cautelares/5" : "border-zona-nulidad/40 bg-zona-nulidad/5"}`}>
                <span className={`font-bold ${es_correcta ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
                  {es_correcta ? "✓" : "✗"}
                </span>
                <span className="ml-2">
                  RECURSO: <span className="font-display-grave text-base">{res.recurso_correcto}</span>
                </span>
                {res.plazo_correcto > 0 && <span className="block mt-1">PLAZO: {res.plazo_correcto} días</span>}
              </div>

              {/* ANÁLISIS */}
              <div className={`p-3 italic text-[9px] ${es_correcta ? "text-doc-aged/60" : "text-zona-nulidad/70"}`}>
                {es_correcta ? (
                  <>
                    <strong>Correcto.</strong> Esta es una {resolucion_actual.tipo}. {resolucion_actual.desasimiento ? "Produce desasimiento." : "No produce desasimiento."} {resolucion_actual.cosa_juzgada ? "Genera cosa juzgada." : "No genera cosa juzgada."}
                  </>
                ) : (
                  <>
                    <strong>Incorrecto.</strong> Elegiste {seleccion}, pero es una {resolucion_actual.tipo}. {resolucion_actual.trampa && <>Trampa: {resolucion_actual.trampa}</> }
                  </>
                )}
              </div>

              {/* BOTÓN SIGUIENTE */}
              {indice < RESOLUCIONES_ARCADE.length - 1 && (
                <button onClick={siguiente} onMouseEnter={() => sfx.hover()} className="btn btn-recurso w-full py-2 text-sm mt-2">
                  SIGUIENTE →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* PROGRESO */}
      {respondidas > 0 && (
        <div className="terminal p-3 space-y-2">
          <div className="text-[9px] font-mono-terminal text-doc-aged/40">PRECISIÓN CLASIFICACIÓN</div>
          <div className="flex gap-1 h-2 bg-doc-aged/10">
            <div
              className="bg-zona-cautelares transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-[9px] font-mono-terminal text-doc-aged/40 text-right">{pct}%</div>
        </div>
      )}

      {/* TIPS */}
      {indice === 0 && !respondida && (
        <div className="terminal p-3 text-[9px] font-mono-terminal text-doc-aged/50 space-y-1">
          <div>💡 DECRETO: orden de trámite sin decidir. Reposición.</div>
          <div>💡 AUTO: decide sobre excepciones/incidentes. Auto.</div>
          <div>💡 INTERLOCUTORIA 1°: decide accesorio en 1ª inst. Apelación.</div>
          <div>💡 INTERLOCUTORIA 2°: en 2ª inst, produce desasimiento. Casación.</div>
          <div>💡 DEFINITIVA: resuelve fondo en 1ª inst. Apelación → Casación.</div>
        </div>
      )}
    </div>
  );
}
