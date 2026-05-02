'use client'

import dynamic from 'next/dynamic'

const Falling3DObjects = dynamic(
  () => import('../f3d-objects'),
  { ssr: false }
)

export default function Falling3DClient() {
  return <Falling3DObjects />
}