import React, { useState } from "react";
import "./App.css";
import { FaInstagram } from "react-icons/fa";
import ResultScroller from "./ResultScroller";
import logo from "./assets/logo_main.png";
import Payment from "./Payment";


function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [members, setMembers] = useState(423);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("white");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ← new

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || name.trim() === "") return;

    setSubmitting(true);

    try {
      const response = await fetch(`${API}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        setEmail("");
        setName("");
        setSubmitted(true); // ← trigger success UI

        if (data.total !== undefined) {
          setMembers(data.total + 423);
        }
      } else {
        setMessage("Something went wrong. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setMessageColor("red");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="topbar">
        <div className="logo-circle">
          <img src={logo} alt="RunCity Logo" className="logo-img" />
        </div>
        <div className="logo-text">RunCity</div>
        <a href="https://www.instagram.com/runcityy?igsh=ejd4eDB2c3BxdmVh" className="insta">
          <FaInstagram size={28} />
        </a>
      </div>

      <div className="main">
        <h1 className="small-text">Track your runs.</h1>

        <h1 className="big-text">
          <span className="match">Power  </span>your city.
        </h1>
        <h1 className="small-text">Climb the global rankings.</h1>

        {submitted ? (
          /* ── Success State ── */
          <div className="success-state">
            <div className="success-icon">🚀</div>
            <h2 className="success-title">You're on the list!</h2>
            <p className="success-sub">We'll see you at the start line.</p>
            <div className="success-badge">#{members} runners and counting</div>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <form className="waitlistForm" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="button-group">
                <button className="submit-button" disabled={submitting}>
                  {submitting ? "Joining..." : "Join Waitlist"}
                </button>
                {/* <Payment /> */}
              </div>
            </form>

            {message && (
              <div className="message" style={{ color: messageColor, margin: "20px 0" }}>
                {message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;