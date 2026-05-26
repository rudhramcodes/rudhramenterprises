import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { CaretLeft } from '@phosphor-icons/react'

const mx = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const ease = [0.22, 1, 0.36, 1]

const shortVersion = [
  'We are not a company built by investors, resumes, or a perfect plan. We are a group built by belief - the belief that if you move with purpose, execute with discipline, and refuse to stop, something meaningful will emerge.',
  'Rudhram is the result of two people who chose each other, chose to continue, and chose to build something real - even when nothing was certain.',
  'We are builders. Of ideas, systems, ventures, and impact. We are Rudhram.',
]

const preambleText = [
  'Before there was a name, a logo, a registered company, or a single rupee of revenue - there were two people sitting with a question they could not yet answer.',
  'What are we building? Why are we doing this? What does this even become?',
  'The answer did not come quickly. It never does, for the things that matter. What came instead was something more valuable than answers - the decision to keep moving forward without them.',
  'That decision is the real beginning of Rudhram.',
]

const bondText = [
  'In 2021, Shivang Vir and Mukund Barrdoliwala moved to Mumbai. Not with a clear destination. Not with a proven model. With belief - in the journey, in the work, and above everything, in each other.',
  'Their friendship was not something they built for the business. It was something that existed long before it. In their families, they were never seen as two separate people. They were one - a single unit of trust that ran deeper than any professional agreement could.',
  'This is the invisible foundation beneath every venture Rudhram builds. Everything stands on this.',
]

const phaseText = [
  'There was a phase - and every founder who tells the truth will acknowledge it - where nothing was working the way it should. Results were not visible. The path was not clear. The future felt uncertain in a way that was not exciting. It was heavy.',
  'Most people do not talk about this phase. They skip past it in the story because it is uncomfortable. But for Rudhram, this phase is not something to be skipped. It is the source of everything.',
  'That shift - from ambition to purpose - changed the nature of what Rudhram was trying to become. The confusion did not become a roadblock. It became a direction.',
]

const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.75, delay, ease }}
    viewport={{ once: true, amount: 0.25 }}
  >
    {children}
  </motion.div>
)

const StoryCursor = ({ visible, x, y }) => (
  <motion.div
    className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/55 bg-white/34 text-center text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_18px_48px_rgba(17,16,14,0.18)] backdrop-blur-2xl lg:grid"
    style={{ x, y }}
    initial={false}
    animate={{
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.7,
      filter: visible ? 'blur(0px)' : 'blur(8px)'
    }}
    transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.6 }}
  >
    <span className="relative text-[9px] font-bold uppercase leading-tight tracking-[0.15em]">
      View<br />Story
    </span>
  </motion.div>
)

const StoryDetail = ({ onClose }) => {
  const detailRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    requestAnimationFrame(() => detailRef.current?.scrollTo({ top: 0, left: 0 }))
  }, [])

  return (
    <motion.div
      ref={detailRef}
      className="fixed inset-0 z-[80] h-[100dvh] overflow-x-hidden overflow-y-auto overscroll-contain bg-paper text-ink"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.36, ease } }}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <motion.button
        type="button"
        className="fixed left-5 top-5 z-[90] inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/55 bg-white/28 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.56),0_18px_48px_rgba(17,16,14,0.22)] backdrop-blur-2xl transition-all hover:bg-white/50 duration-300 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:left-8 sm:top-8"
        aria-label="Back to story preview"
        onClick={onClose}
        initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, delay: 0.32, ease }}
      >
        <CaretLeft size={20} />
      </motion.button>

      <article>
        <section className="relative min-h-screen overflow-hidden bg-ink">
          <motion.div
            layoutId="story-image-shell"
            className="absolute inset-0 overflow-hidden"
            transition={{ layout: { duration: 1.45, ease } }}
          >
            <motion.img
              layoutId="story-image"
              src="/images/founders.jpeg"
              alt="Shivang Vir and Mukund Barrdoliwala"
              className="h-full w-full object-cover"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.65, ease }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.02)_0%,rgba(17,16,14,0.28)_48%,rgba(17,16,14,0.86)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(255,253,248,0.2),transparent_34rem)]" />

          <div className={`${mx} relative z-10 flex min-h-screen flex-col justify-end pb-14 pt-32 sm:pb-20`}>
            <motion.p
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.48, ease }}
            >
              Our Story / Mumbai 2021
            </motion.p>
            <motion.h2
              className="max-w-4xl font-display text-[clamp(2.6rem,6vw,7rem)] leading-[0.9] text-paper"
              initial={{ opacity: 0, y: 34, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.92, delay: 0.6, ease }}
            >
              The beginning was not certainty.
              <span className="text-bronze">It was conviction.</span>
            </motion.h2>
            <motion.p
              className="mt-6 max-w-2xl font-display text-lg leading-snug text-paper/84 sm:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.78, delay: 0.82, ease }}
            >
              In 2021, Shivang Vir and Mukund Barrdoliwala moved to Mumbai. Not with a clear
              destination. Not with a proven model. With belief.
            </motion.p>
          </div>
        </section>

        <section className={`${mx} py-16 sm:py-24 lg:py-32`}>
          <div className="grid gap-10 lg:grid-cols-[0.48fr_1.1fr] lg:gap-16">
            <FadeIn className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/80">
                Declaration
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,4vw,4rem)] leading-[0.92] text-ink">
                We Are
                <span className="block text-bronze">Rudhram.</span>
              </h3>
            </FadeIn>
            <div className="space-y-6 border-l border-ink/10 pl-6 sm:pl-10">
              {shortVersion.map((text, i) => (
                <FadeIn key={text} delay={i * 0.08}>
                  <p className="max-w-3xl text-base leading-[1.72] text-stone sm:text-lg">
                    {text}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ivory py-16 sm:py-24 lg:py-32">
          <div className={`${mx} max-w-4xl`}>
            <div className="space-y-6 sm:space-y-7">
              {preambleText.map((text, i) => (
                <FadeIn key={text} delay={0.1 + i * 0.08}>
                  <p
                    className={`leading-[1.7] sm:text-xl ${i === 1
                        ? 'font-display text-2xl font-semibold text-ink sm:text-3xl'
                        : i === 3
                          ? 'font-display text-xl font-semibold text-bronze sm:text-2xl'
                          : 'text-lg text-stone sm:text-xl'
                      }`}
                  >
                    {text}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className={`${mx} py-16 sm:py-24 lg:py-32`}>
          <div className="mb-2 flex items-center gap-4">
            <span className="font-display text-[2rem] leading-none text-ink/8 sm:text-[3rem]">
              01
            </span>
            <span className="h-px flex-1 bg-ink/8" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr] lg:gap-16">
            <div className="max-w-xl space-y-5">
              <FadeIn>
                <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.8rem)] leading-[1.06] tracking-tight text-ink">
                  The Bond That Became A Foundation
                </h3>
              </FadeIn>
              {bondText.map((text, i) => (
                <FadeIn key={text} delay={0.1 + i * 0.08}>
                  <p className="text-base leading-[1.72] text-stone sm:text-lg">
                    {text}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2} className="self-center">
              <blockquote className="relative border-l-[3px] border-bronze pl-5 sm:pl-7">
                <span className="absolute -left-1 -top-5 font-display text-[5rem] leading-none text-bronze/15 select-none sm:-left-2 sm:-top-6 sm:text-[6rem]">
                  &ldquo;
                </span>
                <p className="relative font-display text-lg leading-snug text-ink sm:text-xl lg:text-2xl">
                  Their partnership was never built on contracts. It was built on the kind of
                  loyalty that does not need to be spoken - only demonstrated, every single day.
                </p>
              </blockquote>
            </FadeIn>
          </div>
        </section>

        <section className="bg-ink py-16 text-paper sm:py-24 lg:py-32">
          <div className={`${mx}`}>
            <div className="mb-2 flex items-center gap-4">
              <span className="font-display text-[2rem] leading-none text-paper/12 sm:text-[3rem]">
                02
              </span>
              <span className="h-px flex-1 bg-paper/10" />
            </div>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div className="max-w-xl space-y-5">
                <FadeIn>
                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.8rem)] leading-[1.06] tracking-tight text-paper">
                    The Phase That Shaped Everything
                  </h3>
                </FadeIn>
                {phaseText.map((text, i) => (
                  <FadeIn key={text} delay={0.1 + i * 0.08}>
                    <p className="text-base leading-[1.72] text-paper/60 sm:text-lg">
                      {text}
                    </p>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.2} className="self-center">
                <p className="font-display text-[clamp(1.8rem,4vw,4rem)] leading-[1.06] tracking-tight text-bronze">
                  &ldquo;This is not about doing business. This is about building something that
                  matters.&rdquo;
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </article>
    </motion.div>
  )
}

export const Story = memo(function Story() {
  const imageRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const [detailOpen, setDetailOpen] = useState(() => window.location.hash === '#story-detail')
  const [cursorVisible, setCursorVisible] = useState(false)
  const [imageHovered, setImageHovered] = useState(false)
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const smoothX = useSpring(cursorX, { stiffness: 135, damping: 18, mass: 0.5 })
  const smoothY = useSpring(cursorY, { stiffness: 135, damping: 18, mass: 0.5 })

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.025])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-14%'])

  const openStory = useCallback(() => {
    setCursorVisible(false)
    setImageHovered(false)
    setDetailOpen(true)
    if (window.location.hash !== '#story-detail') {
      window.history.pushState({ storyDetail: true }, '', '#story-detail')
    }
  }, [])

  const closeStory = useCallback(() => {
    setDetailOpen(false)
    if (window.location.hash === '#story-detail') {
      window.history.pushState(null, '', '#story')
    }
    requestAnimationFrame(() => {
      const { x, y } = mousePosRef.current
      const el = document.elementFromPoint(x, y)
      if (imageRef.current?.contains(el)) {
        setCursorVisible(true)
        setImageHovered(true)
      }
    })
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setDetailOpen(window.location.hash === '#story-detail')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const handlePointerMove = (event) => {
    cursorX.set(event.clientX)
    cursorY.set(event.clientY)
    mousePosRef.current = { x: event.clientX, y: event.clientY }
  }

  const showCursor = () => {
    setImageHovered(true)
    setCursorVisible(true)
  }

  const hideCursor = () => {
    setImageHovered(false)
    setCursorVisible(false)
  }

  return (
    <section id="story" className="scroll-mt-32 bg-paper pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-40">
      <div className={`${mx}`}>
        <FadeIn className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze/75">
              Our Story
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,5vw,5.4rem)] leading-[0.98] text-ink sm:leading-[0.96]">
              One image.
              <span className="block text-bronze">The beginning of everything.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-stone lg:block">
            A founder story of belief, discipline, and the bond that became a foundation.
          </p>
        </FadeIn>

        <motion.button
          ref={imageRef}
          type="button"
          className="group relative block h-[50vh] min-h-[20rem] w-full cursor-pointer overflow-hidden rounded-[10px] bg-ink text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze sm:h-[78vh] sm:min-h-[34rem]"
          onClick={openStory}
          onPointerEnter={showCursor}
          onPointerLeave={hideCursor}
          onPointerMove={handlePointerMove}
          transition={{ duration: 0.5, ease }}
          aria-label="Open the full Rudhram story"
        >
          <motion.div
            layoutId="story-image-shell"
            className="absolute inset-0 overflow-hidden"
            transition={{ layout: { duration: 1.45, ease } }}
          >
            <motion.div className="h-[120%] w-full" style={{ y: imgY, scale: imgScale }}>
              <motion.img
                layoutId="story-image"
                src="/images/founders.jpeg"
                alt="Shivang Vir and Mukund Barrdoliwala"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0)_0%,rgba(17,16,14,0.16)_42%,rgba(17,16,14,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,253,248,0.25),transparent_28rem)] opacity-70" />
          {/* <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-paper/25 bg-ink/16 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-paper/80 backdrop-blur-md sm:left-7 sm:top-7 sm:px-4 sm:py-2 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
            Mumbai / 2021
          </div> */}

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 lg:p-14"
            style={{ y: textY }}
          >
            <p className="max-w-4xl font-display text-[clamp(1.2rem,3.3vw,4rem)] leading-[1.15] text-paper/92 sm:leading-[1.02]">
              In 2021, Shivang Vir and Mukund Barrdoliwala moved to Mumbai. Not with a clear
              destination. Not with a proven model. With belief.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-paper/72">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                Click to enter the story
              </span>
            </div>
          </motion.div>
        </motion.button>
      </div>

      <div className={`${mx} mt-14 sm:mt-20 lg:mt-24`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="max-w-xl space-y-5">
            {shortVersion.map((text, i) => (
              <FadeIn key={text} delay={0.1 + i * 0.08}>
                <p className="text-base leading-[1.75] text-stone sm:text-lg">{text}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.25} className="self-center">
            <blockquote className="relative border-l-[3px] border-bronze pl-5 sm:pl-7">
              <span className="absolute -left-1 -top-5 font-display text-[5rem] leading-none text-bronze/15 select-none sm:-left-2 sm:-top-6 sm:text-[7rem]">
                &ldquo;
              </span>
              <p className="relative font-display text-xl leading-snug text-ink sm:text-2xl lg:text-3xl">
                Their partnership was never built on contracts. It was built on the kind of
                loyalty that does not need to be spoken - only demonstrated, every single day.
              </p>
            </blockquote>
          </FadeIn>
        </div>
      </div>

      <StoryCursor
        visible={cursorVisible && !detailOpen}
        x={smoothX}
        y={smoothY}
      />

      <AnimatePresence>
        {detailOpen && <StoryDetail onClose={closeStory} />}
      </AnimatePresence>
    </section>
  )
})
