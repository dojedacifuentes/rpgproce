import type { Metadata } from "next";
import "./reinos.css";

// ============================================================================
// REINOS DEL DERECHO — Layout del DLC
// Aporta SOLO el wrapper temático y el CSS aislado. Hereda <html>/<body>,
// fuentes, .crt y HUD del layout raíz: misma carcasa, sin duplicar nada.
// ============================================================================

export const metadata: Metadata = {
  title: "Reinos del Derecho — Expansión · FORO [in]VISIBLE",
  description:
    "Expansión DLC: un overworld jurídico de 7 regiones. Civil, administrativo y competencia convertidos en desafíos. Examen de grado como mundo desbloqueable.",
};

export default function ReinosLayout({ children }: { children: React.ReactNode }) {
  return <div className="reinos-scope reino-parchment">{children}</div>;
}
