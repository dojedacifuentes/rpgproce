"use client";
import { motion } from "framer-motion";

// ============================================================================
// BOSS PORTRAIT — emblema procedural por jefe (modo "proc").
// Silueta + iconografía identificable + idle + glow. Reconocible sin texto.
// Intercambiable por arte de imagen (modo "asset") sin tocar el resto del HUD.
// ============================================================================

const RED = "#D94A4A";

export default function BossPortrait({
  bossId,
  color,
  size = 200,
  hit = false,
}: {
  bossId: string;
  color: string;
  size?: number;
  hit?: boolean;
}) {
  const gid = bossId.replace(/[^a-z]/gi, "");
  return (
    <motion.div
      className="relative inline-block select-none"
      style={{ width: size, height: size }}
      animate={hit ? { x: [0, -7, 7, -4, 0], filter: ["brightness(1)", "brightness(2.2)", "brightness(1)"] } : { y: [0, -6, 0] }}
      transition={hit ? { duration: 0.4 } : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ filter: `drop-shadow(0 0 18px ${color}55)`, overflow: "visible" }}>
        <defs>
          <radialGradient id={`bpg-${gid}`} cx="50%" cy="46%" r="55%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="96" r="92" fill={`url(#bpg-${gid})`} />
        {renderBoss(bossId, color)}
      </svg>
    </motion.div>
  );
}

function renderBoss(id: string, c: string) {
  switch (id) {
    case "esfinge_competencia":
      return (
        <g>
          {/* anillos de jurisdicción */}
          <g fill="none" stroke={c} strokeWidth="1.5" opacity="0.55">
            <ellipse cx="100" cy="96" rx="74" ry="26">
              <animateTransform attributeName="transform" type="rotate" from="0 100 96" to="360 100 96" dur="15s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="100" cy="96" rx="26" ry="74">
              <animateTransform attributeName="transform" type="rotate" from="360 100 96" to="0 100 96" dur="19s" repeatCount="indefinite" />
            </ellipse>
          </g>
          {/* tocado */}
          <path d="M52 74 Q100 36 148 74 L140 86 Q100 56 60 86 Z" fill={c} opacity="0.28" />
          {/* cabeza de piedra */}
          <path d="M62 72 L138 72 L128 152 L72 152 Z" fill="#0a1220" stroke={c} strokeWidth="2.5" />
          {/* ojos */}
          <ellipse cx="84" cy="106" rx="8" ry="5" fill={c}><animate attributeName="opacity" values="1;0.35;1" dur="3.2s" repeatCount="indefinite" /></ellipse>
          <ellipse cx="116" cy="106" rx="8" ry="5" fill={c}><animate attributeName="opacity" values="1;0.35;1" dur="3.2s" begin="0.4s" repeatCount="indefinite" /></ellipse>
          <path d="M84 132 Q100 138 116 132" stroke={c} fill="none" strokeWidth="2" />
        </g>
      );
    case "receptor_fantasma":
      return (
        <g>
          {/* cédulas flotando */}
          <rect x="38" y="70" width="16" height="21" rx="1" fill="none" stroke={c} opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0" dur="5s" repeatCount="indefinite" /></rect>
          <rect x="146" y="104" width="16" height="21" rx="1" fill="none" stroke={c} opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0 0;0 8;0 0" dur="6s" repeatCount="indefinite" /></rect>
          {/* cuerpo espectral */}
          <path d="M68 62 Q100 33 132 62 L132 142 Q123 133 114 142 Q105 133 96 142 Q87 133 78 142 Q70 133 68 142 Z" fill="#0a1220" stroke={c} strokeWidth="2.2" opacity="0.92">
            <animate attributeName="opacity" values="0.92;0.7;0.92" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M70 66 Q100 42 130 66 L121 82 Q100 60 79 82 Z" fill={c} opacity="0.3" />
          {/* ojos huecos */}
          <ellipse cx="88" cy="90" rx="6" ry="9" fill={c}><animate attributeName="opacity" values="1;0.4;1" dur="2.6s" repeatCount="indefinite" /></ellipse>
          <ellipse cx="112" cy="90" rx="6" ry="9" fill={c}><animate attributeName="opacity" values="1;0.4;1" dur="2.6s" begin="0.3s" repeatCount="indefinite" /></ellipse>
        </g>
      );
    case "oraculo_prueba":
      return (
        <g>
          {/* haces de escaneo */}
          <g stroke={c} strokeWidth="1" opacity="0.3">
            {[40, 70, 100, 130, 160].map((x, i) => (
              <line key={i} x1="100" y1="96" x2={x} y2="50"><animate attributeName="opacity" values="0.1;0.45;0.1" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" /></line>
            ))}
          </g>
          {/* ojo grande */}
          <path d="M52 96 Q100 54 148 96 Q100 138 52 96 Z" fill="#0a1220" stroke={c} strokeWidth="2.6" />
          <circle cx="100" cy="96" r="23" fill="none" stroke={c} strokeWidth="2" />
          <circle cx="100" cy="96" r="11" fill={c}><animate attributeName="r" values="9;13;9" dur="2.6s" repeatCount="indefinite" /></circle>
          {/* ojos menores */}
          <circle cx="58" cy="142" r="5" fill={c} opacity="0.6" />
          <circle cx="142" cy="142" r="5" fill={c} opacity="0.6" />
        </g>
      );
    case "juez_hierro":
      return (
        <g>
          {/* tags de artículos orbitando */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 100 96" to="360 100 96" dur="17s" repeatCount="indefinite" />
            {[0, 120, 240].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              const x = 100 + Math.cos(rad) * 78 - 11;
              const y = 96 + Math.sin(rad) * 50 - 7;
              return (
                <g key={i}>
                  <rect x={x} y={y} width="22" height="14" rx="2" fill="#0a1220" stroke={c} strokeWidth="1.2" />
                  <text x={x + 11} y={y + 10} fontSize="9" fill={c} textAnchor="middle" fontFamily="monospace">§</text>
                </g>
              );
            })}
          </g>
          {/* cabeza de hierro */}
          <path d="M68 60 L132 60 L138 118 L100 152 L62 118 Z" fill="#0a1220" stroke={c} strokeWidth="2.5" />
          <line x1="100" y1="60" x2="100" y2="90" stroke={c} strokeWidth="1.5" opacity="0.5" />
          {/* visor */}
          <rect x="74" y="92" width="52" height="12" rx="2" fill={c} opacity="0.9"><animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" /></rect>
          <line x1="86" y1="124" x2="114" y2="124" stroke={c} strokeWidth="2" opacity="0.6" />
        </g>
      );
    case "corte_glitch":
      return (
        <g>
          <g fill="none" stroke={c} strokeWidth="1.8">
            <rect x="58" y="54" width="84" height="84"><animateTransform attributeName="transform" type="rotate" from="0 100 96" to="360 100 96" dur="22s" repeatCount="indefinite" /></rect>
            <rect x="72" y="68" width="56" height="56" opacity="0.7"><animateTransform attributeName="transform" type="rotate" from="360 100 96" to="0 100 96" dur="15s" repeatCount="indefinite" /></rect>
            <rect x="84" y="80" width="32" height="32" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 100 96" to="360 100 96" dur="9s" repeatCount="indefinite" /></rect>
          </g>
          <circle cx="100" cy="96" r="9" fill={c}><animate attributeName="opacity" values="1;0.25;1" dur="1.1s" repeatCount="indefinite" /></circle>
          {/* glitch slices */}
          <rect x="38" y="92" width="124" height="3" fill={c} opacity="0.4"><animate attributeName="x" values="38;46;38" dur="0.35s" repeatCount="indefinite" /></rect>
          <rect x="42" y="110" width="116" height="2" fill="#4BE7FF" opacity="0.3"><animate attributeName="x" values="42;36;42" dur="0.5s" repeatCount="indefinite" /></rect>
        </g>
      );
    case "leviatan_ejecutivo":
      return (
        <g>
          {/* masa documental / cabeza */}
          <path d="M52 84 L70 58 L90 72 L110 58 L130 72 L150 62 L152 122 Q100 168 48 122 Z" fill="#0a1220" stroke={c} strokeWidth="2.6" />
          {/* placas */}
          <g stroke={c} opacity="0.35" strokeWidth="1.4">
            <line x1="64" y1="96" x2="88" y2="96" /><line x1="112" y1="96" x2="136" y2="96" />
            <line x1="70" y1="110" x2="92" y2="110" /><line x1="108" y1="110" x2="130" y2="110" />
          </g>
          {/* ojo rojo coercitivo */}
          <circle cx="100" cy="100" r="13" fill="#0a1220" stroke={RED} strokeWidth="2.2" />
          <circle cx="100" cy="100" r="6" fill={RED}><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" /></circle>
          {/* dientes/cadena */}
          <path d="M68 132 L77 146 L86 132 L95 146 L104 132 L113 146 L122 132 L131 146" stroke={c} fill="none" strokeWidth="2.2" />
        </g>
      );
    case "comision_grado":
      return (
        <g>
          {/* balanza */}
          <g stroke={c} fill="none" strokeWidth="2">
            <line x1="100" y1="58" x2="100" y2="92" />
            <line x1="68" y1="70" x2="132" y2="70" />
            <path d="M68 70 Q60 90 52 90 M68 70 Q76 90 84 90" strokeWidth="1.2" opacity="0.7" />
            <path d="M132 70 Q124 90 116 90 M132 70 Q140 90 148 90" strokeWidth="1.2" opacity="0.7" />
          </g>
          <circle cx="100" cy="56" r="5" fill={c} />
          {/* tres rostros */}
          <circle cx="66" cy="126" r="16" fill="#0a1220" stroke="#4BE7FF" strokeWidth="1.8" opacity="0.9" />
          <circle cx="134" cy="126" r="16" fill="#0a1220" stroke="#8A5CFF" strokeWidth="1.8" opacity="0.9" />
          <circle cx="100" cy="112" r="23" fill="#0a1220" stroke={c} strokeWidth="2.3" />
          {/* ojos */}
          <circle cx="92" cy="110" r="2.6" fill={c}><animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" /></circle>
          <circle cx="108" cy="110" r="2.6" fill={c}><animate attributeName="opacity" values="1;0.4;1" dur="2.4s" begin="0.3s" repeatCount="indefinite" /></circle>
          <circle cx="61" cy="124" r="2" fill="#4BE7FF" />
          <circle cx="71" cy="124" r="2" fill="#4BE7FF" />
          <circle cx="129" cy="124" r="2" fill="#8A5CFF" />
          <circle cx="139" cy="124" r="2" fill="#8A5CFF" />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="100" cy="96" r="46" fill="#0a1220" stroke={c} strokeWidth="2.5" />
          <circle cx="86" cy="90" r="5" fill={c} />
          <circle cx="114" cy="90" r="5" fill={c} />
        </g>
      );
  }
}
