---
name: reinos-del-derecho
description: >-
  Convenciones de desarrollo para la expansión DLC "Reinos del Derecho" del juego rpgproce
  (Next.js 14 App Router + TypeScript + Tailwind + framer-motion + zustand). Usa este skill
  SIEMPRE que trabajes en este repo y vayas a: añadir o editar regiones, desafíos (preguntas de
  opción múltiple), bosses o artículos legendarios; tocar el overworld/mapa, la arena de combate,
  la biblioteca, el perfil del jugador o el portal en /juego; ajustar el sistema de diseño reino-*,
  la progresión RPG (XP/rango/logros/racha), los ambientes/sonidos, o pulir móvil/legibilidad.
  Encapsula la arquitectura AISLADA (no tocar el juego base salvo el portal), el estándar anti-tells
  para preguntas, las formas de datos, los gotchas ya resueltos (overlay fantasma, solape del HUD,
  cast RegionId) y el flujo de verificación (next build + mediciones por preview MCP, los screenshots
  cuelgan). Consúltalo ANTES de escribir código nuevo en la expansión para mantener todo consistente
  y no reintroducir bugs ya corregidos.
---

# Reinos del Derecho — guía de desarrollo

Expansión tipo DLC dentro de `rpgproce` (repo `dojedacifuentes/rpgproce`, deploy Vercel desde `main`).
Enseña Derecho chileno (civil, administrativo, procesal/competencia) como un overworld jurídico de
7 regiones con arena de combate estilo Pokémon. **Todo lo nuevo es aislado y opcional**; el juego
base sigue intacto.

## Regla de oro: aislamiento total

La expansión vive en carpetas propias. **No modifiques el juego base** salvo el portal en `/juego`.

| Capa | Ubicación |
|---|---|
| Rutas | `app/reinos/**` (overworld, `[region]`, `biblioteca`, `boss/[id]`, `layout.tsx`, `reinos.css`) |
| Datos | `data/reinos/**` (`regiones.ts`, `desafios.ts`, `bosses.ts`, `articulos.ts`, `rangos.ts`) |
| Componentes | `components/reinos/**` (`ReinosOverworld`, `RegionScenery`, `ReinoSprite`, `DesafioEngine`, `BossBattle`, `PerfilJurista`, `PortalReinos`) |
| Estado | `store/useReinos.ts` — zustand+persist con **clave localStorage propia** `reinos-del-derecho-save` |
| Tipos | `types/reinos.ts` |
| Estilos | `app/reinos/reinos.css` (importado solo en `app/reinos/layout.tsx`) |

Única huella en el base: `components/reinos/PortalReinos.tsx` montado en `app/juego/page.tsx`
(1 import + 1 línea). Más extensiones a sonido/HUD se hacen **aditivas** en `lib/audio.ts` (nuevos
exports, sin tocar lo existente).

**Nunca** importes `store/useGame.ts` ni cambies su `persist` (su `migrate` resetea en cambio de
versión y borraría partidas). La expansión y el base no comparten estado.

## Sistema de diseño `reino-*` (en `app/reinos/reinos.css`)

Paletas por región vía atributo `data-reino="<id>"` que cascadea variables CSS:
`--reino-primary`, `--reino-secondary`, `--reino-accent`, `--reino-ambient`. Pon `data-reino` en el
contenedor de la región (o en un wrapper) y todo el subárbol toma su paleta.

Clases clave (reutilízalas, no inventes estilos sueltos):

- `.reino-card` — panel base, **casi opaco** (alphas .976/.992) para que el texto se lea claro sobre
  cualquier fondo. Borde y glow en el color de la región.
- `.reino-question` — enunciado en serif legible (Cormorant 600, sin tracking ancho). Para PREGUNTAS,
  no uses `font-display-grave` (Cinzel con tracking, decorativa y dura de leer).
- `.reino-optext` — texto de opción (mono cómoda).
- `.reino-explain` — explicación/lección (serif legible).
- `.reino-badge` — insignia A/B/C/D de cada opción (`data-state="ok|bad"`).
- `.reino-lesson` + `.reino-norma` — panel "Norma clave a memorizar" tras responder.
- `.reino-arena` — lienzo de combate (perspectiva + grid); su caja de comando interna es opaca.
- Animaciones: `.reino-bob`, `.reino-pulse`, `.reino-float`, `.reino-rise`, `.reino-shake`,
  `.reino-twinkle`, `.reino-boss-enter/-idle/-hit/-faint`, `.reino-arena-shake`, `.reino-redflash`,
  `.reino-dmgfloat`, `.reino-combo-pop`, `.reino-spark`, `.reino-crown-glow`.

Las clases globales del base (`.terminal`, `.btn`, `.font-display-grave`, `.font-mono-terminal`,
`.font-serif-juridica`, colores `zona-*`, `doc-aged`, `bg-*`) están disponibles y se mezclan bien.
Fuentes ya cargadas globalmente: Cinzel (display), Cormorant Garamond (serif), JetBrains Mono (mono).

## Estándar ANTI-TELLS para preguntas (crítico)

El error que se reintroduce siempre: que la respuesta se adivine por la forma, no por el fondo.
Al escribir o editar `opciones` de un `Desafio` o `AtaqueBoss`:

1. **Sin el artículo dentro de la opción.** El número/cita va SOLO en `explicacion` (y opcional `art`),
   que se revela DESPUÉS de responder. Si la única opción con "Art. 1545" es la correcta, es un tell.
2. **Opciones homogéneas**: misma forma gramatical y **longitud pareja**. La correcta no puede ser
   "la más larga y detallada".
3. **Distractores plausibles** = errores reales de examen (confundir nulidad relativa/absoluta,
   reivindicatoria vs. petición de herencia, prórroga de competencia relativa vs. absoluta, etc.).
4. **Orden mezclado en pantalla** con `shuffleOptions` de `@/lib/shuffleOptions` (memoizado por id del
   encuentro). No confíes en el orden de declaración.
5. **No reveles la norma rectora antes de responder** en la UI (ni `articuloClave` en la tarjeta de
   enemigo, ni `ataque.articulo` en el header del ataque hasta acertar).

`shuffleOptions(arr as any[]).options` mezcla y preserva los campos (`texto/correcta/explicacion/art`).
La corrección se evalúa por `op.correcta` de la opción mezclada, nunca por índice fijo.

## Formas de datos y cómo añadir contenido

Tipos en `types/reinos.ts`: `Region`, `Desafio`, `OpcionDesafio`, `BossReino`, `AtaqueBoss`,
`ArticuloLegendario`, `EstadoReinos`. Las 7 `RegionId` son fijas; añadir una región es raro y exige
tocar `regiones.ts` (posición x/y en el overworld, paleta, `bossId`), `reinos.css` (bloque de paleta
`[data-reino="..."]`) y `RegionScenery.tsx` (un `case` de escenario).

**Añadir un desafío** (`data/reinos/desafios.ts`): objeto con `id` único, `region`, `tipo`
(`tribunal|accion|excepcion|conflicto|articulo|concepto|vof`), `enemigo`+`iconoEnemigo`, `enunciado`,
`contexto?`, `opciones[]` (anti-tells), `articuloClave`, `dificultad 1|2|3`, `recompensa:{xp,cristales,
articuloId?}`. Si `articuloId` apunta a un `ArticuloLegendario`, al acertar se desbloquea en la
biblioteca. Mantén ids estables (la persistencia guarda `desafiosResueltos` por id).

**Añadir un boss / ataque** (`data/reinos/bosses.ts`): `BossReino` con `hp` (nº de aciertos para
vencerlo), `vidaJugador`, `ataques[]`. La arena extrae un **subconjunto aleatorio** de `ataques` en
orden aleatorio (`pickRonda`), así que ten `ataques.length >= hp` para variedad. Cada `AtaqueBoss`:
`enunciado`, `opciones[]` (anti-tells), `dano`, `articulo?`. Vencer suelta `recompensaArticuloId`.

**Añadir un artículo** (`data/reinos/articulos.ts`): `ArticuloLegendario` con `id`, `numero`, `codigo`
(`CC|CPC|CPR|LEY`), `etiqueta`, `titulo`, `texto` (fiel/resumido), `efecto` (sabor), `rareza`
(`comun|rara|epica|legendaria`), `region`, `icono`. Texto fiel: este juego es estudio de examen de
grado; la precisión legal importa.

Helpers: `desafiosPorRegion(region)`, `getDesafio(id)`, `getBoss(id)`, `bossDeRegion(region)`,
`getArticulo(id)`, `articulosPorRegion(region)`, `getRegion(id)`, `REGIONES`, `SENDERO`.

## Progresión RPG (`data/reinos/rangos.ts` + `store/useReinos.ts`)

- `xp` se acumula en `useReinos` (cada `resolverDesafio` suma `recompensa.xp`; cada `derrotarBoss` +70).
- `rangoDe(xp)` → nivel + título por bandas (Aspirante → Pasante → Litigante → Jurista → Maestro →
  Gran Jurista del Grado) + barra de progreso. Se muestra en el overworld y dispara el toast
  "¡Subiste de nivel!" en la página de región (sonido `sfx.powerUp`).
- `LOGROS` / `logrosDesbloqueados(progreso)` son **derivados** del progreso (sin estado extra que
  persistir). Para añadir un logro, agrega un objeto con `check(p)`.
- `racha`: aciertos encadenados por sesión de región dan cristales bonus (lógica en la página de
  región, no en el store).
- Cristales = moneda; sumidero: la **pista** en `DesafioEngine` (`gastarCristales(15)` descarta una
  opción incorrecta).
- Persistencia segura: al añadir un campo nuevo a `EstadoReinos`+`INIT`, el merge shallow de zustand
  conserva el default para saves viejos. Verifica que las acciones lo devuelvan en su `set(...)`.

## Gotchas verificados (no los reintroduzcas)

- **Overlay fantasma**: NO uses `AnimatePresence` para modales/overlays que se desmontan al cerrar —
  framer-motion puede dejarlos en `opacity:0` pero montados (un `fixed inset-0` invisible bloquea
  clics). Patrón correcto: el **padre monta condicional** `{mostrar && <Modal .../>}` y el modal solo
  anima su entrada. (Ver `PerfilJurista` + `app/reinos/page.tsx`.)
- **Solape del HUD en móvil**: el juego base tiene un HUD `fixed` (nivel/vida/reloj) en las esquinas
  superiores que tapa las cabeceras. `app/reinos/layout.tsx` lleva `pt-12 md:pt-0` para librarlo en
  móvil sin afectar PC. Mantenlo.
- **TS `RegionId`**: `desafiosPorRegion`/`articulosPorRegion` esperan `RegionId`, no `string`. Si pasas
  un id que es `string` (p. ej. de `useState<string|null>`), castea `id as RegionId`. No hay
  `ignoreBuildErrors`: cualquier error de tipos rompe el build de Vercel.
- **`as any` en el storage SSR-guard** del store (igual que `useGame`); `as Storage` no compila.
- **Audio aditivo** en `lib/audio.ts`: añade nuevos exports/métodos sin tocar los existentes. Ya hay
  `startAmbientReino(region)` (7 ambientes por bioma) y `sfx.powerUp/select/whoosh/unlock`. El audio
  es procedural (Web Audio), sin archivos.
- **Móvil sin romper PC** (mobile-first): cambia la clase base (móvil) y **fija el valor de PC con
  `md:`**. Para tamaños fijos en píxeles (sprites), usa `@media (max-width:640px)` dentro de
  `reinos.css`. Verifica a 375px y a 1280px.
- **Legibilidad**: evita texto de contenido < 13px y opacidades < /50 en texto que el usuario debe
  leer. Las preguntas/explicaciones usan `.reino-question`/`.reino-explain`.

## Flujo de verificación (obligatorio antes de push)

1. **`npm run build`** en el repo (local). El proyecto **no** tiene `ignoreBuildErrors`, así que el
   build local reproduce lo que falla en Vercel. Busca `Compiled successfully` + `Generating static
   pages (N/N)` y `EXITCODE=0`. Nota: en Windows/OneDrive pueden aparecer `Static worker exited code
   3221226505` — son crasheos de worker locales; si igual imprime la tabla de rutas y exit 0, el build
   pasó (en Linux/Vercel no ocurren).
2. **Preview MCP por mediciones**, no por screenshots. Los `preview_screenshot` se **cuelgan** en este
   entorno (SVG con blur + animaciones continuas). Usa `preview_start` (servidor `rpgproce`),
   `preview_resize` (mobile/desktop), `preview_eval` para navegar (`window.location.assign(...)`) y
   **medir** con JS: `document.documentElement.scrollWidth - clientWidth` (overflow), presencia de
   elementos por selector/innerText, tamaños computados, posiciones (`getBoundingClientRect`). Para
   forzar estado, inyecta `localStorage['reinos-del-derecho-save']` (o `derecho-procesal-rpg-save`
   con un `personaje` completo para ver el hub base). Reset de animaciones para capturar es poco
   fiable; confía en las mediciones.
3. **Commit + push a `main`** (Vercel despliega solo). Mensajes de commit en español, terminando con
   la línea `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## Inspiración / tono

Pokémon + Dofus + Age of Empires/StarCraft + Ace Attorney + cyberpunk-notarial, pero **fácil de
navegar** y **legible**. Colores fuertes por bioma, juice arcade (combos, daño flotante, timer),
sonidos creativos, finales con premio (que nada quede circular). El aprendizaje es lo primero: la
explicación tras responder y la "norma clave" son el corazón pedagógico.
