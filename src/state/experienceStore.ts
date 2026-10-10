import { create } from 'zustand'
import type { Phase, ThermalMode } from '@/motion/chapters'

export interface ExperienceState {
  phase: Phase
  progress: number
  chapterProgress: number
  explodedAmount: number
  thermalMode: ThermalMode
  pointer: { x: number; y: number }
  webglSupported: boolean
  reducedMotion: boolean
  isMobile: boolean
  menuOpen: boolean
  setPointer: (x: number, y: number) => void
  setMenuOpen: (open: boolean) => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  phase: 'intro',
  progress: 0,
  chapterProgress: 0,
  explodedAmount: 0,
  thermalMode: 'cooling',
  pointer: { x: 0, y: 0 },
  webglSupported: true,
  reducedMotion: false,
  isMobile: false,
  menuOpen: false,
  setPointer: (x, y) => set({ pointer: { x, y } }),
  setMenuOpen: (open) => set({ menuOpen: open }),
}))
