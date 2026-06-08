import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { CaretLeft } from '@phosphor-icons/react'
import { maxWidth } from '../lib/layout'
import FadeIn from './ui/FadeIn'
const ease = [0.22, 1, 0.36, 1]

const shortVersion = [
  'We are not a company built by investors, resumes, or a perfect plan. We are a group built by belief - the belief that if you move with purpose, execute with discipline, and refuse to stop, something meaningful will emerge.',
  'Rudhram is the result of two people who chose each other, chose to continue, and chose to build something real - even when nothing was certain.',
  'We are builders. Of ideas, systems, ventures, and impact. We are Rudhram.',
]

const seoContext = [
  'Founded in Mumbai in 2021 by Shivang Vir and Mukund Barrdoliwala, Rudhram Enterprises emerged from a shared vision to build a venture-building institution that transforms cultural depth into modern innovation.',
  'As a startup incubator and venture studio, Rudhram identifies real-world challenges and builds structured ventures to address them — from ceremonial experiences through Panigrahna to creative expression through Aghhori, and technology infrastructure through Storage Media Solution.',
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

const StoryDetail = ({ onClose }) => {
  const detailRef = useRef(null)

  const handleBack = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    onClose()
  }, [onClose])

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

  return createPortal(
    <motion.div
      ref={detailRef}
      className="fixed inset-0 z-[1000] h-[100dvh] overflow-x-hidden overflow-y-auto overscroll-contain bg-paper text-ink"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] } }}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <motion.button
        type="button"
        className="detail-back-button fixed left-5 top-5 z-[1001] inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/55 bg-white/28 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.56),0_18px_48px_rgba(17,16,14,0.22)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/50 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:left-8 sm:top-8"
        aria-label="Back to story preview"
        onClick={handleBack}
        onPointerUp={handleBack}
        style={{ cursor: 'pointer', pointerEvents: 'auto', willChange: 'transform' }}
        initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <CaretLeft size={20} />
      </motion.button>

      <article>
        <section className="relative h-[40vh] sm:min-h-screen overflow-hidden bg-ink">
          <motion.div
            layoutId="story-image-shell"
            className="absolute inset-0 overflow-hidden"
            transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
          >
            <motion.img
              layoutId="story-image"
              src="/images/founders.webp"
              alt="Shivang Vir and Mukund Barrdoliwala"
              className="h-full w-full object-cover object-[40%] sm:object-center"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.02)_0%,rgba(17,16,14,0.28)_48%,rgba(17,16,14,0.86)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(255,253,248,0.2),transparent_34rem)]" />

          <div className={`${maxWidth} relative z-10 flex min-h-screen flex-col justify-end pb-14 pt-32 sm:pb-20`}>
            <motion.p
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white"
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Our Story / Mumbai 2021
            </motion.p>
            <motion.h2
              className="max-w-4xl font-display text-[clamp(2.6rem,6vw,7rem)] leading-[0.9] text-paper"
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              The beginning was not certainty.
              <span className="text-bronze">It was conviction.</span>
            </motion.h2>
            <motion.p
              className="mt-6 max-w-2xl font-display text-lg leading-snug text-paper/84 sm:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              In 2021, Shivang Vir and Mukund Barrdoliwala moved to Mumbai. Not with a clear
              destination. Not with a proven model. With belief.
            </motion.p>
          </div>
        </section>

        <section className={`${maxWidth} py-16 sm:py-24 lg:py-32`}>
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
          <div className={`${maxWidth} max-w-4xl`}>
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

        <section className={`${maxWidth} py-16 sm:py-24 lg:py-32`}>
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
          <div className={`${maxWidth}`}>
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
    </motion.div>,
    document.body
  )
}

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

export const Story = memo(function Story() {
  const imageRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorLabelRef = useRef(null)

  const [isHovering, setIsHovering] = useState(false)
  const [detailOpen, setDetailOpen] = useState(() => window.location.hash === '#story-detail')

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['6%', '-8%'])

  useEffect(() => {
    const cursorEl = cursorRef.current
    const labelEl = cursorLabelRef.current
    if (!cursorEl || !labelEl) return

    const xMoveCursor = gsap.quickTo(cursorEl, 'left', {
      duration: 0.5,
      ease: 'power3',
    })
    const yMoveCursor = gsap.quickTo(cursorEl, 'top', {
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
      xMoveCursor(clientX)
      yMoveCursor(clientY)
      xMoveLabel(clientX)
      yMoveLabel(clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const openStory = useCallback(() => {
    setIsHovering(false)
    setDetailOpen(true)
    if (window.location.hash !== '#story-detail') {
      window.history.pushState({ storyDetail: true }, '', '#story-detail')
    }
  }, [])

  const closeStory = useCallback(() => {
    setDetailOpen(false)
    if (window.location.hash === '#story-detail') {
      window.history.replaceState(null, '', '#story')
    }
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setDetailOpen(window.location.hash === '#story-detail')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const handleMouseEnter = (e) => {
    if (e.nativeEvent.pointerType === 'touch') return
    setIsHovering(true)
  }

  return (
    <section id="story" className="scroll-mt-32 bg-paper pt-16 sm:pt-20 lg:pt-20">
      <div className={`${maxWidth}`}>
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
          className="group relative block h-[30vh] min-h-[14rem] w-full cursor-pointer overflow-hidden rounded-2xl md:rounded-4xl bg-ink text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze sm:h-[78vh] sm:min-h-[34rem]"
          onClick={openStory}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovering(false)}
          transition={{ duration: 0.5, ease }}
          aria-label="Open the full Rudhram story"
        >
          <motion.div
            layoutId="story-image-shell"
            className="absolute inset-0 overflow-hidden"
            transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
          >
            <motion.div className="h-[120%] w-full" style={{ y: imgY, scale: imgScale, willChange: 'transform' }}>
              <motion.img
                layoutId="story-image"
                src="/images/founders.webp"
                alt="Shivang Vir and Mukund Barrdoliwala"
                className="h-full w-full object-cover object-[40%]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0)_0%,rgba(17,16,14,0.16)_42%,rgba(17,16,14,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,253,248,0.25),transparent_28rem)] opacity-70" />

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-5 sm:p-10 lg:p-14"
            style={{ y: textY }}
          >
            <p className="hidden md:block max-w-4xl font-display text-[clamp(1.2rem,3.3vw,4rem)] leading-[1.15] text-paper/92 sm:leading-[1.02]">
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

      <div className={`${maxWidth} mt-6 sm:mt-10 lg:mt-10`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="max-w-xl space-y-5">
            {shortVersion.map((text, i) => (
              <FadeIn key={text} delay={0.1 + i * 0.08}>
                <p className="text-base leading-[1.75] text-stone sm:text-lg">{text}</p>
              </FadeIn>
            ))}
            <div className="mt-6 border-t border-ink/8 pt-6">
              {seoContext.map((text, i) => (
                <FadeIn key={text} delay={0.3 + i * 0.08}>
                  <p className="text-sm leading-[1.7] text-stone/70 sm:text-base">{text}</p>
                </FadeIn>
              ))}
            </div>
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

      <motion.div
        ref={cursorRef}
        variants={scaleAnimation}
        initial="initial"
        animate={isHovering && !detailOpen ? 'enter' : 'closed'}
        className="pointer-events-none fixed left-0 top-0 z-[901] hidden h-20 w-20 items-center justify-center rounded-full lg:flex"
        style={{
          backgroundColor: '#5a3d1e',
          willChange: 'transform',
        }}
      />

      <motion.div
        ref={cursorLabelRef}
        variants={scaleAnimation}
        initial="initial"
        animate={isHovering && !detailOpen ? 'enter' : 'closed'}
        className="pointer-events-none fixed left-0 top-0 z-[902] hidden h-20 w-20 items-center justify-center rounded-full text-[14px] font-light text-white lg:flex"
        style={{
          backgroundColor: 'transparent',
          willChange: 'transform',
        }}
      >
        View
      </motion.div>

      <AnimatePresence>{detailOpen && <StoryDetail onClose={closeStory} />}</AnimatePresence>
    </section>
  )
})
