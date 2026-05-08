import { Metadata } from "next";
import { ToolsList } from "@/components/tools/ToolsList";

export const metadata: Metadata = {
  title: 'Herramientas y Calculadoras Inteligentes | Acerta',
  description: 'Accede a nuestras herramientas de simulación tributaria y cálculo de nóminas. Datos precisos para la toma de decisiones financieras en tu empresa.',
  keywords: ['calculadora tributaria', 'calculo de planillas', 'herramientas financieras', 'simulador impuestos peru'],
};

export default function HerramientasPage() {
  return <ToolsList />;
}
