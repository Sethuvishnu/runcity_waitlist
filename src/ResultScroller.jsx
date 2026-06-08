import { useEffect } from "react";
import "./ResultScroller.css";

export default function ResultScroller() {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".result");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scroller) => {
        if (scroller.getAttribute("data-animated")) return; // prevent double-init
        scroller.setAttribute("data-animated", true);
        const inner = scroller.querySelector(".result-list");
        Array.from(inner.children).forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", true);
          inner.appendChild(clone);
        });
      });
    }
  }, []);

  const images = ["s1", "ss1", "s2", "ss2", "s3", "ss3", "s4", "ss4"];

  return (
    <div className="result">
      <ul className="result-list">
        {images.map((name) => (
          <li className="result-row" key={name}>
            <img src={`/image/${name}.png`} alt="result" />
          </li>
        ))}
      </ul>
    </div>
  );
}
