"use client";

import { useRef, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";

export function MagneticCard({
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x.toFixed(1)}%`);
    el.style.setProperty("--my", `${y.toFixed(1)}%`);
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (el) {
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    }
    onMouseLeave?.(e);
  }

  return (
    <div
      ref={ref}
      className={`magnetic-card${className ? ` ${className}` : ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
