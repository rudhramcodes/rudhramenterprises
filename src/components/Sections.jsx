import { memo } from 'react'
import { SectionKicker, LogoMark } from './ui'
import { AwwwardsButton } from './ui/AwwwardsButton'
import { maxWidth, displayTitle, sectionLead, sectionShell } from '../lib/layout'
import FadeIn from './ui/FadeIn'
const contactFields = ['Name', 'Email']
const contactOptions = ['Partnership', 'Venture inquiry', 'Collaboration', 'Social impact']

const visionContent = [
  'Rudhram Enterprises envisions becoming a pioneering force that continuously transforms ideas into impactful ventures. It aims to create a future where innovation is not driven by trends, but by real-world needs and purposeful thinking.',
  'Built from a journey of uncertainty and transformation, Rudhram\u2019s vision is rooted in the belief that true growth comes from clarity, discipline, and long-term thinking.',
  'The company strives to empower communities by creating opportunities, building systems, and delivering solutions that improve lives. Rudhram seeks to redefine excellence by balancing creativity with structure, ambition with responsibility, and growth with sustainability \u2014 ultimately building a legacy that creates meaningful impact across industries and generations.',
]

const missionContent = [
  'Rudhram Enterprises exists to transform ideas into structured, impactful ventures. Its mission is to observe real-world challenges, design meaningful solutions, and build systems that can scale with clarity and discipline.',
  'Driven by the belief that business must go beyond profit, Rudhram focuses on creating ventures that contribute to society, empower individuals, and deliver lasting value.',
  'Every initiative is approached with a commitment to innovation, excellence, and responsibility. The mission is not only to build successful brands, but to establish a system that consistently creates, nurtures, and scales ventures with purpose \u2014 ensuring that growth is sustainable, impact is real, and every step aligns with a larger vision of building something that truly matters.',
]

const VisionBlock = memo(function VisionBlock({ content }) {
  return (
    <div className="relative overflow-hidden">
      <span
        className="pointer-events-none absolute -top-8 left-0 select-none font-display text-[clamp(12rem,30vw,28rem)] leading-none text-bronze/[0.06]"
        aria-hidden="true"
      >
        V
      </span>
      <div className="relative">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze sm:text-[11px]">
          Vision
        </span>
        <div className="mt-3 h-px w-10 bg-bronze/40 sm:mt-4" />

        <p className="mt-8 font-display text-[clamp(1.3rem,2.8vw,2.6rem)] leading-[1.12] tracking-tight text-ink sm:mt-10 max-w-3xl">
          {content[0]}
        </p>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8">
          <p className="text-base leading-[1.7] text-stone sm:text-lg">
            {content[1]}
          </p>
          <p className="text-base leading-[1.7] text-stone sm:text-lg">
            {content[2]}
          </p>
        </div>
      </div>
    </div>
  )
})

const MissionBlock = memo(function MissionBlock({ content }) {
  return (
    <div className="relative overflow-hidden">
      <span
        className="pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[clamp(12rem,30vw,28rem)] leading-none text-bronze/[0.06]"
        aria-hidden="true"
      >
        M
      </span>
      <div className="relative">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze sm:text-[11px]">
          Mission
        </span>
        <div className="mt-3 h-px w-10 bg-bronze/40 sm:mt-4" />

        <p className="mt-8 font-display text-[clamp(1.3rem,2.8vw,2.6rem)] leading-[1.12] tracking-tight text-ink sm:mt-10 max-w-3xl">
          {content[0]}
        </p>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8">
          <p className="text-base leading-[1.7] text-stone sm:text-lg">
            {content[1]}
          </p>
          <p className="text-base leading-[1.7] text-stone sm:text-lg">
            {content[2]}
          </p>
        </div>
      </div>
    </div>
  )
})

export const VisionMission = memo(function VisionMission() {
  return (
    <section className="bg-paper pt-16 sm:pt-20 lg:pt-30" id="purpose">
      <div className="mx-auto max-w-[calc(1300px+var(--page-gutter)*2)] px-[var(--page-gutter)]">
        <FadeIn duration={0.6} blur={false}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze/60 sm:text-[11px]">
            Our Purpose
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.96] tracking-tight text-ink">
            What drives everything
            <br />
            <span className="text-bronze">we build</span>
          </h2>
        </FadeIn>

        <div className="mt-4 sm:mt-6 lg:mt-6">
          <FadeIn duration={0.6} blur={false} delay={0.1}>
            <div className="border-t border-ink/8 pt-4 sm:pt-6 lg:pt-6">
              <VisionBlock content={visionContent} />
            </div>
          </FadeIn>

          <div className="my-12 sm:my-16 lg:my-20">
          </div>

          <FadeIn duration={0.6} blur={false} delay={0.15}>
            <div className="border-t border-ink/8 pt-10 sm:pt-14 lg:pt-16">
              <MissionBlock content={missionContent} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
})

export const Impact = memo(function Impact() {
  return (
    <section id="impact" className={`${sectionShell} bg-paper`}>
      <div className={`${maxWidth} grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:items-center`}>
        <div className="reveal font-display text-[clamp(7rem,34vw,16rem)] leading-none text-bronze lg:text-[clamp(9rem,24vw,24rem)]">
          3%
        </div>
        <div>
          <SectionKicker>Social Commitment</SectionKicker>
          <h2 className={`${displayTitle} reveal`}>Growth should create more than success.</h2>
          <p className={`${sectionLead} reveal mt-8`}>
            At Rudhram, impact is not a separate initiative. It is part of how we build. Guided by
            our social vision, we are committed to dedicating 3% of our value toward social
            development and upliftment.
          </p>
          <blockquote className="reveal mt-10 border-l border-bronze pl-6 font-display text-3xl leading-tight text-ink sm:text-5xl">
            We grow not just to succeed, but to give back, uplift, and create lasting impact.
          </blockquote>
        </div>
      </div>
    </section>
  )
})

// export const Contact = memo(function Contact() {
//   return (
//     <section id="contact" className="bg-ink py-16 text-paper sm:py-20 lg:py-36">
//       <div
//         className={`${maxWidth} chapter relative overflow-hidden border border-paper/10 p-6 sm:p-10 lg:p-14`}
//       >
//         <LogoMark className="pointer-events-none absolute -right-28 -top-16 h-[28rem] opacity-[0.055] sm:-right-8 sm:-top-8 sm:h-[34rem]" />
//         <div className="grid gap-12 lg:grid-cols-[0.9fr_0.75fr]">
//           <div className="reveal relative z-10">
//             <h2 className="font-display text-[clamp(3rem,14vw,6rem)] leading-[0.88] text-paper lg:text-[clamp(3.8rem,9vw,9rem)]">
//               Let's shape what comes next.
//             </h2>
//             <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-paper/70 sm:text-xl">
//               For partnerships, ventures, collaborations, and strategic enquiries, connect with Rudhram.
//             </p>
//             <div className="mt-9 flex flex-col gap-3 sm:flex-row">
//               <AwwwardsButton href="mailto:hello@rudhram.com" variant="ivory">
//                 Start a Conversation
//               </AwwwardsButton>
//               <AwwwardsButton href="#ventures" variant="bronze-dark">
//                 Explore Ventures
//               </AwwwardsButton>
//             </div>
//           </div>
//           <form className="reveal relative z-10 grid gap-4">
//             {contactFields.map((label) => (
//               <label
//                 className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55"
//                 key={label}
//               >
//                 {label}
//                 <input
//                   className="min-h-12 border border-paper/15 bg-paper/5 px-4 text-base normal-case tracking-normal text-paper outline-none transition focus:border-bronze"
//                   type={label === 'Email' ? 'email' : 'text'}
//                 />
//               </label>
//             ))}
//             <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55">
//               Interest
//               <select
//                 className="min-h-12 border border-paper/15 bg-ink px-4 text-base normal-case tracking-normal text-paper outline-none transition focus:border-bronze"
//                 defaultValue=""
//               >
//                 <option value="" disabled>Select one</option>
//                 {contactOptions.map((option) => (
//                   <option key={option}>{option}</option>
//                 ))}
//               </select>
//             </label>
//             <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/55">
//               Message
//               <textarea className="min-h-32 border border-paper/15 bg-paper/5 p-4 text-base normal-case tracking-normal text-paper outline-none transition focus:border-bronze" />
//             </label>
//             <button
//               className="min-h-12 border border-bronze bg-bronze px-5 text-sm font-bold text-paper transition hover:bg-bronze-dark"
//               type="button"
//             >
//               Send Enquiry
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   )
// })
