import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo_1.png";
import "./Legal.css";

export default function TermsOfService() {
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
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: July 4, 2026</p>
        </div>

        <div className="legal-body">

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the RunCity application, website, or any related services
              (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms").
              If you do not agree to these Terms, do not use the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
              For questions, contact us at <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              RunCity is a fitness and gamification platform that allows users to:
            </p>
            <ul>
              <li>Create and manage a personal running character whose appearance reflects your real-world fitness activity</li>
              <li>Track runs using GPS and log distance, pace, and routes</li>
              <li>Compete on city-based leaderboards and rank against other runners in your city</li>
              <li>Discover curated local running routes</li>
              <li>Connect with a community of runners in your city</li>
            </ul>
            <p>
              The Service is currently in early access / waitlist phase. Features may be added,
              changed, or removed at any time without prior notice.
            </p>
          </section>

          <section>
            <h2>3. Eligibility</h2>
            <p>
              You must be at least 13 years old to use the Service. If you are between 13 and 18,
              you must have your parent or guardian's consent. By using the Service, you represent
              and warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section>
            <h2>4. Account Registration & Waitlist</h2>
            <ul>
              <li>You may join our waitlist by providing your name and email address. By doing so, you consent to receive updates about RunCity's launch and related announcements.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree to provide accurate and truthful information when creating an account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account at <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>.</li>
            </ul>
          </section>

          <section>
            <h2>5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
              <li>Falsify or manipulate run data, GPS routes, or leaderboard rankings</li>
              <li>Use bots, scripts, or automated tools to generate fake activity</li>
              <li>Harass, abuse, threaten, or intimidate other users</li>
              <li>Upload or transmit any content that is offensive, defamatory, or infringes on any third-party rights</li>
              <li>Attempt to gain unauthorized access to the Service, servers, or databases</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Impersonate any person or entity, including RunCity staff</li>
              <li>Use the Service to collect or harvest personal data of other users</li>
            </ul>
            <p>
              Violation of these rules may result in immediate suspension or termination of your account.
            </p>
          </section>

          <section>
            <h2>6. Health & Safety Disclaimer</h2>
            <p>
              RunCity is a fitness application. By using it, you acknowledge that:
            </p>
            <ul>
              <li>Physical activity involves inherent risks. You participate at your own risk.</li>
              <li>You should consult a qualified healthcare professional before starting any new exercise program, especially if you have existing health conditions.</li>
              <li>RunCity is not a medical application and does not provide medical advice, diagnosis, or treatment.</li>
              <li>You are solely responsible for your safety while running, including awareness of your surroundings, traffic, and weather conditions.</li>
              <li>RunCity is not liable for any injury, illness, or death that results from your use of the Service or participation in running activities.</li>
            </ul>
          </section>

          <section>
            <h2>7. Location & Data Permissions</h2>
            <p>
              The Service requires access to your device's GPS location to function. By enabling
              location permissions, you consent to us collecting your location data as described
              in our <Link to="/privacy-policy">Privacy Policy</Link>. You may revoke location
              permissions at any time through your device settings, though this will limit the
              functionality of the Service.
            </p>
          </section>

          <section>
            <h2>8. User Content</h2>
            <p>
              You may submit content through the Service, including run data, profile information,
              and comments ("User Content"). By submitting User Content, you:
            </p>
            <ul>
              <li>Grant RunCity a non-exclusive, worldwide, royalty-free license to use, display, and distribute your User Content in connection with operating the Service</li>
              <li>Represent that you own or have the right to submit the content</li>
              <li>Acknowledge that your run routes and rankings may be visible to other users</li>
            </ul>
            <p>
              We reserve the right to remove any User Content that violates these Terms or that we
              deem inappropriate, without notice.
            </p>
          </section>

          <section>
            <h2>9. Intellectual Property</h2>
            <p>
              The Service and all its original content, features, functionality, design, logos, and
              branding are owned by RunCity and protected by applicable intellectual property laws.
              You may not copy, modify, distribute, or create derivative works from our content
              without our written permission.
            </p>
            <p>
              "RunCity", the RunCity logo, and "Run, Rank, City" are trademarks of RunCity. Unauthorized
              use is prohibited.
            </p>
          </section>

          <section>
            <h2>10. Third-Party Services</h2>
            <p>
              The Service may integrate with or link to third-party services (e.g. Apple HealthKit,
              Google Fit, mapping providers). These services are governed by their own terms and privacy
              policies. RunCity is not responsible for the content, practices, or policies of any
              third-party service.
            </p>
          </section>

          <section>
            <h2>11. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF
              ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, error-free, or free of
              viruses or other harmful components. GPS tracking accuracy may vary based on device
              and environmental conditions.
            </p>
          </section>

          <section>
            <h2>12. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, RUNCITY SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA,
              REVENUE, PROFITS, OR GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE,
              EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              Our total liability for any claim arising from these Terms or the Service shall not
              exceed the amount you paid us in the 12 months preceding the claim (or $10 if you
              have not made any payments).
            </p>
          </section>

          <section>
            <h2>13. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without
              cause, and with or without notice. You may also delete your account at any time by
              contacting us at <a href="mailto:app@runcity.xyz">app@runcity.xyz</a>.
            </p>
            <p>
              Upon termination, your right to use the Service ceases immediately. Provisions of
              these Terms that by their nature should survive termination shall survive, including
              intellectual property, disclaimers, and limitations of liability.
            </p>
          </section>

          <section>
            <h2>14. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. When we make material changes,
              we will notify you via email or an in-app notice and update the "Last updated" date.
              Your continued use of the Service after changes take effect constitutes acceptance of
              the new Terms.
            </p>
          </section>

          <section>
            <h2>15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable law.
              Any disputes arising from these Terms or your use of the Service shall be resolved
              through good-faith negotiation first. If unresolved, disputes shall be subject to
              binding arbitration or the jurisdiction of courts in the relevant territory.
            </p>
          </section>

          <section>
            <h2>16. Contact Us</h2>
            <p>
              For any questions about these Terms of Service, please contact us:
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
          <Link to="/privacy-policy">Privacy Policy →</Link>
        </div>
      </div>
    </div>
  );
}
