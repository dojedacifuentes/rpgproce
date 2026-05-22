"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AmbienteVivo from "./AmbienteVivo";
import HUDPersistente from "./HUDPersistente";
import BootSequence from "./BootSequence";
import { useGame } from "@/store/useGame";

// ============================================================================
// GLOBAL CANVAS — orquesta los elementos de fondo del juego:
// - Boot sequence en la primera carga (solo una vez)
// - Ambiente animado en TODO momento
// - HUD persistente con estado del litigante
// ============================================================================

export default function GlobalCanvas() {
  const pathname = usePathname();
  const personaje = useGame((s) => s.personaje);
  const trauma = personaje.trauma || 0;
  const [bootDone, setBootDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const seen = sessionStorage.getItem("boot-seen");
    if (seen) setBootDone(true);
  }, []);

  // Determinar modo según ruta
  const modoZona: "ambiente" | "oral" | "ejecutivo" | "nulidad" = (() => {
    if (!pathname) return "ambiente";
    if (pathname.includes("/oral")) return "oral";
    if (pathname.includes("ejecutivo")) return "ejecutivo";
    if (pathname.includes("nulidad")) return "nulidad";
    return "ambiente";
  })();

  // Intensidad según trauma
  const intensidad = Math.min(100, 40 + trauma);
  const corrupcion = trauma;

  function finBoot() {
    sessionStorage.setItem("boot-seen", "1");
    setBootDone(true);
  }

  if (!hydrated) return null;

  return (
    <>
      <AmbienteVivo intensidad={intensidad} corrupcion={corrupcion} modo={modoZona} />
      <HUDPersistente />
      {!bootDone && <BootSequence onFin={finBoot} />}
    </>
  );
}
