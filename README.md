# EXPEDIENTE C-1725/2026 — Derecho Procesal Civil RPG · v1.0

**Disco Elysium + Código de Procedimiento Civil chileno.** RPG narrativo web sobre jurisdicción, competencia, juicio ordinario y sus etapas, recursos, juicio ejecutivo y disposiciones comunes. Pensado para **estudio del examen de grado**.

Estética: minimalismo cyberpunk-notarial, CRT, glitch jurídico, neon azul/violeta sobre negro.

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript** con `ignoreBuildErrors: true` (tolerancia en deploy)
- **TailwindCSS** + CSS personalizado
- **Framer Motion**
- **Zustand + persist** (estado y guardado en `localStorage` con guarda SSR)
- **Vercel-ready** (sin backend)

---

## Sistemas

### 13 mundos jugables

| # | Mundo | Núcleo normativo |
|---|---|---|
| I | Jurisdicción | Art. 76 CPR / 1, 5, 7, 8 COT |
| II | Competencia | 45-148 COT (absoluta y relativa) |
| III | Acción y pretensión | Doctrinario (Couture, Hoyos, Carnelutti) |
| IV | La demanda | Art. 254 CPC |
| V | Emplazamiento | 38-58 + 258-259 CPC |
| VI | Discusión | 254-318 CPC (demanda, contestación, réplica, dúplica, reconvención) |
| VII | Conciliación | 262-268 CPC |
| VIII | Prueba | 318-433 CPC (auto, medios, observaciones) |
| IX | Sentencia | 158, 162, 170, 432 CPC |
| X | Recursos | 181, 182, 187, 188, 196, 203, 319, 766, 767, 810 CPC + 545 COT |
| XI | Juicio ejecutivo | 434-478 CPC |
| XII | Cautelares | 273-302 CPC |
| XIII | Modo Examen | 20 preguntas tipo cédula con explicación |

### Minijuegos pedagógicos

- **Clasificador de competencia**: 6 casos cruzando materia, fuero, territorio, prórroga.
- **Constructor de demanda art. 254**: marcar requisitos; si faltan, riesgo de excepción dilatoria del art. 303 N°4.
- **Configurador de emplazamiento**: forma (40/44/48/50/54) + plazo (258/259).
- **Etapa de discusión interactiva**: demanda → dilatorias → resolución → réplica → dúplica → reconvención.
- **Auto de prueba + medios probatorios**: ofrecer pruebas oportunas; reposición especial del 319.
- **Clasificador de recursos** (NÚCLEO): dada una resolución, elegir el recurso procedente entre 11 alternativas, con el cuadro oficial del CPC y COT 545.
- **Juicio ejecutivo**: elegir título ejecutivo (art. 434), navegar cuadernos principal/apremio/tercerías, oposición del 464.
- **Cautelares**: prejudiciales/precautorias/innominadas, las 4 del art. 290, con caución y bien afectado.
- **Modo Examen**: 20 preguntas con explicación normativa.

### Loop de ciclos procesales

Cada expediente terminado abre un nuevo ciclo. El personaje conserva atributos, reputación, logros y la bitácora histórica.

### Codex con búsqueda

Incluye:
- 35+ artículos destacados con sus enunciados.
- Cuadro completo de las 5 clases de resoluciones (art. 158).
- Cuadro completo de los 11 recursos con plazo, tribunal competente y descripción.
- 6 medios probatorios con valor probatorio.
- 6 excepciones dilatorias del art. 303.
- 7 títulos ejecutivos del art. 434.
- Buscador por palabra o número de artículo.

---

## Estructura

```
derecho-procesal-rpg/
├─ app/
│  ├─ page.tsx                 # Pantalla de título
│  ├─ creacion/                # Personaje + sexo + atributos procesales
│  ├─ juego/                   # Mapa-hub (13 mundos)
│  ├─ mundo/[id]/              # Router de mundos
│  ├─ examen/                  # Cédula tipo grado
│  ├─ epilogo/                 # Epílogo + loop
│  ├─ codex/                   # Codex con búsqueda
│  ├─ inventario/              # Expediente completo del litigante
│  └─ globals.css
├─ components/
│  ├─ DialogoEscena.tsx
│  ├─ CompetenciaPanel.tsx              # Clasificador de competencia
│  ├─ DemandaPanel.tsx                  # Art. 254
│  ├─ EmplazamientoPanel.tsx            # Notificaciones + plazos
│  ├─ DiscusionPanel.tsx                # Etapas de discusión
│  ├─ PruebaPanel.tsx                   # Medios probatorios
│  ├─ ClasificadorRecursos.tsx          # NÚCLEO: 11 recursos
│  ├─ EjecutivoPanel.tsx                # Arts. 434-478
│  └─ CautelaresPanel.tsx               # Arts. 273-302
├─ lib/reglas.ts               # Motor normativo procesal
├─ data/dialogos.ts            # 11 escenas narrativas
├─ store/useGame.ts            # Zustand + persist + ciclos
├─ types/game.ts               # Tipos del dominio
└─ configs (next, tailwind, vercel, tsconfig)
```

---

## Cómo correr localmente

```bash
npm install
npm run dev   # http://localhost:3000
```

Node 18.17+ o 20+.

## Cómo desplegar en Vercel

1. Subir contenido del ZIP a un repo nuevo en GitHub (el **contenido**, no la carpeta padre).
2. https://vercel.com/new → importá el repo. Framework: Next.js. Root: `./`. Deploy.
3. ~2 min → link público.

## Aviso pedagógico

El juego es una **simplificación didáctica** rigurosa. Cita artículos exactos del CPC, COT y CPR. No reemplaza el estudio del Código, la jurisprudencia y la doctrina (Couture, Hoyos, Cassarino, Maturana, Romero, Pereira, Tavolari).

> "El juez aplica la ley. El litigante la sufre. El estudiante de procesal hace las dos cosas a la vez."
