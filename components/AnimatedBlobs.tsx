"use client";
import { motion } from "framer-motion";

export default function AnimatedBlobs() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), transparent 60%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[35rem] w-[35rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 70% 70%, rgba(16,185,129,0.30), transparent 60%)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.25), transparent 60%)" }}
        animate={{ scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}