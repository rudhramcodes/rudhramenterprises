import { memo, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/siteContent'

const AnimatedMenuIcon = memo(function AnimatedMenuIcon({ isOpen }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-current"
      initial={false}
      animate={{ rotate: isOpen ? 90 : 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.45 }}
    >
      <motion.path
        d="M5.5 8.75h13"
        strokeLinecap="round"
        strokeWidth={1.55}
        initial={false}
        animate={isOpen ? { y: 3.25, rotate: 45 } : { y: 0, rotate: 0 }}
        style={{ transformOrigin: '12px 12px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.45 }}
      />
      <motion.path
        d="M5.5 15.25h13"
        strokeLinecap="round"
        strokeWidth={1.55}
        initial={false}
        animate={isOpen ? { y: -3.25, rotate: -45 } : { y: 0, rotate: 0 }}
        style={{ transformOrigin: '12px 12px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.45 }}
      />
    </motion.svg>
  )
})

const menuVariants = {
  hidden: { opacity: 0, y: -16, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 24,
      mass: 0.65,
      staggerChildren: 0.035,
      delayChildren: 0.04
    }
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(8px)',
    transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] }
  },
}

const menuItemVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 220, damping: 25, mass: 0.5 }
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(7px)',
    transition: { duration: 0.16 }
  }
}

const navVariants = {
  hidden: { opacity: 0, y: -10, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      delay: 0.12,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(6px)',
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 22,
      mass: 0.55,
      delay: 0.08
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: 'blur(6px)',
    transition: {
      duration: 0.18,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export const Header = memo(function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [smallScreen, setSmallScreen] = useState(false)
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null)
  const resetHoverState = useCallback(() => {
    setHoveredNavIndex(null)
  }, [])

  const closeMenu = useCallback(() => {
    resetHoverState()
    setMenuOpen(false)
  }, [resetHoverState])

  const toggleMenu = useCallback(() => {
    resetHoverState()
    setMenuOpen((value) => !value)
  }, [resetHoverState])

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    const onViewportChange = () => setSmallScreen(mediaQuery.matches)

    onViewportChange()
    mediaQuery.addEventListener('change', onViewportChange)
    return () => mediaQuery.removeEventListener('change', onViewportChange)
  }, [])

  useEffect(() => {
    if (menuOpen) resetHoverState()
  }, [menuOpen, resetHoverState])

  const menuMode = compact || menuOpen || smallScreen
  const expandedItems = [...navItems, { label: 'Contact', href: '#contact' }]

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${compact ? 'px-3 pt-2 sm:px-4' : 'px-4 pt-4 sm:px-6'}`}>
      <motion.div
        className={`ios-glass-nav mx-auto overflow-hidden rounded-[28px] px-5 ${
          menuOpen ? '' : 'h-[4.5rem]'
        }`}
        animate={{
          maxWidth: menuMode ? 544 : 1280,
          borderRadius: 28,
          boxShadow: compact
              ? '0 24px 90px rgba(17,16,14,0.14)'
              : '0 18px 70px rgba(17,16,14,0.12)'
        }}
        transition={{ type: 'spring', stiffness: 115, damping: 23, mass: 0.9 }}
        style={{
          transition: 'background-color 300ms, border-color 300ms, box-shadow 300ms'
        }}
      >
        <div className="flex h-[4.5rem] w-full items-center justify-between">
          <a className="group flex min-w-36 items-center" href="#top" aria-label="Rudhram Enterprises home" onClick={resetHoverState}>
            <img className="h-9 w-auto transition duration-300 ease-out group-hover:opacity-75 group-active:scale-[0.98]" src="/images/logo.png" alt="Rudhram" />
          </a>

          <AnimatePresence initial={false}>
            {!compact && !menuOpen && !smallScreen && (
              <motion.nav
                className="hidden items-center gap-7 lg:flex"
                aria-label="Primary navigation"
                variants={navVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onMouseLeave={() => setHoveredNavIndex(null)}
              >
                {expandedItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    className=" relative rounded-full px-3 py-2 text-sm font-semibold text-ink/70 outline-none transition-all duration-300 hover:text-ink focus-visible:text-ink"
                    style={{
                      filter: hoveredNavIndex !== null && hoveredNavIndex !== index ? 'blur(1.4px)' : 'blur(0px)',
                      transition: 'filter 280ms ease, color 260ms ease'
                    }}
                    href={item.href}
                    onMouseEnter={() => setHoveredNavIndex(index)}
                    onFocus={() => setHoveredNavIndex(index)}
                    onBlur={() => setHoveredNavIndex(null)}
                    // whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {menuMode && (
              <motion.button
                className="ios-glass-button inline-flex h-12 w-12 items-center justify-center rounded-[18px] text-ink outline-none transition-colors duration-300 ease-out hover:text-bronze focus:outline-none focus-visible:text-bronze"
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatedMenuIcon isOpen={menuOpen} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ type: 'spring', stiffness: 155, damping: 27, mass: 0.68 }}
            >
              <motion.div
                className="pb-4 pt-4 text-ink sm:pb-6 sm:pt-5"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* <motion.p variants={menuItemVariants} className="mb-3 text-sm font-medium text-stone/82">
                  Menu
                </motion.p> */}
                <nav className="expanded-nav grid gap-0.5" aria-label="Expanded navigation">
                  {expandedItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      className="expanded-nav-link block font-sans text-[clamp(2.15rem,7.2vw,4rem)] font-medium leading-[0.98] tracking-normal text-ink outline-none will-change-[filter,transform]"
                      href={item.href}
                      onClick={closeMenu}
                      variants={menuItemVariants}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.985, x: 6 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  variants={menuItemVariants}
                  className="mt-7 grid gap-6 border-t border-ink/10 pt-5 text-sm sm:grid-cols-2 sm:gap-10"
                >
                  <div>
                    <p className="mb-2 text-sm font-semibold text-stone/72">Visit</p>
                    <p className="max-w-[16rem] leading-[1.45] text-ink">Rudhram Enterprises. Culture, creativity, innovation, and impact.</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-stone/72">Work With Us</p>
                    <motion.a
                      className="block text-base font-semibold text-ink outline-none transition duration-200 hover:text-bronze focus-visible:text-bronze"
                      href="mailto:hello@rudhram.com"
                      whileTap={{ scale: 0.98 }}
                    >
                      hello@rudhram.com
                    </motion.a>
                    <motion.a
                      className="mt-1 block text-base font-semibold text-ink outline-none transition duration-200 hover:text-bronze focus-visible:text-bronze"
                      href="#contact"
                      onClick={closeMenu}
                      whileTap={{ scale: 0.98 }}
                    >
                      Schedule a call
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
})
