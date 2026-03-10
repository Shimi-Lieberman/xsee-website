"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const PARTICLE_COUNT = 40;
const MOBILE_PARTICLE_COUNT = 20;
const MOBILE_BREAKPOINT = 768;

const options = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: { value: PARTICLE_COUNT },
    color: { value: "rgba(80,140,255,0.35)" },
    shape: { type: "circle" },
    size: { value: { min: 1.5, max: 3 } },
    move: {
      enable: true,
      speed: 0.25,
      direction: "none" as const,
      random: true,
      outModes: { default: "bounce" as const },
    },
    opacity: { value: 0.6 },
  },
  links: {
    enable: true,
    distance: 160,
    opacity: 0.15,
    color: { value: "rgba(120,180,255,0.18)" },
    width: 1,
  },
  interactivity: {
    detect_on: "canvas" as const,
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.3,
      },
    },
  },
  responsive: [
    {
      maxWidth: MOBILE_BREAKPOINT,
      mode: "canvas" as const,
      options: {
        particles: { number: { value: MOBILE_PARTICLE_COUNT } },
        links: { enable: false },
      },
    },
  ],
};

export default function LivingCloudGraph() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const opts = useMemo(() => options, []);

  return (
    <div
      className="absolute inset-0 z-0 opacity-[0.35]"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <Particles id="living-cloud-graph" init={init} options={opts} />
      <div
        className="pointer-events-none absolute inset-0 animate-living-cloud-pulse opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,90,90,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
