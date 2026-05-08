export type PayrollInput = {
  sueldoBase: number;
  bonificaciones: number;
  tieneAsignacionFamiliar: boolean;
  sistemaPension: 'ONP' | 'AFP';
};

export type PayrollResult = {
  brutoMensual: number;
  descuentoPension: number;
  renta5taMensual: number;
  netoMensual: number;
  costoEssalud: number;
  provisionCTS: number;
  provisionGratificacion: number;
  costoTotalEmpresa: number;
  superaTramo5UIT: boolean;
  smartInsights: string[];
};

export const UIT_2026 = 5500;
export const RMV_2026 = 1130;
export const ASIG_FAMILIAR = RMV_2026 * 0.10;

export function calculatePayroll(input: PayrollInput): PayrollResult {
  const { sueldoBase, bonificaciones, tieneAsignacionFamiliar, sistemaPension } = input;

  // 1. Ingreso Bruto Mensual
  const asignacion = tieneAsignacionFamiliar ? ASIG_FAMILIAR : 0;
  const brutoMensual = sueldoBase + bonificaciones + asignacion;

  // 2. Descuentos Ley (Pensión)
  // AFP Promedio: 10% Aporte + 1.84% Seguro + 1.6% Comisión = 13.44%
  const tasaPension = sistemaPension === 'ONP' ? 0.13 : 0.1344;
  const descuentoPension = brutoMensual * tasaPension;

  // 3. Renta de 5ta Categoría (Proyección Anual simplificada)
  const ingresoAnualProyectado = brutoMensual * 14; 
  const deduccion7UIT = 7 * UIT_2026;
  const rentaNetaAnual = Math.max(0, ingresoAnualProyectado - deduccion7UIT);

  let impuestoAnual = 0;
  let remaining = rentaNetaAnual;
  
  const bands = [
    { limit: 5 * UIT_2026, rate: 0.08 },
    { limit: 15 * UIT_2026, rate: 0.14 },
    { limit: 15 * UIT_2026, rate: 0.17 },
    { limit: 10 * UIT_2026, rate: 0.20 },
    { limit: Infinity, rate: 0.30 }
  ];

  let superaTramo5UIT = false;

  for (const band of bands) {
    if (remaining <= 0) break;
    const taxable = Math.min(remaining, band.limit);
    const taxInBand = taxable * band.rate;
    impuestoAnual += taxInBand;
    if (taxInBand > 0 && band.rate > 0.08) {
      superaTramo5UIT = true;
    }
    remaining -= taxable;
  }

  const renta5taMensual = impuestoAnual / 12;

  // 4. Sueldo Neto Mensual
  const netoMensual = brutoMensual - descuentoPension - renta5taMensual;

  // 5. Costos Laborales Empresa (Mensualizado)
  const costoEssalud = brutoMensual * 0.09;
  
  // Gratificación anual = 2 sueldos + 9% bono extraordinario. Mensualizado: (2*Bruto*1.09) / 12 = Bruto * 1.09 / 6
  const provisionGratificacion = (brutoMensual * 1.09) / 6;

  // CTS anual = 1 sueldo + 1/6 gratificación. Mensualizado = (Bruto + Bruto/6) / 12
  const provisionCTS = (brutoMensual + (brutoMensual / 6)) / 12;

  const costoTotalEmpresa = brutoMensual + costoEssalud + provisionCTS + provisionGratificacion;

  // 6. Smart Insights
  const smartInsights = [];
  if (bonificaciones > 0) {
    smartInsights.push(`Tip: Optimizar las bonificaciones a esquemas no remunerativos podría reducir tu sobrecosto laboral de Essalud en un ${(0.09 * bonificaciones / costoTotalEmpresa * 100).toFixed(1)}%.`);
  }
  if (superaTramo5UIT) {
    smartInsights.push(`Alerta fiscal: Este salario ha superado la escala básica del 8% en Renta de 5ta categoría. Se aplica retención progresiva mayor al 14%.`);
  }
  if (sistemaPension === 'ONP') {
    smartInsights.push(`Recordatorio: El aporte a la ONP es un fondo común, a diferencia de la cuenta individual de capitalización en la AFP.`);
  }

  return {
    brutoMensual,
    descuentoPension,
    renta5taMensual,
    netoMensual,
    costoEssalud,
    provisionCTS,
    provisionGratificacion,
    costoTotalEmpresa,
    superaTramo5UIT,
    smartInsights
  };
}
