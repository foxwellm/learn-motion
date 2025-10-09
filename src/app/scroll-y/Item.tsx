"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { RefObject, useRef, useState } from "react";

export default function Item({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
  const innerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref, // nested components need a reference to the container that handles the scrolling
    target: innerRef,
    offset: ["end end", "start start"],
  });

  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <section ref={innerRef} style={itemContainer}>
      <motion.div style={item}>
        <div className=" top-4 left-4 p-2 bg-black/50 rounded text-white">
          Scroll Progress: {(progress * 100).toFixed(1)}%
        </div>
        <figure style={progressIconContainer}>
          <svg style={progressIcon} width="75" height="75" viewBox="0 0 100 100">
            <circle style={progressIconBg} cx="50" cy="50" r="30" pathLength="1" className="bg" />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              style={{
                ...progressIconIndicator,
                pathLength: scrollYProgress,
              }}
            />
          </svg>
        </figure>
      </motion.div>
    </section>
  );
}

/**
 * ==============   Styles   ================
 */

const itemContainer: React.CSSProperties = {
  height: "100vh",
  maxHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const progressIconContainer: React.CSSProperties = {
  // position: "sticky",
  top: 0,
  width: 80,
  height: 80,
  margin: 0,
  padding: 0,
};

const processCircle: React.CSSProperties = {
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
};

const progressIcon: React.CSSProperties = {
  ...processCircle,
  transform: "translateX(-100px) rotate(-90deg)",
  stroke: "#ff0088",
};

const progressIconIndicator: React.CSSProperties = {
  ...processCircle,
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
};

const progressIconBg: React.CSSProperties = {
  opacity: 0.2,
};

const item: React.CSSProperties = {
  width: 200,
  height: 250,
  border: "2px dotted #ff0088",
  position: "relative",
};
