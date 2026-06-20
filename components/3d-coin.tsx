'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RotatingCoin() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.02
      groupRef.current.rotation.x += 0.005
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[8, 8, 1, 64]} />
        <meshPhongMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          shininess={100}
        />
      </mesh>
      
      {/* Coin rim */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[8, 0.5, 32, 100]} />
        <meshPhongMaterial color="#d97706" />
      </mesh>

      {/* Glowing aura */}
      <pointLight intensity={1} color="#fbbf24" />
    </group>
  )
}

export default function FloatingCoinVisual() {
  return (
    <Canvas
      className="w-full h-80"
      camera={{ position: [0, 0, 15], fov: 50 }}
    >
      <color attach="background" args={['transparent']} />
      <RotatingCoin />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 0]} intensity={0.5} color="#ff6b6b" />
    </Canvas>
  )
}
