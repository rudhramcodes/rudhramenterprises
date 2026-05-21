import { memo, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { navItems } from '../data/siteContent'

const AnimatedMenuIcon = memo(function AnimatedMenuIcon({ isOpen }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-none stroke-current stroke-[1.7]"
      animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.path
        d="M4 8h16"
        strokeLinecap="round"
        animate={isOpen ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '12px 12px' }}
      />
      <motion.path
        d="M4 16h16"
        strokeLinecap="round"
        animate={isOpen ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '12px 12px' }}
      />
    </motion.svg>
  )
})

const menuVariants = {
  hidden: { opacity: 0, y: -18, scale: 0.97, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.98, filter: 'blur(8px)', transition: { duration: 0.24 } },
}

const navVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: 0.22,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: 0.22,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export const Header = memo(function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((value) => !value), [])

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <motion.div
        className={`mx-auto flex h-[4.5rem] items-center justify-between rounded-[18px] border border-ink/10 bg-paper/40 px-5 shadow-[0_24px_90px_rgba(17,16,14,0.1)] backdrop-blur-[24px] ${
          compact || menuOpen ? 'max-w-[44rem]' : 'max-w-[80rem]'
        }`}
        style={{
          transition: 'max-width 650ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms, border-color 300ms'
        }}
      >
        <a className="group flex min-w-36 items-center" href="#top" aria-label="Rudhram Enterprises home">
          <img className="h-9 w-auto transition duration-300 group-hover:opacity-75" src="/images/logo.png" alt="Rudhram" />
        </a>

        <AnimatePresence initial={false}>
          {!compact && !menuOpen && (
            <motion.nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Primary navigation"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseLeave={() => setHoveredNavIndex(null)}
            >
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  className="relative text-sm font-semibold text-ink/68 transition-all duration-300 hover:text-ink hover:after:text-bronze"
                  style={{
                    opacity: hoveredNavIndex !== null && hoveredNavIndex !== index ? 0.3 : 1,
                    filter: hoveredNavIndex !== null && hoveredNavIndex !== index ? 'blur(2px)' : 'blur(0px)',
                    transition: 'opacity 300ms ease, filter 300ms ease, color 300ms ease'
                  }}
                  href={item.href}
                  onMouseEnter={() => setHoveredNavIndex(index)}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="relative text-sm font-semibold text-ink/68 transition-all duration-300 hover:text-ink hover:after:text-bronze"
                style={{
                  opacity: hoveredNavIndex !== null && hoveredNavIndex !== 'contact' ? 0.3 : 1,
                  filter: hoveredNavIndex !== null && hoveredNavIndex !== 'contact' ? 'blur(2px)' : 'blur(0px)',
                  transition: 'opacity 300ms ease, filter 300ms ease, color 300ms ease'
                }}
                href="#contact"
                onMouseEnter={() => setHoveredNavIndex('contact')}
              >
                Contact
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(compact || menuOpen) && (
            <motion.button
              className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] text-ink transition-colors duration-300 ease-out hover:text-bronze focus:outline-none"
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AnimatedMenuIcon isOpen={menuOpen} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mx-auto mt-3 max-w-[44rem] rounded-[24px] border border-ink/10 bg-paper/55 px-6 py-6 text-ink shadow-[0_34px_120px_rgba(17,16,14,0.22)] backdrop-blur-[32px] sm:px-8 sm:py-8"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-stone">Menu</p>
            <nav className="grid gap-1" aria-label="Expanded navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  className="group flex items-center justify-between border-b border-ink/8 py-2 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[0.92] text-ink"
                  style={{
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.3 : 1,
                    filter: hoveredIndex !== null && hoveredIndex !== index ? 'blur(2.5px)' : 'blur(0px)',
                    transition: 'opacity 350ms ease, filter 350ms ease'
                  }}
                  href={item.href}
                  onClick={closeMenu}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.38 }}
                >
                  <span>{item.label}</span>
                  <span className="inline-flex h-4 w-4 -translate-x-2 items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowRight className="h-full w-full text-bronze" weight="regular" />
                  </span>
                </motion.a>
              ))}
              <motion.a
                className="group flex items-center justify-between py-2 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[0.92] text-ink"
                style={{
                  opacity: hoveredIndex !== null && hoveredIndex !== 5 ? 0.3 : 1,
                  filter: hoveredIndex !== null && hoveredIndex !== 5 ? 'blur(2.5px)' : 'blur(0px)',
                  transition: 'opacity 350ms ease, filter 350ms ease'
                }}
                href="#contact"
                onClick={closeMenu}
                onMouseEnter={() => setHoveredIndex(5)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.38 }}
              >
                <span>Contact</span>
                <span className="inline-flex h-4 w-4 -translate-x-2 items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowRight className="h-full w-full text-bronze" weight="regular" />
                </span>
              </motion.a>
            </nav>
            <div className="mt-6 grid gap-6 border-t border-ink/10 pt-5 text-sm sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-stone">Visit</p>
                <p className="max-w-[16rem] leading-[1.6] text-ink/76">Rudhram Enterprises. Culture, creativity, innovation, and impact.</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-stone">Work With Us</p>
                <a className="block text-lg font-semibold text-ink transition duration-300 hover:text-bronze" href="mailto:hello@rudhram.com">
                  hello@rudhram.com
                </a>
                <a className="mt-1 block text-lg font-semibold text-ink transition duration-300 hover:text-bronze" href="#contact" onClick={closeMenu}>
                  Schedule a call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
})
