import { memo, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from './components/Header'
import { LogoMark, MagneticButton, SectionKicker } from './components/ui'
import { footerLinks, leadership, pillars, ventures } from './data/siteContent'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import { InteractiveGradient } from './components/InteractiveGradient'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const sectionShell = 'px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36'
const maxWidth = 'mx-auto max-w-[1500px]'
const displayTitle =
  'font-display text-[clamp(3rem,7vw,7.75rem)] leading-[0.92] tracking-normal text-ink [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'

const Hero = memo(function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-36 sm:px-8 lg:px-12">
        {/* Live Interactive Canvas Gradient */}
        <InteractiveGradient />
       
        {/* Centered vertical background line for elegant symmetry */}
        <div className="absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-bronze/20 to-transparent" />

        {/* Center Heading & CTAs */}
        <div className={`${maxWidth} flex flex-1 flex-col items-center justify-center text-center z-10 w-full`}>
          <div className="max-w-4xl">
            <motion.h1
              className="font-display font-bold text-[clamp(3.8rem,9vw,9rem)] leading-[0.9] tracking-tighter text-bronze-dark"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.28, duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
            >
              Leading, <span className="italic font-bold tracking-tight block sm:inline">What's Next.</span>
            </motion.h1>
          </div>
        </div>

        {/* Bottom middle description and scroll indicator */}
        <div className={`${maxWidth} z-10 w-full mt-auto flex flex-col items-center gap-8`}>
          <motion.p
            className="max-w-2xl text-center text-base leading-[1.65] text-stone sm:text-lg md:text-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.44, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            A purpose-driven enterprise ecosystem where culture, creativity, and innovation shape ventures built for lasting impact.
          </motion.p>
          
        </div>
      </section>
  )
})

const BrandThesis = memo(function BrandThesis() {
  return (
    <section id="about" className={`${sectionShell} relative overflow-hidden`}>
      <div className={`${maxWidth} grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end`}>
        <div>
          <SectionKicker>About Rudhram</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>
            We lead today,
            <span>and we lead what comes next.</span>
          </h2>
        </div>
        <div className="reveal">
          <p className={sectionLead}>
            Rudhram exists to bridge tradition and transformation. Rooted in culture, driven by creativity, and sharpened by
            modern innovation, we build ventures that create meaning, momentum, and measurable impact.
          </p>
          <div className="mt-10 grid gap-4 text-lg text-ink sm:grid-cols-3">
            {['Culture gives us roots.', 'Innovation gives us direction.', 'Excellence gives us trust.'].map((item) => (
              <span key={item} className="border-l border-bronze/50 pl-4 leading-tight">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="reveal pointer-events-none mx-auto mt-24 grid max-w-5xl grid-cols-3 gap-3 opacity-60" aria-hidden="true">
        <span className="h-40 border border-bronze/30 bg-bronze/5" />
        <span className="h-40 translate-y-8 border border-bronze/40 bg-paper" />
        <span className="h-40 border border-bronze/30 bg-bronze/5" />
      </div>
    </section>
  )
})

const OriginSymbol = memo(function OriginSymbol() {
  return (
    <section className={`${sectionShell} bg-ink text-paper`}>
      <div className={`${maxWidth} chapter grid gap-12 border border-paper/10 bg-paper/[0.03] p-6 sm:p-10 lg:grid-cols-[1fr_0.75fr] lg:p-14`}>
        <div>
          <SectionKicker className="text-bronze">The Meaning of Rudhram</SectionKicker>
          <h2 className={`${displayTitle} reveal text-paper`}>
            Fearless vision.
            <span>Transformation.</span>
            <span className="text-bronze">Rooted strength.</span>
          </h2>
        </div>
        <div className="reveal self-end">
          <p className="text-xl leading-[1.7] text-paper/72">
            Rudhram carries the energy of courage, creation, and purpose. The trishul-inspired mark represents upward movement,
            clarity, and the balance of body, mind, and soul.
          </p>
          <blockquote className="mt-10 border-l border-bronze pl-6 font-display text-4xl leading-none text-paper sm:text-5xl">
            From culture to creation, from vision to reality.
          </blockquote>
        </div>
      </div>
    </section>
  )
})

const Pillars = memo(function Pillars() {
  return (
    <section id="philosophy" className={sectionShell}>
      <div className={`${maxWidth}`}>
        <div className="max-w-5xl">
          <SectionKicker>Philosophy</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>Our philosophy is built on three pillars.</h2>
          <p className={`${sectionLead} reveal mt-8`}>
            Every idea, venture, and decision at Rudhram is shaped by a simple standard: inspire with purpose, innovate with
            courage, and deliver with precision.
          </p>
        </div>
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              className="reveal group min-h-[27rem] border border-ink/10 bg-paper p-6 transition duration-300 hover:-translate-y-2 hover:border-bronze hover:shadow-[0_30px_100px_rgba(179,120,57,0.16)] sm:p-8"
              key={pillar.title}
            >
              <span className="text-sm font-semibold text-bronze">0{index + 1}</span>
              <h3 className="mt-16 font-display text-6xl leading-none text-ink sm:text-7xl">{pillar.title}</h3>
              <p className="mt-8 text-lg leading-[1.65] text-stone">{pillar.copy}</p>
              <div className="mt-10 border-t border-ink/10 pt-6 opacity-70 transition duration-300 group-hover:opacity-100">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-bronze">Value Created</span>
                <strong className="mt-3 block text-lg font-semibold leading-snug text-ink">{pillar.detail}</strong>
              </div>
            </article>
          ))}
        </div>
        <p className="reveal mt-16 max-w-4xl font-display text-5xl leading-[1.02] text-bronze sm:text-7xl">
          We inspire ideas, innovate the future, and deliver with excellence.
        </p>
      </div>
    </section>
  )
})

const VentureConstellation = memo(function VentureConstellation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = ventures[activeIndex]
  const connectorLines = useMemo(() => Array.from({ length: ventures.length }, (_, index) => index), [])

  return (
    <section id="ventures" className={`${sectionShell} overflow-hidden bg-paper`}>
      <div className={maxWidth}>
        <div className="max-w-5xl">
          <SectionKicker>The Rudhram Ecosystem</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>
            Seven ventures.
            <span>One unified vision.</span>
          </h2>
          <p className={`${sectionLead} reveal mt-8`}>
            Rudhram is building a connected ecosystem across ceremony, culture, lifestyle, sound, movement, design, and
            celebration. Each venture has its own identity. Together, they move one purpose forward.
          </p>
        </div>

        <div className="chapter relative mt-16 grid min-h-[760px] gap-8 overflow-hidden border border-ink/10 bg-ivory p-5 sm:p-8 lg:grid-cols-[0.82fr_1fr] lg:p-12">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#11100e_1px,transparent_1px),linear-gradient(90deg,#11100e_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="relative hidden items-center justify-center lg:flex" aria-hidden="true">
            <LogoMark className="h-60 opacity-80" />
            {connectorLines.map((line) => (
              <span
                key={line}
                className="absolute left-1/2 top-1/2 h-px w-[18rem] origin-left bg-gradient-to-r from-bronze/55 to-transparent"
                style={{ rotate: `${line * 360 / ventures.length}deg` }}
              />
            ))}
          </div>

          <div className="relative z-10 grid content-between gap-8">
            <div className="grid gap-2 sm:grid-cols-2">
              {ventures.map((venture, index) => (
                <button
                  key={venture.name}
                  className={`group border px-4 py-4 text-left font-display text-3xl leading-none transition duration-300 sm:text-4xl ${
                    index === activeIndex
                      ? 'border-bronze bg-bronze text-paper shadow-[0_18px_70px_rgba(179,120,57,0.24)]'
                      : 'border-ink/10 bg-paper/70 text-ink hover:border-bronze hover:text-bronze'
                  }`}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {venture.name}
                </button>
              ))}
            </div>

            <motion.article
              className="border border-ink/10 bg-ink p-6 text-paper shadow-[0_34px_120px_rgba(17,16,14,0.24)] sm:p-10"
              key={active.name}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">{active.pillar}</span>
              <h3 className="mt-6 font-display text-6xl leading-none text-paper sm:text-8xl">{active.name}</h3>
              <p className="mt-6 max-w-2xl text-xl leading-[1.55] text-paper/72">{active.line}</p>
              <small className="mt-8 block text-sm uppercase tracking-[0.2em] text-paper/45">{active.motif}</small>
              <a
                className="mt-10 inline-flex border-b border-bronze pb-2 text-sm font-semibold text-bronze transition hover:text-paper"
                href="#contact"
              >
                Enquire About {active.name}
              </a>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  )
})

const VisionMission = memo(function VisionMission() {
  return (
    <section className="chapter grid lg:grid-cols-2">
      <div className="reveal bg-ivory px-5 py-24 sm:px-10 lg:px-16 lg:py-36">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">Vision</span>
        <h2 className="mt-8 font-display text-5xl leading-[1.02] text-ink sm:text-7xl">
          To pioneer the future through innovation, empower communities, and redefine excellence with lasting impact.
        </h2>
      </div>
      <div className="reveal bg-ink px-5 py-24 text-paper sm:px-10 lg:px-16 lg:py-36">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">Mission</span>
        <h2 className="mt-8 font-display text-5xl leading-[1.02] text-paper sm:text-7xl">
          To inspire ideas, innovate with purpose, and deliver excellence through ventures that empower communities, transform
          experiences, and create legacy.
        </h2>
      </div>
    </section>
  )
})

const Leadership = memo(function Leadership() {
  return (
    <section id="leadership" className={sectionShell}>
      <div className={maxWidth}>
        <div className="max-w-5xl">
          <SectionKicker>Leadership</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>The people shaping what comes next.</h2>
          <p className={`${sectionLead} reveal mt-8`}>
            Rudhram is guided by creative vision, strategic strength, experienced governance, and a deep commitment to social
            impact.
          </p>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {leadership.map((person) => (
            <article
              className="reveal group grid min-h-72 gap-8 border border-ink/10 bg-paper p-6 transition duration-300 hover:border-bronze hover:bg-ink hover:text-paper sm:p-8"
              key={`${person.name}-${person.role}`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-5xl leading-none sm:text-6xl">{person.name}</h3>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-bronze">{person.role}</p>
                </div>
                <span className="grid h-16 w-16 shrink-0 place-items-center border border-bronze font-display text-2xl text-bronze">
                  {person.initials}
                </span>
              </div>
              <p className="self-end text-lg leading-[1.6] text-stone transition group-hover:text-paper/70">{person.focus}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

const Impact = memo(function Impact() {
  return (
    <section id="impact" className={`${sectionShell} bg-paper`}>
      <div className={`${maxWidth} grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:items-center`}>
        <div className="reveal font-display text-[clamp(9rem,24vw,24rem)] leading-none text-bronze">3%</div>
        <div>
          <SectionKicker>Social Commitment</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>Growth should create more than success.</h2>
          <p className={`${sectionLead} reveal mt-8`}>
            At Rudhram, impact is not a separate initiative. It is part of how we build. Guided by our social vision, we are
            committed to dedicating 3% of our value toward social development and upliftment.
          </p>
          <blockquote className="reveal mt-10 border-l border-bronze pl-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            We grow not just to succeed, but to give back, uplift, and create lasting impact.
          </blockquote>
        </div>
      </div>
    </section>
  )
})

const Contact = memo(function Contact() {
  return (
    <section id="contact" className="bg-ink px-5 py-24 text-paper sm:px-8 lg:px-12 lg:py-36">
      <div className={`${maxWidth} chapter relative overflow-hidden border border-paper/10 p-6 sm:p-10 lg:p-14`}>
        <LogoMark className="pointer-events-none absolute -right-8 -top-8 h-[34rem] opacity-[0.055]" />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_0.75fr]">
          <div className="reveal relative z-10">
            <h2 className="font-display text-[clamp(3.8rem,9vw,9rem)] leading-[0.86] text-paper">
              Let's shape what comes next.
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-[1.65] text-paper/70">
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
            {['Name', 'Email'].map((label) => (
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55" key={label}>
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
                <option value="" disabled>
                  Select one
                </option>
                <option>Partnership</option>
                <option>Venture enquiry</option>
                <option>Collaboration</option>
                <option>Social impact</option>
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

const Footer = memo(function Footer() {
  const linkMap = {
    Home: '#top',
    About: '#about',
    Philosophy: '#philosophy',
    Ventures: '#ventures',
    Leadership: '#leadership',
    Impact: '#impact',
    Contact: '#contact',
  }

  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-10 pt-20 text-paper sm:px-8 lg:px-12">
      <LogoMark className="pointer-events-none absolute bottom-0 right-0 h-[34rem] translate-x-1/4 translate-y-1/4 opacity-[0.045]" />
      <div className={`${maxWidth} relative z-10`}>
        <div className="grid gap-12 border-t border-paper/10 pt-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-display text-5xl leading-none text-paper sm:text-7xl">RUDHRAM ENTERPRISES</h2>
            <p className="mt-5 text-xl text-bronze">Leading, What's Next.</p>
            <span className="mt-6 block max-w-xl text-lg leading-[1.65] text-paper/62">
              A purpose-driven enterprise ecosystem rooted in culture, shaped by innovation, and built for lasting impact.
            </span>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn title="Navigation" items={footerLinks} getHref={(item) => linkMap[item]} />
            <FooterColumn title="Ventures" items={ventures.map((venture) => venture.name)} getHref={() => '#ventures'} />
            <FooterColumn
              title="Contact"
              items={['Strategic enquiries', 'Partnerships', 'Collaborations', 'Social impact']}
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

const FooterColumn = memo(function FooterColumn({ title, items, getHref }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-bronze">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <a className="text-sm text-paper/62 transition hover:translate-x-1 hover:text-bronze" href={getHref(item)} key={item}>
            {item}
          </a>
        ))}
      </div>
    </div>
  )
})

const App = () => {
  useLenisScroll()
  useScrollAnimations()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandThesis />
        <OriginSymbol />
        <Pillars />
        <VentureConstellation />
        <VisionMission />
        <Leadership />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
