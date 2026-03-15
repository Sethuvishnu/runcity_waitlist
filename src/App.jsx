import React, { useState } from "react";
import "./App.css";
import { FaInstagram } from "react-icons/fa";
import ResultScroller from "./ResultScroller";
import logo from "./assets/logo.png";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Name state
  const [members, setMembers] = useState(423);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("white"); // Message color state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || name.trim() === "") return;

    try {
      // const response = await fetch("https://email-grab.onrender.com/waitlist", {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Thank you! You are on the waitlist 🚀");
        setMessageColor("lightgreen");
        setEmail("");
        setName("");

        if (data.total !== undefined) {
          setMembers(data.total + 423); // optional offset
        }
      } else {
        setMessage("Something went wrong. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setMessageColor("red");
    }
  };

  return (
    <div className="container">
      {/* Circular Logo */}
      

      <div className="topbar">
        <div className="logo-circle">
        <img src={logo} alt="RunCity Logo" className="logo-img" />
      </div>
        <div className="logo-text">RunCity</div>
        <a href="https://instagram.com" className="insta">
          <FaInstagram size={28} />
        </a>
      </div>

      <div className="main">
        <h1 className="small-text">Track your runs.</h1>

        <h1 className="big-text">
          <span className="match">Power  </span>your city.
        </h1>
        <h1 className="small-text">Climb the global rankings.</h1>

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
    <button className="submit-button">Join Waitlist</button>
    {/* <button type="button" className="Early-Adoptor">Early-Adoptor</button> */}
  </div>
        </form>

        {/* <div className="number">Number of members joined : {members}</div> */}

        <div
          className="message"
          style={{ color: messageColor, margin: "20px 0" }}
        >
          {message}
        </div>

        {/* <div className="scroller-container">
          <ResultScroller />
        </div> */}
      </div>
    </div>
  );
}

export default App;