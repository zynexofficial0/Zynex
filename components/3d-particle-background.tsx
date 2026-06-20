'use client'

import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)

  const { positions, velocities } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 40
      positions[i * 3] = Math.cos(angle) * distance
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = Math.sin(angle) * distance

      velocities[i * 3] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
    }

    return { positions, velocities }
  }, [])

  velocitiesRef.current = velocities

  useFrame(() => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
      const vel = velocitiesRef.current!

      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += vel[i]
        pos[i + 1] += vel[i + 1]
        pos[i + 2] += vel[i + 2]

        const distance = Math.sqrt(pos[i] * pos[i] + pos[i + 1] * pos[i + 1] + pos[i + 2] * pos[i + 2])
        if (distance > 50) {
          const angle = Math.random() * Math.PI * 2
          const dist = Math.random() * 40
          pos[i] = Math.cos(angle) * dist
          pos[i + 1] = (Math.random() - 0.5) * 80
          pos[i + 2] = Math.sin(angle) * dist
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.z += 0.0005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[10, 3, 16, 100]} />
      <meshPhongMaterial
        color="#3b82f6"
        emissive="#1e40af"
        wireframe={false}
        shininess={100}
      />
    </mesh>
  )
}

function AnimatedSpheres() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0005
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 25
        const z = Math.sin(angle) * 25
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshPhongMaterial color={`hsl(${200 + i * 20}, 80%, 60%)`} wireframe />
          </mesh>
        )
      })}
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <Canvas
      className="fixed inset-0 -z-10"
      camera={{ position: [0, 0, 40], fov: 75 }}
      style={{ opacity: 0.5 }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <AnimatedParticles />
      <RotatingTorus />
      <AnimatedSpheres />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      <ambientLight intensity={0.3} />
    </Canvas>
  )
}
