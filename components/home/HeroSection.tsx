"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { 
  floatingBackgroundVariants, 
  floatingBackgroundVariants2, 
  staggerContainer, 
  wordReveal, 
  fadeUp, 
  springUp, 
  imageSlideIn 
} from "@/animations/heroMotion";

const slides = [
  {
    id: "contabilidad",
    headline: "Optimiza y escala tu empresa con precisión financiera",
    description: "Servicios contables de élite diseñados para blindar la rentabilidad y potenciar el crecimiento sostenible de su visión corporativa.",
    image: "/images/inicio/Contabilidad y Finanzas.jpeg",
    primaryCta: { label: "Transformar Finanzas", href: "/contabilidad" },
    secondaryCta: { label: "Auditoría Gratuita", href: "/contacto" }
  },
  {
    id: "rrhh",
    headline: "Gestión de nóminas y talento sin margen de error",
    description: "Expertise avanzado en Recursos Humanos, administración impecable de planillas y T-Registro para brindar la máxima tranquilidad institucional.",
    image: "/images/inicio/RRHH y Nóminas.jpeg",
    primaryCta: { label: "Optimizar Planillas", href: "/rrhh" },
    secondaryCta: { label: "Auditoría Gratuita", href: "/contacto" }
  },
  {
    id: "software",
    headline: "Automatización de élite con integraciones a medida",
    description: "Desarrollamos soluciones en software e Inteligencia Artificial que revolucionan operaciones, asegurando modernización tecnológica real.",
    image: "/images/inicio/Software a Medida.jpeg",
    primaryCta: { label: "Evolucionar Operación", href: "/software" },
    secondaryCta: { label: "Auditoría Gratuita", href: "/contacto" }
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const words = slide.headline.split(" ");

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 px-6 lg:px-16 pt-24 pb-12">
      {/* Background Organic Shapes */}
      <motion.div 
        variants={floatingBackgroundVariants}
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#102C57]/10 blur-[100px] pointer-events-none z-0"
      />
      <motion.div 
        variants={floatingBackgroundVariants2}
        animate="animate"
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#1679AB]/10 blur-[100px] pointer-events-none z-0"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="flex flex-col justify-center max-w-2xl z-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mb-4 sm:mb-6 flex flex-wrap"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black text-[#102C57] leading-[1.1] tracking-tight">
                  {words.map((word, i) => (
                    <motion.span 
                      key={i} 
                      variants={wordReveal} 
                      className="inline-block mr-2 sm:mr-3 mb-1 sm:mb-2 lg:mr-4 lg:mb-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>

              <motion.p 
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 font-medium leading-relaxed max-w-xl"
              >
                {slide.description}
              </motion.p>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href={slide.primaryCta.href} className="w-full sm:w-auto">
                  <motion.button 
                    variants={springUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-[#102C57] text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-[#102C57]/30 transition-shadow hover:shadow-2xl hover:shadow-[#102C57]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1679AB] focus-visible:ring-offset-2"
                  >
                    {slide.primaryCta.label}
                  </motion.button>
                </Link>
                <Link href={slide.secondaryCta.href} className="w-full sm:w-auto">
                  <motion.button 
                    variants={springUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 border-2 border-[#1679AB] text-[#1679AB] hover:bg-[#1679AB]/5 rounded-full font-bold text-base sm:text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#102C57] focus-visible:ring-offset-2"
                  >
                    {slide.secondaryCta.label}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slider Pagination */}
          <div className="flex items-center gap-3 mt-12 pb-4">
             {slides.map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => setCurrentSlide(idx)}
                 className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-10 bg-[#1679AB]' : 'w-4 bg-slate-300 hover:bg-slate-400'}`}
                 aria-label={`Ir a slide ${idx + 1}`}
               />
             ))}
          </div>
        </div>

        {/* Image Content */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center z-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              className="absolute inset-0 w-full h-full max-h-[600px] flex items-center justify-center"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-[#102C57] to-[#1679AB] z-0 max-w-[90%] max-h-[90%] m-auto overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(15% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 15%)",
                  borderRadius: "4rem 4rem 4rem 1.5rem"
                }}
              >
                 <Image 
                    src={slide.image}
                    alt={slide.headline}
                    fill
                    className="object-cover mix-blend-overlay opacity-70"
                    referrerPolicy="no-referrer"
                 />
              </div>
              
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute top-[5%] right-[5%] w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[2px] border-[#1679AB]/40 backdrop-blur-sm pointer-events-none"
              />
              <motion.div
                 animate={{ rotate: -360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute bottom-[5%] left-[5%] w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] border-[2px] border-[#102C57]/20 backdrop-blur-md pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
