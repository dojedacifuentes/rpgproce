import "./civilis.css";

// ============================================================================
// CIVILIS — layout de la expansión. Todo el árbol vive bajo .civilis-scope
// para que los estilos JRPG no se filtren al resto del juego.
// pt en móvil deja respirar bajo el HUD persistente base.
// ============================================================================

export default function CivilisLayout({ children }: { children: React.ReactNode }) {
  return <div className="civilis-scope civ-bg pt-12 md:pt-0">{children}</div>;
}
