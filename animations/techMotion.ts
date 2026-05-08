import { Variants } from "motion/react";
import { useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { MouseEvent, useRef } from "react";

export const techStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const techCardEntry: Variants = {
  hidden: { opacity: 0, z: -100, y: 50 },
  show: {
    opacity: 1,
    z: 0,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

export const typewriterStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

export const typewriterChar: Variants = {
  hidden: { opacity: 0, display: "none" },
  show: {
    opacity: 1,
    display: "inline-block",
    transition: { duration: 0.01 }
  }
};

export function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [0, 1], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-10deg", "10deg"]);
  
  const glowX = useTransform(mouseXSpring, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [0, 1], ["0%", "100%"]);
  
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(22, 121, 171, 0.25) 0%, transparent 60%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return { ref, rotateX, rotateY, glowBackground, handleMouseMove, handleMouseLeave };
}
