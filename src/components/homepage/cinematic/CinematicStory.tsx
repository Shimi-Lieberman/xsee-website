"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { ACTS, sceneAt } from "./scene";
import StoryGraph from "./StoryGraph";
import { FindingsCounter, FixStepper, ProofCertificate, ValidationTerminal } from "./Instruments";
import "./cinematic.css";

const QUANTUM = 1 / 600;
const LIFECYCLE = ["Discovery", "Attack-path analysis", "Validation", "Remediation", "Revalidation", "Revocable proof"];

function StageInstrument({ scene }: { scene: ReturnType<typeof sceneAt> }) {
  if (scene.act === 1) return <FindingsCounter local={scene.local} />;
  if (scene.act === 2) return <ValidationTerminal lines={scene.logLines} />;
  if (scene.act === 3) return scene.fixStep >= 5 ? <ProofCertificate state={scene.certificate} /> : <FixStepper step={scene.fixStep} />;
  if (scene.act === 4) return <ProofCertificate state={scene.certificate} />;
  return null;
}

export default function CinematicStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const inView = useInView(trackRef, { margin: "0px 0px 0px 0px" });
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const [position, setPosition] = useState(0);

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

  const wide = useMemo(() => sceneAt(position, "wide"), [position]);
  const tall = useMemo(() => sceneAt(position, "tall"), [position]);
  const act = wide.act;
  const animate = !reducedMotion && inView;

  const jumpTo = (index: number) => {
    document.getElementById(`act-${ACTS[index].key}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="top" className="cs" aria-labelledby="cs-title" data-nav-tone="dark">
      <div ref={trackRef} className="cs-track">
        <div className="cs-stage-col">
          <div className="cs-stage">
            <div className="cs-stage-top">
              <span className="cs-stage-tag">
                <span className="cs-live-dot" aria-hidden />
                AP-12 · illustrative environment
              </span>
              <span className="cs-stage-act" aria-hidden>
                {String(act + 1).padStart(2, "0")} / 05 · {ACTS[act].label}
              </span>
            </div>
            <div className="cs-graph-frame" data-act={act} data-cert={wide.certificate}>
              <StoryGraph scene={wide} layout="wide" reducedMotion={!animate} className="cs-graph--wide" />
              <StoryGraph scene={tall} layout="tall" reducedMotion={!animate} className="cs-graph--tall" />
              <div className="cs-instrument" key={act}>
                <StageInstrument scene={wide} />
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
                    <span style={{ transform: `scaleX(${i < act ? 1 : i === act ? wide.local : 0})` }} />
                  </span>
                  <span className="cs-rail-label">{a.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <p className="sr-only">
            Illustrative story of attack path AP-12 in a fictional AWS environment: an internet-facing load balancer forwards to web-frontend,
            whose task role can assume role-batch-ops and read the prod/orders-db secret. XSEE validates the path with read-only collection and
            policy simulation, your team approves and applies a trust-policy fix, a re-test verifies closure, and a later trust-policy change
            revokes the closure record.
          </p>
        </div>

        <div className="cs-copy">
          <article id="act-invisible" className="cs-act cs-act--hero">
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>01</span> The invisible threat
              </p>
              <h1 id="cs-title" className="cs-h1 text-balance">
                Your cloud has a story you cannot see.
              </h1>
              <p className="cs-lede text-pretty">
                XSEE reveals how identities, permissions, and infrastructure combine into real attack paths.
              </p>
              <p className="cs-mantra">
                Trust nothing. <span>Prove everything.</span>
              </p>
              <div className="cs-actions">
                <Link href="/demo" className="cs-btn cs-btn--primary" onClick={() => Analytics.ctaClicked("hero", "book_demo")}>
                  Book a demo <ArrowRight size={16} aria-hidden />
                </Link>
                <a className="cs-btn cs-btn--ghost" href="#workflow">
                  Explore the workflow
                </a>
              </div>
              <a href="#act-connect" className="cs-scroll-cue" onClick={(e) => (e.preventDefault(), jumpTo(1))}>
                <span>Scroll to follow the path</span>
                <ArrowDown size={14} aria-hidden />
              </a>
            </div>
          </article>

          <article id="act-connect" className="cs-act">
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>02</span> Connect the dots
              </p>
              <h2 className="cs-h2 text-balance">A finding is not an attack path.</h2>
              <p className="cs-lede text-pretty">
                XSEE connects the relationships that reveal how an attacker could move through your cloud.
              </p>
              <a className="cs-link" href="#walkthrough">
                Explore the attack path <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </article>

          <article id="act-prove" className="cs-act">
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>03</span> From possibility to proof
              </p>
              <h2 className="cs-h2 text-balance">Possible is not proven.</h2>
              <p className="cs-lede text-pretty">XSEE turns attack-path hypotheses into evidence-backed security decisions.</p>
              <p className="cs-note">Each hop is marked observed, assumed, or simulated. Nothing is changed in your account.</p>
              <a className="cs-link" href="#reactor">
                Open the evidence reactor <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </article>

          <article id="act-close" className="cs-act">
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>04</span> Close the loop
              </p>
              <h2 className="cs-h2 text-balance">From proof to closure.</h2>
              <p className="cs-lede text-pretty">Move from validated exposure to remediation, revalidation, and documented closure.</p>
              <p className="cs-note">A person on your team approves the fix and your pipeline applies it. XSEE re-checks the path and records the result.</p>
            </div>
          </article>

          <article id="act-drift" className="cs-act">
            <div className="cs-act-inner">
              <p className="cs-eyebrow">
                <span>05</span> Trust is never permanent
              </p>
              <h2 className="cs-h2 text-balance">Security changes. Proof must keep up.</h2>
              <p className="cs-lede text-pretty">
                Continuous reassessment keeps security conclusions aligned with changing cloud environments.
              </p>
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
    </section>
  );
}
