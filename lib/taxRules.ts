export type TaxBreakdown = {
  etiqueta: string;
  valor: number;
};

export type TaxResult = {
  ingresoBrutoAnual: number;
  deducciones: number;
  impuestoTotal: number;
  aportesLey: number;
  ingresoNetoAnual: number;
  tasaEfectiva: number;
  breakdown: TaxBreakdown[];
  mensajesInteligentes: string;
};

export type CountryTaxConfig = {
  id: string;
  name: string;
  currency: string;
  flag: string;
};

export const COUNTRIES_TAX: CountryTaxConfig[] = [
  { id: "pe", name: "Perú", currency: "PEN", flag: "🇵🇪" },
  { id: "cl", name: "Chile", currency: "CLP", flag: "🇨🇱" },
  { id: "co", name: "Colombia", currency: "COP", flag: "🇨🇴" },
];

export function calculateTax(countryId: string, income: number, additionalDeductions: number): TaxResult {
  switch (countryId) {
    case "pe":
      return calculatePeru(income, additionalDeductions);
    case "cl":
      return calculateChile(income, additionalDeductions);
    case "co":
      return calculateColombia(income, additionalDeductions);
    default:
      return calculatePeru(income, additionalDeductions);
  }
}

function calculatePeru(brutoMensual: number, gastosDeduciblesAnuales: number): TaxResult {
  const PE_UIT = 5500; // UIT 2026
  const ingresoBrutoAnual = brutoMensual * 14; 
  
  const deduccionBase = 7 * PE_UIT;
  const deduccionAdicional = Math.min(gastosDeduciblesAnuales, 3 * PE_UIT);
  const totalDeducciones = deduccionBase + deduccionAdicional;
  
  let rentaNetaImponible = ingresoBrutoAnual - totalDeducciones;
  if (rentaNetaImponible < 0) rentaNetaImponible = 0;

  let impuestoTotal = 0;
  let remaining = rentaNetaImponible;
  const breakdown: TaxBreakdown[] = [];

  const bands = [
    { limit: 5 * PE_UIT, rate: 0.08, label: "8%" },
    { limit: 15 * PE_UIT, rate: 0.14, label: "14%" },
    { limit: 15 * PE_UIT, rate: 0.17, label: "17%" },
    { limit: 10 * PE_UIT, rate: 0.20, label: "20%" },
    { limit: Infinity, rate: 0.30, label: "30%" }
  ];

  let maxTramo = "0%";
  for (const band of bands) {
    if (remaining <= 0) break;
    const taxableAmount = Math.min(remaining, band.limit);
    const taxInBand = taxableAmount * band.rate;
    
    impuestoTotal += taxInBand;
    if (taxInBand > 0) {
      breakdown.push({ etiqueta: `Tramo ${band.label}`, valor: taxInBand });
      maxTramo = band.label;
    }
    remaining -= taxableAmount;
  }

  let mensajesInteligentes = "Aún no alcanzas el límite imponible. No pagas impuesto a la renta.";
  if (impuestoTotal > 0) {
    mensajesInteligentes = `El tramo máximo que alcanzas tributa al ${maxTramo}. ¡Aprovecha el límite de deducciones de 3 UIT para optimizar tu carga!`;
  }

  return {
    ingresoBrutoAnual,
    deducciones: totalDeducciones,
    impuestoTotal,
    aportesLey: 0,
    ingresoNetoAnual: ingresoBrutoAnual - impuestoTotal,
    tasaEfectiva: impuestoTotal / (ingresoBrutoAnual || 1),
    breakdown,
    mensajesInteligentes
  };
}

function calculateChile(brutoMensual: number, gastosDeduciblesAnuales: number): TaxResult {
  const CL_UTM = 65000;
  // Deducciones permitidas mensual
  const afp = brutoMensual * 0.10;
  const salud = brutoMensual * 0.07;
  const baseImponibleMensual = brutoMensual - afp - salud - (gastosDeduciblesAnuales / 12);
  
  const imponibleUTM = baseImponibleMensual < 0 ? 0 : baseImponibleMensual / CL_UTM;

  let impuestoUTMMensual = 0;
  const breakdownMensual: TaxBreakdown[] = [];

  const bands = [
    { limit: 13.5, rate: 0.00, label: "Exento" },
    { limit: 16.5, rate: 0.04, label: "4%" },
    { limit: 20, rate: 0.08, label: "8%" },
    { limit: 20, rate: 0.135, label: "13.5%" },
    { limit: 20, rate: 0.23, label: "23%" },
    { limit: 30, rate: 0.304, label: "30.4%" },
    { limit: Infinity, rate: 0.35, label: "35%" } // The prompt says 90-120 (30.4%), +120 (35%). Let's adjust to infinite.
  ];

  let remaining = imponibleUTM;
  let maxTramo = "Exento";
  
  for (const band of bands) {
    if (remaining <= 0) break;
    const taxableAmount = Math.min(remaining, band.limit);
    const taxInBand = taxableAmount * band.rate;
    
    impuestoUTMMensual += taxInBand;
    if (taxInBand > 0) {
      breakdownMensual.push({ etiqueta: `Tramo ${band.label}`, valor: taxInBand * CL_UTM * 12 });
      maxTramo = band.label;
    }
    remaining -= taxableAmount;
  }

  const impuestoAnual = impuestoUTMMensual * CL_UTM * 12;
  const ingresoBrutoAnual = brutoMensual * 12;
  const deduccionesTotalAnual = (afp + salud) * 12 + gastosDeduciblesAnuales;

  let mensajesInteligentes = "Estás exento del Impuesto Único de Segunda Categoría.";
  if (impuestoAnual > 0) {
    mensajesInteligentes = `Llegas a un impuesto marginal del ${maxTramo}. Estás financiando sistema de salud y pensiones con tus aportes.`;
  }

  return {
    ingresoBrutoAnual,
    deducciones: deduccionesTotalAnual,
    impuestoTotal: impuestoAnual,
    aportesLey: (afp + salud) * 12,
    ingresoNetoAnual: ingresoBrutoAnual - impuestoAnual - (afp + salud) * 12, // Consider social security as paid
    tasaEfectiva: impuestoAnual / (ingresoBrutoAnual || 1),
    breakdown: breakdownMensual,
    mensajesInteligentes
  };
}

function calculateColombia(brutoMensual: number, gastosDeduciblesAnuales: number): TaxResult {
  const CO_UVT = 47065;
  const ingresoBrutoAnual = brutoMensual * 12;

  // Deducción automática: 25% Renta Exenta (límite anual aprox 790 UVT)
  const limiteRentaExenta = 790 * CO_UVT;
  const rentaExenta = Math.min(ingresoBrutoAnual * 0.25, limiteRentaExenta);
  
  // Cap de deducciones: 40% del neto con tope 1340 UVT
  const topeDeducciones = Math.min(1340 * CO_UVT, ingresoBrutoAnual * 0.40);
  const deduccionesTotales = Math.min(rentaExenta + gastosDeduciblesAnuales, topeDeducciones);
  
  const rentaNetaImponible = Math.max(0, ingresoBrutoAnual - deduccionesTotales);
  const rentaUVT = rentaNetaImponible / CO_UVT;

  let impuestoUVT = 0;
  const breakdown: TaxBreakdown[] = [];
  let maxTramo = "0%";

  if (rentaUVT > 1090) {
    if (rentaUVT <= 1700) {
      const tax = (rentaUVT - 1090) * 0.19;
      impuestoUVT = tax;
      breakdown.push({ etiqueta: 'Tramo 19%', valor: tax * CO_UVT });
      maxTramo = "19%";
    } else if (rentaUVT <= 4100) {
      const tax = (rentaUVT - 1700) * 0.28 + 116;
      impuestoUVT = tax;
      breakdown.push({ etiqueta: 'Tramo 19%', valor: 116 * CO_UVT });
      breakdown.push({ etiqueta: 'Tramo 28%', valor: (rentaUVT - 1700) * 0.28 * CO_UVT });
      maxTramo = "28%";
    } else if (rentaUVT <= 8670) {
      const tax = (rentaUVT - 4100) * 0.33 + 788;
      impuestoUVT = tax;
      breakdown.push({ etiqueta: 'Tramos Previos', valor: 788 * CO_UVT });
      breakdown.push({ etiqueta: 'Tramo 33%', valor: (rentaUVT - 4100) * 0.33 * CO_UVT });
      maxTramo = "33%";
    } else if (rentaUVT <= 18970) {
      const tax = (rentaUVT - 8670) * 0.35 + 2296;
      impuestoUVT = tax;
      breakdown.push({ etiqueta: 'Tramos Previos', valor: 2296 * CO_UVT });
      breakdown.push({ etiqueta: 'Tramo 35%', valor: (rentaUVT - 8670) * 0.35 * CO_UVT });
      maxTramo = "35%";
    } else if (rentaUVT <= 31000) {
      const tax = (rentaUVT - 18970) * 0.37 + 5901;
      impuestoUVT = tax;
      breakdown.push({ etiqueta: 'Tramos Previos', valor: 5901 * CO_UVT });
      breakdown.push({ etiqueta: 'Tramo 37%', valor: (rentaUVT - 18970) * 0.37 * CO_UVT });
      maxTramo = "37%";
    } else {
      const tax = (rentaUVT - 31000) * 0.39 + 10352;
      impuestoUVT = tax;
      breakdown.push({ etiqueta: 'Tramos Previos', valor: 10352 * CO_UVT });
      breakdown.push({ etiqueta: 'Tramo 39%', valor: (rentaUVT - 31000) * 0.39 * CO_UVT });
      maxTramo = "39%";
    }
  }

  const impuestoTotal = impuestoUVT * CO_UVT;
  
  let mensajesInteligentes = "Tus ingresos no alcanzan el umbral para declarar impuesto de renta.";
  if (impuestoTotal > 0) {
    mensajesInteligentes = `Beneficio de UVT aplicado. Llegaste al tramo marginal del ${maxTramo}.`;
  }

  return {
    ingresoBrutoAnual,
    deducciones: deduccionesTotales,
    impuestoTotal,
    aportesLey: 0,
    ingresoNetoAnual: ingresoBrutoAnual - impuestoTotal,
    tasaEfectiva: impuestoTotal / (ingresoBrutoAnual || 1),
    breakdown,
    mensajesInteligentes
  };
}
