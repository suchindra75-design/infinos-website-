'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getRegisteredComponents } from './ProductComponentRegistry'
import { useExperienceStore } from '@/state/experienceStore'

export function ExplodedViewController() {
  const tmpPos = useMemo(() => new THREE.Vector3(), [])
  const tmpDir = useMemo(() => new THREE.Vector3(), [])
  const tmpRot = useMemo(() => new THREE.Euler(), [])

  useFrame((_, delta) => {
    const { explodedAmount, isMobile } = useExperienceStore.getState()
    const scale = isMobile ? 0.55 : 1
    const t = 1 - Math.pow(1e-5, delta)

    for (const entry of getRegisteredComponents()) {
      const { object, basePosition, baseRotation, spec } = entry
      const explode = spec.explode

      tmpDir.set(explode.dir[0], explode.dir[1], explode.dir[2])
      tmpPos
        .copy(basePosition)
        .addScaledVector(tmpDir, explode.distance * scale)
      object.position.lerp(tmpPos, t)

      if (explode.rotate) {
        tmpRot.set(
          explode.rotate[0] * explodedAmount,
          explode.rotate[1] * explodedAmount,
          explode.rotate[2] * explodedAmount,
        )
        object.rotation.x += (tmpRot.x - object.rotation.x) * t
        object.rotation.y += (tmpRot.y - object.rotation.y) * t
        object.rotation.z += (tmpRot.z - object.rotation.z) * t
      } else {
        object.rotation.x += (baseRotation.x - object.rotation.x) * t
        object.rotation.y += (baseRotation.y - object.rotation.y) * t
        object.rotation.z += (baseRotation.z - object.rotation.z) * t
      }
    }
  })

  return null
}
