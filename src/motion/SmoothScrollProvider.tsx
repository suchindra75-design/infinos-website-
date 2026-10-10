'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useExperienceStore } from '@/state/experienceStore'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useExperienceStore((s) => s.reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.11 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
