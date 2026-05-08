import { Variants } from "motion/react";

export const whyUsHeaderStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    }
  }
};

export const whyUsTypewriter: Variants = {
  hidden: { opacity: 0, display: "none" },
  show: {
    opacity: 1,
    display: "inline-block",
    transition: { duration: 0.01 }
  }
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", bounce: 0.3, duration: 1.2 }
  }
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", bounce: 0.3, duration: 1.2 }
  }
};
