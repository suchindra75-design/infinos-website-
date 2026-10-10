import { CONTACT } from '@/content/site'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function ContactSection() {
  return (
    <section className="section section--contact" id="contact">
      <div className="section-inner">
        <Eyebrow>10 — CONTACT</Eyebrow>
        <h2 className="section-title section-title--big">TALK TO INFINOS</h2>
        <a className="contact-email" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
          {CONTACT.emailPlaceholder && <span className="contact-placeholder-note"> — PLACEHOLDER</span>}
        </a>
        <p className="contact-note">
          {CONTACT.locationPlaceholder ? 'LOCATION — [PLACEHOLDER]' : ''}
        </p>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} INFINOS TECH</span>
        <span>INTELLIGENT TEMPERATURE-CONTROLLED TRANSPORT</span>
      </footer>
    </section>
  )
}
