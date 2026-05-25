import { memo } from 'react'
import { SectionKicker } from './ui'
import { pillars } from '../data/siteContent'
import { TiltCard } from './TiltCard'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle = 'font-display text-[clamp(3rem,7vw,7.75rem)] leading-[0.92] tracking-normal text-ink [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'
const sectionShell = 'py-24 sm:py-28 lg:py-36'

export const Pillars = memo(function Pillars() {
  return (
    <section id="philosophy" className={`${sectionShell} bg-paper`}>
      <div className={`${maxWidth}`}>
        <div className="max-w-5xl">
          <SectionKicker>Philosophy</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>
            Our philosophy is built on three pillars.
          </h2>
          <p className={`${sectionLead} reveal mt-8`}>
            Every idea, venture, and decision at Rudhram is shaped by a simple standard: inspire
            with purpose, innovate with courage, and deliver with precision.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <TiltCard key={pillar.title} className="h-full">
              <article
                className="group flex h-full min-h-[27rem] flex-col border border-ink/10 bg-paper p-6 transition duration-500 hover:border-bronze hover:shadow-[0_30px_100px_rgba(179,120,57,0.16)] sm:p-8"
              >
                <span className="text-sm font-semibold text-bronze">0{index + 1}</span>
                <h3 className="mt-12 font-display text-5xl leading-none text-ink sm:mt-16 sm:text-7xl">
                  {pillar.title}
                </h3>
                <p className="mt-8 text-lg leading-[1.65] text-stone">{pillar.copy}</p>
                <div className="mt-auto pt-10">
                  <div className="border-t border-ink/10 pt-6 opacity-70 transition duration-300 group-hover:opacity-100">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-bronze">
                      Value Created
                    </span>
                    <strong className="mt-3 block text-lg font-semibold leading-snug text-ink">
                      {pillar.detail}
                    </strong>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
        <p className="reveal mt-16 max-w-4xl font-display text-[clamp(2.7rem,12vw,4.5rem)] leading-[1.02] text-bronze lg:text-7xl">
          We inspire ideas, innovate the future, and deliver with excellence.
        </p>
      </div>
    </section>
  )
})
