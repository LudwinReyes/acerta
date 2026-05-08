"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { headerStagger, headerWord, cardLeft, cardCenter, cardRight } from "@/animations/painMotion";
import { AlertCircle, Clock, FileWarning } from "lucide-react";

const PAIN_CARDS = [
  {
    id: "risk1",
    title: "Riesgos Contables y Multas",
    description: "Una declaración tardía o un cálculo impreciso puede resultar en sanciones severas por parte de las entidades reguladoras.",
    Icon: FileWarning,
    image: "/images/inicio/Riesgos Contables y Multas.jpeg",
    variant: cardLeft,
    gradient: "from-rose-500/20 to-red-600/5",
  },
  {
    id: "risk2",
    title: "Sistemas Obsoletos Desconectados",
    description: "Usar hojas de cálculo y software legacy crea silos de información, procesos manuales lentos rotura en la toma de decisiones.",
    Icon: Clock,
    image: "/images/inicio/Sistemas Obsoletos Desconectados.jpeg",
    variant: cardCenter,
    gradient: "from-amber-500/20 to-orange-600/5",
  },
  {
    id: "risk3",
    title: "Caos en Planillas y RRHH",
    description: "Cálculos manuales de beneficios, falta de evaluación de desempeño y rotación de personal que estanca la cultura organizacional.",
    Icon: AlertCircle,
    image: "/images/inicio/Caos en Planillas y RRHH.jpeg",
    variant: cardRight,
    gradient: "from-purple-500/20 to-indigo-600/5",
  }
];

export default function PainSection() {
  const headline = "El Caos Administrativo frena el crecimiento de tu Empresa";
  const words = headline.split(" ");

  return (
    <section className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden text-white">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 lg:mb-28">
           <motion.h2 
             variants={headerStagger}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
           >
             {words.map((word, i) => (
               <motion.span 
                 key={i} 
                 variants={headerWord} 
                 className="inline-block mr-2 lg:mr-3 mb-1"
               >
                 {word}
               </motion.span>
             ))}
           </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PAIN_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              variants={card.variant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden group 
                          ${idx === 0 ? "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-3xl rounded-bl-3xl" : ""}
                          ${idx === 1 ? "rounded-t-[4rem] rounded-b-3xl" : ""}
                          ${idx === 2 ? "rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-3xl rounded-br-3xl" : ""}
              `}
            >
              {/* Image Header */}
              <div className="relative w-full h-56 md:h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} z-10`} />
                <Image 
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-70"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Content */}
              <div className="relative flex flex-col p-8 flex-grow">
                <div className="absolute top-[-24px] right-8 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg border-4 border-primary z-20">
                  <card.Icon className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 pr-10">
                  {card.title}
                </h3>
                <p className="text-slate-300 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
