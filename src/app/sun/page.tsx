"use client";

import { motion } from "motion/react";

export default function SunPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.div
        className="relative w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ffdd55, #ff9900 60%, #cc6600 80%)",
          boxShadow:
            "0 0 60px 20px rgba(255, 165, 0, 0.3), 0 0 120px 40px rgba(255, 140, 0, 0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {/* Optional subtle texture overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3), transparent 70%)",
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>
    </div>
  );
}
