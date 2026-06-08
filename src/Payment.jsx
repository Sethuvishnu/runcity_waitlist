import { useState } from "react";
import "./Payment.css";

const rules = [
  { icon: "🚀", title: "Early access before anyone else" },
  { icon: "🔒", title: "Lifetime membership" },
  { icon: "✅", title: "Cancel anytime, full refund" },
  { icon: "🏅", title: "Unlock badges, rewards, trails" },
];

const API = import.meta.env.VITE_API_URL || "https://runcity-waitlist.onrender.com";

export default function Payment() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = () => {
    setLoading(true);
    setError("");

    fetch(`${API}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: 1, quantity: 1 }] }),
    })
      .then((res) => (res.ok ? res.json() : res.json().then((j) => Promise.reject(j))))
      .then(({ order }) => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: "RunCity",
          description: "Early Adopter — Lifetime Access",
          handler: () => {
            window.location.href = "https://runcity-waitlist.vercel.app/success";
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              setError("Payment cancelled. Please try again.");
            },
          },
          prefill: { email: "" },
          theme: { color: "#000000" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("Payment failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <button type="button" className="Early-Adoptor" onClick={() => setIsOpen(true)}>
        Early Adopter
      </button>

      {isOpen && (
        <div className="ea-overlay" onClick={() => setIsOpen(false)}>
          <div className="ea-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ea-close" onClick={() => setIsOpen(false)}>&#x2715;</button>

            <span className="ea-badge">Early Adopter Program</span>
            <h2>Before you join, read these rules</h2>
            <p className="ea-sub">
              By continuing you agree to the following terms of the Early Adopter program.
            </p>

            <ul className="ea-rules">
              {rules.map((rule, i) => (
                <li key={i}>
                  <span className="ea-icon">{rule.icon}</span>
                  <span className="ea-text">
                    <strong>{rule.title}</strong>
                  </span>
                </li>
              ))}
            </ul>

            {error && <p className="ea-error">{error}</p>}

            <div className="ea-divider" />

            <div className="ea-actions">
              <button className="ea-btn-secondary" onClick={() => setIsOpen(false)} disabled={loading}>
                Cancel
              </button>
              <button className="ea-btn-primary" onClick={handleJoin} disabled={loading}>
                {loading ? "Redirecting..." : "Pay ₹999 and Join"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
