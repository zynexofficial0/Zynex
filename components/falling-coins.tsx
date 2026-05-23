'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function FallingCoins() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const coinsRef = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x000000)
    scene.fog = new THREE.Fog(0x000000, 100, 500)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 50

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00ff88, 1)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Create coins
    const createCoin = (x: number, y: number) => {
      const geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32)
      const material = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x00ff88,
        emissiveIntensity: 0.3,
      })
      const coin = new THREE.Mesh(geometry, material)
      coin.position.set(x, y, Math.random() * 20 - 10)
      coin.castShadow = true
      coin.receiveShadow = true
      coin.rotation.x = Math.random() * Math.PI
      coin.userData = {
        velocity: Math.random() * 0.5 + 0.3,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        x: x,
        swayAmount: Math.random() * 0.02,
        swayPhase: Math.random() * Math.PI * 2,
      }
      scene.add(coin)
      return coin
    }

    // Create initial coins
    const coinCount = 15
    coinsRef.current = []
    for (let i = 0; i < coinCount; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = Math.random() * 100 + 50
      coinsRef.current.push(createCoin(x, y))
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Update coins
      coinsRef.current.forEach((coin) => {
        coin.position.y -= coin.userData.velocity
        coin.rotation.x += coin.userData.rotationSpeed
        coin.rotation.z += coin.userData.rotationSpeed * 0.5

        // Sway effect
        coin.userData.swayPhase += coin.userData.swayAmount
        coin.position.x = coin.userData.x + Math.sin(coin.userData.swayPhase) * 5

        // Remove coin if it goes below camera and recreate at top
        if (coin.position.y < -60) {
          coin.position.y = 80
          coin.position.x = (Math.random() - 0.5) * 100
          coin.position.z = Math.random() * 20 - 10
          coin.userData.swayPhase = Math.random() * Math.PI * 2
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      coinsRef.current.forEach((coin) => {
        coin.geometry.dispose()
        ;(coin.material as THREE.Material).dispose()
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ height: '100vh', width: '100%' }}
    />
  )
}
