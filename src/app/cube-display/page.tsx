"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import FloatingCube from "./floating-cube";
import CubeDisplay from "./cube-display";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Attach scroll tracking to this specific container
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // Convert scroll progress (0–1) to movement in px
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <main
      ref={scrollRef}
      className="relative h-screen overflow-y-scroll bg-gradient-to-b from-sky-300 to-blue-900 text-white"
    >
      {/* A tall inner wrapper to make scrolling possible */}
      <div>
        <section className="relative z-10 h-screen flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold mb-6">Learn Parallax</h1>
          <p className="text-xl opacity-90">Scroll down to see layers move.</p>
        </section>
        {/* <section className="relative h-[100vh]"> */}
          <CubeDisplay ref={scrollRef} />
        {/* </section> */}
        {/* Background layer */}
        <section className="relative h-[100vh]">
          <motion.img
            src="/trees.svg"
            alt="Trees mid"
            style={{ y: yMid }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto opacity-90 scale-[0.55] origin-bottom"
          />

          <motion.img
            src="/mountains.svg"
            alt="Mountains"
            style={{ y: yBg }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto opacity-70 scale-[0.55] origin-bottom"
          />
        </section>

      

          <section className="relative h-[100vh]">
          <FloatingCube />
        </section>
      </div>
    </main>
  );
}
