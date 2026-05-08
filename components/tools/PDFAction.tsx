"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, FileText, X, CheckCircle2, ArrowRight } from "lucide-react";
import { PayrollInput, PayrollResult } from "@/lib/payrollEngine";
import { PayrollPDF, generateQRCodeUrl } from "@/lib/pdfGenerator";
import { pdfModalBackdrop, pdfModalContent, paperSlideVariant, scannerBeamVariant } from "@/animations/pdfMotion";
import { pdf } from "@react-pdf/renderer";

interface PDFActionProps {
  input: PayrollInput;
  result: PayrollResult;
}

export default function PDFAction({ input, result }: PDFActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPdfUrl(null);
    try {
      // Simulate real QR code URL with a domain reference
      const qrUrlText = typeof window !== 'undefined' ? window.location.origin + "/contacto" : "https://acerta.co/contacto";
      const qrDataUrl = await generateQRCodeUrl(qrUrlText);
      const blob = await pdf(<PayrollPDF input={input} result={result} qrDataUrl={qrDataUrl} />).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Artificial delay to show the sophisticated scanning animation
      setTimeout(() => {
        setPdfUrl(url);
        setIsGenerating(false);
      }, 3000);

    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  const closeModal = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setIsOpen(false);
    setPdfUrl(null);
    setIsGenerating(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpen}
        className="w-full mt-8 relative group overflow-hidden bg-[#102C57] dark:bg-white text-white dark:text-[#102C57] rounded-[2rem] py-5 px-8 flex items-center justify-between shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        <span className="font-bold text-lg relative z-10 flex items-center gap-3">
          <FileText size={24} />
          Generar Informe Ejecutivo
        </span>
        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              variants={pdfModalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
              className="absolute inset-0 bg-[#102C57]/40 dark:bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div
              variants={pdfModalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl bg-white dark:bg-[#0B1B36] rounded-[3rem] shadow-2xl p-8 sm:p-12 overflow-hidden flex flex-col items-center text-center dark:border dark:border-white/10"
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                disabled={isGenerating}
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-[#1679AB]/10 dark:bg-[#1679AB]/20 text-[#1679AB] rounded-full flex items-center justify-center mb-6">
                <FileText size={32} />
              </div>
              <h2 className="text-3xl font-black text-[#102C57] dark:text-white mb-4">Exportar Proyección</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                Genera un documento PDF estructurado y listo para presentar, que incluye un análisis de costos laborales y deducciones.
              </p>

              {/* The "Paper" visual preview */}
              <div className="relative w-48 h-64 bg-slate-50 dark:bg-[#121E36] rounded-xl shadow-inner border border-slate-200 dark:border-white/10 overflow-hidden mb-8 flex items-center justify-center perspective-[1000px]">
                
                <AnimatePresence mode="wait">
                  {!isGenerating && !pdfUrl && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4"
                    >
                      <button 
                        onClick={handleGenerate}
                        className="w-16 h-16 bg-[#102C57] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                      >
                        <Download size={24} />
                      </button>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Iniciar Proceso</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isGenerating && (
                  <motion.div 
                    variants={paperSlideVariant}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-4 bg-white shadow-sm rounded flex flex-col pt-4 px-3 gap-2"
                  >
                    <div className="w-1/2 h-2 bg-slate-200 rounded-full" />
                    <div className="w-3/4 h-2 bg-slate-200 rounded-full mb-2" />
                    <div className="flex gap-2">
                       <div className="flex-1 h-20 bg-slate-50 border border-slate-100 rounded" />
                       <div className="flex-1 h-20 bg-slate-50 border border-slate-100 rounded" />
                    </div>
                  </motion.div>
                )}

                {pdfUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-4 bg-white shadow-sm rounded flex flex-col items-center justify-center text-[#1679AB]"
                  >
                    <CheckCircle2 size={32} className="mb-2" />
                    <span className="text-xs font-bold">Documento Listo</span>
                  </motion.div>
                )}

                {/* The Laser Beam Effect */}
                {isGenerating && (
                  <motion.div 
                    variants={scannerBeamVariant}
                    initial="hidden"
                    animate="scanning"
                    className="absolute left-0 right-0 h-1 bg-[#1679AB] shadow-[0_0_15px_#1679AB] z-10"
                  />
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {pdfUrl && (
                  <motion.a 
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    href={pdfUrl}
                    download="acerta.pdf"
                    className="bg-[#1679AB] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#1679AB]/30 hover:bg-[#12648f] transition-colors flex items-center gap-3 animate-pulse"
                  >
                    <Download size={20} />
                    Descargar Informe Ejecutivo
                  </motion.a>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
