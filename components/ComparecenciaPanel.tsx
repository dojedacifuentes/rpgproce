"use client";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// COMPARECENCIA (Institución 19) — Ley 18.120, arts. 2-4
// Sistema: validación formal del primer escrito.
// NPC: Secretaria Tribunalicia que rechaza con humor seco.
// ============================================================================

type Componente = "patrocinio" | "poder" | "firma_abogado" | "rut_demandante" | "rut_demandado" | "individualizacion" | "peticion";

const COMPONENTES_OBLIGATORIOS: { id: Componente; nombre: string; art: string; esencial: boolean }[] = [
  { id: "patrocinio", nombre: "Patrocinio de abogado habilitado", art: "Art. 1 Ley 18.120", esencial: true },
  { id: "poder", nombre: "Mandato judicial (poder)", art: "Art. 4 Ley 18.120", esencial: true },
  { id: "firma_abogado", nombre: "Firma del abogado patrocinante", art: "Art. 1 inc. 2° Ley 18.120", esencial: true },
  { id: "rut_demandante", nombre: "RUT y profesión del demandante", art: "Art. 254 N°2 CPC", esencial: true },
  { id: "rut_demandado", nombre: "RUT y domicilio del demandado", art: "Art. 254 N°3 CPC", esencial: true },
  { id: "individualizacion", nombre: "Exposición clara de hechos", art: "Art. 254 N°4 CPC", esencial: true },
  { id: "peticion", nombre: "Peticiones claras en la conclusión", art: "Art. 254 N°5 CPC", esencial: true },
];

type FraseSecretaria = { texto: string; severidad: "advertencia" | "rechazo" | "sarcasmo" };

const FRASES_SECRETARIA: Record<Componente, FraseSecretaria> = {
  patrocinio: { texto: "«Sin patrocinio. Como si esto fuera un café literario.» Escrito se tiene por no presentado (art. 1 inc. 2°).", severidad: "rechazo" },
  poder: { texto: "«¿Y el mandato? ¿Vino el cliente a firmar en mi escritorio? Le diré que vuelva a comparecer ante notario.»", severidad: "rechazo" },
  firma_abogado: { texto: "«El abogado existe, pero su firma no. Curioso fenómeno.» Inadmisible.", severidad: "rechazo" },
  rut_demandante: { texto: "«¿Quién demanda? ¿Un fantasma del 254 N°2?»", severidad: "sarcasmo" },
  rut_demandado: { texto: "«¿A quién hay que notificar? ¿Al aire?» Art. 254 N°3.", severidad: "sarcasmo" },
  individualizacion: { texto: "«Hechos vagos. La jueza necesita más que poesía.» Art. 254 N°4.", severidad: "advertencia" },
  peticion: { texto: "«Las peticiones son las que el tribunal debe fallar. Si no las pone, no las puede pronunciar (extra petita).» Art. 254 N°5.", severidad: "advertencia" },
};

export default function ComparecenciaPanel() {
  const game = useGame();
  const [marcados, setMarcados] = useState<Record<Componente, boolean>>({
    patrocinio: false, poder: false, firma_abogado: false,
    rut_demandante: false, rut_demandado: false, individualizacion: false, peticion: false,
  });
  const [resultado, setResultado] = useState<null | { admitido: boolean; faltantes: Componente[] }>(null);

  function toggle(c: Componente) {
    if (resultado) return;
    setMarcados((m) => ({ ...m, [c]: !m[c] }));
  }

  function presentar() {
    const faltantes = COMPONENTES_OBLIGATORIOS.filter((c) => !marcados[c.id]).map((c) => c.id);
    const admitido = faltantes.length === 0;
    setResultado({ admitido, faltantes });
    if (admitido) {
      game.ajustarAtributo("rigor_formal", 2);
      game.ajustarReputacion(5);
      game.pushLog("Escrito admitido. La secretaria asiente con tedio.", "Ley 18.120 + Art. 254");
      game.desbloquearLogro({ id: "comparecencia_impecable", titulo: "Comparecencia impecable", descripcion: "Todos los requisitos formales cumplidos", articulo: "Ley 18.120", desbloqueado: true });
    } else {
      game.ajustarTrauma(faltantes.length * 3);
      game.ajustarReputacion(-faltantes.length * 2);
      game.pushLog(`Escrito rechazado. Faltó: ${faltantes.join(", ")}.`, "Ley 18.120 / Art. 254");
    }
  }

  function reiniciar() {
    setMarcados({
      patrocinio: false, poder: false, firma_abogado: false,
      rut_demandante: false, rut_demandado: false, individualizacion: false, peticion: false,
    });
    setResultado(null);
  }

  return (
    <div className="space-y-4">
      {/* NPC retrato */}
      <div className="zona-card p-5 flex gap-4 items-start" style={{ "--zona-color": "var(--zona-incidentes)" } as React.CSSProperties}>
        <SecretariaTribunalicia />
        <div className="flex-1">
          <div className="font-mono-terminal text-[10px] uppercase tracking-widest text-zona-incidentes mb-1">SECRETARIA TRIBUNALICIA · NPC HOSTIL</div>
          <div className="font-display-grave text-xl text-doc-aged mb-2">Constanza Reyes</div>
          <p className="text-doc-aged/70 text-sm font-serif-juridica italic">
            «Trae todo. <span className="text-zona-incidentes">Patrocinio, poder, firma, RUT</span>. Si falta algo, lo devuelvo. Y la semana siguiente lo vuelvo a devolver. Y la siguiente. Así por seis meses, si quiere.»
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="terminal p-5">
        <div className="font-display-grave text-base text-zona-recursos tracking-widest mb-3">PRIMER ESCRITO · CHECKLIST FORMAL</div>
        <div className="space-y-2">
          {COMPONENTES_OBLIGATORIOS.map((c) => {
            const ok = marcados[c.id];
            const fallo = resultado && !resultado.admitido && resultado.faltantes.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                disabled={!!resultado}
                className={`block w-full text-left p-3 border transition-all
                  ${ok ? "border-zona-cautelares bg-zona-cautelares/5" : "border-bg-steel hover:border-zona-competencia"}
                  ${fallo ? "border-zona-nulidad bg-zona-nulidad/5 animate-flicker" : ""}
                `}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`w-4 h-4 border ${ok ? "border-zona-cautelares bg-zona-cautelares" : "border-bg-steel"} flex items-center justify-center text-bg-deep text-xs`}>
                      {ok ? "✓" : ""}
                    </span>
                    <div>
                      <div className="text-sm text-doc-aged font-mono-terminal">{c.nombre}</div>
                      <div className="text-[10px] text-doc-aged/40 mt-0.5">{c.art}</div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!resultado && (
          <button onClick={presentar} className="btn btn-recurso mt-4">▸ Presentar al tribunal</button>
        )}
      </div>

      {/* Resultado */}
      <AnimatePresence>
        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`zona-card p-5`}
            style={{ "--zona-color": resultado.admitido ? "var(--zona-cautelares)" : "var(--zona-nulidad)" } as React.CSSProperties}
          >
            <div className="font-display-grave text-2xl mb-3" style={{ color: resultado.admitido ? "var(--zona-cautelares)" : "var(--zona-nulidad)" }}>
              {resultado.admitido ? "✓ ESCRITO ADMITIDO" : "✗ ESCRITO RECHAZADO"}
            </div>

            {resultado.admitido ? (
              <p className="text-doc-aged/80 text-sm font-serif-juridica italic">
                Constanza Reyes deja el sello azul sobre el escrito. «Provéase con su mérito. Próximo.»
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-doc-aged/70 text-sm font-mono-terminal mb-3">Faltaron {resultado.faltantes.length} elementos:</p>
                {resultado.faltantes.map((f) => (
                  <div key={f} className="border-l-2 border-zona-nulidad pl-3 py-1">
                    <div className="font-serif-juridica italic text-doc-aged/90 text-sm">{FRASES_SECRETARIA[f].texto}</div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={reiniciar} className="btn mt-4">↻ Volver a presentar</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sprite simbólico de NPC — silueta sofisticada (no pixel art)
function SecretariaTribunalicia() {
  return (
    <div className="w-20 h-24 shrink-0 relative">
      <svg viewBox="0 0 80 96" className="w-full h-full">
        <defs>
          <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B2330" />
            <stop offset="100%" stopColor="#06070B" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        {/* halo de expedientes */}
        <circle cx="40" cy="50" r="38" fill="none" stroke="rgba(230,138,75,.15)" strokeDasharray="2 4" />
        {/* silueta */}
        <ellipse cx="40" cy="32" rx="14" ry="16" fill="url(#bodyG)" stroke="rgba(230,138,75,.5)" strokeWidth="0.8" />
        <path d="M20 90 Q20 60 40 56 Q60 60 60 90 Z" fill="url(#bodyG)" stroke="rgba(230,138,75,.5)" strokeWidth="0.8" />
        {/* ojos luminosos */}
        <ellipse cx="34" cy="32" rx="1.6" ry="1" fill="#E68A4B" filter="url(#glow)" />
        <ellipse cx="46" cy="32" rx="1.6" ry="1" fill="#E68A4B" filter="url(#glow)" />
        {/* escritos flotando */}
        <rect x="8" y="20" width="6" height="8" fill="rgba(232,223,197,.4)" transform="rotate(-15 11 24)" />
        <rect x="66" y="40" width="6" height="8" fill="rgba(232,223,197,.4)" transform="rotate(20 69 44)" />
        <rect x="62" y="70" width="6" height="8" fill="rgba(232,223,197,.3)" transform="rotate(-10 65 74)" />
      </svg>
    </div>
  );
}
