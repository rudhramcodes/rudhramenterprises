import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import Footer from '../components/Footer/Footer'
import './PolicyPages.css'

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const Section = memo(({ title, children }) => (
  <section className="policy-section">
    <h2>{title}</h2>
    {children}
  </section>
))

Section.displayName = 'PolicySection'

const PrivacyPolicy = memo(() => (
  <>
    <Header />
    <main className="policy-page">
      <div className="policy-page-inner">
        <Link to="/" className="policy-back-link">
          <ArrowLeftIcon />
          Back to Home
        </Link>

        <header className="policy-header">
          <h1>Privacy Policy</h1>
          <p>
            How Rudhram Group collects, uses, and protects your personal
            information across our ventures and platforms.
          </p>
          <div className="policy-meta">
            <span>Last updated: June 1, 2026</span>
            <span>Effective: June 1, 2026</span>
          </div>
        </header>

        <div className="policy-body">
          <Section title="1. Information We Collect">
            <p>
              We collect information you provide directly to us when you interact
              with our platforms, ventures, or services, including:
            </p>
            <ul>
              <li>
                <strong>Contact Information:</strong> Name, email address, phone
                number, and company name when you fill out forms, subscribe to
                updates, or reach out via email.
              </li>
              <li>
                <strong>Inquiry Details:</strong> Messages, preferences, and any
                other information you share when contacting us for partnerships,
                investments, or general inquiries.
              </li>
              <li>
                <strong>Usage Information:</strong> Pages visited, time spent,
                referring URLs, and other standard analytics data collected
                automatically.
              </li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries, partnership requests, and communications</li>
              <li>To improve our platforms, ventures, and user experience</li>
              <li>To send updates about our ventures, services, and brand stories (with your consent)</li>
              <li>To maintain security and prevent fraudulent activity</li>
              <li>To comply with legal obligations and regulatory requirements</li>
            </ul>
          </Section>

          <Section title="3. Data Sharing & Disclosure">
            <p>
              We respect your privacy. Rudhram Group does not sell your personal
              information to third parties. We may share information only in the
              following circumstances:
            </p>
            <ul>
              <li>
                <strong>Within our ventures:</strong> Information may be shared
                across Rudhram ventures for operational purposes, always under
                the same privacy commitments.
              </li>
              <li>
                <strong>Service providers:</strong> With trusted third-party
                vendors who assist in operating our platforms (analytics, hosting,
                email delivery), bound by confidentiality agreements.
              </li>
              <li>
                <strong>Legal requirements:</strong> When required by law, legal
                process, or to protect our rights and safety.
              </li>
            </ul>

            <div className="policy-callout">
              <p>
                <strong>Our commitment:</strong> We will never sell, rent, or
                trade your personal information for marketing or advertising
                purposes.
              </p>
            </div>
          </Section>

          <Section title="4. Data Security">
            <p>
              We implement industry-standard technical and organisational measures
              to safeguard your personal information against unauthorised access,
              alteration, disclosure, or destruction. These include encrypted
              communications (SSL/TLS), secure data storage, and access controls.
            </p>
            <p>
              While we strive to protect your data, no method of transmission or
              storage is 100% secure. We encourage you to exercise caution when
              sharing sensitive information online.
            </p>
          </Section>

          <Section title="5. Your Rights & Choices">
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal information:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal data,
                subject to legal retention requirements.
              </li>
              <li>
                <strong>Opt-out:</strong> Withdraw consent or opt out of
                non-essential communications at any time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:hello@rudhramenterprises.com">
                hello@rudhramenterprises.com
              </a>
              . We will respond within the timeframe required by applicable law.
            </p>
          </Section>

          <Section title="6. Cookies & Tracking">
            <p>
              Our platforms may use cookies and similar tracking technologies to
              enhance your experience, analyse usage patterns, and improve our
              services. You can control cookie preferences through your browser
              settings.
            </p>
            <p>
              We use minimal, privacy-respecting analytics that do not track you
              across third-party sites. Essential cookies required for basic
              functionality may be set automatically.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal information only for as long as necessary to
              fulfil the purposes described in this policy, or as required by
              applicable law. When information is no longer needed, we delete or
              anonymise it securely.
            </p>
          </Section>

          <Section title="8. Third-Party Services">
            <p>
              Our platforms may include links to third-party websites or services
              (such as social media platforms, payment processors, or analytics
              providers). This Privacy Policy does not apply to those services.
              We encourage you to review their privacy policies before sharing
              your information.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, legal requirements, or industry standards.
              Material changes will be posted on this page, and where appropriate,
              notified via email or website notice.
            </p>
            <p>
              We encourage you to review this page periodically for the latest
              information on our privacy practices.
            </p>
          </Section>

          <div className="policy-contact">
            <h3>Get in Touch</h3>
            <p>
              If you have questions about this Privacy Policy or wish to exercise
              your data rights, please contact us:
            </p>
            <p>
              Email:{' '}
              <a href="mailto:hello@rudhramenterprises.com">
                hello@rudhramenterprises.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
))

PrivacyPolicy.displayName = 'PrivacyPolicy'

export default PrivacyPolicy
