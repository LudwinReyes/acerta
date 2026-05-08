import { Metadata } from "next";
import { NosotrosContent } from "@/components/pages/NosotrosContent";

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Acerta',
  description: 'Conoce la filosofía, metodología y liderazgo de Acerta. Expertos en consultoría corporativa de alto impacto liderados por Victor Yactayo.',
  keywords: ['Victor Yactayo', 'filosofia corporativa', 'metodologia acerta', 'consultoria elite peru'],
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
