"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import Item from "./Item";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track scroll inside the main container
  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const [progress, setProgress] = useState(0);
  const [scrollPixel, setScrollPixel] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  // Update state whenever scrollYProgress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPixel(latest);
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prevScrollY = scrollY.getPrevious() ?? 0;
    const diff = latest - prevScrollY;
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  const scaleX = useSpring(scrollYProgress);

  return (
    <main
      ref={scrollRef}
      className="relative h-screen overflow-y-scroll bg-gradient-to-b from-sky-300 to-blue-900 text-white"
    >
      {/* A tall inner wrapper to make scrolling possible */}
      <div className="relative h-[300vh]">
        <motion.div
          id="scroll-indicator"
          style={{
            scaleX,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            originX: 0,
            backgroundColor: "#ff0088",
          }}
        />
        <div className="fixed top-4 left-4 p-2 bg-black/50 rounded text-white">
          Scroll Progress: {(progress * 100).toFixed(1)}%
        </div>
        <div className="fixed top-16 left-4 p-2 bg-black/50 rounded text-white">
          Scroll Pixel: {scrollPixel}
        </div>
        <div className="fixed top-28 left-4 p-2 bg-black/50 rounded text-white">
          Scroll Direction: {scrollDirection}
        </div>
        <Item ref={scrollRef} />
        <Item ref={scrollRef} />
        <Item ref={scrollRef} />
        <Item ref={scrollRef} />
        <Item ref={scrollRef} />
        <Item ref={scrollRef} />

      </div>
    </main>
  );
}
