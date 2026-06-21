'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParachute() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Parachute canopy */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhongMaterial
          color="#22c55e"
          emissive="#16a34a"
          wireframe={false}
          shininess={100}
        />
      </mesh>
      {/* Parachute lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 1.8
        const z = Math.sin(angle) * 1.8
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([x, 1.5, z, x * 0.5, 0.2, z * 0.5])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#22c55e" linewidth={2} />
          </line>
        )
      })}
      {/* Treasure chest */}
      <mesh position={[0, -0.5, 0]} scale={1.2}>
        <boxGeometry args={[1.2, 0.8, 0.8]} />
        <meshPhongMaterial
          color="#15803d"
          emissive="#22c55e"
          wireframe={false}
          shininess={150}
        />
      </mesh>
      {/* Chest lid */}
      <mesh position={[0, 0.3, -0.5]} scale={1.2} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[1.2, 0.2, 0.8]} />
        <meshPhongMaterial
          color="#16a34a"
          emissive="#86efac"
          wireframe={false}
          shininess={100}
        />
      </mesh>
    </group>
  )
}

function FloatingCoin({ offset = 0 }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.z += 0.015
      meshRef.current.position.y += Math.sin(clock.elapsedTime * 2 + offset) * 0.04
    }
  })

  const colors = ['#fbbf24', '#f59e0b', '#d97706']
  const color = colors[offset % colors.length]

  return (
    <mesh ref={meshRef} scale={0.8}>
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        wireframe={false}
        shininess={200}
      />
    </mesh>
  )
}

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(clock.elapsedTime * 0.3 + i) * 0.02
        child.rotation.x += 0.001
        child.rotation.y += 0.002
      })
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const distance = 8
        const x = Math.cos(angle) * distance
        const z = Math.sin(angle) * distance
        const y = -4 + (i % 3) * 2.5
        return (
          <mesh key={i} position={[x, y, z]}>
            <octahedronGeometry args={[0.4]} />
            <meshPhongMaterial
              color="#22c55e"
              emissive="#16a34a"
              wireframe={true}
              opacity={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 12], fov: 75 }}
    >
      <color attach="background" args={['#0a0a0a']} />
      
      {/* Main elements */}
      <FloatingParachute />
      
      {/* Floating coins around parachute */}
      <group position={[-6, 1, 0]}>
        <FloatingCoin offset={0} />
      </group>
      <group position={[6, -1, 0]}>
        <FloatingCoin offset={1} />
      </group>
      <group position={[0, -4, -3]}>
        <FloatingCoin offset={2} />
      </group>
      
      {/* Particle field background */}
      <ParticleField />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color="#22c55e" />
      <pointLight position={[-8, -8, -8]} intensity={0.8} color="#15803d" />
      <pointLight position={[0, 0, 8]} intensity={1} />
    </Canvas>
  )
}
