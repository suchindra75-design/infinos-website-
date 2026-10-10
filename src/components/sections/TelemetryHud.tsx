'use client'

import { PRODUCT } from '@/content/products'
import { useExperienceStore } from '@/state/experienceStore'

const CONNECTIVITY: Record<string, string> = {
  telemetry: 'CONNECTED (SIMULATED)',
}

export function TelemetryHud() {
  const phase = useExperienceStore((s) => s.phase)
  const visible = phase === 'telemetry'
  const reading = PRODUCT.thermal.display.reading.value

  return (
    <aside className={`hud hud--telemetry ${visible ? 'hud--visible' : ''}`} aria-hidden={!visible}>
      <p className="hud-bridge">PHYSICAL DISPLAY → DIGITAL TELEMETRY</p>
      <div className="hud-rows">
        <div className="hud-row">
          <span className="hud-label">TEMPERATURE</span>
          <span className="hud-value hud-value--temp">{reading}°C</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">STATUS</span>
          <span className="hud-value hud-value--stable">STABLE</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">CONNECTIVITY</span>
          <span className="hud-value">{CONNECTIVITY[phase] ?? '—'}</span>
        </div>
        <div className="hud-row">
          <span className="hud-label">LOCATION</span>
          <span className="hud-value">[PLACEHOLDER]</span>
        </div>
      </div>
      <div className="hud-stream">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="hud-stream-bar"
            style={{ height: `${18 + Math.abs(Math.sin(i * 0.7)) * 26}%` }}
          />
        ))}
      </div>
      <p className="hud-note">SIMULATED DATA — LIVE TELEMETRY SHOWN IN THE INFINOS PLATFORM</p>
    </aside>
  )
}
