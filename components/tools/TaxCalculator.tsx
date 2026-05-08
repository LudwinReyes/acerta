"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ArrowLeft, Calculator } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import MagneticFooter from "@/components/home/MagneticFooter";
import { COUNTRIES_TAX, CountryTaxConfig, calculateTax } from "@/lib/taxRules";
import {
  calcHeaderStagger,
  calcWordReveal,
  inputSectionReveal,
  outputSectionReveal,
  resultStagger,
  resultItemFade
} from "@/animations/calculatorMotion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export function TaxCalculator() {
  const headline = "Simulador Tributario Inteligente";
  const words = headline.split(" ");

  const [selectedCountry, setSelectedCountry] = useState<CountryTaxConfig>(COUNTRIES_TAX[0]);
  const [bruto, setBruto] = useState<string>("10000");
  const [deducibles, setDeducibles] = useState<string>("0");

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let isMounted = true;
    setTimeout(() => { if (isMounted) setMounted(true); }, 0);
    return () => { isMounted = false; };
  }, []);

  const valBruto = parseFloat(bruto.replace(/[^0-9.]/g, '')) || 0;
  const valDeducibles = parseFloat(deducibles.replace(/[^0-9.]/g, '')) || 0;

  const results = calculateTax(selectedCountry.id, valBruto, valDeducibles);

  const chartData = [
    { name: "Neto que te llevas", value: Math.max(0, results.ingresoNetoAnual), color: "#1679AB" },
    ...(results.aportesLey > 0 ? [{ name: "Aportes Ley", value: results.aportesLey, color: "#64748b" }] : []),
    { name: "Impuesto a la Renta", value: results.impuestoTotal, color: "#F43F5E" },
  ];

  if (!mounted) return null;

  return (
    <main className="bg-slate-50 dark:bg-[#102C57] min-h-screen selection:bg-[#1679AB] selection:text-white pb-32 transition-colors duration-500 overflow-hidden relative">

      {/* Abundancia Visual: Monedas Flotantes 3D (SVG Animado) detrás de resultados */}
      <div className="absolute top-[40%] mt-32 right-0 w-[800px] h-[800px] pointer-events-none opacity-20 dark:opacity-30 z-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-tr from-[#1679AB] to-transparent rounded-full blur-3xl absolute"
          style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
        />
        <motion.div
          animate={{ y: [0, -40, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 bg-yellow-400 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] blur-[2px]"
          style={{ right: '20%', top: '10%' }}
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-24 h-24 bg-[#1679AB] rounded-full shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.3)] blur-[1px]"
          style={{ left: '10%', bottom: '20%' }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute w-32 h-32 bg-rose-400 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] blur-[3px]"
          style={{ right: '40%', bottom: '10%' }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-16 px-6 lg:px-8 z-0">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <Link href="/herramientas" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1679AB] transition-colors mb-12 uppercase tracking-widest text-sm font-bold bg-white px-6 py-2 rounded-full shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Volver a Herramientas
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl shadow-[#1679AB]/10 text-[#1679AB] mb-8"
          >
            <Calculator className="w-8 h-8" />
          </motion.div>

          <motion.h1
            variants={calcHeaderStagger}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-[#102C57] dark:text-white leading-[1.05] tracking-tight max-w-5xl"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={calcWordReveal}
                className="inline-block mr-3 lg:mr-5 mb-2 lg:mb-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>

      {/* Country Selector - Carousel */}
      <section className="relative w-full px-6 lg:px-8 mb-16 z-10">
        <div className="max-w-4xl mx-auto flex justify-center flex-wrap gap-4">
          {COUNTRIES_TAX.map(country => {
            const isActive = selectedCountry.id === country.id;
            return (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country)}
                className={`relative flex items-center gap-4 px-8 py-4 rounded-full text-lg font-black transition-all duration-300 shadow-sm ${isActive ? "text-white shadow-[#1679AB]/30" : "bg-white text-slate-400 hover:text-slate-700 hover:shadow-md"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-country-bg"
                    className="absolute inset-0 bg-[#1679AB] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                )}
                <span className="relative z-10 text-2xl">{country.flag}</span>
                <span className="relative z-10">{country.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Calculator Body */}
      <section className="relative w-full px-6 lg:px-8 z-10">
        <motion.div layout transition={{ damping: 25, stiffness: 120 }} className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* Lado Izquierdo: Inputs */}
          <motion.div
            layout
            variants={inputSectionReveal}
            initial="hidden"
            animate="show"
            className="flex-1 bg-white dark:bg-[#0B1B36] p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-[#102C57]/5 dark:shadow-none border border-slate-100 dark:border-white/5 flex flex-col gap-8 relative z-10"
          >
            <h2 className="text-2xl font-black text-[#102C57] dark:text-white">Detalles Financieros</h2>

            <div className="flex flex-col gap-4">
              <label className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase">
                Sueldo Bruto Mensual ({selectedCountry.currency})
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={bruto}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, '');
                    setBruto(val);
                  }}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent text-[#102C57] dark:text-white rounded-full py-5 px-8 text-2xl font-black focus:outline-none focus:border-[#1679AB] focus:bg-white dark:focus:bg-[#0B1B36] focus:ring-4 focus:ring-[#1679AB]/10 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase">
                Gastos adicionales (Deducciones 3 UIT)
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="0"
                  max={selectedCountry.id === 'pe' ? 16500 : (selectedCountry.id === 'co' ? 100000000 : 5000000)}
                  step={selectedCountry.id === 'pe' ? 500 : 10000}
                  value={valDeducibles}
                  onChange={(e) => setDeducibles(e.target.value)}
                  className="w-full h-3 bg-slate-200 dark:bg-[#1679AB]/20 rounded-full appearance-none cursor-pointer accent-[#1679AB]"
                />
                <div className="flex justify-between items-center mt-2 border-b-2 border-slate-100 dark:border-white/10 pb-4">
                  <span className="text-slate-400 dark:text-slate-500 font-bold text-xs">Mínimo: 0</span>
                  <span className="text-[#102C57] dark:text-white font-black text-2xl">
                    <AnimatedNumber value={valDeducibles} currency={selectedCountry.currency} />
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500 font-medium ml-2">
                * Mueve el deslizador y observa cómo se reduce tu impuesto en tiempo real.
              </p>
            </div>

            {/* Input adicional solo para Chile (Layout Morphing) */}
            <AnimatePresence mode="popLayout">
              {selectedCountry.id === 'cl' && (
                <motion.div
                  key="chile-input"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ damping: 25, stiffness: 120 }}
                  className="flex flex-col gap-4 overflow-hidden"
                >
                  <label className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase">
                    Mes de Declaración
                  </label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent text-[#102C57] dark:text-white rounded-full py-5 px-8 text-xl font-black focus:outline-none focus:border-[#1679AB] focus:bg-white dark:focus:bg-[#0B1B36] focus:ring-4 focus:ring-[#1679AB]/10 transition-all appearance-none">
                      <option>Enero - Diciembre</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Breakdown de Tramos */}
            <AnimatePresence mode="popLayout">
              {results.breakdown.length > 0 && (
                <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ damping: 25, stiffness: 120 }} className="mt-4 p-6 bg-slate-50 dark:bg-[#102C57]/20 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col gap-3 overflow-hidden">
                  <h3 className="text-[#102C57] dark:text-white font-bold text-sm tracking-widest uppercase mb-2">Desglose de Tramos</h3>
                  <div className="flex flex-col gap-2">
                    <AnimatePresence>
                      {results.breakdown.map((item, idx) => (
                        <motion.div
                          key={item.etiqueta}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex justify-between items-center text-sm font-medium bg-white dark:bg-white/5 px-5 py-3 rounded-full border border-slate-200 dark:border-white/10 shadow-sm"
                        >
                          <span className="text-slate-500 dark:text-slate-300">{item.etiqueta}</span>
                          <span className="text-rose-500 dark:text-rose-400 font-bold">
                            <AnimatedNumber value={item.valor} currency={selectedCountry.currency} />
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Lado Derecho: Output y Gráficos */}
          <motion.div
            variants={outputSectionReveal}
            initial="hidden"
            animate="show"
            className="flex-1 bg-[#102C57] p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-[#102C57]/20 flex flex-col gap-10 overflow-hidden relative"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1679AB]/20 blur-[100px] rounded-full pointer-events-none" />

            <h2 className="text-2xl font-black text-white relative z-10">Resumen Anual</h2>

            <motion.div layout variants={resultStagger} initial="hidden" animate="show" className="flex flex-col gap-8 relative z-10">

              <motion.div variants={resultItemFade} className="flex flex-col gap-2 bg-white/5 rounded-3xl p-6 border border-white/10">
                <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Ingreso Bruto Anual</span>
                <span className="text-3xl font-light text-white">
                  <AnimatedNumber value={results.ingresoBrutoAnual} currency={selectedCountry.currency} />
                </span>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={resultItemFade} className="flex flex-col gap-2 bg-white/5 rounded-3xl p-6 border border-white/10">
                  <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Deducciones Totales</span>
                  <span className="text-2xl font-light text-white">
                    <AnimatedNumber value={results.deducciones} currency={selectedCountry.currency} />
                  </span>
                </motion.div>
                <motion.div variants={resultItemFade} className="flex flex-col gap-2 bg-rose-500/10 rounded-3xl p-6 border border-rose-500/20">
                  <span className="text-rose-200/60 text-xs font-bold tracking-widest uppercase">Impuesto Total</span>
                  <span className="text-2xl font-light text-rose-400">
                    <AnimatedNumber value={results.impuestoTotal} currency={selectedCountry.currency} />
                  </span>
                </motion.div>
              </div>

              <motion.div variants={resultItemFade} className="flex flex-col gap-2 bg-[#1679AB] rounded-3xl p-8 border border-[#1679AB]/50 shadow-xl shadow-[#1679AB]/20">
                <span className="text-white/70 text-sm font-bold tracking-widest uppercase">Ingreso Neto Anual</span>
                <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                  <AnimatedNumber value={results.ingresoNetoAnual} currency={selectedCountry.currency} />
                </span>
              </motion.div>

            </motion.div>

            {/* Smart Message */}
            <motion.div layout variants={resultItemFade} className="relative z-10 bg-white/90 dark:bg-[#102C57]/80 backdrop-blur-md border-l-4 border-[#1679AB] p-6 rounded-2xl shadow-lg mt-2 flex items-start gap-4">
              <div className="text-[#1679AB] bg-[#1679AB]/10 p-2 rounded-full mt-1 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-black mb-1">Análisis Acerta</h4>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                  {results.mensajesInteligentes}
                </p>
              </div>
            </motion.div>

            {/* Donut Chart */}
            <motion.div
              variants={resultItemFade}
              initial="hidden"
              animate="show"
              className="mt-4 h-48 w-full relative z-10 flex items-center justify-center"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: '#1e293b', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: selectedCountry.currency, maximumFractionDigits: 0 }).format(Number(value) || 0)}
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Tasa Efectiva</span>
                <span className="text-white font-black text-xl">{(results.tasaEfectiva * 100).toFixed(1)}%</span>
              </div>
            </motion.div>

          </motion.div>

        </motion.div>
      </section>

      <div className="mt-32">
        <MagneticFooter />
      </div>
    </main>
  );
}
