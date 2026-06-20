'use client'

import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(
  () => import('../3d-particle-background'),
  { ssr: false }
)

export default function ParticleBackgroundClient() {
  return <ParticleBackground />
}
