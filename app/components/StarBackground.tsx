"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number;
  baseOpacity: number; phase: number; phaseSpeed: number;
  layer: number;
}

interface Shooter {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
}

export default function StarBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0, raf = 0;
    let mouse = { x: 0.5, y: 0.5 };
    let stars: Star[] = [];
    let shooter: Shooter | null = null;
    let nextShot = 4000;

    function generateStars() {
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.1 + 0.15,
        baseOpacity: Math.random() * 0.55 + 0.08,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.0018 + 0.0004,
        layer: Math.random(),
      }));
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      generateStars();
    }

    function aurora(t: number) {
      const bands = [
        { yFrac: 0.22, amp: 0.055, speed: 0.00025, drift: 0,   color: "rgba(140,194,255,0.038)" },
        { yFrac: 0.13, amp: 0.04,  speed: 0.00018, drift: 1.8, color: "rgba(100,150,255,0.024)" },
        { yFrac: 0.32, amp: 0.035, speed: 0.0003,  drift: 3.5, color: "rgba(160,200,255,0.02)"  },
      ];
      for (const b of bands) {
        const y = H * b.yFrac + Math.sin(t * b.speed + b.drift) * H * b.amp;
        const half = H * 0.18;
        const g = ctx.createLinearGradient(0, y - half, 0, y + half);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.5, b.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, y - half, W, half * 2);
      }
    }

    function drawStars(t: number) {
      const mx = (mouse.x - 0.5) * 50;
      const my = (mouse.y - 0.5) * 25;
      for (const s of stars) {
        const x = s.x * W - mx * s.layer;
        const y = s.y * H - my * s.layer;
        const op = s.baseOpacity * (0.65 + 0.35 * Math.sin(t * s.phaseSpeed + s.phase));
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${op.toFixed(3)})`;
        ctx.fill();
      }
    }

    function drawShooter(t: number) {
      if (!shooter) {
        if (t > nextShot) {
          const x = W * (0.4 + Math.random() * 0.5);
          const y = H * (0.05 + Math.random() * 0.3);
          const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.5;
          const speed = 7 + Math.random() * 5;
          shooter = { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, maxLife: 55 + Math.random() * 25 };
          nextShot = t + 6000 + Math.random() * 9000;
        }
        return;
      }
      shooter.x += shooter.vx;
      shooter.y += shooter.vy;
      shooter.life++;
      const prog = shooter.life / shooter.maxLife;
      const op = Math.sin(prog * Math.PI) * 0.75;
      const len = 70 * (1 - prog * 0.4);
      const mag = Math.hypot(shooter.vx, shooter.vy);
      const tx = shooter.x - (shooter.vx / mag) * len;
      const ty = shooter.y - (shooter.vy / mag) * len;
      const g = ctx.createLinearGradient(tx, ty, shooter.x, shooter.y);
      g.addColorStop(0, "transparent");
      g.addColorStop(1, `rgba(230,240,255,${op.toFixed(2)})`);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(shooter.x, shooter.y);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      if (shooter.life >= shooter.maxLife || shooter.x > W + 50 || shooter.y > H + 50) {
        shooter = null;
      }
    }

    function frame(now: number) {
      ctx.clearRect(0, 0, W, H);
      aurora(now);
      drawStars(now);
      drawShooter(now);
      raf = requestAnimationFrame(frame);
    }

    function onMouse(e: MouseEvent) {
      mouse = { x: e.clientX / W, y: e.clientY / H };
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    resize();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="star-bg" />;
}
