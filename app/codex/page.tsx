"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ARTICULOS_DESTACADOS, TABLA_RECURSOS, EXCEPCIONES_DILATORIAS, MEDIOS_PRUEBA, TITULOS_EJECUTIVOS, CLASIFICACION_RESOLUCIONES } from "@/lib/reglas";

const TEMAS: { titulo: string; cuerpo: string; tags: string[] }[] = [
  { titulo: "Jurisdicción (art. 76 CPR / 1 COT)", cuerpo: "Facultad pública de conocer las causas civiles y criminales, juzgarlas y hacer ejecutar lo juzgado. Es función estatal, exclusiva, indelegable, inavocable, improrrogable en lo absoluto, una en su esencia y territorial.", tags: ["jurisdiccion", "76 CPR", "1 COT"] },
  { titulo: "Competencia absoluta", cuerpo: "Es de orden público, improrrogable. Factores: materia (130-133 COT), fuero (50, 168 COT), cuantía (115-129 COT). Su falta es alegable de oficio y de parte (en cualquier estado).", tags: ["competencia", "absoluta", "materia", "fuero", "cuantia"] },
  { titulo: "Competencia relativa (territorio)", cuerpo: "Renunciable y prorrogable expresa o tácitamente (arts. 181-187 COT). Regla general: domicilio del demandado (art. 134). Prorroga tácita: actor concurre ante tribunal incompetente y demandado contesta sin reclamarla.", tags: ["competencia", "relativa", "territorio", "134"] },
  { titulo: "Requisitos de la demanda (art. 254 CPC)", cuerpo: "Cinco requisitos: (1) tribunal; (2) demandante; (3) demandado; (4) exposición clara de hechos y fundamentos de derecho; (5) peticiones precisas en la conclusión.", tags: ["demanda", "254"] },
  { titulo: "Emplazamiento y notificaciones", cuerpo: "Emplazamiento = notificación válida + plazo. Formas: personal (40), personal subsidiaria (44), cédula (48), estado diario (50), avisos (54). Su omisión causa nulidad (768 N°9).", tags: ["emplazamiento", "40", "44", "48"] },
  { titulo: "Plazos para contestar", cuerpo: "Mismo lugar: 15 días (258). Mismo territorio: 15 + 3 (258 inc. 2°). Fuera del territorio: 15 + tabla emplazamiento (259).", tags: ["plazos", "258", "259"] },
  { titulo: "Excepciones dilatorias (art. 303)", cuerpo: "Seis numerales taxativos: incompetencia, falta de capacidad/personería, litispendencia, ineptitud del libelo, beneficio de excusión, otras de corrección. Plazo: dentro del término para contestar, todas en un mismo escrito (305).", tags: ["dilatorias", "303"] },
  { titulo: "Excepciones perentorias anómalas (art. 310)", cuerpo: "Prescripción, cosa juzgada, transacción y pago efectivo de la deuda (con antecedente escrito). Se pueden oponer en cualquier estado del juicio hasta antes de la citación a oír sentencia en 1ª instancia y hasta antes de la vista en 2ª.", tags: ["perentorias", "310"] },
  { titulo: "Conciliación obligatoria (arts. 262-268)", cuerpo: "Tras la dúplica el juez cita a conciliación, salvo excepciones del 313 inc. 1°. El acta total o parcial vale como sentencia ejecutoriada (267).", tags: ["conciliacion", "262"] },
  { titulo: "Auto de prueba (art. 318)", cuerpo: "Recibe la causa a prueba si hay hechos sustanciales, pertinentes y controvertidos. Se notifica por cédula. Reposición especial: 3 días con apelación subsidiaria (319, 326).", tags: ["prueba", "318", "319"] },
  { titulo: "Término probatorio", cuerpo: "Ordinario: 20 días (328). Extraordinario fuera del tribunal/del territorio: 329-330. Especial por entorpecimiento: 339.", tags: ["termino probatorio", "328", "339"] },
  { titulo: "Medios de prueba (arts. 341-427)", cuerpo: "Instrumental (342-355), testimonial (356-384), confesión/absolución de posiciones (385-402), inspección personal del tribunal (403-408), informe de peritos (409-425), presunciones (426-427).", tags: ["medios prueba", "341"] },
  { titulo: "Sentencia definitiva (158, 170)", cuerpo: "Pone fin a la instancia resolviendo la cuestión. Requisitos del 170 + Auto Acordado 1920. Plazo para fallar: 60 días desde citación a oír sentencia (162).", tags: ["sentencia", "170", "162"] },
  { titulo: "Recursos — cuadro general", cuerpo: "Aclaración/rectificación/enmienda (182), reposición ordinaria (181), reposición especial (319, 201, 212, 778, 781), apelación (187), apelación subsidiaria (188), hecho verdadero (203), hecho falso (196), casación en la forma (766), casación en el fondo (767), queja (545 COT), revisión (810).", tags: ["recursos"] },
  { titulo: "Causales de casación en la forma (art. 768)", cuerpo: "Nueve causales tasadas: incompetencia, ultra petita, contradicción, falta de fundamento (omisión 170), falta de emplazamiento, no recepción de la causa a prueba, sentencia dada por menor cantidad de jueces, juez inhabilitado, cosa juzgada.", tags: ["casacion forma", "768"] },
  { titulo: "Juicio ejecutivo (arts. 434-478)", cuerpo: "Requiere título ejecutivo con obligación líquida, actualmente exigible y no prescrita. Cuadernos: principal y apremio. Excepciones taxativas del 464.", tags: ["ejecutivo", "434", "464"] },
  { titulo: "Cautelares (arts. 273-302)", cuerpo: "Prejudiciales (273-289) y precautorias propiamente tales (290-302). Tipos del 290: secuestro, interventor, retención, prohibición de celebrar actos. Innominadas: 298 inc. 2°.", tags: ["cautelares", "290"] },
];

export default function Codex() {
  const [q, setQ] = useState("");
  const filtrados = useMemo(
    () => TEMAS.filter((t) =>
      !q || t.titulo.toLowerCase().includes(q.toLowerCase()) ||
      t.cuerpo.toLowerCase().includes(q.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()))
    ),
    [q]
  );

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div>
          <div className="tag mb-2">CODEX PROCESAL</div>
          <h1 className="label-art text-3xl text-neon-blue">Articulado mínimo y temas clave</h1>
        </div>
        <Link href="/" className="btn">◂ Inicio</Link>
      </div>

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar: artículo, recurso, etapa..." className="w-full bg-ink-700 border border-neon-blue/30 p-3 mb-4 focus:outline-none focus:border-neon-blue" />

      <div className="terminal p-4 mb-6">
        <div className="label-art text-neon-violet mb-2 text-sm">Artículos destacados ({ARTICULOS_DESTACADOS.length})</div>
        <div className="grid sm:grid-cols-2 gap-1 text-xs">
          {ARTICULOS_DESTACADOS.map((a) => (
            <div key={a.n}><b className="text-neon-cyan">{a.n}</b> — {a.t}</div>
          ))}
        </div>
      </div>

      <div className="terminal p-4 mb-6">
        <div className="label-art text-neon-violet mb-2 text-sm">Resoluciones judiciales (art. 158 CPC)</div>
        <div className="text-xs space-y-2">
          {CLASIFICACION_RESOLUCIONES.map((r) => (
            <div key={r.tipo} className="border-b border-ink-400 pb-2">
              <b className="text-neon-cyan">{r.tipo.replace(/_/g, " ")}</b> — {r.definicion}
              <span className="tag tag-violet ml-2">{r.articulo}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal p-4 mb-6">
        <div className="label-art text-neon-violet mb-2 text-sm">Cuadro de recursos</div>
        <div className="text-xs space-y-2">
          {TABLA_RECURSOS.map((r) => (
            <details key={r.recurso} className="border-b border-ink-400 pb-2">
              <summary className="cursor-pointer"><b className="text-neon-cyan">{r.nombre}</b> · <span className="tag tag-violet">{r.articulo}</span></summary>
              <p className="mt-1 text-parchment/80">{r.descripcion}</p>
              <p className="mt-1 text-parchment/60">Plazo: {r.plazoDias} días · Conoce: {r.tribunalQueConoce} · Efectos: {r.efectos}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="terminal p-4 mb-6">
        <div className="label-art text-neon-violet mb-2 text-sm">Medios probatorios</div>
        <div className="text-xs space-y-2">
          {MEDIOS_PRUEBA.map((m) => (
            <div key={m.medio} className="border-b border-ink-400 pb-2">
              <b className="text-neon-cyan">{m.nombre}</b> — {m.valor}
              <span className="tag tag-violet ml-2">{m.arts}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="terminal p-4 mb-6">
        <div className="label-art text-neon-violet mb-2 text-sm">Excepciones dilatorias (art. 303 CPC)</div>
        <ul className="text-xs space-y-1">
          {EXCEPCIONES_DILATORIAS.map((e) => <li key={e.n}>{e.n}. {e.t}</li>)}
        </ul>
      </div>

      <div className="terminal p-4 mb-6">
        <div className="label-art text-neon-violet mb-2 text-sm">Títulos ejecutivos (art. 434 CPC)</div>
        <ul className="text-xs space-y-1">
          {TITULOS_EJECUTIVOS.map((t) => <li key={t.n}>{t.n}. {t.t}</li>)}
        </ul>
      </div>

      <div className="space-y-3">
        {filtrados.map((t) => (
          <details key={t.titulo} className="terminal p-4">
            <summary className="label-art text-neon-cyan cursor-pointer">{t.titulo}</summary>
            <p className="mt-2 text-parchment/80 text-sm leading-relaxed">{t.cuerpo}</p>
            <div className="mt-2 flex gap-1 flex-wrap">
              {t.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </details>
        ))}
        {filtrados.length === 0 && <p className="text-parchment/40 italic">Sin resultados para "{q}".</p>}
      </div>
    </main>
  );
}
