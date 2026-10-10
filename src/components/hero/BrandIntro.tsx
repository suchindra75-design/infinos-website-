'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { BRAND } from '@/content/site'
import { useExperienceStore } from '@/state/experienceStore'
import { smoothstep } from '@/motion/chapters'

export function BrandIntro() {
  const root = useRef<HTMLDivElement>(null)
  const progress = useExperienceStore((s) => s.progress)

  useEffect(() => {
    if (!root.current) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.brand-intro-logo', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.0 }, 0.2)
      .fromTo('.brand-intro-name', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
      .fromTo('.brand-intro-tagline', { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.3)
      .fromTo('.brand-intro-hint', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.8)
    return () => {
      tl.kill()
    }
  }, [])

  const fade = 1 - smoothstep(0.01, 0.08, progress)
  const y = -progress * 240

  return (
    <div
      ref={root}
      className="brand-intro"
      style={{ opacity: fade, visibility: fade <= 0.01 ? 'hidden' : 'visible', transform: `translateY(${y}px)` }}
    >
      <div className="brand-intro-inner">
        <img className="brand-intro-logo" src="/logo.jpg" alt="INFINOS logo" width={72} height={72} />
        <h1 className="brand-intro-name">
          {BRAND.name}
          <span className="brand-intro-suffix"> {BRAND.suffix}</span>
        </h1>
        <p className="brand-intro-tagline">{BRAND.tagline}</p>
        <div className="brand-intro-hint">
          <span className="brand-intro-hint-rule" />
          {BRAND.scrollHint}
        </div>
      </div>
    </div>
  )
}
