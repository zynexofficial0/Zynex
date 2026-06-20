'use client'

import dynamic from 'next/dynamic'

const BlockchainNet = dynamic(
  () => import('../3d-blockchain-network'),
  { ssr: false }
)

export default function BlockchainNetworkClient() {
  return <BlockchainNet />
}
