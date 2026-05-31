# IMPLEMENTATION PLAN — RPG PROCE 2.0

Diseño primero (docs 00–05) → luego código. Reglas permanentes: **no romper lógica/progresión/contenido jurídico**, **build verde en Vercel**, **mobile + desktop**, **sin libs pesadas** (SVG/CSS/framer + `lib/audio`), **un sprint = un commit verificado y pusheado**.

## Estado actual

- ✅ **Sprint 0 — Mapa Ciudad Judicial** (`GameWorldMap` + `MapCity`) ya hecho y pusheado (`a6c6997`). Es el benchmark visual.
- Tablero limpio en `main`. Todo lo demás del proyecto sigue en piel "dashboard".

## Sprints (orden de impacto)

### Sprint 1 — Shell de juego del Hub `app/juego` + navegación
**Por qué primero:** es lo primero que se ve y hoy es el dashboard más visible.
- Crear `components/game/GameNav.tsx` (barra inferior diegética, mobile-first): MAPA · EXPEDIENTE · INVENTARIO · MISIONES · CÓDEX.
- Reescribir el shell de `app/juego/page.tsx`: ciudad full-bleed central, rail izq. `EXPEDIENTE DEL LITIGANTE`, rail der. eventos/próx. combate. Renombrar paneles (mundo, no software). **Reusar la data del store tal cual.**
- Chips de recursos en header (HUD), no texto suelto.
- Verificación: medición preview desktop+móvil (sin overflow, nav visible, 60fps), screenshot.

### Sprint 2 — Combate (HUD fijo + interrogatorio multifase)
- `components/game/BossPortrait.tsx` (contrato abajo) en modo `proc` (emblema SVG por boss).
- Reescribir `CampaignBossBattle.tsx`: layout del `05` (HUD fijo inferior con Atacar/Argumentar/Citar/Defender/Reliquia/Huir + tesis A–D; rail jugador; rail análisis; barra de fases). **Conservar** `choose/nextQuestion/estado/recompensas`.
- Data: extender `BOSS_QUESTIONS` de 1 a 5 fases por boss (`fase: principal|repregunta|trampa|caso|remate`) con el sesgo de cada jefe (`03`). Empezar por 2–3 bosses; resto hereda patrón base.
- Verificación: jugar un combate completo en preview (medición + screenshot), móvil incluido.

### Sprint 3 — Bosses como personajes
- Completar `BossPortrait` para los 7 (`esfinge_competencia` … `comision_grado`): silueta + iconografía orbital + idle + glow.
- Aplicar en mapa (waypoint boss), roster (`app/oral`) y combate.
- Si el usuario provee PNGs → activar modo `asset` (sin tocar layout).

### Sprint 4 — Examen de Grado / Corte Suprema (raid final)
- Antesala cinemática + combate de la Comisión (fuego cruzado 3 materias) según mockup. `app/examen` (+ `app/oral` si aplica).

### Sprint 5 — Inventario · Reliquias · Perfil
- `InventarioPanel` → grid por rareza + detalle con lore. Pantalla de Perfil con retrato + atributos + habilidades.

### Sprint 6 — Diálogos
- `EncuentroNpc`/`DialogoEscena` → conversación con réplicas y consecuencias (Disco Elysium/Persona 5).

### Sprint 7 — FX globales + audio contextual + transiciones
- Capa de FX modulada por estado (Trauma→tormenta), transición de viaje entre pantallas (portar de `reinos`), enriquecer SFX (victoria/daño/desbloqueo/logro/subida de nivel).

## Contrato `BossPortrait` (clave para no rehacer)

```tsx
// components/game/BossPortrait.tsx
type BossVisual = {
  bossId: string;
  nombre: string;        // "El Ministro Formalista"
  token: string;         // "--zona-cosajuzgada"
  orbit: "articulos" | "crt" | "ojo-rojo" | "documental" | "anillos" | "balanza" | "plazos";
};
// <BossPortrait bossId size mode="proc" | "asset" />
// proc  → emblema SVG (silueta + iconografía orbital + idle + glow)
// asset → <img src="/bosses/<bossId>.png"> dentro del mismo marco/HUD
```
Toda la UI de combate/roster consume `BossPortrait`; cambiar `proc`→`asset` no toca el resto.

## Specs de assets (si se elige la Vía A de `04_ART_DIRECTION`)

- Retratos: `public/bosses/<bossId>.png` — PNG transparente, vertical, ~1024×1536, personaje centrado, fondo limpio.
- Fondos de escena (opcional): `public/bosses/<bossId>_bg.jpg` — ~1920×1080, paleta del distrito.
- `bossId` exactos: `esfinge_competencia`, `receptor_fantasma`, `oraculo_prueba`, `juez_hierro`, `corte_glitch`, `leviatan_ejecutivo`, `comision_grado`.
- Prompts sugeridos por boss → ver `03_FACTIONS_AND_BOSSES.md` (silueta/paleta/iconografía).

## Riesgos / mitigaciones

- **`next build` corrompe `.next` del dev server** si corren a la vez → siempre detener preview antes de `npm run build`.
- **Hidratación SSR** → nada de `Math.random` en render (usar índices/deterministas), como en `MapCity`.
- **Perf móvil** → animar solo transform/opacity; capar nº de partículas; respetar `prefers-reduced-motion`.
- **No romper el DLC `reinos`** (aislado) ni el store.

## Decisiones que necesito del usuario antes de Sprint 2–3

1. **Boss art:** ¿Vía A (tú generas 7 PNGs y yo construyo el HUD alrededor → máxima fidelidad) o Vía B (emblemas SVG procedurales ya, sin esperar assets)? Recomiendo **empezar B y migrar a A** cuando tengas los PNGs.
2. **Alcance del contenido de combate:** ¿expando los 7 bosses a 5 fases (más trabajo de autoría jurídica) o empiezo con 2–3 y el resto hereda el patrón base?
3. **Orden:** ¿sigo el orden de sprints propuesto (Hub → Combate → Bosses → Examen → Inventario/Perfil → Diálogos → FX) o priorizas otro módulo?
