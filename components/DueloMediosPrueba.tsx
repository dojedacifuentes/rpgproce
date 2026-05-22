"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";
import { useGame } from "@/store/useGame";

interface MedioPrueba {
  id: string;
  nombre: string;
  tipo: "documental" | "testimonial" | "confesion" | "presuncion" | "pericial";
  fuerza: number;
  costo: number;
  articulo: string;
  descripcion: string;
}

const MEDIOS_DISPONIBLES: MedioPrueba[] = [
  { id: "doc_001", nombre: "Contrato Original", tipo: "documental", fuerza: 9, costo: 2, articulo: "Art. 1700 CC", descripcion: "Instrumento que prueba." },
  { id: "tes_001", nombre: "Testigo Presencial", tipo: "testimonial", fuerza: 6, costo: 3, articulo: "Art. 1698 CC", descripcion: "Persona que vio." },
  { id: "con_001", nombre: "Confesion de Parte", tipo: "confesion", fuerza: 10, costo: 0, articulo: "Art. 1709 CC", descripcion: "La mejor prueba." },
  { id: "pre_001", nombre: "Presuncion Legal", tipo: "presuncion", fuerza: 4, costo: 1, articulo: "Art. 1712 CC", descripcion: "Ley presume." },
  { id: "per_001", nombre: "Pericia Contable", tipo: "pericial", fuerza: 8, costo: 4, articulo: "Art. 1709 inc. 2", descripcion: "Experto tecnico." },
];

export default function DueloMediosPrueba() {
  const [ronda_actual, setRondaActual] = useState(1);
  const [demandante_puntos, setDemandantePuntos] = useState(0);
  const [demandado_puntos, setDemandadoPuntos] = useState(0);
  const [demandante_seleccionado, setDemandanteSeleccionado] = useState<MedioPrueba | null>(null);
  const [demandado_seleccionado, setDemandadoSeleccionado] = useState<MedioPrueba | null>(null);
  const [ronda_completada, setRondaCompletada] = useState(false);
  const [resultado, setResultado] = useState<string>("");
  const pushLog = useGame((s) => s.pushLog);

  function seleccionar_demandante(medio: MedioPrueba) {
    if (ronda_completada) return;
    sfx.click();
    setDemandanteSeleccionado(medio);
  }

  function resolver_ronda() {
    if (!demandante_seleccionado) return;
    sfx.click();

    const aleatorio = MEDIOS_DISPONIBLES[Math.floor(Math.random() * MEDIOS_DISPONIBLES.length)];
    setDemandadoSeleccionado(aleatorio);

    const dem_fuerza = demandante_seleccionado.fuerza;
    const ddo_fuerza = aleatorio.fuerza;

    let ganador_es_demandante = false;
    let explicacion = "";

    if (dem_fuerza > ddo_fuerza) {
      ganador_es_demandante = true;
      explicacion = `Tu ${demandante_seleccionado.nombre} (${dem_fuerza}) vence ${aleatorio.nombre} (${ddo_fuerza}).`;
      setDemandantePuntos((p) => p + 1);
    } else if (ddo_fuerza > dem_fuerza) {
      ganador_es_demandante = false;
      explicacion = `El ${aleatorio.nombre} (${ddo_fuerza}) del adversario vence tu ${demandante_seleccionado.nombre} (${dem_fuerza}).`;
      setDemandadoPuntos((p) => p + 1);
    } else {
      ganador_es_demandante = true;
      explicacion = "Empate desempata a demandante.";
      setDemandantePuntos((p) => p + 1);
    }

    setResultado(explicacion);
    setRondaCompletada(true);

    if (ganador_es_demandante) {
      sfx.oralCorrecta();
    } else {
      sfx.warning();
    }

    pushLog(`Ronda ${ronda_actual}: ${ganador_es_demandante ? "demandante" : "demandado"}`, "SKILL");
  }

  function siguiente_ronda() {
    if (ronda_actual < 3) {
      setRondaActual((r) => r + 1);
      setDemandanteSeleccionado(null);
      setDemandadoSeleccionado(null);
      setRondaCompletada(false);
      setResultado("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="font-mono-terminal text-[10px] uppercase text-doc-aged/40">RONDA {ronda_actual} / 3</div>
        <div className="flex gap-4 font-mono-terminal text-[11px]">
          <span className="text-zona-cautelares">DEMANDANTE: {demandante_puntos}</span>
          <span className="text-zona-nulidad">DEMANDADO: {demandado_puntos}</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="terminal p-6 space-y-6">
        <div>
          <h3 className="font-display-grave text-2xl text-doc-aged mb-2">Duelo de Medios de Prueba</h3>
          <p className="font-serif-juridica text-doc-aged/75 text-sm">Elige tu medio. El demandado elige al azar. Gana quien tenga mayor fuerza.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-[10px] font-mono-terminal uppercase text-zona-cautelares/60">Tu Seleccion</div>
            <div className="space-y-2">
              {MEDIOS_DISPONIBLES.map((medio) => (
                <motion.button
                  key={medio.id}
                  onClick={() => seleccionar_demandante(medio)}
                  disabled={ronda_completada}
                  className={`w-full text-left p-3 border-2 transition-all ${demandante_seleccionado?.id === medio.id ? "border-zona-cautelares bg-zona-cautelares/10" : "border-doc-aged/30 hover:border-zona-cautelares/60"}`}
                >
                  <div className="font-display-grave text-sm text-doc-aged">{medio.nombre}</div>
                  <div className="text-[9px] text-doc-aged/60 mt-1">{medio.articulo}</div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-zona-cautelares">Force {medio.fuerza}/10</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="font-display-grave text-2xl text-doc-aged/40">vs</div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-mono-terminal uppercase text-zona-nulidad/60">Oponente</div>
            {ronda_completada && demandado_seleccionado ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                disabled={true}
                className="w-full text-left p-3 border-2 border-zona-nulidad/30 bg-zona-nulidad/5"
              >
                <div className="font-display-grave text-sm text-doc-aged">{demandado_seleccionado.nombre}</div>
                <div className="text-[9px] text-doc-aged/60 mt-1">{demandado_seleccionado.articulo}</div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] text-zona-nulidad">Force {demandado_seleccionado.fuerza}/10</span>
                </div>
              </motion.button>
            ) : (
              <div className="p-3 border-2 border-doc-aged/20 text-center text-doc-aged/30 text-[10px]">Esperando...</div>
            )}
          </div>
        </div>

        {!ronda_completada && demandante_seleccionado && (
          <button onClick={resolver_ronda} className="btn btn-recurso w-full py-3">RESOLVER RONDA</button>
        )}

        <AnimatePresence>
          {ronda_completada && resultado && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-doc-aged/10 pt-4 space-y-3">
              <div className="p-4 bg-zona-cautelares/5 border border-zona-cautelares/20">
                <p className="text-[10px] text-doc-aged/75 font-serif-juridica">{resultado}</p>
              </div>
              {ronda_actual < 3 && (
                <button onClick={siguiente_ronda} className="btn btn-recurso w-full py-2 text-sm">SIGUIENTE RONDA</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
