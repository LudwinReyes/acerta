import { Metadata } from "next";
import { RRHHContent } from "@/components/pages/RRHHContent";

export const metadata: Metadata = {
  title: 'Gestión de RRHH y Planillas | Acerta',
  description: 'Gestión integral de planillas (D.L. 728), T-Registro, liquidaciones y cumplimiento Sunafil. Tranquilidad legal y operativa para tu empresa.',
  keywords: ['gestion de planillas', 'recursos humanos', 'sunafil', 't-registro', 'liquidación de beneficios'],
};

export default function RRHHPage() {
  return <RRHHContent />;
}
