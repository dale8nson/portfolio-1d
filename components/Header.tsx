"use client"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setSelectedTab } from "@/lib/store"


export const Header = () => {
  const selectedTab = useAppSelector(state => state.root.selectedTab)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!window) return
    const tab = window.localStorage.getItem("selectedTab")
    if (tab) dispatch(setSelectedTab(tab))
    else {
      dispatch(setSelectedTab("main"));
      window.localStorage.setItem("selectedTab", "main")
    }
  }, [])
  return (
    <header className="grid grid-cols-[1fr_2fr] justify-between items-center w-full border-solid border-b-[1px]  border-[#1E2D3D] [&_button]:py-4 px-6 gap-x-0  z-[2] ">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-[#607B96] font-bold">dale_tristan_hutchinson</h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-0 ">
        <button onClick={() => {dispatch(setSelectedTab("main")); window.localStorage.setItem("selectedTab", "main")}} className="hover:!text-[#829DB8] border-solid w-full border-[#1E2D3D] bg-[#1E2D3D] border-[1px] rounded-t-xl mt-2 pt-2" style={{ backgroundColor: selectedTab === "main" ? "#1E2D3D" : "#011627", color: selectedTab === "main" ? "#829DB8" : "#607B96" }}>
          main
        </button>
        <button onClick={() => {dispatch(setSelectedTab("about_me"));window.localStorage.setItem("selectedTab", "about_me")}} className="hover:!text-[#829DB8] border-solid w-full border-[#1E2D3D] border-[1px] rounded-t-xl mt-2 pt-2" style={{ backgroundColor: selectedTab === "about_me" ? "#1E2D3D" : "#011627", color: selectedTab === "about_me" ? "#829DB8" : "#607B96" }}>
          about_me
        </button>
        <button onClick={() => {dispatch(setSelectedTab("projects"));window.localStorage.setItem("selectedTab", "projects")}} className="hover:!text-[#829DB8] border-solid w-full border-[#1E2D3D] border-[1px] rounded-t-xl mt-2 pt-2" style={{ backgroundColor: selectedTab === "projects" ? "#1E2D3D" : "#011627", color: selectedTab === "projects" ? "#829DB8" : "#607B96" }}>projects</button>
        <button onClick={() => {dispatch(setSelectedTab("contact_me")); window.localStorage.setItem("selectedTab", "contact_me")}} className="hover:!text-[#829DB8] border-solid w-full border-[#1E2D3D] border-[1px] rounded-t-xl mt-2 pt-2" style={{ backgroundColor: selectedTab === "contact_me" ? "#1E2D3D" : "#011627", color: selectedTab === "contact_me" ? "#829DB8" : "#607B96" }}>contact_me</button>
      </div>

    </header>
  )
}