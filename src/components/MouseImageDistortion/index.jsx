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
    <section className="bg-paper py-24 sm:py-28 lg:py-36">
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

      <div className="mt-16 bg-ink sm:mt-20 lg:mt-28">
        <div className={`${mx} py-20 sm:py-28 lg:py-36`}>
          <FadeIn className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/80 sm:text-[11px]">
              What We Are, In Full
            </p>
          </FadeIn>

          <div className="mt-10 space-y-6 sm:space-y-7 lg:space-y-8">
            {manifestoLines.map((line, i) => (
              <FadeIn key={line} delay={0.1 + i * 0.08}>
                <p className="max-w-4xl font-display text-[clamp(1.5rem,3.5vw,3.2rem)] leading-[1.12] tracking-tight text-paper">
                  {line}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="mt-14 sm:mt-20 lg:mt-24">
            <blockquote className="max-w-4xl border-l-[3px] border-bronze pl-5 sm:pl-7">
              <p className="font-display text-[clamp(1.6rem,3.8vw,3.5rem)] leading-[1.08] tracking-tight text-bronze">
                {'\u201C'}We are not here to build businesses for the present. We are here to build
                something that lasts {'\u2014'} something that, long after we are gone, will still be doing
                something that matters.{'\u201D'}
              </p>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.65} className="mt-12 sm:mt-16">
            <p className="font-display text-[clamp(1.4rem,3vw,2.8rem)] leading-[1.1] tracking-tight text-paper/50">
              That is who we are.
            </p>
          </FadeIn>
        </div>
      </div>
      <AnimatePresence>
        {selectedPerson && (
          <Modal person={selectedPerson} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
