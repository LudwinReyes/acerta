export type CountryConfig = {
  id: string;
  name: string;
  currency: string;
  taxName: string;
  taxRate: number;
  flag: string;
};

export const COUNTRIES: CountryConfig[] = [
  { id: "pe", name: "Perú", currency: "PEN", taxName: "IGV", taxRate: 0.18, flag: "🇵🇪" },
  { id: "co", name: "Colombia", currency: "COP", taxName: "IVA", taxRate: 0.19, flag: "🇨🇴" },
  { id: "cl", name: "Chile", currency: "CLP", taxName: "IVA", taxRate: 0.19, flag: "🇨🇱" },
];

export function calculateTaxes(baseAmount: number, countryId: string) {
  const country = COUNTRIES.find((c) => c.id === countryId) || COUNTRIES[0];
  const taxAmount = baseAmount * country.taxRate;
  const totalAmount = baseAmount + taxAmount;

  return {
    baseAmount,
    taxAmount,
    totalAmount,
    taxName: country.taxName,
    taxRate: country.taxRate,
    currency: country.currency
  };
}
