import React, { Suspense, useMemo, useRef, useState, useEffect, Component } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useProgress, Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

// Enable global caching for Three.js loaders
THREE.Cache.enabled = true

const PRELOAD_ASSETS = [
  { obj: '/models/wanted/wanted.obj', mtl: '/models/wanted/wanted.mtl' },
  { obj: '/models/brown-east-coast/brown-east-coast.obj', mtl: '/models/brown-east-coast/brown-east-coast.mtl' },
  { obj: '/models/blue-east-coast/blue-east-coast.obj', mtl: '/models/blue-east-coast/blue-east-coast.mtl' },
  { obj: '/models/white-east-coast/white-east-coast.obj', mtl: '/models/white-east-coast/white-east-coast.mtl' }
]

// Preload assets for instant model swaps
PRELOAD_ASSETS.forEach((asset) => {
  useLoader.preload(MTLLoader, asset.mtl)
  useLoader.preload(OBJLoader, asset.obj)
})

function BrandedLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:12,pointerEvents:'none',userSelect:'none' }}>
        <div style={{ width:40,height:40,border:'2px solid rgba(255,255,255,0.12)',borderTop:'2px solid #E9542E',borderRadius:'50%',animation:'spin 0.9s linear infinite' }} />
        <span className="font-mono" style={{ fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)' }}>
          {Math.round(progress)}% loading
        </span>
      </div>
    </Html>
  )
}

function BottleMesh({ objPath, mtlPath, isInteracting }) {
  const meshRef = useRef(null)
  
  // Track active asset paths and transition scale state
  const [currentObj, setCurrentObj] = useState({ objPath, mtlPath })
  const [scaleFactor, setScaleFactor] = useState(0)

  // Animate scale on initial mount
  useEffect(() => {
    let start = null
    const duration = 250
    function animate(timestamp) {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // Ease out cubic
      setScaleFactor(1 - Math.pow(1 - progress, 3))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [])

  // Animate smooth scale transition when target model paths change
  useEffect(() => {
    if (objPath !== currentObj.objPath || mtlPath !== currentObj.mtlPath) {
      let start = null
      const duration = 140
      function animateDown(timestamp) {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        setScaleFactor(1 - progress)
        if (progress < 1) {
          requestAnimationFrame(animateDown)
        } else {
          // Swap model reference and animate scale back up
          setCurrentObj({ objPath, mtlPath })
          let startUp = null
          const durationUp = 220
          function animateUp(t) {
            if (!startUp) startUp = t
            const p = Math.min((t - startUp) / durationUp, 1)
            // cubic ease out
            setScaleFactor(1 - Math.pow(1 - p, 3))
            if (p < 1) {
              requestAnimationFrame(animateUp)
            }
          }
          requestAnimationFrame(animateUp)
        }
      }
      requestAnimationFrame(animateDown)
    }
  }, [objPath, mtlPath, currentObj])

  // Load the current active model from memory cache
  const materials = useLoader(MTLLoader, currentObj.mtlPath)
  const obj = useLoader(OBJLoader, currentObj.objPath, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  
  const scene = useMemo(() => obj.clone(true), [obj])

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat) => {
          mat.metalness = 0.35
          mat.roughness = 0.55
          mat.envMapIntensity = 1.2
          mat.needsUpdate = true
        })
      }
    })

    // 1. Reset scale, rotation, and position to measure raw bounds
    scene.scale.setScalar(1)
    scene.rotation.set(0, 0, 0)
    scene.position.set(0, 0, 0)

    let box = new THREE.Box3().setFromObject(scene)
    let size = new THREE.Vector3()
    box.getSize(size)

    // 2. Rotate to align bottle vertically (Y-axis should be longest dimension)
    if (size.x > size.y && size.x > size.z) {
      scene.rotation.z = Math.PI / 2
    } else if (size.z > size.y && size.z > size.x) {
      scene.rotation.x = Math.PI / 2
    }

    // 3. Re-calculate bounding box after alignment rotation
    box = new THREE.Box3().setFromObject(scene)
    box.getSize(size)

    // 4. Scale to standard dimension
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = 3 / maxDim
    scene.scale.setScalar(scale)

    // 5. Center the model at (0,0,0)
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

    if (import.meta.env.DEV) {
      console.info('[BottleStage3D] model bounds (normalized)', {
        objPath: currentObj.objPath,
        mtlPath: currentObj.mtlPath,
        size: size.toArray(),
        center: center.toArray(),
        normalizedScale: scale,
        rotation: [scene.rotation.x, scene.rotation.y, scene.rotation.z]
      })
    }
  }, [scene, currentObj])

  useFrame((_, delta) => {
    if (meshRef.current && !isInteracting) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group rotation={[0.10, 0, -0.05]} scale={scaleFactor}>
      <primitive ref={meshRef} object={scene} />
    </group>
  )
}

class BottleErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch { return false }
}

export default function BottleStage3D({ objPath, mtlPath, accentColor, fallbackImage, productName }) {
  const [isInteracting, setIsInteracting] = useState(false)
  const [webGLSupported] = useState(() => canUseWebGL())

  const FallbackImg = (
    <img src={fallbackImage} alt={productName}
      style={{ width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }} />
  )

  if (!webGLSupported) return FallbackImg

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Accent glow behind bottle */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: '#050505',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(38px)',
        opacity: 0.75, transition: 'opacity 0.8s ease',
      }} />
      {/* Shadow */}
      <div style={{
        position: 'absolute', inset: 0,
        filter: 'drop-shadow(8px 10px 22px rgba(0,0,0,0.42))',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <BottleErrorBoundary fallback={FallbackImg}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5.5], fov: 36 }}
          style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true }}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
          onPointerLeave={() => setIsInteracting(false)}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[3,5,4]} intensity={1.6} color="#FFF5E8" />
          <directionalLight position={[-3,2,-2]} intensity={0.5} color="#C8D8F0" />
          <pointLight position={[0,-2,3]} intensity={0.4} color="#FFFFFF" />
          <Environment preset="studio" />
          <Suspense fallback={<BrandedLoader />}>
            <BottleMesh objPath={objPath} mtlPath={mtlPath} isInteracting={isInteracting} />
          </Suspense>
          <OrbitControls
            enableZoom={false} enablePan={false} enableRotate={true}
            autoRotate={!isInteracting} autoRotateSpeed={1.0}
            minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.6}
          />
        </Canvas>
      </BottleErrorBoundary>
    </div>
  )
}
