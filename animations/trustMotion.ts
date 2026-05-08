import { Variants } from "motion/react";

export const marqueeVariants: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      duration: 30,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};
