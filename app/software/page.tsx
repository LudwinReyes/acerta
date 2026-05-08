import { Metadata } from "next";
import { SoftwareContent } from "@/components/pages/SoftwareContent";

export const metadata: Metadata = {
  title: 'Desarrollo de Software y Transformación Digital | Acerta',
  description: 'Desarrollo de software a medida, e-commerce, integración de APIs y soluciones con IA. Transformamos tu empresa con ingeniería de vanguardia.',
  keywords: ['desarrollo de software', 'transformacion digital', 'ecommerce peru', 'inteligencia artificial', 'crm implementation'],
};

export default function SoftwarePage() {
  return <SoftwareContent />;
}
