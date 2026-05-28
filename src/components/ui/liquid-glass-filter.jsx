import { cn } from '../../lib/utils'

export function LiquidGlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="liquid-refraction" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" seed="5" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}