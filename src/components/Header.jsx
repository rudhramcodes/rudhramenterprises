import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LiquidGlassCard } from './ui/liquid-glass'
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
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, delay: 0.12, ease: [0.16, 1, 1, 1] } },
  exit: { opacity: 0, y: 10, filter: 'blur(6px)', transition: { duration: 0.2, ease: [0.16, 1, 1, 1] } }
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 240, damping: 22, mass: 0.55, delay: 0.08 } },
  exit: { opacity: 0, scale: 0.9, filter: 'blur(6px)', transition: { duration: 0.18, ease: [0.16, 1, 1, 1] } }
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
  const expandedItems = useMemo(() => [...navItems], [])
  const restingNavScale = navHovered ? 1.006 : 1

  return (
    <header ref={headerRef} className={`fixed left-0 top-0 z-50 w-full px-[var(--page-gutter)] transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${compact ? 'pt-2' : 'pt-3 sm:pt-4'}`}>
      <motion.div
        ref={navRef}
        className="mx-auto overflow-hidden rounded-[24px] sm:rounded-[28px]"
        animate={{
          scale: navPressed ? [restingNavScale, 0.995, restingNavScale] : restingNavScale,
          maxWidth: menuMode ? (smallScreen ? '100%' : 544) : 1280,
          borderRadius: smallScreen ? 24 : 28,
        }}
        transition={{
          scale: navPressed ? { duration: 0.24, ease: [0.16, 1, 0.3, 1] } : { type: 'spring', stiffness: 115, damping: 23, mass: 0.9 },
          maxWidth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          borderRadius: { type: 'spring', stiffness: 115, damping: 23, mass: 0.9 },
        }}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => { setNavHovered(false); setHoveredNavIndex(null); }}
      >
        <LiquidGlassCard
          draggable={false}
          expandable={false}
          className="bg-white/10"
          borderRadius={smallScreen ? 24 : 28}
          blurIntensity={compact ? 'md' : 'lg'}
          shadowIntensity="xl"
          glowIntensity={compact ? 'lg' : 'xl'}
        >
          <div className="relative z-30 px-4 sm:px-5">
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
                      className="relative rounded-full px-3 py-2 text-[15px] font-bold text-ink outline-none transition-all duration-300"
                      style={{ filter: hoveredNavIndex !== null && hoveredNavIndex !== index ? 'blur(1.4px)' : 'blur(0px)', transition: 'filter 280ms ease' }}
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
                <motion.button className="group relative cursor-pointer outline-none" type="button" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen} variants={buttonVariants} initial="hidden" animate="visible" exit="exit">
                  <LiquidGlassCard
                    draggable={false}
                    expandable={false}
                    className="flex h-11 w-11 items-center justify-center bg-white/15"
                    borderRadius={16}
                    blurIntensity="sm"
                    shadowIntensity="md"
                    glowIntensity="lg"
                  >
                    <div className="text-ink transition-transform duration-300 group-active:scale-95">
                      <AnimatedMenuIcon isOpen={menuOpen} />
                    </div>
                  </LiquidGlassCard>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div className="overflow-hidden" aria-hidden={!menuOpen} initial={false} animate={{ height: menuOpen ? 'auto' : 0 }} transition={{ height: { duration: menuOpen ? 0.5 : 0.44, ease: menuOpen ? [0.16, 1, 0.3, 1] : [0.55, 0, 0.2, 1] } }}>
            <motion.div className={`pb-5 pt-1 text-ink sm:pb-6 sm:pt-2 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} initial={false} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -18, filter: menuOpen ? 'blur(0px)' : 'blur(8px)' }} transition={{ opacity: { duration: menuOpen ? 0.2 : 0.28, ease: 'easeOut' }, y: { duration: menuOpen ? 0.46 : 0.34, ease: [0.16, 1, 0.3, 1] }, filter: { duration: menuOpen ? 0.34 : 0.3, ease: 'easeOut' } }}>
              <nav className="expanded-nav grid gap-0 sm:gap-0.5" aria-label="Expanded navigation">
                {expandedItems.map((item) => (
                  <motion.a key={item.href} className="expanded-nav-link font-display block text-[clamp(1.75rem,8vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-ink outline-none will-change-[filter,transform] sm:text-[clamp(2.15rem,7.2vw,4rem)] sm:leading-[0.98] sm:tracking-normal" href={item.href} onClick={(event) => navigateToSection(event, item.href)} initial={false} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 10, filter: menuOpen ? 'blur(0px)' : 'blur(7px)' }} transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 0.5 }} whileHover={{ x: 4 }}>
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div initial={false} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 10, filter: menuOpen ? 'blur(0px)' : 'blur(7px)' }} transition={{ type: 'spring', stiffness: 115, damping: 23, mass: 0.9 }} className="mt-5 border-t border-ink/10 pt-5 sm:mt-7 sm:pt-6">
                <div className="flex flex-col gap-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone/50 sm:text-[11px]">Work With Us</p>
                  <div className="flex flex-row items-center gap-2 sm:gap-3.5">
                    <motion.a className="group relative block flex-1 sm:flex-initial" href="mailto:hello@rudhram.com" whileTap={{ scale: 0.97 }}>
                      <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        className="bg-white/20 px-4 py-3 sm:px-6 sm:py-3.5"
                        borderRadius={100}
                        blurIntensity="sm"
                        shadowIntensity="sm"
                        glowIntensity="md"
                      >
                        <div className="flex w-full items-center justify-center">
                          <span className="whitespace-nowrap text-[13px] font-bold tracking-tight text-ink sm:text-[15px]">hello@rudhram.com</span>
                        </div>
                      </LiquidGlassCard>
                    </motion.a>

                    <motion.a className="group relative block flex-1 sm:flex-initial" href="#contact" onClick={(event) => navigateToSection(event, '#contact')} whileTap={{ scale: 0.97 }}>
                      <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        className="bg-bronze/15 px-4 py-3 sm:px-6 sm:py-3.5"
                        borderRadius={100}
                        blurIntensity="sm"
                        shadowIntensity="sm"
                        glowIntensity="md"
                      >
                        <div className="flex w-full items-center justify-center">
                          <span className="whitespace-nowrap text-[13px] font-bold tracking-tight text-ink sm:text-[15px]">Schedule a call</span>
                        </div>
                      </LiquidGlassCard>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </LiquidGlassCard>
    </motion.div>
    </header>
  )
})
