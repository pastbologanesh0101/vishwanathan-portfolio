"use client";
import { useRef } from "react";

export default function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.parentElement!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(140,194,255,0.055), transparent 65%)`;
    el.style.opacity = "1";
  }

  function onLeave() {
    if (ref.current) ref.current.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        transition: "opacity 0.4s",
      }}
    />
  );
}
