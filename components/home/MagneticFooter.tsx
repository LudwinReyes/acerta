"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { footerHeaderStagger, footerWordReveal } from "@/animations/magneticMotion";

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link 
        href={href}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center justify-center px-10 py-5 lg:px-14 lg:py-6 bg-secondary text-white rounded-full font-bold text-lg lg:text-2xl shadow-2xl hover:bg-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50"
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function MagneticFooter() {
  const headline = "¿Listo para delegar el caos y escalar tu empresa?";
  const words = headline.split(" ");
  
  return (
    <section 
      className="relative h-screen min-h-[600px] w-full" 
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* 
        Cortina (Reveal) Effect Pattern. 
        Requires an inner relative container twice the height shifted up by its height,
        housing a sticky container to stick at the actual viewport top gracefully.
      */}
      <div className="relative h-[200vh] -top-[100vh]">
        <div className="sticky top-0 h-screen min-h-[600px] w-full bg-primary rounded-t-[4rem] lg:rounded-t-[6rem] flex flex-col items-center justify-center px-6 lg:px-8 text-center border-t border-white/10 shadow-2xl overflow-hidden">
           
           <div className="max-w-4xl mx-auto flex flex-col items-center z-10 relative">
             <motion.h2 
               variants={footerHeaderStagger}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true, margin: "-100px" }}
               className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-12 lg:mb-16 leading-tight tracking-tight drop-shadow-xl"
             >
               {words.map((word, i) => (
                 <motion.span 
                   key={i} 
                   variants={footerWordReveal} 
                   className="inline-block mr-2 lg:mr-4 mb-2 lg:mb-4"
                 >
                   {word}  
                 </motion.span>
               ))}
             </motion.h2>

             <MagneticButton href="/contacto">
                 Agenda tu Auditoría Gratuita
               </MagneticButton>
           </div>
           
           {/* Abstract Glow Background */}
           <div className="absolute inset-0 pointer-events-none z-0">
               <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] bg-secondary/20 rounded-full blur-[150px]" />
           </div>
        </div>
      </div>
    </section>
  );
}
