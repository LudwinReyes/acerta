import { Metadata } from "next";
import { PayrollCalculator } from "@/components/tools/PayrollCalculator";

export const metadata: Metadata = {
  title: 'Calculadora de Nóminas y Costo Laboral | Acerta',
  description: 'Simula el costo total de un trabajador y el sueldo neto que percibirá. Incluye Essalud, CTS, Gratificaciones y retenciones de 5ta categoría.',
  keywords: ['calculadora planillas', 'costo laboral peru', 'sueldo neto', 'retencion 5ta categoria', 'cts y gratificaciones'],
};

export default function CalculadoraNominasPage() {
  return <PayrollCalculator />;
}
