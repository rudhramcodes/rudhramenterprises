import { useEffect, memo } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 9999,
        display: show ? 'block' : 'none'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.8
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-2xl bg-white/80 backdrop-blur-xl border border-white/40">
        {children}
      </div>
    </motion.div>
  )
})
