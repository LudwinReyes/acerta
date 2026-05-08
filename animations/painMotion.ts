import { Variants } from "motion/react";

export const headerStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const headerWord: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export const cardLeft: Variants = {
  hidden: { opacity: 0, x: -150, rotate: -10 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", bounce: 0.4, duration: 1.2 }
  }
};

export const cardCenter: Variants = {
  hidden: { opacity: 0, y: 150 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4, duration: 1.2 }
  }
};

export const cardRight: Variants = {
  hidden: { opacity: 0, x: 150, rotate: 10 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", bounce: 0.4, duration: 1.2 }
  }
};
