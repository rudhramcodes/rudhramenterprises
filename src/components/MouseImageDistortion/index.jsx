import { useState, useCallback, useRef, memo, useLayoutEffect } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import MouseFollowModal from './MouseFollowModal'
import PeopleList from './PeopleList'
import Modal from './Modal'
import { SectionKicker } from '../ui'
import VariableProximity from '../VariableProximity/VariableProximity'
import { maxWidth } from '../../lib/layout'
import FadeIn from '../ui/FadeIn'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import { visionaries } from './data'

const AWWWARDS_EASE = [0.16, 1, 0.3, 1]
const CARD_SNAP = { type: 'tween', ease: AWWWARDS_EASE, duration: 0.5 }
const SWIPE_THRESHOLD = 20

const manifestoLines = [
  'We are builders who began without certainty and learned to create it.',
  'We are a partnership that proved trust is more durable than any plan.',
  'We are a system designed not to do business once, but to build meaningful businesses, again and again, for as long as there are real problems that need real solutions.',
  'We believe that work must go beyond profit. That every rupee earned should trace back to genuine value created for someone whose life is better because of it.',
]

/* ── Mobile Visionaries Card ── */
const VisionaryCard = memo(function VisionaryCard({ person, index, stepWidth, x, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [person.description])

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
      className="relative flex w-[72vw] max-w-[22rem] flex-shrink-0 flex-col pt-6"
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-paper shadow-[0_8px_30px_rgba(17,16,14,0.08)]">
        <div className="relative w-full overflow-hidden aspect-[3/4] flex-shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ backgroundImage: `url(${person.src})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 font-display text-[clamp(1.8rem,6vw,3rem)] font-bold leading-none tracking-tight text-white/20 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="border-b border-ink/8" />

        <div className="flex flex-col px-5 pb-5 pt-4 sm:px-7">
          <span className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-bronze">
            {person.tag}
          </span>
          <h3 className="font-display text-[clamp(1.2rem,4vw,1.65rem)] font-bold leading-[1.08] tracking-tight text-ink">
            {person.name}
          </h3>
          <p className="mt-0.5 text-[clamp(0.75rem,1.8vw,0.88rem)] leading-[1.5] text-stone/70">
            {person.role}
          </p>

          <button
            type="button"
            onClick={() => onToggle(index)}
            className="mt-3 flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[0.18em] text-bronze/80 transition-colors duration-300 hover:text-bronze"
          >
            <span>{isOpen ? 'Close' : 'Read'}</span>
            <motion.svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.35, ease: AWWWARDS_EASE }}
            >
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>

          <motion.div
            animate={{ height: isOpen ? contentHeight : 0 }}
            transition={{ duration: 0.4, ease: AWWWARDS_EASE }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="pt-3">
              <div className="border-t border-ink/8 pt-3">
                <p className="text-[clamp(0.8rem,2vw,0.92rem)] leading-[1.6] text-stone">
                  {person.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

/* ── Mobile Carousel ── */
const MobileVisionariesCarousel = memo(function MobileVisionariesCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [openAccordion, setOpenAccordion] = useState(null)
  const pointerStart = useRef({ x: 0, y: 0 })
  const swipedRef = useRef(false)
  const x = useMotionValue(0)
  const peekRatio = 0.72
  const gap = 12
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 375
  const stepWidth = Math.round(viewportWidth * peekRatio + gap)
  const maxX = -(visionaries.length - 1) * stepWidth

  useLayoutEffect(() => {
    x.set(-activeSlide * stepWidth)
  }, [])

  const toggleAccordion = useCallback((index) => {
    setOpenAccordion((prev) => (prev === index ? null : index))
  }, [])

  const snapTo = useCallback((index) => {
    const next = Math.max(0, Math.min(visionaries.length - 1, index))
    animate(x, -next * stepWidth, CARD_SNAP)
    setActiveSlide(next)
  }, [x, stepWidth])

  const goToSlide = useCallback((index) => {
    const next = Math.max(0, Math.min(visionaries.length - 1, index))
    if (next === activeSlide) return
    swipedRef.current = true
    snapTo(next)
  }, [activeSlide, snapTo])

  const handlePointerDown = useCallback(() => {
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
    const vel = info.velocity.x
    const boostedX = currentX + vel * 0.15
    const snapped = Math.round(-boostedX / stepWidth)
    const next = Math.max(0, Math.min(visionaries.length - 1, snapped))
    animate(x, -next * stepWidth, CARD_SNAP)
    setActiveSlide(next)
  }, [x, stepWidth])

  return (
    <div className="relative w-full select-none overflow-hidden">
      <motion.div
        className="flex gap-3 pl-[14vw] will-change-transform"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: maxX, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        onPointerDown={(e) => { pointerStart.current = { x: e.clientX, y: e.clientY }; handlePointerDown() }}
        onPointerUp={handlePointerUp}
      >
        {visionaries.map((person, i) => (
          <VisionaryCard
            key={person.id}
            person={person}
            index={i}
            stepWidth={stepWidth}
            x={x}
            isOpen={openAccordion === i}
            onToggle={toggleAccordion}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />

      <div className="flex items-center justify-center gap-2 py-4">
        {visionaries.map((_, i) => (
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

export default function VisionariesSection() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [modal, setModal] = useState({ active: false, index: 0 })
  const [selectedPerson, setSelectedPerson] = useState(null)

  const handleSetActive = useCallback((i) => {
    if (!selectedPerson) setActiveMenu(i)
  }, [selectedPerson])

  const handlePersonClick = useCallback((person) => {
    setActiveMenu(null)
    setSelectedPerson(person)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedPerson(null)
  }, [])

  const manifestoRef = useRef(null)
  const isDesktop = useIsDesktop()

  return (
    <section id="visionaries" className="bg-paper pt-16 sm:pt-20 lg:pt-20">
      <div className={maxWidth}>
        <FadeIn className="max-w-5xl">
          <SectionKicker>The Visionaries</SectionKicker>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,5.4rem)] leading-[0.96] tracking-tight text-ink">
            The Visionaries Behind{' '} <br />
            <span className="text-bronze">Rudhram Enterprises</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.7] text-stone sm:text-lg">
            No meaningful thing is built by one person, or even two. Rudhram is not an exception
            to this.
          </p>
        </FadeIn>
      </div>

      {isDesktop ? (
        <div className={`${maxWidth} mt-12 sm:mt-16`}>
          <FadeIn>
            <PeopleList
              setActiveMenu={handleSetActive}
              setModal={setModal}
              onPersonClick={handlePersonClick}
            />
          </FadeIn>
        </div>
      ) : (
        <div className="mt-10 sm:mt-12">
          <MobileVisionariesCarousel />
        </div>
      )}

      {isDesktop && <MouseFollowModal modal={modal} />}

      {/* <div ref={manifestoRef} className={`${maxWidth} mt-12 sm:mt-18 lg:mt-28`} style={{ position: 'relative' }}>
        <FadeIn>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/80 sm:text-[11px]">
            What We Are, In Full
          </p>
        </FadeIn>

        <div className="mt-8 border-t border-ink/10 pt-10 sm:mt-14 sm:pt-14">
          <FadeIn>
            <p className="text-[clamp(1.3rem,3vw,2.7rem)] font-display leading-[1.12] tracking-tight text-ink">
              {manifestoLines[0]}
            </p>
          </FadeIn>
        </div>

        <div className="mt-6 grid gap-6 sm:mt-14 sm:grid-cols-[2.5rem_1fr] sm:gap-10 lg:gap-8">
          <FadeIn className="hidden sm:block">
            <span className="block font-display text-[4rem] leading-none text-bronze/15 select-none sm:text-[4rem]">
              01
            </span>
          </FadeIn>
          <FadeIn>
            <p className="text-[clamp(1.3rem,3vw,2.4rem)] leading-[1.12] tracking-tight text-ink/85">
              {manifestoLines[1]}
            </p>
          </FadeIn>
        </div>

        <div className="mt-10 border-t border-ink/8 pt-10 sm:mt-14 sm:pt-14">
          <FadeIn>
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.7rem)] leading-[1.15] tracking-tight text-ink">
              We are a system designed{' '}
              {isDesktop ? (
                <VariableProximity
                  label="not to do business once"
                  className="text-bronze"
                  containerRef={manifestoRef}
                  radius={150}
                  falloff="linear"
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 900"
                />
              ) : (
                <span className="text-bronze">not to do business once</span>
              )}
              , but to build meaningful businesses,{' '}
              <em className="">again and again</em>
              , for as long as there are real problems that need real solutions.
            </p>
          </FadeIn>
        </div>

        <FadeIn className="mt-10 sm:mt-14">
          <div className="border-l-[2px] border-bronze/50 pl-5 sm:pl-8 italic">
            <p className="text-[clamp(1rem,2vw,2.6rem)] leading-[1.25] tracking-tight text-stone">
              {manifestoLines[3]}
            </p>
          </div>
        </FadeIn>

        <div className="my-10 sm:my-18 lg:my-18">
          <div className="mx-auto h-px w-20 bg-bronze/25 sm:w-24" />
        </div>

        <FadeIn>
          <div className="relative">
            <span
              className="absolute -top-6 left-0 font-display text-[8rem] leading-none text-bronze/8 select-none sm:-top-8 sm:text-[12rem] lg:text-[16rem]"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="font-display text-[clamp(1.6rem,3.8vw,2.7rem)] leading-[1.08] tracking-tight text-bronze">
                We are not here to build businesses for the present. We are here to build
                something that lasts {'\u2014'} something that, long after we are gone, will still be doing
                something that matters.
              </p>
            </blockquote>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-12 sm:mt-16">
          {isDesktop ? (
            <VariableProximity
              label="That is who we are."
              className="block text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] tracking-tight text-ink/25"
              containerRef={manifestoRef}
              radius={150}
              falloff="linear"
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 900"
              style={{ display: 'block' }}
            />
          ) : (
            <p className="text-[clamp(1.5rem,2vw,2rem)] leading-[1.1] tracking-tight text-ink/25">
              That is who we are.
            </p>
          )}
        </FadeIn>
      </div> */}
      <AnimatePresence>
        {selectedPerson && (
          <Modal person={selectedPerson} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
