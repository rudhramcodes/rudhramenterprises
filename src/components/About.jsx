import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { CaretLeft } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionKicker } from './ui'
import { AwwwardsButton } from './ui/AwwwardsButton'
import GradualBlur from './GradualBlur'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { maxWidth } from '../lib/layout'
import { createRevealAnimations } from '../hooks/useScrollAnimations'

gsap.registerPlugin(ScrollTrigger)

const thesisItems = [
  {
    title: 'What Rudhram Enterprises Represents',
    subtitle: 'Fearless vision',
    description: 'A way of thinking shaped by experience, transformation, and rooted strength.',
    detailTitle: 'Fearless vision, transformation, and rooted strength.',
    detailCopy: [
      'Rudhram represents a way of thinking shaped through experience. It stands for the courage to move forward without complete clarity and the discipline to turn confusion into direction.',
      'It also represents rooted strength: staying connected to values and purpose while building something new. Rudhram balances tradition and progress, where cultural depth meets modern innovation to create meaningful impact.',
    ],
    image: '/images/stepwell.webp',
    cursorText: 'What we represents'
  },
  {
    title: 'Why Rudhram Enterprises Exists',
    subtitle: 'Purpose beyond profit',
    description: 'To build structured ventures that solve real problems and create meaningful value.',
    detailTitle: 'Because the world needs businesses with purpose.',
    detailCopy: [
      'Rudhram Enterprises exists because the world does not need more businesses without purpose. It needs structured ventures that create meaningful value, improve lives, and build long-term impact.',
      'Its existence is driven by responsibility: to observe real needs, understand them deeply, and build what truly matters with discipline, values, and modern capability.',
    ],
    image: '/images/skill-hands.webp',
    cursorText: 'Why we exists'
  },
  {
    title: 'What Sets Rudhram Enterprises Apart',
    subtitle: 'Systems that create',
    description: 'Rudhram does not focus on one business. It builds systems that consistently create businesses.',
    detailTitle: 'Not one company, but a system for creating companies.',
    detailCopy: [
      'What sets Rudhram apart is its approach. It does not operate as a traditional company focused on one business. Instead, it builds repeatable systems that identify problems, design solutions, and grow them into structured brands.',
      'Rudhram combines purpose-driven thinking, disciplined execution, long-term vision, cultural grounding, and modern innovation. That makes its ventures scalable, meaningful, sustainable, and aligned with real-world needs.',
    ],
    image: '/images/long-corridor.webp',
    cursorText: 'What sets us apart'
  },
  {
    title: 'Our Direction',
    subtitle: 'Future-ready ecosystem',
    description: 'To continuously create, grow, and sustain impactful ventures across industries and geographies.',
    detailTitle: 'A future-ready ecosystem built for lasting impact.',
    detailCopy: [
      'Our direction is clear: to build a system that continuously creates, grows, and sustains impactful ventures across industries and geographies.',
      'Rudhram aims to expand across India and globally while staying rooted in its values. By combining cultural strength with modern capability, it is building long-term value with a future-ready mindset.',
    ],
    image: '/images/golden-field.webp',
    cursorText: 'Our Direction'
  },
]

const ITEM_COUNT = thesisItems.length
const PANEL_H = 'clamp(460px, calc(100vh - 10rem), 680px)'

const getThesisNumber = (item) => thesisItems.findIndex((thesis) => thesis.title === item.title) + 1

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}

const AboutDetailPage = memo(function AboutDetailPage({ item, onBack }) {
  const pageRef = useRef(null)

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [item.title])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onBack])

  return (
    <div className="fixed inset-0 z-[80]">
      <motion.button
        type="button"
        aria-label="Close detail view"
        className="absolute inset-0 bg-ink/40"
        onClick={onBack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'linear' }}
      />

      <motion.div
        ref={pageRef}
        className="absolute inset-x-0 bottom-0 top-[9vh] overflow-y-auto overscroll-contain rounded-t-[2rem] border-t border-white/45 bg-paper text-ink shadow-[0_-42px_120px_rgba(17,16,14,0.22)] sm:top-[11vh] sm:rounded-t-[2.35rem] lg:top-[14vh]"
        data-lenis-prevent
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        style={{ WebkitOverflowScrolling: 'touch', willChange: 'transform' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-detail-title"
      >
        <div className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90">
          <div className={`${maxWidth} flex items-center justify-between py-3 sm:py-4`}>
            <button
              type="button"
              onClick={onBack}
              className="shadow-sm group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-ink/15 text-ink outline-none transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-bronze/55 hover:text-bronze focus-visible:-translate-y-0.5 focus-visible:scale-[1.035] focus-visible:border-bronze/65 focus-visible:text-bronze bg-white/80 backdrop-blur-xl"
              aria-label="Back to about section"
            >
              {/* <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/55 via-white/20 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" /> */}
              <span className="pointer-events-none absolute inset-[3px] rounded-2xl border border-white/55 opacity-85" />
              <CaretLeft size={19} weight="bold" className="relative transition duration-450" />
            </button>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-stone/70">Detail View</p>
              <p className="font-display text-lg leading-none text-bronze/75">0{getThesisNumber(item)}</p>
            </div>
          </div>
        </div>

        <section className={`${maxWidth} relative py-8 sm:py-10 lg:py-12`}>
          <motion.div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.76fr)] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-14 lg:gap-y-8 xl:gap-x-20" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <div className="max-w-[48rem]">
              <h1 id="about-detail-title" className="max-w-[11ch] font-display text-[clamp(2.55rem,5.6vw,5.45rem)] font-bold leading-[0.9] tracking-tight text-ink">
                {item.title}
              </h1>
            </div>

            <div className="relative min-h-[18.5rem] overflow-hidden rounded-[1.15rem] border border-ink/10 shadow-[0_24px_80px_rgba(17,16,14,0.18)] sm:h-[41vh] sm:min-h-[21rem] lg:row-span-2 lg:h-[min(64vh,38rem)] lg:min-h-[28rem]">
              <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/22 via-transparent to-transparent" />
            </div>

            <div className="grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-[0.82fr_1.18fr] sm:gap-8">
              <p className="font-display text-[clamp(1.45rem,2.5vw,2.45rem)] font-semibold leading-[1.06] tracking-tight text-bronze-dark">
                {item.detailTitle}
              </p>
              <div className="space-y-4 text-[clamp(1rem,1.16vw,1.12rem)] leading-[1.72] text-stone">
                {item.detailCopy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  )
})

const SWIPE_THRESHOLD = 20
const AWWWARDS_EASE = [0.16, 1, 0.3, 1]
const CARD_SNAP = { type: 'tween', ease: AWWWARDS_EASE, duration: 0.5 }

const ThesisCard = memo(function ThesisCard({ item, index, stepWidth, x, onOpenDetails }) {
  const scale = useTransform(x, [
    -(index + 1) * stepWidth,
    -index * stepWidth,
    -(index - 1) * stepWidth,
  ], [0.92, 1, 0.92])

  const cardY = useTransform(x, [
    -(index + 1) * stepWidth,
    -index * stepWidth,
    -(index - 1) * stepWidth,
  ], [8, 0, 8])

  const opacity = useTransform(x, [
    -(index + 1.5) * stepWidth,
    -(index + 0.8) * stepWidth,
    -(index - 0.8) * stepWidth,
  ], [0.4, 1, 1])

  return (
    <motion.div
      style={{ scale, y: cardY, opacity }}
      className="relative flex w-[68vw] max-w-[20rem] flex-shrink-0 flex-col pt-6"
      onClick={() => onOpenDetails(index)}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-paper shadow-[0_8px_30px_rgba(17,16,14,0.08)]">
        <div className="relative w-full overflow-hidden h-56 sm:h-64 flex-shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 font-display text-[clamp(1.8rem,6vw,3rem)] font-bold leading-none tracking-tight text-white/15 select-none">
            0{index + 1}
          </span>
        </div>

        <div className="border-b border-ink/8" />

        <div className="flex flex-col px-5 pb-5 pt-4 sm:px-7">
          <span className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-bronze">
            {item.subtitle}
          </span>
          <h3 className="mb-2 font-display text-[clamp(1.2rem,4vw,1.65rem)] font-bold leading-[1.08] tracking-tight text-ink">
            {item.title}
          </h3>
          <p className="text-[clamp(0.8rem,2vw,0.92rem)] leading-[1.6] text-stone">
            {item.description}
          </p>
          <AwwwardsButton variant="primary" size="sm" className="mt-3 self-start" onClick={(e) => { e.stopPropagation(); onOpenDetails(index) }}>
            Tap to explore
          </AwwwardsButton>
        </div>
      </div>
    </motion.div>
  )
})

const MobileBrandThesis = memo(function MobileBrandThesis({ onOpenDetails }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0 })
  const swipedRef = useRef(false)
  const x = useMotionValue(0)
  const peekRatio = 0.68
  const gap = 12
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 375
  const stepWidth = Math.round(viewportWidth * peekRatio + gap)
  const maxX = -(ITEM_COUNT - 1) * stepWidth

  useLayoutEffect(() => {
    x.set(-activeSlide * stepWidth)
  }, [])

  const snapTo = useCallback((index) => {
    const next = Math.max(0, Math.min(ITEM_COUNT - 1, index))
    animate(x, -next * stepWidth, CARD_SNAP)
    setActiveSlide(next)
  }, [x, stepWidth])

  const goToSlide = useCallback((index) => {
    const next = Math.max(0, Math.min(ITEM_COUNT - 1, index))
    if (next === activeSlide) return
    swipedRef.current = true
    snapTo(next)
  }, [activeSlide, snapTo])

  const handlePointerDown = useCallback((e) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
    swipedRef.current = false
  }, [])

  const handlePointerUp = useCallback((e) => {
    const dx = e.clientX - pointerStart.current.x
    const dy = e.clientY - pointerStart.current.y
    const absDx = Math.abs(dx)

    if (absDx > SWIPE_THRESHOLD && absDx > Math.abs(dy)) {
      swipedRef.current = true
    }
  }, [])

  const handleDragEnd = useCallback((_, info) => {
    const currentX = x.get()
    const velocity = info.velocity.x
    const boostedOffset = velocity * 0.15
    const boostedX = currentX + boostedOffset
    const snapped = Math.round(-boostedX / stepWidth)
    const next = Math.max(0, Math.min(ITEM_COUNT - 1, snapped))
    animate(x, -next * stepWidth, CARD_SNAP)
    setActiveSlide(next)
  }, [x, stepWidth])

  return (
    <div className="lg:hidden relative w-full select-none overflow-hidden">
      <motion.div
        className="flex gap-3 pl-[16vw] will-change-transform"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: maxX, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {thesisItems.map((item, index) => (
          <ThesisCard
            key={item.title}
            item={item}
            index={index}
            stepWidth={stepWidth}
            x={x}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />

      <div className="flex items-center justify-center gap-2 py-3">
        {thesisItems.map((_, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            className="h-1.5 rounded-full bg-ink/15"
            animate={{
              width: i === activeSlide ? '1.75rem' : '0.375rem',
              backgroundColor: i === activeSlide ? '#B37839' : 'rgba(17,16,14,0.15)',
            }}
            transition={{ duration: 0.4, ease: AWWWARDS_EASE }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
})

export const BrandThesis = memo(function BrandThesis() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailIndex, setDetailIndex] = useState(0)
  const isDesktop = useIsDesktop()
  const aboutRef = useRef(null)
  const scrollRef = useRef(null)
  const imageBtnRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const cursorBgRef = useRef(null)
  const cursorLabelRef = useRef(null)

  const cursorText = thesisItems[activeIndex]?.cursorText ?? ''

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createRevealAnimations(aboutRef.current)
    }, aboutRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const bgEl = cursorBgRef.current
    const labelEl = cursorLabelRef.current
    if (!bgEl || !labelEl) return

    const xMoveBg = gsap.quickTo(bgEl, 'left', {
      duration: 0.5,
      ease: 'power3',
    })
    const yMoveBg = gsap.quickTo(bgEl, 'top', {
      duration: 0.5,
      ease: 'power3',
    })
    const xMoveLabel = gsap.quickTo(labelEl, 'left', {
      duration: 0.45,
      ease: 'power3',
    })
    const yMoveLabel = gsap.quickTo(labelEl, 'top', {
      duration: 0.45,
      ease: 'power3',
    })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      xMoveBg(clientX)
      yMoveBg(clientY)
      xMoveLabel(clientX)
      yMoveLabel(clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createRevealAnimations(aboutRef.current)
    }, aboutRef)
    return () => ctx.revert()
  }, [])

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })
  const stripY = useTransform(scrollYProgress, [0, 1], ['0%', `-${(((ITEM_COUNT - 1) / ITEM_COUNT) * 100).toFixed(4)}%`])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(ITEM_COUNT - 1, Math.max(0, Math.floor(latest * ITEM_COUNT)))
    setActiveIndex((prev) => (prev !== next ? next : prev))
  })

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const checkHoverAfterClose = useCallback(() => {
    if (!isDesktop) return
    const { x, y } = mousePosRef.current
    const el = document.elementFromPoint(x, y)
    if (el && imageBtnRef.current && imageBtnRef.current.contains(el)) {
      setIsHoveringImage(true)
    }
  }, [isDesktop])

  const openDetails = useCallback((index = activeIndex) => {
    const safeIndex = Math.min(ITEM_COUNT - 1, Math.max(0, index))
    setIsHoveringImage(false)
    setDetailIndex(safeIndex)
    setDetailsOpen(true)
    window.history.pushState({ aboutDetails: true, detailIndex: safeIndex }, '', `#about-${safeIndex + 1}`)
  }, [activeIndex])

  const closeDetails = useCallback(() => {
    setDetailsOpen(false)
    if (window.location.hash.startsWith('#about-')) {
      window.history.replaceState(null, '', '#about')
    }
  }, [])

  useEffect(() => {
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#about-(\d)$/)
      if (!match) {
        setDetailsOpen(false)
        return
      }
      const nextIndex = Math.min(ITEM_COUNT - 1, Math.max(0, Number(match[1]) - 1))
      setDetailIndex(nextIndex)
      setDetailsOpen(true)
    }
    syncFromHash()
    const onPopState = () => syncFromHash()
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.body.style.overflow = detailsOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [detailsOpen])

  return (
    <section ref={aboutRef} id="about" className="relative bg-paper">
      {isDesktop && (
        <>
          <motion.div
            ref={cursorBgRef}
            variants={scaleAnimation}
            initial="initial"
            animate={isHoveringImage ? 'enter' : 'closed'}
            className="pointer-events-none fixed left-0 top-0 z-[901] hidden h-12 items-center justify-center rounded-2xl lg:flex"
            style={{
              backgroundColor: '#5a3d1e',
              willChange: 'transform',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            <span className="invisible whitespace-nowrap text-[14px] font-light">
              {cursorText}
            </span>
          </motion.div>
          <motion.div
            ref={cursorLabelRef}
            variants={scaleAnimation}
            initial="initial"
            animate={isHoveringImage ? 'enter' : 'closed'}
            className="pointer-events-none fixed left-0 top-0 z-[902] hidden h-12 items-center justify-center rounded-full text-[14px] font-light text-white lg:flex"
            style={{
              backgroundColor: 'transparent',
              willChange: 'transform',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            {cursorText}
          </motion.div>
        </>
      )}
      <AnimatePresence onExitComplete={checkHoverAfterClose}>
        {detailsOpen && <AboutDetailPage item={thesisItems[detailIndex]} onBack={closeDetails} />}
      </AnimatePresence>

      <div className={`${maxWidth} pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-20 lg:pb-12`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div>
            <SectionKicker>About Rudhram Enterprises</SectionKicker>
            <motion.h2
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-display font-bold text-[clamp(2.1rem,7vw,4.2rem)] leading-[0.92] tracking-tighter text-ink [&>span]:block"
            >
              A venture-building institution, not a company - a system that creates companies.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-base text-ink/60 sm:text-lg"
          >
            Rudhram Enterprises transforms real-world problems into meaningful, scalable brands through purpose, discipline, and innovation. It combines values, structured systems, cultural depth, and modern thinking to create long-term value across industries.
          </motion.p>
        </div>
      </div>

      <div ref={scrollRef} className="relative lg:h-[400vh]">
        <MobileBrandThesis onOpenDetails={openDetails} />

        <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
          <div className={`${maxWidth} flex h-full items-stretch`}>
            <div className="grid w-full h-full items-stretch gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
              <div className="hidden flex-col justify-between lg:flex reveal self-center" style={{ height: PANEL_H }}>
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bronze">About</span>
                  <span className="font-display text-base leading-none text-bronze/65">0{activeIndex + 1} / 0{ITEM_COUNT}</span>
                </div>
                <div className="relative flex flex-1 flex-col divide-y divide-ink/8 overflow-hidden">
                  {/* Sliding active background indicator */}
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 z-0 bg-ivory"
                    style={{ height: `${100 / ITEM_COUNT}%` }}
                    animate={{ top: `${(activeIndex / ITEM_COUNT) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  />
                  {thesisItems.map((item, index) => {
                    const isActive = index === activeIndex
                    if (isActive) {
                      return (
                        <button type="button" onClick={() => openDetails(index)} key={item.title} className="relative z-10 flex flex-1 flex-col justify-center gap-1.5 px-4 py-3 text-left cursor-pointer outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-bronze">
                          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-bronze transition-colors duration-500">{item.subtitle}</span>
                          <span className="font-display font-semibold tracking-tight text-[clamp(1.1rem,1.9vw,1.72rem)] leading-[0.98] text-ink transition-colors duration-500">{item.title}</span>
                          <span className="max-w-sm text-sm leading-[1.6] text-stone transition-colors duration-500">{item.description}</span>
                        </button>
                      )
                    }
                    return (
                      <div key={item.title} className="relative z-10 flex flex-1 flex-col justify-center gap-1.5 px-4 py-3 text-left transition-colors duration-500">
                        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone/35 transition-colors duration-500">{item.subtitle}</span>
                        <span className="font-display font-semibold tracking-tight text-[clamp(1.1rem,1.9vw,1.72rem)] leading-[0.98] text-stone/22 transition-colors duration-500">{item.title}</span>
                        <span className="max-w-sm text-sm leading-[1.6] text-stone/35 transition-colors duration-500">{item.description}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone/40">Scroll to explore</span>
                </div>
              </div>

              <button ref={imageBtnRef} type="button" aria-label={`Open ${thesisItems[activeIndex].title}`} className="reveal relative w-full cursor-pointer overflow-hidden border border-ink/10 text-left shadow-[0_34px_100px_rgba(17,16,14,0.11)] outline-none focus-visible:ring-2 focus-visible:ring-bronze" style={{ height: '100%' }} onClick={() => openDetails(activeIndex)} onMouseEnter={() => setIsHoveringImage(true)} onMouseLeave={() => setIsHoveringImage(false)}>
                <motion.div style={{ y: stripY, height: `${ITEM_COUNT * 100}%`, willChange: 'transform' }} className="absolute inset-x-0 top-0">
                  {thesisItems.map((item) => (
                    <div key={item.title} className="relative w-full" style={{ height: `${100 / ITEM_COUNT}%` }}>
                      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" style={{ transform: 'scale(1.03)', transformOrigin: 'center center' }} />
                    </div>
                  ))}
                </motion.div>
                <GradualBlur target="parent" position="bottom" height="9rem" strength={3} divCount={8} curve="bezier" exponential opacity={0.97} zIndex={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
