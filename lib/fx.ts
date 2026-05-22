// ============================================================================
// FX — Programmatic visual feedback system
// Triggers CSS animations on DOM elements for game events.
// Phase 13: screen shake, hit flash, reward glow, floating text.
// ============================================================================

const CLASS_DURATION: Record<string, number> = {
  "screen-shake": 500,
  "hit-effect": 400,
  "reward-flash": 800,
  "glitch-frame": 400,
  "boss-entrance": 1000,
};

/** Apply a CSS class briefly then remove it. */
function pulse(el: Element, className: string, duration?: number): void {
  el.classList.remove(className);
  // Force reflow so re-adding the class re-triggers the animation
  void (el as HTMLElement).offsetWidth;
  el.classList.add(className);
  const ms = duration ?? CLASS_DURATION[className] ?? 600;
  setTimeout(() => el.classList.remove(className), ms);
}

/** Create and float a text label from an anchor position, then destroy it. */
function floatText(text: string, color: string, anchor?: Element): void {
  if (typeof document === "undefined") return;

  const el = document.createElement("div");
  el.textContent = text;
  el.style.cssText = `
    position: fixed;
    font-family: var(--font-mono-terminal, monospace);
    font-size: 13px;
    font-weight: 700;
    color: ${color};
    pointer-events: none;
    z-index: 9999;
    text-shadow: 0 0 12px ${color};
    white-space: nowrap;
    letter-spacing: 0.1em;
    transition: none;
  `;

  // Position near anchor or center-screen
  if (anchor) {
    const rect = anchor.getBoundingClientRect();
    el.style.left = `${rect.left + rect.width / 2}px`;
    el.style.top = `${rect.top - 8}px`;
    el.style.transform = "translateX(-50%)";
  } else {
    el.style.left = "50%";
    el.style.top = "40%";
    el.style.transform = "translateX(-50%)";
  }

  el.classList.add("xp-float");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

/** Flash a full-screen overlay (very subtle, won't obscure UI). */
function screenOverlay(color: string, duration = 350): void {
  if (typeof document === "undefined") return;

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9990;
    background: ${color};
    opacity: 0;
    transition: opacity 60ms ease-in;
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = "0.06";
    setTimeout(() => {
      overlay.style.transition = `opacity ${duration - 80}ms ease-out`;
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), duration);
    }, 80);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

export const fx = {
  /**
   * Screen shake — for critical failures, wrong answers, inadmisible events.
   */
  shake(): void {
    if (typeof document === "undefined") return;
    pulse(document.body, "screen-shake");
    screenOverlay("rgba(217,74,74,1)", 300);
  },

  /**
   * Hit flash — for HP drops, damage in boss fights.
   * @param el Target element to flash. Defaults to document.body.
   */
  hit(el?: Element | null): void {
    if (typeof document === "undefined") return;
    pulse(el ?? document.body, "hit-effect");
  },

  /**
   * Glitch frame — for inadmisible / procedural error events.
   */
  glitch(): void {
    if (typeof document === "undefined") return;
    pulse(document.body, "glitch-frame");
    screenOverlay("rgba(217,74,74,1)", 400);
  },

  /**
   * Reward glow — for correct answers, mission completions.
   * @param el Target element to glow. Defaults to document.body.
   */
  reward(el?: Element | null): void {
    if (typeof document === "undefined") return;
    pulse(el ?? document.body, "reward-flash");
    screenOverlay("rgba(88,245,176,1)", 600);
  },

  /**
   * Float "+N XP" text from an anchor element.
   */
  xpGain(amount: number, anchor?: Element | null): void {
    floatText(`+${amount} XP`, "var(--zona-prueba, #b3f542)", anchor ?? undefined);
  },

  /**
   * Float "+N 🪙" text from an anchor element.
   */
  coinGain(amount: number, anchor?: Element | null): void {
    floatText(`+${amount} 🪙`, "var(--zona-competencia, #4be7ff)", anchor ?? undefined);
  },

  /**
   * Float "+N REP" text — for reputation gains.
   */
  repGain(amount: number, anchor?: Element | null): void {
    const sign = amount >= 0 ? "+" : "";
    const color = amount >= 0 ? "var(--zona-recursos, #ffa53a)" : "var(--zona-nulidad, #d94a4a)";
    floatText(`${sign}${amount} REP`, color, anchor ?? undefined);
  },

  /**
   * Danger flash — full-screen red tint, for deaths, defeats, critical errors.
   */
  danger(): void {
    screenOverlay("rgba(217,74,74,1)", 500);
  },

  /**
   * Success flash — full-screen green tint, for victories.
   */
  success(): void {
    screenOverlay("rgba(88,245,176,1)", 600);
  },

  /**
   * Warning flash — amber tint, for non-critical warnings.
   */
  warning(): void {
    screenOverlay("rgba(255,165,58,1)", 400);
  },
};
