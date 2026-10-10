'use client'

import { useEffect, useRef } from 'react'
import { SmoothScrollProvider } from '@/motion/SmoothScrollProvider'
import { ScrollChapterController } from '@/motion/ScrollChapterController'
import { BrandIntro } from '@/components/hero/BrandIntro'
import { Nav } from '@/components/navigation/Nav'
import { ProductStage } from '@/components/product/ProductStage'
import { ApplicationsSection } from '@/components/sections/ApplicationsSection'
import { CompanySection } from '@/components/sections/CompanySection'
import { ContactSection } from '@/components/sections/ContactSection'
import { useExperienceStore } from '@/state/experienceStore'
import { isMobileViewport, prefersReducedMotion, supportsWebGL } from '@/hooks/environment'

export function Experience() {
  const narrativeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    useExperienceStore.setState({
      reducedMotion: prefersReducedMotion(),
      isMobile: isMobileViewport(),
      webglSupported: supportsWebGL(),
    })
  }, [])

  return (
    <SmoothScrollProvider>
      <BrandIntro />
      <Nav />
      <ProductStage />
      <div ref={narrativeRef} className="narrative-spacer" aria-hidden="true" />
      <ScrollChapterController targetRef={narrativeRef} />
      <main className="site-content">
        <ApplicationsSection />
        <CompanySection />
        <ContactSection />
      </main>
    </SmoothScrollProvider>
  )
}
