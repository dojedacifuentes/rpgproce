"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useReinos } from "@/store/useReinos";
import { REGIONES } from "@/data/reinos/regiones";
import { ARTICULOS } from "@/data/reinos/articulos";

// ============================================================================
// PORTAL: REINOS DEL DERECHO
// Acceso al DLC desde el mapa principal (Ciudad Judicial). Componente
// AUTOCONTENIDO: no depende de reinos.css; usa clases globales + estilos inline
// + framer-motion. Insertarlo NO altera ninguna mecánica del juego base.
// ============================================================================

// Vistazo cromático de los 7 reinos (verde→cobre→tierra→vino→azul→púrpura→oro)
const RIFT = "linear-gradient(90deg,#57b06f,#d68a3e,#d98e5a,#9c5a7d,#3f7bff,#9a52c4,#ecc94b,#57b06f)";

export default function PortalReinos() {
  const completadas = useReinos((s) => s.regionesCompletadas);
  const articulos = useReinos((s) => s.articulosDesbloqueados);
  const desbloqueado = useReinos((s) => s.desbloqueado);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const visitado = mounted && desbloqueado;
  const nConq = mounted ? completadas.length : 0;
  const nArt = mounted ? articulos.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Link
        href="/reinos"
        onClick={() => sfx.confirm?.()}
        onMouseEnter={() => sfx.hover?.()}
        className="block relative overflow-hidden group"
        style={{ borderRadius: 2 }}
      >
        {/* Borde-rift animado */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: RIFT, backgroundSize: "200% 100%", opacity: 0.9 }}
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Cuerpo oscuro (deja ver el rift solo como marco) */}
        <div
          className="relative m-[2px] p-5 md:p-6"
          style={{
            background:
              "radial-gradient(120% 140% at 0% 0%, rgba(63,123,255,.10), transparent 55%)," +
              "radial-gradient(120% 140% at 100% 100%, rgba(154,82,196,.10), transparent 55%)," +
              "linear-gradient(180deg, rgba(8,10,16,.96), rgba(6,7,11,.98))",
          }}
        >
          {/* destello de barrido al hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(236,201,75,.06), transparent)" }}
          />
          <div className="relative flex items-center gap-4 flex-wrap">
            <motion.span
              className="text-5xl shrink-0"
              animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              🌌
            </motion.span>

            <div className="flex-1 min-w-[220px]">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="font-mono-terminal text-[8px] uppercase tracking-[.3em] px-2 py-0.5 border"
                  style={{ color: "#ecc94b", borderColor: "rgba(236,201,75,.5)", background: "rgba(236,201,75,.05)" }}
                >
                  ✦ EXPANSIÓN · DLC
                </span>
                <span
                  className="font-mono-terminal text-[8px] uppercase tracking-[.2em] px-2 py-0.5 border"
                  style={{ color: "#FF4FCF", borderColor: "rgba(255,79,207,.45)", background: "rgba(255,79,207,.05)" }}
                >
                  ENDGAME
                </span>
              </div>
              <h2
                className="font-display-grave text-2xl md:text-3xl leading-tight"
                style={{ color: "#E8DFC5", textShadow: "0 0 18px rgba(63,123,255,.25)" }}
              >
                Reinos del Derecho
              </h2>
              <p className="font-mono-terminal text-[10px] text-doc-aged/55 mt-1 leading-relaxed max-w-xl">
                Un overworld de 7 regiones jurídicas: Obligaciones, Contratos, Posesión, Sucesiones,
                República Administrativa, Castillo de la Competencia y el Tribunal Supremo Final.
              </p>

              {/* Progreso (no intrusivo) */}
              <div className="flex items-center gap-4 mt-2.5 font-mono-terminal text-[9px] text-doc-aged/45">
                <span>👑 {nConq}/{REGIONES.length} regiones</span>
                <span>📜 {nArt}/{ARTICULOS.length} artículos</span>
                {visitado && <span style={{ color: "#58F5B0" }}>● en curso</span>}
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <span
                className="inline-block font-mono-terminal text-[11px] uppercase tracking-widest px-4 py-2.5 border transition-all group-hover:brightness-125"
                style={{ color: "#ecc94b", borderColor: "rgba(236,201,75,.5)", background: "rgba(236,201,75,.06)", boxShadow: "0 0 18px rgba(236,201,75,.12)" }}
              >
                {visitado ? "Continuar ▸" : "Abrir portal ▸"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
