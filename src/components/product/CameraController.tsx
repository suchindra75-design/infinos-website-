'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useThree, useFrame } from '@react-three/fiber'
import { useExperienceStore, type ExperienceState } from '@/state/experienceStore'
import type { Phase } from '@/motion/chapters'

const PRESETS: Record<Phase, { pos: [number, number, number]; target: [number, number, number] }> = {
  intro: { pos: [5.2, 2.2, 6.4], target: [0, 0.9, 0] },
  reveal: { pos: [4.6, 1.7, 5.6], target: [0, 0.9, 0] },
  hero: { pos: [2.7, 1.35, 3.6], target: [0, 0.95, 0] },
  exploded: { pos: [0.4, 0.95, 8.0], target: [0, 0.85, 0] },
  thermal: { pos: [2.1, 1.35, 3.0], target: [0, 0.75, 0] },
  telemetry: { pos: [0.55, 1.28, 1.9], target: [0, 1.2, 0.48] },
  applications: { pos: [3.8, 2.0, 5.2], target: [0, 0.9, 0] },
}

function readPointer(state: ExperienceState) {
  return state.pointer
}

export function CameraController() {
  const { camera } = useThree()
  const phase = useExperienceStore((s) => s.phase)
  const reducedMotion = useExperienceStore((s) => s.reducedMotion)
  const target = useRef(new THREE.Vector3(0, 0.9, 0))

  useEffect(() => {
    const preset = PRESETS[phase]
    if (!preset) return
    const duration = reducedMotion ? 0 : 1.8
    gsap.to(camera.position, {
      x: preset.pos[0],
      y: preset.pos[1],
      z: preset.pos[2],
      duration,
      ease: 'power3.inOut',
      overwrite: true,
    })
    gsap.to(target.current, {
      x: preset.target[0],
      y: preset.target[1],
      z: preset.target[2],
      duration,
      ease: 'power3.inOut',
      overwrite: true,
    })
  }, [phase, camera, reducedMotion])

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime
    const store = useExperienceStore.getState()
    const pointer = readPointer(store)
    const drift = reducedMotion ? 0 : 1
    const parallaxX = store.phase === 'hero' ? pointer.x * 0.18 * drift : 0
    const parallaxY = store.phase === 'hero' ? pointer.y * 0.1 * drift : 0
    const driftX = Math.sin(elapsed * 0.22) * 0.045 * drift
    const driftY = Math.cos(elapsed * 0.18) * 0.03 * drift
    camera.lookAt(
      target.current.x + driftX + parallaxX,
      target.current.y + driftY + parallaxY,
      target.current.z,
    )
  })

  return null
}
