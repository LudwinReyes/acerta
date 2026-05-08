import { Variants } from "motion/react";

export const calcHeaderStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const calcWordReveal: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export const inputSectionReveal: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }
  }
};

export const outputSectionReveal: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(10px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.4 }
  }
};

export const resultStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
};

export const resultItemFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};
