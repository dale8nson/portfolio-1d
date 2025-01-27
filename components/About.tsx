// "use client"
import { Suspense } from "react";
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
import { Tab } from "./Tab";
const queryClient = new QueryClient()

export const About = () => {

  // const selectedTab = useAppSelector(state => state.root.selectedTab)

  return (

    <>
      <Tab name="about_me">
        {/* <QueryClientProvider client={queryClient}> */}
        <section className="grid md:grid-cols-[repeat(24,minmax(0,1fr))] w-full h-full overflow-clip">
          <div className="flex flex-col items-center justify-start border-[#1E2D3D] blur-0 border-[1px] border-solid w-full h-full py-4 gap-4">
            <button className="text-[#607B96] hover:!text-[#829DB8] pt-2">
              <ProfessionalInfoIcon />
            </button>
            <button className="text-[#607B96] hover:!text-[#829DB8] pt-2">
              <PersonalInfoIcon />
            </button>
            <button className="text-[#607B96] hover:!text-[#829DB8] pt-2">

            </button>
          </div>
          <div className="col-span-3 flex flex-col items-start justify-start border-[#1E2D3D] blur-0 border-[1px] border-solid w-full h-full">

          </div>
          <div className="col-span-10 flex flex-col items-start justify-start border-[#1E2D3D] border-[1px] blur-0 w-full h-full p-8">
            <ul className="">
            <li><span className="mr-14">1</span><span>/**</span></li>
              <li><span className="mr-16">2</span><span>*</span><span className="px-8">About Me</span></li>
              <li><span className="mr-16">3</span><span>*</span><span className="px-8">Hello! I'm a Front-End Web Developer specializing in React,</span></li>
              <li><span className="mr-16">4</span><span>*</span><span className="px-8">Next.js, Tailwind CSS, and GSAP for engaging, high-performance animations.</span></li>

            </ul>
            <p>Hello! I'm a Front-End Web Developer specializing in React, Next.js, Tailwind CSS, and GSAP for engaging, high-performance animations. I love bringing dynamic, responsive interfaces to life and ensuring that the user experience is always seamless and visually exciting. Although I'm at an entry level in my career, I'm passionate about writing clean, maintainable code and refining my skill set with each new project.

              Here's what I can bring to your project:
              1. Single-Page Applications (React)
              Building modern SPAs with reusable components, intuitive user flows, and robust state management.
              2. Server-Side Rendering & SEO (Next.js)
              Implementing SSR/SSG for faster load times and better search engine visibility, giving your site a competitive edge.
              3. Custom, Responsive UI (Tailwind CSS)
              Quickly crafting pixel-perfect, mobile-friendly designs that adapt to any screen size.
              4. Smooth Animations (GSAP)
              Adding interactive, professional-grade web animations that keep users engaged and bring designs to life.
              5. Performance & Accessibility
              Following best practices to ensure your application is fast, efficient, and usable by everyone.
              6. Clear Communication & Collaboration
              I'll keep you updated every step of the way. Your feedback is welcome so we stay aligned and deliver exactly what you need.

              I'm excited to tackle new challenges—whether it's bringing a static design to life, enhancing an existing product, or building something entirely new. Let's collaborate to transform your ideas into a captivating web presence that helps your business grow. Feel free to reach out to discuss how my skills can support your next project!</p>
          </div>
          <div className="col-span-10 flex flex-col items-center justify-center border-[#1E2D3D] blur-0 border-[1px] w-full h-full overflow-clip  tracking-[1px]">
            <Suspense fallback={<div className="h-full w-full animate-pulse bg-slate-500"></div>}><AsciiImage src={"/Users/dale8nson/dev/portfolio-1d/public/ProfilePicture.jpg"} rows={85} columns={90} className="bg-black" /></Suspense>
          </div>
        </section>
        {/* </ QueryClientProvider> */}
      </Tab>
    </>

  )
}