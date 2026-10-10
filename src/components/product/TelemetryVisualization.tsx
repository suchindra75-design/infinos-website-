'use client'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useExperienceStore } from '@/state/experienceStore'

export const sensorTarget = { current: null as THREE.MeshStandardMaterial | null }

export function TelemetryVisualization() {
  const baseIntensity = 0.15

  useFrame((state) => {
    const material = sensorTarget.current
    if (!material) return
    const { phase } = useExperienceStore.getState()
    if (phase === 'telemetry') {
      const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 2.4) * 0.25
      material.emissiveIntensity = pulse
    } else {
      material.emissiveIntensity = baseIntensity
    }
  })

  return null
}
