import { useEffect, useRef } from "react";

const paragraphs = [
  "We are building the running app that knows your streets.",
  "Not generic routes pulled from a map — but curated paths that belong to your city, your neighbourhood, your block.",
  <>Every run earns you a place on the leaderboard. Every kilometre is a claim on the city you live in.</>,
  <>Runcity is for the runner who wants to <em>matter</em> — not just finish.</>,
];

export default function MissionSection() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.2 }
    );
    refs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = i * 0.15 + "s";
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission">
      <div className="section-label">Mission <span style={{ marginLeft: 8 }}>02</span></div>
      <div className="mission-text">
        {paragraphs.map((text, i) => (
          <p key={i} ref={(el) => (refs.current[i] = el)}>{text}</p>
        ))}
      </div>
    </section>
  );
}
