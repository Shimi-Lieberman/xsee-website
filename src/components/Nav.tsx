"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Paddle } from "@paddle/paddle-js";

const SUCCESS_URL = "https://app.xsee.io/login?signup=pending";
const LOGIN_URL = "https://app.xsee.io/login";

function getPaddleEnvironment(): "production" | "sandbox" {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
  if (token.startsWith("live_")) return "production";
  if (token.startsWith("test_")) return "sandbox";
  return process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox" ? "sandbox" : "production";
}

function getPaddle(): Paddle | undefined {
  return (window as Window & { Paddle?: Paddle }).Paddle;
}

export default function Nav() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token || typeof window === "undefined") return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let attempts = 0;
    const maxAttempts = 100;

    const tryInit = () => {
      if (typeof window === "undefined" || !window.Paddle) return false;
      try {
        const P = getPaddle();
        if (!P) return false;
        if (!P.Initialized) {
          P.Environment.set(getPaddleEnvironment());
          P.Initialize({ token });
        }
        return true;
      } catch (e) {
        console.warn("Paddle not ready:", e);
        return false;
      }
    };

    if (tryInit()) return;

    interval = setInterval(() => {
      attempts += 1;
      if (tryInit() || attempts >= maxAttempts) {
        if (interval) clearInterval(interval);
      }
    }, 50);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const openStarterCheckout = useCallback(() => {
    const priceId = process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID;
    if (typeof window === "undefined") return;
    if (!window.Paddle) {
      window.location.href = LOGIN_URL;
      return;
    }
    try {
      const P = getPaddle();
      if (!P?.Checkout || !priceId) {
        window.location.href = LOGIN_URL;
        return;
      }
      if (!P.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
        P.Environment.set(getPaddleEnvironment());
        P.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN });
      }
      P.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        settings: {
          successUrl: SUCCESS_URL,
        },
      });
    } catch (e) {
      console.warn("Paddle not ready:", e);
      window.location.href = LOGIN_URL;
    }
  }, []);

  return (
    <nav id="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="XSEE home">
            <span className="nav-logo-inner" aria-hidden="true">
              <Image
                src="/logo-symbol-only.svg"
                width={44}
                height={44}
                alt=""
                className="nav-logo-mark"
                style={{ background: "transparent" }}
              />
              <span className="nav-logo-stack">
                <span className="nav-logo-title">XSEE</span>
                <span className="nav-logo-tagline">Cloud attack intelligence</span>
              </span>
            </span>
          </Link>
          <nav className="nav-links">
            <Link href="/#how" className="nav-link">
              Platform
            </Link>
            <Link href="/#engines" className="nav-link">
              Engines
            </Link>
            <Link href="/#compare" className="nav-link">
              Why Us
            </Link>
            <Link href="/free-scan" className="nav-link">
              Free Scan
            </Link>
            <Link href="/#pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/#contact" className="nav-link">
              Contact
            </Link>
          </nav>
          <div className="nav-actions">
            <Link href="/under-attack" className="nav-emergency">
              <span className="nav-emergency-dot" />
              Under Attack?
            </Link>
            <div className="nav-status-pill">
              <div className="nav-status-dot" />
              All Systems Operational
            </div>
            <div className="nav-cta-group">
              <button type="button" className="nav-btn-trial" onClick={openStarterCheckout}>
                Start Free Trial →
              </button>
              <Link href={LOGIN_URL} className="nav-btn-launch">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
