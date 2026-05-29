import { useEffect, memo } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { LiquidGlassCard } from './ui/liquid-glass'

export const CursorFollow = memo(function CursorFollow({ 
  children, 
  show = false,
  offset = { x: 20, y: 20 }
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX + offset.x)
      mouseY.set(e.clientY + offset.y)
    }

    if (show) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [show, mouseX, mouseY, offset.x, offset.y])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8
      }}
      transition={{ duration: 0.2 }}
    >
      <LiquidGlassCard
        draggable={false}
        expandable={false}
        className="bg-white/5 shadow-xl"
        borderRadius={100}
        blurIntensity="md"
        shadowIntensity="md"
        glowIntensity="md"
      >
        <div className="flex h-9 min-w-[100px] items-center justify-center px-5 sm:h-10">
          <span className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.25em] text-white mix-blend-difference leading-none translate-y-[0.5px]">
            {children}
          </span>
        </div>
      </LiquidGlassCard>
    </motion.div>
  )
})
