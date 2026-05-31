# SCREEN COMPOSITIONS — RPG PROCE
### Documento de producción final (previo a implementación). Composición, no código.

Convenciones: los **porcentajes** son proporción aproximada del área visible (desktop). Los **wireframes** son ASCII reales (desktop y móvil). Móvil se diseña aparte, no se encoge el escritorio. Referencias = las 4 láminas adjuntas: **[A]** Hub-ciudad · **[B]** Combate Profesor Hostil · **[C]** Corte Suprema · **[D]** Lámina-dossier compuesta.

---

## 1 · HUB / PLAZA CENTRAL

**PURPOSE.** Hacer sentir al jugador que *vive en una ciudad*, no que abre un menú. Hogar entre combates: orgullo, exploración, "¿a dónde voy ahora?".

**FOCAL POINT.** La ciudad renderizada con la **estatua de la Justicia** al centro y los distritos iluminados alrededor.

**CAMERA.** Isométrica elevada (vista de dios a ~30°), mirando la metrópoli desde arriba. Ligero parallax al mover el puntero.

**DEPTH.** *Frente:* lluvia, charcos espejados, NPCs caminando. *Medio:* distritos/edificios con letreros holográficos. *Fondo:* skyline, tráfico aéreo, la Ciudadela de la Comisión. *Skyline:* torres en bruma + haz magenta de la Comisión. *Atmósfera:* lluvia, niebla volumétrica, godrays de neón.

**VISUAL HIERARCHY.** 1º la ciudad/estatua · 2º las etiquetas de distrito (a dónde ir) · 3º "Próximo Combate" (rail derecho) · 4º el expediente del litigante (rail izquierdo).

**SCREEN PERCENTAGES.** Escena ciudad **55%** · rail izq. Expediente **18%** · rail der. Eventos/Próx. combate **18%** · barra superior estado + nav inferior **9%**.

**DESKTOP LAYOUT.** Header fino (avatar+nivel, recursos como chips, reputación). Tres columnas: izq. = Expediente (retrato, atributos, Misión Actual, Reliquias Equipadas, Registro); centro = ciudad full-bleed con distritos tappables; der. = Minimapa, Eventos Activos (con reloj), Noticias Jurídicas (ticker), Próximo Combate (retrato del jefe + "PREPARAR COMBATE"). Nav inferior fija.

**MOBILE LAYOUT.** Ciudad ocupa el **tope (~45% alto)**, scrolleable/zoomable, distritos tappables. Debajo: tarjeta "Próximo Combate" ancha + carrusel horizontal de "Eventos Activos". El Expediente es una **hoja deslizable** desde arriba (avatar+barra XP siempre visible). Noticias como ticker fino. **Nav inferior fija** (5 íconos). Nada de rails laterales.

**NAVIGATION.** Barra inferior diegética: **Mapa · Inventario · Expedientes · Personaje · Misiones · Códex** (móvil: 5 máx, "Códex/Config" en "Más"). El jugador "viaja" tocando un distrito → transición con el color del destino.

**UX RISKS.** Riesgo dashboard: rails con `TELEMETRÍA/ACCIONES` y barras finas. *Evitar:* renombrar a lenguaje de mundo (Expediente, Distritos, Próximo Enfrentamiento), centro = escena viva (no tarjeta), recursos como chips de HUD. Riesgo SaaS: demasiados paneles iguales. *Evitar:* jerarquía clara, la ciudad domina.

**REFERENCES.** **[A]** directo. Se reusa: estatua central de la Justicia, etiquetas holográficas de distrito con subtítulo, rail izq. (retrato+stats+misión+reliquias+registro), rail der. (minimapa+eventos+noticias+próximo combate con "PREPARAR COMBATE"), **barra de navegación inferior** con íconos.

```
DESKTOP
+----------------------------------------------------------------------+
| ◑ NOVATO Nv5  EXP▓▓▓░  │ CIUDAD JUDICIAL · Noche·Lluvia │ ◈3450 ✦5 ⚠2 |
+-----------+----------------------------------------------+-----------+
| EXPEDIENTE|                ░░ SKYLINE ░░  ✈               | MINIMAPA  |
| [retrato] |        [TRIBUNAL RECURSAL]                    | [····◇··] |
| Conoc. 58 |   [BIBLIOTECA]      ⚖(JUSTICIA)   [PROBATORIO]| EVENTOS▼  |
| Estrat 23 |        [FORO]                  [NOTIFICAC.]   | ⚖ Audiencia|
| Orat.  35 |                                               | ▤ Oferta  |
| MISIÓN ►  |  [PUERTA COMPETENCIA]   [CENTRO NULIDAD]      | NOTICIAS▼ |
| RELIQUIAS |   ·NPCs·lluvia·charcos·tráfico aéreo·         | PRÓX.COMB.|
| ▣▣▣ □□    |                                               | [Ministro]|
| REGISTRO  |                                               | PREPARAR ►|
+-----------+----------------------------------------------+-----------+
| 🗺 MAPA  ▸ INVENTARIO ▸ EXPEDIENTES ▸ PERSONAJE ▸ MISIONES ▸ CÓDEX    |
+----------------------------------------------------------------------+

MOBILE
+---------------------------+
| ◑Nv5 EXP▓▓░ ◈3450 ⚠2  ⌄  |  ← expediente colapsado (hoja)
+---------------------------+
|      ░ SKYLINE ✈ ░        |
|    [PROBATORIO]  ⚖        |
|  [FORO]   [NOTIFICAC.]    |  ← ciudad ~45% alto, tappable
|   [COMPETENCIA]           |
+---------------------------+
| PRÓXIMO COMBATE           |
| [Ministro] PREPARAR ►     |
+---------------------------+
| EVENTOS ◀ ⚖ ▤ ⚠ ▶ (carr.)|
+---------------------------+
| 🗺  ▣  📁  👤  ✦  ⋯        |  ← nav inferior fija
+---------------------------+
```

---

## 2 · DISTRICT SCREEN

**PURPOSE.** Llegar a un lugar. Sentir su atmósfera única y la amenaza que lo gobierna antes de entrar a pelear o dialogar.

**FOCAL POINT.** La **panorámica del distrito** (su arquitectura y color propios) con el jefe/amenaza insinuado al fondo.

**CAMERA.** A nivel de calle o ligeramente elevada, *dentro* del distrito (no aérea como el hub). Profundidad hacia la estructura dominante.

**DEPTH.** *Frente:* elementos del distrito (relojes en Notificaciones, estanterías en Probatorio). *Medio:* NPCs y puntos de interés. *Fondo:* la estructura del jefe + skyline del barrio. *Atmósfera:* el efecto firma del distrito (lluvia/polvo dorado/glitch).

**VISUAL HIERARCHY.** 1º la escena del distrito · 2º el nombre + amenaza ("gobernado por…") · 3º acciones (misiones/NPCs/entrar al jefe) · 4º recompensas potenciales.

**SCREEN PERCENTAGES.** Escena del distrito **60%** · panel info (misiones/NPCs/amenaza) **22%** · panel acción (entrar/preparar + botín) **12%** · nav/estado **6%**.

**DESKTOP LAYOUT.** Banda superior: nombre del distrito + facción que lo controla + clima. Centro/izq: escena. Columna derecha: lista de actividades (misiones, NPCs a dialogar, "Enfrentar al jefe"), cada una con su recompensa. CTA grande "ENTRAR".

**MOBILE LAYOUT.** Escena arriba (**~50% alto**) con el nombre superpuesto. Debajo: lista vertical de actividades como tarjetas anchas (Misión / Diálogo / Jefe), cada una con recompensa y botón. CTA "Enfrentar al jefe" fijo abajo sobre la nav.

**NAVIGATION.** Botón "◂ Volver a la ciudad" arriba-izq. Nav inferior persistente. Entrar a una actividad = transición cinemática.

**UX RISKS.** Riesgo educativo: que parezca "lista de ejercicios del módulo". *Evitar:* cada actividad es un **encuentro** con nombre de mundo (no "Quiz 1"), la escena domina, la amenaza del jefe está presente.

**REFERENCES.** **[A]** (etiquetas de distrito con subtítulo, p. ej. "Distrito Probatorio — Actos y Medios") + **[D]** tarjeta de instancia ("Instancia Judicial / Corte Suprema") como modelo de la tarjeta "Entrar".

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| ◂ Ciudad   DISTRITO PROBATORIO  ☔   |  | ◂  DISTRITO PROBATORIO    |
|            Facción: Escribanos        |  |    Escribanos · Polvo     |
+-----------------------------+--------+  +---------------------------+
|  ░ archivo infinito ░       |MISIONES|  |   ░ archivo · escáneres ░ |
|  estanterías en bruma       | ▸Caso A|  |                           |
|  [Oráculo al fondo]         | ▸Caso B|  +---------------------------+
|  escáneres de luz           |NPCs    |  | ▸ Misión: Carga probat.   |
|  ·polvo dorado·             | ▸Testigo|  | ▸ Diálogo: Testigo nervioso|
|                             |JEFE    |  | ▸ ...                     |
|                             |[ENTRAR]|  +---------------------------+
+-----------------------------+--------+  | ⚔ ENFRENTAR AL ORÁCULO    |
| nav inferior                         |  | 🗺 ▣ 📁 👤 ✦              |
+--------------------------------------+  +---------------------------+
```

---

## 3 · DIALOGUE SCREEN

**PURPOSE.** Una conversación hostil con consecuencias (Disco Elysium + Persona 5). Presión social, no formulario.

**FOCAL POINT.** El **retrato del interlocutor** reaccionando a lo que dices.

**CAMERA.** Plano medio/contrapicado sobre el interlocutor (lo hace dominante), jugador como cámara.

**DEPTH.** *Frente:* la caja de réplicas. *Medio:* el interlocutor + hologramas de su tema. *Fondo:* el distrito difuminado (bokeh). *Atmósfera:* partículas y color del distrito.

**VISUAL HIERARCHY.** 1º el rostro del interlocutor · 2º su línea de diálogo (lo que acaba de decir) · 3º tus réplicas · 4º la consecuencia previa de cada réplica.

**SCREEN PERCENTAGES.** Retrato/escena del interlocutor **45%** · registro de conversación **25%** · réplicas (opciones) **22%** · estado/consecuencias **8%**.

**DESKTOP LAYOUT.** Izq./centro: retrato grande + burbuja de su línea (serif). Derecha o inferior: registro de la conversación (scroll) + tus réplicas tipadas con su efecto previsto (±Reputación/Trauma/Conocimiento). Panel "Efectos de la elección".

**MOBILE LAYOUT.** Retrato arriba (**~42% alto**) con la línea actual superpuesta abajo del rostro. Debajo: réplicas como **botones anchos apilados**, cada uno con su etiqueta de intención (Responder/Argumentar/Contradecir/Aclarar/Citar/Callar) y su consecuencia mini. Registro accesible por pestaña "Historial".

**NAVIGATION.** "Abandonar conversación" arriba-der. Sin nav inferior durante el diálogo (inmersión); volver al salir.

**UX RISKS.** Riesgo Moodle: pregunta→4 opciones→correcto. *Evitar:* las réplicas son **intenciones** (no "respuesta A/B/C"), hay consecuencias visibles y persistentes, el interlocutor **repregunta** y a veces callar gana.

**REFERENCES.** **[D]** "Diálogo — Evento Narrativo" (Profesor Hostil con 4 opciones numeradas + "Efectos de la Elección: Excelente/Correcta/Incorrecta/Cobarde") y **[D]** "Diálogo — Log". **[B]** burbuja de diálogo del jefe.

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| DIÁLOGO — Evento        ◷ Abandonar |  | ◷  TESTIGO NERVIOSO       |
+--------------------------+-----------+  +---------------------------+
|                          | ESTADO    |  |     [retrato reactivo]    |
|   [RETRATO interlocutor] | Reput. 35 |  |  "...yo no vi nada,        |
|   "¿Seguro que entiendes | Trauma 12 |  |     se lo juro."          |
|    lo que dices?"        | Conoc. 58 |  +---------------------------+
|                          +-----------+  | ① Presionar  (+Conoc −Rep)|
| ① Responder con fundament| EFECTOS   |  | ② Tranquilizar (+Rep)     |
| ② Pedir aclaración       | ✔ +10 Rep |  | ③ Contradecir (−Rep ⚠)    |
| ③ Contraargumentar       | ✖ +8 Traum|  | ④ Guardar silencio        |
| ④ Guardar silencio       |           |  | [Historial ⌄]             |
+--------------------------+-----------+  +---------------------------+
```

---

## 4 · COMBAT SCREEN

**PURPOSE.** Un duelo: interrogatorio oral hostil. Tensión, presión, golpes que se ven. El jugador *pelea*, no responde un test.

**FOCAL POINT.** El **rostro del jefe** dominando el centro, con sus artículos holográficos.

**CAMERA.** Frontal, el jefe en plano medio elevado (te mira desde arriba). El jugador es la cámara (su retrato vive en el rail).

**DEPTH.** *Frente:* HUD de acciones + artículos flotando cerca. *Medio:* el jefe. *Fondo:* su distrito (aula/archivo/foso) en penumbra. *Atmósfera:* partículas + color del jefe + glitch en repreguntas.

**VISUAL HIERARCHY.** 1º el jefe (rostro/ojo) · 2º su pregunta · 3º tus respuestas + acciones (HUD inferior) · 4º análisis/fases (rail der.) y tu estado (rail izq.).

**SCREEN PERCENTAGES.** Escena del jefe **40%** · HUD acciones+respuestas (inferior) **22%** · rail jugador (izq.) **16%** · rail análisis/fases (der.) **16%** · barra superior (HP jefe) + estado inferior **6%**.

**DESKTOP LAYOUT.** Arriba: nombre + HP del jefe + tracker de fase. Centro: jefe + burbuja de pregunta + artículos. Izq: retrato jugador, HP/SP/Trauma, atributos, habilidades, reliquias, efectos activos. Der: Análisis del Enemigo (debilidad/resistencia/patrón/riesgo), Fase del Combate (1–5), Ataques del jefe. Inferior: "Elige tu respuesta" (tesis) + "Acciones" (Atacar/Argumentar/Citar Norma/Defender/Usar Reliquia/Huir). Pie: ubicación/reputación/trauma/recursos.

**MOBILE LAYOUT.** Jefe arriba (**~38% alto**) con HP + fase encima. Pregunta debajo. Respuestas como **botones anchos apilados**. **HUD de acciones fijo abajo** (fila de íconos: Atacar/Argumentar/Citar/Defender/Reliquia/Huir). HP/SP del jugador en barras finas bajo el jefe. "Análisis" y "Fases" detrás de pestañas/hoja. Nunca scroll para actuar.

**NAVIGATION.** "Abandonar combate" arriba-der. Sin nav inferior (la reemplaza el HUD de combate). Al ganar/perder → transición de resultado.

**UX RISKS.** Riesgo Moodle con neón: quiz disfrazado. *Evitar:* jefe = personaje dominante (no ícono), 5 fases con repregunta/trampa/caso, acierto que **golpea visiblemente** al jefe, interrupciones ("¿Fuente?"), Trauma/Salud Mental en juego.

**REFERENCES.** **[B]** directo y completo. Se reusa: retrato del Profesor Hostil con manos alzadas + ojo rojo, artículos holográficos (ART. 254/342/160 CPC), burbuja de pregunta, "ELIGE TU RESPUESTA" (4 tesis), grid "ACCIONES" 3×2, rail "ANÁLISIS DEL ENEMIGO", "FASE DEL COMBATE 1–5", "ATAQUES DEL PROFESOR", barra inferior (ubicación/reputación/trauma/recursos). **[D]** "Combate — Turno del jugador" (TIEMPO 15.0, historial de combate, turno actual ◆◆◇◇).

```
DESKTOP
+----------------------------------------------------------------------+
| COMBATE JURÍDICO            PROFESOR HOSTIL    HP▓▓▓▓▓▓░░  ◷Abandonar |
|                            ⬡ fase 1/5 ⬡                              |
+-----------+----------------------------------------------+-----------+
| [retrato] | [ART.254]      ╭──────────╮       [ART.342]   | ANÁLISIS  |
| HP ▓▓▓░   |                │  PROFESOR │                   | Debilidad |
| SP ▓▓░    |                │  (ojo rojo)│  "¿En qué efecto | Resist.   |
| TR ▓░     |                ╰──────────╯    se concede?"   | Patrón    |
| ATRIBUTOS |        ·artículos holográficos flotando·      | Riesgo    |
| HABILID.  |                                               | FASE 1–5  |
| RELIQUIAS |                                               | ① ► ②③④⑤ |
| EFECTOS   |                                               | ATAQUES   |
+-----------+----------------------------------------------+-----------+
| ELIGE TU RESPUESTA                 │  ACCIONES                       |
| [A Ambos efectos]                  │  ⚔Atacar  🧠Argumentar          |
| [B Solo devolutivo]                │  📜Citar   🛡Defender            |
| [C Solo suspensivo] [D No procede] │  ⚗Reliquia 🏃Huir               |
+----------------------------------------------------------------------+
| 📍Aula Magna · Probatorio   REP 68  TRAUMA 12  ◈3 ✦5 ⚠2   ☰ Menú     |
+----------------------------------------------------------------------+

MOBILE
+---------------------------+
| PROF. HOSTIL HP▓▓▓░ 1/5 ◷ |
|     ╭────────╮            |
|     │(ojo rojo)│  ART.254  |
|     ╰────────╯            |
| HP▓▓▓░  SP▓▓░  TR▓░        |
+---------------------------+
| "¿En qué efecto se concede?"|
| [A Ambos efectos]         |
| [B Solo devolutivo]       |
| [C Solo suspensivo]       |
| [D No procede]            |
+---------------------------+
| ⚔  🧠  📜  🛡  ⚗  🏃       |  ← HUD acciones fijo
| [Análisis] [Fases]        |  ← pestañas
+---------------------------+
```

---

## 5 · BOSS INTRO SCREEN

**PURPOSE.** Presentar al jefe como personaje memorable y temible. Subir la adrenalina antes del combate.

**FOCAL POINT.** El **retrato del jefe** (gran tamaño) con su iconografía firma orbitando.

**CAMERA.** Cinemática: acercamiento lento al rostro del jefe; su entrada (los artículos convergen, el ojo se enciende).

**DEPTH.** *Frente:* su iconografía (artículos/sellos/papeles). *Medio:* el jefe. *Fondo:* su distrito. *Atmósfera:* su efecto firma + viñeta dramática.

**VISUAL HIERARCHY.** 1º el rostro del jefe · 2º su nombre + frase ("La ley es exacta. Tu memoria, no.") · 3º su dossier (habilidades/debilidades/patrón) · 4º "ENFRENTAR".

**SCREEN PERCENTAGES.** Retrato del jefe **55%** · dossier (habilidades/debilidades/resistencias/recompensas/patrón) **30%** · título+frase **10%** · CTA enfrentar **5%**.

**DESKTOP LAYOUT.** Mitad izq: retrato dominante + nombre + frase + "Nivel recomendado". Mitad der: Habilidades, Debilidades, Resistencias, Recompensas, "Patrón de Ataque" (secuencia visual de fases). CTA "ENFRENTAR".

**MOBILE LAYOUT.** Retrato a pantalla casi completa (**~60% alto**) con nombre y frase superpuestos abajo. Dossier en **acordeón/pestañas** (Habilidades · Debilidades · Recompensas · Patrón). CTA "ENFRENTAR" fijo abajo.

**NAVIGATION.** "◂ Volver al distrito". El CTA lleva al combate con transición.

**UX RISKS.** Riesgo ficha de SaaS: tabla de stats fría. *Evitar:* el retrato manda (50%+), el dossier es **lore + amenaza** (no solo números), patrón de ataque mostrado como **secuencia** visual.

**REFERENCES.** **[D]** "Enfrentamiento — Boss Activo / MINISTRO FORMALISTA": retrato con artículos dorados orbitando (ART. 254/434/454), frase, Habilidades (Exigencia Numérica/Trampa Formal/Cita de Artículos), Debilidades, Resistencias, Recompensas (Artículo Dorado), "Patrón de Ataque — Secuencia Predictiva", "Nivel Recomendado".

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| ENFRENTAMIENTO — BOSS ACTIVO         |  |        [RETRATO]          |
+-----------------------------+--------+  |     artículos orbitando   |
|                             |Nv.rec 5|  |       (ojos=número)       |
|   [RETRATO MINISTRO]        |VIDA 3450|  |                           |
|   artículos dorados orbit.  |FASE 1/5|  | MINISTRO FORMALISTA       |
|   "La ley es exacta.        |PATRÓN: |  | "La ley es exacta.        |
|    Tu memoria, no."         | ⊟►⊞►⊠ |  |  Tu memoria, no."         |
| HABILIDADES | DEBILIDADES   |        |  +---------------------------+
| Exig.Numérica| Interp.Sist. |RECOMP. |  | [Habilid.][Debil.][Patrón]|
| Trampa Formal| Razon.Contxt |+120 XP |  +---------------------------+
| Cita Artículos             |Art.Dorado|  | ⚔ ENFRENTAR               |
+-----------------------------+--------+  +---------------------------+
```

---

## 6 · INVENTORY / RELICS

**PURPOSE.** El placer del botín (Diablo IV / Cyberpunk 2077). Coleccionar, comparar, equipar poder.

**FOCAL POINT.** El **grid de reliquias** con su brillo de rareza.

**CAMERA.** Plano fijo de "mochila/terminal"; sin escena 3D — aquí manda la cuadrícula y el detalle.

**DEPTH.** *Frente:* el ítem seleccionado (resaltado/levitando). *Medio:* el grid. *Fondo:* textura de terminal jurídica + viñeta. *Atmósfera:* partículas de rareza en el ítem activo.

**VISUAL HIERARCHY.** 1º el grid · 2º el ítem seleccionado (detalle) · 3º pestañas/filtros · 4º el personaje/equipado.

**SCREEN PERCENTAGES.** Grid de ítems **50%** · panel de detalle (efecto+lore) **30%** · pestañas/filtros **10%** · equipado/personaje **10%**.

**DESKTOP LAYOUT.** Pestañas arriba (Reliquias · Documentos · Consumibles · Claves). Centro/izq: grid de slots con borde de rareza. Derecha: detalle del seleccionado (ícono grande, nombre, rareza, efecto, **lore en cursiva**). Mini-figura del personaje con slots equipados.

**MOBILE LAYOUT.** Pestañas como chips arriba. Grid 3–4 columnas scrolleable. Tocar un ítem abre el detalle como **hoja inferior** (no pantalla aparte). "Equipar" en la hoja. Capacidad y filtro arriba-der.

**NAVIGATION.** Nav inferior persistente (Inventario activo). Filtros por rareza/orden.

**UX RISKS.** Riesgo tabla de ERP: lista plana. *Evitar:* **cuadrícula** con color/brillo de rareza, detalle con **lore**, ítem activo que "respira".

**REFERENCES.** **[D]** "Inventario — Reliquias": pestañas (Reliquias/Documentos/Consumibles/Claves), grid con rareza coloreada (Código de Hammurabi/Toga Digital/Pluma del Escribano/Sello de Jurisdicción/Amuleto de la Oralidad/Expediente Infinito/Norma Brillante/Báculo Probatorio/Reloj de Plazos/Espejo de la Verdad), "Detalles de Reliquia: BÁCULO PROBATORIO — Legendario — Efecto +25% daño con prueba — lore en cursiva".

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| RELIQUIAS·DOCUMENTOS·CONSUM.·CLAVES   |  | [Reliq][Doc][Cons][Claves]|
+-----------------------------+--------+  +---------------------------+
| ▣  ▣  ▣  ▣  ▣  (rareza color)|DETALLE |  | ▣ ▣ ▣ ▣                   |
| ▣  ▣  ▣⃟ ▣  ▣               |[ícono] |  | ▣ ▣ ▣⃟ ▣                  |
| ▣  ▣  ▣  ▣  ▣               |Báculo  |  | ▣ ▣ ▣ ▣                   |
| ▣  ▣  ▣  ▣  ▣               |Legendar|  | ▣ ▣ ▣ ▣                   |
|                             |+25% prb|  +---------------------------+
| [figura equipada ▣▣▣]       |"lore.."|  | ▼ Báculo Probatorio       |
+-----------------------------+--------+  | Legendario · +25% prueba  |
| nav inferior                         |  | "La prueba no miente..."  |
+--------------------------------------+  | [EQUIPAR]   nav inferior  |
                                          +---------------------------+
```

---

## 7 · CHARACTER SHEET

**PURPOSE.** Orgullo de progresión. "Mira en quién me convertí." Identidad del litigante.

**FOCAL POINT.** El **render del litigante de cuerpo entero**.

**CAMERA.** Retrato heroico de cuerpo entero, ligero contrapicado; el personaje de pie, de espaldas o 3/4.

**DEPTH.** *Frente:* el personaje. *Medio:* su aura/rango. *Fondo:* la ciudad difusa. *Atmósfera:* partículas del color de su rango.

**VISUAL HIERARCHY.** 1º el personaje · 2º nombre+nivel+rango · 3º atributos · 4º habilidades/estadísticas.

**SCREEN PERCENTAGES.** Render del litigante **40%** · atributos **25%** · habilidades **25%** · header/estadísticas **10%**.

**DESKTOP LAYOUT.** Izq: render + nombre + nivel + barra XP + rango. Centro: Atributos (Conocimiento/Estrategia/Oratoria/Memoria/Resistencia al Trauma) con barras. Der: Habilidades Activas (con nivel) + Estadísticas (victorias/derrotas/instancias/preguntas).

**MOBILE LAYOUT.** Render arriba (**~45% alto**) con nombre/nivel superpuestos. Debajo, **pestañas**: Atributos · Habilidades · Estadísticas · Logros. Una pestaña visible a la vez, scroll corto.

**NAVIGATION.** Nav inferior (Personaje activo). Sub-pestañas internas.

**UX RISKS.** Riesgo dashboard de perfil: stats en tarjetas. *Evitar:* el **render manda**, atributos con identidad de RPG, habilidades con ícono y lore breve.

**REFERENCES.** **[D]** "Menú del Jugador" (pestañas Estadísticas/Habilidades/Logros/Perfil, render de cuerpo entero, Nivel 5, atributos Reputación/Trauma/Conocimiento/Estrategia, Habilidades Activas con nivel) y **[C]** rail de stats del jugador.

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| PERSONAJE                            |  |      [RENDER litigante]   |
+--------------+-----------+-----------+  |   NOVATO · Nv5 · EXP▓▓░   |
| [RENDER]     | ATRIBUTOS | HABILIDAD |  +---------------------------+
| NOVATO Nv5   | Conoc ▓▓▓ | Mem.Fotog |  | [Atrib][Habil][Estad][🏆] |
| EXP ▓▓▓░     | Estrat ▓▓ | Cita Perf |  +---------------------------+
| Rango: ...   | Orat. ▓▓▓ | Oratoria  |  | Conocimiento  ▓▓▓▓░  58   |
|              | Mem.  ▓▓▓ | Interp.S. |  | Estrategia    ▓▓░    23   |
|              | R.Traum ▓ | ESTADÍST. |  | Oratoria      ▓▓▓    35   |
+--------------+-----------+-----------+  | ...                       |
| nav inferior                         |  | nav inferior              |
+--------------------------------------+  +---------------------------+
```

---

## 8 · EXAM FINAL

**PURPOSE.** La batalla final. La experiencia más épica del juego. No una evaluación: un jefe final.

**FOCAL POINT.** La **Comisión** (tres ministros) materializándose sobre la balanza colosal.

**CAMERA.** Desde detrás del litigante diminuto, mirando hacia arriba a los tres ministros gigantes — contraste de escala máximo.

**DEPTH.** *Frente:* el litigante (pequeño, de espaldas). *Medio:* la balanza emisora. *Fondo:* los tres ministros + catedral infinita. *Skyline:* bóveda de la Corte. *Atmósfera:* godrays, niebla sagrada, partículas ascendentes.

**VISUAL HIERARCHY.** 1º los tres ministros · 2º "COMISIÓN EXAMINADORA ACTIVADA / INICIAR EXAMEN" · 3º objetivo+recompensa (rail) · 4º efectos de instancia (rail).

**SCREEN PERCENTAGES.** Escena catedral+ministros **60%** · rail objetivo/recompensa (izq.) **18%** · rail efectos/roster (der.) **16%** · CTA + barra de fase **6%**.

**DESKTOP LAYOUT.** Centro: la antesala (catedral, 3 ministros, balanza, litigante diminuto) + panel "COMISIÓN ACTIVADA — INICIAR EXAMEN". Izq: Objetivo de la Instancia, Recompensa (+XP, Título Legendario), Registro. Der: roster de la Comisión, Debilidades detectadas, Efectos de la Instancia. Pie: fase 1–5, Vida/Trauma/Reputación, turnos ∞.

**MOBILE LAYOUT.** La escena ocupa **~62% alto** (impacto), con el CTA "INICIAR EXAMEN" superpuesto abajo. Objetivo/Recompensa y Efectos como **hojas** ("Objetivo", "Efectos"). Barra de estado inferior (Vida/Trauma/Reputación) fina.

**NAVIGATION.** "Abandonar instancia" arriba-der (con advertencia). Sin nav inferior (inmersión total).

**UX RISKS.** Riesgo "pantalla de examen": que parezca un test cronometrado. *Evitar:* escala colosal, antesala cinemática, música, lenguaje de batalla ("sobrevive", "no colapses"), recompensa = título, no nota.

**REFERENCES.** **[C]** directo: catedral, MINISTRO CIVIL/PROCESAL/CONSTITUCIONAL holográficos, balanza central, litigante de espaldas, panel "COMISIÓN EXAMINADORA ACTIVADA / INICIAR EXAMEN", rail Objetivo/Recompensa (+250 XP, TÍTULO: LITIGANTE LEGENDARIO)/Registro, rail Debilidades/Efectos de la Instancia (Presión Extrema/Ambiente Intimidante/Observación Total), barra inferior FASE 1.

```
DESKTOP
+----------------------------------------------------------------------+
| INSTANCIA — CORTE SUPREMA                          ◷ Abandonar       |
+-----------+----------------------------------------------+-----------+
| OBJETIVO  |              ☼ godrays ☼                      | COMISIÓN  |
| sobrevive |        [M.CIVIL] [M.PROCESAL] [M.CONST]       | M.Civil   |
| · respond.|              (gigantes holográficos)          | M.Procesal|
| · no colaps|                  ⚖ (balanza)                 | M.Const.  |
| RECOMPENSA|              · litigante diminuto ·            | DEBILIDAD.|
| +250 XP   |    ╭───────────────────────────────╮         | Contradic |
| Legendario|    │ COMISIÓN ACTIVADA · INICIAR ► │         | EFECTOS   |
| REGISTRO  |    ╰───────────────────────────────╯         | Presión++ |
+-----------+----------------------------------------------+-----------+
| FASE 1▸2▸3▸4▸5   VIDA▓▓▓▓  TRAUMA▓░  REPUT.▓▓▓░   turnos ∞           |
+----------------------------------------------------------------------+

MOBILE
+---------------------------+
| CORTE SUPREMA        ◷    |
|      ☼ godrays ☼          |
|  [CIVIL][PROC][CONST]     |
|        ⚖ balanza          |
|     ·litigante·           |
| ╭───────────────────────╮ |
| │  INICIAR EXAMEN ►     │ |
| ╰───────────────────────╯ |
+---------------------------+
| [Objetivo] [Efectos]      |
| VIDA▓▓▓ TRAUMA▓ REPUT▓▓   |
+---------------------------+
```

---

## 9 · CORTE SUPREMA (combate de la instancia)

**PURPOSE.** El combate dentro de la raid: fuego cruzado de tres materias. Clímax mecánico del juego.

**FOCAL POINT.** El ministro que **está preguntando ahora** (se ilumina; los otros dos en penumbra, vigilando).

**CAMERA.** Igual encuadre épico que Exam Final, pero el foco salta al ministro activo; leve zoom en sus repreguntas.

**DEPTH.** *Frente:* HUD de respuestas+acciones. *Medio:* el ministro activo. *Fondo:* los otros dos + catedral. *Atmósfera:* godrays + el color del ministro activo (azul/dorado/púrpura).

**VISUAL HIERARCHY.** 1º ministro activo · 2º su pregunta · 3º respuestas+acciones · 4º debilidades/efectos/fase.

**SCREEN PERCENTAGES.** Escena (3 ministros) **45%** · HUD respuestas+acciones **22%** · rail objetivo/reliquias (izq.) **15%** · rail debilidades/efectos (der.) **12%** · barra fase/vida/trauma **6%**.

**DESKTOP LAYOUT.** Como Combat Screen pero con **tres jefes** arriba (el activo iluminado), tracker de fase compartido, y el rail derecho mostrando la debilidad detectada de cada ministro. HUD inferior idéntico al combate (respuestas + acciones).

**MOBILE LAYOUT.** Los tres ministros arriba (**~36% alto**), el activo grande al centro, los otros dos chicos a los lados. Pregunta + respuestas apiladas. HUD de acciones fijo abajo. "¿Quién pregunta?" indicado con color.

**NAVIGATION.** "Abandonar instancia" arriba-der. HUD de combate reemplaza la nav.

**UX RISKS.** Riesgo de saturación (3 jefes + raid). *Evitar:* iluminar **solo** al que pregunta, mantener el HUD idéntico al combate normal (consistencia), una pregunta a la vez.

**REFERENCES.** **[C]** (arena, 3 ministros, debilidades por ministro, efectos de instancia, barra de fase/vida/trauma) + **[B]** (HUD de respuestas+acciones) combinados.

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| CORTE SUPREMA · interrogatorio  ◷    |  | CORTE SUPREMA   fase 2/5 ◷|
+--------+--------------------+--------+  |  [civil] (PROCESAL) [const]|
|OBJETIVO| [CIVIL] (PROCESAL*) [CONST] |  |        activo↑            |
|RELIQUIAS|   *iluminado · pregunta    |  +---------------------------+
| ▣▣▣    |    "Cite un caso..."        |  | "Cite un caso donde..."   |
|        | DEBILIDADES por ministro    |  | [A ...] [B ...]           |
+--------+----------------------------+  | [C ...] [D ...]           |
| RESPUESTAS         | ACCIONES        |  +---------------------------+
| [A][B][C][D]       | ⚔🧠📜🛡⚗🏃     |  | ⚔ 🧠 📜 🛡 ⚗ 🏃           |
+--------+----------------------------+  | VIDA▓▓ TRAUMA▓ [Debilid.] |
| FASE 2/5  VIDA▓▓▓ TRAUMA▓ turnos ∞  |  +---------------------------+
+--------------------------------------+
```

---

## 10 · LIBRARY / CODEX

**PURPOSE.** El saber como poder coleccionable. Consultar la "magia" del mundo (artículos, jurisprudencia) sin sentirse en un índice de apuntes.

**FOCAL POINT.** El **expediente/artículo abierto** (la "página viva").

**CAMERA.** Plano de lectura sobre una **terminal jurídica diegética**: un documento holográfico suspendido, no una página web.

**DEPTH.** *Frente:* el documento iluminado. *Medio:* el índice. *Fondo:* estanterías de la Biblioteca Prohibida en bokeh. *Atmósfera:* polvo dorado, partículas de datos, glitch tenue del conocimiento oculto.

**VISUAL HIERARCHY.** 1º el documento abierto · 2º el índice/navegación · 3º referencias cruzadas · 4º buscador/estado.

**SCREEN PERCENTAGES.** Documento (lectura) **50%** · índice/navegación (izq.) **22%** · relacionados/referencias (der.) **18%** · buscador/estado **10%**.

**DESKTOP LAYOUT.** Izq: índice por materia/distrito (árbol de saber). Centro: el artículo/expediente como holograma (título, texto, fuente). Der: "Aparece en" (qué jefes/distritos lo usan), reliquias relacionadas, jurisprudencia. Buscador arriba.

**MOBILE LAYOUT.** Buscador + índice como **menú desplegable** arriba. El documento ocupa la pantalla (lectura cómoda, ≥13px). "Relacionados" como **hoja** inferior. Navegación anterior/siguiente por gestos.

**NAVIGATION.** Nav inferior (Códex activo). Dentro: índice ↔ documento ↔ relacionados.

**UX RISKS.** El más alto riesgo "plataforma educativa / LMS". *Evitar:* presentarlo como **terminal jurídica del mundo** (holograma, polvo, Biblioteca Prohibida), lenguaje de "saber prohibido/poder", vincular cada norma a jefes/reliquias (no es un PDF, es **botín de conocimiento**).

**REFERENCES.** **[A]** "Biblioteca Prohibida — Conocimiento Oculto" (atmósfera) + **[D]** panel de detalle de documento (estilo de lectura con lore) como modelo del documento abierto.

```
DESKTOP                                   MOBILE
+--------------------------------------+  +---------------------------+
| CÓDEX   🔍 buscar artículo...        |  | CÓDEX 🔍 [≡ índice ⌄]     |
+-----------+----------------+---------+  +---------------------------+
| ÍNDICE    | ▦ ART. 254 CPC | APARECE |  |   ▦ ART. 254 CPC          |
| ▸Competen.|  "La demanda    | EN:     |  |  "La demanda debe          |
| ▸Notificac|   debe contener | Ministro|  |   contener..."            |
| ▸Prueba   |   ..."          | Formalis|  |                           |
| ▸Sentencia|  fuente: CPC    | RELIQ.  |  |  fuente: CPC L.I T.VII    |
| ▸Recursos | ·holograma·     | Norma B.|  +---------------------------+
+-----------+----------------+---------+  | ▸ Relacionados ⌄          |
| nav inferior                         |  | ◂ ant.   sig. ▸  nav      |
+--------------------------------------+  +---------------------------+
```

---

## CHECKLIST DE PRODUCCIÓN (común a las 10)

- [ ] El centro contiene una **escena o personaje**, no una tarjeta.
- [ ] En móvil, las **acciones nunca requieren scroll**.
- [ ] **Barra de navegación** presente (salvo combate/diálogo/instancia inmersivos).
- [ ] Lenguaje de **mundo**, nunca de software.
- [ ] Jerarquía y porcentajes respetados.
- [ ] Color = facción/estado; el neón emite.
- [ ] Cada pantalla declara su **referencia** y elementos reusados.
```
