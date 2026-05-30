"use client";

// ============================================================================
// REINOS — Sprites SVG propios por boss (sin emojis)
// Emblemas heráldicos procedurales. Toman la paleta de la región vía CSS vars
// (--reino-primary/secondary/accent) ya en scope (data-reino). Sin assets.
// La animación idle/hit/faint la aplica el contenedor padre en BossBattle.
// ============================================================================

const P = "var(--reino-primary)";
const S = "var(--reino-secondary)";
const A = "var(--reino-accent)";

function Simbolo({ bossId }: { bossId: string }) {
  switch (bossId) {
    // Balanza con pila de monedas — el cobrador
    case "acreedor_implacable":
      return (
        <g fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="50" y1="30" x2="50" y2="70" />
          <line x1="34" y1="38" x2="66" y2="38" />
          <path d="M30 38 L26 50 a8 5 0 0 0 16 0 Z" stroke={P} />
          <path d="M70 38 L66 50 a8 5 0 0 0 16 0 Z" stroke={P} />
          <line x1="42" y1="72" x2="58" y2="72" />
          <circle cx="50" cy="30" r="3" fill={A} stroke="none" />
          <circle cx="73" cy="33" r="3.2" fill={S} stroke={S} />
          <circle cx="73" cy="28" r="3.2" fill={S} stroke={S} />
          <circle cx="73" cy="23" r="3.2" fill={P} stroke={P} />
        </g>
      );
    // Rostro bifronte partido — la mala fe
    case "mercader_mala_fe":
      return (
        <g strokeLinejoin="round">
          <path d="M50 24 a24 24 0 0 0 0 52 Z" fill={P} opacity="0.85" />
          <path d="M50 24 a24 24 0 0 1 0 52 Z" fill={S} opacity="0.7" />
          <circle cx="40" cy="46" r="3.2" fill={A} />
          <circle cx="60" cy="46" r="3.2" fill="#06070b" />
          <path d="M40 62 q10 6 20 0" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="22" x2="50" y2="78" stroke="#06070b" strokeWidth="2" />
        </g>
      );
    // Espectro sobre hito de deslinde — el poseedor
    case "espectro_poseedor":
      return (
        <g>
          <path d="M34 40 a16 16 0 0 1 32 0 v26 l-6 -6 -6 6 -7 -6 -7 6 v-26 Z" fill={P} opacity="0.85" stroke={A} strokeWidth="2" />
          <circle cx="44" cy="44" r="3" fill="#06070b" />
          <circle cx="56" cy="44" r="3" fill="#06070b" />
          <line x1="50" y1="70" x2="50" y2="80" stroke={S} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 72 l10 -3 -10 -3 Z" fill={S} />
        </g>
      );
    // Espectro coronado — el heredero fantasma
    case "heredero_fantasma":
      return (
        <g>
          <path d="M34 44 a16 16 0 0 1 32 0 v24 l-6 -5 -5 5 -5 -5 -5 5 -5 -5 Z" fill={P} opacity="0.85" stroke={A} strokeWidth="2" />
          <circle cx="44" cy="48" r="3" fill="#06070b" />
          <circle cx="56" cy="48" r="3" fill="#06070b" />
          <path d="M36 34 l4 8 5 -7 5 7 5 -7 4 8 Z" fill={S} stroke={A} strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      );
    // Monolito-servidor con ojo — el leviatán
    case "leviatan_administrativo":
      return (
        <g strokeLinejoin="round">
          <rect x="34" y="24" width="32" height="52" rx="4" fill={P} opacity="0.18" stroke={P} strokeWidth="2.5" />
          <line x1="38" y1="34" x2="62" y2="34" stroke={S} strokeWidth="2" />
          <line x1="38" y1="66" x2="62" y2="66" stroke={S} strokeWidth="2" />
          <path d="M38 50 q12 -10 24 0 q-12 10 -24 0 Z" fill="#06070b" stroke={A} strokeWidth="2" />
          <circle cx="50" cy="50" r="4.5" fill={A} />
          <circle cx="50" cy="50" r="2" fill="#06070b" />
        </g>
      );
    // Castillo con mazo cruzado — el tribunal incompetente
    case "tribunal_incompetente":
      return (
        <g strokeLinejoin="round">
          <path d="M32 70 v-24 h6 v-6 h6 v6 h4 v-6 h6 v6 h6 v24 Z" fill={P} opacity="0.2" stroke={P} strokeWidth="2.5" />
          <line x1="50" y1="56" x2="50" y2="70" stroke={S} strokeWidth="2" />
          <g stroke={A} strokeWidth="3.2" strokeLinecap="round" transform="rotate(32 56 36)">
            <rect x="48" y="28" width="16" height="9" rx="2" fill={A} stroke="none" />
            <line x1="56" y1="37" x2="56" y2="54" />
          </g>
        </g>
      );
    // Candado sellado con rayos — el guardián de la cosa juzgada
    case "guardian_cosa_juzgada":
    default:
      return (
        <g strokeLinejoin="round">
          <g stroke={A} strokeWidth="2" strokeLinecap="round" opacity="0.8">
            <line x1="50" y1="14" x2="50" y2="6" />
            <line x1="78" y1="22" x2="84" y2="16" />
            <line x1="22" y1="22" x2="16" y2="16" />
            <line x1="84" y1="50" x2="92" y2="50" />
            <line x1="16" y1="50" x2="8" y2="50" />
          </g>
          <path d="M38 46 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke={S} strokeWidth="3.2" />
          <rect x="32" y="46" width="36" height="28" rx="5" fill={P} opacity="0.22" stroke={P} strokeWidth="2.6" />
          <circle cx="50" cy="58" r="4" fill={A} />
          <line x1="50" y1="60" x2="50" y2="68" stroke={A} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
  }
}

export default function ReinoSprite({ bossId, size = 96 }: { bossId: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="emblema del jefe"
      style={{ filter: `drop-shadow(0 6px 14px color-mix(in srgb, ${P} 45%, transparent))`, overflow: "visible" }}
    >
      {/* brillo de fondo */}
      <circle cx="50" cy="50" r="34" fill={P} opacity="0.08" />
      {/* anillo rúnico exterior giratorio */}
      <g>
        <circle cx="50" cy="50" r="44" fill="none" stroke={P} strokeWidth="1.2" strokeDasharray="3 7" opacity="0.55">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="22s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="38" fill="none" stroke={S} strokeWidth="0.8" strokeDasharray="1 9" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="30s" repeatCount="indefinite" />
        </circle>
      </g>
      <Simbolo bossId={bossId} />
    </svg>
  );
}
