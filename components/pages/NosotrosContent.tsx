"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MagneticFooter from "@/components/home/MagneticFooter";
import {
  aboutHeaderStagger,
  aboutWordReveal,
  textSlideRight,
  imageSlideLeft,
  pillStagger,
  pillReveal,
  useAboutParallax
} from "@/animations/aboutMotion";

const VALUES = ["Innovación", "Precisión Legal", "Confianza Absoluta", "Excelencia"];

function ParallaxImage({ src, alt, offset = 100, className }: { src: string, alt: string, offset?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useAboutParallax(scrollYProgress, offset);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-20%] w-[140%] h-[140%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
}

export function NosotrosContent() {
  const headline = "Elegancia, Exclusividad y Alto Impacto Corporativo";
  const words = headline.split(" ");

  // Hero Parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollY, [0, 1], ["0%", "50%"]);

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"
        >
          <Image
            src="https://picsum.photos/1920/1080?random=81"
            alt="Corporate Architecture"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Curved Mask (Bottom) */}
        <div
          className="absolute bottom-[-5vh] left-0 w-full h-[15vh] bg-slate-50 z-10"
          style={{ clipPath: "ellipse(100% 100% at 50% 100%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 md:mb-12 uppercase tracking-widest text-sm font-bold bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <motion.h1
            variants={aboutHeaderStagger}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight max-w-6xl drop-shadow-2xl"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={aboutWordReveal}
                className="inline-block mr-3 lg:mr-5 mb-2 lg:mb-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative w-full py-32 lg:py-48 px-6 lg:px-8 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-32 lg:gap-48">

          {/* Fila 1: Filosofía (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={textSlideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1 flex flex-col"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Nuestra Filosofía <br className="hidden md:block" /> Corporativa
              </h2>
              <p className="text-xl text-slate-600 mb-10 font-light leading-relaxed">
                Fundada bajo los principios inquebrantables de la precisión y la visión a largo plazo, Acerta no es una agencia más. Somos arquitectos de infraestructuras corporativas que sostienen el crecimiento impecable de las empresas más demandantes del mercado.
              </p>

              {/* Pill Tags */}
              <motion.div
                variants={pillStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-4"
              >
                {VALUES.map((val) => (
                  <motion.span
                    key={val}
                    variants={pillReveal}
                    className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded-full text-sm tracking-wide shadow-sm"
                  >
                    {val}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={imageSlideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <ParallaxImage
                src="/images/nosotros/Nuestra Filosofía Corporativa.jpg"
                alt="Filosofía corporativa"
                className="w-full aspect-[4/5] rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-3xl rounded-bl-3xl shadow-2xl shadow-slate-200"
              />
            </motion.div>
          </div>

          {/* Fila 2: Metodología (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={imageSlideLeft} // Actually sliding from left because it's on left visually? Wait, let's keep variants descriptive
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, duration: 1.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ParallaxImage
                src="/images/nosotros/Metodología de Alto Impacto.jpg"
                alt="Metodología Acerta"
                offset={150}
                className="w-full aspect-square rounded-[4rem] rounded-tr-none shadow-2xl shadow-secondary/20 border-8 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, duration: 1.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Metodología de <br className="hidden md:block" /> Alto Impacto
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-6">
                Redefinimos la consultoría integrando Inteligencia Artificial con el rigor de la gestión tradicional. Eliminamos la fricción burocrática mediante sistemas interconectados.
              </p>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                Desde la automatización de la contabilidad NIIF hasta el despliegue de ecosistemas de software a medida, blindamos cada capa de su operación.
              </p>
            </motion.div>
          </div>

          {/* Fila 3: Liderazgo (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={textSlideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1 flex flex-col justify-center"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Liderazgo y <br className="hidden md:block" /> Visión Directiva
              </h2>
              <h3 className="text-2xl font-bold text-secondary mb-8">Victor Yactayo <span className="font-light text-slate-500 text-xl block mt-1">Gerente General</span></h3>
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
                Bajo la dirección de Victor Yactayo, Acerta ha forjado un legado de impecabilidad. Su enfoque estratégico combina el rigor de la alta contabilidad comercial con la disrupción del desarrollo tecnológico de vanguardia.
              </p>
              <div className="w-12 h-1 bg-secondary rounded-full" />
            </motion.div>

            <motion.div
              variants={imageSlideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              {/* Elegant Hover Effects for Leadership */}
              <div className="group relative w-[80%] max-w-[450px] aspect-[4/5] rounded-[4rem] rounded-tl-none overflow-hidden hover:shadow-2xl hover:shadow-secondary/30 transition-shadow duration-700">
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none mix-blend-multiply" />
                <ParallaxImage
                  src="/images/nosotros/Liderazgo y Visión Directiva.jpg"
                  alt="Victor Yactayo - Gerente General Acerta"
                  className="w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                  offset={80}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Magnetic Footer */}
      <MagneticFooter />
    </main>
  );
}
