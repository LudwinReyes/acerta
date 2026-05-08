"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FullScreenMenu from "./FullScreenMenu";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Smart scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Don't hide if menu is open or at top of page
    if (isOpen || latest < 50) {
      setIsHidden(false);
      return;
    }

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const NAV_LINKS = [
    { href: "/contabilidad", label: "Contabilidad" },
    { href: "/software", label: "Software" },
    { href: "/rrhh", label: "RRHH" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/herramientas", label: "Herramientas" },
  ];

  return (
    <>
      <FullScreenMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-150%", opacity: 0 }
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none"
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-[#102C57] backdrop-blur-xl border border-white/10 shadow-2xl shadow-slate-900/20 rounded-full px-6 py-3">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-white relative z-10 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <img src="/img/acerta/acerta-logo-white.png" alt="Acerta Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8 relative z-10" onMouseLeave={() => setHoveredLink(null)}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors z-10 ${isActive ? "text-white" : "text-slate-200 hover:text-white"
                    }`}
                >
                  <span className="relative z-20">{link.label}</span>
                  {isActive && !hoveredLink && (
                    <motion.div
                      layoutId="navTabActive"
                      className="absolute inset-0 bg-secondary rounded-full z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {hoveredLink === link.href && !isActive && (
                    <motion.div
                      layoutId="navTabHover"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4 relative z-10">
            <Link
              href="/contacto"
              className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={24} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={24} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </motion.header>
    </>
  );
}
