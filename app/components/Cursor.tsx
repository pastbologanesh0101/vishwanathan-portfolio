"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = "none";

    // Build trail dots
    const trailEls: HTMLDivElement[] = [];
    for (let i = 0; i < 8; i++) {
      const el = document.createElement("div");
      el.className = "cur-trail";
      el.style.opacity = String(1 - i / 9);
      el.style.width = el.style.height = `${5 - i * 0.4}px`;
      document.body.appendChild(el);
      trailEls.push(el);
    }
    trail.current = trailEls;

    const trailPositions = trailEls.map(() => ({ x: 0, y: 0 }));

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      }

      // Magnetic effect on buttons/links
      const target = e.target as HTMLElement;
      const magnetic = target.closest(".magnetic");
      if (magnetic && ring.current) {
        ring.current.style.width = ring.current.style.height = "60px";
        ring.current.style.borderColor = "rgba(140,194,255,0.6)";
        ring.current.style.background = "rgba(140,194,255,0.06)";
      } else if (ring.current) {
        ring.current.style.width = ring.current.style.height = "36px";
        ring.current.style.borderColor = "rgba(140,194,255,0.35)";
        ring.current.style.background = "transparent";
      }
    }

    function onLeave() {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    }
    function onEnter() {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    }
    function onClick() {
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px,${ringPos.current.y}px) scale(0.7)`;
        setTimeout(() => {
          if (ring.current) ring.current.style.transform = `translate(${ringPos.current.x}px,${ringPos.current.y}px) scale(1)`;
        }, 120);
      }
    }

    function loop() {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.11;
      ringPos.current.y += dy * 0.11;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px,${ringPos.current.y}px)`;
      }
      // Update trail
      trailPositions.unshift({ ...pos.current });
      trailPositions.pop();
      trailEls.forEach((el, i) => {
        const p = trailPositions[i] ?? trailPositions[trailPositions.length - 1];
        el.style.transform = `translate(${p.x}px,${p.y}px)`;
      });
      raf.current = requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("click", onClick);
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf.current);
      trailEls.forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </>
  );
}
