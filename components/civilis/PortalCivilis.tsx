"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useCivilis } from "@/store/useCivilis";
import { REGIONES_CIVIL } from "@/data/civilis/regiones";
import { CODEX_CIVIL } from "@/data/civilis/codex";

// ============================================================================
// PORTAL CIVILIS — banner de acceso a la expansión de Civil desde el hub.
// Huella mínima: un Link; no altera el juego base.
// ============================================================================

export default function PortalCivilis() {
  const [mounted, setMounted] = useState(false);
  const desbloqueado = useCivilis((s) => s.desbloqueado);
  const regionesCompletadas = useCivilis((s) => s.regionesCompletadas);
  const codexDesbloqueado = useCivilis((s) => s.codexDesbloqueado);
  useEffect(() => setMounted(true), []);

  const regs = mounted ? regionesCompletadas.length : 0;
  const codex = mounted ? codexDesbloqueado.length : 0;

  return (
    <div className="civilis-scope">
      <Link
        href="/civilis"
        onClick={() => sfx.click?.()}
        onMouseEnter={() => sfx.hover?.()}
        className="block civ-panel p-4 md:p-5 mb-2 group transition-transform hover:-translate-y-0.5"
        data-civ="compraventa"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="text-4xl md:text-5xl shrink-0 civ-float"
            style={{ filter: "drop-shadow(0 0 12px var(--civ-primary))" }}
          >
            🏰
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="civ-tag px-2 py-0.5 border rounded" style={{ borderColor: "var(--civ-primary)" }}>✦ Expansión · DLC</span>
              <span className="font-mono-terminal text-[9px] uppercase tracking-widest px-2 py-0.5 border rounded border-[var(--civ-secondary)]/60" style={{ color: "var(--civ-secondary)" }}>Derecho Civil</span>
            </div>
            <h3 className="civ-heading text-xl md:text-2xl mt-1">Civilis: El Reino de las Obligaciones</h3>
            <p className="font-serif-juridica text-[13px] opacity-70 mt-0.5 leading-snug">
              9 regiones del Derecho Civil — contratos, compraventa, promesa, mandato e hipoteca. Clasifica casos, vence jefes y completa el Codex para el grado.
            </p>
            <div className="flex items-center gap-4 mt-2 font-mono-terminal text-[10px] opacity-70">
              <span>🗺 {regs}/{REGIONES_CIVIL.length} regiones</span>
              <span>📚 {codex}/{CODEX_CIVIL.length} codex</span>
            </div>
          </div>
          <div className="civ-btn px-4 py-2 text-sm shrink-0 self-center">{desbloqueado && mounted ? "Continuar ▸" : "Entrar ▸"}</div>
        </div>
      </Link>
    </div>
  );
}
