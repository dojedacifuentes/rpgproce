"use client";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";

interface AlternativaButtonProps {
  letra?: string;
  texto: string;
  seleccionada?: boolean;
  correcta?: boolean;
  respondida?: boolean;
  feedback?: "correcto" | "incorrecto" | null;
  onClick?: () => void;
  disabled?: boolean;
}

export default function AlternativaButton({
  letra,
  texto,
  seleccionada = false,
  correcta = false,
  respondida = false,
  feedback = null,
  onClick,
  disabled = false,
}: AlternativaButtonProps) {
  // Color mapping based on state
  const getColors = () => {
    if (feedback === "correcto") {
      return {
        border: "border-neon-green",
        bg: "bg-neon-green/20",
        text: "text-neon-green",
        glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
      };
    }
    if (feedback === "incorrecto") {
      return {
        border: "border-neon-red",
        bg: "bg-neon-red/20",
        text: "text-neon-red",
        glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
      };
    }
    if (seleccionada && !respondida) {
      return {
        border: "border-neon-cyan",
        bg: "bg-neon-cyan/15",
        text: "text-neon-cyan",
        glow: "shadow-[0_0_15px_rgba(34,211,238,0.2)]",
      };
    }
    return {
      border: "border-parchment/30",
      bg: "bg-terminal-darker",
      text: "text-parchment/80",
      glow: "shadow-none",
    };
  };

  const colors = getColors();

  const handleClick = () => {
    if (!disabled && !respondida && onClick) {
      sfx.click?.();
      onClick();
    }
  };

  const handleHover = () => {
    if (!disabled && !respondida) {
      sfx.click?.();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onHover={handleHover}
      whileHover={
        !disabled && !respondida ? { scale: 1.02, x: 4 } : undefined
      }
      whileTap={!disabled && !respondida ? { scale: 0.98 } : undefined}
      disabled={disabled || respondida}
      className={`
        w-full text-left p-5 rounded border-2 transition-all
        min-h-20 flex items-center gap-4
        font-serif-juridica text-base leading-relaxed
        cursor-pointer
        ${colors.border} ${colors.bg} ${colors.text} ${colors.glow}
        ${disabled || respondida ? "opacity-60 cursor-default" : "hover:border-opacity-100"}
      `}
    >
      {/* Letra (A, B, C, D) */}
      {letra && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded border-2 border-current flex items-center justify-center font-display-grave text-sm font-bold">
            {letra}
          </div>
        </div>
      )}

      {/* Texto de la opción */}
      <div className="flex-grow">
        <p className="text-sm leading-relaxed">{texto}</p>
      </div>

      {/* Feedback visual */}
      {feedback === "correcto" && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="flex-shrink-0 text-2xl"
        >
          ✓
        </motion.div>
      )}

      {feedback === "incorrecto" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0 text-2xl"
        >
          ✗
        </motion.div>
      )}
    </motion.button>
  );
}
