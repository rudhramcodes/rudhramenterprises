import { memo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { SectionKicker } from './ui'
import GradualBlur from './GradualBlur'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle =
  'text-[clamp(3.1rem,13vw,6rem)] leading-[0.92] tracking-tighter text-ink lg:text-8xl [&>span]:block'
const sectionShell = 'py-24 sm:py-28 lg:py-36'

const thesisItems = [
  {
    title: 'Culture',
    subtitle: 'Heritage & Foundation',
    description:
      'We draw strength from heritage, rituals, craft, and the values that keep every venture grounded.',
    image:
      'https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?q=80&w=1469&auto=format&fit=crop',
  },
  {
    title: 'Innovation',
    subtitle: 'Vision & Progress',
    description:
      'We turn creative courage, modern systems, and emerging possibilities into ventures built for tomorrow.',
    image:
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=900&auto=format&fit=crop&q=80',
  },
  {
    title: 'Excellence',
    subtitle: 'Quality & Impact',
    description:
      'We build trust through discipline, precision, and the kind of details people remember.',
    image:
      'https://images.unsplash.com/photo-1611075384322-731537ad7971?w=900&auto=format&fit=crop&q=80',
  },
]

const ITEM_COUNT = thesisItems.length
const PANEL_H = 'clamp(460px, calc(100vh - 10rem), 680px)'

const MobileBrandThesis = memo(function MobileBrandThesis() {
  return (
    <div className="lg:hidden flex flex-col w-full">
      {thesisItems.map((item, index) => (
        <div key={item.title} className="relative h-screen w-full overflow-hidden border-b border-paper/10">
          {/* Background Image */}
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          
          {/* Darker Overlay for readability */}
          <div className="absolute inset-0 bg-ink/30" />

          {/* Text Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 pb-16 z-30">
            <div className="reveal space-y-2">
              <div className="flex items-center gap-3 border-b border-paper/20 pb-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-bronze-soft">
                  Thesis 0{index + 1}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-paper/60">
                  {item.subtitle}
                </span>
              </div>
              <h3 className="font-display text-5xl text-paper tracking-tighter">
                {item.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-paper/80">
                {item.description}
              </p>
            </div>
          </div>

          <GradualBlur
            target="parent"
            position="bottom"
            height="12rem"
            strength={3}
            divCount={8}
            curve="bezier"
            exponential
            opacity={0.6}
            zIndex={20}
          />
        </div>
      ))}
    </div>
  )
})

export const BrandThesis = memo(function BrandThesis() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  const stripPct = ((ITEM_COUNT - 1) / ITEM_COUNT) * 100
  const stripY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${stripPct.toFixed(4)}%`]
  )

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(ITEM_COUNT - 1, Math.max(0, Math.floor(latest * ITEM_COUNT)))
    setActiveIndex(next)
  })

  return (
    <section id="about" className="relative bg-paper">

      {/* ── Header ── */}
      <div className={`${maxWidth} pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-20 lg:pb-12`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div>
            {/* <SectionKicker>About Rudhram</SectionKicker> */}
            <h2 className="mt-3 text-[clamp(2.1rem,7vw,4.2rem)] leading-[0.92] tracking-tighter text-ink [&>span]:block reveal">
              We lead today,
              <span>and we lead what comes next.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.7] text-stone sm:text-lg reveal">
            Rudhram exists to bridge tradition and transformation. Rooted in culture, driven by
            creativity, and sharpened by modern innovation, we build ventures that create meaning,
            momentum, and measurable impact.
          </p>
        </div>
      </div>

      {/* ── Mobile specific experience ── */}
      <MobileBrandThesis />

      {/* ── Scroll zone: ITEM_COUNT × 100vh (Desktop Only) ── */}
      <div
        ref={scrollRef}
        style={{ height: `${ITEM_COUNT * 100}vh` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className={`${maxWidth} flex h-full items-stretch`}>
            <div className="grid w-full h-full items-stretch gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">

              {/* ── LEFT PANEL desktop ── */}
              <div
                className="hidden flex-col justify-between lg:flex reveal self-center"
                style={{ height: PANEL_H }}
              >
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bronze">
                    Thesis
                  </span>
                  <span className="font-display text-base leading-none text-bronze/65">
                    0{activeIndex + 1} / 0{ITEM_COUNT}
                  </span>
                </div>

                <div className="flex flex-1 flex-col divide-y divide-ink/8 overflow-hidden">
                  {thesisItems.map((item, index) => {
                    const isActive = index === activeIndex
                    return (
                      <article
                        key={item.title}
                        className={`flex flex-1 flex-col justify-center gap-1.5 px-4 py-3 transition-colors duration-500 ${isActive ? 'bg-ivory' : 'bg-paper'
                          }`}
                      >
                        <span
                          className={`text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${isActive ? 'text-bronze' : 'text-stone/35'
                            }`}
                        >
                          {item.subtitle}
                        </span>
                        <span
                          className={`font-display text-[clamp(1.35rem,2.5vw,2.2rem)] leading-[0.95] transition-colors duration-500 ${isActive ? 'text-ink' : 'text-stone/22'
                            }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`max-w-sm text-sm leading-[1.6] transition-colors duration-500 ${isActive ? 'text-stone' : 'text-stone/35'
                            }`}
                        >
                          {item.description}
                        </span>
                      </article>
                    )
                  })}
                </div>

                <div className="border-t border-ink/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone/40">
                    Scroll to explore
                  </span>
                </div>
              </div>

              {/* ── RIGHT PANEL — film strip ── */}
              <div
                className="reveal relative overflow-hidden border border-ink/10 shadow-[0_34px_100px_rgba(17,16,14,0.11)]"
                style={{ height: '100%' }}
              >
                <motion.div
                  style={{
                    y: stripY,
                    height: `${ITEM_COUNT * 100}%`,
                    willChange: 'transform',
                  }}
                  className="absolute inset-x-0 top-0"
                >
                  {thesisItems.map((item) => (
                    <div
                      key={item.title}
                      className="relative w-full"
                      style={{ height: `${100 / ITEM_COUNT}%` }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ transform: 'scale(1.03)', transformOrigin: 'center center' }}
                      />
                    </div>
                  ))}
                </motion.div>

                <GradualBlur
                  target="parent"
                  position="bottom"
                  height="9rem"
                  strength={3}
                  divCount={8}
                  curve="bezier"
                  exponential
                  opacity={0.97}
                  zIndex={20}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
})

export const OriginSymbol = memo(function OriginSymbol() {
  return (
    <section className={`${sectionShell} bg-ink text-paper`}>
      <div
        className={`${maxWidth} chapter grid gap-12 border border-paper/10 bg-paper/[0.03] p-6 sm:p-10 lg:grid-cols-[1fr_0.75fr] lg:p-14`}
      >
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
            Rudhram carries the energy of courage, creation, and purpose. The trishul-inspired mark
            represents upward movement, clarity, and the balance of body, mind, and soul.
          </p>
          <blockquote className="mt-10 border-l border-bronze pl-6 font-display text-3xl leading-none text-paper sm:text-5xl">
            From culture to creation, from vision to reality.
          </blockquote>
        </div>
      </div>
    </section>
  )
})