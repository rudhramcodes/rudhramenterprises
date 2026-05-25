import { memo } from 'react'
import { SectionKicker } from './ui'

const maxWidth = 'mx-auto max-w-[calc(1500px+var(--page-gutter)*2)] px-[var(--page-gutter)]'
const displayTitle = 'text-[clamp(3.1rem,13vw,6rem)] leading-[0.92] tracking-tighter text-ink lg:text-8xl [&>span]:block'
const sectionLead = 'max-w-3xl text-lg leading-[1.7] text-stone sm:text-xl'
const sectionShell = 'py-24 sm:py-28 lg:py-36'
const thesisPoints = [
  'Culture gives us roots.',
  'Innovation gives us direction.',
  'Excellence gives us trust.',
]

export const BrandThesis = memo(function BrandThesis() {
  return (
    <section id="about" className={`${sectionShell} relative overflow-hidden`}>
      <div className={`${maxWidth} grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end`}>
        <div>
          <SectionKicker>About Rudhram</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>
            We lead today,
            <span>and we lead what comes next.</span>
          </h2>
        </div>
        <div className="reveal">
          <p className={sectionLead}>
            Rudhram exists to bridge tradition and transformation. Rooted in culture, driven by
            creativity, and sharpened by modern innovation, we build ventures that create meaning,
            momentum, and measurable impact.
          </p>
          <div className="mt-10 grid gap-4 text-lg text-ink sm:grid-cols-3">
            {thesisPoints.map((item) => (
              <span key={item} className="border-l border-bronze/50 pl-4 leading-tight">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="reveal pointer-events-none mx-auto mt-16 grid max-w-[calc(64rem+var(--page-gutter)*2)] grid-cols-3 gap-2 px-[var(--page-gutter)] opacity-60 sm:mt-24 sm:gap-3"
        aria-hidden="true"
      >
        {/* <span className="h-40 border border-bronze/30 bg-bronze/5" />
        <span className="h-40 translate-y-8 border border-bronze/40 bg-paper" />
        <span className="h-40 border border-bronze/30 bg-bronze/5" /> */}
        <img src="https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-28 w-full rounded-lg object-cover sm:h-46 lg:w-60" />
        <img src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGlubm92YXRpb258ZW58MHx8MHx8fDA%3D" alt="" className="h-28 w-full translate-y-5 rounded-lg object-cover sm:h-46 sm:translate-y-8 lg:w-60" />
        <img src="https://images.unsplash.com/photo-1611075384322-731537ad7971?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXhjZWxsZW5jZXxlbnwwfHwwfHx8MA%3D%3D" alt="" className="h-28 w-full rounded-lg object-cover sm:h-46 lg:w-60" />
      </div>
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
