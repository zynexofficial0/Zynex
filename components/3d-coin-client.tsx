'use client'

import dynamic from 'next/dynamic'

const CoinVisual = dynamic(
  () => import('../3d-coin'),
  { ssr: false }
)

export default function CoinVisualClient() {
  return <CoinVisual />
}
