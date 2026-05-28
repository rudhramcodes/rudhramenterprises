import { cn } from '../../lib/utils'
import { motion } from 'motion/react'
import { useState } from 'react'

const blurClasses = {
  sm: 'backdrop-blur-[4px]',
  md: 'backdrop-blur-[8px]',
  lg: 'backdrop-blur-[12px]',
  xl: 'backdrop-blur-[16px]',
}

const shadowStyles = {
  none: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
  xs: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3), inset 1px 1px 2px 0 rgba(255, 255, 255, 0.3)',
  sm: 'inset 0 0 0 1px rgba(255, 255, 255, 0.35), inset 2px 2px 4px 0 rgba(255, 255, 255, 0.4)',
  md: 'inset 0 0 0 1.5px rgba(255, 255, 255, 0.4), inset 3px 3px 6px 0 rgba(255, 255, 255, 0.45)',
  lg: 'inset 0 0 0 2px rgba(255, 255, 255, 0.45), inset 4px 4px 10px 0 rgba(255, 255, 255, 0.5)',
  xl: 'inset 0 0 0 2.5px rgba(255, 255, 255, 0.5), inset 6px 6px 14px 0 rgba(255, 255, 255, 0.55)',
}

const glowStyles = {
  none: '0 4px 12px rgba(255, 255, 255, 0.05)',
  xs: '0 8px 24px rgba(255, 255, 255, 0.1)',
  sm: '0 12px 32px rgba(255, 255, 255, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  md: '0 16px 48px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 30px rgba(255, 255, 255, 0.1)',
  lg: '0 24px 64px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.15)',
  xl: '0 32px 80px rgba(255, 255, 255, 0.25), 0 0 0 1.5px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.2)',
}

export function LiquidGlassCard({
  children,
  className = '',
  draggable = true,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'lg',
  borderRadius = '32px',
  glowIntensity = 'md',
  shadowIntensity = 'lg',
  ...props
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpansion = (e) => {
    if (!expandable) return
    if (e.target.closest('a, button, input, select, textarea')) return
    setIsExpanded(!isExpanded)
  }

  const containerVariants = expandable
    ? {
        collapsed: {
          width: width || 'auto',
          height: height || 'auto',
          transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
        },
        expanded: {
          width: expandedWidth || 'auto',
          height: expandedHeight || 'auto',
          transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
        },
      }
    : {}

  const MotionComponent = draggable || expandable ? motion.div : 'div'

  const motionProps =
    draggable || expandable
      ? {
          variants: expandable ? containerVariants : undefined,
          animate: expandable ? (isExpanded ? 'expanded' : 'collapsed') : undefined,
          onClick: expandable ? handleToggleExpansion : undefined,
          drag: draggable,
          dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
          dragElastic: draggable ? 0.3 : undefined,
          dragTransition: draggable
            ? { bounceStiffness: 300, bounceDamping: 10, power: 0.3 }
            : undefined,
          whileDrag: draggable ? { scale: 1.02 } : undefined,
          whileHover: { scale: 1.002 },
          whileTap: { scale: 0.99 },
        }
      : {}

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="liquid-refraction" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" seed="5" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <MotionComponent
        className={cn(
          `relative ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${expandable ? 'cursor-pointer' : ''}`,
          className
        )}
        style={{
          borderRadius,
          ...(width && !expandable && { width }),
          ...(height && !expandable && { height }),
        }}
        {...motionProps}
        {...props}
      >
        {/* Main Glass Body with Backdrop Blur */}
        <div
          className={`absolute inset-0 ${blurClasses[blurIntensity]} z-0`}
          style={{ 
            borderRadius,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        />
        
        {/* Refraction Layer (Separated to avoid black background bug) */}
        <div
          className="absolute inset-0 z-5 opacity-40 pointer-events-none"
          style={{ 
            borderRadius,
            background: 'rgba(255,255,255,0.05)',
            filter: 'url(#liquid-refraction)',
            transform: 'scale(1.02)',
          }}
        />
        
        {/* Surface Reflections & Glow */}
        <div
          className="absolute inset-0 z-10"
          style={{ 
            borderRadius, 
            boxShadow: glowStyles[glowIntensity],
            background: 'linear-gradient(165deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.05) 100%)',
          }}
        />
        
        {/* Beveled Edges */}
        <div
          className="absolute inset-0 z-20"
          style={{ 
            borderRadius, 
            boxShadow: shadowStyles[shadowIntensity],
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
        
        {/* Content Layer */}
        <div className="relative z-30">
          {children}
        </div>
      </MotionComponent>
    </>
  )
}
