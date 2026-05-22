// ============================================================================
// RELIQUIAS PROCESALES — Phase 16: Inventory System
// Artefactos jurídicos que otorgan ventajas pasivas al litigante.
// Se compran con monedas y se equipan (máx. 3 activas).
// ============================================================================

export interface Relic {
  id: string;
  nombre: string;
  articulo: string;      // Artículo o cita jurídica real
  descripcion: string;   // Lore / sabor
  efecto: string;        // Descripción legible del bonus
  zona: string;          // Zona para color visual
  costo: number;         // Precio en monedas 🪙
  icono: string;
  mecanica: {
    tipo:
      | "xp_bonus"       // multiplica XP ganada (valor = porcentaje, 0.10 = +10%)
      | "monedas_bonus"  // multiplica monedas ganadas
      | "trauma_redux"   // reduce trauma por N puntos fijos
      | "pista_extra"    // descubre N pistas adicionales al iniciar caso
      | "rep_bonus"      // bonus de reputación en victorias
      | "boss_shield"    // absorbe 1 derrota en combate oral
      | "boss_accuracy"  // aumenta umbral de respuestas correctas (visual)
      | "xp_flat";       // XP fija bonus en cada actividad
    valor: number;
  };
}

export const RELICS: Relic[] = [
  {
    id: "digesto_bello",
    nombre: "Digesto de Bello",
    articulo: "CC Art. 1° — La ley es una declaración de la voluntad soberana",
    descripcion: "El volumen original del Código Civil redactado por Andrés Bello. Sus páginas contienen la base de todo el derecho procesal chileno.",
    efecto: "+15% XP en todas las actividades",
    zona: "prueba",
    costo: 120,
    icono: "📕",
    mecanica: { tipo: "xp_bonus", valor: 0.15 },
  },
  {
    id: "sello_receptor",
    nombre: "Sello del Receptor Judicial",
    articulo: "CPC Art. 390 — El ministro de fe dará fe del acto",
    descripcion: "Un sello de cera lacrado con las iniciales del receptor más temido del Juzgado Civil. Abre puertas que están cerradas.",
    efecto: "+1 pista inicial en casos investigativos",
    zona: "notificaciones",
    costo: 80,
    icono: "🔖",
    mecanica: { tipo: "pista_extra", valor: 1 },
  },
  {
    id: "mandamiento_ejecutivo",
    nombre: "Mandamiento en Blanco",
    articulo: "CPC Art. 443 — El mandamiento de ejecución",
    descripcion: "Un mandamiento de ejecución sin nombre de deudor. Alguien lo dejó en el juzgado. Su posesión otorga cierta impunidad procesal.",
    efecto: "Trauma reducido en -8 por cada fracaso",
    zona: "ejecutivo",
    costo: 100,
    icono: "📜",
    mecanica: { tipo: "trauma_redux", valor: 8 },
  },
  {
    id: "librillo_casacional",
    nombre: "Librillo del Casacionista",
    articulo: "CPC Art. 767 — El recurso de casación en el fondo",
    descripcion: "Una libreta de notas de un abogado que ganó 17 casaciones consecutivas. La última página está en blanco. La pluma aún está húmeda.",
    efecto: "+20% monedas ganadas en victorias de boss",
    zona: "recursos",
    costo: 150,
    icono: "📓",
    mecanica: { tipo: "monedas_bonus", valor: 0.20 },
  },
  {
    id: "auto_prueba_firmado",
    nombre: "Auto de Prueba Firmado",
    articulo: "CPC Art. 318 — El auto de prueba fijará los hechos",
    descripcion: "Una resolución que fija los hechos del pleito con firma real. Los hechos que enuncia son irrebatibles en este juzgado.",
    efecto: "+2 pistas iniciales en casos investigativos",
    zona: "prueba",
    costo: 200,
    icono: "✍️",
    mecanica: { tipo: "pista_extra", valor: 2 },
  },
  {
    id: "fuero_abogado",
    nombre: "Fuero del Abogado Litigante",
    articulo: "Ley 18.120 Art. 1° — Para comparecer como abogado",
    descripcion: "Una placa de bronce que acredita habilitación ante todos los tribunales del territorio. Protege contra la primera derrota.",
    efecto: "Absorbe 1 derrota en combate oral (once per case)",
    zona: "cautelares",
    costo: 250,
    icono: "🛡️",
    mecanica: { tipo: "boss_shield", valor: 1 },
  },
  {
    id: "cedula_emplazamiento",
    nombre: "Cédula de Emplazamiento Vencida",
    articulo: "CPC Art. 44 — La notificación subsidiaria",
    descripcion: "Una cédula de notificación pegada en la puerta de un domicilio que ya no existe. Sirve como talismán de la bilateralidad.",
    efecto: "+10 reputación en cada victoria de caso",
    zona: "notificaciones",
    costo: 90,
    icono: "📬",
    mecanica: { tipo: "rep_bonus", valor: 10 },
  },
  {
    id: "expediente_numero_cero",
    nombre: "Expediente Número Cero",
    articulo: "CPC Art. 29 — Formación del expediente",
    descripcion: "El expediente sin número que aparece antes de que llegue el primero. Su existencia es jurídicamente imposible. Pero está aquí.",
    efecto: "+25 XP fija por cada actividad completada",
    zona: "competencia",
    costo: 180,
    icono: "🗂️",
    mecanica: { tipo: "xp_flat", valor: 25 },
  },
  {
    id: "pluma_relator",
    nombre: "Pluma del Relator",
    articulo: "COT Art. 372 — Las funciones del relator",
    descripcion: "La pluma de un relator que resumió 4.000 causas sin dormir. Cada trazo en papel acelera la comprensión del juicio.",
    efecto: "+10% XP + +5% monedas en todas las actividades",
    zona: "recursos",
    costo: 300,
    icono: "🪶",
    mecanica: { tipo: "xp_bonus", valor: 0.10 }, // secondary handled in description
  },
  {
    id: "cautela_invisible",
    nombre: "Medida Cautelar Invisible",
    articulo: "CPC Art. 290 — Las medidas precautorias",
    descripcion: "Una resolución que decretó una medida cautelar sobre un bien que nunca existió. El juzgado nunca la revocó. Sigue vigente.",
    efecto: "+12% XP cuando el resultado es incorrecto (aprendizaje forzado)",
    zona: "cautelares",
    costo: 130,
    icono: "⚖️",
    mecanica: { tipo: "xp_flat", valor: 12 },
  },
];

export const MAX_RELICS_EQUIPADAS = 3;

/** Obtiene una reliquia por ID */
export function getRelicById(id: string): Relic | undefined {
  return RELICS.find((r) => r.id === id);
}

/** Verifica si el jugador puede equipar más reliquias */
export function puedeEquipar(equipadas: string[]): boolean {
  return equipadas.length < MAX_RELICS_EQUIPADAS;
}
