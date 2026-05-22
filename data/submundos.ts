/**
 * SUBMUNDOS OCULTOS — Contenido secreto desbloqueado por logros
 * Sistema: Cumple logro → Desbloquea submundo → Acceso narrativo
 */

export interface Submundo {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  logrosRequeridos: string[];
  narrativa: {
    intro: string;
    contenido: string;
    reflexion: string;
  };
  recompensa?: {
    reputacion?: number;
    trauma?: number;
    conocimiento?: number;
  };
}

export const SUBMUNDOS: Submundo[] = [
  {
    id: "submundo_archivo_secreto",
    titulo: "El Archivo Secreto",
    descripcion: "Los Juzgados guardan expedientes olvidados. Historias de vicios que nunca fueron casados.",
    icono: "🗃️",
    logrosRequeridos: ["caso_inv_001", "caso_inv_002", "caso_inv_003"],
    narrativa: {
      intro:
        "Descendiste a los sótanos del Tribunal de Justicia. En el silencio del polvo, encontraste caja roja sin rótulo.",
      contenido: `ARCHIVOS CLASIFICADOS — Tribunal de Justicia, Santiago

[EXPEDIENTE SELLADO] — 2019

Caso: "El Juez Que Decidió Sin Oír"

Sentencia dictada sin jamás notificar al demandado. La sentencia duró 15 años en firme. Cuando se descubrió el vicio, el plazo para casación había vencido. El afectado murió sin saber.

La Corte Suprema, en nota de párrafo, reconoció: "Error administrativo deplorable, pero ya no hay remedio."

[LECCIÓN] — No existe rescisión. El sistema procesal es irreversible.

---

[EXPEDIENTE SELLADO] — 2021

Caso: "Sentencia Ultra Petita por Fondo"

Tribunal condenó por el triple de lo solicitado. Demandante no apeló (ignorancia). Hoy: cosa juzgada intocable.

La Casación fue desestimada: "Demandante pudo recurrir. Su negligencia no es nuestra culpa."

[LECCIÓN] — La bilateralidad es un derecho, no una obligación. Si no la ejerces, la pierdes.

---

Cerró la caja. El archive seguía en las sombras, indiferente a tu descubrimiento.`,
      reflexion:
        "La Justicia no olvida. Simplemente, archivo. Y los archivos son para quien los busque.",
    },
    recompensa: {
      conocimiento: 15,
      reputacion: 5,
    },
  },

  {
    id: "submundo_camaras_ocultas",
    titulo: "Las Cámaras Ocultas",
    descripcion:
      "Historias de sentencias dictadas fuera de sala. Los secretarios que vieron lo que no debían.",
    icono: "👁️",
    logrosRequeridos: ["arcade_s", "examen_maestro"],
    narrativa: {
      intro:
        "Un secretario jubilado te llamó. Le debías favor. 'Nunca dije esto, pero necesitas saber...'",
      contenido: `TESTIMONIOS DE CORRUPTO PROCESAL

Secretario (nombre protegido) declara:

"Vi sentencias firmadas ANTES de que se dictaran en audiencia. El juez ya sabía lo que iba a fallar.

'Prepara el fallo de condena', me dijo. La audiencia fue teatro.

No es delito, dicen. Es jurisprudencia. Es que 'ya está claro desde el papeleo.'

Pero el demandado creía que aún había chance. No lo había."

---

Otra voz (abogada):

"La bilateralidad es mentira procesal. Se llama 'derecho a ser oído', pero si el juez ya escogió, ¿para qué oír?

Yo ganaba procesos antes de entrarlos a sala. El secretario me pasaba datos: qué juez, qué precedentes, qué argumentos le latían.

Cuando la Corte exigió 'motivación', simplemente justificaron lo que ya habían decidido."

---

[REFLEXIÓN FINAL]

El sistema no está roto. Funciona exactamente como fue diseñado: para quien conoce el expediente, el secretario y la jurisprudencia.

El demandado creyente en la 'igualdad de armas' ya perdió.`,
      reflexion:
        "La ilusión de bilateralidad es más fuerte que la bilateralidad misma. Todos creemos que fuimos oídos.",
    },
    recompensa: {
      trauma: 10,
      reputacion: -5,
    },
  },

  {
    id: "submundo_doctrina_apocifa",
    titulo: "La Doctrina Apócrifa",
    descripcion:
      "Interpretaciones del CPC que nunca se escribieron. Lo que todos saben pero nadie cita.",
    icono: "📚",
    logrosRequeridos: ["caso_inv_004", "caso_inv_005", "caso_inv_006"],
    narrativa: {
      intro:
        "En la biblioteca de la Facultad, encontraste un libro anotado. La caligrafía es de docentes muertos.",
      contenido: `MARGINALIA DE CATEDRÁTICOS — CÓDIGO PROCESAL CIVIL (EDICIÓN 2002)

[ART. 81 - COSA JUZGADA]

Nota de Profesor Morales (1998):
"Técnicamente, la cosa juzgada ocurre al ejecutoriarse. PERO: en la práctica, cualquier sentencia dictada genera presunción de verdad. Rellenar un recurso es costoso. Solo los ricos rellenan."

Traducción: Los pobres tienen cosa juzgada antes de ejecutoriar.

---

[ART. 273 - MEDIDAS CAUTELARES]

Nota de Profesora García (2000):
"'Periculum in mora' es requisito. PERO: los jueces nunca dicen 'No hay riesgo'. Dicen 'Riesgo acreditado suficientemente', aun sin acta de acreditación."

Traducción: Si tienes influencia, siempre hay riesgo.

---

[ART. 44 - NOTIFICACIÓN]

Nota de Profesor Larraín (1996):
"Dos intentos fallidos, luego Diario Oficial. PERO: el receptor casi nunca registra 'fallido'. Registra 'No habido' con acta de una línea."

Traducción: La notificación válida es cuestión de caligrafía del receptor.

---

[REFLEXIÓN FINAL]

El CPC no está escrito. Está acordado. Entre los que acceden a estas notas.

Ustedes enseñarán a los estudiantes lo que dice el texto. Pero enseñaremos a los que luchen aquí, en la cancha, la verdadera ley.`,
      reflexion:
        "La doctrina oficial es un espejo. La doctrina real se aprende en los pasillos del tribunal.",
    },
    recompensa: {
      conocimiento: 20,
      trauma: 5,
    },
  },
];
