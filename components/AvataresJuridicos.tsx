"use client";
import { motion } from "framer-motion";
import type { BossId } from "@/types/expansion";

// ============================================================================
// AVATARES JURÍDICOS — siluetas sofisticadas SVG (no pixel art)
// Cada boss tiene una silueta minimalista con identidad visual propia
// y elementos animados que reflejan su institución.
// ============================================================================

type Props = { size?: number; estado?: "calm" | "alerta" | "furia"; className?: string };

export function MinistroFormalista({ size = 120, estado = "calm" }: Props) {
  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <defs>
        <linearGradient id="mf-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2330" />
          <stop offset="100%" stopColor="#06070B" />
        </linearGradient>
      </defs>
      {/* halo de artículos flotantes */}
      <g opacity="0.5">
        {["768", "766", "767", "789", "770"].map((art, i) => (
          <motion.text
            key={art}
            x="50" y="20"
            textAnchor="middle"
            fontSize="6"
            fontFamily="monospace"
            fill="#D7B46A"
            animate={{ y: [10 + i * 18, 12 + i * 18, 10 + i * 18] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            transform={`rotate(${-30 + i * 15} 50 ${20 + i * 18})`}
          >
            art. {art}
          </motion.text>
        ))}
      </g>
      {/* manto/toga */}
      <path d="M20 130 Q20 80 30 70 Q35 60 50 60 Q65 60 70 70 Q80 80 80 130 Z"
        fill="url(#mf-body)" stroke="#D7B46A" strokeWidth="0.6" opacity="0.95" />
      {/* cabeza */}
      <ellipse cx="50" cy="40" rx="13" ry="16" fill="url(#mf-body)" stroke="#D7B46A" strokeWidth="0.6" />
      {/* fractura en el rostro (anteojos formalistas) */}
      <line x1="35" y1="42" x2="48" y2="42" stroke="#D7B46A" strokeWidth="0.8" />
      <line x1="52" y1="42" x2="65" y2="42" stroke="#D7B46A" strokeWidth="0.8" />
      <circle cx="42" cy="42" r="3" fill="none" stroke="#D7B46A" strokeWidth="0.6" />
      <circle cx="58" cy="42" r="3" fill="none" stroke="#D7B46A" strokeWidth="0.6" />
      {/* ojos luminosos */}
      <ellipse cx="42" cy="42" rx="1.2" ry="0.8" fill="#D7B46A" />
      <ellipse cx="58" cy="42" rx="1.2" ry="0.8" fill="#D7B46A" />
      {/* boca austera */}
      <line x1="45" y1="52" x2="55" y2="52" stroke="#D7B46A" strokeWidth="0.5" />
    </svg>
  );
}

export function ProfesorHostil({ size = 120 }: Props) {
  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <defs>
        <linearGradient id="ph-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2330" />
          <stop offset="100%" stopColor="#06070B" />
        </linearGradient>
      </defs>
      {/* libros flotantes - jurisprudencia */}
      <g>
        {[
          { x: 12, y: 30, w: 14, h: 4 },
          { x: 74, y: 25, w: 14, h: 4 },
          { x: 10, y: 65, w: 16, h: 4 },
          { x: 75, y: 70, w: 12, h: 4 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x} y={b.y} width={b.w} height={b.h}
            fill="rgba(138,92,255,.3)"
            stroke="rgba(138,92,255,.6)" strokeWidth="0.4"
            animate={{ x: [b.x, b.x + 1, b.x] }}
            transition={{ duration: 3 + i, repeat: Infinity }}
          />
        ))}
      </g>
      {/* manto académico */}
      <path d="M22 130 Q22 75 32 65 Q38 56 50 56 Q62 56 68 65 Q78 75 78 130 Z"
        fill="url(#ph-body)" stroke="#8A5CFF" strokeWidth="0.6" />
      {/* cabeza parcialmente oculta */}
      <ellipse cx="50" cy="40" rx="14" ry="17" fill="url(#ph-body)" stroke="#8A5CFF" strokeWidth="0.6" />
      {/* sombra que cubre medio rostro */}
      <path d="M36 26 L36 56 L50 56 L50 26 Z" fill="rgba(0,0,0,.65)" />
      {/* solo un ojo visible */}
      <ellipse cx="58" cy="42" rx="1.5" ry="1" fill="#8A5CFF" />
      <line x1="54" y1="50" x2="64" y2="50" stroke="#8A5CFF" strokeWidth="0.5" />
    </svg>
  );
}

export function ReceptorMetafisico({ size = 120 }: Props) {
  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <defs>
        <linearGradient id="rm-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1220" />
          <stop offset="100%" stopColor="#06070B" />
        </linearGradient>
      </defs>
      {/* notificaciones cayendo */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            width="8" height="11"
            fill="rgba(122,212,230,.3)"
            stroke="rgba(122,212,230,.6)" strokeWidth="0.3"
            initial={{ x: 20 + i * 18, y: -10 }}
            animate={{ y: [-10, 130], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7, ease: "linear" }}
          />
        ))}
      </g>
      {/* sombra alargada - lluvia */}
      <path d="M26 130 Q24 78 32 68 Q40 60 50 60 Q60 60 68 68 Q76 78 74 130 Z"
        fill="url(#rm-body)" stroke="#7AD4E6" strokeWidth="0.5" opacity="0.85" />
      {/* sombrero */}
      <ellipse cx="50" cy="22" rx="20" ry="3" fill="#06070B" stroke="#7AD4E6" strokeWidth="0.4" />
      <path d="M40 22 L40 14 Q40 10 50 10 Q60 10 60 14 L60 22 Z" fill="#06070B" stroke="#7AD4E6" strokeWidth="0.4" />
      {/* cabeza */}
      <ellipse cx="50" cy="38" rx="11" ry="14" fill="url(#rm-body)" stroke="#7AD4E6" strokeWidth="0.5" />
      {/* ojos vidriosos */}
      <ellipse cx="45" cy="38" rx="1.4" ry="0.9" fill="#7AD4E6" opacity="0.7" />
      <ellipse cx="55" cy="38" rx="1.4" ry="0.9" fill="#7AD4E6" opacity="0.7" />
      <line x1="46" y1="46" x2="54" y2="46" stroke="#7AD4E6" strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

export function SecretarioNihilista({ size = 120 }: Props) {
  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <defs>
        <linearGradient id="sn-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#131720" />
          <stop offset="100%" stopColor="#06070B" />
        </linearGradient>
      </defs>
      {/* expedientes apilados detrás */}
      <g opacity="0.5">
        {[80, 92, 104, 116].map((y, i) => (
          <rect key={y} x={15 + i % 2 * 4} y={y} width="70" height="6" fill="rgba(232,223,197,.3)" stroke="rgba(232,223,197,.4)" strokeWidth="0.3" />
        ))}
      </g>
      {/* art. 158 fragmentado encima */}
      <g>
        {["DECRETO", "AUTO", "INTERLOC.", "DEFINIT."].map((t, i) => (
          <motion.text
            key={t}
            x={15 + i * 22} y={15}
            fontSize="4.5" fontFamily="monospace" fill="#F2F2F0"
            opacity="0.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >{t}</motion.text>
        ))}
      </g>
      {/* silueta */}
      <path d="M22 140 Q22 82 32 72 Q38 64 50 64 Q62 64 68 72 Q78 82 78 140 Z"
        fill="url(#sn-body)" stroke="#F2F2F0" strokeWidth="0.5" opacity="0.85" />
      <ellipse cx="50" cy="44" rx="13" ry="16" fill="url(#sn-body)" stroke="#F2F2F0" strokeWidth="0.5" />
      {/* lentes nihilistas */}
      <line x1="36" y1="46" x2="65" y2="46" stroke="#F2F2F0" strokeWidth="0.6" />
      <circle cx="43" cy="46" r="4" fill="none" stroke="#F2F2F0" strokeWidth="0.6" />
      <circle cx="57" cy="46" r="4" fill="none" stroke="#F2F2F0" strokeWidth="0.6" />
      <ellipse cx="43" cy="46" rx="1.2" ry="0.7" fill="#F2F2F0" />
      <ellipse cx="57" cy="46" rx="1.2" ry="0.7" fill="#F2F2F0" />
      <line x1="46" y1="56" x2="54" y2="56" stroke="#F2F2F0" strokeWidth="0.4" />
    </svg>
  );
}

export function RelatorInadmisibilidades({ size = 120 }: Props) {
  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <defs>
        <linearGradient id="ri-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1220" />
          <stop offset="100%" stopColor="#06070B" />
        </linearGradient>
      </defs>
      {/* sellos INADMISIBLE flotantes */}
      <g>
        {[0, 1, 2].map((i) => (
          <motion.g key={i} opacity="0.6"
            animate={{ y: [0, -2, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i }}>
            <rect x={10 + i * 30} y={25} width="22" height="9" fill="none" stroke="#D94A4A" strokeWidth="0.5" transform={`rotate(${-5 + i * 4} ${21 + i * 30} 30)`} />
            <text x={21 + i * 30} y={31} fontSize="4" fontFamily="monospace" fill="#D94A4A" textAnchor="middle" transform={`rotate(${-5 + i * 4} ${21 + i * 30} 30)`}>INADM.</text>
          </motion.g>
        ))}
      </g>
      {/* silueta */}
      <path d="M22 140 Q22 80 32 72 Q38 64 50 64 Q62 64 68 72 Q78 80 78 140 Z" fill="url(#ri-body)" stroke="#D94A4A" strokeWidth="0.5" />
      <ellipse cx="50" cy="44" rx="12" ry="15" fill="url(#ri-body)" stroke="#D94A4A" strokeWidth="0.5" />
      {/* lápiz rojo en la mano */}
      <line x1="68" y1="80" x2="84" y2="68" stroke="#D94A4A" strokeWidth="1.5" />
      <ellipse cx="50" cy="42" rx="3" ry="1" fill="#D94A4A" opacity="0.4" />
      <ellipse cx="44" cy="44" rx="1" ry="0.7" fill="#D94A4A" />
      <ellipse cx="56" cy="44" rx="1" ry="0.7" fill="#D94A4A" />
      <line x1="46" y1="54" x2="54" y2="54" stroke="#D94A4A" strokeWidth="0.4" />
    </svg>
  );
}

export function AbogadoRivalCasacional({ size = 120 }: Props) {
  return (
    <svg viewBox="0 0 100 140" width={size} height={size * 1.4}>
      <defs>
        <linearGradient id="arc-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18283A" />
          <stop offset="100%" stopColor="#06070B" />
        </linearGradient>
        <radialGradient id="arc-aura">
          <stop offset="0%" stopColor="rgba(138,92,255,.3)" />
          <stop offset="100%" stopColor="rgba(138,92,255,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="80" rx="42" ry="50" fill="url(#arc-aura)" />
      {/* casaciones orbitando */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.text
            key={i}
            x="50" y="50"
            fontSize="5" fontFamily="monospace" fill="#8A5CFF" textAnchor="middle"
            animate={{
              rotate: 360,
              transformOrigin: "50px 70px",
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
          >
            <tspan>art. 76{6 + i}</tspan>
          </motion.text>
        ))}
      </g>
      <path d="M20 140 Q18 78 30 68 Q38 60 50 60 Q62 60 70 68 Q82 78 80 140 Z" fill="url(#arc-body)" stroke="#8A5CFF" strokeWidth="0.6" />
      <ellipse cx="50" cy="38" rx="14" ry="17" fill="url(#arc-body)" stroke="#8A5CFF" strokeWidth="0.6" />
      <line x1="36" y1="36" x2="46" y2="38" stroke="#8A5CFF" strokeWidth="0.6" />
      <line x1="54" y1="38" x2="64" y2="36" stroke="#8A5CFF" strokeWidth="0.6" />
      <ellipse cx="44" cy="40" rx="1.4" ry="1" fill="#8A5CFF" />
      <ellipse cx="56" cy="40" rx="1.4" ry="1" fill="#8A5CFF" />
      <path d="M44 52 Q50 55 56 52" fill="none" stroke="#8A5CFF" strokeWidth="0.6" />
    </svg>
  );
}

// Mapeo boss → avatar
export function AvatarBoss({ bossId, size = 140 }: { bossId: BossId; size?: number }) {
  switch (bossId) {
    case "ministro_formalista": return <MinistroFormalista size={size} />;
    case "profesor_hostil": return <ProfesorHostil size={size} />;
    case "receptor_metafisico": return <ReceptorMetafisico size={size} />;
    case "secretario_nihilista": return <SecretarioNihilista size={size} />;
    case "relator_inadmisibilidades": return <RelatorInadmisibilidades size={size} />;
    case "abogado_rival_casacional": return <AbogadoRivalCasacional size={size} />;
    default: return <MinistroFormalista size={size} />;
  }
}
