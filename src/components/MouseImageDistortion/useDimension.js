import { useEffect, useRef } from 'react'

export default function useDimension() {
  const dimensionRef = useRef({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const onResize = () => {
      dimensionRef.current.width = window.innerWidth
      dimensionRef.current.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return dimensionRef
}
