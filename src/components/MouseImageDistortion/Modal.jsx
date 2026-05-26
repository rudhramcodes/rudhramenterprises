import { useEffect } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Modal({ person, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 px-[var(--page-gutter)] py-12 backdrop-blur-sm sm:py-16 lg:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden bg-paper sm:flex-row"
        initial={{ opacity: 0, scale: 0.92, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.92, y: 30, filter: 'blur(8px)' }}
        transition={{ duration: 0.45, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-ink shadow-lg transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-bronze sm:right-4 sm:top-4"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative min-h-[420px] w-full shrink-0 overflow-hidden sm:w-[55%] sm:min-h-[560px]">
          <img
            src={person.src}
            alt={person.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-paper/10" />
        </div>

        <div className="flex flex-col justify-center px-6 py-8 sm:w-[45%] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-bronze sm:text-[11px]">
            {person.tag}
          </span>

          <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] tracking-tight text-ink">
            {person.name}
          </h3>

          <p className="mt-2 text-sm font-medium text-stone/70 sm:text-base">
            {person.role}
          </p>

          <div className="mt-6 h-px w-12 bg-bronze/40" />

          <p className="mt-6 text-sm leading-[1.7] text-stone sm:text-base">
            {person.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
