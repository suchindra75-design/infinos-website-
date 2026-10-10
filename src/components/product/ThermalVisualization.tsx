'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useExperienceStore } from '@/state/experienceStore'

export const thermalTarget = { current: null as THREE.MeshStandardMaterial | null }

const COLD = new THREE.Color('#5aa5d6')
const HOT = new THREE.Color('#d0873e')
const IDLE = new THREE.Color('#3a4a5a')

export function ThermalVisualization() {
  const intensity = useRef(0.1)

  useFrame((state, delta) => {
    const material = thermalTarget.current
    if (!material) return
    const { phase, thermalMode } = useExperienceStore.getState()
    const t = 1 - Math.pow(0.005, delta)

    const goal =
      phase === 'thermal'
        ? thermalMode === 'cooling'
          ? COLD
          : HOT
        : IDLE
    material.emissive.lerp(goal, t)

    let goalIntensity = 0.1
    if (phase === 'thermal') {
      goalIntensity = thermalMode === 'cooling' ? 0.9 : 0.7
    } else if (phase === 'telemetry') {
      goalIntensity = 0.25
    }
    intensity.current += (goalIntensity - intensity.current) * t
    material.emissiveIntensity = intensity.current

    void state
  })

  return null
}
