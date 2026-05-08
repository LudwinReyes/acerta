"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ArrowLeft, Briefcase, Calculator, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";
import MagneticFooter from "@/components/home/MagneticFooter";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import PDFAction from "@/components/tools/PDFAction";
import { calculatePayroll, PayrollInput, PayrollResult } from "@/lib/payrollEngine";
import {
  payrollHeaderReveal,
  staggerContainer,
  cardCollideLeft,
  cardCollideRight,
  tooltipReveal
} from "@/animations/payrollMotion";

const WORDS = "Toma el control de tu Capital Humano".split(" ");

export function PayrollCalculator() {
  const [mounted, setMounted] = useState(false);
  const [sueldoBase, setSueldoBase] = useState<string>("3500");
  const [bonificaciones, setBonificaciones] = useState<string>("500");
  const [tieneAsignacion, setTieneAsignacion] = useState<boolean>(false);
  const [sistemaPension, setSistemaPension] = useState<'ONP' | 'AFP'>('AFP');
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);
  const result = calculatePayroll({
    sueldoBase: parseFloat(sueldoBase.replace(/[^0-9.]/g, "")) || 0,
    bonificaciones: parseFloat(bonificaciones.replace(/[^0-9.]/g, "")) || 0,
    tieneAsignacionFamiliar: tieneAsignacion,
    sistemaPension: sistemaPension
  });

  if (!mounted) return null;

  return (
    <main className="bg-slate-50 dark:bg-[#0A132B] min-h-screen selection:bg-[#1679AB] selection:text-white pb-32 transition-colors duration-500 overflow-hidden relative font-sans">

      {/* Abundancia Visual: SVG de Circuito Financiero */}
      <div className="absolute top-[30%] -right-32 w-[900px] h-[900px] pointer-events-none opacity-20 dark:opacity-40 z-0">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-[1px] border-[#1679AB]/30 rounded-full border-dashed"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute inset-20 border-[1px] border-[#102C57]/20 dark:border-[#1679AB]/20 rounded-full"
        />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-white/50 dark:bg-[#0A132B]/50 border-b border-slate-100 dark:border-white/5">
        <Link href="/herramientas" className="flex items-center gap-2 text-[#102C57] dark:text-white font-bold hover:text-[#1679AB] transition-colors rounded-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10">
          <ArrowLeft size={20} />
          <span>Volver a Herramientas</span>
        </Link>
        <div className="flex items-center gap-2">
          <img src="/img/acerta/acerta-logo.png" alt="Acerta Logo" className="h-8 w-auto mix-blend-multiply dark:mix-blend-plus-lighter" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-16 px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1679AB]/10 text-[#1679AB] font-bold text-sm mb-8"
          >
            <ShieldCheck size={16} />
            Motor Fiscal Acerta (Régimen General 2026)
          </motion.div>
          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-[#102C57] dark:text-white leading-[1.05] tracking-tight max-w-5xl"
          >
            {WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={payrollHeaderReveal}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl"
          >
            Calcula la brecha exacta entre el salario neto y el costo laboral total.
          </motion.p>
        </div>
      </section>

      {/* Main Interactive App */}
      <section className="relative w-full px-6 lg:px-8 z-10 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* Input Pane */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="col-span-1 xl:col-span-4 bg-white dark:bg-[#0F1B38] p-8 rounded-[2rem] shadow-xl shadow-[#102C57]/5 dark:shadow-none border border-slate-100 dark:border-white/5 flex flex-col gap-6"
          >
            <h2 className="text-2xl font-black text-[#102C57] dark:text-white mb-2">Ingresos del Empleado</h2>

            <div className="flex flex-col gap-3">
              <label className="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase">
                Sueldo Base (S/)
              </label>
              <input
                type="text"
                value={sueldoBase}
                onChange={(e) => setSueldoBase(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent text-[#102C57] dark:text-white rounded-2xl py-4 px-6 text-xl font-black focus:outline-none focus:border-[#1679AB] focus:bg-white dark:focus:bg-[#0F1B38] focus:ring-4 focus:ring-[#1679AB]/10 transition-all placeholder:text-slate-300"
                placeholder="0"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase">
                Bonos (S/)
              </label>
              <input
                type="text"
                value={bonificaciones}
                onChange={(e) => setBonificaciones(e.target.value)}
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent text-[#102C57] dark:text-white rounded-2xl py-4 px-6 text-xl font-black focus:outline-none focus:border-[#1679AB] focus:bg-white dark:focus:bg-[#0F1B38] focus:ring-4 focus:ring-[#1679AB]/10 transition-all placeholder:text-slate-300"
                placeholder="0"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase">
                Fecha de Ingreso (Opcional)
              </label>
              <input
                type="date"
                defaultValue="2026-01-01"
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent text-[#102C57] dark:text-white rounded-2xl py-4 px-6 text-xl font-black focus:outline-none focus:border-[#1679AB] focus:bg-white dark:focus:bg-[#0F1B38] focus:ring-4 focus:ring-[#1679AB]/10 transition-all"
              />
            </div>

            <div className="h-px w-full bg-slate-100 dark:bg-white/10 my-2" />

            <div className="flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300 font-bold">Asignación Familiar (10% RMV)</label>
              <button
                onClick={() => setTieneAsignacion(!tieneAsignacion)}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${tieneAsignacion ? 'bg-[#1679AB]' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <motion.div
                  layout
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                  animate={{ x: tieneAsignacion ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-widest uppercase mt-2">
                Sistema de Pensión
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSistemaPension('AFP')}
                  className={`py-4 rounded-2xl font-bold transition-all ${sistemaPension === 'AFP' ? 'bg-[#1679AB] text-white shadow-lg' : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'}`}
                >
                  AFP (~13.44%)
                </button>
                <button
                  onClick={() => setSistemaPension('ONP')}
                  className={`py-4 rounded-2xl font-bold transition-all ${sistemaPension === 'ONP' ? 'bg-[#1679AB] text-white shadow-lg' : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'}`}
                >
                  ONP (13%)
                </button>
              </div>
            </div>

          </motion.div>

          {/* Output Pane (Dual Dashboard) */}
          <div className="col-span-1 xl:col-span-8 flex flex-col gap-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* LADO A: Empleado */}
              <motion.div variants={cardCollideLeft} className="bg-[#102C57] text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1679AB] rounded-full blur-[100px] opacity-30 -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <Briefcase size={24} className="text-[#1679AB]" />
                  </div>
                  <h3 className="text-slate-300 font-bold uppercase tracking-widest text-sm mb-1">Lo que el empleado recibe</h3>
                  <p className="text-4xl sm:text-5xl font-black mb-8">
                    <AnimatedNumber value={result.netoMensual} currency="PEN" />
                  </p>

                  {/* Bar Graphic */}
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(result.netoMensual / result.brutoMensual) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        className="h-full bg-[#1679AB] rounded-full"
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Ratio Neto/Bruto ({(result.netoMensual / result.brutoMensual * 100).toFixed(0)}%)</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                    <span className="text-slate-400">Ingreso Bruto</span>
                    <span className="font-bold">S/ {result.brutoMensual.toLocaleString('es-PE', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                    <span className="text-slate-400">Aporte Pensión ({sistemaPension})</span>
                    <span className="font-bold text-rose-300">-S/ {result.descuentoPension.toLocaleString('es-PE', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Retención 5ta Cat.</span>
                    <span className="font-bold text-rose-300">-S/ {result.renta5taMensual.toLocaleString('es-PE', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </motion.div>

              {/* LADO B: Empresa */}
              <motion.div variants={cardCollideRight} className="bg-[#102C57] text-white border-[3px] border-slate-100 dark:border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-200/10 dark:bg-[#1679AB]/20 rounded-full blur-[80px] opacity-50 -mr-20 -mb-20"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <Calculator size={24} className="text-slate-300" />
                  </div>

                  <div className="flex justify-between items-end mb-8 relative pb-4">
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1679AB] to-transparent opacity-80" />
                    <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs sm:text-sm leading-tight text-left">
                      Costo Total<br />Empleado
                    </h3>
                    <p className="text-3xl sm:text-4xl font-black text-white leading-none text-right">
                      <AnimatedNumber value={result.costoTotalEmpresa} currency="PEN" />
                    </p>
                  </div>

                  {/* Bar Graphic */}
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(result.brutoMensual / result.costoTotalEmpresa) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5, type: "spring" }}
                        className="h-full bg-slate-400 rounded-l-full"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((result.costoTotalEmpresa - result.brutoMensual) / result.costoTotalEmpresa) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6, type: "spring" }}
                        className="h-full bg-[#1679AB] rounded-r-full"
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase flex gap-4">
                      <span>Bruto ({(result.brutoMensual / result.costoTotalEmpresa * 100).toFixed(0)}%)</span>
                      <span className="text-[#1679AB]">Sobrecosto ({(100 - (result.brutoMensual / result.costoTotalEmpresa * 100)).toFixed(0)}%)</span>
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                    <span className="text-slate-400">Salario Bruto</span>
                    <span className="font-bold text-white">S/ {result.brutoMensual.toLocaleString('es-PE', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                    <span className="text-slate-400">Essalud (9%)</span>
                    <span className="font-bold text-white">S/ {result.costoEssalud.toLocaleString('es-PE', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Provisión CTS & Grati</span>
                    <span className="font-bold text-white">S/ {(result.provisionCTS + result.provisionGratificacion).toLocaleString('es-PE', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Smart Insights */}
            <AnimatePresence>
              {result.smartInsights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Acerta AI Insights</h4>
                  {result.smartInsights.map((insight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.5 }}
                      className="bg-[#1679AB]/10 dark:bg-[#1679AB]/20 border border-[#1679AB]/20 p-5 rounded-2xl flex items-start gap-4"
                    >
                      <div className="text-[#1679AB] shrink-0 mt-0.5">
                        <Cpu size={20} />
                      </div>
                      <p className="text-[#102C57] dark:text-white font-medium text-sm leading-relaxed">
                        {insight}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resplandor Advertencia 5UIT */}
            <AnimatePresence>
              {result.superaTramo5UIT && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-5 rounded-2xl mt-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
                    ⚠️ Se están aplicando tramos impositivos altos debido al volumen de ingresos gravados.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Export PDF Button and Modal */}
            <PDFAction
              input={{
                sueldoBase: parseFloat(sueldoBase.replace(/[^0-9.]/g, "")) || 0,
                bonificaciones: parseFloat(bonificaciones.replace(/[^0-9.]/g, "")) || 0,
                tieneAsignacionFamiliar: tieneAsignacion,
                sistemaPension: sistemaPension
              }}
              result={result}
            />

          </div>

        </div>
      </section>

      <MagneticFooter />
    </main>
  );
}
