import { Variants } from "motion/react";

export const toolHeaderStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const toolWordReveal: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export const calculatorReveal: Variants = {
  hidden: { z: -50, scale: 0.9, opacity: 0 },
  show: {
    z: 0,
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      mass: 1.2,
      delay: 0.4
    }
  }
};

export const resultStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const resultItemFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};
