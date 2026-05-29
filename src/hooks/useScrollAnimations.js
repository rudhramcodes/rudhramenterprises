import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const createRevealAnimations = (scope) => {
  gsap.utils.toArray('.reveal', scope || document).forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 84%' },
      },
    )
  })
}

export const createLineDrawAnimations = (scope) => {
  gsap.utils.toArray('.line-draw', scope || document).forEach((element) => {
    gsap.fromTo(
      element,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: element, start: 'top 88%' },
      },
    )
  })
}

export const createChapterAnimations = (scope) => {
  gsap.utils.toArray('.chapter', scope || document).forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0.58, scale: 0.985 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 72%', end: 'bottom 34%', scrub: 0.5 },
      },
    )
  })
}

export const useScrollAnimations = () => {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
      return undefined
    }

    const ctx = gsap.context(() => {
      createRevealAnimations()
      createLineDrawAnimations()
      createChapterAnimations()
    })

    return () => ctx.revert()
  }, [])
}
