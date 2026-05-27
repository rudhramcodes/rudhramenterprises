import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/siteContent'
import { useIsDesktop } from '../hooks/useMediaQuery'

const AnimatedMenuIcon = memo(function AnimatedMenuIcon({ isOpen }) {
  return (
    <motion.svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current" initial={false} animate={{ rotate: isOpen ? 90 : 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.45 }}>
      <motion.path d="M5.5 8.75h13" strokeLinecap="round" strokeWidth={1.55} initial={false} animate={isOpen ? { y: 3.25, rotate: 45 } : { y: 0, rotate: 0 }} style={{ transformOrigin: '12px 12px' }} transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.45 }} />
      <motion.path d="M5.5 15.25h13" strokeLinecap="round" strokeWidth={1.55} initial={false} animate={isOpen ? { y: -3.25, rotate: -45 } : { y: 0, rotate: 0 }} style={{ transformOrigin: '12px 12px' }} transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.45 }} />
    </motion.svg>
  )
})

const navVariants = {
  hidden: { opacity: 0, y: -10, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, delay: 0.12, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 10, filter: 'blur(6px)', transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 240, damping: 22, mass: 0.55, delay: 0.08 } },
  exit: { opacity: 0, scale: 0.9, filter: 'blur(6px)', transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }
}

export const Header = memo(function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const isDesktop = useIsDesktop()
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null)
  const [navHovered, setNavHovered] = useState(false)
  const [navPressed, setNavPressed] = useState(false)
  const pressTimerRef = useRef(null)
  const headerRef = useRef(null)
  const navRef = useRef(null)

  const resetHoverState = useCallback(() => {
    setHoveredNavIndex(null)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [])

  const toggleMenu = useCallback(() => {
    resetHoverState()
    setNavPressed(true)
    window.clearTimeout(pressTimerRef.current)
    pressTimerRef.current = window.setTimeout(() => setNavPressed(false), 240)
    setMenuOpen((v) => !v)
  }, [resetHoverState])

  const navigateToSection = useCallback((event, href) => {
    if (!href.startsWith('#')) return
    event.preventDefault()
    resetHoverState()
    setMenuOpen(false)
    window.setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.pushState(null, '', href)
      }
    }, 120)
  }, [resetHoverState])

  useEffect(() => {
    const onScroll = () => {
      const isCompact = window.scrollY > 120
      setCompact((prev) => (prev !== isCompact ? isCompact : prev))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(pressTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const smallScreen = !isDesktop
  const menuMode = compact || menuOpen || smallScreen
  const expandedItems = useMemo(() => [...navItems, { label: 'Contact', href: '#contact' }], [])
  const restingNavScale = navHovered ? 1.006 : 1

  return (
    <header ref={headerRef} className={`fixed left-0 top-0 z-50 w-full px-[var(--page-gutter)] transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${compact ? 'pt-2' : 'pt-3 sm:pt-4'}`}>
      <motion.div
        ref={navRef}
        className="ios-glass-nav mx-auto overflow-hidden rounded-[24px] px-4 sm:rounded-[28px] sm:px-5"
        animate={{
          scale: navPressed ? [restingNavScale, 0.995, restingNavScale] : restingNavScale,
          maxWidth: menuMode ? (smallScreen ? '100%' : 544) : 1280,
          borderRadius: smallScreen ? 24 : 28,
          boxShadow: compact ? '0 24px 90px rgba(17,16,14,0.14)' : '0 18px 70px rgba(17,16,14,0.12)'
        }}
        transition={{
          scale: navPressed ? { duration: 0.24, ease: [0.16, 1, 0.3, 1] } : { type: 'spring', stiffness: 115, damping: 23, mass: 0.9 },
          maxWidth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          borderRadius: { type: 'spring', stiffness: 115, damping: 23, mass: 0.9 },
          boxShadow: { duration: 0.24 }
        }}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => { setNavHovered(false); setHoveredNavIndex(null); }}
      >
        <div className="flex h-16 w-full items-center justify-between sm:h-[4.5rem]">
          <a className="group flex min-w-28 items-center sm:min-w-36" href="#top" aria-label="Rudhram Enterprises home" onClick={(e) => { e.preventDefault(); resetHoverState(); setMenuOpen(false); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); window.history.pushState(null, '', '#top') }}>
            <img className="h-8 w-auto transition duration-300 ease-out group-hover:opacity-75 group-active:scale-[0.98] sm:h-9" src="/images/logo.png" alt="Rudhram" />
          </a>

          <AnimatePresence initial={false}>
            {!compact && !menuOpen && !smallScreen && (
              <motion.nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation" variants={navVariants} initial="hidden" animate="visible" exit="exit" onMouseLeave={() => setHoveredNavIndex(null)}>
                {expandedItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    className=" relative rounded-full px-3 py-2 text-sm font-semibold text-ink/70 outline-none transition-all duration-300 hover:text-ink focus-visible:text-ink"
                    style={{ filter: hoveredNavIndex !== null && hoveredNavIndex !== index ? 'blur(1.4px)' : 'blur(0px)', transition: 'filter 280ms ease, color 260ms ease' }}
                    href={item.href}
                    onClick={(event) => navigateToSection(event, item.href)}
                    onMouseEnter={() => setHoveredNavIndex(index)}
                    onFocus={() => setHoveredNavIndex(index)}
                    onBlur={() => setHoveredNavIndex(null)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {menuMode && (
              <motion.button className="glassmorhism-button inline-flex h-11 w-11 items-center justify-center rounded-[16px] sm:rounded-[16px] cursor-pointer text-ink outline-none transition-colors duration-300 ease-out hover:text-bronze focus-visible:text-bronze" type="button" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen} variants={buttonVariants} initial="hidden" animate="visible" exit="exit">
                <AnimatedMenuIcon isOpen={menuOpen} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div className="overflow-hidden" aria-hidden={!menuOpen} initial={false} animate={{ height: menuOpen ? 'auto' : 0 }} transition={{ height: { duration: menuOpen ? 0.5 : 0.44, ease: menuOpen ? [0.16, 1, 0.3, 1] : [0.55, 0, 0.2, 1] } }}>
          <motion.div className={`pb-6 pt-2 text-ink sm:pb-8 sm:pt-4 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} initial={false} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -18, filter: menuOpen ? 'blur(0px)' : 'blur(8px)' }} transition={{ opacity: { duration: menuOpen ? 0.2 : 0.28, ease: 'easeOut' }, y: { duration: menuOpen ? 0.46 : 0.34, ease: [0.16, 1, 0.3, 1] }, filter: { duration: menuOpen ? 0.34 : 0.3, ease: 'easeOut' } }}>
            <nav className="expanded-nav grid gap-0.5 sm:gap-1" aria-label="Expanded navigation">
              {expandedItems.map((item) => (
                <motion.a key={item.href} className="expanded-nav-link font-display block text-[clamp(1.75rem,8vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink outline-none will-change-[filter,transform] sm:text-[clamp(2.15rem,7.2vw,4rem)] sm:leading-[0.98] sm:tracking-normal" href={item.href} onClick={(event) => navigateToSection(event, item.href)} initial={false} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 10, filter: menuOpen ? 'blur(0px)' : 'blur(7px)' }} transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 0.5 }} whileHover={{ x: 4 }}>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div initial={false} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 10, filter: menuOpen ? 'blur(0px)' : 'blur(7px)' }} transition={{ type: 'spring', stiffness: 115, damping: 23, mass: 0.9 }} className="mt-8 grid gap-8 border-t border-ink/10 pt-6 text-sm sm:mt-10 sm:grid-cols-2 sm:gap-10 sm:pt-7">
              <div>
                <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-stone/60 sm:text-sm sm:font-semibold sm:text-stone/72 sm:tracking-normal">Visit</p>
                <p className="max-w-[18rem] text-[15px] leading-relaxed text-ink/80 sm:max-w-[16rem] sm:text-base sm:leading-[1.45] sm:text-ink">Rudhram Enterprises. Culture, creativity, innovation, and impact.</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-stone/60 sm:mb-2 sm:text-sm sm:font-semibold sm:text-stone/72 sm:tracking-normal">Work With Us</p>
                <motion.a className="text-lg font-semibold text-ink outline-none transition duration-200 hover:text-bronze focus-visible:text-bronze sm:text-base" href="mailto:hello@rudhram.com" whileTap={{ scale: 0.98 }}>hello@rudhram.com</motion.a>
                <motion.a className="text-lg font-semibold text-ink outline-none transition duration-200 hover:text-bronze focus-visible:text-bronze sm:text-base" href="#contact" onClick={(event) => navigateToSection(event, '#contact')} whileTap={{ scale: 0.98 }}>Schedule a call</motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  )
})
