"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGame } from "@/store/useGame";
import type { MundoVisual } from "@/types/game";
import { sfx } from "@/lib/audio";

// ============================================================================
// WORLD SELECTOR — Elige tu mundo visual
// Cada mundo tiene identidad visual, temática y sonora propia
// ============================================================================

const MUNDOS: {
  id: MundoVisual;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  icono: string;
  inspiracion: string;
  colorPrimario: string;
  colorSecundario: string;
  bgGradient: string;
}[] = [
  {
    id: "cybervalpo",
    nombre: "Cyber Valparaíso",
    subtitulo: "Neón · Lluvia · Tribunales Distópicos",
    descripcion: "La Ciudad Judicial del siglo XXI. Neón sobre cerros. Expedientes holográficos. Receptores-drones. El sistema procesal como infraestructura cyberpunk.",
    icono: "🌃",
    inspiracion: "Blade Runner · Ghost in the Shell · Neuromancer",
    colorPrimario: "#4BE7FF",
    colorSecundario: "#8A5CFF",
    bgGradient: "linear-gradient(135deg, #06070B 0%, #0A1220 50%, #131720 100%)",
  },
  {
    id: "gotico",
    nombre: "Tribunal Gótico",
    subtitulo: "Vitrales · Velas · Pergaminos Ancestrales",
    descripcion: "Los juzgados medievales donde nació el derecho procesal. Vitrales coloreados. Velas sobre escritorios de roble. La cosa juzgada como sentencia de Dios.",
    icono: "⛪",
    inspiracion: "Darkest Dungeon · Castlevania · Pillars of Eternity",
    colorPrimario: "#C4A265",
    colorSecundario: "#7A3B3B",
    bgGradient: "linear-gradient(135deg, #0C0A08 0%, #1A140E 50%, #221810 100%)",
  },
  {
    id: "plataformas",
    nombre: "Mundo Procesal Clásico",
    subtitulo: "Colorido · Monedas · Plataformas Jurídicas",
    descripcion: "El derecho procesal como aventura alegre. Monedas de doctrina. Plataformas de procedimiento. Tubos de apelación. Stars de jurisprudencia.",
    icono: "🌤️",
    inspiracion: "Mario Bros · Kirby · Shovel Knight",
    colorPrimario: "#00C8FF",
    colorSecundario: "#FF6B35",
    bgGradient: "linear-gradient(180deg, #0B2A4A 0%, #0D3565 30%, #0B1F3A 100%)",
  },
  {
    id: "rts",
    nombre: "Tribunal Orbital",
    subtitulo: "Sci-Fi · HUD Táctico · Estación Espacial",
    descripcion: "El CPC en modo RTS. Unidades jurídicas. Bases procesales. Recursos como energía. HUD complejo de misión. Batallas de excepciones como conflictos de flota.",
    icono: "🚀",
    inspiracion: "StarCraft · Halo Wars · Supreme Commander",
    colorPrimario: "#00FF88",
    colorSecundario: "#3D7FFF",
    bgGradient: "linear-gradient(135deg, #050A12 0%, #0A1424 50%, #071020 100%)",
  },
  {
    id: "medieval",
    nombre: "Reino Procesal",
    subtitulo: "Castillos · Pergaminos · Edad Media Jurídica",
    descripcion: "Las etapas del procedimiento como edades históricas. Castillos del tribunal. Archivos de pergamino. Doctrinas como cofres del tesoro. El juicio como torneo.",
    icono: "🏰",
    inspiracion: "Age of Empires · Stronghold · Crusader Kings",
    colorPrimario: "#D4A843",
    colorSecundario: "#6B4226",
    bgGradient: "linear-gradient(135deg, #1A1208 0%, #241A0E 50%, #2A1E0E 100%)",
  },
];

interface WorldSelectorProps {
  onClose?: () => void;
}

export default function WorldSelector({ onClose }: WorldSelectorProps) {
  const mundoVisual = useGame((s) => s.mundoVisual);
  const setMundoVisual = useGame((s) => s.setMundoVisual);
  const [hoveredMundo, setHoveredMundo] = useState<MundoVisual | null>(null);

  const handleSelect = (mundoId: MundoVisual) => {
    sfx.confirm?.();
    setMundoVisual(mundoId);
    onClose?.();
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="font-mono-terminal text-[9px] uppercase tracking-widest text-zona-competencia mb-1">
          MUNDO VISUAL ACTIVO
        </div>
        <h2 className="font-display-grave text-2xl text-doc-aged">
          Selecciona tu Mundo
        </h2>
        <p className="font-serif-juridica text-doc-aged/60 text-sm italic mt-1">
          Cada mundo cambia la estética, atmósfera y sensación del juego.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {MUNDOS.map((mundo) => {
          const isActivo = mundoVisual === mundo.id;
          const isHovered = hoveredMundo === mundo.id;

          return (
            <motion.button
              key={mundo.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => { setHoveredMundo(mundo.id); sfx.hover?.(); }}
              onHoverEnd={() => setHoveredMundo(null)}
              onClick={() => handleSelect(mundo.id)}
              className="relative p-5 text-left border rounded overflow-hidden transition-all"
              style={{
                background: isActivo || isHovered ? mundo.bgGradient : "rgba(10,18,32,.6)",
                borderColor: isActivo
                  ? mundo.colorPrimario
                  : `${mundo.colorPrimario}30`,
                boxShadow: isActivo
                  ? `0 0 30px ${mundo.colorPrimario}40, inset 0 1px 0 ${mundo.colorPrimario}20`
                  : "none",
              }}
            >
              {/* Active badge */}
              {isActivo && (
                <div
                  className="absolute top-2 right-2 font-mono-terminal text-[8px] px-2 py-0.5 border"
                  style={{ borderColor: mundo.colorPrimario, color: mundo.colorPrimario }}
                >
                  ACTIVO
                </div>
              )}

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, transparent, ${mundo.colorPrimario}${isActivo || isHovered ? "A0" : "40"}, transparent)`,
                }}
              />

              <div className="text-4xl mb-3">{mundo.icono}</div>

              <h3
                className="font-display-grave text-lg mb-1"
                style={{ color: isActivo || isHovered ? mundo.colorPrimario : "#E8DFC5" }}
              >
                {mundo.nombre}
              </h3>

              <p
                className="font-mono-terminal text-[9px] uppercase tracking-wider mb-2"
                style={{ color: `${mundo.colorPrimario}90` }}
              >
                {mundo.subtitulo}
              </p>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="font-serif-juridica text-doc-aged/70 text-xs italic mb-2">
                      {mundo.descripcion}
                    </p>
                    <p
                      className="font-mono-terminal text-[8px]"
                      style={{ color: `${mundo.colorSecundario}` }}
                    >
                      Inspiración: {mundo.inspiracion}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
