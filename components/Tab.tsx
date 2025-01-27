"use client"
import { useAppSelector } from "@/lib/hooks"
import { ReactNode } from "react"

export const Tab = ({name, children}: {name: string, children?: ReactNode}) => {


  const selectedTab = useAppSelector(state => state.root.selectedTab)

  return (
    <>
    {selectedTab === name && children}
    </>
    
  )
}