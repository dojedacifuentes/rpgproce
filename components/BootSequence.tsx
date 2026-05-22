"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx, startAmbient } from "@/lib/audio";

const LINEAS = [
  { t: "INICIANDO TERMINAL JURÍDICA v3.0…", delay: 0 },
  { t: "» Cargando CPR (arts. 76, 77)… ok", delay: 350 },
  { t: "» Cargando COT (arts. 1, 5, 45-148, 545)… ok", delay: 600 },
  { t: "» Cargando CPC (arts. 38-810)… ok", delay: 850 },
  { t: "» Inyectando doctrina (Couture, Cassarino, Tavolari, Maturana)… ok", delay: 1150 },
  { t: "» Iniciando red doctrinal holográfica… ok", delay: 1450 },
  { t: "» Mapeando 13 zonas procesales… ok", delay: 1700 },
  { t: "» Verificando integridad del expediente activo… ok", delay: 1950 },
  { t: "» Sintetizando ambiente sonoro tribunalicio… ok", delay: 2200 },
  { t: "» Habilitando avatares NPC hostiles…", delay: 2450 },
  { t: "» TERMINAL LISTA. Bienvenido al foro.", delay: 2750 },
];

export default function BootSequence({ onFin }: { onFin: () => void }) {
  const [lineas, setLineas] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    sfx.boot();
    startAmbient("ambiente");
    LINEAS.forEach((l, i) => {
      setTimeout(() => {
        sfx.beep();
        setLineas((arr) => [...arr, l.t]);
        setProgreso(((i + 1) / LINEAS.length) * 100);
      }, l.delay);
    });
    setTimeout(() => {
      sfx.confirm();
      setDismissed(true);
      setTimeout(onFin, 600);
    }, 3300);
  }, [onFin]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-bg-deep flex flex-col items-center justify-center px-6"
        >
          {/* grilla de fondo intensa */}
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(75,231,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(75,231,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mb-8"
          >
            <div className="font-mono-terminal text-[9px] uppercase tracking-[.5em] text-zona-recursos mb-2 text-center animate-flicker">
              R · P · G · P · R · O · C · E
            </div>
            <h1 className="font-display-grave text-5xl md:text-7xl text-doc-aged tracking-[.05em] text-center glitch-text">
              FORO<span className="text-zona-competencia">[in]</span>VISIBLE
            </h1>
            <div className="font-serif-juridica italic text-zona-prueba/60 text-center mt-2 text-sm">
              Simulador Procesal Chileno · v3.0
            </div>
          </motion.div>

          {/* log de boot */}
          <div className="relative z-10 w-full max-w-2xl">
            <div className="border border-zona-competencia/30 bg-bg-oil/80 p-4 backdrop-blur">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono-terminal text-[10px] uppercase tracking-widest text-zona-competencia">SECUENCIA DE INICIO</span>
                <span className="font-mono-terminal text-[10px] text-zona-cautelares">{Math.round(progreso)}%</span>
              </div>
              <div className="h-0.5 bg-bg-deep mb-3 overflow-hidden">
                <motion.div
                  animate={{ width: `${progreso}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, var(--zona-competencia), var(--zona-recursos))" }}
                />
              </div>
              <div className="space-y-0.5 max-h-44 overflow-hidden">
                {lineas.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono-terminal text-[11px] text-doc-aged/80"
                  >
                    {l}
                  </motion.div>
                ))}
                {lineas.length < LINEAS.length && (
                  <div className="font-mono-terminal text-[11px] text-zona-competencia term-loader"></div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-3 text-[9px] font-mono-terminal text-doc-aged/30 uppercase tracking-widest">
              <span>STACK: next.js · ts · tailwind · framer-motion · web-audio</span>
              <button onClick={() => { setDismissed(true); setTimeout(onFin, 200); }} className="hover:text-zona-competencia">[ESC] saltar</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
