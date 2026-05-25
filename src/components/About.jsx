import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { CaretLeft } from '@phosphor-icons/react'
import { SectionKicker } from './ui'
import GradualBlur from './GradualBlur'
import { CursorFollow } from './CursorFollow'
import { useIsDesktop } from '../hooks/useMediaQuery'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'

const thesisItems = [
  {
    title: 'What Rudhram Group Represents',
    subtitle: 'Fearless vision',
    description: 'A way of thinking shaped by experience, transformation, and rooted strength.',
    detailTitle: 'Fearless vision, transformation, and rooted strength.',
    detailCopy: [
      'Rudhram represents a way of thinking shaped through experience. It stands for the courage to move forward without complete clarity and the discipline to turn confusion into direction.',
      'It also represents rooted strength: staying connected to values and purpose while building something new. Rudhram balances tradition and progress, where cultural depth meets modern innovation to create meaningful impact.',
    ],
    image: '/images/culture.webp',
    cursorText: 'What we represents'
  },
  {
    title: 'Why Rudhram Group Exists',
    subtitle: 'Purpose beyond profit',
    description: 'To build structured ventures that solve real problems and create meaningful value.',
    detailTitle: 'Because the world needs businesses with purpose.',
    detailCopy: [
      'Rudhram Group exists because the world does not need more businesses without purpose. It needs structured ventures that create meaningful value, improve lives, and build long-term impact.',
      'Its existence is driven by responsibility: to observe real needs, understand them deeply, and build what truly matters with discipline, values, and modern capability.',
    ],
    image: '/images/innovation.webp',
    cursorText: 'Why we exists'
  },
  {
    title: 'What Sets Rudhram Group Apart',
    subtitle: 'Systems that create',
    description: 'Rudhram does not focus on one business. It builds systems that consistently create businesses.',
    detailTitle: 'Not one company, but a system for creating companies.',
    detailCopy: [
      'What sets Rudhram apart is its approach. It does not operate as a traditional company focused on one business. Instead, it builds repeatable systems that identify problems, design solutions, and grow them into structured brands.',
      'Rudhram combines purpose-driven thinking, disciplined execution, long-term vision, cultural grounding, and modern innovation. That makes its ventures scalable, meaningful, sustainable, and aligned with real-world needs.',
    ],
    image: '/images/excellence.webp',
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
    image: '/images/culture.webp',
    cursorText: 'Our Direction'
  },
]

const ITEM_COUNT = thesisItems.length
const PANEL_H = 'clamp(460px, calc(100vh - 10rem), 680px)'

const getThesisNumber = (item) => thesisItems.findIndex((thesis) => thesis.title === item.title) + 1

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
    <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <motion.button
        type="button"
        aria-label="Close detail view"
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
        onClick={onBack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        ref={pageRef}
        className="absolute inset-x-0 bottom-0 top-[9vh] overflow-y-auto overscroll-contain rounded-t-[2rem] border-t border-white/45 bg-paper text-ink shadow-[0_-42px_120px_rgba(17,16,14,0.22)] sm:top-[11vh] sm:rounded-t-[2.35rem] lg:top-[14vh]"
        data-lenis-prevent
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        style={{ WebkitOverflowScrolling: 'touch' }}
        initial={{ y: '100%', opacity: 0.78, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '100%', opacity: 0.78, scale: 0.985 }}
        transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-detail-title"
      >
        <div className="sticky top-0 z-30 border-b border-ink/10 bg-paper/78 backdrop-blur-xl">
          <div className={`${maxWidth} flex items-center justify-between py-3 sm:py-4`}>
            <button
              type="button"
              onClick={onBack}
              className="detail-back-button group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-ink/15 text-ink outline-none transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-bronze/55 hover:text-bronze focus-visible:-translate-y-0.5 focus-visible:scale-[1.035] focus-visible:border-bronze/65 focus-visible:text-bronze"
              aria-label="Back to about section"
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/55 via-white/20 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
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
          <motion.div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.76fr)] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-14 lg:gap-y-8 xl:gap-x-20" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="max-w-[48rem]">
              {/* <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-ivory px-4 py-2">
                <SectionKicker>{item.subtitle}</SectionKicker>
              </div> */}
              <h1 id="about-detail-title" className="max-w-[11ch] font-display text-[clamp(2.55rem,5.6vw,5.45rem)] font-bold leading-[0.9] tracking-tight text-ink">
                {item.title}
              </h1>
            </div>

            <div className="relative min-h-[18.5rem] overflow-hidden rounded-[1.15rem] border border-ink/10 shadow-[0_24px_80px_rgba(17,16,14,0.18)] sm:h-[41vh] sm:min-h-[21rem] lg:row-span-2 lg:h-[min(64vh,38rem)] lg:min-h-[28rem]">
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]" />
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
    </motion.div>
  )
})

const MobileBrandThesis = memo(function MobileBrandThesis({ onOpenDetails }) {
  return (
    <div className="lg:hidden flex flex-col w-full">
      {thesisItems.map((item, index) => (
        <button key={item.title} type="button" onClick={() => onOpenDetails(index)} className="relative h-screen w-full overflow-hidden border-b border-paper/10 text-left outline-none focus-visible:ring-2 focus-visible:ring-bronze">
          <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 z-30 flex flex-col justify-end px-4 pb-12">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/20 to-transparent pointer-events-none" />
            <div className="ios-glass-menu reveal relative rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-3 border-b border-ink/5 pb-4 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink">About 0{index + 1}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">{item.subtitle}</span>
              </div>
              <h3 className="font-display font-bold text-[2.6rem] text-ink leading-[0.9] tracking-tighter mb-4">{item.title}</h3>
              <p className="text-[15px] leading-relaxed font-medium text-ink/80">{item.description}</p>
            </div>
          </div>
          <GradualBlur target="parent" position="bottom" height="14rem" strength={4} divCount={10} curve="bezier" exponential opacity={0.4} zIndex={20} />
        </button>
      ))}
    </div>
  )
})

export const BrandThesis = memo(function BrandThesis() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailIndex, setDetailIndex] = useState(0)
  const isDesktop = useIsDesktop()
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })
  const stripY = useTransform(scrollYProgress, [0, 1], ['0%', `-${(((ITEM_COUNT - 1) / ITEM_COUNT) * 100).toFixed(4)}%`])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(ITEM_COUNT - 1, Math.max(0, Math.floor(latest * ITEM_COUNT)))
    setActiveIndex((prev) => (prev !== next ? next : prev))
  })

  const openDetails = useCallback((index = activeIndex) => {
    setIsHoveringImage(false)
    setDetailIndex(index)
    setDetailsOpen(true)
    window.history.pushState({ aboutDetails: true, detailIndex: index }, '', `#about-${index + 1}`)
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
    <section id="about" className="relative bg-paper">
      {isDesktop && <CursorFollow show={isHoveringImage}>{thesisItems[activeIndex].cursorText}</CursorFollow>}
      <AnimatePresence>
        {detailsOpen && <AboutDetailPage item={thesisItems[detailIndex]} onBack={closeDetails} />}
      </AnimatePresence>

      <div className={`${maxWidth} pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-20 lg:pb-12`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div>
            <SectionKicker>About Rudhram Group</SectionKicker>
            <h2 className="mt-3 font-display font-bold text-[clamp(2.1rem,7vw,4.2rem)] leading-[0.92] tracking-tighter text-ink [&>span]:block reveal">
              A venture-building institution, not a company - a system that creates companies.
            </h2>
          </div>
          <p className="max-w-xl text-base text-ink/60 sm:text-lg reveal">
            Rudhram Group transforms real-world problems into meaningful, scalable brands through purpose, discipline, and innovation. It combines values, structured systems, cultural depth, and modern thinking to create long-term value across industries.
          </p>
        </div>
      </div>

      <div ref={scrollRef} style={{ height: `${ITEM_COUNT * 100}vh` }} className="relative">
        <MobileBrandThesis onOpenDetails={openDetails} />

        <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
          <div className={`${maxWidth} flex h-full items-stretch`}>
            <div className="grid w-full h-full items-stretch gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
              <div className="hidden flex-col justify-between lg:flex reveal self-center" style={{ height: PANEL_H }}>
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bronze">About</span>
                  <span className="font-display text-base leading-none text-bronze/65">0{activeIndex + 1} / 0{ITEM_COUNT}</span>
                </div>
                <div className="flex flex-1 flex-col divide-y divide-ink/8 overflow-hidden">
                  {thesisItems.map((item, index) => {
                    const isActive = index === activeIndex
                    return (
                      <button type="button" onClick={() => openDetails(index)} key={item.title} className={`flex flex-1 cursor-pointer flex-col justify-center gap-1.5 px-4 py-3 text-left outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-bronze ${isActive ? 'bg-ivory' : 'bg-paper'}`}>
                        <span className={`text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${isActive ? 'text-bronze' : 'text-stone/35'}`}>{item.subtitle}</span>
                        <span className={`font-display font-semibold tracking-tight text-[clamp(1.1rem,1.9vw,1.72rem)] leading-[0.98] transition-colors duration-500 ${isActive ? 'text-ink' : 'text-stone/22'}`}>{item.title}</span>
                        <span className={`max-w-sm text-sm leading-[1.6] transition-colors duration-500 ${isActive ? 'text-stone' : 'text-stone/35'}`}>{item.description}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone/40">Scroll to explore</span>
                </div>
              </div>

              <button type="button" aria-label={`Open ${thesisItems[activeIndex].title}`} className="reveal relative w-full cursor-pointer overflow-hidden border border-ink/10 text-left shadow-[0_34px_100px_rgba(17,16,14,0.11)] outline-none focus-visible:ring-2 focus-visible:ring-bronze" style={{ height: '100%' }} onClick={() => openDetails(activeIndex)} onMouseEnter={() => setIsHoveringImage(true)} onMouseLeave={() => setIsHoveringImage(false)}>
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
