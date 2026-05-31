// ============================================================================
// SISTEMA DE AUDIO SINTETIZADO — Web Audio API
// Sin archivos externos. Todo se sintetiza al vuelo.
// SFX procesales: click táctico, hover holográfico, warnings, casación exitosa,
// inadmisibilidad, glitch fatal, oral correcta, terminal beep.
// AMBIENTES: drone grave, lluvia digital, murmullo tribunalicio.
// ============================================================================

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let muted = false;

function ctx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.35;
      masterGain.connect(audioCtx.destination);
    } catch {
      return null;
    }
  }
  return audioCtx;
}

export function setMuted(m: boolean) {
  muted = m;
  if (typeof window !== "undefined") localStorage.setItem("rpgproce-audio-muted", m ? "1" : "0");
  if (masterGain) masterGain.gain.value = m ? 0 : 0.35;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("rpgproce-audio-muted") === "1";
}

// Inicializa según localStorage
if (typeof window !== "undefined") {
  muted = isMuted();
}

// ─────────────────────────── HELPER GENÉRICO ───────────────────────────
function tone(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.2, attack = 0.01, decay = 0.1) {
  if (muted) return;
  const c = ctx();
  if (!c || !masterGain) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  gain.gain.setValueAtTime(0, c.currentTime);
  gain.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + attack + decay);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + attack + decay + 0.05);
}

function sweep(fromHz: number, toHz: number, dur: number, type: OscillatorType = "sawtooth", vol = 0.15) {
  if (muted) return;
  const c = ctx();
  if (!c || !masterGain) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(fromHz, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(toHz, c.currentTime + dur);
  gain.gain.setValueAtTime(0, c.currentTime);
  gain.gain.linearRampToValueAtTime(vol, c.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + dur + 0.05);
}

function noiseBurst(dur: number, vol = 0.12, filterFreq = 1200) {
  if (muted) return;
  const c = ctx();
  if (!c || !masterGain) return;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = filterFreq;
  const gain = c.createGain();
  gain.gain.value = vol;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  src.start();
}

// ─────────────────────────── SFX DE UI ───────────────────────────
export const sfx = {
  // Click táctico procesal — pulso corto + click sintético
  click: () => {
    tone(880, 0.04, "square", 0.06, 0.001, 0.04);
    tone(1320, 0.04, "sine", 0.04, 0.001, 0.05);
  },

  // Hover holográfico — frecuencia ligera ascendente
  hover: () => {
    sweep(700, 1100, 0.08, "sine", 0.04);
  },

  // Confirmación procesal — dos tonos ascendentes
  confirm: () => {
    tone(523, 0.08, "triangle", 0.12, 0.005, 0.08);
    setTimeout(() => tone(784, 0.12, "triangle", 0.1, 0.005, 0.12), 70);
  },

  // Warning doctrinal — tono medio con leve disonancia
  warning: () => {
    tone(440, 0.15, "sawtooth", 0.1, 0.01, 0.15);
    tone(466, 0.15, "sawtooth", 0.08, 0.01, 0.15);
  },

  // Inadmisibilidad — distorsión grave descendente
  inadmisible: () => {
    sweep(380, 120, 0.4, "sawtooth", 0.18);
    noiseBurst(0.3, 0.1, 800);
  },

  // Casación exitosa — expansión sonora ascendente armónica
  casacion: () => {
    tone(523, 0.15, "triangle", 0.1, 0.005, 0.2);
    setTimeout(() => tone(659, 0.15, "triangle", 0.1, 0.005, 0.2), 80);
    setTimeout(() => tone(784, 0.3, "triangle", 0.12, 0.005, 0.4), 160);
    setTimeout(() => tone(1047, 0.5, "triangle", 0.1, 0.005, 0.5), 280);
  },

  // Glitch violento — error fatal
  glitch: () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        tone(80 + Math.random() * 400, 0.04, "square", 0.18, 0.001, 0.04);
        noiseBurst(0.05, 0.12, 400 + Math.random() * 1200);
      }, i * 40);
    }
  },

  // Oral correcta — resonancia elegante
  oralCorrecta: () => {
    tone(440, 0.2, "sine", 0.12, 0.01, 0.3);
    setTimeout(() => tone(880, 0.4, "sine", 0.08, 0.05, 0.4), 120);
  },

  // Oral incorrecta — distorsión grave breve
  oralIncorrecta: () => {
    sweep(280, 140, 0.3, "sawtooth", 0.15);
  },

  // Boot — secuencia de inicialización
  boot: () => {
    sweep(80, 600, 0.6, "sawtooth", 0.1);
    setTimeout(() => {
      tone(880, 0.05, "square", 0.08);
      tone(1320, 0.05, "square", 0.06);
    }, 400);
  },

  // Terminal beep
  beep: () => tone(1200, 0.03, "square", 0.06, 0.001, 0.03),

  // Combo arcade
  combo: (nivel: number) => {
    const base = 523 + nivel * 60;
    tone(base, 0.06, "triangle", 0.1, 0.001, 0.08);
    setTimeout(() => tone(base * 1.5, 0.08, "triangle", 0.08, 0.001, 0.1), 40);
  },

  // Plazo crítico — pulso de alarma
  plazoCritico: () => {
    tone(880, 0.08, "square", 0.12, 0.001, 0.08);
    setTimeout(() => tone(440, 0.12, "square", 0.1, 0.001, 0.12), 100);
  },

  // Boss aparece
  bossEntrada: () => {
    sweep(40, 110, 1.2, "sawtooth", 0.18);
    setTimeout(() => noiseBurst(0.8, 0.06, 200), 200);
  },

  // Power-up — arpegio brillante ascendente (subir de nivel)
  powerUp: () => {
    [523, 659, 784, 1047, 1319].forEach((f, i) =>
      setTimeout(() => tone(f, 0.12, "triangle", 0.12, 0.005, 0.14), i * 70));
  },

  // Select — blip nítido de dos tonos (elegir opción/avatar)
  select: () => {
    tone(740, 0.05, "square", 0.08, 0.001, 0.05);
    setTimeout(() => tone(1100, 0.06, "square", 0.06, 0.001, 0.06), 45);
  },

  // Whoosh — barrido filtrado (transición / entrar a región)
  whoosh: () => {
    sweep(180, 900, 0.35, "sine", 0.1);
    noiseBurst(0.3, 0.05, 1400);
  },

  // Unlock — campanita de tesoro (artículo desbloqueado)
  unlock: () => {
    tone(880, 0.1, "triangle", 0.1, 0.005, 0.12);
    setTimeout(() => tone(1320, 0.14, "triangle", 0.1, 0.005, 0.18), 90);
    setTimeout(() => tone(1760, 0.3, "sine", 0.08, 0.01, 0.35), 180);
  },
};

// ─────────────────────────── AMBIENTES (drones) ───────────────────────────
let droneNodes: { osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode; lfoGain: GainNode }[] = [];

export function startAmbient(modo: "ambiente" | "oral" | "ejecutivo" | "nulidad" | "recursos" = "ambiente") {
  stopAmbient();
  if (muted) return;
  const c = ctx();
  if (!c || !masterGain) return;

  const settings: Record<string, { freqs: number[]; vol: number; lfoRate: number }> = {
    ambiente: { freqs: [55, 82.5], vol: 0.02, lfoRate: 0.12 },
    oral: { freqs: [60, 90, 135], vol: 0.025, lfoRate: 0.3 },
    ejecutivo: { freqs: [45, 67.5], vol: 0.03, lfoRate: 0.08 },
    nulidad: { freqs: [50, 75, 110, 165], vol: 0.025, lfoRate: 0.4 },
    recursos: { freqs: [110, 165], vol: 0.025, lfoRate: 0.15 },
  };
  const s = settings[modo];

  s.freqs.forEach((f) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    const lfo = c.createOscillator();
    const lfoGain = c.createGain();

    osc.type = "sine";
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0, c.currentTime);
    gain.gain.linearRampToValueAtTime(s.vol, c.currentTime + 2);

    lfo.frequency.value = s.lfoRate;
    lfoGain.gain.value = s.vol * 0.4;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start();
    lfo.start();

    droneNodes.push({ osc, gain, lfo, lfoGain });
  });
}

export function stopAmbient() {
  const c = ctx();
  if (!c) return;
  droneNodes.forEach(({ osc, gain, lfo }) => {
    try {
      gain.gain.cancelScheduledValues(c.currentTime);
      gain.gain.linearRampToValueAtTime(0, c.currentTime + 0.5);
      setTimeout(() => {
        try { osc.stop(); lfo.stop(); } catch {}
      }, 600);
    } catch {}
  });
  droneNodes = [];
}

// ─── AMBIENTES TEMÁTICOS POR REGIÓN (Reinos del Derecho) ───────────────────
// 7 atmósferas distintas: cada bioma su drone. Aditivo, no toca el resto.
const AMBIENTE_REINOS: Record<string, { freqs: number[]; vol: number; lfoRate: number }> = {
  bosque_obligaciones: { freqs: [55, 110, 165], vol: 0.022, lfoRate: 0.1 },     // bosque cálido
  ciudad_mercantil: { freqs: [49, 73.5, 98], vol: 0.026, lfoRate: 0.18 },        // puerto, oleaje
  tierras_posesion: { freqs: [46, 92], vol: 0.024, lfoRate: 0.07 },              // viento de cañón
  mansion_sucesoria: { freqs: [50, 75, 100, 150], vol: 0.024, lfoRate: 0.35 },   // mansión inquieta
  republica_administrativa: { freqs: [60, 120, 180, 240], vol: 0.02, lfoRate: 0.5 }, // electrónico
  castillo_competencia: { freqs: [44, 66, 88], vol: 0.028, lfoRate: 0.25 },       // cavernoso
  tribunal_supremo: { freqs: [65, 130, 195], vol: 0.024, lfoRate: 0.12 },         // sacro
};

export function startAmbientReino(region: string) {
  stopAmbient();
  if (muted) return;
  const c = ctx();
  if (!c || !masterGain) return;
  const s = AMBIENTE_REINOS[region] ?? AMBIENTE_REINOS.bosque_obligaciones;
  s.freqs.forEach((f) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    const lfo = c.createOscillator();
    const lfoGain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0, c.currentTime);
    gain.gain.linearRampToValueAtTime(s.vol, c.currentTime + 2);
    lfo.frequency.value = s.lfoRate;
    lfoGain.gain.value = s.vol * 0.4;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start();
    lfo.start();
    droneNodes.push({ osc, gain, lfo, lfoGain });
  });
}
