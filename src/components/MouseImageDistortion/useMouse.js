import { useEffect, useRef } from 'react'

export default function useMouse() {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return mouseRef
}
