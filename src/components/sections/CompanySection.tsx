import { Eyebrow, Meta } from '@/components/ui/Eyebrow'

export function CompanySection() {
  return (
    <section className="section section--company" id="company">
      <div className="section-inner">
        <Eyebrow>09 — COMPANY</Eyebrow>
        <h2 className="section-title">THERMAL MANAGEMENT + TELEMETRY</h2>
        <p className="section-lede">
          INFINOS Tech develops intelligent temperature-controlled transport systems — smart thermal
          bags and containers that hold a controlled environment while sensors and telemetry monitor
          internal conditions. [PLACEHOLDER COPY — company story to be confirmed.]
        </p>
        <div className="company-meta">
          <Meta>FOUNDED — [PLACEHOLDER]</Meta>
          <Meta>HEADQUARTERS — [PLACEHOLDER]</Meta>
          <Meta>FOCUS — THERMAL MANAGEMENT, SENSING, TELEMETRY</Meta>
        </div>
      </div>
    </section>
  )
}
