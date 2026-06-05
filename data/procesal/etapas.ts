import type { EdificioId, EtapaProc } from "@/types/procesal";
import { ETAPAS_ORDINARIO } from "./ordinario";

// ============================================================================
// REGISTRO de expedientes por edificio. A medida que se construyan los demás
// procedimientos se irán enchufando aquí (sumario, ejecutivo, incidental,
// recursos). Los edificios sin entrada se muestran "en preparación".
// ============================================================================

const REGISTRO: Partial<Record<EdificioId, EtapaProc[]>> = {
  ordinario: ETAPAS_ORDINARIO,
};

export const etapasDe = (id: EdificioId): EtapaProc[] => REGISTRO[id] ?? [];
export const totalEtapas = (id: EdificioId): number => etapasDe(id).length;
