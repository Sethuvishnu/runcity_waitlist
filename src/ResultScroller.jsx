import React, { useEffect } from "react";
import "./ResultScroller.css";

function ResultScroller() {

  useEffect(() => {

    const scrollers = document.querySelectorAll(".result");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {

      scrollers.forEach((scroller) => {

        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".result-list");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {

          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);

          scrollerInner.appendChild(duplicatedItem);

        });

      });

    }

  }, []);

  return (

    <div className="result">

      <ul className="result-list">

        <li className="result-row">
          <img src="/image/s1.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/ss1.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/s2.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/ss2.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/s3.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/ss3.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/s4.png" alt="result"/>
        </li>

        <li className="result-row">
          <img src="/image/ss4.png" alt="result"/>
        </li>

      </ul>

    </div>

  );
}

export default ResultScroller;