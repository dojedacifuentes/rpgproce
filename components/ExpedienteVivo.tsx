"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { motion } from "framer-motion";
import type { VicioProcesal } from "@/types/expansion";

// ============================================================================
// EXPEDIENTE VIVO — visualización del expediente con salud procesal
// Cada vicio degrada visualmente el expediente. Glitch = corrupción jurídica.
// ============================================================================

const VICIOS_DISPONIBLES: { tipo: VicioProcesal["tipo"]; nombre: string; articulo: string; gravedad: VicioProcesal["gravedad"]; habilitaCasacion: boolean; desc: string }[] = [
  { tipo: "notificacion_defectuosa", nombre: "Notificación defectuosa", articulo: "Art. 44 CPC", gravedad: "grave", habilitaCasacion: true, desc: "Receptor no buscó al notificado en dos días distintos antes del 44." },
  { tipo: "emplazamiento_omitido", nombre: "Falta de emplazamiento", articulo: "Art. 768 N°9 CPC", gravedad: "letal", habilitaCasacion: true, desc: "Trámite esencial omitido (795 N°1). Nulidad por casación en la forma." },
  { tipo: "escrito_extemporaneo", nombre: "Escrito fuera de plazo fatal", articulo: "Art. 64 CPC", gravedad: "grave", habilitaCasacion: false, desc: "Preclusión irreversible. Plazo fatal cumplido." },
  { tipo: "recurso_improcedente", nombre: "Recurso improcedente", articulo: "Arts. 158, 181, 187 CPC", gravedad: "leve", habilitaCasacion: false, desc: "Confundiste el tipo de resolución y el recurso aplicable." },
  { tipo: "ultra_petita", nombre: "Sentencia ultra petita", articulo: "Art. 768 N°4 CPC", gravedad: "grave", habilitaCasacion: true, desc: "El fallo concedió más de lo pedido o cosa distinta. Casación segura." },
  { tipo: "omision_170", nombre: "Omisión de requisitos del 170", articulo: "Arts. 170, 768 N°5 CPC", gravedad: "grave", habilitaCasacion: true, desc: "La sentencia no cumple los requisitos formales del 170." },
  { tipo: "patrocinio_omitido", nombre: "Falta de patrocinio", articulo: "Art. 2 Ley 18.120", gravedad: "leve", habilitaCasacion: false, desc: "Escrito sin patrocinio de abogado habilitado se tiene por no presentado." },
  { tipo: "ineptitud_libelo", nombre: "Ineptitud del libelo", articulo: "Art. 303 N°4 CPC", gravedad: "leve", habilitaCasacion: false, desc: "Defecto en el modo de proponer la demanda." },
];

export default function ExpedienteVivo() {
  const game = useGame();
  const [vicios, setVicios] = useState<VicioProcesal[]>([]);

  function agregarVicio(tipo: VicioProcesal["tipo"]) {
    const v = VICIOS_DISPONIBLES.find((x) => x.tipo === tipo);
    if (!v) return;
    const nuevo: VicioProcesal = {
      id: `v-${Date.now()}`,
      tipo: v.tipo,
      descripcion: v.desc,
      articulo: v.articulo,
      gravedad: v.gravedad,
      detectado: true,
      habilitaCasacion: v.habilitaCasacion,
      fecha: Date.now(),
    };
    setVicios((arr) => [...arr, nuevo]);
    game.ajustarTrauma(v.gravedad === "letal" ? 8 : v.gravedad === "grave" ? 4 : 2);
    game.pushLog(`Vicio detectado en el expediente: ${v.nombre}`, v.articulo);
  }

  const dañoTotal = vicios.reduce((s, v) => s + (v.gravedad === "letal" ? 30 : v.gravedad === "grave" ? 15 : 5), 0);
  const salud = Math.max(0, 100 - dañoTotal);
  const colorSalud = salud > 70 ? "text-zona-notificaciones" : salud > 40 ? "text-neon-amber" : "text-zona-nulidad";
  const glitch = salud < 50;

  return (
    <div className="space-y-4">
      <h2 className="label-art text-zona-notificaciones text-xl">Expediente vivo — Salud procesal</h2>
      <p className="text-doc-aged/60 text-sm">
        Simulá vicios en el expediente y observá cómo se degrada. Salud crítica (&lt;40) habilita riesgo de casación (768) o nulidad (795).
      </p>

      <div className={`terminal p-5 ${glitch ? "animate-glitch" : ""}`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="tag mb-2">EXPEDIENTE C-2025</div>
            <div className="label-art text-lg">Rol C-1725/2026</div>
            <div className="text-xs text-doc-aged/60">Materia: contractual · Procedimiento: ordinario · Cuantía: 100 UTM</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-doc-aged/70">Salud procesal</div>
            <div className={`text-3xl ${colorSalud} ${glitch ? "glitch-text" : ""}`}>{salud}/100</div>
          </div>
        </div>
        <div className="h-2 bg-ink-700">
          <motion.div
            animate={{ width: `${salud}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${salud > 70 ? "bg-neon-blue" : salud > 40 ? "bg-neon-amber" : "bg-neon-red"}`}
          />
        </div>

        {vicios.length === 0 && (
          <p className="text-doc-aged/40 italic text-xs mt-4">Expediente limpio. Por ahora.</p>
        )}
        {vicios.length > 0 && (
          <div className="mt-4 space-y-1">
            {vicios.map((v) => (
              <div key={v.id} className={`text-xs flex justify-between border-b border-ink-400 py-2 ${v.gravedad === "letal" ? "text-zona-nulidad" : v.gravedad === "grave" ? "text-neon-amber" : "text-doc-aged/70"}`}>
                <span>{v.descripcion}</span>
                <span className="flex items-center gap-2">
                  <span className="tag">{v.gravedad}</span>
                  {v.habilitaCasacion && <span className="tag tag-red">→ casación</span>}
                  <span className="tag tag-violet">{v.articulo}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {salud < 40 && (
          <div className="mt-4 p-3 border border-neon-red text-zona-nulidad text-xs">
            ⚠ SALUD CRÍTICA. La contraparte puede deducir casación en la forma con probabilidad de éxito. La sentencia se balancea sobre el 768.
          </div>
        )}
        {salud === 0 && (
          <div className="mt-2 p-3 border border-neon-red text-zona-nulidad text-xs glitch-text">
            ☠ NULIDAD LATENTE. El procedimiento colapsa. Riesgo de invalidación del 768 N°9 (795).
          </div>
        )}
      </div>

      <div className="terminal p-4">
        <div className="label-art text-neon-violet text-sm mb-2">Simular vicios (con humor negro)</div>
        <div className="grid md:grid-cols-2 gap-2">
          {VICIOS_DISPONIBLES.map((v) => (
            <button key={v.tipo} onClick={() => agregarVicio(v.tipo)} className="p-3 border border-ink-400 hover:border-neon-red text-left text-xs">
              <div className="text-zona-competencia">{v.nombre}</div>
              <div className="text-doc-aged/60 mt-1">{v.desc}</div>
              <div className="flex gap-1 mt-2"><span className="tag">{v.gravedad}</span><span className="tag tag-violet">{v.articulo}</span></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
