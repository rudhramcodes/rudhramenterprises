import { memo } from 'react'

export const ArrowIcon = memo(function ArrowIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={`h-4 w-4 fill-none stroke-current stroke-[1.7] ${className}`}>
      <path d="M3 9h11" />
      <path d="m10 4 5 5-5 5" />
    </svg>
  )
})

export const MenuIcon = memo(function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  )
})

export const CloseIcon = memo(function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
})