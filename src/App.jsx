import React, { useState, useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import logo from "./assets/logo_1.png";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "https://runcity-waitlist.onrender.com";

// Pixel character frames — CSS-drawn, no images needed
// We animate between "fit" and "chubby" states based on scroll

const tickerItems = [
  "Run Today", "Stay Fit", "Rank Up", "Own Your City",
  "Keep Running", "Don't Skip", "Leaderboard", "Your Streets",
];

function PixelCharacter({ state = "fit" }) {
  // state: "fit" | "chubby" | "running"
  return (
    <div className={`pixel-char pixel-char--${state}`} aria-hidden="true">
      <div className="pc-head" />
      <div className="pc-body" />
      <div className="pc-legs">
        <div className="pc-leg pc-leg--l" />
        <div className="pc-leg pc-leg--r" />
      </div>
      {state === "running" && <div className="pc-sweat" />}
      {state === "chubby" && <div className="pc-belly" />}
    </div>
  );
}

function CalorieBar({ percent = 80 }) {
  return (
    <div className="cal-bar-wrap">
      <span className="cal-bar-label">FITNESS</span>
      <div className="cal-bar-track">
        <div
          className="cal-bar-fill"
          style={{ width: `${percent}%`, background: percent > 60 ? "#00FF87" : percent > 30 ? "#FFD600" : "#FF3B3B" }}
        />
      </div>
      <span className="cal-bar-pct">{percent}%</span>
    </div>
  );
}

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
        setMessage({ text: "✓ You're on the list. Your character is safe.", type: "success" });
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
        {submitting ? "Saving your character..." : buttonLabel}
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
  const [scrollProgress, setScrollProgress] = useState(0); // 0–100
  const [charState, setCharState] = useState("fit");
  const heroRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/waitlist/count`)
      .then((r) => r.json())
      .then((d) => { if (d.total) setCount(d.total + 423); })
      .catch(() => {});

    const onScroll = () => {
      const scrollY = window.scrollY;
      setNavScrolled(scrollY > 40);

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const pct = Math.round((scrollY / maxScroll) * 100);
      setScrollProgress(pct);

      // Character gets chubby when user stops scrolling (is being lazy)
      if (pct < 15) setCharState("fit");
      else if (pct < 45) setCharState("running");
      else if (pct < 75) setCharState("fit");
      else setCharState("chubby");
    };

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

  const fitnessPercent = Math.max(10, 100 - scrollProgress * 0.6 + (charState === "running" ? 20 : 0));

  return (
    <>
      <div id="rc-cursor" className="rc-cursor" />
      <div id="rc-ring"   className="rc-ring" />

      {/* Floating character HUD */}
      <div className="char-hud">
        <PixelCharacter state={charState} />
        <CalorieBar percent={Math.min(100, Math.round(fitnessPercent))} />
        <p className="char-hud-hint">
          {charState === "chubby"
            ? "⚠ Keep scrolling — your character is getting lazy!"
            : charState === "running"
            ? "🏃 Nice! Keep going!"
            : "💪 Your character is fit!"}
        </p>
      </div>

      {/* NAV */}
      <nav className={`rc-nav ${navScrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="rc-nav-logo">
          <img src={logo} alt="RunCity" className="rc-nav-img" />
          <span>RunCity</span>
        </a>
        <ul className="rc-nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#stakes">The Stakes</a></li>
          <li><a href="#rank">Rank</a></li>
          <li><a href="#join" className="rc-nav-cta">Save your character</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" className="rc-hero" ref={heroRef}>
        <div className="hero-grid-bg" />
        <div className="glow-center" />
        <div className="hero-inner">
          <div className="hero-char-showcase">
            <div className="char-card char-card--fit">
              <PixelCharacter state="fit" />
              <span className="char-label char-label--good">YOU RUN</span>
            </div>
            <div className="char-vs">VS</div>
            <div className="char-card char-card--bad">
              <PixelCharacter state="chubby" />
              <span className="char-label char-label--bad">YOU DON'T</span>
            </div>
          </div>

          <p className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Early access — waitlist open now
          </p>

          <h1 className="hero-headline">
            <span className="line-white">Run.</span>
            <span className="line-accent">Rank.</span>
            <span className="line-white">Stay Fit.</span>
          </h1>

          <p className="hero-sub">
            Create your character. Run IRL to keep it fit.<br />
            Slack off and watch it grow.
          </p>

          <div className="hero-form-card">
            <WaitlistForm
              buttonLabel="Save my character →"
              onSuccess={(t) => setCount(t + 423)}
            />
          </div>

          <p className="hero-count">
            <span>{count}</span> runners keeping their characters alive
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div className="rc-ticker-wrap">
        <div className="rc-ticker">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="rc-ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="rc-section">
        <div className="rc-label">How it works</div>
        <div className="how-steps">
          {[
            { emoji: "🎮", title: "Create your character", body: "Pick your runner. Name them. They're yours." },
            { emoji: "🏃", title: "Run in real life", body: "Every km you log feeds your character. Miss a day and they start getting lazy." },
            { emoji: "📈", title: "Rank your city", body: "Compete on local leaderboards. Own your streets." },
            { emoji: "💀", title: "Don't stop running", body: "Your character reflects your real fitness. No runs = chubby character. Simple." },
          ].map((s, i) => (
            <div key={i} className="how-step">
              <div className="how-step-emoji">{s.emoji}</div>
              <div className="how-step-title">{s.title}</div>
              <div className="how-step-body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THE STAKES */}
      <section id="stakes" className="rc-section rc-stakes-section">
        <div className="rc-label">The Stakes</div>
        <div className="stakes-compare">
          <div className="stakes-col stakes-col--run">
            <div className="stakes-header">🏃 You Run</div>
            <PixelCharacter state="fit" />
            <ul>
              <li>✓ Fit character</li>
              <li>✓ Climb the leaderboard</li>
              <li>✓ Unlock city routes</li>
              <li>✓ Earn rank badges</li>
              <li>✓ Own your streets</li>
            </ul>
          </div>
          <div className="stakes-divider" />
          <div className="stakes-col stakes-col--lazy">
            <div className="stakes-header">🛋 You Don't</div>
            <PixelCharacter state="chubby" />
            <ul>
              <li>✗ Character gets fat</li>
              <li>✗ Drop in rankings</li>
              <li>✗ Lose your routes</li>
              <li>✗ No badges</li>
              <li>✗ Others own your streets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* RANK STATS */}
      <div className="rc-stats-bar">
        {[
          ["#1", "Your goal"],
          ["0", "Excuses accepted"],
          ["∞", "Routes to own"],
          ["1", "Character. Yours."],
        ].map(([n, l], i) => (
          <div key={i} className="rc-stat">
            <span className="rc-stat-num">{n}</span>
            <span className="rc-stat-label">{l}</span>
          </div>
        ))}
      </div>

      {/* RANK SECTION */}
      <section id="rank" className="rc-section rc-manifesto-section">
        <div className="rc-manifesto-inner">
          <div className="rc-manifesto-left">
            <div className="rc-label" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <span>Manifesto</span>
            </div>
          </div>
          <div className="rc-manifesto-right">
            <p>Your character is a mirror.<br /><strong>It shows who you really are.</strong></p>
            <p>Skip your run today.<br /><strong>Your character notices.</strong></p>
            <p>There are runners right now<br />who own streets<br /><strong>you walk every day.</strong></p>
            <p>Run to keep your character fit.<br /><strong>Run to take their rank.</strong></p>
            <p><strong>Lace up. Your character is waiting.</strong></p>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="rc-join-section">
        <div className="rc-join-glow" />
        <div className="rc-label" style={{ justifyContent: "center" }}>Early Access</div>
        <div className="join-char-row">
          <PixelCharacter state="running" />
        </div>
        <h2 className="rc-join-headline">
          <span className="line-white">Your character</span>
          <span className="line-accent">needs you.</span>
        </h2>
        <p className="rc-join-sub">
          Join the waitlist. Be first in your city.<br />
          Keep your character fit from day one.
        </p>
        <div className="hero-form-card">
          <WaitlistForm
            buttonLabel="Save my character →"
            onSuccess={(t) => setCount(t + 423)}
          />
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
          <h4>Explore</h4>
          <a href="#how">How it works</a>
          <a href="#stakes">The Stakes</a>
          <a href="#rank">Manifesto</a>
          <a href="#join">Join waitlist</a>
        </div>
        <div className="rc-footer-col">
          <h4>Contact</h4>
          <a href="mailto:getruncityapp@gmail.com">getruncityapp@gmail.com</a>
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