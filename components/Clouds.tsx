import { useState, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { post } from '@/utils'
import { useShader } from '@/lib/hooks'

const rand = () => {
  // const n =  crypto.randomUUID().split('').map(char => char.codePointAt(0)).reduce((a, n) => (a + n) / 2)

  const n = Math.random()

  return n
}

export const Clouds = () => {


  const { get } = useShader()

  const [vertexShader, setVertexShader] = useState<string | null>(null)
  const [fragmentShader, setFragmentShader] = useState<string | null>(null)

  const matRef = useRef<THREE.ShaderMaterial | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {

    (async () => {
      setVertexShader(await get('defaultVert').then(json => json.shader))
      setFragmentShader(await get('cloudsFrag').then(json => json.shader))
    })()

    // if(!meshRef.current) return
    // const mat = meshRef.current.material as THREE.ShaderMaterial
    // mat.uniforms.light = {value: scene.children.filter(light => (light as THREE.DirectionalLight).isDirectionalLight).map(light => light.position)[0]}

  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
      meshRef.current.rotateX(delta / 43)
    meshRef.current.rotateY(delta / 5)
      meshRef.current.rotateZ(Math.cos(delta / 3) / 1000)
    const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.time.value += delta
      material.needsUpdate = true
  })

  return (
    <>
      {fragmentShader && (
        <mesh position={[0, 1, -13]} ref={meshRef} scale={[5,5,5]} >
          {/* <boxGeometry args={[25, 25, 25, 256, 256, 256]} /> */}
          <sphereGeometry args={[10, 512, 512]} />
          {/* <torusKnotGeometry args={[1,1,128, 24]}/> */}
          {/* <planeGeometry args={[128,64,1,1]} /> */}
          <shaderMaterial ref={matRef} args={[{
            vertexShader: vertexShader as string, fragmentShader: fragmentShader, side: THREE.DoubleSide, uniforms: { time: {value: 0}}
            // , delta: { value: 0},
          }]}
            // wireframe

          />
          {/* <meshBasicMaterial color={0xee0000}  side={THREE.DoubleSide}
           wireframe
           /> */}
        </mesh>
      )}
      
    </>
  )
}