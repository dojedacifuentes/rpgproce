"use client";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";

interface TransicionEventoProps {
  tipo:
    | "llamada_urgente"
    | "fallo_cascada"
    | "npc_reaparece"
    | "jurisprudencia_contradict"
    | "plazo_vencido"
    | "tercero_reclama";
  titulo: string;
  descripcion: string;
  emoji: string;
  onCerrar: () => void;
}

const TRANSICION_TEMPLATES: Record<
  TransicionEventoProps["tipo"],
  {
    titulo: string;
    icono: string;
    color: string;
    frase_intro: string;
  }
> = {
  llamada_urgente: {
    titulo: "Llamada Judicial Urgente",
    icono: "📞",
    color: "neon-red",
    frase_intro: "El teléfono del tribunal suena a las 18:47.",
  },
  fallo_cascada: {
    titulo: "Fallo en Cascada",
    icono: "🌊",
    color: "neon-blue",
    frase_intro: "Una sentencia anterior acaba de ser anulada.",
  },
  npc_reaparece: {
    titulo: "Encuentro Inesperado",
    icono: "👤",
    color: "neon-cyan",
    frase_intro: "Un NPC que creías olvidado reaparece.",
  },
  jurisprudencia_contradict: {
    titulo: "Jurisprudencia Contradictoria",
    icono: "⚖️",
    color: "zona-recursos",
    frase_intro: "La Corte Suprema publica una sentencia sorprendente.",
  },
  plazo_vencido: {
    titulo: "Plazo Vencido",
    icono: "⏰",
    color: "neon-red",
    frase_intro: "Treinta segundos. Ese es el plazo que te queda.",
  },
  tercero_reclama: {
    titulo: "Tercero Interviene",
    icono: "🔔",
    color: "zona-ejecutivo",
    frase_intro: "Un tercero reclama derecho sobre el bien en disputa.",
  },
};

export default function TransicionEvento({
  tipo,
  titulo,
  descripcion,
  emoji,
  onCerrar,
}: TransicionEventoProps) {
  const template = TRANSICION_TEMPLATES[tipo];

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 18 }}
        className={`bg-terminal-dark border-2 rounded max-w-xl w-full shadow-2xl border-${template.color}/60`}
      >
        {/* Animación de entrada — Glitch visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`bg-bg-deep border-b border-${template.color}/40 p-6`}
        >
          <div className="flex items-start gap-4">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-5xl"
            >
              {emoji || template.icono}
            </motion.span>
            <div className="flex-grow">
              <h2 className={`font-display-grave text-2xl text-${template.color} mb-1`}>
                {titulo || template.titulo}
              </h2>
              <p className="text-xs text-doc-aged/50 font-mono-terminal italic">
                {template.frase_intro}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif-juridica italic text-doc-aged/85 leading-relaxed"
          >
            {descripcion}
          </motion.p>

          {/* Efecto visual de "tensión" */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className={`h-1 bg-gradient-to-r from-transparent via-${template.color} to-transparent`}
          />

          {/* Flavor text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-doc-aged/40 italic font-mono-terminal"
          >
            Los expedientes continúan moviéndose. Con o sin ti.
          </motion.p>
        </div>

        {/* Botón para continuar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 bg-bg-deep border-t border-doc-aged/10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              sfx.confirm?.();
              onCerrar();
            }}
            onMouseEnter={() => sfx.hover?.()}
            className={`w-full btn bg-${template.color} text-bg-deep font-bold`}
          >
            Continuar →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
