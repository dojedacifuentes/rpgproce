"use client";
import { ReactNode } from "react";
import { sfx } from "@/lib/audio";

// Botón con SFX integrado — clic + hover.
type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger" | "recurso" | "oral" | "cautelar";
  className?: string;
  disabled?: boolean;
  href?: never;
};

export default function BotonProcesal({ children, onClick, variant = "default", className = "", disabled }: Props) {
  const cls = `btn ${variant === "danger" ? "btn-danger" : variant === "recurso" ? "btn-recurso" : variant === "oral" ? "btn-oral" : variant === "cautelar" ? "btn-cautelar" : ""} ${className}`;
  return (
    <button
      className={cls}
      disabled={disabled}
      onClick={() => { sfx.click(); onClick?.(); }}
      onMouseEnter={() => sfx.hover()}
    >
      {children}
    </button>
  );
}
