"use client";

import FloatingCube from "./cube";

export default function Home() {


  return (
    <main
      className="relative h-screen overflow-y-scroll bg-gradient-to-b from-sky-300 to-blue-900 text-white"
    >
      {/* A tall inner wrapper to make scrolling possible */}
      <div className="relative h-[120vh]">
        <FloatingCube />
      </div>
    </main>
  );
}
