"use client";

import { useEffect, useRef } from "react";

const TERM_LINES = [
  { ts: "09:41:02", type: "t-info", tag: "[INIT]", msg: "Connecting to AWS eu-central-1..." },
  { ts: "09:41:03", type: "t-ok", tag: "[OK]", msg: "Session established · read-only IAM · 23 services in scope" },
  { ts: "09:41:04", type: "t-info", tag: "[SCAN]", msg: "Discovering resources..." },
  { ts: "09:41:07", type: "t-ok", tag: "[OK]", msg: "847 resources mapped · EC2, IAM, S3, VPC, EKS, Lambda" },
  { ts: "09:41:08", type: "t-info", tag: "[PATTERN]", msg: "Loading 1,000+ attack patterns..." },
  { ts: "09:41:09", type: "t-info", tag: "[GRAPH]", msg: "Constructing attack graph..." },
  { ts: "09:41:11", type: "t-ok", tag: "[OK]", msg: "12,847 edges · 847 nodes · graph ready" },
  { ts: "09:41:12", type: "t-info", tag: "[AI]", msg: "Testing AI attacker pathfinding..." },
  { ts: "09:41:12", type: "t-warn", tag: "[!]", msg: "14 candidate attack paths identified" },
  { ts: "09:41:13", type: "t-info", tag: "[L2]", msg: "Running live AWS API validation..." },
  { ts: "09:41:17", type: "t-err", tag: "[!!]", msg: "3 paths CONFIRMED exploitable via live API evidence" },
  { ts: "09:41:18", type: "t-warn", tag: "[SIM]", msg: "Launching XseeCyber simulation..." },
  { ts: "09:41:19", type: "t-info", tag: "[AI]", msg: "Simulating AI attacker behavior..." },
  { ts: "09:41:20", type: "t-err", tag: "[!!]", msg: "Crown jewel reachable in 4 hops · CVE-2020-9283 · RCE confirmed" },
  { ts: "09:41:21", type: "t-info", tag: "[DETECT]", msg: "Measuring detection coverage..." },
  { ts: "09:41:22", type: "t-err", tag: "[!!]", msg: "4 of 14 steps detected by GuardDuty" },
  { ts: "09:41:22", type: "t-err", tag: "[!!]", msg: "Detection Coverage Score: 28%" },
  { ts: "09:41:24", type: "t-ok", tag: "[FIX]", msg: "Optimal cut point identified: 1 SG rule change eliminates 6 paths" },
  { ts: "09:41:25", type: "t-ok", tag: "[DONE]", msg: "Scan complete · Evidence packages ready" },
];

const DELAYS = [0, 500, 950, 1450, 1950, 2450, 2950, 3450, 3950, 4500, 5100, 5750, 6400, 7050, 7700, 8300, 8800, 9200, 9600];

export default function GlobalScripts() {
  const termPlayed = useRef(false);
  const pathActive = useRef(0);

  useEffect(() => {
    const sp = document.getElementById("scroll-progress");
    const nav = document.getElementById("nav");
    const handler = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (sp) sp.style.width = `${pct}%`;
      nav?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.querySelectorAll(".btn").forEach((btn) => {
      const h = (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const s = Math.max(rect.width, rect.height);
        const r = document.createElement("span");
        r.className = "ripple";
        r.style.cssText = `position:absolute;width:${s}px;height:${s}px;left:${e.clientX - rect.left - s / 2}px;top:${e.clientY - rect.top - s / 2}px`;
        btn.appendChild(r);
        setTimeout(() => r.remove(), 550);
      };
      btn.addEventListener("click", h as EventListener);
      return () => btn.removeEventListener("click", h as EventListener);
    });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.add("in")),
      { threshold: 0.1 }
    );
    /* .reveal → ScrollReveal (adds .visible + unobserve) */
    document.querySelectorAll(".reveal-left, .reveal-right, .reveal-scale, .ps-panel").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const cell = e.target as HTMLElement;
          if (cell.dataset.counted) return;
          cell.dataset.counted = "1";
          cell.classList.add("in");
          cell.querySelectorAll(".ctr").forEach((el) => {
            const target = +((el as HTMLElement).dataset.target ?? 0);
            const dur = 1600;
            const start = performance.now();
            const formatter = target >= 1000 ? (n: number) => n.toLocaleString() : (n: number) => String(n);
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              const val = Math.round(ease * target);
              (el as HTMLElement).textContent = formatter(val);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 80px 0px" }
    );
    document.querySelectorAll(".stat-cell").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const tbl = document.getElementById("cmpTable");
    if (!tbl) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll("tbody tr").forEach((r, i) => {
            setTimeout(() => r.classList.add("in"), i * 70);
          });
        });
      },
      { threshold: 0.15 }
    );
    io.observe(tbl);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const out = document.getElementById("termOutput");
    if (!out) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || termPlayed.current) return;
          termPlayed.current = true;
          TERM_LINES.forEach((line, i) => {
            setTimeout(() => {
              const div = document.createElement("div");
              div.className = "tl";
              div.innerHTML = `<span class="t-ts">${line.ts}</span><span class="${line.type}">${line.tag}</span><span class="t-msg">${line.msg}</span>`;
              const cur = out.querySelector(".term-cursor");
              if (cur) out.insertBefore(div, cur);
              out.scrollTop = out.scrollHeight;
            }, DELAYS[i]);
          });
        });
      },
      { threshold: 0.3 }
    );
    io.observe(out);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) el.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const paths = document.querySelectorAll(".af-path");
    if (!paths.length) return;
    const id = setInterval(() => {
      paths.forEach((p) => p.classList.remove("p-active"));
      pathActive.current = (pathActive.current + 1) % paths.length;
      paths[pathActive.current]?.classList.add("p-active");
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return null;
}
