"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent } from "motion/react";
import { impactStagger, impactFadeUp } from "@/animations/impactMotion";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useMotionValueEvent(springValue, "change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix;
    }
  });

  return <span ref={ref} className="tabular-nums">{from}{suffix}</span>;
}

const IMPACT_DATA = [
  { value: 500, suffix: "+", label: "Planillas Procesadas al Mes", desc: "Precisión total en cálculos y pagos." },
  { value: 150, suffix: "+", label: "Integraciones SUNAT / ERP", desc: "Contectividad sin fricciones operativas." },
  { value: 100, suffix: "%", label: "Outsourcing Garantizado", desc: "Tu tranquilidad es nuestro único KPI." }
];

export default function ImpactSection() {
  return (
    <section className="relative w-full bg-primary py-24 overflow-hidden border-y border-white/10">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-secondary/30 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          variants={impactStagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20"
        >
          {IMPACT_DATA.map((item, index) => (
            <motion.div 
              key={index} 
              variants={impactFadeUp}
              className="flex flex-col items-center text-center pt-8 md:pt-0"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-xl">
                <Counter from={0} to={item.value} suffix={item.suffix} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-secondary mb-2">
                {item.label}
              </h4>
              <p className="text-slate-300 font-light max-w-xs">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
