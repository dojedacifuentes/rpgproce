# FACTIONS & BOSSES — Jefes de la Ciudad Judicial

Cada jefe es un **personaje memorable**, no una tarjeta. Test de reconocimiento: *si tapas el texto, ¿sabes quién es?* Para lograrlo, cada boss tiene **silueta · paleta · iconografía orbital · animación idle · voz · patrón de combate**.

> Se conservan los `bossId` actuales de `data/campaign.ts` / `CampaignBossBattle.tsx` (no se rompe la data). Lo que cambia es la **identidad visual y el patrón de combate**.

---

## Patrón de combate universal (reemplaza "pregunta → correcto")

Todo jefe ataca en **5 fases de interrogatorio oral**. El jugador no responde un quiz: sostiene una conversación hostil.

```
FASE 1  PREGUNTA INICIAL   → establece el tema
FASE 2  REPREGUNTA         → ataca una debilidad de tu respuesta anterior
FASE 3  TRAMPA             → busca tu contradicción
FASE 4  CASO PRÁCTICO      → te obliga a aplicar, no recitar
FASE 5  REMATE             → pregunta difícil de cierre
```

- Acertar daña al boss; fallar consume **Salud Mental** y sube **Trauma**.
- Cada boss **deforma** este patrón con un sesgo propio (abajo).
- El **HUD de combate** (ver `05_UX_DIRECTION.md`) muestra siempre: fase actual, acciones (Atacar/Argumentar/Citar Norma/Defender/Usar Reliquia/Huir), HP del boss, Salud Mental y Trauma.

---

## Roster

### 1 · La Esfinge Jurisdiccional — `esfinge_competencia`
- **Quién es:** guardiana del umbral. Mitad estatua, mitad firewall. Habla en acertijos de competencia.
- **Silueta:** figura sedente colosal con anillos de jurisdicción orbitando; ojos = mapas de territorio.
- **Paleta:** cian (`--zona-competencia`).
- **Sesgo de combate:** *bifurca*. Cada respuesta abre dos sub-preguntas (absoluta vs relativa, prórroga vs nulidad).
- **Debilidad:** distinción precisa absoluta/relativa.
- **Voz:** "¿Quién te dio permiso para litigar aquí?"
- **Reliquia:** Sello de Jurisdicción.

### 2 · El Secretario Nihilista — `receptor_fantasma`
- **Quién es:** funcionario consumido por décadas de burocracia. Ya no cree en la justicia, solo en los plazos.
- **Silueta:** cuerpo encorvado cubierto de pantallas CRT y sellos judiciales orbitando; rostro pálido iluminado por monitores.
- **Paleta:** azul cobalto (`--zona-notificaciones`).
- **Sesgo de combate:** *cronómetro*. Sus fases tienen **menos tiempo**; ataca con fechas ("ingresó jueves, vence lunes, presenta martes — ¿qué ocurre?").
- **Debilidad:** cómputo exacto de plazos (hábiles/corridos, fatales).
- **Voz:** "Excelente respuesta. La peor posible para un funcionario. Explique."
- **Reliquia:** Reloj de Plazos.

### 3 · El Oráculo de la Prueba — `oraculo_prueba`
- **Quién es:** entidad que lo ha visto todo y solo cree lo demostrado.
- **Silueta:** esfera de ojos sobre un mar de expedientes; haces de luz que "escanean" tu evidencia.
- **Paleta:** dorado deteriorado (`--zona-prueba`).
- **Sesgo de combate:** *carga*. Te obliga a justificar oportunidad y carga; rechaza lo extemporáneo.
- **Debilidad:** carga de la prueba + término probatorio + excepciones.
- **Voz:** "Lo olvidado no se vuelve superviniente por nostalgia."
- **Reliquia:** Báculo Probatorio.

### 4 · El Ministro Formalista (Juez de Hierro) — `juez_hierro`
- **Quién es:** el anciano-magistrado conectado a miles de artículos flotantes. La encarnación de la memoria normativa.
- **Silueta:** figura erguida con togas de datos; **artículos del CPC orbitando** (ART. 254, 170, 768...); **ojos = números de artículo**.
- **Paleta:** dorado + blanco espectral (`--zona-cosajuzgada` con acento dorado).
- **Sesgo de combate:** *exigencia exacta*. Pide cita textual ("cite el número 4"); penaliza la vaguedad; **interrumpe** si dudas.
- **Debilidad:** interpretación sistemática y contextual (no solo memoria).
- **Voz:** "La ley es exacta. Tu memoria, no. — 💥 −120."
- **Reliquia:** Norma Brillante.

### 5 · El Profesor Hostil de Procesal (Corte Glitch) — `corte_glitch`
- **Quién es:** profesor cyborg, mitad humano mitad expediente. Ataca tu coherencia y tu confianza.
- **Silueta:** rostro parcialmente mecánico, **ojo rojo**, papeles/objeciones orbitando; expedientes clavados en la espalda.
- **Paleta:** púrpura/magenta con glitch (`--zona-recursos` + `--zona-oralidad`).
- **Sesgo de combate:** *repregunta encadenada*. **Te interrumpe a mitad de respuesta** con pop-ups: "¿Está seguro? ¿Fuente? ¿Artículo? ¿Excepción?". Castiga la contradicción.
- **Debilidad:** método R-A-P-E-T (resolución, agravio, plazo, efecto, tribunal) sostenido sin contradecirse.
- **Voz:** "Veo que conoce la regla. Ahora destruyamos su confianza."
- **Reliquia:** Pluma del Escribano.

### 6 · Leviatán Ejecutivo — `leviatan_ejecutivo`
- **Quién es:** monstruo colosal hecho de pagarés, cheques, sentencias y títulos ejecutivos. Ocupa la pantalla.
- **Silueta:** masa rocosa/documental con un ojo rojo coercitivo; tentáculos de embargo.
- **Paleta:** naranja coercitivo (`--zona-ejecutivo`).
- **Sesgo de combate:** *aplastamiento*. Defensa **tasada**: solo valen excepciones del art. 464; todo lo demás rebota.
- **Debilidad:** encuadrar en causal legal del 464 (título, requerimiento, embargo, cuadernos).
- **Voz:** "Tu defensa no está en la lista. Eres apremio."
- **Reliquia:** Expediente Infinito.

### 7 · La Comisión Examinadora — `comision_grado` (FINAL)
- **Quién es:** inteligencia jurídica ancestral: **fusión de tres rostros** (Civil, Procesal, Constitucional).
- **Silueta:** tres ministros holográficos en torno a una balanza colosal (ver mockup Corte Suprema).
- **Paleta:** magenta + cian + dorado fundidos.
- **Sesgo de combate:** *fuego cruzado*. Los **tres preguntan a la vez**; responder a uno deja expuestos los otros. Mezcla materias en un mismo caso.
- **Debilidad:** método integrado (institución → norma → requisito → aplicación → consecuencia).
- **Voz:** Civil: "No respondió mi pregunta." Procesal: "Tampoco la mía." Constitucional: "Continúe."
- **Reliquia:** Título de Litigante Legendario (final del juego).

---

## Tabla rápida (para implementación de data)

| bossId | Nombre escena | District | Token | Sesgo | Reliquia |
|---|---|---|---|---|---|
| esfinge_competencia | La Esfinge Jurisdiccional | Puerta de Competencia | competencia | bifurca | Sello de Jurisdicción |
| receptor_fantasma | El Secretario Nihilista | Barrio de Notificaciones | notificaciones | cronómetro | Reloj de Plazos |
| oraculo_prueba | El Oráculo de la Prueba | Distrito Probatorio | prueba | carga | Báculo Probatorio |
| juez_hierro | El Ministro Formalista | Ciudadela de la Sentencia | cosajuzgada | exigencia exacta | Norma Brillante |
| corte_glitch | El Profesor Hostil | Tribunal Recursal | recursos | repregunta+interrupción | Pluma del Escribano |
| leviatan_ejecutivo | Leviatán Ejecutivo | Foso de la Ejecución | ejecutivo | aplastamiento (464) | Expediente Infinito |
| comision_grado | La Comisión Examinadora | Ciudadela de la Comisión | oralidad | fuego cruzado | Título Legendario |

> El contenido jurídico de cada fase se expande desde el `BOSS_QUESTIONS` actual (hoy 1 pregunta por boss → meta: 5 fases). Ver `06_IMPLEMENTATION_PLAN.md`.
