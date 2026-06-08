import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "https://runcity-waitlist.onrender.com";

export default function WaitlistForm({ buttonLabel = "Join the waitlist", onSuccess, centered = false }) {
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
        setMessage({ text: "You're on the list. We'll be in touch.", type: "success" });
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
    <form
      className="hero-form"
      onSubmit={handleSubmit}
      style={centered ? { alignItems: "center" } : {}}
    >
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
        {submitting ? "Joining..." : buttonLabel}
      </button>
      {message.text && (
        <div className={`form-message ${message.type}`}>{message.text}</div>
      )}
    </form>
  );
}
