# INFINOS Tech — Website Architecture

Status: **Structural prototype (Phase 1 + 2 of the build plan).** No real CAD assets, product
documentation, or specifications are available yet. All product geometry is a clearly-marked
placeholder, and all technical values are marked illustrative/placeholder. Nothing invented is
presented as fact.

---

## 1. Information Architecture

The 10-part narrative is distributed across **one cinematic landing experience + light supporting
pages**, not ten separate pages.

| Narrative beat | Where it lives | Form |
|---|---|---|
| 01 — Intro / Brand | Landing, scroll chapter 0 | Fixed brand overlay (logo → wordmark → tagline) |
| 02 — The Problem | Landing, scroll chapter 1 | Narrative caption over product reveal |
| 03 — The INFINOS System | Landing, scroll chapter 2 | Product hero (name + one-line system statement) |
| 04 — The Product | Landing, scroll chapter 3 | **Exploded view** (signature interaction) |
| 05 — How It Works | Landing, scroll chapter 4 | Thermal story (cooling / heating on the assembled product) |
| 06 — Intelligent Telemetry | Landing, scroll chapter 5 | Physical display → digital telemetry bridge |
| 07 — Applications | Landing, scroll chapter 6 + DOM section | Transition caption + interactive "one platform" section |
| 08 — Technology / Engineering | `/technology` (Phase 3) | Supporting page — engineering deep-dive |
| 09 — Company | `/company` (Phase 3; stub section now) | Supporting page |
| 10 — Contact | `/contact` (Phase 3; stub section now) | Supporting page |

Later: product-detail pages are generated from the product data model (`/products/[slug]`),
so future INFINOS products reuse the same architecture.

## 2. Site Map

```
/                    Landing (scroll narrative + applications + company/contact stubs)
/technology          Phase 3 — engineering / technology page
/products            Phase 3 — product index (data-model driven)
/products/[slug]     Phase 3 — product detail (real GLB + real specs)
/company             Phase 3 — company page
/contact             Phase 3 — contact page
```

Navigation (kept minimal): **INFINOS** · Technology · Products · Applications · Company · Contact.
`Technology` and `Products` currently scroll to the narrative; they become real routes in Phase 3.

## 3. Component Architecture

```
src/
├── app/                        # Next.js App Router (routing, metadata, fonts)
├── content/                    # ALL copy + product data (single source of truth)
│   ├── site.ts                 # nav, brand, chapter captions, contact
│   └── products.ts             # Product data model (placeholder flags throughout)
├── state/
│   └── experienceStore.ts      # Central experience state (zustand)
├── motion/                     # Animation orchestration (no rendering)
│   ├── chapters.ts             # Tunable scroll chapter config + progress → state mapping
│   ├── ScrollChapterController.tsx
│   └── SmoothScrollProvider.tsx
├── hooks/
│   ├── useWebGLSupport.ts
│   └── environment.ts          # reduced-motion / mobile / WebGL bootstrap
└── components/
    ├── navigation/             # Nav.tsx, MobileMenu.tsx
    ├── hero/BrandIntro.tsx
    ├── product/                # 3D rendering + product DOM overlays
    │   ├── ProductStage.tsx          # fixed stage container (canvas + overlays)
    │   ├── ProductScene.tsx          # lazy Canvas wrapper + WebGL fallback
    │   ├── ProductCanvasInner.tsx    # R3F Canvas composition
    │   ├── PlaceholderProduct.tsx    # placeholder geometry (substitutable by real GLB)
    │   ├── ExplodedViewController.tsx# layer registry + engineered separation
    │   ├── CameraController.tsx      # state-driven cinematic camera
    │   ├── LightingSystem.tsx
    │   ├── ThermalVisualization.tsx
    │   ├── TelemetryVisualization.tsx
    │   └── ProductFallback.tsx       # no-WebGL static schematic
    ├── sections/               # NarrativeCaptions, ThermalHud, TelemetryHud,
    │                           # ApplicationsSection, CompanySection, ContactSection
    └── ui/                     # small shared primitives (Eyebrow, Meta)
```

Separation of concerns: **3D rendering** (components/product 3D files) · **scroll state**
(state/ + motion/) · **UI/DOM** (sections/, navigation/) · **content** (content/) ·
**orchestration** (motion/ + Experience.tsx).

## 4. 3D Scene Architecture

```
ProductCanvasInner (Canvas)
├── LightingSystem              # 3-point studio lighting, no env-map dependency
├── fog                         # depth, restrained
├── ContactShadows              # soft ground contact (cheap, no shadow maps)
└── ProductGroup (world scale)
    ├── PlaceholderProduct      # data-driven layers → replaced by ProductModel (GLB) later
    ├── ExplodedViewController  # applies controlled separation to registered layers
    └── TelemetryVisualization  # sensor-point emphasis in telemetry state
└── CameraController            # reads product state, GSAP state transitions + subtle drift
```

Product states (explicit, single source in the store — no scattered booleans):

```
INTRO → REVEAL → HERO → EXPLODED → THERMAL (cooling|heating) → TELEMETRY → APPLICATIONS
```

The scroll controller is the **only** driver of state transitions. Components consume state;
they never set narrative state independently.

## 5. Product State Machine

| State | Camera | Product | DOM |
|---|---|---|---|
| intro | far | far, faint | logo overlay, nav hidden |
| reveal | dolly-in begins | complete object fades in | problem caption |
| hero | medium 3/4 | complete, subtle idle + pointer parallax | product name caption |
| exploded | front, elevated | layers separate (scrubbed, engineered) | layer labels |
| thermal | medium, low framing | reassembled, thermal layer emissive (cooling→heating) | thermal HUD |
| telemetry | close-up on display | assembled | telemetry HUD (display → digital bridge) |
| applications | wide | assembled | transition caption, then content covers stage |

Transitions: GSAP `power3.inOut` camera moves (~1.8s); exploded separation is **scrubbed by
scroll** (weighted lerp) so it feels machined, not animated. Reassembly happens inside the first
quarter of the thermal chapter — controlled, never abrupt.

## 6. Scroll / Animation Architecture

A single global narrative timeline. Chapter boundaries live in `motion/chapters.ts` — a tunable
config, not hard-coded percentages:

```
intro 0.00–0.07 · reveal 0.07–0.20 · hero 0.20–0.38 · exploded 0.38–0.60
thermal 0.60–0.76 · telemetry 0.76–0.90 · applications 0.90–1.00
```

- `ScrollChapterController` (GSAP ScrollTrigger) measures overall progress and maps it to
  `{ phase, chapterProgress, explodedAmount, thermalMode }` in the central store.
- Lenis smooth scroll is integrated with GSAP's ticker; `ScrollTrigger.update` on Lenis scroll.
- Every animation communicates a story beat; no ambient particles, no constant floaters,
  no camera shake. Scroll velocity is respected via Lenis easing.

## 7. Responsive Strategy

| Tier | Behavior |
|---|---|
| Desktop | cinematic camera, full exploded distances, all layer labels, pointer parallax in hero |
| Tablet | same composition, simplified parallax, dpr clamped |
| Mobile | reduced exploded distances (×0.55), fewer labels, same camera story, touch-friendly nav, no horizontal overflow, no tiny technical text |

Mobile gets the same narrative with a reduced composition — not the desktop scene scaled down.

## 8. Asset Requirements

- **Primary:** real INFINOS product GLB/GLTF (CAD-derived, decimated for web; pivot at base
  center; Y-up; real-world scale; one draw call per physical layer where possible so the exploded
  view maps to `components[]`).
- Placeholder geometry in `PlaceholderProduct.tsx` is driven by `content/products.ts`
  `components[]` (id, label, explode direction/distance/rotation, base position) — the real model
  replaces the geometry, not the architecture.
- Naming convention: `/public/models/<product-slug>.glb` + optional KTX2 textures.
- Brand: `logo.jpg` (existing INFINOS logo, reused from the INFINOS dashboard for ecosystem
  consistency).
- See `public/models/README.md`.

## 9. Content Requirements

All copy and specifications live in `content/`. Every unknown is flagged `placeholder: true` and
rendered as `[PLACEHOLDER]` / "illustrative". Never invented: certifications, medical approvals,
exact temperature ranges, battery specs, sensor accuracy, IP ratings, materials, performance
claims. The keys defined: `PRODUCT_NAME, PRODUCT_DESCRIPTION, THERMAL_RANGE,
COOLING_CAPABILITY, HEATING_CAPABILITY, SENSOR_TYPES, DISPLAY_INFORMATION,
TELEMETRY_CAPABILITIES, APPLICATIONS`.

## 10. Performance Strategy

- 3D Canvas is lazy-loaded (`next/dynamic`, `ssr: false`) and only renders during the narrative
  (fades out / unmounts once content covers the stage).
- dpr clamped to `[1, 1.75]`; no shadow maps (ContactShadows only); no environment maps; no
  post-processing in the prototype; low scene complexity.
- Scroll-driven DOM updates are rAF-aligned (ScrollTrigger), 3D state read via
  `getState()` in `useFrame` (no React re-renders per frame).
- `prefers-reduced-motion`: Lenis disabled, camera transitions instant, idle drift removed —
  the site remains fully functional and readable.
- No-WebGL fallback: static schematic composition + the same DOM narrative.
