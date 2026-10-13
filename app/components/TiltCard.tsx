"use client";
import { useRef, ReactNode } from "react";

export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 6;
    const rotY = x * 6;
    el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    // spotlight
    const spot = el.querySelector<HTMLDivElement>(".tilt-spot");
    if (spot) {
      const px = (e.clientX - rect.left);
      const py = (e.clientY - rect.top);
      spot.style.background = `radial-gradient(200px circle at ${px}px ${py}px, rgba(140,194,255,0.07), transparent 70%)`;
      spot.style.opacity = "1";
    }
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    const spot = el.querySelector<HTMLDivElement>(".tilt-spot");
    if (spot) spot.style.opacity = "0";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  }

  return (
    <div
      ref={ref}
      className={`proj-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ position: "relative", willChange: "transform", transformStyle: "preserve-3d" }}
    >
      <div className="tilt-spot" style={{ position: "absolute", inset: 0, borderRadius: 4, pointerEvents: "none", opacity: 0, transition: "opacity 0.3s" }} />
      {children}
    </div>
  );
}
