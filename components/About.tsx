"use client"
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { ProfessionalInfoIcon } from "./ProfessionalInfoIcon";
import { PersonalInfoIcon } from "./PersonalInfoIcon";
import { ProfilePicture } from "./ProfilePicture";
import { Atsuko } from "./Atsuko";
import { Wedding } from "./Wedding";
import { AsciiImage } from "./AsciiImage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Query } from '../node_modules/@tanstack/query-core/src/query';

const queryClient = new QueryClient()

export const About = () => {

  const selectedTab = useAppSelector(state => state.root.selectedTab)

  return (

      <>
       <QueryClientProvider client={queryClient}>
        {selectedTab === "about_me" && <section className="grid grid-cols-[repeat(24,minmax(0,1fr))] w-full h-full overflow-clip">
          <div className="flex flex-col items-center justify-start border-[#1E2D3D] blur-0 border-[1px] border-solid w-full h-full py-4 gap-4">
            <button className="text-[#607B96] hover:!text-[#829DB8] pt-2">
              <ProfessionalInfoIcon/>
            </button>
            <button className="text-[#607B96] hover:!text-[#829DB8] pt-2">
              <PersonalInfoIcon/>
            </button>
            <button className="text-[#607B96] hover:!text-[#829DB8] pt-2">
  
            </button>
          </div>
          <div className="col-span-3 flex flex-col items-start justify-start border-[#1E2D3D] blur-0 border-[1px] border-solid w-full h-full">
  
          </div>
          <div className="col-span-10 flex flex-col items-start justify-start border-[#1E2D3D] border-[1px] blur-0 w-full h-full">
                
          </div>
          <div className="col-span-10 flex flex-col items-center justify-center border-[#1E2D3D] blur-0 border-[1px] w-full h-full overflow-clip">
          <AsciiImage src={"/Users/dale8nson/dev/portfolio-1d/public/ProfilePicture.jpg"} rows={100} columns={75} className="translate-y-[20rem]" />
          </div>
        </section>}
        </ QueryClientProvider>
      </>
    
  )
}