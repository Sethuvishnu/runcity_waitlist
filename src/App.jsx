import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import logo from "./assets/logo_1.png";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "https://runcity-waitlist.onrender.com";

function WaitlistForm({ buttonLabel = "Join the waitlist", onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch(`${API}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "✓ You're on the list.", type: "success" });
        setName("");
        setEmail("");
        if (onSuccess) onSuccess(data.total);
      } else {
        setMessage({ text: data.message || "Something went wrong.", type: "error" });
      }
    } catch {
      setMessage({ text: "Connection error. Try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="off"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="off"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : buttonLabel}
      </button>
      {message.text && (
        <div className={`form-message ${message.type}`}>{message.text}</div>
      )}
    </form>
  );
}

export default function App() {
  const [count, setCount] = useState(423);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    fetch(`${API}/waitlist/count`)
      .then((r) => r.json())
      .then((d) => { if (d.total) setCount(d.total + 423); })
      .catch(() => {});

    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const dot  = document.getElementById("rc-cursor");
    const ring = document.getElementById("rc-ring");
    const onMouse = e => {
      if (dot)  { dot.style.left  = e.clientX - 4  + "px"; dot.style.top  = e.clientY - 4  + "px"; }
      if (ring) { ring.style.left = e.clientX - 18 + "px"; ring.style.top = e.clientY - 18 + "px"; }
    };
    document.addEventListener("mousemove", onMouse);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      <div id="rc-cursor" className="rc-cursor" />
      <div id="rc-ring"   className="rc-ring" />

      {/* NAV */}
      <nav className={`rc-nav ${navScrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="rc-nav-logo">
          <img src={logo} alt="RunCity" className="rc-nav-img" />
          <span>RunCity</span>
        </a>
        <ul className="rc-nav-links">
          <li><a href="#hero" className="rc-nav-cta">Join waitlist</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" className="rc-hero">
        <div className="hero-grid-bg" />
        <div className="glow-center" />
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Early access — waitlist open now
          </p>

          <h1 className="hero-headline">
            <span className="line-white">Run today.</span>
            <span className="line-accent">Earn a drop.</span>
          </h1>

          <p className="hero-sub">
            Connect Strava. Every run you log earns you<br />
            a new digital item. 
          </p>

          <div className="hero-form-card">
            <WaitlistForm
              buttonLabel="Join the waitlist →"
              onSuccess={(t) => setCount(t + 423)}
            />
          </div>

          <p className="hero-count">
            <span>{count}</span> people on the waitlist
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="rc-footer">
        <div>
          <div className="rc-footer-logo">
            <img src={logo} alt="RunCity" style={{ width: 22, height: 22, objectFit: "contain" }} />
            RunCity
          </div>
          <div className="rc-footer-tagline">Run, Rank, City.</div>
          <a
            href="https://www.instagram.com/runcityy"
            target="_blank"
            rel="noreferrer"
            className="rc-footer-insta"
          >
            <FaInstagram size={14} /> Instagram
          </a>
        </div>
        <div className="rc-footer-col">
          <h4>Contact</h4>
          <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </footer>
      <div className="rc-footer-bottom">
        <p>© 2026 RunCity. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy</a>&nbsp;|&nbsp;
          <a href="/terms-of-service">Terms</a>
        </p>
      </div>
    </>
  );
}