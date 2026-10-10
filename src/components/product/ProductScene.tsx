'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useExperienceStore } from '@/state/experienceStore'
import { supportsWebGL } from '@/hooks/environment'
import { ProductFallback } from './ProductFallback'

const ProductCanvas = dynamic(() => import('./ProductCanvasInner').then((m) => m.ProductCanvasInner), {
  ssr: false,
})

const ModelLoadIndicator = dynamic(() => import('./ModelLoadIndicator'), { ssr: false })

export function ProductScene() {
  const progress = useExperienceStore((s) => s.progress)
  const [webgl] = useState(() => supportsWebGL())

  const opacity = Math.min(1, Math.max(0, (progress - 0.03) / 0.09))
  const shouldMount = progress > 0.004

  return (
    <div
      className="stage-canvas"
      style={{ opacity, visibility: opacity <= 0.01 ? 'hidden' : 'visible' }}
    >
      {webgl && shouldMount && <ProductCanvas />}
      {!webgl && <ProductFallback />}
      {webgl && shouldMount && <ModelLoadIndicator />}
    </div>
  )
}
