import { memo, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export const TiltCard = memo(function TiltCard({ 
  children, 
  className = '', 
  onClick, 
  isActive = false,
  isFlippable = false
}) {
  const cardRef = useRef(null)
  
  // Motion values for tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Transform values into rotation degrees (slightly more aggressive for that Eduard feel)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg'])

  // Internal parallax depth (translateZ)
  const innerZ = useTransform(mouseXSpring, (v) => Math.abs(v) * 20)

  // Glare effect transforms
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useTransform(mouseXSpring, (v) => Math.abs(v) * 0.3)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`rudhram-card-scene relative cursor-pointer ${className}`}
      style={{
        rotateX: isFlippable && isActive ? 0 : rotateX,
        rotateY: isFlippable && isActive ? 180 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glare Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.12),transparent_70%)]"
        style={{
          '--x': glareX,
          '--y': glareY,
          opacity: glareOpacity,
        }}
      />
      
      {/* Parallax Content Wrapper */}
      <motion.div style={{ translateZ: innerZ, transformStyle: 'preserve-3d', height: '100%', width: '100%' }}>
        {children}
      </motion.div>
    </motion.div>
  )
})
