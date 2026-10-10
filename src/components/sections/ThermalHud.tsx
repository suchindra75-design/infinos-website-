'use client'

import { PRODUCT } from '@/content/products'
import { useExperienceStore } from '@/state/experienceStore'

export function ThermalHud() {
  const phase = useExperienceStore((s) => s.phase)
  const thermalMode = useExperienceStore((s) => s.thermalMode)
  const explodedAmount = useExperienceStore((s) => s.explodedAmount)

  const visible = phase === 'thermal' && explodedAmount < 0.35
  const data = thermalMode === 'cooling' ? PRODUCT.thermal.cooling : PRODUCT.thermal.heating

  return (
    <aside className={`hud hud--thermal ${visible ? 'hud--visible' : ''}`} aria-hidden={!visible}>
      <p className="hud-bridge">THERMAL CONTROL</p>
      <div className="hud-rows">
        <div className="hud-row">
          <span className="hud-label">MODE</span>
          <span className={`hud-value hud-value--mode hud-value--${thermalMode}`}>
            {thermalMode === 'cooling' ? 'COOLING' : 'HEATING'}
          </span>
        </div>
        <div className="hud-row">
          <span className="hud-label">TARGET</span>
          <span className="hud-value">{data.target.value}</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">CURRENT</span>
          <span className="hud-value">{data.current.value}</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">STATUS</span>
          <span className="hud-value hud-value--stable">{data.status.value}</span>
        </div>
      </div>
      <div className="hud-bar">
        <span className="hud-bar-fill" data-mode={thermalMode} />
      </div>
      <p className="hud-note">ILLUSTRATIVE INTERFACE — ACTUAL SPECIFICATIONS PENDING</p>
    </aside>
  )
}
