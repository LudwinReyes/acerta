"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Globe, Loader2, CheckCircle2 } from "lucide-react";
import { 
  splitLeftEntry, 
  splitRightEntry, 
  contactHeaderStagger, 
  contactWordReveal, 
  formStagger, 
  formInputReveal, 
  useMagneticButton 
} from "@/animations/contactMotion";

export function ContactForm() {
  const headline = "Eleva el estándar de tu empresa hoy.";
  const words = headline.split(" ");
  
  const { ref: btnRef, x, y, handleMouseMove, handleMouseLeave } = useMagneticButton();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get("nombre"),
      empresa: formData.get("empresa"),
      email: formData.get("email"),
      servicio: formData.get("servicio"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary flex flex-col selection:bg-secondary selection:text-white">
      
      {/* Split Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">
        
        {/* Left Column (Dark / Authority) */}
        <motion.section 
          variants={splitLeftEntry}
          initial="hidden"
          animate="show"
          className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen pt-24 pb-20 px-6 lg:px-16 xl:px-24 flex flex-col justify-center bg-primary z-0"
        >
          {/* Subtle Radial Gradient */}
          <div 
             className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
             style={{ 
               background: "radial-gradient(circle at 30% 70%, #1679AB 0%, transparent 60%)" 
             }}
          />

          <div className="relative z-10 flex flex-col items-start w-full max-w-xl mx-auto lg:mx-0">
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 uppercase tracking-widest text-sm font-bold">
               <ArrowLeft className="w-4 h-4" /> Volver al Inicio
            </Link>

            <motion.h1 
              variants={contactHeaderStagger}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-16"
            >
              {words.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={contactWordReveal} 
                  className="inline-block mr-3 lg:mr-4 mb-2 lg:mb-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Contact Pills */}
            <div className="flex flex-col gap-6 w-full">
              <a href="tel:+51954775210" className="group flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                  <Phone strokeWidth={2} size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/50 text-sm font-bold tracking-widest uppercase mb-1">Teléfonos</span>
                  <span className="text-white md:text-xl font-light tracking-wide">+51 954 775 210 / +51 943 506 639</span>
                </div>
              </a>

              <a href="mailto:contacto@acentraperu.com" className="group flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                  <Mail strokeWidth={2} size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/50 text-sm font-bold tracking-widest uppercase mb-1">Email Corporativo</span>
                  <span className="text-white md:text-xl font-light tracking-wide">contacto@acentraperu.com</span>
                </div>
              </a>

              <a href="https://www.acentraperu.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                  <Globe strokeWidth={2} size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white/50 text-sm font-bold tracking-widest uppercase mb-1">Web</span>
                  <span className="text-white md:text-xl font-light tracking-wide">www.acentraperu.com</span>
                </div>
              </a>
            </div>
          </div>
        </motion.section>

        {/* Right Column (Light / Form) */}
        <motion.section 
          variants={splitRightEntry}
          initial="hidden"
          animate="show"
          className="relative w-full lg:w-1/2 bg-slate-50 lg:rounded-tl-[4rem] lg:rounded-bl-[4rem] pt-20 pb-24 px-6 lg:px-16 xl:px-24 flex flex-col justify-center shadow-2xl z-10"
        >
          <div className="w-full max-w-xl mx-auto lg:mx-0">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
               Iniciar Diagnóstico
             </h2>
             <p className="text-slate-600 font-light text-lg mb-12">
               Complete el formulario y uno de nuestros socios estratégicos se comunicará a la brevedad.
             </p>
             
             <motion.form 
               variants={formStagger}
               initial="hidden"
               animate="show"
               className="flex flex-col gap-6"
               onSubmit={handleSubmit}
             >
               {/* 1. Nombre */}
               <motion.div variants={formInputReveal} className="relative group">
                 <input 
                   type="text" 
                   id="nombre"
                   name="nombre"
                   required
                   placeholder=" "
                   className="block w-full px-6 pt-8 pb-3 text-slate-900 bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 transition-colors peer"
                 />
                 <label 
                   htmlFor="nombre"
                   className="absolute text-slate-400 duration-300 transform -translate-y-3 scale-75 top-5 left-6 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-secondary font-medium tracking-wide"
                 >
                   Nombre completo
                 </label>
               </motion.div>

               {/* 2. Empresa */}
               <motion.div variants={formInputReveal} className="relative group">
                 <input 
                   type="text" 
                   id="empresa"
                   name="empresa"
                   placeholder=" "
                   className="block w-full px-6 pt-8 pb-3 text-slate-900 bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 transition-colors peer"
                 />
                 <label 
                   htmlFor="empresa"
                   className="absolute text-slate-400 duration-300 transform -translate-y-3 scale-75 top-5 left-6 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-secondary font-medium tracking-wide"
                 >
                   Razón Social / Empresa
                 </label>
               </motion.div>

               {/* 3. Email */}
               <motion.div variants={formInputReveal} className="relative group">
                 <input 
                   type="email" 
                   id="email"
                   name="email"
                   required
                   placeholder=" "
                   className="block w-full px-6 pt-8 pb-3 text-slate-900 bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 transition-colors peer"
                 />
                 <label 
                   htmlFor="email"
                   className="absolute text-slate-400 duration-300 transform -translate-y-3 scale-75 top-5 left-6 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-secondary font-medium tracking-wide"
                 >
                   Correo corporativo
                 </label>
               </motion.div>

               {/* 4. Servicio */}
               <motion.div variants={formInputReveal} className="relative group">
                 <select 
                   id="servicio"
                   name="servicio"
                   required
                   title="Seleccione un servicio de interés"
                   className="block w-full px-6 pt-8 pb-3 text-slate-900 bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 transition-colors peer"
                   defaultValue=""
                 >
                   <option value="" disabled className="text-slate-400"></option>
                   <option value="contabilidad">Consultoría Contable y Financiera</option>
                   <option value="software">Desarrollo de Software a Medida</option>
                   <option value="rrhh">Gestión de RRHH y Planillas</option>
                   <option value="transformacion">Transformación Digital / E-commerce</option>
                   <option value="otros">Otros / Consultas Generales</option>
                 </select>
                 <label 
                   htmlFor="servicio"
                   className="absolute text-secondary duration-300 transform -translate-y-3 scale-75 top-5 left-6 z-10 origin-[0] font-medium tracking-wide"
                 >
                   Servicio de Interés
                 </label>
                 {/* Custom caret */}
                 <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </div>
               </motion.div>

               {/* 5. Mensaje */}
               <motion.div variants={formInputReveal} className="relative group">
                 <textarea 
                   id="mensaje"
                   name="mensaje"
                   required
                   placeholder=" "
                   rows={4}
                   className="block w-full px-6 pt-8 pb-3 text-slate-900 bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 transition-colors peer resize-none"
                 ></textarea>
                 <label 
                   htmlFor="mensaje"
                   className="absolute text-slate-400 duration-300 transform -translate-y-3 scale-75 top-5 left-6 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-secondary font-medium tracking-wide"
                 >
                   Detalles del requerimiento
                 </label>
               </motion.div>

               {/* Mensajes de estado */}
               {submitStatus === "success" && (
                 <motion.div 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-start gap-3"
                 >
                   <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                   <div>
                     <h4 className="font-bold text-sm">Mensaje enviado</h4>
                     <p className="text-sm mt-1">Gracias por contactarnos. Uno de nuestros socios estratégicos se comunicará contigo a la brevedad.</p>
                   </div>
                 </motion.div>
               )}
               {submitStatus === "error" && (
                 <motion.div 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm"
                 >
                   Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por teléfono.
                 </motion.div>
               )}

               {/* Magnetic Submit Button */}
               <motion.div variants={formInputReveal} className="mt-2 flex">
                 <motion.button 
                   ref={btnRef}
                   onMouseMove={handleMouseMove}
                   onMouseLeave={handleMouseLeave}
                   style={{ x, y }}
                   disabled={isSubmitting || submitStatus === "success"}
                   type="submit"
                   className="relative overflow-hidden group flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg px-12 py-5 rounded-full shadow-xl shadow-secondary/30 transition-shadow hover:shadow-2xl hover:shadow-secondary/40 w-full sm:w-auto text-center disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   <span className="relative z-10">{isSubmitting ? "Enviando..." : "Solicitar Asesoría"}</span>
                   {isSubmitting && <Loader2 className="w-5 h-5 relative z-10 animate-spin" />}
                   <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0" />
                 </motion.button>
               </motion.div>

             </motion.form>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
