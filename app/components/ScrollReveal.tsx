"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
