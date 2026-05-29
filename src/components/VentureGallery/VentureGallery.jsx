import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { ventures } from '../../data/siteContent'
import { SectionKicker } from '../ui'
import styles from './style.module.css'

const anim = {
  initial: { width: 0, marginLeft: 0, marginRight: 0 },
  open: {
    width: 'auto',
    marginLeft: '1rem',
    // marginRight: '1rem',
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  },
  closed: {
    width: 0,
    marginLeft: 0,
    marginRight: 0,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
  },
}

const VentureRow = memo(function VentureRow({ venture, index }) {
  const [isActive, setIsActive] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className="group border-b border-ink/8 transition-colors"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
    >
      <div className={`${styles.project} min-h-[5rem] sm:min-h-[6rem] lg:min-h-[7rem]`}>
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <span className="hidden text-[10px] font-bold tracking-[0.25em] text-bronze/40 sm:block">
            {num}
          </span>
          <h3 className={`font-display text-[clamp(1.1rem,2.4vw,2.2rem)] leading-none tracking-tight transition-colors duration-300 ${isActive ? 'text-bronze' : 'text-ink'}`}>
            {venture.name}
          </h3>
        </div>

        <motion.div
          variants={anim}
          initial="initial"
          animate={isActive ? 'open' : 'closed'}
          className={styles.imgContainer}
        >
          <img src={venture.image} alt={venture.name} loading="lazy" />
        </motion.div>

        <div className="flex items-center gap-4 pl-4 sm:pl-6">
          <span className="hidden max-w-[10rem] text-xs leading-tight text-stone/60 sm:block">
            {venture.tag}
          </span>
          <span
            className={`whitespace-nowrap rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] sm:px-4 sm:py-1.5 sm:text-[10px] ${venture.status === 'available'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50/60 text-bronze/60'
              }`}
          >
            {venture.status === 'available' ? 'Active' : 'Upcoming'}
          </span>
        </div>
      </div>
    </div>
  )
})

export const VentureGallery = memo(function VentureGallery() {
  return (
    <section
      id="ventures"
      className="bg-paper pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-12 lg:pt-24"
    >
      <div className="mx-auto max-w-[calc(1200px+var(--page-gutter)*2)] px-[var(--page-gutter)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionKicker>Our Ecosystem</SectionKicker>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.96] tracking-tight text-ink">
            Ventures
          </h2>
          <p className="mt-4 max-w-xl text-base leading-[1.6] text-stone sm:text-lg">
            Eight distinct ventures, each built around a belief, a craft, or a cultural need.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          {ventures.map((venture, index) => (
            <VentureRow key={venture.name} venture={venture} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default VentureGallery
