import { memo } from 'react'
import { SectionKicker } from './ui'
import { leadership } from '../data/siteContent'
import { TiltCard } from './TiltCard'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle = 'font-display text-[clamp(3rem,7vw,7.75rem)] leading-[0.92] tracking-normal text-ink [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'
const sectionShell = 'py-24 sm:py-28 lg:py-36'

export const Leadership = memo(function Leadership() {
  return (
    <section id="leadership" className={`${sectionShell} bg-paper`}>
      <div className={maxWidth}>
        <div className="max-w-5xl">
          <SectionKicker>Leadership</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>The people shaping what comes next.</h2>
          <p className={`${sectionLead} reveal mt-8`}>
            Rudhram is guided by creative vision, strategic strength, experienced governance, and
            a deep commitment to social impact.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {leadership.map((person) => (
            <TiltCard key={`${person.name}-${person.role}`}>
              <article
                className="group grid min-h-72 gap-8 border border-ink/10 bg-paper p-6 transition duration-500 hover:border-bronze hover:bg-ink hover:text-paper sm:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[clamp(2.65rem,12vw,3.75rem)] leading-none sm:text-6xl">{person.name}</h3>
                    <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-bronze">
                      {person.role}
                    </p>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center border border-bronze font-display text-xl text-bronze transition-colors group-hover:border-paper group-hover:text-paper sm:h-16 sm:w-16 sm:text-2xl">
                    {person.initials}
                  </span>
                </div>
                <p className="self-end text-lg leading-[1.6] text-stone transition group-hover:text-paper/70">
                  {person.focus}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
})
