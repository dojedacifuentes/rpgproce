"use client";
import type { RegionCivilId } from "@/types/civilis";

// ============================================================================
// CIV SCENERY — backdrop SVG por región (banda superior de la página de región).
// Silueta-motivo por bioma + partículas, en el color de la región. SVG puro.
// ============================================================================

const GROUND = 118;

function Motivo({ region, c }: { region: RegionCivilId; c: string }) {
  const s = `${c}`;
  switch (region) {
    case "obligaciones": // valle: colinas + cadenas
      return (
        <g>
          <path d={`M0 ${GROUND} Q60 80 120 96 T260 92 T400 100 L400 130 L0 130 Z`} fill={`${s}22`} />
          <path d={`M0 ${GROUND} Q90 96 180 108 T400 110 L400 130 L0 130 Z`} fill={`${s}33`} />
          {[120, 230, 320].map((x, i) => (<circle key={i} cx={x} cy={90 - i * 6} r="2.5" fill={s} className="civ-twinkle" />))}
        </g>
      );
    case "solidaridad": // fortaleza: almenas
      return (
        <g>
          <rect x="60" y="70" width="280" height="48" fill={`${s}26`} />
          {Array.from({ length: 12 }).map((_, i) => (<rect key={i} x={60 + i * 24} y="62" width="12" height="12" fill={`${s}33`} />))}
          <rect x="186" y="84" width="28" height="34" fill={`${s}44`} />
        </g>
      );
    case "contratos": // mercado: toldos + balanza
      return (
        <g>
          {[80, 170, 260].map((x, i) => (<path key={i} d={`M${x} 96 L${x + 50} 96 L${x + 40} 80 L${x + 10} 80 Z`} fill={`${["#e6a23c", "#d9b24c", "#c89030"][i]}44`} />))}
          <path d="M200 70 L200 96 M182 78 L218 78" stroke={s} strokeWidth="2" fill="none" />
          <circle cx="200" cy="68" r="3" fill={s} className="civ-twinkle" />
        </g>
      );
    case "compraventa": // ciudad: columnas / templo
      return (
        <g>
          <path d="M120 72 L280 72 L260 80 L140 80 Z" fill={`${s}33`} />
          {[140, 168, 196, 224, 252].map((x) => (<rect key={x} x={x} y="80" width="8" height="38" fill={`${s}2e`} />))}
          <rect x="120" y="112" width="160" height="6" fill={`${s}40`} />
        </g>
      );
    case "promesa": // templo: 4 puertas
      return (
        <g>
          {[110, 170, 230, 290].map((x, i) => (
            <g key={i}><path d={`M${x} 118 L${x} 86 Q${x + 14} 74 ${x + 28} 86 L${x + 28} 118 Z`} fill={`${s}2a`} stroke={`${s}55`} strokeWidth="1" /></g>
          ))}
        </g>
      );
    case "mandato": // imperio: trono / corona
      return (
        <g>
          <path d="M170 118 L170 84 L186 96 L200 78 L214 96 L230 84 L230 118 Z" fill={`${s}33`} />
          <rect x="160" y="112" width="80" height="8" fill={`${s}44`} />
          {[150, 250].map((x) => (<rect key={x} x={x} y="92" width="6" height="26" fill={`${s}26`} />))}
        </g>
      );
    case "hipoteca": // catacumbas: lápidas + cadenas
      return (
        <g>
          {[120, 170, 220, 270].map((x, i) => (<path key={i} d={`M${x} 118 L${x} 92 Q${x + 9} 84 ${x + 18} 92 L${x + 18} 118 Z`} fill={`${s}2a`} />))}
          <path d="M60 100 q20 10 40 0 q20 -10 40 0" stroke={`${s}40`} strokeWidth="2" fill="none" />
        </g>
      );
    case "extincion": // torre escalonada
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (<rect key={i} x={200 - 40 + i * 6} y={118 - (i + 1) * 14} width={80 - i * 12} height="14" fill={`${s}${["22", "2c", "36", "44"][i]}`} />))}
          <path d="M200 56 L194 64 L206 64 Z" fill={s} className="civ-twinkle" />
        </g>
      );
    case "biblioteca": // estanterías
      return (
        <g>
          <rect x="90" y="72" width="220" height="46" fill={`${s}1e`} />
          {[78, 90, 102].map((y) => (<line key={y} x1="90" y1={y} x2="310" y2={y} stroke={`${s}33`} strokeWidth="1" />))}
          {Array.from({ length: 22 }).map((_, i) => (<rect key={i} x={94 + i * 10} y={74 + (i % 3) * 14} width="6" height="10" fill={`${s}40`} />))}
        </g>
      );
    case "actojuridico": // génesis: estrella de la voluntad + pilares (voluntad/objeto/causa)
      return (
        <g>
          <path d="M200 58 L205 74 L222 74 L208 84 L213 100 L200 90 L187 100 L192 84 L178 74 L195 74 Z" fill={`${s}44`} className="civ-twinkle" />
          {[150, 200, 250].map((x, i) => (<rect key={i} x={x - 5} y={96} width="10" height="22" fill={`${s}${["2a", "38", "2a"][i]}`} />))}
          <rect x="120" y="116" width="160" height="2" fill={`${s}40`} />
        </g>
      );
    case "bienes": // tierras del dominio: montañas + hito/bandera
      return (
        <g>
          <path d="M30 118 L100 72 L160 118 Z" fill={`${s}2a`} />
          <path d="M140 118 L228 60 L312 118 Z" fill={`${s}38`} />
          <path d="M252 118 L322 82 L384 118 Z" fill={`${s}26`} />
          <rect x="226" y="46" width="2" height="16" fill={s} />
          <path d="M228 46 L244 51 L228 56 Z" fill={`${s}66`} className="civ-twinkle" />
        </g>
      );
    default:
      return <path d={`M0 ${GROUND} L400 ${GROUND} L400 130 L0 130 Z`} fill={`${s}22`} />;
  }
}

export default function CivScenery({ region, color }: { region: RegionCivilId; color: string }) {
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none", opacity: 0.9 }} aria-hidden>
      <defs>
        <linearGradient id={`civsky-${region}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${color}14`} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="130" fill={`url(#civsky-${region})`} />
      {/* partículas flotantes */}
      {[40, 110, 300, 360].map((x, i) => (
        <circle key={i} cx={x} cy={30 + (i % 3) * 16} r="1.6" fill={color} className="civ-float" style={{ animationDelay: `${i * 0.7}s`, opacity: 0.5 }} />
      ))}
      <Motivo region={region} c={color} />
    </svg>
  );
}
