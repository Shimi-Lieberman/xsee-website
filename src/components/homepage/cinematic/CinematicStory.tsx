"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, Play } from "lucide-react";
import { DIRECTOR_SECONDS, DirectorBar, useDirector } from "./DirectorMode";
import { Analytics } from "@/lib/analytics";
import { ACTS } from "./scene";
import { cinemaAt, type Cinema } from "./cinema";
import { atmosphereAt, atmosphereVars } from "./atmosphere";
import { AtmosphereBack, AtmosphereFront } from "./Atmosphere";
import CinemaStage from "./CinemaStage";
import CinemaChrome, { titleCardOpacity } from "./CinemaChrome";
import { EvidenceChamber, FindingsCounter, FixStepper, ProofCertificate } from "./Instruments";
import "./cinematic.css";
import "./chrome.css";
import "./chamber.css";

const QUANTUM = 1 / 600;
const LIFECYCLE = ["Discovery", "Attack-path analysis", "Validation", "Remediation", "Revalidation", "Revocable proof"];

function StageInstrument({ c }: { c: Cinema }) {
  if (c.act === 1) return <FindingsCounter local={c.t} />;
  if (c.act === 2) return <EvidenceChamber lines={c.logLines} />;
  if (c.act === 3) return c.certificate === "verified" ? <ProofCertificate state={c.certificate} /> : <FixStepper step={c.fixStep} />;
  if (c.act === 4) return <ProofCertificate state={c.certificate} />;
  return null;
}

export default function CinematicStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const inView = useInView(trackRef, { margin: "0px 0px 0px 0px" });
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const [position, setPosition] = useState(() => 0);
  const director = useDirector(trackRef, inView);

  const update = (value: number) => {
    const next = Math.round((value * 5) / QUANTUM) * QUANTUM;
    setPosition((prev) => (prev === next ? prev : next));
  };
  useMotionValueEvent(smooth, "change", (v) => {
    if (!reducedMotion) update(v);
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reducedMotion) update(v);
  });

  const c = useMemo(() => cinemaAt(position), [position]);
  const act = c.act;
  const animate = !reducedMotion && inView;
  // Each act's copy unsticks and slides up over the scene near the act's end; retire it first so the closing frame stays clear.
  // The last act ends on a pull-back to the whole infrastructure, so its copy and record step aside for that shot.
  const finalPullback = act === 4 && c.t > 0.84;
  const copyExiting = (act < 4 && position - act > 0.76) || finalPullback;
  const copyLive = (act === 0 || titleCardOpacity(position) < 0.4) && !copyExiting;
  const actClass = (i: number, extra = "") =>
    `cs-act${extra}${i === act && copyLive ? " is-active" : ""}${i === act && c.beat ? " is-beat" : ""}`;
  const depth = {
    "--cn-focus": reducedMotion ? 0 : c.focus.toFixed(3),
    "--cn-chamber": reducedMotion ? 0 : c.chamber.toFixed(3),
    ...atmosphereVars(atmosphereAt(position, c)),
  } as CSSProperties;

  const jumpTo = (index: number) => {
    document.getElementById(`act-${ACTS[index].key}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="top" className="cs" aria-labelledby="cs-title" data-nav-tone="dark">
      <div ref={trackRef} className="cs-track">
        <div className="cs-stage-col">
          <div className="cs-stage">
            <div className="cs-graph-frame" data-act={act} data-cert={c.certificate} data-chamber={c.chamber > 0.5 || undefined} style={depth}>
              <CinemaStage c={c} layer="env" layout="wide" animate={animate} className="cs-graph--wide" />
              <CinemaStage c={c} layer="env" layout="tall" animate={animate} className="cs-graph--tall" />
              <AtmosphereBack />
              <CinemaStage c={c} layer="route" layout="wide" animate={animate} className="cs-graph--wide" />
              <CinemaStage c={c} layer="route" layout="tall" animate={animate} className="cs-graph--tall" />
              <AtmosphereFront animate={animate} />
              <div className="cs-scrim" aria-hidden />
              <CinemaChrome position={position} onNext={jumpTo} />
              <div
                className="cs-instrument"
                key={act}
                data-kind={act === 2 ? "chamber" : undefined}
                style={{ opacity: finalPullback ? 0 : undefined, transition: "opacity 0.5s ease" }}
              >
                <StageInstrument c={c} />
              </div>
            </div>
            <nav className="cs-rail" aria-label="Story chapters">
              {ACTS.map((a, i) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={i === act ? "is-active" : i < act ? "is-done" : undefined}
                  aria-current={i === act ? "step" : undefined}
                >
                  <span className="cs-rail-bar" aria-hidden>
                    <span style={{ transform: `scaleX(${i < act ? 1 : i === act ? c.t : 0})` }} />
                  </span>
                  <span className="cs-rail-label">{a.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <p className="sr-only">
            Simulated story of attack path AP-12 in a fictional AWS environment: an internet-facing load balancer forwards to web-frontend,
            whose task role can assume role-batch-ops and read the prod/orders-db secret. The path starts as a candidate. XSEE validates it with
            read-only collection and IAM policy simulation under one stated assumption, and shows one untested branch and one blocked check. Your
            team approves and applies a trust-policy fix in AWS, an XSEE re-check verifies closure, and a later trust-policy change triggers
            reassessment that re-validates the path and revokes the closure record.
          </p>
        </div>

        <div className="cs-copy">
          <div className="cs-lead" aria-hidden />
          <article id="act-invisible" className={actClass(0, " cs-act--hero")}>
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>01</span> System awakening
              </p>
              <h1 id="cs-title" className="cs-h1 text-balance">
                {"You can't defend what you can't prove."}
              </h1>
              <p className="cs-lede cs-lede--strong text-pretty">Validate attack paths. Verify the fix.</p>
              <p className="cs-support text-pretty">
                XSEE reveals how identities, permissions, and infrastructure combine into real attack paths in AWS.
              </p>
              <div className="cs-actions">
                <Link href="/demo" className="cs-btn cs-btn--primary" onClick={() => Analytics.ctaClicked("hero", "book_demo")}>
                  Book a demo <ArrowRight size={16} aria-hidden />
                </Link>
                <a className="cs-btn cs-btn--ghost" href="#workflow">
                  Explore the workflow
                </a>
              </div>
              <button type="button" className="cs-watch" onClick={director.play}>
                <span className="cs-watch-icon" aria-hidden>
                  <Play size={14} />
                </span>
                Watch the story <span className="cs-watch-time">{`· ${DIRECTOR_SECONDS}s`}</span>
              </button>
              <a href="#act-connect" className="cs-scroll-cue" onClick={(e) => (e.preventDefault(), jumpTo(1))}>
                <span>Scroll to enter the cloud</span>
                <ArrowDown size={14} aria-hidden />
              </a>
            </div>
          </article>

          <article id="act-connect" className={actClass(1)}>
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>02</span> The path ignites
              </p>
              <h2 className="cs-h2 text-balance">One connection changes everything.</h2>
              <p className="cs-lede cs-beat text-pretty">But a possible path is not proof.</p>
              <a className="cs-link" href="#walkthrough">
                Explore the attack path <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </article>

          <article id="act-prove" className={actClass(2)}>
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>03</span> The evidence chamber
              </p>
              <h2 className="cs-h2 text-balance">Follow the evidence.</h2>
              <p className="cs-lede text-pretty">Every hop is observed, simulated, or stated as an assumption. Every gap stays visible.</p>
              <p className="cs-note">Read-only collection and IAM policy simulation. Nothing changes in your account.</p>
              <a className="cs-link" href="#reactor">
                Enter the proof engine <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </article>

          <article id="act-close" className={actClass(3)}>
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>04</span> Verify the fix
              </p>
              <h2 className="cs-h2 text-balance">{"The fix isn't the finish line."}</h2>
              <p className="cs-lede cs-lede--strong cs-beat text-pretty">Verification is.</p>
              <p className="cs-note">Your team approves and applies the change in AWS. XSEE re-checks the path and records the result.</p>
            </div>
          </article>

          <article id="act-drift" className={actClass(4)}>
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>05</span> Drift
              </p>
              <h2 className="cs-h2 text-balance">{"Yesterday's proof is not today's security."}</h2>
              <p className="cs-lede cs-beat text-pretty">XSEE keeps the evidence connected to a changing cloud.</p>
              <p className="cs-note">A change triggers reassessment. A closure record is revoked only when the path re-validates.</p>
              <ul className="cs-lifecycle" aria-label="Reassessment loop">
                {LIFECYCLE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
          <div className="cs-tail" aria-hidden />
        </div>
      </div>
      <DirectorBar director={director} labels={ACTS.map((a) => a.label)} />
    </section>
  );
}
