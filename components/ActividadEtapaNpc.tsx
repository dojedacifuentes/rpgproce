"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Npc } from "@/data/npcs-v2";
import type { ProgresionNpc } from "@/types/game";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

interface ActividadEtapaNpcProps {
  npc: Npc;
  progreso: ProgresionNpc;
  onComplete: () => void;
  onVolver: () => void;
}

type MiniChallenge = {
  pregunta: string;
  articulo: string;
  opciones: { texto: string; correcta: boolean; feedback: string }[];
  respuestaGrado: string;
};

export default function ActividadEtapaNpc({
  npc,
  progreso,
  onComplete,
  onVolver,
}: ActividadEtapaNpcProps) {
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const [respuestaIdx, setRespuestaIdx] = useState<number | null>(null);
  const avanzoNpc = useGame((s) => s.avanzoNpc);
  const completarDesafioNpc = useGame((s) => s.completarDesafioNpc);
  const gainXp = useGame((s) => s.gainXp);
  const ajustarReputacion = useGame((s) => s.ajustarReputacion);

  const etapa = npc.arco_principal.etapas[progreso.etapaActual - 1];
  const esMisionFinal = progreso.estado === "desafio_final";
  const mision = esMisionFinal ? npc.arco_principal.mision_final : null;
  const challenge = getNpcStageChallenge(npc.zona, progreso.etapaActual, esMisionFinal);
  const respuesta = respuestaIdx !== null ? challenge.opciones[respuestaIdx] : null;

  const handleCompletarActividad = (exitoso: boolean = true) => {
    if (esMisionFinal) {
      completarDesafioNpc(npc.id, exitoso, {
        reputacion: exitoso ? 30 : -15,
        trauma: exitoso ? 0 : 10,
        conocimiento: exitoso ? 5 : 0,
        skills: exitoso ? [`maestro_${npc.id}`] : [],
      });
    } else {
      avanzoNpc(npc.id, "completar_actividad");
      ajustarReputacion(etapa?.recompensa.reputacion ?? 5);
      gainXp(15 + progreso.etapaActual * 5);
      avanzoNpc(npc.id, "pasar_etapa");
    }

    onComplete();
  };

  if (mostrarIntro) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => {
            onVolver();
            sfx.click?.();
          }}
          onMouseEnter={() => sfx.hover?.()}
          className="btn btn-cyan text-sm"
        >
          ← Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal p-6 md:p-8 space-y-6"
        >
          <div>
            <div className="text-5xl mb-4">{npc.icono ?? npc.emoji}</div>
            <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
              {esMisionFinal ? "DESAFIO FINAL" : `ETAPA ${progreso.etapaActual}`}
            </h2>
            <p className="font-serif-juridica text-doc-aged/70 italic">
              {esMisionFinal ? mision?.descripcion : etapa?.descripcion}
            </p>
          </div>

          {esMisionFinal && mision && (
            <div className="border-l-4 border-zona-ejecutivo pl-4">
              <p className="font-serif-juridica text-doc-aged/80 leading-relaxed">
                {mision.contexto}
              </p>
            </div>
          )}

          <div className="bg-bg-deep/50 p-5 border border-doc-aged/20">
            <div className="font-mono-terminal text-[9px] text-doc-aged/50 uppercase tracking-wider mb-3">
              {esMisionFinal ? "Tipo de desafio" : "Actividad"}
            </div>
            <div className="font-mono-terminal text-doc-aged/75">
              {esMisionFinal
                ? `${mision?.tipo} / dificultad ${mision?.dificultad}`
                : etapa?.actividad}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setMostrarIntro(false)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-green flex-1"
            >
              Comenzar
            </button>
            <button
              onClick={() => {
                onVolver();
                sfx.click?.();
              }}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-cyan flex-1"
            >
              Volver
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setMostrarIntro(true)}
        onMouseEnter={() => sfx.hover?.()}
        className="btn btn-cyan text-sm"
      >
        ← Volver a intro
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal p-6 md:p-8 space-y-6"
      >
        <div>
          <div className="font-mono-terminal text-[9px] text-zona-recursos uppercase tracking-widest mb-2">
            {esMisionFinal ? "Desafio final" : `Etapa ${progreso.etapaActual}`} / {challenge.articulo}
          </div>
          <h2 className="font-display-grave text-2xl md:text-3xl text-doc-aged leading-tight">
            {challenge.pregunta}
          </h2>
        </div>

        <div className="space-y-2">
          {challenge.opciones.map((op, idx) => {
            const reveal = respuestaIdx !== null;
            const picked = respuestaIdx === idx;
            return (
              <button
                key={op.texto}
                disabled={reveal}
                onClick={() => {
                  setRespuestaIdx(idx);
                  if (op.correcta) sfx.confirm?.();
                  else sfx.inadmisible?.();
                }}
                onMouseEnter={() => sfx.hover?.()}
                className={`block w-full text-left p-3 border font-mono-terminal text-sm transition-colors ${
                  reveal && op.correcta
                    ? "border-zona-cautelares text-zona-cautelares bg-zona-cautelares/5"
                    : reveal && picked
                    ? "border-zona-nulidad text-zona-nulidad bg-zona-nulidad/5"
                    : "border-doc-aged/15 text-doc-aged/80 hover:border-doc-aged/35"
                }`}
              >
                {op.texto}
              </button>
            );
          })}
        </div>

        {respuesta && (
          <div className="border border-doc-aged/10 p-4 bg-bg-deep/50">
            <div className={`font-mono-terminal text-[9px] uppercase tracking-widest mb-2 ${respuesta.correcta ? "text-zona-cautelares" : "text-zona-nulidad"}`}>
              {respuesta.correcta ? "Respuesta correcta" : "Respuesta incorrecta"}
            </div>
            <p className="text-doc-aged/75 text-sm font-serif-juridica leading-relaxed">{respuesta.feedback}</p>
            <p className="text-zona-prueba text-xs font-mono-terminal mt-3">
              En grado: {challenge.respuestaGrado}
            </p>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          {respuesta && respuesta.correcta && (
            <button
              onClick={() => handleCompletarActividad(true)}
              onMouseEnter={() => sfx.hover?.()}
              className="btn btn-green flex-1"
            >
              Registrar avance
            </button>
          )}
          {respuesta && !respuesta.correcta && (
            <>
              <button
                onClick={() => setRespuestaIdx(null)}
                onMouseEnter={() => sfx.hover?.()}
                className="btn btn-red flex-1"
              >
                Reintentar con feedback
              </button>
              {esMisionFinal && (
                <button
                  onClick={() => handleCompletarActividad(false)}
                  onMouseEnter={() => sfx.hover?.()}
                  className="btn flex-1"
                >
                  Aceptar fracaso
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function getNpcStageChallenge(zona: string, etapa: number, final: boolean): MiniChallenge {
  if (final) {
    return {
      pregunta: "Debes cerrar el caso ante tu mentor. ¿Que hace convincente una respuesta de examen de grado?",
      articulo: "Metodo oral",
      opciones: [
        { texto: "Norma, requisitos, aplicacion al hecho y consecuencia procesal.", correcta: true, feedback: "Correcto. No recitas: resuelves." },
        { texto: "Una definicion larga sin aplicacion al caso.", correcta: false, feedback: "Incorrecto. El grado castiga definiciones flotantes." },
        { texto: "Citar articulos no verificados para sonar seguro.", correcta: false, feedback: "Incorrecto. Si dudas, razona y marca la duda; no inventes." },
      ],
      respuestaGrado: "Identifico institucion, cito norma segura, enumero requisitos, aplico a los hechos y cierro con efecto procesal.",
    };
  }

  if (zona === "notificaciones") {
    return {
      pregunta: etapa === 1 ? "Primera notificacion de la demanda: ¿cual es la regla de entrada?" : "Si la notificacion falla, ¿que institucion se activa?",
      articulo: "Arts. 40, 44 y 768 N°9 CPC",
      opciones: [
        { texto: "Notificacion personal o subsidiaria si se cumplen estrictamente sus requisitos.", correcta: true, feedback: "Correcto. El emplazamiento valido abre el contradictorio." },
        { texto: "Estado diario desde el inicio, porque es mas rapido.", correcta: false, feedback: "Incorrecto. Rapidez no reemplaza forma legal." },
        { texto: "Cualquier forma sirve si el demandante actuo de buena fe.", correcta: false, feedback: "Incorrecto. La buena fe no sana por si sola la falta de emplazamiento." },
      ],
      respuestaGrado: "Emplazamiento es notificacion valida mas plazo para defenderse; su omision puede causar nulidad por indefension.",
    };
  }

  if (zona === "ejecutivo") {
    return {
      pregunta: "Antes de despachar ejecucion, ¿que bloque de requisitos revisas?",
      articulo: "Arts. 434, 437, 438, 442 y 464 CPC",
      opciones: [
        { texto: "Titulo ejecutivo, obligacion liquida, exigible y accion no prescrita.", correcta: true, feedback: "Correcto. Sin esto, el ejecutivo nace enfermo." },
        { texto: "Que el acreedor tenga urgencia economica.", correcta: false, feedback: "Incorrecto. La urgencia no es titulo ejecutivo." },
        { texto: "Que el deudor sea antipatico.", correcta: false, feedback: "Incorrecto. La antipatia no esta en el art. 434 ni en el 464." },
      ],
      respuestaGrado: "El juicio ejecutivo exige titulo y requisitos de exigibilidad; la defensa se articula por excepciones taxativas.",
    };
  }

  if (zona === "recursos" || zona === "cosajuzgada" || zona === "cosa_juzgada") {
    return {
      pregunta: "Frente a una resolucion agraviante, ¿como eliges el recurso?",
      articulo: "R-A-P-E-T",
      opciones: [
        { texto: "Resolucion, agravio, plazo, efecto y tribunal.", correcta: true, feedback: "Correcto. Esa matriz evita confundir apelacion, casacion y queja." },
        { texto: "El recurso mas famoso, usualmente apelacion.", correcta: false, feedback: "Incorrecto. La fama no determina procedencia." },
        { texto: "Esperar ejecutoria para decidir con calma.", correcta: false, feedback: "Incorrecto. La calma puede precluir." },
      ],
      respuestaGrado: "Parto por resolucion impugnable y agravio; luego explico plazo, tribunal, efectos y peticion concreta.",
    };
  }

  if (zona === "prueba") {
    return {
      pregunta: "¿Como conectas prueba y carga probatoria?",
      articulo: "Arts. 341-427 CPC / art. 1698 CC",
      opciones: [
        { texto: "Identifico hecho controvertido, carga, medio idoneo, oportunidad y valor.", correcta: true, feedback: "Correcto. La prueba no es lista de supermercado." },
        { texto: "Rindo todos los medios posibles sin teoria.", correcta: false, feedback: "Incorrecto. Mas prueba no significa mejor prueba." },
        { texto: "Guardo lo mejor para sorprender despues del termino probatorio.", correcta: false, feedback: "Incorrecto. Eso suele terminar en preclusion." },
      ],
      respuestaGrado: "La prueba se ordena por hechos sustanciales, pertinentes y controvertidos, carga probatoria y oportunidad procesal.",
    };
  }

  return {
    pregunta: "¿Cual es la primera pregunta procesal antes de actuar?",
    articulo: "CPC / COT",
    opciones: [
      { texto: "Que institucion gobierna el problema y que consecuencia produce.", correcta: true, feedback: "Correcto. Primero encuadras, luego actuas." },
      { texto: "Que boton permite avanzar mas rapido.", correcta: false, feedback: "Incorrecto. Avanzar sin encuadre crea loops y nulidades." },
      { texto: "Que argumento suena mas impresionante.", correcta: false, feedback: "Incorrecto. Lo impresionante sin norma se cae." },
    ],
    respuestaGrado: "Encuadro institucion, norma, requisitos, aplicacion y consecuencia.",
  };
}
