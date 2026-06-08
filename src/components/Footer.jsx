export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="footer-logo">Runcity</div>
          <div className="footer-tagline">Own your city, one run at a time.</div>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <a href="#mission">Mission</a>
          <a href="#beliefs">Why Run</a>
          <a href="#manifesto">Manifesto</a>
          <a href="#join">Join waitlist</a>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <a href="https://www.instagram.com/runcityy" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:getruncityapp@gmail.com">getruncityapp@gmail.com</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2026 Runcity. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy</a>
          &nbsp;|&nbsp;
          <a href="/terms-of-service">Terms</a>
        </p>
      </div>
    </>
  );
}
