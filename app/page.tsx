"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const personaje = useGame((s) => s.personaje);
  const finalizado = useGame((s) => s.finalizado);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="font-display-grave text-zona-competencia text-lg term-loader">INICIANDO TERMINAL JURÍDICA</div>
      </main>
    );
  }

  const hayPartida = !!personaje.nombre;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Capa atmosférica de profundidad */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(75,231,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(75,231,255,.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* HEADER procedural */}
        <header className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-zona-competencia/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-zona-cautelares rounded-full animate-flicker" />
            <span className="text-[11px] uppercase tracking-[.3em] text-doc-aged/60 font-mono-terminal">
              TERMINAL JURÍDICA · CONEXIÓN ACTIVA · SISTEMA v3.0
            </span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-doc-aged/40 font-mono-terminal">
            {new Date().toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" })}
          </div>
        </header>

        {/* HERO */}
        <section className="flex-1 px-6 md:px-12 py-10 md:py-16 flex flex-col justify-center max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <div className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-recursos mb-4">
              EXPEDIENTE C-1725/2026 · LIBRO I-III · CPC + COT
            </div>
            <h1 className="font-display-grave text-5xl md:text-7xl lg:text-8xl text-doc-aged mb-2 leading-[1]">
              <span className="text-zona-competencia glitch-text">FORO</span> <span className="italic font-serif-juridica text-doc-aged/90">[in]</span>VISIBLE
            </h1>
            <p className="font-serif-juridica italic text-zona-prueba/70 text-xl md:text-2xl mb-8">
              Un simulador procesal chileno. Hostil. Vivo. Inevitable.
            </p>

            <div className="max-w-3xl space-y-3 mb-10">
              <p className="text-doc-aged/70 text-sm leading-relaxed font-mono-terminal">
                Creás un litigante. Estudiás jurisdicción y competencia. Notificás. Emplazás. Discutís. Probás.
                Recibís sentencia. Recurrís. Ejecutás. <span className="text-zona-nulidad">O fracasás.</span>
              </p>
              <p className="text-doc-aged/50 text-xs leading-relaxed font-mono-terminal">
                <span className="text-zona-recursos">Sistema:</span> CPR (76) · COT (1, 45-148, 545) · CPC (38-545, 158, 170, 254-433, 434-478, 766-810).
                <br />
                <span className="text-zona-cautelares">Modos:</span> arcade · detective · boss fight · oral de grado · examen.
              </p>
            </div>

            {/* CTAs principales */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Link href="/creacion" className="group relative">
                <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-competencia)" } as React.CSSProperties}>
                  <div className="text-[10px] uppercase tracking-widest text-zona-competencia/60 font-mono-terminal">NUEVA</div>
                  <div className="font-display-grave text-lg text-doc-aged group-hover:text-zona-competencia transition-colors">CAMPAÑA</div>
                </div>
              </Link>

              {hayPartida && !finalizado && (
                <Link href="/juego" className="group">
                  <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-prueba)" } as React.CSSProperties}>
                    <div className="text-[10px] uppercase tracking-widest text-zona-prueba/60 font-mono-terminal">CICLO {personaje.cicloProcesal}</div>
                    <div className="font-display-grave text-lg text-doc-aged group-hover:text-zona-prueba transition-colors">CONTINUAR</div>
                  </div>
                </Link>
              )}
              {hayPartida && finalizado && (
                <Link href="/epilogo" className="group">
                  <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-cosajuzgada)" } as React.CSSProperties}>
                    <div className="text-[10px] uppercase tracking-widest text-zona-cosajuzgada/60 font-mono-terminal">FOLIO FINAL</div>
                    <div className="font-display-grave text-lg text-doc-aged">EPÍLOGO</div>
                  </div>
                </Link>
              )}

              <Link href="/expansion" className="group">
                <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-recursos)" } as React.CSSProperties}>
                  <div className="text-[10px] uppercase tracking-widest text-zona-recursos/60 font-mono-terminal">EXPANSIÓN</div>
                  <div className="font-display-grave text-lg text-doc-aged group-hover:text-zona-recursos transition-colors">SISTEMAS v2.0</div>
                </div>
              </Link>

              <Link href="/oral" className="group">
                <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-oralidad)" } as React.CSSProperties}>
                  <div className="text-[10px] uppercase tracking-widest text-zona-oralidad/60 font-mono-terminal">COMISIÓN</div>
                  <div className="font-display-grave text-lg text-doc-aged group-hover:text-zona-oralidad transition-colors">BOSSES ORALES</div>
                </div>
              </Link>

              <Link href="/codex" className="group">
                <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-cosajuzgada)" } as React.CSSProperties}>
                  <div className="text-[10px] uppercase tracking-widest text-doc-aged/40 font-mono-terminal">CONSULTA</div>
                  <div className="font-display-grave text-lg text-doc-aged group-hover:text-zona-cosajuzgada transition-colors">CODEX</div>
                </div>
              </Link>

              <Link href="/examen" className="group">
                <div className="zona-card p-4 px-6" style={{ "--zona-color": "var(--zona-ejecutivo)" } as React.CSSProperties}>
                  <div className="text-[10px] uppercase tracking-widest text-zona-ejecutivo/60 font-mono-terminal">CÉDULA</div>
                  <div className="font-display-grave text-lg text-doc-aged group-hover:text-zona-ejecutivo transition-colors">EXAMEN</div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* identidad cromática por institución */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: 1.5 }} className="mt-16">
            <div className="divider mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-[10px] font-mono-terminal uppercase tracking-widest">
              <ZonaSwatch color="var(--zona-competencia)" label="Competencia" art="45-148 COT" />
              <ZonaSwatch color="var(--zona-recursos)" label="Recursos" art="766-810" />
              <ZonaSwatch color="var(--zona-nulidad)" label="Nulidad" art="768 / 795" />
              <ZonaSwatch color="var(--zona-ejecutivo)" label="Ejecutivo" art="434-478" />
              <ZonaSwatch color="var(--zona-prueba)" label="Prueba" art="318-427" />
              <ZonaSwatch color="var(--zona-oralidad)" label="Oralidad" art="Comisión" />
              <ZonaSwatch color="var(--zona-cautelares)" label="Cautelares" art="273-302" />
              <ZonaSwatch color="var(--zona-cosajuzgada)" label="Cosa Juzgada" art="175-177" />
            </div>
          </motion.div>
        </section>

        {/* footer técnico */}
        <footer className="px-6 md:px-12 py-4 border-t border-zona-competencia/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-doc-aged/30 font-mono-terminal">
          <span>RPG PROCE · build pedagógico examen de grado · v3.0</span>
          <span>· art. 76 CPR · art. 1 COT · art. 158 CPC ·</span>
        </footer>
      </div>
    </main>
  );
}

function ZonaSwatch({ color, label, art }: { color: string; label: string; art: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-2 h-6" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
      <div>
        <div style={{ color }}>{label}</div>
        <div className="text-doc-aged/30">{art}</div>
      </div>
    </div>
  );
}
