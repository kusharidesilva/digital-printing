"use client";
import { m, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);
  return (
    <m.div
      className={className}
      initial={false}
      animate={
        entered && !reduce
          ? { opacity: [0.65, 1], y: [14, 0] }
          : { opacity: 1, y: 0 }
      }
      onViewportEnter={() => setEntered(true)}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
