"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { carouselHeader } from "@/animations/testimonialMotion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "CEO, TechLogistics",
    image: "/images/inicio/Carlos Mendoza.jpeg",
    logoText: "TechLogistics",
    text: "Teníamos un desorden masivo en nuestras planillas. Acerta no solo regularizó nuestra situación con SUNAT, sino que su software nos ahorra más de 40 horas mensuales de cálculos manuales."
  },
  {
    id: 2,
    name: "Valeria Roca",
    role: "CFO, InnovaSalud",
    image: "/images/inicio/Valeria Roca.jpeg",
    logoText: "InnovaSalud",
    text: "Delegar nuestra contabilidad fue la mejor decisión. El diagnóstico financiero bajo NIIF nos permitió identificar fugas de capital y reestructurar nuestra deuda con una claridad impresionante."
  },
  {
    id: 3,
    name: "Fernando Gil",
    role: "Director de Operaciones, BuildCorp",
    image: "/images/inicio/Fernando Gil.jpeg",
    logoText: "BuildCorp",
    text: "La interface con IA que Acerta desarrolló para nuestro sistema de RRHH ha revolucionado cómo interactuamos con el T-Registro. Absoluta tranquilidad y cero multas documentadas."
  },
  {
    id: 4,
    name: "Patricia Wong",
    role: "Gerente General, RetailMax",
    image: "/images/inicio/Patricia Wong.jpeg",
    logoText: "RetailMax",
    text: "Su enfoque preventivo y auditorías algorítmicas nos salvaron de contingencias laborales que ignorábamos. Un equipo de élite que realmente comprende la escala corporativa."
  },
  {
    id: 5,
    name: "Andrés Silva",
    role: "Head of Growth, FinScale",
    image: "/images/inicio/Andrés Silva.jpeg",
    logoText: "FinScale",
    text: "La transición a sus sistemas integrados fue impecable. Reemplazamos 5 herramientas obsoletas por una suite desarrollada a medida de nuestras necesidades."
  }
];

export default function TestimonialCarousel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-slate-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-12 md:pt-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-12 lg:mb-20">
          <motion.h2
            variants={carouselHeader}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight"
          >
            Nuestros clientes <br /> validan el impacto.
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-8 w-max">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative w-[350px] md:w-[450px] lg:w-[500px] flex-shrink-0 bg-white rounded-[3rem] p-10 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100/50 flex flex-col justify-between"
            >
              <div className="absolute top-10 right-10 text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                <Quote size={80} className="transform rotate-180" />
              </div>

              <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed mb-10 relative z-10 italic">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-6 relative z-10">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-md">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg md:text-xl mb-1">{testimonial.name}</h4>
                  <p className="text-sm md:text-base font-bold text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
