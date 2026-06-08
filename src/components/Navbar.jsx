import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo">Runcity</a>
      <ul className="nav-links">
        <li><a href="#mission">Mission</a></li>
        <li><a href="#beliefs">Why Run</a></li>
        <li><a href="#manifesto">Manifesto</a></li>
        <li><a href="#join">Join</a></li>
      </ul>
    </nav>
  );
}
