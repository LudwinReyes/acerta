"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import MagneticFooter from "@/components/home/MagneticFooter";
import { toolHeaderStagger, toolWordReveal } from "@/animations/toolsMotion";

export function ToolsList() {
  const headline = "Herramientas Inteligentes para tu Crecimiento";
  const words = headline.split(" ");
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) setMounted(true);
    }, 0);
    return () => { isMounted = false; };
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#1679AB] selection:text-white pb-32">
      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-20 px-6 lg:px-8 z-0">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            variants={toolHeaderStagger}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight"
          >
            {words.map((word, i) => (
              <motion.span 
                key={i} 
                variants={toolWordReveal} 
                className="inline-block mr-3 lg:mr-5 mb-2 lg:mb-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-slate-500 mt-6 text-xl lg:text-2xl font-light"
          >
            Suite de herramientas financieras y operativas diseñadas para empoderar su negocio.
          </motion.p>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Tool Card 1 */}
          <Link href="/herramientas/calculadora-tributaria" className="group block">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative bg-white rounded-[2.5rem] p-8 h-full flex flex-col gap-6 overflow-hidden border-2 border-transparent transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:border-[#1679AB] group-hover:shadow-[0_20px_40px_-15px_rgba(22,121,171,0.3)]"
            >
              {/* Abstract Graphic Array */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 bg-[#1679AB]/10 translate-x-1/3 -translate-y-1/3 transition-transform duration-700 ease-in-out group-hover:scale-150 group-hover:bg-[#1679AB]/20"
                style={{ clipPath: "circle(50% at 50% 50%)" }}
              />
              <div 
                className="absolute top-10 right-10 w-32 h-32 bg-[#102C57]/10 translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-in-out group-hover:scale-125 group-hover:-translate-x-4 group-hover:translate-y-4"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              />
              
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-[#102C57] relative z-10 transition-colors duration-500 group-hover:bg-[#1679AB] group-hover:text-white shadow-sm group-hover:shadow-md">
                <Calculator className="w-8 h-8" />
              </div>
              
              <div className="flex flex-col gap-3 relative z-10 mt-4">
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-[#102C57] transition-colors">Calculadora Tributaria Pro</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Simula tus impuestos bajo las normativas actuales de Perú, Chile y Colombia con precisión quirúrgica.
                </p>
              </div>

              <div className="mt-auto pt-8 relative z-10 flex items-center gap-2 text-[#1679AB] font-bold">
                <span>Ingresar</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </motion.div>
          </Link>

          {/* Tool Card 2 */}
          <Link href="/herramientas/calculadora-nominas" className="group block">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="relative bg-white rounded-[2.5rem] p-8 h-full flex flex-col gap-6 overflow-hidden border-2 border-transparent transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:border-[#102C57] group-hover:shadow-[0_20px_40px_-15px_rgba(16,44,87,0.3)]"
            >
              <div 
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#102C57]/5 transition-transform duration-700 ease-in-out group-hover:scale-150 group-hover:bg-[#102C57]/10"
                style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
              />
              <div 
                className="absolute bottom-10 right-10 w-32 h-32 bg-[#1679AB]/10 transition-transform duration-700 ease-in-out group-hover:-scale-125 group-hover:-rotate-45"
              />
              
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-[#102C57] relative z-10 transition-colors duration-500 group-hover:bg-[#102C57] group-hover:text-white shadow-sm group-hover:shadow-md">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              
              <div className="flex flex-col gap-3 relative z-10 mt-4">
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-[#102C57] transition-colors">Calculadora de Nóminas</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Analiza la brecha entre el salario neto del empleado y el costo total de la empresa en Perú.
                </p>
              </div>

              <div className="mt-auto pt-8 relative z-10 flex items-center gap-2 text-[#102C57] font-bold">
                <span>Ingresar</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </motion.div>
          </Link>

        </div>
      </section>

      <div className="mt-32">
        <MagneticFooter />
      </div>
    </main>
  );
}
