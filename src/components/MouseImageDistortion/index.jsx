import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WebGLPlane from './WebGLPlane'
import PeopleList from './PeopleList'
import Modal from './Modal'
import { SectionKicker } from '../ui'

const mx = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const ease = [0.22, 1, 0.36, 1]

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

const manifestoLines = [
  'We are builders who began without certainty and learned to create it.',
  'We are a partnership that proved trust is more durable than any plan.',
  'We are a system designed not to do business once, but to build meaningful businesses, again and again, for as long as there are real problems that need real solutions.',
  'We believe that work must go beyond profit \u2014 that every rupee earned should trace back to genuine value created for someone whose life is better because of it.',
]

export default function VisionariesSection() {
  const [activeMenu, setActiveMenu] = useState(null)
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

  return (
    <section id="visionaries" className="bg-paper py-16 sm:py-20 lg:py-36">
      <div className={mx}>
        <FadeIn className="max-w-5xl">
          <SectionKicker>The Visionaries</SectionKicker>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,5.4rem)] leading-[0.96] tracking-tight text-ink">
            The Visionaries Behind{' '}
            <span className="text-bronze">Rudhram Group</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.7] text-stone sm:text-lg">
            No meaningful thing is built by one person, or even two. Rudhram is not an exception
            to this.
          </p>
        </FadeIn>
      </div>

      <div className={`${mx} mt-12 sm:mt-16`}>
        <FadeIn>
          <PeopleList
            setActiveMenu={handleSetActive}
            onPersonClick={handlePersonClick}
          />
        </FadeIn>
      </div>

      <WebGLPlane activeMenu={activeMenu} />

      <div className={`${mx} mt-20 sm:mt-24 lg:mt-28`}>
        <FadeIn>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/80 sm:text-[11px]">
            What We Are, In Full
          </p>
        </FadeIn>

        <div className="mt-10 border-t border-ink/10 pt-10 sm:mt-14 sm:pt-14">
            <FadeIn>
              <p className="font-display text-[clamp(1.5rem,3.5vw,3.2rem)] leading-[1.12] tracking-tight text-ink">
                {manifestoLines[0]}
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-[2.5rem_1fr] sm:gap-10 lg:gap-14">
            <FadeIn className="hidden sm:block">
              <span className="block font-display text-[4rem] leading-none text-bronze/15 select-none sm:text-[5rem]">
                01
              </span>
            </FadeIn>
            <FadeIn>
              <p className="font-display text-[clamp(1.5rem,3.2vw,3rem)] leading-[1.12] tracking-tight text-ink/85">
                {manifestoLines[1]}
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 border-t border-ink/8 pt-10 sm:mt-14 sm:pt-14">
            <FadeIn>
              <p className="font-display text-[clamp(1.5rem,3.5vw,3.2rem)] leading-[1.15] tracking-tight text-ink">
                We are a system designed{' '}
                <span className="text-bronze">not to do business once</span>
                , but to build meaningful businesses,{' '}
                <em className="font-display">again and again</em>
                , for as long as there are real problems that need real solutions.
              </p>
            </FadeIn>
          </div>

          <FadeIn className="mt-10 sm:mt-14">
            <div className="border-l-[2px] border-bronze/50 pl-5 sm:pl-8">
              <p className="font-display italic text-[clamp(1.3rem,2.8vw,2.5rem)] leading-[1.22] tracking-tight text-stone">
                {manifestoLines[3]}
              </p>
            </div>
          </FadeIn>

          <div className="my-14 sm:my-18 lg:my-22">
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
                <p className="font-display text-[clamp(1.6rem,3.8vw,3.5rem)] leading-[1.08] tracking-tight text-bronze">
                  We are not here to build businesses for the present. We are here to build
                  something that lasts {'\u2014'} something that, long after we are gone, will still be doing
                  something that matters.
                </p>
              </blockquote>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-12 sm:mt-16">
            <p className="font-display text-[clamp(1.2rem,2.5vw,2.4rem)] leading-[1.1] tracking-tight text-ink/25">
              That is who we are.
            </p>
          </FadeIn>
        </div>
      <AnimatePresence>
        {selectedPerson && (
          <Modal person={selectedPerson} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
