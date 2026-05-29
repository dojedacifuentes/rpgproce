"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import ReinosOverworld from "@/components/reinos/ReinosOverworld";
import { REGIONES } from "@/data/reinos/regiones";
import { ARTICULOS } from "@/data/reinos/articulos";
import { DESAFIOS } from "@/data/reinos/desafios";
import { useReinos } from "@/store/useReinos";

// ============================================================================
// REINOS DEL DERECHO — Portal / Overworld (página de entrada del DLC)
// ============================================================================

export default function ReinosHome() {
  const desbloqueado = useReinos((s) => s.desbloqueado);
  const desbloquearPortal = useReinos((s) => s.desbloquearPortal);
  const cristales = useReinos((s) => s.cristales);
  const articulos = useReinos((s) => s.articulosDesbloqueados);
  const completadas = useReinos((s) => s.regionesCompletadas);
  const resueltos = useReinos((s) => s.desafiosResueltos);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (!desbloqueado) desbloquearPortal(); // primera entrada: activa el portal en el mapa principal
  }, [desbloqueado, desbloquearPortal]);

  const totalArt = ARTICULOS.length;
  const totalDes = DESAFIOS.length;

  const stats = [
    { label: "Cristales de Justicia", value: mounted ? cristales : 0, icon: "💎" },
    { label: "Regiones conquistadas", value: `${mounted ? completadas.length : 0}/${REGIONES.length}`, icon: "👑" },
    { label: "Desafíos superados", value: `${mounted ? resueltos.length : 0}/${totalDes}`, icon: "⚔" },
    { label: "Artículos en biblioteca", value: `${mounted ? articulos.length : 0}/${totalArt}`, icon: "📜" },
  ];

  return (
    <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <Link href="/juego" className="btn text-xs" onClick={() => sfx.click?.()}>◂ Ciudad Judicial</Link>
        <div className="flex items-center gap-3">
          <Link href="/reinos/biblioteca" className="btn text-[10px] px-3 py-1.5" onClick={() => sfx.click?.()}>
            📚 Biblioteca
          </Link>
          <span className="font-mono-terminal text-[9px] text-doc-aged/40 uppercase tracking-widest">DLC · EXPANSIÓN</span>
        </div>
      </header>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.35em] reino-fg mb-2 reino-rift bg-clip-text text-transparent inline-block">
          REINOS DEL DERECHO
        </div>
        <h1 className="font-display-grave text-4xl md:text-6xl text-doc-aged leading-none mb-3">
          Un mundo desbloqueable
        </h1>
        <p className="font-serif-juridica text-doc-aged/65 max-w-2xl leading-relaxed">
          Más allá de la Ciudad Judicial se abre un overworld de siete regiones. Civil, administrativo y
          competencia convertidos en desafíos, enemigos y jefes. Conquista cada región, colecciona los
          artículos legendarios y enfrenta al Guardián de la Cosa Juzgada en el Tribunal Supremo Final.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="reino-card p-3 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="font-display-grave text-xl text-doc-aged leading-none">{s.value}</div>
              <div className="font-mono-terminal text-[8px] uppercase tracking-wider text-doc-aged/45 mt-1">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa-mundo */}
      <div className="mb-6">
        <div className="font-mono-terminal text-[9px] uppercase tracking-widest reino-fg mb-2">
          OVERWORLD · TOCA UNA REGIÓN PARA VIAJAR
        </div>
        <ReinosOverworld />
      </div>

      {/* Pie: cómo se juega */}
      <div className="reino-card p-4">
        <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-doc-aged/40 mb-2">CÓMO SE JUEGA</div>
        <ul className="font-serif-juridica text-doc-aged/60 text-sm space-y-1.5 leading-relaxed">
          <li>▸ Cada región tiene estética, enemigos y desafíos propios. Acertar otorga cristales y artículos; fallar cuesta vida.</li>
          <li>▸ Supera los desafíos para abrir al jefe de la región. Vencerlo conquista la región y suelta un artículo legendario.</li>
          <li>▸ Los artículos se acumulan en tu <Link href="/reinos/biblioteca" className="reino-fg underline">Biblioteca</Link>. Vence las 6 regiones para sellar el camino al Tribunal Supremo.</li>
          <li>▸ Todo esto es contenido adicional: tu progreso, mecánicas y partidas del juego base siguen intactos.</li>
        </ul>
      </div>
    </main>
  );
}
