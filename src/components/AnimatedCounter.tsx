"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function formatWithCommas(n: number): string {
  return n.toLocaleString();
}

export default function AnimatedCounter({
  value,
  duration = 1,
  delay = 0,
  className = "",
}: {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setDisplay(Math.round(start + (value - start) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value, duration, started]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      {formatWithCommas(display)}
    </motion.span>
  );
}
