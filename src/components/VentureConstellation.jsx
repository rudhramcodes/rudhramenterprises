import { memo, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { SectionKicker, LogoMark } from './ui'
import { ventures } from '../data/siteContent'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle = 'font-display text-[clamp(3rem,7vw,7.75rem)] leading-[0.92] tracking-normal text-ink [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'
const sectionShell = 'py-16 sm:py-20 lg:py-36'

export const VentureConstellation = memo(function VentureConstellation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = ventures[activeIndex]
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Orbital rotation driven by scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <section id="ventures" className={`${sectionShell} overflow-hidden bg-paper`}>
      <div className={maxWidth}>
        <div className="max-w-5xl">
          <SectionKicker>The Rudhram Ecosystem</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>
            Seven ventures.
            <span>One unified vision.</span>
          </h2>
          <p className={`${sectionLead} reveal mt-8`}>
            Rudhram is building a connected ecosystem across ceremony, culture, lifestyle, sound,
            movement, design, and celebration. Each venture has its own identity. Together, they
            move one purpose forward.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="chapter relative mt-12 grid min-h-0 gap-8 overflow-hidden border border-ink/10 bg-paper p-4 sm:mt-16 sm:p-8 lg:min-h-[800px] lg:grid-cols-[1.1fr_1fr] lg:p-12"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#11100e_1px,transparent_1px),linear-gradient(90deg,#11100e_1px,transparent_1px)] [background-size:64px_64px]" />
          
          {/* Signature Orbital Interaction */}
          <div className="relative hidden items-center justify-center lg:flex" aria-hidden="true">
            <motion.div style={{ rotate: rotation }} className="relative flex items-center justify-center">
              <LogoMark className="h-64 w-64 opacity-20 transition-opacity duration-700 hover:opacity-40" />
              
              {ventures.map((venture, i) => {
                const angle = (i * 360) / ventures.length
                const isActive = activeIndex === i
                
                return (
                  <motion.div
                    key={venture.name}
                    className="absolute h-px origin-left transition-colors duration-500"
                    style={{ 
                      rotate: `${angle}deg`,
                      width: '240px',
                      background: isActive 
                        ? 'linear-gradient(90deg, #b37839 0%, transparent 100%)' 
                        : 'linear-gradient(90deg, rgba(17, 16, 14, 0.1) 0%, transparent 100%)'
                    }}
                  >
                    <motion.div 
                      className={`absolute -right-2 -top-1 h-2 w-2 rounded-full border transition-all duration-500 ${
                        isActive ? 'scale-150 border-bronze bg-bronze' : 'border-ink/20 bg-paper'
                      }`}
                      animate={isActive ? { boxShadow: '0 0 15px rgba(179, 120, 57, 0.5)' } : {}}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Interactive Content Side */}
          <div className="relative z-10 flex flex-col justify-between gap-12">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ventures.map((venture, index) => (
                <button
                  key={venture.name}
                  className={`group relative overflow-hidden border px-4 py-4 text-left transition-all duration-500 ease-out sm:px-5 sm:py-5 ${
                    index === activeIndex
                      ? 'border-bronze bg-bronze text-paper shadow-[0_20px_60px_rgba(179,120,57,0.2)]'
                      : 'border-ink/5 bg-paper/60 text-ink hover:border-bronze/30 hover:bg-paper'
                  }`}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="relative z-10 block font-display text-[1.55rem] leading-tight sm:text-3xl">
                    {venture.name}
                  </span>
                  {index === activeIndex && (
                    <motion.span 
                      layoutId="active-bg"
                      className="absolute inset-0 z-0 bg-bronze"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={active.name}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col border border-ink/10 bg-ink p-5 text-paper shadow-[0_40px_100px_rgba(17,16,14,0.3)] sm:p-12"
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px w-8 bg-bronze" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                    {active.pillar}
                  </span>
                </div>
                
                <h3 className="font-display text-[clamp(3rem,14vw,4.5rem)] leading-none text-paper sm:text-7xl">
                  {active.name}
                </h3>
                
                <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 sm:mt-8 sm:text-xl">
                  {active.line}
                </p>
                
                <div className="mt-10 flex flex-col gap-5 border-t border-paper/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                  <small className="text-[10px] font-bold uppercase tracking-[0.24em] text-paper/40 sm:tracking-[0.3em]">
                    {active.motif}
                  </small>
                  <a
                    className="group flex items-center gap-2 text-sm font-semibold text-bronze transition-colors hover:text-paper"
                    href="#contact"
                  >
                    Enquire Now
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
})
