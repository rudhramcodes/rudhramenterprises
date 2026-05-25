import { memo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { SectionKicker } from './ui'
import GradualBlur from './GradualBlur'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle =
  'text-[clamp(3.1rem,13vw,6rem)] leading-[0.92] tracking-tighter text-ink lg:text-8xl [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'
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

export const BrandThesis = memo(function BrandThesis() {
  const [activeIndex, setActiveIndex] = useState(0)

  // ── scrollRef: sirf sticky scroll zone pe track karo ──
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  // Film-strip: strip apni height ka -(n-1)/n % upar jayegi
  // 3 images → strip height = 300% of container → -66.67% = 2 images worth of scroll
  const stripPct = ((ITEM_COUNT - 1) / ITEM_COUNT) * 100
  const stripY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${stripPct.toFixed(3)}%`]
  )

  // Active index — scroll progress se
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(ITEM_COUNT - 1, Math.max(0, Math.floor(latest * ITEM_COUNT)))
    setActiveIndex(next)
  })

  return (
    // ── IMPORTANT: NO overflow-hidden here — sticky break ho jaata hai ──
    <section id="about" className="relative bg-paper">

      {/* ── Header — normal flow, sticky se bahar ── */}
      <div className={`${maxWidth} ${sectionShell} pb-0`}>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <SectionKicker>About Rudhram</SectionKicker>
            <h2 className="text-[clamp(2.2rem,8vw,4.5rem)] leading-[0.92] tracking-tighter text-ink lg:text-6xl [&>span]:block reveal">
              We lead today,
              <span>and we lead what comes next.</span>
            </h2>
          </div>
          <p className={`${sectionLead} reveal`}>
            Rudhram exists to bridge tradition and transformation. Rooted in culture, driven by
            creativity, and sharpened by modern innovation, we build ventures that create meaning,
            momentum, and measurable impact.
          </p>
        </div>
      </div>

      {/* ── Scroll zone: 300vh — yahan sticky pin hoga ── */}
      {/* ref yahan — useScroll isko measure karega */}
      <div
        ref={scrollRef}
        style={{ height: `${ITEM_COUNT * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport — top:0 pin, h-screen */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className={`${maxWidth} flex h-full items-center gap-14 py-12 lg:grid lg:grid-cols-[0.76fr_1.24fr]`}>

            {/* ── LEFT PANEL ── */}
            <div className="reveal self-center">
              <div className="mb-6 flex items-center justify-between border-y border-ink/10 py-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-bronze">
                  Thesis
                </span>
                <span className="font-display text-lg leading-none text-bronze/70 sm:text-xl">
                  0{activeIndex + 1}
                </span>
              </div>

              <div className="grid gap-px overflow-hidden bg-ink/10">
                {thesisItems.map((item, index) => {
                  const isActive = index === activeIndex
                  return (
                    <article
                      key={item.title}
                      className={`grid gap-2 px-4 py-4 text-left transition-colors duration-500 ease-out sm:px-5 lg:py-5 ${isActive ? 'bg-ivory' : 'bg-paper'
                        }`}
                    >
                      <span
                        className={`text-[9px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${isActive ? 'text-bronze' : 'text-stone/40'
                          }`}
                      >
                        {item.subtitle}
                      </span>
                      <span
                        className={`font-display text-[clamp(1.4rem,3vw,2.4rem)] leading-[0.95] transition-colors duration-500 ${isActive ? 'text-ink' : 'text-stone/25'
                          }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`max-w-md text-sm leading-[1.55] transition-colors duration-500 sm:text-base ${isActive ? 'text-stone' : 'text-stone/40'
                          }`}
                      >
                        {item.description}
                      </span>
                    </article>
                  )
                })}
              </div>
            </div>

            {/* ── RIGHT PANEL — Film strip ── */}
            <div className="reveal relative h-[calc(100vh-6rem)] overflow-hidden border border-ink/10 shadow-[0_34px_110px_rgba(17,16,14,0.12)]">

              {/* Strip container — height = n * 100% of parent */}
              {/* y goes 0% → -66.67% smoothly as you scroll */}
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
                    // Each panel = 1/n of strip = 100% of viewport container
                    style={{ height: `${100 / ITEM_COUNT}%` }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      // Slight scale for lush feel
                      style={{ transform: 'scale(1.04)', transformOrigin: 'center center' }}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Bottom blur only */}
              <GradualBlur
                target="parent"
                position="bottom"
                height="10rem"
                strength={3.2}
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

      {/* Bottom section padding */}
      <div className={sectionShell} style={{ paddingTop: 0 }} />
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