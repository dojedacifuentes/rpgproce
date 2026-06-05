"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useProcesal } from "@/store/useProcesal";
import { EDIFICIOS } from "@/data/procesal/edificios";

// ============================================================================
// PORTAL PROCESAL — banner de acceso a "Archivos del Tiempo Procesal" desde el
// hub. Huella mínima: un Link; no altera el juego base.
// ============================================================================

export default function PortalProcesal() {
  const [mounted, setMounted] = useState(false);
  const desbloqueado = useProcesal((s) => s.desbloqueado);
  const completados = useProcesal((s) => s.edificiosCompletados);
  const xp = useProcesal((s) => s.xp);
  useEffect(() => setMounted(true), []);

  const hechos = mounted ? completados.length : 0;

  return (
    <div className="procesal-scope">
      <Link
        href="/procesal"
        onClick={() => sfx.click?.()}
        onMouseEnter={() => sfx.hover?.()}
        className="block proc-panel p-4 md:p-5 mb-2 group transition-transform hover:-translate-y-0.5"
        data-proc="ordinario"
      >
        <div className="flex items-center gap-4">
          <motion.div className="text-4xl md:text-5xl shrink-0 proc-float" style={{ filter: "drop-shadow(0 0 12px var(--proc-primary))" }}>
            🗂️
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="proc-tag px-2 py-0.5 border rounded" style={{ borderColor: "var(--proc-primary)" }}>✦ Expansión · DLC</span>
              <span className="font-mono-terminal text-[9px] uppercase tracking-widest px-2 py-0.5 border rounded border-[var(--proc-secondary)]/60" style={{ color: "var(--proc-secondary)" }}>Derecho Procesal Civil</span>
            </div>
            <h3 className="proc-heading text-xl md:text-2xl mt-1">Archivos del Tiempo Procesal</h3>
            <p className="font-serif-juridica text-[13px] opacity-70 mt-0.5 leading-snug">
              La Ciudadela de los Expedientes: juicio ordinario, sumario, ejecutivo, ejecución incidental y recursos. Domina la secuencia, los plazos y los efectos hasta reconstruir un procedimiento de memoria.
            </p>
            <div className="flex items-center gap-4 mt-2 font-mono-terminal text-[10px] opacity-70">
              <span>🏛️ {hechos}/{EDIFICIOS.length} edificios</span>
              <span>⭐ {mounted ? xp : 0} XP</span>
            </div>
          </div>
          <div className="proc-btn px-4 py-2 text-sm shrink-0 self-center">{desbloqueado && mounted ? "Continuar ▸" : "Entrar ▸"}</div>
        </div>
      </Link>
    </div>
  );
}
