"use client";

import { motion } from "motion/react";
import { marqueeVariants } from "@/animations/trustMotion";
import { DollarSign, Landmark, ShieldCheck, Cloud, Database, BarChart3, LineChart, PieChart } from "lucide-react";

const TRUST_LOGOS = [
  { id: 1, name: "Banco de Crédito", icon: Landmark },
  { id: 2, name: "Interbank", icon: DollarSign },
  { id: 3, name: "SUNAT", icon: ShieldCheck },
  { id: 4, name: "AWS Cloud", icon: Cloud },
  { id: 5, name: "SAP ERP", icon: Database },
  { id: 6, name: "Oracle", icon: BarChart3 },
  { id: 7, name: "Salesforce", icon: LineChart },
  { id: 8, name: "Power BI", icon: PieChart },
];

export default function TrustBanner() {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS, ...TRUST_LOGOS]; // Triplicated to ensure smooth infinite loop on large screens

  return (
    <section className="w-full bg-slate-50 py-12 overflow-hidden border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">
          Integraciones confiables y conectividad nativa
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden group">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          variants={marqueeVariants}
          animate="animate"
          className="flex w-max space-x-16 sm:space-x-24 px-8 items-center shrink-0"
        >
          {logos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div 
                key={`${logo.id}-${index}`}
                className="flex items-center gap-3 grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:text-primary cursor-pointer"
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
                <span className="font-bold text-lg sm:text-xl text-slate-700/80 uppercase tracking-tighter mix-blend-multiply">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
