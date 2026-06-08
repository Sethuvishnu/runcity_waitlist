import React, { useState, useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import logo from "./assets/logo_1.png";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "https://runcity-waitlist.onrender.com";

const beliefs = [
  { title: "Local", body: "Your city has routes no app has ever shown you. We surface them." },
  { title: "Competitive", body: "Running alone is fine. Running for rank is addictive. Every run counts." },
  { title: "Community", body: "The best runs happen with people who know the same streets. Find your crew." },
  { title: "Progress", body: "Not just distance. Not just time. Your rank in your city — that's real progress." },
  { title: "Simple", body: "Open. Pick a route. Run. No setup. No friction. Just go." },
  { title: "Yours", body: "Every city gets its own leaderboard. Your rank is earned on your streets." },
];

const tickerItems = ["City Routes","Global Rankings","Local Challenges","Run Tracking","Community","Leaderboards","Urban Explorer","Street Battles"];

function WaitlistForm({ buttonLabel = "Join the waitlist", onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true); setMessage({ text: "", type: "" });
    try {
      const res = await fetch(`${API}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "You're on the list. We'll be in touch.", type: "success" });
        setName(""); setEmail("");
        if (onSuccess) onSuccess(data.total);
      } else {
        setMessage({ text: data.message || "Something went wrong.", type: "error" });
      }
    } catch {
      setMessage({ text: "Connection error. Try again.", type: "error" });
    } finally { setSubmitting(false); }
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Your name" value={name}
        onChange={e => setName(e.target.value)} required autoComplete="off" />
      <input type="email" placeholder="Your email" value={email}
        onChange={e => setEmail(e.target.value)} required autoComplete="off" />
      <button type="submit" disabled={submitting}>
        {submitting ? "Joining..." : buttonLabel}
      </button>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
    </form>
  );
}

export default function App() {
  const [count, setCount] = useState(423);
  const [navScrolled, setNavScrolled] = useState(false);
  const missionRefs = useRef([]);

  useEffect(() => {
    fetch(`${API}/waitlist/count`)
      .then(r => r.json())
      .then(d => { if (d.total) setCount(d.total + 423); })
      .catch(() => {});

    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const dot = document.getElementById("rc-cursor");
    const ring = document.getElementById("rc-ring");
    const onMouse = e => {
      if (dot)  { dot.style.left  = e.clientX - 4  + "px"; dot.style.top  = e.clientY - 4  + "px"; }
      if (ring) { ring.style.left = e.clientX - 18 + "px"; ring.style.top = e.clientY - 18 + "px"; }
    };
    document.addEventListener("mousemove", onMouse);

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    missionRefs.current.forEach(el => el && observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      <div id="rc-cursor" className="rc-cursor" />
      <div id="rc-ring" className="rc-ring" />

      {/* NAV */}
      <nav className={`rc-nav ${navScrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="rc-nav-logo">
          <img src={logo} alt="Runcity" className="rc-nav-img" />
          <span>Runcity</span>
        </a>
        <ul className="rc-nav-links">
          <li><a href="#mission">Mission</a></li>
          <li><a href="#beliefs">Why Run</a></li>
          <li><a href="#manifesto">Manifesto</a></li>
          <li><a href="#join" className="rc-nav-cta">Join waitlist</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" className="rc-hero">
        <div className="glow-center" />
        <div className="hero-inner">

          <p className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Early access — waitlist open now
          </p>

          <h1 className="hero-headline">
            <span className="line-white">Own</span>
            <span className="line-accent">Your</span>
            <span className="line-white">City.</span>
          </h1>

          <p className="hero-sub">
            Track your runs. Conquer local routes.<br />
            Climb the global rankings.
          </p>

          <div className="hero-form-card">
            <WaitlistForm buttonLabel="Claim your spot →" onSuccess={t => setCount(t + 423)} />
          </div>

          <p className="hero-count">
            <span>{count}</span> runners already waiting
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

      {/* MISSION */}
      <section id="mission" className="rc-section">
        <div className="rc-label">Mission <span>02</span></div>
        <div className="rc-mission-text">
          {[
            "We know your streets.",
            "Not generic routes — curated paths that belong to your city.",
            "Every run earns you rank. Every km is a claim on your city.",
            "Run to matter. Not just to finish.",
          ].map((p, i) => (
            <p key={i} ref={el => missionRefs.current[i] = el}
              style={{ transitionDelay: `${i * 0.12}s` }}>{p}</p>
          ))}
        </div>
      </section>

      {/* BELIEFS */}
      <section id="beliefs" className="rc-section">
        <div className="rc-label">Why run <span>03</span></div>
        <div className="rc-beliefs-grid">
          {beliefs.map((b, i) => (
            <div key={i} className="rc-belief-card">
              <div className="rc-belief-num">0{i + 1}</div>
              <div className="rc-belief-title">{b.title}</div>
              <div className="rc-belief-body">{b.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div className="rc-stats-bar">
        {[["01", "Cities launching"], ["∞", "Routes to discover"], ["#1", "Your goal"], ["0", "Excuses accepted"]].map(([n, l], i) => (
          <div key={i} className="rc-stat">
            <span className="rc-stat-num">{n}</span>
            <span className="rc-stat-label">{l}</span>
          </div>
        ))}
      </div>

      {/* MANIFESTO */}
      <section id="manifesto" className="rc-section rc-manifesto-section">
        <div className="rc-manifesto-inner">
          <div className="rc-manifesto-left">
            <div className="rc-label" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <span>Manifesto</span><span>04</span>
            </div>
          </div>
          <div className="rc-manifesto-right">
            <p>The city is not a backdrop.<br /><strong>It is the arena.</strong></p>
            <p>Every street you run<br /><strong>is a statement.</strong></p>
            <p>There are runners right now<br />who own streets<br /><strong>you walk every day.</strong></p>
            <p>Runcity is the place<br /><strong>where that changes.</strong></p>
            <p><strong>Lace up. The leaderboard is waiting.</strong></p>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="rc-join-section">
        <div className="rc-join-glow" />
        <div className="rc-label" style={{ justifyContent: "center" }}>Early Access <span>05</span></div>
        <h2 className="rc-join-headline">
          <span className="line-white">Run first.</span>
          <span className="line-accent">Rank first.</span>
        </h2>
        <p className="rc-join-sub">Join the waitlist. Be first in your city when we launch.</p>
        <div className="hero-form-card">
          <WaitlistForm buttonLabel="Claim your spot →" onSuccess={t => setCount(t + 423)} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="rc-footer">
        <div>
          <div className="rc-footer-logo">
            <img src={logo} alt="Runcity" style={{ width: 22, height: 22, objectFit: "contain" }} />
            Runcity
          </div>
          <div className="rc-footer-tagline">Own your city, one run at a time.</div>
          <a href="https://www.instagram.com/runcityy" target="_blank" rel="noreferrer" className="rc-footer-insta">
            <FaInstagram size={14} /> Instagram
          </a>
        </div>
        <div className="rc-footer-col">
          <h4>Explore</h4>
          <a href="#mission">Mission</a>
          <a href="#beliefs">Why Run</a>
          <a href="#manifesto">Manifesto</a>
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
        <p>© 2026 Runcity. All rights reserved.</p>
        <p><a href="/privacy-policy">Privacy</a>&nbsp;|&nbsp;<a href="/terms-of-service">Terms</a></p>
      </div>
    </>
  );
}