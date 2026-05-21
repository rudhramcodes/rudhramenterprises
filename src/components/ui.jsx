import { memo } from 'react'
import { ArrowIcon } from './Icons'

export const SectionKicker = memo(function SectionKicker({ children, className = '' }) {
  return (
    <p className={`reveal mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze ${className}`}>
      {children}
    </p>
  )
})

const variants = {
  primary:
    'border-bronze bg-bronze text-paper hover:border-bronze-dark hover:bg-bronze-dark focus-visible:outline-bronze',
  secondary:
    'border-bronze/35 bg-paper/45 text-ink hover:border-bronze hover:bg-bronze-soft focus-visible:outline-bronze',
  ghost:
    'border-ink/15 bg-transparent text-ink hover:border-bronze hover:bg-bronze-soft focus-visible:outline-bronze',
  dark:
    'border-paper/20 bg-paper text-ink hover:border-bronze hover:bg-bronze-soft focus-visible:outline-paper',
  'ghost-dark':
    'border-paper/20 bg-transparent text-paper hover:border-bronze hover:bg-bronze/20 focus-visible:outline-paper',
}

export const MagneticButton = memo(function MagneticButton({ href = '#contact', children, variant = 'primary', className = '' }) {
  return (
    <a
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 text-sm font-semibold transition duration-300 ease-out will-change-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <ArrowIcon className="transition duration-300 group-hover:translate-x-1" />
    </a>
  )
})

export const LogoMark = memo(function LogoMark({ className = '' }) {
  return <img className={`block object-contain ${className}`} src="/images/fav-icon.png" alt="" loading="eager" />
})
