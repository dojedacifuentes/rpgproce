import type { RegionCivilId } from "@/types/civilis";

// ============================================================================
// VERDADERO O FALSO — afirmaciones de Derecho Civil para detección de errores.
// ============================================================================

export interface AfirmacionVoF {
  id: string;
  texto: string;
  verdadero: boolean;
  explicacion: string;
  articulo: string;
  region: RegionCivilId;
}

export const VOF_CIVIL: AfirmacionVoF[] = [
  { id: "vof_1", texto: "La competencia absoluta puede prorrogarse por acuerdo de las partes.", verdadero: false, explicacion: "Solo la competencia relativa (territorio) se prorroga; la absoluta es de orden público e irrenunciable.", articulo: "arts. 181-187 COT", region: "contratos" },
  { id: "vof_2", texto: "Todo contrato legalmente celebrado es una ley para los contratantes.", verdadero: true, explicacion: "Es la fuerza obligatoria del contrato (pacta sunt servanda).", articulo: "Art. 1545 CC", region: "contratos" },
  { id: "vof_3", texto: "La buena fe contractual obliga solo a lo expresamente pactado.", verdadero: false, explicacion: "El 1546 integra el contrato: obliga también a lo que emana de su naturaleza, la ley o la costumbre.", articulo: "Art. 1546 CC", region: "contratos" },
  { id: "vof_4", texto: "En la teoría de los riesgos, el riesgo del cuerpo cierto es de cargo del deudor.", verdadero: false, explicacion: "La regla del 1550 es res perit creditori: el riesgo es del acreedor (salvo mora u otras excepciones).", articulo: "Art. 1550 CC", region: "contratos" },
  { id: "vof_5", texto: "La promesa verbal de compraventa de un inmueble produce obligación.", verdadero: false, explicacion: "El 1554 N°1 exige que la promesa conste por escrito; de lo contrario no produce obligación alguna.", articulo: "Art. 1554 CC", region: "promesa" },
  { id: "vof_6", texto: "El vicio redhibitorio debe ser grave, oculto y existir al tiempo de la venta.", verdadero: true, explicacion: "Son los tres requisitos del vicio redhibitorio.", articulo: "arts. 1857 y ss. CC", region: "compraventa" },
  { id: "vof_7", texto: "El mandato es siempre bilateral.", verdadero: true, explicacion: "Aunque no sea remunerado, genera obligaciones para ambas partes (ejecutar/rendir cuenta y las del 2158).", articulo: "Art. 2116 CC", region: "mandato" },
  { id: "vof_8", texto: "La hipoteca es divisible: cada parte del inmueble garantiza una parte de la deuda.", verdadero: false, explicacion: "La hipoteca es indivisible: todo el inmueble garantiza la totalidad de la deuda.", articulo: "Art. 2407 CC", region: "hipoteca" },
  { id: "vof_9", texto: "La solidaridad se presume en toda obligación con pluralidad de sujetos.", verdadero: false, explicacion: "No se presume: requiere fuente (convención, testamento o ley).", articulo: "Art. 1511 CC", region: "solidaridad" },
  { id: "vof_10", texto: "El codeudor solidario que paga el total puede cobrar el total a cada uno de los demás.", verdadero: false, explicacion: "En las relaciones internas solo repite por la cuota de cada uno (contribución a la deuda).", articulo: "Art. 1522 CC", region: "solidaridad" },
  { id: "vof_11", texto: "La compensación legal opera de pleno derecho aun sin conocimiento de los deudores.", verdadero: true, explicacion: "Concurriendo los requisitos, opera por el solo ministerio de la ley.", articulo: "Art. 1656 CC", region: "extincion" },
  { id: "vof_12", texto: "La confusión extingue la obligación cuando se reúnen acreedor y deudor en una misma persona.", verdadero: true, explicacion: "Es la definición de confusión.", articulo: "Art. 1665 CC", region: "extincion" },
  { id: "vof_13", texto: "El pacto comisorio calificado contiene una cláusula de resolución ipso facto.", verdadero: true, explicacion: "Esa cláusula lo distingue del pacto comisorio simple.", articulo: "arts. 1877 y ss. CC", region: "compraventa" },
  { id: "vof_14", texto: "El tercero poseedor se ha obligado personalmente al pago de la deuda hipotecaria.", verdadero: false, explicacion: "Por definición NO se obligó personalmente; por eso procede la acción de desposeimiento.", articulo: "Art. 2428 CC", region: "hipoteca" },
  { id: "vof_15", texto: "La novación requiere ánimo de novar (animus novandi).", verdadero: true, explicacion: "Sin intención de extinguir la obligación anterior no hay novación.", articulo: "Art. 1628 CC", region: "extincion" },
  { id: "vof_16", texto: "La condición resolutoria tácita va envuelta en los contratos bilaterales.", verdadero: true, explicacion: "El 1489: ante el incumplimiento, el contratante diligente pide resolución o cumplimiento, con indemnización.", articulo: "Art. 1489 CC", region: "contratos" },
];
