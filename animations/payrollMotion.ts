import { Variants } from "motion/react";

export const payrollHeaderReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80 } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

export const cardLeftReveal: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export const cardRightReveal: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export const cardCollideLeft: Variants = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", mass: 1.5, stiffness: 150, damping: 20 } }
};

export const cardCollideRight: Variants = {
  hidden: { opacity: 0, x: 100, rotate: 5 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", mass: 1.5, stiffness: 150, damping: 20 } }
};

export const tooltipReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 150 } }
};
