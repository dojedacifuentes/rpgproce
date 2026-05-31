# ART DIRECTION — RPG PROCE

## Principio

La paleta y los tokens **ya existen y son correctos** (`globals.css`, `tailwind.config.ts`). La dirección de arte no cambia los colores: cambia **composición, profundidad, materiales, movimiento e iconografía**. Subir de "dashboard oscuro" a "consola de juego AAA".

## Paleta (ya en el proyecto — no inventar nueva)

| Token | Hex | Uso narrativo |
|---|---|---|
| `--zona-competencia` | `#4BE7FF` | cian — competencia/jurisdicción |
| `--zona-notificaciones` | `#7AD4E6` | cobalto — notificaciones/plazos |
| `--zona-prueba` | `#D7B46A` | dorado — prueba |
| `--zona-cosajuzgada` | `#F2F2F0` | blanco espectral — sentencia |
| `--zona-recursos` | `#8A5CFF` | púrpura — recursos |
| `--zona-ejecutivo` | `#FF8A3D` | naranja — ejecución |
| `--zona-oralidad` | `#FF4FCF` | magenta — oralidad/comisión |
| `--zona-cautelares` | `#58F5B0` | verde — éxito/HP positivo |
| `--zona-nulidad` | `#D94A4A` | rojo — daño/trauma/peligro |
| `--bg-deep/oil/file` | `#06070B…` | concreto nocturno |
| `--doc-aged` | `#E8DFC5` | papel — texto cálido |

**Regla de color:** fondo casi-negro; el neón **emite luz** (glow real), no solo colorea. Estado siempre por color: verde=acierto, rojo=daño/peligro, dorado=recompensa.

## Tipografía (ya en el proyecto)

- **Display:** Cinzel (`font-display-grave`) — títulos, nombres de boss, lugares. Gravedad institucional.
- **Serif:** Cormorant Garamond (`font-serif-juridica`) — lore, descripciones, voz de personajes.
- **Mono:** JetBrains Mono (`font-mono-terminal`) — datos, HUD, etiquetas de sistema, artículos.

Jerarquía: un único H1 display por pantalla, grande; mono solo para datos; nunca mono para párrafos de lore.

## Materiales y superficies

1. **Glassmorphism cyberpunk:** paneles casi opacos (`rgba(8,12,20,.92)`) con borde `1px` de neón `color-mix` y `backdrop-blur`. Esquinas con **acentos angulares** (clip-path o pseudo-elementos en L), nunca tarjeta redondeada genérica.
2. **Hologramas:** texto/íconos con leve aberración cromática y flicker en eventos; artículos del CPC flotando como billboards (ya en `MapCity`).
3. **Profundidad:** toda pantalla tiene fondo (escena/ciudad) + media (paneles) + frente (partículas/lluvia). Parallax sutil en desktop.
4. **Líneas de energía:** los caminos/bordes "vivos" llevan datos circulando (dash animado), como en `EnergyConduit`.

## Lenguaje de movimiento

- **Entradas:** los paneles entran con `spring` (stiffness ~90, damping ~14) y un leve `clip`/`y`. Nunca aparición seca.
- **Idle:** todo respira. Bosses flotan (`y: [0,-6,0]`), anillos giran (SMIL), ventanas parpadean.
- **Impacto:** acierto = flash + shake corto + partículas; daño = flash rojo + aberración.
- **Transiciones de pantalla:** fundido con color del distrito + ícono (ya hecho en la expansión `reinos`; portar a `app/`).
- **Presupuesto:** animaciones por transform/opacity (compositor). Nada de animar `width/top/left` en bucle.

## Estrategia de RETRATOS DE BOSS (decisión clave)

Las referencias son **arte pintado (IA)**. SVG/CSS no alcanza esa fidelidad. Dos vías; se recomienda combinarlas:

### Vía A — Assets de imagen (recomendada para fidelidad)
- Retratos generados (Midjourney/Firefly/etc., como los mockups) exportados a **PNG con transparencia**, guardados en `public/bosses/<bossId>.png` (+ `<bossId>_bg.jpg` para el fondo de escena).
- La UI (marcos, HUD, glow, partículas, iconografía orbital) se construye **alrededor** del PNG. Así el combate y el roster se ven como los mockups.
- **Requiere** que el usuario genere/provea 7 retratos + 7 fondos. Naming y specs en `06_IMPLEMENTATION_PLAN.md`.

### Vía B — Emblema procedural SVG (fallback inmediato, sin assets)
- Personaje estilizado por boss en SVG/CSS: silueta + **iconografía orbital** que lo identifica (artículos para el Formalista, pantallas CRT para el Nihilista, ojo rojo para el Hostil, masa documental para el Leviatán) + glow + idle. Reutiliza la idea de `components/reinos/ReinoSprite.tsx`.
- No es pintura, pero **pasa el test de reconocimiento por silueta/iconografía** y no bloquea el desarrollo.

**Plan:** implementar la UI de combate/roster **lista para ambas** (un componente `<BossPortrait bossId mode="asset|proc" />`). Arrancar en modo `proc`; cuando lleguen los PNG, cambiar a `asset` sin tocar el resto.

## Inventario de FX (global, modulado por estado)

- Lluvia digital · niebla volumétrica (gradientes) · partículas flotantes · bloom/glow · scanlines (ya en `.crt`) · glitch/aberración **solo en eventos** · drones/tráfico aéreo (siluetas en parallax).
- Estado→FX: Trauma alto = tormenta + viñeta roja; victoria = destello dorado + limpieza del cielo.

## Reglas de prohibición

- ❌ Tarjeta redonda gris con label mono y barra de 1px como unidad universal de UI.
- ❌ Emoji como identidad final de un boss (ok como placeholder temporal en mapa).
- ❌ Texto mono para párrafos largos de lore.
- ❌ Efecto que baje de 60fps en móvil → se elimina (prioridad jugabilidad).
