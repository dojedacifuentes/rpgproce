"use client";
import { motion } from "framer-motion";

// ============================================================================
// CIUDAD JUDICIAL — backdrop cyberpunk multicapa para GameWorldMap
// Mismo espacio de coordenadas que el SVG del mapa (viewBox "30 100 780 380").
// Suelo/horizonte en y≈478. Todo SVG puro: skyline, ventanas de neón, haz de la
// Comisión, lluvia digital y artículos holográficos. Sin libs, sin imágenes.
// Determinista (sin Math.random) para no romper la hidratación SSR.
// ============================================================================

const HORIZON = 478;

// ─── defs: gradientes y filtros del mapa ────────────────────────────────────
export function MapDefs() {
  return (
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#05070E" />
        <stop offset="52%" stopColor="#091020" />
        <stop offset="100%" stopColor="#0C1A30" />
      </linearGradient>
      <radialGradient id="horizonGlow" cx="50%" cy="100%" r="75%">
        <stop offset="0%" stopColor="rgba(75,231,255,0.22)" />
        <stop offset="40%" stopColor="rgba(138,92,255,0.10)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="towerFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0E1D33" />
        <stop offset="100%" stopColor="#070E1B" />
      </linearGradient>
      <linearGradient id="towerMid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#15273F" />
        <stop offset="100%" stopColor="#0A1424" />
      </linearGradient>
      <linearGradient id="citadel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A1733" />
        <stop offset="100%" stopColor="#0C0A1A" />
      </linearGradient>
      <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(123,212,230,0)" />
        <stop offset="70%" stopColor="rgba(123,212,230,0.5)" />
        <stop offset="100%" stopColor="rgba(123,212,230,0)" />
      </linearGradient>
      <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="softGlow" x="-70%" y="-70%" width="240%" height="240%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <pattern id="cityGrid" width="46" height="46" patternUnits="userSpaceOnUse">
        <path d="M 46 0 L 0 0 0 46" fill="none" stroke="rgba(75,231,255,0.045)" strokeWidth="0.5" />
      </pattern>
    </defs>
  );
}

// ─── torres ──────────────────────────────────────────────────────────────────
type Tower = { x: number; w: number; h: number; lit?: string };

const FAR_TOWERS: Tower[] = [
  { x: 20, w: 30, h: 165 }, { x: 78, w: 22, h: 120 }, { x: 116, w: 34, h: 232 },
  { x: 172, w: 24, h: 150 }, { x: 224, w: 40, h: 286 }, { x: 296, w: 26, h: 188 },
  { x: 352, w: 34, h: 246 }, { x: 420, w: 24, h: 162 }, { x: 486, w: 42, h: 300 },
  { x: 552, w: 28, h: 208 }, { x: 612, w: 34, h: 262 }, { x: 682, w: 24, h: 178 },
  { x: 778, w: 30, h: 226 },
];

const MID_TOWERS: Tower[] = [
  { x: 56, w: 36, h: 152, lit: "#4BE7FF" },
  { x: 150, w: 42, h: 214, lit: "#7AD4E6" },
  { x: 258, w: 32, h: 168, lit: "#D7B46A" },
  { x: 344, w: 46, h: 150, lit: "#8A5CFF" },
  { x: 466, w: 36, h: 196, lit: "#F2F2F0" },
  { x: 560, w: 40, h: 160, lit: "#58F5B0" },
  { x: 648, w: 34, h: 142, lit: "#FF8A3D" },
];

function midWindows(t: Tower, ti: number) {
  const top = HORIZON - t.h;
  const rows = Math.floor(t.h / 16);
  const out: React.ReactNode[] = [];
  for (let j = 0; j < rows; j++) {
    const seed = j + ti * 3;
    const lit = seed % 3 !== 0; // ~2/3 encendidas
    const colA = seed % 2 === 0 ? 0.24 : 0.54;
    out.push(
      <rect key={`a${ti}-${j}`} x={t.x + t.w * colA} y={top + 10 + j * 16} width={t.w * 0.16} height={5}
        fill={lit ? t.lit : "rgba(120,150,190,0.18)"} opacity={lit ? 0.85 : 0.4} />
    );
    if (seed % 4 !== 1) {
      out.push(
        <rect key={`b${ti}-${j}`} x={t.x + t.w * (colA + 0.22)} y={top + 10 + j * 16} width={t.w * 0.16} height={5}
          fill={seed % 5 === 0 ? t.lit : "rgba(120,150,190,0.16)"} opacity={seed % 5 === 0 ? 0.8 : 0.35} />
      );
    }
  }
  return out;
}

export function CityBackdrop() {
  return (
    <g pointerEvents="none">
      {/* cielo + bloom de horizonte */}
      <rect x="-20" y="70" width="860" height="430" fill="url(#skyGrad)" />
      <ellipse cx="400" cy={HORIZON} rx="560" ry="180" fill="url(#horizonGlow)" />

      {/* skyline lejano (silueta hazy) */}
      <g opacity="0.62">
        {FAR_TOWERS.map((t, i) => (
          <rect key={i} x={t.x} y={HORIZON - t.h} width={t.w} height={t.h} fill="url(#towerFar)" />
        ))}
      </g>

      {/* skyline medio con ventanas de neón */}
      <g>
        {MID_TOWERS.map((t, i) => {
          const top = HORIZON - t.h;
          return (
            <g key={i}>
              <rect x={t.x} y={top} width={t.w} height={t.h} fill="url(#towerMid)"
                stroke={`${t.lit}33`} strokeWidth="0.75" />
              {/* remate + antena con luz que parpadea */}
              <rect x={t.x + t.w / 2 - 0.75} y={top - 16} width={1.5} height={16} fill={`${t.lit}66`} />
              <circle cx={t.x + t.w / 2} cy={top - 16} r={1.6} fill={t.lit}>
                <animate attributeName="opacity" values="1;0.2;1" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              {midWindows(t, i)}
            </g>
          );
        })}
      </g>

      {/* MEGAESTRUCTURA — la Comisión Examinadora dominando el horizonte */}
      <g>
        {/* haz vertical */}
        <rect x="745" y="120" width="10" height={HORIZON - 120} fill="#FF4FCF" opacity="0.14">
          <animate attributeName="opacity" values="0.08;0.22;0.08" dur="3.4s" repeatCount="indefinite" />
        </rect>
        {/* cuerpo escalonado */}
        <path
          d={`M 700 ${HORIZON} L 706 250 L 724 250 L 730 206 L 742 206 L 750 168 L 758 168 L 766 206 L 778 206 L 784 250 L 802 250 L 808 ${HORIZON} Z`}
          fill="url(#citadel)" stroke="rgba(255,79,207,0.30)" strokeWidth="1" />
        {/* ventanas verticales de la torre */}
        {[0, 1, 2, 3, 4, 5, 6].map((j) => (
          <rect key={j} x="751" y={250 - j * 12} width="3" height="5" fill="#FF4FCF" opacity={0.5 + (j % 2) * 0.3} />
        ))}
        {/* ápice: diamante de la justicia con halo */}
        <circle cx="754" cy="150" r="16" fill="rgba(255,79,207,0.18)">
          <animate attributeName="r" values="13;18;13" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <path d="M 754 140 L 762 150 L 754 160 L 746 150 Z" fill="#FF4FCF"
          style={{ filter: "drop-shadow(0 0 6px #FF4FCF)" }} />
      </g>

      {/* piso holográfico tenue sobre la base de la ciudad */}
      <rect x="30" y="430" width="780" height="50" fill="url(#cityGrid)" opacity="0.5" />
    </g>
  );
}

// ─── atmósfera de primer plano: lluvia digital + artículos holográficos ──────
const RAIN = [
  { x: 70, d: 2.6, delay: 0 }, { x: 150, d: 3.4, delay: 0.8 }, { x: 235, d: 2.9, delay: 1.6 },
  { x: 320, d: 3.8, delay: 0.4 }, { x: 405, d: 2.7, delay: 2.0 }, { x: 500, d: 3.5, delay: 1.1 },
  { x: 585, d: 3.0, delay: 0.2 }, { x: 670, d: 3.9, delay: 1.4 }, { x: 745, d: 2.8, delay: 0.6 },
];

const BILLBOARDS = [
  { t: "art. 254 CPC", x: 120, y: 175, d: 7 },
  { t: "art. 768 CPC", x: 600, y: 200, d: 8.5 },
  { t: "art. 158 CPC", x: 360, y: 145, d: 9 },
  { t: "art. 434 CPC", x: 690, y: 320, d: 7.8 },
];

export function MapAtmosphere() {
  return (
    <g pointerEvents="none">
      {/* lluvia digital */}
      {RAIN.map((r, i) => (
        <rect key={i} x={r.x} y="100" width="1.2" height="30" fill="url(#rainGrad)" opacity="0.5">
          <animateTransform attributeName="transform" type="translate" from="0 -60" to="0 400"
            dur={`${r.d}s`} begin={`${r.delay}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* artículos holográficos flotando como publicidad */}
      {BILLBOARDS.map((b, i) => (
        <text key={i} x={b.x} y={b.y} textAnchor="middle" fontFamily="JetBrains Mono, monospace"
          fontSize="9" fill="rgba(123,212,230,0.28)" letterSpacing="1">
          {b.t}
          <animate attributeName="opacity" values="0.05;0.4;0.05" dur={`${b.d}s`} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 4;0 -6;0 4" dur={`${b.d}s`} repeatCount="indefinite" />
        </text>
      ))}
    </g>
  );
}

// ─── conducto de energía entre nodos (reemplaza las líneas planas) ───────────
export function EnergyConduit({ d, color, dim }: { d: string; color: string; dim?: boolean }) {
  if (dim) {
    return <path d={d} fill="none" stroke="rgba(70,82,104,0.4)" strokeWidth="1.4" strokeDasharray="4 6" />;
  }
  return (
    <g>
      {/* base oscura ancha */}
      <path d={d} fill="none" stroke="rgba(6,10,18,0.85)" strokeWidth="4.5" strokeLinecap="round" />
      {/* trazo de neón */}
      <path d={d} fill="none" stroke={`${color}55`} strokeWidth="1.6"
        style={{ filter: `drop-shadow(0 0 3px ${color}55)` }} />
      {/* datos circulando */}
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"
        strokeDasharray="2 22" opacity="0.9">
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="1.4s" repeatCount="indefinite" />
      </path>
    </g>
  );
}
