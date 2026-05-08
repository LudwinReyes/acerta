import { Variants } from "motion/react";

export const heroHeaderStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const heroWordReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20 }
  }
};

export const serviceCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 100 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, mass: 1 }
  }
};
