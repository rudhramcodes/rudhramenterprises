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

const TermsOfService = memo(() => (
  <>
    <Header />
    <main className="policy-page">
      <div className="policy-page-inner">
        <Link to="/" className="policy-back-link">
          <ArrowLeftIcon />
          Back to Home
        </Link>

        <header className="policy-header">
          <h1>Terms of Service</h1>
          <p>
            These terms govern your access to and use of the services,
            websites, and ventures operated by Rudhram Group.
          </p>
          <div className="policy-meta">
            <span>Last updated: June 1, 2026</span>
            <span>Effective: June 1, 2026</span>
          </div>
        </header>

        <div className="policy-body">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using any website, platform, or service operated by{' '}
              <strong>Rudhram Group</strong> (&ldquo;Rudhram,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you
              agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
              If you do not agree, please refrain from using our services.
            </p>
            <p>
              These Terms apply to all ventures under the Rudhram umbrella,
              including but not limited to <strong>Panigrahna</strong>,{' '}
              <strong>Aghhori</strong>, <strong>House of Joggi</strong>,{' '}
              <strong>Damrru</strong>, <strong>Tandavs</strong>,{' '}
              <strong>Kapaalik</strong>, <strong>Kalyannam</strong>, and{' '}
              <strong>Storage Media Solution</strong>.
            </p>
          </Section>

          <Section title="2. Services Overview">
            <p>
              Rudhram Group is a venture-building institution that creates,
              nurtures, and scales transformative businesses across diverse
              industries including ceremonial experiences, creative and cultural
              expression, lifestyle and community, sound and performance, movement
              and spectacle, design and mysticism, celebration and ritual, and
              technology infrastructure.
            </p>
            <p>
              Our services include strategic venture development, design studio
              capabilities, technology infrastructure, events and wedding
              planning, and brand incubation. The specific scope of each
              engagement is defined by separate agreements where applicable.
            </p>
          </Section>

          <Section title="3. Intellectual Property Rights">
            <p>
              All content, materials, trademarks, logos, brand identities,
              designs, and intellectual property displayed across Rudhram
              platforms and ventures are owned by or licensed to Rudhram Group.
              This includes but is not limited to:
            </p>
            <ul>
              <li>Brand names, logos, and visual identities</li>
              <li>Website design, code, and architectural frameworks</li>
              <li>Written content, photography, and multimedia assets</li>
              <li>Proprietary systems, tools, and methodologies</li>
            </ul>
            <p>
              You may not reproduce, distribute, modify, or create derivative
              works without our prior written consent.
            </p>
          </Section>

          <Section title="4. User Responsibilities">
            <p>When using our services or platforms, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information where required</li>
              <li>Use our services lawfully and in accordance with these Terms</li>
              <li>Respect the intellectual property rights of Rudhram and its ventures</li>
              <li>Refrain from any activity that disrupts or interferes with our systems</li>
            </ul>
          </Section>

          <Section title="5. Third-Party Links & Services">
            <p>
              Our platforms may contain links to third-party websites or services
              that are not owned or controlled by Rudhram Group. We are not
              responsible for the content, privacy practices, or terms of any
              third-party services. We encourage you to review their terms
              independently.
            </p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Rudhram Group
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to
              your use of our services, platforms, or ventures. Our total
              liability for any claim shall not exceed the amount paid by you,
              if any, for accessing our services.
            </p>

            <div className="policy-callout">
              <p>
                <strong>Important:</strong> Rudhram Group provides its services on
                an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We
                make no representations or warranties of any kind, express or
                implied, regarding the operation or availability of our services.
              </p>
            </div>
          </Section>

          <Section title="7. Termination">
            <p>
              We reserve the right to suspend or terminate access to our services
              at any time, without prior notice, for conduct that we believe
              violates these Terms or is harmful to our brand, ventures, or other
              users. Upon termination, your right to use our services ceases
              immediately.
            </p>
          </Section>

          <Section title="8. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of <strong>India</strong>. Any disputes arising out of or
              relating to these Terms shall be subject to the exclusive
              jurisdiction of the courts in <strong>Mumbai, India</strong>.
            </p>
          </Section>

          <Section title="9. Changes to These Terms">
            <p>
              We reserve the right to update or modify these Terms at any time.
              Material changes will be communicated via our website or through
              direct contact. Your continued use of our services after any
              changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <div className="policy-contact">
            <h3>Questions About These Terms?</h3>
            <p>
              If you have any questions, concerns, or requests regarding these
              Terms of Service, please reach out to our team.
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

TermsOfService.displayName = 'TermsOfService'

export default TermsOfService
