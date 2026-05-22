"use client";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";

// ============================================================================
// ALTERNATIVA BUTTON — v3 visual system
// Botón de opción múltiple con feedback de correcto/incorrecto.
// ============================================================================

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

function getStyle(
  feedback: "correcto" | "incorrecto" | null,
  seleccionada: boolean,
  respondida: boolean
): React.CSSProperties {
  if (feedback === "correcto") {
    return {
      borderColor: "rgba(88,245,176,.7)",
      background: "rgba(88,245,176,.12)",
      color: "var(--zona-cautelares)",
      boxShadow: "0 0 18px rgba(88,245,176,.2)",
    };
  }
  if (feedback === "incorrecto") {
    return {
      borderColor: "rgba(217,74,74,.7)",
      background: "rgba(217,74,74,.12)",
      color: "var(--zona-nulidad)",
      boxShadow: "0 0 18px rgba(217,74,74,.2)",
    };
  }
  if (seleccionada && !respondida) {
    return {
      borderColor: "rgba(75,231,255,.6)",
      background: "rgba(75,231,255,.08)",
      color: "var(--zona-competencia)",
      boxShadow: "0 0 14px rgba(75,231,255,.15)",
    };
  }
  return {
    borderColor: "rgba(255,255,255,.12)",
    background: "rgba(6,7,11,.6)",
    color: "var(--doc-aged, #e8e0c8)",
  };
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
  const canInteract = !disabled && !respondida;
  const style = getStyle(feedback, seleccionada, respondida);

  return (
    <motion.button
      onClick={() => {
        if (canInteract && onClick) { sfx.click(); onClick(); }
      }}
      onMouseEnter={() => { if (canInteract) sfx.hover(); }}
      whileHover={canInteract ? { scale: 1.01, x: 3 } : undefined}
      whileTap={canInteract ? { scale: 0.99 } : undefined}
      disabled={!canInteract}
      className="w-full text-left p-4 border-2 transition-all flex items-center gap-4 min-h-16 font-serif-juridica text-base leading-relaxed"
      style={{
        ...style,
        cursor: canInteract ? "pointer" : "default",
        opacity: (disabled && !respondida) ? 0.5 : 1,
      }}
    >
      {/* Letter badge */}
      {letra && (
        <div className="flex-shrink-0 w-8 h-8 border-2 border-current flex items-center justify-center font-display-grave text-sm font-bold">
          {letra}
        </div>
      )}

      {/* Text */}
      <div className="flex-grow">
        <p className="text-sm leading-relaxed">{texto}</p>
      </div>

      {/* Feedback icon */}
      {feedback === "correcto" && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="flex-shrink-0 text-xl text-zona-cautelares"
        >
          ✓
        </motion.span>
      )}
      {feedback === "incorrecto" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0 text-xl text-zona-nulidad"
        >
          ✗
        </motion.span>
      )}
    </motion.button>
  );
}
