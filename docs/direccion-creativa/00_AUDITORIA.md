# AUDITORÍA VISUAL — RPG PROCE

> Estado del proyecto frente a la dirección de arte oficial (referencias adjuntas).
> Criterio binario por pantalla: **¿parece videojuego o parece dashboard/plataforma educativa?**
> Veredicto: **POTENCIAR** (ya es juego) · **RESKIN** (sirve, falta piel) · **REDISEÑAR** (es dashboard) · **MANTENER**.

---

## Resumen ejecutivo

El juego tiene una base técnica fuerte (tokens neón por institución, scanlines, glow, framer-motion, store sólido) y **un solo módulo que ya alcanza nivel comercial: el mapa de la Ciudad Judicial** (rehecho en el commit `a6c6997`). El resto del juego es **una excelente aplicación jurídica con piel oscura**: paneles `terminal`/`zona-card` reutilizados en todas las pantallas, texto mono diminuto, barras finas y mucho aire muerto. La identidad por pantalla no existe — todo usa el mismo layout de tarjetas.

**Diagnóstico de una frase:** el mapa ya es Destiny; el resto todavía es Moodle con neón.

El problema NO es de color (la paleta ya es cyberpunk). Es de **composición, densidad, jerarquía, identidad por pantalla y personaje**. Y, sobre todo, es **conceptual**: las pantallas se llaman "Telemetría", "Acciones", "Misiones" (lenguaje de software) en vez de "Distrito", "Expediente", "Interrogatorio" (lenguaje de mundo).

---

## Inventario de pantallas y veredictos

| # | Pantalla / archivo | Hoy parece | Veredicto | Referencia objetivo |
|---|---|---|---|---|
| 1 | **Título** `app/page.tsx` | Videojuego (Hades) | **POTENCIAR** | Boot cinemático + lluvia digital |
| 2 | **Hub Ciudad Judicial** `app/juego/page.tsx` | Mapa=juego / rail=dashboard | **REDISEÑAR shell** | Último mockup ciudad (rail izq. personaje, ciudad full-bleed, rail der. eventos, **nav inferior**) |
| 3 | **Mapa** `GameWorldMap` + `MapCity` | **Videojuego** ✓ | **POTENCIAR** | Ya es el benchmark. Falta niebla volumétrica, drones, zoom |
| 4 | **Combate** `CampaignBossBattle` | Quiz vertical con scroll | **REDISEÑAR** | Mockup combate (HUD fijo Persona 5, retrato boss, fases) |
| 5 | **Boss-rush / Comisión** `app/oral` | Cards con siluetas grises | **REDISEÑAR** | Roster de facción con arte de personaje |
| 6 | **Examen de Grado** `app/examen` | Evaluación | **REDISEÑAR** | Mockup Corte Suprema (raid final, 3 ministros) |
| 7 | **Corte Suprema / instancia final** | (dentro de examen/oral) | **REDISEÑAR** | Mockup Destiny raid |
| 8 | **Inventario / Reliquias** `InventarioPanel` | Lista | **REDISEÑAR** | Mockup inventario (grid Cyberpunk 2077 / Diablo IV, rareza, tooltip lore) |
| 9 | **Perfil del litigante** | Stats en tarjeta | **REDISEÑAR** | Mockup perfil (retrato cuerpo entero, atributos, habilidades) |
| 10 | **Diálogos / NPC** `EncuentroNpc`, `DialogoEscena`, `NPCInteractionPanel` | Formulario pregunta→respuesta | **REDISEÑAR** | Disco Elysium + Persona 5 (conversación con consecuencias) |
| 11 | **Codex Legal** `app/codex` | Referencia normativa | **RESKIN** | Terminal jurídica diegética (no índice de apuntes) |
| 12 | **Misiones / Diario** `MisionesPanel` | Lista de tareas | **RESKIN** | Mockup diario (objetivos, recompensas, lore) |
| 13 | **Mundo vivo** `app/mundo`, `app/mundo/[id]` | Exploración por zonas | **EVALUAR/INTEGRAR** | Fundir como interior de cada distrito |
| 14 | **Misión runner** `MissionRunner`, `app/mision/[id]` | Reproductor de actividad | **RESKIN** | Transiciones cinemáticas de entrada/salida |
| 15 | **Creación de personaje** `app/creacion` | Formulario | **REDISEÑAR** | "Constitución del litigante" — secuencia de origen |
| 16 | **Epílogo** `app/epilogo` | Pantalla de cierre | **POTENCIAR** | Créditos/destino cinemático |
| 17 | **Modos** `app/expansion` | Menú | **RESKIN** | Selector de modo diegético |
| 18 | **DLC Reinos del Derecho** `app/reinos/**` | Cohesivo (propio) | **MANTENER** | Identidad pergamino/cozy ya consistente |

---

## Patrones a eliminar (transversales)

1. **El layout "tarjeta `terminal` + label mono + barra fina"** repetido en todas las pantallas. Es el ADN del dashboard. Cada módulo necesita su propio marco.
2. **Lenguaje de software en la UI**: `TELEMETRÍA`, `ACCIONES`, `ACTOS DISPONIBLES`, `ACexpand`. Renombrar a lenguaje de mundo: `EXPEDIENTE DEL LITIGANTE`, `DISTRITOS`, `PRÓXIMO ENFRENTAMIENTO`.
3. **Aire muerto** (cuadrante inferior-izq del hub, tarjetas de la Comisión). El AAA llena el encuadre con profundidad, no con vacío.
4. **Combate como quiz**: `pregunta → 3 opciones → correcto`. Debe ser interrogatorio multifase.
5. **Bosses como emoji/silueta**. Si tapas el texto, no reconoces al boss. Necesitan personaje.
6. **Navegación con `<Link className="btn">`** en una fila. Debe ser una **barra de navegación de juego** (inferior en móvil, lateral o inferior en desktop): MAPA · EXPEDIENTE · INVENTARIO · MISIONES · CÓDEX.

## Lo que ya funciona (no romper)

- Paleta neón por institución (`--zona-*`) y tokens (`globals.css`, `tailwind.config.ts`).
- Mapa Ciudad Judicial (`GameWorldMap` + `MapCity`).
- Audio procedural (`lib/audio.ts`) — base para sonido contextual.
- Store `useGame` (personaje, atributos, reputación, trauma, xp, nivel, monedas, logros, misiones, relics) — **la data ya soporta el RPG; solo falta vestirla.**
- DLC Reinos (aislado, coherente).

---

## Orden de impacto recomendado (detalle en `06_IMPLEMENTATION_PLAN.md`)

1. **Shell del hub** (nav de juego + rail de personaje + ciudad full-bleed) — convierte el dashboard en consola de juego.
2. **Combate** (HUD fijo + interrogatorio multifase + retrato boss).
3. **Bosses como personajes** (sistema de retratos).
4. **Examen de Grado / Corte Suprema** (raid final).
5. **Inventario / Reliquias / Perfil** (identidad propia).
6. **Diálogos** (conversación, no formulario).
7. **FX globales + audio contextual + transiciones**.
