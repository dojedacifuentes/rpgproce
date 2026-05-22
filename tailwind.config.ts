import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ============ FONDOS — DECADENCIA INSTITUCIONAL ============
        // negro azulado profundo, azul petróleo, gris expediente
        bg: {
          deep: "#06070B",       // fondo principal
          oil: "#0A1220",        // petróleo oscuro
          file: "#131720",       // gris expediente
          steel: "#1B2330",      // gris acero judicial
          burocratic: "#18283A", // azul burocrático
        },
        // ============ IDENTIDAD CROMÁTICA POR INSTITUCIÓN ============
        zona: {
          competencia: "#4BE7FF",   // cyan eléctrico procedural
          recursos: "#8A5CFF",       // púrpura casacional
          nulidad: "#D94A4A",        // rojo oscuro procesal
          ejecutivo: "#FF8A3D",      // naranja coercitivo
          prueba: "#D7B46A",         // dorado deteriorado
          oralidad: "#FF4FCF",       // magenta tensión
          cautelares: "#58F5B0",     // verde quirúrgico
          cosajuzgada: "#F2F2F0",    // blanco espectral
          notificaciones: "#7AD4E6", // azul cobalto receptor
          incidentes: "#E68A4B",     // ámbar caos
        },
        // ============ TONOS DOCUMENTALES ============
        doc: {
          aged: "#E8DFC5",     // papel envejecido
          stained: "#C7B98F",  // papel manchado
          sealed: "#8C7F5C",   // papel sellado
        },
        // ============ COMPATIBILIDAD CON v1/v2 (no romper) ============
        neon: {
          blue: "#4BE7FF",
          cyan: "#4BE7FF",
          violet: "#8A5CFF",
          red: "#D94A4A",
          amber: "#D7B46A",
        },
        ink: {
          900: "#06070B",
          800: "#0A1220",
          700: "#131720",
          600: "#1B2330",
          500: "#1F2A3A",
          400: "#2C3344",
        },
        parchment: "#E8DFC5",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        serif: ['"Cormorant Garamond"', '"IM Fell English"', "Georgia", "serif"],
        display: ['"Cinzel"', "serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(75,231,255,.18), inset 0 0 18px rgba(75,231,255,.05)",
        glowRed: "0 0 24px rgba(217,74,74,.25), inset 0 0 18px rgba(217,74,74,.06)",
        holo: "0 0 40px rgba(138,92,255,.15), inset 0 1px 0 rgba(255,255,255,.05)",
        document: "0 30px 60px -20px rgba(0,0,0,.7), 0 8px 24px -8px rgba(0,0,0,.5)",
        inset_top: "inset 0 1px 0 rgba(255,255,255,.04), inset 0 -1px 0 rgba(0,0,0,.4)",
      },
      backgroundImage: {
        noise: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\"/><feColorMatrix values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\"/></svg>')",
        holo_grid: "linear-gradient(rgba(75,231,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(75,231,255,.05) 1px, transparent 1px)",
        scanlines: "repeating-linear-gradient(180deg, rgba(255,255,255,.018) 0 1px, transparent 1px 3px)",
      },
      keyframes: {
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        flicker: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.92" } },
        glitch: { "0%,100%": { transform: "translate(0)" }, "20%": { transform: "translate(-1px,1px)" }, "40%": { transform: "translate(1px,-1px)" }, "60%": { transform: "translate(-1px,-1px)" } },
        breathe: { "0%,100%": { opacity: "0.7", transform: "scale(1)" }, "50%": { opacity: "1", transform: "scale(1.02)" } },
        orbit: { "0%": { transform: "rotate(0deg) translateX(40px) rotate(0deg)" }, "100%": { transform: "rotate(360deg) translateX(40px) rotate(-360deg)" } },
        dropIn: { "0%": { opacity: "0", transform: "translateY(-8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        typewriter: { "0%": { width: "0" }, "100%": { width: "100%" } },
        pulse_zone: { "0%,100%": { boxShadow: "0 0 0 0 currentColor" }, "50%": { boxShadow: "0 0 0 8px transparent" } },
      },
      animation: {
        scan: "scan 4s linear infinite",
        flicker: "flicker 3s infinite",
        glitch: "glitch .35s steps(2) infinite",
        breathe: "breathe 4s ease-in-out infinite",
        orbit: "orbit 12s linear infinite",
        dropIn: "dropIn .35s ease-out forwards",
        pulse_zone: "pulse_zone 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
