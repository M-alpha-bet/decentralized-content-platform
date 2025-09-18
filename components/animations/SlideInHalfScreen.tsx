"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SlideInHalfScreen({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
