'use client'

export function LightingSystem({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <>
      <ambientLight intensity={isMobile ? 0.45 : 0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      {!isMobile && (
        <directionalLight position={[-5, 3, -2]} intensity={0.35} color="#8fb3d9" />
      )}
      {!isMobile && (
        <spotLight position={[0, 6, 2.5]} angle={0.55} penumbra={1} intensity={0.55} />
      )}
    </>
  )
}
