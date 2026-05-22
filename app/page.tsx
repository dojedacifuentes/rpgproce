"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

const FRASES_ROTATIVAS = [
  "art. 76 CPR — Jurisdicción es la facultad de conocer, juzgar y hacer ejecutar lo juzgado.",
  "art. 64 CPC — Los plazos que señala este Código son fatales.",
  "art. 158 CPC — Las resoluciones se clasifican en sentencias, autos y decretos.",
  "art. 254 CPC — Toda demanda debe contener cinco menciones.",
  "art. 303 CPC — Solo son admisibles como excepciones dilatorias las seis enumeradas.",
  "art. 768 CPC — Las causales de casación en la forma son taxativas.",
  "art. 152 CPC — El procedimiento se entiende abandonado después de seis meses sin gestión útil.",
  "art. 545 COT — La queja procede contra faltas o abusos graves.",
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [fraseIdx, setFraseIdx] = useState(0);
  const personaje = useGame((s) => s.personaje);
  const finalizado = useGame((s) => s.finalizado);

  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => setFraseIdx((x) => (x + 1) % FRASES_ROTATIVAS.length), 4500);
    return () => clearInterval(i);
  }, []);

  if (!mounted) return null;

  const hayPartida = !!personaje.nombre;

  return (
    <main className="min-h-screen relative">
      {/* ───────────── HERO ───────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12 max-w-7xl mx-auto relative">
        {/* breadcrumb terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono-terminal text-[10px] uppercase tracking-[.4em] mb-6 flex items-center gap-3"
        >
          <span className="text-zona-cautelares animate-flicker">●</span>
          <span className="text-zona-recursos">SISTEMA</span>
          <span className="text-doc-aged/30">/</span>
          <span className="text-zona-competencia">TERMINAL</span>
          <span className="text-doc-aged/30">/</span>
          <span className="text-zona-prueba">FORO</span>
        </motion.div>

        {/* TITULAR MASIVO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          {/* artículos en sombra detrás del título */}
          <div className="absolute -top-6 -left-2 text-[8rem] md:text-[14rem] font-display-grave text-doc-aged/[0.025] pointer-events-none select-none leading-none">
            CPC
          </div>

          <h1 className="font-display-grave text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-doc-aged tracking-tight relative">
            <span className="block">FORO</span>
            <span className="block">
              <span className="text-zona-competencia glitch-text">[in]</span>
              <span className="text-doc-aged italic font-serif-juridica">visible</span>
            </span>
          </h1>

          <div className="mt-6 max-w-2xl">
            <div className="font-serif-juridica italic text-zona-prueba text-xl md:text-2xl leading-snug mb-3">
              Simulador procesal chileno. Hostil. Vivo. Inevitable.
            </div>
            <p className="text-doc-aged/60 text-sm font-mono-terminal">
              <span className="text-zona-recursos">⟨</span> CPR · COT · CPC <span className="text-zona-recursos">⟩</span>
              {" · "}
              <span className="text-zona-nulidad">art. 768</span>
              {" · "}
              <span className="text-zona-cautelares">art. 290</span>
              {" · "}
              <span className="text-zona-recursos">art. 767</span>
              {" · "}
              <span className="text-zona-ejecutivo">art. 434</span>
            </p>
          </div>
        </motion.div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          <HeroCard
            href="/creacion"
            zona="competencia"
            kicker="NUEVA"
            titulo="CAMPAÑA"
            sub="Inscríbete en el registro"
            sfxName="confirm"
          />
          {hayPartida && !finalizado && (
            <HeroCard
              href="/juego"
              zona="prueba"
              kicker={`CICLO ${personaje.cicloProcesal}`}
              titulo="CONTINUAR"
              sub={personaje.nombre}
              sfxName="click"
            />
          )}
          {hayPartida && finalizado && (
            <HeroCard href="/epilogo" zona="cosajuzgada" kicker="FOLIO FINAL" titulo="EPÍLOGO" sub="Cosa juzgada" sfxName="confirm" />
          )}
          <HeroCard href="/oral" zona="oralidad" kicker="COMISIÓN" titulo="BOSSES" sub="Anfiteatro hostil" sfxName="bossEntrada" />
          <HeroCard href="/expansion" zona="recursos" kicker="EXPANSIÓN" titulo="SISTEMAS" sub="Arcade · Abandono · Comparecencia" sfxName="click" />
          <HeroCard href="/examen" zona="ejecutivo" kicker="CÉDULA" titulo="EXAMEN" sub="20 preguntas tipo grado" sfxName="click" />
          <HeroCard href="/codex" zona="cosajuzgada" kicker="CONSULTA" titulo="CODEX" sub="Articulado completo" sfxName="hover" />
        </motion.div>

        {/* frase rotativa estilo ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 border-t border-zona-competencia/15 pt-6"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos shrink-0">
              FEED
            </span>
            <div className="flex-1 overflow-hidden">
              <motion.div
                key={fraseIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif-juridica italic text-doc-aged/80 text-base"
              >
                {FRASES_ROTATIVAS[fraseIdx]}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ───────────── IDENTIDAD CROMÁTICA ───────────── */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-recursos mb-4"
        >
          ARQUITECTURA · 10 ZONAS CROMÁTICAS
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <ZonaPill color="competencia" label="Competencia" art="45-148 COT" />
          <ZonaPill color="recursos" label="Recursos" art="766-810 CPC" />
          <ZonaPill color="nulidad" label="Nulidad" art="768 / 795 CPC" />
          <ZonaPill color="ejecutivo" label="Ejecutivo" art="434-478 CPC" />
          <ZonaPill color="prueba" label="Prueba" art="318-427 CPC" />
          <ZonaPill color="oralidad" label="Oralidad" art="Comisión" />
          <ZonaPill color="cautelares" label="Cautelares" art="273-302 CPC" />
          <ZonaPill color="cosajuzgada" label="Cosa Juzgada" art="175-177 CPC" />
          <ZonaPill color="notificaciones" label="Notificaciones" art="40-58 CPC" />
          <ZonaPill color="incidentes" label="Incidentes" art="82-91 CPC" />
        </div>
      </section>

      <footer className="px-6 md:px-12 py-6 border-t border-zona-competencia/10 text-[10px] uppercase tracking-widest text-doc-aged/25 font-mono-terminal flex justify-between max-w-7xl mx-auto">
        <span>FORO[in]VISIBLE · build v3.1 · examen de grado · sin backend</span>
        <span>art. 76 CPR · art. 1 COT · art. 158 CPC</span>
      </footer>
    </main>
  );
}

function HeroCard({ href, zona, kicker, titulo, sub, sfxName }: { href: string; zona: string; kicker: string; titulo: string; sub: string; sfxName: keyof typeof sfx }) {
  return (
    <Link
      href={href}
      onClick={() => (sfx as any)[sfxName]?.()}
      onMouseEnter={() => sfx.hover()}
      className="zona-card p-4 block group"
      style={{ "--zona-color": `var(--zona-${zona})` } as React.CSSProperties}
    >
      <div className="text-[9px] font-mono-terminal uppercase tracking-widest opacity-60" style={{ color: `var(--zona-${zona})` }}>
        {kicker}
      </div>
      <div className="font-display-grave text-xl md:text-2xl text-doc-aged group-hover:text-zona-competencia transition-colors mt-1 tracking-wider">
        {titulo}
      </div>
      <div className="text-[10px] font-mono-terminal text-doc-aged/40 mt-1.5 truncate">{sub}</div>
    </Link>
  );
}

function ZonaPill({ color, label, art }: { color: string; label: string; art: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="border border-bg-steel px-3 py-2.5 flex items-center gap-3 bg-bg-deep/40 backdrop-blur-sm"
    >
      <span
        className="w-1 h-8 shrink-0"
        style={{ backgroundColor: `var(--zona-${color})`, boxShadow: `0 0 12px var(--zona-${color})` }}
      />
      <div className="min-w-0">
        <div className="font-display-grave text-sm tracking-wider" style={{ color: `var(--zona-${color})` }}>{label}</div>
        <div className="text-[9px] font-mono-terminal text-doc-aged/30 truncate">{art}</div>
      </div>
    </motion.div>
  );
}
