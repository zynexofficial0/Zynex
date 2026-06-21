'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RotatingSphereProps {
  color: string
  emissiveColor: string
}

function Sphere({ color, emissiveColor }: RotatingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
      meshRef.current.scale.z = 1 + Math.sin(clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 8]} />
      <meshPhongMaterial
        color={color}
        emissive={emissiveColor}
        shininess={150}
        wireframe={false}
      />
    </mesh>
  )
}

function GlowRing({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.2, 0.15, 16, 100]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          wireframe={false}
          opacity={0.6}
          transparent
        />
      </mesh>
    </group>
  )
}

export default function RotatingSphere({ color, emissiveColor }: RotatingSphereProps) {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['transparent']} />
      <Sphere color={color} emissiveColor={emissiveColor} />
      <GlowRing color={emissiveColor} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={emissiveColor} />
      <pointLight position={[-5, -5, -5]} intensity={0.7} />
    </Canvas>
  )
}
