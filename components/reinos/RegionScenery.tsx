"use client";
import type { RegionId } from "@/types/reinos";

// ============================================================================
// REINOS — Escenario decorativo por región (vibra Mario/SNES)
// Fondo SVG full-bleed, colorido y animado, detrás del contenido. Toma la
// paleta de la región (CSS vars). Vignette para mantener el texto legible.
// Sin assets, sin dependencias: solo SVG + CSS.
// ============================================================================

const P = "var(--reino-primary)";
const S = "var(--reino-secondary)";
const A = "var(--reino-accent)";

function arbol(x: number, y: number, s: number, sway = false) {
  return (
    <g className={sway ? "reino-sway" : undefined} key={`t${x}-${y}`}>
      <rect x={x - 2.2 * s} y={y} width={4.4 * s} height={10 * s} rx={1.5} fill="#3a2a18" />
      <circle cx={x} cy={y} r={8 * s} fill={P} />
      <circle cx={x - 6 * s} cy={y + 2 * s} r={6 * s} fill={P} />
      <circle cx={x + 6 * s} cy={y + 2 * s} r={6 * s} fill={P} />
      <circle cx={x - 2 * s} cy={y - 4 * s} r={5 * s} fill={A} opacity={0.55} />
    </g>
  );
}

function Scene({ region }: { region: RegionId }) {
  switch (region) {
    // ── BOSQUE: colinas verdes, sol, nubes, árboles ──────────────────────────
    case "bosque_obligaciones":
      return (
        <g>
          <circle cx={330} cy={48} r={22} fill={A} className="reino-bob" />
          <circle cx={330} cy={48} r={30} fill={A} opacity={0.18} />
          <g className="reino-drift" opacity={0.85}>
            <g fill="#e9f2e0" opacity={0.6}>
              <ellipse cx={90} cy={45} rx={26} ry={11} />
              <ellipse cx={110} cy={42} rx={18} ry={9} />
              <ellipse cx={210} cy={62} rx={22} ry={9} />
            </g>
          </g>
          <path d="M0 200 Q100 150 200 195 T400 185 V240 H0 Z" fill={P} opacity={0.85} />
          <path d="M0 220 Q120 185 260 215 T400 210 V240 H0 Z" fill="#2c5a36" />
          {arbol(60, 196, 1.1, true)}
          {arbol(150, 205, 0.85)}
          {arbol(300, 200, 1.25, true)}
          {arbol(360, 210, 0.8)}
          <g fill={A}>
            <circle className="reino-rise2" cx={120} cy={170} r={2.4} />
            <circle className="reino-rise2" cx={250} cy={160} r={2} style={{ animationDelay: "1.4s" }} />
            <circle className="reino-rise2" cx={330} cy={175} r={2.6} style={{ animationDelay: "2.6s" }} />
          </g>
        </g>
      );

    // ── CIUDAD MERCANTIL: puerto, agua, velas ────────────────────────────────
    case "ciudad_mercantil":
      return (
        <g>
          <circle cx={70} cy={55} r={18} fill={A} className="reino-bob" />
          <path d="M0 175 H400 V240 H0 Z" fill={S} opacity={0.5} />
          <g className="reino-driftR" stroke={A} strokeWidth={1.4} opacity={0.5} fill="none">
            <path d="M-20 195 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />
            <path d="M-20 215 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" opacity={0.6} />
          </g>
          {/* muelle / grúas */}
          <g fill={P} opacity={0.85}>
            <rect x={20} y={150} width={10} height={40} />
            <path d="M25 150 L60 150 L60 156 L25 156 Z" />
            <rect x={300} y={140} width={9} height={50} />
            <path d="M304 140 L345 158 L343 163 L302 146 Z" />
          </g>
          {/* barco con velas */}
          <g className="reino-bob2">
            <path d="M150 188 h70 l-10 14 h-50 Z" fill="#3a2a18" />
            <rect x={183} y={150} width={3} height={38} fill="#3a2a18" />
            <path d="M186 152 L210 184 L186 184 Z" fill={A} />
            <path d="M183 152 L160 184 L183 184 Z" fill="#e9eef6" opacity={0.85} />
          </g>
          <g fill={A}>
            <circle className="reino-twinkle" cx={120} cy={60} r={1.6} />
            <circle className="reino-twinkle" cx={260} cy={50} r={1.4} style={{ animationDelay: "1.2s" }} />
          </g>
        </g>
      );

    // ── TIERRAS: cañones, sol grande, cactus ─────────────────────────────────
    case "tierras_posesion":
      return (
        <g>
          <circle cx={200} cy={70} r={34} fill={A} opacity={0.9} className="reino-bob" />
          <circle cx={200} cy={70} r={46} fill={A} opacity={0.12} />
          <path d="M0 205 L60 205 L75 175 L150 175 L165 205 L400 205 V240 H0 Z" fill={S} opacity={0.7} />
          <path d="M0 220 L120 220 L140 195 L240 195 L260 220 L400 220 V240 H0 Z" fill={P} opacity={0.85} />
          <g fill="#2f7d4e">
            <g className="reino-sway">
              <rect x={70} y={185} width={6} height={26} rx={3} />
              <rect x={62} y={192} width={6} height={10} rx={3} />
              <rect x={78} y={189} width={6} height={12} rx={3} />
            </g>
            <rect x={330} y={196} width={5} height={20} rx={2.5} />
          </g>
        </g>
      );

    // ── MANSIÓN: luna, torres góticas, murciélagos ───────────────────────────
    case "mansion_sucesoria":
      return (
        <g>
          <circle cx={310} cy={50} r={24} fill={A} opacity={0.85} className="reino-bob" />
          <circle cx={300} cy={44} r={20} fill="#06070b" opacity={0.5} />
          <path d="M0 210 H120 V150 L140 120 L160 150 V210 H250 V160 L270 130 L290 160 V210 H400 V240 H0 Z" fill={P} opacity={0.55} />
          <path d="M132 150 h16 v-8 h-16 z M262 160 h16 v-8 h-16 z" fill={A} opacity={0.4} />
          <g className="reino-drift" fill="#1a1020">
            <path className="reino-bob" d="M90 70 q5 -6 10 0 q5 -6 10 0 q-3 5 -10 5 q-7 0 -10 -5 Z" />
            <path className="reino-bob2" d="M180 95 q5 -6 10 0 q5 -6 10 0 q-3 5 -10 5 q-7 0 -10 -5 Z" />
            <path className="reino-bob" d="M240 60 q4 -5 8 0 q4 -5 8 0 q-2 4 -8 4 q-6 0 -8 -4 Z" style={{ animationDelay: "1.5s" }} />
          </g>
        </g>
      );

    // ── REPÚBLICA: cyber, grid, torres-servidor ──────────────────────────────
    case "republica_administrativa":
      return (
        <g>
          <g stroke={P} strokeWidth={0.6} opacity={0.35}>
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1={i * 50} y1={150} x2={(i - 4) * 120 + 200} y2={240} />
            ))}
            <line x1={0} y1={170} x2={400} y2={170} />
            <line x1={0} y1={195} x2={400} y2={195} />
            <line x1={0} y1={225} x2={400} y2={225} />
          </g>
          <g fill={S} opacity={0.16} stroke={P} strokeWidth={1}>
            <rect x={40} y={70} width={34} height={90} rx={3} />
            <rect x={300} y={50} width={40} height={110} rx={3} />
            <rect x={170} y={95} width={28} height={65} rx={3} />
          </g>
          <g fill={A}>
            {[78, 92, 106, 120, 134].map((y) => <rect key={y} className="reino-twinkle" x={48} y={y} width={18} height={3} rx={1.5} style={{ animationDelay: `${y % 7}s` }} />)}
            {[60, 78, 96, 114, 132].map((y) => <rect key={"b" + y} className="reino-twinkle" x={308} y={y} width={24} height={3} rx={1.5} style={{ animationDelay: `${y % 5}s` }} />)}
          </g>
        </g>
      );

    // ── CASTILLO: muralla, torres, banderas ──────────────────────────────────
    case "castillo_competencia":
      return (
        <g>
          <circle cx={70} cy={55} r={18} fill={A} opacity={0.7} className="reino-bob" />
          <g fill={P} opacity={0.6}>
            <path d="M40 210 V120 h10 v-10 h10 v10 h10 v-10 h10 v10 h10 V210 Z" />
            <path d="M330 210 V110 h10 v-10 h10 v10 h10 v-10 h10 v10 h10 V210 Z" />
            <path d="M90 210 V150 h220 V210 Z" />
            <path d="M150 210 V165 h25 v45 Z" fill="#1a1020" />
          </g>
          <g stroke={A} strokeWidth={2}>
            <line x1={55} y1={108} x2={55} y2={92} />
            <line x1={345} y1={98} x2={345} y2={82} />
          </g>
          <g fill={A} className="reino-sway">
            <path d="M55 92 h16 l-4 5 l4 5 h-16 Z" />
          </g>
          <g fill={A} className="reino-sway" style={{ animationDelay: "1.2s" }}>
            <path d="M345 82 h16 l-4 5 l4 5 h-16 Z" />
          </g>
        </g>
      );

    // ── TRIBUNAL SUPREMO: rayos dorados, columnas, destellos ──────────────────
    case "tribunal_supremo":
    default:
      return (
        <g>
          <g fill={A} opacity={0.16}>
            {Array.from({ length: 9 }).map((_, i) => {
              const ang = (i - 4) * 12;
              return <path key={i} className="reino-twinkle" d={`M200 30 L${200 + Math.tan((ang * Math.PI) / 180) * 200 - 30} 240 L${200 + Math.tan((ang * Math.PI) / 180) * 200 + 30} 240 Z`} style={{ animationDelay: `${i * 0.3}s` }} />;
            })}
          </g>
          <g fill={S} opacity={0.16} stroke={A} strokeWidth={1}>
            <rect x={40} y={120} width={16} height={95} />
            <rect x={344} y={120} width={16} height={95} />
            <rect x={100} y={130} width={13} height={85} />
            <rect x={287} y={130} width={13} height={85} />
          </g>
          <path d="M20 120 H380 L360 108 H40 Z" fill={A} opacity={0.22} />
          <g fill={A}>
            <circle className="reino-rise2" cx={150} cy={150} r={2} />
            <circle className="reino-rise2" cx={250} cy={140} r={2.4} style={{ animationDelay: "1.5s" }} />
            <circle className="reino-rise2" cx={200} cy={160} r={1.8} style={{ animationDelay: "2.8s" }} />
          </g>
        </g>
      );
  }
}

export default function RegionScenery({ region }: { region: RegionId }) {
  return (
    <div className="reino-scenery" aria-hidden>
      <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.7 }}>
        <defs>
          <linearGradient id="reinoSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: S, stopOpacity: 0.45 }} />
            <stop offset="0.5" style={{ stopColor: P, stopOpacity: 0.2 }} />
            <stop offset="1" style={{ stopColor: "#06070b", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="reinoVig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#06070b" stopOpacity="0.6" />
            <stop offset="0.38" stopColor="#06070b" stopOpacity="0.05" />
            <stop offset="1" stopColor="#06070b" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#reinoSky)" />
        <Scene region={region} />
        <rect width="400" height="240" fill="url(#reinoVig)" />
      </svg>
    </div>
  );
}
