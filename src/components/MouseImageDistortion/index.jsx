import { useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WebGLPlane from './WebGLPlane'
import PeopleList from './PeopleList'
import Modal from './Modal'
import { SectionKicker } from '../ui'
import VariableProximity from '../VariableProximity/VariableProximity'
import { maxWidth } from '../../lib/layout'
import FadeIn from '../ui/FadeIn'
import { useIsDesktop } from '../../hooks/useMediaQuery'

const manifestoLines = [
  'We are builders who began without certainty and learned to create it.',
  'We are a partnership that proved trust is more durable than any plan.',
  'We are a system designed not to do business once, but to build meaningful businesses, again and again, for as long as there are real problems that need real solutions.',
  'We believe that work must go beyond profit. That every rupee earned should trace back to genuine value created for someone whose life is better because of it.',
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

  const manifestoRef = useRef(null)
  const isDesktop = useIsDesktop()

  return (
    <section id="visionaries" className="bg-paper pt-16 sm:pt-20 lg:pt-20">
      <div className={maxWidth}>
        <FadeIn className="max-w-5xl">
          <SectionKicker>The Visionaries</SectionKicker>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,5.4rem)] leading-[0.96] tracking-tight text-ink">
            The Visionaries Behind{' '} <br />
            <span className="text-bronze">Rudhram Group</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.7] text-stone sm:text-lg">
            No meaningful thing is built by one person, or even two. Rudhram is not an exception
            to this.
          </p>
        </FadeIn>
      </div>

      <div className={`${maxWidth} mt-12 sm:mt-16`}>
        <FadeIn>
          <PeopleList
            setActiveMenu={handleSetActive}
            onPersonClick={handlePersonClick}
          />
        </FadeIn>
      </div>

      <WebGLPlane activeMenu={activeMenu} />

      <div ref={manifestoRef} className={`${maxWidth} mt-12 sm:mt-18 lg:mt-28`} style={{ position: 'relative' }}>
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
      </div>
      <AnimatePresence>
        {selectedPerson && (
          <Modal person={selectedPerson} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
