import { memo, useState, useEffect, useRef, useCallback, Fragment } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { CaretUp } from '@phosphor-icons/react'
import { AwwwardsButton } from '../ui/AwwwardsButton'
import { InstagramIcon, LinkedInIcon, TwitterIcon } from './FooterSVGs'
import './Footer.css'
const EASE_OUT = [0.16, 1, 0.3, 1]

const MARQUEE_ITEMS = [
  'Inspiring', 'Innovative', 'Impeccable', 'Venture Building',
  'Design Studio', 'Tech Infrastructure', 'Events & Weddings', "What's Next",
]

const NAV_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Philosophy', href: '#purpose' },
      { label: 'Visionaries', href: '#visionaries' },
      { label: 'Ventures', href: '#ventures' },
      { label: 'Careers', href: null },
    ],
  },
  {
    title: 'Ventures',
    links: [
      { label: 'Panigrahna', href: null },
      { label: 'Aghhori', href: null },
      { label: 'Design Studio', href: null },
      { label: 'Tech Infra', href: null },
      { label: 'Events', href: null },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact Us', href: 'mailto:hello@rudhramenterprises.com' },
      { label: 'Partner With Us', href: 'mailto:partners@rudhramenterprises.com' },
      { label: 'Invest', href: 'mailto:invest@rudhramenterprises.com' },
      { label: 'Press', href: 'mailto:press@rudhramenterprises.com' },
    ],
  },
]

const MagneticArea = memo(({ children, className = '', as: Tag = 'div', ...props }) => {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const distance = Math.min(Math.sqrt(x * x + y * y), 150)
    const strength = Math.max(0.1, 1 - distance / 150)

    el.style.transform = `translate(${x * 0.2 * strength}px, ${y * 0.2 * strength}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }, [])

  return (
    <Tag
      ref={ref}
      className={`footer-magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  )
})

MagneticArea.displayName = 'MagneticArea'

/**
 * Particle field with CSS animation (hardware accelerated).
 */
const ParticleField = memo(() => (
  <div className="footer-particles" aria-hidden="true">
    {Array.from({ length: 40 }, (_, i) => (
      <span
        key={i}
        className="footer-particle"
        style={{
          '--x': `${Math.random() * 100}%`,
          '--y': `${Math.random() * 100}%`,
          '--size': `${1.5 + Math.random() * 2.5}px`,
          '--drift': `${(Math.random() - 0.5) * 80}px`,
          '--delay': `${Math.random() * 6}s`,
          '--duration': `${5 + Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
))

ParticleField.displayName = 'ParticleField'

/**
 * Scroll-aware marquee. Speed responds to scroll velocity,
 * direction spring-smoothed for jerk-free reversal.
 */
const Marquee = memo(() => {
  const trackRef = useRef(null)
  const rawSpeed = useMotionValue(1.6)
  const rawDir = useMotionValue(-1)

  // Spring-smooth speed — no sudden jumps
  const smoothSpeed = useSpring(rawSpeed, { stiffness: 55, damping: 18, mass: 0.5 })
  // Spring-smooth direction — decelerates → stops → accelerates on reversal
  const smoothDir = useSpring(rawDir, { stiffness: 18, damping: 8, mass: 1.4 })

  useEffect(() => {
    let prevY = window.scrollY
    let idleTimer

    const onScroll = () => {
      const curY = window.scrollY
      const delta = curY - prevY

      rawDir.set(delta >= 0 ? -1 : 1)

      const mag = Math.abs(delta)
      const target = Math.min(1.6 + mag * 0.12, 10)
      rawSpeed.set(target)

      prevY = curY

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => rawSpeed.set(1.6), 600)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(idleTimer)
    }
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let x = 0
    let rafId

    const tick = () => {
      const speed = smoothSpeed.get()
      const dir = smoothDir.get()

      x += 0.65 * speed * dir

      const wrapAt = el.scrollWidth / 2
      if (x <= -wrapAt) x += wrapAt
      if (x >= 0) x -= wrapAt

      el.style.transform = `translateX(${x}px)`
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="footer-marquee" role="marquee" aria-label="Brand values">
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: 2 }).flatMap((_, dup) =>
          MARQUEE_ITEMS.map((item, i) => (
            <div className="marquee-item" key={`${dup}-${i}`}>
              <span className="marquee-dot" />
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  )
})

Marquee.displayName = 'Marquee'

// CTA heading with word-by-word stagger — translateY + scale + blur reveal.
const AWWWARDS_EASE = [0.16, 1, 0.3, 1]

const CTAHeading = memo(() => {
  const lines = [
    { words: ["Let's", 'Build'], italic: false },
    { words: ["What's", 'Next'], italic: true },
    { words: ['Together.'], italic: false },
  ]
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.4 })

  return (
    <h2 ref={ctaRef} className="footer-cta-heading">
      {lines.map((line, i) => (
        <span className="heading-line" key={i}>
          {line.words.map((word, j) => (
            <Fragment key={j}>
              <span className="heading-word-wrap">
                <motion.span
                  className={`heading-word${line.italic ? ' heading-italic-text' : ''}`}
                  initial={{ y: '130%', scale: 0.9, opacity: 0, filter: 'blur(7px)' }}
                  animate={ctaInView ? { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
                  transition={{
                    duration: 0.75,
                    delay: i * 0.15 + j * 0.1 + 0.15,
                    ease: AWWWARDS_EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
              {j < line.words.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      ))}
    </h2>
  )
})

CTAHeading.displayName = 'CTAHeading'

// Main Footer component.
const Footer = memo(function Footer() {
  const footerRef = useRef(null)
  const navRef = useRef(null)
  const bottomRef = useRef(null)
  const navInView = useInView(navRef, { once: true, amount: 0.15 })
  const bottomInView = useInView(bottomRef, { once: true, amount: 0.5 })
  const shouldReduceMotion = useReducedMotion()

  const [localTime, setLocalTime] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
      )
    }
    updateTime()
    const id = setInterval(updateTime, 60000)

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      clearInterval(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const scrollToSection = useCallback((e, href) => {
    if (!href?.startsWith('#')) return
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const circumference = 2 * Math.PI * 15.5

  const { scrollYProgress: footerRevealProgress } = useScroll({
    target: footerRef,
    offset: ['start 100%', 'start 30%'],
  })
  const y = useTransform(footerRevealProgress, [0, 0.72, 1], ['24vh', '3vh', '0vh'])
  const width = useTransform(footerRevealProgress, [0, 0.82, 1], ['90%', '98%', '100%'])
  const borderRadius = useTransform(footerRevealProgress, [0, 0.82, 1], ['64px 64px 0 0', '28px 28px 0 0', '0px'])
  const boxShadow = useTransform(
    footerRevealProgress,
    [0, 1],
    ['0 -22px 80px rgba(17, 16, 14, 0.14)', '0 0 0 rgba(17, 16, 14, 0)']
  )

  return (
    <motion.footer
      ref={footerRef}
      className="footer-root"
      style={
        shouldReduceMotion
          ? undefined
          : {
              y,
              width,
              borderRadius,
              boxShadow,
            }
      }
    >
      <ParticleField />

      <div className="footer-reveal">
        {/* CTA Section */}
        <div className="footer-cta">
          <div className="footer-cta-inner">
            <CTAHeading />
            <AwwwardsButton
              href="mailto:hello@rudhramenterprises.com"
              variant="ivory"
              size="lg"
            >
              Start a Conversation
            </AwwwardsButton>
          </div>
        </div>

        {/* Marquee */}
        <Marquee />

        {/* Navigation Grid */}
        <nav ref={navRef} className="footer-nav" aria-label="Footer navigation">
          <motion.div
            className="footer-nav-col brand-col"
            initial={{ y: 40, opacity: 0 }}
            animate={navInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <h4>About</h4>
            <p>
              Rudhram Group is a venture-building institution dedicated to creating, nurturing,
              and scaling transformative businesses across diverse industries.
            </p>
            <div className="social-links">
              <MagneticArea
                as="a"
                href="https://instagram.com"
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </MagneticArea>
              <MagneticArea
                as="a"
                href="https://linkedin.com"
                className="social-link"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </MagneticArea>
              <MagneticArea
                as="a"
                href="https://twitter.com"
                className="social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </MagneticArea>
            </div>
          </motion.div>

          {NAV_COLUMNS.map((col, colIdx) => (
            <motion.div
              key={col.title}
              className="footer-nav-col"
              initial={{ y: 40, opacity: 0 }}
              animate={navInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + colIdx * 0.1, ease: EASE_OUT }}
            >
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href || '#'}
                      onClick={link.href?.startsWith('#') ? (e) => scrollToSection(e, link.href) : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </nav>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="footer-bottom">
          <motion.div
            className="footer-bottom-left"
            initial={{ y: 20, opacity: 0 }}
            animate={bottomInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p>&copy; 2026 Rudhram Enterprises. All rights reserved.</p>
            <div className="time-widget" aria-label={`Local time: ${localTime}`}>
              <span className="time-dot" />
              <span>{localTime}</span>
            </div>
          </motion.div>

          <motion.div
            className="footer-bottom-right"
            initial={{ y: 20, opacity: 0 }}
            animate={bottomInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <MagneticArea
              as="button"
              type="button"
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <svg viewBox="0 0 36 36" className="progress-ring" aria-hidden="true">
                <circle className="progress-ring-bg" cx="18" cy="18" r="15.5" />
                <circle
                  className="progress-ring-fill"
                  cx="18" cy="18" r="15.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - scrollProgress)}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <CaretUp className="chevron-icon" />
            </MagneticArea>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
