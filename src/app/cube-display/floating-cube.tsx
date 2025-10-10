"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function FloatingCube() {
  const [spawnKey, setSpawnKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpawnKey((prev) => prev + 1);
    }, 16000); // spawn every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        perspective: 800,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      <Cube key={spawnKey} />
    </div>
  );
}

function Cube() {
  const size = 100;
  const depth = size / 2;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: "120vh", rotateX: 0, rotateY: 0, rotateZ: 0, z:0 }}
      animate={{
        y: "-120vh",
        rotateX: 720,
        rotateY: 720,
        rotateZ: 360,
        z: -6000
      }}
      transition={{ duration: 16, ease: "easeInOut" }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      {["front", "back", "left", "right", "top", "bottom"].map((face) => (
        <div
          key={face}
          style={{
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            background: faceColor(face),
            opacity: 0.95,
            border: "1px solid rgba(0,0,0,0.2)",
            transform: faceTransform(face, depth),
          }}
        />
      ))}
    </motion.div>
  );
}

function faceTransform(face: string, distance: number): string {
  switch (face) {
    case "front":
      return `translateZ(${distance}px)`;
    case "back":
      return `rotateY(180deg) translateZ(${distance}px)`;
    case "right":
      return `rotateY(90deg) translateZ(${distance}px)`;
    case "left":
      return `rotateY(-90deg) translateZ(${distance}px)`;
    case "top":
      return `rotateX(90deg) translateZ(${distance}px)`;
    case "bottom":
      return `rotateX(-90deg) translateZ(${distance}px)`;
    default:
      return "";
  }
}

function faceColor(face: string): string {
  const colors: Record<string, string> = {
    front: "#09f",
    back: "#0f9",
    left: "#f90",
    right: "#f39",
    top: "#39f",
    bottom: "#9f0",
  };
  return colors[face];
}
