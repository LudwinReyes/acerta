"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { 
  bentoHeaderStagger, 
  bentoWordReveal, 
  bentoGridContainer, 
  bentoCard1, 
  bentoCard2, 
  bentoCard3 
} from "@/animations/bentoMotion";
import { Calculator, Code2, Users } from "lucide-react";

export default function BentoSolutions() {
  const headline = "Soluciones modulares para escalar tu operación";
  const words = headline.split(" ");

  return (
    <section className="relative w-full bg-slate-50 py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
           <motion.h2 
             variants={bentoHeaderStagger}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-tight"
           >
             {words.map((word, i) => (
               <motion.span 
                 key={i} 
                 variants={bentoWordReveal} 
                 className="inline-block mr-2 lg:mr-3 mb-1"
               >
                 {word}
               </motion.span>
             ))}
           </motion.h2>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={bentoGridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {/* Card 1: Contabilidad */}
          <motion.div 
            variants={bentoCard1}
            className="group relative lg:col-span-3 flex flex-col md:flex-row bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col p-8 md:p-10 md:w-1/2">
               <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Calculator size={28} />
               </div>
               <h3 className="text-3xl font-bold text-slate-900 mb-4">Contabilidad y Finanzas</h3>
               <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                 Outsourcing confiable, adaptación a normas NIIF y un diagnóstico financiero profundo para blindar rentabilidad.
               </p>
               <div className="mt-auto pt-4">
                 <Link href="/contabilidad" className="inline-flex px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                   Ver servicios
                 </Link>
               </div>
            </div>
            
            <div className="relative z-10 p-6 md:p-8 md:pl-0 md:w-1/2 flex items-center justify-center w-full min-h-[250px] overflow-hidden">
               <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-100">
                  <Image 
                    src="/images/inicio/Contabilidad y Finanzas.jpeg" 
                    alt="Finanzas abstract"
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </div>
          </motion.div>

          {/* Card 2: Software */}
          <motion.div 
            variants={bentoCard2}
            className="group relative lg:col-span-2 lg:row-span-2 flex flex-col bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden min-h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col p-8 md:p-10 flex-grow">
               <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Code2 size={28} />
               </div>
               <h3 className="text-3xl font-bold text-slate-900 mb-4">Software a Medida</h3>
               <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                 Automatizamos tu operación con Integraciones SUNAT/RENIEC robustas, aplicaciones en Next.js y UIs potenciadas con IA.
               </p>
               <div className="mt-8 relative w-full flex-grow rounded-[2rem] overflow-hidden min-h-[250px] bg-slate-100">
                  <Image 
                    src="/images/inicio/Software a Medida.jpeg" 
                    alt="Code & UI Interface"
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105 object-center"
                    referrerPolicy="no-referrer"
                  />
               </div>
               <div className="mt-10">
                 <Link href="/software" className="inline-flex w-full justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                   Ver servicios
                 </Link>
               </div>
            </div>
          </motion.div>

          {/* Card 3: RRHH */}
          <motion.div 
            variants={bentoCard3}
            className="group relative lg:col-span-3 flex flex-col md:flex-row-reverse bg-white/70 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col p-8 md:p-10 md:w-1/2">
               <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Users size={28} />
               </div>
               <h3 className="text-3xl font-bold text-slate-900 mb-4">RRHH y Nóminas</h3>
               <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                 Expertise en Gestión de Planillas, cálculo de CTS y administración impecable de T-Registro para tranquilidad total.
               </p>
               <div className="mt-auto pt-4 flex">
                 <Link href="/rrhh" className="inline-flex px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                   Ver servicios
                 </Link>
               </div>
            </div>
            
            <div className="relative z-10 p-6 md:p-8 md:pr-0 md:w-1/2 flex items-center justify-center w-full min-h-[250px] overflow-hidden">
               <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-100">
                  <Image 
                    src="/images/inicio/RRHH y Nóminas.jpeg" 
                    alt="RRHH abstract"
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
               </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
