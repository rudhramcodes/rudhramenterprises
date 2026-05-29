import { memo } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_EASE = [0.22, 1, 0.36, 1]

const FadeIn = memo(function FadeIn({
  children,
  delay = 0,
  className = '',
  duration = 0.75,
  blur = true,
  y = 24,
  ease = DEFAULT_EASE,
  viewportOnce = true,
  viewportAmount = 0.25,
  ...rest
}) {
  const initial = { opacity: 0, y }
  const visible = { opacity: 1, y: 0 }

  if (blur) {
    initial.filter = 'blur(10px)'
    visible.filter = 'blur(0px)'
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      transition={{ duration, delay, ease }}
      viewport={{ once: viewportOnce, amount: viewportAmount }}
      {...rest}
    >
      {children}
    </motion.div>
  )
})

export default FadeIn
