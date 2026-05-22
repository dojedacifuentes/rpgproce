"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/store/useGame";

// ============================================================================
// ABANDONO DEL PROCEDIMIENTO — Art. 152 CPC
// "El procedimiento se entiende abandonado cuando todas las partes han cesado
//  en su prosecución durante seis meses, contados desde la fecha de la última
//  resolución recaída sobre alguna gestión útil para dar curso progresivo a los autos."
// MECÁNICA: timer que descuenta. Si llega a 0 sin gestión útil, abandono = todo se pierde.
// ============================================================================

const SEIS_MESES_SEG = 180; // 1 mes = 30s para gameplay (6 meses = 180s)
const GESTIONES_UTILES = [
  { nombre: "Solicitar audiencia de conciliación", recargaSeg: 30, art: "Art. 262" },
  { nombre: "Pedir certificación de plazo", recargaSeg: 15, art: "Art. 33 CPC" },
  { nombre: "Acompañar prueba documental", recargaSeg: 45, art: "Art. 342 CPC" },
  { nombre: "Lista de testigos", recargaSeg: 30, art: "Art. 320 CPC" },
  { nombre: "Solicitar inspección personal", recargaSeg: 35, art: "Art. 403 CPC" },
  { nombre: "Pedir absolución de posiciones", recargaSeg: 40, art: "Art. 385 CPC" },
];

// Gestiones inútiles: parecen útiles pero NO interrumpen el plazo (Art. 152)
const GESTIONES_INUTILES = [
  { nombre: "Pedir copias del expediente", art: "No es gestión útil — solo administrativa." },
  { nombre: "Solicitar fotocopias autorizadas", art: "No interrumpe el plazo." },
  { nombre: "Tener presente reservas de derechos", art: "Mera expresión sin movimiento procesal." },
];

export default function AbandonoProcedimiento() {
  const game = useGame();
  const [activo, setActivo] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(SEIS_MESES_SEG);
  const [gestionesRealizadas, setGestionesRealizadas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<"vivo" | "abandono" | null>(null);
  const [advertencia, setAdvertencia] = useState<string | null>(null);

  useEffect(() => {
    if (!activo || resultado) return;
    const t = setInterval(() => {
      setTiempoRestante((s) => {
        if (s <= 1) {
          setResultado("abandono");
          game.ajustarTrauma(15);
          game.ajustarReputacion(-20);
          game.pushLog("ABANDONO DEL PROCEDIMIENTO declarado. Todo se pierde.", "Art. 152 CPC");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [activo, resultado, game]);

  function iniciar() {
    setActivo(true);
    setTiempoRestante(SEIS_MESES_SEG);
    setGestionesRealizadas([]);
    setResultado(null);
    game.pushLog("Iniciado control de abandono del procedimiento (art. 152 CPC).", "Art. 152");
  }

  function realizarGestion(g: typeof GESTIONES_UTILES[number]) {
    setTiempoRestante((s) => Math.min(SEIS_MESES_SEG, s + g.recargaSeg));
    setGestionesRealizadas((arr) => [...arr, g.nombre]);
    setAdvertencia(null);
    game.pushLog(`Gestión útil: ${g.nombre}. Plazo del 152 se reinicia.`, g.art);
  }

  function realizarGestionInutil(g: typeof GESTIONES_INUTILES[number]) {
    setAdvertencia(`${g.nombre} → ${g.art}`);
    game.ajustarTrauma(2);
  }

  function ganar() {
    setResultado("vivo");
    setActivo(false);
    game.ajustarAtributo("diligencia", 2);
    game.ajustarReputacion(10);
    game.pushLog("Mantuviste vivo el expediente. Sentencia próxima.", "ABANDONO");
    game.desbloquearLogro({ id: "abandono_sobreviviente", titulo: "Sobreviviente del 152", descripcion: "Mantuviste el expediente vivo a través de gestiones útiles", articulo: "Art. 152 CPC", desbloqueado: true });
  }

  const tiempoPct = (tiempoRestante / SEIS_MESES_SEG) * 100;
  const mesesRest = Math.round((tiempoRestante / SEIS_MESES_SEG) * 6 * 10) / 10;
  const colorTimer = tiempoPct > 50 ? "var(--zona-cautelares)" : tiempoPct > 25 ? "var(--zona-prueba)" : "var(--zona-nulidad)";

  if (!activo && resultado !== "abandono") {
    return (
      <div className="terminal p-6">
        <div className="font-mono-terminal text-[10px] uppercase tracking-[.3em] text-zona-incidentes mb-2">INSTITUCIÓN 18</div>
        <h2 className="font-display-grave text-3xl text-doc-aged mb-3">Abandono del Procedimiento</h2>
        <p className="text-doc-aged/70 text-sm font-mono-terminal mb-4">
          <span className="text-zona-incidentes">Art. 152 CPC:</span> "El procedimiento se entiende abandonado cuando todas las partes han cesado en su prosecución durante seis meses, contados desde la fecha de la última resolución recaída sobre alguna gestión útil para dar curso progresivo a los autos."
        </p>
        <p className="text-doc-aged/50 text-xs italic mb-4 font-serif-juridica">
          Mantén el expediente vivo. Solo gestiones <i>útiles</i> interrumpen el plazo. Las gestiones administrativas (copias, fotocopias, "téngase presente") NO sirven.
        </p>
        <button onClick={iniciar} className="btn" style={{ borderColor: "var(--zona-incidentes)", color: "var(--zona-incidentes)" }}>
          ▶ Iniciar control de abandono
        </button>
        {resultado === "vivo" && (
          <div className="mt-4 p-3 border border-zona-cautelares text-zona-cautelares text-sm">
            ✓ Expediente mantenido vivo. Sentencia próxima.
          </div>
        )}
      </div>
    );
  }

  if (resultado === "abandono") {
    return (
      <div className="terminal p-6 expediente-letal">
        <div className="font-display-grave text-4xl text-zona-nulidad glitch-text-nulidad mb-3">ABANDONO</div>
        <p className="text-doc-aged/80 text-sm font-mono-terminal mb-4">
          El procedimiento se ha abandonado (art. 152 CPC). Todas las cosas obradas en él quedan sin efecto.
          Las partes mantienen sus derechos materiales, pero el juicio se pierde.
        </p>
        <p className="text-doc-aged/60 text-xs italic font-serif-juridica mb-4">
          "El abandono no extingue la acción, pero sí el procedimiento. Habrá que empezar todo de nuevo, si es que ya no prescribió."
        </p>
        <button onClick={() => { setResultado(null); }} className="btn btn-danger">↻ Reintentar</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timer principal */}
      <div className="zona-card p-6" style={{ "--zona-color": colorTimer } as React.CSSProperties}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-mono-terminal text-[10px] uppercase tracking-widest text-doc-aged/50">PLAZO DE ABANDONO</div>
            <div className="font-display-grave text-2xl text-doc-aged">{mesesRest} meses restantes</div>
          </div>
          <span className="tag tag-incidente">Art. 152 CPC</span>
        </div>
        <div className="h-3 bg-bg-deep border border-bg-steel">
          <motion.div
            animate={{ width: `${tiempoPct}%` }}
            transition={{ duration: 0.5 }}
            className="h-full"
            style={{ background: colorTimer, boxShadow: `0 0 12px ${colorTimer}` }}
          />
        </div>
        {tiempoPct < 25 && (
          <div className="mt-2 text-zona-nulidad text-xs font-mono-terminal animate-flicker">
            ⚠ Riesgo inminente de abandono. Realizá una gestión útil ahora.
          </div>
        )}
        <button onClick={ganar} className="btn btn-cautelar mt-4">▸ Llegó la sentencia · GANAR</button>
      </div>

      {/* Gestiones útiles */}
      <div className="terminal p-4">
        <div className="font-display-grave text-base text-zona-cautelares tracking-widest mb-3">GESTIONES ÚTILES</div>
        <div className="grid md:grid-cols-2 gap-2">
          {GESTIONES_UTILES.map((g) => (
            <button
              key={g.nombre}
              onClick={() => realizarGestion(g)}
              className="text-left p-3 border border-bg-steel hover:border-zona-cautelares transition-colors"
            >
              <div className="text-xs text-doc-aged">{g.nombre}</div>
              <div className="text-[10px] text-zona-cautelares/60 mt-1 font-mono-terminal">+{g.recargaSeg}s · {g.art}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Trampas: gestiones inútiles */}
      <div className="terminal p-4" style={{ borderColor: "rgba(217,74,74,.2)" }}>
        <div className="font-display-grave text-sm text-zona-nulidad tracking-widest mb-2">⚠ TRAMPAS · GESTIONES INÚTILES</div>
        <div className="grid md:grid-cols-3 gap-2">
          {GESTIONES_INUTILES.map((g) => (
            <button
              key={g.nombre}
              onClick={() => realizarGestionInutil(g)}
              className="text-left p-2 border border-bg-steel hover:border-zona-nulidad/50 transition-colors text-[10px] text-doc-aged/60"
            >
              {g.nombre}
            </button>
          ))}
        </div>
        {advertencia && (
          <div className="mt-3 p-2 border border-zona-nulidad/50 text-zona-nulidad text-xs">
            ✗ {advertencia}
          </div>
        )}
      </div>

      {/* Historial */}
      {gestionesRealizadas.length > 0 && (
        <div className="terminal p-3 text-xs">
          <div className="text-zona-cautelares font-mono-terminal mb-1">Gestiones útiles realizadas: {gestionesRealizadas.length}</div>
          <div className="text-doc-aged/40 text-[10px]">{gestionesRealizadas.slice(-5).join(" · ")}</div>
        </div>
      )}
    </div>
  );
}
