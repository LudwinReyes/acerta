"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import MagneticFooter from "@/components/home/MagneticFooter";
import { heroHeaderStagger, heroWordReveal, serviceCardVariants } from "@/animations/stickyScrollMotion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const SERVICES_DATA = [
  {
    id: "01",
    title: "Consultoría en contabilidad financiera y tributaria (NIIF).",
    description: "Aplicación rigurosa de las Normas Internacionales de Información Financiera (NIIF). Evaluamos el impacto de las transacciones y garantizamos la presentación razonable de sus estados para accionistas y reguladores.",
    image: "/images/contabilidad/Consultoría en contabilidad financiera y tributaria (NIIF).jpg"
  },
  {
    id: "02",
    title: "Elaboración y análisis de estados financieros.",
    description: "Convertimos datos crudos en inteligencia de negocios. Presentamos reportes estructurales dinámicos que reflejan la verdadera salud financiera de su empresa con métricas precisas y accionables.",
    image: "/images/contabilidad/Elaboración y análisis de estados financieros.jpg"
  },
  {
    id: "03",
    title: "Diagnóstico financiero independiente (NIA y NIIF).",
    description: "Auditorías de valoración y salud estructural siguiendo estándares NIA, identificando riesgos latentes, ineficiencias de capital y proponiendo rutas de consolidación patrimonial.",
    image: "/images/contabilidad/Diagnóstico financiero independiente (NIA y NIIF).jpg"
  },
  {
    id: "04",
    title: "Auditorías internas y revisiones especiales.",
    description: "Evaluamos el diseño y la eficacia operativa de los controles internos para mitigar riesgos de fraude, asegurando la custodia y eficiencia de los procesos críticos.",
    image: "/images/contabilidad/Auditorías internas y revisiones especiales.jpg"
  },
  {
    id: "05",
    title: "Diagnóstico y optimización de procesos contables.",
    description: "Reingeniería de flujos de trabajo financieros. Eliminamos redundancias, automatizamos tareas repetitivas y aceleramos los ciclos de cierre contable mensual.",
    image: "/images/contabilidad/Diagnóstico y optimización de procesos contables.jpg"
  },
  {
    id: "06",
    title: "Outsourcing contable y financiero.",
    description: "Delegue la totalidad de su back-office a nuestro equipo de élite. Asumimos la gestión integral, desde la teneduría de libros hasta el cumplimiento tributario inmaculado.",
    image: "/images/contabilidad/Outsourcing contable y financiero.jpg"
  },
  {
    id: "07",
    title: "Reestructuración empresarial y due diligence financiero.",
    description: "Acompañamiento especializado en procesos de fusión, adquisición o escisión. Validamos presupuestos, contingencias fiscales y proyecciones de caja para asegurar transacciones exitosas.",
    image: "/images/contabilidad/Reestructuración empresarial y due diligence financiero.jpg"
  },
  {
    id: "08",
    title: "Capacitación empresarial en finanzas.",
    description: "Programas in-house diseñados para empoderar a sus tomadores de decisiones. Elevamos la cultura financiera de su organización mediante entrenamiento inmersivo en finanzas corporativas.",
    image: "/images/contabilidad/Capacitación empresarial en finanzas.jpg"
  }
];

// Card component with fade on top exit
function ServiceCard({ data }: { data: typeof SERVICES_DATA[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track this specific card's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate opacity: full opacity when entering, slightly fading to 0.3 as it leaves the top
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      variants={serviceCardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }}
      className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row gap-10 items-center justify-between min-h-[40vh] overflow-hidden"
    >
      <div className="flex-1 w-full flex flex-col">
        <span className="text-secondary font-black text-6xl md:text-8xl opacity-20 mb-4">{data.id}</span>
        <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 drop-shadow-sm leading-tight">
          {data.title}
        </h3>
        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed mb-8">
          {data.description}
        </p>
        <div className="mt-auto">
          <Link href="/contacto" className="inline-flex items-center gap-3 text-primary font-bold hover:text-secondary transition-colors group cursor-pointer">
            <CheckCircle2 className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
            Solicitar Evaluación
          </Link>
        </div>
      </div>
      
      <div className="w-full md:w-5/12 aspect-square max-w-[300px] shrink-0">
        <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-slate-50 shadow-inner">
          <Image 
            src={data.image}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ContabilidadPage() {
  const headline = "Claridad Financiera. Crecimiento Escalable.";
  const words = headline.split(" ");
  
  // Track scroll for the entire services section to power the circular progress
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full bg-primary pt-32 pb-40 px-6 lg:px-8 overflow-hidden">
        {/* Massive blurred ellipse  */}
        <div 
          className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-secondary/30 pointer-events-none translate-x-1/3 -translate-y-1/3 z-0"
          style={{ clipPath: "ellipse(50% 50% at 50% 50%)", filter: "blur(100px)" }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12 uppercase tracking-widest text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <motion.h1 
            variants={heroHeaderStagger}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight max-w-5xl"
          >
            {words.map((word, i) => (
              <motion.span 
                key={i} 
                variants={heroWordReveal} 
                className="inline-block mr-3 lg:mr-5 mb-2 lg:mb-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>

      {/* Sticky Scroll Section */}
      <section ref={containerRef} className="relative w-full px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Panel - Sticky */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-32 flex flex-col items-start">
              <h2 className="text-5xl xl:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Nuestros <br/> Servicios
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-sm font-light">
                Metodologías comprobadas que blindan su rentabilidad operativa.
              </p>

              {/* SVG Circular Progress */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Track */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className="text-slate-200" 
                  />
                  {/* Progress */}
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    className="text-primary"
                    style={{ pathLength: scrollYProgress }}
                  />
                </svg>
                {/* Center Icon or Label */}
                <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl uppercase tracking-widest">
                  Info
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Scrolling Cards */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-24">
            {/* Mobile Header (Shows only on small screens) */}
            <div className="lg:hidden mb-8">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Nuestros Servicios</h2>
              <p className="text-lg text-slate-600 font-light">Metodologías comprobadas que blindan su rentabilidad operativa.</p>
            </div>

            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.id} data={service} />
            ))}
          </div>

        </div>
      </section>

      <MagneticFooter />
    </main>
  );
}
