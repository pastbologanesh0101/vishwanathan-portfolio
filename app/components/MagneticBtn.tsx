"use client";
import { useRef, ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

export default function MagneticBtn({ href, className = "", target, rel, children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.32;
    const dy = (e.clientY - cy) * 0.32;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
    el.style.transition = "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 450);
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic ${className}`}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.15s ease", display: "inline-flex" }}
    >
      {children}
    </a>
  );
}
