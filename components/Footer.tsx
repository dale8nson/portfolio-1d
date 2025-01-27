import { LinkedInIcon } from "./LinkedInIcon"
import { GithubIcon } from "./GithubIcon"

export const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-between border-t-[1px] border-t-[#1E2D3D] py-0 w-full">
      <div className="flex flex-row items-center justify-start m-0 px-4">
        <p className="border-r-[1px] border-[#1E2D3D] px-2 py-2 m-0">find me on:&nbsp;</p>
        <div className="flex flex-row justify-center items-center p-2 border-[#1E2D3D] border-r-[1px] hover:text-[#4D5BCF]">
          <a href="https://www.linkedin.com/in/dale-tristan-hutchinson/" target="_blank">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center border-l-[1px] border-[#1E2D3D] px-4 py-2">
        <a href="https://github.com/dale8nson" target="_blank">
          <div className="flex flex-row items-center justify-center hover:text-[#4D5BCF]">
            <p>@dale8nson&nbsp;</p>
            <GithubIcon />
          </div>
        </a>
      </div>
    </footer>
  )
}