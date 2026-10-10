import { useExperienceStore } from '@/state/experienceStore'

export type Phase =
  | 'intro'
  | 'reveal'
  | 'hero'
  | 'exploded'
  | 'thermal'
  | 'telemetry'
  | 'applications'

export type ThermalMode = 'cooling' | 'heating'

export interface Chapter {
  id: string
  phase: Phase
  start: number
  end: number
}

/**
 * Tunable chapter timing — the global narrative timeline.
 * Values are fractions of the narrative scroll region (0–1), not hard-coded percentages.
 */
export const CHAPTERS: Chapter[] = [
  { id: 'intro', phase: 'intro', start: 0.0, end: 0.07 },
  { id: 'reveal', phase: 'reveal', start: 0.07, end: 0.2 },
  { id: 'hero', phase: 'hero', start: 0.2, end: 0.38 },
  { id: 'exploded', phase: 'exploded', start: 0.38, end: 0.6 },
  { id: 'thermal', phase: 'thermal', start: 0.6, end: 0.76 },
  { id: 'telemetry', phase: 'telemetry', start: 0.76, end: 0.9 },
  { id: 'applications', phase: 'applications', start: 0.9, end: 1.0 },
]

export const EXPLODED_HOLD = 0.8
export const THERMAL_REASSEMBLE = 0.25

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function smoothstep(a: number, b: number, t: number): number {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

export function computeExplodedAmount(phase: Phase, chapterProgress: number): number {
  if (phase === 'exploded') return easeInOut(Math.min(1, chapterProgress / EXPLODED_HOLD))
  if (phase === 'thermal') return 1 - easeInOut(Math.min(1, chapterProgress / THERMAL_REASSEMBLE))
  return 0
}

export function applyScrollProgress(progress: number): void {
  const clamped = Math.min(1, Math.max(0, progress))
  const chapter =
    CHAPTERS.find((c) => clamped >= c.start && clamped < c.end) ??
    CHAPTERS[CHAPTERS.length - 1]
  const chapterProgress = Math.min(
    1,
    Math.max(0, (clamped - chapter.start) / (chapter.end - chapter.start)),
  )
  const explodedAmount = computeExplodedAmount(chapter.phase, chapterProgress)
  const thermalMode: ThermalMode = chapterProgress < 0.5 ? 'cooling' : 'heating'

  const state = useExperienceStore.getState()
  const phaseChanged = state.phase !== chapter.phase
  const patch: Partial<typeof state> = {}

  if (state.progress !== clamped) patch.progress = clamped
  if (state.chapterProgress !== chapterProgress) patch.chapterProgress = chapterProgress
  if (Math.abs(state.explodedAmount - explodedAmount) > 0.001) patch.explodedAmount = explodedAmount
  if (phaseChanged || state.thermalMode !== thermalMode) patch.thermalMode = thermalMode
  if (phaseChanged) patch.phase = chapter.phase

  if (Object.keys(patch).length > 0) useExperienceStore.setState(patch)
}

export { smoothstep }
