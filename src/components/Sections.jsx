import { memo } from 'react'
import { SectionKicker, MagneticButton, LogoMark } from './ui'
import { footerLinks, ventures } from '../data/siteContent'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle = 'font-display text-[clamp(3rem,7vw,7.75rem)] leading-[0.92] tracking-normal text-ink [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'
const sectionShell = 'py-16 sm:py-20 lg:py-36'
const contactFields = ['Name', 'Email']
const contactOptions = ['Partnership', 'Venture enquiry', 'Collaboration', 'Social impact']
const footerContactItems = ['Strategic enquiries', 'Partnerships', 'Collaborations', 'Social impact']
const footerLinkMap = {
  Home: '#top',
  About: '#about',
  Story: '#story',
  Ventures: '#ventures',
  Leadership: '#leadership',
  Impact: '#impact',
  Contact: '#contact',
}
const ventureNames = ventures.map((venture) => venture.name)

export const VisionMission = memo(function VisionMission() {
  return (
    <section className="chapter grid lg:grid-cols-2">
      <div className="reveal bg-paper px-[var(--page-gutter)] py-16 sm:py-20 lg:py-36">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">Vision</span>
        <h2 className="mt-8 font-display text-[clamp(2.65rem,11vw,4.5rem)] leading-[1.02] text-ink lg:text-7xl">
          To pioneer the future through innovation, empower communities, and redefine excellence
          with lasting impact.
        </h2>
      </div>
      <div className="reveal bg-ink px-[var(--page-gutter)] py-16 text-paper sm:py-20 lg:py-36">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">Mission</span>
        <h2 className="mt-8 font-display text-[clamp(2.65rem,11vw,4.5rem)] leading-[1.02] text-paper lg:text-7xl">
          To inspire ideas, innovate with purpose, and deliver excellence through ventures that
          empower communities, transform experiences, and create legacy.
        </h2>
      </div>
    </section>
  )
})

export const Impact = memo(function Impact() {
  return (
    <section id="impact" className={`${sectionShell} bg-paper`}>
      <div className={`${maxWidth} grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:items-center`}>
        <div className="reveal font-display text-[clamp(7rem,34vw,16rem)] leading-none text-bronze lg:text-[clamp(9rem,24vw,24rem)]">
          3%
        </div>
        <div>
          <SectionKicker>Social Commitment</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>Growth should create more than success.</h2>
          <p className={`${sectionLead} reveal mt-8`}>
            At Rudhram, impact is not a separate initiative. It is part of how we build. Guided by
            our social vision, we are committed to dedicating 3% of our value toward social
            development and upliftment.
          </p>
          <blockquote className="reveal mt-10 border-l border-bronze pl-6 font-display text-3xl leading-tight text-ink sm:text-5xl">
            We grow not just to succeed, but to give back, uplift, and create lasting impact.
          </blockquote>
        </div>
      </div>
    </section>
  )
})

export const Contact = memo(function Contact() {
  return (
    <section id="contact" className="bg-ink py-16 text-paper sm:py-20 lg:py-36">
      <div
        className={`${maxWidth} chapter relative overflow-hidden border border-paper/10 p-6 sm:p-10 lg:p-14`}
      >
        <LogoMark className="pointer-events-none absolute -right-28 -top-16 h-[28rem] opacity-[0.055] sm:-right-8 sm:-top-8 sm:h-[34rem]" />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_0.75fr]">
          <div className="reveal relative z-10">
            <h2 className="font-display text-[clamp(3rem,14vw,6rem)] leading-[0.88] text-paper lg:text-[clamp(3.8rem,9vw,9rem)]">
              Let's shape what comes next.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-paper/70 sm:text-xl">
              For partnerships, ventures, collaborations, and strategic enquiries, connect with Rudhram.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="mailto:hello@rudhram.com" variant="dark">
                Start a Conversation
              </MagneticButton>
              <MagneticButton href="#ventures" variant="ghost-dark">
                Explore Ventures
              </MagneticButton>
            </div>
          </div>
          <form className="reveal relative z-10 grid gap-4">
            {contactFields.map((label) => (
              <label
                className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55"
                key={label}
              >
                {label}
                <input
                  className="min-h-12 border border-paper/15 bg-paper/5 px-4 text-base normal-case tracking-normal text-paper outline-none transition focus:border-bronze"
                  type={label === 'Email' ? 'email' : 'text'}
                />
              </label>
            ))}
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55">
              Interest
              <select
                className="min-h-12 border border-paper/15 bg-ink px-4 text-base normal-case tracking-normal text-paper outline-none transition focus:border-bronze"
                defaultValue=""
              >
                <option value="" disabled>Select one</option>
                {contactOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55">
              Message
              <textarea className="min-h-32 border border-paper/15 bg-paper/5 p-4 text-base normal-case tracking-normal text-paper outline-none transition focus:border-bronze" />
            </label>
            <button
              className="min-h-12 border border-bronze bg-bronze px-5 text-sm font-bold text-paper transition hover:bg-bronze-dark"
              type="button"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
})

const FooterColumn = memo(function FooterColumn({ title, items, getHref }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-bronze">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <a
            className="text-sm text-paper/62 transition hover:translate-x-1 hover:text-bronze"
            href={getHref(item)}
            key={item}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  )
})

export const Footer = memo(function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-10 pt-20 text-paper">
      <LogoMark className="pointer-events-none absolute bottom-0 right-0 h-[34rem] translate-x-1/4 translate-y-1/4 opacity-[0.045]" />
      <div className={`${maxWidth} relative z-10`}>
        <div className="grid gap-12 border-t border-paper/10 pt-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-[clamp(3rem,13vw,4.5rem)] leading-none text-paper lg:text-7xl">
              RUDHRAM ENTERPRISES
            </h2>
            <p className="mt-5 text-xl text-bronze">Leading, What's Next.</p>
            <span className="mt-6 block max-w-xl text-lg leading-[1.65] text-paper/62">
              A purpose-driven enterprise ecosystem rooted in culture, shaped by innovation, and
              built for lasting impact.
            </span>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn
              title="Navigation"
              items={footerLinks}
              getHref={(item) => footerLinkMap[item]}
            />
            <FooterColumn
              title="Ventures"
              items={ventureNames}
              getHref={() => '#ventures'}
            />
            <FooterColumn
              title="Contact"
              items={footerContactItems}
              getHref={(item) => (item === 'Social impact' ? '#impact' : '#contact')}
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 text-sm text-paper/45 sm:flex-row sm:justify-between">
          <span>(c) 2026 Rudhram Enterprises. All rights reserved.</span>
          <span>Inspiring. Innovative. Impeccable.</span>
        </div>
      </div>
    </footer>
  )
})
