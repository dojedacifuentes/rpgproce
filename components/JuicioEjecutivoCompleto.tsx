"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

// ============================================================================
// JUICIO EJECUTIVO COMPLETO — campaña con árbol de decisiones
// Etapas: título → gestión preparatoria → mandamiento → requerimiento →
// embargo → oposición/excepciones → sentencia → apremio → tercerías.
// Cada etapa con decisiones que afectan el resultado.
// ============================================================================

type EtapaId =
  | "titulo"
  | "preparatoria"
  | "mandamiento"
  | "requerimiento"
  | "embargo"
  | "oposicion"
  | "excepciones"
  | "fallo"
  | "apremio"
  | "tercerias"
  | "final";

type Estado = {
  etapa: EtapaId;
  tituloValido: boolean;
  preparatoriaHecha: boolean;
  embargo: { hecho: boolean; bienes: string[]; inscripcion: boolean };
  excepcionesOpuestas: number[];
  excepcionesAcogidas: number[];
  fallo: "favorable" | "rechazada" | "pendiente";
  tercerias: { tipo: string; ganada: boolean }[];
  vida: number;        // salud del ejecutante
  reputacion: number;
};

const INICIAL: Estado = {
  etapa: "titulo",
  tituloValido: false,
  preparatoriaHecha: false,
  embargo: { hecho: false, bienes: [], inscripcion: false },
  excepcionesOpuestas: [],
  excepcionesAcogidas: [],
  fallo: "pendiente",
  tercerias: [],
  vida: 100,
  reputacion: 0,
};

// ─────────────── TÍTULOS EJECUTIVOS (art. 434) ───────────────
const TITULOS = [
  { id: 1, n: "1", t: "Sentencia firme, sea definitiva o interlocutoria", valido: true, requierePrep: false, hint: "Mandamiento directo. Sin gestión preparatoria." },
  { id: 2, n: "2", t: "Copia autorizada de escritura pública", valido: true, requierePrep: false, hint: "Notario validó. Procede directo." },
  { id: 3, n: "3", t: "Acta de avenimiento ante tribunal competente, autorizada por ministro de fe", valido: true, requierePrep: false, hint: "Equivalente a sentencia (267)." },
  { id: 4, n: "4a", t: "Letra de cambio o pagaré ACEPTADA y PROTESTADA por falta de pago", valido: true, requierePrep: true, hint: "Requiere notificación judicial del protesto (art. 434 N°4 inc. 2°)." },
  { id: 5, n: "4b", t: "Instrumento privado reconocido judicialmente o mandado tener por reconocido", valido: true, requierePrep: true, hint: "Gestión preparatoria: citación a reconocer firma (art. 435)." },
  { id: 6, n: "5", t: "Confesión judicial", valido: true, requierePrep: true, hint: "Requiere absolución de posiciones previa." },
  { id: 7, n: "—", t: "Boleta de honorarios firmada sin protesto", valido: false, requierePrep: false, hint: "NO es título ejecutivo. Trampa." },
  { id: 8, n: "—", t: "Cotización aceptada por correo", valido: false, requierePrep: false, hint: "NO es título. La aceptación verbal no basta." },
];

// ─────────────── EXCEPCIONES TASADAS DEL 464 ───────────────
const EXCEPCIONES_464 = [
  { n: 1, t: "Incompetencia del tribunal", real: true },
  { n: 2, t: "Falta de capacidad o personería del demandante", real: true },
  { n: 3, t: "Litispendencia", real: true },
  { n: 4, t: "Ineptitud del libelo", real: true },
  { n: 5, t: "Beneficio de excusión / caducidad de fianza", real: true },
  { n: 6, t: "Falsedad del título", real: true },
  { n: 7, t: "Falta de algún requisito del título o de validez del mismo", real: true },
  { n: 8, t: "Exceso de avalúo", real: true },
  { n: 9, t: "Pago de la deuda", real: true },
  { n: 10, t: "Remisión de la deuda", real: true },
  { n: 11, t: "Concesión de espera o prórroga", real: true },
  { n: 12, t: "Novación", real: true },
  { n: 13, t: "Compensación", real: true },
  { n: 14, t: "Nulidad de la obligación", real: true },
  { n: 15, t: "Pérdida de la cosa debida", real: true },
  { n: 16, t: "Transacción", real: true },
  { n: 17, t: "Cosa juzgada y prescripción", real: true },
  { n: 99, t: "«Que el ejecutante me cae mal»", real: false },
  { n: 100, t: "«Disconformidad estética con el monto»", real: false },
];

// ─────────────── BIENES POSIBLES (embargo) ───────────────
const BIENES_DISPONIBLES = [
  { id: "auto", nombre: "Auto sedán Toyota 2018", valor: 8_500_000, inembargable: false },
  { id: "ahorros", nombre: "Cuenta de ahorro Banco Estado", valor: 4_200_000, inembargable: false },
  { id: "inmueble", nombre: "Departamento Ñuñoa 60m²", valor: 95_000_000, inembargable: false, requiereCBR: true },
  { id: "sueldo", nombre: "Remuneración mensual (sobre el mínimo legal)", valor: 1_200_000, inembargable: false, parcial: true },
  { id: "cama", nombre: "Cama y ropa de cama (lecho)", valor: 350_000, inembargable: true, art: "445 N°1 CPC" },
  { id: "comida", nombre: "Alimentos y combustibles para un mes", valor: 200_000, inembargable: true, art: "445 N°5 CPC" },
  { id: "libros", nombre: "Libros de la profesión hasta 50 UTM", valor: 3_000_000, inembargable: true, art: "445 N°7 CPC" },
];

// ─────────────── TERCERÍAS ───────────────
const TERCERIAS_OPCIONES = [
  { id: "dominio", t: "Tercería de DOMINIO", art: "Arts. 519-520 CPC", desc: "Un tercero alega ser dueño del bien embargado. Si gana, el bien sale del embargo." },
  { id: "posesion", t: "Tercería de POSESIÓN", art: "Art. 521 CPC", desc: "El tercero alega posesión del bien (sin discutir dominio)." },
  { id: "prelacion", t: "Tercería de PRELACIÓN", art: "Art. 525 CPC", desc: "Otro acreedor pide ser pagado preferentemente sobre los bienes embargados." },
  { id: "pago", t: "Tercería de PAGO", art: "Art. 527 CPC", desc: "Otro acreedor pide concurrir al pago del producto del remate (sin preferencia)." },
];

export default function JuicioEjecutivoCompleto() {
  const game = useGame();
  const [estado, setEstado] = useState<Estado>(INICIAL);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [tituloElegido, setTituloElegido] = useState<number | null>(null);
  const [bienesElegidos, setBienesElegidos] = useState<string[]>([]);
  const [excepcionesElegidas, setExcepcionesElegidas] = useState<number[]>([]);
  const [terceriaActiva, setTerceriaActiva] = useState<string | null>(null);

  function avanzar(siguiente: EtapaId) {
    setEstado((e) => ({ ...e, etapa: siguiente }));
    sfx.confirm();
    setFeedback(null);
  }

  function reiniciar() {
    setEstado(INICIAL);
    setTituloElegido(null);
    setBienesElegidos([]);
    setExcepcionesElegidas([]);
    setTerceriaActiva(null);
    setFeedback(null);
    sfx.click();
  }

  // ─────────────────────── ETAPAS ───────────────────────
  const e = estado.etapa;

  return (
    <div className="space-y-4">
      {/* PROGRESS BAR DE ETAPAS */}
      <div className="terminal p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-ejecutivo">JUICIO EJECUTIVO · CAMPAÑA</span>
          <button onClick={reiniciar} className="text-[9px] text-doc-aged/40 hover:text-zona-ejecutivo font-mono-terminal uppercase tracking-widest">↻ reiniciar</button>
        </div>
        <div className="flex gap-1 flex-wrap">
          {(["titulo", "preparatoria", "mandamiento", "requerimiento", "embargo", "oposicion", "excepciones", "fallo", "apremio", "tercerias", "final"] as EtapaId[]).map((id) => {
            const orden = ["titulo", "preparatoria", "mandamiento", "requerimiento", "embargo", "oposicion", "excepciones", "fallo", "apremio", "tercerias", "final"];
            const actual = orden.indexOf(e);
            const yo = orden.indexOf(id);
            const completada = yo < actual;
            const esActual = id === e;
            return (
              <span key={id} className={`text-[9px] font-mono-terminal uppercase px-1.5 py-0.5 border ${
                esActual ? "border-zona-ejecutivo text-zona-ejecutivo bg-zona-ejecutivo/10" :
                completada ? "border-zona-cautelares/50 text-zona-cautelares/70" :
                "border-bg-steel text-doc-aged/30"
              }`}>{id}</span>
            );
          })}
        </div>
      </div>

      {/* ─────────────── ETAPA 1: TÍTULO ─────────────── */}
      {e === "titulo" && (
        <Panel titulo="ETAPA 1 · Verificación del Título Ejecutivo" art="Art. 434 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Tu cliente trae un documento. Antes de despachar mandamiento, hay que confirmar que es <b className="text-zona-ejecutivo">título ejecutivo</b> con obligación
            <span className="text-zona-prueba"> líquida, actualmente exigible y no prescrita</span>. Hay trampas.
          </p>
          <div className="space-y-2">
            {TITULOS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTituloElegido(t.id); sfx.click(); }}
                onMouseEnter={() => sfx.hover()}
                className={`block w-full text-left p-3 border transition-colors ${
                  tituloElegido === t.id ? (t.valido ? "border-zona-cautelares bg-zona-cautelares/5" : "border-zona-nulidad bg-zona-nulidad/5")
                  : "border-bg-steel hover:border-zona-ejecutivo"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-zona-ejecutivo font-mono-terminal text-[10px]">N°{t.n}</span>
                    <span className="text-doc-aged text-sm ml-2">{t.t}</span>
                  </div>
                  {tituloElegido === t.id && (
                    <span className={`text-xs font-mono-terminal ${t.valido ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
                      {t.valido ? "✓ VÁLIDO" : "✗ INVÁLIDO"}
                    </span>
                  )}
                </div>
                {tituloElegido === t.id && <div className="text-xs text-doc-aged/60 mt-2 italic font-serif-juridica">{t.hint}</div>}
              </button>
            ))}
          </div>
          {tituloElegido !== null && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  const t = TITULOS.find((x) => x.id === tituloElegido)!;
                  if (!t.valido) {
                    setFeedback("El título no es ejecutivo. Tu demanda será rechazada in limine. -10 reputación.");
                    setEstado((s) => ({ ...s, reputacion: s.reputacion - 10, vida: s.vida - 20 }));
                    sfx.inadmisible();
                    return;
                  }
                  setEstado((s) => ({ ...s, tituloValido: true }));
                  if (t.requierePrep) avanzar("preparatoria");
                  else avanzar("mandamiento");
                }}
                className="btn btn-cautelar"
              >
                ▸ Aceptar y continuar
              </button>
            </div>
          )}
          {feedback && <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>}
        </Panel>
      )}

      {/* ─────────────── ETAPA 2: PREPARATORIA ─────────────── */}
      {e === "preparatoria" && (
        <Panel titulo="ETAPA 2 · Gestión Preparatoria" art="Arts. 435-439 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El título elegido requiere preparación. Sin ella el mandamiento será rechazado.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <DecisionCard
              titulo="Citación a reconocer firma (art. 435)"
              desc="El demandado comparece y reconoce o niega. Silencio o respuestas evasivas: se tiene por reconocida."
              correcta={true}
              art="Art. 435 CPC"
              onClick={() => {
                setEstado((s) => ({ ...s, preparatoriaHecha: true }));
                sfx.confirm();
                avanzar("mandamiento");
              }}
            />
            <DecisionCard
              titulo="Notificar el protesto de la letra (art. 434 N°4 inc. 2°)"
              desc="Si el deudor no comparece a la audiencia dentro del 3° día o no opone tacha, queda preparada la ejecución."
              correcta={true}
              art="Art. 434 N°4 inc. 2° CPC"
              onClick={() => {
                setEstado((s) => ({ ...s, preparatoriaHecha: true }));
                sfx.confirm();
                avanzar("mandamiento");
              }}
            />
            <DecisionCard
              titulo="Saltarse la preparatoria"
              desc="Despachar el mandamiento sin preparar. Sarcasmo: a veces funciona por meses... hasta que el secretario pone atención."
              correcta={false}
              art="Trampa"
              onClick={() => {
                sfx.inadmisible();
                setEstado((s) => ({ ...s, vida: s.vida - 25, reputacion: s.reputacion - 5 }));
                setFeedback("El mandamiento será rechazado por falta de título preparado. -25 vida. -5 reputación.");
              }}
            />
          </div>
          {feedback && <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>}
        </Panel>
      )}

      {/* ─────────────── ETAPA 3: MANDAMIENTO ─────────────── */}
      {e === "mandamiento" && (
        <Panel titulo="ETAPA 3 · Mandamiento de Ejecución y Embargo" art="Arts. 441-443 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El tribunal despacha mandamiento que contiene: (a) orden de requerir de pago al deudor; (b) orden de embargar si no paga; (c) designación de un depositario provisional; (d) indicación de bienes para el embargo, si se han señalado.
          </p>
          <div className="terminal p-4 border-zona-ejecutivo mb-4">
            <div className="font-display-grave text-zona-ejecutivo text-lg mb-2">MANDAMIENTO ✓ DESPACHADO</div>
            <p className="font-serif-juridica italic text-doc-aged/80 text-sm">
              «Visto: téngase por presentada la demanda y por opuesta la fuerza ejecutiva del título. Despáchase mandamiento de ejecución y embargo contra {"<deudor>"} por la suma adeudada, intereses y costas.»
            </p>
          </div>
          <button onClick={() => avanzar("requerimiento")} className="btn btn-cautelar">▸ Notificar al ejecutado</button>
        </Panel>
      )}

      {/* ─────────────── ETAPA 4: REQUERIMIENTO ─────────────── */}
      {e === "requerimiento" && (
        <Panel titulo="ETAPA 4 · Requerimiento de Pago" art="Arts. 443, 459-461 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El receptor requiere personalmente al deudor de pago. El deudor tiene <b className="text-zona-ejecutivo">4 días hábiles</b> si fue requerido en el lugar del tribunal (8 fuera del lugar mismo territorio, 8+tabla fuera del territorio).
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <DecisionCard
              titulo="El deudor paga voluntariamente"
              desc="Casi nadie. Si paga, termina el juicio."
              correcta={true}
              art="Art. 462 CPC"
              onClick={() => {
                sfx.confirm();
                setEstado((s) => ({ ...s, fallo: "favorable", vida: 100, reputacion: s.reputacion + 10 }));
                avanzar("final");
              }}
            />
            <DecisionCard
              titulo="El deudor no paga. Procede el embargo"
              desc="Caso normal. Pasamos a embargo."
              correcta={true}
              art="Art. 443 N°2 CPC"
              onClick={() => avanzar("embargo")}
            />
          </div>
        </Panel>
      )}

      {/* ─────────────── ETAPA 5: EMBARGO ─────────────── */}
      {e === "embargo" && (
        <Panel titulo="ETAPA 5 · Embargo" art="Arts. 442-453 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Seleccioná los bienes a embargar. <b className="text-zona-nulidad">Cuidado con los bienes inembargables del art. 445.</b> Embargar un inmueble exige inscripción en el CBR.
          </p>
          <div className="space-y-2">
            {BIENES_DISPONIBLES.map((b) => {
              const elegido = bienesElegidos.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    if (b.inembargable) {
                      sfx.glitch();
                      setFeedback(`Bien INEMBARGABLE (${(b as any).art}). Tu embargo será nulo respecto de este bien. La contraparte ya está redactando incidente.`);
                      setEstado((s) => ({ ...s, vida: s.vida - 10 }));
                      return;
                    }
                    setBienesElegidos((arr) => arr.includes(b.id) ? arr.filter((x) => x !== b.id) : [...arr, b.id]);
                    sfx.click();
                  }}
                  className={`block w-full text-left p-3 border transition-colors ${
                    b.inembargable ? "border-zona-nulidad/40" :
                    elegido ? "border-zona-cautelares bg-zona-cautelares/5" :
                    "border-bg-steel hover:border-zona-ejecutivo"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-doc-aged">{b.nombre}</div>
                      <div className="text-xs text-doc-aged/60 font-mono-terminal mt-1">${b.valor.toLocaleString("es-CL")}</div>
                      {(b as any).requiereCBR && <span className="text-[9px] text-zona-prueba">requiere inscripción CBR (art. 453)</span>}
                      {(b as any).parcial && <span className="text-[9px] text-zona-prueba">parcialmente embargable (sobre mínimo no embargable, art. 445 N°4)</span>}
                    </div>
                    {b.inembargable && <span className="text-[9px] text-zona-nulidad font-mono-terminal">INEMBARGABLE · {(b as any).art}</span>}
                  </div>
                </button>
              );
            })}
          </div>
          {feedback && <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>}
          {bienesElegidos.length > 0 && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setEstado((s) => ({
                    ...s,
                    embargo: { hecho: true, bienes: bienesElegidos, inscripcion: bienesElegidos.includes("inmueble") }
                  }));
                  avanzar("oposicion");
                }}
                className="btn btn-cautelar"
              >
                ▸ Trabar embargo
              </button>
            </div>
          )}
        </Panel>
      )}

      {/* ─────────────── ETAPA 6: OPOSICIÓN ─────────────── */}
      {e === "oposicion" && (
        <Panel titulo="ETAPA 6 · Oposición del Ejecutado" art="Arts. 459-461 CPC" zona="incidentes">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El ejecutado tiene <b className="text-zona-ejecutivo">4 días hábiles</b> (8 fuera del lugar, 8+tabla fuera del territorio) para oponer excepciones. Las excepciones del art. 464 son <b>TAXATIVAS</b>.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <DecisionCard
              titulo="El ejecutado guarda silencio"
              desc="Bajo el art. 472, se omite la sentencia y el mandamiento basta de sentencia. Procede directamente al apremio."
              correcta={true}
              art="Art. 472 CPC"
              onClick={() => {
                sfx.confirm();
                setEstado((s) => ({ ...s, fallo: "favorable" }));
                avanzar("apremio");
              }}
            />
            <DecisionCard
              titulo="El ejecutado opone excepciones"
              desc="Se traba la oposición. Hay que evaluar admisibilidad y producir prueba."
              correcta={true}
              art="Art. 464 CPC"
              onClick={() => avanzar("excepciones")}
            />
          </div>
        </Panel>
      )}

      {/* ─────────────── ETAPA 7: EXCEPCIONES ─────────────── */}
      {e === "excepciones" && (
        <Panel titulo="ETAPA 7 · Excepciones (TAXATIVAS)" art="Art. 464 CPC" zona="incidentes">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El ejecutado opone estas excepciones. Identificá cuáles son REALES del art. 464 y cuáles son fraudes que se desestiman in limine.
          </p>
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {EXCEPCIONES_464.map((ex) => {
              const elegida = excepcionesElegidas.includes(ex.n);
              return (
                <button
                  key={ex.n}
                  onClick={() => {
                    setExcepcionesElegidas((arr) => arr.includes(ex.n) ? arr.filter((x) => x !== ex.n) : [...arr, ex.n]);
                    sfx.click();
                  }}
                  className={`block w-full text-left p-2 border text-xs ${
                    elegida ? (ex.real ? "border-zona-cautelares bg-zona-cautelares/5" : "border-zona-nulidad bg-zona-nulidad/5")
                    : "border-bg-steel hover:border-zona-ejecutivo"
                  }`}
                >
                  <span className="text-zona-ejecutivo font-mono-terminal mr-2">{ex.n < 99 ? `${ex.n}.` : "❖"}</span>
                  <span className="text-doc-aged/80">{ex.t}</span>
                  {elegida && (
                    <span className={`ml-2 text-[9px] font-mono-terminal ${ex.real ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
                      {ex.real ? "✓ legal" : "✗ inadmisible"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {excepcionesElegidas.length > 0 && (
            <button
              onClick={() => {
                const reales = excepcionesElegidas.filter((n) => EXCEPCIONES_464.find((e) => e.n === n)?.real);
                const falsas = excepcionesElegidas.length - reales.length;
                setEstado((s) => ({
                  ...s,
                  excepcionesAcogidas: reales,
                  fallo: reales.length >= 3 ? "rechazada" : "favorable",
                  vida: s.vida - falsas * 5,
                  reputacion: s.reputacion - falsas * 2,
                }));
                if (reales.length >= 3) {
                  setFeedback(`El tribunal acogió ${reales.length} excepciones del 464. La ejecución NO sigue adelante.`);
                  sfx.inadmisible();
                } else {
                  setFeedback(`Solo ${reales.length} excepciones acogidas. La ejecución sigue.`);
                  sfx.confirm();
                }
                avanzar("fallo");
              }}
              className="btn btn-recurso mt-4"
            >▸ Sentencia del tribunal</button>
          )}
          {feedback && <div className="mt-3 p-2 border border-zona-ejecutivo text-zona-ejecutivo text-xs font-mono-terminal">{feedback}</div>}
        </Panel>
      )}

      {/* ─────────────── ETAPA 8: FALLO ─────────────── */}
      {e === "fallo" && (
        <Panel titulo={`ETAPA 8 · Sentencia ${estado.fallo === "favorable" ? "DE PAGO" : "ABSOLUTORIA"}`} art="Arts. 470-471 CPC" zona={estado.fallo === "favorable" ? "cautelares" : "nulidad"}>
          <div className={`font-display-grave text-4xl mb-3 glitch-text ${estado.fallo === "favorable" ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
            {estado.fallo === "favorable" ? "SE ACOGE LA EJECUCIÓN" : "SE RECHAZA LA EJECUCIÓN"}
          </div>
          <p className="font-serif-juridica italic text-doc-aged/80 text-sm mb-4">
            {estado.fallo === "favorable"
              ? "«Vistos: el ejecutante demostró su crédito; las excepciones opuestas no se acogen. Se ordena seguir adelante con la ejecución hasta el pago íntegro de la deuda.»"
              : "«Vistos: las excepciones del 464 acogidas alteran el mérito ejecutivo. Se absuelve al ejecutado. El embargo queda alzado.»"}
          </p>
          {estado.fallo === "favorable"
            ? <button onClick={() => avanzar("apremio")} className="btn btn-cautelar">▸ Continuar al apremio</button>
            : <button onClick={() => avanzar("final")} className="btn btn-danger">▸ Cerrar juicio</button>
          }
        </Panel>
      )}

      {/* ─────────────── ETAPA 9: APREMIO ─────────────── */}
      {e === "apremio" && (
        <Panel titulo="ETAPA 9 · Apremio (Remate)" art="Arts. 481-499 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Una vez firme la sentencia de pago, se procede al remate. Tasación previa (art. 486), publicación de avisos (art. 489), subasta pública.
          </p>
          <div className="space-y-2">
            <div className="border border-zona-ejecutivo/40 p-3">
              <div className="text-xs text-doc-aged/60 font-mono-terminal mb-1">BIENES A REMATAR</div>
              {estado.embargo.bienes.map((bid) => {
                const b = BIENES_DISPONIBLES.find((x) => x.id === bid)!;
                return <div key={bid} className="text-sm text-doc-aged">{b.nombre} — ${b.valor.toLocaleString("es-CL")}</div>;
              })}
            </div>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <DecisionCard
                titulo="Solicitar remate sin tasación (acuerdo)"
                desc="Si las partes acuerdan el precio mínimo, se omite tasación pericial."
                correcta={true}
                art="Art. 486 inc. final"
                onClick={() => { sfx.confirm(); avanzar("tercerias"); }}
              />
              <DecisionCard
                titulo="Tasación pericial + 3 publicaciones"
                desc="Procedimiento clásico. Demora 1-2 meses."
                correcta={true}
                art="Arts. 486-489 CPC"
                onClick={() => { sfx.confirm(); avanzar("tercerias"); }}
              />
            </div>
          </div>
        </Panel>
      )}

      {/* ─────────────── ETAPA 10: TERCERÍAS ─────────────── */}
      {e === "tercerias" && (
        <Panel titulo="ETAPA 10 · Tercerías (eventual)" art="Arts. 518-529 CPC" zona="incidentes">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Un tercero aparece y reclama derechos sobre los bienes embargados. Identificá qué tercería corresponde.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {TERCERIAS_OPCIONES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTerceriaActiva(t.id); sfx.hover(); }}
                className={`text-left p-3 border ${terceriaActiva === t.id ? "border-zona-incidentes bg-zona-incidentes/5" : "border-bg-steel hover:border-zona-incidentes"}`}
              >
                <div className="font-display-grave text-zona-incidentes text-sm">{t.t}</div>
                <div className="text-[10px] text-doc-aged/40 font-mono-terminal mt-1">{t.art}</div>
                <div className="text-xs text-doc-aged/70 mt-2">{t.desc}</div>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => avanzar("final")} className="btn">▸ Sin tercerías. Cerrar.</button>
            {terceriaActiva && (
              <button
                onClick={() => {
                  setEstado((s) => ({ ...s, tercerias: [{ tipo: terceriaActiva!, ganada: false }] }));
                  avanzar("final");
                }}
                className="btn btn-recurso"
              >▸ Tramitar tercería + cerrar</button>
            )}
          </div>
        </Panel>
      )}

      {/* ─────────────── FINAL ─────────────── */}
      {e === "final" && (
        <Panel titulo="EXPEDIENTE EJECUTIVO CERRADO" art="Final de campaña" zona={estado.fallo === "favorable" ? "cautelares" : "nulidad"}>
          <div className={`font-display-grave text-3xl mb-3 ${estado.fallo === "favorable" ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
            {estado.fallo === "favorable" ? "✓ EJECUCIÓN EXITOSA" : "✗ EJECUCIÓN FALLIDA"}
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs mb-4">
            <Stat label="Vida final" v={estado.vida} color={estado.vida > 60 ? "cautelares" : estado.vida > 30 ? "prueba" : "nulidad"} />
            <Stat label="Reputación" v={estado.reputacion} color="recursos" />
            <Stat label="Bienes embargados" v={estado.embargo.bienes.length} color="ejecutivo" />
          </div>
          <button onClick={reiniciar} className="btn btn-ejecutivo" style={{ borderColor: "var(--zona-ejecutivo)", color: "var(--zona-ejecutivo)" }}>↻ Nuevo ejecutivo</button>
        </Panel>
      )}
    </div>
  );
}

// ─────────────── COMPONENTES AUXILIARES ───────────────
function Panel({ titulo, art, zona, children }: { titulo: string; art: string; zona: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={titulo}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="zona-card p-5"
        style={{ "--zona-color": `var(--zona-${zona})` } as React.CSSProperties}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display-grave text-xl text-doc-aged tracking-wider">{titulo}</h3>
          <span className={`tag tag-${zona === "incidentes" ? "incidente" : zona}`}>{art}</span>
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function DecisionCard({ titulo, desc, correcta, art, onClick }: { titulo: string; desc: string; correcta: boolean; art: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => sfx.hover()}
      className="text-left p-3 border border-bg-steel hover:border-zona-ejecutivo transition-colors"
    >
      <div className="font-display-grave text-sm text-doc-aged tracking-wider">{titulo}</div>
      <div className="text-[10px] text-doc-aged/40 font-mono-terminal mt-1">{art}</div>
      <div className="text-xs text-doc-aged/70 mt-2 font-serif-juridica italic">{desc}</div>
    </button>
  );
}

function Stat({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="border border-bg-steel p-2 text-center">
      <div className="text-[9px] uppercase tracking-widest text-doc-aged/50 font-mono-terminal">{label}</div>
      <div className="font-display-grave text-2xl" style={{ color: `var(--zona-${color})` }}>{v}</div>
    </div>
  );
}
