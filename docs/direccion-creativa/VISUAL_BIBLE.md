# VISUAL BIBLE — RPG PROCE
### Instrucciones para concept artist / director de arte / diseñador UX
*Este documento describe cómo se ve el juego. No habla de código. Su objetivo: que un artista, un diseñador y un desarrollador imaginen exactamente el mismo videojuego.*

---

## 0 · LO QUE ESTABLECEN LAS REFERENCIAS (lectura de dirección de arte)

Las imágenes-objetivo enseñan seis reglas que el juego debe obedecer:

1. **El centro es una ESCENA viva, no un diagrama.** En el hub, el centro es una ciudad renderizada bajo lluvia con una estatua de la Justicia; en combate, el centro es el **rostro del jefe**; en la Corte Suprema, una catedral colosal. La interfaz **enmarca un mundo**. Esa es la diferencia entre "videojuego" y "dashboard": no son los bordes de neón, es que **hay un lugar adentro**.
2. **La grandeza se transmite por CONTRASTE DE ESCALA.** El litigante es diminuto frente a tres ministros gigantes, frente a la ciudad, frente al Leviatán. Lo pequeño hace colosal a lo grande. El peligro se siente cuando el jugador es chico.
3. **Profundidad en 3+ capas, siempre.** Frente (NPCs caminando, lluvia, partículas), medio (edificios/hologramas/el personaje), fondo (skyline, tráfico aéreo, godrays, niebla volumétrica). Nunca un plano plano.
4. **Jerarquía de mirada:** 1º la escena/el personaje, 2º la acción o la pregunta, 3º los datos. Los datos viven en **rails de vidrio oscuro** densos pero ordenados, con divisores finos de neón y micro-etiquetas en versalitas.
5. **La luz EMITE.** El neón irradia; las calles mojadas reflejan; el rostro del jefe recibe luz de color; los fondos quedan en sombra para que el neón signifique. Color = estado y facción (cian competencia, dorado prueba, magenta comisión, rojo peligro, verde acierto).
6. **Atmósfera noir lluviosa.** Noche perpetua, reflejos, hologramas de artículos flotando como publicidad. Sensación: respeto + amenaza.

**Regla de producción (honesta):** el **centro pintado** (rostro de jefe, ciudad isométrica, catedral) se logra mejor con **arte de imagen** (renders del estilo de estas referencias) colocados dentro de marcos. Los **rails, HUD, barras, partículas, niebla, hologramas y transiciones** se construyen. Diseñar pensando en ambas piezas: la lámina ilustrada + el marco vivo.

---

## LENGUAJE VISUAL COMÚN (toda pantalla lo hereda)

- **Shell:** rail(es) de vidrio oscuro casi opaco con borde de 1px de neón y esquinas angulares marcadas; **barra de estado inferior** (ubicación · reputación · trauma · recursos · próximo evento) y **barra de navegación** (Mapa · Inventario · Expedientes · Personaje · Misiones · Códex). El ítem activo se ilumina en el color del distrito.
- **Paleta:** fondo casi negro azulado; neón por institución; verde=acierto, rojo=daño, dorado=recompensa.
- **Tipografía (ánimo):** monumental para títulos/lugares/jefes; serif cálida para lore y voz; monoespaciada para datos y artículos.
- **Materiales:** vidrio, holograma (con leve temblor en tensión), expedientes y artículos suspendidos, lluvia y niebla por capas.
- **Movimiento:** todo respira; entradas con peso; impacto con destello+temblor; glitch solo en momentos clave.

---

# PARA CADA DISTRITO

> Campos: **Panorámica** (qué ve al llegar) · **Exploración** (cómo se siente caminar) · **Combate** (cómo se transforma en pelea) · **Diálogo** (cómo se ve una conversación) · **Arquitectura** · **Colores** (primario/secundario/acento) · **Iluminación** · **Efectos ambientales** · **Referencia**.

## Plaza Central — el corazón del hub
- **Panorámica:** una plaza inundada de lluvia con una **estatua colosal de la Justicia** (balanza en alto) en el centro; alrededor, los distritos como barrios iluminados con letreros holográficos flotantes.
- **Exploración:** caminar aquí es seguro y abrumador a la vez; NPCs cruzan con paraguas de luz, drones reparten notificaciones; es el respiro entre combates.
- **Combate:** la plaza no pelea; se oscurece y enfoca cuando eliges un distrito (transición de viaje con el color del destino).
- **Diálogo:** vendedores y litigantes ofrecen rumores; cajas de diálogo flotantes junto a cada NPC.
- **Arquitectura:** radial; todo converge en la estatua. Pavimento espejado.
- **Colores:** primario cian sereno · secundario dorado de la estatua · acento magenta lejano (la Comisión en el horizonte).
- **Iluminación:** cenital sobre la estatua + neón perimetral de los letreros; charcos que duplican la luz.
- **Efectos:** lluvia densa, reflejos, tráfico aéreo, hologramas de noticias jurídicas pasando.
- **Referencia:** la imagen del hub-ciudad (estatua + distritos etiquetados + lluvia).

## Puerta de Competencia — la aduana del proceso
- **Panorámica:** un **arco monumental** con tornos holográficos que decide quién entra; cola de litigantes esperando permiso.
- **Exploración:** sensación de control fronterizo; focos que barren, drones que escanean credenciales.
- **Combate:** los tornos se sellan, el arco se enciende en cian y la Esfinge desciende sobre la puerta.
- **Diálogo:** guardias-holograma piden tu jurisdicción antes de dejarte pasar.
- **Arquitectura:** monolítica, simétrica, de checkpoint; líneas duras.
- **Colores:** primario cian eléctrico · secundario acero · acento blanco de los haces de control.
- **Iluminación:** haces de inspección horizontales; el arco como fuente principal.
- **Efectos:** niebla baja, partículas de escaneo, glitch al validar.
- **Referencia:** la "Puerta de Competencia — Inicio del Proceso" del hub.

## Barrio de las Notificaciones — el distrito del tiempo
- **Panorámica:** un laberinto vertical de **torres-antena**, tubos neumáticos de expedientes y **relojes gigantes** por todas partes; cuentas regresivas suspendidas.
- **Exploración:** opresivo, apurado; todo cuenta el tiempo; los Receptores cruzan como sombras veloces.
- **Combate:** los relojes se sincronizan en rojo; cada fase corre contra el cronómetro del Secretario.
- **Diálogo:** receptores entregan/retiran cédulas; sus respuestas afectan tus plazos.
- **Arquitectura:** densa, tubular, postal-industrial; callejones estrechos.
- **Colores:** primario azul cobalto · secundario gris plomo · acento rojo de los plazos vencidos.
- **Iluminación:** fría, parpadeante; relojes que emiten; lluvia ácida.
- **Efectos:** lluvia digital intensa, cápsulas neumáticas volando, números cayendo.
- **Referencia:** "Barrio de Notificaciones — Plazos y Citaciones".

## Foro de Discusiones — el ágora de los contratos
- **Panorámica:** una plaza-mercado de NPCs donde se negocian contratos; pantallas de debate, oradores holográficos.
- **Exploración:** social, ruidoso; aquí se aceptan misiones, se habla con testigos, se cierran tratos.
- **Combate:** raro; encuentros de diálogo tenso más que de jefe.
- **Diálogo:** el corazón del distrito — Disco Elysium puro, réplicas con consecuencias.
- **Arquitectura:** abierta, escalonada, de foro romano-cyberpunk.
- **Colores:** primario ámbar cálido · secundario cian · acento verde de los acuerdos.
- **Iluminación:** cálida, de mercado nocturno; letreros de neón comercial.
- **Efectos:** multitud, vapor de comida, hologramas publicitarios.
- **Referencia:** "Foro de Discusiones — NPCs y Contratos".

## Distrito Probatorio — el archivo infinito
- **Panorámica:** un **archivo sin fin**: estanterías que se pierden en la bruma dorada, vitrinas con evidencia flotando, escáneres de luz.
- **Exploración:** silencio de biblioteca prohibida; polvo dorado; la sensación de que todo se observa.
- **Combate:** los haces del Oráculo escanean tu evidencia; lo no probado se desvanece de la sala.
- **Diálogo:** escribanos custodios; testigos nerviosos en las esquinas.
- **Arquitectura:** vertical, laberíntica, de archivo-catedral.
- **Colores:** primario dorado deteriorado · secundario marrón expediente · acento cian de los escáneres.
- **Iluminación:** lámparas de lectura puntuales; haces de escaneo; resto en penumbra.
- **Efectos:** polvo flotante, documentos suspendidos, líneas de escaneo.
- **Referencia:** "Distrito Probatorio — Actos y Medios" + "Biblioteca Prohibida".

## Biblioteca Prohibida — el conocimiento oculto (POI)
- **Panorámica:** una torre cerrada con luz azul filtrándose; saber peligroso que pocos alcanzan.
- **Exploración:** secreta, tentadora; desbloquea lore y reliquias raras.
- **Colores:** primario azul profundo · acento dorado de los tomos prohibidos.
- **Efectos:** símbolos flotantes, susurros, glitch del conocimiento.
- **Referencia:** "Biblioteca Prohibida — Conocimiento Oculto".

## Centro de la Nulidad — vicios y saneamiento (POI)
- **Panorámica:** un distrito **roto y glitcheado**, edificios con fallas, donde lo viciado se sanea o colapsa.
- **Exploración:** inestable; la realidad parpadea; peligro de "nulidad".
- **Colores:** primario rojo apagado · secundario púrpura · acento glitch.
- **Efectos:** aberración cromática, fragmentación, errores visuales.
- **Referencia:** "Centro de la Nulidad — Vicios y Saneamiento".

## Ciudadela de la Sentencia — la torre de lo definitivo
- **Panorámica:** una **torre fría y monolítica** de mármol y acero donde las decisiones se vuelven irreversibles.
- **Exploración:** solemne, gélida, de gravedad institucional; ecos.
- **Combate:** la sala se vuelve tribunal; el Ministro Formalista preside con artículos orbitando.
- **Diálogo:** ministros que hablan con desprecio y exactitud.
- **Arquitectura:** clásica monumental + acero; columnas, frontón, escala aplastante.
- **Colores:** primario blanco espectral · secundario acero · acento dorado de los artículos.
- **Iluminación:** dura, cenital, sin sombras suaves; mármol que refleja.
- **Efectos:** partículas doradas, ecos visuales, gravedad.
- **Referencia:** la composición de la Corte Suprema (mármol + godrays).

## Tribunal Recursal — el distrito de los portales
- **Panorámica:** pasarelas suspendidas y **portales/ascensores** hacia instancias superiores; todo se puede revisar y romper.
- **Exploración:** vertiginoso, glitcheado; nada es definitivo aquí.
- **Combate:** el Profesor Hostil aparece entre objeciones flotantes; la sala se distorsiona en cada repregunta.
- **Diálogo:** profesores que interrumpen y contradicen.
- **Arquitectura:** suspendida, fragmentada, de circuitos verticales.
- **Colores:** primario púrpura casacional · secundario magenta · acento glitch cian.
- **Iluminación:** inestable, parpadeante; portales que emiten.
- **Efectos:** glitch, aberración, papeles y objeciones orbitando.
- **Referencia:** "Tribunal Recursal — Próximo Enfrentamiento".

## Foso de la Ejecución — la zona industrial del apremio
- **Panorámica:** un **foso industrial** con grúas de embargo, contenedores de títulos, brasas y vapor; algo enorme se mueve abajo.
- **Exploración:** caluroso, ruidoso, peligroso; fuerza bruta.
- **Combate:** el Leviatán emerge del foso y ocupa la pantalla; defensa tasada.
- **Diálogo:** ejecutores secos, sin piedad.
- **Arquitectura:** industrial pesada; grúas, cadenas, hierro.
- **Colores:** primario naranja brasa · secundario negro hollín · acento rojo del ojo coercitivo.
- **Iluminación:** de fundición; brasas, chispas, vapor iluminado.
- **Efectos:** vapor, chispas, ceniza, temblor de tierra.
- **Referencia:** descripción del Leviatán Ejecutivo en el dossier.

## Ciudadela de la Comisión / Corte Suprema — la cima
- **Panorámica:** la **megaestructura** que domina todo el horizonte de la ciudad; al entrar, una **catedral colosal** con tres ministros holográficos y una balanza gigante de luz.
- **Exploración:** sagrado y terrible; el jugador es diminuto; godrays desde lo alto.
- **Combate:** los tres ministros preguntan en fuego cruzado; la sala impone efectos de instancia.
- **Diálogo:** las tres voces que no esperan tu respuesta.
- **Arquitectura:** catedral-rascacielos infinita; bancos sin fin, balanza central.
- **Colores:** primario magenta + cian + dorado fundidos · acento blanco divino.
- **Iluminación:** godrays cenitales, ministros retroiluminados, balanza emisora.
- **Efectos:** niebla sagrada, partículas ascendentes, haz vertical exterior.
- **Referencia:** la imagen de la Corte Suprema (catedral + 3 ministros + jugador diminuto).

---

# PARA CADA BOSS

> Campos: **Silueta** (reconocible sin texto) · **Retrato** (en pantalla) · **Introducción** (cómo aparece) · **Pantalla de combate** (cómo domina) · **Efectos** (al hablar / atacar / recibir daño).

## La Esfinge Jurisdiccional
- **Silueta:** figura sedente colosal con **anillos** orbitando; cabeza coronada de mapas.
- **Retrato:** rostro pétreo-digital, ojos como mapas de territorio que rotan.
- **Introducción:** desciende sobre la Puerta; los anillos se alinean; el arco se sella en cian.
- **Combate:** ocupa el fondo de la puerta; cada respuesta abre dos caminos de luz (bifurcación).
- **Efectos:** al hablar, los anillos giran; al atacar, dispara un haz de jurisdicción; al recibir daño, un anillo se quiebra.

## El Secretario Nihilista
- **Silueta:** funcionario encorvado cubierto de **pantallas CRT**, con **sellos** orbitando.
- **Retrato:** rostro pálido iluminado por monitores; mirada muerta de burocracia.
- **Introducción:** emerge de una montaña de expedientes; los relojes del barrio se sincronizan.
- **Combate:** lo rodean relojes; cada fase trae un cronómetro visible que corre.
- **Efectos:** al hablar, parpadean los CRT; al atacar, estampa un sello rojo de "extemporáneo"; al recibir daño, una pantalla se apaga.

## El Oráculo de la Prueba
- **Silueta:** **esfera de ojos** suspendida sobre un mar de expedientes; haces que escanean.
- **Retrato:** un ojo enorme central rodeado de ojos menores; iris de documento.
- **Introducción:** los ojos se abren uno a uno desde la bruma dorada del archivo.
- **Combate:** flota en el centro; **escanea tu evidencia** con haces; lo no probado se borra de la sala.
- **Efectos:** al hablar, los ojos convergen en ti; al atacar, un haz de verdad; al recibir daño, varios ojos se cierran.

## El Ministro Formalista
- **Silueta:** anciano erguido con togas de datos y **artículos del Código orbitando**; **ojos = números**.
- **Retrato:** rostro severo, ojos que muestran cifras de artículo; oro y azul judicial.
- **Introducción:** los artículos convergen hacia él y se encienden; preside la torre de la Sentencia.
- **Combate:** domina desde su estrado; lanza tarjetas-artículo; **te interrumpe** si dudas.
- **Efectos:** al hablar, los artículos rotan; al atacar, una tarjeta-artículo impacta; al recibir daño, varios artículos caen y se apagan.

## El Profesor Hostil de Procesal
- **Silueta:** profesor cyborg, mitad rostro mecánico, **ojo rojo**, manos alzadas, expedientes clavados en la espalda; objeciones flotando.
- **Retrato:** cabello revuelto, ojo rojo brillante, media cara de metal; magenta y rojo.
- **Introducción:** se gira hacia el jugador entre papeles con anotaciones rojas; el ojo se enciende.
- **Combate:** domina el centro con las manos abiertas; **abre ventanas emergentes** a mitad de respuesta ("¿Seguro? ¿Fuente? ¿Artículo?").
- **Efectos:** al hablar, el ojo pulsa y los papeles tiemblan; al atacar, una repregunta-glitch sale disparada; al recibir daño, aberración cromática y chispas en el lado mecánico.

## El Leviatán Ejecutivo
- **Silueta:** **masa colosal** de pagarés, cheques y títulos con un **ojo rojo** coercitivo; tentáculos de embargo.
- **Retrato:** no cabe en un retrato — un fragmento de su rostro documental llena la pantalla.
- **Introducción:** emerge del foso; la cámara retrocede para mostrar su tamaño; la tierra tiembla.
- **Combate:** **ocupa toda la pantalla**; lo que no encaja en su causal rebota en su coraza.
- **Efectos:** al hablar, ruge y vuelan documentos; al atacar, un tentáculo de embargo; al recibir daño, se desprenden títulos en llamas.

## La Comisión Examinadora
- **Silueta:** **tres figuras fusionadas** en torno a una balanza colosal; tres cabezas, una entidad.
- **Retrato:** tres rostros holográficos (Civil azul, Procesal dorado central, Constitucional púrpura).
- **Introducción:** se materializan desde la luz de la catedral; el jugador, diminuto, de espaldas; suena la música del final.
- **Combate:** los tres flotan sobre la balanza; **preguntan a la vez**; responder a uno te expone ante los otros.
- **Efectos:** al hablar, godrays pulsan; al atacar, los tres convergen un haz; al recibir daño, una de las tres caras glitchea y se recompone.

---

### Prueba final del documento
Si un artista lee esto y dibuja el Distrito Probatorio distinto del Foso de la Ejecución, y al Ministro Formalista distinto del Profesor Hostil — el documento funcionó. Si todo le sale igual, falló.
