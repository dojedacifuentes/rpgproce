"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";

// ============================================================================
// NOTIFICADOR MALDITO — Arcade: Practica notificaciones con eventos caóticos
// ============================================================================

type TipoNotificacion = "personal" | "subsidiaria" | "publicacion" | "correo_certificado";

interface EventoNotificacion {
  id: string;
  tipo: "demandado_escondido" | "domicilio_ambiguo" | "hora_invalida" | "falta_persona" | "receptor_falla";
  descripcion: string;
  impacto: string;
  solucion: string;
}

const EVENTOS_NOTIFICACION: EventoNotificacion[] = [
  {
    id: "evt_esc_001",
    tipo: "demandado_escondido",
    descripcion: "El demandado no está en su domicilio registrado. Nadie sabe dónde vive.",
    impacto: "Notificación personal falla. Necesitas subsidiaria (art. 44) o publicación (art. 59).",
    solucion: "Solicitar notificación subsidiaria con nuevo intento.",
  },
  {
    id: "evt_dom_001",
    tipo: "domicilio_ambiguo",
    descripcion: "El demandado dice vivir en dos ciudades. Domicilio confuso en expediente.",
    impacto: "¿Dónde notificar? Error aquí = nulidad (art. 768 N°9).",
    solucion: "Aclarar domicilio mediante incidente previo.",
  },
  {
    id: "evt_hora_001",
    tipo: "hora_invalida",
    descripcion: "El receptor intentó notificar a las 23:45 (fuera de horario).",
    impacto: "Art. 44 CPC exige horas de día. Notificación nula.",
    solucion: "Reintentar dentro de horario legal (6 AM - 22 PM).",
  },
  {
    id: "evt_persona_001",
    tipo: "falta_persona",
    descripcion: "El receptor llegó al domicilio. Pero no hay persona adulta para recibir cédula.",
    impacto: "Puedes dejar aviso en puerta (art. 44 inc. 2°) pero aún falta notificación formal.",
    solucion: "Enviar carta certificada (art. 46) para completar notificación.",
  },
  {
    id: "evt_receptor_001",
    tipo: "receptor_falla",
    descripcion: "El receptor se enfermó. Otro receptor toma el caso pero comete error de domicilio.",
    impacto: "Notificación defectuosa por negligencia de tribunal.",
    solucion: "Solicitar nulidad o que se corrija el error.",
  },
];

interface PasoNotificacion {
  num: number;
  titulo: string;
  descripcion: string;
  opciones: { valor: TipoNotificacion; texto: string }[];
  correcta: TipoNotificacion;
}

const PASOS: PasoNotificacion[] = [
  {
    num: 1,
    titulo: "Elección de modalidad",
    descripcion: "El demandado está ubicable. ¿Qué tipo de notificación practicas primero?",
    opciones: [
      { valor: "personal", texto: "Personal: directo al domicilio, frente a testigos" },
      { valor: "subsidiaria", texto: "Subsidiaria: si no lo encuentras, en su habitación con adulto" },
      { valor: "publicacion", texto: "Publicación: si es prácticamente inubicable" },
      { valor: "correo_certificado", texto: "Correo certificado: para casos simples" },
    ],
    correcta: "personal",
  },
  {
    num: 2,
    titulo: "Requisitos de notificación personal",
    descripcion: "¿Cuáles son los requisitos para que sea válida? (Art. 40 CPC)",
    opciones: [
      { valor: "personal", texto: "Entregar copia de resolución y demanda a hora de día (6-22 hrs)" },
      { valor: "subsidiaria", texto: "Solo si está fuera de su domicilio" },
      { valor: "publicacion", texto: "Si tiene más de 3 domicilios conocidos" },
      { valor: "correo_certificado", texto: "Si vive fuera de la comuna" },
    ],
    correcta: "personal",
  },
  {
    num: 3,
    titulo: "Notificación subsidiaria: dos intentos",
    descripcion:
      "El receptor no encontró al demandado. Intenta notificación subsidiaria. ¿Qué requiere el art. 44?",
    opciones: [
      { valor: "personal", texto: "Buscar en tres días distintos" },
      { valor: "subsidiaria", texto: "Buscar en DOS DÍAS distintos, entregar cédula a persona adulta o fijar aviso" },
      { valor: "publicacion", texto: "Publicar en diario oficial por 3 días" },
      { valor: "correo_certificado", texto: "Enviar por correo sin más" },
    ],
    correcta: "subsidiaria",
  },
  {
    num: 4,
    titulo: "Carta certificada posterior",
    descripcion: "Art. 46 CPC: después de notificación subsidiaria, ¿qué sigue?",
    opciones: [
      { valor: "personal", texto: "Esperar 15 días para que venza plazo" },
      { valor: "subsidiaria", texto: "Enviar carta certificada dentro de 2 días avisando la notificación" },
      { valor: "publicacion", texto: "Publicar en diario" },
      { valor: "correo_certificado", texto: "Nada más, la notificación está lista" },
    ],
    correcta: "subsidiaria",
  },
  {
    num: 5,
    titulo: "Publicación: el último recurso",
    descripcion: "El demandado es prácticamente inubicable. ¿Procede publicación (art. 59)?",
    opciones: [
      { valor: "personal", texto: "Solo si vive fuera de la República" },
      { valor: "subsidiaria", texto: "Nunca, es anticuada" },
      { valor: "publicacion", texto: "Sí, si persona es inubicable o intenta evadir notificación" },
      { valor: "correo_certificado", texto: "No, eso es solo para citaciones" },
    ],
    correcta: "publicacion",
  },
];

export default function NotificadorMaldito() {
  const [paso, setPaso] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [seleccion, setSeleccion] = useState<TipoNotificacion | null>(null);
  const [correctas, setCorrectas] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [evento_activo, setEventoActivo] = useState<EventoNotificacion | null>(null);
  const pushLog = useGame((s) => s.pushLog);

  const paso_actual = PASOS[paso];
  const es_correcta = seleccion === paso_actual.correcta;

  function responder(tipo: TipoNotificacion) {
    if (respondida) return;
    sfx.click();
    setSeleccion(tipo);
    setRespondida(true);

    const correcto = tipo === paso_actual.correcta;
    if (correcto) {
      sfx.oralCorrecta();
      setCorrectas((c) => c + 1);

      // Evento aleatorio de fallo (30% de probabilidad)
      if (Math.random() < 0.3) {
        const evento = EVENTOS_NOTIFICACION[Math.floor(Math.random() * EVENTOS_NOTIFICACION.length)];
        setEventoActivo(evento);
        sfx.warning();
      }
    } else {
      sfx.warning();
    }
    setRespondidas((r) => r + 1);
    pushLog(
      `Notificación ${correcto ? "CORRECTA" : "INCORRECTA"}: ${tipo}`,
      correcto ? "SKILL" : "WARN"
    );
  }

  function siguiente() {
    if (paso < PASOS.length - 1) {
      sfx.click();
      setPaso((p) => p + 1);
      setRespondida(false);
      setSeleccion(null);
      setEventoActivo(null);
    }
  }

  const pct = respondidas > 0 ? Math.round((correctas / respondidas) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="font-mono-terminal text-[10px] uppercase text-doc-aged/40">
          PASO {paso + 1} / {PASOS.length}
        </div>
        <div className="flex gap-3 text-[10px] font-mono-terminal">
          <span className="text-zona-cautelares">✓ {correctas}</span>
          <span className="text-zona-nulidad">✗ {respondidas - correctas}</span>
        </div>
      </div>

      <AnimatePresence>
        {evento_activo && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="terminal p-4 border-2 border-zona-nulidad bg-zona-nulidad/5 space-y-2"
          >
            <div className="text-[10px] font-mono-terminal uppercase tracking-widest text-zona-nulidad">
              ⚠ EVENTO CAÓTICO
            </div>
            <div className="text-[11px] font-serif-juridica text-doc-aged">{evento_activo.descripcion}</div>
            <div className="text-[9px] italic text-zona-nulidad/70">{evento_activo.impacto}</div>
            <div className="text-[9px] text-doc-aged/60">
              <span className="font-mono-terminal">ACCIÓN:</span> {evento_activo.solucion}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={paso_actual.num}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal p-6 space-y-4"
      >
        <div>
          <h3 className="font-display-grave text-2xl text-doc-aged mb-2">{paso_actual.titulo}</h3>
          <p className="font-serif-juridica text-doc-aged/75 text-sm">{paso_actual.descripcion}</p>
        </div>

        {/* OPCIONES */}
        <div className="space-y-2">
          {paso_actual.opciones.map((opt) => {
            let cls = "w-full text-left p-3 border-2 transition-all ";
            if (!respondida) {
              cls += "border-doc-aged/20 text-doc-aged/70 hover:border-doc-aged/60 hover:text-doc-aged cursor-pointer";
            } else if (opt.valor === paso_actual.correcta) {
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
                <span className="font-mono-terminal text-[9px] uppercase tracking-widest">
                  {opt.valor.toUpperCase()}
                </span>
                <div className="text-[11px] font-serif-juridica mt-1">{opt.texto}</div>
                {respondida && opt.valor === paso_actual.correcta && <span className="text-[9px] mt-1">✓</span>}
                {respondida && opt.valor === seleccion && opt.valor !== paso_actual.correcta && (
                  <span className="text-[9px] mt-1">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ANÁLISIS POST-RESPUESTA */}
        <AnimatePresence>
          {respondida && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-doc-aged/10 pt-4 space-y-2">
              {es_correcta ? (
                <div className="p-3 bg-zona-cautelares/5 border border-zona-cautelares/20">
                  <span className="text-zona-cautelares font-mono-terminal text-[9px] uppercase">✓ CORRECTO</span>
                  <p className="text-[10px] text-doc-aged/70 mt-2 font-serif-juridica">Aplicaste la modalidad correcta según las circunstancias.</p>
                </div>
              ) : (
                <div className="p-3 bg-zona-nulidad/5 border border-zona-nulidad/20">
                  <span className="text-zona-nulidad font-mono-terminal text-[9px] uppercase">✗ INCORRECTO</span>
                  <p className="text-[10px] text-zona-nulidad/70 mt-2 font-serif-juridica">
                    Elegiste {seleccion}, pero la respuesta es {paso_actual.correcta}. Error de notificación = nulidad (art. 768 N°9).
                  </p>
                </div>
              )}

              {paso < PASOS.length - 1 && (
                <button onClick={siguiente} onMouseEnter={() => sfx.hover()} className="btn btn-recurso w-full py-2 text-sm">
                  SIGUIENTE PASO →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* BARRA DE PROGRESO */}
      {respondidas > 0 && (
        <div className="terminal p-3 space-y-2">
          <div className="text-[9px] font-mono-terminal text-doc-aged/40">DOMINIO DE NOTIFICACIONES</div>
          <div className="flex gap-1 h-2 bg-doc-aged/10">
            <div className="bg-zona-cautelares transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[9px] font-mono-terminal text-right text-doc-aged/40">{pct}%</div>
        </div>
      )}
    </div>
  );
}
