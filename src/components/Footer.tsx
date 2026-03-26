"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const eVal = email.trim();
    const m = message.trim();
    if (!n) {
      setError("Name is required");
      setStatus("error");
      return;
    }
    if (!eVal) {
      setError("Email is required");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(eVal)) {
      setError("Invalid email format");
      setStatus("error");
      return;
    }
    if (!m) {
      setError("Message is required");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: eVal, message: m, website }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong");
    }
  }

  return (
    <footer className="sec-navy">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/logo-primary-transparent.svg"
              alt="XSEE"
              className="footer-logo"
              width={100}
              height={32}
              style={{ background: "transparent" }}
            />
            <p className="footer-tagline">
              XSEE — Cloud Exposure Intelligence. Discover. Validate. Simulate. Fix. Certify. Built for the age of AI attackers.
            </p>
            <div className="footer-status">
              <div className="footer-status-dot" />
              All Systems Operational
            </div>
          </div>
          <div>
            <div className="footer-col-head">Product</div>
            <ul className="footer-links">
              <li>
                <Link href="#how">How It Works</Link>
              </li>
              <li>
                <Link href="#engines">Engines</Link>
              </li>
              <li>
                <Link href="#compare">vs. Wiz</Link>
              </li>
              <li>
                <Link href="#pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-head">Company</div>
            <ul className="footer-links">
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
              <li>
                <Link href="/security">Security</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-head">Resources</div>
            <ul className="footer-links">
              <li>
                <Link href="#">Documentation</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Changelog</Link>
              </li>
              <li>
                <Link href="#">Status</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-contact">
          <h4 className="footer-contact-title">Get in touch</h4>
          {status === "success" ? (
            <p className="footer-contact-success">Thanks! We&apos;ll get back to you soon.</p>
          ) : (
            <form onSubmit={handleContactSubmit} className="footer-contact-form">
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="footer-website">Website</label>
                <input
                  id="footer-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="footer-contact-field">
                <label htmlFor="footer-name" className="footer-contact-label">Name</label>
                <input
                  id="footer-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "loading"}
                  className="footer-contact-input"
                />
              </div>
              <div className="footer-contact-field">
                <label htmlFor="footer-email" className="footer-contact-label">Email</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="footer-contact-input"
                />
              </div>
              <div className="footer-contact-field">
                <label htmlFor="footer-message" className="footer-contact-label">Message</label>
                <textarea
                  id="footer-message"
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "loading"}
                  rows={2}
                  className="footer-contact-input footer-contact-textarea"
                />
              </div>
              <button type="submit" disabled={status === "loading"} className="footer-contact-btn">
                {status === "loading" ? "Sending..." : "Send"}
              </button>
              {status === "error" && error && (
                <p className="footer-contact-err">{error}</p>
              )}
            </form>
          )}
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} XSEE. All rights reserved.</p>
          <div className="footer-legal flex gap-5">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
