'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BlockchainNetwork() {
  const linesRef = useRef<THREE.LineSegments>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)

  const nodeCount = 12

  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 15
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = Math.sin(angle * 2) * 5
      positions.push([x, y, z])
    }
    return positions
  }, [])

  useFrame(() => {
    if (nodesRef.current) {
      const dummy = new THREE.Object3D()
      for (let i = 0; i < nodeCount; i++) {
        dummy.position.set(
          nodePositions[i][0],
          nodePositions[i][1] + Math.sin(Date.now() * 0.001 + i) * 2,
          nodePositions[i][2]
        )
        dummy.scale.setScalar(1 + Math.sin(Date.now() * 0.002 + i) * 0.2)
        dummy.updateMatrix()
        nodesRef.current?.setMatrixAt(i, dummy.matrix)
      }
      nodesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount * 2}
            array={new Float32Array(
              nodePositions.flatMap(pos => [...pos, ...nodePositions[(Math.random() * nodeCount) | 0]]).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </lineSegments>

      {/* Nodes */}
      <instancedMesh ref={nodesRef} args={[new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshPhongMaterial({ color: '#3b82f6', emissive: '#1e40af' }), nodeCount]}>
        {nodePositions.map((_, i) => (
          <meshPhongMaterial key={i} color="#3b82f6" emissive="#1e40af" />
        ))}
      </instancedMesh>

      {/* Connection visualization */}
      {nodePositions.map((pos, i) => {
        const nextPos = nodePositions[(i + 1) % nodeCount]
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([pos[0], pos[1], pos[2], nextPos[0], nextPos[1], nextPos[2]])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
          </line>
        )
      })}
    </group>
  )
}

function SingleNodeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshPhongMaterial
        color="#3b82f6"
        emissive="#1e40af"
        wireframe
      />
    </mesh>
  )
}

export default function BlockchainVisualization() {
  return (
    <Canvas
      className="w-full h-64"
      camera={{ position: [0, 10, 35], fov: 50 }}
    >
      <color attach="background" args={['transparent']} />
      <SingleNodeMesh />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ff6b6b" />
    </Canvas>
  )
}
