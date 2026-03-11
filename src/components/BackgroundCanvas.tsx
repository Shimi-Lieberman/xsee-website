"use client";

import { useEffect, useRef } from "react";

const HEX_SIZE = 52;
const HEX_W = HEX_SIZE * 2;
const HEX_H = Math.sqrt(3) * HEX_SIZE;

function hexPoly(x: number, y: number, s: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push([x + s * Math.cos(a), y + s * Math.sin(a)]);
  }
  return pts;
}

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glow: number;
};

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const nodes: Node[] = [];

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    }

    for (let i = 0; i < 25; i++) {
      nodes.push({
        x: Math.random() * (W || 1920),
        y: Math.random() * (H || 1080),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.4,
        glow: Math.random() * Math.PI * 2,
      });
    }

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const cW = canvas.width;
      const cH = canvas.height;
      ctx.clearRect(0, 0, cW, cH);
      frame++;

      // Hex grid
      const cols = Math.ceil(cW / HEX_W) + 2;
      const rows = Math.ceil(cH / HEX_H) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * HEX_W * 0.75;
          const y = row * HEX_H + (col % 2) * (HEX_H / 2);
          const pts = hexPoly(x, y, HEX_SIZE - 2);
          const dist = Math.hypot(x - cW / 2, y - cH / 2) / (Math.max(cW, cH) / 2);
          const pulse = Math.sin(frame * 0.012 + dist * 3) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
          ctx.closePath();
          ctx.strokeStyle = `rgba(0,212,255,${0.025 + pulse * 0.02})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          if ((row * cols + col) % 17 === 0) {
            ctx.fillStyle = `rgba(0,212,255,${0.018 + pulse * 0.015})`;
            ctx.fill();
          }
        }
      }

      // Circuit nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = cW;
        if (n.x > cW) n.x = 0;
        if (n.y < 0) n.y = cH;
        if (n.y > cH) n.y = 0;
        n.glow += 0.02;
        const g = Math.sin(n.glow) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + g * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${0.5 + g * 0.4})`;
        ctx.fill();
        if (g > 0.85) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,212,255,0.15)";
          ctx.fill();
        }
      });

      // Orthogonal traces between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 160) {
            const alpha = (1 - d / 160) * 0.25;
            const mx = (nodes[i].x + nodes[j].x) / 2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mx, nodes[i].y);
            ctx.lineTo(mx, nodes[j].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.fillStyle = `rgba(0,212,255,${alpha * 1.5})`;
            ctx.fillRect(mx - 1.5, nodes[i].y - 1.5, 3, 3);
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      id="bg-canvas"
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
