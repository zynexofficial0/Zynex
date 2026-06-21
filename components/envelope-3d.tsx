'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Envelope() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.5
      groupRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.3) * 0.2
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.3]} />
        <meshPhongMaterial
          color="#15803d"
          emissive="#22c55e"
          wireframe={false}
          shininess={100}
        />
      </mesh>

      {/* Letter flap top */}
      <mesh position={[0, 0.85, 0.2]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.5, 0.3, 1]} />
        <meshPhongMaterial
          color="#16a34a"
          emissive="#86efac"
          wireframe={false}
          shininess={80}
        />
      </mesh>

      {/* Letter flap bottom */}
      <mesh position={[0, -0.85, 0.2]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[2.5, 0.3, 1]} />
        <meshPhongMaterial
          color="#16a34a"
          emissive="#86efac"
          wireframe={false}
          shininess={80}
        />
      </mesh>

      {/* Letter inside */}
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[2.4, 1.4, 0.1]} />
        <meshPhongMaterial
          color="#f0fdf4"
          emissive="#dcfce7"
          wireframe={false}
          shininess={50}
        />
      </mesh>

      {/* Seal */}
      <mesh position={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshPhongMaterial
          color="#22c55e"
          emissive="#86efac"
          wireframe={false}
          shininess={150}
        />
      </mesh>
    </group>
  )
}

export default function Envelope3D() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <color attach="background" args={['transparent']} />
      <Envelope />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#22c55e" />
      <pointLight position={[-5, -5, -5]} intensity={0.7} />
    </Canvas>
  )
}
