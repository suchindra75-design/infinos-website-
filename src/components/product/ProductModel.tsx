'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { PRODUCT } from '@/content/products'
import { registerProductComponent, unregisterProductComponent } from './ProductComponentRegistry'
import { LayerLabel } from './ComponentLabels'
import { thermalTarget } from './ThermalVisualization'
import { sensorTarget } from './TelemetryVisualization'

function findNodeByName(root: THREE.Object3D, nodeName: string): THREE.Object3D | null {
  const target = nodeName.toLowerCase()
  let found: THREE.Object3D | null = null
  root.traverse((o) => {
    if (!found && o.name.toLowerCase() === target) found = o
  })
  return found
}

function findMeshMaterial(object: THREE.Object3D): THREE.MeshStandardMaterial | null {
  let material: THREE.MeshStandardMaterial | null = null
  object.traverse((o) => {
    if (!material && (o as THREE.Mesh).isMesh) {
      const m = (o as THREE.Mesh).material
      material = (Array.isArray(m) ? m[0] : m) as THREE.MeshStandardMaterial
    }
  })
  return material
}

function ProductModelInner() {
  const source = PRODUCT.model.source as string
  const gltf = useGLTF(source)
  const cloned = useMemo(() => gltf.scene.clone(true), [gltf])
  const rootRef = useRef<THREE.Group>(null!)
  const wrapperRefs = useRef(new Map<string, THREE.Group>())
  const [labelOffset, setLabelOffset] = useState(0.95)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targetHeight = PRODUCT.model.targetHeightMeters
    const bbox = new THREE.Box3().setFromObject(cloned)
    const size = bbox.getSize(new THREE.Vector3())
    const center = bbox.getCenter(new THREE.Vector3())

    if (size.y > 0) root.scale.setScalar(targetHeight / size.y)
    root.position.set(-center.x * root.scale.x, -bbox.min.y * root.scale.y, -center.z * root.scale.z)
    root.updateWorldMatrix(true, true)

    const rootInverse = root.matrixWorld.clone().invert()

    for (const spec of PRODUCT.components) {
      const wrapper = wrapperRefs.current.get(spec.id)
      const node = findNodeByName(cloned, spec.nodeName)
      if (!wrapper || !node) continue

      const worldPos = node.getWorldPosition(new THREE.Vector3())
      const worldQuat = node.getWorldQuaternion(new THREE.Quaternion())
      const restLocal = worldPos.applyMatrix4(rootInverse)

      wrapper.position.copy(restLocal)
      wrapper.rotation.setFromQuaternion(worldQuat)
      wrapper.attach(node)

      registerProductComponent({
        id: spec.id,
        object: wrapper,
        basePosition: wrapper.position.clone(),
        baseRotation: wrapper.rotation.clone(),
        spec,
      })

      if (spec.id === 'thermal') {
        const material = findMeshMaterial(wrapper)
        if (material) thermalTarget.current = material
      }
      if (spec.id === 'sensor') {
        const material = findMeshMaterial(wrapper)
        if (material) sensorTarget.current = material
      }
    }

    const finalBox = new THREE.Box3().setFromObject(root)
    setLabelOffset(Math.max(0.6, (finalBox.max.x - finalBox.min.x) * 0.5 * 1.15))

    return () => {
      for (const spec of PRODUCT.components) unregisterProductComponent(spec.id)
      thermalTarget.current = null
      sensorTarget.current = null
    }
  }, [cloned])

  return (
    <group ref={rootRef}>
      <primitive object={cloned} />
      {PRODUCT.components.map((spec) => (
        <group
          key={spec.id}
          ref={(g) => {
            if (g) wrapperRefs.current.set(spec.id, g)
          }}
        >
          <LayerLabel
            id={spec.id}
            label={spec.label}
            side={spec.labelSide}
            offsetX={labelOffset}
          />
        </group>
      ))}
    </group>
  )
}

export { ProductModelInner as ProductModel }
