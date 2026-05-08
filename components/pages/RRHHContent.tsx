"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Briefcase, FileSignature } from "lucide-react";
import MagneticFooter from "@/components/home/MagneticFooter";
import { 
  hrHeaderStagger, 
  hrWordReveal, 
  blockStagger, 
  blockReveal, 
  pillContainerStagger, 
  pillRevealLeft, 
  pillRevealRight 
} from "@/animations/hrMotion";

const BLOCKS_DATA = [
  {
    id: "mensual",
    title: "Gestión Mensual Integrada",
    description: "Administración integral de planillas y obligaciones laborales mensuales, garantizando exactitud milimétrica y cumplimiento normativo estricto.",
    icon: CalendarDays,
    image: "/images/RRHH/Gestión Mensual Integrada.jpg",
    layout: "lg:col-span-12 flex-col md:flex-row",
    pills: [
      "Elaboración de planilla (D.L. N° 728)",
      "Cálculo de sueldos (extras, bonos)",
      "Envío TXT banco BCP",
      "Boletas de pago para firma",
      "Provisiones (Vacaciones, CTS, Grat.)",
      "Pago oportuno de AFPs",
      "Impuestos de Planillas / 4ta categoría",
      "Gestión T-Registro (Altas/Bajas)"
    ]
  },
  {
    id: "anual",
    title: "Semestrales y Anuales",
    description: "Proyección y ejecución matemática de beneficios al personal, protegiendo tanto el flujo de caja corporativo como los derechos laborales.",
    icon: Briefcase,
    image: "/images/RRHH/Semestrales y Anuales.jpg",
    layout: "lg:col-span-6 flex-col",
    pills: [
      "Depósitos CTS y Cartas a entidad",
      "Proyección de Gratificaciones",
      "Certificados (ONP, AFP, 5ta)",
      "Liquidación de Beneficios - LBS",
      "Certificados de Trabajo",
      "Liberación CTS",
      "Baja T-Registro"
    ]
  },
  {
    id: "admin",
    title: "Administrativo y Adicionales",
    description: "Prevención frente a contingencias a través de una sólida infraestructura documental e intermediación ante autoridades competentes.",
    icon: FileSignature,
    image: "/images/RRHH/Administrativo y Adicionales.jpg",
    layout: "lg:col-span-6 flex-col",
    pills: [
      "Gestión de Contratos",
      "Administración Casillero Sunafil",
      "Resolución de Consultas",
      "Procesos de Ingreso / Desvinculación",
      "Respuestas a Resoluciones Judiciales",
      "Recupero de Subsidios"
    ]
  }
];

function HRCard({ block }: { block: typeof BLOCKS_DATA[0] }) {
  return (
    <motion.div 
      variants={blockReveal}
      className={`group relative bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-100 flex gap-8 md:gap-12 overflow-hidden ${block.layout}`}
    >
      <div className="flex-1 z-10 flex flex-col">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <block.icon size={28} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
          {block.title}
        </h2>
        <p className="text-slate-600 font-light text-lg mb-10 leading-relaxed max-w-2xl">
          {block.description}
        </p>

        <motion.div 
          variants={pillContainerStagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap gap-3 mt-auto"
        >
          {block.pills.map((pill, index) => (
            <motion.span 
              key={index}
              variants={index % 2 === 0 ? pillRevealLeft : pillRevealRight}
              className="rounded-full bg-slate-100 text-primary px-5 py-3 text-sm font-bold border border-transparent hover:border-secondary hover:bg-white hover:scale-105 transition-all cursor-default shadow-sm hover:shadow-md"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className={`shrink-0 w-full max-w-[280px] aspect-square rounded-full overflow-hidden self-center border-8 border-slate-50 shadow-inner hidden md:block relative z-0 mx-auto ${block.layout.includes('flex-col') ? 'mt-8' : ''}`}>
        <Image 
          src={block.image}
          alt={block.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}

export function RRHHContent() {
  const headline = "Tranquilidad Legal y Gestión de Planillas sin Fricción";
  const words = headline.split(" ");

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-secondary selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-24 px-6 lg:px-8 overflow-hidden z-0">
        {/* Subtle Radial Gradient Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-0"
          style={{ background: "radial-gradient(circle at 70% 30%, rgba(22, 121, 171, 0.15) 0%, transparent 60%)" }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 uppercase tracking-widest text-sm font-bold bg-white px-6 py-2 rounded-full shadow-sm hover:shadow-md">
               <ArrowLeft className="w-4 h-4" /> Volver al Inicio
            </Link>

            <motion.h1 
              variants={hrHeaderStagger}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight max-w-6xl"
            >
              {words.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={hrWordReveal} 
                  className="inline-block mr-3 lg:mr-5 mb-2 lg:mb-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-slate-500 mt-8 text-xl lg:text-2xl font-light max-w-3xl"
            >
              Infraestructura administrativa diseñada para blindar a su empresa ante inspecciones laborales, optimizando el cálculo y pago de beneficios de forma impecable.
            </motion.p>
        </div>
      </section>

      {/* Dashboard Section / Cards */}
      <section className="relative w-full px-6 lg:px-8 pb-32 z-10">
        <motion.div 
          variants={blockStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {BLOCKS_DATA.map((block) => (
             <HRCard key={block.id} block={block} />
          ))}
        </motion.div>
      </section>

      {/* Magnetic Footer */}
      <MagneticFooter />
    </main>
  );
}
