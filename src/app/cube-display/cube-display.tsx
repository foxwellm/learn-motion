"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
export default function ScrollCubeSection({ ref }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    target: sectionRef,
    offset: ["start end", "end start"], // start when section enters, end when it leaves
  });
  console.log("🚀 ~ cube-display.tsx:12 ~ ScrollCubeSection ~ scrollYProgress:", scrollYProgress);

  // Map scroll progress (0–1) to rotation angles
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "50%",
          transform: "translateY(-50%)",
          perspective: 800,
        }}
      >
        <motion.div
          style={{
            width: 150,
            height: 150,
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
            y: translateY,
          }}
        >
          {[
            {
              name: "front",
              element: (
                <Image
                  src="/workprofile.jpeg"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="rounded-2xl object-cover w-full h-auto"
                />
              ),
            },
            {
              name: "back",
              element: (
                <video
                  className="w-full h-auto object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                >
                  <source src={`/phone-demo.webm`} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ),
            },
            { name: "left" },
            { name: "right" },
            { name: "top" },
            { name: "bottom" },
          ].flatMap((face) => (
            <div
              key={face.name}
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                border: "1px solid rgba(0,0,0,0.2)",
                transform: faceTransform(face.name, 75),
                background: faceColor(face.name),
                // backfaceVisibility: "hidden",
                // WebkitBackfaceVisibility: "hidden",
              }}
            >
              {face.element}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
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
