import type { Metadata } from "next";
import "./globals.css";
import GlobalCanvas from "@/components/GlobalCanvas";
import WorldThemeProvider from "@/components/WorldThemeProvider";

export const metadata: Metadata = {
  title: "FORO [in]VISIBLE — Simulador Procesal Chileno",
  description: "Cyberpunk jurídico chileno. CPC + COT + CPR. Examen de grado.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=IM+Fell+English:ital@0;1&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="crt">
        {/* Aplica data-world al body para activar los 5 temas visuales */}
        <WorldThemeProvider />
        {/* GlobalCanvas incluye HUDPersistente internamente */}
        <GlobalCanvas />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
