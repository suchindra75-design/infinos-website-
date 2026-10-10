'use client'

import { Html } from '@react-three/drei'
import { PRODUCT } from '@/content/products'
import { useExperienceStore } from '@/state/experienceStore'

export function LayerLabel({
  id,
  label,
  side,
  offsetX = 0.95,
}: {
  id: string
  label: string
  side: 'left' | 'right'
  offsetX?: number
}) {
  const phase = useExperienceStore((s) => s.phase)
  const explodedAmount = useExperienceStore((s) => s.explodedAmount)
  const isMobile = useExperienceStore((s) => s.isMobile)
  const visible = phase === 'exploded' && explodedAmount > 0.72

  const keyLabels = isMobile ? ['outerShell', 'payload', 'thermal'] : null
  if (keyLabels && !keyLabels.includes(id)) return null

  return (
    <Html
      position={[side === 'left' ? -offsetX : offsetX, 0, 0]}
      center
      wrapperClass="layer-label-html"
      zIndexRange={[10, 0]}
    >
      <div className={`layer-label layer-label--${side}`} style={{ opacity: visible ? 1 : 0 }}>
        <span className="layer-label-rule" />
        <span className="layer-label-text">{label}</span>
      </div>
    </Html>
  )
}

export function DisplayReadout() {
  const phase = useExperienceStore((s) => s.phase)
  const reading = PRODUCT.thermal.display.reading.value
  const anchor = PRODUCT.model.display.anchor
  const active = phase !== 'intro'

  return (
    <Html position={anchor} transform wrapperClass="display-html" zIndexRange={[10, 0]}>
      <div className="display-chip" style={{ opacity: active ? 1 : 0 }}>
        <span className="display-chip-value">{reading}</span>
        <span className="display-chip-unit">°C</span>
      </div>
    </Html>
  )
}
