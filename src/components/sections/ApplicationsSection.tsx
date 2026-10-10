'use client'

import { useState } from 'react'
import { PRODUCT } from '@/content/products'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function ApplicationsSection() {
  const [activeId, setActiveId] = useState(PRODUCT.applications[0]?.id ?? 'blood')
  const active = PRODUCT.applications.find((a) => a.id === activeId) ?? PRODUCT.applications[0]

  return (
    <section className="section section--apps" id="applications">
      <div className="section-inner">
        <Eyebrow>07 — APPLICATIONS</Eyebrow>
        <h2 className="section-title">
          ONE PLATFORM
          <br />
          <span className="section-title-dim">MULTIPLE THERMAL REQUIREMENTS</span>
        </h2>
        <p className="section-lede">
          The same core system adapts to different payloads and thermal requirements — through
          cooling, heating, and continuous monitoring. [PLACEHOLDER COPY — application claims to be
          confirmed. No regulatory or medical approvals implied.]
        </p>

        <div className="apps-switcher" role="tablist" aria-label="Applications">
          {PRODUCT.applications.map((app) => (
            <button
              key={app.id}
              role="tab"
              aria-selected={app.id === activeId}
              className={`app-tab ${app.id === activeId ? 'app-tab--active' : ''}`}
              onClick={() => setActiveId(app.id)}
            >
              {app.name}
            </button>
          ))}
        </div>

        <div className="app-spec" key={active?.id}>
          <div className="app-spec-row">
            <span className="hud-label">PAYLOAD</span>
            <span className="app-spec-value">{active?.payload.value}</span>
          </div>
          <div className="app-spec-row">
            <span className="hud-label">THERMAL REQUIREMENT</span>
            <span className="app-spec-value">{active?.thermalRequirement.value}</span>
          </div>
          <div className="app-spec-row">
            <span className="hud-label">MODE</span>
            <span className="app-spec-value">{active?.mode.value}</span>
          </div>
          <div className="app-spec-row">
            <span className="hud-label">THERMAL RANGE</span>
            <span className="app-spec-value">{PRODUCT.specifications.THERMAL_RANGE.value}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
