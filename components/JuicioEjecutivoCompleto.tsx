"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";
import { fx } from "@/lib/fx";
import { EJECUTIVO_VARIANTES, type EjecutivoVariante } from "@/data/ejecutivo-variantes";

// ============================================================================
// JUICIO EJECUTIVO COMPLETO — v2.1
// Escenarios dinámicos via EJECUTIVO_VARIANTES + rewards conectados a game state
// ============================================================================

const TIPO_COLOR: Record<string, string> = {
  normal: "var(--zona-cautelares)",
  resistido: "var(--zona-ejecutivo)",
  caos: "var(--zona-nulidad)",
  terceria: "var(--zona-incidentes)",
  fraude: "var(--zona-prueba)",
};

const TIPO_LABEL: Record<string, string> = {
  normal: "Normal",
  resistido: "Resistido",
  caos: "Caos",
  terceria: "Tercería",
  fraude: "Fraude",
};

type EtapaId =
  | "escenario"
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
  varianteId: string | null;
  tituloValido: boolean;
  preparatoriaHecha: boolean;
  embargo: { hecho: boolean; bienes: string[]; inscripcion: boolean };
  excepcionesOpuestas: number[];
  excepcionesAcogidas: number[];
  fallo: "favorable" | "rechazada" | "pendiente";
  tercerias: { tipo: string; ganada: boolean }[];
  vida: number;
  reputacion: number;
};

const INICIAL: Estado = {
  etapa: "escenario",
  varianteId: null,
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

// Variantes mostradas en pantalla de selección (mixto de tipos)
// Indices según EJECUTIVO_VARIANTES: 0=normal_letra, 3=resistido_pago, 4=resistido_prescripcion,
// 5=caos_notificacion_fallida (demandado_ubicable=false), 8=terceria_dominio, 11=fraude_ocultacion
const VARIANTES_PARA_MOSTRAR: EjecutivoVariante[] = [
  EJECUTIVO_VARIANTES[0],  // normal — ejecución estándar
  EJECUTIVO_VARIANTES[3],  // resistido — pago con documentación oscura
  EJECUTIVO_VARIANTES[4],  // resistido — prescripción trampa
  EJECUTIVO_VARIANTES[5],  // caos — demandado desaparecido (activa rama art.44)
  EJECUTIVO_VARIANTES[8],  // tercería — tercero alega dominio
  EJECUTIVO_VARIANTES[11], // fraude — ocultamiento patrimonial
].filter(Boolean) as EjecutivoVariante[];

// ─────────────── COMPONENT ───────────────
export default function JuicioEjecutivoCompleto() {
  const game = useGame();
  const [estado, setEstado] = useState<Estado>(INICIAL);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [tituloElegido, setTituloElegido] = useState<number | null>(null);
  const [bienesElegidos, setBienesElegidos] = useState<string[]>([]);
  const [excepcionesElegidas, setExcepcionesElegidas] = useState<number[]>([]);
  const [terceriaActiva, setTerceriaActiva] = useState<string | null>(null);
  const [rewarded, setRewarded] = useState(false);
  const [rewardDisplay, setRewardDisplay] = useState<{ xp: number; monedas: number; rep: number } | null>(null);

  const variante = EJECUTIVO_VARIANTES.find((v) => v.id === estado.varianteId) ?? null;

  // Aplicar rewards al entrar en etapa final
  useEffect(() => {
    if (estado.etapa !== "final" || rewarded) return;
    setRewarded(true);
    const dif = variante?.dificultad ?? 3;
    if (estado.fallo === "favorable") {
      const xp = 80 + dif * 5;
      const monedas = 30 + dif * 3;
      fx.success();
      fx.xpGain(xp);
      fx.coinGain(monedas);
      game.gainXp(xp);
      game.gainMonedas(monedas);
      game.ajustarReputacion(15);
      game.pushLog(`Ejecutivo "${variante?.titulo ?? "caso"}" — ACOGIDO (+${xp} XP, +${monedas}🪙)`, "ejecutivo");
      setRewardDisplay({ xp, monedas, rep: 15 });
    } else if (estado.fallo === "rechazada") {
      fx.danger();
      game.ajustarTrauma(8);
      game.ajustarReputacion(-5);
      game.pushLog(`Ejecutivo "${variante?.titulo ?? "caso"}" — RECHAZADO`, "fracaso");
      setRewardDisplay({ xp: 0, monedas: 0, rep: -5 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.etapa]);

  function avanzar(siguiente: EtapaId) {
    setEstado((s) => ({ ...s, etapa: siguiente }));
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
    setRewarded(false);
    setRewardDisplay(null);
    sfx.click();
  }

  const e = estado.etapa;

  const ORDEN_ETAPAS: EtapaId[] = [
    "titulo", "preparatoria", "mandamiento", "requerimiento",
    "embargo", "oposicion", "excepciones", "fallo", "apremio", "tercerias", "final",
  ];

  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">

      {/* PROGRESS BAR — solo después de seleccionar escenario */}
      {e !== "escenario" && (
        <div className="terminal p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-ejecutivo">
              JUICIO EJECUTIVO
              {variante && (
                <span className="ml-2 text-[8px]" style={{ color: TIPO_COLOR[variante.tipo] }}>
                  [{TIPO_LABEL[variante.tipo].toUpperCase()}] · {variante.titulo}
                </span>
              )}
            </span>
            <button onClick={reiniciar} className="text-[9px] text-doc-aged/40 hover:text-zona-ejecutivo font-mono-terminal uppercase tracking-widest">
              ↻ reiniciar
            </button>
          </div>
          <div className="flex gap-1 flex-wrap">
            {ORDEN_ETAPAS.map((id) => {
              const actual = ORDEN_ETAPAS.indexOf(e);
              const yo = ORDEN_ETAPAS.indexOf(id);
              const completada = yo < actual;
              const esActual = id === e;
              return (
                <span
                  key={id}
                  className={`text-[9px] font-mono-terminal uppercase px-1.5 py-0.5 border ${
                    esActual
                      ? "border-zona-ejecutivo text-zona-ejecutivo bg-zona-ejecutivo/10"
                      : completada
                      ? "border-zona-cautelares/50 text-zona-cautelares/70"
                      : "border-bg-steel text-doc-aged/30"
                  }`}
                >
                  {id}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 0: SELECCIÓN DE ESCENARIO
      ═══════════════════════════════════════════════════ */}
      {e === "escenario" && (
        <Panel titulo="SELECCIÓN DE EXPEDIENTE" art="Elige tu caso" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-5">
            Tu estudio recibió varios expedientes. Cada uno presenta un escenario distinto del
            juicio ejecutivo — desde ejecuciones rutinarias hasta fraudes complejos.
            Elige el que enfrentarás.
          </p>
          <div className="space-y-2">
            {VARIANTES_PARA_MOSTRAR.map((v) => (
              <motion.button
                key={v.id}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setEstado((s) => ({ ...s, varianteId: v.id }));
                  sfx.click();
                  avanzar("titulo");
                }}
                onMouseEnter={() => sfx.hover()}
                className="block w-full text-left p-3 border border-bg-steel hover:border-zona-ejecutivo transition-colors"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[8px] font-mono-terminal uppercase px-1.5 py-0.5 border shrink-0"
                        style={{ borderColor: TIPO_COLOR[v.tipo], color: TIPO_COLOR[v.tipo] }}
                      >
                        {TIPO_LABEL[v.tipo]}
                      </span>
                      <span className="font-display-grave text-sm text-doc-aged">{v.titulo}</span>
                    </div>
                    <p className="text-xs font-serif-juridica italic text-doc-aged/60 truncate">{v.trama}</p>
                    <div className="flex gap-3 mt-1.5">
                      <span className="font-mono-terminal text-[8px] text-doc-aged/40">
                        ${v.obligacion_monto.toLocaleString("es-CL")}
                      </span>
                      <span className="font-mono-terminal text-[8px] text-doc-aged/40">
                        {v.titulo_ejecutivo.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {Array.from({ length: Math.ceil(v.dificultad / 2) }).map((_, i) => (
                      <span key={i} className="text-[9px]" style={{ color: v.dificultad >= 7 ? "var(--zona-nulidad)" : v.dificultad >= 4 ? "var(--zona-ejecutivo)" : "var(--zona-cautelares)" }}>■</span>
                    ))}
                    <div className="font-mono-terminal text-[7px] text-doc-aged/30 mt-0.5">dif {v.dificultad}/10</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-doc-aged/10">
            <button
              onClick={() => {
                const random = EJECUTIVO_VARIANTES[Math.floor(Math.random() * EJECUTIVO_VARIANTES.length)];
                setEstado((s) => ({ ...s, varianteId: random.id }));
                sfx.click();
                avanzar("titulo");
              }}
              className="text-[10px] font-mono-terminal text-doc-aged/40 hover:text-zona-ejecutivo uppercase tracking-widest"
            >
              ⚄ EXPEDIENTE ALEATORIO
            </button>
          </div>
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 1: TÍTULO
      ═══════════════════════════════════════════════════ */}
      {e === "titulo" && (
        <Panel titulo="ETAPA 1 · Verificación del Título Ejecutivo" art="Art. 434 CPC" zona="ejecutivo">
          {/* Advertencia prescripción según variante */}
          {variante && variante.obligacion_vencida >= 3 && (
            <div className="mb-4 p-3 border border-zona-nulidad/60 bg-zona-nulidad/5 text-xs font-mono-terminal">
              <span className="text-zona-nulidad">⚠ ALERTA:</span>{" "}
              <span className="text-doc-aged/80">
                La obligación data de hace {variante.obligacion_vencida} años.
                Verificar prescripción antes de despachar (art. 2515 CC: 3 años para títulos ejecutivos).
              </span>
            </div>
          )}
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Tu cliente trae un documento. Antes de despachar mandamiento, hay que confirmar que es{" "}
            <b className="text-zona-ejecutivo">título ejecutivo</b> con obligación
            <span className="text-zona-prueba"> líquida, actualmente exigible y no prescrita</span>.
            Hay trampas.
          </p>
          <div className="space-y-2">
            {TITULOS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTituloElegido(t.id); sfx.click(); }}
                onMouseEnter={() => sfx.hover()}
                className={`block w-full text-left p-3 border transition-colors ${
                  tituloElegido === t.id
                    ? t.valido
                      ? "border-zona-cautelares bg-zona-cautelares/5"
                      : "border-zona-nulidad bg-zona-nulidad/5"
                    : "border-bg-steel hover:border-zona-ejecutivo"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-zona-ejecutivo font-mono-terminal text-[10px]">N°{t.n}</span>
                    <span className="text-doc-aged text-sm ml-2">{t.t}</span>
                  </div>
                  {tituloElegido === t.id && (
                    <span className={`text-xs font-mono-terminal shrink-0 ${t.valido ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
                      {t.valido ? "✓ VÁLIDO" : "✗ INVÁLIDO"}
                    </span>
                  )}
                </div>
                {tituloElegido === t.id && (
                  <div className="text-xs text-doc-aged/60 mt-2 italic font-serif-juridica">{t.hint}</div>
                )}
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
                    fx.glitch();
                    return;
                  }
                  // Check prescripcion trap
                  if (variante && variante.obligacion_vencida >= 3 && (t.id === 4 || t.id === 5)) {
                    setFeedback("⚠ Trampa: pagaré/instrumento con más de 3 años. Tribunal puede declarar prescripción de oficio. -15 vida.");
                    setEstado((s) => ({ ...s, vida: s.vida - 15, reputacion: s.reputacion - 5 }));
                    sfx.glitch();
                    fx.warning();
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
          {feedback && (
            <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>
          )}
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 2: PREPARATORIA
      ═══════════════════════════════════════════════════ */}
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
              desc="Despachar el mandamiento sin preparar. A veces funciona por meses... hasta que el secretario pone atención."
              correcta={false}
              art="Trampa"
              onClick={() => {
                sfx.inadmisible();
                fx.glitch();
                setEstado((s) => ({ ...s, vida: s.vida - 25, reputacion: s.reputacion - 5 }));
                setFeedback("El mandamiento será rechazado por falta de título preparado. -25 vida. -5 reputación.");
              }}
            />
          </div>
          {feedback && (
            <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>
          )}
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 3: MANDAMIENTO
      ═══════════════════════════════════════════════════ */}
      {e === "mandamiento" && (
        <Panel titulo="ETAPA 3 · Mandamiento de Ejecución y Embargo" art="Arts. 441-443 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El tribunal despacha mandamiento que contiene: (a) orden de requerir de pago al deudor;
            (b) orden de embargar si no paga; (c) designación de un depositario provisional;
            (d) indicación de bienes para el embargo, si se han señalado.
          </p>
          <div className="terminal p-4 border-zona-ejecutivo mb-4">
            <div className="font-display-grave text-zona-ejecutivo text-lg mb-2">MANDAMIENTO ✓ DESPACHADO</div>
            <p className="font-serif-juridica italic text-doc-aged/80 text-sm">
              «Visto: téngase por presentada la demanda y por opuesta la fuerza ejecutiva del título.
              Despáchase mandamiento de ejecución y embargo contra {"<deudor>"} por la suma adeudada,
              intereses y costas.»
            </p>
          </div>
          <button onClick={() => avanzar("requerimiento")} className="btn btn-cautelar">
            ▸ Notificar al ejecutado
          </button>
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 4: REQUERIMIENTO
      ═══════════════════════════════════════════════════ */}
      {e === "requerimiento" && (
        <Panel titulo="ETAPA 4 · Requerimiento de Pago" art="Arts. 443, 459-461 CPC" zona="ejecutivo">
          {/* Complicación si demandado no ubicable */}
          {variante?.demandado_ubicable === false && (
            <div className="mb-4 p-3 border border-zona-nulidad/60 bg-zona-nulidad/5">
              <div className="font-mono-terminal text-[10px] text-zona-nulidad uppercase mb-1">⚠ COMPLICACIÓN — DEMANDADO NO ENCONTRADO</div>
              <p className="text-xs text-doc-aged/80 font-mono-terminal">{variante.trama}</p>
            </div>
          )}
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El receptor requiere personalmente al deudor de pago. El deudor tiene{" "}
            <b className="text-zona-ejecutivo">4 días hábiles</b> si fue requerido en el lugar del tribunal
            (8 fuera del lugar mismo territorio, 8+tabla fuera del territorio).
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
            {variante?.demandado_ubicable === false ? (
              <>
                <DecisionCard
                  titulo="Notificación subsidiaria (art. 44) — dos intentos + publicación"
                  desc="Receptor hace segundo intento. Tras confirmación de 2 diligencias infructuosas, se publica en Diario Oficial."
                  correcta={true}
                  art="Art. 44 CPC"
                  onClick={() => {
                    sfx.confirm();
                    setEstado((s) => ({ ...s, vida: s.vida - 5 }));
                    avanzar("embargo");
                  }}
                />
                <DecisionCard
                  titulo="Notificación en el diario sin segundo intento"
                  desc="Trampa: publicar sin completar dos intentos fallidos viola el procedimiento del art. 44."
                  correcta={false}
                  art="Art. 44 CPC (trampa)"
                  onClick={() => {
                    sfx.inadmisible();
                    fx.shake();
                    setEstado((s) => ({ ...s, vida: s.vida - 30, reputacion: s.reputacion - 10 }));
                    setFeedback("Nulidad de notificación. Se requieren DOS intentos fallidos antes de publicación. -30 vida.");
                  }}
                />
              </>
            ) : (
              <DecisionCard
                titulo="El deudor no paga. Procede el embargo"
                desc="Caso normal. Pasamos a embargo."
                correcta={true}
                art="Art. 443 N°2 CPC"
                onClick={() => avanzar("embargo")}
              />
            )}
          </div>
          {feedback && (
            <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>
          )}
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 5: EMBARGO
      ═══════════════════════════════════════════════════ */}
      {e === "embargo" && (
        <Panel titulo="ETAPA 5 · Embargo" art="Arts. 442-453 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Seleccioná los bienes a embargar.{" "}
            <b className="text-zona-nulidad">Cuidado con los bienes inembargables del art. 445.</b>{" "}
            Embargar un inmueble exige inscripción en el CBR.
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
                      fx.shake();
                      setFeedback(
                        `Bien INEMBARGABLE (${(b as { art?: string }).art ?? "art. 445"}). Tu embargo será nulo respecto de este bien. La contraparte ya está redactando incidente.`
                      );
                      setEstado((s) => ({ ...s, vida: s.vida - 10 }));
                      return;
                    }
                    setBienesElegidos((arr) =>
                      arr.includes(b.id) ? arr.filter((x) => x !== b.id) : [...arr, b.id]
                    );
                    sfx.click();
                  }}
                  className={`block w-full text-left p-3 border transition-colors ${
                    b.inembargable
                      ? "border-zona-nulidad/40"
                      : elegido
                      ? "border-zona-cautelares bg-zona-cautelares/5"
                      : "border-bg-steel hover:border-zona-ejecutivo"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-doc-aged">{b.nombre}</div>
                      <div className="text-xs text-doc-aged/60 font-mono-terminal mt-1">
                        ${b.valor.toLocaleString("es-CL")}
                      </div>
                      {(b as { requiereCBR?: boolean }).requiereCBR && (
                        <span className="text-[9px] text-zona-prueba">requiere inscripción CBR (art. 453)</span>
                      )}
                      {(b as { parcial?: boolean }).parcial && (
                        <span className="text-[9px] text-zona-prueba">
                          parcialmente embargable (sobre mínimo no embargable, art. 445 N°4)
                        </span>
                      )}
                    </div>
                    {b.inembargable && (
                      <span className="text-[9px] text-zona-nulidad font-mono-terminal">
                        INEMBARGABLE · {(b as { art?: string }).art}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {feedback && (
            <div className="mt-3 p-2 border border-zona-nulidad text-zona-nulidad text-xs font-mono-terminal">{feedback}</div>
          )}
          {bienesElegidos.length > 0 && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setEstado((s) => ({
                    ...s,
                    embargo: { hecho: true, bienes: bienesElegidos, inscripcion: bienesElegidos.includes("inmueble") },
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

      {/* ═══════════════════════════════════════════════════
          ETAPA 6: OPOSICIÓN
      ═══════════════════════════════════════════════════ */}
      {e === "oposicion" && (
        <Panel titulo="ETAPA 6 · Oposición del Ejecutado" art="Arts. 459-461 CPC" zona="incidentes">
          {/* Hint excepciones probables si el variante las define */}
          {variante && variante.excepciones_probables.length > 0 && (
            <div className="mb-4 p-2 border border-zona-incidentes/40 bg-zona-incidentes/5 text-xs font-mono-terminal">
              <span className="text-zona-incidentes">⚑ Inteligencia:</span>{" "}
              <span className="text-doc-aged/70">
                En casos como este, el ejecutado suele oponer:{" "}
                {variante.excepciones_probables.join(", ")}.
              </span>
            </div>
          )}
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            El ejecutado tiene <b className="text-zona-ejecutivo">4 días hábiles</b> para oponer excepciones.
            Las excepciones del art. 464 son <b>TAXATIVAS</b>.
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

      {/* ═══════════════════════════════════════════════════
          ETAPA 7: EXCEPCIONES
      ═══════════════════════════════════════════════════ */}
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
                    setExcepcionesElegidas((arr) =>
                      arr.includes(ex.n) ? arr.filter((x) => x !== ex.n) : [...arr, ex.n]
                    );
                    sfx.click();
                  }}
                  className={`block w-full text-left p-2 border text-xs ${
                    elegida
                      ? ex.real
                        ? "border-zona-cautelares bg-zona-cautelares/5"
                        : "border-zona-nulidad bg-zona-nulidad/5"
                      : "border-bg-steel hover:border-zona-ejecutivo"
                  }`}
                >
                  <span className="text-zona-ejecutivo font-mono-terminal mr-2">
                    {ex.n < 99 ? `${ex.n}.` : "❖"}
                  </span>
                  <span className="text-doc-aged/80">{ex.t}</span>
                  {elegida && (
                    <span
                      className={`ml-2 text-[9px] font-mono-terminal ${ex.real ? "text-zona-cautelares" : "text-zona-nulidad"}`}
                    >
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
                const reales = excepcionesElegidas.filter(
                  (n) => EXCEPCIONES_464.find((e) => e.n === n)?.real
                );
                const falsas = excepcionesElegidas.length - reales.length;
                setEstado((s) => ({
                  ...s,
                  excepcionesAcogidas: reales,
                  fallo: reales.length >= 3 ? "rechazada" : "favorable",
                  vida: s.vida - falsas * 5,
                  reputacion: s.reputacion - falsas * 2,
                }));
                if (reales.length >= 3) {
                  setFeedback(
                    `El tribunal acogió ${reales.length} excepciones del 464. La ejecución NO sigue adelante.`
                  );
                  sfx.inadmisible();
                } else {
                  setFeedback(`Solo ${reales.length} excepciones acogidas. La ejecución sigue.`);
                  sfx.confirm();
                }
                avanzar("fallo");
              }}
              className="btn btn-recurso mt-4"
            >
              ▸ Sentencia del tribunal
            </button>
          )}
          {feedback && (
            <div className="mt-3 p-2 border border-zona-ejecutivo text-zona-ejecutivo text-xs font-mono-terminal">
              {feedback}
            </div>
          )}
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 8: FALLO
      ═══════════════════════════════════════════════════ */}
      {e === "fallo" && (
        <Panel
          titulo={`ETAPA 8 · Sentencia ${estado.fallo === "favorable" ? "DE PAGO" : "ABSOLUTORIA"}`}
          art="Arts. 470-471 CPC"
          zona={estado.fallo === "favorable" ? "cautelares" : "nulidad"}
        >
          <div
            className={`font-display-grave text-4xl mb-3 glitch-text ${
              estado.fallo === "favorable" ? "text-zona-cautelares" : "text-zona-nulidad"
            }`}
          >
            {estado.fallo === "favorable" ? "SE ACOGE LA EJECUCIÓN" : "SE RECHAZA LA EJECUCIÓN"}
          </div>
          <p className="font-serif-juridica italic text-doc-aged/80 text-sm mb-4">
            {estado.fallo === "favorable"
              ? "«Vistos: el ejecutante demostró su crédito; las excepciones opuestas no se acogen. Se ordena seguir adelante con la ejecución hasta el pago íntegro de la deuda.»"
              : "«Vistos: las excepciones del 464 acogidas alteran el mérito ejecutivo. Se absuelve al ejecutado. El embargo queda alzado.»"}
          </p>
          {estado.fallo === "favorable" ? (
            <button onClick={() => avanzar("apremio")} className="btn btn-cautelar">
              ▸ Continuar al apremio
            </button>
          ) : (
            <button onClick={() => avanzar("final")} className="btn btn-danger">
              ▸ Cerrar juicio
            </button>
          )}
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          ETAPA 9: APREMIO
      ═══════════════════════════════════════════════════ */}
      {e === "apremio" && (
        <Panel titulo="ETAPA 9 · Apremio (Remate)" art="Arts. 481-499 CPC" zona="ejecutivo">
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Una vez firme la sentencia de pago, se procede al remate. Tasación previa (art. 486),
            publicación de avisos (art. 489), subasta pública.
          </p>
          <div className="space-y-2">
            <div className="border border-zona-ejecutivo/40 p-3">
              <div className="text-xs text-doc-aged/60 font-mono-terminal mb-1">BIENES A REMATAR</div>
              {estado.embargo.bienes.map((bid) => {
                const b = BIENES_DISPONIBLES.find((x) => x.id === bid);
                if (!b) return null;
                return (
                  <div key={bid} className="text-sm text-doc-aged">
                    {b.nombre} — ${b.valor.toLocaleString("es-CL")}
                  </div>
                );
              })}
              {estado.embargo.bienes.length === 0 && (
                <div className="text-doc-aged/40 text-xs italic">Sin bienes embargados registrados.</div>
              )}
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

      {/* ═══════════════════════════════════════════════════
          ETAPA 10: TERCERÍAS
      ═══════════════════════════════════════════════════ */}
      {e === "tercerias" && (
        <Panel titulo="ETAPA 10 · Tercerías (eventual)" art="Arts. 518-529 CPC" zona="incidentes">
          {/* Si escenario tiene tercero interviniente, advertir */}
          {variante?.tercero_interviniente && (
            <div className="mb-4 p-3 border border-zona-incidentes/60 bg-zona-incidentes/5 text-xs font-mono-terminal">
              <span className="text-zona-incidentes">⚑ TERCERO APARECE:</span>{" "}
              <span className="text-doc-aged/80">{variante.trama}</span>
            </div>
          )}
          <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
            Un tercero aparece y reclama derechos sobre los bienes embargados. Identificá qué tercería corresponde.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {TERCERIAS_OPCIONES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTerceriaActiva(t.id); sfx.hover(); }}
                className={`text-left p-3 border ${
                  terceriaActiva === t.id
                    ? "border-zona-incidentes bg-zona-incidentes/5"
                    : "border-bg-steel hover:border-zona-incidentes"
                }`}
              >
                <div className="font-display-grave text-zona-incidentes text-sm">{t.t}</div>
                <div className="text-[10px] text-doc-aged/40 font-mono-terminal mt-1">{t.art}</div>
                <div className="text-xs text-doc-aged/70 mt-2">{t.desc}</div>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {!variante?.tercero_interviniente && (
              <button onClick={() => avanzar("final")} className="btn">
                ▸ Sin tercerías. Cerrar.
              </button>
            )}
            {terceriaActiva && (
              <button
                onClick={() => {
                  setEstado((s) => ({
                    ...s,
                    tercerias: [{ tipo: terceriaActiva!, ganada: false }],
                  }));
                  avanzar("final");
                }}
                className="btn btn-recurso"
              >
                ▸ Tramitar tercería + cerrar
              </button>
            )}
            {variante?.tercero_interviniente && !terceriaActiva && (
              <p className="text-xs text-zona-incidentes/70 font-mono-terminal italic mt-2">
                Hay un tercero activo. Debes resolver la tercería antes de cerrar.
              </p>
            )}
          </div>
        </Panel>
      )}

      {/* ═══════════════════════════════════════════════════
          FINAL
      ═══════════════════════════════════════════════════ */}
      {e === "final" && (
        <Panel
          titulo="EXPEDIENTE EJECUTIVO CERRADO"
          art="Final de campaña"
          zona={estado.fallo === "favorable" ? "cautelares" : "nulidad"}
        >
          <div
            className={`font-display-grave text-3xl mb-4 ${
              estado.fallo === "favorable" ? "text-zona-cautelares" : "text-zona-nulidad"
            }`}
          >
            {estado.fallo === "favorable" ? "✓ EJECUCIÓN EXITOSA" : "✗ EJECUCIÓN FALLIDA"}
          </div>

          {/* Caso */}
          {variante && (
            <div className="mb-4 p-3 border border-doc-aged/10 bg-bg-steel/30">
              <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase mb-1">Expediente</div>
              <div className="font-display-grave text-doc-aged text-sm">{variante.titulo}</div>
              <div className="text-xs font-serif-juridica italic text-doc-aged/60 mt-1">{variante.trama}</div>
            </div>
          )}

          {/* Stats + Rewards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <Stat label="Vida final" v={estado.vida} color={estado.vida > 60 ? "cautelares" : estado.vida > 30 ? "prueba" : "nulidad"} />
            <Stat label="Reputación local" v={estado.reputacion} color="recursos" />
            <Stat label="Bienes embargados" v={estado.embargo.bienes.length} color="ejecutivo" />
            {rewardDisplay && (
              <div className="border border-bg-steel p-2 text-center">
                <div className="text-[9px] uppercase tracking-widest text-doc-aged/50 font-mono-terminal">Recompensa</div>
                {estado.fallo === "favorable" ? (
                  <div className="font-mono-terminal text-xs mt-1">
                    <div className="text-zona-prueba">+{rewardDisplay.xp} XP</div>
                    <div className="text-zona-competencia">+{rewardDisplay.monedas} 🪙</div>
                    <div className="text-zona-recursos">+{rewardDisplay.rep} rep</div>
                  </div>
                ) : (
                  <div className="font-mono-terminal text-xs mt-1">
                    <div className="text-zona-nulidad">+8 trauma</div>
                    <div className="text-zona-nulidad">{rewardDisplay.rep} rep</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={reiniciar} className="btn" style={{ borderColor: "var(--zona-ejecutivo)", color: "var(--zona-ejecutivo)" }}>
            ↻ Nuevo expediente
          </button>
        </Panel>
      )}
    </div>
  );
}

// ─────────────── COMPONENTES AUXILIARES ───────────────
function Panel({
  titulo,
  art,
  zona,
  children,
}: {
  titulo: string;
  art: string;
  zona: string;
  children: React.ReactNode;
}) {
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

function DecisionCard({
  titulo,
  desc,
  correcta,
  art,
  onClick,
}: {
  titulo: string;
  desc: string;
  correcta: boolean;
  art: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => sfx.hover()}
      className="text-left p-3 border border-bg-steel hover:border-zona-ejecutivo transition-colors"
    >
      <div className="font-display-grave text-sm text-doc-aged tracking-wider">{titulo}</div>
      <div className="text-[10px] text-doc-aged/40 font-mono-terminal mt-1">{art}</div>
      <div className="text-xs text-doc-aged/70 mt-2 font-serif-juridica italic">{desc}</div>
      {!correcta && (
        <div className="text-[8px] font-mono-terminal text-zona-nulidad/60 mt-1 uppercase tracking-widest">⚠ Riesgo procesal</div>
      )}
    </button>
  );
}

function Stat({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="border border-bg-steel p-2 text-center">
      <div className="text-[9px] uppercase tracking-widest text-doc-aged/50 font-mono-terminal">{label}</div>
      <div className="font-display-grave text-2xl" style={{ color: `var(--zona-${color})` }}>
        {v}
      </div>
    </div>
  );
}
