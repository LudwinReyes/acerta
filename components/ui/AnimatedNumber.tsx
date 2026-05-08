"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

export default function AnimatedNumber({ value, currency }: { value: number, currency: string }) {
  const springValue = useSpring(0, { stiffness: 100, damping: 20 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const display = useTransform(springValue, (current) => 
    new Intl.NumberFormat('es-PE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(current)
  );

  if (!mounted) {
    return <span>{new Intl.NumberFormat('es-PE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)}</span>;
  }

  return <motion.span>{display}</motion.span>;
}
