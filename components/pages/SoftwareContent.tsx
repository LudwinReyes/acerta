"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code2, Cpu, Database, Laptop, LayoutDashboard, MonitorSmartphone, Share2, ShoppingCart } from "lucide-react";
import MagneticFooter from "@/components/home/MagneticFooter";
import { techStagger, techCardEntry, typewriterStagger, typewriterChar, use3DTilt } from "@/animations/techMotion";

const SOFTWARE_SERVICES = [
  {
    id: "web",
    title: "Diseño y Desarrollo de Páginas Web",
    description: "Interfaces optimizadas para SEO y conversión. Construimos sitios corporativos fluidos integrados con herramientas de marketing.",
    icon: Laptop,
    colSpan: "col-span-1",
    image: "/images/software/Diseño y Desarrollo de Páginas Web.jpg"
  },
  {
    id: "custom",
    title: "Desarrollo de Software a Medida",
    description: "Aplicaciones Web y Mobile diseñadas para cubrir necesidades específicas: Gestión de reservas, plataformas robustas, Delivery y control interno.",
    icon: Code2,
    colSpan: "col-span-1 lg:col-span-2",
    image: "/images/software/Desarrollo de Software a Medida.jpg"
  },
  {
    id: "apis",
    title: "Integración de APIs y Sistemas",
    description: "Conectamos tu ecosistema digital. Integraciones robustas con ERPs convencionales, pasarelas de pago, SUNAT, RENIEC y plataformas externas.",
    icon: Share2,
    colSpan: "col-span-1",
    image: "/images/software/Integración de APIs y Sistemas.jpg"
  },
  {
    id: "consulting",
    title: "Consultoría en Transformación Digital",
    description: "Trazamos el roadmap tecnológico de tu empresa. Diagnóstico de madurez digital, plan de acción y gestión ágil del cambio organizacional.",
    icon: LayoutDashboard,
    colSpan: "col-span-1",
    image: "/images/software/Consultoría en Transformación Digital.jpg"
  },
  {
    id: "crm",
    title: "Implementación de CRM",
    description: "Despliegue y configuración de ecosistemas comerciales líderes (HubSpot, Salesforce). Automatizamos procesos y aceleramos tu pipeline de ventas.",
    icon: MonitorSmartphone,
    colSpan: "col-span-1",
    image: "/images/software/Implementación de CRM.jpg"
  },
  {
    id: "ai",
    title: "UIs con IA Integrada",
    description: "Elevación de UX mediante IA. Asistentes virtuales generativos, autocompletado inteligente y la predicción exacta de intenciones del usuario.",
    icon: Cpu,
    colSpan: "col-span-1 lg:col-span-2",
    image: "/images/software/UIs con IA Integrada.jpg"
  },
  {
    id: "ecommerce",
    title: "Desarrollo de E-commerce",
    description: "Tiendas virtuales escalables y veloces. Pasarelas integradas, control de inventario y UX optimizada específicamente para altos ratios de conversión.",
    icon: ShoppingCart,
    colSpan: "col-span-1",
    image: "/images/software/Desarrollo de E-commerce.jpg"
  },
  {
    id: "data",
    title: "Soluciones de Big Data",
    description: "Arquitecturas de alto volumen (Kafka, Spark) y Dashboards analíticos avanzados (Power BI, Looker) para decisiones milisegundo en tiempo real.",
    icon: Database,
    colSpan: "col-span-1 lg:col-span-3",
    image: "/images/software/Soluciones de Big Data.jpg"
  }
];

function TiltCard({ service }: { service: typeof SOFTWARE_SERVICES[0] }) {
  const { ref, rotateX, rotateY, glowBackground, handleMouseMove, handleMouseLeave } = use3DTilt();

  return (
    <motion.div
      ref={ref}
      variants={techCardEntry}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`relative group flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl h-full min-h-[400px] ${service.colSpan}`}
    >
      {/* Dynamic Cursor Glow Effect */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glowBackground }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
         <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-8 text-secondary backdrop-blur-md">
           <service.icon size={32} strokeWidth={1.5} />
         </div>
         
         <div className="flex-grow z-10">
           <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
             {service.title}
           </h3>
           <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
             {service.description}
           </p>
         </div>
      </div>
      
      {/* Background Image Element */}
      <div className="absolute right-0 bottom-0 w-3/4 h-3/4 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0 rounded-tl-[100%] overflow-hidden blur-[2px] mix-blend-screen scale-110 group-hover:scale-100">
          <Image 
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-transparent to-transparent z-10" />
      </div>

    </motion.div>
  );
}

export function SoftwareContent() {
  const headline = "Ingeniería de Software para la Nueva Era Digital";
  const chars = headline.split("");

  return (
    <main className="bg-[#050D1A] min-h-screen selection:bg-secondary selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-32 px-6 lg:px-8 overflow-hidden z-0">
        {/* Dark Mode blurred orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start pt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-16 uppercase tracking-widest text-sm font-bold">
               <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>

            <motion.h1 
              variants={typewriterStagger}
              initial="hidden"
              animate="show"
              className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-white leading-[1.1] tracking-tight max-w-5xl"
            >
              <span className="text-secondary mr-2">{">_"}</span>
              {chars.map((char, i) => (
                <motion.span 
                  key={i} 
                  variants={typewriterChar}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[0.4em] h-[1em] bg-secondary ml-1 align-middle -mt-2"
              />
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-slate-400 mt-8 text-xl lg:text-2xl font-light max-w-3xl"
            >
              Diseñamos ecosistemas digitales escalables. Elevamos interfaces mediante IA y construimos arquitecturas de Big Data listas para dominar el mercado.
            </motion.p>
        </div>
      </section>

      {/* Bento Grid Magnetic UI */}
      <section className="relative w-full px-6 lg:px-8 pb-40 z-10">
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={techStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SOFTWARE_SERVICES.map((s) => <TiltCard key={s.id} service={s} />)}
        </motion.div>
      </section>

      {/* The Magnetic Footer handles dark/light seamlessly */}
      <MagneticFooter />
      
    </main>
  );
}
