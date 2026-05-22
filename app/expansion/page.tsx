"use client";
import Link from "next/link";
import { useState } from "react";
import SeleccionBuild from "@/components/SeleccionBuild";
import ExpedienteVivo from "@/components/ExpedienteVivo";
import PreclusionTimer from "@/components/PreclusionTimer";
import InhibitoriaDeclinatoria from "@/components/InhibitoriaDeclinatoria";
import ArcadeClasificador from "@/components/ArcadeClasificador";
import AbandonoProcedimiento from "@/components/AbandonoProcedimiento";
import ComparecenciaPanel from "@/components/ComparecenciaPanel";
import SpeedrunVoF from "@/components/SpeedrunVoF";
import SalaSentencia from "@/components/SalaSentencia";
import JuicioEjecutivoCompleto from "@/components/JuicioEjecutivoCompleto";
import GrimorioSkills from "@/components/GrimorioSkills";
import ExamenGrado from "@/components/ExamenGrado";
import SistemaCartas from "@/components/SistemaCartas";
import TimelineOrdenamiento from "@/components/TimelineOrdenamiento";
import DueloMediosPrueba from "@/components/DueloMediosPrueba";
import AtaqueRepreguntas from "@/components/AtaqueRepreguntas";
import CasoInvestigativo from "@/components/CasoInvestigativo";
import SubmundosPanel from "@/components/SubmundosPanel";
import NPCInteractionPanel from "@/components/NPCInteractionPanel";
import { CASOS_INVESTIGATIVOS } from "@/data/casos-investigativos";

type Modulo =
  | "menu"
  | "build"
  | "expediente"
  | "preclusion"
  | "inhibitoria"
  | "arcade"
  | "abandono"
  | "comparecencia"
  | "vof"
  | "sentencia"
  | "ejecutivo_full"
  | "grimorio"
  | "examen"
  | "cartas"
  | "timeline"
  | "duelo"
  | "ataque"
  | "investigacion"
  | "submundos"
  | "npcs";

const MODULOS: {
  id: Modulo;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  zona: string;
  numeral: string;
  nuevo?: boolean;
}[] = [
  {
    id: "ejecutivo_full",
    titulo: "Campaña Ejecutiva",
    subtitulo: "10 ETAPAS · ÁRBOL DECISIONAL",
    descripcion: "Juicio ejecutivo completo: del título al remate. Verificación de art. 434, gestión preparatoria, mandamiento, embargo (con bienes inembargables del 445), excepciones tasadas del 464, fallo, apremio y tercerías. Mecánica de vida y reputación.",
    zona: "ejecutivo",
    numeral: "EJE.01",
    nuevo: true,
  },
  {
    id: "examen",
    titulo: "Examen de Grado",
    subtitulo: "CÉDULA ORAL · ALTERNATIVAS DIFÍCILES",
    descripcion: `${15}+ cédulas con respuesta académica modelo. ${12}+ alternativas de opción múltiple con distractores basados en errores reales. Análisis normativo completo. Simula comisión examinadora.`,
    zona: "nulidad",
    numeral: "EXA.01",
    nuevo: true,
  },
  {
    id: "investigacion",
    titulo: "Casos Investigativos",
    subtitulo: "INVESTIGACIÓN · DEDUCCIÓN",
    descripcion: "Resuelve casos procedurales descubriendo pistas, conectando evidencia, y deduciendo vicios ocultos. Emplazamiento Fantasma · Sentencia Ultra Petita · Preclusión Oculta. Sistema de hipótesis con validación.",
    zona: "cosa_juzgada",
    numeral: "INV.01",
    nuevo: true,
  },
  {
    id: "submundos",
    titulo: "Submundos Ocultos",
    subtitulo: "CONTENIDO SECRETO · DESBLOQUEABLES",
    descripcion: "Historias de vicios procesales que nunca se escriben. El Archivo Secreto · Las Cámaras Ocultas · La Doctrina Apócrifa. Desbloquea con logros.",
    zona: "nulidad",
    numeral: "SUB.01",
    nuevo: true,
  },
  {
    id: "npcs",
    titulo: "Mentoría Procesal",
    subtitulo: "ARCOS NARRATIVOS · 10 MENTORES",
    descripcion: "Aprende directamente de expertos. Dra. Noemí · Juez Silva · Receptor Castro · 7 más. Cada mentor ofrece 3 etapas de aprendizaje + desafío final. Relaciones NPC y dependencias.",
    zona: "recursos",
    numeral: "NPC.01",
    nuevo: true,
  },
  {
    id: "grimorio",
    titulo: "Grimorio de Skills",
    subtitulo: "HABILIDADES COLECCIONABLES",
    descripcion: "11 habilidades procesales que se desbloquean al cumplir logros. Escudo del 768, Preclusión Inversa, Blindaje del 44, Casación de Oficio Simulada, Embargo Express, Cosa Juzgada Aparente y más.",
    zona: "recursos",
    numeral: "GRI.01",
    nuevo: true,
  },
  {
    id: "cartas",
    titulo: "Sistema de Cartas",
    subtitulo: "EXCEPCIONES · RECURSOS · PRUEBAS",
    descripcion: "20 tarjetas jurídicas representando excepciones ejecutivas, recursos, medios de prueba, incidentes y estrategias. Cada carta tiene efecto, riesgo y humor negro normativo. Agregalas a tu mano y juégalas tácticamente.",
    zona: "nulidad",
    numeral: "CAR.01",
    nuevo: true,
  },
  {
    id: "timeline",
    titulo: "Timeline Ordenamiento",
    subtitulo: "DRAG & DROP · ORDEN LEGAL",
    descripcion: "3 escenarios (ejecutivo, ordinario, caos). Reconstruye el orden correcto de actos procesales. Respetar orden = validez. Saltarse pasos = nulidad (art. 768 N°9).",
    zona: "ejecutivo",
    numeral: "ARC.03",
    nuevo: true,
  },
  {
    id: "duelo",
    titulo: "Duelo de Medios de Prueba",
    subtitulo: "COMBATE · TÁCTICO",
    descripcion: "5 medios de prueba (documental, testimonial, confesión, presunción, pericial). Selecciona tu medio vs oponente al azar. 3 rondas. Gana quien tenga mayor fuerza.",
    zona: "prueba",
    numeral: "ARC.04",
    nuevo: true,
  },
  {
    id: "ataque",
    titulo: "Ataque de Repreguntas",
    subtitulo: "ARCADE · CONTRA-RELOJ",
    descripcion: "8 preguntas de procedimiento con 30 segundos cada una. Presión máxima. Velocidad + precisión doctrinaria. Aprende bajo presión.",
    zona: "oralidad",
    numeral: "ARC.05",
    nuevo: true,
  },
  {
    id: "arcade",
    titulo: "Arcade Clasificador",
    subtitulo: "MODO RAPIDO · COMBO",
    descripcion: "Resoluciones · recursos · excepciones · competencia · notificaciones · ejecutivo. Velocidad creciente. Combo multiplicador. Ranking S-A-B-C-D.",
    zona: "ejecutivo",
    numeral: "ARC.01",
  },
  {
    id: "vof",
    titulo: "Verdadero o Falso",
    subtitulo: "PRESIÓN TEMPORAL · TRAMPAS",
    descripcion: "70+ enunciados tramposos en 3 niveles de dificultad. La respuesta intuitiva suele ser la incorrecta. Glitch visual al fallar.",
    zona: "oralidad",
    numeral: "ARC.02",
  },
  {
    id: "sentencia",
    titulo: "Sala de Sentencia",
    subtitulo: "HORROR JUDICIAL",
    descripcion: "Esperá el dictamen. El estrado holográfico observa. Las frases del tribunal pulsan en el tiempo. Veredicto aleatorio con efectos.",
    zona: "cosajuzgada",
    numeral: "INST.16",
  },
  {
    id: "expediente",
    titulo: "Expediente Vivo",
    subtitulo: "SALUD PROCESAL",
    descripcion: "El expediente se degrada con cada vicio. Glitch progresivo según el daño. Si llega a 0: nulidad latente del 768 N°9.",
    zona: "nulidad",
    numeral: "INST.04",
  },
  {
    id: "preclusion",
    titulo: "Preclusión Real",
    subtitulo: "PLAZOS FATALES",
    descripcion: "Timer en tiempo real. Si vencés el plazo, la preclusión es irreversible. Art. 64 CPC en su versión más cruel.",
    zona: "ejecutivo",
    numeral: "INST.06",
  },
  {
    id: "inhibitoria",
    titulo: "Inhibitoria vs Declinatoria",
    subtitulo: "CUESTIONES DE COMPETENCIA",
    descripcion: "Identificá medio + tribunal correcto. Arts. 101-112 CPC. Los conflictos suspenden el principal (art. 112).",
    zona: "competencia",
    numeral: "INST.01",
  },
  {
    id: "abandono",
    titulo: "Abandono del Procedimiento",
    subtitulo: "TIMER DE 6 MESES",
    descripcion: "Mantené el expediente vivo. Solo gestiones útiles interrumpen el plazo. Las administrativas no sirven. Art. 152 CPC.",
    zona: "incidentes",
    numeral: "INST.18",
  },
  {
    id: "comparecencia",
    titulo: "Comparecencia",
    subtitulo: "PATROCINIO · LEY 18.120",
    descripcion: "Validá los 7 requisitos del primer escrito. La secretaria tribunalicia rechaza con humor seco. Olvidar patrocinio = humillación inmediata.",
    zona: "incidentes",
    numeral: "INST.19",
  },
  {
    id: "build",
    titulo: "Especialización",
    subtitulo: "BUILD · 6 CLASES",
    descripcion: "Litigante agresivo · monstruo casacional · formalista extremo · estratega cautelar · operador práctico · doctrinario.",
    zona: "recursos",
    numeral: "RPG.01",
  },
];

export default function ExpansionHub() {
  const [m, setM] = useState<Modulo>("menu");
  const [casoSeleccionado, setCasoSeleccionado] = useState<string | null>(null);

  // Render Investigación con selector de casos
  if (m === "investigacion") {
    if (!casoSeleccionado) {
      return (
        <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
          <div className="flex justify-between mb-6 flex-wrap gap-2">
            <button className="btn" onClick={() => setM("menu")}>◂ Hub Expansión</button>
            <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-[9px] font-mono-terminal text-doc-aged/40 uppercase tracking-widest mb-2">
                INVESTIGACIÓN PROCESAL
              </div>
              <h2 className="font-display-grave text-3xl text-doc-aged mb-2">
                Selecciona un Caso
              </h2>
              <p className="text-doc-aged/70 font-serif-juridica">
                Resuelve casos procedurales descubriendo pistas y deduciendo vicios procesales ocultos.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {CASOS_INVESTIGATIVOS.map((caso) => (
                <button
                  key={caso.id}
                  onClick={() => setCasoSeleccionado(caso.id)}
                  className="zona-card p-6 text-left"
                  style={{ "--zona-color": `var(--zona-${caso.zona})` } as React.CSSProperties}
                >
                  <h3 className="font-display-grave text-lg text-doc-aged mb-2">{caso.titulo}</h3>
                  <p className="text-[9px] font-mono-terminal text-doc-aged/50 mb-3">
                    DIFICULTAD: {"⭐".repeat(caso.dificultad)}
                  </p>
                  <p className="font-serif-juridica text-doc-aged/70 text-sm leading-relaxed">
                    {caso.descripcion}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </main>
      );
    }

    // Mostrar caso seleccionado
    const casoActual = CASOS_INVESTIGATIVOS.find((c) => c.id === casoSeleccionado);
    if (!casoActual) return null;

    return (
      <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6 flex-wrap gap-2">
          <button className="btn" onClick={() => setCasoSeleccionado(null)}>◂ Casos</button>
          <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
        </div>
        <CasoInvestigativo
          caso={casoActual}
          onVolver={() => setCasoSeleccionado(null)}
          onResuelto={(result) => {
            // Podría agregar lógica aquí después
            console.log("Caso resuelto:", result);
          }}
        />
      </main>
    );
  }

  if (m !== "menu") {
    return (
      <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6 flex-wrap gap-2">
          <button className="btn" onClick={() => setM("menu")}>◂ Hub Expansión</button>
          <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
        </div>
        {m === "ejecutivo_full" && <JuicioEjecutivoCompleto />}
        {m === "examen" && <ExamenGrado />}
        {m === "grimorio" && <GrimorioSkills />}
        {m === "cartas" && <SistemaCartas />}
        {m === "timeline" && <TimelineOrdenamiento />}
        {m === "duelo" && <DueloMediosPrueba />}
        {m === "ataque" && <AtaqueRepreguntas />}
        {m === "arcade" && <ArcadeClasificador />}
        {m === "submundos" && <SubmundosPanel />}
        {m === "npcs" && <NPCInteractionPanel />}
        {m === "vof" && <SpeedrunVoF />}
        {m === "sentencia" && <SalaSentencia />}
        {m === "expediente" && <ExpedienteVivo />}
        {m === "preclusion" && <PreclusionTimer />}
        {m === "inhibitoria" && <InhibitoriaDeclinatoria />}
        {m === "abandono" && <AbandonoProcedimiento />}
        {m === "comparecencia" && <ComparecenciaPanel />}
        {m === "build" && <SeleccionBuild onElegir={() => setM("menu")} />}
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-6 max-w-6xl mx-auto">
      <header className="flex justify-between mb-8 flex-wrap gap-2">
        <Link href="/juego" className="btn">◂ Ciudad Judicial</Link>
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-recursos">
          HUB EXPANSIÓN v5.1 · {MODULOS.length + 1} SISTEMAS (incl. MODO ORAL + SUBMUNDOS)
        </div>
      </header>

      <div className="mb-8">
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.4em] text-zona-recursos mb-2">SUBSISTEMAS</div>
        <h1 className="font-display-grave text-4xl md:text-5xl text-doc-aged mb-3">Arquitectura Avanzada</h1>
        <p className="text-doc-aged/60 text-sm font-mono-terminal max-w-2xl">
          Doce sistemas modulares para entrenamiento de examen de grado. Cada uno simula una institución del Derecho Procesal chileno con mecánicas propias. Los nuevos módulos están marcados con ✦.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {MODULOS.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setM(mod.id)}
            className="zona-card p-5 text-left relative"
            style={{ "--zona-color": `var(--zona-${mod.zona})` } as React.CSSProperties}
          >
            {mod.nuevo && (
              <div
                className="absolute top-3 right-3 text-[8px] font-mono-terminal px-2 py-0.5 border"
                style={{ borderColor: `var(--zona-${mod.zona})`, color: `var(--zona-${mod.zona})` }}
              >
                ✦ NUEVO
              </div>
            )}
            <div className="flex justify-between items-start mb-3">
              <span className="font-display-grave text-3xl opacity-40" style={{ color: `var(--zona-${mod.zona})` }}>
                {mod.numeral.split(".")[0]}
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono-terminal opacity-50" style={{ color: `var(--zona-${mod.zona})` }}>
                {mod.numeral}
              </span>
            </div>
            <h3 className="font-display-grave text-lg text-doc-aged tracking-wider mb-1">{mod.titulo}</h3>
            <div className="text-[10px] uppercase tracking-widest font-mono-terminal mb-2" style={{ color: `var(--zona-${mod.zona})` }}>
              {mod.subtitulo}
            </div>
            <p className="text-doc-aged/55 text-xs leading-relaxed font-mono-terminal">{mod.descripcion}</p>
          </button>
        ))}

        {/* CTA al Modo Oral */}
        <Link
          href="/oral"
          className="zona-card p-5 text-left block"
          style={{ "--zona-color": "var(--zona-oralidad)" } as React.CSSProperties}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="font-display-grave text-3xl opacity-40 text-zona-oralidad">XX</span>
            <span className="text-[9px] uppercase tracking-widest font-mono-terminal opacity-50 text-zona-oralidad">
              INST.20
            </span>
          </div>
          <h3 className="font-display-grave text-lg text-doc-aged tracking-wider mb-1">Modo Oral</h3>
          <div className="text-[10px] uppercase tracking-widest font-mono-terminal text-zona-oralidad mb-2">
            BOSSES · 9 INSTANCIAS
          </div>
          <p className="text-doc-aged/55 text-xs leading-relaxed font-mono-terminal">
            Anfiteatro judicial. Comisión examinadora con cadenas de derivación. Ataques: directo / puente / trampa / repregunta. 9 bosses desbloqueables.
          </p>
        </Link>
      </div>
    </main>
  );
}
