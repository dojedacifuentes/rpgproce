"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGame } from "@/store/useGame";
import { sfx } from "@/lib/audio";

// ============================================================================
// TÍTULO DEL JUEGO — Pantalla de inicio épica
// Inspiración: Hades, Hollow Knight, Disco Elysium
// ============================================================================

const FRASES = [
  { art: "art. 768 CPC", texto: "La forma es sustancia." },
  { art: "art. 64 CPC", texto: "Los plazos son fatales. No hay clemencia." },
  { art: "art. 44 CPC", texto: "Dos intentos. Luego el Diario Oficial." },
  { art: "art. 152 CPC", texto: "Seis meses sin gestión útil. Abandono consumado." },
  { art: "art. 545 COT", texto: "La queja es para faltas graves. ¿Lo es?" },
  { art: "art. 254 CPC", texto: "Cinco menciones. Sin excepciones." },
  { art: "art. 76 CPR", texto: "Solo el Estado tiene jurisdicción." },
];

function FloatingArticle({ texto, x, y, delay }: { texto: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute font-mono-terminal text-[9px] text-zona-competencia/20 pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: [0, 0.4, 0.2, 0.4], y: [20, 0, -10, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {texto}
    </motion.div>
  );
}

const FLOATING_ARTICLES = [
  { texto: "art. 158 CPC", x: 5, y: 15 },
  { texto: "art. 254 CPC", x: 90, y: 25 },
  { texto: "art. 768 CPC", x: 8, y: 70 },
  { texto: "art. 44 CPC", x: 85, y: 65 },
  { texto: "art. 187 CPC", x: 15, y: 45 },
  { texto: "art. 434 CPC", x: 78, y: 45 },
  { texto: "art. 64 CPC", x: 50, y: 10 },
  { texto: "art. 290 CPC", x: 50, y: 85 },
  { texto: "art. 545 COT", x: 25, y: 85 },
  { texto: "art. 76 CPR", x: 70, y: 80 },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [fraseIdx, setFraseIdx] = useState(0);
  const [pressToContinue, setPressToContinue] = useState(false);
  const personaje = useGame((s) => s.personaje);
  const finalizado = useGame((s) => s.finalizado);
  const nivel = useGame((s) => s.nivel);

  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => setFraseIdx((x) => (x + 1) % FRASES.length), 4000);
    // Press to continue blink
    const p = setTimeout(() => setPressToContinue(true), 1500);
    return () => { clearInterval(i); clearTimeout(p); };
  }, []);

  if (!mounted) return null;
  const hayPartida = !!personaje.nombre;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 120%, rgba(138,92,255,.08), transparent),
          radial-gradient(ellipse 60% 40% at 20% -20%, rgba(75,231,255,.06), transparent),
          radial-gradient(ellipse 50% 35% at 80% 110%, rgba(217,74,74,.04), transparent),
          #06070B
        `,
      }}
    >
      {/* ─── ARTÍCULOS FLOTANTES DE FONDO ─── */}
      {FLOATING_ARTICLES.map((a, i) => (
        <FloatingArticle key={i} texto={a.texto} x={a.x} y={a.y} delay={i * 0.5} />
      ))}

      {/* ─── LÍNEA DECORATIVA SUPERIOR ─── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--zona-competencia), var(--zona-recursos), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* ─── CENTRO — TÍTULO PRINCIPAL ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mono-terminal text-[10px] uppercase tracking-[0.5em] text-zona-recursos mb-6 flex items-center gap-3"
        >
          <span className="text-zona-cautelares animate-flicker">●</span>
          SISTEMA PROCESAL CHILENO
          <span className="text-zona-cautelares animate-flicker">●</span>
        </motion.div>

        {/* TÍTULO MASIVO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-2"
        >
          {/* Shadow text */}
          <div
            className="absolute inset-0 font-display-grave text-[5rem] md:text-[9rem] lg:text-[12rem] leading-none text-doc-aged/[0.02] select-none pointer-events-none"
            style={{ top: "10%", left: "5%" }}
          >
            CPC
          </div>

          <h1
            className="font-display-grave leading-none text-doc-aged relative"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              textShadow: "0 0 60px rgba(75,231,255,.15), 0 0 120px rgba(138,92,255,.1)",
              letterSpacing: "0.1em",
            }}
          >
            FORO
          </h1>
          <h1
            className="font-display-grave leading-none relative flex items-baseline gap-2 justify-center"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              letterSpacing: "0.1em",
            }}
          >
            <span
              style={{
                color: "var(--zona-competencia)",
                textShadow: "0 0 40px rgba(75,231,255,.5), 0 0 80px rgba(75,231,255,.2)",
              }}
            >
              [in]
            </span>
            <span
              className="font-serif-juridica text-doc-aged"
              style={{
                textShadow: "0 0 40px rgba(232,223,197,.1)",
                letterSpacing: "0.05em",
              }}
            >
              visible
            </span>
          </h1>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-serif-juridica italic text-zona-prueba text-lg md:text-xl mb-10 max-w-xl"
        >
          Simulador procesal chileno. Hostil. Vivo. Inevitable.
        </motion.p>

        {/* ─── CTA BUTTONS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          {!hayPartida ? (
            <GameButton
              href="/creacion"
              primary
              label="NUEVA CAMPAÑA"
              sub="Crear personaje"
              sfxName="confirm"
              glow="var(--zona-competencia)"
            />
          ) : (
            <>
              <GameButton
                href="/juego"
                primary
                label="CONTINUAR"
                sub={`${personaje.nombre} · Nv.${nivel}`}
                sfxName="click"
                glow="var(--zona-cautelares)"
              />
              <GameButton
                href="/creacion"
                label="NUEVO JUEGO"
                sub="Nueva partida"
                sfxName="click"
                glow="var(--zona-competencia)"
              />
            </>
          )}
          <GameButton
            href="/oral"
            label="BOSSES"
            sub="Modo combate"
            sfxName="bossEntrada"
            glow="var(--zona-oralidad)"
          />
          <GameButton
            href="/expansion"
            label="SISTEMAS"
            sub="Arcade · Investigación"
            sfxName="click"
            glow="var(--zona-recursos)"
          />
        </motion.div>

        {/* ─── FRASE ROTATIVA ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="max-w-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={fraseIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div
                className="font-mono-terminal text-[9px] uppercase tracking-widest mb-1"
                style={{ color: "var(--zona-recursos)" }}
              >
                {FRASES[fraseIdx].art}
              </div>
              <div className="font-serif-juridica italic text-doc-aged/70 text-sm">
                "{FRASES[fraseIdx].texto}"
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── OPCIONES SECUNDARIAS ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-0 right-0 flex justify-center gap-6"
      >
        {[
          { href: "/examen", label: "EXAMEN", icon: "📋" },
          { href: "/codex", label: "CODEX", icon: "📜" },
          { href: "/inventario", label: "INVENTARIO", icon: "📦" },
          { href: finalizado ? "/epilogo" : "/creacion", label: finalizado ? "EPÍLOGO" : "CREACIÓN", icon: finalizado ? "🎓" : "⚡" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => sfx.click?.()}
            onMouseEnter={() => sfx.hover?.()}
            className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity"
          >
            <span className="text-base">{item.icon}</span>
            <span className="font-mono-terminal text-[8px] uppercase tracking-widest text-doc-aged/60">
              {item.label}
            </span>
          </Link>
        ))}
      </motion.div>

      {/* ─── VERSION TAG ─── */}
      <div className="absolute bottom-2 right-4 font-mono-terminal text-[8px] text-doc-aged/20">
        v5.0 · CPR · COT · CPC · frontend-only
      </div>

      {/* ─── LÍNEA DECORATIVA INFERIOR ─── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--zona-recursos), var(--zona-nulidad), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />
    </main>
  );
}

// ────────────────────────────────────────────
function GameButton({
  href,
  primary,
  label,
  sub,
  sfxName,
  glow,
}: {
  href: string;
  primary?: boolean;
  label: string;
  sub: string;
  sfxName: string;
  glow: string;
}) {
  return (
    <Link
      href={href}
      onClick={() => (sfx as any)[sfxName]?.()}
      onMouseEnter={() => sfx.hover?.()}
      className="group relative block px-6 py-4 border text-left min-w-[160px] transition-all duration-300"
      style={{
        borderColor: primary ? glow : `${glow}50`,
        background: primary ? `${glow}12` : `${glow}05`,
        boxShadow: primary ? `0 0 30px ${glow}30, inset 0 1px 0 ${glow}20` : "none",
      }}
    >
      {/* Shine effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${glow}10, transparent, ${glow}05)`,
        }}
      />

      <div
        className="font-display-grave tracking-widest text-sm relative"
        style={{ color: primary ? glow : "var(--doc-aged, #E8DFC5)" }}
      >
        {label}
      </div>
      <div className="font-mono-terminal text-[9px] text-doc-aged/40 mt-0.5 relative">{sub}</div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${glow}, transparent)` }}
      />
    </Link>
  );
}
