import type { PersonajeParty } from "@/types/civilis";

// ============================================================================
// CIVILIS — La Compañía. Cada personaje ES una institución del Derecho Civil.
// ============================================================================

export const PARTY_CIVIL: PersonajeParty[] = [
  {
    id: "justitia",
    nombre: "Justitia",
    titulo: "Guardiana de los Principios",
    institucion: "Principios del Código Civil",
    icono: "⚖️",
    color: "#e6c14b",
    descripcion: "Porta la balanza de Bello. Donde camina, la autonomía de la voluntad y la buena fe se equilibran.",
    habilidad: "Equidad — revela el principio aplicable a un caso.",
    regionAfin: "contratos",
  },
  {
    id: "pactus",
    nombre: "Pactus",
    titulo: "Maestro de los Contratos",
    institucion: "Teoría general del contrato",
    icono: "📜",
    color: "#e6a23c",
    descripcion: "Su lema: pacta sunt servanda. Conoce la fuerza obligatoria y el efecto relativo de todo pacto.",
    habilidad: "Fuerza Obligatoria — +daño contra enemigos contractuales.",
    regionAfin: "contratos",
  },
  {
    id: "fides",
    nombre: "Fides",
    titulo: "Sacerdotisa de la Buena Fe",
    institucion: "Buena fe contractual (1546)",
    icono: "🕊️",
    color: "#86c6dc",
    descripcion: "Integra el contrato con lo que emana de su naturaleza, la ley y la costumbre. Atenúa los excesos de la voluntad.",
    habilidad: "Integración — añade una pista en casos difíciles.",
    regionAfin: "promesa",
  },
  {
    id: "solidarius",
    nombre: "Solidarius",
    titulo: "General de las Obligaciones Solidarias",
    institucion: "Solidaridad (1511 y ss.)",
    icono: "🛡️",
    color: "#4e86d6",
    descripcion: "Comanda a los codeudores. Sabe quién paga, quién cobra y quién soporta finalmente la deuda.",
    habilidad: "Subrogación — recupera salud al acertar encadenado.",
    regionAfin: "solidaridad",
  },
  {
    id: "promissa",
    nombre: "Promissa",
    titulo: "Custodia de la Promesa",
    institucion: "Contrato de promesa (1554)",
    icono: "🗝️",
    color: "#86c6dc",
    descripcion: "Guarda las cuatro puertas del 1554. Sin sus cuatro llaves, ningún contrato futuro nace.",
    habilidad: "Las Cuatro Llaves — neutraliza una trampa de requisitos.",
    regionAfin: "promesa",
  },
  {
    id: "mandator",
    nombre: "Mandator",
    titulo: "Maestro del Mandato",
    institucion: "Contrato de mandato (2116)",
    icono: "👑",
    color: "#a06cd5",
    descripcion: "Confía y delega. Distingue simple administración de poder especial y vigila la representación.",
    habilidad: "Delegación — reparte el daño entre la compañía.",
    regionAfin: "mandato",
  },
  {
    id: "hypotekon",
    nombre: "Hypotekon",
    titulo: "Señor de las Hipotecas",
    institucion: "Hipoteca (2407)",
    icono: "🏚️",
    color: "#8a6fd0",
    descripcion: "Persigue la finca sea quien fuere su poseedor. Su derecho de preferencia lo pone a cubierto de la insolvencia.",
    habilidad: "Persecución — ignora la defensa de un enemigo.",
    regionAfin: "hipoteca",
  },
];

export const getPersonaje = (id: string) => PARTY_CIVIL.find((p) => p.id === id);
