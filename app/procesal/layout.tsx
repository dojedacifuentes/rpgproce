import "./procesal.css";

// ============================================================================
// ARCHIVOS DEL TIEMPO PROCESAL — layout de la expansión. Todo el árbol vive
// bajo .procesal-scope para que los estilos de archivo judicial no se filtren
// al resto del juego. pt en móvil deja respirar bajo el HUD persistente base.
// ============================================================================

export default function ProcesalLayout({ children }: { children: React.ReactNode }) {
  return <div className="procesal-scope proc-bg pt-12 md:pt-0">{children}</div>;
}
