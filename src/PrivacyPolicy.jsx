import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo_1.png";
import "./Legal.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <nav className="legal-nav">
        <Link to="/" className="legal-nav-logo">
          <img src={logo} alt="RunCity" />
          <span>RunCity</span>
        </Link>
      </nav>

      <div className="legal-inner">
        <div className="legal-header">
          <p className="legal-eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: July 4, 2026</p>
        </div>

        <div className="legal-body">

          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to RunCity ("we", "our", or "us"). We are committed to protecting your personal
              information and your right to privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our RunCity mobile application and
              website (collectively, the "Service").
            </p>
            <p>
              Please read this policy carefully. If you disagree with its terms, please discontinue
              use of the Service. For any questions, contact us at{" "}
              <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li><strong>Account data:</strong> Name and email address when you join our waitlist or create an account.</li>
              <li><strong>Profile data:</strong> Username, character name, and profile picture if you choose to add one.</li>
              <li><strong>Communications:</strong> Messages or feedback you send us directly.</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Location data:</strong> GPS data to track your runs, map your routes, and calculate city rankings. We only collect location when the app is active and you have started a run.</li>
              <li><strong>Activity data:</strong> Run distance, duration, pace, route, and frequency.</li>
              <li><strong>Device data:</strong> Device type, operating system, app version, and unique device identifiers.</li>
              <li><strong>Usage data:</strong> How you interact with the app, features used, and time spent.</li>
            </ul>

            <h3>2.3 Health & Fitness Data</h3>
            <p>
              RunCity may collect or access health and fitness data (steps, heart rate) with your
              explicit permission through Apple HealthKit or Google Fit. We do not sell this data
              or use it for advertising purposes.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain the RunCity Service</li>
              <li>Create and manage your character and fitness profile</li>
              <li>Calculate your city rank and leaderboard position</li>
              <li>Display your running routes on city maps</li>
              <li>Send you waitlist updates and product announcements (with your consent)</li>
              <li>Improve, personalize, and expand our Service</li>
              <li>Understand and analyze how you use the app</li>
              <li>Develop new features and functionality</li>
              <li>Communicate with you for customer support</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing Your Information</h2>
            <p>We do not sell your personal data. We may share information in the following limited cases:</p>
            <ul>
              <li><strong>Publicly on the app:</strong> Your username, character, city rank, and run routes may be visible to other RunCity users as part of the leaderboard and community features. You can adjust visibility in your privacy settings.</li>
              <li><strong>Service providers:</strong> Trusted third-party vendors who help us operate the Service (e.g. cloud hosting, analytics), bound by confidentiality agreements.</li>
              <li><strong>Legal requirements:</strong> If required by law, court order, or to protect the rights and safety of RunCity and its users.</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred with prior notice to you.</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide
              the Service. If you delete your account, we will delete or anonymize your data within 30 days,
              except where we are required to retain it for legal obligations.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten").</li>
              <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format.</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time via the link in our emails or by contacting us.</li>
              <li><strong>Restriction:</strong> Request that we limit how we use your data in certain circumstances.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2>7. Location Data & Permissions</h2>
            <p>
              RunCity requires location access to function. Specifically:
            </p>
            <ul>
              <li><strong>Foreground location:</strong> Used while you actively run to track your route.</li>
              <li><strong>Background location (optional):</strong> Used only if you enable auto-tracking. You can disable this in your device settings at any time.</li>
            </ul>
            <p>
              We do not share your precise location with other users — only your run routes and the city
              zones you have run in are displayed publicly.
            </p>
          </section>

          <section>
            <h2>8. Security</h2>
            <p>
              We use industry-standard security measures including encryption in transit (TLS) and at
              rest to protect your data. However, no method of transmission over the internet is 100%
              secure. We encourage you to use a strong password and to contact us immediately if you
              suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2>9. Children's Privacy</h2>
            <p>
              RunCity is not directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13. If we become aware that a child under 13
              has provided us with personal data, we will delete it immediately. If you believe your
              child has provided us with their information, please contact{" "}
              <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>.
            </p>
          </section>

          <section>
            <h2>10. Third-Party Services</h2>
            <p>
              The Service may contain links to third-party websites or integrate with third-party
              platforms (e.g. Apple HealthKit, Google Fit, Strava). We are not responsible for the
              privacy practices of those services. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              "Last updated" date at the top of this page and notify you via email or an in-app
              notice if the changes are material. Your continued use of the Service after any changes
              constitutes your acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="legal-contact-box">
              <p><strong>RunCity</strong></p>
              <p>Email: <a href="mailto:app@runcity.xyz">app@runcity.xyz</a></p>
              <p>Instagram: <a href="https://www.instagram.com/runcityy" target="_blank" rel="noreferrer">@runcityy</a></p>
            </div>
          </section>

        </div>

        <div className="legal-footer-links">
          <Link to="/">← Back to RunCity</Link>
          <Link to="/terms-of-service">Terms of Service →</Link>
        </div>
      </div>
    </div>
  );
}
