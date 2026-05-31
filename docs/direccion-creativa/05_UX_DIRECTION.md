# UX DIRECTION — Layout por pantalla

Regla maestra: **cada pantalla es un módulo con identidad propia.** Nada comparte el layout genérico de tarjetas. Prioridad: jugabilidad → legibilidad → claridad → inmersión → efectos.

## Shell de juego (navegación global)

Reemplaza la fila de `<Link className="btn">` por una **barra de navegación de juego**:

- **Móvil:** barra **inferior fija** con 5 destinos máx + íconos grandes (≥44px tap): `MAPA · EXPEDIENTE · INVENTARIO · MISIONES · CÓDEX`. Es el patrón nativo (no menú de escritorio reducido).
- **Desktop:** misma barra abajo, o dock lateral. El contenido nunca queda bajo ella (padding reservado).
- La barra es **diegética**: parece la consola/HUD del litigante, con el ítem activo iluminado en el color del distrito actual.

## 1 · Hub "Ciudad Judicial" (`app/juego`) — REDISEÑAR shell

Objetivo: el mockup de ciudad full-bleed. Tres columnas sobre la ciudad:

```
┌───────────────┬───────────────────────────────┬───────────────┐
│ EXPEDIENTE     │                               │ MAPA (mini)   │
│ retrato+nivel  │      CIUDAD JUDICIAL           │ EVENTOS       │
│ atributos      │   (GameWorldMap full-bleed)    │ ACTIVOS       │
│ MISIÓN ACTUAL  │   distritos como lugares       │ NOTICIAS      │
│ RELIQUIAS eq.  │   lluvia · drones · niebla     │ PRÓX. COMBATE │
│ REGISTRO       │                               │ [PREPARAR]    │
└───────────────┴───────────────────────────────┴───────────────┘
                  [ barra de navegación inferior ]
```

- Renombrar paneles a lenguaje de mundo: `TELEMETRÍA`→`EXPEDIENTE DEL LITIGANTE`; `ACTOS`→`DISTRITOS`; `ACCIONES`→`PRÓXIMO ENFRENTAMIENTO` + accesos diegéticos.
- El mapa pasa de tarjeta con `minHeight 320` a **protagonista** (alto real, marco de consola).
- Header: chips de recursos (monedas, cristales, reputación) estilo HUD, no texto suelto.
- **Móvil:** una columna; ciudad arriba (alto fijo), expediente colapsable, nav inferior.

## 2 · Combate (`CampaignBossBattle`) — REDISEÑAR (HUD fijo Persona 5)

Del mockup de combate. Layout que **nunca obliga a hacer scroll para actuar**:

```
┌─ jugador ─┐      ┌──── ESCENA: retrato del BOSS ────┐   ┌─ análisis ─┐
│ retrato   │      │  nombre · HP boss · fase 1/5     │   │ debilidad  │
│ HP / SP   │      │  burbuja de pregunta (su voz)    │   │ resistencia│
│ atributos │      │  artículos orbitando · partículas│   │ patrón     │
│ habilidad │      └──────────────────────────────────┘   │ FASES 1–5  │
│ reliquias │                                              │ ataques    │
└───────────┘                                              └────────────┘
┌──────────────── HUD FIJO INFERIOR (siempre visible) ─────────────────┐
│  ELIGE TU RESPUESTA (tesis A/B/C/D)   │  ⚔ATACAR 🧠ARGUMENTAR        │
│                                       │  📜CITAR 🛡DEFENDER ⚗RELIQUIA 🏃HUIR │
│  Salud Mental ▓▓▓░  Trauma ▓░  · turno ◆◆◇◇◇                          │
└──────────────────────────────────────────────────────────────────────┘
```

- **Interrogatorio multifase** (5 fases, ver `03`). Indicador de fase siempre visible.
- **Interrupciones** (Profesor Hostil): pop-ups "¿Seguro? ¿Fuente? ¿Artículo?" que exigen reacción rápida.
- Acciones como **comandos** con ícono+color (no botones de texto plano). Acierto = daño visible al boss (proyectil/impacto). Fallo = flash rojo + Trauma.
- **Móvil:** retrato boss arriba (alto fijo), HUD de acciones fijo abajo; paneles laterales colapsan a pestañas.

## 3 · Diálogos / NPC (`EncuentroNpc`, `DialogoEscena`) — REDISEÑAR (Disco Elysium + Persona 5)

- Pantalla partida: **retrato del interlocutor** + **registro de conversación** (no formulario). La voz del personaje en serif; tus opciones como **réplicas tipadas**: `[Responder] [Argumentar] [Contradecir] [Pedir aclaración] [Citar jurisprudencia] [Guardar silencio]`.
- Cada réplica muestra su **consecuencia** (±Reputación, ±Trauma, ±Conocimiento) — como los mockups.
- Texto que entra con typewriter; decisiones que ramifican.

## 4 · Inventario / Reliquias (`InventarioPanel`) — REDISEÑAR (Cyberpunk 2077 / Diablo IV)

- **Grid de slots** con borde por rareza (Común/Raro/Épico/Legendario → colores), glow por rareza, ícono nítido.
- Pestañas: `RELIQUIAS · DOCUMENTOS · CONSUMIBLES · CLAVES`.
- Panel de detalle a la derecha: nombre, rareza, **efecto** (+stats) y **lore en cursiva** ("La prueba no miente. Lo que miente es quien no sabe presentarla.").
- Reliquias del `03`: Código de Bello, Martillo del TC, Expediente Infinito, Ojo del Ministro, Pluma del Escribano, Sello de Ejecución, Reloj de Plazos, Báculo Probatorio…

## 5 · Perfil del litigante — REDISEÑAR

- **Retrato cuerpo entero** a la izquierda (del mockup), nivel + barra XP.
- Atributos: Conocimiento · Estrategia · Oratoria · Memoria · Resistencia al Trauma (barras con color).
- Habilidades activas con nivel: Memoria Fotográfica, Argumentación Teleológica, Cita Perfecta, Interpretación Sistemática, Oratoria Forense.
- Estadísticas: victorias, derrotas, instancias, preguntas respondidas.

## 6 · Corte Suprema (instancia final) — REDISEÑAR (Destiny 2 raid)

- Del mockup Corte Suprema: tres ministros holográficos, balanza colosal, jugador de espaldas pequeño (escala épica).
- Rail izq.: objetivo de instancia + recompensa + registro. Rail der.: roster de la Comisión + **debilidades detectadas** + efectos de instancia (Presión Extrema, Ambiente Intimidante).
- Barra inferior de **fases del interrogatorio** + Vida/Trauma/Reputación + turnos.
- Entrada cinemática: "COMISIÓN EXAMINADORA ACTIVADA → INICIAR EXAMEN".

## 7 · Examen de Grado (`app/examen`) — REDISEÑAR (boss final)

- No es una evaluación: es **la batalla final**. Antesala cinemática (la comisión aparece, suena música), luego combate de la Comisión con fuego cruzado de 3 materias.

## Reglas mobile-first (obligatorias en toda pantalla)

- HUD/acciones **fijos y visibles** sin scroll. Tap targets ≥44px. Texto de lectura ≥13px.
- Una columna; los rails laterales colapsan a **pestañas o sheets**.
- Sin zoom horizontal, sin overflow-x. Probar a 360–390px.
- 60fps: si un efecto baja el frame-rate en móvil, se desactiva por `@media (pointer:coarse)` o `prefers-reduced-motion`.
