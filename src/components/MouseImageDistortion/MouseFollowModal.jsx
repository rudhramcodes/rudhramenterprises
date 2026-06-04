import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { visionaries } from './data'

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}

export default function MouseFollowModal({ modal }) {
  const { active, index } = modal
  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)

  useEffect(() => {
    const elements = {
      container: modalContainer.current,
      cursorEl: cursor.current,
      labelEl: cursorLabel.current,
    }

    const xMoveContainer = gsap.quickTo(elements.container, 'left', {
      duration: 0.8,
      ease: 'power3',
    })
    const yMoveContainer = gsap.quickTo(elements.container, 'top', {
      duration: 0.8,
      ease: 'power3',
    })
    const xMoveCursor = gsap.quickTo(elements.cursorEl, 'left', {
      duration: 0.5,
      ease: 'power3',
    })
    const yMoveCursor = gsap.quickTo(elements.cursorEl, 'top', {
      duration: 0.5,
      ease: 'power3',
    })
    const xMoveCursorLabel = gsap.quickTo(elements.labelEl, 'left', {
      duration: 0.45,
      ease: 'power3',
    })
    const yMoveCursorLabel = gsap.quickTo(elements.labelEl, 'top', {
      duration: 0.45,
      ease: 'power3',
    })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      xMoveContainer(clientX)
      yMoveContainer(clientY)
      xMoveCursor(clientX)
      yMoveCursor(clientY)
      xMoveCursorLabel(clientX)
      yMoveCursorLabel(clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="pointer-events-none fixed left-0 top-0 z-[900] overflow-hidden bg-white"
        style={{
          height: '350px',
          width: '400px',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: index * -100 + '%' }}
        >
          {visionaries.map((person) => (
            <div
              key={`modal-img-${person.id}`}
              className="flex h-full w-full items-center justify-center bg-ivory p-6"
            >
              <img
                src={person.src}
                alt={person.name}
                className="h-full w-full object-cover"
                style={{ maxWidth: '300px' }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="pointer-events-none fixed left-0 top-0 z-[901] flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          backgroundColor: '#5a3d1e',
          willChange: 'transform',
        }}
      />

      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="pointer-events-none fixed left-0 top-0 z-[902] flex h-20 w-20 items-center justify-center rounded-full text-[14px] font-light text-white"
        style={{
          backgroundColor: 'transparent',
          willChange: 'transform',
        }}
      >
        View
      </motion.div>
    </>
  )
}
