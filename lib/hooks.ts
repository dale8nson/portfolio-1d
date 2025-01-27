'use client'
import { post } from "@/utils"
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()





export const useShader = () => {
  const get = async (name: string) => {
      const json = await post('/api/shader', { name })
      return json
  }

  return { get }
}

export const dynamic = 'force-dynamic'