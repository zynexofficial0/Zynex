'use client'

import dynamic from 'next/dynamic'

const AirdropViz = dynamic(
  () => import('../3d-airdrop-visual'),
  { ssr: false }
)

export default function AirdropVisual3DClient() {
  return <AirdropViz />
}
