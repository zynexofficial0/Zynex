'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RotatingPyramid() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 2
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5}>
      <tetrahedronGeometry args={[4, 0]} />
      <meshPhongMaterial
        color="#ec4899"
        emissive="#be185d"
        wireframe={false}
        shininess={100}
      />
    </mesh>
  )
}

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.02
        child.rotation.z += 0.01
        child.position.y += Math.sin(clock.elapsedTime * 2 + i) * 0.05
      })
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[i * 4 - 4, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial
            color={['#3b82f6', '#8b5cf6', '#ec4899'][i]}
            emissive={['#1e40af', '#5b21b6', '#be185d'][i]}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

export default function AirdropVisual3D() {
  return (
    <Canvas
      className="w-full h-72"
      camera={{ position: [0, 0, 12], fov: 75 }}
    >
      <color attach="background" args={['transparent']} />
      <RotatingPyramid />
      <FloatingCubes />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
    </Canvas>
  )
}
