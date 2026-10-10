export type NavAnchor = {
  label: string
  href: string
  narrative: boolean
}

export const NAV_LINKS: NavAnchor[] = [
  { label: 'Technology', href: '#narrative', narrative: true },
  { label: 'Products', href: '#narrative', narrative: true },
  { label: 'Applications', href: '#applications', narrative: false },
  { label: 'Company', href: '#company', narrative: false },
  { label: 'Contact', href: '#contact', narrative: false },
]

export const BRAND = {
  name: 'INFINOS',
  suffix: 'TECH',
  tagline: 'Intelligent temperature-controlled transport',
  scrollHint: 'SCROLL',
}

export type ChapterCaption = {
  kicker: string
  title: string
  meta?: string
}

export const CAPTIONS: Record<string, ChapterCaption> = {
  reveal: {
    kicker: '01 — THE PROBLEM',
    title: 'Temperature-sensitive cargo is still moved in the dark.',
    meta: '[PLACEHOLDER COPY — problem statement to be confirmed]',
  },
  hero: {
    kicker: '03 — THE INFINOS SYSTEM',
    title: 'A controlled thermal environment, carried.',
    meta: 'SMART THERMAL TRANSPORT SYSTEM · PRODUCT DESIGNATION [PLACEHOLDER]',
  },
  exploded: {
    kicker: '04 — THE PRODUCT',
    title: 'Engineered in layers.',
    meta: 'CONCEPTUAL LAYER STRUCTURE — REAL COMPONENTS PENDING PRODUCT DOCUMENTATION',
  },
  thermal: {
    kicker: '05 — HOW IT WORKS',
    title: 'Cooling. Heating. Held stable.',
    meta: 'ILLUSTRATIVE INTERFACE — ACTUAL SPECIFICATIONS PENDING',
  },
  telemetry: {
    kicker: '06 — INTELLIGENT TELEMETRY',
    title: 'From sensor to signal to intelligence.',
    meta: 'PHYSICAL DISPLAY → DIGITAL TELEMETRY',
  },
  applications: {
    kicker: '07 — APPLICATIONS',
    title: 'One platform. Multiple thermal requirements.',
    meta: 'THE SAME CORE SYSTEM, ADAPTING TO THE PAYLOAD',
  },
}

export const CONTACT = {
  email: 'hello@infinos.example',
  emailPlaceholder: true,
  locationPlaceholder: true,
}
