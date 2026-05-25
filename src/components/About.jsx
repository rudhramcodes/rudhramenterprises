import { memo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { SectionKicker } from './ui'
import GradualBlur from './GradualBlur'
import { CursorFollow } from './CursorFollow'
import { useIsDesktop } from '../hooks/useMediaQuery'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'

const thesisItems = [
  {
    title: 'Culture',
    subtitle: 'Heritage & Foundation',
    description: 'We draw strength from heritage, rituals, craft, and the values that keep every venture grounded.',
    image: '/images/culture.webp',
    cursorText: 'Culture'
  },
  {
    title: 'Innovation',
    subtitle: 'Vision & Progress',
    description: 'We turn creative courage, modern systems, and emerging possibilities into ventures built for tomorrow.',
    image: '/images/innovation.webp',
    cursorText: 'Innovation'
  },
  {
    title: 'Excellence',
    subtitle: 'Quality & Impact',
    description: 'We build trust through discipline, precision, and the kind of details people remember.',
    image: '/images/excellence.webp',
    cursorText: 'Excellence'
  },
]

const ITEM_COUNT = thesisItems.length
const PANEL_H = 'clamp(460px, calc(100vh - 10rem), 680px)'

const MobileBrandThesis = memo(function MobileBrandThesis() {
  return (
    <div className="lg:hidden flex flex-col w-full">
      {thesisItems.map((item, index) => (
        <div key={item.title} className="relative h-screen w-full overflow-hidden border-b border-paper/10">
          <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 z-30 flex flex-col justify-end px-4 pb-12">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/20 to-transparent pointer-events-none" />
            <div className="ios-glass-menu reveal relative rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-3 border-b border-ink/5 pb-4 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink">Thesis 0{index + 1}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">{item.subtitle}</span>
              </div>
              <h3 className="font-display font-bold text-[3rem] text-ink leading-[0.88] tracking-tighter mb-4">{item.title}</h3>
              <p className="text-[15px] leading-relaxed font-medium text-ink/80">{item.description}</p>
            </div>
          </div>
          <GradualBlur target="parent" position="bottom" height="14rem" strength={4} divCount={10} curve="bezier" exponential opacity={0.4} zIndex={20} />
        </div>
      ))}
    </div>
  )
})

export const BrandThesis = memo(function BrandThesis() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  const isDesktop = useIsDesktop()
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })
  const stripY = useTransform(scrollYProgress, [0, 1], ['0%', `-${(((ITEM_COUNT - 1) / ITEM_COUNT) * 100).toFixed(4)}%`])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(ITEM_COUNT - 1, Math.max(0, Math.floor(latest * ITEM_COUNT)))
    setActiveIndex((prev) => (prev !== next ? next : prev))
  })

  return (
    <section id="about" className="relative bg-paper">
      {isDesktop && <CursorFollow show={isHoveringImage}>{thesisItems[activeIndex].cursorText}</CursorFollow>}

      <div className={`${maxWidth} pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-20 lg:pb-12`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div>
            <SectionKicker>About Rudhram Group</SectionKicker>
            <h2 className="mt-3 font-display font-bold text-[clamp(2.1rem,7vw,4.2rem)] leading-[0.92] tracking-tighter text-ink [&>span]:block reveal">
              A venture-building institution, not a company - a system that creates companies.
            </h2>
          </div>
          <p className="max-w-xl text-base text-ink/60 sm:text-lg reveal">
            Rudhram Group is a structured venture-building organization focused on identifying real-life challenges and turning them into impactful businesses. It combines strong values, disciplined systems, and modern thinking to build brands that create long-term value across industries.
          </p>
        </div>
      </div>

      <div ref={scrollRef} style={{ height: `${ITEM_COUNT * 100}vh` }} className="relative">
        <MobileBrandThesis />

        <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
          <div className={`${maxWidth} flex h-full items-stretch`}>
            <div className="grid w-full h-full items-stretch gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
              <div className="hidden flex-col justify-between lg:flex reveal self-center" style={{ height: PANEL_H }}>
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bronze">Thesis</span>
                  <span className="font-display text-base leading-none text-bronze/65">0{activeIndex + 1} / 0{ITEM_COUNT}</span>
                </div>
                <div className="flex flex-1 flex-col divide-y divide-ink/8 overflow-hidden">
                  {thesisItems.map((item, index) => {
                    const isActive = index === activeIndex
                    return (
                      <article key={item.title} className={`flex flex-1 flex-col justify-center gap-1.5 px-4 py-3 transition-colors duration-500 ${isActive ? 'bg-ivory' : 'bg-paper'}`}>
                        <span className={`text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${isActive ? 'text-bronze' : 'text-stone/35'}`}>{item.subtitle}</span>
                        <span className={`font-display font-semibold tracking-tight text-[clamp(1.35rem,2.5vw,2.2rem)] leading-[0.95] transition-colors duration-500 ${isActive ? 'text-ink' : 'text-stone/22'}`}>{item.title}</span>
                        <span className={`max-w-sm text-sm leading-[1.6] transition-colors duration-500 ${isActive ? 'text-stone' : 'text-stone/35'}`}>{item.description}</span>
                      </article>
                    )
                  })}
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone/40">Scroll to explore</span>
                </div>
              </div>

              <div className="reveal relative overflow-hidden border border-ink/10 shadow-[0_34px_100px_rgba(17,16,14,0.11)]" style={{ height: '100%' }} onMouseEnter={() => setIsHoveringImage(true)} onMouseLeave={() => setIsHoveringImage(false)}>
                <motion.div style={{ y: stripY, height: `${ITEM_COUNT * 100}%`, willChange: 'transform' }} className="absolute inset-x-0 top-0">
                  {thesisItems.map((item) => (
                    <div key={item.title} className="relative w-full" style={{ height: `${100 / ITEM_COUNT}%` }}>
                      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" style={{ transform: 'scale(1.03)', transformOrigin: 'center center' }} />
                    </div>
                  ))}
                </motion.div>
                <GradualBlur target="parent" position="bottom" height="9rem" strength={3} divCount={8} curve="bezier" exponential opacity={0.97} zIndex={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
