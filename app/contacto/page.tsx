import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: 'Contacto y Asesoría Gratuita | Acerta',
  description: 'Inicia tu transformación corporativa. Solicita un diagnóstico gratuito para contabilidad, software o gestión de RRHH. Estamos en Lima, Perú.',
  keywords: ['contacto acerta', 'asesoria contable gratuita', 'cotizacion software', 'consultoria empresarial lima'],
};

export default function ContactoPage() {
  return <ContactForm />;
}
