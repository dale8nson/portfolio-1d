// "use client"
import { JSX, createElement, use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { isPlainArray } from '../node_modules/@tanstack/query-core/src/utils';
import Error from "next/error";
import { img2ascii } from "@/lib/actions";
// import init from "@/public/wasm/img2ascii"


export const AsciiImage = async ({ src, rows = 50, columns = 100, scale = 0.03125, className = "" }: { src: string, rows?: number, columns?: number, scale?: number, className?: string }) => {

  // const [asciiData, setAsciiData] = useState<JSX.Element[]>()


// console.log("results:\n", results)

  // const { data, isPending } = useQuery({ queryKey: [src], queryFn: () => fetch("/api/img2ascii", { method: "POST", body: JSON.stringify({ src, rows, columns, scale }) }).then(res => res.json()) })

  // useEffect(() => {
  //   const getJson = async () => {

  //     const json = await img2ascii(src, rows, columns, scale)
  //     // console.log("json", json)
  //     console.log("json: ", JSON.parse(json))
  //     setAsciiData(JSON.parse(json))
  //   };

  //   getJson()

  // }, [])


  const json = await img2ascii(src, rows, columns, scale)

  const asciiData = JSON.parse(json)

  // if(isPending) return (
  //   <></>
  // )
  // console.log(`data.):`, data)

  // const { ascii } = data
  // console.log("Object.keys(ascii[0]).join('\\n'):\n", Object.entries(ascii[0]))

  // const els = asciiData.map((char: JSX.Element) =>  createElement(char.type, char.props, char.props.children))

  return (
    <div className={`w-[${columns}em] h-[${rows}em] m-auto flex flex-col justify-center items-center overflow-clip ${className}`}>
      {asciiData && <p className="text-nowrap text-[1rem] tracking-[0.1rem] leading-[0.9rem] font-[fira-code]">{asciiData && asciiData.map((char: JSX.Element) =>  createElement(char.type, {...char.props, key: char.key}, char.props.children))}</p>}
    </div>
  )
}