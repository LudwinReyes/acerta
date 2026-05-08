"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { whyUsHeaderStagger, whyUsTypewriter, slideFromLeft, slideFromRight } from "@/animations/whyUsMotion";
import { Briefcase, KeyRound, Cpu } from "lucide-react";

export default function WhyUsSection() {
  const headline = "¿Por qué elegir Acerta?";
  const characters = headline.split("");

  return (
    <section className="relative w-full bg-slate-50 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Typewriter Header */}
        <div className="mb-20 text-center">
          <motion.h2
            variants={whyUsHeaderStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900"
          >
            {characters.map((char, index) => (
              <motion.span
                key={index}
                variants={whyUsTypewriter}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {/* Row 1: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1 flex flex-col justify-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mb-6 text-primary border border-primary/20">
                <Briefcase size={32} />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                Outsourcing Integral y Dominio NIIF
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                Nos hacemos cargo de sus complejidades contables. Absorvemos la operatividad financiera permitiéndole enfocarse en el core de su negocio. Nuestros analistas aseguran cumplimiento bajo normas NIIF y previenen contingencias.
              </p>
              <ul className="space-y-3 font-medium text-slate-700">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-secondary" /> Diagnóstico inicial exhaustivo.</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-secondary" /> Mapeo y reestructuración tributaria.</li>
              </ul>
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 relative w-full aspect-square lg:aspect-[4/3] rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white"
            >
              <Image
                src="/img/acerta/inicio/whyus-outsourcing.png"
                alt="Outsourcing y finanzas"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Row 2: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full aspect-[4/5] lg:aspect-square rounded-full overflow-hidden shadow-2xl shadow-secondary/10 border-8 border-white bg-slate-200"
            >
              <Image
                src="/img/acerta/software/ai.png"
                alt="Software a medida IA"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col justify-center"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center mb-6 text-secondary border border-secondary/20">
                <Cpu size={32} />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                Software Evolutivo potenciado con IA
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                No vendemos licencias cerradas, construimos ecosistemas. Desarrollamos ERPs, sistemas de planillas e interfaces modernas interconectadas mediante APIs robustas y automatización de datos asistida por Inteligencia Artificial.
              </p>
              <ul className="space-y-3 font-medium text-slate-700">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> Arquitecturas escalables Serverless.</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> Automatización de T-Registro y AFP.</li>
              </ul>
            </motion.div>
          </div>

          {/* Row 3: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1 flex flex-col justify-center"
            >
              <div className="w-16 h-16 bg-slate-200/50 rounded-[1.5rem] flex items-center justify-center mb-6 text-slate-800 border border-slate-300">
                <KeyRound size={32} />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                Auditorías Preventivas y Big Data
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                Anticipamos crisis institucionales escaneando terabytes de registros. Realizamos debidas diligencias y auditorías algorítmicas para proteger su responsabilidad legal y el rendimiento de su capital humano.
              </p>
              <ul className="space-y-3 font-medium text-slate-700">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-secondary" /> Simulaciones de fiscalización SUNAT.</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-secondary" /> Análisis predictivo de rotación de personal.</li>
              </ul>
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 relative w-full aspect-square lg:aspect-[4/3] rounded-tr-[6rem] rounded-bl-[6rem] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white"
            >
              <Image
                src="/img/acerta/inicio/riesgos.png"
                alt="Auditoria y Seguridad"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
