'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FallingCoins() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions for coins
  const positions = useMemo(() => {
    const positions = new Float32Array(1000 * 3) // 1000 coins, 3 coordinates each

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20 // x
      positions[i * 3 + 1] = Math.random() * 20 + 10 // y (start above screen)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
    }

    return positions
  }, [])

  // Animate falling
  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < 1000; i++) {
        // Move coins down
        positions[i * 3 + 1] -= 0.02

        // Reset position when coin falls below screen
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = Math.random() * 5 + 15 // reset to top
          positions[i * 3] = (Math.random() - 0.5) * 20 // new x position
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // new z position
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#fbbf24" // gold color
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

function FallingAirdrops() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions for airdrops
  const positions = useMemo(() => {
    const positions = new Float32Array(500 * 3) // 500 airdrops, 3 coordinates each

    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25 // x
      positions[i * 3 + 1] = Math.random() * 25 + 10 // y (start above screen)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 // z
    }

    return positions
  }, [])

  // Animate falling
  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < 500; i++) {
        // Move airdrops down
        positions[i * 3 + 1] -= 0.015

        // Reset position when airdrop falls below screen
        if (positions[i * 3 + 1] < -15) {
          positions[i * 3 + 1] = Math.random() * 5 + 20 // reset to top
          positions[i * 3] = (Math.random() - 0.5) * 25 // new x position
          positions[i * 3 + 2] = (Math.random() - 0.5) * 25 // new z position
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6" // blue color
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default function Falling3DObjects() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <FallingCoins />
        <FallingAirdrops />
      </Canvas>
    </div>
  )
}