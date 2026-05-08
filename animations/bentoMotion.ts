import { Variants } from "motion/react";

export const bentoHeaderStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

export const bentoWordReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20 }
  }
};

export const bentoGridContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const bentoCard1: Variants = {
  hidden: { opacity: 0, x: -80, y: 80 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", bounce: 0.35, duration: 1.2 }
  }
};

export const bentoCard2: Variants = {
  hidden: { opacity: 0, y: -80 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.35, duration: 1.2 }
  }
};

export const bentoCard3: Variants = {
  hidden: { opacity: 0, x: 80, y: 80 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", bounce: 0.35, duration: 1.2 }
  }
};
