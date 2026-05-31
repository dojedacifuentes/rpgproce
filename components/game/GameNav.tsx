"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sfx } from "@/lib/audio";

// ============================================================================
// GAME NAV — barra de navegación diegética del litigante (consola de juego).
// Inferior y fija (mobile-first). El ítem activo se ilumina en cian.
// Items con `href` navegan; con `onClick` ejecutan una acción del hub.
// ============================================================================

export type NavItem = { icon: string; label: string; href?: string; onClick?: () => void };

export default function GameNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: "linear-gradient(180deg, rgba(6,7,11,0) 0%, rgba(6,7,11,0.9) 32%, rgba(6,7,11,0.98) 100%)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(75,231,255,0.16)",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div className="max-w-3xl mx-auto px-1 flex items-stretch justify-around">
        {items.map((it) => {
          const active = it.href ? pathname === it.href : false;
          const inner = (
            <span
              className="flex flex-col items-center justify-center gap-0.5 pt-2 pb-2.5 px-1.5 min-w-[52px] transition-all"
              style={{ color: active ? "var(--zona-competencia)" : "rgba(232,223,197,0.5)" }}
            >
              <span
                className="text-[19px] leading-none"
                style={active ? { filter: "drop-shadow(0 0 7px var(--zona-competencia))" } : undefined}
              >
                {it.icon}
              </span>
              <span className="font-mono-terminal text-[8px] uppercase tracking-wider leading-none">{it.label}</span>
              <span
                className="h-0.5 rounded-full transition-all"
                style={{
                  width: active ? 22 : 0,
                  background: "var(--zona-competencia)",
                  boxShadow: active ? "0 0 6px var(--zona-competencia)" : "none",
                }}
              />
            </span>
          );
          return it.href ? (
            <Link
              key={it.label}
              href={it.href}
              onClick={() => sfx.click?.()}
              onMouseEnter={() => sfx.hover?.()}
              className="flex-1 flex justify-center active:scale-95"
              aria-current={active ? "page" : undefined}
            >
              {inner}
            </Link>
          ) : (
            <button
              key={it.label}
              onClick={() => { sfx.click?.(); it.onClick?.(); }}
              onMouseEnter={() => sfx.hover?.()}
              className="flex-1 flex justify-center active:scale-95"
            >
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
