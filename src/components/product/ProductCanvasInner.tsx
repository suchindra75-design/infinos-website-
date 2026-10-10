'use client'

import { ContactShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { LightingSystem } from './LightingSystem'
import { ProductRoot } from './ProductRoot'
import { ExplodedViewController } from './ExplodedViewController'
import { CameraController } from './CameraController'
import { ThermalVisualization } from './ThermalVisualization'
import { TelemetryVisualization } from './TelemetryVisualization'
import { useExperienceStore } from '@/state/experienceStore'

export function ProductCanvasInner() {
  const isMobile = useExperienceStore((s) => s.isMobile)

  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 35, position: [5.2, 2.2, 6.4], near: 0.1, far: 60 }}
      style={{ pointerEvents: 'none' }}
    >
      <fog attach="fog" args={['#0a0b0e', 10, 30]} />
      <LightingSystem isMobile={isMobile} />
      <ThermalVisualization />
      <TelemetryVisualization />
      <group>
        <ProductRoot />
        <ExplodedViewController />
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.55}
          scale={isMobile ? 4.5 : 6}
          blur={isMobile ? 2 : 2.6}
          far={2.2}
          resolution={isMobile ? 256 : 512}
          color="#000000"
        />
      </group>
      <CameraController />
    </Canvas>
  )
}
