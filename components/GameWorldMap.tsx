"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/store/useGame";
import { CAMPAÑA, BOSSES, type Acto, type Boss } from "@/data/campaign";
import { useRouter } from "next/navigation";
import { sfx } from "@/lib/audio";

// ============================================================================
// GAME WORLD MAP — Mapa visual estilo Pokémon/Mario overworld
// Zonas conectadas por caminos, con boss al final de cada acto
// ============================================================================

type ZoneNode = {
  id: string;
  acto: number;
  label: string;
  sublabel: string;
  x: number; // posición en % del SVG
  y: number;
  color: string;
  icono: string;
  tipo: "zona" | "boss" | "start";
};

// Layout del mapa — coordenadas absolutas en un viewport 800x500
const MAP_NODES: ZoneNode[] = [
  // Acto 1 — Iniciación
  { id: "start", acto: 0, label: "INICIO", sublabel: "Ciudad Judicial", x: 80, y: 250, color: "#4BE7FF", icono: "⚖️", tipo: "start" },
  { id: "jurisdiccion", acto: 1, label: "JURISDICCIÓN", sublabel: "art. 76 CPR", x: 180, y: 250, color: "#4BE7FF", icono: "🏛️", tipo: "zona" },
  { id: "competencia", acto: 1, label: "COMPETENCIA", sublabel: "arts. 45-133", x: 290, y: 200, color: "#4BE7FF", icono: "⚖️", tipo: "zona" },
  { id: "boss_1", acto: 1, label: "ESFINGE", sublabel: "Boss Acto I", x: 380, y: 200, color: "#4BE7FF", icono: "🗿", tipo: "boss" },

  // Acto 2 — Notificaciones
  { id: "emplazamiento", acto: 2, label: "EMPLAZAMIENTO", sublabel: "arts. 40-54", x: 460, y: 150, color: "#7AD4E6", icono: "📬", tipo: "zona" },
  { id: "notificaciones", acto: 2, label: "NOTIFICACIÓN", sublabel: "art. 44 CPC", x: 540, y: 200, color: "#7AD4E6", icono: "📮", tipo: "zona" },
  { id: "boss_2", acto: 2, label: "RECEPTOR", sublabel: "Boss Acto II", x: 600, y: 150, color: "#7AD4E6", icono: "👻", tipo: "boss" },

  // Acto 3 — Prueba
  { id: "prueba", acto: 3, label: "PRUEBA", sublabel: "arts. 341-427", x: 420, y: 310, color: "#D7B46A", icono: "📜", tipo: "zona" },
  { id: "discusion", acto: 3, label: "DISCUSIÓN", sublabel: "arts. 254-318", x: 340, y: 360, color: "#D7B46A", icono: "⚡", tipo: "zona" },
  { id: "boss_3", acto: 3, label: "PRUEBA", sublabel: "Boss Acto III", x: 500, y: 360, color: "#D7B46A", icono: "🔮", tipo: "boss" },

  // Acto 4 — Sentencia
  { id: "sentencia", acto: 4, label: "SENTENCIA", sublabel: "art. 158 CPC", x: 580, y: 300, color: "#F2F2F0", icono: "⚒️", tipo: "zona" },
  { id: "boss_4", acto: 4, label: "JUEZ HIERRO", sublabel: "Boss Acto IV", x: 660, y: 250, color: "#F2F2F0", icono: "🤖", tipo: "boss" },

  // Acto 5 — Recursos
  { id: "recursos", acto: 5, label: "RECURSOS", sublabel: "arts. 766-810", x: 660, y: 350, color: "#8A5CFF", icono: "⚔️", tipo: "zona" },
  { id: "boss_5", acto: 5, label: "CASACIÓN", sublabel: "Boss Acto V", x: 720, y: 300, color: "#8A5CFF", icono: "👁️", tipo: "boss" },

  // Acto 6 — Ejecutivo
  { id: "ejecutivo", acto: 6, label: "EJECUTIVO", sublabel: "arts. 434-478", x: 700, y: 400, color: "#FF8A3D", icono: "💼", tipo: "zona" },
  { id: "boss_6", acto: 6, label: "LEVIATÁN", sublabel: "Boss Acto VI", x: 750, y: 450, color: "#FF8A3D", icono: "🐉", tipo: "boss" },

  // Acto 7 — Boss Final
  { id: "examen", acto: 7, label: "EXAMEN", sublabel: "GRADO", x: 750, y: 350, color: "#FF4FCF", icono: "🎓", tipo: "zona" },
  { id: "boss_final", acto: 7, label: "COMISIÓN", sublabel: "Boss Final", x: 760, y: 250, color: "#FF4FCF", icono: "👨‍⚖️", tipo: "boss" },
];

// Conexiones entre nodos (pares de IDs)
const MAP_PATHS = [
  ["start", "jurisdiccion"],
  ["jurisdiccion", "competencia"],
  ["competencia", "boss_1"],
  ["boss_1", "emplazamiento"],
  ["emplazamiento", "notificaciones"],
  ["notificaciones", "boss_2"],
  ["boss_1", "discusion"],
  ["discusion", "prueba"],
  ["prueba", "boss_3"],
  ["boss_2", "sentencia"],
  ["boss_3", "sentencia"],
  ["sentencia", "boss_4"],
  ["boss_4", "recursos"],
  ["recursos", "boss_5"],
  ["boss_4", "ejecutivo"],
  ["ejecutivo", "boss_6"],
  ["boss_5", "examen"],
  ["boss_6", "examen"],
  ["examen", "boss_final"],
];

// ────────────────────────────────────────────
// Subcomponente nodo del mapa
// ────────────────────────────────────────────
function MapNode({
  node,
  activo,
  completado,
  locked,
  actoActual,
  onClick,
}: {
  node: ZoneNode;
  activo: boolean;
  completado: boolean;
  locked: boolean;
  actoActual: number;
  onClick: () => void;
}) {
  const isBoss = node.tipo === "boss";
  const size = node.tipo === "boss" ? 30 : node.tipo === "start" ? 24 : 26;
  const r = size / 2;

  const baseColor = locked ? "rgba(60,70,90,0.8)" : node.color;
  const glowColor = locked ? "transparent" : node.color;

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: locked ? "default" : "pointer" }}
      whileHover={!locked ? { scale: 1.2 } : {}}
      whileTap={!locked ? { scale: 0.95 } : {}}
    >
      {/* Glow ring for active/boss */}
      {(activo || isBoss) && !locked && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={r + 8}
          fill="none"
          stroke={glowColor}
          strokeWidth="1.5"
          opacity={0.4}
          animate={{ r: [r + 6, r + 12, r + 6], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill={locked ? "rgba(20,25,40,0.9)" : "rgba(10,15,25,0.95)"}
        stroke={locked ? "rgba(60,70,90,0.6)" : node.color}
        strokeWidth={activo ? 2.5 : 1.5}
        style={{
          filter: !locked ? `drop-shadow(0 0 8px ${node.color}60)` : undefined,
        }}
      />

      {/* Completed checkmark or boss skull */}
      {completado && (
        <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="14" fill="#58F5B0">
          ✓
        </text>
      )}
      {locked && (
        <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.3)">
          🔒
        </text>
      )}
      {!completado && !locked && (
        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={isBoss ? 16 : 14}>
          {node.icono}
        </text>
      )}

      {/* Label */}
      {!locked && (
        <>
          <text
            x={node.x}
            y={node.y + r + 14}
            textAnchor="middle"
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
            fill={node.color}
            letterSpacing="1"
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y={node.y + r + 23}
            textAnchor="middle"
            fontSize="7"
            fontFamily="JetBrains Mono, monospace"
            fill="rgba(232,223,197,0.5)"
          >
            {node.sublabel}
          </text>
        </>
      )}
    </motion.g>
  );
}

// ────────────────────────────────────────────
// Componente principal
// ────────────────────────────────────────────
export default function GameWorldMap() {
  const [selectedNode, setSelectedNode] = useState<ZoneNode | null>(null);
  const misionesCompletadas = useGame((s) => s.misionesCompletadas);
  const actoActual = 1; // TODO: calcular desde game state
  const router = useRouter();

  const isCompletado = useCallback((nodeId: string) => {
    // Simplificado: si el acto está "completado"
    return false;
  }, []);

  const isLocked = useCallback((node: ZoneNode) => {
    // Actos futuros están bloqueados
    return node.acto > actoActual + 2;
  }, [actoActual]);

  const getNodeById = (id: string) => MAP_NODES.find((n) => n.id === id);

  // Encontrar coordenadas de path
  const getPathD = (fromId: string, toId: string) => {
    const from = getNodeById(fromId);
    const to = getNodeById(toId);
    if (!from || !to) return "";
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2 - 20;
    return `M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`;
  };

  const handleNodeClick = (node: ZoneNode) => {
    if (isLocked(node)) return;
    sfx.click?.();
    setSelectedNode(node);
  };

  const handleNavigate = (node: ZoneNode) => {
    const routes: Record<string, string> = {
      boss_1: "/oral",
      boss_2: "/oral",
      boss_3: "/oral",
      boss_4: "/oral",
      boss_5: "/oral",
      boss_6: "/oral",
      boss_final: "/oral",
      examen: "/examen",
      ejecutivo: "/expansion",
    };
    const route = routes[node.id] || "/expansion";
    router.push(route);
  };

  return (
    <div className="relative w-full" style={{ background: "transparent" }}>
      {/* SVG MAP */}
      <svg
        viewBox="30 100 780 380"
        className="w-full"
        style={{ minHeight: 300, maxHeight: 420 }}
      >
        {/* Grid background */}
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(75,231,255,0.04)" strokeWidth="0.5"/>
          </pattern>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="800" height="500" fill="url(#mapGrid)" />

        {/* Territory zones - faint colored regions */}
        {[1,2,3,4,5,6,7].map((acto) => {
          const nodes = MAP_NODES.filter(n => n.acto === acto);
          if (nodes.length === 0) return null;
          const cx = nodes.reduce((s, n) => s + n.x, 0) / nodes.length;
          const cy = nodes.reduce((s, n) => s + n.y, 0) / nodes.length;
          const color = nodes[0].color;
          return (
            <circle
              key={acto}
              cx={cx}
              cy={cy}
              r={70}
              fill={`${color}08`}
              stroke={`${color}15`}
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          );
        })}

        {/* Paths */}
        {MAP_PATHS.map(([from, to], i) => {
          const fromNode = getNodeById(from);
          const toNode = getNodeById(to);
          if (!fromNode || !toNode) return null;
          const locked = isLocked(toNode);
          return (
            <path
              key={i}
              d={getPathD(from, to)}
              fill="none"
              stroke={locked ? "rgba(60,70,90,0.4)" : `${fromNode.color}40`}
              strokeWidth="1.5"
              strokeDasharray={locked ? "4 6" : "none"}
              style={{
                filter: !locked ? `drop-shadow(0 0 3px ${fromNode.color}30)` : undefined,
              }}
            />
          );
        })}

        {/* Nodes */}
        {MAP_NODES.map((node) => (
          <MapNode
            key={node.id}
            node={node}
            activo={selectedNode?.id === node.id}
            completado={isCompletado(node.id)}
            locked={isLocked(node)}
            actoActual={actoActual}
            onClick={() => handleNodeClick(node)}
          />
        ))}
      </svg>

      {/* Selected Node Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mt-4 terminal p-5 border"
            style={{ borderColor: `${selectedNode.color}50` }}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{selectedNode.icono}</div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono-terminal text-[9px] uppercase tracking-widest"
                    style={{ color: selectedNode.color }}>
                    {selectedNode.tipo === "boss" ? "⚔ BOSS" : "🗺 ZONA"}
                  </span>
                  <span className="font-mono-terminal text-[9px] text-doc-aged/40">ACTO {selectedNode.acto}</span>
                </div>
                <h3 className="font-display-grave text-xl text-doc-aged">{selectedNode.label}</h3>
                <p className="font-mono-terminal text-[10px] text-doc-aged/50">{selectedNode.sublabel}</p>
              </div>
              <button
                onClick={() => handleNavigate(selectedNode)}
                onMouseEnter={() => sfx.hover?.()}
                className="btn shrink-0"
                style={{ borderColor: `${selectedNode.color}50`, color: selectedNode.color }}
              >
                ENTRAR →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
