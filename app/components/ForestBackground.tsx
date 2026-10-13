"use client";
import { useEffect, useRef } from "react";

interface Firefly {
  x: number; y: number;
  vx: number; vy: number;
  phase: number; phaseSpeed: number;
  size: number;
}

interface Star { x: number; y: number; r: number; op: number; speed: number; phase: number; }
interface Tree { x: number; jitter: number; }

export default function ForestBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    let mouse = { x: 0.5, y: 0.5 };
    let fireflies: Firefly[] = [];
    let stars: Star[] = [];
    let layers: Tree[][] = [];

    function rng(seed: number) {
      let s = seed;
      return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const r = rng(42);
      stars = Array.from({ length: 90 }, () => ({
        x: r() * W, y: r() * H * 0.44,
        r: r() * 0.9 + 0.2,
        op: r() * 0.3 + 0.06,
        speed: r() * 0.0015 + 0.0004,
        phase: r() * Math.PI * 2,
      }));

      // 4 tree layers: count, height-fraction, base-y-fraction, x-spread
      const layerDefs = [
        { count: 32, h: 0.18, by: 0.80, spread: 1.3, seed: 10 },
        { count: 20, h: 0.28, by: 0.84, spread: 1.2, seed: 20 },
        { count: 12, h: 0.44, by: 0.89, spread: 1.15, seed: 30 },
        { count: 7,  h: 0.68, by: 0.96, spread: 1.1, seed: 40 },
      ];
      layers = layerDefs.map(({ count, seed, spread }) => {
        const lr = rng(seed);
        return Array.from({ length: count }, (_, i) => ({
          x: (i / (count - 1)) * W * spread - W * (spread - 1) / 2 + (lr() - 0.5) * 40,
          jitter: (lr() - 0.5) * 0.12,
        }));
      });

      const fr = rng(99);
      fireflies = Array.from({ length: 22 }, () => ({
        x: fr() * W,
        y: H * 0.38 + fr() * H * 0.44,
        vx: (fr() - 0.5) * 0.35,
        vy: (fr() - 0.5) * 0.18,
        phase: fr() * Math.PI * 2,
        phaseSpeed: fr() * 0.018 + 0.006,
        size: fr() * 1.8 + 0.9,
      }));
    }

    function pine(x: number, baseY: number, h: number, color: string) {
      ctx.fillStyle = color;
      const tw = Math.max(2, h * 0.038);
      ctx.fillRect(x - tw / 2, baseY - h * 0.13, tw, h * 0.13);
      ctx.beginPath();
      ctx.moveTo(x, baseY - h);
      ctx.bezierCurveTo(x + h * 0.21, baseY - h * 0.64, x + h * 0.37, baseY - h * 0.36, x + h * 0.41, baseY - h * 0.12);
      ctx.lineTo(x - h * 0.41, baseY - h * 0.12);
      ctx.bezierCurveTo(x - h * 0.37, baseY - h * 0.36, x - h * 0.21, baseY - h * 0.64, x, baseY - h);
      ctx.closePath();
      ctx.fill();
    }

    const layerDefs = [
      { h: 0.18, by: 0.80, color: "#040b16", px: 12 },
      { h: 0.28, by: 0.84, color: "#030910", px: 28 },
      { h: 0.44, by: 0.89, color: "#020709", px: 50 },
      { h: 0.68, by: 0.96, color: "#010304", px: 90 },
    ];

    function frame(now: number) {
      ctx.clearRect(0, 0, W, H);

      // Sky gradient
      const sg = ctx.createLinearGradient(0, 0, 0, H);
      sg.addColorStop(0, "#010205");
      sg.addColorStop(0.45, "#020810");
      sg.addColorStop(0.78, "#041018");
      sg.addColorStop(1, "#020b12");
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        const op = s.op * (0.6 + 0.4 * Math.sin(now * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${op.toFixed(3)})`;
        ctx.fill();
      }

      // Moon
      const mx = W * 0.74, my = H * 0.14;
      const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
      mg.addColorStop(0, "rgba(190,215,255,0.055)");
      mg.addColorStop(1, "transparent");
      ctx.fillStyle = mg;
      ctx.fillRect(mx - 90, my - 90, 180, 180);
      ctx.beginPath();
      ctx.arc(mx, my, 16, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(210,230,255,0.13)";
      ctx.fill();

      // Far aurora haze
      const ah = ctx.createLinearGradient(0, H * 0.05, 0, H * 0.32);
      ah.addColorStop(0, "transparent");
      ah.addColorStop(0.5, "rgba(60,120,160,0.028)");
      ah.addColorStop(1, "transparent");
      ctx.fillStyle = ah;
      ctx.fillRect(0, H * 0.05, W, H * 0.27);

      // Tree layers + ground fog
      layerDefs.forEach(({ h, by, color, px }, li) => {
        const trees = layers[li] ?? [];
        const offsetX = (mouse.x - 0.5) * px;
        const baseY = H * by;
        for (const t of trees) {
          pine(t.x + offsetX + t.jitter * W * 0.04, baseY, H * h, color);
        }

        // Fog between layers
        if (li < 3) {
          const fg = ctx.createLinearGradient(0, baseY - H * 0.06, 0, baseY + H * 0.04);
          fg.addColorStop(0, "transparent");
          fg.addColorStop(0.5, `rgba(60,110,145,${0.04 + li * 0.012})`);
          fg.addColorStop(1, "transparent");
          ctx.fillStyle = fg;
          ctx.fillRect(0, baseY - H * 0.06, W, H * 0.1);
        }

        // Fireflies between layer 2 and 3
        if (li === 2) {
          for (const f of fireflies) {
            f.x += f.vx;
            f.y += f.vy + Math.sin(f.phase) * 0.12;
            f.phase += f.phaseSpeed;
            if (f.x < -10) f.x = W + 10;
            if (f.x > W + 10) f.x = -10;
            if (f.y < H * 0.3) f.vy = Math.abs(f.vy);
            if (f.y > H * 0.88) f.vy = -Math.abs(f.vy);
            const glow = 0.45 + 0.55 * Math.sin(f.phase * 2.8 + now * 0.0015);
            const fg2 = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 7);
            fg2.addColorStop(0, `rgba(170,230,90,${(glow * 0.5).toFixed(3)})`);
            fg2.addColorStop(1, "transparent");
            ctx.fillStyle = fg2;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size * 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size * 0.75, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(210,255,130,${glow.toFixed(3)})`;
            ctx.fill();
          }
        }
      });

      // Ground fill
      const gg = ctx.createLinearGradient(0, H * 0.88, 0, H);
      gg.addColorStop(0, "#020a10");
      gg.addColorStop(1, "#010204");
      ctx.fillStyle = gg;
      ctx.fillRect(0, H * 0.88, W, H * 0.12);

      // Ground mist
      const gm = ctx.createLinearGradient(0, H * 0.84, 0, H * 0.94);
      gm.addColorStop(0, "transparent");
      gm.addColorStop(0.5, "rgba(80,130,160,0.06)");
      gm.addColorStop(1, "transparent");
      ctx.fillStyle = gm;
      ctx.fillRect(0, H * 0.84, W, H * 0.1);

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
