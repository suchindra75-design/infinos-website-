'use client'

import { useCallback } from 'react'
import { ProductScene } from './ProductScene'
import { NarrativeCaptions } from '@/components/sections/NarrativeCaptions'
import { ThermalHud } from '@/components/sections/ThermalHud'
import { TelemetryHud } from '@/components/sections/TelemetryHud'
import { useExperienceStore } from '@/state/experienceStore'

export function ProductStage() {
  const setPointer = useExperienceStore((s) => s.setPointer)

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      setPointer(x, y)
    },
    [setPointer],
  )

  return (
    <div className="stage" id="narrative" onPointerMove={onPointerMove}>
      <ProductScene />
      <NarrativeCaptions />
      <ThermalHud />
      <TelemetryHud />
    </div>
  )
}
