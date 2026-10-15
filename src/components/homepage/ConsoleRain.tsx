"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789<>/=";
const CELL = 15;
const FRAME_MS = 85;
const BACKGROUND = "10, 7, 16";

type Column = { row: number; speed: number };

export default function ConsoleRain({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<Column[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${BACKGROUND})`;
      ctx.fillRect(0, 0, width, height);
      sizeRef.current = { width, height };
      const rows = Math.ceil(height / CELL);
      columnsRef.current = Array.from({ length: Math.ceil(width / CELL) }, (_, i) =>
        columnsRef.current[i] ?? { row: -Math.floor(Math.random() * rows), speed: 0.35 + Math.random() * 0.45 },
      );
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const interval = window.setInterval(() => {
      const { width, height } = sizeRef.current;
      ctx.fillStyle = `rgba(${BACKGROUND}, 0.16)`;
      ctx.fillRect(0, 0, width, height);
      ctx.font = `12px ui-monospace, monospace`;
      ctx.fillStyle = "rgba(255, 75, 166, 0.55)";

      columnsRef.current.forEach((column, index) => {
        if (Math.random() > column.speed) return;
        column.row += 1;
        const y = column.row * CELL;
        if (y > 0) {
          ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], index * CELL + 2, y);
        }
        if (y > height && Math.random() > 0.97) column.row = -Math.floor(Math.random() * 12);
      });
    }, FRAME_MS);

    return () => window.clearInterval(interval);
  }, [running]);

  return <canvas ref={canvasRef} className="xsee-console-rain" aria-hidden="true" />;
}
