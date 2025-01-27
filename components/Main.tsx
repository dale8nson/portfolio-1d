"use client"
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera} from '@react-three/drei'
import { useRef } from 'react'
import { Clouds } from './Clouds'
import { useAppSelector } from '@/lib/hooks'
import DecryptedText  from './DecryptedText'

export const Main = () => {

  const selectedTab = useAppSelector(state => state.root.selectedTab)

  const light = useRef<THREE.DirectionalLight | null>(null)
  const time = useRef<number>(0)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const cam = useRef<THREE.PerspectiveCamera | null>(null)
  return (
    <>
    {/* <div className="absolute z-[0] top-0 bg-transparent  backdrop-blur-xl transition-all duration-[7s] w-full h-full" /> */}
    {selectedTab === "main" && <section className="grid grid-cols-2 gap-6 h-full w-full relative z-[1]">
      <div className="flex flex-col items-start justify-center w-5/6 mx-auto">
        <DecryptedText text="Hi, I'm" speed={50} className="text-2xl font-medium text-white text-right" encryptedClassName="text-2xl font-medium text-white text-right" maxIterations={50} animateOn="view" sequential />
        <DecryptedText text="Dale Hutchinson" speed={100} maxIterations={150}  className="font-medium text-[62px] text-white translate-x-8" animateOn="view" encryptedClassName="font-medium text-[62px] text-white translate-x-8" sequential  />
        {/* <h1 className="font-medium text-[62px] text-white translate-x-8">Dale Hutchinson</h1> */}
        <DecryptedText text="&gt;Computer Programmer" speed={150} maxIterations={200} className="text-[#4D5BCE] text-right self-right w-full text-[32px] font-medium" encryptedClassName="text-[#4D5BCE] text-right self-right w-full text-[32px] font-medium" animateOn="view" sequential />
        </div>
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-3/4 h-3/4 flex flex-col items-center justify-center m-auto rounded-full overlfow-clip shadow-[25px_25px_50px_#617B96,_-25px_-25px_50px_#617B96]">
            <Canvas className="bg-black relative z-0 rounded-full">
            <PerspectiveCamera ref={cam} makeDefault args={[40, 16 / 10, 0.1, 100]} position={[0, 0, 0.66]} />
              <hemisphereLight/>
              <Clouds/>
            </Canvas>
          </div>
          <div className="absolute flex flex-col items-center justify-center z-10  w-[76%] h-[76%] m-auto rounded-full bg-[radial-gradient(circle_at_center,rgba(97,123,150,0)_0%,#617b96_70%)] border-[#607B9655] border-solid border-0 p-0 backdrop-blur-sm" />
        </div>
    </section>}
    </>
  )
}