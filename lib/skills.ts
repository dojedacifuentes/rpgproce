// ============================================================================
// SISTEMA DE SKILLS — habilidades coleccionables y usables
// Se desbloquean al cumplir condiciones específicas.
// Cuando se usan, otorgan ventajas tácticas.
// ============================================================================

export type Skill = {
  id: string;
  nombre: string;
  descripcion: string;
  zona: "competencia" | "recursos" | "nulidad" | "ejecutivo" | "prueba" | "oralidad" | "cautelares" | "cosajuzgada" | "notificaciones" | "incidentes";
  desbloqueoCondicion: string;          // cómo se obtiene
  efectoCorto: string;                   // efecto al usarla
  cooldownTurnos: number;
  emoji: string;
};

export const SKILLS: Skill[] = [
  // ═══════════════════════ DEFENSIVAS ═══════════════════════
  {
    id: "escudo_768",
    nombre: "Escudo del Art. 768",
    descripcion: "Invocás las nueve causales como mantra defensivo. El próximo intento de casación en la forma en tu contra es rechazado in limine.",
    zona: "recursos",
    desbloqueoCondicion: "Vencé al Ministro Formalista",
    efectoCorto: "Inmunidad a casación forma (1 uso)",
    cooldownTurnos: 5,
    emoji: "🛡",
  },
  {
    id: "preclusion_inversa",
    nombre: "Preclusión Inversa",
    descripcion: "Forzás la preclusión sobre la contraparte. Sus próximos 2 escritos extemporáneos se consideran no presentados aunque haya gestión útil pendiente.",
    zona: "incidentes",
    desbloqueoCondicion: "Speedrun V/F dificultad PESADILLA con 90%+",
    efectoCorto: "Bloquea 2 escritos del rival",
    cooldownTurnos: 6,
    emoji: "⏳",
  },
  {
    id: "blindaje_emplazamiento",
    nombre: "Blindaje del 44",
    descripcion: "Tu notificación subsidiaria es a prueba de balas: dos días distintos, persona adulta, certificación impecable. Inmune a nulidad procesal por defecto de emplazamiento.",
    zona: "notificaciones",
    desbloqueoCondicion: "Vencé al Funcionario de Notificaciones Quemado",
    efectoCorto: "Inmunidad a nulidad 768 N°9 (1 vez)",
    cooldownTurnos: 8,
    emoji: "📜",
  },

  // ═══════════════════════ OFENSIVAS ═══════════════════════
  {
    id: "ataque_doctrinal",
    nombre: "Ataque Doctrinal Triple",
    descripcion: "Citás simultáneamente a Couture, Hoyos y Tavolari. El boss recibe doble daño en el próximo ataque oral.",
    zona: "oralidad",
    desbloqueoCondicion: "Logro Doctrinario en builds",
    efectoCorto: "x2 daño al boss",
    cooldownTurnos: 4,
    emoji: "📚",
  },
  {
    id: "casacion_oficio_simulada",
    nombre: "Casación de Oficio Simulada",
    descripcion: "El tribunal anula su propia sentencia antes de que la contraparte recurra. Movimiento estratégico raro pero real (775 CPC).",
    zona: "recursos",
    desbloqueoCondicion: "Build: Monstruo Casacional",
    efectoCorto: "Anula sentencia adversa (1 uso)",
    cooldownTurnos: 10,
    emoji: "⚖",
  },
  {
    id: "embargo_express",
    nombre: "Embargo Express",
    descripcion: "Decretás embargo simultáneo sobre 3 bienes diferentes. Mientras la contraparte arma la oposición, ya tenés el inmueble inscrito en el CBR.",
    zona: "ejecutivo",
    desbloqueoCondicion: "Build: Operador Práctico",
    efectoCorto: "+3 embargos consecutivos",
    cooldownTurnos: 7,
    emoji: "🔨",
  },

  // ═══════════════════════ INFORMACIÓN ═══════════════════════
  {
    id: "vision_articular",
    nombre: "Visión Articular",
    descripcion: "Por 30 segundos, los enunciados de los próximos ejercicios muestran el artículo correcto resaltado. Solo se puede usar en speedrun y arcade.",
    zona: "cosajuzgada",
    desbloqueoCondicion: "Arcade rank S o A",
    efectoCorto: "Hint en 5 preguntas",
    cooldownTurnos: 6,
    emoji: "👁",
  },
  {
    id: "radar_doctrinal_activo",
    nombre: "Radar Doctrinal Activo",
    descripcion: "El radar muestra zonas débiles y rutas óptimas. Te indica qué boss tendría preguntas más vulnerables ante tus atributos actuales.",
    zona: "recursos",
    desbloqueoCondicion: "Codex completo (todos los temas leídos)",
    efectoCorto: "Revela debilidades del próximo boss",
    cooldownTurnos: 3,
    emoji: "📡",
  },

  // ═══════════════════════ NARRATIVAS / SARCÁSTICAS ═══════════════════════
  {
    id: "salida_existencial",
    nombre: "Salida Existencial",
    descripcion: "Mirás al boss y susurrás «¿de qué sirve todo esto si igual vamos a morir?». El boss queda paralizado 1 turno por crisis filosófica.",
    zona: "oralidad",
    desbloqueoCondicion: "Vencé al Receptor Metafísico",
    efectoCorto: "Boss pierde 1 turno",
    cooldownTurnos: 8,
    emoji: "💀",
  },
  {
    id: "patrocinio_invisible",
    nombre: "Patrocinio Invisible",
    descripcion: "Ya no necesitas firma de abogado patrocinante para gestiones menores. Algo así como un permiso temporal del 18.120 que la Secretaria Tribunalicia odia.",
    zona: "incidentes",
    desbloqueoCondicion: "Comparecencia con 7/7 requisitos",
    efectoCorto: "Saltas validación formal (1 vez)",
    cooldownTurnos: 5,
    emoji: "✒",
  },
  {
    id: "cosa_juzgada_aparente",
    nombre: "Cosa Juzgada Aparente",
    descripcion: "Invocás cosa juzgada en un caso donde NO hay triple identidad pero suena convincente. El tribunal duda y suspende el juicio por 1 turno.",
    zona: "cosajuzgada",
    desbloqueoCondicion: "Acertar V/F sobre 175 CPC en dif. PESADILLA",
    efectoCorto: "Pausa al juicio 1 turno",
    cooldownTurnos: 7,
    emoji: "🔒",
  },
];

export function skillsDesbloqueadas(logros: { id: string }[]): Skill[] {
  // Lógica simple: cada logro desbloquea ciertas skills
  const ids = logros.map((l) => l.id);
  return SKILLS.filter((s) => {
    if (s.id === "escudo_768") return ids.includes("boss_ministro_formalista");
    if (s.id === "preclusion_inversa") return ids.includes("vof_3");
    if (s.id === "blindaje_emplazamiento") return ids.includes("boss_funcionario_quemado");
    if (s.id === "ataque_doctrinal") return ids.includes("build_doctrinario");
    if (s.id === "casacion_oficio_simulada") return ids.includes("build_monstruo_casacional");
    if (s.id === "embargo_express") return ids.includes("build_operador_practico");
    if (s.id === "vision_articular") return ids.includes("arcade_s") || ids.includes("arcade_a");
    if (s.id === "radar_doctrinal_activo") return ids.includes("codex_completo");
    if (s.id === "salida_existencial") return ids.includes("boss_receptor_metafisico");
    if (s.id === "patrocinio_invisible") return ids.includes("comparecencia_impecable");
    if (s.id === "cosa_juzgada_aparente") return ids.includes("vof_3");
    return false;
  });
}
