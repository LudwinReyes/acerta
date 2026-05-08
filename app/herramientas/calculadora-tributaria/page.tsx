import { Metadata } from "next";
import { TaxCalculator } from "@/components/tools/TaxCalculator";

export const metadata: Metadata = {
  title: 'Calculadora Tributaria Pro | Acerta',
  description: 'Simula el Impuesto a la Renta de 4ta y 5ta categoría para Perú, Chile y Colombia. Optimiza tu carga impositiva con proyecciones precisas.',
  keywords: ['impuesto a la renta', 'calculadora tributaria', 'renta 4ta categoria', 'renta 5ta categoria', 'planificacion fiscal'],
};

export default function CalculadoraTributariaPage() {
  return <TaxCalculator />;
}
