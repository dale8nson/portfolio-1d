import { useState, useRef, useEffect, useMemo} from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { post } from '@/utils'
import { useShader } from '@/lib/hooks'

const rand = () => {
  // const n =  crypto.randomUUID().split('').map(char => char.codePointAt(0)).reduce((a, n) => (a + n) / 2)

  const n = Math.random()

  return n
}

export const Lava = () => {

  const { scene } = useThree()

  const { get } = useShader()

  const [vertexShader, setVertexShader] = useState<string | null>(null)
  const [fragmentShader, setFragmentShader] = useState<string | null>(null)

  const matRef = useRef<THREE.ShaderMaterial | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)

  const gVecs = useMemo(() => {
    
    const a = []
    for(let i = 0; i < 1000; i++)
      a.push(new THREE.Vector3(rand(), rand(), rand()).normalize())

    return a

  }, [])

  // console.log('gVecs: ', gVecs)

  useEffect(() => {

    (async () => {
      setVertexShader(await get('lavaVert').then(json => json.shader))
      setFragmentShader(await get('lavaFrag').then(json => json.shader))
    })()

    if(!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    mat.uniforms.light = {value: scene.children.filter(light => (light as THREE.DirectionalLight).isDirectionalLight).map(light => light.position)[0]}

  }, [])

  useFrame((_, delta) => {
    if(!meshRef.current) return
    meshRef.current.rotateX(delta / 43)
    // meshRef.current.rotateY(delta / 5)
    // meshRef.current.rotateZ(Math.cos(delta / 3) / 1000)
    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.delta.value += ((delta * 100) % 100) / 100
    material.needsUpdate = true
  })

  return (
    <>
    {fragmentShader && (
        <mesh position={[0, -61, -6]} ref={meshRef} rotation={new THREE.Euler(Math.PI / 2, 0, 0)}>
        {/* <boxGeometry args={[2.025, 1, 1, 128, 128, 128]} /> */}
        <sphereGeometry args={[60, 2048, 2048]} />
        {/* <torusKnotGeometry args={[1,1,128, 24]}/> */}
        {/* <planeGeometry args={[128,128,2048,2048]} /> */}
        <shaderMaterial ref={matRef} args={[{vertexShader: vertexShader as string, fragmentShader: fragmentShader, uniforms:{gVecs:{value: gVecs}, delta: { value: 0}}}]} 
        //  wireframe 
        />
      </mesh>
    )}
    </>
  )
}