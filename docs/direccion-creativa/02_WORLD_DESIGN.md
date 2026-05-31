# WORLD DESIGN — La Ciudad Judicial

La Ciudad Judicial es una megaciudad cyberpunk eterna y lluviosa donde el proceso es la física del mundo. Se recorre de la **Puerta Inicial** (abajo) a la **Ciudadela de la Comisión** (arriba, dominando el horizonte). El jugador asciende: cada distrito es más alto, más peligroso y más luminoso.

> Mapeo con la campaña actual (`data/campaign.ts`): cada Acto = un distrito. No se cambia la progresión ni el contenido jurídico; se le da geografía, arquitectura y lore.

## Geografía vertical (de la entrada al final)

```
                 ◇ CIUDADELA DE LA COMISIÓN   (Acto 7 · Examen de Grado · boss final)
                          ▲
                 ☗ CORTE SUPREMA              (instancia final / raid)
                          ▲
              ⚔ TRIBUNAL RECURSAL             (Acto 5 · Recursos · Profesor Hostil)
                 ▲                  ▲
   ⚒ CIUDADELA DE          ⛓ FOSO DE LA
     LA SENTENCIA            EJECUCIÓN          (Acto 4 Sentencia · Acto 6 Ejecutivo)
                 ▲                  ▲
              📜 DISTRITO PROBATORIO            (Acto 3 · Prueba y Discusión · El Oráculo)
                          ▲
              📮 BARRIO DE LAS NOTIFICACIONES   (Acto 2 · Emplazamiento · Secretario Nihilista)
                          ▲
              ⚖ PUERTA DE COMPETENCIA          (Acto 1 · Jurisdicción/Competencia · La Esfinge)
                          ▲
                    ▣ PLAZA INICIAL            (Inicio · Ciudad Judicial)
```

## Distritos

Cada distrito tiene: **arquitectura · paleta (token existente) · atmósfera · amenaza · jefe de facción · artículo-reliquia**.

### 1. Puerta de Competencia — `--zona-competencia` (cian)
- **Arquitectura:** un arco/aduana monumental que decide quién entra. Tornos holográficos, drones de control.
- **Atmósfera:** niebla baja, focos de inspección barriendo.
- **Amenaza:** ser rechazado en el umbral (incompetencia).
- **Jefe:** **La Esfinge Jurisdiccional**. **Reliquia:** Sello de Jurisdicción.
- **Lore:** "Nadie litiga sin permiso. La Esfinge decide quién es digno del proceso."

### 2. Barrio de las Notificaciones — `--zona-notificaciones` (azul cobalto)
- **Arquitectura:** red de torres-antena, tubos neumáticos de expedientes, relojes por todas partes.
- **Atmósfera:** lluvia digital intensa; cuenta-regresivas en el aire.
- **Amenaza:** el plazo. Llegar tarde = muerte civil.
- **Jefe:** **El Secretario Nihilista** (plazos/formalidades). **Reliquia:** Reloj de Plazos.
- **Lore:** "Aquí el tiempo no es dinero. Es vida o nulidad."

### 3. Distrito Probatorio — `--zona-prueba` (dorado deteriorado)
- **Arquitectura:** archivo infinito, estanterías que se pierden en la bruma, vitrinas con evidencia flotando.
- **Atmósfera:** polvo dorado, luz de lectura, silencio de biblioteca prohibida.
- **Amenaza:** la carga de la prueba; lo que no se prueba, no existe.
- **Jefe:** **El Oráculo de la Prueba**. **Reliquia:** Báculo Probatorio.
- **Lore:** "El Oráculo lo ha visto todo. Solo cree lo que se le demuestra."

### 4. Ciudadela de la Sentencia — `--zona-cosajuzgada` (blanco espectral)
- **Arquitectura:** torre judicial central, fría, monolítica, de mármol y acero.
- **Atmósfera:** luz dura, ecos, gravedad institucional.
- **Amenaza:** la cosa juzgada; el error que se vuelve definitivo.
- **Jefe:** **El Ministro Formalista** (el Juez de Hierro — memoria normativa). **Reliquia:** Norma Brillante.
- **Lore:** "La ley es exacta. Tu memoria, no."

### 5. Tribunal Recursal — `--zona-recursos` (púrpura casacional)
- **Arquitectura:** distrito de portales/ascensores hacia instancias superiores; pasarelas suspendidas.
- **Atmósfera:** glitch, distorsión, todo se puede revisar y romper.
- **Amenaza:** la repregunta y la contradicción.
- **Jefe:** **El Profesor Hostil de Procesal**. **Reliquia:** Pluma del Escribano.
- **Lore:** "Usted dijo que procede apelación. ¿Seguro? ¿En qué efecto? ¿Fundamento?"

### 6. Foso de la Ejecución — `--zona-ejecutivo` (naranja coercitivo)
- **Arquitectura:** zona industrial, grúas de embargo, contenedores de títulos.
- **Atmósfera:** brasas, vapor, fuerza bruta del apremio.
- **Amenaza:** un monstruo hecho de deuda.
- **Jefe:** **Leviatán Ejecutivo** (títulos ejecutivos · art. 464). **Reliquia:** Expediente Infinito.
- **Lore:** "La defensa aquí es tasada. Encaja en una causal o eres aplastado."

### 7. Ciudadela de la Comisión / Corte Suprema — `--zona-oralidad` (magenta tensión)
- **Arquitectura:** megaestructura que domina el horizonte (ya presente en el mapa), haz vertical, balanza de la justicia en el ápice.
- **Atmósfera:** la más luminosa y la más letal. Música propia.
- **Amenaza:** la fusión de las tres materias.
- **Jefe final:** **La Comisión Examinadora** (Civil + Procesal + Constitucional).
- **Lore:** "Tres mentes. Una verdad. Ningún margen para la duda."

## El día/noche y el clima

La ciudad es **siempre noche, siempre lluvia** (Blade Runner 2049). El clima refuerza estado: tormenta de datos cuando sube el Trauma; cielo despejado de neón tras una victoria. (Implementación: capa de FX global modulada por estado del store.)

## NPCs y facciones (gancho narrativo, no obligatorio v1)

- **Receptores** (mensajeros espectrales del Barrio de Notificaciones).
- **Escribanos** (venden reliquias documentales).
- **Testigos nerviosos** (mini-encuentros de diálogo en el Distrito Probatorio).
- Cada facción = un color, un ícono, una actitud hacia el jugador según Reputación.

## Regla de oro del mundo

El jugador nunca debe decir *"estudié Competencia"*. Debe decir *"crucé la Puerta de Competencia y la Esfinge casi me deja fuera"*.
