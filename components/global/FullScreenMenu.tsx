"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  menuClipPath, 
  menuStagger, 
  menuItemReveal, 
  secondaryStagger, 
  secondaryReveal 
} from "@/animations/navMotion";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/contabilidad", label: "Contabilidad" },
  { href: "/software", label: "Software" },
  { href: "/rrhh", label: "RRHH" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/contacto", label: "Contacto" },
];

export default function FullScreenMenu({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void 
}) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={menuClipPath}
      className="fixed inset-0 z-40 bg-primary h-dvh flex flex-col"
      // Disable pointer events when closed so it doesn't block interactions
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,#1679AB_0%,transparent_50%)] opacity-20 pointer-events-none mix-blend-screen" />
      
      <div className="w-full h-full overflow-y-auto py-24 px-6 lg:px-24 relative z-10">
        {/* Logo in Menu */}
        <div className="max-w-7xl mx-auto mb-12">
          <img src="/img/acerta/acerta-logo-white.png" alt="Acerta Logo" className="h-10 w-auto opacity-80" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-end gap-16 min-h-full">
          
          {/* Main Links */}
        <motion.nav 
          variants={menuStagger} 
          className="flex flex-col gap-4 lg:gap-6"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.href} className="overflow-hidden">
                <motion.div variants={menuItemReveal}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 text-5xl sm:text-6xl md:text-7xl font-black text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {isActive && (
                      <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-secondary shrink-0 hidden md:inline-block" />
                    )}
                    <span className={`${isActive ? "text-white" : ""}`}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </motion.nav>

        {/* Secondary Info */}
        <motion.div 
          variants={secondaryStagger} 
          className="flex flex-col gap-8 text-white/60 mb-6"
        >
          <motion.div variants={secondaryReveal} className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-widest uppercase text-white/40">Correo Corporativo</span>
            <a href="mailto:contacto@acentraperu.com" className="text-xl md:text-2xl hover:text-secondary transition-colors">
              contacto@acentraperu.com
            </a>
          </motion.div>
          
          <motion.div variants={secondaryReveal} className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-widest uppercase text-white/40">Teléfonos</span>
            <p className="text-xl md:text-2xl">
              +51 954 775 210
              <br />
              +51 943 506 639
            </p>
          </motion.div>
          
          <motion.div variants={secondaryReveal} className="flex flex-col gap-2 mt-4">
            <span className="text-sm font-bold tracking-widest uppercase text-white/40">Redes</span>
            <div className="flex gap-6">
              {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                <a key={social} href="#" className="text-lg hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
