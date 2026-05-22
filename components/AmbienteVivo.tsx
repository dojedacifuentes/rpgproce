"use client";
import { useEffect, useRef } from "react";

// ============================================================================
// AMBIENTE VIVO — Fondo cyberpunk procedural reactivo
// Canvas con lluvia jurídica, artículos CPC orbitando, partículas legales,
// glitch ambiental, líneas procesales conectando puntos.
// Reacciona al estado del expediente (intensidad/corrupción).
// ============================================================================

type Props = {
  intensidad?: number;        // 0-100 (intensidad de lluvia/partículas)
  corrupcion?: number;        // 0-100 (cuanto más alto, más glitch)
  zona?: string;              // color dominante (var --zona-X)
  modo?: "ambiente" | "oral" | "ejecutivo" | "nulidad";
};

const ARTICULOS_CPC = [
  "art. 158", "art. 170", "art. 181", "art. 187", "art. 254", "art. 258",
  "art. 303", "art. 310", "art. 318", "art. 319", "art. 328", "art. 432",
  "art. 464", "art. 545", "art. 766", "art. 767", "art. 768", "art. 770",
  "art. 776", "art. 795", "art. 810", "art. 134", "art. 50", "art. 64",
  "art. 152", "art. 44", "art. 40", "art. 48", "art. 55",
];

export default function AmbienteVivo({ intensidad = 50, corrupcion = 0, zona = "var(--zona-competencia)", modo = "ambiente" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", handleResize);

    // ─────────────────────────── ENTIDADES ───────────────────────────
    type Drop = { x: number; y: number; speed: number; len: number; alpha: number };
    type Articulo = { x: number; y: number; texto: string; vy: number; alpha: number; size: number; rot: number; vrot: number };
    type Particula = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number };

    const drops: Drop[] = [];
    const dropsN = Math.round(60 + intensidad * 1.2);
    for (let i = 0; i < dropsN; i++) {
      drops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 2 + Math.random() * 5 + intensidad / 30,
        len: 8 + Math.random() * 18,
        alpha: 0.08 + Math.random() * 0.25,
      });
    }

    const articulos: Articulo[] = [];
    const articulosN = Math.round(8 + intensidad / 8);
    for (let i = 0; i < articulosN; i++) {
      articulos.push({
        x: Math.random() * w,
        y: Math.random() * h,
        texto: ARTICULOS_CPC[Math.floor(Math.random() * ARTICULOS_CPC.length)],
        vy: 0.1 + Math.random() * 0.4,
        alpha: 0.06 + Math.random() * 0.12,
        size: 9 + Math.random() * 14,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 0.3,
      });
    }

    const particulas: Particula[] = [];

    // ─────────────────────────── LOOP ───────────────────────────
    let animationFrame = 0;
    let glitchTimer = 0;
    let frame = 0;

    const draw = () => {
      frame++;
      // Limpieza con trail leve para estela
      const fadeAlpha = modo === "nulidad" ? 0.18 : 0.13;
      ctx.fillStyle = `rgba(6,7,11,${fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      // GRID HOLOGRÁFICO — perspectiva sutil
      ctx.strokeStyle = "rgba(75,231,255,.025)";
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // LLUVIA JURÍDICA
      ctx.lineCap = "round";
      drops.forEach((d) => {
        const grd = ctx.createLinearGradient(d.x, d.y, d.x + 1, d.y + d.len);
        grd.addColorStop(0, `rgba(75,231,255,0)`);
        grd.addColorStop(1, `rgba(75,231,255,${d.alpha})`);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 1, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        if (d.y > h + 20) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      });

      // ARTÍCULOS FLOTANTES
      articulos.forEach((a) => {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate((a.rot * Math.PI) / 180);
        ctx.font = `${a.size}px JetBrains Mono, monospace`;
        ctx.fillStyle = `rgba(215,180,106,${a.alpha})`;
        ctx.fillText(a.texto, 0, 0);
        ctx.restore();
        a.y -= a.vy;
        a.rot += a.vrot;
        if (a.y < -30) {
          a.y = h + 30;
          a.x = Math.random() * w;
          a.texto = ARTICULOS_CPC[Math.floor(Math.random() * ARTICULOS_CPC.length)];
        }
      });

      // LÍNEAS DE CONEXIÓN entre artículos cercanos (red doctrinal)
      ctx.strokeStyle = `rgba(138,92,255,0.04)`;
      for (let i = 0; i < articulos.length; i++) {
        for (let j = i + 1; j < articulos.length; j++) {
          const dx = articulos[i].x - articulos[j].x;
          const dy = articulos[i].y - articulos[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(articulos[i].x, articulos[i].y);
            ctx.lineTo(articulos[j].x, articulos[j].y);
            ctx.globalAlpha = 1 - dist / 220;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // GLITCH AMBIENTAL según corrupción
      glitchTimer++;
      if (corrupcion > 0 && glitchTimer % Math.max(30, 200 - corrupcion * 2) === 0) {
        const bandH = 4 + Math.random() * 18;
        const y = Math.random() * h;
        ctx.fillStyle = `rgba(217,74,74,${0.05 + corrupcion / 800})`;
        ctx.fillRect(0, y, w, bandH);
        // partículas de glitch
        for (let i = 0; i < 12; i++) {
          particulas.push({
            x: Math.random() * w,
            y: y + Math.random() * bandH,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 2,
            life: 20 + Math.random() * 30,
            max: 50,
            size: 1 + Math.random() * 2,
          });
        }
      }

      // PARTÍCULAS
      for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];
        ctx.fillStyle = `rgba(217,74,74,${(p.life / p.max) * 0.6})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) particulas.splice(i, 1);
      }

      // VIGNETTE DOBLE — más oscuro en bordes
      const vgrd = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7);
      vgrd.addColorStop(0, "rgba(0,0,0,0)");
      vgrd.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vgrd;
      ctx.fillRect(0, 0, w, h);

      // SCANLINE BARRIDO sutil (línea horizontal recorriendo de arriba abajo)
      const scanY = (frame * 0.8) % (h + 40) - 20;
      const scanGrd = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
      scanGrd.addColorStop(0, "rgba(75,231,255,0)");
      scanGrd.addColorStop(0.5, `rgba(75,231,255,${0.03 + (modo === "oral" ? 0.04 : 0)})`);
      scanGrd.addColorStop(1, "rgba(75,231,255,0)");
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 12, w, 24);

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensidad, corrupcion, zona, modo]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
